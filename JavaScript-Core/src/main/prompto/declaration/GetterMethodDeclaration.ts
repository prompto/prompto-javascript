import ConcreteMethodDeclaration from './ConcreteMethodDeclaration'
import {Identifier} from "../grammar";
import {StatementList} from "../statement";
import {CodeWriter} from "../utils";
import {Transpiler} from "../runtime";

export default class GetterMethodDeclaration extends ConcreteMethodDeclaration {

    constructor(id: Identifier, statements: StatementList) {
        super(id, null, null, statements);
    }

    toODialect(writer: CodeWriter): void {
        writer.append("getter ").append(this.name).append(" {").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent().append("}").newLine();
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("define ").append(this.name).append(" as getter doing:").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
    }

    toMDialect(writer: CodeWriter): void {
        writer.append("def ").append(this.name).append(" getter():").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
    }

    transpile(transpiler: Transpiler): void {
        this.statements.transpile(transpiler);
    }
}
