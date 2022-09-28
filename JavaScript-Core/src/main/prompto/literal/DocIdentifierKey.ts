import { TextValue } from '../value'
import {Identifier} from "../grammar";
import {Context, Transpiler} from "../runtime";
import DocKey from "./DocKey";

export default class DocIdentifierKey extends DocKey {

    id: Identifier;

    constructor(id: Identifier) {
        super();
        this.id = id;
   }

    toString() {
        return this.id.name;
    }

    stringValue() {
        return this.id.name;
    }

    check(context: Context) {
        // nothing to do
    }

    interpret(context: Context) {
        return new TextValue(this.stringValue());
    }

    transpile(transpiler: Transpiler) {
        transpiler.append(this.id.name);
    }

}

