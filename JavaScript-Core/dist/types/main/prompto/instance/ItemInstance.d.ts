import { AnyType, IType } from '../type';
import { IExpression } from "../expression";
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
import { IValue } from "../value";
import { Section } from "../parser";
import { Identifier } from "../grammar";
import IAssignableSelector from "./IAssignableSelector";
import IAssignableInstance from "./IAssignableInstance";
export default class ItemInstance extends Section implements IAssignableSelector {
    parent: IAssignableInstance | null;
    item: IExpression;
    constructor(item: IExpression);
    toString(): string;
    toDialect(writer: CodeWriter, expression: IExpression): void;
    check(context: Context): IType;
    checkAssignValue(context: Context, section: Section, valueType: IType): IType;
    checkAssignMember(context: Context, section: Section, member: Identifier, valueType: IType): AnyType;
    checkAssignItem(context: Context, section: Section, itemType: IType, valueType: IType): AnyType;
    assign(context: Context, expression: IExpression): void;
    interpret(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    declareAssign(transpiler: Transpiler, expression: IExpression): void;
    transpileAssign(transpiler: Transpiler, expression: IExpression): void;
    transpileAssignParent(transpiler: Transpiler): void;
}
