import Literal from "./Literal"
import {IType, NullType} from '../type'
import {IValue, NullValue} from '../value'
import {Context, Transpiler} from "../runtime";
import {CodeWriter} from "../utils";

export default class NullLiteral extends Literal<NullValue> {

    static instance = new NullLiteral();

    private constructor() {
        super("null", NullValue.instance);
    }

    check(context: Context): IType {
        return NullType.instance;
    }

    interpret(context: Context): IValue {
        return NullValue.instance;
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("null");
    }

    toDialect(writer: CodeWriter): void {
        writer.toDialect(this);
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("nothing");
    }

    toODialect(writer: CodeWriter): void {
        writer.append("null");
    }

    toMDialect(writer: CodeWriter): void {
        writer.append("None");
    }
}

