import MemberSelector from './MemberSelector.js'
import { CategorySymbol } from './index.js'
import { Identifier } from '../grammar/index.js'
import { CategoryType, TypeType } from '../type/index.js'
import { NullValue, TypeValue, ConcreteInstance, NativeInstance } from '../value/index.js'
import { SingletonCategoryDeclaration } from '../declaration/index.js'
import { NullReferenceError } from '../error/index.js'
import { SuperExpression } from '../expression/index.js'

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
            return super.toString();
        }
    }

    checkParentType(context, checkInstance) {
        if(checkInstance)
            return this.interpretParentInstance(context);
        else
            return this.checkParent(context);
    }

    interpretParentInstance(context) {
        const value = this.parent.interpret(context);
        if(value === null || value === NullValue.instance)
            throw new NullReferenceError();
        if(this.parent instanceof SuperExpression)
            return value.type.getSuperType(context, this);
        else
            return value.type;
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

