import { Section } from "../parser";
import { CodeWriter } from "../utils";
import { ArrowExpression, IExpression } from "./index";
import { Context, Transpiler } from "../runtime";
import { IType, MethodType } from "../type";
import { IValue } from "../value";
import { AttributeDeclaration } from "../declaration";
export default abstract class PredicateExpression extends Section implements IExpression {
    abstract toArrowExpression(): ArrowExpression;
    abstract checkFilter(context: Context, itemType: IType): IType;
    abstract filteredToDialect(writer: CodeWriter, source: IExpression): void;
    abstract containsToDialect(writer: CodeWriter): void;
    asSection(): Section;
    check(context: Context): IType;
    checkAttribute(context: Context): AttributeDeclaration | null;
    checkReference(context: Context): IType;
    declare(transpiler: Transpiler): void;
    declareParent(transpiler: Transpiler): unknown;
    equals(other: any): boolean;
    interpretExpression(context: Context): IValue;
    interpretReference(context: Context): IValue;
    isAssertion(): boolean;
    isPredicate(): boolean;
    parentToDialect(writer: CodeWriter): unknown;
    toDialect(writer: CodeWriter): void;
    transpile(transpiler: Transpiler): void;
    transpileParent(transpiler: Transpiler): void;
    transpileReference(transpiler: Transpiler, method: MethodType): void;
}
