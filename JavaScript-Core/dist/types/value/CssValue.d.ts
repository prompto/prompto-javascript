import BaseValue from "./BaseValue";
import { CssExpression } from "../css";
import { Context } from "../runtime";
import { IValue } from "./index";
export default class CssValue extends BaseValue<CssExpression> {
    constructor(expression: CssExpression);
    toString(): string;
    Add(context: Context, value: IValue): IValue;
}
