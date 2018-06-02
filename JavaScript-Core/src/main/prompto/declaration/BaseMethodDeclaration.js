var BaseDeclaration = require("./BaseDeclaration").BaseDeclaration;
var ArgumentList = require("../grammar/ArgumentList").ArgumentList;
var CategoryType = null;
var ArgumentAssignmentList = require("../grammar/ArgumentAssignmentList").ArgumentAssignmentList;
var ArgumentAssignment = require("../grammar/ArgumentAssignment").ArgumentAssignment;

exports.resolve = function() {
	CategoryType = require("../type/CategoryType").CategoryType;
}

function BaseMethodDeclaration(id, args, returnType) {
	BaseDeclaration.call(this, id);
    this.memberOf = null;
	this.args = args || new ArgumentList();
	this.returnType = returnType || null;
	return this;
}

BaseMethodDeclaration.prototype  = Object.create(BaseDeclaration.prototype);
BaseMethodDeclaration.prototype.constructor = BaseMethodDeclaration;


BaseMethodDeclaration.prototype.getDeclarationType = function() {
    return "Method";
};

BaseMethodDeclaration.prototype.getSignature = function(context) {
	var s = [];
    this.args.map(function(arg) {
        s.push(arg.getProto());
    });
    return "(" + s.join(", ") + ")";
};

BaseMethodDeclaration.prototype.getProto = function(context) {
    return this.args.map(function(arg) {
        return arg.getProto(context);
    }).join("/");
};

BaseMethodDeclaration.prototype.getTranspiledName = function(context) {
    // if this is a template instance, name is already transpiled
    if(this.name.indexOf("$")>0)
    	return this.name;
    else
		return [this.name].concat(this.args.map(function(arg) { return arg.getTranspiledName(context); })).join("$");
};


BaseMethodDeclaration.prototype.transpileProlog = function(transpiler) {
    if (this.memberOf)
        transpiler.append(this.memberOf.name).append(".prototype.").append(this.getTranspiledName()).append(" = function (");
    else
        transpiler.append("function ").append(this.getTranspiledName(transpiler.context)).append(" (");
    this.args.transpile(transpiler);
    transpiler.append(") {").indent();
};


BaseMethodDeclaration.prototype.transpileEpilog = function(transpiler) {
    transpiler.dedent().append("}");
    if(this.memberOf)
        transpiler.append(";");
    transpiler.newLine();
};


BaseMethodDeclaration.prototype.unregister = function(context) {
    context.unregisterMethodDeclaration (this, this.getProto(context));
};


BaseMethodDeclaration.prototype.register = function(context) {
	context.registerMethodDeclaration(this);
};


BaseMethodDeclaration.prototype.registerArguments = function(context) {
	if(this.args!=null) {
		this.args.register(context);
	}
};


BaseMethodDeclaration.prototype.declareArguments = function(transpiler) {
    if(this.args!=null) {
        this.args.declare(transpiler);
    }
};

BaseMethodDeclaration.prototype.isAssignableTo = function(context, assignments, checkInstance, allowDerived) {
	try {
		var local = context.newLocalContext();
		this.registerArguments(local);
		var assignmentsList = new ArgumentAssignmentList(assignments);
		for(var i=0;i<this.args.length;i++) {
			var argument = this.args[i];
			var idx = assignmentsList.findIndex(argument.id.name);
            var assignment = idx>=0 ? assignmentsList[idx] : null;
            if(assignment==null) { // missing argument
                if(argument.defaultExpression!=null)
                    assignment = new ArgumentAssignment(argument, argument.defaultExpression);
				else
                    return false;
			}
			if(!assignment.isAssignableToArgument(local, argument, this, checkInstance, allowDerived)) {
				return false;
			}
			if(idx>=0)
                assignmentsList.remove(idx);
		}
		return assignmentsList.length===0;
	} catch (e) {
		if(e instanceof SyntaxError) {
			return false;
		} else {
			throw e;
		}
	}
};



BaseMethodDeclaration.prototype.isEligibleAsMain = function() {
	return false;
};

exports.BaseMethodDeclaration = BaseMethodDeclaration;


