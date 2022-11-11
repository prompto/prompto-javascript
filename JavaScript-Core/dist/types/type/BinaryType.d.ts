import NativeType from './NativeType';
import { Context } from "../runtime";
import { Section } from "../parser";
import IType from "./IType";
import { TypeFamily } from "../store";
import { Identifier } from "../grammar";
export default class BinaryType extends NativeType {
    constructor(id: Identifier, family: TypeFamily);
    checkMember(context: Context, section: Section, member: Identifier): IType;
}
