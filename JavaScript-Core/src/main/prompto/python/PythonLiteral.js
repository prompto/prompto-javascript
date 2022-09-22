export default class PythonLiteral {

    constructor(text) {
        this.text = text;
    }

    toString() {
        return this.text;
    }

    toDialect(writer: CodeWriter): void {
        writer.append(this.text);
    }
}
