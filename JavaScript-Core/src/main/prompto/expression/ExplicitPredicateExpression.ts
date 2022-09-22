import PredicateExpression from './PredicateExpression'
import { ArrowExpression } from '../expression'
import { IdentifierList } from "../grammar"
import { Dialect } from "../parser"
import { Variable } from "../runtime"

export default class ExplicitPredicateExpression extends PredicateExpression {

    constructor(itemId, predicate) {
        super();
        this.itemId = itemId;
        this.predicate = predicate;
    }


    toArrowExpression() {
        const arrow = new ArrowExpression(new IdentifierList(this.itemId), null, null);
        arrow.setExpression(this.predicate);
        return arrow;
    }

    toString() {
        return "" + this.itemId + " where " + this.predicate.toString();
    }

    
    filteredToDialect(writer, source) {
        writer = writer.newChildWriter()
        const sourceType = source.check(writer.context);
        const itemType = sourceType.itemType;
        writer.context.registerValue(new Variable(this.itemId, itemType));
        if (writer.dialect === Dialect.O) {
            writer.append("filtered (");
            source.toDialect(writer);
            writer.append(") with (")
                .append(this.itemId.name)
                .append(") where (");
            this.predicate.toDialect(writer);
            writer.append(")");
        } else {
            source.toDialect(writer);
            writer.append(" filtered with ")
                .append(this.itemId.name)
                .append(" where ");
            this.predicate.toDialect(writer);
        }
    }


    containsToDialect(writer: CodeWriter): void {
        if(writer.dialect === Dialect.O) {
            writer.append(" (")
                .append(this.itemId.name)
                .append(") where (");
            this.predicate.toDialect(writer);
            writer.append(")");
        } else {
            writer.append(" ")
                .append(this.itemId.name)
                .append(" where ");
            this.predicate.toDialect(writer);
        }
    }


    checkFilter(context, itemType) {
        const child = context.newChildContext();
        child.registerValue(new Variable(this.itemId, itemType));
        return this.predicate.check(child);
    }

    interpret(context: Context): Value {
        return this.toArrowExpression().interpret(context);
    }


}
