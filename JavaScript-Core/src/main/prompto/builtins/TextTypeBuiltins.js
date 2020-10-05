import BuiltInMethodDeclaration from '../declaration/BuiltInMethodDeclaration.js'
import { TextType, ListType, BooleanType, IntegerType } from '../type/index.js'
import { TextValue, ListValue, BooleanValue, IntegerValue } from '../value/index.js'
import { CategoryParameter } from '../param/index.js'
import { Identifier } from '../grammar/index.js'
import { TextLiteral, IntegerLiteral } from '../literal/index.js'
import { List } from '../intrinsic/index.js'

// don't use export default since more builtins are expected
class ToLowerCaseMethodDeclaration extends BuiltInMethodDeclaration {

    constructor() {
        super("toLowerCase");
    }

    interpret(context) {
        const value = this.getValue(context).getStorableData();
        return new TextValue(value.toLowerCase());
    }

    check(context) {
        return TextType.instance;
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("toLowerCase()");
    }
}

class ToUpperCaseMethodDeclaration extends BuiltInMethodDeclaration {

    constructor() {
        super("toUpperCase");
    }

    interpret(context) {
        const value = this.getValue(context).getStorableData();
        return new TextValue(value.toUpperCase());
    }

    check(context) {
        return TextType.instance;
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("toUpperCase()");
    }
}

class TrimMethodDeclaration extends BuiltInMethodDeclaration {

    constructor() {
        super("trim");
     }

    interpret(context) {
        let value = this.getValue(context).getStorableData();
        value = value.trim();
        return new TextValue(value);
    }

    check(context) {
        return TextType.instance;
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("trim()");
    }
}

class ToCapitalizedMethodDeclaration extends BuiltInMethodDeclaration {

    constructor() {
        super("toCapitalized");
    }

    interpret(context) {
        let value = this.getValue(context).getStorableData();
        value = value.replace( /(^|\s)([a-z])/g , (m, p1, p2) => p1 + p2.toUpperCase() );
        return new TextValue(value);
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("replace( /(^|\\s)([a-z])/g , function(m, p1, p2){ return p1 + p2.toUpperCase(); } )");
    }

    check(context) {
        return TextType.instance;
    }
}

class SplitMethodDeclaration extends BuiltInMethodDeclaration {

    constructor() {
        super("split", new CategoryParameter(TextType.instance, new Identifier("separator"), new TextLiteral('" "')) );
    }

    interpret(context) {
        const value = this.getValue(context).getStorableData();
        const sep = context.getValue(new Identifier("separator")).getStorableData();
        const list = value.split(sep);
        const texts = list.map(s => new TextValue(s));
        return new ListValue(TextType.instance, texts);
    }

    check(context) {
        return new ListType(TextType.instance);
    }

    declareCall(transpiler) {
        transpiler.require(List);
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("splitToList(");
        if(assignments)
            assignments[0].transpile(transpiler);
        else
            transpiler.append("' '"); // default
        transpiler.append(")");
    }
}

class StartsWithMethodDeclaration extends BuiltInMethodDeclaration {

    constructor() {
        super("startsWith", new CategoryParameter(TextType.instance, new Identifier("value")));
    }

    interpret(context) {
        const value = this.getValue(context).getStorableData();
        const find = context.getValue(new Identifier("value")).getStorableData();
        const startsWith = value.indexOf(find)===0;
        return BooleanValue.ValueOf(startsWith);
    }

    check(context) {
        return BooleanType.instance;
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("startsWith(");
        assignments[0].transpile(transpiler);
        transpiler.append(")");
    }
}

class EndsWithMethodDeclaration extends BuiltInMethodDeclaration {

    constructor() {
        super(
            "endsWith",
            new CategoryParameter(TextType.instance, new Identifier("value"))
        );
    }

    interpret(context) {
        const value = this.getValue(context).getStorableData();
        const find = context.getValue(new Identifier("value")).getStorableData();
        const endsWith = value.indexOf(find)===value.length-find.length;
        return BooleanValue.ValueOf(endsWith);
    }

    check(context) {
        return BooleanType.instance;
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("endsWith(");
        assignments[0].transpile(transpiler);
        transpiler.append(")");
    }
}

class ReplaceMethodDeclaration extends BuiltInMethodDeclaration {

    constructor() {
        super("replace", new CategoryParameter(TextType.instance, new Identifier("toReplace")), new CategoryParameter(TextType.instance, new Identifier("replaceWith")));
    }

    interpret(context) {
        let value = this.getValue(context).getStorableData();
        const toReplace = context.getValue(new Identifier("toReplace")).getStorableData();
        const replaceWith = context.getValue(new Identifier("replaceWith")).getStorableData();
        value = value.replace(toReplace, replaceWith);
        return new TextValue(value);
    }

    check(context) {
        return TextType.instance;
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("replace(");
        assignments.find("toReplace").transpile(transpiler);
        transpiler.append(",");
        assignments.find("replaceWith").transpile(transpiler);
        transpiler.append(")");
    }
}

class ReplaceAllMethodDeclaration extends BuiltInMethodDeclaration {

    constructor() {
        super("replaceAll", new CategoryParameter(TextType.instance, new Identifier("toReplace")), new CategoryParameter(TextType.instance, new Identifier("replaceWith")));
    }

    interpret(context) {
        let value = this.getValue(context).getStorableData();
        const toReplace = context.getValue(new Identifier("toReplace")).getStorableData();
        const replaceWith = context.getValue(new Identifier("replaceWith")).getStorableData();
        value = value.replace(new RegExp(toReplace, 'g'), replaceWith);
        return new TextValue(value);
    }

    check(context) {
        return TextType.instance;
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("replace(new RegExp(");
        assignments.find("toReplace").transpile(transpiler);
        transpiler.append(", 'g'),");
        assignments.find("replaceWith").transpile(transpiler);
        transpiler.append(")");
    }
}

class IndexOfMethodDeclaration extends BuiltInMethodDeclaration {

    constructor() {
        super( "indexOf", new CategoryParameter(TextType.instance, new Identifier("value")),
            new CategoryParameter(IntegerType.instance, new Identifier("fromIndex"), new IntegerLiteral("1")));
    }

    interpret(context) {
        const value = this.getValue(context).getStorableData();
        const toFind = context.getValue(new Identifier("value")).getStorableData();
        const fromIndex = context.getValue(new Identifier("fromIndex")).getStorableData();
        const index = value.indexOf(toFind, fromIndex - 1);
        return new IntegerValue(index + 1);
    }

    check(context) {
        return IntegerType.instance;
    }

    transpileCall(transpiler, assignments) {
        transpiler.append("indexOf1Based(");
        assignments[0].transpile(transpiler);
        if(assignments.length>1) {
            transpiler.append(",");
            assignments[1].transpile(transpiler);
            transpiler.append(")");
        } else
            transpiler.append(",1)");
    }
}

export {StartsWithMethodDeclaration};
export {EndsWithMethodDeclaration};
export {ToLowerCaseMethodDeclaration};
export {ToUpperCaseMethodDeclaration};
export {ToCapitalizedMethodDeclaration};
export {TrimMethodDeclaration};
export {ReplaceMethodDeclaration};
export {ReplaceAllMethodDeclaration};
export {SplitMethodDeclaration};
export {IndexOfMethodDeclaration};
