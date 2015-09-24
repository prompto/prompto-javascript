var Variable = require("./Variable").Variable;
var Identifier = require("../grammar/Identifier").Identifier;
var EnumeratedCategoryType = null;

exports.resolve = function() {
    EnumeratedCategoryType = require("../type/EnumeratedCategoryType").EnumeratedCategoryType;
};

function ErrorVariable(id) {
	Variable.call(this, id, new EnumeratedCategoryType(new Identifier("Error")));
	return this;
}

ErrorVariable.prototype = Object.create(Variable.prototype);
ErrorVariable.prototype.constructor = ErrorVariable;

ErrorVariable.prototype.toString = function() {
	return this.name;
};

ErrorVariable.prototype.getType = function(context) {
	return new EnumeratedCategoryType(new Identifier("Error"));
};

exports.ErrorVariable = ErrorVariable;
