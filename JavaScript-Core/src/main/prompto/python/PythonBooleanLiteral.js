var PythonLiteral = require("./PythonLiteral").PythonLiteral;

class PythonBooleanLiteral extends PythonLiteral {
    constructor(text) {
        super(text);
        return this;
    }
}

exports.PythonBooleanLiteral = PythonBooleanLiteral;
