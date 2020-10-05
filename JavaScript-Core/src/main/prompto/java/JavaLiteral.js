export default class JavaLiteral {

    constructor(text) {
        this.text = text;
    }

    toString() {
        return this.text;
    }

    toDialect(writer) {
        writer.append(this.text);
    }
}
