import BuiltInMethodDeclaration from '../declaration/BuiltInMethodDeclaration.js'
import { CategoryParameter } from '../param/index.js'
import { AnyType, IntegerType, VoidType } from "../type/index.js";
import { Identifier } from "../grammar/index.js";


class IndexOfMethodDeclaration extends BuiltInMethodDeclaration {

    constructor() {
        super("indexOf", new CategoryParameter(AnyType.instance, new Identifier("value")));

    }

    interpret(context) {
        const list = this.getValue(context);
        const value = context.getValue(new Identifier("value"));
        return list.indexOfValue(value);
    }

    check(context) {
        return IntegerType.instance;
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("indexOfValue(");
        assignments[0].transpile(transpiler, null);
        transpiler.append(")");
    }
}

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

class AddValueMethodDeclaration extends BuiltInMethodDeclaration {

    constructor() {
        super("addValue", new CategoryParameter(AnyType.instance, new Identifier("value")));

    }

    interpret(context) {
        const list = this.getValue(context);
        if(!list.mutable)
            context.problemListener.reportNotMutable(new Identifier("list"), "list"); // TODO locate the incorrect code
        const value = context.getValue(new Identifier("value"));
        list.addValue(value);
        return null;
    }

    check(context) {
        return VoidType.instance;
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("addValue(");
        assignments[0].transpile(transpiler, null);
        transpiler.append(")");
    }
}

class InsertValueMethodDeclaration extends BuiltInMethodDeclaration {

    constructor() {
        super("insertValue", new CategoryParameter(AnyType.instance, new Identifier("value")), new CategoryParameter(IntegerType.instance, new Identifier("atIndex")));

    }

    interpret(context) {
        const list = this.getValue(context);
        if(!list.mutable)
            context.problemListener.reportNotMutable(new Identifier("list"), "list"); // TODO locate the incorrect code
        const value = context.getValue(new Identifier("value"));
        const atIndex = context.getValue(new Identifier("atIndex"));
        list.insertValue(value, atIndex);
        return null;
    }

    check(context) {
        return VoidType.instance;
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("insertValue(");
        assignments[0].transpile(transpiler, null);
        transpiler.append(", ");
        assignments[1].transpile(transpiler, null);
        transpiler.append(")");
    }
}

export { IndexOfMethodDeclaration, RemoveItemMethodDeclaration, RemoveValueMethodDeclaration, AddValueMethodDeclaration, InsertValueMethodDeclaration };
