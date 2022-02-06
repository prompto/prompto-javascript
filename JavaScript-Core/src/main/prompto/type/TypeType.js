import BaseType from './BaseType.js'
import { Identifier } from '../grammar/index.js'

export default class TypeType extends BaseType {

    constructor(type) {
        super(new Identifier("Type"));
        this.type = type;
    }

    toString() {
        return "Type<" + this.type.toString() + ">";
    }

    toDialect(writer) {
        writer.append("Type<");
        this.type.toDialect(writer);
        writer.append(">");
    }

    checkMember(context, section, id) {
        return this.type.checkStaticMember(context, section, id);
    }

    declareMember(transpiler, section, id) {
        this.type.declare(transpiler);
        this.type.declareStaticMember(transpiler, section, id);
    }

    transpileMember(transpiler, id) {
        this.type.transpileStaticMember(transpiler, id);
    }

    getMemberMethods(context, id) {
        return this.type.getStaticMemberMethods(context, id);
    }
}

