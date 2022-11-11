import SwitchCase from './SwitchCase';
import { IType } from '../type';
import { IExpression } from "../expression";
import { StatementList } from "./index";
import { Context, Transpiler } from "../runtime";
import { IValue } from "../value";
import { CodeWriter } from "../utils";
export default class AtomicSwitchCase extends SwitchCase {
    constructor(expression: IExpression | null, statements: StatementList);
    checkSwitchType(context: Context, type: IType): void;
    matches(context: Context, value: IValue): boolean;
    caseToMDialect(writer: CodeWriter): void;
    caseToODialect(writer: CodeWriter): void;
    catchToODialect(writer: CodeWriter): void;
    caseToEDialect(writer: CodeWriter): void;
    catchToMDialect(writer: CodeWriter): void;
    catchToEDialect(writer: CodeWriter): void;
    transpile(transpiler: Transpiler): void;
    transpileError(transpiler: Transpiler): void;
}
