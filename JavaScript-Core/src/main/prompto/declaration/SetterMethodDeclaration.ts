import ConcreteMethodDeclaration from './ConcreteMethodDeclaration'
import { AttributeParameter } from '../param'
import {Identifier} from "../grammar";
import {StatementList} from "../statement";
import {CodeWriter} from "../utils";
import {Transpiler} from "../runtime";

export default class SetterMethodDeclaration extends ConcreteMethodDeclaration {

    constructor(id: Identifier, statements: StatementList) {
        super(id, null, null, statements);
    }

    toODialect(writer: CodeWriter): void {
        writer.append("setter ").append(this.name).append(" {").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent().append("}").newLine();
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("define ").append(this.name).append(" as setter doing:").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
    }

    toMDialect(writer: CodeWriter): void {
        writer.append("def ").append(this.name).append(" setter():").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
    }

    transpile(transpiler: Transpiler): void {
        const arg = new AttributeParameter(this.id);
        arg.register(transpiler.context);
        this.statements.transpile(transpiler);
    }
}
