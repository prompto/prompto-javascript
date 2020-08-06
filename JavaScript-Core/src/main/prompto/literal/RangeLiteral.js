const IntegerType = require("../type/IntegerType").IntegerType;

class RangeLiteral {
    constructor(first, last) {
        this.first = first;
        this.last = last;
        return this;
    }

    toString() {
        return "[" + this.first.toString() + ".." + this.last.toString() + "]";
    }

    toDialect(writer) {
        writer.append("[");
        this.first.toDialect(writer);
        writer.append("..");
        this.last.toDialect(writer);
        writer.append("]");
    }

    check(context) {
        const firstType = this.first.check(context);
        const lastType = this.last.check(context);
        return firstType.checkRange(context,lastType);
    }

    interpret(context) {
        let type = this.first.check(context);
        if("IntegerLimits"==type.name) {
            type = IntegerType.instance;
        }
        const of = this.first.interpret(context);
        const ol = this.last.interpret(context);
        return type.newRange(of,ol);
    }

    declare(transpiler) {
        this.first.declare(transpiler);
        const firstType = this.first.check(transpiler.context);
        firstType.declare(transpiler);
        this.last.declare(transpiler);
        const lastType = this.last.check(transpiler.context);
        lastType.declare(transpiler);
        return firstType.declareRange(transpiler, lastType);
    }

    transpile(transpiler) {
        const firstType = this.first.check(transpiler.context);
        return firstType.transpileRange(transpiler, this.first, this.last);
    }
}

exports.RangeLiteral = RangeLiteral;

