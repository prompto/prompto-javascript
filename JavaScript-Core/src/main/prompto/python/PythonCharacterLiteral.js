const PythonLiteral = require("./PythonLiteral").PythonLiteral;

class PythonCharacterLiteral extends PythonLiteral {
    constructor(text) {
        super(text);
        return this;
    }
}

exports.PythonCharacterLiteral = PythonCharacterLiteral;
