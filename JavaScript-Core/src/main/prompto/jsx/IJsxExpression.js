var Section = require("../parser/Section").Section;
var JsxValue = require("../value/JsxValue").JsxValue;

function IJsxExpression() {
    Section.call(this);
    return this;
}

IJsxExpression.prototype = Object.create(Section.prototype);
IJsxExpression.prototype.constructor = IJsxExpression;

IJsxExpression.prototype.interpret = function(context) {
    return new JsxValue(this);
};

exports.IJsxExpression = IJsxExpression;
