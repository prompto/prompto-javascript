import BaseValue from './BaseValue'
import {Type} from "../type";
import {Context} from "../runtime";
import {Identifier} from "../grammar";
import Value from "./Value";

export default abstract class Instance<T> extends BaseValue<T> {

    constructor(type: Type, value: T) {
        super(type, value);
    }

    abstract setDbId(dbId: never): void;
    abstract setMember(context: Context, id: Identifier, value: Value): void;
    abstract getMemberNames(): string[];

}
