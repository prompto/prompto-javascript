var BaseMethodDeclaration = require("./BaseMethodDeclaration").BaseMethodDeclaration;
var StrictSet = require("../intrinsic/StrictSet").StrictSet;
var ContextualExpression = require("../value/ContextualExpression").ContextualExpression;
var ArgumentAssignmentList = require("../grammar/ArgumentAssignmentList").ArgumentAssignmentList;
var ArgumentAssignment = require("../grammar/ArgumentAssignment").ArgumentAssignment;
var UnresolvedIdentifier = null;
var UnresolvedArgument = null;
var CategoryArgument = null;
var AttributeArgument = null;
var Variable = require("../runtime/Variable").Variable;
var AnyType = require("../type/AnyType").AnyType;

exports.resolve = function() {
    UnresolvedIdentifier = require("../expression/UnresolvedIdentifier").UnresolvedIdentifier;
    UnresolvedArgument = require("../argument/UnresolvedArgument").UnresolvedArgument;
    CategoryArgument = require("../argument/CategoryArgument").CategoryArgument;
    AttributeArgument = require("../argument/AttributeArgument").AttributeArgument;
};


function DispatchMethodDeclaration(context, call,  declaration, declarations) {
    BaseMethodDeclaration.call(this, declaration.id, declaration.args, declaration.returnType);
    this.context = context;
    this.call = call;
    this.declaration = declaration;
    this.declarations = declarations;
    return this;
}

DispatchMethodDeclaration.prototype = Object.create(BaseMethodDeclaration.prototype);
DispatchMethodDeclaration.prototype.constructor = DispatchMethodDeclaration;


DispatchMethodDeclaration.prototype.getTranspiledName = function(context) {
    return "$dispatch$" + this.declaration.getTranspiledName(context);
};

DispatchMethodDeclaration.prototype.replaceLocalsWithArguments = function(assignments) {
    var items = assignments.map(function(assignment) {
        var arg = assignment.argument;
        var exp = assignment.expression;
        if(exp instanceof ContextualExpression)
            exp = exp.expression;
        if(exp && exp.name) {
            exp = new UnresolvedIdentifier(arg.id);
            return new ArgumentAssignment(arg, exp);
        } else
            return assignment;
    });
    return new ArgumentAssignmentList(items);
};

DispatchMethodDeclaration.prototype.transpile = function(transpiler) {
    this.registerArguments(transpiler.context);
    this.transpileProlog(transpiler);
    this.transpileDispatch(transpiler);
    this.transpileEpilog(transpiler);
};

DispatchMethodDeclaration.prototype.transpileDispatch = function(transpiler) {
    var common = this.collectCommonArgs();
    for(var i=0; i<this.declarations.length; i++) {
        if(i>0)
            transpiler.append("else ");
        if(i<this.declarations.length-1) {
            transpiler.append("if(");
            this.transpileTest(transpiler, common, this.declarations[i]);
            transpiler.append(")");
        }
        transpiler.indent();
        this.transpileCall(transpiler, this.declarations[i]);
        transpiler.dedent();
    }
};

DispatchMethodDeclaration.prototype.collectCommonArgs = function() {
    var common = null;
    for(var i=0; i<this.declarations.length; i++) {
        var declaration = this.declarations[i];
        if(i==0)
            common = new StrictSet(declaration.args);
        else {
            var current = new StrictSet(declaration.args);
            common = common.intersect(current);
            if(common.length===0)
                break;
        }
    }
    return common;
};

DispatchMethodDeclaration.prototype.transpileCall = function(transpiler, declaration) {
    this.call.transpileSelector(transpiler, declaration);
    transpiler.append("(");
    this.args.forEach(function (arg) {
        transpiler.append(arg.name)
        transpiler.append(", ");
    }, this);
    transpiler.trimLast(2);
    transpiler.append(")");
};

DispatchMethodDeclaration.prototype.transpileTest = function(transpiler, common, declaration) {
    for(var i = 0, count = 0;i<this.call.assignments.length; i++) {
        var incoming = this.call.assignments[i].argument;
        if(common.has(incoming))
            continue;
        if(count++)
            transpiler.append(" && ");
        if(incoming instanceof UnresolvedArgument)
            incoming = incoming.resolved;
        var outgoing = incoming==null ? declaration.args[0] : this.findCorrespondingArg(transpiler.context, declaration.args, common, incoming);
        if(outgoing instanceof UnresolvedArgument)
            outgoing = outgoing.resolved;
        if(incoming==null)
            incoming = this.declaration.args[0];
        if(incoming instanceof UnresolvedArgument)
            incoming = incoming.resolved;
        if(incoming instanceof CategoryArgument && outgoing instanceof CategoryArgument) {
            transpiler.append(incoming.name).append(".instanceOf(").append(outgoing.type.name).append(")");
        } else if(incoming instanceof CategoryArgument && outgoing instanceof AttributeArgument) {
            transpiler.append(incoming.name).append(".hasOwnProperty('").append(outgoing.name).append("')");
        } else
            throw new Error("Unsupported: " + typeof(incoming) + " and " + typeof(outgoing));
    }
};

DispatchMethodDeclaration.prototype.findCorrespondingArg = function(context, arguments, common, incoming) {
    for(var i=0;i<arguments.length;i++) {
        var outgoing = arguments[i];
        if (common.has(outgoing))
            continue;
        if (outgoing.equals(incoming))
            return outgoing;
        if (incoming instanceof CategoryArgument && outgoing instanceof CategoryArgument) {
            if(incoming.type.isAssignableFrom(context, outgoing.type) || outgoing.type.isAssignableFrom(context, incoming.type))
                return outgoing;
        }
    }
    throw new Error("Could not find matching argument for: " + incoming + " in " + arguments);
};


exports.DispatchMethodDeclaration = DispatchMethodDeclaration;