var Expression = require("./Expression").Expression;
var TypeType = require("../type/TypeType").TypeType;
var TypeValue = require("../value/TypeValue").TypeValue;

class TypeExpression extends Expression {
    constructor(value) {
        super();
        this.value = value;
        return this;
    }

    toDialect(writer) {
        writer.append(this.value.toString());
    }

    toString() {
        return this.value.toString();
    }

    check(context) {
        return new TypeType(this.value);
    }

    interpret(context) {
        return new TypeValue(this.value);
    }

    declare(transpiler) {
        this.value.declare(transpiler);
    }

    transpile(transpiler) {
        this.value.transpile(transpiler);
    }

    getMemberValue(context, name) {
        return this.value.getStaticMemberValue(context, name);
    }
}

exports.TypeExpression = TypeExpression;