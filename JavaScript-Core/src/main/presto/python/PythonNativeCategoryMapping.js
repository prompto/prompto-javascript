var NativeCategoryMapping = require("./../grammar/NativeCategoryMapping").NativeCategoryMapping;

function PythonNativeCategoryMapping(identifier, module) {
	NativeCategoryMapping.call(this);
	this.identifier = identifier;
	this.module = module;
	return this;
}

PythonNativeCategoryMapping.prototype = Object.create(NativeCategoryMapping.prototype);
PythonNativeCategoryMapping.prototype.constructor = PythonNativeCategoryMapping;

exports.PythonNativeCategoryMapping = PythonNativeCategoryMapping;

