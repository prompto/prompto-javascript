import BaseValue from '../value/BaseValue';
import { IntegerValue, IValue } from "../value";
import { IType, MethodType } from "../type";
import { IExpression } from "./index";
import { Context, Transpiler } from "../runtime";
import ISliceable from "../value/ISliceable";
import { CodeWriter } from "../utils";
import { Section } from "../parser";
import { AttributeDeclaration } from "../declaration";
export default class ValueExpression extends BaseValue<IValue> implements IExpression, ISliceable {
    constructor(type: IType, value: IValue);
    isSliceable(): boolean;
    check(context: Context): IType;
    interpretExpression(context: Context): IValue;
    toString(): string;
    toDialect: (writer: CodeWriter) => void;
    slice(first: IntegerValue | null, last: IntegerValue | null): ISliceable;
    asSection(): Section;
    checkAttribute(context: Context): AttributeDeclaration | null;
    checkReference(context: Context): IType;
    declareParent(transpiler: Transpiler): void;
    interpretReference(context: Context): IValue;
    isAssertion(): boolean;
    isPredicate(): boolean;
    locateSectionAtLine(line: number): Section | null;
    parentToDialect(writer: CodeWriter): unknown;
    transpileParent(transpiler: Transpiler): void;
    transpileReference(transpiler: Transpiler, method: MethodType): void;
}
