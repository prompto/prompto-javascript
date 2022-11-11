import MemberSelector from './MemberSelector';
import { IExpression } from './index';
import { Identifier } from '../grammar';
import { IType } from '../type';
import { IMethodDeclaration } from '../declaration';
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
export default class MethodSelector extends MemberSelector {
    constructor(parent: IExpression | null, id: Identifier);
    toDialect(writer: CodeWriter): void;
    newFullSelector(counter: number): MethodSelector;
    transpile(transpiler: Transpiler): void;
    toString(): string;
    checkParentType(context: Context, checkInstance: boolean): IType;
    checkSuperParent(context: Context): IType | null;
    newLocalContext(context: Context, declaration: IMethodDeclaration): Context;
    newLocalInstanceContext(context: Context, declaration: IMethodDeclaration): Context;
    newLocalCheckContext(context: Context, declaration: IMethodDeclaration): Context;
    newInstanceCheckContext(context: Context): Context;
    newInstanceContext(context: Context): Context;
}
