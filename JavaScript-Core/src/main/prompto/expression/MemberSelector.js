
export default class MemberSelector extends SelectorExpression {

    constructor(parent, id) {
        super(parent);
        this.id = id;
    }

    get name() {
        return this.id.name;
    }

    toDialect(writer) {
        if (writer.dialect == Dialect.E)
            this.toEDialect(writer);
        else
            this.toOMDialect(writer);
    }

    toEDialect(writer) {
        try {
            const type = this.check(writer.context);
            if (type instanceof MethodType) {
                writer.append("Method: ");
            }
        } catch (e) {
            // gracefully skip exceptions
        }
       this.parentAndMemberToDialect(writer);
    }

    toOMDialect(writer) {
        this.parentAndMemberToDialect(writer);
    }

    parentAndMemberToDialect(writer) {
        // ensure singletons are not treated as constructors
        try {
            this.resolveParent(writer.context);
        } catch(e) {
            // ignore
        }
        if (writer.dialect == Dialect.E)
            this.parentToEDialect(writer);
        else
            this.parentToOMDialect(writer);
        writer.append(".");
        writer.append(this.name);
    }

    parentToEDialect(writer) {
        if(this.parent instanceof UnresolvedCall) {
            writer.append('(');
            this.parent.toDialect(writer);
            writer.append(')');
        } else
            this.parent.parentToDialect(writer);
    }

    parentToOMDialect(writer) {
        if(this.parent instanceof ParenthesisExpression && this.parent.expression instanceof UnresolvedCall)
            this.parent.expression.toDialect(writer);
        else
            this.parent.parentToDialect(writer);
    }

    declare(transpiler) {
        const parent = this.resolveParent(transpiler.context);
        parent.declareParent(transpiler);
        const parentType = this.checkParent(transpiler.context);
        return parentType.declareMember(transpiler, this, this.name);
    }

    transpile(transpiler) {
        const parent = this.resolveParent(transpiler.context);
        parent.transpileParent(transpiler);
        transpiler.append(".");
        const parentType = this.checkParent(transpiler.context);
        parentType.transpileMember(transpiler, this.name);
        return false;
    }

    toString() {
        return this.parent.toString() + "." + this.name;
    }

    check(context) {
        const parentType = this.checkParent(context);
        return parentType ? parentType.checkMember(context, this.id, this.name) : VoidType.instance;
    }

    interpret(context) {
        // resolve parent to keep clarity
        const parent = this.resolveParent(context);
        const instance = parent.interpret(context);
        if (instance == null || instance == NullValue.instance)
            throw new NullReferenceError();
        else
            return instance.getMemberValue(context, this.name, true);
    }

    resolveParent(context) {
        if(this.parent instanceof UnresolvedIdentifier) {
            this.parent.checkMember(context);
            return this.parent.resolved;
        } else
            return this.parent;
    }
}