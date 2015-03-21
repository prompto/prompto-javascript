var PythonNativeCategoryMapping = require("./PythonNativeCategoryMapping").PythonNativeCategoryMapping;

function Python2NativeCategoryMapping(mapping) {
	PythonNativeCategoryMapping.call(this, mapping.identifier, mapping.module);
	return this;
}

Python2NativeCategoryMapping.prototype = Object.create(PythonNativeCategoryMapping.prototype);
Python2NativeCategoryMapping.prototype.constructor = Python2NativeCategoryMapping;

Python2NativeCategoryMapping.prototype.toDialect = function(writer) {
    writer.append("Python2: ");
    writer.append(this.identifier);
    if(this.module!=null)
        this.module.toDialect(writer);
};

exports.Python2NativeCategoryMapping = Python2NativeCategoryMapping;

