import BaseExpression from './BaseExpression'
import {
    InstanceExpression,
    MethodSelector,
    ConstructorExpression,
    TypeExpression,
    SymbolExpression,
    IExpression, IPredicate
} from './index'
import {VoidType, CategoryType, EnumeratedCategoryType, NativeType, IType, MethodType, AnyType} from '../type'
import { ProblemRaiser } from '../problem'
import { PromptoError } from '../error'
import { MethodCall } from '../statement'
import { EnumeratedCategoryDeclaration, EnumeratedNativeDeclaration, CategoryDeclaration } from '../declaration'
import {Dialect, Section} from '../parser'
import {Identifier} from "../grammar";
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import {IValue, NullValue} from "../value";
import {IQueryBuilder} from "../store";

export default class UnresolvedIdentifier extends BaseExpression implements IPredicate {

    id: Identifier;
    resolved?: IExpression;


    constructor(id: Identifier) {
        super();
        this.id = id;
    }

    get name() {
        return this.id.name;
    }

    toString() {
        return this.id.name;
    }

    toDialect(writer: CodeWriter): void {
        try {
            this.resolve(writer.context, false, false);
        } catch(e) {
            /* eslint no-empty: [ "off" ] */
        }
        if(this.resolved)
            this.resolved.toDialect(writer);
        else
            writer.append(this.id.name);
    }

    check(context: Context): IType {
        return this.resolveAndCheck(context, false);
    }

    checkReference(context: Context): IType {
        this.resolve(context, false, false);
        return this.resolved ? this.resolved.checkReference(context) : AnyType.instance;
    }

    checkAttribute(context: Context) {
        const decl = context.findAttribute(this.name);
        return decl ? decl : super.checkAttribute(context);
    }

    checkMember(context: Context) {
        return this.resolveAndCheck(context, true);
    }

    interpret(context: Context): IValue {
        if(!this.resolved) {
            this.resolveAndCheck(context, false);
        }
        return this.resolved ? this.resolved.interpret(context) : NullValue.instance;
    }

    interpretReference(context: Context): IValue {
        if(!this.resolved) {
            this.resolveAndCheck(context, false);
        }
        return this.resolved ? this.resolved.interpretReference(context) : NullValue.instance;
    }

    checkQuery(context: Context) {
        return this.check(context);
    }

    interpretQuery(context: Context, builder: IQueryBuilder) {
        if(!this.resolved) {
            this.resolveAndCheck(context, false);
        }
        if(this.resolved?.isPredicate())
            (this.resolved as IPredicate).interpretQuery(context, builder);
    }

    declareQuery(transpiler: Transpiler) {
        if(!this.resolved) {
            this.resolveAndCheck(transpiler.context, false);
        }
        if(this.resolved?.isPredicate())
            (this.resolved as IPredicate).declareQuery(transpiler);
    }

    transpileQuery(transpiler: Transpiler, builderName: string) {
        if(!this.resolved) {
            this.resolveAndCheck(transpiler.context, false);
        }
        if(this.resolved?.isPredicate())
            (this.resolved as IPredicate).transpileQuery(transpiler, builderName);
    }

    resolveAndCheck(context: Context, forMember: boolean) {
        this.resolve(context, forMember);
        return this.resolved ? this.resolved.check(context) : VoidType.instance;
    }

    resolve(context: Context, forMember?: boolean, updateSelectorParent?: boolean) {
        if(updateSelectorParent)
            delete this.resolved;
        if(!this.resolved) {
            // ignore problems encountered during resolution
            context.pushProblemListener(new ProblemRaiser());
            try {
                this.resolved = this.doResolve(context, forMember || false, updateSelectorParent || false);
            } finally {
                // restore listener
                context.popProblemListener();
            }
        }
        if(!this.resolved)
            context.problemListener.reportUnknownIdentifier(this.id, this.name);
        return this.resolved;
    }

    doResolve(context: Context, forMember: boolean, updateSelectorParent: boolean) {
        let resolved = this.resolveSymbol(context);
        if(resolved)
            return resolved;
        resolved = this.resolveTypeOrConstructor(context, forMember);
        if(resolved)
            return resolved;
        resolved = this.resolveMethodCall(context, updateSelectorParent);
        if(resolved)
            return resolved;
        resolved = this.resolveInstance(context);
        if(resolved instanceof Section)
            resolved.copySectionFrom(this);
        return resolved ? resolved : undefined;
    }

    resolveTypeOrConstructor(context: Context, forMember: boolean): IExpression | undefined {
        // is first char uppercase?
        if (this.id.name[0].toUpperCase() != this.id.name[0])
            return undefined;
        if (forMember) {
            return this.resolveType(context);
        } else {
            return this.resolveConstructor(context);
        }
    }

    resolveInstance(context: Context): IExpression | undefined {
        try {
            const id = new InstanceExpression(this.id);
            id.check(context);
            return id;
        } catch(e) {
            if(e instanceof PromptoError) {
                return undefined;
            } else {
                throw e;
            }
        }
    }

    resolveMethodCall(context: Context, updateSelectorParent: boolean): IExpression | undefined {
        if(this.id.dialect != Dialect.E)
            return undefined;
        try {
            const selector = new MethodSelector(null, this.id);
            const call = new MethodCall(selector, null);
            call.check(context, updateSelectorParent);
            return call as unknown as IExpression; // TODO cleanup
        } catch(e) {
            if(e instanceof PromptoError) {
                return undefined;
            } else {
                throw e;
            }
        }
    }

    resolveConstructor(context: Context): IExpression | undefined {
        try {
            const method = new ConstructorExpression(new CategoryType(this.id), null, null);
            method.check(context);
            return method;
        } catch(e) {
            if(e instanceof PromptoError) {
                return undefined;
            } else {
                throw e;
            }
        }
    }

    resolveType(context: Context): IExpression | undefined {
        const decl = context.getRegistered(this.id);
        if(decl instanceof EnumeratedCategoryDeclaration) {
            return new TypeExpression(new EnumeratedCategoryType(this.id));
        } else if(decl instanceof CategoryDeclaration) {
            return new TypeExpression(new CategoryType(this.id));
        } else if(decl instanceof EnumeratedNativeDeclaration) {
            return new TypeExpression(decl.getType(context));
        } else {
            const allTypes = NativeType.all!;
            for(let i=0;i<allTypes.length;i++) {
                if (this.name == allTypes[i].name) {
                    return new TypeExpression(allTypes[i]);
                }
            }
        }
        return undefined;
    }

    resolveSymbol(context: Context): IExpression | undefined {
        if(this.id.name == this.id.name.toUpperCase()) {
            return new SymbolExpression(this.id);
        } else {
            return undefined;
        }
    }

    declare(transpiler: Transpiler): void {
        this.resolve(transpiler.context, false, true);
        if(this.resolved)
            this.resolved.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        this.resolve(transpiler.context, false, true);
        if(this.resolved)
            this.resolved.transpile(transpiler);
    }

    transpileReference(transpiler: Transpiler, method: MethodType) {
        if(!this.resolved) {
            this.resolveAndCheck(transpiler.context, false);
        }
        if(this.resolved)
            this.resolved.transpileReference(transpiler, method);
    }
}
