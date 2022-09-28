import {DictEntry} from "./index";
import ObjectList from "../utils/ObjectList";
import {CodeWriter} from "../utils";
import {Transpiler} from "../runtime";

export default class DictEntryList extends ObjectList<DictEntry> {

    constructor(entries?: DictEntry[], entry?: DictEntry) {
        super(entries, entry);
    }

    toDialect(writer: CodeWriter): void {
        writer.append('<');
        if(this.length>0) {
            this.forEach(item => {
                item.toDialect(writer);
                writer.append(", ");
            }, this);
            writer.trimLast(2);
        } else
            writer.append(':');
        writer.append('>');
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
            });
            transpiler.trimLast(1);
        }
        transpiler.append('}');
    }

    toString() {
        return "<" + (this.length ? this.join(", ") : ':') + ">";
    }

}
