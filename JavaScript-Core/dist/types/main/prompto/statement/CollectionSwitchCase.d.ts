import SwitchCase from './SwitchCase';
import { IType } from '../type';
import { IExpression } from "../expression";
import { StatementList } from "./index";
import { Context, Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
import { IValue } from "../value";
export default class CollectionSwitchCase extends SwitchCase {
    constructor(expression: IExpression, statements: StatementList);
    checkSwitchType(context: Context, type: IType): void;
    matches(context: Context, value: IValue): boolean;
    caseToMDialect(writer: CodeWriter): void;
    caseToODialect(writer: CodeWriter): void;
    caseToEDialect(writer: CodeWriter): void;
    catchToODialect(writer: CodeWriter): void;
    catchToMDialect(writer: CodeWriter): void;
    catchToEDialect(writer: CodeWriter): void;
    transpile(transpiler: Transpiler): void;
}
