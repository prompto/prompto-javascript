import BaseStatement from './BaseStatement';
import { StatementList, SwitchCaseList } from './index';
import { TypeMap, IType } from '../type';
import { Context, Transpiler } from "../runtime";
import { CodeWriter, IWritable } from "../utils";
import { Section } from "../parser";
import { IValue } from "../value";
export default abstract class BaseSwitchStatement extends BaseStatement implements IWritable {
    switchCases: SwitchCaseList;
    defaultCase: StatementList | null;
    constructor(switchCases: SwitchCaseList, defaultCase: StatementList | null);
    abstract toEDialect(writer: CodeWriter): void;
    abstract toODialect(writer: CodeWriter): void;
    abstract toMDialect(writer: CodeWriter): void;
    check(context: Context): IType;
    abstract checkSwitchType(context: Context): IType;
    checkSwitchCasesType(context: Context): void;
    checkReturnType(context: Context): IType;
    collectReturnTypes(context: Context, types: TypeMap): Section;
    interpretSwitch(context: Context, switchValue: IValue, toThrow: any): IValue;
    declareSwitch(transpiler: Transpiler): void;
    toDialect(writer: CodeWriter): void;
    canReturn(): boolean;
}
