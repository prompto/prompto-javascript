import BaseValue from "./BaseValue";
import { IType, MethodType } from "../type";
import { IExpression } from "../expression";
import { Context, Transpiler } from "../runtime";
import IValue from "../value/IValue";
import { AttributeDeclaration } from "../declaration";
import { Section } from "../parser";
import { CodeWriter } from "../utils";
export default class ContextualExpression extends BaseValue<any> implements IExpression {
    calling: Context;
    expression: IExpression;
    constructor(calling: Context, expression: IExpression);
    isPredicate(): boolean;
    isAssertion(): boolean;
    check(context: Context): IType;
    checkReference(context: Context): IType | null;
    interpretExpression(context: Context): IValue;
    interpretReference(context: Context): IValue;
    transpile(transpiler: Transpiler): void;
    transpileReference(transpiler: Transpiler, method: MethodType): void;
    transpileParent(transpiler: Transpiler): void;
    checkAttribute(context: Context): AttributeDeclaration | null;
    declareParent(transpiler: Transpiler): void;
    locateSectionAtLine(line: number): Section | null;
    parentToDialect(writer: CodeWriter): void;
    toDialect(writer: CodeWriter): void;
    asSection(): Section;
}
