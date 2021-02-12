import Expression from './Expression.js'
import { AnyType, CategoryType, VoidType } from '../type/index.js'
import { $DataStore, TypeFamily, AttributeInfo, MatchOp } from '../store/index.js'
import { NullValue } from '../value/index.js'
import { CategoryDeclaration } from '../declaration/index.js'
import { Identifier } from '../grammar/index.js'

export default class FetchOneExpression extends Expression {
 
    constructor(type, predicate, start, end) {
        super();
        this.type = type;
        this.predicate = predicate;
        this.start = start;
        this.end = end;
    }

    toDialect(writer) {
        writer.toDialect(this);
    }

    toEDialect(writer) {
        writer.append("fetch one ");
        if(this.type!=null) {
            if(this.type.mutable)
                writer.append("mutable ");
            writer.append(this.type.name);
            writer.append(" ");
        }
        writer.append("where ");
        this.predicate.toDialect(writer);
    }

    toODialect(writer) {
        writer.append("fetch one ");
        if(this.type!=null) {
            writer.append("(");
            if(this.type.mutable)
                writer.append("mutable ");
            writer.append(this.type.name);
            writer.append(") ");
        }
        writer.append("where (");
        this.predicate.toDialect(writer);
        writer.append(")");
    }

    toMDialect(writer) {
        writer.append("fetch one ");
        if(this.type!=null) {
            if(this.type.mutable)
                writer.append("mutable ");
            writer.append(this.type.name);
            writer.append(" ");
        }
        writer.append("where ");
        this.predicate.toDialect(writer);
    }

    check(context) {
        if(this.type!=null) {
            const decl = context.getRegisteredDeclaration(this.type.name);
            if (decl == null || !(decl instanceof CategoryDeclaration)) {
                context.problemListener.reportUnknownCategory(this.type.id, this.type.name);
                return VoidType.instance;
            }
            if(!(decl.isStorable && decl.isStorable(context)))
                context.problemListener.reportNotStorable(this.type.id, this.type.name);
            context = context.newInstanceContext(null, decl.getType(context), true);
        }
        this.predicate.checkQuery(context);
        return this.type || AnyType.instance;
    }

    interpret(context) {
        const store = $DataStore.instance;
        const query = this.buildFetchOneQuery(context, store);
        const stored = store.fetchOne (query);
        if (stored == null)
            return NullValue.instance;
        else {
            const typeName = stored.getData("category").slice(-1)[0];
            const type = new CategoryType(new Identifier(typeName));
            if (this.type != null)
                type.mutable = this.type.mutable;
            return type.newInstanceFromStored(context, stored);
        }
    }

    declare(transpiler) {
        transpiler.require(MatchOp);
        transpiler.require($DataStore);
        transpiler.require(AttributeInfo);
        transpiler.require(TypeFamily);
        if (this.type != null)
            this.type.declare(transpiler);
        if (this.predicate != null)
            this.predicate.declareQuery(transpiler);
    }

    transpile(transpiler) {
        transpiler.append("(function() {").indent();
        this.transpileQuery(transpiler);
        transpiler.append("var stored = $DataStore.instance.fetchOne(builder.build());").newLine();
        this.transpileConvert(transpiler, "result");
        transpiler.append("return result;").dedent();
        transpiler.append("})()");
    }

    transpileConvert(transpiler, varName) {
        transpiler.append("if(stored===null)").indent().append("return null;").dedent();
        transpiler.append("var name = stored.getData('category').slice(-1)[0];").newLine();
        transpiler.append("var type = eval(name);").newLine();
        transpiler.append("var ").append(varName).append(" = new type(null, {}, ").append(this.type!=null && this.type.mutable).append(");").newLine();
        transpiler.append(varName).append(".fromStored(stored);").newLine();
    }

    transpileQuery(transpiler) {
        transpiler.append("var builder = $DataStore.instance.newQueryBuilder();").newLine();
        if (this.type != null)
            transpiler.append("builder.verify(new AttributeInfo('category', TypeFamily.TEXT, true, null), MatchOp.CONTAINS, '").append(this.type.name).append("');").newLine();
        if (this.predicate != null)
            this.predicate.transpileQuery(transpiler, "builder");
        if (this.type != null && this.predicate != null)
            transpiler.append("builder.and();").newLine();
    }

    buildFetchOneQuery(context, store) {
        const builder = store.newQueryBuilder();
        if (this.type != null) {
            const info = new AttributeInfo("category", TypeFamily.TEXT, true, null);
            builder.verify(info, MatchOp.CONTAINS, this.type.name);
        }
        if (this.predicate != null) {
            this.predicate.interpretQuery(context, builder);
        }
        if (this.type != null && this.predicate != null) {
            builder.and();
        }
        return builder.build();
    }
}
