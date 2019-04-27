var Section = require("../parser/Section").Section;
var CategoryType = require("../type/CategoryType").CategoryType;
var NullValue = require("../value/NullValue").NullValue;
var NativeInstance = require("../value/NativeInstance").NativeInstance;
var ConcreteInstance = require("../value/ConcreteInstance").ConcreteInstance;

function MutableExpression(source) {
    Section.call(this);
    this.source = source;
    return this;
}

MutableExpression.prototype  = Object.create(Section.prototype);
MutableExpression.prototype.constructor = MutableExpression;

MutableExpression.prototype.check = function(context) {
    var sourceType = this.source.check(context);
    if(!(sourceType instanceof CategoryType))
        context.problemListener.reportInvalidCopySource(this);
    return new CategoryType(sourceType, true);

};


MutableExpression.prototype.interpret = function(context) {
    var value = this.source.interpret(context);
    if(value == null || value == NullValue.instance )
        return value;
    else if(value instanceof ConcreteInstance || value instanceof NativeInstance)
        return value.toMutable();
    else
        context.problemListener.reportInvalidCopySource(this);
};


MutableExpression.prototype.declare = function(transpiler) {
    this.source.declare(transpiler);
};


MutableExpression.prototype.transpile = function(transpiler) {
    this.source.transpile(transpiler);
    transpiler.append(".toMutable()");
};


MutableExpression.prototype.toDialect = function(writer) {
    writer.append("mutable ");
    this.source.toDialect(writer);
};

exports.MutableExpression = MutableExpression;
