var Literal = require("./Literal").Literal;
var VersionType = require("../type/VersionType").VersionType;
var VersionValue = require("../value/VersionValue").VersionValue;
var Version = require("../intrinsic/Version").Version;

function VersionLiteral(text) {
    var version = Version.Parse(text.substring(2,text.length-1));
	Literal.call(this, text, new VersionValue(version));
	return this;
}

VersionLiteral.prototype = Object.create(Literal.prototype);
VersionLiteral.prototype.constructor = VersionLiteral;

VersionLiteral.prototype.check = function(context) {
	return VersionType.instance;
};

VersionLiteral.prototype.declare = function(transpiler) {
    transpiler.require(Version);
};

VersionLiteral.prototype.transpile = function(transpiler) {
    transpiler.append("Version.Parse(").append(this.text).append(")");
};

exports.VersionLiteral = VersionLiteral;

