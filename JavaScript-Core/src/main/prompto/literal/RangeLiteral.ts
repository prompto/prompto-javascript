import {IntegerType, IType} from '../type';
import {IExpression} from "../expression";
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import {IValue} from "../value";
import {Section} from "../parser";

export default class RangeLiteral extends Section {

    first: IExpression;
    last: IExpression;

    constructor(first: IExpression, last: IExpression) {
        super();
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
        return firstType.checkRange(context, this, lastType);
    }

    interpret(context: Context): IValue {
        let type = this.first.check(context);
        if("IntegerLimits"==type.name) {
            type = IntegerType.instance;
        }
        const of = this.first.interpretExpression(context);
        const ol = this.last.interpretExpression(context);
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
        const lastType = this.last.check(transpiler.context);
        return firstType.transpileRange(transpiler, lastType, this.first, this.last);
    }
}


