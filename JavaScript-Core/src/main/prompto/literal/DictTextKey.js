const TextValue = require("../value/TextValue").TextValue;

/*jshint evil:true*/
function unescape(text) {
    return eval(text);
}

class DictTextKey {
  
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

exports.DictTextKey = DictTextKey;