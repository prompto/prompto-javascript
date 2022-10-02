import {IType, VoidType} from '../type'
import { ProblemCollector } from '../problem'
import {AttributeParameter, MethodParameter, IParameter} from '../param'
import {Context, MethodDeclarationMap, Transpiler} from '../runtime'
import { AttributeDeclaration } from '../declaration'
import {CodeWriter} from "../utils";
import {Identifier} from "../grammar";
import BaseParameter from "./BaseParameter";
import {Dialect} from "../parser";
import {IExpression} from "../expression";
import {IValue, NullValue} from "../value";

export default class UnresolvedParameter extends BaseParameter {

    resolved?: IParameter;

    constructor(id: Identifier) {
        super(id, false);
    }

    get name() {
        return this.id.name;
    }

    setMutable(mutable: boolean): void {
        this.mutable = mutable;
    }

    getTranspiledName(context: Context): string {
        this.resolveAndCheck(context);
        return this.resolved!.getTranspiledName(context);
    }

    toDialect(writer: CodeWriter): void {
        writer.append(this.name);
        if(this.defaultExpression!=null) {
            writer.append(" = ");
            this.defaultExpression.toDialect(writer);
        }
    }

    check(context: Context): IType {
        return this.resolveAndCheck(context);
    }

    getProto() {
        return this.name;
    }

    getSignature(dialect: Dialect) {
        return this.id.name;
    }

    getType(context: Context) {
        this.resolveAndCheck(context);
        return this.resolved!.getType(context);
    }

    register(context: Context): void {
        this.resolveAndCheck(context);
        if(this.resolved)
            this.resolved.register(context);
        if(this.defaultExpression!=null)
            context.setValue(this.id, this.defaultExpression.interpretExpression(context));
    }

    checkValue(context: Context, expression: IExpression): IValue {
        this.resolveAndCheck(context);
        if(this.resolved)
            return this.resolved.checkValue(context, expression);
        else
            return NullValue.instance;
    }

    resolveAndCheck(context: Context): IType {
        this.resolve(context);
        return this.resolved ? this.resolved.check(context) : VoidType.instance;
    }

    resolve(context: Context) {
        if (this.resolved)
            return;
        // ignore problems during resolution
        const listener = context.problemListener;
        try {
            context.problemListener = new ProblemCollector();
            // try out various solutions
            const named = context.getRegistered(this.id);
            if (named instanceof AttributeDeclaration) {
                this.resolved = new AttributeParameter(this.id, this.mutable);
            } else if (named instanceof MethodDeclarationMap) {
                this.resolved = new MethodParameter(this.id);
            }
        } finally {
            // restore listener
            context.problemListener = listener;
        }
        if(!this.resolved)
            context.problemListener.reportUnknownAttribute(this.id, this.name);
     }

    declare(transpiler: Transpiler): void {
        this.resolveAndCheck(transpiler.context);
        this.resolved!.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        this.resolveAndCheck(transpiler.context);
        this.resolved!.transpile(transpiler);
    }

    transpileCall(transpiler: Transpiler, expression: IExpression) {
        this.resolveAndCheck(transpiler.context);
        this.resolved!.transpileCall(transpiler, expression);
    }

    equals(other: IParameter): boolean {
        return other == this || (other instanceof UnresolvedParameter && this.name == other.name);
    }

    toEDialect(writer: CodeWriter): void {
        writer.append(this.id.name);
    }

    toMDialect(writer: CodeWriter): void {
        writer.append(this.id.name);
    }

    toODialect(writer: CodeWriter): void {
        writer.append(this.id.name);
    }
}



