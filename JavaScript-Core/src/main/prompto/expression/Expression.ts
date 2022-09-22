import {Context, Transpiler} from "../runtime";
import {Type} from "../type";
import {Value} from "../value";
import {Section} from "../parser";
import {CodeWriter} from "../utils";
import {AttributeDeclaration} from "../declaration";

export default interface Expression {
    toString(): string;
    isPredicate(): boolean;
    isAssertion(): boolean;
    check(context: Context): Type;
    interpret(context: Context): Value;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    checkAttribute(context: Context): AttributeDeclaration | null;
    locateSectionAtLine(line: number): Section | null;
    toDialect(writer: CodeWriter): void;
}


