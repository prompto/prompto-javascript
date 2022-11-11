import IterableType from './IterableType';
import { Identifier } from '../grammar';
import { Context, Transpiler } from '../runtime';
import IType from "./IType";
import { Section } from "../parser";
import { IExpression } from "../expression";
import { IMethodDeclaration } from "../declaration";
import { IValue, ListValue } from "../value";
export default class CursorType extends IterableType {
    constructor(itemType: IType);
    withItemType(itemType: IType): CursorType;
    isAssignableFrom(context: Context, other: IType): boolean;
    equals(other: any): boolean;
    checkIterator(context: Context, section: Section, source: IExpression): IType;
    declareIterator(transpiler: Transpiler, name: Identifier, expression: IExpression): void;
    transpileIterator(transpiler: Transpiler, name: Identifier, expression: IExpression): void;
    checkMember(context: Context, section: Section, id: Identifier): IType;
    declareMember(transpiler: Transpiler, member: Identifier): void;
    transpileMember(transpiler: Transpiler, member: Identifier): void;
    getMemberMethods(context: Context, id: Identifier): Set<IMethodDeclaration>;
    containerToList(value: IValue): ListValue;
}
