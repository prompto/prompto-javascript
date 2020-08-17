
export default class WhileStatement extends BaseStatement {
   
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
        transpiler.append("while(");
        this.condition.transpile(transpiler);
        transpiler.append(") {");
        transpiler.indent();
        const child = transpiler.newChildTranspiler();
        this.statements.transpile(child);
        child.dedent().flush();
        transpiler.append("}").newLine();
        return true;
    }

    check(context) {
        const cond = this.condition.check(context);
        if(cond!=BooleanType.instance) {
            context.problemListener.reportError(this, "Expected a Boolean condition!");
        }
        const child = context.newChildContext();
        return this.statements.check(child, null);
    }

    interpret(context) {
        while(this.interpretCondition(context)) {
            const child = context.newChildContext();
            const value = this.statements.interpret(child);
            if(value==BreakResult.instance)
                break;
            if(value!=null)
                return value;
        }
        return null;
    }

    interpretCondition(context) {
        const value = this.condition.interpret(context);
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
        writer.append("while ");
        this.condition.toDialect(writer);
        writer.append(" :").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
    }

    toODialect(writer) {
        writer.append("while (");
        this.condition.toDialect(writer);
        writer.append(") {").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent().append("}").newLine();
    }

    canReturn() {
        return true;
    }

    locateSectionAtLine(line) {
        return this.statements.locateSectionAtLine(line) || this;
    }
}

