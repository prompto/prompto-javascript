import BaseValue from "./BaseValue";
import { CssType } from '../type'
import { SyntaxError } from "../error";
import {CssExpression} from "../css";
import {Context} from "../runtime";
import {IValue} from "./index";

export default class CssValue extends BaseValue<CssExpression> {

    constructor(expression: CssExpression) {
        super(CssType.instance, expression);
    }

    toString() {
        return this.value.toString();
    }

    Add(context: Context, value: IValue): IValue {
        if (value instanceof CssValue) {
            return new CssValue(this.value.plus(value.value));
       } else {
            throw new SyntaxError("Illegal: Css + " + typeof(value));
        }
    }

}

