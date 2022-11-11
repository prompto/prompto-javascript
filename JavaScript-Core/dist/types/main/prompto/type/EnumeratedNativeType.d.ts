import BaseType from './BaseType';
import { Identifier } from "../grammar";
import { Context, Transpiler } from "../runtime";
import { Section } from "../parser";
import IType from "./IType";
import { IMethodDeclaration } from "../declaration";
import { IValue } from "../value";
import IEnumeratedType from "./IEnumeratedType";
export default class EnumeratedNativeType extends BaseType implements IEnumeratedType {
    derivedFrom: IType;
    constructor(id: Identifier, derivedFrom: IType);
    checkExists(context: Context): void;
    checkMember(context: Context, section: Section, member: Identifier): IType;
    checkStaticMember(context: Context, section: Section, member: Identifier): IType;
    isMoreSpecificThan(context: Context, type: IType): boolean;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    declareMember(transpiler: Transpiler, member: Identifier): void;
    transpileMember(transpiler: Transpiler, member: Identifier): void;
    declareStaticMember(transpiler: Transpiler, member: Identifier): void;
    transpileStaticMember(transpiler: Transpiler, member: Identifier): void;
    getStaticMemberValue(context: Context, member: Identifier): IValue;
    getStaticMemberMethods(context: Context, id: Identifier): Set<IMethodDeclaration>;
}
