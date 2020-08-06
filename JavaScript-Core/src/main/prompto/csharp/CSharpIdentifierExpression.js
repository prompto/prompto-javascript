const CSharpExpression = require("./CSharpExpression").CSharpExpression;

class CSharpIdentifierExpression extends CSharpExpression {
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
        let result = null;
        ids.split("\\.").forEach(part => {
            result = new CSharpIdentifierExpression(result, part);
        }, this);
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

exports.CSharpIdentifierExpression = CSharpIdentifierExpression;
