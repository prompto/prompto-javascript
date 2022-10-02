import NamedInstance from '../grammar/NamedInstance'
import {IntegerValue, DecimalValue, IValue} from '../value'
import {IntegerType, DecimalType, IType} from '../type'
import {Identifier} from "../grammar";
import {IExpression} from "../expression";
import {Context, Transpiler} from "../runtime";
import {CodeWriter, IWritable} from "../utils";
import {Dialect} from "../parser";
import {IParameter} from "./index";

export default abstract class BaseParameter extends NamedInstance implements IWritable, IParameter {

    mutable: boolean;
    defaultExpression?: IExpression;

    constructor(id: Identifier, mutable: boolean) {
        super(id);
        this.mutable = mutable;
    }

    setMutable(mutable: boolean): void {
        this.mutable = mutable;
    }

    abstract toEDialect(writer: CodeWriter): void;
    abstract toODialect(writer: CodeWriter): void;
    abstract toMDialect(writer: CodeWriter): void;
    abstract register(context: Context): void;
    abstract declare(transpiler: Transpiler): void;
    abstract check(context: Context): IType;
    abstract equals(other: IParameter): boolean;

    checkValue(context: Context, expression: IExpression): IValue {
        const value = expression.interpretExpression(context);
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

    transpile(transpiler: Transpiler): void {
        transpiler.append(this.name);
    }

    transpileCall(transpiler: Transpiler, expression: IExpression): void {
        const expType = expression.check(transpiler.context);
        if (this.getType(transpiler.context) == IntegerType.instance && expType == DecimalType.instance) {
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
