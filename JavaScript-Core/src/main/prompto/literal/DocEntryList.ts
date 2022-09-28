import DocEntry from "./DocEntry";
import {CodeWriter} from "../utils";
import {Context, Transpiler} from "../runtime";
import ObjectList from "../utils/ObjectList";

export default class DocEntryList extends ObjectList<DocEntry> {

    constructor(entries?: DocEntry[], entry?: DocEntry) {
        super(entries, entry);
    }

    toDialect(writer: CodeWriter): void {
        writer.append('{');
        if(this.length>0) {
            this.forEach(item => {
                item.toDialect(writer);
                writer.append(", ");
            }, this);
            writer.trimLast(2);
        }
        writer.append('}');
    }

    check(context: Context): void {
        this.forEach(item => item.check(context), this);
    }

    declare(transpiler: Transpiler): void { 
        this.forEach(item => item.declare(transpiler), this);
     }

    transpile(transpiler: Transpiler): void { 
        transpiler.append('{');
        if(this.length>0) {
            this.forEach(item => {
                item.transpile(transpiler);
                transpiler.append(",");
            }, this);
            transpiler.trimLast(1);
        }
        transpiler.append('}');
    }

    toString(): string {
        return "{" + this.join(", ") + ">";
    }

}
