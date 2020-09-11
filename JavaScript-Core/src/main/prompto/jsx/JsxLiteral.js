import { TextType, VoidType } from "../type/index"

export default class JsxLiteral {

    constructor(text) {
        this.text = text;
    }

    check(context) {
        return TextType.instance;
    }

    checkProto(context, proto) {
        return VoidType.instance;
    }

    toString() {
        return this.text;
    }

    isLiteral(context) {
        return true;
    }

    toDialect(writer) {
        writer.append(this.text);
    }

    declare(transpiler) {
        // nothing to do
    }

    transpile(transpiler) {
        transpiler.append(this.text);
    }
}
