import Expression from './Expression.js'
import { InstanceExpression, MethodSelector, ConstructorExpression, TypeExpression, SymbolExpression } from './index.js'
import { VoidType, CategoryType, EnumeratedCategoryType, NativeType } from '../type/index.js'
import { ProblemRaiser } from '../problem/index.js'
import { PromptoError } from '../error/index.js'
import { MethodCall } from '../statement/index.js'
import { EnumeratedCategoryDeclaration, EnumeratedNativeDeclaration, CategoryDeclaration } from '../declaration/index.js'
import { Dialect } from '../parser/index.js'

export default class UnresolvedIdentifier extends Expression {
 
    constructor(id) {
        super();
        this.id = id;
        this.resolved = null;
    }

    get name() {
        return this.id.name;
    }

    toString() {
        return this.id.name;
    }

    toDialect(writer) {
        try {
            this.resolve(writer.context, false, false);
        } catch(e) {
            /* eslint no-empty: [ "off" ] */
        }
        if(this.resolved!=null)
            this.resolved.toDialect(writer);
        else
            writer.append(this.id.name);
    }

    check(context) {
        return this.resolveAndCheck(context, false);
    }

    checkReference(context) {
        this.resolve(context);
        return this.resolved.checkReference(context);
    }

    checkAttribute(context) {
        const decl = context.findAttribute(this.name);
        return decl ? decl : super.checkAttribute(context);
    }

    checkQuery(context) {
        return this.check(context);
    }

    checkMember(context) {
        return this.resolveAndCheck(context, true);
    }

    interpret(context) {
        if(this.resolved==null) {
            this.resolveAndCheck(context, false);
        }
        return this.resolved.interpret(context);
    }

    interpretReference(context) {
        if(this.resolved==null) {
            this.resolveAndCheck(context, false);
        }
        return this.resolved.interpretReference(context);
    }

    interpretQuery(context, builder) {
        if(this.resolved==null) {
            this.resolveAndCheck(context, false);
        }
        this.resolved.interpretQuery(context, builder);
    }

    declareQuery(transpiler) {
        if(this.resolved==null) {
            this.resolveAndCheck(transpiler.context, false);
        }
        this.resolved && this.resolved.declareQuery(transpiler);
    }

    transpileQuery(transpiler, builderName) {
        if(this.resolved==null) {
            this.resolveAndCheck(transpiler.context, false);
        }
        this.resolved && this.resolved.transpileQuery(transpiler, builderName);
    }

    resolveAndCheck(context, forMember) {
        this.resolve(context, forMember);
        return this.resolved ? this.resolved.check(context) : VoidType.instance;
    }

    resolve(context, forMember, updateSelectorParent) {
        if(updateSelectorParent)
            this.resolved = null;
        if(this.resolved==null) {
            // ignore problems encountered during resolution
            context.pushProblemListener(new ProblemRaiser());
            try {
                this.resolved = this.doResolve(context, forMember, updateSelectorParent);
            } finally {
                // restore listener
                context.popProblemListener();
            }
        }
        if(this.resolved==null)
            context.problemListener.reportUnknownIdentifier(this.id, this.name);
        return this.resolved;
    }

    doResolve(context, forMember, updateSelectorParent) {
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
        if(resolved !== null)
            resolved.copySectionFrom(this);
        return resolved;
    }

    resolveTypeOrConstructor(context, forMember) {
        // is first char uppercase?
        if (this.id.name[0].toUpperCase() !== this.id.name[0])
            return null;
        if (forMember) {
            return this.resolveType(context);
        } else {
            return this.resolveConstructor(context);
        }
    }

    resolveInstance(context) {
        try {
            const id = new InstanceExpression(this.id);
            id.check(context);
            return id;
        } catch(e) {
            if(e instanceof PromptoError) {
                return null;
            } else {
                throw e;
            }
        }
    }

    resolveMethodCall(context, updateSelectorParent) {
        if(this.id.dialect !== Dialect.E)
            return null;
        try {
            const selector = new MethodSelector(null, this.id);
            const call = new MethodCall(selector);
            call.check(context, updateSelectorParent);
            return call;
        } catch(e) {
            if(e instanceof PromptoError) {
                return null;
            } else {
                throw e;
            }
        }
    }

    resolveConstructor(context) {
        try {
            const method = new ConstructorExpression(new CategoryType(this.id), null, null);
            method.check(context);
            return method;
        } catch(e) {
            if(e instanceof PromptoError) {
                return null;
            } else {
                throw e;
            }
        }
    }

    resolveType(context) {
        const decl = context.getRegisteredDeclaration(this.id);
        if(decl instanceof EnumeratedCategoryDeclaration) {
            return new TypeExpression(new EnumeratedCategoryType(this.id));
        } else if(decl instanceof CategoryDeclaration) {
            return new TypeExpression(new CategoryType(this.id));
        } else if(decl instanceof EnumeratedNativeDeclaration) {
            return new TypeExpression(decl.getType(context));
        } else {
            const allTypes = NativeType.getAll();
            for(let i=0;i<allTypes.length;i++) {
                if (this.name === allTypes[i].name) {
                    return new TypeExpression(allTypes[i]);
                }
            }
        }
        return null;
    }

    resolveSymbol(context) {
        if(this.id.name === this.id.name.toUpperCase()) {
            return new SymbolExpression(this.id);
        } else {
            return null;
        }
    }

    declare(transpiler) {
        this.resolve(transpiler.context, false, true);
        this.resolved.declare(transpiler);
    }

    transpile(transpiler) {
        this.resolve(transpiler.context, false, true);
        this.resolved.transpile(transpiler);
    }

    transpileMethodReference(transpiler, method) {
        if(this.resolved==null) {
            this.resolveAndCheck(transpiler.context, false);
        }
        return this.resolved.transpileMethodReference(transpiler, method);
    }
}
