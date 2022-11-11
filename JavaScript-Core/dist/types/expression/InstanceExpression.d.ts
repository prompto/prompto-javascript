import BaseExpression from './BaseExpression';
import { IPredicate } from './index';
import { Transpiler, Context } from '../runtime';
import { AttributeDeclaration } from '../declaration';
import { IType } from '../type';
import { IValue } from '../value';
import { Identifier } from '../grammar';
import { CodeWriter } from "../utils";
import { IQueryBuilder } from "../store";
export default class InstanceExpression extends BaseExpression {
    id: Identifier;
    constructor(id: Identifier);
    get name(): string;
    toString(): string;
    declare(transpiler: Transpiler): void;
    transpile(transpiler: Transpiler): void;
    toDialect(writer: CodeWriter, requireMethod?: boolean): void;
    requiresMethod(writer: CodeWriter): boolean;
    check(context: Context): IType;
    checkAttribute(context: Context): AttributeDeclaration | null;
    checkQuery(context: Context): IType;
    interpretExpression(context: Context): IValue;
    toPredicate(context: Context): IPredicate | null;
    interpretQuery(context: Context, builder: IQueryBuilder): void;
    declareQuery(transpiler: Transpiler): void;
    transpileQuery(transpiler: Transpiler, builderName: string): void;
}
