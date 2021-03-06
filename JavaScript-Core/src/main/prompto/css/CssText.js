export default class CssText {

    constructor(text) {
        this.text = text;
    }

    toString() {
        return this.text;
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
