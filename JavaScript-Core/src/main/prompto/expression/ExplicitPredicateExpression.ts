import PredicateExpression from './PredicateExpression'
import { ArrowExpression } from '../expression'
import {Identifier, IdentifierList} from "../grammar"
import { Dialect } from "../parser"
import {Context, Variable} from "../runtime"
import {Value} from "../value";
import {CodeWriter} from "../utils";
import Expression from "./Expression";
import {ContainerType, Type} from "../type";

export default class ExplicitPredicateExpression extends PredicateExpression {

    itemId: Identifier;
    predicate: Expression;

    constructor(itemId: Identifier, predicate: Expression) {
        super();
        this.itemId = itemId;
        this.predicate = predicate;
    }


    toArrowExpression(): ArrowExpression {
        const arrow = new ArrowExpression(new IdentifierList(null, this.itemId), null, null);
        arrow.setExpression(this.predicate);
        return arrow;
    }

    toString() {
        return "" + this.itemId + " where " + this.predicate.toString();
    }

    
    filteredToDialect(writer: CodeWriter, source: Expression): void {
        writer = writer.newChildWriter()
        const sourceType = source.check(writer.context);
        const itemType = (sourceType as unknown as ContainerType).itemType;
        writer.context.registerInstance(new Variable(this.itemId, itemType), true);
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


    checkFilter(context: Context, itemType: Type): Type {
        const child = context.newChildContext();
        child.registerInstance(new Variable(this.itemId, itemType), true);
        return this.predicate.check(child);
    }

    interpret(context: Context): Value {
        return this.toArrowExpression().interpret(context);
    }


}
