var NativeType = require("./NativeType").NativeType;
var BooleanType = require("./BooleanType").BooleanType;
var Identifier = require("../grammar/Identifier").Identifier;
var Version = require("../intrinsic/Version").Version;
var VersionValue = require("../value/VersionValue").VersionValue;

class VersionType extends NativeType {
    constructor() {
        super(new Identifier("Version"));
        return this;
    }

    convertJavaScriptValueToPromptoValue(context, value, returnType) {
        if(value instanceof Version)
            return new VersionValue(value);
        else
            return NativeType.prototype.convertJavaScriptValueToPromptoValue.call(this, context, value, returnType);
    }

    checkCompare(context, other, section) {
        if (other instanceof VersionType) {
            return BooleanType.instance;
        } else {
            return NativeType.prototype.checkCompare.call(this, context, other, section);
        }
    }

    declare(transpiler) {
        transpiler.register(Version);
    }

    transpile(transpiler) {
        transpiler.append('Version')
    }

    declareCompare(context, other) {
        // nothing to do
    }

    transpileCompare(transpiler, other, operator, left, right) {
        left.transpile(transpiler);
        transpiler.append(".");
        operator.transpile(transpiler);
        transpiler.append("(");
        right.transpile(transpiler);
        transpiler.append(")");
    }
}

VersionType.instance = new VersionType();

exports.VersionType = VersionType;
