import NativeType from './NativeType'
import { TextType } from './index'
import {Context} from "../runtime";
import {Section} from "../parser";
import IType from "./IType";
import {TypeFamily} from "../store";
import {Identifier} from "../grammar";

export default class BinaryType extends NativeType {

    constructor(id: Identifier, family: TypeFamily) {
        super(id, family);
    }

    checkMember(context: Context, section: Section, member: Identifier): IType {
        if ("mimeType" === member.name ) {
            return TextType.instance;
        } else if ("url" === member.name ) {
            return TextType.instance;
        } else
            return super.checkMember(context, section, member);
    }
}
