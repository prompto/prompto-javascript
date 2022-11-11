import ConcreteMethodDeclaration from './ConcreteMethodDeclaration';
import { IType } from '../type';
import { IParameter } from '../param';
import { Operator } from '../grammar';
import { StatementList } from "../statement";
import { IMethodDeclaration } from "./index";
import { Context } from "../runtime";
import { CodeWriter } from "../utils";
export default class OperatorMethodDeclaration extends ConcreteMethodDeclaration {
    operator: Operator;
    constructor(operator: Operator, param: IParameter, returnType: IType | null, stmts: StatementList);
    memberCheck(context: Context, declaration: IMethodDeclaration): void;
    toMDialect(writer: CodeWriter): void;
    toEDialect(writer: CodeWriter): void;
    toODialect(writer: CodeWriter): void;
}
