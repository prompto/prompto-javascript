var AnyType = require("../type/AnyType").AnyType;
var CategoryType = require("../type/CategoryType").CategoryType;
var IntegerValue = require("../value/IntegerValue").IntegerValue;
var DecimalValue = require("../value/DecimalValue").DecimalValue;
var IntegerType = require("../type/IntegerType").IntegerType;
var DecimalType = require("../type/DecimalType").DecimalType;
var NativeType = require("../type/NativeType").NativeType;
var IterableType = require("../type/IterableType").IterableType;
var MethodType = require("../type/MethodType").MethodType;
var MethodDeclarationMap = require("../runtime/Context").MethodDeclarationMap;

function anify(type) {
    if(type instanceof CategoryType && type.name === "Any")
        return AnyType.instance;
    else
        return type;
}


function getTargetType(context, itype) {
    if (itype instanceof IterableType) {
        var itemType = getTargetType(context, itype.itemType);
        return itype.withItemType(itemType);
    } else if (itype instanceof NativeType) {
        return itype
    } else
        return getTargetAtomicType(context, itype);
}


function getTargetAtomicType(context, itype) {
    var decl = context.getRegisteredDeclaration(itype.id);
    if (decl == null) {
        context.problemListener.reportUnknownIdentifier(itype.id, itype);
        return null;
    } else if (decl instanceof MethodDeclarationMap) {
        if (decl.size() == 1)
            return new MethodType(decl.getFirst());
        else {
            context.problemListener.reportAmbiguousIdentifier(itype.id, itype);
            return null;
        }
    } else
        return decl.getType(context);
}


function CastExpression(expression, type) {
    this.expression = expression;
    this.type = anify(type);
    return this;
}

CastExpression.prototype.check = function(context) {
    var actual = anify(this.expression.check(context));
    var target = getTargetType(context, this.type);
    // check Any
    if(actual === AnyType.instance)
        return target;
    // check upcast
    if(target.isAssignableFrom(context, actual))
        return target;
    // check downcast
    if(actual.isAssignableFrom(context, target))
        return target;
    context.problemListener.reportInvalidCast(this, this.type, actual);
};

CastExpression.prototype.interpret = function(context) {
    var value = this.expression.interpret(context);
    var target = getTargetType(context, this.type);
    if(value) {
        if (value instanceof IntegerValue && target==DecimalType.instance) {
            value = new DecimalValue(value.DecimalValue());
        } else if (value instanceof DecimalValue && target==IntegerType.instance) {
            value = new IntegerValue(value.IntegerValue());
        } else if (target.isMoreSpecificThan(context, value.type)) {
            value.type = this.type;
        }
    }
    return value;
};

CastExpression.prototype.declare = function(transpiler) {
    this.expression.declare(transpiler);
    var target = getTargetType(transpiler.context, this.type);
    target.declare(transpiler);
};


CastExpression.prototype.transpile = function(transpiler) {
    var expType = this.expression.check(transpiler.context);
    if(expType===DecimalType.instance && this.type===IntegerType.instance) {
        transpiler.append("Math.floor(");
        this.expression.transpile(transpiler);
        transpiler.append(")");
    } else
        this.expression.transpile(transpiler);
};


CastExpression.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

CastExpression.prototype.toEDialect = function(writer) {
    this.expression.toDialect(writer);
    writer.append(" as ");
    this.type.toDialect(writer);
};

CastExpression.prototype.toMDialect = function(writer) {
    this.toEDialect(writer);
};

CastExpression.prototype.toODialect = function(writer) {
    writer.append("(");
    this.type.toDialect(writer);
    writer.append(")");
    this.expression.toDialect(writer);
};

exports.CastExpression = CastExpression;
