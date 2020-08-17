
export default class BinaryType extends NativeType {
    constructor(name) {
        super(name);
        return this;
    }

    checkMember(context, section, name) {
        if ("mimeType" === name ) {
            return TextType.instance;
        } else if ("url" === name ) {
            return TextType.instance;
        } else
            return NativeType.prototype.checkMember.call(context, section, name);
    }
}
