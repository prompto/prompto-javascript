var BuiltInMethodDeclaration = require("../declaration/BuiltInMethodDeclaration").BuiltInMethodDeclaration;
var EnumeratedNativeDeclaration = require("../declaration/EnumeratedNativeDeclaration").EnumeratedNativeDeclaration;
var SyntaxError = require("../error/SyntaxError").SyntaxError;
var CategoryParameter = require("../param/CategoryParameter").CategoryParameter;
var TextType = require("../type/TextType").TextType;
var Identifier = require("../grammar/Identifier").Identifier;


class SymbolOfMethodDeclaration extends BuiltInMethodDeclaration {

    constructor(enumType) {
        super("symbolOf", new CategoryParameter(TextType.instance, new Identifier("name")));
        this.enumType = enumType;
    }

    check(context) {
        return this.enumType;
    }

    interpret(context) {
        var decl = context.getRegistered(this.enumType.name);
        if(!(decl instanceof EnumeratedNativeDeclaration))
            throw new SyntaxError(this.enumType.typeName + " is not an enumerated type!");
        var name = context.getValue(new Identifier("name")).getStorableData();
        return decl.getSymbol(name);
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("symbolOf(");
        assignments[0].transpile(transpiler);
        transpiler.append(")");
    }
}

exports.SymbolOfMethodDeclaration = SymbolOfMethodDeclaration;
