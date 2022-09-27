import ObjectList from '../utils/ObjectList'
import { Dialect } from '../parser'
import {CodeWriter} from "../utils";
import {OrderByClause} from "./index";
import {Context, Transpiler} from "../runtime";
import {IQueryBuilder} from "../store";

export default class OrderByClauseList extends ObjectList<OrderByClause> {

    constructor(clauses: OrderByClause[], clause: OrderByClause) {
        super(clauses, clause);
   }

    toDialect(writer: CodeWriter): void {
        writer.append("order by ");
        if(writer.dialect==Dialect.O)
            writer.append("( ");
        this.forEach(clause => {
            clause.toDialect(writer);
            writer.append(", ");
        });
        writer.trimLast(2);
        if(writer.dialect==Dialect.O)
            writer.append(" )");
    }

    checkQuery(context: Context) {
        this.forEach(clause => {
            clause.checkQuery(context);
        });
    }

    interpretQuery(context: Context, query: IQueryBuilder) {
        this.forEach(clause => {
            clause.interpretQuery(context, query);
        });
    }

    declare(transpiler: Transpiler): void {
        this.forEach(clause => {
            clause.declare(transpiler);
        });
    }

    transpileQuery(transpiler: Transpiler, builderName: string) {
        this.forEach(clause => {
            clause.transpileQuery(transpiler, builderName);
        });
    }
}
