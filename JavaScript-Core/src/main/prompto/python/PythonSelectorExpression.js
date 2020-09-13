import PythonExpression from "./PythonExpression"

export default class PythonSelectorExpression extends PythonExpression {

    constructor(parent) {
        super();
        this.parent = parent || null;
    }
}

