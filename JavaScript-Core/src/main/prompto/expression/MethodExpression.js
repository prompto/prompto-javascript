import Expression from './Expression.js'
import { UnresolvedIdentifier, UnresolvedSelector } from './index.js'
import { Dialect } from '../parser/index.js'
import { MethodType, CategoryType } from '../type/index.js'
import { Instance, ClosureValue, NullValue } from '../value/index.js'
import { MethodDeclarationMap, InstanceContext } from '../runtime/index.js'

export default class MethodExpression extends Expression {

    constructor(expression) {
        super();
        this.expression = expression;
    }

    toString() {
        return "Method: " + this.expression.toString();
    }

    toDialect(writer) {
        if(writer.dialect==Dialect.E)
            writer.append("Method: ");
        if(this.expression instanceof UnresolvedSelector) {
            writer.append(this.expression.toString());
        } else if(this.expression instanceof UnresolvedIdentifier) {
            writer.append(this.expression.toString());
        } else
            throw new Error("Unsupported!");
    }

    check(context) {
        const decl = this.getDeclaration(context);
        if (decl != null) {
            return new MethodType(decl);
        } else {
            context.problemListener.reportUnknownMethod(this.id);
        }
    }

    getDeclaration(context) {
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

    interpret(context, asMethod) {
        let expression = this.expression;
        if(expression instanceof UnresolvedSelector) {
            const parent = expression.parent;
            if(parent != null) {
                const value = parent.interpret(context);
                if(value instanceof Instance) {
                    expression = new UnresolvedIdentifier(expression.id);
                    context = context.newInstanceContext(value, null, true);
                } else
                    return NullValue.instance(); // TODO throw error
            }
        }
        if(expression instanceof UnresolvedIdentifier) {
            const id = expression.id;
            if(context.hasValue(id)) {
                return context.getValue(id);
            } else {
                const named = context.getRegistered(id);
                if (named instanceof MethodDeclarationMap) {
                    const decl = named.getFirst();
                    return new ClosureValue(context, new MethodType(decl))
                } else {
                    context.problemListener.reportUnknownMethod(id);
                }
            }
        } else
            throw new Error("Unsupported!");
    }

    declare(transpiler) {
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
            const id = expression.id;
            const named = transpiler.context.getRegistered(id.name);
            const decl = named.getFirst();
            // don't declare closures
            if(!decl.declarationStatement)
                decl.declare(transpiler);
        } else
            throw new Error("Unsupported!");
    }

    transpile(transpiler) {
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
            const id = this.expression.id;
            const named = transpiler.context.getRegistered(id.name);
            if(named instanceof MethodDeclarationMap) {
                const decl = named.getFirst();
                const context = transpiler.context.contextForValue(id.name);
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
