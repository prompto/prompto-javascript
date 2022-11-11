import BaseValue from "./BaseValue";
import { JsxExpression } from "../jsx";
export default class JsxValue extends BaseValue<JsxExpression> {
    constructor(expression: JsxExpression);
}
