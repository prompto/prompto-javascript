var BaseType = require("./BaseType").BaseType;
var TextType = require("./TextType").TextType;
var Identifier = require("../grammar/Identifier").Identifier;

class EntryType extends BaseType {
    constructor(itemType) {
        super(new Identifier(itemType.name + "{}[]"));
        this.itemType = itemType;
        return this;
    }

    checkMember(context, section, name) {
        if ("key"==name) {
            return TextType.instance;
        } else if ("value"==name) {
            return this.itemType;
        } else {
            return BaseType.prototype.checkMember.call(this, context, section, name);
        }
    }

    declareMember(transpiler, section, name) {
        if ("key"==name)
            return;
        else if ("value"==name)
            this.itemType.declare(transpiler);
        else
            return BaseType.prototype.declareMember.call(this, transpiler, section, name);
    }

    transpileMember(transpiler, name) {
        transpiler.append(name);
    }
}

exports.EntryType = EntryType;