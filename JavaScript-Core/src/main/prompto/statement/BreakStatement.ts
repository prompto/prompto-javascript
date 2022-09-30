import SimpleStatement from './SimpleStatement'
import {BreakResult, Context, Transpiler} from '../runtime'
import {IType, VoidType} from '../type'
import {CodeWriter} from "../utils";
import {IValue} from "../value";

export default class BreakStatement extends SimpleStatement {

    toString() {
        return "break"
    }

    toDialect(writer: CodeWriter): void {
        writer.append("break");
    }

    equals(obj: any) {
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

