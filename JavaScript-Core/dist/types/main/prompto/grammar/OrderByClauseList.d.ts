import ObjectList from '../utils/ObjectList';
import { CodeWriter } from "../utils";
import { OrderByClause } from "./index";
import { Context, Transpiler } from "../runtime";
import { IQueryBuilder } from "../store";
export default class OrderByClauseList extends ObjectList<OrderByClause> {
    constructor(clauses?: OrderByClause[], clause?: OrderByClause);
    toDialect(writer: CodeWriter): void;
    checkQuery(context: Context): void;
    interpretQuery(context: Context, query: IQueryBuilder): void;
    declare(transpiler: Transpiler): void;
    transpileQuery(transpiler: Transpiler, builderName: string): void;
}
