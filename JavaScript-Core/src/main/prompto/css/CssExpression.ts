import {CssType, IType} from '../type'
import {CssValue, IValue} from '../value'
import {CssField} from "./index";
import {Context, Transpiler} from "../runtime";
import {CodeWriter} from "../utils";
import ICssValue from "./ICssValue";

export default class CssExpression implements ICssValue {

    fields: CssField[];

    constructor(fields: CssField[]) {
        this.fields = fields || [];
    }

    toString() {
        return "{ " + this.fields.map(field => field.toString()).join(", ") + " }";
    }

    check(context: Context): IType {
        return CssType.instance;
    }

    interpret(context: Context): IValue {
        return new CssValue(this);
    }

    toDialect(writer: CodeWriter): void {
        writer.append("{");
        this.fields.forEach(field => {
            field.toDialect(writer);
        }, this);
        writer.append("}");
    }

    addField(field: CssField): void {
        this.fields.push(field);
    }

    plus(expression: CssExpression): CssExpression {
        const replacing = new Set<string>(expression.fields.map(field => field.name));
        const filtered = this.fields.filter(field => !replacing.has(field.name));
        const fields = filtered.concat(expression.fields);
        return new CssExpression(fields);
    }

    declare(transpiler: Transpiler): void {
        this.fields.forEach(field => field.declare(transpiler), this);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("{");
        this.fields.forEach(field => {
            field.transpile(transpiler);
            transpiler.append(", ");
        }, this);
        transpiler.trimLast(", ".length);
        transpiler.append("}");
    }
}
