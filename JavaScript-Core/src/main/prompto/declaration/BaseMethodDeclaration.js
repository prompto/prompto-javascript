import BaseDeclaration from './BaseDeclaration.js'
import { ArgumentList, Argument } from '../grammar/index.js'
import { ParameterList } from '../param/index.js'
import { ProblemRaiser } from '../problem/index.js'
import { SyntaxError } from '../error/index.js'
import {Specificity} from "../grammar/index";
import {CategoryType} from "../type";
import {PromptoError} from "../error/index";

export default class BaseMethodDeclaration extends BaseDeclaration {

    constructor(id, parameters, returnType) {
        super(id);
        this.parameters = parameters || new ParameterList();
        this.returnType = returnType || null;
        this.memberOf = null;
        this.closureOf = null;
    }

    isAbstract() {
        return false;
    }

    isReference() {
        return false;
    }

    asReference() {
        const wrapped = Object.create(this);
        wrapped.isReference = () => true;
        return wrapped;
    }

    getDeclarationType() {
        return "Method";
    }

    getSignature(dialect) {
        const s = [];
        this.parameters.forEach(param => {
            s.push(param.getSignature(dialect));
        });
        return this.name + "(" + s.join(", ") + ")";
    }

    getProto(context) {
        return this.parameters.map(arg => arg.getProto(context)).join("/");
    }

    getTranspiledName(context, methodName) {
        methodName = methodName || this.name;
        // if this is a template instance, name is already transpiled
        if(methodName.indexOf("$")>0)
            return methodName;
        else
            return [methodName].concat(this.parameters.map(arg => arg.getTranspiledName(context))).join("$");
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
        try {
            context.pushProblemListener(new ProblemRaiser());
            const local = context.newLocalContext();
            this.registerParameters(local);
            const argsList = new ArgumentList(args);
            for(let i=0; i<this.parameters.length; i++) {
                const parameter = this.parameters[i];
                const idx = argsList.findIndex(parameter.id.name);
                let argument = idx>=0 ? argsList[idx] : null;
                if(argument==null) { // missing argument
                    if(parameter.defaultExpression!=null)
                        argument = new Argument(parameter, parameter.defaultExpression);
                    else
                        return false;
                }
                if(!this.isArgumentAssignableTo(local, parameter, argument, checkInstance, allowDerived)) {
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
            context.popProblemListener();
        }
    }

    isArgumentAssignableTo(context, parameter, argument, checkInstance, allowDerived) {
        return this.computeSpecificity(context, parameter, argument, checkInstance, allowDerived) !== Specificity.INCOMPATIBLE;
    }

    computeSpecificity(context, parameter, argument, checkInstance, allowDerived) {
        try {
            const requiredType = parameter.getType(context).resolve(context, null);
            let actualType = argument.checkActualType(context, requiredType, checkInstance).resolve(context, null);
            // retrieve actual runtime type
            if(checkInstance && (actualType instanceof CategoryType)) {
                const value = argument.expression.interpret(context.getCallingContext());
                if(value && value.getType) {
                    actualType = value.getType();
                }
            }
            if(actualType.equals(requiredType)) {
                return Specificity.EXACT;
            } else if(requiredType.isAssignableFrom(context, actualType)) {
                return Specificity.INHERITED;
            } else if(allowDerived && actualType.isAssignableFrom(context, requiredType)) {
                return Specificity.DERIVED;
            }
            actualType = argument.resolve(context, this, checkInstance).check(context);
            if(requiredType.isAssignableFrom(context, actualType)) {
                return Specificity.IMPLICIT;
            } else if(allowDerived && actualType.isAssignableFrom(context, requiredType)) {
                return Specificity.IMPLICIT;
            }
        } catch(error) {
            if(!(error instanceof PromptoError )) {
                throw error;
            }
        }
        return Specificity.INCOMPATIBLE;
    }

    isAssignableFrom(context, args) {
        try {
            context.pushProblemListener(new ProblemRaiser());
            const local = context.newLocalContext();
            this.registerParameters(local);
            const argsList = new ArgumentList(args);
            for(let i=0; i<this.parameters.length; i++) {
                const parameter = this.parameters[i];
                const idx = argsList.findIndex(parameter.id.name);
                let argument = idx>=0 ? argsList[idx] : null;
                if(argument==null) { // missing argument
                    if(parameter.defaultExpression!=null)
                        argument = new Argument(parameter, parameter.defaultExpression);
                    else
                        return false;
                }
                if(!BaseMethodDeclaration.isArgumentAssignableFrom(local, parameter, argument)) {
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
            context.popProblemListener();
        }
    }

    static isArgumentAssignableFrom(context, parameter, argument) {
        try {
            const requiredType = parameter.getType(context);
            let actualType = argument.checkActualType(context, requiredType, false);
            if(actualType.equals(requiredType)
                || actualType.isAssignableFrom(context, requiredType)
                || requiredType.isAssignableFrom(context, actualType))
                return true;
            actualType = argument.resolve(context, this, false, false).check(context);
            return actualType.equals(requiredType)
                || actualType.isAssignableFrom(context, requiredType)
                || requiredType.isAssignableFrom(context, actualType);
        } catch(e) {
            return false;
        }

    }

    isEligibleAsMain() {
        return false;
    }
}


