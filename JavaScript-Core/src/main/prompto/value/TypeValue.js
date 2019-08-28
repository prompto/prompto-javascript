var Value = require("./Value").Value;

function TypeValue(value) {
    Value.call(this, null); // TODO type of type
    this.value = value;
    return this;
}

TypeValue.prototype.toString = function() {
    return this.value.toString();
};


TypeValue.prototype.getMemberValue = function(context, name, autoCreate) {
    return this.value.getStaticMemberValue(context, name);
};


exports.TypeValue = TypeValue;