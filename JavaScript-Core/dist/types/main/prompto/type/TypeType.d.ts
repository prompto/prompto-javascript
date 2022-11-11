import BaseType from './BaseType';
import { Identifier } from '../grammar';
import { IType } from "../type";
import { Section } from "../parser";
import { Context, Transpiler } from "../runtime";
import { CodeWriter } from "../utils";
import { IMethodDeclaration } from "../declaration";
export default class TypeType extends BaseType {
    type: IType;
    constructor(type: IType);
    checkExists(context: Context): void;
    isMoreSpecificThan(context: Context, other: IType): boolean;
    toString(): string;
    toDialect(writer: CodeWriter): void;
    checkMember(context: Context, section: Section, id: Identifier): IType;
    declareMember(transpiler: Transpiler, member: Identifier): void;
    transpileMember(transpiler: Transpiler, member: Identifier): void;
    getMemberMethods(context: Context, member: Identifier): Set<IMethodDeclaration>;
}
