import BaseSwitchStatement from './BaseSwitchStatement'
import {StatementList, SwitchCaseList} from "../statement";
import {IExpression} from "../expression";
import {Context, Transpiler} from "../runtime";
import {Section} from "../parser";
import {IValue} from "../value";
import {CodeWriter} from "../utils";

export default class SwitchStatement extends BaseSwitchStatement {

    expression: IExpression;

    constructor(expression: IExpression, switchCases: SwitchCaseList, defaultCase: StatementList | null) {
        super(switchCases, defaultCase);
        this.expression = expression;
    }

    canReturn() {
        return true;
    }

    locateSectionAtLine(line: number): Section | null {
        if(line === this.startLocation.line)
            return this;
        else {
            const section = this.switchCases.locateSectionAtLine(line, true);
            if(section)
                return section;
            if(this.defaultCase)
                return this.defaultCase.locateSectionAtLine(line);
            else
                return null;
        }
    }

    checkSwitchType(context: Context) {
        return this.expression.check(context);
    }

    interpret(context: Context): IValue | null {
        const switchValue = this.expression.interpret(context);
        return this.interpretSwitch(context, switchValue, null);
    }

    toODialect(writer: CodeWriter): void {
        writer.append("switch(");
        this.expression.toDialect(writer);
        writer.append(") {").newLine();
        this.switchCases.forEach(switchCase => switchCase.caseToODialect(writer), this);
        if(this.defaultCase!=null) {
            writer.append("default:").newLine().indent();
            this.defaultCase.toDialect(writer);
            writer.dedent();
        }
        writer.append("}").newLine();
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("switch on ");
        this.expression.toDialect(writer);
        writer.append(":").newLine().indent();
        this.switchCases.forEach(switchCase => switchCase.caseToEDialect(writer), this);
        if(this.defaultCase!=null) {
            writer.append("otherwise:").newLine().indent();
            this.defaultCase.toDialect(writer);
            writer.dedent();
        }
        writer.dedent();
    }

    toMDialect(writer: CodeWriter): void {
        writer.append("switch on ");
        this.expression.toDialect(writer);
        writer.append(":").newLine().indent();
        this.switchCases.forEach(switchCase => switchCase.caseToMDialect(writer), this);
        if(this.defaultCase!=null) {
            writer.append("otherwise:").newLine().indent();
            this.defaultCase.toDialect(writer);
            writer.dedent();
        }
        writer.dedent();
    }

    declare(transpiler: Transpiler): void {
        this.expression.declare(transpiler);
        this.declareSwitch(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("switch (");
        this.expression.transpile(transpiler);
        transpiler.append(") {").newLine();
        this.switchCases.forEach(switchCase => switchCase.transpile(transpiler), this);
        if(this.defaultCase) {
            transpiler.append("default:").indent();
            this.defaultCase.transpile(transpiler);
            transpiler.dedent();
        }
        transpiler.append("}").newLine();
    }
}
