var SimpleStatement = require("./SimpleStatement").SimpleStatement;
var BreakResult = require("../runtime/BreakResult").BreakResult;
var VoidType = require("../type/VoidType").VoidType;

class BreakStatement extends SimpleStatement {
    constructor() {
        super();
        return this;
    }

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

exports.BreakStatement = BreakStatement;
