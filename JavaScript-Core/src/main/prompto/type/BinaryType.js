import NativeType from "./NativeType"
import { TextType } from "./index"

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
