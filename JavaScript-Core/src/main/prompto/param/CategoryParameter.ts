import {MethodType, IType} from '../type'
import {CodeWriter, equalObjects} from '../utils'
import { SyntaxError } from '../error'
import { ContextualExpression, ArrowValue } from '../value'
import {ArrowExpression, IExpression} from '../expression'
import BaseParameter from "./BaseParameter";
import {Identifier} from "../grammar";
import {Dialect} from "../parser";
import {Context, MethodDeclarationMap, Transpiler} from "../runtime";
import {IParameter} from "./index";
import {AbstractMethodDeclaration} from "../declaration";

export default class CategoryParameter extends BaseParameter {

    type: IType;
    resolved?: IType;

    constructor(id: Identifier, mutable: boolean, type: IType, defaultExpression?: IExpression) {
        super(id, mutable);
        this.type = type;
        this.defaultExpression = defaultExpression;
    }

    getProto() {
        return this.type.name;
    }

    getSignature(dialect: Dialect) {
        return this.type.name + " " + this.id.name;
    }

    getTranspiledName(context: Context) {
        return this.type.getTranspiledName(context);
    }

    equals(other: IParameter): boolean {
        return other == this || (other instanceof CategoryParameter && equalObjects(this.type, other.type));
    }

    checkValue(context: Context, expression: IExpression) {
        const isArrow = expression instanceof ContextualExpression && expression.expression instanceof ArrowExpression;
        if (isArrow)
            return this.checkArrowValue(context, expression);
        else
            return this.checkSimpleValue(context, expression);
    }

    checkArrowValue(context: Context, expression: ContextualExpression) {
        const decl = this.getAbstractMethodDeclaration(context);
        return new ArrowValue(decl!, expression.calling, expression.expression as unknown as ArrowExpression); // TODO check
    }

    getAbstractMethodDeclaration(context: Context): AbstractMethodDeclaration | null {
        const methods = context.getRegisteredDeclaration(MethodDeclarationMap, this.type.id);
        if (methods) {
            const filtered = methods.getAll().filter(decl => decl.isAbstract());
            return filtered.length ? filtered[0] as unknown as AbstractMethodDeclaration : null;
        } else
            return null;
    }

    checkSimpleValue(context: Context, expression: IExpression) {
        this.resolve(context);
        if (this.resolved instanceof MethodType)
            return expression.interpretReference(context);
        else
            return super.checkValue(context, expression);
    }

    transpileCall(transpiler: Transpiler, expression: IExpression) {
        this.resolve(transpiler.context);
        if (!this.transpileArrowExpressionCall(transpiler, expression))
            super.transpileCall(transpiler, expression);
    }

    transpileArrowExpressionCall(transpiler: Transpiler, expression: IExpression) {
        if (this.resolved instanceof MethodType) {
            if (expression instanceof ContextualExpression)
                expression = expression.expression;
            if (expression instanceof ArrowExpression)
                this.resolved.transpileArrowExpression(transpiler, expression);
            else
                expression.transpileReference(transpiler, this.resolved);
            return true;
        }
        return false;
    }

    register(context: Context): void {
        const actual = context.contextForValue(this.id);
        if (actual == context) {
            throw new SyntaxError("Duplicate argument: \"" + this.name + "\"");
        }
        this.resolve(context);
        if (this.resolved == this.type)
            context.registerInstance(this, true);
        else {
            const param = new CategoryParameter(this.id, this.mutable, this.resolved!);
            context.registerInstance(param, true);
        }
        if (this.defaultExpression != null)
            context.setValue(this.id, this.defaultExpression.interpret(context));
    }

    check(context: Context): IType {
        this.resolve(context);
        if (this.resolved)
            this.resolved.checkExists(context);
        else
            context.problemListener.reportUnknownCategory(this.type.id, this.type.name);
        return this.type;
    }

    resolve(context: Context): IType {
        if (!this.resolved)
            this.resolved = this.type.resolve(context, null);
        return this.resolved;
    }

    declare(transpiler: Transpiler): void {
        this.resolve(transpiler.context);
        if (this.resolved instanceof MethodType)
            this.resolved.declare(transpiler);
        else
            this.type.declare(transpiler);
    }

    getType(context?: Context): IType {
        if (context)
            return this.resolve(context);
        else
            return this.type;
    }

    toEDialect(writer: CodeWriter): void {
        const anonymous = "any" == this.type.name;
        this.type.toDialect(writer);
        if (anonymous) {
            writer.append(' ');
            writer.append(this.name);
        }
        if (!anonymous) {
            writer.append(' ');
            writer.append(this.name);
        }
    }

    toODialect(writer: CodeWriter): void {
        this.type.toDialect(writer);
        writer.append(' ');
        writer.append(this.name);
    }

    toMDialect(writer: CodeWriter): void {
        writer.append(this.name);
        writer.append(':');
        this.type.toDialect(writer);
    }
}

