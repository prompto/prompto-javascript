import BaseExpression from './BaseExpression'
import {AnyType, CategoryType, IType, VoidType} from '../type'
import {$DataStore, TypeFamily, AttributeInfo, MatchOp, Store} from '../store'
import {NullValue, IValue} from '../value'
import {Identifier, IdentifierList} from '../grammar'
import {IExpression, IPredicate} from "./index";
import {Context, Transpiler} from "../runtime";
import {CodeWriter} from "../utils";
import IQuery from "../store/IQuery";

export default class FetchOneExpression extends BaseExpression {

    type: IType | null;
    predicate: IExpression | null;
    include: IdentifierList | null;

    constructor(type: IType | null, predicate: IExpression | null, include: IdentifierList | null) {
        super();
        this.type = type;
        this.predicate = predicate;
        this.include = include
    }

    toDialect(writer: CodeWriter): void {
        writer.toDialect(this);
    }

    toEDialect(writer: CodeWriter): void {
        writer.append("fetch one ");
        if(this.type!=null) {
            if(this.type.mutable)
                writer.append("mutable ");
            writer.append(this.type.name);
            writer.append(" ");
        }
        writer.append("where ");
        this.predicate!.toDialect(writer);
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
    }

    toODialect(writer: CodeWriter): void {
        writer.append("fetch one ");
        if(this.type!=null) {
            writer.append("(");
            if(this.type.mutable)
                writer.append("mutable ");
            writer.append(this.type.name);
            writer.append(") ");
        }
        writer.append("where (");
        this.predicate!.toDialect(writer);
        writer.append(")");
        if(this.include != null) {
            writer.append("include (");
            this.include.forEach(id => writer.append(id.name).append(", "));
            writer.trimLast(", ".length);
            writer.append(")");
        }
    }

    toMDialect(writer: CodeWriter): void {
        writer.append("fetch one ");
        if(this.type!=null) {
            if(this.type.mutable)
                writer.append("mutable ");
            writer.append(this.type.name);
            writer.append(" ");
        }
        writer.append("where ");
        this.predicate!.toDialect(writer);
        if(this.include != null) {
            writer.append("include ");
            this.include.forEach(id => writer.append(id.name).append(", "));
            writer.trimLast(", ".length);
            writer.append(" ");
        }
    }

    check(context: Context): IType {
        if(this.type) {
            const decl = context.getRegisteredCategoryDeclaration(this.type.id);
            if (!decl) {
                context.problemListener.reportUnknownCategory(this.type.id, this.type.name);
                return VoidType.instance;
            }
            if(!(decl.isStorable && decl.isStorable(context)))
                context.problemListener.reportNotStorable(this.type.id, this.type.name);
            context = context.newInstanceContext(null, decl.getType(context), true);
        }
        if (this.predicate!.isPredicate())
            (this.predicate as IPredicate).checkQuery(context);
        return this.type || AnyType.instance;
    }

    interpretExpression(context: Context): IValue {
        const store = $DataStore.instance;
        const query = this.buildFetchOneQuery(context, store) as IQuery;
        const stored = store.fetchOne (query);
        if (stored) {
            const typeName = stored.getData<string>("category").slice(-1)[0];
            const type = new CategoryType(new Identifier(typeName), this.type ? this.type.mutable : false);
            return type.newInstanceFromStored(context, stored);
        } else
            return NullValue.instance;
    }

    declare(transpiler: Transpiler): void {
        transpiler.require(MatchOp);
        transpiler.require($DataStore);
        transpiler.require(AttributeInfo);
        transpiler.require(TypeFamily);
        if (this.type != null)
            this.type.declare(transpiler);
        if (this.predicate!.isPredicate())
            (this.predicate as IPredicate).declareQuery(transpiler);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("(function() {").indent();
        this.transpileQuery(transpiler);
        transpiler.append("var stored = $DataStore.instance.fetchOne(builder.build());").newLine();
        this.transpileConvert(transpiler, "result");
        transpiler.append("return result;").dedent();
        transpiler.append("})()");
    }

    transpileConvert(transpiler: Transpiler, varName: string): void {
        transpiler.append("var ").append(varName).append(" = null;").newLine();
        transpiler.append("if(stored!=null) {").indent();
        transpiler.append("var name = stored.getData('category').slice(-1)[0];").newLine();
        transpiler.append("var type = eval(name);").newLine();
        transpiler.append(varName).append(" = new type(null, {}, ").appendBoolean(this.type!=null && this.type.mutable).append(");").newLine();
        transpiler.append(varName).append(".fromStored(stored);").dedent().append("}").newLine();
    }

    transpileQuery(transpiler: Transpiler): void {
        transpiler.append("var builder = $DataStore.instance.newQueryBuilder();").newLine();
        if (this.type != null)
            transpiler.append("builder.verify(new AttributeInfo('category', TypeFamily.TEXT, true, null), MatchOp.CONTAINS, '").append(this.type.name).append("');").newLine();
        if (this.predicate && this.predicate.isPredicate())
            (this.predicate as IPredicate).transpileQuery(transpiler, "builder");
        if (this.type != null && this.predicate != null)
            transpiler.append("builder.and();").newLine();
        if (this.include != null) {
            transpiler.append("builder.project([");
            this.include.forEach(id => transpiler.append('"').append(id.name).append('"').append(", "));
            transpiler.trimLast(", ".length);
            transpiler.append("]);").newLine();
        }
    }

    buildFetchOneQuery(context: Context, store: Store): IQuery {
        const builder = store.newQueryBuilder();
        if (this.type != null) {
            const info = new AttributeInfo("category", TypeFamily.TEXT, true, null);
            builder.verify(info, MatchOp.CONTAINS, this.type.name);
        }
        if (this.predicate && this.predicate.isPredicate()) {
            (this.predicate as IPredicate).interpretQuery(context, builder);
        }
        if (this.type && this.predicate) {
            builder.and();
        }
        if (this.include) {
            builder.project(this.include.map(id => id.name));
        }
        return builder.build();
    }
}
