
export default class IJsxExpression extends Section {

    interpret(context) {
        return new JsxValue(this);
    }
}
