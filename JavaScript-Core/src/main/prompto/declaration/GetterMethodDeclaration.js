
export default class GetterMethodDeclaration extends ConcreteMethodDeclaration {

    constructor(id, statements) {
        super(id, null, null, statements);
    }

    toODialect(writer) {
        writer.append("getter ").append(this.name).append(" {").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent().append("}").newLine();
    }

    toEDialect(writer) {
        writer.append("define ").append(this.name).append(" as getter doing:").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
    }

    toMDialect(writer) {
        writer.append("def ").append(this.name).append(" getter():").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
    }

    transpile(transpiler) {
        this.statements.transpile(transpiler);
    }
}
