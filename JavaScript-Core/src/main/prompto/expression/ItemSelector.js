import SelectorExpression from './SelectorExpression.js'
import { Value, NullValue } from '../value'
import { SyntaxError, NullReferenceError } from '../error'

export default class ItemSelector extends SelectorExpression {

    constructor(parent, item) {
        super(parent);
        this.item = item;
    }

    toString() {
        return this.parent.toString() + "[" + this.item.toString() + "]";
    }

    toDialect(writer: CodeWriter): void {
        this.parent.toDialect(writer);
        writer.append("[");
        this.item.toDialect(writer);
        writer.append("]");
    }

    check(context: Context): Type {
        const parentType = this.parent.check(context);
        const itemType = this.item.check(context);
        return parentType.checkItem(context, itemType, this);
    }

    interpret(context: Context): Value {
        const o = this.parent.interpret(context);
        if (o == null || o == NullValue.instance) {
            throw new NullReferenceError();
        }
        const i = this.item.interpret(context);
        if (i == null || i == NullValue.instance) {
            throw new NullReferenceError();
        }
        if (o.getItemInContext && i instanceof Value) {
            return o.getItemInContext(context, i);
        } else {
            throw new SyntaxError("Unknown container: " + this.parent);
        }
    }

    declare(transpiler: Transpiler): void {
        const parentType = this.parent.check(transpiler.context);
        const itemType = this.item.check(transpiler.context);
        return parentType.declareItem(transpiler, itemType, this.item);
    }

    transpile(transpiler: Transpiler): void {
        this.parent.transpile(transpiler);
        const parentType = this.parent.check(transpiler.context);
        const itemType = this.item.check(transpiler.context);
        return parentType.transpileItem(transpiler, itemType, this.item);
    }
}
