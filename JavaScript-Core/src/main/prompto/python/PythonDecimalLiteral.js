var PythonLiteral = require("./PythonLiteral").PythonLiteral;

class PythonDecimalLiteral extends PythonLiteral {
    constructor(text) {
        super(text);
        return this;
    }
}

exports.PythonDecimalLiteral = PythonDecimalLiteral;
