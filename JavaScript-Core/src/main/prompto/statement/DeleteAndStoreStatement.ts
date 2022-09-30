import BaseStatement from './BaseStatement'
import {Dialect, Section} from '../parser'
import {VoidType, AnyType, IType, IterableType} from '../type'
import {NullValue, Instance, Container, DocumentValue, IValue} from '../value'
import {$DataStore, IAuditMetadata, IStorable} from '../store'
import { StatementList } from "../statement";
import Document from '../intrinsic/Document.js';
import {ExpressionList, IExpression} from "../expression";
import {CodeWriter, equalArrays} from "../utils";
import {Context, Transpiler} from "../runtime";
import {Identifier} from "../grammar";
export default class DeleteAndStoreStatement extends BaseStatement {

    toDel: ExpressionList | null;
    toAdd: ExpressionList | null;
    meta: IExpression | null;
    andThen?: StatementList;
    
    constructor(toDel: ExpressionList | null, toAdd: ExpressionList | null, meta: IExpression | null, andThen?: StatementList) {
        super();
        this.toDel = toDel;
        this.toAdd = toAdd;
        this.meta = meta;
        this.andThen = andThen;
    }

    locateSectionAtLine(line: number): Section | null {
        if(line == this.startLocation.line)
            return this;
        else if(this.andThen)
            return this.andThen.locateSectionAtLine(line);
        else
            return null;
    }

    isSimple() {
        return this.andThen==null;
    }

    toDialect(writer: CodeWriter): void {
        if(this.toDel) {
            writer.append("delete ");
            if (writer.dialect == Dialect.E)
                this.toDel.toDialect(writer);
            else {
                writer.append('(');
                this.toDel.toDialect(writer);
                writer.append(')');
            }
            if (this.toAdd)
                writer.append(" and ");
        }
        if (this.toAdd) {
            writer.append ("store ");
            if (writer.dialect == Dialect.E)
                this.toAdd.toDialect(writer);
            else {
                writer.append('(');
                this.toAdd.toDialect(writer);
                writer.append(')');
            }
        }
        if(this.meta) {
            if(writer.dialect == Dialect.E) {
                writer.append(" with ");
                this.meta.toDialect(writer);
                writer.append(" as metadata");
            } else {
                writer.append(" with metadata(");
                this.meta.toDialect(writer);
                writer.append(')');
            }
        }
        if(this.andThen) {
            if(writer.dialect == Dialect.O) {
                writer.append(" then {").newLine().indent();
                this.andThen.toDialect(writer);
                writer.dedent().append("}").newLine();
            } else {
                writer.append(" then:").newLine().indent();
                this.andThen.toDialect(writer);
                writer.dedent();
            }
        }
    }

    toString() {
        return (this.toDel ? "delete " + this.toDel.toString() : "") + (this.toDel && this.toAdd ? " and " : "") + (this.toAdd ? "store " + this.toAdd.toString() : "");
    }

    equals(other: any) {
        return other == this || (other instanceof DeleteAndStoreStatement && equalArrays(this.toDel, other.toDel) && equalArrays(this.toAdd, other.toAdd));
    }

    check(context: Context): IType {
        this.checkDeletables(context);
        this.checkStorables(context);
        this.checkAndThen(context);
        return VoidType.instance;
    }

    checkDeletables(context: Context) {
        if (this.toDel)
            this.toDel.forEach(exp => this.checkStorable(context, exp), this);
    }

    checkStorables(context: Context) {
        if (this.toAdd)
            this.toAdd.forEach(exp => this.checkStorable(context, exp), this);
    }

    checkStorable(context: Context, exp: IExpression) {
        let type = exp.check(context);
        if(type instanceof IterableType)
            type = type.itemType;
        if(type == AnyType.instance)
            return;
        else if(!type.isStorable(context)) {
            let name = exp.toString();
            if(name.indexOf(' ')>0 || name.indexOf(',')>0)
                name = type.name;
            context.problemListener.reportNotStorable(this, name);
        }
    }

    checkAndThen(context: Context) {
        if(this.andThen) {
            context = context.newChildContext();
            this.andThen.check(context, null);
        }
    }

    interpret(context: Context): IValue | null {
        const idsToDelete = this.getIdsToDelete(context);
        const storablesToAdd = this.getStorablesToAdd(context);
        let auditMeta: IAuditMetadata | null = null;
        if(this.meta) {
            const docValue = this.meta.interpret(context);
            if(docValue instanceof DocumentValue )
                auditMeta = docValue.getStorableData() as IAuditMetadata;
        }
        if (idsToDelete || storablesToAdd)
            $DataStore.instance.deleteAndStore(idsToDelete, storablesToAdd, auditMeta);
        if(this.andThen)
            this.andThen.interpret(context);
        return null;
    }

    declare(transpiler: Transpiler): void {
        transpiler.require($DataStore);
        if(this.andThen)
            this.andThen.declare(transpiler);
        if(this.meta)
            transpiler.require(Document);
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append("$DataStore.instance.deleteAndStore").append(this.andThen?"Async":"").append("(");
        this.transpileIdsToDelete(transpiler);
        transpiler.append(", ");
        this.transpileStorablesToAdd(transpiler);
        transpiler.append(", ");
        this.transpileMetadata(transpiler);
        this.transpileFuture(transpiler);
        transpiler.append(")");
    }

    transpileIdsToDelete(transpiler: Transpiler) {
        if(!this.toDel)
            transpiler.append("null");
        else {
            transpiler.append("(function() { ").indent();
            transpiler.append("var idsToDelete = new Set();").newLine();
            this.toDel.forEach(exp => {
                exp.transpile(transpiler);
                transpiler.append(".collectDbIds(idsToDelete);").newLine();
            }, this);
            transpiler.append("return Array.from(idsToDelete);").newLine();
            transpiler.dedent().append("}).bind(this)()");
        }
    }

    transpileStorablesToAdd(transpiler: Transpiler) {
        if (!this.toAdd)
            transpiler.append("null");
        else {
            transpiler.append("(function() { ").indent();
            transpiler.append("var storablesToAdd = new Set();").newLine();
            this.toAdd.forEach(exp => {
                exp.transpile(transpiler);
                transpiler.append(".collectStorables(storablesToAdd);").newLine();
            }, this);
            transpiler.append("return Array.from(storablesToAdd);").newLine();
            transpiler.dedent().append("}).bind(this)()");
        }
    }

    transpileMetadata(transpiler: Transpiler) {
        if (!this.meta)
            transpiler.append("null");
        else
            this.meta.transpile(transpiler);
   }

    transpileFuture(transpiler: Transpiler) {
        if(this.andThen) {
            transpiler.append(", (function() {").indent();
            this.andThen.transpile(transpiler);
            transpiler.dedent().append("}).bind(this)");
        }
    }

    getIdsToDelete(context: Context): any[] | null {
        if(!this.toDel)
            return null;
        const valuesToDel = this.toDel
            .map(exp => exp.interpret(context));
        const instancesToDel = valuesToDel
            .filter(value => value instanceof Instance<never>)
            .map(value => value as Instance<never>)
            .concat(
                valuesToDel
                    .filter(value => value instanceof Container<never>)
                    .map(value => value as unknown as Container<never>)
                    .map(value => value.items)
                    .flatMap(instance => instance)
                    .filter(value => value instanceof Instance<never>)
                    .map(value => value as Instance<never>));
        const idsToDel = instancesToDel
            .map(instance => instance.GetMemberValue(context, Identifier.DB_ID))
            .filter(dbId => dbId && dbId != NullValue.instance)
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return
            .map(dbId => dbId.getStorableData())
            .filter(data => !!data);
         return idsToDel.length ? idsToDel : null;
    }

    getStorablesToAdd(context: Context): IStorable[] | null {
        if (!this.toAdd)
            return null;
        const storablesToAdd = new Set<IStorable>();
        this.toAdd
            .map(exp => exp.interpret(context))
            .forEach(value => value.collectStorables(storablesToAdd));
        return storablesToAdd.size ? Array.from(storablesToAdd) : null;
    }
}
