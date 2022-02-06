import BuiltInMethodDeclaration from '../declaration/BuiltInMethodDeclaration.js'
import { CategoryParameter } from '../param/index.js'
import { TextType } from '../type/index.js'
import { Identifier } from '../grammar/index.js'
import { EnumeratedNativeDeclaration } from '../declaration/index.js'
import { SyntaxError } from '../error/index.js'

// don't use export default since more builtins are expected
class SymbolOfMethodDeclaration extends BuiltInMethodDeclaration {

    constructor(enumType) {
        super("symbolOf", new CategoryParameter(TextType.instance, new Identifier("name")));
        this.enumType = enumType;
    }

    check(context) {
        return this.enumType;
    }

    interpret(context) {
        const decl = context.getRegistered(this.enumType.id);
        if(!(decl instanceof EnumeratedNativeDeclaration))
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
