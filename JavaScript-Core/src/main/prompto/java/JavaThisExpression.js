import JavaExpression from './JavaExpression.js'

export default class JavaThisExpression extends JavaExpression {

    constructor() {
        super();
    }

    toString() {
        return "this";
    }

    toDialect(writer: CodeWriter): void {
        writer.append("this");
    }
}
