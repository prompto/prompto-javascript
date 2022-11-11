import BaseValue from "./BaseValue";
import { Context } from "../runtime";
import { MethodType } from "../type";
import { IValue } from "./index";
export default class ClosureValue extends BaseValue<MethodType> {
    context: Context;
    constructor(context: Context, type: MethodType);
    interpret(context: Context): IValue;
    doInterpret(context: Context): IValue;
    convertToJavaScript(): this;
}
