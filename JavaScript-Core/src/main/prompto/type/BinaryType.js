import NativeType from './NativeType.js'
import { TextType } from './index.js'

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
