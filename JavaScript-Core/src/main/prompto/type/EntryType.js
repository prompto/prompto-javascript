import BaseType from "./BaseType"
import { TextType } from "./index"
import { Identifier } from "../grammar/index"

export default class EntryType extends BaseType {

    constructor(itemType) {
        super(new Identifier(itemType.name + "{}[]"));
        this.itemType = itemType;
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
