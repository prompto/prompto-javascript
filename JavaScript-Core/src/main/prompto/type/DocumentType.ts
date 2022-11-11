import NativeType from './NativeType'
import { NullType, AnyType, MissingType, SetType, TextType, ListType, IntegerType, CategoryType } from './index'
import {ValueExpression, MethodSelector, IExpression} from '../expression'
import { Identifier, ArgumentList, Argument } from '../grammar'
import {Context, MethodDeclarationMap, Transpiler} from '../runtime'
import { MethodCall } from '../statement'
import {DocumentValue, NullValue, IntegerValue, DecimalValue, TextValue, IValue, BooleanValue} from '../value'
import { TextLiteral } from '../literal'
import {equalArrays, compareValues, isANumber, convertToJsonString, convertToJsonNode} from '../intrinsic/Utils'
import JavaScriptClassType from "../javascript/JavaScriptClassType";
import {TypeFamily} from "../store";
import IType from "./IType";
import {Section} from "../parser";
import {JsonNode} from "../json";
import {IMethodDeclaration} from "../declaration";

import StrictSet from '../intrinsic/StrictSet.js';
import List from '../intrinsic/List.js';
import Document from '../intrinsic/Document.js';

export default class DocumentType extends NativeType {

    static instance = new DocumentType();
    
    constructor() {
        super(new Identifier("Document"), TypeFamily.DOCUMENT);
    }

    withItemType(itemType: IType): IType {
        return this;
    }

    isAssignableFrom(context: Context, other: IType): boolean {
        return super.isAssignableFrom(context, other)
            || other === AnyType.instance
            || (other instanceof CategoryType && "Any" === other.name);
    }

    isMoreSpecificThan(context: Context, other: IType) {
        if ((other instanceof NullType) || (other instanceof AnyType) || (other instanceof MissingType))
            return true;
        else
            return super.isMoreSpecificThan(context, other);
    }

    checkMember(context: Context, section: Section, id: Identifier): IType {
        switch(id.name) {
            case "count":
                return IntegerType.instance;
            case "keys":
                return new SetType(TextType.instance);
            case "values":
                return new ListType(AnyType.instance);
            case "text":
            case "json":
                return TextType.instance;
            default:
                return AnyType.instance;
        }
    }

    checkAdd(context: Context, section: Section, other: IType, tryReverse: boolean): IType {
        if(other instanceof DocumentType) {
            return this;
        } else {
            return super.checkAdd(context, section, other, tryReverse);
        }
    }

    declareAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if(other instanceof DocumentType) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return super.declareAdd(transpiler, other, tryReverse, left, right);
        }
    }

    transpileAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if(other instanceof DocumentType) {
            left.transpile(transpiler);
            transpiler.append(".$safe_add(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
        }
    }

    convertJavaScriptValueToPromptoValue(context: Context, value: any, returnType: IType | null): IValue {
        if (value instanceof Document)
            return new DocumentValue(value);
        else {
            const ivalue = JavaScriptClassType.convertDocument(context, value, typeof (value), this);
            return ivalue || NullValue.instance;
        }
    }

    declare(transpiler: Transpiler): void {
        transpiler.register(Document);
        transpiler.register(List);
        transpiler.require(equalArrays);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append('Document')
    }

    declareMember(transpiler: Transpiler, member: Identifier): void {
        switch(member.name) {
            case "keys":
                transpiler.require(StrictSet);
                break;
            case "values":
                transpiler.require(List);
                break;
            case "json":
                transpiler.require(convertToJsonString);
                transpiler.require(convertToJsonNode);
                break;
        }
    }

    transpileMember(transpiler: Transpiler, member: Identifier): void {
        switch(member.name) {
            case "count":
            transpiler.append("$safe_length");
            break;
            case "keys":
            case "values":
                transpiler.append("$safe_" + member.name);
                break;
            case "text":
                transpiler.append("getText()");
                break;
            case "json":
                transpiler.append("toJson()");
                break;
            default:
                transpiler.append("$safe_getMember('").append(member.name).append("', false)");
        }
    }

    transpileAssignMember(transpiler: Transpiler, member: Identifier) {
        transpiler.append(".$safe_getMember('").append(member.name).append("', true)");
    }

    transpileAssignMemberValue(transpiler: Transpiler, member: Identifier, expression: IExpression) {
        transpiler.append(".$safe_setMember('").append(member.name).append("', ");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

    checkItem(context: Context, section: Section, itemType: IType): IType {
        return AnyType.instance;
    }

    declareItem(transpiler: Transpiler, type: IType, item: IExpression): void {
        type.declare(transpiler);
        item.declare(transpiler);
        transpiler.require(isANumber);
    }

    transpileItem(transpiler: Transpiler, type: IType, item: IExpression): void {
        transpiler.append(".$safe_getItem(");
        item.transpile(transpiler);
        transpiler.append(")");
    }

    transpileAssignItemValue(transpiler: Transpiler, item: IExpression, expression: IExpression): void {
        transpiler.append(".$safe_setItem(");
        item.transpile(transpiler);
        transpiler.append(", ");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

    declareSorted(transpiler: Transpiler, key: IExpression | null): void {
        if (!key)
            key = new TextLiteral('"key"');
        const decl = this.findGlobalMethod(transpiler.context, new Identifier(key.toString()));
        if (decl != null) {
            decl.declare(transpiler);
        } else {
            transpiler = transpiler.newDocumentTranspiler();
            key.declare(transpiler);
        }
    }

    transpileSortedComparator(transpiler: Transpiler, key: IExpression | null, desc: boolean): void {
        if (key)
            key = new TextLiteral('"key"');
        const decl = this.findGlobalMethod(transpiler.context, new Identifier(key!.toString()));
        if (decl != null) {
            this.transpileGlobalMethodSortedComparator(transpiler, decl.getTranspiledName(transpiler.context), desc);
        } else if (key instanceof TextLiteral) {
            this.transpileEntrySortedComparator(transpiler, key, desc);
        } else {
            this.transpileExpressionSortedComparator(transpiler, key!, desc);
        }
    }

    transpileGlobalMethodSortedComparator(transpiler: Transpiler, name: string, desc: boolean) {
        transpiler.append("function(o1, o2) { return ")
            .append(name).append("(o1) === ").append(name).append("(o2)").append(" ? 0 : ")
            .append(name).append("(o1) > ").append(name).append("(o2)").append(" ? ");
        if (desc)
            transpiler.append("-1 : 1; }");
        else
            transpiler.append("1 : -1; }");
    }

    transpileEntrySortedComparator(transpiler: Transpiler, key: IExpression, descending: boolean) {
        transpiler.append("function(o1, o2) { return ");
        this.transpileEqualEntries(transpiler, key);
        transpiler.append(" ? 0 : ");
        this.transpileGreaterEntries(transpiler, key);
        transpiler.append(" ? ");
        if (descending)
            transpiler.append("-1 : 1; }");
        else
            transpiler.append("1 : -1; }");
    }

    transpileEqualEntries(transpiler: Transpiler, key: IExpression) {
        transpiler.append("o1[");
        key.transpile(transpiler);
        transpiler.append("] === o2[");
        key.transpile(transpiler);
        transpiler.append("]");
    }

    transpileGreaterEntries(transpiler: Transpiler, key: IExpression) {
        transpiler.append("o1[");
        key.transpile(transpiler);
        transpiler.append("] > o2[");
        key.transpile(transpiler);
        transpiler.append("]");
    }

    transpileExpressionSortedComparator(transpiler: Transpiler, key: IExpression, descending: boolean) {
        transpiler = transpiler.newDocumentTranspiler();
        transpiler.append("function(o1, o2) { var v1 = (function() { return ");
        key.transpile(transpiler);
        transpiler.append("; }).bind(o1)(); var v2 = (function() { return ");
        key.transpile(transpiler);
        transpiler.append("; }).bind(o2)(); return v1===v2 ? 0 : v1 > v2 ? ");
        if (descending)
            transpiler.append("-1 : 1; }");
        else
            transpiler.append("1 : -1; }");
        transpiler.flush();
    }

    readJSONValue(context: Context, node: JsonNode, parts: Map<string, ArrayBuffer>) {
        const instance = new DocumentValue();
        for (const key in node as object) {
            const value = this.readJSONField(context, node![key as keyof typeof node] as JsonNode, parts);
            instance.setMember(context, key, value);
        }
        return instance;
    }

    readJSONField(context: Context, node: JsonNode, parts: Map<string, ArrayBuffer>) {
        if (!node)
            return NullValue.instance;
        else if (typeof (node) === typeof (true))
            return BooleanValue.ValueOf(node as boolean);
        else if (typeof (node) === typeof (1))
            return new IntegerValue(node as number);
        else if (typeof (node) === typeof (1.0))
            return new DecimalValue(node as number)
        else if (typeof (node) === typeof (""))
            return new TextValue(node as string)
        else if (typeof (node) === typeof ([]))
            throw new Error("list");
        else if (typeof (node) === typeof ({}))
            throw new Error("dict/object");
        else
            throw new Error(typeof (node).toString());
    }

    getSortedComparator(context: Context, desc: boolean, key: IExpression | Identifier | null): (o1: IValue, o2: IValue) => number {
        if (!key)
            key = new TextLiteral('"key"');
        const keyId = key instanceof Identifier ? key : new Identifier(key.toString());
        const decl = this.findGlobalMethod(context, keyId);
        if (decl) {
            return this.getGlobalMethodSortedComparator(context, desc, decl);
        } else if (key instanceof TextLiteral) {
            return this.getEntrySortedComparator(context, desc, key);
        } else {
            return this.getExpressionSortedComparator(context, desc, key as IExpression);
        }
    }

     /* look for a method which takes Document as sole parameter */
    findGlobalMethod(context: Context, id: Identifier): IMethodDeclaration | null {
        const methods = context.getRegistered(id);
        if (methods instanceof MethodDeclarationMap) {
            return methods.protos.get(DocumentType.instance.name) || null;
        } else
            return null;
    }

    getGlobalMethodSortedComparator(context: Context, desc: boolean, decl: IMethodDeclaration): (o1: IValue, o2: IValue) => number {
        const exp = new ValueExpression(this, new DocumentValue());
        const arg = new Argument(null, exp);
        const args = new ArgumentList([arg]);
        const call = new MethodCall(new MethodSelector(null, decl.id), args);
        const cmp = (o1: IValue, o2: IValue) => {
            const argument = call.args![0];
            argument._expression = new ValueExpression(this, o1);
            const value1 = call.interpretExpression(context);
            argument._expression = new ValueExpression(this, o2);
            const value2 = call.interpretExpression(context);
            return compareValues(value1, value2);
        };
        return cmp.bind(this) as (o1: IValue, o2: IValue) => number;
    }

    getEntrySortedComparator(context: Context, desc: boolean, key: TextLiteral): (o1: IValue, o2: IValue) => number {
        const id = new Identifier(key.value.getStorableData());
        return (o1, o2) => {
            const value1 = o1.GetMemberValue(context, id);
            const value2 = o2.GetMemberValue(context, id);
            return desc ? compareValues(value2, value1) : compareValues(value1, value2);
        };
    }

    getExpressionSortedComparator(context: Context, desc: boolean, expression: IExpression): (o1: IValue, o2: IValue) => number {
        return (o1: DocumentValue, o2: DocumentValue) => {
            let ctx = context.newDocumentContext(o1, false);
            const value1 = expression.interpretExpression(ctx);
            ctx = context.newDocumentContext(o2, false);
            const value2 = expression.interpretExpression(ctx);
            return desc ? compareValues(value2, value1) : compareValues(value1, value2);
        };
    }

}



