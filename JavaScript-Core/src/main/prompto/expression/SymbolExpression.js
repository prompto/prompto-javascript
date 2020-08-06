const Expression = require("./Expression").Expression;
const SyntaxError = require("../error/SyntaxError").SyntaxError;

class SymbolExpression extends Expression {
    constructor(id) {
        super();
        this.id = id;
        return this;
    }

    get name() {
        return this.id.name;
    }

    toDialect(writer) {
        writer.append(this.name);
    }

    check(context) {
        const symbol = context.getRegisteredValue(this.name);
        if(symbol==null) {
            throw new SyntaxError("Unknown symbol:" + this.name);
        }
        return symbol.check(context);
    }

    interpret(context) {
        const symbol = context.getRegisteredValue(this.name);
        if(symbol==null) {
            throw new SyntaxError("Unknown symbol:" + this.name);
        }
        return symbol.interpret(context);
    }

    declare(transpiler) {
        const symbol = transpiler.context.getRegisteredValue(this.name);
        symbol.declare(transpiler);
    }

    transpile(transpiler) {
        const symbol = transpiler.context.getRegisteredValue(this.name);
        symbol.transpile(transpiler);
    }
}


exports.SymbolExpression = SymbolExpression;