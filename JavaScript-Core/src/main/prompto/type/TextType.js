var NativeType = require("./NativeType").NativeType;
var Identifier = require("../grammar/Identifier").Identifier;
var CharacterType = null;
var IntegerType = require("./IntegerType").IntegerType;
var BooleanType = require("./BooleanType").BooleanType;
var TextValue = null; // circular dependency
var TypeFamily = require("../store/TypeFamily").TypeFamily;

exports.resolve = function() {
    CharacterType = require("./CharacterType").CharacterType;
    TextValue = require("../value/TextValue").TextValue;
 };

class TextType extends NativeType {

    constructor() {
        super(new Identifier("Text"));
        this.family = TypeFamily.TEXT;
    }

    isAssignableFrom(context, other) {
        return NativeType.prototype.isAssignableFrom.call(this, context, other)
            || (other == CharacterType.instance);
    }

    declare(transpiler) {
        var isAText = require("../utils/Utils").isAText;
        transpiler.require(isAText);
    }

    transpile(transpiler) {
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
        var DecimalType = require("./DecimalType").DecimalType;
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
        return NativeType.prototype.checkMultiply.call(this, context, other, tryReverse);
    }

    declareMultiply(transpiler, other, tryReverse, left, right) {
        if (other === IntegerType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return NativeType.prototype.declareMultiply.call(this, transpiler, other, tryReverse, left, right);
    }

    transpileMultiply(transpiler, other, tryReverse, left, right) {
        if (other === IntegerType.instance) {
            left.transpile(transpiler);
            transpiler.append(".repeat(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return NativeType.prototype.transpileMultiply.call(this, transpiler, other, tryReverse, left, right);
    }

    checkCompare(context, other, section) {
        if(other instanceof TextType || other instanceof CharacterType) {
            return BooleanType.instance;
        }
        return NativeType.prototype.checkCompare.call(this, context, other, section);
    }

    declareCompare(context, other) {
        // nothing to do
    }

    transpileCompare(transpiler, other, operator, left, right) {
        left.transpile(transpiler);
        transpiler.append(" ").append(operator.toString()).append(" ");
        right.transpile(transpiler);
    }

    checkItem(context, other, expression) {
        if(other==IntegerType.instance) {
            return CharacterType.instance;
        } else {
            return NativeType.prototype.checkItem.call(this, context, other, expression);
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

    checkMember(context, section, name) {
       if ("count"==name) {
           return IntegerType.instance;
       } else {
           return NativeType.prototype.checkMember.call(this, context, section, name);
       }
    }

    declareMember(transpiler, section, name) {
        if ("count"!==name) {
            super.declareMember(transpiler, section, name);
        }
    }

    transpileMember(transpiler, name) {
        if ("count"==name) {
            transpiler.append("length");
        } else {
            super.transpileMember(transpiler, name);
        }
    }

    checkContains(context, section, other) {
        if(other instanceof TextType || other instanceof CharacterType) {
            return BooleanType.instance;
        }
        return NativeType.prototype.checkContains.call(this, context, section, other);
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

    checkContainsAllOrAny(context, other) {
        return BooleanType.instance;
    }

    declareContainsAllOrAny(transpiler, other, container, items) {
        container.declare(transpiler);
        items.declare(transpiler);
    }

    transpileContainsAll(transpiler, other, container, items) {
        container.transpile(transpiler);
        transpiler.append(".hasAll(");
        items.transpile(transpiler);
        transpiler.append(")");
    }

    transpileContainsAny(transpiler, other, container, items) {
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
            return value; // TODO for now
        }
    }

    getMemberMethods(context, name) {
        switch (name) {
            case "startsWith":
                var StartsWithMethodDeclaration = require("../builtins/TextTypeBuiltins").StartsWithMethodDeclaration;
                return [new StartsWithMethodDeclaration()];
            case "endsWith":
                var EndsWithMethodDeclaration = require("../builtins/TextTypeBuiltins").EndsWithMethodDeclaration;
                return [new EndsWithMethodDeclaration()];
            case "toLowerCase":
                var ToLowerCaseMethodDeclaration = require("../builtins/TextTypeBuiltins").ToLowerCaseMethodDeclaration;
                return [new ToLowerCaseMethodDeclaration()];
            case "toUpperCase":
                var ToUpperCaseMethodDeclaration = require("../builtins/TextTypeBuiltins").ToUpperCaseMethodDeclaration;
                return [new ToUpperCaseMethodDeclaration()];
            case "toCapitalized":
                var ToCapitalizedMethodDeclaration = require("../builtins/TextTypeBuiltins").ToCapitalizedMethodDeclaration;
                return [new ToCapitalizedMethodDeclaration()];
            case "trim":
                var TrimMethodDeclaration = require("../builtins/TextTypeBuiltins").TrimMethodDeclaration;
                return [new TrimMethodDeclaration()];
            case "replace":
                var ReplaceMethodDeclaration = require("../builtins/TextTypeBuiltins").ReplaceMethodDeclaration;
                return [new ReplaceMethodDeclaration()];
            case "replaceAll":
                var ReplaceAllMethodDeclaration = require("../builtins/TextTypeBuiltins").ReplaceAllMethodDeclaration;
                return [new ReplaceAllMethodDeclaration()];
            case "split":
                var SplitMethodDeclaration = require("../builtins/TextTypeBuiltins").SplitMethodDeclaration;
                return [new SplitMethodDeclaration()];
            case "indexOf":
                var IndexOfMethodDeclaration = require("../builtins/TextTypeBuiltins").IndexOfMethodDeclaration;
                return [new IndexOfMethodDeclaration()];
            default:
                return NativeType.prototype.getMemberMethods.call(context, name);
        }
    }
}

TextType.instance = new TextType();

exports.TextType = TextType;
