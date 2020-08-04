class DocEntry {
 
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }

    toString() {
        return this.key.toString() + ':' + this.value.toString();
    }

    toDialect(writer) {
        writer.append(this.key.toString()).append(':');
        this.value.toDialect(writer);
    }

    declare(transpiler) {
        this.value.declare(transpiler);
    }

    transpile(transpiler) {
        this.key.transpile(transpiler);
        transpiler.append(':');
        this.value.transpile(transpiler);
    }
}


exports.DocEntry = DocEntry;
