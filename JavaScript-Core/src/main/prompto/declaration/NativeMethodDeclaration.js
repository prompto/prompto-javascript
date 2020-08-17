
export default class NativeMethodDeclaration extends ConcreteMethodDeclaration {

    constructor(id, args, returnType, statements) {
        super(id, args, returnType, statements);
    }

    /* global intrinsic:writable */

    check(context, isStart) {
        /* eslint no-unused-vars: [ "off"] */
        const intrinsic = require("../intrinsic");
        if(isStart) {
            context = context.newLocalContext();
            this.registerParameters(context);
        }
        if(this.parameters!==null)
            this.parameters.check(context);
        const checked = this.statements.checkNative(context, this.returnType).anyfy();
        return this.returnType==null ? checked : this.returnType;
    }

    interpret(context) {
        /* eslint no-unused-vars: [ "off"] */
        const intrinsic = require("../intrinsic");
        context.enterMethod(this);
        try {
            const result = this.statements.interpretNative(context, this.returnType);
            return this.castToReturnType(context, result);
        } finally {
            context.leaveMethod(this);
        }
    }

    castToReturnType(context, value) {
        // can only cast to specified type, and if required
        if(value==null)
            value = NullValue.instance;
        else if(this.returnType==IntegerType.instance && value instanceof DecimalValue)
            value = new IntegerValue(value.IntegerValue());
        else if(this.returnType==DecimalType.instance && value instanceof IntegerValue)
            value = new DecimalValue(value.DecimalValue());
        else if(this.returnType!=null && !(this.returnType.isAssignableFrom(context, value.type))) {
            // only cast if implemented, on a per type basis
            if(this.returnType.nativeCast)
                value = this.returnType.nativeCast(context, value);
        }
        return value;
    }

    toMDialect(writer) {
        writer.append("def ");
        if(this.memberOf==null)
            writer.append("native ");
        writer.append(this.name).append(" (");
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

    toODialect(writer) {
        if(this.returnType!=null  && this.returnType!=VoidType.instance) {
            this.returnType.toDialect(writer);
            writer.append(" ");
        }
        if(this.memberOf==null)
            writer.append("native ");
        writer.append("method ").append(this.name).append(" (");
        this.parameters.toDialect(writer);
        writer.append(") {").newLine().indent();
        this.statements.forEach(stmt => {
            stmt.toDialect(writer);
            writer.newLine();
        });
        writer.dedent().append("}").newLine();
    }

    toEDialect(writer) {
        writer.append("define ").append(this.name).append(" as ");
        if(this.memberOf==null)
            writer.append("native ");
        writer.append("method ");
        this.parameters.toDialect(writer);
        if(this.returnType!=null && this.returnType!=VoidType.instance) {
            writer.append("returning ");
            this.returnType.toDialect(writer);
            writer.append(" ");
        }
        writer.append("doing:").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent().newLine();
    }
}
