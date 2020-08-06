const SimpleStatement = require("./SimpleStatement").SimpleStatement;
const CategoryType = require("../type/CategoryType").CategoryType;
const VoidType = require("../type/VoidType").VoidType;
const SyntaxError = require("../error/SyntaxError").SyntaxError;
const UserError = require("../error/UserError").UserError;
const Dialect = require("../parser/Dialect").Dialect;
const Identifier = require("../grammar/Identifier").Identifier;

class RaiseStatement extends SimpleStatement {
    constructor(expression) {
        super();
        this.expression = expression;
        return this;
    }

    toString() {
        return "raise " + this.expression.toString();
    }

    equals(obj) {
        if(obj==this) {
            return true;
        } else if(!(obj instanceof RaiseStatement)) {
            return false;
        } else {
            return this.expression.equals(obj.expression);
        }
    }

    check(context) {
        const type = this.expression.check(context);
        if(!new CategoryType(new Identifier("Error")).isAssignableFrom(context, type)) {
            throw new SyntaxError(type.name + " does not extend Error");
        }
        return VoidType.instance;
    }

    interpret(context) {
        throw new UserError(this.expression);
    }

    declare(transpiler) {
        this.expression.declare(transpiler);
    }

    transpile(transpiler) {
        transpiler.append("throw ");
        this.expression.transpile(transpiler);
    }

    toDialect(writer) {
        switch(writer.dialect) {
            case Dialect.E:
            case Dialect.M:
                writer.append("raise ");
                break;
            case Dialect.O:
                writer.append("throw ");
                break;
        }
        this.expression.toDialect(writer);
    }
}

exports.RaiseStatement = RaiseStatement;
