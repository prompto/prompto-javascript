import CSharpExpression from './CSharpExpression'
import {CodeWriter} from "../utils";

export default class CSharpIdentifierExpression extends CSharpExpression {

    parent: CSharpIdentifierExpression | null;
    identifier: string;

    constructor(parent: CSharpIdentifierExpression | null, identifier: string) {
        super();
        this.parent = parent;
        this.identifier = identifier;
    }

    toString(): string {
        if(this.parent==null) {
            return this.identifier;
        } else {
            return this.parent.toString() + "." + this.identifier;
        }
    }

    static parse(ids: string): CSharpIdentifierExpression {
        let result: CSharpIdentifierExpression | null = null;
        ids.split("\\.").forEach(part => {
            result = new CSharpIdentifierExpression(result, part);
        }, this);
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        return result!;
    }

    toDialect(writer: CodeWriter): void {
        if(this.parent!=null) {
            this.parent.toDialect(writer);
            writer.append('.');
        }
        writer.append(this.identifier);
    }
}
