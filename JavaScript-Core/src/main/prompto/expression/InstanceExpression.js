var Expression = require("./Expression").Expression;
var Variable = require("../runtime/Variable").Variable;
var LinkedVariable = require("../runtime/LinkedVariable").LinkedVariable;
var Parameter = require("../param/Parameter").Parameter;
var Dialect = require("../parser/Dialect").Dialect;
var CategoryDeclaration = null;
var VoidType = require("../type/VoidType").VoidType;
var BooleanType = require("../type/BooleanType").BooleanType;
var MethodType = require("../type/MethodType").MethodType;
var ClosureValue = require("../value/ClosureValue").ClosureValue;
var AttributeDeclaration = require("../declaration/AttributeDeclaration").AttributeDeclaration;
var MethodDeclarationMap = null;
var InstanceContext = null;
var EqualsExpression = null;
var EqOp = require("../grammar/EqOp").EqOp;
var BooleanLiteral = null;

exports.resolve = function() {
    CategoryDeclaration = require("../declaration/CategoryDeclaration").CategoryDeclaration;
    MethodDeclarationMap = require("../runtime/Context").MethodDeclarationMap;
    InstanceContext = require("../runtime/Context").InstanceContext;
    EqualsExpression = require("./EqualsExpression").EqualsExpression;
    BooleanLiteral = require("../literal/BooleanLiteral").BooleanLiteral;
}

class InstanceExpression extends Expression {
  
    constructor(id) {
        super();
        this.copySectionFrom.call(this, id);
        this.id = id;
    }

    get name() {
        return this.id.name;
    }

    toString() {
        return this.name;
    }

    declare(transpiler) {
        var named = transpiler.context.getRegistered(this.name);
        if(named instanceof MethodDeclarationMap) {
            var decl = named.getFirst();
            // don't declare member methods
            if(decl.memberOf!=null)
                return;
            // don't declare closures
            if(decl.declarationStatement)
                return;
            decl.declare(transpiler);
        }
    }

    transpile(transpiler) {
        var context = transpiler.context.contextForValue(this.name);
        if(context instanceof InstanceContext) {
            context.instanceType.transpileInstance(transpiler);
            transpiler.append(".");
        }
        var named = transpiler.context.getRegistered(this.name);
        if(named instanceof MethodDeclarationMap) {
            transpiler.append(named.getFirst().getTranspiledName());
            // need to bind instance methods
            if(context instanceof InstanceContext) {
                transpiler.append(".bind(");
                context.instanceType.transpileInstance(transpiler);
                transpiler.append(")");
            }
        } else {
            if (transpiler.getterName === this.name)
                transpiler.append("$");
            transpiler.append(this.name);
        }
    }

    toDialect(writer, requireMethod) {
        if(requireMethod === undefined)
            requireMethod = true;
        if(requireMethod && this.requiresMethod(writer))
            writer.append("Method: ");
        writer.append(this.name);
    }

    requiresMethod(writer) {
        if(writer.dialect!=Dialect.E)
            return false;
        var o = writer.context.getRegistered(this.name);
        if(o instanceof MethodDeclarationMap)
            return true;
        return false;
    }

    check(context) {
        var named = context.getRegistered(this.id.name);
        if(named==null) {
            named = context.getRegisteredDeclaration(this.id.name);
        }
        if (named instanceof Variable) { // local variable
            return named.getType(context);
        } else if(named instanceof LinkedVariable) { // local variable
            return named.getType(context);
        } else if (named instanceof Parameter) { // named argument
            return named.getType(context);
        } else if(named instanceof CategoryDeclaration) { // any p with x
            return named.getType(context);
        } else if(named instanceof AttributeDeclaration) { // in category method
            return named.getType(context);
        } else if(named instanceof MethodDeclarationMap) { // global method or closure
            return new MethodType(named.getFirst());
        } else {
            context.problemListener.reportUnknownVariable(this.id);
            return VoidType.instance;
        }
    }

    checkAttribute(context) {
        var decl = context.findAttribute(this.name);
        return decl ? decl : Expression.prototype.checkAttribute.call(this, context);
    }

    checkQuery(context) {
        return this.check(context);
    }

    interpret(context) {
        if(context.hasValue(this.id)) {
            return context.getValue(this.id);
        } else {
            var named = context.getRegistered(this.id);
            if (named instanceof MethodDeclarationMap) {
                var decl = named.getFirst();
                return new ClosureValue(context, new MethodType(decl))
            } else {
                throw new SyntaxError("No method with name:" + this.name);
            }
        }
    }

    toPredicate(context) {
        var decl = context.findAttribute(this.id.name);
        if(!decl)
            context.problemListener.reportUnknownIdentifier(this.id);
        else if(decl.getType()!=BooleanType.instance)
            context.problemListener.reportError(this.id, "Expected a Boolean, got: " + decl.getType());
        else
            return new EqualsExpression(this, EqOp.EQUALS, new BooleanLiteral("true"));
    }

    interpretQuery(context, builder) {
        var predicate = this.toPredicate(context);
        predicate && predicate.interpretQuery(context, builder);
    }

    declareQuery(transpiler) {
        var predicate = this.toPredicate(transpiler.context);
        predicate && predicate.declareQuery(transpiler);
    }

    transpileQuery(transpiler, builderName) {
        var predicate = this.toPredicate(transpiler.context);
        predicate && predicate.transpileQuery(transpiler, builderName);
    }
}


exports.InstanceExpression = InstanceExpression;
