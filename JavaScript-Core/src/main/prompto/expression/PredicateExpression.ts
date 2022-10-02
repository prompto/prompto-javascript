import {Section} from "../parser";
import {CodeWriter} from "../utils";
import {ArrowExpression, IExpression} from "./index";
import {Context, Transpiler} from "../runtime";
import {IType, MethodType} from "../type";
import {IValue} from "../value";
import {AttributeDeclaration} from "../declaration";

export default abstract class PredicateExpression extends Section implements IExpression {
    abstract toArrowExpression(): ArrowExpression;
    abstract checkFilter(context: Context, itemType: IType): IType;
    abstract filteredToDialect(writer: CodeWriter, source: IExpression): void;
    abstract containsToDialect(writer: CodeWriter): void;

    asSection(): Section {
        throw new Error("Should never get there!");
    }

    check(context: Context): IType {
        throw new Error("Should never get there!");
    }

    checkAttribute(context: Context): AttributeDeclaration | null {
        throw new Error("Should never get there!");
    }

    checkReference(context: Context): IType {
        throw new Error("Should never get there!");
    }

    declare(transpiler: Transpiler): void {
        throw new Error("Should never get there!");
    }

    declareParent(transpiler: Transpiler): unknown {
        throw new Error("Should never get there!");
    }

    equals(other: any): boolean {
        throw new Error("Should never get there!");
    }

    interpretExpression(context: Context): IValue {
        throw new Error("Should never get there!");
    }

    interpretReference(context: Context): IValue {
        throw new Error("Should never get there!");
    }

    isAssertion(): boolean {
        throw new Error("Should never get there!");
    }

    isPredicate(): boolean {
        throw new Error("Should never get there!");
    }

    parentToDialect(writer: CodeWriter): unknown {
        throw new Error("Should never get there!");
    }

    toDialect(writer: CodeWriter): void {
        throw new Error("Should never get there!");
    }

    transpile(transpiler: Transpiler): void {
        throw new Error("Should never get there!");
    }

    transpileParent(transpiler: Transpiler): void {
        throw new Error("Should never get there!");
    }

    transpileReference(transpiler: Transpiler, method: MethodType): void {
        throw new Error("Should never get there!");
    }
}
