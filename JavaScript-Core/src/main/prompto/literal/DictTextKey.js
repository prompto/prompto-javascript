import { TextValue } from '../value'

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

    check(context: Context): Type {
        // nothing to do
    }

    interpret(context: Context): Value {
        return new TextValue(this.stringValue());
    }

    transpile(transpiler: Transpiler): void {
        transpiler.append(this.text);
    }

}
