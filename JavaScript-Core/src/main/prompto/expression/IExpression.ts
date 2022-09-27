import {Context, Transpiler} from "../runtime";
import {IType} from "../type";
import {IValue} from "../value";
import {Section} from "../parser";
import {CodeWriter} from "../utils";
import {AttributeDeclaration} from "../declaration";

export default interface IExpression {
    toString(): string;
    isPredicate(): boolean;
    isAssertion(): boolean;
    check(context: Context): IType;
    interpret(context: Context): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    checkAttribute(context: Context): AttributeDeclaration | null;
    locateSectionAtLine(line: number): Section | null;
    toDialect(writer: CodeWriter): void;
}


