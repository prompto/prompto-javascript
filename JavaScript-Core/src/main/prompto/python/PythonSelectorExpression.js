import PythonExpression from './PythonExpression.js'

export default class PythonSelectorExpression extends PythonExpression {

    constructor(parent) {
        super();
        this.parent = parent || null;
    }
}

