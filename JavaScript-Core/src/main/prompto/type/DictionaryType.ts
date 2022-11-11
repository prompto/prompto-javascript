import ContainerType from './ContainerType'
import {VoidType, TextType, BooleanType, IntegerType, ListType, SetType, EntryType} from './index'
import {Identifier} from '../grammar'
import {Dictionary, StrictSet, List, Document} from '../intrinsic'
import {
    SwapMethodDeclaration,
    RemoveKeyMethodDeclaration,
    RemoveValueMethodDeclaration
} from "../builtins/DictionaryTypeBuiltins";
import {convertToJsonString, convertToJsonNode, equalObjects} from "../intrinsic";
import IType from "./IType";
import {TypeFamily} from "../store";
import {Context, Transpiler} from "../runtime";
import {Section} from "../parser";
import {IExpression} from "../expression";
import {IMethodDeclaration} from "../declaration";

export default class DictionaryType extends ContainerType {

    constructor(itemType: IType) {
        super(new Identifier(itemType.name + "<:>"), TypeFamily.DICTIONARY, itemType);
    }

    withItemType(itemType: IType): IType {
        return new DictionaryType(itemType);
    }

    getTranspiledName(context: Context) {
        return this.itemType.getTranspiledName(context) + "_dict";
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(Dictionary);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("Dictionary");
    }

    isAssignableFrom(context: Context, other: IType): boolean {
        return super.isAssignableFrom(context, other)
            || ((other instanceof DictionaryType) && this.itemType.isAssignableFrom(context, other.itemType));
    }

    equals(obj: any) {
        return obj == this || (obj instanceof DictionaryType && equalObjects(this.itemType,  obj.itemType));
    }

    checkAdd(context: Context, section: Section, other: IType, tryReverse: boolean): IType {
        if (other instanceof DictionaryType && this.itemType.equals(other.itemType)) {
            return this;
        } else {
            return super.checkAdd(context, section, other, tryReverse);
        }
    }

    declareAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if (other instanceof DictionaryType && this.itemType.equals(other.itemType)) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else {
            return super.declareAdd(transpiler, other, tryReverse, left, right);
        }
    }

    transpileAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if (other instanceof DictionaryType && this.itemType.equals(other.itemType)) {
            left.transpile(transpiler);
            transpiler.append(".add(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else {
            return super.transpileAdd(transpiler, other, tryReverse, left, right);
        }
    }

    checkContains(context: Context, section: Section, other: IType): IType {
        if (other == TextType.instance) {
            return BooleanType.instance;
        } else {
            return super.checkContains(context, section, other);
        }
    }

    declareContains(transpiler: Transpiler, other: IType, container: IExpression, item: IExpression): void {
        transpiler.require(StrictSet);
        container.declare(transpiler);
        item.declare(transpiler);
    }

    transpileContains(transpiler: Transpiler, other: IType, container: IExpression, item: IExpression): void {
        container.transpile(transpiler);
        transpiler.append(".has(");
        item.transpile(transpiler);
        transpiler.append(")");
    }

    checkHasAllOrAny(context: Context, section: Section, other: IType): IType {
        return BooleanType.instance;
    }

    declareHasAllOrAny(transpiler: Transpiler, other: IType, container: IExpression, items: IExpression): void {
        transpiler.require(StrictSet);
        container.declare(transpiler);
        items.declare(transpiler);
    }

    transpileHasAllValue(transpiler: Transpiler, other: IType, container: IExpression, items: IExpression): void {
        container.transpile(transpiler);
        transpiler.append(".hasAll(");
        items.transpile(transpiler);
        transpiler.append(")");
    }

    transpileHasAnyValue(transpiler: Transpiler, other: IType, container: IExpression, items: IExpression): void {
        container.transpile(transpiler);
        transpiler.append(".hasAny(");
        items.transpile(transpiler);
        transpiler.append(")");
    }

    checkItem(context: Context, section: Section, other: IType): IType {
        if (other == TextType.instance) {
            return this.itemType;
        } else {
            context.problemListener.reportIllegalItemType(section, other, [TextType.instance]);
            return VoidType.instance;
        }
    }

    declareItem(transpiler: Transpiler, itemType: IType): void {
        // nothing to do
    }

    transpileItem(transpiler: Transpiler, itemType: IType, item: IExpression): void {
        transpiler.append(".getItem(");
        item.transpile(transpiler);
        transpiler.append(")");
    }

    transpileAssignItemValue(transpiler: Transpiler, item: IExpression, expression: IExpression) {
        transpiler.append(".setItem(");
        item.transpile(transpiler);
        transpiler.append(", ");
        expression.transpile(transpiler);
        transpiler.append(")");
    }

    checkIterator(context: Context, section: Section, source: IExpression): IType {
        return new EntryType(this.itemType);
    }

    checkMember(context: Context, section: Section, id: Identifier): IType {
        switch (id.name) {
            case "count":
                return IntegerType.instance;
            case "keys":
                return new SetType(TextType.instance);
            case "values":
                return new ListType(this.itemType);
            default:
                return super.checkMember(context, section, id);
        }
    }

    declareMember(transpiler: Transpiler, member: Identifier): void {
        switch (member.name) {
            case "keys":
                transpiler.require(StrictSet);
                break;
            case "values":
                transpiler.require(List);
                break;
            case "json":
                transpiler.require(convertToJsonString);
                transpiler.require(convertToJsonNode);
                transpiler.require(Document);
                break;
            case "count":
                break;
            default:
                super.declareMember(transpiler, member);
        }
    }

    transpileMember(transpiler: Transpiler, member: Identifier): void {
        switch(member.name) {
            case "count":
                transpiler.append("length");
                break;
            case "keys":
            case "values":
                transpiler.append(member.name);
                break;
            case "json":
                transpiler.append("toJson()");
                break;
            default:
             super.transpileMember(transpiler, member);
        }
    }

    getMemberMethods(context: Context, id: Identifier): Set<IMethodDeclaration> {
        let methods: IMethodDeclaration[] | null = null;
        switch (id.name) {
            case "swap" :
                methods = [new SwapMethodDeclaration()];
                break;
            case "removeKey":
                methods = [new RemoveKeyMethodDeclaration()];
                break;
            case "removeValue":
                methods = [new RemoveValueMethodDeclaration()];
        }
        if(methods)
            return new Set<IMethodDeclaration>(methods);
        else
            return super.getMemberMethods(context, id);
    }
}

