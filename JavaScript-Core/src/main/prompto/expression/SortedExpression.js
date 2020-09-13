import Expression from "./Expression"
import { UnresolvedIdentifier, ArrowExpression, InstanceExpression } from "./index"
import { CategoryType, DocumentType, ListType, SetType } from "../type/index"
import { ListValue, SetValue } from "../value/index"
import { List } from "../intrinsic/index"
import { SyntaxError, NullReferenceError, InternalError } from "../error/index"

export default class SortedExpression extends Expression {
 
    constructor(source, desc, key) {
        super();
        this.source = source;
        this.desc = desc;
        this.key = key || null;
    }

    toString() {
        return "sorted " + (this.desc ? "descending " : "") + this.source.toString() +
            (this.key == null ? "" : " with " + this.key.toString() + " as key");
    }

    toDialect(writer) {
        writer.toDialect(this);
    }

    toEDialect(writer) {
        writer.append("sorted ");
        if (this.desc)
            writer.append("descending ");
        this.source.toDialect(writer);
        if (this.key != null) {
            const type = this.source.check(writer.context);
            const itemType = type.itemType;
            writer = this.contextualizeWriter(writer, itemType);
            writer.append(" with ");
            let keyExp = this.key;
            if (keyExp instanceof UnresolvedIdentifier) try {
                keyExp = keyExp.resolve(writer.context, false);
            } catch (e) {
                // TODO add warning
            }
            if (keyExp instanceof ArrowExpression) {
                keyExp.registerArrowArgs(writer.context, itemType);
                keyExp.toDialect(writer);
            } else if (keyExp instanceof InstanceExpression)
                keyExp.toDialect(writer, false);
            else
                keyExp.toDialect(writer);
            writer.append(" as key");
        }
    }

    toODialect(writer) {
        writer.append("sorted ");
        if (this.desc)
            writer.append("desc ");
        writer.append("(");
        this.source.toDialect(writer);
        if (this.key != null) {
            const type = this.source.check(writer.context);
            const itemType = type.itemType;
            writer = this.contextualizeWriter(writer, itemType);
            writer.append(", key = ");
            this.key.toDialect(writer);
        }
        writer.append(")");
    }

    toMDialect(writer) {
        this.toODialect(writer);
    }

    contextualizeWriter(writer, itemType) {
        if (itemType instanceof CategoryType)
            return writer.newInstanceWriter(itemType);
        else if (itemType instanceof DocumentType)
            return writer.newDocumentWriter();
        else
            return writer;
    }

    check(context) {
        const type = this.source.check(context);
        if (!(type instanceof ListType || type instanceof SetType)) {
            context.problemListener.reportCannotSort(this.source);
        }
        return type;
    }

    interpret(context) {
        const type = this.source.check(context);
        if (!(type instanceof ListType || type instanceof SetType)) {
            throw new SyntaxError("Unsupported type: " + type);
        }
        const coll = this.source.interpret(context);
        if (coll == null) {
            throw new NullReferenceError();
        }
        if (!(coll instanceof ListValue || coll instanceof SetValue)) {
            throw new InternalError("Unexpected type:" + typeof (coll));
        }
        let items = coll instanceof ListValue ? coll.items : coll.items.set.values();
        items = Array.from(items);
        const itemType = type.itemType;
        if (items.length > 1) {
            const cmp = itemType.getSortedComparator(context, this.key, this.desc);
            items.sort(cmp);
        }
        return new ListValue(itemType, items);
    }

    declare(transpiler) {
        transpiler.require(List);
        this.source.declare(transpiler);
        const type = this.source.check(transpiler.context);
        type.itemType.declareSorted(transpiler, this.key);
    }

    transpile(transpiler) {
        const type = this.source.check(transpiler.context);
        this.source.transpile(transpiler);
        transpiler.append(".sorted(");
        type.itemType.transpileSortedComparator(transpiler, this.key, this.desc);
        transpiler.append(")");
    }
}
