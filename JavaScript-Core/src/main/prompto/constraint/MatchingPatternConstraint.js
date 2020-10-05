import { InvalidDataError } from '../error/index.js'
import { Identifier } from '../grammar/index.js'
import { Variable } from '../runtime/index.js'

export default class MatchingPatternConstraint {

    constructor(expression) {
        this.expression = expression;
        this.pattern = null;
    }

    checkValue(context, value) {
        if(this.pattern==null) {
            const toMatch = this.expression.interpret(context);
            this.pattern = new RegExp(toMatch);
        }
        if(!this.pattern.test(value.toString())) {
            throw new InvalidDataError(value.toString() + " does not match:" + this.pattern.toString());
        }
    }

    toDialect(writer) {
        writer.append(" matching ");
        this.expression.toDialect(writer);
    }

    declare(transpiler, name, type) {
        transpiler = transpiler.newChildTranspiler();
        const id = new Identifier("value");
        transpiler.context.registerValue(new Variable(id, type));
        this.expression.declare(transpiler);
        this.transpile = function(transpiler) { this.transpileChecker(transpiler, name, type); };
        transpiler.declare(this);
    }

    transpileChecker(transpiler, name, type) {
        transpiler.append("function $check_").append(name).append("(value) {").indent();
        transpiler = transpiler.newChildTranspiler();
        const id = new Identifier("value");
        transpiler.context.registerValue(new Variable(id, type));
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

