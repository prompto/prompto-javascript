import IDeclaration from "./IDeclaration";
import { ParameterList } from "../param";
import { IType } from "../type";
import {Section} from "../parser";
import {Context, Transpiler} from "../runtime";
import {IValue} from "../value";
import {CategoryDeclaration} from "./index";
import {DeclarationStatement} from "../statement";

export default interface IMethodDeclaration extends IDeclaration {

    parameters: ParameterList | null;
    returnType: IType | null;
    memberOf: CategoryDeclaration | null;
    closureOf: IDeclaration | null;
    declarationOf: DeclarationStatement<IMethodDeclaration> | null;

    isAbstract(): boolean;
    getProto(context?: Context): string;
    locateSectionAtLine(line: number): Section | null;
    registerParameters(context: Context): void;
    transpileMethodType(transpiler: Transpiler): void;
    interpret(context: Context): IValue | null;

    checkChild(context: Context): IType;

    getTranspiledName(context: Context): string;
}
