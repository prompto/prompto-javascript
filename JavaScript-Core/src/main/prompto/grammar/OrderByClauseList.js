import ObjectList from '../utils/ObjectList.js'
import { Dialect } from '../parser/index.js'

export default class OrderByClauseList extends ObjectList {

    constructor(clause) {
        super(null, clause);
   }

    toDialect(writer) {
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

    checkQuery(context) {
        this.forEach(clause => {
            clause.checkQuery(context);
        });
    }

    interpretQuery(context, query) {
        this.forEach(clause => {
            clause.interpretQuery(context, query);
        });
    }

    declare(transpiler) {
        this.forEach(clause => {
            clause.declare(transpiler);
        });
    }

    transpileQuery(transpiler, builder) {
        this.forEach(clause => {
            clause.transpileQuery(transpiler, builder);
        });
    }
}
