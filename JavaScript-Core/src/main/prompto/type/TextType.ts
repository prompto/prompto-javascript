import NativeType from './NativeType'
import {CharacterType, IntegerType, BooleanType, DecimalType, VoidType} from './index'
import {IValue, TextValue} from '../value'
import {CmpOp, Identifier} from '../grammar'
import { TypeFamily } from '../store'
import { isAText } from '../utils'
import { StartsWithMethodDeclaration, EndsWithMethodDeclaration, IndexOfMethodDeclaration,
    ReplaceMethodDeclaration, ReplaceAllMethodDeclaration, TrimMethodDeclaration, SplitMethodDeclaration,
    ToCapitalizedMethodDeclaration, ToLowerCaseMethodDeclaration, ToUpperCaseMethodDeclaration } from '../builtins/TextTypeBuiltins'
import {Context, Transpiler} from "../runtime";
import IType from "./IType";
import {Section} from "../parser";
import {IExpression} from "../expression";
import {IMethodDeclaration} from "../declaration";

export default class TextType extends NativeType {

    static instance = new TextType();
    
    constructor() {
        super(new Identifier("Text"), TypeFamily.TEXT);
    }

    isAssignableFrom(context: Context, other: IType): boolean {
        return super.isAssignableFrom(context, other)
            || (other == CharacterType.instance);
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(isAText);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append('"Text"');
    }

    checkAdd(context: Context, section: Section, other: IType, tryReverse: boolean): IType {
        // can add anything to text
        return this;
    }

    declareAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        left.declare(transpiler);
        right.declare(transpiler);
    }

    transpileAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        // can add anything to text
        left.transpile(transpiler);
        transpiler.append(" + ");
        // fix js precedence issue with -3.0.toDecimalString()
        if(other === DecimalType.instance) {
            transpiler.append("(");
            right.transpile(transpiler);
            transpiler.append(").toDecimalString()");
        } else
            right.transpile(transpiler);
    }

    checkMultiply(context: Context, section: Section, other: IType, tryReverse: boolean): IType {
        if(other instanceof IntegerType) {
            return TextType.instance;
        }
        return super.checkMultiply(context, section, other, tryReverse);
    }

    declareMultiply(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if (other === IntegerType.instance) {
            left.declare(transpiler);
            right.declare(transpiler);
        } else
            return super.declareMultiply(transpiler, other, tryReverse, left, right);
    }

    transpileMultiply(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void {
        if (other === IntegerType.instance) {
            left.transpile(transpiler);
            transpiler.append(".repeat(");
            right.transpile(transpiler);
            transpiler.append(")");
        } else
            return super.transpileMultiply(transpiler, other, tryReverse, left, right);
    }

    checkCompare(context: Context, section: Section, other: IType): IType {
        if(other instanceof TextType || other instanceof CharacterType) {
            return BooleanType.instance;
        }
        return super.checkCompare(context, section, other);
    }

    declareCompare(transpiler: Transpiler, other: IType): void {
        // nothing to do
    }

    transpileCompare(transpiler: Transpiler, other: IType, operator: CmpOp, left: IExpression, right: IExpression): void {
        left.transpile(transpiler);
        transpiler.append(" ").append(operator.toString()).append(" ");
        right.transpile(transpiler);
    }

    checkItem(context: Context, section: Section, itemType: IType): IType {
        if(itemType === IntegerType.instance) {
            return CharacterType.instance;
        } else {
            context.problemListener.reportIllegalItemType(section, itemType, [IntegerType.instance]);
            return VoidType.instance;
        }
    }

    declareItem(transpiler: Transpiler, itemType: IType): void {
        // nothing to do
    }

    transpileItem(transpiler: Transpiler, itemType: IType, item: IExpression): void {
        transpiler.append("[");
        item.transpile(transpiler);
        transpiler.append("-1]");
    }

    checkMember(context: Context, section: Section, member: Identifier): IType {
       if ("count" === member.name) {
           return IntegerType.instance;
       } else {
           return super.checkMember(context, section, member);
       }
    }

    declareMember(transpiler: Transpiler, member: Identifier): void {
        if ("count" !== member.name) {
            super.declareMember(transpiler, member);
        }
    }

    transpileMember(transpiler: Transpiler, id: Identifier): void {
        if ("count" === id.name) {
            transpiler.append("length");
        } else {
            super.transpileMember(transpiler, id);
        }
    }

    checkContains(context: Context, section: Section, other: IType): IType {
        if(other instanceof TextType || other instanceof CharacterType) {
            return BooleanType.instance;
        }
        return super.checkContains(context, section, other);
    }

    declareContains(transpiler: Transpiler, other: IType, container: IExpression, item: IExpression): void {
        container.declare(transpiler);
        item.declare(transpiler);
    }

    transpileContains(transpiler: Transpiler, other: IType, container: IExpression, item: IExpression): void {
        container.transpile(transpiler);
        transpiler.append(".includes(");
        item.transpile(transpiler);
        transpiler.append(")");
    }

    checkHasAllOrAny(context: Context, section: Section, other: IType): IType {
        return BooleanType.instance;
    }

    declareHasAllOrAny(transpiler: Transpiler, other: IType, container: IExpression, items: IExpression): void {
        container.declare(transpiler);
        items.declare(transpiler);
    }

    transpileHasAllValue(transpiler: Transpiler, other: IType, container: IExpression, items: IExpression): void {
        container.transpile(transpiler);
        transpiler.append(".hasAll(");
        items.transpile(transpiler);
        transpiler.append(")");
    }

    transpileHasAnyValue(transpiler: Transpiler, other: IType, container: IExpression, items: IExpression): void {
        container.transpile(transpiler);
        transpiler.append(".hasAny(");
        items.transpile(transpiler);
        transpiler.append(")");
    }

    checkSlice(context: Context, section: Section): IType {
        return this;
    }

    declareSlice(transpiler: Transpiler, first: IExpression, last: IExpression): void {
        if(first) {
            first.declare(transpiler);
        }
        if(last) {
            last.declare(transpiler);
        }
    }

    transpileSlice(transpiler: Transpiler, first: IExpression, last: IExpression): void {
        transpiler.append(".slice1Based(");
        if(first) {
            first.transpile(transpiler);
        } else
            transpiler.append("null");
        if(last) {
            transpiler.append(",");
            last.transpile(transpiler);
        }
        transpiler.append(")");
    }

    checkIterator(context: Context, section: Section, source: IExpression): IType {
        return CharacterType.instance;
    }

    convertJavaScriptValueToPromptoValue(context: Context, value: any, returnType: IType | null): IValue {
        if (typeof(value) == 'string') {
            return new TextValue(value);
        } else {
            return super.convertJavaScriptValueToPromptoValue(context, value, returnType);
        }
    }

    getMemberMethods(context: Context, id: Identifier): Set<IMethodDeclaration> {
        let decls: IMethodDeclaration[] | null = null;
        switch (id.name) {
            case "startsWith":
                decls = [new StartsWithMethodDeclaration()];
                break;
            case "endsWith":
                decls = [new EndsWithMethodDeclaration()];
                break;
            case "toLowerCase":
                decls = [new ToLowerCaseMethodDeclaration()];
                break;
            case "toUpperCase":
                decls = [new ToUpperCaseMethodDeclaration()];
                break;
            case "toCapitalized":
                decls = [new ToCapitalizedMethodDeclaration()];
                break;
            case "trim":
                decls = [new TrimMethodDeclaration()];
                break;
            case "replace":
                decls = [new ReplaceMethodDeclaration()];
                break;
            case "replaceAll":
                decls = [new ReplaceAllMethodDeclaration()];
                break;
            case "split":
                decls = [new SplitMethodDeclaration()];
                break;
            case "indexOf":
                decls = [new IndexOfMethodDeclaration()];
        }
        if(decls)
            return new Set<IMethodDeclaration>(decls);
        else
                return super.getMemberMethods(context, id);
    }
}


