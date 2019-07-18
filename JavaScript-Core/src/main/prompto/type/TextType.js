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
var IntegerValue = require("../value/IntegerValue").IntegerValue;
var BooleanValue = require("../value/BooleanValue").BooleanValue;
var CategoryArgument = require("../argument/CategoryArgument").CategoryArgument;
var TextLiteral = null;
var ListValue = null;
var List = require("../intrinsic/List").List;
var TypeFamily = require("../store/TypeFamily").TypeFamily;

exports.resolve = function() {
	CharacterType = require("./CharacterType").CharacterType;
    ListType = require("./ListType").ListType;
    TextLiteral = require("../literal/TextLiteral").TextLiteral;
    ListValue = require("../value/ListValue").ListValue;
	TextValue = require("../value/TextValue").TextValue;
    resolveBuiltInMethodDeclaration();
};

function TextType()  {
	NativeType.call(this, new Identifier("Text"));
	this.family = TypeFamily.TEXT;
	return this;
}

TextType.prototype = Object.create(NativeType.prototype);
TextType.prototype.constructor = TextType;

TextType.instance = new TextType();

TextType.prototype.isAssignableFrom = function(context, other) {
	return NativeType.prototype.isAssignableFrom.call(this, context, other)
        || (other == CharacterType.instance);
};

TextType.prototype.declare = function(transpiler) {
    var isAText = require("../utils/Utils").isAText;
    transpiler.require(isAText);
};



TextType.prototype.transpile = function(transpiler) {
    transpiler.append('"Text"');
};



TextType.prototype.checkAdd = function(context, other, tryReverse) {
	// can add anything to text
	return this;
};


TextType.prototype.declareAdd = function(transpiler, other, tryReverse, left, right) {
    left.declare(transpiler);
    right.declare(transpiler);
};


TextType.prototype.transpileAdd = function(transpiler, other, tryReverse, left, right) {
    var DecimalType = require("./DecimalType").DecimalType;
    // can add anything to text
    left.transpile(transpiler);
    transpiler.append(" + ");
    right.transpile(transpiler);
    if(other === DecimalType.instance)
        transpiler.append(".toDecimalString()");
};

TextType.prototype.checkMultiply = function(context, other, tryReverse) {
	if(other instanceof IntegerType) {
		return TextType.instance;
	}
	return NativeType.prototype.checkMultiply.call(this, context, other, tryReverse);
};


TextType.prototype.declareMultiply = function(transpiler, other, tryReverse, left, right) {
    if (other === IntegerType.instance) {
        left.declare(transpiler);
        right.declare(transpiler);
    } else
        return NativeType.prototype.declareMultiply.call(this, transpiler, other, tryReverse, left, right);
};


TextType.prototype.transpileMultiply = function(transpiler, other, tryReverse, left, right) {
    if (other === IntegerType.instance) {
        left.transpile(transpiler);
        transpiler.append(".repeat(");
        right.transpile(transpiler);
        transpiler.append(")");
    } else
        return NativeType.prototype.transpileMultiply.call(this, transpiler, other, tryReverse, left, right);
};



TextType.prototype.checkCompare = function(context, other, section) {
	if(other instanceof TextType || other instanceof CharacterType) {
		return BooleanType.instance;
	}
	return NativeType.prototype.checkCompare.call(this, context, other, section);
};


TextType.prototype.declareCompare = function(context, other) {
    // nothing to do
};


TextType.prototype.transpileCompare = function(transpiler, other, operator, left, right) {
    left.transpile(transpiler);
    transpiler.append(" ").append(operator.toString()).append(" ");
    right.transpile(transpiler);
};


TextType.prototype.checkItem = function(context, other, expression) {
	if(other==IntegerType.instance) {
		return CharacterType.instance;
	} else {
		return NativeType.prototype.checkItem.call(this, context, other, expression);
	}
};

TextType.prototype.declareItem = function(transpiler, itemType, item) {
    // nothing to do
};


TextType.prototype.transpileItem = function(transpiler, itemType, item) {
    transpiler.append("[");
    item.transpile(transpiler);
    transpiler.append("-1]");
};


TextType.prototype.checkMember = function(context, section, name) {
   if ("count"==name) {
	   return IntegerType.instance;
   } else {
	   return NativeType.prototype.checkMember.call(this, context, section, name);
   }
};


TextType.prototype.declareMember = function(transpiler, name) {
    if ("count"!==name) {
        NativeType.prototype.declareMember.call(this, transpiler, name);
    }
};


TextType.prototype.transpileMember = function(transpiler, name) {
    if ("count"==name) {
        transpiler.append("length");
    } else {
        NativeType.prototype.transpileMember.call(this, transpiler, name);
    }
};

TextType.prototype.checkContains = function(context, other) {
	if(other instanceof TextType || other instanceof CharacterType) {
		return BooleanType.instance;
	}
	return NativeType.prototype.checkContains.call(this, context, other);
};


TextType.prototype.declareContains = function(transpiler, other, container, item) {
    container.declare(transpiler);
    item.declare(transpiler);
};


TextType.prototype.transpileContains = function(transpiler, other, container, item) {
    container.transpile(transpiler);
    transpiler.append(".includes(");
    item.transpile(transpiler);
    transpiler.append(")");
};


TextType.prototype.checkContainsAllOrAny = function(context, other) {
	return BooleanType.instance;
};


TextType.prototype.declareContainsAllOrAny = function(transpiler, other, container, items) {
    container.declare(transpiler);
    items.declare(transpiler);
};


TextType.prototype.transpileContainsAll = function(transpiler, other, container, items) {
    container.transpile(transpiler);
    transpiler.append(".hasAll(");
    items.transpile(transpiler);
    transpiler.append(")");
};


TextType.prototype.transpileContainsAny = function(transpiler, other, container, items) {
    container.transpile(transpiler);
    transpiler.append(".hasAny(");
    items.transpile(transpiler);
    transpiler.append(")");
};


TextType.prototype.checkSlice = function(context) {
	return this;
};


TextType.prototype.declareSlice = function(transpiler, first, last) {
    if(first) {
        first.declare(transpiler);
    }
    if(last) {
        last.declare(transpiler);
    }
};


TextType.prototype.transpileSlice = function(transpiler, first, last) {
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
        case "indexOf":
            return [new IndexOfMethodDeclaration()];
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

function IndexOfMethodDeclaration() {
    BuiltInMethodDeclaration.call(this, "indexOf", new CategoryArgument(TextType.instance, new Identifier("value")));
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

    ToLowerCaseMethodDeclaration.prototype.transpileCall = function(transpiler, assignments) {
        transpiler.append("toLowerCase()");
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

    ToUpperCaseMethodDeclaration.prototype.transpileCall = function(transpiler, assignments) {
        transpiler.append("toUpperCase()");
    };

    ToCapitalizedMethodDeclaration.prototype = Object.create(BuiltInMethodDeclaration.prototype);
    ToCapitalizedMethodDeclaration.prototype.constructor = ToCapitalizedMethodDeclaration;

    ToCapitalizedMethodDeclaration.prototype.interpret = function(context) {
        var value = this.getValue(context).getStorableData();
        value = value.replace( /(^|\s)([a-z])/g , function(m, p1, p2){ return p1 + p2.toUpperCase(); } );
        return new TextValue(value);
    };

    ToCapitalizedMethodDeclaration.prototype.transpileCall = function(transpiler, assignments) {
        transpiler.append("replace( /(^|\\s)([a-z])/g , function(m, p1, p2){ return p1 + p2.toUpperCase(); } )");
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

    TrimMethodDeclaration.prototype.transpileCall = function(transpiler, assignments) {
        transpiler.append("trim()");
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

    ReplaceMethodDeclaration.prototype.transpileCall = function(transpiler, assignments) {
        transpiler.append("replace(");
        assignments.find("toReplace").transpile(transpiler);
        transpiler.append(",");
        assignments.find("replaceWith").transpile(transpiler);
        transpiler.append(")");
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

    ReplaceAllMethodDeclaration.prototype.transpileCall = function(transpiler, assignments) {
        transpiler.append("replace(new RegExp(");
        assignments.find("toReplace").transpile(transpiler);
        transpiler.append(", 'g'),");
        assignments.find("replaceWith").transpile(transpiler);
        transpiler.append(")");
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

    SplitMethodDeclaration.prototype.declareCall = function(transpiler) {
        transpiler.require(List);
    };

    SplitMethodDeclaration.prototype.transpileCall = function(transpiler, assignments) {
        transpiler.append("splitToList(");
        if(assignments)
            assignments[0].transpile(transpiler);
        else
            transpiler.append("' '"); // default
        transpiler.append(")");
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

    StartsWithMethodDeclaration.prototype.transpileCall = function(transpiler, assignments) {
        transpiler.append("startsWith(");
        assignments[0].transpile(transpiler);
        transpiler.append(")");
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

    EndsWithMethodDeclaration.prototype.transpileCall = function(transpiler, assignments) {
        transpiler.append("endsWith(");
        assignments[0].transpile(transpiler);
        transpiler.append(")");
    };

    IndexOfMethodDeclaration.prototype = Object.create(BuiltInMethodDeclaration.prototype);
    IndexOfMethodDeclaration.prototype.constructor = IndexOfMethodDeclaration;

    IndexOfMethodDeclaration.prototype.interpret = function(context) {
        var value = this.getValue(context).getStorableData();
        var find = context.getValue(new Identifier("value")).getStorableData();
        var index = value.indexOf(find);
        return new IntegerValue(index + 1);
    };

    IndexOfMethodDeclaration.prototype.check = function(context) {
        return IntegerType.instance;
    };

    IndexOfMethodDeclaration.prototype.transpileCall = function(transpiler, assignments) {
        transpiler.append("indexOf1Based(");
        assignments[0].transpile(transpiler);
        transpiler.append(")");
    };
}

exports.TextType = TextType;
