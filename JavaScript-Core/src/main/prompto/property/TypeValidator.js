
export default class TypeValidator extends PropertyValidator {

    constructor(type) {
        super();
        this.type = type.anyfy();
    }

    getType(context) {
        return this.type;
    }

    validate(context, jsxProp) {
        const actual = this.type instanceof MethodType ? jsxProp.checkProto(context, this.type) : jsxProp.check(context);
        if(!this.type.isAssignableFrom(context, actual.anyfy()))
            context.problemListener.reportIllegalAssignment(jsxProp, this.type, actual);
    }

    declare(transpiler, jsxProp) {
        if(this.type instanceof MethodType)
            jsxProp.declareProto(transpiler, this.type);
        else
            jsxProp.declare(transpiler);
    }

    transpile(transpiler, jsxProp) {
        if(this.type instanceof MethodType)
            jsxProp.transpileProto(transpiler, this.type);
        else
            jsxProp.transpile(transpiler);
    }

    getMethodDeclarations(context) {
        if(this.type instanceof MethodType) {
            const decls = context.getRegisteredDeclaration(this.type.name);
            if(decls instanceof MethodDeclarationMap)
                return decls.getAll();
        }
        return PropertyValidator.constructor.getMethodDeclarations.call(this, context);
    }
}
