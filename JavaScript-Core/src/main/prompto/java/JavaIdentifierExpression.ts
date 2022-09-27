import JavaExpression from './JavaExpression'
import {CodeWriter} from "../utils";

export default class JavaIdentifierExpression extends JavaExpression {

    parent: JavaExpression | null;
    identifier: string;
    isChildClass: boolean;

    constructor(parent: JavaExpression | null, identifier: string, isChildClass?: boolean) {
        super();
        this.parent = parent || null;
        this.identifier = identifier;
        this.isChildClass = isChildClass || false;
    }

    parse(ids: string): JavaIdentifierExpression {
        let result: JavaIdentifierExpression;
        ids.split("\\.").forEach(part => {
            result = new JavaIdentifierExpression(result, part);
        });
        return result!;
    }

    toString() {
        if(this.parent==null) {
            return this.identifier;
        } else {
            return this.parent.toString() + (this.isChildClass ? '$' : '.') + this.identifier;
        }
    }

    toDialect(writer: CodeWriter): void {
        if(this.parent!=null) {
            this.parent.toDialect(writer);
            writer.append(this.isChildClass ? '$' : '.');
        }
        writer.append(this.identifier);
    }
}

