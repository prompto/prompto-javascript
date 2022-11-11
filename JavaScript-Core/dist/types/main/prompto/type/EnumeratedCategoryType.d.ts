import CategoryType from './CategoryType';
import { Identifier } from "../grammar";
import { Context, Transpiler } from "../runtime";
import { Section } from "../parser";
import IType from "./IType";
import { IMethodDeclaration } from "../declaration";
import { IValue } from "../value";
import IEnumeratedType from "./IEnumeratedType";
export default class EnumeratedCategoryType extends CategoryType implements IEnumeratedType {
    constructor(id: Identifier);
    asMutable(context: Context, mutable: boolean): this;
    checkExists(context: Context): void;
    checkMember(context: Context, section: Section, id: Identifier): IType;
    checkStaticMember(context: Context, section: Section, member: Identifier): IType;
    declareStaticMember(transpiler: Transpiler, member: Identifier): void;
    transpileStaticMember(transpiler: Transpiler, member: Identifier): void;
    getStaticMemberValue(context: Context, member: Identifier): IValue;
    getStaticMemberMethods(context: Context, member: Identifier): Set<IMethodDeclaration>;
}
