import UnresolvedCall from './UnresolvedCall';
import { Context, Transpiler } from '../runtime';
import { IType } from '../type';
import { IExpression } from "../expression";
import { ArgumentList, ThenWith } from "../grammar";
import { CodeWriter } from "../utils";
import { IValue } from "../value";
export default class RemoteCall extends UnresolvedCall {
    thenWith?: ThenWith;
    constructor(caller: IExpression, assignments: ArgumentList, thenWith?: ThenWith);
    locateSectionAtLine(line: number): import("../parser").Section;
    isSimple(): boolean;
    toDialect(writer: CodeWriter): void;
    check(context: Context): IType;
    interpretStatement(context: Context): IValue | null;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
