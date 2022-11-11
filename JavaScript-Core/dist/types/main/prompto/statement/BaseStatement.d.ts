import IStatement from "./IStatement";
import Section from '../parser/Section';
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
import { IValue } from "../value";
import { IType } from "../type";
export default abstract class BaseStatement extends Section implements IStatement {
    canReturn(): boolean;
    isSimple(): boolean;
    asSection(): Section;
    parentToDialect(writer: CodeWriter): void;
    checkReference(context: Context): IType | null;
    transpile(transpiler: Transpiler): void;
    declare(transpiler: Transpiler): void;
    declareParent(transpiler: Transpiler): void;
    transpileParent(transpiler: Transpiler): void;
    abstract check(context: Context): IType;
    abstract interpretStatement(context: Context): IValue | null;
    abstract toDialect(writer: CodeWriter): void;
}
