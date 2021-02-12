import BaseSwitchStatement from './BaseSwitchStatement.js'
import {StatementList} from "./index";

export default class SwitchStatement extends BaseSwitchStatement {
 
    constructor(expression, switchCases, defaultCase) {
        super(switchCases, defaultCase);
        this.expression = expression;
    }

    canReturn() {
        return true;
    }

    locateSectionAtLine(line) {
        if(line === this.start.line)
            return this;
        else {
            let section = this.switchCases.locateSectionAtLine(line, true);
            if(section !== null)
                return section;
            if(this.defaultCase instanceof StatementList)
                return this.defaultCase.locateSectionAtLine(line);
            else
                return null;
        }
    }

    checkSwitchType(context) {
        return this.expression.check(context);
    }

    interpret(context) {
        const switchValue = this.expression.interpret(context);
        return this.interpretSwitch(context, switchValue, null);
    }

    toODialect(writer) {
        writer.append("switch(");
        this.expression.toDialect(writer);
        writer.append(") {").newLine();
        this.switchCases.forEach(switchCase => {
            switchCase.caseToODialect(writer);
        });
        if(this.defaultCase!=null) {
            writer.append("default:").newLine().indent();
            this.defaultCase.toDialect(writer);
            writer.dedent();
        }
        writer.append("}").newLine();
    }

    toEDialect(writer) {
        writer.append("switch on ");
        this.expression.toDialect(writer);
        writer.append(":").newLine().indent();
        this.switchCases.forEach(switchCase => {
            switchCase.caseToEDialect(writer);
        });
        if(this.defaultCase!=null) {
            writer.append("otherwise:").newLine().indent();
            this.defaultCase.toDialect(writer);
            writer.dedent();
        }
        writer.dedent();
    }

    toMDialect(writer) {
        writer.append("switch on ");
        this.expression.toDialect(writer);
        writer.append(":").newLine().indent();
        this.switchCases.forEach(switchCase => {
            switchCase.caseToMDialect(writer);
        });
        if(this.defaultCase!=null) {
            writer.append("otherwise:").newLine().indent();
            this.defaultCase.toDialect(writer);
            writer.dedent();
        }
        writer.dedent();
    }

    declare(transpiler) {
        this.expression.declare(transpiler);
        this.declareSwitch(transpiler);
    }

    transpile(transpiler) {
        transpiler.append("switch (");
        this.expression.transpile(transpiler);
        transpiler.append(") {").newLine();
        this.switchCases.forEach(switchCase => {
            switchCase.transpile(transpiler);
        });
        if(this.defaultCase!=null) {
            transpiler.append("default:").indent();
            this.defaultCase.transpile(transpiler);
            transpiler.dedent();
        }
        transpiler.append("}").newLine();
        return true;
    }
}