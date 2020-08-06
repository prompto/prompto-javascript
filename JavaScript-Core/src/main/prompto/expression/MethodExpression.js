var Expression = require("./Expression").Expression;
var MethodType = require("../type/MethodType").MethodType;
var MethodDeclarationMap = null; // circular dependency
var Dialect = require("../parser/Dialect").Dialect;
var ClosureValue = require("../value/ClosureValue").ClosureValue;
var InstanceContext = null;

exports.resolve = () => {
    MethodDeclarationMap = require("../runtime/Context").MethodDeclarationMap;
    InstanceContext = require("../runtime/Context").InstanceContext;
};

class MethodExpression extends Expression {
    constructor(id) {
        super();
        this.id = id;
        return this;
    }

    get name() {
        return this.id.name;
    }

    toString() {
        return "Method: " + this.name;
    }

    toDialect(writer) {
        if(writer.dialect==Dialect.E)
            writer.append("Method: ");
        writer.append(this.name);
    }

    check(context) {
        var decl = this.getDeclaration(context);
        if (decl != null) {
            return new MethodType(decl);
        } else {
            context.problemListener.reportUnknownMethod(this.id);
        }
    }

    getDeclaration(context) {
        var methods = context.getRegistered(this.id);
        if(methods instanceof MethodDeclarationMap)
            return methods.getFirst();
        else
            return null;
    }

    interpret(context, asMethod) {
        if(context.hasValue(this.id)) {
            return context.getValue(this.id);
        } else {
            var named = context.getRegistered(this.id);
            if (named instanceof MethodDeclarationMap) {
                var decl = named.getFirst();
                return new ClosureValue(context, new MethodType(decl))
            } else {
                context.problemListener.reportUnknownMethod(this.id);
            }
        }
    }

    declare(transpiler) {
        var named = transpiler.context.getRegistered(this.name);
        var decl = named.getFirst();
        // don't declare closures
        if(!decl.declarationStatement)
            decl.declare(transpiler);
    }

    transpile(transpiler) {
        var named = transpiler.context.getRegistered(this.name);
        if(named instanceof MethodDeclarationMap) {
            var decl = named.getFirst();
            var context = transpiler.context.contextForValue(this.name);
            if (context instanceof InstanceContext) {
                context.instanceType.transpileInstance(transpiler);
                transpiler.append(".");
            }
            transpiler.append(decl.getTranspiledName(transpiler.context));
            // need to bind instance methods
            if (context instanceof InstanceContext) {
                transpiler.append(".bind(");
                context.instanceType.transpileInstance(transpiler);
                transpiler.append(")");
            }
        }
    }
}


exports.MethodExpression = MethodExpression;
