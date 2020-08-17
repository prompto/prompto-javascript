
export default class PythonIdentifierExpression extends PythonExpression {

    constructor(parent, identifier) {
        super();
        this.parent = parent;
        this.identifier = identifier;
    }

    toString() {
        if(this.parent===null) {
            return this.identifier;
        } else {
            return this.parent.toString() + "." + this.identifier;
        }
    }

    static parse(ids) {
        let result = null;
        ids.split("\\.").forEach(part => {
            result = new PythonIdentifierExpression(result, part);
        });
        return result;
    }

    toDialect(writer) {
        if(this.parent!=null) {
            this.parent.toDialect(writer);
            writer.append('.');
        }
        writer.append(this.identifier);
    }
}

