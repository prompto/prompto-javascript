import Literal from "../../../main/prompto/literal/Literal.ts"
import { NullType } from '../type'
import { NullValue } from '../value'

export default class NullLiteral extends Literal {

    check(context: Context): Type {
        return NullType.instance;
    }

    interpret(context: Context): Value {
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

NullLiteral.instance = new NullLiteral();
