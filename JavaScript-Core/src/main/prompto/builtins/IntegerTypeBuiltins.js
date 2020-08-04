var CategoryParameter = require("../param/CategoryParameter.js").CategoryParameter;
var BuiltInMethodDeclaration = require("../declaration/BuiltInMethodDeclaration").BuiltInMethodDeclaration;
var TextType = require("../type/TextType").TextType;
var TextValue = require("../value/TextValue").TextValue;
var Identifier = require("../grammar/Identifier").Identifier;

class FormatMethodDeclaration extends BuiltInMethodDeclaration {

    constructor() {
        super("format", new CategoryParameter(TextType.instance, new Identifier("format")));
    }

    interpret(context) {
        var value = this.getValue(context).getStorableData();
        var format = context.getValue(new Identifier("format")).getStorableData();
        value = this.format(value, format);
        return new TextValue(value);
    }

    check(context) {
        return TextType.instance;
    }

    format(value, format) {
        // TODO support more than leading 0's
        value = "000000000000" + value;
        return value.substr(value.length - format.length);
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("formatInteger(");
        assignments[0].transpile(transpiler);
        transpiler.append(")");
    }
}

exports.FormatMethodDeclaration = FormatMethodDeclaration;