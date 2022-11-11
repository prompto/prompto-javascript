import BaseType from './BaseType';
import { IMethodDeclaration } from "../declaration";
import { Context, Transpiler } from "../runtime";
import { ArrowExpression } from "../expression";
import IType from "./IType";
export default class MethodType extends BaseType {
    method: IMethodDeclaration;
    constructor(method: IMethodDeclaration);
    equals(other: any): boolean;
    checkExists(context: Context): void;
    checkUnique(context: Context): void;
    isMoreSpecificThan(context: Context, other: IType): boolean;
    checkArrowExpression(context: Context, expression: ArrowExpression): MethodType;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    declareArrowExpression(transpiler: Transpiler, expression: ArrowExpression): void;
    transpileArrowExpression(transpiler: Transpiler, expression: ArrowExpression): void;
    transpileMethodType(transpiler: Transpiler): void;
}
