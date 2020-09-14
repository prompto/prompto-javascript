export default class CssField {

    constructor(name, value) {
        this.name = name;
        this.value = value;
    }

    toDialect(writer) {
        writer.append(this.name).append(":");
        this.value.toDialect(writer);
        writer.append(";");
    }

    declare(transpiler) {
        this.value.declare(transpiler);
    }

    transpile(transpiler) {
        transpiler.append("'").append(this.name).append("':");
        this.value.transpile(transpiler);
    }
}
