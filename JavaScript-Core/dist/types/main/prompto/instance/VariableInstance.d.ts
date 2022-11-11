import { Context, Transpiler } from '../runtime';
import { IType } from '../type';
import { Identifier } from "../grammar";
import { CodeWriter } from "../utils";
import { Section } from "../parser";
import { IExpression } from "../expression";
import { IValue } from "../value";
import IAssignableInstance from "./IAssignableInstance";
export default class VariableInstance extends Section implements IAssignableInstance {
    id: Identifier;
    constructor(id: Identifier);
    get name(): string;
    toDialect(writer: CodeWriter, expression: IExpression): void;
    toString(): string;
    check(context: Context): IType;
    checkAssignValue(context: Context, section: Section, valueType: IType): IType;
    checkAssignMember(context: Context, section: Section, member: Identifier, valueType: IType): IType;
    checkAssignItem(context: Context, section: Section, itemType: IType, valueType: IType): IType;
    assign(context: Context, expression: IExpression): void;
    interpret(context: Context): IValue;
    declareAssign(transpiler: Transpiler, expression: IExpression): void;
    transpileAssign(transpiler: Transpiler, expression: IExpression): void;
    transpileAssignParent(transpiler: Transpiler): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
