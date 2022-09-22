import { Identifier } from '../grammar'
import {Context, Transpiler, Variable} from '../runtime'
import {AnyType, Type} from '../type'
import { InvalidDataError } from '../error'
import Constraint from "./Constraint";
import {Expression} from "../expression";
import {BooleanValue, Value} from "../value";
import {CodeWriter} from "../utils";

export default class MatchingExpressionConstraint implements Constraint {

    expression: Expression;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    transpiler: (transpiler: Transpiler) => void = (t: Transpiler) => {};

    constructor(expression: Expression) {
        this.expression = expression;
    }

    checkValue(context: Context, value: Value): void {
        const child = context.newChildContext();
        const id = new Identifier("value");
        child.registerInstance(new Variable(id, AnyType.instance), true);
        child.setValue(id, value);
        const test = this.expression.interpret(child);
        if(test instanceof BooleanValue) {
            if(!test.value)
                throw new InvalidDataError((value == null ? "null" : value.toString()) + " does not match:" + this.expression.toString());
        } else
            throw new InvalidDataError("Not a predicate: " + this.expression.toString());
    }

    toDialect(writer: CodeWriter): void {
        writer.append(" matching ");
        this.expression.toDialect(writer);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    declare(transpiler: Transpiler): void {
    }

    declareChecker(transpiler: Transpiler, name: string, type: Type): void {
        transpiler = transpiler.newChildTranspiler();
        const id = new Identifier("value");
        transpiler.context.registerInstance(new Variable(id, type), true);
        this.expression.declare(transpiler);
        this.transpiler = (transpiler: Transpiler) => this.transpileChecker(transpiler, name, type);
        transpiler.declare(this);
    }

    transpile(transpiler: Transpiler): void {
        this.transpiler(transpiler);
    }

    transpileChecker(transpiler: Transpiler, name: string, type: Type): void {
        transpiler.append("function $check_").append(name).append("(value) {").indent();
        transpiler = transpiler.newChildTranspiler();
        const id = new Identifier("value");
        transpiler.context.registerInstance(new Variable(id, type), true);
        transpiler.append("if(");
        this.expression.transpile(transpiler);
        transpiler.append(")").indent();
        transpiler.append("return value;").dedent();
        transpiler.append("else").indent();
        transpiler.append("throw new IllegalValueError((value == null ? 'null' : value.toString()) + ' does not match: \"").append(this.expression.toString()).append("\"');").dedent();
        transpiler.dedent().append("}").newLine();
        transpiler.flush();
    }
}

