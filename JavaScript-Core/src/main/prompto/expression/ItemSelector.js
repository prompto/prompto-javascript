var SelectorExpression = require("./SelectorExpression").SelectorExpression;
var Value = require("../value/Value").Value;
var NullValue = require("../value/NullValue").NullValue;
var NullReferenceError = require("../error/NullReferenceError").NullReferenceError;

class ItemSelector extends SelectorExpression {
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
        var parentType = this.parent.check(context);
        var itemType = this.item.check(context);
        return parentType.checkItem(context, itemType, this);
    }

    interpret(context) {
        var o = this.parent.interpret(context);
        if (o == null || o == NullValue.instance) {
            throw new NullReferenceError();
        }
        var i = this.item.interpret(context);
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
        var parentType = this.parent.check(transpiler.context);
        var itemType = this.item.check(transpiler.context);
        return parentType.declareItem(transpiler, itemType, this.item);
    }

    transpile(transpiler) {
        this.parent.transpile(transpiler);
        var parentType = this.parent.check(transpiler.context);
        var itemType = this.item.check(transpiler.context);
        return parentType.transpileItem(transpiler, itemType, this.item);
    }
}

exports.ItemSelector = ItemSelector;