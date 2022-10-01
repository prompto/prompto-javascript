import BaseValue from '../value/BaseValue'
import {IntegerValue, IValue} from "../value";
import {IType, MethodType} from "../type";
import {IExpression} from "./index";
import {Context, Transpiler} from "../runtime";
import ISliceable from "../value/ISliceable";
import {CodeWriter} from "../utils";
import {Section} from "../parser";
import {AttributeDeclaration} from "../declaration";

export default class ValueExpression extends BaseValue<IValue> implements IExpression, ISliceable {

    constructor(type: IType, value: IValue) {
        super(type, value);
    }

    isSliceable(): boolean {
        return this.value.isSliceable();
    }

    check(context: Context): IType {
        return this.type;
    }

    interpret(context: Context): IValue {
        return this.value;
    }

    toString() {
        return this.value.toString();
    }

    toDialect = (writer: CodeWriter) => {
        writer.append(this.value.toString());
    }

    slice(first: IntegerValue | null, last: IntegerValue | null): ISliceable {
        return (this.value as ISliceable).slice(first, last);
    }

    asSection(): Section {
        throw new Error("Not implemented!")
    }

    checkAttribute(context: Context): AttributeDeclaration | null {
        throw new Error("Not implemented!")
    }

    checkReference(context: Context): IType | null {
        throw new Error("Not implemented!")
    }

    declareParent(transpiler: Transpiler): void {
        throw new Error("Not implemented!")
    }

    interpretReference(context: Context): IValue {
        throw new Error("Not implemented!")
    }

    isAssertion(): boolean {
        return false;
    }

    isPredicate(): boolean {
        return false;
    }

    locateSectionAtLine(line: number): Section | null {
        throw new Error("Not implemented!")
    }

    parentToDialect(writer: CodeWriter): unknown {
        throw new Error("Not implemented!")
    }

    transpileParent(transpiler: Transpiler): void {
        throw new Error("Not implemented!")
    }

    transpileReference(transpiler: Transpiler, method: MethodType): void {
        throw new Error("Not implemented!")
    }
}
