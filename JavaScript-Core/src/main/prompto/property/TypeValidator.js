var PropertyValidator = require("./PropertyValidator").PropertyValidator;
var MethodDeclarationMap = require("../runtime/Context").MethodDeclarationMap;
var MethodType = require("../type/MethodType").MethodType;

function TypeValidator(type) {
    PropertyValidator.call(this);
    this.type = type.anyfy();
    return this;
}

TypeValidator.prototype = Object.create(PropertyValidator.prototype);
TypeValidator.prototype.constructor = TypeValidator;


TypeValidator.prototype.getType = function(context) {
    return this.type;
};


TypeValidator.prototype.validate = function(context, jsxProp) {
    var actual = this.type instanceof MethodType ? jsxProp.checkProto(context, this.type) : jsxProp.check(context);
    if(!this.type.isAssignableFrom(context, actual.anyfy()))
        context.problemListener.reportIllegalAssignment(jsxProp, this.type, actual);
};


TypeValidator.prototype.declare = function(transpiler, jsxProp) {
    if(this.type instanceof MethodType)
        jsxProp.declareProto(transpiler, this.type);
    else
        jsxProp.declare(transpiler);
};


TypeValidator.prototype.transpile = function(transpiler, jsxProp) {
    if(this.type instanceof MethodType)
        jsxProp.transpileProto(transpiler, this.type);
    else
        jsxProp.transpile(transpiler);
};


TypeValidator.prototype.getMethodDeclarations = function(context) {
    if(this.type instanceof MethodType) {
        var decls = context.getRegisteredDeclaration(this.type.name);
        if(decls instanceof MethodDeclarationMap)
            return decls.getAll();
    }
    return PropertyValidator.constructor.getMethodDeclarations.call(this, context);
};

exports.TypeValidator = TypeValidator;