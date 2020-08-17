
export default class NativeCall extends SimpleStatement {

    toString() {
        return this.statement.toString();
    }

    check(context) {
        return VoidType.instance;
    }

    transpile(transpiler) {
        return true;
    }

    declare(transpiler) {
    }
}

