import BaseParameter from './BaseParameter'
import {CodeType, IType} from '../type'
import {Identifier} from "../grammar";
import {Context, Transpiler} from "../runtime";
import {CodeWriter} from "../utils";
import {Dialect} from "../parser";
import {IParameter} from "./index";

export default class CodeParameter extends BaseParameter {

    constructor(id: Identifier) {
        super(id, false);
    }

    getProto() {
        return CodeType.instance.name;
    }

    register(context: Context): void {
        context.registerInstance(this, true);
    }

    check(context: Context): IType {
        return CodeType.instance;
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    getType(context: Context): IType {
        return CodeType.instance;
    }

    toDialect(writer: CodeWriter): void {
        writer.append(CodeType.instance.name);
        writer.append(" ");
        writer.append(this.name);
    }

    equals(other: IParameter): boolean {
        return other == this;
    }

    getSignature(dialect: Dialect): string {
        return "";
    }

    getTranspiledName(context: Context): string {
        return "";
    }

    toEDialect(writer: CodeWriter): void {
        // nothing to do
    }

    toMDialect(writer: CodeWriter): void {
        // nothing to do
    }

    toODialect(writer: CodeWriter): void {
        // nothing to do
    }
}
