import ObjectList from '../utils/ObjectList';
import { JavaScriptExpression } from "./index";
import { CodeWriter } from "../utils";
import { Context, Transpiler } from "../runtime";
export default class JavaScriptExpressionList extends ObjectList<JavaScriptExpression> {
    constructor(expressions?: JavaScriptExpression[], expression?: JavaScriptExpression);
    toDialect(writer: CodeWriter): void;
    transpile(transpiler: Transpiler): void;
    computeArguments(context: Context): any[];
    computeArgument(context: Context, arg: any): any;
}
