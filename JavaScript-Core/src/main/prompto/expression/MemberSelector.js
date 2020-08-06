var SelectorExpression = require("./SelectorExpression").SelectorExpression;
var UnresolvedIdentifier = null;
var NullReferenceError = require("../error/NullReferenceError").NullReferenceError;
var NullValue = require("../value/NullValue").NullValue;
var Dialect = require("../parser/Dialect").Dialect;
var MethodType = require("../type/MethodType").MethodType;
var VoidType = require("../type/VoidType").VoidType;
var ParenthesisExpression = null;
var UnresolvedCall = null;

exports.resolve = () => {
    UnresolvedIdentifier = require("./UnresolvedIdentifier").UnresolvedIdentifier;
    ParenthesisExpression = require("./ParenthesisExpression").ParenthesisExpression;
    UnresolvedCall = require("../statement/UnresolvedCall").UnresolvedCall;
};

class MemberSelector extends SelectorExpression {
    constructor(parent, id) {
        super(parent);
        this.id = id;
        return this;
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
            var type = this.check(writer.context);
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
        var parent = this.resolveParent(transpiler.context);
        parent.declareParent(transpiler);
        var parentType = this.checkParent(transpiler.context);
        return parentType.declareMember(transpiler, this, this.name);
    }

    transpile(transpiler) {
        var parent = this.resolveParent(transpiler.context);
        parent.transpileParent(transpiler);
        transpiler.append(".");
        var parentType = this.checkParent(transpiler.context);
        parentType.transpileMember(transpiler, this.name);
        return false;
    }

    toString() {
        return this.parent.toString() + "." + this.name;
    }

    check(context) {
        var parentType = this.checkParent(context);
        return parentType ? parentType.checkMember(context, this.id, this.name) : VoidType.instance;
    }

    interpret(context) {
        // resolve parent to keep clarity
        var parent = this.resolveParent(context);
        var instance = parent.interpret(context);
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

exports.MemberSelector = MemberSelector;

