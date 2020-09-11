import SimpleStatement from "./SimpleStatement"
import { Dialect } from "../parser/index"
import { Identifier, ArgumentList } from "../grammar/index"
import { MethodFinder, MethodDeclarationMap, InstanceContext } from "../runtime/index"
import { AbstractMethodDeclaration, ConcreteMethodDeclaration, BuiltInMethodDeclaration, 
    DispatchMethodDeclaration, ArrowDeclaration, ClosureDeclaration } from "../declaration/index"
import { VoidType, MethodType } from "../type/index"
import { ThisExpression, MethodSelector } from "../expression/index"
import { SyntaxError, PromptoError, NotMutableError } from "../error/index"
import { CodeParameter } from "../param/index"
import { BooleanValue, ArrowValue, ClosureValue } from "../value/index"
import { CodeWriter } from "../utils/index"

export default class MethodCall extends SimpleStatement {
  
    constructor(selector, args) {
        super();
        this.selector = selector;
        this.args = args || null;
    }

    toDialect(writer) {
        if (this.requiresInvoke(writer))
            writer.append("invoke: ");
        this.selector.toDialect(writer);
        if (this.args != null)
            this.args.toDialect(writer);
        else if (writer.dialect!= Dialect.E)
            writer.append("()");
    }

    requiresInvoke(writer) {
        if (writer.dialect != Dialect.E || (this.args != null && this.args.length > 0))
            return false;
        try {
            const finder = new MethodFinder(writer.context, this);
            const declaration = finder.findMethod(false);
            /* if method is a reference, need to prefix with invoke */
            return declaration instanceof AbstractMethodDeclaration || declaration.closureOf !== null;
        } catch(e) {
            // ok
        }
        return false;
    }

    toString() {
        return this.selector.toString() + " " + (this.args!==null ? this.args.toString() : "");
    }

    check(context, updateSelectorParent) {
        const finder = new MethodFinder(context, this);
        const declaration = finder.findMethod(false);
        if(!declaration) {
            context.problemListener.reportUnknownMethod(this.selector.id);
            return VoidType.instance;
        }
        if(updateSelectorParent && declaration.memberOf && !this.selector.parent)
            this.selector.parent = new ThisExpression();
        const local = this.isLocalClosure(context) ? context : this.selector.newLocalCheckContext(context, declaration);
        // don't bubble up problems
        try {
            local.pushProblemListener();
            return this.checkDeclaration(declaration, context, local);
        } finally {
            local.popProblemListener();
        }
    }

    checkReference(context) {
        const finder = new MethodFinder(context, this);
        const method = finder.findMethod(false);
        if(method)
            return new MethodType(method);
        else
            return null;
    }

    isLocalClosure(context) {
        if (this.selector.parent !== null) {
            return false;
        }
        const decl = context.getLocalDeclaration(this.selector.name);
        return decl instanceof MethodDeclarationMap;
    }

    checkDeclaration(declaration, parent, local) {
        if(declaration instanceof ConcreteMethodDeclaration && declaration.mustBeCheckedInCallContext(parent)) {
            return this.fullCheck(declaration, parent, local);
        } else {
            return this.lightCheck(declaration, local);
        }
    }

    lightCheck(declaration, local) {
        declaration.registerParameters(local);
        return declaration.check(local, false);
    }

    fullCheck(declaration, parent, local) {
        try {
            const args = this.makeArguments(parent, declaration);
            declaration.registerParameters(local);
            args.forEach(argument => {
                const expression = argument.resolve(local, declaration, true);
                const value = argument.parameter.checkValue(parent, expression);
                local.setValue(argument.id, value);
            });
            return declaration.check(local, false);
        } catch (e) {
            if(e instanceof PromptoError) {
                throw new SyntaxError(e.message);
            }
        }
    }

    declare(transpiler) {
        const finder = new MethodFinder(transpiler.context, this);
        const declarations = finder.findCompatibleMethods(false, true);
        const first = declarations.size===1 ? declarations.values().next().value : null;
        if(declarations.size===1 && first instanceof BuiltInMethodDeclaration) {
            if(first.declareCall)
                first.declareCall(transpiler);
        } else {
            if(!this.isLocalClosure(transpiler.context)) {
                declarations.forEach(function(declaration) {
                    const local = this.selector.newLocalCheckContext(transpiler.context, declaration);
                    this.declareDeclaration(transpiler, declaration, local);
                }, this);
            }
            if(declarations.size>1 && !this.dispatcher) {
                const declaration = finder.findMethod(false);
                const sorted = finder.sortMostSpecificFirst(declarations);
                this.dispatcher = new DispatchMethodDeclaration(transpiler.context, this, declaration, sorted);
                transpiler.declare(this.dispatcher);
            }
        }
    }

    declareDeclaration(transpiler, declaration, local) {
        if (this.args != null)
            this.args.declare(transpiler, declaration);
        if(declaration instanceof ConcreteMethodDeclaration && declaration.mustBeCheckedInCallContext(transpiler.context)) {
            this.fullDeclareDeclaration(declaration, transpiler, local);
        } else {
            this.lightDeclareDeclaration(declaration, transpiler, local);
        }
    }

    lightDeclareDeclaration(declaration, transpiler, local) {
        transpiler = transpiler.copyTranspiler(local);
        declaration.declare(transpiler);
    }

    fullDeclareDeclaration(declaration, transpiler, local) {
        if(!this.fullSelector) {
            const args = this.makeArguments(transpiler.context, declaration);
            declaration.registerParameters(local);
            args.forEach(argument => {
                const expression = argument.resolve(local, declaration, true);
                const value = argument.parameter.checkValue(transpiler.context, expression);
                local.setValue(argument.id, value);
            });
            transpiler = transpiler.copyTranspiler(local);
            this.fullSelector = this.selector.newFullSelector(++fullDeclareCounter);
            declaration.fullDeclare(transpiler, this.fullSelector.id);
        }
    }

    transpile(transpiler) {
        this.doTranspile(transpiler, false);
    }

    transpileReference(transpiler) {
        this.doTranspile(transpiler, true);
    }

    doTranspile(transpiler, refOnly) {
        const finder = new MethodFinder(transpiler.context, this);
        const declarations = finder.findCompatibleMethods(false, true);
        if (declarations.size === 1) {
            const first = declarations.values().next().value;
            this.transpileSingle(transpiler, first, false, refOnly);
        } else
            this.transpileMultiple(transpiler, declarations, refOnly);
    }

    transpileSingle(transpiler, declaration, allowDerived, refOnly) {
        if (declaration instanceof BuiltInMethodDeclaration)
            this.transpileBuiltin(transpiler, declaration, refOnly);
        else {
            this.transpileSelector(transpiler, declaration);
            if(!refOnly)
                this.transpileAssignments(transpiler, declaration, allowDerived);
        }
    }

    transpileMultiple(transpiler, declarations, refOnly) {
        const name = this.dispatcher.getTranspiledName(transpiler.context);
        let parent = this.selector.resolveParent(transpiler.context);
        const first = declarations.values().next().value;
        if(parent==null && first.memberOf && transpiler.context.parent instanceof InstanceContext)
            parent = new ThisExpression();
        const selector = new MethodSelector(parent, new Identifier(name));
        selector.transpile(transpiler);
        if(!refOnly)
            this.transpileAssignments(transpiler, this.dispatcher);
    }

    transpileBuiltin(transpiler, declaration, refOnly) {
        const parent = this.selector.resolveParent(transpiler.context);
        parent.transpileParent(transpiler);
        transpiler.append(".");
        if(refOnly)
            transpiler.append(declaration.name);
        else
            declaration.transpileCall(transpiler, this.args, refOnly);
    }

    transpileSelector(transpiler, declaration) {
        let selector = this.fullSelector || this.selector;
        let parent = selector.resolveParent(transpiler.context);
        if (parent == null && declaration.memberOf && transpiler.context.parent instanceof InstanceContext)
            parent = new ThisExpression();
        let name = null;
        if(this.variableName)
            name = this.variableName;
        else if(this.fullSelector)
            name = this.fullSelector.name;
        else if(selector.name !== declaration.name)
            name = selector.name;
        else
            name = declaration.getTranspiledName(transpiler.context);
        selector = new MethodSelector(parent, new Identifier(name));
        selector.transpile(transpiler);
    }

    transpileAssignments(transpiler, declaration, allowDerived) {
        let args = this.makeArguments(transpiler.context, declaration);
        args = args.filter(argument => !(argument.parameter instanceof CodeParameter));
        if(args.length > 0) {
            transpiler.append("(");
            args.forEach(argument => {
                const parameter = argument.parameter;
                const expression = argument.resolve(transpiler.context, declaration, false, allowDerived);
                parameter.transpileCall(transpiler, expression);
                transpiler.append(", ");
            });
            transpiler.trimLast(2);
            transpiler.append(")");
        } else
            transpiler.append("()");
    }

    makeArguments(context, declaration) {
        return (this.args || new ArgumentList()).makeArguments(context, declaration);
    }

    interpret(context) {
        const declaration = this.findDeclaration(context);
        const local = this.selector.newLocalContext(context, declaration);
        declaration.registerParameters(local);
        const args = this.makeArguments(context, declaration);
        args.forEach(argument => {
            const expression = argument.resolve(local, declaration, true);
            const parameter = argument.parameter;
            const value = parameter.checkValue(context, expression);
            if(value!=null && parameter.mutable && !value.mutable)
                throw new NotMutableError();
            local.setValue(argument.id, value);
        });
        return declaration.interpret(local, true);
    }

    interpretReference(context) {
        const declaration = this.findDeclaration(context);
        return new ClosureValue(context, new MethodType(declaration));
    }

    interpretAssert(context, testMethodDeclaration) {
        const value = this.interpret(context);
        if(value instanceof BooleanValue)
            return value.value;
        else {
            const expected = this.getExpected(context, this.dialect);
            throw new SyntaxError("Cannot test '" + expected + "'");
        }
    }

    getExpected(context, dialect, escapeMode) {
        const writer = new CodeWriter(this.dialect, context);
        writer.escapeMode = escapeMode;
        this.toDialect(writer);
        return writer.toString();
    }

    transpileFound(transpiler, dialect) {
        transpiler.append("'<unknown>'");
    }

    findDeclaration(context) {
        const method = this.findRegistered(context);
        if(method)
            return method;
        else {
            // look for declared method
            const finder = new MethodFinder(context, this);
            return finder.findMethod(true);
        }
    }

    findRegistered(context) {
        // look for method as value
        if(!this.selector.parent)  try {
            const o = context.getValue(this.selector.id);
            if(o instanceof ClosureValue) {
                return this.getClosureDeclaration(context, o);
            } else if(o instanceof ArrowValue) {
                return new ArrowDeclaration(o);
            }
        } catch (e) {
            if(!(e instanceof PromptoError)) {
                throw e;
            }
        }
        return null;
    }

    getClosureDeclaration(context, closure) {
        const decl = closure.type.method;
        if(decl.memberOf!=null) {
            // the closure references a member method (useful when a method reference is needed)
            // in which case we may simply want to return that method to avoid spilling context into method body
            // this is only true if the closure comes straight from the method's instance context
            // if the closure comes from an accessible context that is not the instance context
            // then it is a local variable that needs the closure context to be interpreted
            const declaring = context.contextForValue(this.selector.name);
            if (declaring === closure.context)
                return decl;
        }
        return new ClosureDeclaration(closure);
    }
}

var fullDeclareCounter = 0;
