import BaseStatement from './BaseStatement.js'
import { Dialect } from '../parser/index.js'
import { VoidType, AnyType } from '../type/index.js'
import { NullValue, Instance, Container } from '../value/index.js'
import { $DataStore } from '../store/index.js'

export default class StoreStatement extends BaseStatement {
 
    constructor(del, add, andThen) {
        super();
        this.del = del;
        this.add = add;
        this.andThen = andThen;
    }

    isSimple() {
        return this.andThen==null;
    }

    toDialect(writer) {
        if(this.del) {
            writer.append("delete ");
            if (writer.dialect == Dialect.E)
                this.del.toDialect(writer);
            else {
                writer.append('(');
                this.del.toDialect(writer);
                writer.append(')');
            }
            if (this.add)
                writer.append(" and ");
        }
        if (this.add) {
            writer.append ("store ");
            if (writer.dialect == Dialect.E)
                this.add.toDialect(writer);
            else {
                writer.append('(');
                this.add.toDialect(writer);
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
        return "store " + this.add.toString();
    }

    equals(other) {
        if (other == this)
            return true;
        else if (other == null)
            return false;
        else if (!(other instanceof StoreStatement))
            return false
        else
            return this.add.equals(other.add);
    }

    check(context) {
        this.checkDeletables(context);
        this.checkStorables(context);
        this.checkFuture(context);
        return VoidType.instance;
    }

    checkDeletables(context) {
        if (this.del)
            this.del.forEach(exp=>this.checkStorable(context, exp), this);
    }

    checkStorables(context) {
        if (this.add)
            this.add.forEach(exp=>this.checkStorable(context, exp), this);
    }

    checkStorable(context, exp) {
        let type = exp.check(context);
        if(type.itemType)
            type = type.itemType;
        if(type == AnyType.instance)
            return;
        else if(!type.isStorable(context)) {
            let name = exp.toString();
            if(name.indexOf(' ')>0 || name.indexOf(',')>0)
                name = type.typename;
            context.problemListener.reportNotStorable(this, name);
        }
    }

    checkFuture(context) {
        if(this.andThen) {
            context = context.newChildContext();
            this.andThen.check(context, null);
        }
    }

    interpret(context) {
        const idsToDelete = this.getIdsToDelete(context);
        const storablesToAdd = this.getStorablesToAdd(context);
        if (idsToDelete || storablesToAdd)
            $DataStore.instance.store(idsToDelete, storablesToAdd);
        if(this.andThen)
            this.andThen.interpret(context);
    }

    declare(transpiler) {
        transpiler.require($DataStore);
        if(this.andThen)
            this.andThen.declare(transpiler);
    }

    transpile(transpiler) {
        transpiler.append("$DataStore.instance.store").append(this.andThen?"Async":"").append("(");
        this.transpileIdsToDelete(transpiler);
        transpiler.append(", ");
        this.transpileStorablesToAdd(transpiler);
        if(this.andThen) {
            transpiler.append(", function() {").indent();
            this.andThen.transpile(transpiler);
            transpiler.dedent().append("}.bind(this)");
        }
        transpiler.append(")");
    }

    transpileIdsToDelete(transpiler) {
        if(!this.del)
            transpiler.append("null");
        else {
            transpiler.append("(function() { ").indent();
            transpiler.append("var idsToDelete = new Set();").newLine();
            this.del.forEach(exp => {
                exp.transpile(transpiler);
                transpiler.append(".collectDbIds(idsToDelete);").newLine();
            }, this);
            transpiler.append("return Array.from(idsToDelete);").newLine();
            transpiler.dedent().append("})()");
        }
    }

    transpileStorablesToAdd(transpiler) {
        if (!this.add)
            transpiler.append("null");
        else {
            transpiler.append("(function() { ").indent();
            transpiler.append("var storablesToAdd = new Set();").newLine();
            this.add.forEach(exp => {
                exp.transpile(transpiler);
                transpiler.append(".collectStorables(storablesToAdd);").newLine();
            }, this);
            transpiler.append("return Array.from(storablesToAdd);").newLine();
            transpiler.dedent().append("})()");
        }
    }

    getIdsToDelete(context) {
        if(!this.del)
            return null;
        const idsToDel = new Set();
        this.del.forEach(exp => {
            const value = exp.interpret(context);
            if (value == NullValue.instance)
                return;
            else if(value instanceof Instance) {
                const dbId = value.getMemberValue(context, "dbId");
                if (dbId !=null && dbId!=NullValue.instance)
                    idsToDel.add(dbId.getStorableData());
            } else if(value instanceof Container) {
                value.items.map(item => {
                    if (value == NullValue.instance)
                        return;
                    else if (value instanceof Instance) {
                        const dbId = value.getMemberValue(context, "dbId");
                        if (dbId != null && dbId != NullValue.instance)
                            idsToDel.push(dbId.getStorableData());
                    }
                });
            }
        });
        if(idsToDel.length==0)
            return null;
        else
            return idsToDel;
    }

    getStorablesToAdd(context) {
        if (!this.add)
            return null;
        const storablesToAdd = new Set();
        this.add.forEach(exp => {
            const value = exp.interpret(context);
            value.collectStorables(storablesToAdd)
        });
        if (storablesToAdd.length == 0)
            return null;
        else
            return storablesToAdd;
    }
}
