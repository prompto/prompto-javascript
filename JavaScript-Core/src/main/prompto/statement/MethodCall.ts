import SimpleStatement from './SimpleStatement'
import { Dialect } from '../parser'
import { Identifier, ArgumentList } from '../grammar'
import {MethodFinder, MethodDeclarationMap, InstanceContext, Context, Transpiler} from '../runtime'
import {
    AbstractMethodDeclaration,
    ConcreteMethodDeclaration,
    BuiltInMethodDeclaration,
    DispatchMethodDeclaration,
    ArrowDeclaration,
    ClosureDeclaration,
    IMethodDeclaration,
    AttributeDeclaration,
    TestMethodDeclaration
} from '../declaration'
import {VoidType, MethodType, IType} from '../type'
import {ThisExpression, MethodSelector, IAssertion} from '../expression'
import { SyntaxError, PromptoError, NotMutableError } from '../error'
import { CodeParameter } from '../param'
import {BooleanValue, ArrowValue, ClosureValue, IValue, NullValue} from '../value'
import { CodeWriter } from '../utils'
import { ProblemCollector } from '../problem'

export default class MethodCall extends SimpleStatement implements IAssertion {

    static fullDeclareCounter = 0;

    selector: MethodSelector;
    args: ArgumentList | null;
    variableName?: string;
    dispatcher?: DispatchMethodDeclaration;
    fullSelector?: MethodSelector;

    constructor(selector: MethodSelector, args: ArgumentList | null) {
        super();
        this.selector = selector;
        this.args = args || null;
    }

    toDialect(writer: CodeWriter): void {
        if (this.requiresInvoke(writer))
            writer.append("invoke: ");
        this.selector.toDialect(writer);
        if (this.args != null)
            this.args.toDialect(writer);
        else if (writer.dialect != Dialect.E)
            writer.append("()");
    }

    requiresInvoke(writer: CodeWriter) {
        if (writer.dialect != Dialect.E || (this.args != null && this.args.length > 0))
            return false;
        try {
            const finder = new MethodFinder(writer.context, this);
            const declaration = finder.findBest(false);
            /* if method is a reference, need to prefix with invoke */
            return declaration instanceof AbstractMethodDeclaration || (declaration && declaration.closureOf);
        } catch(e) {
            // ok
        }
        return false;
    }

    toString() {
        return this.selector.toString() + "(" + (this.args!=null ? this.args.toString() : "") + ")";
    }

    check(context: Context, updateSelectorParent?: boolean): IType {
        const finder = new MethodFinder(context, this);
        const declaration = finder.findBest(false);
        if(!declaration)
            return VoidType.instance;
        if(updateSelectorParent && declaration.memberOf && !this.selector.parent)
            this.selector.parent = new ThisExpression();
        if(declaration.isAbstract()) {
            this.checkAbstractOnly(context, declaration);
            return declaration.returnType || VoidType.instance;
        } else {
            const local = this.isLocalClosure(context) ? context : this.selector.newLocalCheckContext(context, declaration);
            // don't bubble up problems
            let listener = local.problemListener;
            if (listener instanceof ProblemCollector)
                listener = new ProblemCollector();
            local.pushProblemListener(listener);
            try {
                return this.checkDeclaration(declaration, context, local);
            } finally {
                local.popProblemListener();
            }
        }
    }

    checkAbstractOnly(context: Context, declaration: IMethodDeclaration) {
        if (declaration.isReference() || declaration.memberOf)
            return;
        // if a global method, need to check for runtime dispatch
        const finder = new MethodFinder(context, this);
        const potential = finder.findPotential();
        const filtered = [...potential].filter(m => !m.isAbstract());
        if (filtered.length == 0) {
            // raise error if direct call to pure abstract method
            context.problemListener.reportIllegalAbstractMethodCall(this, declaration.getSignature());
        }
    }

    checkReference(context: Context): IType | null {
        const finder = new MethodFinder(context, this);
        const method = finder.findBest(false);
        if(method)
            return new MethodType(method);
        else
            return null;
    }

    isLocalClosure(context: Context) {
        if (this.selector.parent != null) {
            return false;
        }
        const decl = context.getRegistered(this.selector.id);
        return decl instanceof MethodDeclarationMap;
    }

    checkDeclaration(declaration: IMethodDeclaration, parent: Context, local: Context): IType {
        if(declaration instanceof ConcreteMethodDeclaration && declaration.isTemplate()) {
            return this.fullCheck(declaration, parent, local);
        } else {
            return this.lightCheck(declaration, local);
        }
    }

    lightCheck(declaration: IMethodDeclaration, local: Context) {
        declaration.registerParameters(local);
        return declaration.check(local, false);
    }

    fullCheck(declaration: IMethodDeclaration, parent: Context, local: Context): IType {
        try {
            const args = this.makeArguments(parent, declaration);
            declaration.registerParameters(local);
            args.forEach(argument => {
                const expression = argument.resolve(local, declaration, true);
                const value = argument.parameter!.checkValue(parent, expression);
                local.setValue(argument.id!, value);
            });
            return declaration.check(local, false);
        } catch (e) {
            if(e instanceof PromptoError) {
                throw new SyntaxError(e.message);
            } else
                throw e;
        }
    }

    declare(transpiler: Transpiler): void {
        transpiler.context.pushProblemListener(new ProblemCollector());
        try {
            this.doDeclare(transpiler);
        } finally {
            transpiler.context.popProblemListener();
        }
    }

    doDeclare(transpiler: Transpiler): void {
        const finder = new MethodFinder(transpiler.context, this);
        const reference = finder.findBestReference(new Set<IMethodDeclaration>(), false);
        if(reference != null)
            return; // already declared
        const candidates = finder.findCandidates(false);
        if(candidates.size == 0)
            transpiler.context.problemListener.reportUnknownMethod(this.selector.id, this.selector.name);
        else {
            const compatibles = finder.filterCompatible(candidates,false, true);
            const first: IMethodDeclaration | null = compatibles.size == 1 ? compatibles.values().next().value as IMethodDeclaration: null;
            if (compatibles.size == 1 && first instanceof BuiltInMethodDeclaration) {
                first.declareCall(transpiler);
            } else {
                if (!this.isLocalClosure(transpiler.context)) {
                    compatibles.forEach(decl => {
                        const local = this.selector.newLocalCheckContext(transpiler.context, decl);
                        // noinspection JSPotentiallyInvalidUsageOfClassThis
                        this.declareDeclaration(transpiler, decl, local);
                    }, this);
                }
                if (compatibles.size > 1 && !this.dispatcher) {
                    const declaration = finder.findBest(false);
                    const sorted = finder.sortMostSpecificFirst(compatibles);
                    this.dispatcher = new DispatchMethodDeclaration(transpiler.context, this, declaration!, sorted);
                    transpiler.declare(this.dispatcher);
                }
            }
        }
    }

    declareDeclaration(transpiler: Transpiler, declaration: IMethodDeclaration, local: Context) {
        if (this.args != null)
            this.args.declare(transpiler, declaration);
        if(declaration instanceof ConcreteMethodDeclaration && declaration.isTemplate()) {
            this.fullDeclareDeclaration(transpiler, declaration, local);
        } else {
            this.lightDeclareDeclaration(transpiler, declaration, local);
        }
    }

    lightDeclareDeclaration(transpiler: Transpiler, declaration: IMethodDeclaration, local: Context) {
        transpiler = transpiler.copyTranspiler(local);
        declaration.declare(transpiler);
    }

    fullDeclareDeclaration(transpiler: Transpiler, declaration: IMethodDeclaration, local: Context) {
        if(!this.fullSelector) {
            const args = this.makeArguments(transpiler.context, declaration);
            declaration.registerParameters(local);
            args.forEach(argument => {
                const expression = argument.resolve(local, declaration, true);
                const value = argument.parameter!.checkValue(transpiler.context, expression);
                local.setValue(argument.id!, value);
            });
            transpiler = transpiler.copyTranspiler(local);
            this.fullSelector = this.selector.newFullSelector(++MethodCall.fullDeclareCounter);
            declaration.fullDeclare(transpiler, this.fullSelector.id);
        }
    }

    transpile(transpiler: Transpiler): void {
        this.doTranspile(transpiler, false);
    }

    transpileReference(transpiler: Transpiler, method: MethodType) {
        this.doTranspile(transpiler, true);
    }

    doTranspile(transpiler: Transpiler, refOnly: boolean) {
        const finder = new MethodFinder(transpiler.context, this);
        const decl = finder.findBestReference(new Set<IMethodDeclaration>(), false);
        if(decl != null) {
            this.transpileSelector(transpiler, decl);
            this.transpileAssignments(transpiler, decl, false);
            return;
        }
        const candidates = finder.findCandidates(false);
        if(candidates.size == 0)
            transpiler.context.problemListener.reportUnknownMethod(this.selector.id, this.selector.name);
        else {
            const compatibles = finder.filterCompatible(candidates, false, true);
            switch (compatibles.size) {
                case 0:
                    transpiler.context.problemListener.reportUnknownMethod(this.selector.id, this.selector.name);
                    break;
                case 1:
                    this.transpileSingle(transpiler, compatibles.values().next().value as IMethodDeclaration, false, refOnly);
                    break;
                default:
                    this.transpileMultiple(transpiler, compatibles, refOnly);
            }
        }
    }

    transpileSingle(transpiler: Transpiler, declaration: IMethodDeclaration, allowDerived = false, refOnly = false) {
        if (declaration instanceof BuiltInMethodDeclaration)
            this.transpileBuiltin(transpiler, declaration, refOnly);
        else {
            this.transpileSelector(transpiler, declaration);
            if(!refOnly)
                this.transpileAssignments(transpiler, declaration, allowDerived);
        }
    }

    transpileMultiple(transpiler: Transpiler, declarations: Set<IMethodDeclaration>, refOnly = false) {
        const name = this.dispatcher!.getTranspiledName(transpiler.context);
        let parent = this.selector.resolveParent(transpiler.context);
        const first = declarations.values().next().value as IMethodDeclaration;
        if(parent==null && first.memberOf && transpiler.context.parent instanceof InstanceContext)
            parent = new ThisExpression();
        const selector = new MethodSelector(parent, new Identifier(name));
        selector.transpile(transpiler);
        if(!refOnly)
            this.transpileAssignments(transpiler, this.dispatcher!);
    }

    transpileBuiltin(transpiler: Transpiler, declaration: IMethodDeclaration, refOnly = false) {
        const parent = this.selector.resolveParent(transpiler.context);
        parent.transpileParent(transpiler);
        transpiler.append(".");
        if(refOnly)
            transpiler.append(declaration.name);
        else
            declaration.transpileCall(transpiler, this.args, refOnly);
    }

    transpileSelector(transpiler: Transpiler, declaration: IMethodDeclaration) {
        let selector = this.fullSelector || this.selector;
        let parent = selector.resolveParent(transpiler.context);
        if (parent == null && declaration.memberOf && transpiler.context.parent instanceof InstanceContext)
            parent = new ThisExpression();
        let name = null;
        if(this.variableName)
            name = this.variableName;
        else if(this.fullSelector)
            name = this.fullSelector.name;
        else if(selector.name != declaration.name)
            name = selector.name;
        else
            name = declaration.getTranspiledName(transpiler.context);
        selector = new MethodSelector(parent, new Identifier(name));
        selector.transpile(transpiler);
    }

    transpileAssignments(transpiler: Transpiler, declaration: IMethodDeclaration, allowDerived = false) {
        const args = this.makeArguments(transpiler.context, declaration);
        const filtered = args.filter(argument => !(argument.parameter instanceof CodeParameter));
        if(filtered.length > 0) {
            transpiler.append("(");
            filtered.forEach(argument => {
                const expression = argument.resolve(transpiler.context, declaration, false, allowDerived);
                argument.parameter!.transpileCall(transpiler, expression);
                transpiler.append(", ");
            });
            transpiler.trimLast(2);
            transpiler.append(")");
        } else
            transpiler.append("()");
    }

    makeArguments(context: Context, declaration: IMethodDeclaration) {
        return (this.args || new ArgumentList()).makeArguments(context, declaration);
    }

    interpret(context: Context): IValue {
        const finder = new MethodFinder(context, this);
        const declaration = finder.findBest(true);
        if(declaration) {
            const local = this.selector.newLocalContext(context, declaration);
            declaration.registerParameters(local);
            this.assignArguments(context, local, declaration);
            return declaration.interpret(local) || NullValue.instance;
        } else {
            context.problemListener.reportUnknownMethod(this, this.toString());
            return NullValue.instance
        }
    }

    assignArguments(calling: Context, local: Context, declaration: IMethodDeclaration) {
        const args = this.makeArguments(calling, declaration);
        args.forEach(argument => {
            const expression = argument.resolve(local, declaration, true);
            const parameter = argument.parameter!;
            const value = parameter.checkValue(calling, expression);
            if(value!=null && parameter.mutable && !value.mutable)
                throw new NotMutableError();
            local.setValue(argument.id!, value);
        });

    }

    interpretReference(context: Context): IValue {
        const declaration = this.findDeclaration(context);
        return declaration ? new ClosureValue(context, new MethodType(declaration)) : NullValue.instance;
    }

    interpretAssert(context: Context, testMethodDeclaration: TestMethodDeclaration) {
        const value = this.interpret(context);
        if(value instanceof BooleanValue)
            return value.value;
        else {
            const expected = this.getExpected(context, this.dialect, 0);
            throw new SyntaxError("Cannot test '" + expected + "'");
        }
    }

    getExpected(context: Context, dialect: Dialect, escapeMode: number) {
        const writer = new CodeWriter(this.dialect, context);
        writer.escapeMode = escapeMode;
        this.toDialect(writer);
        return writer.toString();
    }

    transpileFound(transpiler: Transpiler, dialect: Dialect) {
        transpiler.append("'<unknown>'");
    }

    findDeclaration(context: Context): IMethodDeclaration | null {
        const method = this.findRegistered(context);
        if(method)
            return method;
        else {
            // look for declared method
            const finder = new MethodFinder(context, this);
            return finder.findBest(true);
        }
    }

    findRegistered(context: Context): IMethodDeclaration | null {
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

    getClosureDeclaration(context: Context, closure: ClosureValue) {
        const decl = closure.value.method;
        if(decl.memberOf!=null) {
            // the closure references a member method (useful when a method reference is needed)
            // in which case we may simply want to return that method to avoid spilling context into method body
            // this is only true if the closure comes straight from the method's instance context
            // if the closure comes from an accessible context that is not the instance context
            // then it is a local variable that needs the closure context to be interpreted
            const declaring = context.contextForValue(this.selector.id);
            if (declaring == closure.context)
                return decl;
        }
        return new ClosureDeclaration(closure);
    }

    checkAssert(context: Context): Context {
        throw new Error("Should never get there!");
    }

    checkAttribute(context: Context): AttributeDeclaration | null {
        throw new Error("Should never get there!");
    }

    equals(other: any): boolean {
        throw new Error("Should never get there!");
    }

    isAssertion(): boolean {
        throw new Error("Should never get there!");
    }

    isPredicate(): boolean {
        throw new Error("Should never get there!");
    }
}


