import Section from '../parser/Section.ts'
import { StatementList } from "../statement";

export default class SwitchCase extends Section {

    constructor(expression, statements) {
        super();
        this.expression = expression;
        this.statements = statements;
    }

    locateSectionAtLine(line, checkExpression) {
        if(checkExpression && this.expression instanceof Section) {
            const section = this.expression.locateSectionAtLine(line);
            if(section !== null)
                return section;
        }
        if(this.statements instanceof StatementList)
            return this.statements.locateSectionAtLine(line)
        else
            return null;
    }

    checkReturnType(context) {
        if(this.statements)
            return this.statements.check(context, null);
        else
            context.problemListener.reportSwitchMissingStatement(this);
    }

    interpret(context: Context): Value {
        return this.statements.interpret(context);
    }

    declare(transpiler: Transpiler): void {
        if(this.expression)
            this.expression.declare(transpiler);
        if(this.statements)
            this.statements.declare(transpiler);
    }

}
