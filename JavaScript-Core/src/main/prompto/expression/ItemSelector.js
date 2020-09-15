import SelectorExpression from './SelectorExpression.js'
import { Value, NullValue } from '../value/index.js'
import { SyntaxError, NullReferenceError } from '../error/index.js'

export default class ItemSelector extends SelectorExpression {

    constructor(parent, item) {
        super(parent);
        this.item = item;
    }

    toString() {
        return this.parent.toString() + "[" + this.item.toString() + "]";
    }

    toDialect(writer) {
        this.parent.toDialect(writer);
        writer.append("[");
        this.item.toDialect(writer);
        writer.append("]");
    }

    check(context) {
        const parentType = this.parent.check(context);
        const itemType = this.item.check(context);
        return parentType.checkItem(context, itemType, this);
    }

    interpret(context) {
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

    declare(transpiler) {
        const parentType = this.parent.check(transpiler.context);
        const itemType = this.item.check(transpiler.context);
        return parentType.declareItem(transpiler, itemType, this.item);
    }

    transpile(transpiler) {
        this.parent.transpile(transpiler);
        const parentType = this.parent.check(transpiler.context);
        const itemType = this.item.check(transpiler.context);
        return parentType.transpileItem(transpiler, itemType, this.item);
    }
}