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

DictTextKey.prototype.asKey = function() {
    return unescape(this.text);
};

DictTextKey.prototype.asText = function() {
    return new TextValue(this.asKey());
};

exports.DictTextKey = DictTextKey;