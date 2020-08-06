const SimpleStatement = require("./SimpleStatement").SimpleStatement;
const $DataStore = require("../store/DataStore").$DataStore;
const VoidType = require("../type/VoidType").VoidType;


class FlushStatement extends SimpleStatement {
    constructor() {
        super();
        return this;
    }

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


exports.FlushStatement = FlushStatement;
