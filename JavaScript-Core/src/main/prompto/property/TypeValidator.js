import PropertyValidator from './PropertyValidator.js'
import { MethodType } from '../type'
import { MethodDeclarationMap } from '../runtime'

export default class TypeValidator extends PropertyValidator {

    constructor(type) {
        super();
        this.type = type.anyfy();
    }

    toString() {
        return this.type.toString();
    }

    getType(context) {
        return this.type;
    }

    validate(context, jsxProp) {
        const actual = this.type instanceof MethodType ? jsxProp.checkProto(context, this.type) : jsxProp.check(context);
        if(this.type.isAssignableFrom(context, actual.anyfy()))
            return true;
        else {
            context.problemListener.reportIllegalAssignment(jsxProp, this.type, actual);
            return false;
        }

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
            const decls = context.getRegisteredDeclaration(this.type.id);
            if(decls instanceof MethodDeclarationMap)
                return decls.getAll().map(m => m.asReference());
        }
        return super.getMethodDeclarations(context);
    }
}
