import PropertyValidator from './PropertyValidator';
import {MethodType, AnyType, IType} from '../type';
import {Context, MethodDeclarationMap} from '../runtime';
import {JsxProperty} from "../jsx";
import {IMethodDeclaration} from "../declaration";

export default class TypeSetValidator extends PropertyValidator {

    types: Set<IType>;

    constructor(types: Set<IType>) {
        super();
        this.types = types;
    }

    toString() {
        return "<" + Array.from(this.types).join(", ") + ">";
    }

    // noinspection JSUnusedLocalSymbols
    getType(context: Context) {
        return AnyType.instance;
    }

    validate(context: Context, jsxProp: JsxProperty) {
        const actual = jsxProp.check(context);
        if (Array.from(this.types).some(type => {
                const local = type instanceof MethodType ? jsxProp.checkProto(context, type) : actual;
                return type.isAssignableFrom(context, local)
            }, this))
            return true;
        else {
            context.problemListener.reportIllegalAssignment(jsxProp, this.types, actual);
            return false;
        }
    }

    getMethodDeclarations(context: Context): Set<IMethodDeclaration> {
        const decls = Array.from(this.types)
            .filter(type => type instanceof MethodType)
            .map(type => context.getRegistered(type.id))
            .map(decl => decl instanceof MethodDeclarationMap ? decl.getAll() : [])
            .flatMap(m => m);
        return new Set<IMethodDeclaration>(decls);
    }
}
