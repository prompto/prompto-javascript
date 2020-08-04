var BaseStatement = require("./BaseStatement").BaseStatement;
var UnresolvedIdentifier = require("../expression/UnresolvedIdentifier").UnresolvedIdentifier;
var MethodCall = require("./MethodCall").MethodCall;
var MemberSelector = require("../expression/MemberSelector").MemberSelector;
var MethodSelector = require("../expression/MethodSelector").MethodSelector;
var UnresolvedSelector = require("../expression/UnresolvedSelector").UnresolvedSelector;
var SelectorExpression = require("../expression/SelectorExpression").SelectorExpression;
var CategoryDeclaration = require("../declaration/CategoryDeclaration").CategoryDeclaration;
var ConstructorExpression = require("../expression/ConstructorExpression").ConstructorExpression;
var CategoryType = require("../type/CategoryType").CategoryType;
var MethodType = require("../type/MethodType").MethodType;
var VoidType = require("../type/VoidType").VoidType;
var CodeWriter = require("../utils/CodeWriter").CodeWriter;
var Dialect = require("../parser/Dialect").Dialect;

class UnresolvedCall extends BaseStatement {
 
    constructor(callable, args) {
        super();
        this.resolved = null;
        this.callable = callable;
        this.args = args || null;
    }

    isSimple() {
        return true;
    }

    toDialect(writer) {
        try {
            this.resolve(writer.context);
            this.resolved.toDialect(writer);
        } catch(error) {
            this.callable.toDialect(writer);
            if(this.args!=null)
               this.args.toDialect(writer);
            else if(writer.dialect !== Dialect.E)
                writer.append("()");
        }
    }

    toString() {
        return this.callable.toString() + (this.args!=null ? this.args.toString() : "");
    }

    check(context) {
        return this.resolveAndCheck(context);
    }

    resolveAndCheck(context) {
        this.resolve(context);
        return this.resolved ? this.resolved.check(context) : VoidType.instance;
    }

    interpret(context) {
        this.resolve(context);
        return this.resolved ? this.resolved.interpret(context) : null;
    }

    interpretAssert(context, testMethodDeclaration) {
        this.resolve(context);
        if (this.resolved && this.resolved.interpretAssert)
            return this.resolved.interpretAssert(context, testMethodDeclaration);
        else {
            var expected = this.getExpected(context, this.dialect);
            throw new SyntaxError("Cannot test '" + expected + "'");
        }
    }

    getExpected(context, dialect, escapeMode) {
        var writer = new CodeWriter(this.dialect, context);
        writer.escapeMode = escapeMode;
        this.toDialect(writer);
        return writer.toString();
    }

    transpileFound(transpiler, dialect) {
        transpiler.append("'<unknown>'");
    }

    resolve(context) {
        if(this.resolved===null) {
            if(this.callable instanceof UnresolvedIdentifier) {
                this.resolved = this.resolveUnresolvedIdentifier(context);
            } else if(this.callable instanceof UnresolvedSelector) {
                this.resolved = this.resolveUnresolvedSelector(context);
            } else if (this.callable instanceof MemberSelector) {
                this.resolved = this.resolveMember(context);
            }
            if(this.resolved)
                return this.resolved;
            else
                context.problemListener.reportUnknownMethod(this.callable);
        }
    }

    resolveUnresolvedSelector(context) {
        this.callable.resolveMethod(context, this.args);
        return this.callable.resolved;
    }

    resolveUnresolvedIdentifier(context) {
        var id = this.callable.id;
        var call, decl = null;
        // if this happens in the context of a member method, then we need to check for category members first
        var instance = context.getClosestInstanceContext();
        if(instance!=null) {
            decl = this.resolveUnresolvedMember(instance, id.name);
            if(decl!=null)
                call = new MethodCall(new MethodSelector(null, id), this.args);
        }
        // could be a local instance
        if(call==null) {
            var named = context.getRegisteredValue(id.name);
            if(named !== null) {
                var type = named.getType(context);
                if(type != null) {
                    type = type.resolve(context);
                    if(type instanceof MethodType) {
                        call = new MethodCall(new MethodSelector(null, id), this.args);
                        call.variableName = id.name;
                    }
                }
            }
        }
        // could be a declaration
        if(call==null) {
            decl = context.getRegisteredDeclaration(id.name);
            if (decl === null) {
                context.problemListener.reportUnknownMethod(id);
                return null;
            }
            if (decl instanceof CategoryDeclaration) {
                call = new ConstructorExpression(new CategoryType(id), null, this.args, false);
            } else {
                call = new MethodCall(new MethodSelector(null, id), this.args);
            }
        }
        call.copySectionFrom(this);
        return call;
    }

    resolveUnresolvedMember(context, name) {
        var decl = context.getRegisteredDeclaration(context.instanceType.name);
        var methods = decl.getMemberMethodsMap(context, name);
        if(methods!=null && !methods.isEmpty())
            return methods;
        else
            return null;
    }

    resolveMember(context) {
        var call = new MethodCall(new MethodSelector(this.callable.parent, this.callable.id), this.args);
        call.copySectionFrom(this);
        return call;
    }

    declare(transpiler) {
        this.resolve(transpiler.context);
        if(this.resolved)
            this.resolved.declare(transpiler);
    }

    transpile(transpiler) {
        this.resolve(transpiler.context);
        if(this.resolved)
            this.resolved.transpile(transpiler);
    }

    setParent(parent) {
        if(parent) {
            if(this.callable instanceof UnresolvedIdentifier)
                this.callable = new MethodSelector(parent, this.callable.id);
            else if(this.callable instanceof SelectorExpression)
                this.callable.parent = parent;
            else
                throw new Error("Should never happen!");
        }
    }
}

exports.UnresolvedCall = UnresolvedCall;