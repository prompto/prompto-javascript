import Declaration from "./Declaration";
import { ParameterList } from "../param";
import { Type } from "../type";
import {Section} from "../parser";
import {Context, Transpiler} from "../runtime";
import {Value} from "../value";
import {CategoryDeclaration} from "./index";

export default interface MethodDeclaration extends Declaration {

    parameters: ParameterList | null;
    returnType: Type | null;
    memberOf: CategoryDeclaration | null;
    closureOf: Declaration | null;

    isAbstract(): boolean;
    getProto(context?: Context): string;
    locateSectionAtLine(line: number): Section | null;
    registerParameters(context: Context): void;
    transpileMethodType(transpiler: Transpiler): void;
    interpret(context: Context): Value | null;

    checkChild(context: Context): Type;

    getTranspiledName(context: Context): string;
}
