import SimpleStatement from '../../../main/prompto/statement/SimpleStatement.ts'
import { BreakResult } from '../runtime'
import { VoidType } from '../type'

export default class BreakStatement extends SimpleStatement {

    toString() {
        return "break"
    }

    toDialect(writer: CodeWriter): void {
        writer.append("break");
    }

    equals(obj) {
        return (obj instanceof BreakStatement);
    }

    check(context: Context): IType {
        return VoidType.instance;
    }

    interpret(context: Context): IValue {
        return BreakResult.instance;
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("break");
    }

    canReturn() {
        return true;
    }
}

