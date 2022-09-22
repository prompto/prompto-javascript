import EnumSymbol from './EnumSymbol'
import { Dialect } from '../parser'
import { TextValue } from '../value'
import { SyntaxError } from '../error'

export default class NativeSymbol extends EnumSymbol {

    constructor(id, expression) {
        super(id);
        this.expression = expression;
        this.type = null;
    }

    toString() {
        return this.name;
    }

    toDialect(writer: CodeWriter): void {
        writer.append(this.name);
        switch(writer.dialect) {
            case Dialect.E:
                writer.append(" with ");
                this.expression.toDialect(writer);
                writer.append(" as value");
                break;
            case Dialect.O:
                writer.append(" = ");
                this.expression.toDialect(writer);
                break;
            case Dialect.M:
                writer.append(" = ");
                this.expression.toDialect(writer);
                break;
        }
    }

    check(context: Context): Type {
        const actual = this.expression.check(context);
        if(!this.type.derivedFrom.isAssignableFrom(context, actual)) {
            throw new SyntaxError("Cannot assign " + actual.name + " to " + this.type.derivedFrom.name);
        }
        return this.type;
    }

    interpret(context: Context): Value {
        return this;
    }

    declare(transpiler: Transpiler): void {
        this.type.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append(this.name);
    }

    initialize(transpiler) {
        transpiler.append("var ").append(this.name).append(" = new ").append(this.type.name).append("('").append(this.name).append("', ");
        this.expression.transpile(transpiler);
        transpiler.append(");");
        transpiler.newLine();
    }

    getMemberValue(context, id, autoCreate) {
        if("name" === id.name)
            return new TextValue(this.name);
        else if("value" === id.name)
            return this.expression.interpret(context);
        else
            return super.getMemberValue(context, id.name, autoCreate);
    }
}
