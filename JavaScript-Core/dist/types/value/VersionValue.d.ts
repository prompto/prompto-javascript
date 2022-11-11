import BaseValue from './BaseValue';
import { Version } from "../intrinsic";
import { Context } from "../runtime";
import IValue from "./IValue";
import { Identifier } from "../grammar";
export default class VersionValue extends BaseValue<Version> {
    constructor(value: Version);
    get major(): number;
    get minor(): number;
    get fix(): number;
    toString(): string;
    toJsonNode(): string;
    compareToValue(context: Context, value: IValue): number;
    equals(obj: any): boolean;
    GetMemberValue(context: Context, member: Identifier): IValue;
}
