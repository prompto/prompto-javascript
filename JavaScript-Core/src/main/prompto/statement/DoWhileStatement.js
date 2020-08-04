var BaseStatement = require("./BaseStatement").BaseStatement;
var InvalidDataError = require("../error/InvalidDataError").InvalidDataError;
var BooleanType = require("../type/BooleanType").BooleanType;
var BooleanValue = require("../value/BooleanValue").BooleanValue;
var BreakResult = require("../runtime/BreakResult").BreakResult;

class DoWhileStatement extends BaseStatement {
   
    constructor(condition, statements) {
        super();
        this.condition = condition;
        this.statements = statements;
    }

    declare(transpiler) {
        this.condition.declare(transpiler);
        transpiler = transpiler.newChildTranspiler();
        this.statements.declare(transpiler);
    }

    transpile(transpiler) {
        transpiler.append("do {").indent();
        var child = transpiler.newChildTranspiler();
        this.statements.transpile(child);
        child.dedent().flush();
        transpiler.append("} while(");
        this.condition.transpile(transpiler);
        transpiler.append(")");
    }

    check(context) {
        var cond = this.condition.check(context);
        if (cond != BooleanType.instance) {
            context.problemListener.reportError(this, "Expected a Boolean condition!");
        }
        var child = context.newChildContext();
        return this.statements.check(child, null);
    }

    interpret(context) {
        do {
            var child = context.newChildContext();
            var value = this.statements.interpret(child);
            if(value==BreakResult.instance)
                break;
            if(value!=null)
                return value;
        } while(this.interpretCondition(context));
        return null;
    }

    interpretCondition(context) {
        var value = this.condition.interpret(context);
        if(!(value instanceof BooleanValue)) {
            throw new InvalidDataError("Expected a Boolean, got:" + typeof(value));
        }
        return value.value;
    }

    toDialect(writer) {
        writer.toDialect(this);
    }

    toMDialect(writer) {
        this.toEDialect(writer);
    }

    toEDialect(writer) {
        writer.append("do:").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent().append("while ");
        this.condition.toDialect(writer);
        writer.newLine();
    }

    toODialect(writer) {
        writer.append("do {").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent().append("} while (");
        this.condition.toDialect(writer);
        writer.append(");").newLine();
    }

    canReturn() {
        return true;
    }

    locateSectionAtLine(line) {
        return this.statements.locateSectionAtLine(line) || this;
    }
}


exports.DoWhileStatement = DoWhileStatement;

