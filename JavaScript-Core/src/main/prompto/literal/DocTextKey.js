import { TextValue } from '../value/index.js'

/*jshint evil:true*/
function unescape(text) {
    return eval(text);
}

export default class DocTextKey {
  
    constructor(text) {
        this.text = text;
    }

    toString() {
        return this.text;
    }

    stringValue() {
        return unescape(this.text);
    }

    check(context) {
        // nothing to do
    }

    interpret(context) {
        return new TextValue(this.stringValue());
    }

    transpile(transpiler) {
        transpiler.append(this.text);
    }

 }
