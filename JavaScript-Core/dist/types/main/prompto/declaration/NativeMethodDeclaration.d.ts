import ConcreteMethodDeclaration from './ConcreteMethodDeclaration';
import { IValue } from '../value';
import { IType } from '../type';
import { Context } from "../runtime";
import { Identifier } from "../grammar";
import { StatementList } from "../statement";
import { ParameterList } from "../param";
import { CodeWriter } from "../utils";
export default class NativeMethodDeclaration extends ConcreteMethodDeclaration {
    constructor(id: Identifier, params: ParameterList, returnType: IType, statements: StatementList);
    check(context: Context, isStart: boolean): IType;
    interpret(context: Context): IValue;
    castToReturnType(context: Context, value: IValue | null): IValue;
    toMDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
    toEDialect(writer: CodeWriter): void;
}
