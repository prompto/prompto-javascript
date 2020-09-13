import { CssType } from "../type/index"
import { CssValue } from "../value/index"

export default class CssExpression {

    constructor() {
        this.fields = [];
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
