var PythonExpression = require("./PythonExpression").PythonExpression;

class PythonIdentifierExpression extends PythonExpression {
    constructor(parent, identifier) {
        super();
        this.parent = parent;
        this.identifier = identifier;
        return this;
    }

    toString() {
        if(this.parent===null) {
            return this.identifier;
        } else {
            return this.parent.toString() + "." + this.identifier;
        }
    }

    static parse(ids) {
        var result = null;
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


exports.PythonIdentifierExpression = PythonIdentifierExpression;
