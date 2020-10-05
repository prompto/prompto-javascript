import CSharpExpression from './CSharpExpression.js'

export default class CSharpSelectorExpression extends CSharpExpression {

    constructor(parent) {
        super();
        this.parent = parent || null;
    }
}
