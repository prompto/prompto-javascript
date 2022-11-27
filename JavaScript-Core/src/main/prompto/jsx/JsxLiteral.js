import { TextType, VoidType } from '../type/index.js'

export default class JsxLiteral {

    constructor(text) {
        this.text = text;
    }

    check(context) {
        return TextType.instance;
    }

    checkMethodReference(context, method) {
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
