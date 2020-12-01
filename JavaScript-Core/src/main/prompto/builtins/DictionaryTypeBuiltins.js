import BuiltInMethodDeclaration from '../declaration/BuiltInMethodDeclaration.js'
import { DictionaryType, TextType, AnyType, VoidType } from '../type/index.js'
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


class RemoveKeyMethodDeclaration extends BuiltInMethodDeclaration {

    constructor() {
        super("removeKey", new CategoryParameter(TextType.instance, new Identifier("key")));

    }

    interpret(context) {
        const dict = this.getValue(context);
        if(!dict.mutable)
            context.problemListener.reportNotMutable(new Identifier("dict"), "dict"); // TODO locate the incorrect code
        const key = context.getValue(new Identifier("key"));
        dict.removeKey(key);
        return null;
    }

    check(context) {
        return VoidType.instance;
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("removeKey(");
        assignments[0].transpile(transpiler, null);
        transpiler.append(")");
    }
}


class RemoveValueMethodDeclaration extends BuiltInMethodDeclaration {

    constructor() {
        super("removeValue", new CategoryParameter(AnyType.instance, new Identifier("value")));

    }

    interpret(context) {
        const dict = this.getValue(context);
        if(!dict.mutable)
            context.problemListener.reportNotMutable(new Identifier("dict"), "dict"); // TODO locate the incorrect code
        const value = context.getValue(new Identifier("value"));
        dict.removeValue(value);
        return null;
    }

    check(context) {
        return VoidType.instance;
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("removeValue(");
        assignments[0].transpile(transpiler, null);
        transpiler.append(")");
    }
}

export { SwapMethodDeclaration, RemoveKeyMethodDeclaration, RemoveValueMethodDeclaration };