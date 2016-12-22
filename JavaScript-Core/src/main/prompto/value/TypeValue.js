var Value = require("./Value").Value;

function TypeValue(value) {
    Value.call(this, null); // TODO type of type
    this.value = value;
    return this;
};

TypeValue.prototype.toString = function() {
    return this.value.toString();
};

exports.TypeValue = TypeValue;