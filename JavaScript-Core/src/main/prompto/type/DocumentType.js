var MissingType = require("./MissingType").MissingType;
var NativeType = require("./NativeType").NativeType;
var TextType = require("./TextType").TextType;
var NullType = require("./NullType").NullType;
var AnyType = require("./AnyType").AnyType;
var Identifier = require("../grammar/Identifier").Identifier;
var TextValue = require("../value/TextValue").TextValue;
var IntegerValue = require("../value/IntegerValue").IntegerValue;
var Document = require("../intrinsic/Document").Document;


function DocumentType() {
	NativeType.call(this, new Identifier("Document"));
	return this;
}

DocumentType.prototype = Object.create(NativeType.prototype);
DocumentType.prototype.constructor = DocumentType;

DocumentType.instance = new DocumentType();


DocumentType.prototype.isMoreSpecificThan = function(context, other) {
    if ((other instanceof NullType) || (other instanceof AnyType) || (other instanceof MissingType))
        return true;
    else
        return NativeType.prototype.isMoreSpecificThan.call(this, context, other);
};


DocumentType.prototype.checkMember = function(context, section, name) {
	return AnyType.instance;
};


DocumentType.prototype.declare = function(transpiler) {
    transpiler.require(Document);
};

DocumentType.prototype.declareMember = function(transpiler, name) {
    // nothing to do
};


DocumentType.prototype.transpileMember = function(transpiler, name) {
    if ("text"!==name) {
        transpiler.append(name);
    } else {
        transpiler.append("getText()");
    }
};



DocumentType.prototype.transpileAssignMember = function(transpiler, name) {
    transpiler.append(".getMember('").append(name).append("', true)");
};


DocumentType.prototype.transpileAssignMemberValue = function(transpiler, name, expression) {
    transpiler.append(".setMember('").append(name).append("', ");
    expression.transpile(transpiler);
    transpiler.append(")");
};

DocumentType.prototype.transpileAssignItemValue = function(transpiler, item, expression) {
    transpiler.append(".setItem(");
    item.transpile(transpiler);
    transpiler.append(", ");
    expression.transpile(transpiler);
    transpiler.append(")");
};


DocumentType.prototype.checkItem = function(context, itemType) {
    if(itemType===TextType.instance)
        return AnyType.instance;
    else
        throw ("text");
};


DocumentType.prototype.transpileItem = function(transpiler, type, item) {
    transpiler.append(".item(");
    item.transpile(transpiler);
    transpiler.append(")");
};

DocumentType.prototype.readJSONValue = function(context, node, parts) {
    var DocumentValue = require("../value/DocumentValue").DocumentValue;
    var instance = new DocumentValue();
    for(key in node) {
        var value = this.readJSONField(context, node[key], parts);
        instance.setMember(context, key, value);
    }
    return instance;
};

DocumentType.prototype.readJSONField = function(context, node, parts) {
    if(!node)
        return NullValue.instance;
    else if(typeof(node)===typeof(true))
        return Boolean.ValueOf(node);
    else if(typeof(node)===typeof(1))
        return new IntegerValue(node);
    else if(typeof(node)===typeof(1.0))
        return new Decimal(node)
    else if(typeof(node)===typeof(""))
        return new TextValue(node)
    else if(typeof(node)===typeof([]))
        throw new Error("list");
    else if(typeof(node)===typeof({}))
        throw new Error("dict/object");
    else
        throw new Error(typeof(node).toString());
};

exports.DocumentType = DocumentType;
