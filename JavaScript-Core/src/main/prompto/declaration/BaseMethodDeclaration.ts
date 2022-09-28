import BaseDeclaration from './BaseDeclaration'
import IMethodDeclaration from "./IMethodDeclaration";
import {ArgumentList, Argument, Identifier} from '../grammar'
import {IParameter, ParameterList} from '../param'
import { ProblemRaiser } from '../problem'
import { SyntaxError } from '../error'
import { Specificity } from "../grammar";
import {CategoryType, IType, VoidType} from "../type";
import { PromptoError } from "../error";
import {CategoryDeclaration, IDeclaration} from "./index";
import {Dialect} from "../parser";
import {Context, Transpiler} from "../runtime";
import {IValue} from "../value";
import {IMethodInfo} from "../runtime/Catalog";
import {DeclarationStatement} from "../statement";

export default abstract class BaseMethodDeclaration extends BaseDeclaration implements IMethodDeclaration {

    parameters: ParameterList;
    returnType: IType | null;
    memberOf: CategoryDeclaration | null;
    closureOf: IDeclaration | null;
    declarationOf: DeclarationStatement<IMethodDeclaration> | null;

    constructor(id: Identifier, parameters: ParameterList | null, returnType: IType | null) {
        super(id);
        this.parameters = parameters || new ParameterList();
        this.returnType = returnType || null;
        this.memberOf = null;
        this.closureOf = null;
    }

    toDeclarationInfo(context: Context): IMethodInfo {
        return { name: this.name, dialect: this.dialect.name, proto: this.getProto(context), eligibleAsMain: this.isEligibleAsMain() };
    }

    getType(context: Context): IType {
        return this.returnType || VoidType.instance;
    }

    isAbstract(): boolean {
        return false;
    }

    isReference: () => boolean = () => {
        return false;
    };

    asReference(): BaseMethodDeclaration {
        const wrapped = Object.create(this) as BaseMethodDeclaration;
        wrapped.isReference = () => true;
        return wrapped;
    }

    getDeclarationType(): string {
        return "Method";
    }

    getSignature(dialect: Dialect) {
        const signs = this.parameters.map(param => param.getSignature(dialect));
        return this.name + "(" + signs.join(", ") + ")";
    }

    getProto(context: Context): string {
        return this.parameters.map(param => param.getProto(context)).join("/");
    }

    getTranspiledName(context: Context, methodName?: string): string {
        methodName = methodName || this.name;
        // if this is a template instance, name is already transpiled
        if(methodName.indexOf("$")>0)
            return methodName;
        else
            return [methodName].concat(this.parameters.map(param => param.getTranspiledName(context))).join("$");
    }

    transpileProlog(transpiler: Transpiler): void {
        if (this.memberOf)
            transpiler.append(this.memberOf.name).append(".prototype.").append(this.getTranspiledName(transpiler.context)).append(" = function (");
        else
            transpiler.append("function ").append(this.getTranspiledName(transpiler.context)).append(" (");
        this.parameters.transpile(transpiler);
        transpiler.append(") {").indent();
    }

    transpileEpilog(transpiler: Transpiler): void {
        transpiler.dedent().append("}");
        if(this.memberOf)
            transpiler.append(";");
        transpiler.newLine();
    }

    transpileMethodType(transpiler: Transpiler): void {
        const returnType = this.returnType || this.check(transpiler.context, true) || VoidType.instance;
        transpiler.append("[");
        if(this.parameters.length > 0) {
            this.parameters.forEach(param => transpiler.append("'")
                .append(param.getType(transpiler.context).name)
                .append("', "));
            transpiler.trimLast(2);
        }
        transpiler.append("], '")
            .append(returnType.name)
            .append("'");
    }

    unregister(context: Context): void {
        context.unregisterMethodDeclaration (this, this.getProto(context));
    }

    register(context: Context): void {
        context.registerMethodDeclaration(this);
    }

    registerParameters(context: Context): void {
        if(this.parameters) {
            this.parameters.register(context);
        }
    }

    abstract check(context: Context, isStart: boolean): IType;
    abstract checkChild(context: Context): IType;
    abstract interpret(context: Context): IValue | null;

    declareParameters(transpiler: Transpiler): void {
        if(this.parameters) {
            this.parameters.declare(transpiler);
        }
    }

    isAssignableTo(context: Context, args: ArgumentList, checkInstance: boolean, allowDerived: boolean): boolean {
        try {
            context.pushProblemListener(new ProblemRaiser());
            const local = context.newLocalContext();
            this.registerParameters(local);
            const argsList = new ArgumentList(args);
            for(let i=0; i<this.parameters.length; i++) {
                const parameter = this.parameters[i];
                const idx = argsList.findIndexById(parameter.id);
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

    isArgumentAssignableTo(context: Context, parameter: IParameter, argument: Argument, checkInstance: boolean, allowDerived: boolean): boolean {
        return this.computeSpecificity(context, parameter, argument, checkInstance, allowDerived) !== Specificity.INCOMPATIBLE;
    }

    computeSpecificity(context: Context, parameter: IParameter, argument: Argument, checkInstance: boolean, allowDerived: boolean): Specificity {
        try {
            const requiredType = parameter.getType(context).resolve(context, null);
            let actualType = argument.checkActualType(context, requiredType, checkInstance)!.resolve(context, null);
            // retrieve actual runtime type
            if(checkInstance && (actualType instanceof CategoryType)) {
                const value = argument.expression.interpret(context.getCallingContext()!);
                if(value)
                    actualType = value.type;
            }
            if(actualType.equals(requiredType)) {
                return Specificity.EXACT;
            } else if(requiredType.isAssignableFrom(context, actualType)) {
                return Specificity.INHERITED;
            } else if(allowDerived && actualType.isAssignableFrom(context, requiredType)) {
                return Specificity.DERIVED;
            }
        } catch(error) {
            if(!(error instanceof PromptoError )) {
                throw error;
            }
        }
        return Specificity.INCOMPATIBLE;
    }

    isAssignableFrom(context: Context, args: ArgumentList): boolean {
        try {
            context.pushProblemListener(new ProblemRaiser());
            const local = context.newLocalContext();
            this.registerParameters(local);
            const argsList = new ArgumentList(args);
            for(let i=0; i<this.parameters.length; i++) {
                const parameter = this.parameters[i];
                const idx = argsList.findIndexById(parameter.id);
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

    static isArgumentAssignableFrom(context: Context, parameter: IParameter, argument: Argument): boolean {
        try {
            const requiredType = parameter.getType(context);
            let actualType = argument.checkActualType(context, requiredType, false);
            if(actualType && (actualType.equals(requiredType)
                || actualType.isAssignableFrom(context, requiredType)
                || requiredType.isAssignableFrom(context, actualType)))
                return true;
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
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


