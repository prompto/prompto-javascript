import {Expression} from "./index";
import {Context, Transpiler} from "../runtime";
import {Dialect, Section} from "../parser";
import {TestMethodDeclaration} from "../declaration";

export default interface Assertion extends Expression {
    checkAssert(context: Context): Context;
    interpretAssert(context: Context, method: TestMethodDeclaration): boolean;
    getExpected(context: Context, dialect: Dialect, escapeMode: number): string;
    transpileFound(transpiler: Transpiler, dialect: Dialect): void;
    locateSectionAtLine(line: number): Section | null;
}
