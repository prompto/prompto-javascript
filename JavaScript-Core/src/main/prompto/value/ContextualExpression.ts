import BaseValue from "./BaseValue";
import {IType, MethodType, VoidType} from "../type";
import {IExpression} from "../expression";
import {Context, Transpiler} from "../runtime";
import IValue from "../../../main/prompto/value/IValue";
import {AttributeDeclaration} from "../declaration";
import {Section} from "../parser";
import {CodeWriter} from "../utils";

export default class ContextualExpression extends BaseValue<any> implements IExpression {

    calling: Context;
    expression: IExpression;

    constructor(calling: Context, expression: IExpression) {
        super(VoidType.instance, null); // TODO check that this is not a problem
        this.calling = calling;
        this.expression = expression;
    }

    isPredicate(): boolean {
        return false;
    }

    isAssertion(): boolean {
        return false;
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

    transpileReference(transpiler: Transpiler, method: MethodType): void {
        transpiler = transpiler.newChildTranspiler(this.calling);
        this.expression.transpileReference(transpiler, method);
        transpiler.flush();
    }

    transpileParent(transpiler: Transpiler) {
        this.transpile(transpiler);
    }

    checkAttribute(context: Context): AttributeDeclaration | null {
        return null;
    }

    declareParent(transpiler: Transpiler): void {
        // nothing to do
    }

    locateSectionAtLine(line: number): Section | null {
        return this.expression.locateSectionAtLine(line);
    }

    parentToDialect(writer: CodeWriter): void {
        // nothing to do
    }

    toDialect = (writer: CodeWriter) => {
        // nothing to do
    };

    asSection(): Section {
        return this.expression.asSection() || new Section();
    }
}

