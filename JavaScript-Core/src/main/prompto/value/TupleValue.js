var InternalError = require("../error/InternalError").InternalError;
var BaseValueList = require("./BaseValueList").BaseValueList;
var BooleanValue = require("./BooleanValue").BooleanValue;
var TupleType = null;
var SetValue = null;

exports.resolve = () => {
    TupleType = require("../type/TupleType").TupleType;
    SetValue = require("./SetValue").SetValue;
};

class TupleValue extends BaseValueList {
    constructor(items, item, mutable) {
        super(TupleType.instance, items, item, mutable);
        return this;
    }

    toString() {
        return "(" + this.items.join(", ") + ")";
    }

    toDialect(writer) {
        writer.append('(');
        super.toDialect(writer);
        writer.append(')');
    }

    /*

    @Override
    protected TupleValue newInstance(List<Object> items) {
        return new TupleValue(items);
    }

    */

    Add(context, value) {
        if (value instanceof BaseValueList) {
            var items = this.items.concat(value.items);
            return new TupleValue(items);
        } else if(value instanceof SetValue) {
            items = Array.from(value.items.set.values());
            items = this.items.concat(items);
            return new TupleValue(items);
        } else {
            throw new SyntaxError("Illegal: Tuple + " + typeof(value));
        }
    }

    filter(context, itemId, filter) {
        var result = new TupleValue();
        var iter = this.getIterator(context);
        while(iter.hasNext()) {
            var o = iter.next();
            context.setValue(itemId, o);
            var test = filter.interpret(context);
            if(!(test instanceof BooleanValue)) {
                throw new InternalError("Illegal test result: " + test);
            }
            if(test.value) {
                result.add(o);
            }
        }
        return result;
    }
}

exports.TupleValue = TupleValue;