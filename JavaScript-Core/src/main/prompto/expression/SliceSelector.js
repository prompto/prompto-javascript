var SelectorExpression = require("./SelectorExpression").SelectorExpression;
var NullReferenceError = require("../error/NullReferenceError").NullReferenceError;
var IntegerType = require("../type/IntegerType").IntegerType;
var IntegerValue = require("../value/IntegerValue").IntegerValue;

class SliceSelector extends SelectorExpression {
    constructor(parent, first, last) {
        super(parent);
        this.first = first || null;
        this.last = last || null;
        return this;
    }

    toString() {
        return this.parent.toString() + "[" +
                (this.first==null?"":this.first.toString()) + ":" +
                (this.last==null?"":this.last.toString()) + "]";
    }

    toDialect(writer) {
        this.parent.toDialect(writer);
        writer.append('[');
        if (this.first != null)
            this.first.toDialect(writer);
        writer.append(':');
        if (this.last != null)
            this.last.toDialect(writer);
        writer.append(']');
    }

    check(context) {
        var firstType = this.first!=null ? this.first.check(context) : null;
        var lastType = this.last!=null ? this.last.check(context) : null;
        if(firstType!=null && !(firstType instanceof IntegerType)) {
            throw new SyntaxError(firstType.toString() + " is not an integer");
        }
        if(lastType!=null && !(lastType instanceof IntegerType)) {
            throw new SyntaxError(lastType.toString() + " is not an integer");
        }
        var parentType = this.parent.check(context);
        return parentType.checkSlice(context);
    }

    interpret(context) {
        var o = this.parent.interpret(context);
        if (o == null) {
            throw new NullReferenceError();
        }
        if (o.sliceable)
            o = o.sliceable;
        if (o.slice) {
            var fi = this.first != null ? this.first.interpret(context) : null;
            if (fi != null && !(fi instanceof IntegerValue)) {
                throw new SyntaxError("Illegal slice value type: " + fi);
            }
            var li = this.last != null ? this.last.interpret(context) : null;
            if (li != null && !(li instanceof IntegerValue)) {
                throw new SyntaxError("Illegal slice value type: " + li);
            }
            return o.slice(fi, li);
        } else {
            throw new SyntaxError("Illegal sliced object: " + this.parent);
        }
    }

    declare(transpiler) {
        this.parent.declare(transpiler);
        var parentType = this.parent.check(transpiler.context);
        return parentType.declareSlice(transpiler, this.first, this.last);

    }

    transpile(transpiler) {
        this.parent.transpile(transpiler);
        var parentType = this.parent.check(transpiler.context);
        return parentType.transpileSlice(transpiler, this.first, this.last);

    }
}


exports.SliceSelector = SliceSelector;
