import Section from "../parser/Section"

export default class SwitchCase extends Section {

    constructor(expression, statements) {
        super();
        this.expression = expression;
        this.statements = statements;
    }

    checkReturnType(context) {
        if(this.statements)
            return this.statements.check(context, null);
        else
            context.problemListener.reportSwitchMissingStatement(this);
    }

    interpret(context) {
        return this.statements.interpret(context);
    }

    declare(transpiler) {
        if(this.expression)
            this.expression.declare(transpiler);
        if(this.statements)
            this.statements.declare(transpiler);
    }

    locateSectionAtLine(line) {
        return this.statements ? this.statements.locateSectionAtLine(line) : null;
    }
}
