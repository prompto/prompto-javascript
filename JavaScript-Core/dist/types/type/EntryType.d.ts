import BaseType from './BaseType';
import { Identifier } from '../grammar';
import IType from "./IType";
import { Context, Transpiler } from "../runtime";
import { Section } from "../parser";
export default class EntryType extends BaseType {
    itemType: IType;
    constructor(itemType: IType);
    checkMember(context: Context, section: Section, member: Identifier): IType;
    declareMember(transpiler: Transpiler, member: Identifier): void;
    transpileMember(transpiler: Transpiler, member: Identifier): void;
    checkExists(context: Context): void;
    declare(transpiler: Transpiler): void;
    isMoreSpecificThan(context: Context, other: IType): boolean;
    transpile(transpiler: Transpiler): void;
}
