var ObjectList = require("../utils/ObjectList").ObjectList;

function CategoryMethodList(item) {
	ObjectList.call(this);
	item = item || null;
	if(item!==null) {
		this.add(item);
	}
	return this;
}

CategoryMethodList.prototype = Object.create(ObjectList.prototype);
CategoryMethodList.prototype.constructor = CategoryMethodList;

exports.CategoryMethodList = CategoryMethodList;