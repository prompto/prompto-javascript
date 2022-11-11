import Variable from './Variable';
import { Identifier } from '../grammar';
import { EnumeratedCategoryType } from '../type';
import { Context } from "./Context";
export default class ErrorVariable extends Variable {
    constructor(id: Identifier);
    toString(): string;
    getType(context: Context): EnumeratedCategoryType;
}
