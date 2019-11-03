var PropertyValidator = require("./PropertyValidator").PropertyValidator;
var MethodDeclarationMap = require("../runtime/Context").MethodDeclarationMap;
var MethodType = require("../type/MethodType").MethodType;
var AnyType = require("../type/AnyType").AnyType;

function TypeSetValidator(types) {
    PropertyValidator.call(this);
    this.types = types;
    return this;
}

TypeSetValidator.prototype = Object.create(PropertyValidator.prototype);
TypeSetValidator.prototype.constructor = TypeSetValidator;


TypeSetValidator.prototype.getType = function(context) {
    return AnyType.instance;
};


TypeSetValidator.prototype.validate = function(context, property) {
    var actual = property.check(context);
    if(!Array.from(this.types).some(function(type) { return type.isAssignableFrom(context, actual); }, this))
        context.problemListener.reportIllegalAssignment(property, this.types, actual);
};


TypeSetValidator.prototype.getMethodDeclarations = function(context) {
    return Array.from(this.types)
        .filter(function(t) { return t instanceof MethodType; })
        .map(function(t) {
            var decls = context.getRegisteredDeclaration(this.type.name);
            return decls instanceof MethodDeclarationMap ? decls.getAll() : [];
        })
        .reduce(function(reduced, current) { return reduced.concat(current); }, []);
};


exports.TypeSetValidator = TypeSetValidator;