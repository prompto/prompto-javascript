import PropertyValidator from './PropertyValidator.js';
import {MethodType, AnyType } from '../type/index.js';
import { MethodDeclarationMap } from '../runtime/index.js';

export default class TypeSetValidator extends PropertyValidator {

    constructor(types) {
        super();
        this.types = types;
    }

    toString() {
        return this.types.toString();
    }

    // noinspection JSUnusedLocalSymbols
    getType(context) {
        return AnyType.instance;
    }

    validate(context, jsxProp) {
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

    getMethodDeclarations(context) {
        return Array.from(this.types)
            .filter(type => type instanceof MethodType)
            .map(function(type) {
                const decls = context.getRegisteredDeclaration(type.name);
                return decls instanceof MethodDeclarationMap ? decls.getAll() : [];
            })
            .reduce((reduced, current) => reduced.concat(current), []);
    }
}
