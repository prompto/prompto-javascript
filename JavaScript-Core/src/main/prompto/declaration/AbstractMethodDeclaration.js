const BaseMethodDeclaration = require("./BaseMethodDeclaration").BaseMethodDeclaration;
const VoidType = require("../type/VoidType").VoidType;

class AbstractMethodDeclaration extends BaseMethodDeclaration {
    constructor(id, args, returnType) {
        super(id, args, returnType);
        this.returnType = returnType || VoidType.instance;
        return this;
    }

    memberCheck(declaration, context) {
        // TODO Auto-generated method stub
    }

    check(context, isStart) {
        if(this.parameters!=null) {
            this.parameters.check(context);
        }
        if(isStart) {
            const local = context.newLocalContext();
            this.registerParameters(local);
        }
        return this.returnType;
    }

    checkChild(context) {
        if(this.parameters!=null) {
            this.parameters.check(context);
        }
        return this.returnType;
    }

    declare(transpiler) {
        this.declareArguments(transpiler);
    }

    transpile(transpiler) {
        // nothing to do
    }

    toMDialect(writer) {
        writer.append("abstract def ");
        writer.append(this.name);
        writer.append(" (");
        this.parameters.toDialect(writer);
        writer.append(")");
        if(this.returnType!=null && this.returnType!=VoidType.instance) {
            writer.append("->");
            this.returnType.toDialect(writer);
        }
    }

    toEDialect(writer) {
        writer.append("define ");
        writer.append(this.name);
        writer.append(" as abstract method ");
        this.parameters.toDialect(writer);
        if(this.returnType!=null && this.returnType!=VoidType.instance) {
            writer.append("returning ");
            this.returnType.toDialect(writer);
        }
    }

    toODialect(writer) {
        writer.append("abstract ");
        if(this.returnType!=null && this.returnType!=VoidType.instance) {
            this.returnType.toDialect(writer);
            writer.append(" ");
        }
        writer.append("method ");
        writer.append(this.name);
        writer.append(" (");
        this.parameters.toDialect(writer);
        writer.append(");");
    }
}

exports.AbstractMethodDeclaration = AbstractMethodDeclaration;
