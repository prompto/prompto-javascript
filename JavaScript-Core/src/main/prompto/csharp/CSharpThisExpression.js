import CSharpExpression from './CSharpExpression.js'

export default class CSharpThisExpression extends CSharpExpression {

    constructor() {
        super();
    }

    toDialect(writer) {
        return writer.append("this");
    }

    toString() {
        return "this";
    }
}
