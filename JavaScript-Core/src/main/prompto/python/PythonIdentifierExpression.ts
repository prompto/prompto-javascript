import IPythonExpression from './IPythonExpression'
import {CodeWriter} from "../utils";

export default class PythonIdentifierExpression implements IPythonExpression {

    static parse(ids: string): PythonIdentifierExpression {
        let result: PythonIdentifierExpression | null = null;
        ids.split("\\.").forEach(part => {
            result = new PythonIdentifierExpression(result, part);
        });
        return result!;
    }

    parent: IPythonExpression | null;
    identifier: string;

    constructor(parent: IPythonExpression | null, identifier: string) {
        this.parent = parent;
        this.identifier = identifier;
    }

    toString() {
        if(this.parent==null) {
            return this.identifier;
        } else {
            return this.parent.toString() + "." + this.identifier;
        }
    }

    toDialect(writer: CodeWriter): void {
        if(this.parent!=null) {
            this.parent.toDialect(writer);
            writer.append('.');
        }
        writer.append(this.identifier);
    }
}

