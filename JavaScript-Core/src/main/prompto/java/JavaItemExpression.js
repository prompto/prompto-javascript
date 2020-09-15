import JavaSelectorExpression from './JavaSelectorExpression.js'

export default class JavaItemExpression extends JavaSelectorExpression {

    constructor(item) {
        super();
        this.item = item || null;
    }

    toString() {
        return this.parent.toString() + "[" + this.item.toString() + "]";
    }
}
