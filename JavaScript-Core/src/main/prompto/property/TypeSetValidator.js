import PropertyValidator from "./PropertyValidator"
import { MethodType, AnyType } from "../type/index"
import { MethodDeclarationMap } from "../runtime/index"

export default class TypeSetValidator extends PropertyValidator {

    constructor(types) {
        super();
        this.types = types;
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
