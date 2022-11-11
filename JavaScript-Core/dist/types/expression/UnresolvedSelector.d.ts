import SelectorBase from './SelectorBase';
import { UnresolvedCall } from '../statement';
import { IType } from '../type';
import IExpression from "./IExpression";
import { ArgumentList, Identifier } from "../grammar";
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
import { IValue } from "../value";
export default class UnresolvedSelector extends SelectorBase {
    id: Identifier;
    resolved?: IExpression;
    constructor(parent: IExpression | null, id: Identifier);
    get name(): string;
    toString(): string;
    toDialect(writer: CodeWriter): void;
    check(context: Context): IType;
    checkMember(context: Context): IType;
    interpretExpression(context: Context): IValue;
    resolveAndCheck(context: Context, forMember: boolean): IType;
    resolve(context: Context, forMember: boolean): IExpression;
    resolveMethod(context: Context, assignments: ArgumentList | null): UnresolvedCall | null;
    tryResolveMember(context: Context): IExpression | null;
    tryResolveMethod(context: Context, assignments: ArgumentList | null): UnresolvedCall | null;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
}
