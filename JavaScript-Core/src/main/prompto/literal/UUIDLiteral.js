var Literal = require("./Literal").Literal;
var UUIDValue = require("../value/UUIDValue").UUIDValue;
var UUIDType = require("../type/UUIDType").UUIDType;

/*jshint evil:true*/
function parse(text) {
	return eval(text);
}

function UUIDLiteral(text) {
	Literal.call(this, text, new UUIDValue(parse(text)));
	return this;
}

UUIDLiteral.prototype = Object.create(Literal.prototype);
UUIDLiteral.prototype.constructor = UUIDLiteral;


UUIDLiteral.prototype.check = function(context) {
	return UUIDType.instance;
};

UUIDLiteral.prototype.declare = function(transpiler) {
    var UUID = require("../intrinsic/UUID").UUID;
    transpiler.require(UUID);
};

UUIDLiteral.prototype.transpile = function(transpiler) {
    transpiler.append("UUID.fromString(").append(this.text).append(")");
};


exports.UUIDLiteral = UUIDLiteral;
