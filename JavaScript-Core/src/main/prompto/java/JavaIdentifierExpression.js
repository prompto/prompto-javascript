var JavaExpression = require("./JavaExpression").JavaExpression;

class JavaIdentifierExpression extends JavaExpression {
    constructor(parent, identifier, isChildClass) {
        super();
        this.parent = parent || null;
        this.identifier = identifier || null;
        this.isChildClass = isChildClass || false;
        return this;
    }

    parse(ids) {
        var result = null;
        ids.split("\\.").forEach(function(part) {
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

    toDialect(writer) {
        if(this.parent!=null) {
            this.parent.toDialect(writer);
            writer.append(this.isChildClass ? '$' : '.');
        }
        writer.append(this.identifier);
    }
}


exports.JavaIdentifierExpression = JavaIdentifierExpression;
