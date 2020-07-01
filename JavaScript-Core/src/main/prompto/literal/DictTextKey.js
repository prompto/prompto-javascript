var TextValue = require("../value/TextValue").TextValue;

/*jshint evil:true*/
function unescape(text) {
    return eval(text);
}

function DictTextKey(text) {
    this.text = text;
    return this;
}

DictTextKey.prototype.toString = function() {
    return this.text;
};

DictTextKey.prototype.stringValue = function() {
    return unescape(this.text);
};

DictTextKey.prototype.transpile = function(transpiler) {
    transpiler.append(this.text);
};

DictTextKey.prototype.interpret = function(context) {
    return new TextValue(this.stringValue());
};

exports.DictTextKey = DictTextKey;