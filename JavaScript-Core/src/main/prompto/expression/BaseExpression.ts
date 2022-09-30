import Section from '../parser/Section'
import {CodeWriter, IWritable} from "../utils";
import {Context, Transpiler} from "../runtime";
import {IType, MethodType} from "../type";
import {IValue} from "../value";
import {AttributeDeclaration} from "../declaration";
import {IExpression} from "./index";
import {Identifier} from "../grammar";

export default abstract class BaseExpression extends Section implements IExpression, IWritable {

    asSection(): Section {
        return this;
    }

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

    check(context: Context): IType {
        throw new Error("check not implemented by " + this.constructor.name);
    }

    checkReference(context: Context): IType {
        return this.check(context);
    }

    checkAssignItem(context: Context, section: Section, itemType: IType, valueType: IType): IType {
        throw new Error("checkAssignItem not implemented by " + this.constructor.name);
    }

    checkAssignMember(context: Context, section: Section, member: Identifier, valueType: IType): IType {
        throw new Error("checkAssignItem not implemented by " + this.constructor.name);
    }

    checkAttribute(context: Context): AttributeDeclaration | null {
        context.problemListener.reportMissingAttribute(this, this.toString());
        return null;
    }

   interpret(context: Context): IValue {
        throw new Error("interpret not implemented by " + this.constructor.name);
    }

    interpretReference(context: Context): IValue {
       return this.interpret(context);
    }

    declare(transpiler: Transpiler): void {
        throw new Error("declare not implemented by " + this.constructor.name);
    }

    transpile(transpiler: Transpiler): void {
        throw new Error("transpile not implemented by " + this.constructor.name);
    }

    transpileReference(transpiler: Transpiler, method: MethodType): void {
        this.transpile(transpiler);
    }

    declareParent(transpiler: Transpiler): void {
        this.declare(transpiler);
    }

    transpileParent(transpiler: Transpiler): void {
        this.transpile(transpiler);
    }

    transpileAssignParent(transpiler: Transpiler): void {
        this.transpile(transpiler);
    }


}
