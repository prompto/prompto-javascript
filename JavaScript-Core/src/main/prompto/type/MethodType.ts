import BaseType from './BaseType'
import { SyntaxError } from '../error'
import {MethodDeclaration} from "../declaration";
import {Context, MethodDeclarationMap, Transpiler} from "../runtime";
import {ArrowExpression} from "../expression";
import {TypeFamily} from "../store";
import Type from "./Type";

export default class MethodType extends BaseType {

    method: MethodDeclaration;

    constructor(method: MethodDeclaration) {
        super(method.id, TypeFamily.MISSING);
        this.method = method;
   }

    equals(other: any): boolean {
        return other == this ||
            ((other instanceof MethodType) && (this.method.getProto() === other.method.getProto()));
    }

    checkExists(context: Context): void {
        // TODO
    }

    checkUnique(context: Context) {
        const actual = context.getRegisteredDeclaration<MethodDeclarationMap>(MethodDeclarationMap, this.id);
        if (actual != null) {
            throw new SyntaxError("Duplicate name: \"" + this.name + "\"");
        }
    }

    isMoreSpecificThan(context: Context, other: Type): boolean {
        return false;
    }

    checkArrowExpression(context: Context, expression: ArrowExpression): MethodType {
        context = context.newChildContext();
        this.method.registerParameters(context);
        expression.check(context, this.method.returnType);
        return this;
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    transpile(transpiler: Transpiler): void {
        throw new Error("Should never get there!");
    }

    declareArrowExpression(transpiler: Transpiler, expression: ArrowExpression): void {
        transpiler = transpiler.newChildTranspiler();
        this.method.registerParameters(transpiler.context);
        expression.declare(transpiler);
    }

    transpileArrowExpression(transpiler: Transpiler, expression: ArrowExpression): void {
        transpiler = transpiler.newChildTranspiler();
        transpiler.append("function(");
        this.method.parameters!.transpile(transpiler);
        transpiler.append(") {");
        this.method.registerParameters(transpiler.context);
        expression.transpile(transpiler);
        transpiler.append("}");
        transpiler.flush();
    }

    transpileMethodType(transpiler: Transpiler): void {
        this.method.transpileMethodType(transpiler);
    }
}

