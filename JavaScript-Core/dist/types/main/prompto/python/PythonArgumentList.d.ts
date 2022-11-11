import ObjectList from '../utils/ObjectList';
import IPythonExpression from "./IPythonExpression";
import { CodeWriter } from "../utils";
export default class PythonArgumentList extends ObjectList<IPythonExpression> {
    constructor(args?: IPythonExpression[], arg?: IPythonExpression);
    toDialect(writer: CodeWriter): void;
}
