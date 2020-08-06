var BuiltInMethodDeclaration = require("../declaration/BuiltInMethodDeclaration").BuiltInMethodDeclaration;
var BooleanType = require("../type/BooleanType").BooleanType;
var BooleanValue = require("../value/BooleanValue").BooleanValue;
var IntegerType = require("../type/IntegerType").IntegerType;
var IntegerValue = require("../value/IntegerValue").IntegerValue;
var TextType = require("../type/TextType").TextType;
var TextValue = require("../value/TextValue").TextValue;
var ListType = require("../type/ListType").ListType;
var ListValue = require("../value/ListValue").ListValue;
var Identifier = require("../grammar/Identifier").Identifier;
var CategoryParameter = require("../param/CategoryParameter").CategoryParameter;
var TextLiteral = require("../literal/TextLiteral").TextLiteral;
var IntegerLiteral = require("../literal/IntegerLiteral").IntegerLiteral;
var List = require("../intrinsic/List").List;


class ToLowerCaseMethodDeclaration extends BuiltInMethodDeclaration {

    constructor() {
        super("toLowerCase");
    }

    interpret(context) {
        var value = this.getValue(context).getStorableData();
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
        var value = this.getValue(context).getStorableData();
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
        var value = this.getValue(context).getStorableData();
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
        var value = this.getValue(context).getStorableData();
        value = value.replace( /(^|\s)([a-z])/g , (m, p1, p2) => { return p1 + p2.toUpperCase(); } );
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
        var value = this.getValue(context).getStorableData();
        var sep = context.getValue(new Identifier("separator")).getStorableData();
        var list = value.split(sep);
        var texts = list.map(s => { return new TextValue(s); });
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
        var value = this.getValue(context).getStorableData();
        var find = context.getValue(new Identifier("value")).getStorableData();
        var startsWith = value.indexOf(find)===0;
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
        return this;
    }

    interpret(context) {
        var value = this.getValue(context).getStorableData();
        var find = context.getValue(new Identifier("value")).getStorableData();
        var endsWith = value.indexOf(find)===value.length-find.length;
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
        var value = this.getValue(context).getStorableData();
        var toReplace = context.getValue(new Identifier("toReplace")).getStorableData();
        var replaceWith = context.getValue(new Identifier("replaceWith")).getStorableData();
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
        var value = this.getValue(context).getStorableData();
        var toReplace = context.getValue(new Identifier("toReplace")).getStorableData();
        var replaceWith = context.getValue(new Identifier("replaceWith")).getStorableData();
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
        var value = this.getValue(context).getStorableData();
        var toFind = context.getValue(new Identifier("value")).getStorableData();
        var fromIndex = context.getValue(new Identifier("fromIndex")).getStorableData();
        var index = value.indexOf(toFind, fromIndex - 1);
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

exports.StartsWithMethodDeclaration = StartsWithMethodDeclaration;
exports.EndsWithMethodDeclaration = EndsWithMethodDeclaration;
exports.ToLowerCaseMethodDeclaration = ToLowerCaseMethodDeclaration;
exports.ToUpperCaseMethodDeclaration = ToUpperCaseMethodDeclaration;
exports.ToCapitalizedMethodDeclaration = ToCapitalizedMethodDeclaration;
exports.TrimMethodDeclaration = TrimMethodDeclaration;
exports.ReplaceMethodDeclaration = ReplaceMethodDeclaration;
exports.ReplaceAllMethodDeclaration = ReplaceAllMethodDeclaration;
exports.SplitMethodDeclaration = SplitMethodDeclaration;
exports.IndexOfMethodDeclaration = IndexOfMethodDeclaration;
