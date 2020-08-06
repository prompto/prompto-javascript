var BaseDeclaration = require("./BaseDeclaration").BaseDeclaration;
var ParameterList = require("../param/ParameterList").ParameterList;
var ArgumentList = require("../grammar/ArgumentList").ArgumentList;
var Argument = require("../grammar/Argument").Argument;
var ProblemListener = require("../problem/ProblemListener").ProblemListener;


class BaseMethodDeclaration extends BaseDeclaration {

    constructor(id, parameters, returnType) {
        super(id);
        this.parameters = parameters || new ParameterList();
        this.returnType = returnType || null;
        this.memberOf = null;
        this.closureOf = null;
    }

    getDeclarationType() {
        return "Method";
    }

    getSignature(context) {
        var s = [];
        this.parameters.map(arg => {
            s.push(arg.getProto());
        });
        return "(" + s.join(", ") + ")";
    }

    getProto(context) {
        return this.parameters.map(arg => arg.getProto(context)).join("/");
    }

    getTranspiledName(context) {
        // if this is a template instance, name is already transpiled
        if(this.name.indexOf("$")>0)
            return this.name;
        else
            return [this.name].concat(this.parameters.map(arg => arg.getTranspiledName(context))).join("$");
    }

    transpileProlog(transpiler) {
        if (this.memberOf)
            transpiler.append(this.memberOf.name).append(".prototype.").append(this.getTranspiledName(transpiler.context)).append(" = function (");
        else
            transpiler.append("function ").append(this.getTranspiledName(transpiler.context)).append(" (");
        this.parameters.transpile(transpiler);
        transpiler.append(") {").indent();
    }

    transpileEpilog(transpiler) {
        transpiler.dedent().append("}");
        if(this.memberOf)
            transpiler.append(";");
        transpiler.newLine();
    }

    unregister(context) {
        context.unregisterMethodDeclaration (this, this.getProto(context));
    }

    register(context) {
        context.registerMethodDeclaration(this);
    }

    registerParameters(context) {
        if(this.parameters!=null) {
            this.parameters.register(context);
        }
    }

    declareArguments(transpiler) {
        if(this.parameters!=null) {
            this.parameters.declare(transpiler);
        }
    }

    isAssignableTo(context, args, checkInstance, allowDerived) {
        var listener = context.problemListener;
        try {
            context.problemListener = new ProblemListener();
            var local = context.newLocalContext();
            this.registerParameters(local);
            var argsList = new ArgumentList(args);
            for(var i=0; i<this.parameters.length; i++) {
                var parameter = this.parameters[i];
                var idx = argsList.findIndex(parameter.id.name);
                var argument = idx>=0 ? argsList[idx] : null;
                if(argument==null) { // missing argument
                    if(parameter.defaultExpression!=null)
                        argument = new Argument(parameter, parameter.defaultExpression);
                    else
                        return false;
                }
                if(!argument.isAssignableToArgument(local, parameter, this, checkInstance, allowDerived)) {
                    return false;
                }
                if(idx>=0)
                    argsList.remove(idx);
            }
            return argsList.length===0;
        } catch (e) {
            if(e instanceof SyntaxError) {
                return false;
            } else {
                throw e;
            }
        } finally {
            context.problemListener = listener;
        }
    }

    isEligibleAsMain() {
        return false;
    }
}

exports.BaseMethodDeclaration = BaseMethodDeclaration;


