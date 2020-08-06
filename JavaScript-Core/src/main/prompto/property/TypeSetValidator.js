var PropertyValidator = require("./PropertyValidator").PropertyValidator;
var MethodDeclarationMap = require("../runtime/Context").MethodDeclarationMap;
var MethodType = require("../type/MethodType").MethodType;
var AnyType = require("../type/AnyType").AnyType;

class TypeSetValidator extends PropertyValidator {
    constructor(types) {
        super();
        this.types = types;
        return this;
    }

    getType(context) {
        return AnyType.instance;
    }

    validate(context, property) {
        var actual = property.check(context);
        if(!Array.from(this.types).some(type => type.isAssignableFrom(context, actual), this))
            context.problemListener.reportIllegalAssignment(property, this.types, actual);
    }

    getMethodDeclarations(context) {
        return Array.from(this.types)
            .filter(t => t instanceof MethodType)
            .map(function(t) {
                var decls = context.getRegisteredDeclaration(this.type.name);
                return decls instanceof MethodDeclarationMap ? decls.getAll() : [];
            })
            .reduce((reduced, current) => reduced.concat(current), []);
    }
}


exports.TypeSetValidator = TypeSetValidator;