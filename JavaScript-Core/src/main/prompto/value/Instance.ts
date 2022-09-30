import BaseValue from './BaseValue'
import {IType} from "../type";
import {Context} from "../runtime";
import {Identifier} from "../grammar";
import IValue from "./IValue";
import {CategoryDeclaration} from "../declaration";

export default abstract class Instance<T> extends BaseValue<T> {

    declaration: CategoryDeclaration;

    constructor(type: IType, value: T) {
        super(type, value);
    }

    abstract ToMutable(): IValue;
    abstract getType(): IType;
    abstract setDbId(dbId: any): void;
    abstract setMember(context: Context, id: Identifier, value: IValue): void;
    abstract getMemberNames(): string[];
}
