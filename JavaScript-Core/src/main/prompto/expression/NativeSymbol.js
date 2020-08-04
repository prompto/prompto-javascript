var Symbol = require("./Symbol").Symbol;
var Dialect = require("../parser/Dialect").Dialect;
var TextValue = require("../value/TextValue").TextValue;

class NativeSymbol extends Symbol {
    constructor(id, expression) {
        super(id);
        this.expression = expression;
        this.type = null;
        return this;
    }

    toString() {
        return this.name;
    }

    toDialect(writer) {
        writer.append(this.name);
        switch(writer.dialect) {
            case Dialect.E:
                writer.append(" with ");
                this.expression.toDialect(writer);
                writer.append(" as value");
                break;
            case Dialect.O:
                writer.append(" = ");
                this.expression.toDialect(writer);
                break;
            case Dialect.M:
                writer.append(" = ");
                this.expression.toDialect(writer);
                break;
        }
    }

    check(context) {
        var actual = this.expression.check(context);
        if(!this.type.derivedFrom.isAssignableFrom(context, actual)) {
            throw new SyntaxError("Cannot assign " + actual.name + " to " + this.type.derivedFrom.name);
        }
        return this.type;
    }

    interpret(context) {
        return this;
    }

    declare(transpiler) {
        this.type.declare(transpiler);
    }

    transpile(transpiler) {
        transpiler.append(this.name);
    }

    initialize(transpiler) {
        transpiler.append("var ").append(this.name).append(" = new ").append(this.type.name).append("('").append(this.name).append("', ");
        this.expression.transpile(transpiler);
        transpiler.append(");");
        transpiler.newLine();
    }

    getMemberValue(context, name, autoCreate) {
        if("name" === name)
            return new TextValue(this.name);
        else if("value" === name)
            return this.expression.interpret(context);
        else
            return Symbol.prototype.getMemberValue.call(context, name, autoCreate);
    }
}


exports.NativeSymbol = NativeSymbol;