import NativeType from './NativeType.js'
import { TextType } from './index.js'

export default class BinaryType extends NativeType {

    constructor(name) {
        super(name);
    }

    checkMember(context, section, name) {
        if ("mimeType" === name ) {
            return TextType.instance;
        } else if ("url" === name ) {
            return TextType.instance;
        } else
            return super.checkMember(context, section, name);
    }
}
