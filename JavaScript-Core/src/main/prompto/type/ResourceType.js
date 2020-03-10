var CategoryType = require("./CategoryType").CategoryType;

function ResourceType(name) {
	CategoryType.call(this, name);
	return this;
}

ResourceType.prototype = Object.create(CategoryType.prototype);
ResourceType.prototype.constructor = ResourceType;

ResourceType.prototype.equals = function(obj) {
	if(obj==this) {
		return true;
	}
	if(!(obj instanceof ResourceType)) {
		return false;
	}
	return this.name==obj.name;
};


ResourceType.prototype.asMutable = function(mutable) {
	if(mutable)
		; // TODO throw ?
	return this;
};



exports.ResourceType = ResourceType;
