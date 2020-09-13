import PythonExpression from "./PythonExpression"

export default class PythonSelfExpression extends PythonExpression {

    toString() {
        return "self";
    }

    toDialect(writer) {
        writer.append("self");
    }
}
