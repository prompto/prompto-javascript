var SimpleStatement = require("./SimpleStatement").SimpleStatement;
var VoidType = require("../type/VoidType").VoidType;

class NativeCall extends SimpleStatement {
    constructor() {
        super();
        return this;
    }

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

exports.NativeCall = NativeCall;
