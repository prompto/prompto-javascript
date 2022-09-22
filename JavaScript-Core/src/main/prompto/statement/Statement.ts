import { Context, Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
import {Section} from "../parser";
import {Type} from "../type";
import {Value} from "../value";

export default interface Statement {

    canReturn(): boolean;
    isSimple(): boolean;
    check(context: Context): Type;
    checkReference(context: Context): boolean;
    interpret(context: Context): Value | null;
    transpile(transpiler: Transpiler): void;
    declare(transpiler: Transpiler): void;
    declareParent(transpiler: Transpiler): void;
    transpileParent(transpiler: Transpiler): void;
    asSection() : Section;
    locateSectionAtLine(line: number): Section | null;
    toDialect(writer: CodeWriter): void;
    parentToDialect(writer: CodeWriter): void;

}

