import BaseValue from './BaseValue';
import { TextValue } from '../value';
import { UUID } from '../intrinsic';
import { Context } from "../runtime";
export default class UUIDValue extends BaseValue<UUID> {
    constructor(value: UUID | string);
    toString(): string;
    toJsonNode(): string;
    getStorableData(): any;
    equals(obj: any): boolean;
    toDocumentValue(context: Context): TextValue;
}
