import Section from '../parser/Section.js'
import { JsxValue } from '../value/index.js'

export default class IJsxExpression extends Section {

    interpret(context) {
        return new JsxValue(this);
    }
}
