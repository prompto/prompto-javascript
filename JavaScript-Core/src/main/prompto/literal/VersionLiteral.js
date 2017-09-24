var Literal = require("./Literal").Literal;
var VersionType = require("../type/VersionType").VersionType;
var Version = require("../value/Version").Version;

function VersionLiteral(text) {
	Literal.call(this, text, Version.Parse(text.substring(2,text.length-1)));
	return this;
}

VersionLiteral.prototype = Object.create(Literal.prototype);
VersionLiteral.prototype.constructor = VersionLiteral;

VersionLiteral.prototype.check = function(context) {
	return VersionType.instance;
};

exports.VersionLiteral = VersionLiteral;

