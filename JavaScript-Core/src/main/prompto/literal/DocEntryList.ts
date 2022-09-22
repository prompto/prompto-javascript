import DocEntry from "./DocEntry";
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";

export default class DocEntryList {

    items: DocEntry[];
    
    constructor(entries?: DocEntry[], entry?: DocEntry) {
        this.items = entries || [];
        if(entry != null) {
            this.items.push(entry);
        }
    }

    toDialect(writer: CodeWriter): void {
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

    check(context: Context): void {
        this.items.forEach(item => {
            item.check(context);
        });
    }

    declare(transpiler: Transpiler): void { 
        this.items.forEach(item => {
            item.declare(transpiler);
        });
     }

    transpile(transpiler: Transpiler): void { 
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

    toString(): string {
        return "{" + this.items.join(", ") + ">";
    }

    add(entry: DocEntry): void {
        this.items.push(entry);
    }
}
