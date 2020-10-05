import BaseType from './BaseType.js'
import { Identifier } from '../grammar/index.js'

export default class TypeType extends BaseType {

    constructor(type) {
        super(new Identifier("Type"));
        this.type = type;
    }

    checkMember(context, section, name) {
        return this.type.checkStaticMember(context, section, name);
    }

    declareMember(transpiler, section, name) {
        this.type.declare(transpiler);
        this.type.declareStaticMember(transpiler, section, name);
    }

    transpileMember(transpiler, name) {
        this.type.transpileStaticMember(transpiler, name);
    }

    getMemberMethods(context, section, name) {
        return this.type.getStaticMemberMethods(context, section, name);
    }
}

