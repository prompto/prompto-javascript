import ObjectList from '../utils/ObjectList';
import CSharpExpression from "./CSharpExpression";
import { CodeWriter } from "../utils";
export default class CSharpExpressionList extends ObjectList<CSharpExpression> {
    constructor(items?: CSharpExpression[], item?: CSharpExpression);
    toDialect(writer: CodeWriter): void;
}
