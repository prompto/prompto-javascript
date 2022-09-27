import BaseStatement from '../../../main/prompto/statement/BaseStatement.ts'
import { IfElement, IfElementList } from '../statement'
import { VoidType, TypeMap } from '../type'
import { BooleanValue } from '../value'

export default class IfStatement extends BaseStatement {
  
    constructor(condition, statements, elseIfs, elseStmts) {
        super();
        this.elements = new IfElementList();
        this.elements.add(new IfElement(condition, statements));
        elseIfs = elseIfs || null;
        if(elseIfs!=null) {
            this.elements.addAll(elseIfs);
        }
        elseStmts = elseStmts || null;
        if(elseStmts!=null) {
            this.elements.add(new IfElement(null, elseStmts));
        }
    }

    locateSectionAtLine(line) {
        for(let i=0;i<this.elements.length;i++) {
            const stmt = this.elements[i].locateSectionAtLine(line);
            if(stmt !== null)
                return stmt;
        }
        return null;
    }

    addAdditional(condition, statements) {
        this.elements.add(new IfElement(condition, statements));
    }

    setFinal(statements) {
        this.elements.add(new IfElement(null, statements));
    }

    check(context: Context): IType {
        const types = new TypeMap();
        let section = null;
        this.elements.forEach(element => {
            const type = element.check(context);
            if(type!==VoidType.instance) {
                section = element;
                types.add(type);
            }
        });
        return types.inferType(context, section);
    }

    interpret(context: Context): IValue {
        for(let i=0;i<this.elements.length;i++) {
            const element = this.elements[i];
            const condition = element.condition || null;
            const test = condition==null ? BooleanValue.TRUE : condition.interpret(context);
            if(test instanceof BooleanValue && BooleanValue.TRUE.equals(test)) {
                return element.interpret(context);
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
        return true;
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


