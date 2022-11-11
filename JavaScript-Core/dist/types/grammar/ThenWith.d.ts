import { Context, Transpiler } from "../runtime";
import { IType, VoidType } from "../type";
import { StatementList } from "../statement";
import { Identifier } from "./index";
import { IValue } from "../value";
import { CodeWriter } from "../utils";
export default class ThenWith {
    static OrEmpty(tw: ThenWith | null): ThenWith;
    id: Identifier;
    statements: StatementList;
    constructor(id: Identifier, statements: StatementList);
    check(context: Context, type: IType): VoidType;
    interpret(context: Context, value: IValue): void;
    toDialect(writer: CodeWriter, type: IType): void;
    declare(transpiler: Transpiler, type: IType): void;
    transpile(transpiler: Transpiler, type: IType): void;
}
