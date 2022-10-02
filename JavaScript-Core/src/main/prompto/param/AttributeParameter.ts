import BaseParameter from './BaseParameter'
import { SyntaxError } from '../error'
import {Identifier} from "../grammar";
import {Context, Transpiler} from "../runtime";
import {Dialect} from "../parser";
import {IType, VoidType} from "../type";
import {AttributeDeclaration} from "../declaration";
import {IExpression} from "../expression";
import {IParameter} from "./index";
import { CodeWriter } from '../utils';
import {IValue, NullValue} from "../value";

export default class AttributeParameter extends BaseParameter {

    constructor(id: Identifier, mutable: boolean) {
        super(id, mutable);
    }

    toString() {
        return this.id.name;
    }

    toEDialect(writer: CodeWriter): void {
        writer.append(this.name);
    }
    toODialect(writer: CodeWriter): void {
        writer.append(this.name);
    }
    toMDialect(writer: CodeWriter): void {
        writer.append(this.name);
    }

    getProto() {
        return this.id.name;
    }

    getSignature(dialect: Dialect) {
        return this.id.name;
    }

    getTranspiledName(context: Context) {
        return this.id.name;
    }

    register(context: Context): void {
        context.registerInstance(this, true);
        if(this.defaultExpression!=null) try {
            context.setValue(this.id, this.defaultExpression.interpretExpression(context));
        } catch(error) {
            throw new SyntaxError("Unable to register default value: "+ this.defaultExpression.toString() + " for argument: " + this.name);
        }
    }

    check(context: Context): IType {
        const actual = context.getRegistered(this.id);
        if(actual)
            return actual.getType(context);
        else {
            context.problemListener.reportUnknownAttribute(this, this.name);
            return VoidType.instance;
        }
    }

    getType(context: Context): IType {
        const decl = context.getRegisteredDeclaration(AttributeDeclaration, this.id);
        return decl ? decl.getType(context) : VoidType.instance;
    }

    checkValue(context: Context, value: IExpression): IValue {
        const decl = context.getRegisteredDeclaration(AttributeDeclaration, this.id);
        return decl ? decl.checkValue(context, value) : NullValue.instance;
    }

    declare(transpiler: Transpiler): void {
        const decl = transpiler.context.getRegisteredDeclaration(AttributeDeclaration, this.id);
        if(decl)
            decl.declare(transpiler);
    }

    transpileCall(transpiler: Transpiler, expression: IExpression) {
        const decl = transpiler.context.getRegisteredDeclaration(AttributeDeclaration, this.id);
        if(decl && decl.constraint) {
            transpiler.append("$check_").append(this.name).append("(");
            super.transpileCall(transpiler, expression);
            transpiler.append(")");
        } else
            super.transpileCall(transpiler, expression);
    }

    equals(other: IParameter): boolean {
        return other == this || (other instanceof AttributeParameter && this.name == other.name);
    }
}
