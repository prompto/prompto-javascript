import Expression from './Expression.js'
import { AnyType, CursorType, IntegerType } from '../type/index.js'
import { $DataStore, TypeFamily, AttributeInfo, MatchOp } from '../store/index.js'
import { CursorValue } from '../value/index.js'
import { CategoryDeclaration } from '../declaration/index.js'
import { InvalidDataError } from '../error/index.js'
import { Cursor } from "../intrinsic/index.js";

export default class FetchManyExpression extends Expression {

    constructor(typ, first, last, predicate, orderBy) {
        super();
        this.typ = typ;
        this.predicate = predicate;
        this.first = first;
        this.last = last;
        this.orderBy = orderBy;
    }

    toDialect(writer) {
        writer.toDialect(this);
    }

    toEDialect(writer) {
        writer.append("fetch ");
        if(this.first==null)
            writer.append("all ");
        if(this.typ!=null) {
            if(this.typ.mutable)
                writer.append("mutable ");
            writer.append(this.typ.name);
            writer.append(" ");
        }
        if(this.first!=null) {
            this.first.toDialect(writer);
            writer.append(" to ");
            this.last.toDialect(writer);
            writer.append(" ");
        }
        if(this.predicate!=null) {
            writer.append("where ");
            this.predicate.toDialect(writer);
            writer.append(" ");
        }
        if(this.orderBy!=null) {
            this.orderBy.toDialect(writer);
        }
    }

    toODialect(writer) {
        writer.append("fetch ");
        if(this.first==null)
            writer.append("all ");
        if(this.typ!=null) {
            writer.append("( ");
            if(this.typ.mutable)
                writer.append("mutable ");
            writer.append(this.typ.name);
            writer.append(" ) ");
        }
        if(this.first!=null) {
            writer.append("rows ( ");
            this.first.toDialect(writer);
            writer.append(" to ");
            this.last.toDialect(writer);
            writer.append(") ");
        }
        if(this.predicate!=null) {
            writer.append("where ( ");
            this.predicate.toDialect(writer);
            writer.append(") ");
        }
        if(this.orderBy!=null)
            this.orderBy.toDialect(writer);
    }

    toMDialect(writer) {
        writer.append("fetch ");
        if(this.first!=null) {
            writer.append("rows ");
            this.first.toDialect(writer);
            writer.append(" to ");
            this.last.toDialect(writer);
            writer.append(" ");
        } else
            writer.append("all ");
        writer.append("( ");
        if(this.typ!=null) {
            if(this.typ.mutable)
                writer.append("mutable ");
            writer.append(this.typ.name);
            writer.append(" ");
        }
        writer.append(") ");
        if(this.predicate!=null) {
            writer.append(" where ");
            this.predicate.toDialect(writer);
            writer.append(" ");
        }
        if(this.orderBy!=null)
            this.orderBy.toDialect(writer);
    }

    check(context) {
        let typ = this.typ;
        if (typ==null)
            typ = AnyType.instance;
        else {
            const decl = context.getRegisteredDeclaration(this.typ.name);
            if (decl == null  || !(decl instanceof CategoryDeclaration))
                context.problemListener.reportUnknownCategory(typ.id);
            if(!(decl.isStorable && decl.isStorable(context)))
                context.problemListener.reportNotStorable(this.typ.id, this.typ.name);
            context = context.newInstanceContext(null, decl.getType(context), true);
        }
        this.checkFilter(context);
        this.checkOrderBy(context);
        this.checkSlice(context);
        return new CursorType(typ);
    }

    checkFilter(context) {
        if(this.predicate)
            this.predicate.checkQuery(context);
    }

    checkOrderBy(context) {
        if (this.orderBy != null)
            this.orderBy.checkQuery(context);
    }

    checkSlice(context) {
    }

    interpret(context) {
        const store = $DataStore.instance;
        const query = this.buildFetchManyQuery(context, store);
        const typ = this.typ==null ? AnyType.instance : this.typ;
        const cursor = store.fetchMany(query, typ.mutable);
        return new CursorValue(context, typ, cursor.iterable);
    }

    buildFetchManyQuery(context, store) {
        const builder = store.newQueryBuilder();
        builder.setFirst(this.interpretLimit(context, this.first));
        builder.setLast(this.interpretLimit(context, this.last));
        if (this.typ != null) {
            const info = new AttributeInfo("category", TypeFamily.TEXT, true, null);
            builder.verify(info, MatchOp.HAS, this.typ.name);
        }
        if (this.predicate != null)
            this.predicate.interpretQuery(context, builder);
        if (this.typ != null && this.predicate != null)
            builder.and();
        if (this.orderBy != null)
            this.orderBy.interpretQuery(context, builder);
        return builder.build();
    }

    interpretLimit(context, exp) {
        if (exp == null)
            return null;
        const value = exp.interpret(context);
        if(value.type!=IntegerType.instance)
            throw new InvalidDataError("Expecting an Integer, got:" + value.type.name);
        return value.getStorableData();
    }

    declare(transpiler) {
        transpiler.require(Cursor);
        transpiler.require(MatchOp);
        transpiler.require($DataStore);
        transpiler.require(AttributeInfo);
        transpiler.require(TypeFamily);
        if (this.typ)
            this.typ.declare(transpiler);
        if (this.predicate)
            this.predicate.declare(transpiler);
        if (this.first)
            this.first.declare(transpiler);
        if (this.last)
            this.last.declare(transpiler);
        if (this.orderBy)
            this.orderBy.declare(transpiler);
    }

    transpile(transpiler) {
        transpiler.append("(function() {").indent();
        this.transpileQuery(transpiler);
        const mutable = this.typ ? this.typ.mutable : false;
        transpiler.append("return $DataStore.instance.fetchMany(builder.build(), ").append(mutable).append(");").newLine().dedent();
        transpiler.append("})()");
    }

    transpileQuery(transpiler) {
        transpiler.append("var builder = $DataStore.instance.newQueryBuilder();").newLine();
        if (this.typ != null)
            transpiler.append("builder.verify(new AttributeInfo('category', TypeFamily.TEXT, true, null), MatchOp.CONTAINS, '").append(this.typ.name).append("');").newLine();
        if (this.predicate != null)
            this.predicate.transpileQuery(transpiler, "builder");
        if (this.typ != null && this.predicate != null)
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
        if (this.orderBy)
            this.orderBy.transpileQuery(transpiler, "builder");
    }
}

