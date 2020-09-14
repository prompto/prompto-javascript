import { TextValue } from "../value/index"

export default class DocIdentifierKey {
  
    constructor(id) {
        this.id = id;
   }

    toString() {
        return this.id.name;
    }

    stringValue() {
        return this.id.name;
    }

    transpile(transpiler) {
        transpiler.append(this.id.name);
    }

    interpret(context) {
        return new TextValue(this.stringValue());
    }
}

