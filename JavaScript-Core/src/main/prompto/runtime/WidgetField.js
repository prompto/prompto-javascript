const Variable = require("./Variable").Variable;

class WidgetField extends Variable {

    constructor(id, type, createdBy, updatedBy) {
        super(id, type);
        this.createdBy = createdBy;
        this.updatedBy = updatedBy;
    }
}

exports.WidgetField = WidgetField;
