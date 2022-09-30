import SimpleStatement from './SimpleStatement'
import { $DataStore } from '../store'
import {IType, VoidType} from '../type'
import {Context, Transpiler} from "../runtime";
import {IValue} from "../value";
import {CodeWriter} from "../utils";

export default class FlushStatement extends SimpleStatement {

    check(context: Context): IType {
        return VoidType.instance;
    }

    interpret(context: Context): IValue | null {
        $DataStore.instance.flush();
        return null;
    }

    declare(transpiler: Transpiler): void {
        transpiler.require($DataStore);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("$DataStore.instance.flush()");
    }

    toDialect(writer: CodeWriter): void {
        writer.toDialect(this);
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("flush");
    }

    toMDialect(writer: CodeWriter): void {
        writer.append("flush()");
    }

    toODialect(writer: CodeWriter): void {
        writer.append("flush()");
    }
}

