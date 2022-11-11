import { Context } from "./Context";
import BaseValue from "../value/BaseValue";
import { IType } from "../type";
export default class LinkedValue extends BaseValue<any> {
    context: Context;
    constructor(context: Context, type: IType);
}
