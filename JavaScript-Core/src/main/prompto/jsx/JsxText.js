var IJsxExpression = require("./IJsxExpression").IJsxExpression;
var TextType = require("../type/TextType").TextType;
var Entities = require('html-entities').XmlEntities;

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
        var text = (new Entities()).decode(this.text);
        transpiler.append(JSON.stringify(text));
    }
}

exports.JsxText = JsxText;
