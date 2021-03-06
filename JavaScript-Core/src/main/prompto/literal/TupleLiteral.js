import Literal from './Literal.js'
import { TupleType } from '../type/index.js'
import { TupleValue } from '../value/index.js'
import { List, Tuple } from '../intrinsic/index.js'
import { ExpressionList } from '../expression/index.js'

export default class TupleLiteral extends Literal {

    constructor(mutable, expressions) {
        if(typeof(mutable)!=typeof(true))
            throw "mutable!";
        expressions = expressions || new ExpressionList();
        super("(" + expressions.toString() + ")", new TupleValue());
        this.mutable = mutable;
        this.expressions = expressions;
    }

    check(context) {
        return TupleType.instance;
    }

    declare(transpiler) {
        transpiler.require(List);
        transpiler.require(Tuple);
        this.expressions.declare(transpiler);
    }

    transpile(transpiler) {
        transpiler.append("new Tuple(").append(this.mutable).append(", [");
        this.expressions.transpile(transpiler);
        transpiler.append("])");
    }

    interpret(context) {
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

    toDialect(writer) {
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
