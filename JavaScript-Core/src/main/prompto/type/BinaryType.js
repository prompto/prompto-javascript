var NativeType = require("./NativeType").NativeType;

function BinaryType(name) {
    NativeType.call(this, name);
    return this;
}

BinaryType.prototype = Object.create(NativeType.prototype);
BinaryType.prototype.constructor = BinaryType;

BinaryType.prototype.checkMember = function(context, id) {
    var name = id.name;
    if ("name" === name) {
        return TextType.instance;
    } else if ("format" === name ) {
        return TextType.instance;
    } else
        return BinaryType.prototype.checkMember.call(context, id);
};

exports.BinaryType = BinaryType;