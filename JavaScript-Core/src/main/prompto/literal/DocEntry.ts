import {CodeWriter} from "../utils";
import {IExpression} from "../expression";
import {Transpiler} from '../runtime';
import IDocumentKey from "../../../main/prompto/literal/IDocumentKey";

export default class DocEntry {

    key: IDocumentKey;
    value: IExpression;

    constructor(key: IDocumentKey, value: IExpression) {
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


