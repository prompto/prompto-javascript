import {Context, Transpiler} from "../runtime";
import {IType, MethodType} from "../type";
import {IValue} from "../value";
import {Section} from "../parser";
import {CodeWriter} from "../utils";
import {AttributeDeclaration} from "../declaration";

export default interface IExpression {
    equals(other: any): boolean;
    toString(): string;
    isPredicate(): boolean;
    isAssertion(): boolean;
    check(context: Context): IType;
    checkReference(context: Context): IType;
    interpret(context: Context): IValue;
    interpretReference(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    declareParent(transpiler: Transpiler): unknown;
    transpile(transpiler: Transpiler): void;
    transpileParent(transpiler: Transpiler): void;
    transpileReference(transpiler: Transpiler, method: MethodType): void;
    checkAttribute(context: Context): AttributeDeclaration | null;
    toDialect(writer: CodeWriter): void;
    parentToDialect(writer: CodeWriter): unknown;

    locateSectionAtLine(line: number): Section | null;
    asSection(): Section;

}


