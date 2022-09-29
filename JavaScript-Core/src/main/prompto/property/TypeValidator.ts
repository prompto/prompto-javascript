import PropertyValidator from './PropertyValidator'
import {IType, MethodType} from '../type'
import {Context, MethodDeclarationMap, Transpiler} from '../runtime'
import {JsxProperty} from "../jsx";

export default class TypeValidator extends PropertyValidator {

    type: IType;

    constructor(type: IType) {
        super();
        this.type = type.anyfy();
    }

    toString() {
        return this.type.toString();
    }

    getType(context: Context) {
        return this.type;
    }

    validate(context: Context, jsxProp: JsxProperty) {
        const actual = this.type instanceof MethodType ? jsxProp.checkProto(context, this.type) : jsxProp.check(context);
        if(this.type.isAssignableFrom(context, actual.anyfy()))
            return true;
        else {
            context.problemListener.reportIllegalAssignment(jsxProp, this.type, actual);
            return false;
        }

    }

    declare(transpiler: Transpiler, jsxProp: JsxProperty) {
        if(this.type instanceof MethodType)
            jsxProp.declareProto(transpiler, this.type);
        else
            jsxProp.declare(transpiler);
    }

    transpile(transpiler: Transpiler, jsxProp: JsxProperty) {
        if(this.type instanceof MethodType)
            jsxProp.transpileProto(transpiler, this.type);
        else
            jsxProp.transpile(transpiler);
    }

    getMethodDeclarations(context: Context) {
        if(this.type instanceof MethodType) {
            const decls = context.getRegistered(this.type.id);
            if(decls instanceof MethodDeclarationMap)
                return decls.getAll().map(m => m.asReference());
        }
        return super.getMethodDeclarations(context);
    }
}
