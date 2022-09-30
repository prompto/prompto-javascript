import SwitchCase from './SwitchCase'
import {IType, VoidType} from '../type'
import {IExpression} from "../expression";
import {StatementList} from "./index";
import {Context, Transpiler} from "../runtime";
import {IValue} from "../value";
import {CodeWriter} from "../utils";

export default class AtomicSwitchCase extends SwitchCase {

    constructor(expression: IExpression | null, statements: StatementList) {
        super(expression, statements);
    }

    checkSwitchType(context: Context, type: IType) {
        const thisType = this.expression ? this.expression.check(context) : VoidType.instance;
        if(!type.isAssignableFrom(context, thisType)) {
            context.problemListener.reportIncompatibleTypes(this, type, thisType);
        }
    }

    matches(context: Context, value: IValue) {
        const thisValue = this.expression!.interpret(context);
        return value.equals(thisValue);
    }

    casetoMDialect(writer: CodeWriter): void {
        this.caseToEDialect(writer);
    }

    caseToODialect(writer: CodeWriter): void {
        writer.append("case ");
        this.expression && this.expression.toDialect(writer);
        writer.append(":").newLine().indent();
        this.statements && this.statements.toDialect(writer);
        writer.dedent();
    }

    catchToODialect(writer: CodeWriter): void {
        writer.append("catch (");
        this.expression && this.expression.toDialect(writer);
        writer.append(") {").newLine().indent();
        this.statements && this.statements.toDialect(writer);
        writer.dedent().append("} ");
    }

    caseToEDialect(writer: CodeWriter): void {
        writer.append("when ");
        this.expression && this.expression.toDialect(writer);
        writer.append(":").newLine().indent();
        this.statements && this.statements.toDialect(writer);
        writer.dedent();
    }

    catchToPDialect(writer: CodeWriter) {
        writer.append("except ");
        this.expression && this.expression.toDialect(writer);
        writer.append(":").newLine().indent();
        this.statements && this.statements.toDialect(writer);
        writer.dedent();
    }

    catchToEDialect(writer: CodeWriter): void {
        this.caseToEDialect(writer); // no difference
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("case ");
        this.expression && this.expression.transpile(transpiler);
        transpiler.append(":").indent();
        this.statements && this.statements.transpile(transpiler);
        transpiler.append("break;").dedent();
    }

    transpileError(transpiler: Transpiler) {
        transpiler.append('case "');
        this.expression && this.expression.transpile(transpiler);
        transpiler.append('":');
        transpiler.indent();
        this.statements && this.statements.transpile(transpiler);
        transpiler.append("break;");
        transpiler.dedent();
    }
}

