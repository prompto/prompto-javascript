import SwitchCase from './SwitchCase.js'
import { VoidType } from '../type'

export default class AtomicSwitchCase extends SwitchCase {

    constructor(expression, statements) {
        super(expression, statements);
    }

    checkSwitchType(context, type) {
        const thisType = this.expression ? this.expression.check(context) : VoidType.instance;
        if(!type.isAssignableFrom(context, thisType)) {
            context.problemListener.reportIncompatibleTypes(this, type, thisType);
        }
    }

    matches(context, value) {
        const thisValue = this.expression.interpret(context);
        return value.equals(thisValue);
    }

    casetoMDialect(writer: CodeWriter): void {
        this.caseToEDialect(writer);
    }

    casetoODialect(writer: CodeWriter): void {
        writer.append("case ");
        this.expression && this.expression.toDialect(writer);
        writer.append(":").newLine().indent();
        this.statements && this.statements.toDialect(writer);
        writer.dedent();
    }

    catchtoODialect(writer: CodeWriter): void {
        writer.append("catch (");
        this.expression && this.expression.toDialect(writer);
        writer.append(") {").newLine().indent();
        this.statements && this.statements.toDialect(writer);
        writer.dedent().append("} ");
    }

    casetoEDialect(writer: CodeWriter): void {
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

    catchtoEDialect(writer: CodeWriter): void {
        this.caseToEDialect(writer); // no difference
    }

    transpile(transpiler: Transpiler): void {
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

