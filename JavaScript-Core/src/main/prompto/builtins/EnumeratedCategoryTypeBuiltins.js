const BuiltInMethodDeclaration = require("../declaration/BuiltInMethodDeclaration").BuiltInMethodDeclaration;
const EnumeratedCategoryDeclaration = require("../declaration/EnumeratedCategoryDeclaration").EnumeratedCategoryDeclaration;
const SyntaxError = require("../error/SyntaxError").SyntaxError;
const CategoryParameter = require("../param/CategoryParameter").CategoryParameter;
const TextType = require("../type/TextType").TextType;
const Identifier = require("../grammar/Identifier").Identifier;

class SymbolOfMethodDeclaration extends BuiltInMethodDeclaration {

    constructor(enumType) {
        super( "symbolOf", new CategoryParameter(TextType.instance, new Identifier("name")));
        this.enumType = enumType;
    }

    check(context) {
        return this.enumType;
    }

    interpret(context) {
        const decl = context.getRegistered(this.enumType.name);
        if(!(decl instanceof EnumeratedCategoryDeclaration))
            throw new SyntaxError(this.enumType.typeName + " is not an enumerated type!");
        const name = context.getValue(new Identifier("name")).getStorableData();
        return decl.getSymbol(name);
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("symbolOf(");
        assignments[0].transpile(transpiler);
        transpiler.append(")");
    }
}


exports.SymbolOfMethodDeclaration = SymbolOfMethodDeclaration;