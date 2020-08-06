const SimpleStatement = require("./SimpleStatement").SimpleStatement;
const ResourceType = require("../type/ResourceType").ResourceType;
const Variable = require("../runtime/Variable").Variable;
const VoidType = require("../type/VoidType").VoidType;

class AssignVariableStatement extends SimpleStatement {
    constructor(id, expression) {
        super();
        this.id = id;
        this.expression = expression;
        return this;
    }

    get name() {
        return this.id.name;
    }

    toDialect(writer) {
        writer.append(this.name);
        writer.append(" = ");
        this.expression.toDialect(writer);
    }

    checkResource(context) {
        const type = this.expression.check(context);
        if(!(type instanceof ResourceType)) {
            throw new SyntaxError("Not a resource!");
        }
        const actual = context.getRegisteredValue(this.name);
        if(actual==null) {
            context.registerValue(new Variable(this.id, type));
        } else {
            // need to check type compatibility
            const actualType = actual.getType(context);
            actualType.checkAssignableFrom(context, type, this);
        }
        return VoidType.instance;
    }

    equals(obj) {
        if(obj==this) {
            return true;
        }
        if(!(obj instanceof AssignVariableStatement)) {
            return false;
        }
        return this.name==obj.name && this.expression==obj.expression;
    }

    check(context) {
        const actual = context.getRegisteredValue(this.name);
        if(actual==null) {
            const actualType = this.expression.check(context);
            context.registerValue(new Variable(this.id, actualType));
        } else {
            // need to check type compatibility
            const actualType = actual.getType(context);
            const newType = this.expression.check(context);
            actualType.checkAssignableFrom(context, newType, this);
        }
        return VoidType.instance;
    }

    interpret(context) {
        if(context.getRegisteredValue(this.name)==null) {
            const actualType = this.expression.check(context);
            context.registerValue(new Variable(this.id, actualType));
        }
        context.setValue(this.id, this.expression.interpret(context));
        return null;
    }

    declare(transpiler) {
        const actual = transpiler.context.getRegisteredValue(this.name);
        if(actual==null) {
            const actualType = this.expression.check(transpiler.context);
            transpiler.context.registerValue(new Variable(this.id, actualType));
        }
        this.expression.declare(transpiler);
    }

    transpile(transpiler) {
        const actual = transpiler.context.getRegisteredValue(this.name);
        if(actual==null) {
            const actualType = this.expression.check(transpiler.context);
            transpiler.context.registerValue(new Variable(this.id, actualType));
            transpiler.append("var ");
        }
        transpiler.append(this.name).append(" = ");
        this.expression.transpile(transpiler);
    }

    transpileClose(transpiler) {
        transpiler.append(this.name).append(".close();").newLine();
    }
}


exports.AssignVariableStatement = AssignVariableStatement;