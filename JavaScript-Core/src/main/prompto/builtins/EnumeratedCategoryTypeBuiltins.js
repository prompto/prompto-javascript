import BuiltInMethodDeclaration from "../declaration/BuiltInMethodDeclaration"
import { CategoryParameter } from "../param/index"
import { TextType } from "../type/index"
import { Identifier } from "../grammar/index"
import { EnumeratedCategoryDeclaration } from "../declaration/index"
import { SyntaxError } from "../error/index"

// don't use export default since more builtins are expected
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


export {SymbolOfMethodDeclaration};