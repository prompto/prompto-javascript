import SwitchCase from './SwitchCase.js'
import { VoidType, ContainerType } from '../type'

export default class CollectionSwitchCase extends SwitchCase {

    constructor(expression, statements) {
        super(expression, statements);
    }

    checkSwitchType(context, type) {
        let thisType = this.expression ? this.expression.check(context) : VoidType.instance;
        if(thisType instanceof ContainerType) {
            thisType = thisType.itemType;
        }
        if(!type.isAssignableFrom(context, thisType)) {
            context.problemListener.reportIncompatibleTypes(this, type, thisType);
        }
    }

    matches(context, value) {
        const thisValue = this.expression.interpret(context);
        if(thisValue.hasValue) {
            return thisValue.hasValue(context, value);
        } else {
            return false;
        }
    }

    casetoMDialect(writer: CodeWriter): void {
        this.caseToEDialect(writer);
    }

    casetoODialect(writer: CodeWriter): void {
        writer.append("case in ");
        this.expression && this.expression.toDialect(writer);
        writer.append(":").newLine().indent();
        this.statements && this.statements.toDialect(writer);
        writer.dedent();
    }

    casetoEDialect(writer: CodeWriter): void {
        writer.append("when in ");
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

    catchtoMDialect(writer: CodeWriter): void {
        writer.append("except in ");
        this.expression && this.expression.toDialect(writer);
        writer.append(":").newLine().indent();
        this.statements && this.statements.toDialect(writer);
        writer.dedent();
    }

    catchtoEDialect(writer: CodeWriter): void {
        this.caseToEDialect(writer); // no difference
    }

    transpile(transpiler: Transpiler): void {
        this.expression && this.expression.expressions.forEach(expression => {
            transpiler.append("case ");
            expression.transpile(transpiler);
            transpiler.append(":").newLine();
        }, this);
        transpiler.indent(true);
        this.statements && this.statements.transpile(transpiler);
        transpiler.append("break;").dedent();
    }
}

