const Literal = require("./Literal").Literal;
const TupleType = require("../type/TupleType").TupleType;
const TupleValue = require("../value/TupleValue").TupleValue;
const ExpressionList = require("../utils/ExpressionList").ExpressionList;
const List = require("../intrinsic/List").List;
const Tuple = require("../intrinsic/Tuple").Tuple;

class TupleLiteral extends Literal {
    constructor(mutable, expressions) {
        if(typeof(mutable)!=typeof(true))
            throw "mutable!";
        expressions = expressions || new ExpressionList();
        super("(" + expressions.toString() + ")", new TupleValue());
        this.mutable = mutable;
        this.expressions = expressions;
        return this;
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


exports.TupleLiteral = TupleLiteral;