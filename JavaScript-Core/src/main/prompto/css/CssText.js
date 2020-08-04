class CssText {
    constructor(text) {
        this.text = text;
        return this;
    }

    toDialect(writer) {
        writer.append(this.text);
    }

    declare(transpiler) {
        // nothing to do
    }

    transpile(transpiler) {
        transpiler.append(JSON.stringify(this.text));
    }
}

exports.CssText = CssText;