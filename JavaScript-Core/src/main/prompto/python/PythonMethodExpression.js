var PythonSelectorExpression = require("./PythonSelectorExpression").PythonSelectorExpression;
var PythonArgumentList = require("./PythonArgumentList").PythonArgumentList;

class PythonMethodExpression extends PythonSelectorExpression {
    constructor(name, args) {
        super();
        this.name = name;
        this.args = args || new PythonArgumentList();
        return this;
    }

    toString() {
        return this.parent.toString() + "." + this.name + "(" + this.args.toString() + ")";
    }

    toDialect(writer) {
        if(this.parent!=null) {
            this.parent.toDialect(writer);
            writer.append('.');
        }
        writer.append(this.name);
        writer.append('(');
        this.args.toDialect(writer);
        writer.append(')');
    }
}

exports.PythonMethodExpression = PythonMethodExpression;