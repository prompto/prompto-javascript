import { RequiredValidator } from '../property'
import {Context, Transpiler} from "../runtime";
import {IMethodDeclaration} from "../declaration";
import {JsxProperty} from "../jsx";
import {IType} from "../type";

export default abstract class PropertyValidator {

    isRequired() {
        return false;
    }

    optional(): PropertyValidator {
        return this;
    }

    required(): PropertyValidator {
        return new RequiredValidator(this);
    }

    getMethodDeclarations(context: Context): IMethodDeclaration[] {
        return [];
    }

    abstract getType(context: Context): IType;
    abstract validate(context: Context, jsxProp: JsxProperty): boolean;

    declare(transpiler: Transpiler, jsxProp: JsxProperty) {
        jsxProp.declare(transpiler);
    }

    transpile(transpiler: Transpiler, jsxProp: JsxProperty) {
        jsxProp.transpile(transpiler);
    }
}

