import Section from "../parser/Section"
import { JsxValue } from "../value/index"

export default class IJsxExpression extends Section {

    interpret(context) {
        return new JsxValue(this);
    }
}
