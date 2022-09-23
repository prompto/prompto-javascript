import {CmpOp, Identifier} from "../grammar";
import {Context, Transpiler} from "../runtime";
import Section from "../parser/Section";
import {Expression} from "../expression";
import {CodeWriter} from "../utils";
import {TypeFamily} from "../store";
import {Value} from "../value";
import {JsonNode} from "../json";

export default interface Type {

    id: Identifier;
    get name(): string;
    family: TypeFamily;

    equals(other: Type): boolean;
    anyfy(): Type;
    resolve(context: Context, param?: any): Type;
    isAssignableFrom(context: Context, other: Type): boolean;
    isMoreSpecificThan(context: Context, itemType: Type): boolean;
    get mutable():boolean;
    asMutable(context: Context, mutable: boolean): Type;

    convertJavaScriptValueToPromptoValue(context: Context, data: any, param?: any): Value;
    declare(transpiler: Transpiler): void;
    toDialect(writer: CodeWriter): void;

    checkExists(context: Context): void;

    checkAdd(context: Context, section: Section, other: Type, tryReverse: boolean): Type;
    declareAdd(transpiler: Transpiler, other: Type, tryReverse: boolean, left: Expression, right: Expression): void;
    transpileAdd(transpiler: Transpiler, other: Type, tryReverse: boolean, left: Expression, right: Expression): void;

    checkMultiply(context: Context, other: Type, tryReverse: boolean): Type;
    declareMultiply(transpiler: Transpiler, other: Type, tryReverse: boolean, left: Expression, right: Expression): void;
    transpileMultiply(transpiler: Transpiler, other: Type, tryReverse: boolean, left: Expression, right: Expression): void;

    checkDivide(context: Context, other: Type): Type;
    declareDivide(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void;
    transpileDivide(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void;

    checkMinus(context: Context): Type;
    declareMinus(transpiler: Transpiler, expression: Expression): void;
    transpileMinus(transpiler: Transpiler, expression: Expression): void;

    checkAnd(context: Context, section: Section, other: Type): Type;
    declareAnd(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void;
    transpileAnd(transpiler: Transpiler, other: Type, left: Expression, right: Expression): void;

    checkCompare(context: Context, section: Section, other: Type): Type;
    declareCompare(transpiler: Transpiler, other: Type): void;
    transpileCompare(transpiler: Transpiler, other: Type, operator: CmpOp, left: Expression, right: Expression): void;

    checkContains(context: Context, section: Section, itemType: Type): Type;
    declareContains(transpiler: Transpiler, itemType: Type, right: Expression, left: Expression): void;
    transpileContains(transpiler: Transpiler, itemType: Type, right: Expression, left: Expression): void;

    checkHasAllOrAny(context: Context, section: Section, itemType: Type): Type;
    declareHasAllOrAny(transpiler: Transpiler, itemType: Type, left: Expression, right: Expression): void;
    transpileHasAllPredicate(transpiler: Transpiler, left: Expression, right: Expression): void;
    transpileHasAnyPredicate(transpiler: Transpiler, left: Expression, right: Expression): void;
    transpileHasAllValue(transpiler: Transpiler, itemType: Type, left: Expression, right: Expression): void;
    transpileHasAnyValue(transpiler: Transpiler, itemType: Type, left: Expression, right: Expression): void;

    readJSONValue(context: Context, node: JsonNode, parts: Map<string, Uint8Array>): Value;

    getStaticMemberValue(context: Context, id: Identifier): Value | null;
}
