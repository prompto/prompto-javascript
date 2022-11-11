import IterableType from './IterableType';
import { Identifier } from '../grammar';
import IType from "./IType";
import { Context, Transpiler } from "../runtime";
import { Section } from "../parser";
import { IExpression } from "../expression";
import { IMethodDeclaration } from "../declaration";
import { IValue, ListValue, SetValue } from "../value";
export default class IteratorType extends IterableType {
    constructor(itemType: IType);
    withItemType(itemType: IType): IteratorType;
    isAssignableFrom(context: Context, other: IType): boolean;
    equals(other: any): boolean;
    checkIterator(context: Context, section: Section, source: IExpression): IType;
    checkMember(context: Context, section: Section, member: Identifier): IType;
    declare(transpiler: Transpiler): void;
    getMemberMethods(context: Context, member: Identifier): Set<IMethodDeclaration>;
    containerToList(value: IValue): ListValue;
    containerToSet(value: IValue): SetValue;
}
