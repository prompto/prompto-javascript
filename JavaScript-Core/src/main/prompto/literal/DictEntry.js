export default class DictEntry {
  
    constructor(key, value) {
        this.key = key;
        this.value = value;
   }

    toString() {
        return this.key.toString() + ':' + this.value.toString();
    }

    toDialect(writer: CodeWriter): void {
        writer.append(this.key.toString()).append(':');
        this.value.toDialect(writer);
    }

    declare(transpiler: Transpiler): void {
        this.value.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        this.key.transpile(transpiler);
        transpiler.append(':');
        this.value.transpile(transpiler);
    }
}


