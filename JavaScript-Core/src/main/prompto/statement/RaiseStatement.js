import SimpleStatement from "./SimpleStatement"
import { Dialect } from "../parser/index"
import { Identifier } from "../grammar/index"
import { VoidType, CategoryType } from "../type/index"
import { UserError } from "../error/index"

export default class RaiseStatement extends SimpleStatement {

    constructor(expression) {
        super();
        this.expression = expression;
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
