import CSharpExpression from "./CSharpExpression"

export default class CSharpSelectorExpression extends CSharpExpression {

    constructor(parent) {
        super();
        this.parent = parent || null;
    }
}
