import MemberSelector from './MemberSelector'
import {CategorySymbol, IExpression, SuperExpression} from './index'
import { Identifier } from '../grammar'
import {CategoryType, IType, TypeType} from '../type'
import {NullValue, TypeValue, Instance} from '../value'
import {IMethodDeclaration, SingletonCategoryDeclaration} from '../declaration'
import { NullReferenceError } from '../error'
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";

export default class MethodSelector extends MemberSelector {
  
    constructor(parent: IExpression | null, id: Identifier) {
        super(parent, id);
    }

    toDialect(writer: CodeWriter): void {
        if(this.parent==null)
            writer.append(this.name);
        else
            super.parentAndMembertoDialect(writer);
    }

    newFullSelector(counter: number): MethodSelector {
        const name = this.id.name + "$" + String(counter);
        return new MethodSelector(this.parent!, new Identifier(name));
    }

    transpile(transpiler: Transpiler): void {
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

    checkParentType(context: Context, checkInstance: boolean): IType {
        if(checkInstance)
            return this.checkSuperParent(context);
        else
            return this.checkParent(context);
    }

    checkSuperParent(context: Context): IType {
        const value = this.parent!.interpret(context);
        if(!value || value === NullValue.instance)
            throw new NullReferenceError();
        if(this.parent instanceof SuperExpression)
            return value.type.getSuperType(context, this);
        else
            return value.type;
    }

    newLocalContext(context: Context, declaration: IMethodDeclaration): Context {
        if(this.parent!=null) {
            return this.newInstanceContext(context);
        } else if(declaration.memberOf!=null) {
            return this.newLocalInstanceContext(context, declaration);
        } else {
            return context.newLocalContext();
        }
    }

    // noinspection JSMethodCanBeStatic
    newLocalInstanceContext(context: Context, declaration: IMethodDeclaration): Context {
        let instance = context.getClosestInstanceContext();
        if(instance) {
            const required = declaration.memberOf!.getType(context);
            const actual = instance.instanceType;
            if (!required.isAssignableFrom(context, actual))
                instance = null;
        }
        if(!instance) {
            const declaring = declaration.memberOf!.getType(context);
            instance = context.newInstanceContext(null, declaring, false);
        }
        return instance.newChildContext()
    }

    newLocalCheckContext(context: Context, declaration: IMethodDeclaration): Context {
        if (this.parent != null) {
            return this.newInstanceCheckContext(context);
        } else if(declaration.memberOf!=null) {
            return this.newLocalInstanceContext(context, declaration);
        } else {
            return context.newLocalContext();
        }
    }

    newInstanceCheckContext(context: Context): Context {
        let type = this.parent!.check (context);
        // if calling singleton method, parent is the singleton type
        if(type instanceof TypeType) {
            const decl = context.getRegisteredCategoryDeclaration(type.type.id);
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

    newInstanceContext(context: Context): Context {
        let value = this.parent!.interpret(context);
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
        } else if(value instanceof Instance) {
            context = context.newInstanceContext(value, null);
            return context.newChildContext();
        } else {
            context = context.newBuiltInContext(value);
            return context.newChildContext();
        }
    }
}

