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
    writer.append("define category bindings as:\n");
    writer.indent();
    this.forEach(function(binding) {
        binding.toDialect(writer);
        writer.newLine();
    });
    writer.dedent();
}

NativeCategoryBindingList.prototype.toSDialect = function(writer) {
    writer.append("def category bindings:\n");
    writer.indent();
    this.forEach(function(binding) {
        binding.toDialect(writer);
        writer.newLine();
    });
    writer.dedent();
}

NativeCategoryBindingList.prototype.toODialect = function(writer) {
    writer.append("category bindings {\n");
    writer.indent();
    this.forEach(function(binding) {
        binding.toDialect(writer);
        writer.append(';');
        writer.newLine();
    });
    writer.dedent();
    writer.append("}");
}

exports.NativeCategoryBindingList = NativeCategoryBindingList;