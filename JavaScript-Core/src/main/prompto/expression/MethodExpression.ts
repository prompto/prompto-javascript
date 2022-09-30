import BaseExpression from './BaseExpression'
import { UnresolvedIdentifier, UnresolvedSelector } from '../expression'
import { Dialect } from '../parser'
import {MethodType, CategoryType, IType, VoidType} from '../type'
import {Instance, ClosureValue, NullValue, IValue} from '../value'
import {MethodDeclarationMap, InstanceContext, Context, Transpiler} from '../runtime'
import IExpression from "./IExpression";
import {CodeWriter} from "../utils";
import {IMethodDeclaration} from "../declaration";

export default class MethodExpression extends BaseExpression {

    expression: IExpression;

    constructor(expression: IExpression) {
        super();
        this.expression = expression;
    }

    toString() {
        return "Method: " + this.expression.toString();
    }

    toDialect(writer: CodeWriter): void {
        if(writer.dialect == Dialect.E)
            writer.append("Method: ");
        if(this.expression instanceof UnresolvedSelector) {
            writer.append(this.expression.toString());
        } else if(this.expression instanceof UnresolvedIdentifier) {
            writer.append(this.expression.toString());
        } else
            throw new Error("Unsupported!");
    }

    check(context: Context): IType {
        const decl = this.getDeclaration(context);
        if (decl != null) {
            return new MethodType(decl);
        } else {
            context.problemListener.reportUnknownMethod(this, this.expression.toString());
            return VoidType.instance;
        }
    }

    getDeclaration(context: Context): IMethodDeclaration | null {
        let expression = this.expression;
        if(expression instanceof UnresolvedSelector) {
            const parent = expression.parent;
            if(parent != null) {
                const type = parent.check(context);
                if(type instanceof CategoryType) {
                    expression = new UnresolvedIdentifier(expression.id);
                    context = context.newInstanceContext(null, type, true);
                } else
                    return null; // TODO report problem
            }
        }
        if(expression instanceof UnresolvedIdentifier) {
            const id = expression.id;
            const methods = context.getRegistered(id);
            if(methods instanceof MethodDeclarationMap)
                return methods.getFirst();
            else
                return null;
        } else
            throw new Error("Unsupported!");
    }

    interpret(context: Context, asMethod?: boolean): IValue {
        let expression = this.expression;
        if(expression instanceof UnresolvedSelector) {
            const parent = expression.parent;
            if(parent != null) {
                const value = parent.interpret(context);
                if(value instanceof Instance) {
                    expression = new UnresolvedIdentifier(expression.id);
                    context = context.newInstanceContext(value, null, true);
                } else
                    return NullValue.instance; // TODO throw error
            }
        }
        if(expression instanceof UnresolvedIdentifier) {
            const id = expression.id;
            if(context.hasValue(id)) {
                return context.readValue(id)!;
            } else {
                const named = context.getRegistered(id);
                if (named instanceof MethodDeclarationMap) {
                    const decl = named.getFirst();
                    return new ClosureValue(context, new MethodType(decl!))
                } else {
                    context.problemListener.reportUnknownMethod(id, id.name);
                }
            }
        } else
            throw new Error("Unsupported!");
        return NullValue.instance;
    }

    declare(transpiler: Transpiler): void {
        let expression = this.expression;
        if(expression instanceof UnresolvedSelector) {
            const parent = expression.parent;
            if(parent != null) {
                const parentType = parent.check(transpiler.context);
                if(parentType instanceof CategoryType) {
                    parent.declare(transpiler);
                    transpiler = transpiler.newInstanceTranspiler(parentType);
                    expression = new UnresolvedIdentifier(expression.id);
                } else
                    throw new Error("Unsupported!");
            }
        }
        if(expression instanceof UnresolvedIdentifier) {
            const methods = transpiler.context.getRegisteredDeclaration<MethodDeclarationMap>(MethodDeclarationMap, expression.id);
            const decl = methods!.getFirst()!;
            // don't declare closures
            if(!decl.declarationOf)
                decl.declare(transpiler);
        } else
            throw new Error("Unsupported!");
    }

    transpile(transpiler: Transpiler): void {
        let expression = this.expression;
        let parent = null;
        if(expression instanceof UnresolvedSelector) {
            parent = expression.parent;
            if(parent != null) {
                const type = parent.check(transpiler.context);
                if(type instanceof CategoryType) {
                    transpiler = transpiler.newInstanceTranspiler(type);
                    expression = new UnresolvedIdentifier(expression.id);
                } else
                    throw new Error("Unsupported!");
            }
        }
        if(expression instanceof UnresolvedIdentifier) {
            const id = expression.id;
            const named = transpiler.context.getRegistered(id);
            if(named instanceof MethodDeclarationMap) {
                const decl = named.getFirst()!;
                const context = transpiler.context.contextForValue(id);
                if (context instanceof InstanceContext) {
                    if(parent != null)
                        parent.transpile(transpiler);
                    else
                        context.instanceType.transpileInstance(transpiler);
                    transpiler.append(".");
                }
                transpiler.append(decl.getTranspiledName(transpiler.context));
                // need to bind instance methods
                if (context instanceof InstanceContext) {
                    transpiler.append(".bind(");
                    if(parent != null)
                        parent.transpile(transpiler);
                    else
                        context.instanceType.transpileInstance(transpiler);
                    transpiler.append(")");
                }
                transpiler.flush();
            }
        } else
            throw new Error("Unsupported!");
    }
}
