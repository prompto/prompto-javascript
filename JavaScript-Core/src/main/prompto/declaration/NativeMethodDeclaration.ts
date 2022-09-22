import ConcreteMethodDeclaration from './ConcreteMethodDeclaration'
import {NullValue, IntegerValue, DecimalValue, Value} from '../value'
import {VoidType, IntegerType, DecimalType, Type} from '../type'
import {Context} from "../runtime";
import {Identifier} from "../grammar";
import {StatementList} from "../statement";
import {ParameterList} from "../param";
import {CodeWriter} from "../utils";
/* eslint no-unused-vars: [ "off"] */
import * as intrinsic from "../intrinsic";

export default class NativeMethodDeclaration extends ConcreteMethodDeclaration {

    constructor(id: Identifier, params: ParameterList, returnType: Type, statements: StatementList) {
        super(id, params, returnType, statements);
    }

    check(context: Context, isStart: boolean): Type {
        if(isStart) {
            context = context.newLocalContext();
            this.registerParameters(context);
        }
        if(this.parameters!==null)
            this.parameters.check(context);
        const checked = this.statements.checkNative(context, this.returnType).anyfy();
        return this.returnType==null ? checked : this.returnType;
    }

    interpret(context: Context): Value {
        context.enterMethod(this);
        try {
            const result = this.statements.interpretNative(context, this.returnType);
            return this.castToReturnType(context, result);
        } finally {
            context.leaveMethod(this);
        }
    }

    castToReturnType(context: Context, value: Value | null): Value {
        // can only cast to specified type, and if required
        if(value==null)
            value = NullValue.instance;
        else if(this.returnType==IntegerType.instance && value instanceof DecimalValue)
            value = new IntegerValue(value.IntegerValue());
        else if(this.returnType==DecimalType.instance && value instanceof IntegerValue)
            value = new DecimalValue(value.DecimalValue());
        return value;
    }

    toMDialect(writer: CodeWriter): void {
        writer.append("def ");
        if(this.memberOf==null)
            writer.append("native ");
        writer.append(this.name).append(" (");
        this.parameters.toDialect(writer);
        writer.append(")");
        if(this.returnType!=null && this.returnType!=VoidType.instance) {
            writer.append("->");
            this.returnType.toDialect(writer);
        }
        writer.append(":").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent();
    }

    toODialect(writer: CodeWriter): void {
        if(this.returnType!=null  && this.returnType!=VoidType.instance) {
            this.returnType.toDialect(writer);
            writer.append(" ");
        }
        if(this.memberOf==null)
            writer.append("native ");
        writer.append("method ").append(this.name).append(" (");
        this.parameters.toDialect(writer);
        writer.append(") {").newLine().indent();
        this.statements.forEach(stmt => {
            stmt.toDialect(writer);
            writer.newLine();
        });
        writer.dedent().append("}").newLine();
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("define ").append(this.name).append(" as ");
        if(this.memberOf==null)
            writer.append("native ");
        writer.append("method ");
        this.parameters.toDialect(writer);
        if(this.returnType!=null && this.returnType!=VoidType.instance) {
            writer.append("returning ");
            this.returnType.toDialect(writer);
            writer.append(" ");
        }
        writer.append("doing:").newLine().indent();
        this.statements.toDialect(writer);
        writer.dedent().newLine();
    }
}
