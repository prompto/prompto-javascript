import IterableType from './IterableType';
import { Context, Transpiler } from '../runtime';
import IType from "./IType";
import { Section } from "../parser";
import { Identifier } from "../grammar";
import { TypeFamily } from "../store";
import { IExpression } from "../expression";
export default abstract class ContainerType extends IterableType {
    constructor(id: Identifier, family: TypeFamily, itemType: IType);
    checkContains(context: Context, section: Section, other: IType): IType;
    checkMember(context: Context, section: Section, member: Identifier): IType;
    declareMember(transpiler: Transpiler, member: Identifier): void;
    transpileMember(transpiler: Transpiler, member: Identifier): void;
    declareIterator(transpiler: Transpiler, name: Identifier, expression: IExpression): void;
    transpileIterator(transpiler: Transpiler, name: Identifier, expression: IExpression): void;
}
