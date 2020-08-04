var BaseMethodDeclaration = require("./BaseMethodDeclaration").BaseMethodDeclaration;
var StrictSet = require("../intrinsic/StrictSet").StrictSet;
var ContextualExpression = require("../value/ContextualExpression").ContextualExpression;
var ArgumentList = require("../grammar/ArgumentList").ArgumentList;
var Argument = require("../grammar/Argument").Argument;
var UnresolvedIdentifier = null;
var UnresolvedParameter = null;
var CategoryParameter = null;
var AttributeParameter = null;

exports.resolve = function() {
    UnresolvedIdentifier = require("../expression/UnresolvedIdentifier").UnresolvedIdentifier;
    UnresolvedParameter = require("../param/UnresolvedParameter").UnresolvedParameter;
    CategoryParameter = require("../param/CategoryParameter").CategoryParameter;
    AttributeParameter = require("../param/AttributeParameter").AttributeParameter;
};


class DispatchMethodDeclaration extends BaseMethodDeclaration {
    constructor(context, call, declaration, declarations) {
        super(declaration.id, declaration.parameters, declaration.returnType);
        this.context = context;
        this.call = call;
        this.declaration = declaration;
        this.declarations = declarations;
        return this;
    }

    getTranspiledName(context) {
        return "$dispatch$" + this.declaration.getTranspiledName(context);
    }

    replaceLocalsWithArguments(args) {
        var items = args.map(function(argument) {
            var param = argument.parameter;
            var exp = argument.expression;
            if(exp instanceof ContextualExpression)
                exp = exp.expression;
            if(exp && exp.name) {
                exp = new UnresolvedIdentifier(param.id);
                return new Argument(param, exp);
            } else
                return argument;
        });
        return new ArgumentList(items);
    }

    transpile(transpiler) {
        this.registerParameters(transpiler.context);
        this.transpileProlog(transpiler);
        this.transpileDispatch(transpiler);
        this.transpileEpilog(transpiler);
    }

    transpileDispatch(transpiler) {
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
    }

    collectCommonArgs() {
        var common = null;
        for(var i=0; i<this.declarations.length; i++) {
            var declaration = this.declarations[i];
            if(i==0)
                common = new StrictSet(declaration.parameters);
            else {
                var current = new StrictSet(declaration.parameters);
                common = common.intersect(current);
                if(common.length===0)
                    break;
            }
        }
        return common;
    }

    transpileCall(transpiler, declaration) {
        this.call.transpileSelector(transpiler, declaration);
        transpiler.append("(");
        this.parameters.forEach(function (arg) {
            transpiler.append(arg.name);
            transpiler.append(", ");
        }, this);
        transpiler.trimLast(2);
        transpiler.append(")");
    }

    transpileTest(transpiler, common, declaration) {
        for(var i = 0, count = 0; i<this.call.args.length; i++) {
            var incoming = this.call.args[i].parameter;
            if(common.has(incoming))
                continue;
            if(count++)
                transpiler.append(" && ");
            if(incoming instanceof UnresolvedParameter)
                incoming = incoming.resolved;
            var outgoing = incoming==null ? declaration.parameters[0] : this.findCorrespondingArg(transpiler.context, declaration.parameters, common, incoming);
            if(outgoing instanceof UnresolvedParameter)
                outgoing = outgoing.resolved;
            if(incoming==null)
                incoming = this.declaration.parameters[0];
            if(incoming instanceof UnresolvedParameter)
                incoming = incoming.resolved;
            if(incoming instanceof CategoryParameter && outgoing instanceof CategoryParameter) {
                transpiler.append(incoming.name).append(".instanceOf(").append(outgoing.type.name).append(")");
            } else if(incoming instanceof CategoryParameter && outgoing instanceof AttributeParameter) {
                transpiler.append(incoming.name).append(".hasOwnProperty('").append(outgoing.name).append("')");
            } else
                throw new Error("Unsupported: " + typeof(incoming) + " and " + typeof(outgoing));
        }
    }

    findCorrespondingArg(context, args, common, incoming) {
        for(var i=0;i<args.length;i++) {
            var outgoing = args[i];
            if (common.has(outgoing))
                continue;
            if (outgoing.equals(incoming))
                return outgoing;
            if (incoming instanceof CategoryParameter && outgoing instanceof CategoryParameter) {
                if(incoming.type.isAssignableFrom(context, outgoing.type) || outgoing.type.isAssignableFrom(context, incoming.type))
                    return outgoing;
            }
        }
        throw new Error("Could not find matching argument for: " + incoming + " in " + args);
    }
}


exports.DispatchMethodDeclaration = DispatchMethodDeclaration;