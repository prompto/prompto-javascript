export default class JavaScriptLiteral {

    constructor(text) {
        this.text = text;
        this.value = eval(text);
    }

    interpret(context: Context): Value {
        return this.value;
    }

    toString() {
        return this.text;
    }

    toDialect(writer: CodeWriter): void {
        writer.append(this.text);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append(this.text);
    }
}
