import Literal from '../../../main/prompto/literal/Literal.ts'
import { TupleType } from '../type'
import { TupleValue } from '../value'
import { List, Tuple } from '../intrinsic'
import { ExpressionList } from '../expression'

export default class TupleLiteral extends Literal {

    constructor(mutable, expressions) {
        if(typeof(mutable)!=typeof(true))
            throw "mutable!";
        expressions = expressions || new ExpressionList();
        super("(" + expressions.toString() + ")", new TupleValue());
        this.mutable = mutable;
        this.expressions = expressions;
    }

    check(context: Context): Type {
        return TupleType.instance;
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(List);
        transpiler.require(Tuple);
        this.expressions.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("new Tuple(").append(this.mutable).append(", [");
        this.expressions.transpile(transpiler);
        transpiler.append("])");
    }

    interpret(context: Context): Value {
        if(this.expressions.length>0) {
            const tuple = new TupleValue();
            this.expressions.forEach(expression => {
                const item = expression.interpret(context);
                tuple.add(item);
            });
            tuple.mutable = this.mutable;
            return tuple;
        } else
            return this.value;
    }

    toDialect(writer: CodeWriter): void {
        if(this.mutable)
            writer.append("mutable ");
        if(this.expressions!=null) {
            writer.append('(');
            this.expressions.toDialect(writer);
            if(this.expressions.length==1)
                writer.append(',');
            writer.append(')');
        } else
            writer.append("()");
    }
}
