var Value = require("./Value").Value;
var VersionType = null;

exports.resolve = function() {
    VersionType = require("../type/VersionType").VersionType;
};

function VersionValue(major, minor, fix) {
    Value.call(this, VersionType.instance);
	this.major = major;
    this.minor = minor;
    this.fix = fix;
	return this;
}

VersionValue.prototype = Object.create(Value.prototype);
VersionValue.prototype.constructor = VersionValue;

VersionValue.Parse = function(text) {
    var d1 = text.indexOf('.');
    var major = parseInt(text.substring(0, d1));
    var d2 = text.indexOf('.', d1 + 1);
    var minor = parseInt(text.substring(d1 + 1, d2));
    var fix = parseInt(text.substring(d2 + 1));
    return new VersionValue(major, minor, fix);
};

VersionValue.prototype.toString = function() {
    return "" + this.major + "." + this.minor + "+" + this.fix;
};

VersionValue.prototype.asInt = function() {
    return (this.major << 24) | (this.minor << 16) | this.fix;
};


VersionValue.prototype.CompareTo = function(context, value) {
    if (value instanceof VersionValue) {
        return this.cmp(value);
    } else {
        throw new SyntaxError("Illegal comparison: VersionValue and " + typeof(value));
    }
};



VersionValue.prototype.cmp = function(value) {
    var a = this.asInt();
    var b = value.asInt();
    return a > b ? 1 : (a == b ? 0 : -1);
};


VersionValue.prototype.equals = function(obj) {
    if (obj instanceof VersionValue) {
        return this.asInt() == obj.asInt();
    } else {
        return false;
    }
};


exports.VersionValue = VersionValue;


