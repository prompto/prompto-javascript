var NativeType = require("./NativeType").NativeType;

function BinaryType(name) {
    NativeType.call(this, name);
    return this;
}

BinaryType.prototype = Object.create(NativeType.prototype);
BinaryType.prototype.constructor = BinaryType;

BinaryType.prototype.checkMember = function(context, section, name) {
    if ("name" === name) {
        return TextType.instance;
    } else if ("format" === name ) {
        return TextType.instance;
    } else
        return NativeType.prototype.checkMember.call(context, section, name);
};

exports.BinaryType = BinaryType;