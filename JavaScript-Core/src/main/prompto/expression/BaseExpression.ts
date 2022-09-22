import Section from '../parser/Section'
import {CodeWriter, Writable} from "../utils";
import {Context, Transpiler} from "../runtime";
import {Type} from "../type";
import {Value} from "../value";
import {AttributeDeclaration, MethodDeclaration} from "../declaration";
import {Expression} from "./index";

export default abstract class BaseExpression extends Section implements Expression, Writable {

    isPredicate(): boolean {
        return false;
    }

    isAssertion(): boolean {
        return false;
    }

    toEDialect(writer: CodeWriter): void {
        throw new Error("Should never get there!");
    }

    toMDialect(writer: CodeWriter): void {
        throw new Error("Should never get there!");
    }

    toODialect(writer: CodeWriter): void {
        throw new Error("Should never get there!");
    }

    toDialect(writer: CodeWriter): void {
        writer.toDialect(this);
    }

    parentToDialect(writer: CodeWriter): void {
        this.toDialect(writer);
    }

    check(context: Context): Type {
        throw new Error("check not implemented by " + this.constructor.name);
    }

    checkReference(context: Context): Type {
        return this.check(context);
    }

    checkAttribute(context: Context): AttributeDeclaration | null {
        context.problemListener.reportMissingAttribute(this, this.toString());
        return null;
    }

    interpret(context: Context): Value {
        throw new Error("interpret not implemented by " + this.constructor.name);
    }

    interpretReference(context: Context): Value {
       return this.interpret(context);
    }

    declare(transpiler: Transpiler): void {
        throw new Error("declare not implemented by " + this.constructor.name);
    }

    transpile(transpiler: Transpiler): void {
        throw new Error("transpile not implemented by " + this.constructor.name);
    }

    transpileReference(transpiler: Transpiler, method: MethodDeclaration): void {
        this.transpile(transpiler);
    }

    declareParent(transpiler: Transpiler): void {
        this.declare(transpiler);
    }

    transpileParent(transpiler: Transpiler): void {
        this.transpile(transpiler);
    }

}
