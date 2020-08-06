const Value = require("./Value").Value;

class ContextualExpression extends Value {
 
    constructor(calling, expression) {
        super(null); // TODO check that this is not a problem
        this.calling = calling;
        this.expression = expression;
    }

    toDialect(dialect) {
        return this.expression.toDialect(dialect);
    }

    check(context) {
        return this.expression.check(this.calling);
    }

    checkReference(context) {
        return this.expression.checkReference(this.calling);
    }

    interpret(context) {
        return this.expression.interpret(this.calling);
    }

    interpretReference(context) {
        return this.expression.interpretReference(this.calling);
    }

    transpile(transpiler) {
        transpiler = transpiler.newChildTranspiler(this.calling);
        this.expression.transpile(transpiler);
        transpiler.flush();
    }

    transpileReference(transpiler) {
        transpiler = transpiler.newChildTranspiler(this.calling);
        this.expression.transpileReference(transpiler);
        transpiler.flush();
    }

    transpileParent(transpiler) {
        this.transpile(transpiler);
    }
}


exports.ContextualExpression = ContextualExpression;