var Symbol = require("./Symbol").Symbol;
var TextValue = require("../value/TextValue").TextValue;
var ConstructorExpression = require("./ConstructorExpression").ConstructorExpression;
var ArgumentAssignmentList = require("../grammar/ArgumentAssignmentList").ArgumentAssignmentList;
var ArgumentAssignment = require("../grammar/ArgumentAssignment").ArgumentAssignment;
var AttributeParameter = require("../argument/AttributeParameter").AttributeParameter;
var TextLiteral = require("../literal/TextLiteral").TextLiteral;
var Identifier = require("../grammar/Identifier").Identifier;


function CategorySymbol(id, assignments) {
	Symbol.call(this, id);
	this.assignments = assignments;
	this.instance = null;
	this.type = null;
	return this;
}

CategorySymbol.prototype = Object.create(Symbol.prototype);
CategorySymbol.prototype.constructor = CategorySymbol;

CategorySymbol.prototype.toDialect = function(writer) {
    writer.append(this.name);
    writer.append(" ");
    this.assignments.toDialect(writer);
};

CategorySymbol.prototype.getType = function(context) {
	return this.type;
};

CategorySymbol.prototype.toString = function() {
	if(this.assignments!=null) {
		return this.assignments.toString();
	} else {
		return this.type.name;
	}
};

CategorySymbol.prototype.check = function(context) {
	var cd = context.getRegisteredDeclaration(this.type.name);
	if(cd==null) {
		throw new SyntaxError("Unknown category " + this.type.name);
	}
	if(this.assignments!=null) {
        context = context.newLocalContext();
		this.assignments.forEach(function(assignment) {
            if(!cd.hasAttribute(context, assignment.name)) {
				throw new SyntaxError("\"" + assignment.name + "\" is not an attribute of " + type.name);
			}
			assignment.check(context);
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
        if(this.assignments!=null) {
            context = context.newLocalContext();
            this.assignments.forEach(function(assignment) {
                var value = assignment.expression.interpret(context);
                instance.setMember(context, assignment.name, value);
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
    var nameArg = new AttributeParameter(new Identifier("name"));
    var nameAssign = new ArgumentAssignment(nameArg, new TextLiteral('"' + this.name + '"'));
    var assignments = new ArgumentAssignmentList(this.assignments);
    assignments.add(nameAssign);
    var exp = new ConstructorExpression(this.type, null, assignments);
    exp.transpile(transpiler);
    transpiler.append(";").newLine();
};



CategorySymbol.prototype.initializeError = function(transpiler) {
    transpiler.append("var ").append(this.name).append(" = new ").append(this.type.name).append("({");
    transpiler.append("name: '").append(this.name).append("', ");
    if(this.assignments!=null) {
        this.assignments.forEach(function (assignment) {
            transpiler.append(assignment.argument.name).append(":");
            assignment.expression.transpile(transpiler);
            transpiler.append(", ");
        }, this);
    }
    transpiler.trimLast(2);
    transpiler.append("});").newLine();
};

exports.CategorySymbol = CategorySymbol;
