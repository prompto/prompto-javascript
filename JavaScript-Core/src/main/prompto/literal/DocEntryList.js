export default class DocEntryList {

    constructor(entries, entry) {
        this.items = entries || [];
        entry = entry || null;
        if(entry!==null) {
            this.items.push(entry);
        }
    }

    toDialect(writer) {
        writer.append('{');
        if(this.items.length>0) {
            this.items.forEach(item => {
                item.toDialect(writer);
                writer.append(", ");
            });
            writer.trimLast(2);
        }
        writer.append('}');
    }

    check(context) {
        this.items.forEach(item => {
            item.check(context);
        });
    }

    declare(transpiler) {
        this.items.forEach(item => {
            item.declare(transpiler);
        });
     }

    transpile(transpiler) {
        transpiler.append('{');
        if(this.items.length>0) {
            this.items.forEach(item => {
                item.transpile(transpiler);
                transpiler.append(",");
            });
            transpiler.trimLast(1);
        }
        transpiler.append('}');
    }

    toString() {
        return "{" + this.items.join(", ") + ">";
    }

    add(entry) {
        this.items.push(entry);
    }
}
