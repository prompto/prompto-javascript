import IPythonExpression from './IPythonExpression'
import {CodeWriter} from "../utils";

export default abstract class PythonSelectorExpression implements IPythonExpression {

    parent: IPythonExpression | null;

    constructor(parent: IPythonExpression | null) {
        this.parent = parent || null;
    }

    abstract toDialect(writer: CodeWriter): void;
}

