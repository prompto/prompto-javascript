const PythonExpression = require("./PythonExpression").PythonExpression;

class PythonSelfExpression extends PythonExpression {
    constructor() {
        super();
        return this;
    }

    toString() {
        return "self";
    }

    toDialect(writer) {
        writer.append("self");
    }
}

exports.PythonSelfExpression = PythonSelfExpression;