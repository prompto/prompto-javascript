export default class CSharpLiteral {

    constructor(text) {
        this.text = text;
    }

    toDialect(writer) {
        return writer.append(this.text);
    }
}

