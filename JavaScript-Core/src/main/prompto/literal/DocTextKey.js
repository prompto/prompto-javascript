var TextValue = require("../value/TextValue").TextValue;

/*jshint evil:true*/
function unescape(text) {
    return eval(text);
}

function DocTextKey(text) {
    this.text = text;
    return this;
}

DocTextKey.prototype.toString = function() {
    return this.text;
};

DocTextKey.prototype.stringValue = function() {
    return unescape(this.text);
};

DocTextKey.prototype.transpile = function(transpiler) {
    transpiler.append(this.text);
};

DocTextKey.prototype.interpret = function(context) {
    return new TextValue(this.stringValue());
};

exports.DocTextKey = DocTextKey;