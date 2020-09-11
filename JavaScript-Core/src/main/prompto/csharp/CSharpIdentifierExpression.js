import CSharpExpression from "./CSharpExpression"

export default class CSharpIdentifierExpression extends CSharpExpression {

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
