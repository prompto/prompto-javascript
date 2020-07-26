var Variable = require("./Variable").Variable;

function WidgetField (id, type, createdBy, updatedBy) {
    Variable.call(this, id, type);
    this.createdBy = createdBy;
    this.updatedBy = updatedBy;
    return this;
}

WidgetField.prototype = Object.create(Variable.prototype);
WidgetField.prototype.constructor = WidgetField;

exports.WidgetField = WidgetField;
