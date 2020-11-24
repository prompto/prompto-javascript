import BuiltInMethodDeclaration from '../declaration/BuiltInMethodDeclaration.js'
import { DictionaryType, TextType, VoidType } from '../type/index.js'
import { CategoryParameter } from "../param";
import { Identifier } from "../grammar";

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


class RemoveMethodDeclaration extends BuiltInMethodDeclaration {

    constructor() {
        super("swap", new CategoryParameter(TextType.instance, new Identifier("key")));

    }

    interpret(context) {
        const value = this.getValue(context);
        if(!value.mutable)
            context.problemListener.reportNotMutable(new Identifier("dict"), "dict"); // TODO locate the incorrect code
        const key = context.getValue(new Identifier("key"));
        value.remove(key);
        return null;
    }

    check(context) {
        return VoidType.instance;
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("remove(");
        assignments[0].transpile(transpiler, null);
        transpiler.append(")");
    }
}

export { SwapMethodDeclaration, RemoveMethodDeclaration };