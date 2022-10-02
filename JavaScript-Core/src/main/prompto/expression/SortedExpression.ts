import BaseExpression from './BaseExpression'
import {UnresolvedIdentifier, ArrowExpression, InstanceExpression, IExpression} from './index'
import {CategoryType, ContainerType, DocumentType, IterableType, IType, ListType, SetType, VoidType} from '../type'
import {Container, IValue, ListValue, NullValue} from '../value'
import { List } from '../intrinsic'
import { NullReferenceError, InternalError } from '../error'
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import {Section} from "../parser";

export default class SortedExpression extends BaseExpression {

    source: IExpression;
    descending: boolean;
    key: IExpression | null;

    constructor(source: IExpression, descending: boolean, key: IExpression | null) {
        super();
        this.source = source;
        this.descending = descending;
        this.key = key;
    }

    toString() {
        return "sorted " + (this.descending ? "descending " : "") + this.source.toString() +
            (this.key ? " with " + this.key.toString() + " as key" : "");
    }

    toDialect(writer: CodeWriter): void {
        writer.toDialect(this);
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("sorted ");
        if (this.descending)
            writer.append("descending ");
        this.source.toDialect(writer);
        if (this.key) {
            const itemType = this.getItemType(writer.context);
            writer = this.contextualizeWriter(writer, itemType);
            writer.append(" with ");
            let keyExp = this.key;
            if (keyExp instanceof UnresolvedIdentifier) try {
                keyExp = keyExp.resolve(writer.context, false, false)!;
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

    getItemType(context: Context): IType {
        const type = this.source.check(context);
        return type instanceof ContainerType ? type.itemType : VoidType.instance;
    }

    toODialect(writer: CodeWriter): void {
        writer.append("sorted ");
        if (this.descending)
            writer.append("desc ");
        writer.append("(");
        this.source.toDialect(writer);
        if (this.key != null) {
            const type = this.source.check(writer.context);
            const itemType = (type as IterableType).itemType;
            writer = this.contextualizeWriter(writer, itemType);
            writer.append(", key = ");
            this.key.toDialect(writer);
        }
        writer.append(")");
    }

    toMDialect(writer: CodeWriter): void {
        this.toODialect(writer);
    }

    contextualizeWriter(writer: CodeWriter, itemType: IType): CodeWriter {
        if (itemType instanceof CategoryType)
            return writer.newInstanceWriter(itemType);
        else if (itemType instanceof DocumentType)
            return writer.newDocumentWriter();
        else
            return writer;
    }

    check(context: Context): IType {
        const type = this.source.check(context);
        if (!(type instanceof ListType || type instanceof SetType)) {
            context.problemListener.reportCannotSort(this.asSection(), this.source);
        }
        return type;
    }

    interpretExpression(context: Context): IValue {
        const itemType = this.getItemType(context);
        const value = this.source.interpretExpression(context);
        if (!value || value==NullValue.instance) {
            throw new NullReferenceError();
        }
        if (!(value instanceof Container)) {
            throw new InternalError("Unexpected type:" + typeof (value));
        }
        const items = value.items;
        if (items.length > 1) {
            const cmp = itemType.getSortedComparator(context, this.descending, this.key);
            items.sort(cmp);
        }
        return new ListValue(itemType, false, items);
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(List);
        this.source.declare(transpiler);
        const itemType = this.getItemType(transpiler.context);
        itemType.declareSorted(transpiler, this.key);
    }

    transpile(transpiler: Transpiler): void {
        this.source.transpile(transpiler);
        transpiler.append(".sorted(");
        const itemType = this.getItemType(transpiler.context);
        itemType.transpileSortedComparator(transpiler, this.key, this.descending);
        transpiler.append(")");
    }

    asSection(): Section {
        return this.source instanceof Section ? this.source : this;
    }
}
