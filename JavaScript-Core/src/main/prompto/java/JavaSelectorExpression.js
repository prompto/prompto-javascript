import JavaExpression from './JavaExpression.js'

export default class JavaSelectorExpression extends JavaExpression {

    constructor(parent) {
        super();
        this.parent = parent || null;
    }
}

