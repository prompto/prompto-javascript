import IDeclaration from "./IDeclaration";
import {IParameter, ParameterList} from "../param";
import { IType } from "../type";
import {Dialect, Section} from "../parser";
import {Context, Transpiler} from "../runtime";
import {IValue} from "../value";
import {CategoryDeclaration} from "./index";
import {DeclarationStatement} from "../statement";
import {Argument, ArgumentList, Identifier, Specificity} from "../grammar";

export default interface IMethodDeclaration extends IDeclaration {

    parameters: ParameterList | null;
    returnType: IType | null;
    memberOf: CategoryDeclaration<any> | null;
    closureOf: IDeclaration | null;
    declarationOf: DeclarationStatement<IMethodDeclaration> | null;

    isAbstract(): boolean;
    isAssignableFrom(context: Context, args: ArgumentList): boolean;
    isAssignableTo(context: Context, args: ArgumentList, checkInstance: boolean, allowDerived: boolean): boolean;
    isReference(): boolean;
    asReference(): IMethodDeclaration;

    getProto(context?: Context): string;
    getSignature(dialect?: Dialect): string;
    getTranspiledName(context: Context): string;

    check(context: Context, isStart?: boolean): IType;
    checkChild(context: Context): IType;
    interpret(context: Context): IValue | null;

    fullDeclare(transpiler: Transpiler, id: Identifier): void;
    declareCall(transpiler: Transpiler): void;
    transpileCall(transpiler: Transpiler, args: ArgumentList | null, refOnly?: boolean): void;
    transpileMethodType(transpiler: Transpiler): void;

    registerParameters(context: Context): void;

    locateSectionAtLine(line: number): Section | null;
    computeSpecificity(context: Context, param: IParameter | null, argument: Argument, checkInstance: boolean, allowDerived: boolean): Specificity;

}
