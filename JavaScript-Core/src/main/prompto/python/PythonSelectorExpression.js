const PythonExpression = require("./PythonExpression").PythonExpression;

class PythonSelectorExpression extends PythonExpression {
    constructor(parent) {
        super();
        this.parent = parent || null;
        return this;
    }
}

exports.PythonSelectorExpression = PythonSelectorExpression;
