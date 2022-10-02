import FetchOneExpression from './FetchOneExpression'
import {AnyType, CursorType, IntegerType, IType} from '../type'
import {$DataStore, TypeFamily, AttributeInfo, MatchOp, Store} from '../store'
import {CursorValue, IValue} from '../value'
import { CategoryDeclaration } from '../declaration'
import { InvalidDataError } from '../error'
import { Cursor } from "../intrinsic";
import {Context, Transpiler} from "../runtime";
import {CodeWriter} from "../utils";
import {IExpression, IPredicate} from "./index";
import {IdentifierList, OrderByClauseList} from "../grammar";
import IQuery from "../store/IQuery";

export default class FetchManyExpression extends FetchOneExpression {

    first: IExpression | null;
    last: IExpression | null;
    orderBy: OrderByClauseList | null;

    constructor(type: IType | null, first: IExpression | null, last: IExpression | null, predicate: IExpression | null, include: IdentifierList | null, orderBy: OrderByClauseList | null) {
        super(type,  predicate,  include);
        this.first = first;
        this.last = last;
        this.orderBy = orderBy;
    }

    toDialect(writer: CodeWriter): void {
        writer.toDialect(this);
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("fetch ");
        if(this.first==null)
            writer.append("all ");
        if(this.type!=null) {
            if(this.type.mutable)
                writer.append("mutable ");
            writer.append(this.type.name);
            writer.append(" ");
        }
        if(this.first!=null) {
            this.first.toDialect(writer);
            writer.append(" to ");
            this.last!.toDialect(writer);
            writer.append(" ");
        }
        if(this.predicate!=null) {
            writer.append("where ");
            this.predicate.toDialect(writer);
            writer.append(" ");
        }
        if(this.include!=null) {
            writer.append(" include ");
            if (this.include.length == 1)
                writer.append(this.include[0].name);
            else {
                for(let i = 0; i < this.include.length - 1; i++) {
                    writer.append(this.include[i].name).append(", ");
                    writer.trimLast(", ".length);
                    writer.append(" and ");
                    writer.append(this.include[this.include.length - 1].name);
                }
            }
        }
        if (this.orderBy != null) {
            this.orderBy.toDialect(writer);
        }
    }

    toODialect(writer: CodeWriter): void {
        writer.append("fetch ");
        if(this.first==null)
            writer.append("all ");
        if(this.type!=null) {
            writer.append("( ");
            if(this.type.mutable)
                writer.append("mutable ");
            writer.append(this.type.name);
            writer.append(" ) ");
        }
        if(this.first!=null) {
            writer.append("rows ( ");
            this.first.toDialect(writer);
            writer.append(" to ");
            this.last!.toDialect(writer);
            writer.append(") ");
        }
        if(this.predicate!=null) {
            writer.append("where ( ");
            this.predicate.toDialect(writer);
            writer.append(") ");
        }
        if(this.include != null) {
            writer.append("include (");
            this.include.forEach(id => writer.append(id.name).append(", "));
            writer.trimLast(", ".length);
            writer.append(") ");
        }
        if(this.orderBy!=null)
            this.orderBy.toDialect(writer);
    }

    toMDialect(writer: CodeWriter): void {
        writer.append("fetch ");
        if(this.first!=null) {
            writer.append("rows ");
            this.first.toDialect(writer);
            writer.append(" to ");
            this.last!.toDialect(writer);
            writer.append(" ");
        } else
            writer.append("all ");
        writer.append("( ");
        if(this.type!=null) {
            if(this.type.mutable)
                writer.append("mutable ");
            writer.append(this.type.name);
            writer.append(" ");
        }
        writer.append(") ");
        if(this.predicate!=null) {
            writer.append(" where ");
            this.predicate.toDialect(writer);
            writer.append(" ");
        }
        if(this.include != null) {
            writer.append("include ");
            this.include.forEach(id => writer.append(id.name).append(", "));
            writer.trimLast(", ".length);
            writer.append(" ");
        }
        if(this.orderBy!=null)
            this.orderBy.toDialect(writer);
    }

    check(context: Context): IType {
        let type = this.type;
        if (!type)
            type = AnyType.instance;
        else {
            const decl = context.getRegistered(this.type!.id);
            if(decl instanceof CategoryDeclaration) {
                if (decl.isStorable(context))
                    context = context.newInstanceContext(null, decl.getType(context), true);
                else
                    context.problemListener.reportNotStorable(type.id, type.name);
            } else
                context.problemListener.reportUnknownCategory(type.id, type.name);
        }
        this.checkPredicate(context);
        this.checkInclude(context);
        this.checkOrderBy(context);
        this.checkSlice(context);
        return new CursorType(type);
    }

    checkPredicate(context: Context) {
        if(this.predicate?.isPredicate() )
            (this.predicate as IPredicate).checkQuery(context);
    }

    checkInclude(context: Context) {
        // TODO
    }

    checkOrderBy(context: Context) {
        if (this.orderBy != null)
            this.orderBy.checkQuery(context);
    }

    checkSlice(context: Context) {
        // TODO
    }

    interpretExpression(context: Context): IValue {
        const store = $DataStore.instance;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const query = this.buildFetchManyQuery(context, store);
        const type = this.type || AnyType.instance;
        const cursor = store.fetchMany(query);
        return new CursorValue(context, type, cursor);
    }

    buildFetchManyQuery(context: Context, store: Store): IQuery {
        const builder = store.newQueryBuilder();
        builder.first(this.interpretLimit(context, this.first));
        builder.last(this.interpretLimit(context, this.last));
        if (this.type != null) {
            const info = new AttributeInfo("category", TypeFamily.TEXT, true, null);
            builder.verify(info, MatchOp.HAS, this.type.name);
        }
        if (this.predicate)
            (this.predicate as IPredicate).interpretQuery(context, builder);
        if (this.type != null && this.predicate != null)
            builder.and();
        if (this.include)
            builder.project(this.include.map(id => id.name));
        if (this.orderBy != null)
            this.orderBy.interpretQuery(context, builder);
        return builder.build();
    }

    interpretLimit(context: Context, exp: IExpression | null) {
        if (exp == null)
            return null;
        const value = exp.interpretExpression(context);
        if(value.type!=IntegerType.instance)
            throw new InvalidDataError("Expecting an Integer, got:" + value.type.name);
        return value.getStorableData() as number;
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(Cursor);
        transpiler.require(MatchOp);
        transpiler.require($DataStore);
        transpiler.require(AttributeInfo);
        transpiler.require(TypeFamily);
        if (this.type)
            this.type.declare(transpiler);
        if (this.predicate)
            this.predicate.declare(transpiler);
        if (this.first)
            this.first.declare(transpiler);
        if (this.last)
            this.last.declare(transpiler);
        if (this.orderBy)
            this.orderBy.declare(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("(function() {").indent();
        this.transpileQuery(transpiler);
        const mutable = this.type ? this.type.mutable : false;
        transpiler.append("return $DataStore.instance.fetchMany(builder.build(), ").appendBoolean(mutable).append(");").newLine().dedent();
        transpiler.append("})()");
    }

    transpileQuery(transpiler: Transpiler) {
        transpiler.append("var builder = $DataStore.instance.newQueryBuilder();").newLine();
        if (this.type != null)
            transpiler.append("builder.verify(new AttributeInfo('category', TypeFamily.TEXT, true, null), MatchOp.CONTAINS, '").append(this.type.name).append("');").newLine();
        if (this.predicate)
            (this.predicate as IPredicate).transpileQuery(transpiler, "builder");
        if (this.type != null && this.predicate != null)
            transpiler.append("builder.and();").newLine();
        if (this.first) {
            transpiler.append("builder.setFirst(");
            this.first.transpile(transpiler);
            transpiler.append(");").newLine();
        }
        if (this.last) {
            transpiler.append("builder.setLast(");
            this.last.transpile(transpiler);
            transpiler.append(");").newLine();
        }
        if (this.include != null) {
            transpiler.append("builder.project([");
            this.include.forEach(id => transpiler.append('"').append(id.name).append('"').append(", "));
            transpiler.trimLast(", ".length);
            transpiler.append("]);").newLine();
        }
        if (this.orderBy)
            this.orderBy.transpileQuery(transpiler, "builder");
    }
}

