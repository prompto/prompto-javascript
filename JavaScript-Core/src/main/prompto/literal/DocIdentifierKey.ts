import { TextValue } from '../value'
import IDocumentKey from "../../../main/prompto/literal/IDocumentKey";
import {Identifier} from "../grammar";
import {Context, Transpiler} from "../runtime";

export default class DocIdentifierKey implements IDocumentKey {

    id: Identifier;

    constructor(id: Identifier) {
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

