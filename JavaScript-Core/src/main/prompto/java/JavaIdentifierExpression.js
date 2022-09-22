import JavaExpression from './JavaExpression.js'

export default class JavaIdentifierExpression extends JavaExpression {

    constructor(parent, identifier, isChildClass) {
        super();
        this.parent = parent || null;
        this.identifier = identifier || null;
        this.isChildClass = isChildClass || false;
    }

    parse(ids) {
        let result = null;
        ids.split("\\.").forEach(part => {
            result = new JavaIdentifierExpression(result, part);
        });
        return result;
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

