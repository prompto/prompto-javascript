var ObjectList = require("../utils/ObjectList").ObjectList;

function NativeCategoryBindingList(binding) {
	ObjectList.call(this);
	binding = binding || null;
	if (binding != null) {
		this.add(binding);
	}
	return this;
}

NativeCategoryBindingList.prototype = Object.create(ObjectList.prototype);
NativeCategoryBindingList.prototype.constructor = NativeCategoryBindingList;

NativeCategoryBindingList.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

NativeCategoryBindingList.prototype.toEDialect = function(writer) {
    writer.append("define category bindings as:").newLine().indent();
    this.forEach(function(binding) {
        binding.toDialect(writer);
        writer.newLine();
    });
    writer.dedent();
}

NativeCategoryBindingList.prototype.toMDialect = function(writer) {
    writer.append("def category bindings:").newLine().indent();
    this.forEach(function(binding) {
        binding.toDialect(writer);
        writer.newLine();
    });
    writer.dedent();
}

NativeCategoryBindingList.prototype.toODialect = function(writer) {
    writer.append("category bindings {").newLine().indent();
    this.forEach(function(binding) {
        binding.toDialect(writer);
        writer.append(';').newLine();
    });
    writer.dedent().append("}");
}

exports.NativeCategoryBindingList = NativeCategoryBindingList;