var PythonNativeCategoryMapping = require("./PythonNativeCategoryMapping").PythonNativeCategoryMapping;

function Python3NativeCategoryMapping(mapping) {
	PythonNativeCategoryMapping.call(this, mapping.identifier, mapping.module);
	return this;
}

Python3NativeCategoryMapping.prototype = Object.create(PythonNativeCategoryMapping.prototype);
Python3NativeCategoryMapping.prototype.constructor = Python3NativeCategoryMapping;

Python3NativeCategoryMapping.prototype.toDialect = function(writer) {
    writer.append("Python3: ");
    writer.append(this.identifier);
    if(this.module!=null)
        this.module.toDialect(writer);
};

exports.Python3NativeCategoryMapping = Python3NativeCategoryMapping;

