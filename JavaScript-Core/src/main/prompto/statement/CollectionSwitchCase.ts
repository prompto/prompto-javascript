import SwitchCase from './SwitchCase'
import {VoidType, ContainerType, IType} from '../type'
import {IExpression} from "../expression";
import {StatementList} from "./index";
import {Context, Transpiler} from "../runtime";
import {CodeWriter} from "../utils";
import {Container, IValue} from "../value";
import ContainerLiteral from "../literal/ContainerLiteral";

export default class CollectionSwitchCase extends SwitchCase {

    constructor(expression: IExpression, statements: StatementList) {
        super(expression, statements);
    }

    checkSwitchType(context: Context, type: IType) {
        let thisType = this.expression ? this.expression.check(context) : VoidType.instance;
        if(thisType instanceof ContainerType) {
            thisType = thisType.itemType;
        }
        if(!type.isAssignableFrom(context, thisType)) {
            context.problemListener.reportIncompatibleTypes(this, type, thisType);
        }
    }

    matches(context: Context, value: IValue) {
        const thisValue = this.expression!.interpret(context);
        if(thisValue instanceof Container) {
            return thisValue.hasValue(context, value);
        } else {
            return false;
        }
    }

    caseToMDialect(writer: CodeWriter): void {
        this.caseToEDialect(writer);
    }

    caseToODialect(writer: CodeWriter): void {
        writer.append("case in ");
        this.expression && this.expression.toDialect(writer);
        writer.append(":").newLine().indent();
        this.statements && this.statements.toDialect(writer);
        writer.dedent();
    }

    caseToEDialect(writer: CodeWriter): void {
        writer.append("when in ");
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

    catchToMDialect(writer: CodeWriter): void {
        writer.append("except in ");
        this.expression && this.expression.toDialect(writer);
        writer.append(":").newLine().indent();
        this.statements && this.statements.toDialect(writer);
        writer.dedent();
    }

    catchToEDialect(writer: CodeWriter): void {
        this.caseToEDialect(writer); // no difference
    }

    transpile(transpiler: Transpiler): void {
        if(this.expression instanceof ContainerLiteral) {
            const expressions = this.expression.expressions;
            expressions.forEach(expression => {
                transpiler.append("case ");
                expression.transpile(transpiler);
                transpiler.append(":").newLine();
            }, this);
        }
        transpiler.indent(true);
        this.statements && this.statements.transpile(transpiler);
        transpiler.append("break;").dedent();
    }
}

