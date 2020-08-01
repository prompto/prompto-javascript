var Literal = require("./Literal").Literal;
var TypeType = require("../type/TypeType").TypeType;
var TypeValue = require("../value/TypeValue").TypeValue;
var Dialect = require("../parser/Dialect").Dialect;
var Type = require("../intrinsic/Type").Type;
var MethodDeclarationMap = require("../runtime/Context").MethodDeclarationMap;

function TypeLiteral(type) {
    Literal.call(this, type.toString(), type);
    return this;
}

TypeLiteral.prototype = Object.create(Literal.prototype);
TypeLiteral.prototype.constructor = TypeLiteral;

TypeLiteral.prototype.check = function(context) {
    return new TypeType(this.value);
};

TypeLiteral.prototype.interpret = function(context) {
    return new TypeValue(this.value);
};


TypeLiteral.prototype.toDialect = function(writer) {
    if(writer.dialect==Dialect.E) {
        var decl = writer.context.getRegisteredDeclaration(this.value.id);
        if(decl instanceof MethodDeclarationMap)
            writer.append("Method: ");
        else
            writer.append("Type: ");
    }
    this.value.toDialect(writer);
}

TypeLiteral.prototype.parentToDialect = function(writer) {
    this.value.toDialect(writer);
}

TypeLiteral.prototype.declare = function(transpiler) {
    transpiler.require(Type);
};


TypeLiteral.prototype.transpile = function(transpiler) {
    transpiler.append("new Type('").append(this.value.toString()).append("')");
    return false;
};


TypeLiteral.prototype.declareParent = function(transpiler) {
    this.value.declare(transpiler);
};


TypeLiteral.prototype.transpileParent = function(transpiler) {
    transpiler.append(this.value.toString());
    return false;
};


exports.TypeLiteral = TypeLiteral;