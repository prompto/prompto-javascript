import BaseType from './BaseType'
import { Identifier } from '../grammar'
import IType from "../../../main/prompto/type/IType";
import {TypeFamily} from "../store";
import {Section} from "../parser";
import {Context, Transpiler} from "../runtime";
import {CodeWriter} from "../utils";

export default class TypeType extends BaseType {

    type: IType;

    constructor(type: IType) {
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

    checkMember(context: Context, section: Section, id: Identifier): IType {
        return this.type.checkStaticMember(context, section, id);
    }

    declareMember(transpiler, id) {
        this.type.declare(transpiler);
        this.type.declareStaticMember(transpiler, id);
    }

    transpileMember(transpiler: Transpiler, id: Identifier): void {
        this.type.transpileStaticMember(transpiler, id);
    }

    getMemberMethods(context, id) {
        return this.type.getStaticMemberMethods(context, id);
    }
}

