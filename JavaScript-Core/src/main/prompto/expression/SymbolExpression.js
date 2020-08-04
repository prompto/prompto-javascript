var Expression = require("./Expression").Expression;
var SyntaxError = require("../error/SyntaxError").SyntaxError;

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
        var symbol = context.getRegisteredValue(this.name);
        if(symbol==null) {
            throw new SyntaxError("Unknown symbol:" + this.name);
        }
        return symbol.check(context);
    }

    interpret(context) {
        var symbol = context.getRegisteredValue(this.name);
        if(symbol==null) {
            throw new SyntaxError("Unknown symbol:" + this.name);
        }
        return symbol.interpret(context);
    }

    declare(transpiler) {
        var symbol = transpiler.context.getRegisteredValue(this.name);
        symbol.declare(transpiler);
    }

    transpile(transpiler) {
        var symbol = transpiler.context.getRegisteredValue(this.name);
        symbol.transpile(transpiler);
    }
}


exports.SymbolExpression = SymbolExpression;