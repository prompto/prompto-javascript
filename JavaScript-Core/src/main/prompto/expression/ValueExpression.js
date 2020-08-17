
export default class ValueExpression extends Value {

    constructor(type, value) {
        super(type);
        this.value = value;
        // make this sliceable
        this.sliceable = value.slice ? value : null;
    }

    check(context) {
        return this.type;
    }

    interpret(context) {
        if(this.value.interpret) {
            return this.value.interpret(context);
        } else {
            return this.value;
        }
    }

    declare(transpiler) {
        if(this.value.declare) {
            return this.value.declare(transpiler);
        }
    }

    transpile(transpiler) {
        if (this.value.transpile) {
            return this.value.transpile(transpiler);
        }
    }

    toString() {
        return this.value.toString();
    }

    toDialect(dialect) {
        return this.value.toDialect(dialect);
    }
}