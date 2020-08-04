class JavaScriptLiteral {
    constructor(text) {
        this.text = text;
        this.value = eval(text);
        return this;
    }

    interpret(context) {
        return this.value;
    }

    toString() {
        return this.text;
    }

    toDialect(writer) {
        writer.append(this.text);
    }

    transpile(transpiler) {
        transpiler.append(this.text);
    }
}

exports.JavaScriptLiteral = JavaScriptLiteral;
