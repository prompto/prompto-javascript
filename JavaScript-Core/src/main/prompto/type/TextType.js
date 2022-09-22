import NativeType from './NativeType.ts'
import {CharacterType, IntegerType, BooleanType, DecimalType, VoidType} from './index.ts'
import { TextValue } from '../value'
import { Identifier } from '../grammar'
import { TypeFamily } from '../store'
import { isAText } from '../utils'
import { StartsWithMethodDeclaration, EndsWithMethodDeclaration, IndexOfMethodDeclaration,
    ReplaceMethodDeclaration, ReplaceAllMethodDeclaration, TrimMethodDeclaration, SplitMethodDeclaration,
    ToCapitalizedMethodDeclaration, ToLowerCaseMethodDeclaration, ToUpperCaseMethodDeclaration } from '../../../main/prompto/builtins/TextTypeBuiltins.ts'

export default class TextType extends NativeType {

    constructor() {
        super(new Identifier("Text"));
        this.family = TypeFamily.TEXT;
    }

    isAssignableFrom(context, other) {
        return super.isAssignableFrom(context, other)
            || (other == CharacterType.instance);
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(isAText);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append('"Text"');
    }

    checkAdd(context, other, tryReverse) {
        // can add anything to text
        return this;
    }

    declareAdd(transpiler, other, tryReverse, left, right) {
        left.declare(transpiler);
        right.declare(transpiler);
    }

    transpileAdd(transpiler, other, tryReverse, left, right) {
        // can add anything to text
        left.transpile(transpiler);
        transpiler.append(" + ");
        // fix js precedence issue with -3.0.toDecimalString()
        if(other === DecimalType.instance) {
            transpiler.append("(");
            right.transpile(transpiler);
            transpiler.append(").toDecimalString()");
        } else
            right.transpile(transpiler);
    }

    checkMultiply(context, other, tryReverse) {
        if(other instanceof IntegerType) {
            return TextType.instance;
        }
        return super.checkMultiply(context, other, tryReverse);
    }

    declareMultiply(transpiler, other, tryReverse, left, right) {
        if (other === IntegerType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareMultiply(transpiler, other, tryReverse, left, right);
    }

    transpileMultiply(transpiler, other, tryReverse, left, right) {
        if (other === IntegerType.instance) {
            left.transpile(transpiler);
            transpiler.append(".repeat(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return super.transpileMultiply(transpiler, other, tryReverse, left, right);
    }

    checkCompare(context, section, other) {
        if(other instanceof TextType || other instanceof CharacterType) {
            return BooleanType.instance;
        }
        return super.checkCompare(context, section, other);
    }

    declareCompare(context, other) {
        // nothing to do
    }

    transpileCompare(transpiler, other, operator, left, right) {
        left.transpile(transpiler);
        transpiler.append(" ").append(operator.toString()).append(" ");
        right.transpile(transpiler);
    }

    checkItem(context, itemType, section) {
        if(itemType === IntegerType.instance) {
            return CharacterType.instance;
        } else {
            context.problemListener.reportIllegalItemType(section, itemType, [IntegerType.instance]);
            return VoidType.instance;
        }
    }

    declareItem(transpiler, itemType, item) {
        // nothing to do
    }

    transpileItem(transpiler, itemType, item) {
        transpiler.append("[");
        item.transpile(transpiler);
        transpiler.append("-1]");
    }

    checkMember(context, section, id) {
       if ("count" === id.name) {
           return IntegerType.instance;
       } else {
           return super.checkMember(context, section, id);
       }
    }

    declareMember(transpiler, section, id) {
        if ("count" !== id.name) {
            super.declareMember(transpiler, section, id);
        }
    }

    transpileMember(transpiler, id) {
        if ("count" === id.name) {
            transpiler.append("length");
        } else {
            super.transpileMember(transpiler, id);
        }
    }

    checkContains(context, section, other) {
        if(other instanceof TextType || other instanceof CharacterType) {
            return BooleanType.instance;
        }
        return super.checkContains(context, section, other);
    }

    declareContains(transpiler, other, container, item) {
        container.declare(transpiler);
        item.declare(transpiler);
    }

    transpileContains(transpiler, other, container, item) {
        container.transpile(transpiler);
        transpiler.append(".includes(");
        item.transpile(transpiler);
        transpiler.append(")");
    }

    checkHasAllOrAny(context, other) {
        return BooleanType.instance;
    }

    declareHasAllOrAny(transpiler, other, container, items) {
        container.declare(transpiler);
        items.declare(transpiler);
    }

    transpileHasAllValue(transpiler, other, container, items) {
        container.transpile(transpiler);
        transpiler.append(".hasAll(");
        items.transpile(transpiler);
        transpiler.append(")");
    }

    transpileHasAnyValue(transpiler, other, container, items) {
        container.transpile(transpiler);
        transpiler.append(".hasAny(");
        items.transpile(transpiler);
        transpiler.append(")");
    }

    checkSlice(context) {
        return this;
    }

    declareSlice(transpiler, first, last) {
        if(first) {
            first.declare(transpiler);
        }
        if(last) {
            last.declare(transpiler);
        }
    }

    checkIterator(context, source) {
        return CharacterType.instance;
    }

    transpileSlice(transpiler, first, last) {
        transpiler.append(".slice1Based(");
        if(first) {
            first.transpile(transpiler);
        } else
            transpiler.append("null");
        if(last) {
            transpiler.append(",");
            last.transpile(transpiler);
        }
        transpiler.append(")");
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        if (typeof(value) == 'string') {
            return new TextValue(value);
        } else {
            return super.convertJavaScriptValueToPromptoValue(context, value, returnType);
        }
    }

    getMemberMethods(context, id) {
        switch (id.name) {
            case "startsWith":
                return [new StartsWithMethodDeclaration()];
            case "endsWith":
                return [new EndsWithMethodDeclaration()];
            case "toLowerCase":
                return [new ToLowerCaseMethodDeclaration()];
            case "toUpperCase":
                return [new ToUpperCaseMethodDeclaration()];
            case "toCapitalized":
                return [new ToCapitalizedMethodDeclaration()];
            case "trim":
                return [new TrimMethodDeclaration()];
            case "replace":
                return [new ReplaceMethodDeclaration()];
            case "replaceAll":
                return [new ReplaceAllMethodDeclaration()];
            case "split":
                return [new SplitMethodDeclaration()];
            case "indexOf":
                return [new IndexOfMethodDeclaration()];
            default:
                return super.getMemberMethods(context, id);
        }
    }
}

TextType.instance = new TextType();

