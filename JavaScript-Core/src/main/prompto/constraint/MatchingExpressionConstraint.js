import { Identifier } from "../grammar/index"
import { Variable } from "../runtime/index"
import { AnyType } from "../type/index"
import { InvalidDataError } from "../error/index"

export default class MatchingExpressionConstraint {

    constructor(expression) {
        this.expression = expression;
    }

    checkValue(context, value) {
        const child = context.newChildContext();
        const id = new Identifier("value");
        child.registerValue(new Variable(id, AnyType.instance));
        child.setValue(id, value);
        const test = this.expression.interpret(child);
        if(!test.value) {
            throw new InvalidDataError((value == null ? "null" : value.toString()) + " does not match:" + this.expression.toString());
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

