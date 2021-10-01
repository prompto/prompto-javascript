export default class CssField {

    constructor(name, values) {
        this.name = name;
        this.values = values;
    }

    toString() {
        return this.name + ": " + this.valuesToString();
    }

    toDialect(writer) {
        writer.append(this.name).append(":");
        this.values.forEach(v => v.toDialect(writer));
        writer.append(";");
    }

    declare(transpiler) {
        this.values.forEach(v => v.declare(transpiler));
    }

    transpile(transpiler) {
        transpiler.append("'").append(this.name).append("':");
        if(this.values.length === 1)
            this.values[0].transpile(transpiler);
        else {
            transpiler.append('"" + ');
            this.values.forEach(v => {
                v.transpile(transpiler);
                transpiler.append(" + ");
            });
            transpiler.trimLast(" + ".length);
        }
    }

    valuesToString() {
        return this.values.map(v => v.toString()).join("");
    }
}
