import {IType, TextType} from '../type'
import HtmlEntities from 'html-entities'
import {Context, Transpiler} from "../runtime";
import {CodeWriter} from "../utils";
import IJsxExpression from "./IJsxExpression";

export default class JsxText implements IJsxExpression {

    text: string;

    constructor(text: string) {
        this.text = text;
    }

    check(context: Context): IType {
        return TextType.instance;
    }

    toDialect(writer: CodeWriter): void {
        writer.append(this.text);
    }

    declare(transpiler: Transpiler): void {
        // nothing to do
    }

    transpile(transpiler: Transpiler): void {
        // convert html entities
        const text = HtmlEntities.decode(this.text, { level: "all" });
        transpiler.append(JSON.stringify(text));
    }
}
