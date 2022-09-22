import SimpleStatement from './SimpleStatement.ts'
import { Dialect } from '../parser'
import { Identifier } from '../grammar'
import { VoidType, CategoryType } from '../type'
import { UserError, SyntaxError } from '../error'

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

    check(context: Context): Type {
        const type = this.expression.check(context);
        if(!new CategoryType(new Identifier("Error")).isAssignableFrom(context, type)) {
            throw new SyntaxError(type.name + " does not extend Error");
        }
        return VoidType.instance;
    }

    interpret(context: Context): Value {
        throw new UserError(this.expression);
    }

    declare(transpiler: Transpiler): void {
        this.expression.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("throw ");
        this.expression.transpile(transpiler);
    }

    toDialect(writer: CodeWriter): void {
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
