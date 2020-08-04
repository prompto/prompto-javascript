var Variable = require("./Variable").Variable;
var Identifier = require("../grammar/Identifier").Identifier;
var EnumeratedCategoryType = null;

exports.resolve = function() {
    EnumeratedCategoryType = require("../type/EnumeratedCategoryType").EnumeratedCategoryType;
};

class ErrorVariable extends Variable {
    constructor(id) {
        super(id, new EnumeratedCategoryType(new Identifier("Error")));
        return this;
    }

    toString() {
        return this.name;
    }

    getType(context) {
        return new EnumeratedCategoryType(new Identifier("Error"));
    }
}

exports.ErrorVariable = ErrorVariable;
