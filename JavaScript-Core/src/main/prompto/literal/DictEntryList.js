class DictEntryList {
    constructor(entries, entry) {
        this.items = entries || [];
        entry = entry || null;
        if(entry!==null) {
            this.items.push(entry);
        }
        return this;
    }

    toDialect(writer) {
        writer.append('<');
        if(this.items.length>0) {
            this.items.forEach(function(item) {
                item.toDialect(writer);
                writer.append(", ");
            });
            writer.trimLast(2);
        } else
            writer.append(':');
        writer.append('>');
    }

    declare(transpiler) {
        this.items.forEach(function(item) {
            item.declare(transpiler);
        });
     }

    transpile(transpiler) {
        transpiler.append('{');
        if(this.items.length>0) {
            this.items.forEach(function(item) {
                item.transpile(transpiler);
                transpiler.append(",");
            });
            transpiler.trimLast(1);
        }
        transpiler.append('}');
    }

    toString() {
        return "<" + (this.items.length ? this.items.join(", ") : ':') + ">";
    }

    add(entry) {
        this.items.push(entry);
    }
}

exports.DictEntryList = DictEntryList;