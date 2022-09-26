import Section from "../parser/Section";
import { SyntaxError } from '../error';
import {NullType, VoidType, BooleanType, TextType, EnumeratedNativeType} from './index';
import {CodeWriter, convertToJsonString, convertToJsonNode} from '../utils';
import Type from "./Type";
import {CmpOp, Identifier} from "../grammar";
import {Context, Transpiler} from "../runtime";
import {MethodDeclaration} from "../declaration";
import {Expression} from "../expression";
import {Value} from "../value";
import {TypeFamily} from "../store";
import {JsonNode} from "../json";
let NullValue: object;
void import("../value/NullValue").then(res => NullValue = res.default);

export default abstract class BaseType extends Section implements Type {

    id: Identifier;
    family: TypeFamily;

    constructor(id: Identifier, family: TypeFamily) {
        super();
        this.id = id;
        this.family = family;
    }

    get name() {
        return this.id.name;
    }

    get mutable() {
        return false;
    }

    anyfy(): Type {
        return this;
    }

    resolve(context: Context, onError: (type: Type) => void): Type {
        return this;
    }

    isMutable(context: Context): boolean {
        return false;
    }

    asMutable(context: Context, mutable: boolean): Type {
        if(mutable)
            context.problemListener.reportError(this, this.name + " cannot be mutable");
        return this;
    }

    isStorable(context: Context): boolean {
        return false;
    }

    getTranspiledName(): string {
        return this.name;
    }

    toString(): string {
        return this.name;
    }

    equals(other: any): boolean {
        return (other instanceof BaseType) && this.name == other.name;
    }

    isAssignableFrom(context: Context, other: Type): boolean {
        return this == other || this.equals(other) || other === NullType.instance;
    }

    abstract isMoreSpecificThan(context: Context, other: Type): boolean;

    getMemberMethods(context: Context, id: Identifier): MethodDeclaration[] {
        return [];
    }

    getStaticMemberMethods(context: Context, id: Identifier): MethodDeclaration[] {
        return [];
    }

    getStaticMemberValue(context: Context, id: Identifier): Value {
        throw new SyntaxError("Cannot access static member value");
    }

    abstract declare(transpiler: Transpiler): void;

    abstract transpile(transpiler: Transpiler): void;

    transpileAssignMemberValue(transpiler: Transpiler, name: string, expression: Expression): void {
        throw new SyntaxError("Cannot transpile assign member value from " + this.name);
    }

    transpileAssignItemValue(transpiler: Transpiler, item: number, expression: Expression): void {
        throw new SyntaxError("Cannot transpile assign item value from " + this.name);
    }

    abstract checkExists(context: Context): void;

    checkAdd(context: Context, section: Section, other: Type, tryReverse: boolean): Type {
        if(other instanceof EnumeratedNativeType)
            return this.checkAdd(context, section, other.derivedFrom, tryReverse);
        else if(tryReverse)
            return other.checkAdd(context, section, this, false);
        else {
            const left = tryReverse ? this : other;
            const right = tryReverse ? other : this;
            const msg = "Cannot add " + left.name + " and " + right.name;
            context.problemListener.reportIllegalOperation(section, msg);
            return VoidType.instance;
        }
    }

    declareAdd(transpiler: Transpiler, other: Type, tryReverse: boolean, left: Expression, right: Expression): void {
        if(other instanceof EnumeratedNativeType)
            this.declareAdd(transpiler, other.derivedFrom, tryReverse, left, right);
        else if(tryReverse)
            other.declareAdd(transpiler, this, false, right, left);
        else
            throw new SyntaxError("Cannot declare add " + this.name + " to " + other.name);
    }

    transpileAdd(transpiler: Transpiler, other: Type, tryReverse: boolean, left: Expression, right: Expression): void {
        if(other instanceof EnumeratedNativeType)
            return this.transpileAdd(transpiler, other.derivedFrom, tryReverse, left, right);
        else if(tryReverse)
            return other.transpileAdd(transpiler, this, false, right, left);
        else
            throw new SyntaxError("Cannot transpile add " + this.name + " to " + other.name);
    }

    checkSubtract(context: Context, other: Type): Type {
        if(other instanceof EnumeratedNativeType)
            return this.checkSubtract(context, other.derivedFrom);
        else
            throw new SyntaxError("Cannot substract " + this.name + " from " + other.name);
    }

    declareSubtract(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
        if(other instanceof EnumeratedNativeType)
            this.declareSubtract(transpiler, other.derivedFrom, left, right);
        else
            throw new SyntaxError("Cannot declare substract " + this.name + " to " + other.name);
    }

    transpileSubtract(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
        if(other instanceof EnumeratedNativeType)
            this.transpileSubtract(transpiler, other.derivedFrom, left, right);
        else
            throw new SyntaxError("Cannot transpile substract " + this.name + " to " + other.name);
    }

    checkDivide(context: Context, other: Type): Type {
        if(other instanceof EnumeratedNativeType)
            return this.checkDivide(context, other.derivedFrom);
        else
            throw new SyntaxError("Cannot divide " + this.name + " with " + other.name);
    }

    declareDivide(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
        if(other instanceof EnumeratedNativeType)
            this.declareDivide(transpiler, other.derivedFrom, left, right);
        else
            throw new SyntaxError("Cannot declare divide " + this.name + " to " + other.name);
    }

    transpileDivide(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
        if(other instanceof EnumeratedNativeType)
            this.transpileDivide(transpiler, other.derivedFrom, left, right);
        else
            throw new SyntaxError("Cannot transpile divide " + this.name + " to " + other.name);
    }

    checkIntDivide(context: Context, other: Type): Type {
        if(other instanceof EnumeratedNativeType)
            return this.checkIntDivide(context, other.derivedFrom);
        else
            throw new SyntaxError("Cannot divide " + this.name + " with " + other.name);
    }

    declareIntDivide(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
        if(other instanceof EnumeratedNativeType)
            this.declareIntDivide(transpiler, other.derivedFrom, left, right);
        else
            throw new SyntaxError("Cannot declare int divide " + this.name + " to " + other.name);
    }

    transpileIntDivide(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
        if(other instanceof EnumeratedNativeType)
            this.transpileIntDivide(transpiler, other.derivedFrom, left, right);
        else
            throw new SyntaxError("Cannot transpile int divide " + this.name + " to " + other.name);
    }

    checkModulo(context: Context, other: Type): Type {
        if(other instanceof EnumeratedNativeType)
            return this.checkModulo(context, other.derivedFrom);
        else
            throw new SyntaxError("Cannot modulo " + this.name + " with " + other.name);
    }

    declareModulo(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
        if(other instanceof EnumeratedNativeType)
            this.declareModulo(transpiler, other.derivedFrom, left, right);
        else
            throw new SyntaxError("Cannot declare modulo " + this.name + " to " + other.name);
    }

    transpileModulo(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void {
        if(other instanceof EnumeratedNativeType)
            this.transpileModulo(transpiler, other.derivedFrom, left, right);
        else
            throw new SyntaxError("Cannot transpile modulo " + this.name + " to " + other.name);
    }

    checkMultiply(context: Context, other: Type, tryReverse: boolean): Type {
        if(other instanceof EnumeratedNativeType)
            return this.checkMultiply(context, other.derivedFrom, tryReverse);
        else if(tryReverse)
            return other.checkMultiply(context, this, false);
        else
            throw new SyntaxError("Cannot multiply " + this.name + " with " + other.name);
    }

    declareMultiply(transpiler: Transpiler, other: Type, tryReverse: boolean, left: Expression, right: Expression): void {
        if(other instanceof EnumeratedNativeType)
            this.declareMultiply(transpiler, other.derivedFrom, tryReverse, left, right);
        else if(tryReverse)
            other.declareMultiply(transpiler, this, false, right, left);
        else
            throw new SyntaxError("Cannot declare multiply " + this.name + " to " + other.name);
    }

    transpileMultiply(transpiler: Transpiler, other: Type, tryReverse: boolean, left: Expression, right: Expression): void {
        if(other instanceof EnumeratedNativeType)
            this.transpileMultiply(transpiler, other.derivedFrom, tryReverse, left, right);
        else if(tryReverse)
            other.transpileMultiply(transpiler, this, false, right, left);
        else
            throw new SyntaxError("Cannot transpile multiply " + this.name + " to " + other.name);
    }

    checkMinus(context: Context): Type {
        if(this instanceof EnumeratedNativeType)
            return this.derivedFrom.checkMinus(context);
        else
            throw new SyntaxError("Cannot negate " + this.name);
    }

    declareMinus(transpiler: Transpiler, expression: Expression): void {
        if(this instanceof EnumeratedNativeType)
            this.derivedFrom.declareMinus(transpiler, expression);
        else
            throw new SyntaxError("Cannot declare negate " + this.name);
    }

    transpileMinus(transpiler: Transpiler, expression: Expression): void {
        if(this instanceof EnumeratedNativeType)
            this.derivedFrom.transpileMinus(transpiler, expression);
        else
            throw new SyntaxError("Cannot transpile negate of " + this.name );
    }

    checkCompare(context: Context, section: Section, other: Type): Type {
        if(other instanceof EnumeratedNativeType)
            return this.checkCompare(context, section, other.derivedFrom);
        else {
            context.problemListener.reportError(section, "Cannot compare " + this.name + " and " + other.name);
            return BooleanType.instance;
        }
    }

    declareCompare(transpiler: Transpiler, other: Type): void {
        if(other instanceof EnumeratedNativeType)
            this.declareCompare(transpiler, other.derivedFrom);
        else
            throw new SyntaxError(this.name + " cannot declare compare " + other.name);
    }

    transpileCompare(transpiler: Transpiler, other: Type, operator: CmpOp, left: Expression, right: Expression): void {
        if(other instanceof EnumeratedNativeType)
            return this.transpileCompare(transpiler, other.derivedFrom, operator, left, right);
        else
            throw new SyntaxError(this.name + " cannot transpile compare " + other.name);
    }

    checkContains(context: Context, section: Section, other: Type): Type {
        if(other instanceof EnumeratedNativeType)
            return this.checkContains(context, section, other.derivedFrom);
        else {
            context.problemListener.reportError(section, this.name + " cannot contain " + other.name);
            return BooleanType.instance;
        }
    }

    declareContains(transpiler: Transpiler, other: Type, container: Expression, item: Expression): void {
        if(other instanceof EnumeratedNativeType)
            this.declareContains(transpiler, other.derivedFrom, container, item);
        else
            throw new SyntaxError(this.name + " cannot declare contain " + other.name);
    }

    transpileContains(transpiler: Transpiler, other: Type, container: Expression, item: Expression): void {
        if(other instanceof EnumeratedNativeType)
            return this.transpileContains(transpiler, other.derivedFrom, container, item);
        else
            throw new SyntaxError(this.name + " cannot transpile contain " + other.name);
    }

    checkHasAllOrAny(context: Context, section: Section, other: Type): Type {
        if(other instanceof EnumeratedNativeType)
            return this.checkHasAllOrAny(context, section, other.derivedFrom);
        else
            throw new SyntaxError(this.name + " cannot have all or any " + other.name);
    }

    declareHasAllOrAny(transpiler: Transpiler, other: Type, container: Expression, item: Expression): void {
        if(other instanceof EnumeratedNativeType)
            return this.declareHasAllOrAny(transpiler, other.derivedFrom, container, item);
        else
            throw new SyntaxError(this.name + " cannot declare have all or any " + other.name);
    }

    transpileHasAllValue(transpiler: Transpiler, other: Type, container: Expression, item: Expression): void {
        if(other instanceof EnumeratedNativeType)
            return this.transpileHasAllValue(transpiler, other.derivedFrom, container, item);
        else
            throw new SyntaxError(this.name + " cannot transpile has all " + other.name);
    }

    transpileHasAnyValue(transpiler: Transpiler, other: Type, container: Expression, item: Expression): void {
        if(other instanceof EnumeratedNativeType)
            return this.transpileHasAnyValue(transpiler, other.derivedFrom, container, item);
        else
            throw new SyntaxError(this.name + " cannot transpile has any " + other.name);
    }

    transpileHasAllPredicate(transpiler: Transpiler, other: Type, container: Expression, predicate: Expression): void {
        if(other instanceof EnumeratedNativeType)
            return this.transpileHasAllPredicate(transpiler, other.derivedFrom, container, predicate);
        else
            throw new SyntaxError(this.name + " cannot transpile has all " + other.name);
    }

    transpileHasAnyPredicate(transpiler: Transpiler, other: Type, container: Expression, predicate: Expression): void {
        if(other instanceof EnumeratedNativeType)
            return this.transpileHasAnyPredicate(transpiler, other.derivedFrom, container, predicate);
        else
            throw new SyntaxError(this.name + " cannot transpile has any " + other.name);
    }

    checkItem(context: Context, section: Section, itemType: Type): Type {
        if(itemType instanceof EnumeratedNativeType)
            return this.checkItem(context, section, itemType.derivedFrom);
        else {
            context.problemListener.reportError(section, "Invalid [] operator for: " + this.name);
            return VoidType.instance;
        }
    }

    declareItem(transpiler: Transpiler, itemType: Type, item: Expression): void {
        if(itemType instanceof EnumeratedNativeType)
            return this.declareItem(transpiler, itemType.derivedFrom, item);
        else
            throw new SyntaxError("Cannot declare item from: " + this.name);
    }

    transpileItem(transpiler: Transpiler, itemType: Type, item: Expression): void {
        if(itemType instanceof EnumeratedNativeType)
            return this.transpileItem(transpiler, itemType.derivedFrom, item);
        else
            throw new SyntaxError("Cannot transpile item from: " + this.name);
    }

    checkMember(context: Context, section: Section, id: Identifier) : Type {
        if("text" === id.name)
            return TextType.instance;
        else if("json" === id.name)
            return TextType.instance;
        else {
            context.problemListener.reportUnknownAttribute(section, id.name);
            return VoidType.instance;
        }
    }

    checkStaticMember(context: Context, section: Section, id: Identifier) : Type {
        context.problemListener.reportUnknownAttribute(section, id.name);
        return VoidType.instance;
    }

    declareMember(transpiler: Transpiler, section: Section, id: Identifier): void {
        switch(id.name) {
            case "text":
                break;
            case "json":
                transpiler.require(convertToJsonString);
                transpiler.require(convertToJsonNode);
                break;
            default:
                transpiler.context.problemListener.reportUnknownAttribute(section, id.name);
        }
    }

    transpileMember(transpiler: Transpiler, id: Identifier): void {
        switch(id.name) {
            case "text":
                transpiler.append("getText()");
                break;
            case "json":
                transpiler.append("toJson()");
                break;
            default:
                throw new SyntaxError("Cannot transpile member: " + id.name + " from " + this.name);
        }
    }

    checkSlice(context: Context): Type {
        throw new SyntaxError("Cannot slice " + this.name);
    }

    declareSlice(transpiler: Transpiler, first: Expression, last: Expression): void {
        throw new SyntaxError("Cannot declare slice for " + this.name);
    }

    transpileSlice(transpiler: Transpiler, first: Expression, last: Expression): void {
        throw new SyntaxError("Cannot transpile slice for " + this.name);
    }

    checkIterator(context: Context, source: Expression): Type {
        context.problemListener.reportCannotIterate(this, source);
        return VoidType.instance;
    }

    declareIterator(transpiler: Transpiler, id: Identifier, expression: Expression): void {
        throw new SyntaxError("Cannot declare iterate over " + this.name);
    }

    transpileIterator(transpiler: Transpiler, id: Identifier, expression: Expression): void {
        throw new SyntaxError("Cannot transpile iterate over " + this.name);
    }

    checkAssignableFrom(context: Context, section: Section, other: Type): void {
        if (!this.isAssignableFrom(context, other))
            context.problemListener.reportIncompatibleTypes(section, this, other);
    }

    checkRange(context: Context, other: Type): void {
        throw new SyntaxError("Cannot create range of " + this.name + " and " + other.name);
    }

    declareRange(context: Context, other: Type): void {
        throw new SyntaxError("Cannot declare range of " + this.name + " and " + other.name);
    }

    transpileRange(transpiler: Transpiler, other: Type, first: Expression, last: Expression): void {
        throw new SyntaxError("Cannot transpile range of " + this.name);
    }

    checkAnd(context: Context, section: Section, other: Type): Type {
        throw new SyntaxError("Cannot logically combine " + this.name + " and " + other.name);
    }

    declareAnd(transpiler: Transpiler): void {
        throw new SyntaxError("Cannot declare 'and' of " + this.name);
    }

    transpileAnd(transpiler: Transpiler): void {
        throw new SyntaxError("Cannot declare 'and' of " + this.name);
    }

    checkOr(context: Context, other: Type): Type {
        throw new SyntaxError("Cannot logically combine " + this.name + " or " + other.name);
    }

    checkNot(context: Context): Type {
        throw new SyntaxError("Cannot logically negate " + this.name);
    }

    readJSONValue(context: Context, node: JsonNode, parts: Map<string, Uint8Array>): Value {
        throw new Error("Unsupported!")
    }

    declareSorted(transpiler: Transpiler, key: any): void {
        throw new Error("Cannot declare sorted from " + this.name);
    }

    getSortedComparator(context: Context, key: any, desc: boolean): (a: any, b: any) => number {
        throw new Error("Unsupported for type " + this.name);
    }

    convertJavaScriptValueToPromptoValue(context: Context, value: any, returnType: Type): Value {
        if(value == null) {
            const obj = NullValue;
            return obj[ "instance" as keyof typeof obj] as Value;
        } else
            throw new Error("Unsupported for type " + this.name);
    }

    toDialect(writer: CodeWriter): void {
        writer.append(this.name);
    }

    transpileJsxCode(transpiler: Transpiler, expression: Expression): void {
        expression.transpile(transpiler);
    }
}

