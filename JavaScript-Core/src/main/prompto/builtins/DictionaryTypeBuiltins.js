import BuiltInMethodDeclaration from "../declaration/BuiltInMethodDeclaration"
import { DictionaryType, TextType } from "../type/index"

// don't use export default since more builtins are expected
class SwapMethodDeclaration extends BuiltInMethodDeclaration {

    constructor() {
        super("swap");

    }

    interpret(context) {
        const value = this.getValue(context);
        return value.swap(context);
    }

    check(context) {
        return new DictionaryType(TextType.instance);
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("swap()");
    }
}

export { SwapMethodDeclaration };