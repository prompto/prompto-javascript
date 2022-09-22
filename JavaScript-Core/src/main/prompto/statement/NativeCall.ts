import SimpleStatement from '../../../main/prompto/statement/SimpleStatement.js'
import { VoidType } from '../type'

export default class NativeCall extends SimpleStatement {

    toString() {
        return this.statement.toString();
    }

    check(context: Context): Type {
        return VoidType.instance;
    }

    transpile(transpiler: Transpiler): void {
        return true;
    }

    declare(transpiler: Transpiler): void {
    }
}

