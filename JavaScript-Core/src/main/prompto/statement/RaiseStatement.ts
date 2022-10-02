import SimpleStatement from './SimpleStatement'
import { Dialect } from '../parser'
import { Identifier } from '../grammar'
import {VoidType, CategoryType, IType} from '../type'
import { UserError, SyntaxError } from '../error'
import {IExpression} from "../expression";
import {Context, Transpiler} from "../runtime";
import {IValue} from "../value";
import {CodeWriter} from "../utils";

export default class RaiseStatement extends SimpleStatement {

    expression: IExpression;

    constructor(expression: IExpression) {
        super();
        this.expression = expression;
    }

    toString() {
        return "raise " + this.expression.toString();
    }

    equals(obj: any) {
        return obj==this || (obj instanceof RaiseStatement && this.expression.equals(obj.expression));
    }

    check(context: Context): IType {
        const type = this.expression.check(context);
        if(!new CategoryType(new Identifier("Error")).isAssignableFrom(context, type)) {
            throw new SyntaxError(type.name + " does not extend Error");
        }
        return VoidType.instance;
    }

    interpretStatement(context: Context): IValue {
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
