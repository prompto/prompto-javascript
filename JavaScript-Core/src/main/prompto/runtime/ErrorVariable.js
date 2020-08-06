const Variable = require("./Variable").Variable;
const Identifier = require("../grammar/Identifier").Identifier;
let EnumeratedCategoryType = null;

exports.resolve = () => {
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
