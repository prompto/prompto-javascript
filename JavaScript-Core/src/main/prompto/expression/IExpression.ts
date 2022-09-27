import {Context, Transpiler} from "../runtime";
import {IType, MethodType} from "../type";
import {IValue} from "../value";
import {Section} from "../parser";
import {CodeWriter} from "../utils";
import {AttributeDeclaration} from "../declaration";
import { Identifier } from "../grammar";

export default interface IExpression {
    toString(): string;
    isPredicate(): boolean;
    isAssertion(): boolean;
    check(context: Context): IType;
    checkReference(context: Context): IType;
    checkAssignItem(context: Context, section: Section, itemType: IType, valueType: IType): IType;
    checkAssignMember(context: Context, section: Section, member: Identifier, valueType: IType): IType;
    interpret(context: Context): IValue;
    interpretReference(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    declareParent(transpiler: Transpiler): unknown;
    transpile(transpiler: Transpiler): void;
    transpileParent(transpiler: Transpiler): void;
    transpileReference(transpiler: Transpiler, method: MethodType): void;
    checkAttribute(context: Context): AttributeDeclaration | null;
    locateSectionAtLine(line: number): Section | null;
    toDialect(writer: CodeWriter): void;
    parentToDialect(writer: CodeWriter): unknown;
    transpileAssignParent(transpiler: Transpiler): unknown;
}


