import ConcreteMethodDeclaration from './ConcreteMethodDeclaration'
import {IType, VoidType} from '../type'
import {IParameter, ParameterList} from '../param'
import {Identifier, Operator} from '../grammar'
import {StatementList} from "../statement";
import {IMethodDeclaration} from "./index";
import {Context} from "../runtime";
import {CodeWriter} from "../utils";

export default class OperatorMethodDeclaration extends ConcreteMethodDeclaration {

    operator: Operator;

    constructor(operator: Operator, param: IParameter, returnType: IType | null, stmts: StatementList) {
        super(
            new Identifier("operator_" + operator.name),
            new ParameterList(param),
            returnType,
            stmts
        );
        this.operator = operator;
    }

    memberCheck(context: Context, declaration: IMethodDeclaration): void {
        // TODO Auto-generated method stub
    }

    toMDialect(writer: CodeWriter): void {
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

    toEDialect(writer: CodeWriter): void {
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

    toODialect(writer: CodeWriter): void {
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
