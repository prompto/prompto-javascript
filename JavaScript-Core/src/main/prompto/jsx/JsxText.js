import IJsxExpression from '../../../main/prompto/jsx/IJsxExpression.ts'
import { TextType } from '../type'
import HtmlEntities from 'html-entities'

export default class JsxText extends IJsxExpression {

    constructor(text) {
        super();
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
        const text = (new HtmlEntities.XmlEntities()).decode(this.text);
        transpiler.append(JSON.stringify(text));
    }
}
