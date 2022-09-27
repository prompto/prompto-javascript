import Section from '../parser/Section'
import {JsxValue, IValue} from '../value'
import {Context} from "../runtime";

export default class IJsxExpression extends Section {

    interpret(context: Context): IValue {
        return new JsxValue(this);
    }
}
