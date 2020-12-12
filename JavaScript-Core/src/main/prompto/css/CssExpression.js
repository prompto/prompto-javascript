import { CssType } from '../type/index.js'
import { CssValue } from '../value/index.js'

export default class CssExpression {

    constructor(fields) {
        this.fields = fields || [];
    }

    toString() {
        return "{ " + this.fields.map(field => field.toString()).join(", ") + " }";
    }

    check(context) {
        return CssType.instance;
    }

    interpret(context) {
        return new CssValue(this);
    }

    toDialect(writer) {
        writer.append("{");
        this.fields.forEach(field => {
            field.toDialect(writer);
        }, this);
        writer.append("}");
    }

    addField(field) {
        this.fields.push(field);
    }

    plus(expression) {
        const replacing = new Set(expression.fields.map(field => field.name));
        const filtered = this.fields.filter(field => !replacing.has(field.name));
        const fields = filtered.concat(expression.fields);
        return new CssExpression(fields);
    }

    declare(transpiler) {
        this.fields.forEach(field => {
            field.declare(transpiler);
        }, this);
    }

    transpile(transpiler) {
        transpiler.append("{");
        this.fields.forEach(field => {
            field.transpile(transpiler);
            transpiler.append(", ");
        }, this);
        transpiler.trimLast(", ".length);
        transpiler.append("}");
        return false;
    }
}
