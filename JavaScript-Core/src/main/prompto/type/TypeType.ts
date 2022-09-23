import BaseType from './BaseType'
import { Identifier } from '../grammar'
import Type from "./Type";
import {TypeFamily} from "../store";

export default class TypeType extends BaseType {

    type: Type;

    constructor(type: Type) {
        super(new Identifier("Type"), TypeFamily.TYPE);
        this.type = type;
    }

    toString() {
        return "Type<" + this.type.toString() + ">";
    }

    toDialect(writer: CodeWriter): void {
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

