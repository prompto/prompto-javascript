var PromptoError = require("./PromptoError").PromptoError;
var ErrorVariable = require("../runtime/ErrorVariable").ErrorVariable;

function ExecutionError(message) {
	PromptoError.call(this, message);
	return this;
}

ExecutionError.prototype = Object.create(PromptoError.prototype);
ExecutionError.prototype.constructor = ExecutionError;

ExecutionError.prototype.interpret = function(context, errorName) {
    var exp = this.getExpression(context);
    if(exp==null) {
        var ArgumentAssignmentList = require("../grammar/ArgumentList").ArgumentAssignmentList;
        var ArgumentAssignment = require("../grammar/Argument").ArgumentAssignment;
        var UnresolvedParameter = require("../param/UnresolvedParameter").UnresolvedParameter;
        var TextLiteral = require("../literal/TextLiteral").TextLiteral;
        var ConstructorExpression = require("../expression/ConstructorExpression").ConstructorExpression;
        var CategoryType = require("../type/CategoryType").CategoryType;
        var args = new ArgumentAssignmentList();
        args.add(new ArgumentAssignment(new UnresolvedParameter("name"), new TextLiteral('"' + this.name + '"')));
        args.add(new ArgumentAssignment(new UnresolvedParameter("text"), new TextLiteral('"' + this.message + '"')));
        exp = new ConstructorExpression(new CategoryType("Error"), args);
    }
    if(context.getRegisteredValue(errorName)==null)
        context.registerValue(new ErrorVariable(errorName));
    var error = exp.interpret(context);
    context.setValue(errorName, error);
    return error;
};

exports.ExecutionError = ExecutionError;
