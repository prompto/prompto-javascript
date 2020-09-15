import IJsxExpression from './IJsxExpression.js'
import { TextType } from '../type/index.js'
const XmlEntities = require('html-entities').XmlEntities;

export default class JsxText extends IJsxExpression {

    constructor(text) {
        super();
        this.text = text;
    }

    check(context) {
        return TextType.instance;
    }

    toDialect(writer) {
        writer.append(this.text);
    }

    declare(transpiler) {
        // nothing to do
    }

    transpile(transpiler) {
        // convert html entities
        const text = (new XmlEntities()).decode(this.text);
        transpiler.append(JSON.stringify(text));
    }
}
