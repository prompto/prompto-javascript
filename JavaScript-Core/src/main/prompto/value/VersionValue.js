var Value = require("./Value").Value;
var Version = require("../intrinsic/Version").Version;
var VersionType = null;

exports.resolve = function() {
    VersionType = require("../type/VersionType").VersionType;
};

function VersionValue(version) {
    Value.call(this, VersionType.instance);
    this.version = version;
	return this;
}

VersionValue.prototype = Object.create(Value.prototype);
VersionValue.prototype.constructor = VersionValue;

Object.defineProperty(VersionValue.prototype, "major", {
    get: function() { return this.version.major; }
});

Object.defineProperty(VersionValue.prototype, "minor", {
    get: function() { return this.version.major; }
});

Object.defineProperty(VersionValue.prototype, "fix", {
    get: function() { return this.version.major; }
});

VersionValue.prototype.toString = function() {
    return this.version.toString();
};



VersionValue.prototype.CompareTo = function(context, value) {
    if (value instanceof VersionValue) {
        return this.version.cmp(value.version);
    } else {
        throw new SyntaxError("Illegal comparison: VersionValue and " + typeof(value));
    }
};


VersionValue.prototype.equals = function(obj) {
    if (obj instanceof VersionValue) {
        return this.version.equals(obj.version);
    } else {
        return false;
    }
};


exports.VersionValue = VersionValue;


