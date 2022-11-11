import { MethodType, IType } from '../type';
import { IValue } from '../value';
import IExpression from "./IExpression";
import { Identifier } from "../grammar";
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
import SelectorBase from "./SelectorBase";
export default class MemberSelector extends SelectorBase {
    id: Identifier;
    constructor(parent: IExpression | null, id: Identifier);
    get name(): string;
    toDialect(writer: CodeWriter): void;
    toEDialect(writer: CodeWriter): void;
    toOMDialect(writer: CodeWriter): void;
    parentAndMembertoDialect(writer: CodeWriter): void;
    parentToEDialect(writer: CodeWriter): void;
    parentToOMDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    transpileReference(transpiler: Transpiler, method: MethodType): void;
    toString(): string;
    check(context: Context): IType;
    interpretExpression(context: Context): IValue;
    resolveParent(context: Context): IExpression;
    interpretReference(context: Context): IValue;
}
