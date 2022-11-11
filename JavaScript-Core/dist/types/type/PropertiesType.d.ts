import BaseType from './BaseType';
import { Identifier } from '../grammar';
import { PropertyMap } from "../property";
import { Context, Transpiler } from "../runtime";
import IType from "./IType";
import { IMethodDeclaration } from "../declaration";
import { Section } from "../parser";
export default class PropertiesType extends BaseType {
    properties: PropertyMap;
    constructor(properties: PropertyMap);
    isAssignableFrom(context: Context, other: IType): boolean;
    getMemberMethods(context: Context, id: Identifier): Set<IMethodDeclaration>;
    checkMember(context: Context, section: Section, id: Identifier): IType;
    declare(transpiler: Transpiler): void;
    declareMember(transpiler: Transpiler, member: Identifier): void;
    transpileMember(transpiler: Transpiler, member: Identifier): void;
    isMoreSpecificThan(context: Context, other: IType): boolean;
    checkExists(context: Context): void;
}
