import BuiltInMethodDeclaration from '../declaration/BuiltInMethodDeclaration'
import {TextType, ListType, BooleanType, IntegerType, IType} from '../type'
import {TextValue, ListValue, BooleanValue, IntegerValue, IValue} from '../value'
import { CategoryParameter } from '../param'
import {ArgumentList, Identifier} from '../grammar'
import { TextLiteral, IntegerLiteral } from '../literal'
import { List, StrictSet } from '../intrinsic'
import {Context, Transpiler} from "../runtime";

export class ToLowerCaseMethodDeclaration extends BuiltInMethodDeclaration<TextValue> {

    constructor() {
        super("toLowerCase");
    }

    interpret(context: Context): IValue {
        const value = this.getValue(context);
        const data = value.getStorableData();
        return new TextValue(data.toLowerCase());
    }

    check(context: Context): IType {
        return TextType.instance;
    }

    transpileCall(transpiler: Transpiler, args: ArgumentList): void {
        transpiler.append("toLowerCase()");
    }
}

export class ToUpperCaseMethodDeclaration extends BuiltInMethodDeclaration<TextValue> {

    constructor() {
        super("toUpperCase");
    }

    interpret(context: Context): IValue {
        const value = this.getValue(context).getStorableData();
        return new TextValue(value.toUpperCase());
    }

    check(context: Context): IType {
        return TextType.instance;
    }

    transpileCall(transpiler: Transpiler, args: ArgumentList): void {
        transpiler.append("toUpperCase()");
    }
}

export class TrimMethodDeclaration extends BuiltInMethodDeclaration<TextValue> {

    constructor() {
        super("trim");
     }

    interpret(context: Context): IValue {
        let value = this.getValue(context).getStorableData();
        value = value.trim();
        return new TextValue(value);
    }

    check(context: Context): IType {
        return TextType.instance;
    }

    transpileCall(transpiler: Transpiler, args: ArgumentList): void {
        transpiler.append("trim()");
    }
}

export class ToCapitalizedMethodDeclaration extends BuiltInMethodDeclaration<TextValue> {

    constructor() {
        super("toCapitalized");
    }

    interpret(context: Context): IValue {
        let value = this.getValue(context).getStorableData();
        value = value.replace( /(^|\s)([a-z])/g , (m: string, p1: string, p2: string) => p1 + p2.toUpperCase() );
        return new TextValue(value);
    }

    transpileCall(transpiler: Transpiler, args: ArgumentList): void {
        transpiler.append("replace( /(^|\\s)([a-z])/g , function(m, p1, p2){ return p1 + p2.toUpperCase(); } )");
    }

    check(context: Context): IType {
        return TextType.instance;
    }
}

export class SplitMethodDeclaration extends BuiltInMethodDeclaration<TextValue> {

    constructor() {
        super("split", new CategoryParameter(TextType.instance, new Identifier("separator"), new TextLiteral('" "')) );
    }

    interpret(context: Context): IValue {
        const value = this.getValue(context).getStorableData();
        const sepValue = context.getValue(new Identifier("separator")) as TextValue;
        const sepData = sepValue.getStorableData();
        const list = value.split(sepData);
        const texts = list.map(s => new TextValue(s));
        return new ListValue(TextType.instance, false, texts);
    }

    check(context: Context): IType {
        return new ListType(TextType.instance);
    }

    declareCall(transpiler: Transpiler): void {
        transpiler.register(List);
        transpiler.register(StrictSet);
    }

    transpileCall(transpiler: Transpiler, args: ArgumentList): void {
        transpiler.append("splitToList(");
        if(args)
            args[0].transpile(transpiler);
        else
            transpiler.append("' '"); // default
        transpiler.append(")");
    }
}

export class StartsWithMethodDeclaration extends BuiltInMethodDeclaration<TextValue> {

    constructor() {
        super("startsWith", new CategoryParameter(TextType.instance, new Identifier("value")));
    }

    interpret(context: Context): IValue {
        const value = this.getValue(context).getStorableData();
        const findValue = context.getValue(new Identifier("value")) as TextValue;
        const findData = findValue.getStorableData();
        const startsWith = value.indexOf(findData)==0;
        return BooleanValue.ValueOf(startsWith);
    }

    check(context: Context): IType {
        return BooleanType.instance;
    }

    transpileCall(transpiler: Transpiler, args: ArgumentList): void {
        transpiler.append("startsWith(");
        args[0].transpile(transpiler);
        transpiler.append(")");
    }
}

export class EndsWithMethodDeclaration extends BuiltInMethodDeclaration<TextValue> {

    constructor() {
        super(
            "endsWith",
            new CategoryParameter(TextType.instance, new Identifier("value"))
        );
    }

    interpret(context: Context): IValue {
        const value = this.getValue(context).getStorableData();
        const findValue = context.getValue(new Identifier("value")) as TextValue;
        const findData = findValue.getStorableData();
        const endsWith = value.indexOf(findData)==value.length-findData.length;
        return BooleanValue.ValueOf(endsWith);
    }

    check(context: Context): IType {
        return BooleanType.instance;
    }

    transpileCall(transpiler: Transpiler, args: ArgumentList): void {
        transpiler.append("endsWith(");
        args[0].transpile(transpiler);
        transpiler.append(")");
    }
}

export class ReplaceMethodDeclaration extends BuiltInMethodDeclaration<TextValue> {

    constructor() {
        super("replace", new CategoryParameter(TextType.instance, new Identifier("toReplace")), new CategoryParameter(TextType.instance, new Identifier("replaceWith")));
    }

    interpret(context: Context): IValue {
        let value = this.getValue(context).getStorableData();
        const toReplaceValue = context.getValue(new Identifier("toReplace")) as TextValue;
        const toReplaceData = toReplaceValue.getStorableData();
        const replaceWithValue = context.getValue(new Identifier("replaceWith")) as TextValue;
        const replaceWithData = replaceWithValue.getStorableData();
        value = value.replace(toReplaceData, replaceWithData);
        return new TextValue(value);
    }

    check(context: Context): IType {
        return TextType.instance;
    }

    transpileCall(transpiler: Transpiler, args: ArgumentList): void {
        transpiler.append("replace(");
        args.findByName("toReplace")!.transpile(transpiler);
        transpiler.append(",");
        args.findByName("replaceWith")!.transpile(transpiler);
        transpiler.append(")");
    }
}

export class ReplaceAllMethodDeclaration extends BuiltInMethodDeclaration<TextValue> {

    constructor() {
        super("replaceAll", new CategoryParameter(TextType.instance, new Identifier("toReplace")), new CategoryParameter(TextType.instance, new Identifier("replaceWith")));
    }

    interpret(context: Context): IValue {
        let value = this.getValue(context).getStorableData();
        const toReplaceValue = context.getValue(new Identifier("toReplace")) as TextValue;
        const toReplaceData = toReplaceValue.getStorableData();
        const replaceWithValue = context.getValue(new Identifier("replaceWith")) as TextValue;
        const replaceWithData = replaceWithValue.getStorableData();
        value = value.replace(new RegExp(toReplaceData, 'g'), replaceWithData);
        return new TextValue(value);
    }

    check(context: Context): IType {
        return TextType.instance;
    }

    transpileCall(transpiler: Transpiler, args: ArgumentList): void {
        transpiler.append("replace(new RegExp(");
        args.findByName("toReplace")!.transpile(transpiler);
        transpiler.append(", 'g'),");
        args.findByName("replaceWith")!.transpile(transpiler);
        transpiler.append(")");
    }
}

export class IndexOfMethodDeclaration extends BuiltInMethodDeclaration<TextValue> {

    constructor() {
        super( "indexOf", new CategoryParameter(TextType.instance, new Identifier("value")),
            new CategoryParameter(IntegerType.instance, new Identifier("fromIndex"), new IntegerLiteral("1")));
    }

    interpret(context: Context): IValue {
        const value = this.getValue(context).getStorableData();
        const toFindValue = context.getValue(new Identifier("value")) as TextValue;
        const toFindData = toFindValue.getStorableData();
        const fromIndexValue = context.getValue(new Identifier("fromIndex")) as IntegerValue;
        const fromIndexData = fromIndexValue.getStorableData();
        const index = value.indexOf(toFindData, fromIndexData - 1);
        return new IntegerValue(index + 1);
    }

    check(context: Context): IType {
        return IntegerType.instance;
    }

    transpileCall(transpiler: Transpiler, args: ArgumentList): void {
        transpiler.append("indexOf1Based(");
        args[0].transpile(transpiler);
        if(args.length>1) {
            transpiler.append(",");
            args[1].transpile(transpiler);
            transpiler.append(")");
        } else
            transpiler.append(",1)");
    }
}
