import {CodeWriter} from "../utils";
import {Expression} from "../expression";
import {Transpiler} from '../runtime';
import DocKey from "./DocKey";

export default class DocEntry {

    key: DocKey;
    value: Expression;

    constructor(key: DocKey, value: Expression) {
        this.key = key;
        this.value = value;
    }

    toString(): string {
        return this.key.toString() + ':' + this.value.toString();
    }

    toDialect(writer: CodeWriter): void {
        writer.append(this.key.toString()).append(':');
        this.value.toDialect(writer);
    }

    check(context: CodeWriter): void {
        this.key.check(context);
        this.value.check(context);
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


