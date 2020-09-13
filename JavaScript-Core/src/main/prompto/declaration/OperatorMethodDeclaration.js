import ConcreteMethodDeclaration from "./ConcreteMethodDeclaration"
import { VoidType } from "../type/index"
import { ParameterList } from "../param/index"
import { Identifier } from "../grammar/index"

export default class OperatorMethodDeclaration extends ConcreteMethodDeclaration {

    constructor(op, arg, returnType, stmts) {
        super(
            new Identifier("operator_" + op.name),
            new ParameterList(arg),
            returnType,
            stmts
        );
        this.operator = op;
    }

    memberCheck(declaration, context) {
        // TODO Auto-generated method stub
    }

    toMDialect(writer) {
        writer.append("def operator ").append(this.operator.token).append(" (");
        this.parameters.toDialect(writer);
        writer.append(")");
        if(this.returnType!=null && this.returnType!=VoidType.instance) {
            writer.append("->");
            this.returnType.toDialect(writer);
        }
        writer.append(":").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
    }

    toEDialect(writer) {
        writer.append("define ").append(this.operator.token).append(" as operator ");
        this.parameters.toDialect(writer);
        if(this.returnType!=null && this.returnType!=VoidType.instance) {
            writer.append("returning ");
            this.returnType.toDialect(writer);
            writer.append(" ");
        }
        writer.append("doing:").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
    }

    toODialect(writer) {
        if(this.returnType!=null && this.returnType!=VoidType.instance) {
            this.returnType.toDialect(writer);
            writer.append(" ");
        }
        writer.append("operator ").append(this.operator.token).append(" (");
        this.parameters.toDialect(writer);
        writer.append(") {").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent().append("}").newLine();
    }
}
