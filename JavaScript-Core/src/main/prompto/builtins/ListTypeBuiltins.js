import BuiltInMethodDeclaration from '../declaration/BuiltInMethodDeclaration.js'
import { CategoryParameter } from '../param/index.js'
import {AnyType, IntegerType, VoidType} from "../type";
import {Identifier} from "../grammar";

class RemoveItemMethodDeclaration extends BuiltInMethodDeclaration {

    constructor() {
        super("removeItem", new CategoryParameter(IntegerType.instance, new Identifier("item")));

    }

    interpret(context) {
        const list = this.getValue(context);
        if(!list.mutable)
            context.problemListener.reportNotMutable(new Identifier("list"), "list"); // TODO locate the incorrect code
        const item = context.getValue(new Identifier("item"));
        list.removeItem(item);
        return null;
    }

    check(context) {
        return VoidType.instance;
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("removeItem(");
        assignments[0].transpile(transpiler, null);
        transpiler.append(")");
    }
}


class RemoveValueMethodDeclaration extends BuiltInMethodDeclaration {

    constructor() {
        super("removeValue", new CategoryParameter(AnyType.instance, new Identifier("value")));

    }

    interpret(context) {
        const list = this.getValue(context);
        if(!list.mutable)
            context.problemListener.reportNotMutable(new Identifier("list"), "list"); // TODO locate the incorrect code
        const value = context.getValue(new Identifier("value"));
        list.removeValue(value);
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

export { RemoveItemMethodDeclaration, RemoveValueMethodDeclaration };