var Variable = require("../runtime/Variable").Variable;
var VoidType = require("../type/VoidType").VoidType;
var CodeType = require("../type/CodeType").CodeType;
var DocumentType = require("../type/DocumentType").DocumentType;
var CategoryType = require("../type/CategoryType").CategoryType;

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
        // console.log(e.stack);
        // TODO warning
    }
    writer.append(this.name);
};

VariableInstance.prototype.toString = function() {
    return this.name;
};


VariableInstance.prototype.check = function(context) {
    var actual = context.getRegisteredValue(this.id);
    return actual.type;
};


VariableInstance.prototype.checkAssignValue = function(context, valueType, section) {
    var actual = context.getRegisteredValue(this.id);
    if(actual==null) {
        context.registerValue(new Variable(this.id, valueType));
        return valueType;
    } else {
        // need to check type compatibility
        actual.type.checkAssignableFrom(context, valueType, section);
        return actual.type;
    }
};

VariableInstance.prototype.checkAssignMember = function(context, id, valueType, section) {
    var actual = context.getRegisteredValue(this.id);
    if(actual==null) {
        context.problemListener.reportUnknownVariable(section, this.id);
        return VoidType.instance;
    }
    var thisType = actual.getType(context);
    if(thisType === DocumentType.instance)
        return thisType;
    else {
        if(thisType instanceof CategoryType && !thisType.mutable)
            context.problemListener.reportNotMutable(section, this.name);
        var requiredType = thisType.checkMember(context, section, id);
        if (requiredType && !requiredType.isAssignableFrom(context, valueType))
            context.problemListener.reportIncompatibleTypes(section, requiredType, valueType);
        return valueType;
    }
};


VariableInstance.prototype.checkAssignItem = function(context, itemType, valueType, section) {
    var actual = context.getRegisteredValue(this.id);
    if(actual==null)
        context.problemListener.reportUnknownVariable(section, this.id);
    var parentType = actual.getType(context);
    return parentType.checkItem(context, itemType);
};


VariableInstance.prototype.assign = function(context, expression) {
    var value = expression.interpret(context);
    if(context.getRegisteredValue(this.name)==null) {
        var type = expression.check(context);
        context.registerValue(new Variable(this.id, type));
    }
    context.setValue(this.id, value);
};

VariableInstance.prototype.interpret = function(context) {
    return context.getValue(this.id);
};

VariableInstance.prototype.declareAssign = function(transpiler, expression) {
    if(transpiler.context.getRegisteredValue(this.name)==null) {
        var valueType = expression.check(transpiler.context);
        transpiler.context.registerValue(new Variable(this.id, valueType));
        // Code expressions need to be interpreted as part of full check
        if (valueType === CodeType.instance) {
            transpiler.context.setValue(this.id, expression.interpret(transpiler.context));
        }

    }
    expression.declare(transpiler);
};


VariableInstance.prototype.transpileAssign = function(transpiler, expression) {
    if(transpiler.context.getRegisteredValue(this.name)==null) {
        var type = expression.check(transpiler.context);
        transpiler.context.registerValue(new Variable(this.id, type));
        transpiler.append("var ");
    }
    var context = transpiler.context.contextForValue(this.id.name);
    if(context.instanceType) {
        context.instanceType.transpileInstance(transpiler);
        transpiler.append(".setMember('").append(this.name).append("', ");
        expression.transpile(transpiler);
        transpiler.append(")");
    } else {
        transpiler.append(this.name);
        transpiler.append(" = ");
        expression.transpile(transpiler);
    }
};


VariableInstance.prototype.transpileAssignParent = function(transpiler) {
    transpiler.append(this.name);
};


VariableInstance.prototype.declare = function(transpiler) {
    // nothing to do
};


VariableInstance.prototype.transpile = function(transpiler) {
    transpiler.append(this.name);
};

exports.VariableInstance = VariableInstance;