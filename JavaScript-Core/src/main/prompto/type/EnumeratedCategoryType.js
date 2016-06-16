var CategoryType = require("./CategoryType").CategoryType;


function EnumeratedCategoryType(id) {
	CategoryType.call(this, id);
	return this;
}

EnumeratedCategoryType.prototype = Object.create(CategoryType.prototype);
EnumeratedCategoryType.prototype.constructor =  EnumeratedCategoryType;

exports.EnumeratedCategoryType = EnumeratedCategoryType;