import Section from '../parser/Section';
import {IExpression} from "../expression";
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import {IType, MethodType} from "../type";
import {IValue} from "../value";
import {Dialect} from "../parser";
import {AttributeDeclaration, TestMethodDeclaration} from "../declaration";
import {Identifier} from '../grammar';

export default abstract class Literal<T extends IValue> extends Section implements IExpression {

    text: string;
    value: T;

    constructor(text: string, value: T) {
        super();
        this.text = text;
        this.value = value;
    }

    asSection(): Section {
        return this;
    }

    checkAssignItem(context: Context, section: Section, itemType: IType, valueType: IType): IType {
        throw new Error('Method not implemented.');
    }
    checkAssignMember(context: Context, section: Section, member: Identifier, valueType: IType): IType {
        throw new Error('Method not implemented.');
    }
    interpretReference(context: Context): IValue {
        throw new Error('Method not implemented.');
    }
    transpileReference(transpiler: Transpiler, method: MethodType): void {
        throw new Error('Method not implemented.');
    }
    transpileAssignParent(transpiler: Transpiler): unknown {
        throw new Error('Method not implemented.');
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

    checkReference(context: Context): IType {
        return this.check(context);
    }

    abstract check(context: Context): IType;

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

    interpret(context: Context): IValue {
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

