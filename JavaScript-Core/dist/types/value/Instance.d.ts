import BaseValue from './BaseValue';
import { IType } from "../type";
import IValue from "./IValue";
import { CategoryDeclaration } from "../declaration";
export default abstract class Instance<T> extends BaseValue<T> {
    constructor(type: IType, value: T);
    abstract get declaration(): CategoryDeclaration<any>;
    abstract ToMutable(): IValue;
    abstract getType(): IType;
    abstract setDbId(dbId: any): void;
    abstract getMemberNames(): string[];
}
