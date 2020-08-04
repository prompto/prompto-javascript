var BuiltInMethodDeclaration = require("../declaration/BuiltInMethodDeclaration").BuiltInMethodDeclaration;
var DictionaryType = require("../type/DictionaryType").DictionaryType;
var TextType = require("../type/TextType").TextType;

class SwapMethodDeclaration extends BuiltInMethodDeclaration {

    constructor() {
        super("swap");

    }

    interpret(context) {
        var value = this.getValue(context);
        return value.swap(context);
    }

    check(context) {
        return new DictionaryType(TextType.instance);
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("swap()");
    }
}

exports.SwapMethodDeclaration = SwapMethodDeclaration;