var Variable = require("./Variable").Variable;

function WidgetField (id, type) {
    Variable.call(this, id, type);
    return this;
}

WidgetField.prototype = Object.create(Variable.prototype);
WidgetField.prototype.constructor = WidgetField;

exports.WidgetField = WidgetField;
