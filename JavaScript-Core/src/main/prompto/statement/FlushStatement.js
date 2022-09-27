import SimpleStatement from './SimpleStatement.ts'
import { $DataStore } from '../store'
import { VoidType } from '../type'

export default class FlushStatement extends SimpleStatement {

    check(context: Context): IType {
        return VoidType.instance;
    }

    interpret(context: Context): IValue {
        $DataStore.instance.flush();
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

