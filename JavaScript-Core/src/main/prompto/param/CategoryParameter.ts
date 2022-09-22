import Parameter from './Parameter'
import {MethodType, Type} from '../type'
import { equalObjects } from '../utils'
import { SyntaxError } from '../error'
import { ContextualExpression, ArrowValue } from '../value'
import { ArrowExpression } from '../expression'

export default class CategoryParameter extends Parameter {

    type: Type;

    constructor(type, id, defaultExpression) {
        super(id);
        this.type = type;
        this.resolved = null;
        this.defaultExpression = defaultExpression || null;
    }

    setMutable(mutable) {
        this.type.mutable = mutable;
        this.mutable = mutable;
    }

    getProto() {
        return this.type.name;
    }

    getSignature(dialect) {
        return this.type.name + " " + this.id.name;
    }

    getTranspiledName(context) {
        return this.type.getTranspiledName(context);
    }

    equals(other) {
        return other === this || (other instanceof CategoryParameter && equalObjects(this.type, other.type));
    }

    checkValue(context, expression) {
        const isArrow = expression instanceof ContextualExpression && expression.expression instanceof ArrowExpression;
        if (isArrow)
            return this.checkArrowValue(context, expression);
        else
            return this.checkSimpleValue(context, expression);
    }

    checkArrowValue(context, expression) {
        const decl = this.getAbstractMethodDeclaration(context);
        return new ArrowValue(decl, expression.calling, expression.expression); // TODO check
    }

    getAbstractMethodDeclaration(context) {
        const methods = context.getRegisteredDeclaration(this.type.id);
        if (methods !== null)
            return methods.getAll().filter(decl => decl.isAbstract())[0] || null;
        else
            return null;
    }

    checkSimpleValue(context, expression) {
        this.resolve(context);
        if (this.resolved instanceof MethodType)
            return expression.interpretReference(context);
        else
            return super.checkValue(context, expression);
    }

    transpileCall(transpiler, expression) {
        this.resolve(transpiler.context);
        if (!this.transpileArrowExpressionCall(transpiler, expression))
            super.transpileCall(transpiler, expression);
    }

    transpileArrowExpressionCall(transpiler, expression) {
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
        if (actual === context) {
            throw new SyntaxError("Duplicate argument: \"" + this.name + "\"");
        }
        this.resolve(context);
        if (this.resolved === this.type)
            context.registerValue(this);
        else {
            const param = new CategoryParameter(this.resolved, this.id);
            param.setMutable(this.mutable);
            context.registerValue(param);
        }
        if (this.defaultExpression != null)
            context.setValue(this.id, this.defaultExpression.interpret(context));
    }

    check(context: Context): Type {
        this.resolve(context);
        if (this.resolved)
            this.resolved.checkExists(context);
        else
            context.problemListener.reportUnknownCategory(this.type.id, this.type.name);
        return this.type;
    }

    resolve(context) {
        if (this.resolved == null) {
            this.resolved = this.type.resolve(context, null);
        }
    }

    declare(transpiler: Transpiler): void {
        this.resolve(transpiler.context);
        if (this.resolved instanceof MethodType)
            this.resolved.declare(transpiler);
        else
            this.type.declare(transpiler);
    }

    getType(context) {
        if (context) {
            this.resolve(context);
            return this.resolved;
        } else
            return this.type;
    }

    toEDialect(writer: CodeWriter): void {
        const anonymous = "any" === this.type.name;
        this.type.toDialect(writer, true);
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
        this.type.toDialect(writer, true);
        writer.append(' ');
        writer.append(this.name);
    }

    toMDialect(writer: CodeWriter): void {
        writer.append(this.name);
        writer.append(':');
        this.type.toDialect(writer, true);
    }
};

