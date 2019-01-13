var ConcreteMethodDeclaration = require("./ConcreteMethodDeclaration").ConcreteMethodDeclaration;
var ArgumentList = require("../grammar/ArgumentList").ArgumentList;
var Identifier = require("../grammar/Identifier").Identifier;
var VoidType = require("../type/VoidType").VoidType;

function OperatorMethodDeclaration(op, arg, returnType, stmts) {
    ConcreteMethodDeclaration.call(this, new Identifier("operator_" + op.name), new ArgumentList(arg), returnType, stmts);
    this.operator = op;
    return this;
}

OperatorMethodDeclaration.prototype = Object.create(ConcreteMethodDeclaration.prototype);
OperatorMethodDeclaration.prototype.constructor = OperatorMethodDeclaration;


OperatorMethodDeclaration.prototype.memberCheck = function(declaration, context) {
    // TODO Auto-generated method stub
};

OperatorMethodDeclaration.prototype.toMDialect = function(writer) {
    writer.append("def operator ").append(this.operator.token).append(" (");
    this.args.toDialect(writer);
    writer.append(")");
    if(this.returnType!=null && this.returnType!=VoidType.instance) {
        writer.append("->");
        this.returnType.toDialect(writer);
    }
    writer.append(":").newLine().indent();
    this.statements.toDialect(writer);
    writer.dedent();
};

OperatorMethodDeclaration.prototype.toEDialect = function(writer) {
    writer.append("define ").append(this.operator.token).append(" as operator ");
    this.args.toDialect(writer);
    if(this.returnType!=null && this.returnType!=VoidType.instance) {
        writer.append("returning ");
        this.returnType.toDialect(writer);
        writer.append(" ");
    }
    writer.append("doing:").newLine().indent();
    this.statements.toDialect(writer);
    writer.dedent();
};

OperatorMethodDeclaration.prototype.toODialect = function(writer) {
    if(this.returnType!=null && this.returnType!=VoidType.instance) {
        this.returnType.toDialect(writer);
        writer.append(" ");
    }
    writer.append("operator ").append(this.operator.token).append(" (");
    this.args.toDialect(writer);
    writer.append(") {").newLine().indent();
    this.statements.toDialect(writer);
    writer.dedent().append("}").newLine();
};

exports.OperatorMethodDeclaration = OperatorMethodDeclaration;