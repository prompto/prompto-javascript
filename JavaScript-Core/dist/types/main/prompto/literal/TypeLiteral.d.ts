import Literal from './Literal';
import { IType } from '../type';
import { IValue, TypeValue } from '../value';
import { Context, Transpiler } from '../runtime';
import { CodeWriter } from "../utils";
export default class TypeLiteral extends Literal<TypeValue> {
    constructor(type: IType);
    check(context: Context): IType;
    interpretExpression(context: Context): IValue;
    toDialect(writer: CodeWriter): void;
    parentToDialect(writer: CodeWriter): void;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    declareParent(transpiler: Transpiler): void;
    transpileParent(transpiler: Transpiler): void;
}
