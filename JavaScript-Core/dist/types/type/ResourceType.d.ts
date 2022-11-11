import CategoryType from './CategoryType';
import { Identifier } from "../grammar";
import { Context } from "../runtime";
export default class ResourceType extends CategoryType {
    constructor(name: Identifier);
    equals(obj: any): boolean;
    asMutable(context: Context, mutable: boolean): this;
}
