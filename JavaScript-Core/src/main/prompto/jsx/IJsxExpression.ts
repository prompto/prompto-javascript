import Section from '../parser/Section'
import {JsxValue, Value} from '../value'
import {Context} from "../runtime";

export default class IJsxExpression extends Section {

    interpret(context: Context): Value {
        return new JsxValue(this);
    }
}
