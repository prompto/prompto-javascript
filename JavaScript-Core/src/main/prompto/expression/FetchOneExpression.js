const Expression = require("./Expression").Expression;
const Identifier = require("../grammar/Identifier").Identifier;
const AnyType = require("../type/AnyType").AnyType;
const CategoryType = require("../type/CategoryType").CategoryType;
const CategoryDeclaration = require("../declaration/CategoryDeclaration").CategoryDeclaration;
const NullValue = require("../value/NullValue").NullValue;
const $DataStore = require("../store/DataStore").$DataStore;
const MatchOp = require("../store/MatchOp").MatchOp;
const TypeFamily = require("../store/TypeFamily").TypeFamily;
const AttributeInfo = require("../store/AttributeInfo").AttributeInfo;

class FetchOneExpression extends Expression {
 
    constructor(typ, predicate, start, end) {
        super();
        this.typ = typ;
        this.predicate = predicate;
        this.start = start;
        this.end = end;
    }

    toDialect(writer) {
        writer.toDialect(this);
    }

    toEDialect(writer) {
        writer.append("fetch one ");
        if(this.typ!=null) {
            if(this.typ.mutable)
                writer.append("mutable ");
            writer.append(this.typ.name);
            writer.append(" ");
        }
        writer.append("where ");
        this.predicate.toDialect(writer);
    }

    toODialect(writer) {
        writer.append("fetch one ");
        if(this.typ!=null) {
            writer.append("(");
            if(this.typ.mutable)
                writer.append("mutable ");
            writer.append(this.typ.name);
            writer.append(") ");
        }
        writer.append("where (");
        this.predicate.toDialect(writer);
        writer.append(")");
    }

    toMDialect(writer) {
        writer.append("fetch one ");
        if(this.typ!=null) {
            if(this.typ.mutable)
                writer.append("mutable ");
            writer.append(this.typ.name);
            writer.append(" ");
        }
        writer.append("where ");
        this.predicate.toDialect(writer);
    }

    check(context) {
        if(this.typ!=null) {
            const decl = context.getRegisteredDeclaration(this.typ.name);
            if (decl == null || !(decl instanceof CategoryDeclaration))
                context.problemListener.reportUnknownCategory(this.typ.id);
            if(!(decl.isStorable && decl.isStorable(context)))
                context.problemListener.reportNotStorable(this.typ.id, this.typ.name);
            context = context.newInstanceContext(null, decl.getType(context), true);
        }
        this.predicate.checkQuery(context);
        return this.typ || AnyType.instance;
    }

    interpret(context) {
        const store = $DataStore.instance;
        const query = this.buildFetchOneQuery(context, store);
        const stored = store.fetchOne (query);
        if (stored == null)
            return NullValue.instance;
        else {
            const typeName = stored.getData("category").slice(-1)[0];
            const typ = new CategoryType(new Identifier(typeName));
            if (this.typ != null)
                typ.mutable = this.typ.mutable;
            return typ.newInstanceFromStored(context, stored);
        }
    }

    declare(transpiler) {
        transpiler.require(MatchOp);
        transpiler.require($DataStore);
        transpiler.require(AttributeInfo);
        transpiler.require(TypeFamily);
        if (this.typ != null)
            this.typ.declare(transpiler);
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
        transpiler.append("var ").append(varName).append(" = new type(null, {}, ").append(this.typ!=null && this.typ.mutable).append(");").newLine();
        transpiler.append(varName).append(".fromStored(stored);").newLine();
    }

    transpileQuery(transpiler) {
        transpiler.append("var builder = $DataStore.instance.newQueryBuilder();").newLine();
        if (this.typ != null)
            transpiler.append("builder.verify(new AttributeInfo('category', TypeFamily.TEXT, true, null), MatchOp.CONTAINS, '").append(this.typ.name).append("');").newLine();
        if (this.predicate != null)
            this.predicate.transpileQuery(transpiler, "builder");
        if (this.typ != null && this.predicate != null)
            transpiler.append("builder.and();").newLine();
    }

    buildFetchOneQuery(context, store) {
        const builder = store.newQueryBuilder();
        if (this.typ != null) {
            const info = new AttributeInfo("category", TypeFamily.TEXT, true, null);
            builder.verify(info, MatchOp.CONTAINS, this.typ.name);
        }
        if (this.predicate != null) {
            this.predicate.interpretQuery(context, builder);
        }
        if (this.typ != null && this.predicate != null) {
            builder.and();
        }
        return builder.build();
    }
}

exports.FetchOneExpression = FetchOneExpression;
