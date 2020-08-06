const SwitchCase = require("./SwitchCase").SwitchCase;
const VoidType = require("../type/VoidType").VoidType;

class AtomicSwitchCase extends SwitchCase {
    constructor(expression, statements) {
        super(expression, statements);
        return this;
    }

    checkSwitchType(context, type) {
        const thisType = this.expression ? this.expression.check(context) : VoidType.instnce;
        if(!type.isAssignableFrom(context, thisType)) {
            context.problemListener.reportIncompatibleTypes(this, type, thisType);
        }
    }

    matches(context, value) {
        const thisValue = this.expression.interpret(context);
        return value.equals(thisValue);
    }

    caseToMDialect(writer) {
        this.caseToEDialect(writer);
    }

    caseToODialect(writer) {
        writer.append("case ");
        this.expression && this.expression.toDialect(writer);
        writer.append(":").newLine().indent();
        this.statements && this.statements.toDialect(writer);
        writer.dedent();
    }

    catchToODialect(writer) {
        writer.append("catch (");
        this.expression && this.expression.toDialect(writer);
        writer.append(") {").newLine().indent();
        this.statements && this.statements.toDialect(writer);
        writer.dedent().append("} ");
    }

    caseToEDialect(writer) {
        writer.append("when ");
        this.expression && this.expression.toDialect(writer);
        writer.append(":").newLine().indent();
        this.statements && this.statements.toDialect(writer);
        writer.dedent();
    }

    catchToPDialect(writer) {
        writer.append("except ");
        this.expression.toDialect(writer);
        writer.append(":").newLine().indent();
        this.statements && this.statements.toDialect(writer);
        writer.dedent();
    }

    catchToEDialect(writer) {
        this.caseToEDialect(writer); // no difference
    }

    transpile(transpiler) {
        transpiler.append("case ");
        this.expression && this.expression.transpile(transpiler);
        transpiler.append(":").indent();
        this.statements && this.statements.transpile(transpiler);
        transpiler.append("break;").dedent();
    }

    transpileError(transpiler) {
        transpiler.append('case "');
        this.expression && this.expression.transpile(transpiler);
        transpiler.append('":');
        transpiler.indent();
        this.statements && this.statements.transpile(transpiler);
        transpiler.append("break;");
        transpiler.dedent();
    }
}

exports.AtomicSwitchCase = AtomicSwitchCase;
