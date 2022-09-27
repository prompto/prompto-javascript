import BaseParameter from './BaseParameter'
import { CodeType } from '../type'
import { SyntaxError } from '../error'
import {Identifier} from "../grammar";

export default class CodeParameter extends BaseParameter {

    constructor(id: Identifier) {
        super(id);
    }

    getProto() {
        return CodeType.instance.name;
    }

    register(context: Context): void {
        const actual = context.getRegisteredValue(this.name);
        if(actual!=null) {
            throw new SyntaxError("Duplicate argument: \"" + this.name + "\"");
        }
        context.registerValue(this);
    }

    check(context: Context): IType {
        // nothing to do
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    getType(context) {
        return CodeType.instance;
    }

    toDialect(writer: CodeWriter): void {
        writer.append(CodeType.instance.name);
        writer.append(" ");
        writer.append(this.name);
    }
}
