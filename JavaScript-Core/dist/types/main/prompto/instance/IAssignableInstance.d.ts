import { Context, Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
import { IType } from "../type";
import { Section } from "../parser";
import { IValue } from "../value";
import { Identifier } from "../grammar";
import { IExpression } from "../expression";
export default interface IAssignableInstance {
    check(context: Context): IType;
    checkAssignValue(context: Context, section: Section, valueType: IType): void;
    checkAssignItem(context: Context, section: Section, itemType: IType, valueType: IType): IType;
    checkAssignMember(context: Context, section: Section, member: Identifier, valueType: IType): IType;
    interpret(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    transpileAssignParent(transpiler: Transpiler): void;
    toDialect(writer: CodeWriter, expression: IExpression): void;
    assign(context: Context, expression: IExpression): void;
    declareAssign(transpiler: Transpiler, expression: IExpression): void;
    transpileAssign(transpiler: Transpiler, expression: IExpression): void;
}
