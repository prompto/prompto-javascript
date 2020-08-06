var ObjectList = require("./ObjectList").ObjectList;

class ExpressionList extends ObjectList {
    constructor(items, item) {
        super(items, item);
        return this;
    }

    toDialect(writer) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].toDialect(writer);
                writer.append(", ");
            }
            writer.trimLast(2);
        }
    }

    declare(transpiler) {
        this.forEach(item => {
            item.declare(transpiler);
        });
    }

    transpile(transpiler) {
        if (this.length > 0) {
            for (var i = 0; i < this.length; i++) {
                this[i].transpile(transpiler);
                transpiler.append(", ");
            }
            transpiler.trimLast(2);
        }
    }
}

exports.ExpressionList = ExpressionList;