import NamedInstance from '../grammar/NamedInstance'
import {IntegerValue, DecimalValue, Value} from '../value'
import {IntegerType, DecimalType, Type} from '../type'
import {Identifier} from "../grammar";
import {Expression} from "../expression";
import {Context, Transpiler} from "../runtime";
import {CodeWriter, Writable} from "../utils";
import {Dialect} from "../parser";
import {Parameter} from "./index";

export default abstract class BaseParameter extends NamedInstance implements Writable, Parameter {

    mutable: boolean;
    defaultExpression?: Expression;

    constructor(id: Identifier) {
        super(id);
        this.mutable = false;
    }

    abstract toEDialect(writer: CodeWriter): void;
    abstract toODialect(writer: CodeWriter): void;
    abstract toMDialect(writer: CodeWriter): void;
    abstract check(context: Context): Type;

    setMutable(mutable: boolean): void {
        this.mutable = mutable;
    }

    checkValue(context: Context, expression: Expression): Value {
        const value = expression.interpret(context);
        if (value instanceof IntegerValue && this.getType(context)==DecimalType.instance) {
            return new DecimalValue(value.DecimalValue());
        } else if (value instanceof DecimalValue && this.getType(context)==IntegerType.instance) {
            return new IntegerValue(value.IntegerValue());
        } else {
            return value;
        }
    }

    toDialect(writer: CodeWriter): void {
        if(this.mutable)
            writer.append("mutable ");
        writer.toDialect(this);
        if(this.defaultExpression!=null) {
            writer.append(" = ");
            this.defaultExpression.toDialect(writer);
        }
    }

    transpile(transpiler: Transpiler, expression: Expression): void {
        transpiler.append(this.name);
    }

    transpileCall(transpiler: Transpiler, expression: Expression): void {
        const expType = expression.check(transpiler.context);
        if (this.getType(transpiler.context) === IntegerType.instance && expType === DecimalType.instance) {
            transpiler.append("Math.round(");
            expression.transpile(transpiler);
            transpiler.append(")");
        } else
            expression.transpile(transpiler);
    }

    abstract getSignature(dialect: Dialect): string;
    abstract getProto(context: Context): string;
    abstract getTranspiledName(context: Context): string;
}
