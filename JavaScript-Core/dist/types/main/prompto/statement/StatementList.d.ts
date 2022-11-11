import ObjectList from '../utils/ObjectList';
import { IType } from '../type';
import { JavaScriptNativeCall } from '../javascript';
import { Section } from '../parser';
import { IStatement } from './index';
import { Context, Transpiler } from "../runtime";
import { IValue } from "../value";
import { CodeWriter } from "../utils";
export default class StatementList extends ObjectList<IStatement> {
    nativeStatement?: JavaScriptNativeCall;
    constructor(statements?: IStatement[], statement?: IStatement);
    findNativeStatement(): JavaScriptNativeCall | null;
    asSection(): Section | null;
    locateSectionAtLine(line: number): Section | null;
    check(context: Context, returnType: IType | null): IType;
    checkNative(context: Context, returnType: IType | null): IType;
    checkStatements(context: Context, returnType: IType | null, nativeOnly: boolean): IType;
    checkNativeStatements(context: Context, returnType: IType | null): IType;
    checkPromptoStatements(context: Context, returnType: IType | null): IType;
    checkStatement(context: Context, statement: IStatement): IType;
    interpret(context: Context): IValue | null;
    doInterpret(context: Context): IValue | null;
    interpretNative(context: Context, returnType: IType | null): IValue | null;
    doInterpretNative(context: Context, returnType: IType | null): IValue | null;
    toDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
