import BaseValue from './BaseValue'
import {IType} from "../type";
import {Context} from "../runtime";
import {Identifier} from "../grammar";
import IValue from "./IValue";

export default abstract class Instance<T> extends BaseValue<T> {

    constructor(type: IType, value: T) {
        super(type, value);
    }

    abstract setDbId(dbId: never): void;
    abstract setMember(context: Context, id: Identifier, value: IValue): void;
    abstract getMemberNames(): string[];

}
