
export default class JavaScriptItemExpression extends JavaScriptSelectorExpression {

    constructor(item) {
        super();
        this.item = item || null;
    }

    toString() {
        return this.parent.toString() + "[" + this.item.toString() + "]";
    }
}
