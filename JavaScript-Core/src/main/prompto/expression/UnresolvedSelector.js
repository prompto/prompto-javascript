const SyntaxError = require("../error/SyntaxError").SyntaxError;
const SelectorExpression = require("./SelectorExpression").SelectorExpression;
let MemberSelector = null;
let MethodSelector = null;
let UnresolvedCall = null;
let UnresolvedIdentifier = null;
const AnyType = require("../type/AnyType").AnyType;
const ProblemListener = require("../problem/ProblemListener").ProblemListener;

exports.resolve = () => {
    MemberSelector = require("./MemberSelector").MemberSelector;
    MethodSelector = require("./MethodSelector").MethodSelector;
    UnresolvedCall = require("../statement/UnresolvedCall").UnresolvedCall;
    UnresolvedIdentifier = require("./UnresolvedIdentifier").UnresolvedIdentifier;
}


class UnresolvedSelector extends SelectorExpression {
    constructor(parent, id) {
        super(parent);
        this.id = id;
        this.resolved = null;
        return this;
    }

    get name() {
        return this.id.name;
    }

    toString() {
        return this.parent ? this.parent.toString() + '.' + this.name : this.name;
    }

    toDialect(writer) {
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

    check(context) {
        return this.resolveAndCheck(context, false);
    }

    checkMember(context) {
        return this.resolveAndCheck(context, false);
    }

    interpret(context) {
        this.resolveAndCheck(context, false);
        return this.resolved.interpret(context);
    }

    resolveAndCheck(context, forMember) {
        this.resolve(context, forMember);
        return this.resolved ? this.resolved.check(context) : AnyType.instance;
    }

    resolve(context, forMember) {
        if (!this.resolved)
            this.resolved = this.tryResolveMethod(context, null);
        if (!this.resolved)
            this.resolved = this.tryResolveMember(context);
        if (!this.resolved)
            throw new SyntaxError("Unknown identifier:" + this.name);
        return this.resolved;
    }

    resolveMethod(context, assignments) {
        if (!this.resolved)
            this.resolved = this.tryResolveMethod(context, assignments);
    }

    tryResolveMember(context) {
        const listener = context.problemListener;
        try {
            context.problemListener = new ProblemListener();
            let resolvedParent = this.parent;
            if(resolvedParent instanceof UnresolvedIdentifier) {
                resolvedParent.checkMember(context);
                resolvedParent = resolvedParent.resolved;
            }
            const member = new MemberSelector(resolvedParent, this.id);
            member.check(context);
            return member;
        } catch (e) {
            if (e instanceof SyntaxError)
                return null;
            else
                throw e;
        } finally {
            context.problemListener = listener;
        }
    }

    tryResolveMethod(context, assignments) {
        const listener = context.problemListener;
        try {
            context.problemListener = new ProblemListener();
            let resolvedParent = this.parent;
            if (resolvedParent instanceof UnresolvedIdentifier) {
                resolvedParent.checkMember(context);
                resolvedParent = resolvedParent.resolved;
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
            context.problemListener = listener;
        }
    }

    declare(transpiler) {
        if (this.resolved == null)
            this.resolve(transpiler.context, false);
        this.resolved.declare(transpiler);
    }

    transpile(transpiler) {
        if (this.resolved == null)
            this.resolve(transpiler.context, false);
        this.resolved.transpile(transpiler);
    }
}


exports.UnresolvedSelector = UnresolvedSelector;

