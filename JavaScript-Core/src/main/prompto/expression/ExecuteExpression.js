var Expression = require("./Expression").Expression;
var CodeValue = require("../value/CodeValue").CodeValue;
var PromptoError = require("../error/PromptoError").PromptoError;

class ExecuteExpression extends Expression {
    constructor(id) {
        super();
        this.id = id;
        return this;
    }

    get name() {
        return this.id.name;
    }

    toString() {
        return "execute: " + this.name;
    }

    toDialect(writer) {
        writer.toDialect(this);
    }

    toEDialect(writer) {
        writer.append("execute: ");
        writer.append(this.name);
    }

    toODialect(writer) {
        writer.append("execute(");
        writer.append(this.name);
        writer.append(")");
    }

    toMDialect(writer) {
        this.toODialect(writer);
    }

    check(context) {
        try {
            var value = context.getValue(this.id);
            if(value instanceof CodeValue) {
                return value.checkCode(context);
            } else {
                throw new SyntaxError("Expected code, got:" + value.toString());
            }
        } catch(e) {
            if(e instanceof PromptoError) {
                throw new SyntaxError(e.message);
            }
        }
    }

    interpret(context) {
        var value = context.getValue(this.id);
        if(value instanceof CodeValue) {
            return value.interpret(context);
        } else {
            throw new SyntaxError("Expected code, got:" + value.toString());
        }
    }

    declare(transpiler) {
        var value = transpiler.context.getValue(this.id);
        value.declareCode(transpiler);
    }

    transpile(transpiler) {
        transpiler.append("(");
        var value = transpiler.context.getValue(this.id);
        value.transpileCode(transpiler);
        transpiler.append(")");
    }
}


exports.ExecuteExpression = ExecuteExpression;
