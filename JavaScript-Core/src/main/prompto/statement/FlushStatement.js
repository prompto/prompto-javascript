import SimpleStatement from './SimpleStatement.js'
import { $DataStore } from '../store/index.js'
import { VoidType } from '../type/index.js'

export default class FlushStatement extends SimpleStatement {

    check(context) {
        return VoidType.instance;
    }

    interpret(context) {
        $DataStore.instance.flush();
    }

    declare(transpiler) {
        transpiler.require($DataStore);
    }

    transpile(transpiler) {
        transpiler.append("$DataStore.instance.flush()");
    }

    toDialect(writer) {
        writer.toDialect(this);
    }

    toEDialect(writer) {
        writer.append("flush");
    }

    toMDialect(writer) {
        writer.append("flush()");
    }

    toODialect(writer) {
        writer.append("flush()");
    }
}

