import { IntegerType } from '../type';

export default class RangeLiteral {

    constructor(first, last) {
        this.first = first;
        this.last = last;
    }

    toString() {
        return "[" + this.first.toString() + ".." + this.last.toString() + "]";
    }

    toDialect(writer: CodeWriter): void {
        writer.append("[");
        this.first.toDialect(writer);
        writer.append("..");
        this.last.toDialect(writer);
        writer.append("]");
    }

    check(context: Context): IType {
        const firstType = this.first.check(context);
        const lastType = this.last.check(context);
        return firstType.checkRange(context,lastType);
    }

    interpret(context: Context): IValue {
        let type = this.first.check(context);
        if("IntegerLimits"==type.name) {
            type = IntegerType.instance;
        }
        const of = this.first.interpret(context);
        const ol = this.last.interpret(context);
        return type.newRange(of,ol);
    }

    declare(transpiler: Transpiler): void {
        this.first.declare(transpiler);
        const firstType = this.first.check(transpiler.context);
        firstType.declare(transpiler);
        this.last.declare(transpiler);
        const lastType = this.last.check(transpiler.context);
        lastType.declare(transpiler);
        return firstType.declareRange(transpiler, lastType);
    }

    transpile(transpiler: Transpiler): void {
        const firstType = this.first.check(transpiler.context);
        return firstType.transpileRange(transpiler, this.first, this.last);
    }
}


