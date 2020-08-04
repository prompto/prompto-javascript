class CSharpLiteral {
    constructor(text) {
        this.text = text;
        return this;
    }

    toDialect(writer) {
        return writer.append(this.text);
    }
}


exports.CSharpLiteral = CSharpLiteral;
