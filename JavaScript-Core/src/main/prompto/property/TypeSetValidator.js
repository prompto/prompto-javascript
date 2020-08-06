const PropertyValidator = require("./PropertyValidator").PropertyValidator;
const MethodDeclarationMap = require("../runtime/Context").MethodDeclarationMap;
const MethodType = require("../type/MethodType").MethodType;
const AnyType = require("../type/AnyType").AnyType;

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
        const actual = property.check(context);
        if(!Array.from(this.types).some(type => type.isAssignableFrom(context, actual), this))
            context.problemListener.reportIllegalAssignment(property, this.types, actual);
    }

    getMethodDeclarations(context) {
        return Array.from(this.types)
            .filter(t => t instanceof MethodType)
            .map(function(t) {
                const decls = context.getRegisteredDeclaration(this.type.name);
                return decls instanceof MethodDeclarationMap ? decls.getAll() : [];
            })
            .reduce((reduced, current) => reduced.concat(current), []);
    }
}


exports.TypeSetValidator = TypeSetValidator;