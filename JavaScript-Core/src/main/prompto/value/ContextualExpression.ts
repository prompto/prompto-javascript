import BaseValue from "./BaseValue";
import {Type, VoidType} from "../type";
import {Expression} from "../expression";
import {Context, Transpiler} from "../runtime";
import Value from "./Value";
import {MethodDeclaration} from "../declaration";

export default class ContextualExpression extends BaseValue<any> {

    calling: Context;
    expression: Expression;

    constructor(calling: Context, expression: Expression) {
        super(VoidType.instance, null); // TODO check that this is not a problem
        this.calling = calling;
        this.expression = expression;
    }

    check(context: Context): Type {
        return this.expression.check(this.calling);
    }

    checkReference(context: Context): Type {
        return this.expression.checkReference(this.calling);
    }

    interpret(context: Context): Value {
        return this.expression.interpret(this.calling);
    }

    interpretReference(context: Context): Value {
        return this.expression.interpretReference(this.calling);
    }

    transpile(transpiler: Transpiler): void {
        transpiler = transpiler.newChildTranspiler(this.calling);
        this.expression.transpile(transpiler);
        transpiler.flush();
    }

    transpileReference(transpiler: Transpiler, method: MethodDeclaration): void {
        transpiler = transpiler.newChildTranspiler(this.calling);
        this.expression.transpileReference(transpiler, method);
        transpiler.flush();
    }

    transpileParent(transpiler: Transpiler) {
        this.transpile(transpiler);
    }
}

