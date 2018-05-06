var Literal = require("./Literal").Literal;
var VersionType = require("../type/VersionType").VersionType;
var VersionValue = require("../value/VersionValue").VersionValue;

function VersionLiteral(text) {
	Literal.call(this, text, VersionValue.Parse(text.substring(2,text.length-1)));
	return this;
}

VersionLiteral.prototype = Object.create(Literal.prototype);
VersionLiteral.prototype.constructor = VersionLiteral;

VersionLiteral.prototype.check = function(context) {
	return VersionType.instance;
};

exports.VersionLiteral = VersionLiteral;

