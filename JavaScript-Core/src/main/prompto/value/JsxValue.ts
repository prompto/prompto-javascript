import BaseValue from "./BaseValue";
import { JsxType } from '../type'
import {JsxExpression} from "../jsx";

export default class JsxValue extends BaseValue<JsxExpression> {

    constructor(expression: JsxExpression) {
        super(JsxType.instance, expression);
    }
}

