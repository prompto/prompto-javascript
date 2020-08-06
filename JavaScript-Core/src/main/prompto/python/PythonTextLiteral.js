const PythonLiteral = require("./PythonLiteral").PythonLiteral;

class PythonTextLiteral extends PythonLiteral {
    constructor(text) {
        super(text);
        return this;
    }
}

exports.PythonTextLiteral = PythonTextLiteral;
