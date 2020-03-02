var NativeType = require("./NativeType").NativeType;
var DocumentType = require("./DocumentType").DocumentType;
var Identifier = require("../grammar/Identifier").Identifier;
var Any = require("../intrinsic/Any").Any;

function AnyType() {
    NativeType.call(this, new Identifier("any"));
    return this;
 }

AnyType.prototype = Object.create(NativeType.prototype);
AnyType.prototype.constructor = AnyType;

AnyType.instance = new AnyType();


AnyType.prototype.isAssignableFrom = function(context, other) {
    return true;
};


AnyType.prototype.checkItem = function(context, item) {
    return DocumentType.instance.checkItem(context, item);
};


AnyType.prototype.checkMember = function(context, section, name) {
    return DocumentType.instance.checkMember(context, section, name);
};



AnyType.prototype.declare = function(transpiler) {
    transpiler.register(Any);
    DocumentType.instance.declare(transpiler);
};


AnyType.prototype.transpile = function(transpiler) {
    transpiler.append('Any');
};


AnyType.prototype.declareItem = function(transpiler, type, item) {
    DocumentType.instance.declareItem(transpiler, type, item);
};


AnyType.prototype.transpileItem = function(transpiler, type, item) {
    DocumentType.instance.transpileItem(transpiler, type, item);
};


AnyType.prototype.declareMember = function(transpiler, name) {
    DocumentType.instance.declareMember(transpiler, name);
};


AnyType.prototype.transpileMember = function(transpiler, name) {
    DocumentType.instance.transpileMember(transpiler, name);
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

exports.AnyType = AnyType;
