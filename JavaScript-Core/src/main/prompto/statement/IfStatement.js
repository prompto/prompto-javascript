import BaseStatement from './BaseStatement.js'
import { IfElement, IfElementList } from './index.js'
import { VoidType, TypeMap } from '../type/index.js'
import { BooleanValue } from '../value/index.js'

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

    addAdditional(condition, statements) {
        this.elements.add(new IfElement(condition, statements));
    }

    setFinal(statements) {
        this.elements.add(new IfElement(null, statements));
    }

    check(context) {
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

    interpret(context) {
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

    declare(transpiler) {
        this.elements.forEach(element => {
            element.declare(transpiler);
        });
    }

    transpile(transpiler) {
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

    toDialect(writer) {
        writer.toDialect(this);
    }

    toMDialect(writer) {
        this.toEDialect(writer);
    }

    toODialect(writer) {
        let curly = false;
        for(let i=0;i<this.elements.length; i++) {
            if(i>0) {
                if (curly)
                    writer.append(" ");
                writer.append("else ");
            }
            this.elements[i].toODialect(writer);
            curly = this.elements[i].statements.length>1;
        }
        if(curly)
            writer.newLine();
    }

    toEDialect(writer) {
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


