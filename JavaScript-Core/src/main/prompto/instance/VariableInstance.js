var Variable = require("../runtime/Variable").Variable;
var NullValue = require("../value/NullValue").NullValue;
var DocumentType = require("../type/DocumentType").DocumentType;

function VariableInstance(id) {
	this.id = id;
	return this;
}

Object.defineProperty(VariableInstance.prototype, "name", {
    get : function() {
        return this.id.name;
    }
});

VariableInstance.prototype.toDialect = function(writer, expression) {
    if(expression!=null) try {
        var type = expression.check(writer.context);
        var actual = writer.context.getRegisteredValue(this.name);
        if(actual==null)
            writer.context.registerValue(new Variable(this.id, type));
    } catch(e) {
        // TODO warning
    }
    writer.append(this.name);
};

VariableInstance.prototype.toString = function() {
    return this.name;
};

VariableInstance.prototype.checkAssignValue = function(context, valueType) {
	var actual = context.getRegisteredValue(this.id);
	if(actual==null) {
		context.registerValue(new Variable(this.id, valueType));
        return valueType;
	} else {
		// need to check type compatibility
        actual.type.checkAssignableFrom(context, valueType);
        return actual.type;
	}
};

VariableInstance.prototype.checkAssignMember = function(context, name, valueType) {
	var actual = context.getRegisteredValue(this.id);
	if(actual==null) {
		throw new SyntaxError("Unknown variable:" + this.id);
	}
    return valueType;
};


VariableInstance.prototype.checkAssignItem = function(context, itemType, valueType) {
    var actual = context.getRegisteredValue(this.id);
    if(actual==null) {
        throw new SyntaxError("Unknown variable:" + this.id);
    }
    var parentType = actual.getType(context);
    return parentType.checkItem(context, itemType);
};


VariableInstance.prototype.assign = function(context, expression) {
	var value = expression.interpret(context);
	if(context.getRegisteredValue(this.name)==null) {
        var type = value!=NullValue.instance ? value.type : expression.check(context);
		context.registerValue(new Variable(this.id, type));
	}
	context.setValue(this.id, value);
};

VariableInstance.prototype.interpret = function(context) {
	return context.getValue(this.id);
};

VariableInstance.prototype.declareAssign = function(transpiler, expression) {
    if(transpiler.context.getRegisteredValue(this.name)==null) {
        var type = expression.check(transpiler.context);
        transpiler.context.registerValue(new Variable(this.id, type));
    }
    expression.declare(transpiler);
};


VariableInstance.prototype.transpileAssign = function(transpiler, expression) {
    if(transpiler.context.getRegisteredValue(this.name)==null) {
        var type = expression.check(transpiler.context);
        transpiler.context.registerValue(new Variable(this.id, type));
        transpiler.append("var ");
    }
    transpiler.append(this.name);
    transpiler.append(" = ");
    expression.transpile(transpiler);
};


VariableInstance.prototype.declare = function(transpiler) {
    // nothing to do
};


VariableInstance.prototype.transpile = function(transpiler) {
    transpiler.append(this.name);
};

exports.VariableInstance = VariableInstance;