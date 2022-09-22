import { InvalidDataError } from '../error'
import { Identifier } from '../grammar'
import {Context, Transpiler, Variable} from '../runtime'
import Constraint from "./Constraint";
import {Expression} from "../expression";
import {TextValue, Value} from "../value";
import {CodeWriter} from "../utils";

export default class MatchingPatternConstraint implements Constraint {

    expression: Expression;
    pattern?: RegExp;
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    transpiler: (transpiler: Transpiler) => void = (t: Transpiler) => {};

    constructor(expression: Expression) {
        this.expression = expression;
    }

    checkValue(context: Context, value: Value): void {
        if(!this.pattern) {
            const toMatch = this.expression.interpret(context);
            if(toMatch instanceof TextValue)
                this.pattern = new RegExp(toMatch.value);
            else
                throw new InvalidDataError(this.expression.toString() + " is not a valid pattern");
        }
        if(!this.pattern.test(value.toString())) {
            throw new InvalidDataError(value.toString() + " does not match:" + this.pattern.toString());
        }
    }

    toDialect(writer: CodeWriter): void {
        writer.append(" matching ");
        this.expression.toDialect(writer);
    }

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    declare(transpiler: Transpiler): void {
    }

    declareChecker(transpiler: Transpiler, name: string, type: Value): void {
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

    transpileChecker(transpiler: Transpiler, name: string, type: Value): void {
        transpiler.append("function $check_").append(name).append("(value) {").indent();
        transpiler = transpiler.newChildTranspiler();
        const id = new Identifier("value");
        transpiler.context.registerInstance(new Variable(id, type), true);
        transpiler.append("if(new RegExp(");
        this.expression.transpile(transpiler);
        transpiler.append(").test(value))").indent();
        transpiler.append("return value;").dedent();
        transpiler.append("else").indent();
        transpiler.append("throw new IllegalValueError((value == null ? 'null' : value.toString()) + ' does not match: ").append(this.expression.toString()).append("');").dedent();
        transpiler.dedent().append("}").newLine();
        transpiler.flush();
    }
}

