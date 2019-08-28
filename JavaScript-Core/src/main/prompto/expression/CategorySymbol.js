var Symbol = require("./Symbol").Symbol;
var TextValue = require("../value/TextValue").TextValue;
var ConstructorExpression = require("./ConstructorExpression").ConstructorExpression;
var ArgumentList = require("../grammar/ArgumentList").ArgumentList;
var Argument = require("../grammar/Argument").Argument;
var AttributeParameter = require("../param/AttributeParameter").AttributeParameter;
var TextLiteral = require("../literal/TextLiteral").TextLiteral;
var Identifier = require("../grammar/Identifier").Identifier;


function CategorySymbol(id, args) {
	Symbol.call(this, id);
	this.args = args;
	this.instance = null;
	this.type = null;
	return this;
}

CategorySymbol.prototype = Object.create(Symbol.prototype);
CategorySymbol.prototype.constructor = CategorySymbol;

CategorySymbol.prototype.toDialect = function(writer) {
    writer.append(this.name);
    writer.append(" ");
    this.args.toDialect(writer);
};

CategorySymbol.prototype.getType = function(context) {
	return this.type;
};

CategorySymbol.prototype.toString = function() {
	if(this.args!=null) {
		return this.args.toString();
	} else {
		return this.type.name;
	}
};

CategorySymbol.prototype.check = function(context) {
	var cd = context.getRegisteredDeclaration(this.type.name);
	if(cd==null) {
		throw new SyntaxError("Unknown category " + this.type.name);
	}
	if(this.args!=null) {
        context = context.newLocalContext();
		this.args.forEach(function(argument) {
            if(!cd.hasAttribute(context, argument.name)) {
				throw new SyntaxError("\"" + argument.name + "\" is not an attribute of " + this.type.name);
			}
			argument.check(context);
		});
	}
	return this.type;
};

CategorySymbol.prototype.interpret = function(context) {
    return this.makeInstance(context);
};


CategorySymbol.prototype.makeInstance = function(context) {
	if(this.instance===null) {
		var instance = this.type.newInstance(context);
        instance.mutable = true;
        if(this.args!=null) {
            context = context.newLocalContext();
            this.args.forEach(function(argument) {
                var value = argument.expression.interpret(context);
                instance.setMember(context, argument.name, value);
            });
        }
        instance.setMember(context, "name", new TextValue(this.name));
        instance.mutable = false;
        this.instance = instance;
    }
    return this.instance;
};



CategorySymbol.prototype.getMemberValue = function(context, name, autoCreate) {
	var instance = this.makeInstance(context);
	return instance.getMemberValue(context, name, autoCreate);
}

CategorySymbol.prototype.declare = function(transpiler) {
    this.type.declare(transpiler);
};


CategorySymbol.prototype.transpile = function(transpiler) {
    transpiler.append(this.name);
};


CategorySymbol.prototype.initialize = function(transpiler) {
    transpiler.append("var ").append(this.name).append(" = ");
    var param = new AttributeParameter(new Identifier("name"));
    var argument = new Argument(param, new TextLiteral('"' + this.name + '"'));
    var args = new ArgumentList(this.args);
    args.add(argument);
    var exp = new ConstructorExpression(this.type, null, args);
    exp.transpile(transpiler);
    transpiler.append(";").newLine();
};



CategorySymbol.prototype.initializeError = function(transpiler) {
    transpiler.append("var ").append(this.name).append(" = new ").append(this.type.name).append("({");
    transpiler.append("name: '").append(this.name).append("', ");
    if(this.args!=null) {
        this.args.forEach(function (argument) {
            transpiler.append(argument.parameter.name).append(":");
            argument.expression.transpile(transpiler);
            transpiler.append(", ");
        }, this);
    }
    transpiler.trimLast(2);
    transpiler.append("});").newLine();
};

exports.CategorySymbol = CategorySymbol;
