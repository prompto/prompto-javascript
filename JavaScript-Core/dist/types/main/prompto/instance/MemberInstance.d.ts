import { Section } from "../parser";
import { IExpression } from "../expression";
import { Identifier } from "../grammar";
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
import { IValue } from "../value";
import { IType } from "../type";
import IAssignableInstance from "./IAssignableInstance";
import IAssignableSelector from "./IAssignableSelector";
export default class MemberInstance extends Section implements IAssignableSelector {
    parent: IAssignableInstance | null;
    id: Identifier;
    constructor(id: Identifier);
    get name(): string;
    toString(): string;
    toDialect(writer: CodeWriter, expression: IExpression): void;
    interpret(context: Context): IValue;
    checkAssignValue(context: Context, section: Section, valueType: IType): IType;
    checkAssignMember(context: Context, section: Section, id: Identifier, valueType: IType): IType;
    checkAssignItem(context: Context, section: Section, itemType: IType, valueType: IType): IType;
    assign(context: Context, expression: IExpression): void;
    check(context: Context): IType;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    declareAssign(transpiler: Transpiler, expression: IExpression): void;
    transpileAssign(transpiler: Transpiler, expression: IExpression): void;
    transpileAssignParent(transpiler: Transpiler): void;
}
