const Literal = require("./Literal").Literal;
const VersionType = require("../type/VersionType").VersionType;
const VersionValue = require("../value/VersionValue").VersionValue;
const Version = require("../intrinsic/Version").Version;

class VersionLiteral extends Literal {
    constructor(text) {
        const version = Version.parse(text.substring(2,text.length-1));
        super(text, new VersionValue(version));
        return this;
    }

    check(context) {
        return VersionType.instance;
    }

    declare(transpiler) {
        transpiler.require(Version);
    }

    transpile(transpiler) {
        transpiler.append("Version.parse(").append(this.text).append(")");
    }
}

exports.VersionLiteral = VersionLiteral;

