import EnumSymbol from './EnumSymbol'
import { Dialect } from '../parser'
import {IValue, TextValue} from '../value'
import { SyntaxError } from '../error'
import {Identifier} from "../grammar";
import {IExpression} from "./index";
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import {EnumeratedNativeType, IType} from "../type";

export default class NativeSymbol extends EnumSymbol<EnumeratedNativeType> {

    expression: IExpression;

    constructor(id: Identifier, expression: IExpression) {
        super(id);
        this.expression = expression;
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

    check(context: Context): IType {
        const actual = this.expression.check(context);
        if(!this.type.derivedFrom.isAssignableFrom(context, actual)) {
            throw new SyntaxError("Cannot assign " + actual.name + " to " + this.type.derivedFrom.name);
        }
        return this.type;
    }

    interpret(context: Context): IValue {
        return this;
    }

    declare(transpiler: Transpiler): void {
        this.type.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append(this.name);
    }

    initialize(transpiler: Transpiler): void {
        transpiler.append("var ").append(this.name).append(" = new ").append(this.type.name).append("('").append(this.name).append("', ");
        this.expression.transpile(transpiler);
        transpiler.append(");");
        transpiler.newLine();
    }

    GetMemberValue(context: Context, member: Identifier, autoCreate?: boolean) {
        if("name" == member.name)
            return new TextValue(this.name);
        else if("value" == member.name)
            return this.expression.interpret(context);
        else
            return super.GetMemberValue(context, member, autoCreate);
    }
}
