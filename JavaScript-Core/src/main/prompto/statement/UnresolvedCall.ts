import BaseStatement from './BaseStatement'
import {Dialect, Section} from '../parser'
import {VoidType, MethodType, CategoryType, IType} from '../type'
import { CodeWriter } from '../utils'
import {
    UnresolvedIdentifier,
    UnresolvedSelector,
    MemberSelector,
    MethodSelector,
    ConstructorExpression,
    SelectorExpression,
    IExpression, IAssertion
} from '../expression'
import { MethodCall } from '../statement'
import {AttributeDeclaration, CategoryDeclaration, TestMethodDeclaration} from '../declaration'
import { SyntaxError } from '../error'
import {ArgumentList, Identifier} from "../grammar";
import {Context, InstanceContext, Transpiler} from "../runtime";
import {IValue, NullValue} from "../value";

export default class UnresolvedCall extends BaseStatement implements IAssertion {

    caller: IExpression;
    args: ArgumentList | null;
    resolved?: IExpression;
    
    constructor(caller: IExpression, args: ArgumentList | null) {
        super();
        this.caller = caller;
        this.args = args || null;
    }

    isSimple() {
        return true;
    }

    isPredicate(): boolean {
        return false;
    }

    isAssertion(): boolean {
        return true;
    }

    checkAttribute(context: Context): AttributeDeclaration | null {
        return null;
    }

    equals(other: any) {
        return this.resolved ? this.resolved.equals(other) : false;
    }

    toDialect(writer: CodeWriter): void {
        try {
            this.resolve(writer.context);
            this.resolved!.toDialect(writer);
        } catch(error) {
            this.caller.toDialect(writer);
            if(this.args!=null)
               this.args.toDialect(writer);
            else if(writer.dialect != Dialect.E)
                writer.append("()");
        }
    }

    toString() {
        return this.caller.toString() + (this.args!=null ? this.args.toString() : "");
    }

    check(context: Context): IType {
        return this.resolveAndCheck(context);
    }

    resolveAndCheck(context: Context): IType {
        this.resolve(context);
        return this.resolved ? this.resolved.check(context) : VoidType.instance;
    }

    interpret(context: Context): IValue {
        this.resolve(context);
        const result = this.resolved ? this.resolved.interpret(context) : null;
        return result || NullValue.instance; // TODO only use NullValue when interpreted as expression
    }

    interpretReference(context: Context): IValue {
        this.resolve(context);
        return this.resolved ? this.resolved.interpretReference(context) : NullValue.instance;
    }

    interpretAssert(context: Context, testMethodDeclaration: TestMethodDeclaration) {
        this.resolve(context);
        if (this.resolved && this.resolved.isAssertion())
            return (this.resolved as IAssertion).interpretAssert(context, testMethodDeclaration);
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

    resolve(context: Context) {
        if(!this.resolved) {
            let resolved: IExpression | null = null;
            if(this.caller instanceof UnresolvedIdentifier) {
                resolved = this.resolveUnresolvedIdentifier(context, this.caller.id);
            } else if(this.caller instanceof UnresolvedSelector) {
                resolved = this.resolveUnresolvedSelector(context, this.caller);
            } else if (this.caller instanceof MemberSelector) {
                resolved = this.resolveMember(context, this.caller);
            }
            if(resolved)
                return this.resolved;
            else
                context.problemListener.reportUnknownMethod(this.caller.asSection() || this, this.caller.toString());
        }
    }

    resolveUnresolvedSelector(context: Context, caller: UnresolvedSelector): IExpression | null {
        caller.resolveMethod(context, this.args);
        return caller.resolved || null;
    }

    resolveUnresolvedIdentifier(context: Context, id: Identifier): IExpression | null {
        let resolved: IExpression | null = this.resolveUnresolvedMemberMethod(context, id);
        if (!resolved)
            resolved = this.resolveUnresolvedMethodReference(context, id);
        if (!resolved)
            resolved = this.resolveUnresolvedDeclaration(context, id);
        if (!resolved)
            context.problemListener.reportUnknownMethod(this, id.name);
        else
            (resolved.asSection()).copySectionFrom(this);
        return resolved;
    }


    resolveUnresolvedMemberMethod(context: Context | null, id: Identifier): IExpression | null {
        while (context) {
            const instance = context.getClosestInstanceContext();
            if (!instance)
                return null;
            const decl = this.resolveUnresolvedMember(instance, id);
            if (decl)
                return new MethodCall(new MethodSelector(null, id), this.args);
            else
                context = instance.getParentContext();
        }
        return null;
    }


    resolveUnresolvedMethodReference(context: Context, id: Identifier) {
        const named = context.getRegisteredInstance(id);
        if(named == null)
            return null;
        let type = named.getType(context);
        if(type != null) {
            type = type.resolve(context);
            if(type instanceof MethodType) {
                const call = new MethodCall(new MethodSelector(null, id), this.args);
                call.variableName = id.name;
                return call;
            }
        }
        return null;
    }


    resolveUnresolvedDeclaration(context: Context, id: Identifier) {
        const decl = context.getRegistered(id);
        if (!decl)
            return null;
        else if (decl instanceof CategoryDeclaration)
            return new ConstructorExpression(new CategoryType(id), null, this.args);
        else
            return new MethodCall(new MethodSelector(null, id), this.args);
    }

    // noinspection JSMethodCanBeStatic
    resolveUnresolvedMember(context: Context, id: Identifier) {
        if(context instanceof InstanceContext) {
            const decl = context.getRegistered(context.instanceType.id);
            if (decl instanceof CategoryDeclaration) {
                const methods = decl.getMemberMethodsMap(context, id);
                if (methods != null && !methods.isEmpty())
                    return methods;
            }
        }
        return null;
    }

    resolveMember(context: Context, caller: MemberSelector): IExpression | null {
        const call = new MethodCall(new MethodSelector(caller.parent || null, caller.id), this.args);
        call.copySectionFrom(this);
        return call;
    }

    declare(transpiler: Transpiler): void {
        this.resolve(transpiler.context);
        if(this.resolved)
            this.resolved.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        this.resolve(transpiler.context);
        if(this.resolved)
            this.resolved.transpile(transpiler);
    }

    transpileReference(transpiler: Transpiler, method: MethodType): void {
        this.resolve(transpiler.context);
        if(this.resolved)
            this.resolved.transpileReference(transpiler, method);
    }

    setParent(parent: IExpression) {
        if(parent) {
            if(this.caller instanceof UnresolvedIdentifier)
                this.caller = new MethodSelector(parent, this.caller.id);
            else if(this.caller instanceof SelectorExpression)
                this.caller.parent = parent;
            else
                throw new Error("Should never happen!");
        }
    }

    checkAssert(context: Context): Context {
        return context;
    }

    locateSectionAtLine(line: number): Section | null {
        return this;
    }

}
