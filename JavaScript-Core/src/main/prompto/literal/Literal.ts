import Section from '../parser/Section';
import {Expression} from "../expression";
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import {Type} from "../type";
import {Value} from "../value";
import {Dialect} from "../parser";
import {AttributeDeclaration, TestMethodDeclaration} from "../declaration";

export default abstract class Literal<T extends Value> extends Section implements Expression {

    text: string;
    value: T;

    constructor(text: string, value: T) {
        super();
        this.text = text;
        this.value = value;
    }

    isPredicate(): boolean {
        return false;
    }
    isAssertion(): boolean {
        return false;
    }

    toDialect(writer: CodeWriter): void {
        writer.append(this.escapedText(writer.escapeMode));
    }

    parentToDialect(writer: CodeWriter): void {
        this.toDialect(writer);
    }

    escapedText(escapeMode: number): string {
        if(escapeMode)
            return this.text.replace(/'/g, "\\'");
        else
            return this.text;
    }

    toString(): string {
        return this.text;
    }

    checkReference(context: Context): Type {
        return this.check(context);
    }

    abstract check(context: Context): Type;

    checkAttribute(context: Context): AttributeDeclaration | null {
        context.problemListener.reportMissingAttribute(this, this.toString());
        return null;
    }

    abstract declare(transpiler: Transpiler): void;
    abstract transpile(transpiler: Transpiler): void;

    declareParent(transpiler: Transpiler): void {
        this.declare(transpiler);
    }

    transpileParent(transpiler: Transpiler): void {
        this.transpile(transpiler);
    }

    interpret(context: Context): Value {
        return this.value;
    }

    getExpected(context: Context, dialect: Dialect, escapeMode: number): string {
        throw new Error("Should never get there!");
    }

    interpretAssert(context: Context, method: TestMethodDeclaration): boolean {
        throw new Error("Should never get there!");
    }

    transpileFound(transpiler: Transpiler, dialect: Dialect): void {
        throw new Error("Should never get there!");
    }
}

