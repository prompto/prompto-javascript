var Value = require("./Value").Value;
var CodeType = require("../type/CodeType").CodeType;

function CodeValue(expression) {
    Value.call(this, CodeType.instance);
    this.expression = expression;
    return this;
}

CodeValue.prototype = Object.create(Value.prototype);
CodeValue.prototype.constructor = CodeValue;

CodeValue.prototype.check = function(context) {
    return this.expression.checkCode (context);
};

CodeValue.prototype.interpret = function(context) {
    return this.expression.interpretCode (context);
};

exports.CodeValue = CodeValue; 