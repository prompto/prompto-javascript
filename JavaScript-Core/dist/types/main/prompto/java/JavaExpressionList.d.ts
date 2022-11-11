import ObjectList from '../utils/ObjectList';
import JavaExpression from "./JavaExpression";
import { CodeWriter } from "../utils";
export default class JavaExpressionList extends ObjectList<JavaExpression> {
    constructor(expressions?: JavaExpression[], expression?: JavaExpression);
    toDialect(writer: CodeWriter): void;
}
