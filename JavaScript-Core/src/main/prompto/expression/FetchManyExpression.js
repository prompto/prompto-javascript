import Expression from './Expression.js'
import { AnyType, CursorType, IntegerType } from '../type/index.js'
import { $DataStore, TypeFamily, AttributeInfo, MatchOp } from '../store/index.js'
import { CursorValue } from '../value/index.js'
import { CategoryDeclaration } from '../declaration/index.js'
import { InvalidDataError } from '../error/index.js'
import { Cursor } from "../intrinsic/index.js";

export default class FetchManyExpression extends Expression {

    constructor(type, first, last, predicate, include, orderBy) {
        super();
        this.type = type;
        this.predicate = predicate;
        this.first = first;
        this.last = last;
        this.include = include;
        this.orderBy = orderBy;
    }

    toDialect(writer) {
        writer.toDialect(this);
    }

    toEDialect(writer) {
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
            this.last.toDialect(writer);
            writer.append(" ");
        }
        if(this.predicate!=null) {
            writer.append("where ");
            this.predicate.toDialect(writer);
            writer.append(" ");
        }
        if(this.include!=null) {
            writer.append(" include ");
            if (this.include.length === 1)
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

    toODialect(writer) {
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
            this.last.toDialect(writer);
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

    check(context) {
        let type = this.type;
        if (type==null)
            type = AnyType.instance;
        else {
            const decl = context.getRegisteredDeclaration(this.type.name);
            if (decl == null  || !(decl instanceof CategoryDeclaration))
                context.problemListener.reportUnknownCategory(type.id, type.name);
            if(!(decl.isStorable && decl.isStorable(context)))
                context.problemListener.reportNotStorable(this.type.id, this.type.name);
            context = context.newInstanceContext(null, decl.getType(context), true);
        }
        this.checkPredicate(context);
        this.checkInclude(context);
        this.checkOrderBy(context);
        this.checkSlice(context);
        return new CursorType(type);
    }

    checkPredicate(context) {
        if(this.predicate)
            this.predicate.checkQuery(context);
    }

    checkInclude(context) {
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
        const type = this.type || AnyType.instance;
        const cursor = store.fetchMany(query, type.mutable);
        return new CursorValue(context, type, cursor.iterable);
    }

    buildFetchManyQuery(context, store) {
        const builder = store.newQueryBuilder();
        builder.setFirst(this.interpretLimit(context, this.first));
        builder.setLast(this.interpretLimit(context, this.last));
        if (this.type != null) {
            const info = new AttributeInfo("category", TypeFamily.TEXT, true, null);
            builder.verify(info, MatchOp.HAS, this.type.name);
        }
        if (this.predicate != null)
            this.predicate.interpretQuery(context, builder);
        if (this.type != null && this.predicate != null)
            builder.and();
        if (this.include != null)
            builder.project(this.include);
        if (this.orderBy != null)
            this.orderBy.interpretQuery(context, builder);
        return builder.build();
    }

    interpretLimit(context, exp) {
        if (exp == null)
            return null;
        const value = exp.interpret(context);
        if(value.type!==IntegerType.instance)
            throw new InvalidDataError("Expecting an Integer, got:" + value.type.name);
        return value.getStorableData();
    }

    declare(transpiler) {
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

    transpile(transpiler) {
        transpiler.append("(function() {").indent();
        this.transpileQuery(transpiler);
        const mutable = this.type ? this.type.mutable : false;
        transpiler.append("return $DataStore.instance.fetchMany(builder.build(), ").append(mutable).append(");").newLine().dedent();
        transpiler.append("})()");
    }

    transpileQuery(transpiler) {
        transpiler.append("var builder = $DataStore.instance.newQueryBuilder();").newLine();
        if (this.type != null)
            transpiler.append("builder.verify(new AttributeInfo('category', TypeFamily.TEXT, true, null), MatchOp.CONTAINS, '").append(this.type.name).append("');").newLine();
        if (this.predicate != null)
            this.predicate.transpileQuery(transpiler, "builder");
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

