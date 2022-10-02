import BaseStatement from './BaseStatement'
import {IfElement, IfElementList, StatementList} from '../statement'
import {VoidType, TypeMap, IType} from '../type'
import {BooleanValue, IValue} from '../value'
import {IExpression} from "../expression";
import {Context, Transpiler} from "../runtime";
import {Section} from "../parser";
import {CodeWriter} from "../utils";

export default class IfStatement extends BaseStatement {

    condition: IExpression;
    statements: StatementList;
    elements = new IfElementList();

    constructor(condition: IExpression, statements: StatementList, elseIfs: IfElementList | null, elseStmts: StatementList | null) {
        super();
        this.elements.add(new IfElement(condition, statements));
        if(elseIfs)
            this.elements.addAll(elseIfs);
        if(elseStmts)
            this.elements.add(new IfElement(null, elseStmts));
    }

    locateSectionAtLine(line: number): Section | null {
        for(let i=0;i<this.elements.length;i++) {
            const section = this.elements[i].locateSectionAtLine(line);
            if(section)
                return section;
        }
        return null;
    }

    addAdditional(condition: IExpression, statements: StatementList) {
        this.elements.add(new IfElement(condition, statements));
    }

    setFinal(statements: StatementList) {
        this.elements.add(new IfElement(null, statements));
    }

    check(context: Context): IType {
        const types = new TypeMap();
        let section = this as Section;
        this.elements.forEach(element => {
            const type = element.check(context);
            if(type!=VoidType.instance) {
                section = element;
                types.add(type);
            }
        });
        return types.inferType(context, section);
    }

    interpretStatement(context: Context): IValue | null {
        for(let i=0;i<this.elements.length;i++) {
            const element = this.elements[i];
            const condition = element.condition;
            const test = condition==null ? BooleanValue.TRUE : condition.interpretExpression(context);
            if(test instanceof BooleanValue && BooleanValue.TRUE.equals(test)) {
                return element.interpretStatement(context);
            }
        }
        return null;
    }

    declare(transpiler: Transpiler): void {
        this.elements.forEach(element => {
            element.declare(transpiler);
        });
    }

    transpile(transpiler: Transpiler): void {
        for(let i=0;i<this.elements.length;i++) {
            const element = this.elements[i];
            if (i > 0)
                transpiler.append(" else ");
            if (element.condition) {
                transpiler.append("if (");
                element.condition.transpile(transpiler);
                transpiler.append(") ");
            }
            transpiler.append("{");
            transpiler.indent();
            element.transpile(transpiler);
            transpiler.dedent();
            transpiler.append("}");
        }
        transpiler.newLine();
    }

    toDialect(writer: CodeWriter): void {
        writer.toDialect(this);
    }

    toMDialect(writer: CodeWriter): void {
        this.toEDialect(writer);
    }

    toODialect(writer: CodeWriter): void {
        let curly = false;
        for(let i=0;i<this.elements.length; i++) {
            if(i>0) {
                if (curly)
                    writer.append(" ");
                writer.append("else ");
            }
            curly = this.elements[i].toODialect(writer);
        }
        if(curly)
            writer.newLine();
    }

    toEDialect(writer: CodeWriter): void {
        for(let i=0;i<this.elements.length; i++) {
            if(i>0)
                writer.append("else ");
            this.elements[i].toEDialect(writer);
        }
    }

    canReturn() {
        return true;
    }
}


