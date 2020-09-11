import SimpleStatement from "./SimpleStatement"
import { BreakResult } from "../runtime/index"
import { VoidType } from "../type/index"

export default class BreakStatement extends SimpleStatement {

    toString() {
        return "break"
    }

    toDialect(writer) {
        writer.append("break");
    }

    equals(obj) {
        return (obj instanceof BreakStatement);
    }

    check(context) {
        return VoidType.instance;
    }

    interpret(context) {
        return BreakResult.instance;
    }

    declare(transpiler) {
        // nothing to do
    }

    transpile(transpiler) {
        transpiler.append("break");
    }

    canReturn() {
        return true;
    }
}

