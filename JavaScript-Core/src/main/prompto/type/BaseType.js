import Section from "../parser/Section.js";
import { SyntaxError } from '../error/index.js';
import { NullType, VoidType, BooleanType, TextType, EnumeratedNativeType } from './index.js';
import { convertToJson, convertToJsonNode } from '../utils/index.js';
let NullValue;
import("../value/NullValue").then(res => NullValue = res.default);

export default class BaseType extends Section {
 
    constructor(id) {
        super();
        this.id = id;
    }

    get name() {
        return this.id.name;
    }

    anyfy() {
        return this;
    }

    resolve(context, onError) {
        return this;
    }

    isMutable(context) {
        return false;
    }

    asMutable(context, mutable) {
        if(mutable)
            context.problemListener.reportError(this, this.name + " cannot be mutable");
        else
            return this;
    }

    isStorable(context) {
        return false;
    }

    getTranspiledName() {
        return this.name;
    }

    toString() {
        return this.name;
    }

    equals(other) {
        return (other instanceof BaseType) && this.name === other.name;
    }

    isAssignableFrom(context, other) {
        return this === other || this.equals(other) || other === NullType.instance;
    }

    getMemberMethods(context, id) {
        return [];
    }

    getStaticMemberMethods(context, id) {
        return [];
    }

    transpile(transpiler) {
        throw new Error("Transpile not implemented by " + this.constructor.name);
    }

    transpileAssignMemberValue(transpiler, name, expression) {
        throw new SyntaxError("Cannot transpile assign member value from " + this.name);
    }

    transpileAssignItemValue(transpiler, item, expression) {
        throw new SyntaxError("Cannot transpile assign item value from " + this.name);
    }

    checkAdd(context, section, other, tryReverse) {
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

    declareAdd(transpiler, other, tryReverse, left, right) {
        if(other instanceof EnumeratedNativeType)
            return this.declareAdd(transpiler, other.derivedFrom, tryReverse, left, right);
        else if(tryReverse)
            return other.declareAdd(transpiler, this, false, right, left);
        else
            throw new SyntaxError("Cannot declare add " + this.name + " to " + other.name);
    }

    transpileAdd(transpiler, other, tryReverse, left, right) {
        if(other instanceof EnumeratedNativeType)
            return this.transpileAdd(transpiler, other.derivedFrom, tryReverse, left, right);
        else if(tryReverse)
            return other.transpileAdd(transpiler, this, false, right, left);
        else
            throw new SyntaxError("Cannot transpile add " + this.name + " to " + other.name);
    }

    checkSubtract(context, other) {
        if(other instanceof EnumeratedNativeType)
            return this.checkSubtract(context, other.derivedFrom);
        else
            throw new SyntaxError("Cannot substract " + this.name + " from " + other.name);
    }

    declareSubtract(transpiler, other, left, right) {
        if(other instanceof EnumeratedNativeType)
            return this.declareSubtract(transpiler, other.derivedFrom, left, right);
        else
            throw new SyntaxError("Cannot declare substract " + this.name + " to " + other.name);
    }

    transpileSubtract(transpiler, other, left, right) {
        if(other instanceof EnumeratedNativeType)
            return this.transpileSubtract(transpiler, other.derivedFrom, left, right);
        else
            throw new SyntaxError("Cannot transpile substract " + this.name + " to " + other.name);
    }

    checkDivide(context, other) {
        if(other instanceof EnumeratedNativeType)
            return this.checkDivide(context, other.derivedFrom);
        else
            throw new SyntaxError("Cannot divide " + this.name + " with " + other.name);
    }

    declareDivide(transpiler, other, left, right) {
        if(other instanceof EnumeratedNativeType)
            return this.declareDivide(transpiler, other.derivedFrom, left, right);
        else
            throw new SyntaxError("Cannot declare divide " + this.name + " to " + other.name);
    }

    transpileDivide(transpiler, other, left, right) {
        if(other instanceof EnumeratedNativeType)
            return this.transpileDivide(transpiler, other.derivedFrom, left, right);
        else
            throw new SyntaxError("Cannot transpile divide " + this.name + " to " + other.name);
    }

    checkIntDivide(context, other) {
        if(other instanceof EnumeratedNativeType)
            return this.checkIntDivide(context, other.derivedFrom);
        else
            throw new SyntaxError("Cannot divide " + this.name + " with " + other.name);
    }

    declareIntDivide(transpiler, other, left, right) {
        if(other instanceof EnumeratedNativeType)
            return this.declareIntDivide(transpiler, other.derivedFrom, left, right);
        else
            throw new SyntaxError("Cannot declare int divide " + this.name + " to " + other.name);
    }

    transpileIntDivide(transpiler, other, left, right) {
        if(other instanceof EnumeratedNativeType)
            return this.transpileIntDivide(transpiler, other.derivedFrom, left, right);
        else
            throw new SyntaxError("Cannot transpile int divide " + this.name + " to " + other.name);
    }

    checkModulo(context, other) {
        if(other instanceof EnumeratedNativeType)
            return this.checkModulo(context, other.derivedFrom);
        else
            throw new SyntaxError("Cannot modulo " + this.name + " with " + other.name);
    }

    declareModulo(transpiler, other, left, right) {
        if(other instanceof EnumeratedNativeType)
            return this.declareModulo(transpiler, other.derivedFrom, left, right);
        else
            throw new SyntaxError("Cannot declare modulo " + this.name + " to " + other.name);
    }

    transpileModulo(transpiler, other, left, right) {
        if(other instanceof EnumeratedNativeType)
            return this.transpileModulo(transpiler, other.derivedFrom, left, right);
        else
            throw new SyntaxError("Cannot transpile modulo " + this.name + " to " + other.name);
    }

    checkMultiply(context, other, tryReverse) {
        if(other instanceof EnumeratedNativeType)
            return this.checkMultiply(context, other.derivedFrom, tryReverse);
        else if(tryReverse)
            return other.checkMultiply(context, this, false);
        else
            throw new SyntaxError("Cannot multiply " + this.name + " with " + other.name);
    }

    declareMultiply(transpiler, other, tryReverse, left, right) {
        if(other instanceof EnumeratedNativeType)
            return this.declareMultiply(transpiler, other.derivedFrom, tryReverse, left, right);
        else if(tryReverse)
            return other.declareMultiply(transpiler, this, false, right, left);
        else
            throw new SyntaxError("Cannot declare multiply " + this.name + " to " + other.name);
    }

    transpileMultiply(transpiler, other, tryReverse, left, right) {
        if(other instanceof EnumeratedNativeType)
            return this.transpileMultiply(transpiler, other.derivedFrom, tryReverse, left, right);
        else if(tryReverse)
            return other.transpileMultiply(transpiler, this, false, right, left);
        else
            throw new SyntaxError("Cannot transpile multiply " + this.name + " to " + other.name);
    }

    checkMinus(context) {
        if(this instanceof EnumeratedNativeType)
            return this.derivedFrom.checkMinus(context);
        else
            throw new SyntaxError("Cannot negate " + this.name);
    }

    declareMinus(transpiler, value) {
        if(this instanceof EnumeratedNativeType)
            return this.derivedFrom.declareMinus(transpiler, value);
        else
            throw new SyntaxError("Cannot declare negate " + this.name);
    }

    transpileMinus(transpiler, value) {
        if(this instanceof EnumeratedNativeType)
            return this.derivedFrom.transpileMinus(transpiler, value);
        else
            throw new SyntaxError("Cannot transpile negate of " + this.name );
    }

    checkCompare(context, section, other) {
        if(other instanceof EnumeratedNativeType)
            return this.checkCompare(context, section, other.derivedFrom);
        else {
            context.problemListener.reportError(section, "Cannot compare " + this.name + " and " + other.name);
            return BooleanType.instance;
        }
    }

    declareCompare(transpiler, other) {
        if(other instanceof EnumeratedNativeType)
            return this.declareCompare(transpiler, other.derivedFrom);
        else
            throw new SyntaxError(this.name + " cannot declare compare " + other.name);
    }

    transpileCompare(transpiler, other, operator, left, right) {
        if(other instanceof EnumeratedNativeType)
            return this.transpileCompare(transpiler, other.derivedFrom, operator, left, right);
        else
            throw new SyntaxError(this.name + " cannot transpile compare " + other.name);
    }

    checkContains(context, section, other) {
        if(other instanceof EnumeratedNativeType)
            return this.checkContains(context, section, other.derivedFrom);
        else {
            context.problemListener.reportError(section, this.name + " cannot contain " + other.name);
            return BooleanType.instance;
        }
    }

    declareContains(transpiler, other, container, item) {
        if(other instanceof EnumeratedNativeType)
            return this.declareContains(transpiler, other.derivedFrom, container, item);
        else
            throw new SyntaxError(this.name + " cannot declare contain " + other.name);
    }

    transpileContains(transpiler, other, container, item) {
        if(other instanceof EnumeratedNativeType)
            return this.transpileContains(transpiler, other.derivedFrom, container, item);
        else
            throw new SyntaxError(this.name + " cannot transpile contain " + other.name);
    }

    checkHasAllOrAny(context, other) {
        if(other instanceof EnumeratedNativeType)
            return this.checkHasAllOrAny(context, other.derivedFrom);
        else
            throw new SyntaxError(this.name + " cannot have all or any " + other.name);
    }

    declareHasAllOrAny(transpiler, other, container, item) {
        if(other instanceof EnumeratedNativeType)
            return this.declareHasAllOrAny(transpiler, other.derivedFrom, container, item);
        else
            throw new SyntaxError(this.name + " cannot declare have all or any " + other.name);
    }

    transpileHasAllValue(transpiler, other, container, item) {
        if(other instanceof EnumeratedNativeType)
            return this.transpileHasAllValue(transpiler, other.derivedFrom, container, item);
        else
            throw new SyntaxError(this.name + " cannot transpile has all " + other.name);
    }

    transpileHasAnyValue(transpiler, other, container, item) {
        if(other instanceof EnumeratedNativeType)
            return this.transpileHasAnyValue(transpiler, other.derivedFrom, container, item);
        else
            throw new SyntaxError(this.name + " cannot transpile has any " + other.name);
    }

    transpileHasAllPredicate(transpiler, other, container, predicate) {
        if(other instanceof EnumeratedNativeType)
            return this.transpileHasAllPredicate(transpiler, other.derivedFrom, container, predicate);
        else
            throw new SyntaxError(this.name + " cannot transpile has all " + other.name);
    }

    transpileHasAnyPredicate(transpiler, other, container, predicate) {
        if(other instanceof EnumeratedNativeType)
            return this.transpileHasAnyPredicate(transpiler, other.derivedFrom, container, predicate);
        else
            throw new SyntaxError(this.name + " cannot transpile has any " + other.name);
    }

    checkItem(context, itemType, section) {
        if(itemType instanceof EnumeratedNativeType)
            return this.checkItem(context, itemType.derivedFrom, section);
        else {
            context.problemListener.reportError(section, "Invalid [] operator for: " + this.name);
            return VoidType.instance;
        }
    }

    declareItem(transpiler, itemType, item) {
        if(itemType instanceof EnumeratedNativeType)
            return this.declareItem(transpiler, itemType.derivedFrom, item);
        else
            throw new SyntaxError("Cannot declare item from: " + this.name);
    }

    transpileItem(transpiler, itemType, item) {
        if(itemType instanceof EnumeratedNativeType)
            return this.transpileItem(transpiler, itemType.derivedFrom);
        else
            throw new SyntaxError("Cannot transpile item from: " + this.name);
    }

    checkMember(context, section, id) {
        if("text" === id.name)
            return TextType.instance;
        else if("json" === id.name)
            return TextType.instance;
        else {
            context.problemListener.reportUnknownAttribute(section, id.name);
            return VoidType.instance;
        }
    }

    checkStaticMember(context, section, id) {
        context.problemListener.reportUnknownAttribute(section, id.name);
        return VoidType.instance;
    }

    declareMember(transpiler, section, id) {
        switch(id.name) {
            case "text":
                break;
            case "json":
                transpiler.require(convertToJson);
                transpiler.require(convertToJsonNode);
                break;
            default:
                transpiler.context.problemListener.reportUnknownAttribute(section, id.name);
        }
    }

    transpileMember(transpiler, id) {
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

    checkSlice(context) {
        throw new SyntaxError("Cannot slice " + this.name);
    }

    declareSlice(transpiler, first, last) {
        throw new SyntaxError("Cannot declare slice for " + this.name);
    }

    transpileSlice(transpiler, first, last) {
        throw new SyntaxError("Cannot transpile slice for " + this.name);
    }

    checkIterator(context, source) {
        context.problemListener.reportCannotIterate(source);
        return VoidType.instance;
    }

    declareIterator(transpiler, name, expression) {
        throw new SyntaxError("Cannot declare iterate over " + this.name);
    }

    transpileIterator(transpiler, name, expression) {
        throw new SyntaxError("Cannot transpile iterate over " + this.name);
    }

    checkAssignableFrom(context, section, other) {
        if (!this.isAssignableFrom(context, other))
            context.problemListener.reportIncompatibleTypes(section, this, other);
    }

    checkRange(context, other) {
        throw new SyntaxError("Cannot create range of " + this.name + " and " + other.name);
    }

    declareRange(context, other) {
        throw new SyntaxError("Cannot declare range of " + this.name + " and " + other.name);
    }

    transpileRange(transpiler, first, last) {
        throw new SyntaxError("Cannot transpile range of " + this.name);
    }

    checkAnd(context, other) {
        throw new SyntaxError("Cannot logically combine " + this.name + " and " + other.name);
    }

    checkOr(context, other) {
        throw new SyntaxError("Cannot logically combine " + this.name + " or " + other.name);
    }

    checkNot(context) {
        throw new SyntaxError("Cannot logically negate " + this.name);
    }

    getMember(context, name) {
        throw new SyntaxError("Cannot read member from " + this.name);
    }

    readJSONValue(context, node, parts) {
        throw new Error("Unsupported!")
    }

    declareSorted(transpiler, key) {
        throw new Error("Cannot declare sorted from " + this.name);
    }

    getSortedComparator(context, key, desc) {
        throw new Error("Unsupported for type " + this.name);
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        if(value == null)
            return NullValue.instance;
        else
            throw new Error("Unsupported for type " + this.name);
    }

    toDialect(writer) {
        writer.append(this.name);
    }

    transpileJsxCode(transpiler, expression) {
        expression.transpile(transpiler);
    }
}

