import EnumSymbol from './EnumSymbol';
import { IValue, ConcreteInstance } from '../value';
import { ArgumentList, Identifier } from '../grammar';
import { CodeWriter } from "../utils";
import { CategoryType, EnumeratedCategoryType } from "../type";
import { Context, Transpiler } from "../runtime";
export default class CategorySymbol extends EnumSymbol<EnumeratedCategoryType> {
    args: ArgumentList;
    instance?: ConcreteInstance;
    constructor(id: Identifier, args: ArgumentList);
    toDialect(writer: CodeWriter): void;
    getType(context: Context): CategoryType;
    toString(): string;
    check(context: Context): CategoryType;
    interpretExpression(context: Context): IValue;
    makeInstance(context: Context): ConcreteInstance;
    getMemberValue(context: Context, id: Identifier, autoCreate?: boolean): IValue;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    initialize(transpiler: Transpiler): void;
    initializeError(transpiler: Transpiler): void;
}
