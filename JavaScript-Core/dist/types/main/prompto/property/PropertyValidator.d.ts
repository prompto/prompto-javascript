import { Context, Transpiler } from "../runtime";
import { IMethodDeclaration } from "../declaration";
import { JsxProperty } from "../jsx";
import { IType } from "../type";
export default abstract class PropertyValidator {
    isRequired(): boolean;
    optional(): PropertyValidator;
    required(): PropertyValidator;
    getMethodDeclarations(context: Context): Set<IMethodDeclaration>;
    abstract getType(context: Context): IType;
    abstract validate(context: Context, jsxProp: JsxProperty): boolean;
    declare(transpiler: Transpiler, jsxProp: JsxProperty): void;
    transpile(transpiler: Transpiler, jsxProp: JsxProperty): void;
}
