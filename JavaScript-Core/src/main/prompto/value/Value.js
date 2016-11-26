var NullValue = null;
var Text = null;
var Integer = null;
var Decimal = null;

exports.resolve = function() {
    NullValue = require("./NullValue").NullValue;
    Text = require("./Text").Text;
    Integer = require("./Integer").Integer;
    Decimal = require("./Decimal").Decimal;
};

var id = 0;

function Value (type) {
    this.id = ++id;
    this.type = type;
    this.mutable = false;
	return this;
}

Value.prototype.collectStorables = function(list) {
    // do nothing
};

Value.prototype.And = function(context, value) {
	throw new SyntaxError("Logical and not supported by " + this.constructor.name);
};

Value.prototype.Or = function(context, value) {
	throw new SyntaxError("Logical or not supported by " + this.constructor.name);
};

Value.prototype.Not = function(context) {
	throw new SyntaxError("Logical negation not supported by " + this.constructor.name);
};

Value.prototype.Add = function(context, value) {
	throw new SyntaxError("Add not supported by " + this.constructor.name);
};

Value.prototype.Subtract = function(context, value) {
	throw new SyntaxError("Subtract not supported by " + this.constructor.name);
};

Value.prototype.Multiply = function(context, value) {
	throw new SyntaxError("Multiply not supported by " + this.constructor.name);
};

Value.prototype.Divide = function(context, value) {
	throw new SyntaxError("Divide not supported by " + this.constructor.name);
};

Value.prototype.IntDivide = function(context, value) {
	throw new SyntaxError("Integer divide not supported by " + this.constructor.name);
};

Value.prototype.Modulo = function(context, value) {
	throw new SyntaxError("Modulo not supported by " + this.constructor.name);
};

Value.prototype.Minus = function(context) {
	throw new SyntaxError("Minus not supported by " + this.constructor.name);
};

Value.prototype.CompareTo = function(context, value) {
	throw new SyntaxError("Compare not supported by " + this.constructor.name);
};

Value.prototype.getMemberValue = function(context, name) {
	throw new SyntaxError("No member support for " + this.constructor.name);
};

Value.prototype.ConvertTo = function(type) {
	return this;
};

Value.prototype.Roughly = function(context, value) {
    return this.equals(value);
};

function Instance(type) {
    Value.call(this, type);
    return this;
}

Instance.prototype = Object.create(Value.prototype);
Instance.prototype.constructor = Instance;


function Container(type) {
    Value.call(this, type);
    return this;
}

Container.prototype = Object.create(Value.prototype);
Container.prototype.constructor = Container;


exports.Value = Value;
exports.Instance = Instance;
exports.Container = Container;
