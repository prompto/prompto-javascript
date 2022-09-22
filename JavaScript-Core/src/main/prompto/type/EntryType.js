import BaseType from '../../../main/prompto/type/BaseType.ts'
import { TextType } from './index.ts'
import { Identifier } from '../grammar'

export default class EntryType extends BaseType {

    constructor(itemType) {
        super(new Identifier(itemType.name + "{}[]"));
        this.itemType = itemType;
    }

    checkMember(context, section, id) {
        if ("key" === id.name) {
            return TextType.instance;
        } else if ("value" === id.name) {
            return this.itemType;
        } else {
            return super.checkMember(context, section, id);
        }
    }

    declareMember(transpiler, section, id) {
        if ("key" === id.name)
            return;
        else if ("value" === id.name)
            this.itemType.declare(transpiler);
        else
            return super.declareMember(transpiler, section, id);
    }

    transpileMember(transpiler, id) {
        transpiler.append(id.name);
    }
}
