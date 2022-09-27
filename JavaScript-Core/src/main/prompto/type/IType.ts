import {CmpOp, Identifier} from "../grammar";
import {Context, Transpiler} from "../runtime";
import Section from "../parser/Section";
import {IExpression} from "../expression";
import {CodeWriter} from "../utils";
import {TypeFamily} from "../store";
import {IValue} from "../value";
import {JsonNode} from "../json";

export default interface IType {

    id: Identifier;
    get name(): string;
    family: TypeFamily;

    getTranspiledName(context: Context): string;

    equals(other: IType): boolean;
    anyfy(): IType;
    resolve(context: Context, param?: any): IType;
    isAssignableFrom(context: Context, other: IType): boolean;
    isMoreSpecificThan(context: Context, itemType: IType): boolean;
    get mutable():boolean;
    asMutable(context: Context, mutable: boolean): IType;

    readJSONValue(context: Context, node: JsonNode, parts: Map<string, Uint8Array>): IValue;
    convertJavaScriptValueToPromptoValue(context: Context, data: any, param?: any): IValue;
    declare(transpiler: Transpiler): void;
    toDialect(writer: CodeWriter): void;

    checkExists(context: Context): void;

    checkAdd(context: Context, section: Section, other: IType, tryReverse: boolean): IType;
    declareAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void;
    transpileAdd(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void;

    checkMultiply(context: Context, other: IType, tryReverse: boolean): IType;
    declareMultiply(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void;
    transpileMultiply(transpiler: Transpiler, other: IType, tryReverse: boolean, left: IExpression, right: IExpression): void;

    checkDivide(context: Context, other: IType): IType;
    declareDivide(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void;
    transpileDivide(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void;

    checkIntDivide(context: Context, other: IType): IType;
    declareIntDivide(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void;
    transpileIntDivide(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void;

    checkMinus(context: Context): IType;
    declareMinus(transpiler: Transpiler, expression: IExpression): void;
    transpileMinus(transpiler: Transpiler, expression: IExpression): void;

    checkAnd(context: Context, section: Section, other: IType): IType;
    declareAnd(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void;
    transpileAnd(transpiler: Transpiler, other: IType, left: IExpression, right: IExpression): void;

    checkCompare(context: Context, section: Section, other: IType): IType;
    declareCompare(transpiler: Transpiler, other: IType): void;
    transpileCompare(transpiler: Transpiler, other: IType, operator: CmpOp, left: IExpression, right: IExpression): void;

    checkContains(context: Context, section: Section, itemType: IType): IType;
    declareContains(transpiler: Transpiler, itemType: IType, right: IExpression, left: IExpression): void;
    transpileContains(transpiler: Transpiler, itemType: IType, right: IExpression, left: IExpression): void;

    checkHasAllOrAny(context: Context, section: Section, itemType: IType): IType;
    declareHasAllOrAny(transpiler: Transpiler, itemType: IType, left: IExpression, right: IExpression): void;
    transpileHasAllPredicate(transpiler: Transpiler, itemType: IType, left: IExpression, right: IExpression): void;
    transpileHasAnyPredicate(transpiler: Transpiler, itemType: IType, left: IExpression, right: IExpression): void;
    transpileHasAllValue(transpiler: Transpiler, itemType: IType, left: IExpression, right: IExpression): void;
    transpileHasAnyValue(transpiler: Transpiler, itemType: IType, left: IExpression, right: IExpression): void;

    checkMember(context: Context, section: Section, id: Identifier): IType;
    checkStaticMember(context: Context, section: Section, id: Identifier): IType;
    getStaticMemberValue(context: Context, id: Identifier): IValue;

    checkItem(context: Context, section: Section, itemType: IType): IType;
    declareItem(transpiler: Transpiler, itemType: IType, item: IExpression): void;
    transpileItem(transpiler: Transpiler, itemType: IType, item: IExpression): void;


    checkIterator(context: Context, section: Section, source: IExpression): IType;
    declareIterator(transpiler: Transpiler, id: Identifier, expression: IExpression): void;
    transpileIterator(transpiler: Transpiler, id: Identifier, expression: IExpression): void;
}
