import Section from '../parser/Section'
import { StatementList } from "../statement";
import {IExpression} from "../expression";
import {Context, Transpiler} from "../runtime";
import {IValue} from "../value";
import {IType} from "../type";
import {CodeWriter, IWritable} from "../utils";

export default abstract class SwitchCase extends Section {

    expression: IExpression | null;
    statements: StatementList;

    constructor(expression: IExpression | null, statements: StatementList) {
        super();
        this.expression = expression;
        this.statements = statements;
    }

    locateSectionAtLine(line: number, checkExpression?: boolean): Section | null {
        if(checkExpression && this.expression instanceof Section) {
            const section = this.expression.locateSectionAtLine(line);
            if(section != null)
                return section;
        }
        if(this.statements instanceof StatementList)
            return this.statements.locateSectionAtLine(line)
        else
            return null;
    }

    abstract checkSwitchType(context: Context, type: IType): void;

    checkReturnType(context: Context) {
        if(this.statements)
            return this.statements.check(context, null);
        else
            context.problemListener.reportSwitchMissingStatement(this);
    }

    interpret(context: Context): IValue | null {
        return this.statements.interpret(context);
    }

    declare(transpiler: Transpiler): void {
        if(this.expression)
            this.expression.declare(transpiler);
        if(this.statements)
            this.statements.declare(transpiler);
    }

    abstract transpile(transpiler: Transpiler): void;
    abstract transpileError(child: Transpiler): void;

    abstract matches(context: Context, switchValue: IValue): boolean;

    abstract caseToEDialect(writer: CodeWriter): void;
    abstract caseToMDialect(writer: CodeWriter): void;
    abstract caseToODialect(writer: CodeWriter): void;
    abstract catchToEDialect(writer: CodeWriter): void;
    abstract catchToMDialect(writer: CodeWriter): void;
    abstract catchToODialect(writer: CodeWriter): void;

}
