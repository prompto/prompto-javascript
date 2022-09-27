import BaseValue from "./BaseValue";
import {IType, VoidType} from "../type";
import {IExpression} from "../expression";
import {Context, Transpiler} from "../runtime";
import IValue from "../../../main/prompto/value/IValue";
import {IMethodDeclaration} from "../declaration";

export default class ContextualExpression extends BaseValue<any> {

    calling: Context;
    expression: IExpression;

    constructor(calling: Context, expression: IExpression) {
        super(VoidType.instance, null); // TODO check that this is not a problem
        this.calling = calling;
        this.expression = expression;
    }

    check(context: Context): IType {
        return this.expression.check(this.calling);
    }

    checkReference(context: Context): IType {
        return this.expression.checkReference(this.calling);
    }

    interpret(context: Context): IValue {
        return this.expression.interpret(this.calling);
    }

    interpretReference(context: Context): IValue {
        return this.expression.interpretReference(this.calling);
    }

    transpile(transpiler: Transpiler): void {
        transpiler = transpiler.newChildTranspiler(this.calling);
        this.expression.transpile(transpiler);
        transpiler.flush();
    }

    transpileReference(transpiler: Transpiler, method: IMethodDeclaration): void {
        transpiler = transpiler.newChildTranspiler(this.calling);
        this.expression.transpileReference(transpiler, method);
        transpiler.flush();
    }

    transpileParent(transpiler: Transpiler) {
        this.transpile(transpiler);
    }
}

