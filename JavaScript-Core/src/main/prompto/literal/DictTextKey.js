import { TextValue } from '../value/index.js'

/*jshint evil:true*/
function unescape(text) {
    return eval(text);
}

export default class DictTextKey {
  
    constructor(text) {
        this.text = text;
   }

    toString() {
        return this.text;
    }

    stringValue() {
        return unescape(this.text);
    }

    transpile(transpiler) {
        transpiler.append(this.text);
    }

    interpret(context) {
        return new TextValue(this.stringValue());
    }
}