import PredicateExpression from './PredicateExpression'
import { ArrowExpression } from '../expression'
import {Identifier, IdentifierList} from "../grammar"
import { Dialect } from "../parser"
import {Context, Variable} from "../runtime"
import {IValue} from "../value";
import {CodeWriter} from "../utils";
import IExpression from "../expression/IExpression";
import {ContainerType, IType} from "../type";

export default class ExplicitPredicateExpression extends PredicateExpression {

    itemId: Identifier;
    predicate: IExpression;

    constructor(itemId: Identifier, predicate: IExpression) {
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

    
    filteredToDialect(writer: CodeWriter, source: IExpression): void {
        writer = writer.newChildWriter()
        const sourceType = source.check(writer.context);
        const itemType = (sourceType as unknown as ContainerType).itemType;
        writer.context.registerInstance(new Variable(this.itemId, itemType), true);
        if (writer.dialect == Dialect.O) {
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
        if(writer.dialect == Dialect.O) {
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


    checkFilter(context: Context, itemType: IType): IType {
        const child = context.newChildContext();
        child.registerInstance(new Variable(this.itemId, itemType), true);
        return this.predicate.check(child);
    }

    interpretExpression(context: Context): IValue {
        return this.toArrowExpression().interpretExpression(context);
    }


}
