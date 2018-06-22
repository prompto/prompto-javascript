function IJsxExpression() {
    return this;
}


IJsxExpression.prototype.interpret = function(context) {
    return new JsxValue(this);
};

exports.IJsxExpression = IJsxExpression;
