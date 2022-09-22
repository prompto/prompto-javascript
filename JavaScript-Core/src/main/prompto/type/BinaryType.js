import NativeType from '../../../main/prompto/type/NativeType.ts'
import { TextType } from './index.ts'

export default class BinaryType extends NativeType {

    constructor(name) {
        super(name);
    }

    checkMember(context, section, id) {
        if ("mimeType" === id.name ) {
            return TextType.instance;
        } else if ("url" === id.name ) {
            return TextType.instance;
        } else
            return super.checkMember(context, section, id);
    }
}
