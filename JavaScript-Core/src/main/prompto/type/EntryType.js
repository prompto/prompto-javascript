var BaseType = require("./BaseType").BaseType;
var TextType = require("./TextType").TextType;
var Identifier = require("../grammar/Identifier").Identifier;

function EntryType(itemType) {
	BaseType.call(this, new Identifier(itemType.name + "{}[]"));
	this.itemType = itemType;
	return this;
}

EntryType.prototype = Object.create(BaseType.prototype);
EntryType.prototype.constructor = EntryType;

EntryType.prototype.checkMember = function(context, section, name) {
	if ("key"==name) {
		return TextType.instance;
	} else if ("value"==name) {
		return this.itemType;
	} else {
		return BaseType.prototype.checkMember.call(this, context, section, name);
	}
};

EntryType.prototype.declareMember = function(transpiler, section, name) {
    if ("key"==name)
        return;
    else if ("value"==name)
        this.itemType.declare(transpiler);
    else
        return BaseType.prototype.declareMember.call(this, transpiler, section, name);
};

EntryType.prototype.transpileMember = function(transpiler, name) {
    transpiler.append(name);
};

exports.EntryType = EntryType;