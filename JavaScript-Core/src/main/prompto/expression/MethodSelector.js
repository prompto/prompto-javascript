import MemberSelector from './MemberSelector.js'
import { UnresolvedIdentifier, InstanceExpression, CategorySymbol } from './index.js'
import { Identifier, NamedInstance } from '../grammar/index.js'
import { MethodType, CategoryType, TypeType } from '../type/index.js'
import { MethodDeclarationMap } from '../runtime/index.js'
import { NullValue, TypeValue, ConcreteInstance, NativeInstance } from '../value/index.js'
import { SingletonCategoryDeclaration } from '../declaration/index.js'
import { NullReferenceError } from '../error/index.js'

export default class MethodSelector extends MemberSelector {
  
    constructor(parent, id) {
        super(parent, id);
    }

    toDialect(writer) {
        if(this.parent==null)
            writer.append(this.name);
        else
            super.parentAndMemberToDialect(writer);
    }

    newFullSelector(counter) {
        const name = this.id.name + "$" + counter;
        return new MethodSelector(this.parent, new Identifier(name));
    }

    transpile(transpiler) {
        if(this.parent!=null)
            super.transpile(transpiler);
        else
            transpiler.append(this.name);
    }

    toString() {
        if(this.parent==null) {
            return this.name;
        } else {
            return super.toString() + "." + this.name;
        }
    }

    getCandidates(context, checkInstance) {
        const decl = this.getMethodInstance(context);
        if(decl!=null)
            return new Set([decl]);
        else if(this.parent===null)
            return this.getGlobalCandidates(context);
        else
            return this.getMemberCandidates(context, checkInstance);
    }

    getMethodInstance(context) {
        const named = context.getRegistered(this.id);
        if (named instanceof NamedInstance) {
            let type = named.getType(context);
            if (type != null) {
                type = type.resolve(context);
                if (type instanceof MethodType)
                    return type.method;
            }
        }
        return null;
    }

    getGlobalCandidates(context) {
        const result = new Set();
        // if called from a member method, could be a member method called without this/self
        const instance = context.getClosestInstanceContext();
        if(instance!=null) {
            const type = instance.instanceType;
            const cd = context.getRegisteredDeclaration(type.name);
            if(cd!=null) {
                const members = cd.getMemberMethodsMap(context, this.name);
                if(members!=null) {
                    members.getAll().forEach(method => {
                        result.add(method);
                    });
                }
            }
        }
        const methods = context.getRegisteredDeclaration(this.name);
        if(methods instanceof MethodDeclarationMap) {
            methods.getAll().forEach(method => {
                result.add(method);
            });
        }
        return result;
    }

    getMemberCandidates(context, checkInstance) {
        const parentType = this.checkParentType(context, checkInstance);
        const methods = parentType ? parentType.getMemberMethods(context, this.name) : [];
        return new Set(methods);
    }

    checkParentType(context, checkInstance) {
        if(checkInstance)
            return this.checkParentInstance(context);
        else
            return this.checkParent(context);
    }

    checkParentInstance(context) {
        let id = null;
        if(this.parent instanceof UnresolvedIdentifier)
            id = this.parent.id;
        else if(this.parent instanceof InstanceExpression)
            id = this.parent.id;
        if(id!=null) {
            // don't get Singleton values
            // noinspection JSUnresolvedVariable
            const first = id.name.substring(0, 1);
            if(first.toLowerCase() === first) {
                const value = context.getValue(id);
                if(value!=null && value !== NullValue.instance)
                    return value.type;
            }
        }
        // TODO check result instance
        return this.checkParent(context);
    }

    newLocalContext(context, declaration) {
        if(this.parent!=null) {
            return this.newInstanceContext(context);
        } else if(declaration.memberOf!=null) {
            return this.newLocalInstanceContext(context, declaration);
        } else {
            return context.newLocalContext();
        }
    }

    // noinspection JSMethodCanBeStatic
    newLocalInstanceContext(context, declaration) {
        let instance = context.getClosestInstanceContext();
        if(instance!=null) {
            const required = declaration.memberOf.getType(context);
            const actual = instance.instanceType;
            if (!required.isAssignableFrom(context, actual))
                instance = null;
        }
        if(instance==null) {
            const declaring = declaration.memberOf.getType(context);
            instance = context.newInstanceContext(declaring, false);
        }
        return instance.newChildContext()
    }

    newLocalCheckContext(context, declaration) {
        if (this.parent != null) {
            return this.newInstanceCheckContext(context);
        } else if(declaration.memberOf!=null) {
            return this.newLocalInstanceContext(context, declaration);
        } else {
            return context.newLocalContext();
        }
    }

    newInstanceCheckContext(context) {
        let type = this.parent.check (context);
        // if calling singleton method, parent is the singleton type
        if(type instanceof TypeType) {
            const decl = context.getRegisteredDeclaration(type.type.id);
            if(decl instanceof SingletonCategoryDeclaration) {
                type = decl.getType(context);
            }
        }
        if (type instanceof CategoryType) {
            context = context.newInstanceContext(null, type, false);
            return context.newChildContext();
        } else
            return context.newChildContext();
    }

    newInstanceContext(context) {
        let value = this.parent.interpret(context);
        if(value === null || value === NullValue.instance) {
            throw new NullReferenceError();
        }
        if(value instanceof TypeValue) {
            const type = value.value;
            if(type instanceof CategoryType) {
                const decl = type.getDeclaration(context);
                if(decl instanceof SingletonCategoryDeclaration) {
                    value = context.loadSingleton(value.value);
                }
            }
        }
        if(value instanceof CategorySymbol) {
            value = value.interpret(context);
        }
        if(value instanceof TypeValue) {
            return context.newChildContext();
        } else if(value instanceof ConcreteInstance || value instanceof NativeInstance) {
            context = context.newInstanceContext(value, null);
            return context.newChildContext();
        } else {
            context = context.newBuiltInContext(value);
            return context.newChildContext();
        }
    }
}

