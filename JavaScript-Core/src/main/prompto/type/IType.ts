import {CmpOp, Identifier} from "../grammar";
import {Context, Transpiler} from "../runtime";
import Section from "../parser/Section";
import {ArrowExpression, IExpression, PredicateExpression} from "../expression";
import {CodeWriter} from "../utils";
import {TypeFamily} from "../store";
import {IValue} from "../value";
import {JsonNode} from "../json";
import MethodType from "./MethodType";
import {IMethodDeclaration} from "../declaration";

export default interface IType {


    id: Identifier;
    get name(): string;
    family: TypeFamily;

    get mutable():boolean;
    asMutable(context: Context, mutable: boolean): IType;

    getTranspiledName(context: Context): string;
    getMemberMethods(context: Context, id: Identifier): Set<IMethodDeclaration>;
    getStaticMemberMethods(context: Context, id: Identifier): Set<IMethodDeclaration>;

    anyfy(): IType;
    resolve(context: Context, onError?: (type: IType) => void): IType;

    equals(other: IType): boolean;
    isMoreSpecificThan(context: Context, other: IType): boolean;

    isStorable(context: Context): boolean;

    readJSONValue(context: Context, node: JsonNode, parts: Map<string, Uint8Array>): IValue;
    convertJavaScriptValueToPromptoValue(context: Context, data: any, param?: any): IValue;
    toDialect(writer: CodeWriter): void;

    checkExists(context: Context): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;

    checkAssignableFrom(context: Context, section: Section, other: IType): void;
    isAssignableFrom(context: Context, other: IType): boolean;

    checkAdd(context: Context, section: Section, other: IType, tryReverse: boolean): IType;
    declareAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void;
    transpileAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void;

    checkSubtract(context: Context, section: Section, rt: IType): IType;
    declareSubtract(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void;
    transpileSubtract(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void;

    checkMultiply(context: Context, section: Section, other: IType, tryReverse: boolean): IType;
    declareMultiply(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void;
    transpileMultiply(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void;

    checkDivide(context: Context, section: Section, other: IType): IType;
    declareDivide(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void;
    transpileDivide(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void;

    checkIntDivide(context: Context, section: Section, other: IType): IType;
    declareIntDivide(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void;
    transpileIntDivide(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void;

    checkModulo(context: Context, section: Section, other: IType): IType;
    declareModulo(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void;
    transpileModulo(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void;

    checkMinus(context: Context, section: Section): IType;
    declareMinus(transpiler: Transpiler, expression: IExpression): void;
    transpileMinus(transpiler: Transpiler, expression: IExpression): void;

    checkAnd(context: Context, section: Section, other: IType): IType;
    declareAnd(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void;
    transpileAnd(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void;

    checkOr(context: Context, section: Section, other: IType): IType;

    checkNot(context: Context, section: Section): IType;

    checkCompare(context: Context, section: Section, other: IType): IType;
    declareCompare(transpiler: Transpiler, other: IType): void;
    transpileCompare(transpiler: Transpiler, other: IType, operator: CmpOp, left: IExpression, right: IExpression): void;

    checkContains(context: Context, section: Section, itemType: IType): IType;
    declareContains(transpiler: Transpiler, itemType: IType, right: IExpression, left: IExpression): void;
    transpileContains(transpiler: Transpiler, itemType: IType, right: IExpression, left: IExpression): void;

    checkHasAllOrAny(context: Context, section: Section, other: IType): IType;
    declareHasAllOrAny(transpiler: Transpiler, other: IType, container: IExpression, items: IExpression): void;
    transpileHasAllPredicate(transpiler: Transpiler, other: IType, container: IExpression, items: IExpression): void;
    transpileHasAnyPredicate(transpiler: Transpiler, other: IType, container: IExpression, items: IExpression): void;
    transpileHasAllValue(transpiler: Transpiler, other: IType, container: IExpression, items: IExpression): void;
    transpileHasAnyValue(transpiler: Transpiler, other: IType, container: IExpression, items: IExpression): void;

    checkMember(context: Context, section: Section, member: Identifier): IType;
    declareMember(transpiler: Transpiler, member: Identifier): void;
    transpileMember(transpiler: Transpiler, member: Identifier): void;

    checkStaticMember(context: Context, section: Section, member: Identifier): IType;
    declareStaticMember(transpiler: Transpiler, member: Identifier): void;
    transpileStaticMember(transpiler: Transpiler, member: Identifier): void;
    getStaticMemberValue(context: Context, member: Identifier): IValue;

    checkItem(context: Context, section: Section, itemType: IType): IType;
    declareItem(transpiler: Transpiler, itemType: IType, item: IExpression): void;
    transpileItem(transpiler: Transpiler, itemType: IType, item: IExpression): void;

    checkIterator(context: Context, section: Section, source: IExpression): IType;
    declareIterator(transpiler: Transpiler, id: Identifier, expression: IExpression): void;
    transpileIterator(transpiler: Transpiler, id: Identifier, expression: IExpression): void;

    checkSlice(context: Context, section: Section): IType;
    declareSlice(transpiler: Transpiler, first: IExpression | null, last: IExpression | null): void;
    transpileSlice(transpiler: Transpiler, first: IExpression | null, last: IExpression | null): void;

    checkRange(context: Context, section: Section, lastType: IType): IType;
    declareRange(transpiler: Transpiler, lastType: IType): void;
    transpileRange(transpiler: Transpiler, lastType: IType, first: IExpression, last: IExpression): void;
    newRange(first: IValue, last: IValue): IValue;

    checkArrowExpression(ctx: Context, section: Section, arrow: ArrowExpression): MethodType;

    getSortedComparator(context: Context, descending: boolean, key: IExpression | null): (v1: IValue, v2: IValue) => number;
    transpileSortedComparator(transpiler: Transpiler, key: IExpression | null, descending: boolean): void;
    declareSorted(transpiler: Transpiler, key: IExpression | null): void;

    transpileAssignItemValue(transpiler: Transpiler, item: IExpression, expression: IExpression): void;
    transpileAssignMemberValue(transpiler: Transpiler, member: Identifier, expression: IExpression): void;
    transpileAssignMember(transpiler: Transpiler, member: Identifier): void;

    transpileJsxCode(transpiler: Transpiler, expression: IExpression): void;

}
