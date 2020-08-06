const TextType = require("../type/TextType").TextType;
const VoidType = require("../type/VoidType").VoidType;

class JsxLiteral {
    constructor(text) {
        this.text = text;
        return this;
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

exports.JsxLiteral = JsxLiteral;
