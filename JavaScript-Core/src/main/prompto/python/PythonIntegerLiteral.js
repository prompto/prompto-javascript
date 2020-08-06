const PythonLiteral = require("./PythonLiteral").PythonLiteral;

class PythonIntegerLiteral extends PythonLiteral {
    constructor(text) {
        super(text);
        return this;
    }
}

exports.PythonIntegerLiteral = PythonIntegerLiteral;
