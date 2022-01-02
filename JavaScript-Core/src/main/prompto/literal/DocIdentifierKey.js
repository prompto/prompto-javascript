import { TextValue } from '../value/index.js'

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

    check(context) {
        // nothing to do
    }

    interpret(context) {
        return new TextValue(this.stringValue());
    }

    transpile(transpiler) {
        transpiler.append(this.id.name);
    }

}

