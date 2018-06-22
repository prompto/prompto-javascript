var JsxValue = require("../value/JsxValue").JsxValue;

function IJsxExpression() {
    return this;
}


IJsxExpression.prototype.interpret = function(context) {
    return new JsxValue(this);
};

exports.IJsxExpression = IJsxExpression;
