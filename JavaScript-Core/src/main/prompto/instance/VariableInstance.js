var Variable = require("../runtime/Variable").Variable;
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
        var actual = writer.context.getRegisteredValue(name);
        if(actual==null)
            writer.context.registerValue(new Variable(name, type));
    } catch(e) {
        // TODO warning
    }
    writer.append(this.name);
};

VariableInstance.prototype.toString = function() {
    return this.name;
};

VariableInstance.prototype.checkAssignValue = function(context, expression) {
	var type = expression.check(context);
	var actual = context.getRegisteredValue(this.name);
	if(actual==null) {
		context.registerValue(new Variable(this.id, type));
	} else {
		// need to check type compatibility
		type.checkAssignableTo(context,actual.type);
	}
};

VariableInstance.prototype.checkAssignMember = function(context, memberName) {
	var actual = context.getRegisteredValue(this.name);
	if(actual==null) {
		throw new SyntaxError("Unknown variable:" + this.name);
	}
};

/*

@Override
public void checkAssignElement(Context context) throws SyntaxError {
	// TODO Auto-generated method stub
	
}

*/
VariableInstance.prototype.assign = function(context, expression) {
	var value = expression.interpret(context);
	if(context.getRegisteredValue(this.name)==null) {
		context.registerValue(new Variable(this.id, value.type));
	}
	context.setValue(this.id, value);
};

VariableInstance.prototype.interpret = function(context) {
	return context.getValue(this.id);
};

exports.VariableInstance = VariableInstance;