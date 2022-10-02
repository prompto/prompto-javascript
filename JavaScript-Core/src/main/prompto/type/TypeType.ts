import BaseType from './BaseType'
import { Identifier } from '../grammar'
import { IType } from "../type";
import {TypeFamily} from "../store";
import {Section} from "../parser";
import {Context, Transpiler} from "../runtime";
import {CodeWriter} from "../utils";
import {IMethodDeclaration} from "../declaration";

export default class TypeType extends BaseType {

    type: IType;

    constructor(type: IType) {
        super(new Identifier("Type"), TypeFamily.TYPE);
        this.type = type;
    }

    checkExists(context: Context) {
        // nothing to do
    }

    isMoreSpecificThan(context: Context, other: IType): boolean {
        return false;
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

    declareMember(transpiler: Transpiler, member: Identifier) {
        this.type.declare(transpiler);
        this.type.declareStaticMember(transpiler, member);
    }

    transpileMember(transpiler: Transpiler, member: Identifier): void {
        this.type.transpileStaticMember(transpiler, member);
    }

    getMemberMethods(context: Context, member: Identifier): Set<IMethodDeclaration> {
        return this.type.getStaticMemberMethods(context, member);
    }
}

