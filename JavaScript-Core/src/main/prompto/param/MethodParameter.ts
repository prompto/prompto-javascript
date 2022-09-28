import BaseParameter from './BaseParameter'
import {IType, MethodType, VoidType} from '../type'
import { ArrowValue, ContextualExpression } from '../value'
import {ArrowExpression, IExpression} from '../expression'
import { SyntaxError } from '../error'
import {Identifier} from "../grammar";
import {Dialect} from "../parser";
import {Context, MethodDeclarationMap, Transpiler} from "../runtime";
import {CodeWriter} from "../utils";
import {IParameter} from "./index";

export default class MethodParameter extends BaseParameter {

    constructor(id: Identifier) {
        super(id, false);
    }

    getSignature(dialect: Dialect) {
        return this.name;
    }

    toString() {
        return this.name;
    }

    getProto() {
        return this.name;
    }

    register(context: Context): void {
        context.registerInstance(this, true);
    }

    check(context: Context): IType {
        const actual = this.getDeclaration(context);
        if(actual)
            return actual.check(context);
        throw new SyntaxError("Unknown method: \"" + this.name + "\"");
        return VoidType.instance;
    }

    checkValue(context: Context, expression: IExpression) {
        const isArrow = expression instanceof ContextualExpression && expression.expression instanceof ArrowExpression;
        return isArrow ? this.checkArrowValue(context, expression) : super.checkValue(context, expression);
    }

    checkArrowValue(context: Context, expression: ContextualExpression) {
        return new ArrowValue(this.getDeclaration(context)!, expression.calling, expression.expression as unknown as ArrowExpression); // TODO check
    }

    getType(context: Context): MethodType {
        const method = this.getDeclaration(context);
        return new MethodType(method!);
    }

    getDeclaration(context: Context) {
        const methods = context.getRegisteredDeclaration(MethodDeclarationMap, this.id);
        if (methods)
            return methods.getFirst();
        else
            return null;
    }

    declare(transpiler: Transpiler): void {
        // nothing to do ?
    }

    getTranspiledName(context: Context) {
        const method = this.getDeclaration(context);
        return method ? method.getTranspiledName(context) : "<missing>";
    }

    transpileCall(transpiler: Transpiler, expression: IExpression) {
        if(!this.transpileArrowExpressionCall(transpiler, expression))
            expression.transpile(transpiler);
    }

    transpileArrowExpressionCall(transpiler: Transpiler, expression: IExpression) {
        if(expression instanceof ContextualExpression && expression.expression instanceof ArrowExpression) {
            const target = this.getType(transpiler.context);
            target.transpileArrowExpression(transpiler, expression.expression as ArrowExpression);
            return true;
        } else
            return false;
    }

    equals(other: IParameter): boolean {
        return other == this || (other instanceof MethodParameter && this.name === other.name);
    }

    toEDialect(writer: CodeWriter): void {
        writer.append(this.name);
    }

    toMDialect(writer: CodeWriter): void {
        writer.append(this.name);
    }

    toODialect(writer: CodeWriter): void {
        writer.append(this.name);
    }
}


