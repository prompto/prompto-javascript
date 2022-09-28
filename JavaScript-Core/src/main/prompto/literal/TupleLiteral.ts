import Literal from './Literal'
import {IType, TupleType} from '../type'
import {IValue, TupleValue} from '../value'
import { List, Tuple } from '../intrinsic'
import { ExpressionList } from '../expression'
import {Context, Transpiler} from "../runtime";
import {CodeWriter} from "../utils";

export default class TupleLiteral extends Literal<TupleValue> {

    mutable: boolean;
    expressions: ExpressionList;

    constructor(mutable: boolean, expressions: ExpressionList | null) {
        expressions = expressions || new ExpressionList();
        super("(" + expressions.toString() + ")", new TupleValue());
        this.mutable = mutable;
        this.expressions = expressions;
    }

    check(context: Context): IType {
        return TupleType.instance;
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(List);
        transpiler.require(Tuple);
        this.expressions.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("new Tuple(").appendBoolean(this.mutable).append(", [");
        this.expressions.transpile(transpiler);
        transpiler.append("])");
    }

    interpret(context: Context): IValue {
        if(this.expressions.length>0) {
            const items = this.expressions.map(expression => expression.interpret(context), this);
            return new TupleValue(this.mutable, items);
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
