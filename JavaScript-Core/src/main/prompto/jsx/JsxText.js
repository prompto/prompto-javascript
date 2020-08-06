const IJsxExpression = require("./IJsxExpression").IJsxExpression;
const TextType = require("../type/TextType").TextType;
const Entities = require('html-entities').XmlEntities;

class JsxText extends IJsxExpression {
    constructor(text) {
        super();
        this.text = text;
        return this;
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
        const text = (new Entities()).decode(this.text);
        transpiler.append(JSON.stringify(text));
    }
}

exports.JsxText = JsxText;
