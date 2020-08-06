const Section = require("../parser/Section").Section;
const JsxValue = require("../value/JsxValue").JsxValue;

class IJsxExpression extends Section {
    constructor() {
        super();
        return this;
    }

    interpret(context) {
        return new JsxValue(this);
    }
}

exports.IJsxExpression = IJsxExpression;
