class JavaLiteral {
    constructor(text) {
        this.text = text;
        return this;
    }

    toString() {
        return this.text;
    }

    toDialect(writer) {
        writer.append(this.text);
    }
}


exports.JavaLiteral = JavaLiteral