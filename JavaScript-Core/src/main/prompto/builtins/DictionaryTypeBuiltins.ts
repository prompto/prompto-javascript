import BuiltInMethodDeclaration from '../declaration/BuiltInMethodDeclaration'
import {DictionaryType, TextType, AnyType, VoidType, Type} from '../type'
import { CategoryParameter } from "../param";
import {ArgumentList, Identifier} from "../grammar";
import {Context, Transpiler} from "../runtime";
import {DictionaryValue, Value} from "../value";

export class SwapMethodDeclaration extends BuiltInMethodDeclaration<DictionaryValue> {

    constructor() {
        super("swap");

    }

    interpret(context: Context): Value {
        const dict = this.getValue(context);
        return dict.swap(context);
    }

    check(context: Context): Type {
        return new DictionaryType(TextType.instance);
    }

    transpileCall(transpiler: Transpiler, args: ArgumentList): void {
        transpiler.append("swap()");
    }
}



export class RemoveKeyMethodDeclaration extends BuiltInMethodDeclaration<DictionaryValue> {

    constructor() {
        super("removeKey", new CategoryParameter(TextType.instance, new Identifier("key")));

    }

    interpret(context: Context): Value | null {
        const dict = this.getValue(context);
        if(!dict.mutable)
            context.problemListener.reportNotMutable(new Identifier("dict"), "dict"); // TODO locate the incorrect code
        const key = context.getValue(new Identifier("key"));
        dict.removeKey(key);
        return null;
    }

    check(context: Context): Type {
        return VoidType.instance;
    }

    transpileCall(transpiler: Transpiler, args: ArgumentList): void {
        transpiler.append("removeKey(");
        args[0].transpile(transpiler);
        transpiler.append(")");
    }
}


export class RemoveValueMethodDeclaration extends BuiltInMethodDeclaration<DictionaryValue> {

    constructor() {
        super("removeValue", new CategoryParameter(AnyType.instance, new Identifier("value")));

    }

    interpret(context: Context): Value | null {
        const dict = this.getValue(context);
        if(!dict.mutable)
            context.problemListener.reportNotMutable(new Identifier("dict"), "dict"); // TODO locate the incorrect code
        const value = context.getValue(new Identifier("value"));
        dict.removeValue(value);
        return null;
    }

    check(context: Context): Type {
        return VoidType.instance;
    }

    transpileCall(transpiler: Transpiler, args: ArgumentList): void {
        transpiler.append("removeValue(");
        args[0].transpile(transpiler);
        transpiler.append(")");
    }
}


