var NativeType = require("./NativeType").NativeType;
var Identifier = require("../grammar/Identifier").Identifier;
var Any = require("../intrinsic/Any").Any;

function AnyType() {
    NativeType.call(this, new Identifier("any"));
    return this;
 }

AnyType.prototype = Object.create(NativeType.prototype);
AnyType.prototype.constructor = AnyType;

AnyType.instance = new AnyType();



AnyType.prototype.checkItem = function(context, item) {
    return AnyType.instance; // required to support Document items
};


AnyType.prototype.declare = function(transpiler) {
    transpiler.register(Any);
};


AnyType.prototype.transpile = function(transpiler) {
    transpiler.append('Any');
};


AnyType.prototype.declareItem = function(transpiler, type, item) {
    // required to support Document items
    type.declare(transpiler);
    item.declare(transpiler);
};


AnyType.prototype.transpileItem = function(transpiler, type, item) {
    // required to support Document items
    transpiler.append(".item(");
    item.transpile(transpiler);
    transpiler.append(")");
};


AnyType.prototype.checkMember = function(context, section, name) {
    // required to support Document members
    return AnyType.instance;
};


AnyType.prototype.transpileAssignMemberValue = function(transpiler, name, expression) {
    // required to support Document members
    transpiler.append(".setMember('").append(name).append("', ");
    expression.transpile(transpiler);
    transpiler.append(")");
};


AnyType.prototype.transpileAssignItemValue = function(transpiler, item, expression) {
    // required to support Document members
    transpiler.append(".setItem(");
    item.transpile(transpiler);
    transpiler.append(", ");
    expression.transpile(transpiler);
    transpiler.append(")");
};

AnyType.prototype.declare = function(transpiler) {
    // nothing to do
};

AnyType.prototype.isAssignableFrom = function(context, other) {
    return true;
};

exports.AnyType = AnyType;
