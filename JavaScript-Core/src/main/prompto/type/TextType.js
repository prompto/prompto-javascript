var BuiltInMethodDeclaration = null;
var NativeType = require("./NativeType").NativeType;
var Identifier = require("../grammar/Identifier").Identifier;
var CharacterType = null;
var ListType = null;
var IntegerType = require("./IntegerType").IntegerType;
var BooleanType = require("./BooleanType").BooleanType;
var AnyType = require("./AnyType").AnyType;
var Identifier = require("../grammar/Identifier").Identifier;
var TextValue = null; // circular dependency
var BooleanValue = require("../value/BooleanValue").BooleanValue;
var CategoryArgument = require("../argument/CategoryArgument").CategoryArgument;
var TextLiteral = null;
var ListValue = null;

exports.resolve = function() {
	CharacterType = require("./CharacterType").CharacterType;
    ListType = require("./ListType").ListType;
    TextLiteral = require("../literal/TextLiteral").TextLiteral;
    ListValue = require("../value/ListValue").ListValue;
	TextValue = require("../value/TextValue").TextValue;
    resolveBuiltInMethodDeclaration();
}

function TextType()  {
	NativeType.call(this, new Identifier("Text"));
	return this;
}

TextType.prototype = Object.create(NativeType.prototype);
TextType.prototype.constructor = TextType;

TextType.instance = new TextType();

TextType.prototype.isAssignableFrom = function(context, other) {
	return NativeType.prototype.isAssignableFrom.call(this, context, other)
        || (other == CharacterType.instance);
};

TextType.prototype.checkAdd = function(context, other, tryReverse) {
	// can add anything to text
	return this;
};

TextType.prototype.transpileAdd = function(transpiler, other, tryReverse, left, right) {
    // can add anything to text
    left.transpile(transpiler);
    transpiler.append(" + ");
    right.transpile(transpiler);
};

TextType.prototype.checkMultiply = function(context, other, tryReverse) {
	if(other instanceof IntegerType) {
		return TextType.instance;
	}
	return NativeType.prototype.checkMultiply.call(this, context, other, tryReverse);
};

TextType.prototype.checkCompare = function(context, other) {
	if(other instanceof TextType || other instanceof CharacterType) {
		return BooleanType.instance;
	}
	return NativeType.prototype.checkCompare.call(this, context, other);
};

TextType.prototype.checkItem = function(context, other) {
	if(other==IntegerType.instance) {
		return CharacterType.instance;
	} else {
		return NativeType.prototype.checkItem.call(this, context, other);
	}
};

TextType.prototype.checkMember = function(context, name) {
   if ("count"==name) {
	   return IntegerType.instance;
   } else {
	   return NativeType.prototype.checkMember.call(this, context, name);
   }
};

TextType.prototype.checkContains = function(context, other) {
	if(other instanceof TextType || other instanceof CharacterType) {
		return BooleanType.instance;
	}
	return NativeType.prototype.checkContains.call(this, context, other);
};

TextType.prototype.checkContainsAllOrAny = function(context, other) {
	return BooleanType.instance;
};

TextType.prototype.checkSlice = function(context) {
	return this;
};

TextType.prototype.convertJavaScriptValueToPromptoValue = function(context, value, returnType) {
	if (typeof(value) == 'string') {
		return new TextValue(value);
	} else {
		return value; // TODO for now
	}
}

TextType.prototype.getMemberMethods = function(context, name) {
    switch (name) {
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
        default:
            return NativeType.prototype.getMemberMethods.call(context, name);
    }
};

function ToLowerCaseMethodDeclaration() {
    BuiltInMethodDeclaration.call(this, "toLowerCase");
    return this;
}

function ToUpperCaseMethodDeclaration() {
    BuiltInMethodDeclaration.call(this, "toUpperCase");
    return this;
}

function TrimMethodDeclaration() {
    BuiltInMethodDeclaration.call(this, "trim");
    return this;
}

function ToCapitalizedMethodDeclaration() {
    BuiltInMethodDeclaration.call(this, "toCapitalized");
    return this;
}

function SplitMethodDeclaration() {
    BuiltInMethodDeclaration.call(this, "split", new CategoryArgument(TextType.instance, new Identifier("separator"), new TextLiteral('" "')));
    return this;
}

function StartsWithMethodDeclaration() {
    BuiltInMethodDeclaration.call(this, "startsWith", new CategoryArgument(TextType.instance, new Identifier("value")));
    return this;
}

function EndsWithMethodDeclaration() {
    BuiltInMethodDeclaration.call(this, "endsWith", new CategoryArgument(TextType.instance, new Identifier("value")));
    return this;
}

function ReplaceMethodDeclaration() {
    BuiltInMethodDeclaration.call(this, "replace",
        new CategoryArgument(TextType.instance, new Identifier("toReplace")),
        new CategoryArgument(TextType.instance, new Identifier("replaceWith")));
    return this;
}

function ReplaceAllMethodDeclaration() {
    BuiltInMethodDeclaration.call(this, "replaceAll",
        new CategoryArgument(TextType.instance, new Identifier("toReplace")),
        new CategoryArgument(TextType.instance, new Identifier("replaceWith")));
    return this;
}

function resolveBuiltInMethodDeclaration() {
    BuiltInMethodDeclaration = require("../declaration/BuiltInMethodDeclaration").BuiltInMethodDeclaration;

    ToLowerCaseMethodDeclaration.prototype = Object.create(BuiltInMethodDeclaration.prototype);
    ToLowerCaseMethodDeclaration.prototype.constructor = ToLowerCaseMethodDeclaration;

    ToLowerCaseMethodDeclaration.prototype.interpret = function(context) {
        var value = this.getValue(context).getStorableData();
        return new TextValue(value.toLowerCase());
    };

    ToLowerCaseMethodDeclaration.prototype.check = function(context) {
        return TextType.instance;
    };

    ToUpperCaseMethodDeclaration.prototype = Object.create(BuiltInMethodDeclaration.prototype);
    ToUpperCaseMethodDeclaration.prototype.constructor = ToUpperCaseMethodDeclaration;

    ToUpperCaseMethodDeclaration.prototype.interpret = function(context) {
        var value = this.getValue(context).getStorableData();
        return new TextValue(value.toUpperCase());
    };

    ToUpperCaseMethodDeclaration.prototype.check = function(context) {
        return TextType.instance;
    };

    ToCapitalizedMethodDeclaration.prototype = Object.create(BuiltInMethodDeclaration.prototype);
    ToCapitalizedMethodDeclaration.prototype.constructor = ToCapitalizedMethodDeclaration;

    ToCapitalizedMethodDeclaration.prototype.interpret = function(context) {
        var value = this.getValue(context).getStorableData();
        value = value.replace( /(^|\s)([a-z])/g , function(m, p1, p2){ return p1 + p2.toUpperCase(); } );
        return new TextValue(value);
    };

    ToCapitalizedMethodDeclaration.prototype.check = function(context) {
        return TextType.instance;
    };

    TrimMethodDeclaration.prototype = Object.create(BuiltInMethodDeclaration.prototype);
    TrimMethodDeclaration.prototype.constructor = TrimMethodDeclaration;

    TrimMethodDeclaration.prototype.interpret = function(context) {
        var value = this.getValue(context).getStorableData();
        value = value.trim();
        return new TextValue(value);
    };

    TrimMethodDeclaration.prototype.check = function(context) {
        return TextType.instance;
    };

    ReplaceMethodDeclaration.prototype = Object.create(BuiltInMethodDeclaration.prototype);
    ReplaceMethodDeclaration.prototype.constructor = ReplaceMethodDeclaration;

    ReplaceMethodDeclaration.prototype.interpret = function(context) {
        var value = this.getValue(context).getStorableData();
        var toReplace = context.getValue(new Identifier("toReplace")).getStorableData();
        var replaceWith = context.getValue(new Identifier("replaceWith")).getStorableData();
        value = value.replace(toReplace, replaceWith);
        return new TextValue(value);
    };

    ReplaceMethodDeclaration.prototype.check = function(context) {
        return TextType.instance;
    };


    ReplaceAllMethodDeclaration.prototype = Object.create(BuiltInMethodDeclaration.prototype);
    ReplaceAllMethodDeclaration.prototype.constructor = ReplaceAllMethodDeclaration;

    ReplaceAllMethodDeclaration.prototype.interpret = function(context) {
        var value = this.getValue(context).getStorableData();
        var toReplace = context.getValue(new Identifier("toReplace")).getStorableData();
        var replaceWith = context.getValue(new Identifier("replaceWith")).getStorableData();
        value = value.replace(new RegExp(toReplace, 'g'), replaceWith);
        return new TextValue(value);
    };

    ReplaceAllMethodDeclaration.prototype.check = function(context) {
        return TextType.instance;
    };

    SplitMethodDeclaration.prototype = Object.create(BuiltInMethodDeclaration.prototype);
    SplitMethodDeclaration.prototype.constructor = SplitMethodDeclaration;

    SplitMethodDeclaration.prototype.interpret = function(context) {
        var value = this.getValue(context).getStorableData();
        var sep = context.getValue(new Identifier("separator")).getStorableData();
        var list = value.split(sep);
        var texts = list.map(function(s) { return new TextValue(s); });
        return new ListValue(TextType.instance, texts);
    };

    SplitMethodDeclaration.prototype.check = function(context) {
        return new ListType(TextType.instance);
    };

    StartsWithMethodDeclaration.prototype = Object.create(BuiltInMethodDeclaration.prototype);
    StartsWithMethodDeclaration.prototype.constructor = StartsWithMethodDeclaration;

    StartsWithMethodDeclaration.prototype.interpret = function(context) {
        var value = this.getValue(context).getStorableData();
        var find = context.getValue(new Identifier("value")).getStorableData();
        var startsWith = value.indexOf(find)===0;
        return BooleanValue.ValueOf(startsWith);
    };

    StartsWithMethodDeclaration.prototype.check = function(context) {
        return BooleanType.instance;
    };

    EndsWithMethodDeclaration.prototype = Object.create(BuiltInMethodDeclaration.prototype);
    EndsWithMethodDeclaration.prototype.constructor = EndsWithMethodDeclaration;

    EndsWithMethodDeclaration.prototype.interpret = function(context) {
        var value = this.getValue(context).getStorableData();
        var find = context.getValue(new Identifier("value")).getStorableData();
        var endsWith = value.indexOf(find)===value.length-find.length;
        return BooleanValue.ValueOf(endsWith);
    };

    EndsWithMethodDeclaration.prototype.check = function(context) {
        return BooleanType.instance;
    };

}

exports.TextType = TextType;
