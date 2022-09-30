import { Context, Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
import {Section} from "../parser";
import {IType} from "../type";
import {IValue} from "../value";

export default interface IStatement {

    canReturn(): boolean;
    isSimple(): boolean;
    check(context: Context): IType;
    checkReference(context: Context): IType;
    interpret(context: Context): IValue | null;
    transpile(transpiler: Transpiler): void;
    declare(transpiler: Transpiler): void;
    declareParent(transpiler: Transpiler): void;
    transpileParent(transpiler: Transpiler): void;
    asSection() : Section;
    locateSectionAtLine(line: number): Section | null;
    toDialect(writer: CodeWriter): void;
    parentToDialect(writer: CodeWriter): void;

}

