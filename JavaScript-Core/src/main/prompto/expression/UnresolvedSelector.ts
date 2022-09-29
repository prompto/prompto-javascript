import SelectorBase from './SelectorBase'
import { UnresolvedIdentifier, MemberSelector, MethodSelector } from '../expression'
import { UnresolvedCall } from '../statement'
import {AnyType, IType} from '../type'
import { ProblemRaiser } from '../problem'
import { SyntaxError } from '../error'
import IExpression from "./IExpression";
import {ArgumentList, Identifier} from "../grammar";
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import {IValue, NullValue} from "../value";

export default class UnresolvedSelector extends SelectorBase {

    id: Identifier;
    resolved?: SelectorBase;

    constructor(parent: IExpression | undefined, id: Identifier) {
        super(parent);
        this.id = id;
        this.copySectionFrom(id);
    }

    get name() {
        return this.id.name;
    }

    toString() {
        return this.parent ? this.parent.toString() + '.' + this.name : this.name;
    }

    toDialect(writer: CodeWriter): void {
        try {
            this.resolve(writer.context, false);
        } catch (e) {
            // pass
        }
        if (this.resolved)
            this.resolved.toDialect(writer);
        else {
            if (this.parent)
                this.parent.parentToDialect(writer);
            writer.append('.');
            writer.append(this.name);
        }
    }

    check(context: Context): IType {
        return this.resolveAndCheck(context, false);
    }

    checkMember(context: Context) {
        return this.resolveAndCheck(context, false);
    }

    interpret(context: Context): IValue {
        this.resolveAndCheck(context, false);
        return this.resolved ? this.resolved.interpret(context) : NullValue.instance;
    }

    resolveAndCheck(context: Context, forMember: boolean) {
        this.resolve(context, forMember);
        return this.resolved ? this.resolved.check(context) : AnyType.instance;
    }

    resolve(context: Context, forMember: boolean) {
        if (!this.resolved)
            this.resolved = this.tryResolveMethod(context, null);
        if (!this.resolved)
            this.resolved = this.tryResolveMember(context);
        if (!this.resolved)
            throw new SyntaxError("Unknown identifier:" + this.name);
        return this.resolved;
    }

    resolveMethod(context: Context, assignments: ArgumentList | null) {
        if (!this.resolved)
            this.resolved = this.tryResolveMethod(context, assignments);
    }

    tryResolveMember(context: Context) {
        context.pushProblemListener(new ProblemRaiser());
        try {
            let resolvedParent = this.parent;
            if(resolvedParent instanceof UnresolvedIdentifier) {
                resolvedParent.checkMember(context);
                resolvedParent = resolvedParent.resolved || null;
            }
            const member = new MemberSelector(resolvedParent, this.id);
            member.check(context);
            return member;
        } catch (e) {
            if (e instanceof SyntaxError)
                return undefined;
            else
                throw e;
        } finally {
            context.popProblemListener();
        }
    }

    tryResolveMethod(context: Context, assignments: ArgumentList | null) {
        context.pushProblemListener(new ProblemRaiser());
        try {
            let resolvedParent = this.parent;
            if (resolvedParent instanceof UnresolvedIdentifier) {
                resolvedParent.checkMember(context);
                resolvedParent = resolvedParent.resolved || null;
            }
            const method = new UnresolvedCall(new MethodSelector(resolvedParent, this.id), assignments);
            method.check(context);
            return method;
        } catch (e) {
            if (e instanceof SyntaxError)
                return null;
            else
                throw e;
        } finally {
            context.popProblemListener();
        }
    }

    declare(transpiler: Transpiler): void {
        if (!this.resolved)
            this.resolve(transpiler.context, false);
        if (this.resolved)
            this.resolved.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        if (!this.resolved)
            this.resolve(transpiler.context, false);
        if (this.resolved)
            this.resolved.transpile(transpiler);
    }
}

