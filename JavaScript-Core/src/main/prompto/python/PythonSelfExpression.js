import PythonExpression from './PythonExpression.js'

export default class PythonSelfExpression extends PythonExpression {

    toString() {
        return "self";
    }

    toDialect(writer: CodeWriter): void {
        writer.append("self");
    }
}
