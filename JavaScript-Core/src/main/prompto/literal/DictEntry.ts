import DictKey from "./DictKey";
import {IExpression} from "../expression";
import {CodeWriter} from "../utils";
import {Transpiler} from "../runtime";

export default class DictEntry {

    key: DictKey;
    value: IExpression;

    constructor(key: DictKey, value: IExpression) {
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


