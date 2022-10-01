import IDeclaration from "./IDeclaration";
import { ParameterList } from "../param";
import { IType } from "../type";
import {Section} from "../parser";
import {Context, Transpiler} from "../runtime";
import {IValue} from "../value";
import {CategoryDeclaration} from "./index";
import {DeclarationStatement} from "../statement";
import {ArgumentList} from "../grammar";

export default interface IMethodDeclaration extends IDeclaration {

    parameters: ParameterList | null;
    returnType: IType | null;
    memberOf: CategoryDeclaration<any> | null;
    closureOf: IDeclaration | null;
    declarationOf: DeclarationStatement<IMethodDeclaration> | null;

    isAbstract(): boolean;
    getProto(context?: Context): string;
    getTranspiledName(context: Context): string;
    isReference(): boolean;
    asReference(): IMethodDeclaration;

    check(context: Context, isStart?: boolean): IType;
    checkChild(context: Context): IType;
    interpret(context: Context): IValue | null;
    registerParameters(context: Context): void;

    transpileMethodType(transpiler: Transpiler): void;

    locateSectionAtLine(line: number): Section | null;


    isAssignableTo(context: Context, args: ArgumentList, checkInstance: boolean, allowDerived: boolean): boolean;
}
