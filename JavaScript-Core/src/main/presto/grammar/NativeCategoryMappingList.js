var ObjectList = require("../utils/ObjectList").ObjectList;

function NativeCategoryMappingList(mapping) {
	ObjectList.call(this);
	mapping = mapping || null;
	if (mapping != null) {
		this.add(mapping);
	}
	return this;
}

NativeCategoryMappingList.prototype = Object.create(ObjectList.prototype);
NativeCategoryMappingList.prototype.constructor = NativeCategoryMappingList;

NativeCategoryMappingList.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

NativeCategoryMappingList.prototype.toEDialect = function(writer) {
    writer.append("define category mappings as:\n");
    writer.indent();
    for(var i = 0;i<this.length;i++) {
        this[i].toDialect(writer);
        writer.newLine();
    }
    writer.dedent();
}

NativeCategoryMappingList.prototype.toPDialect = function(writer) {
    writer.append("mappings:\n");
    writer.indent();
    for(var i = 0;i<this.length;i++) {
        this[i].toDialect(writer);
        writer.newLine();
    }
    writer.dedent();
}

NativeCategoryMappingList.prototype.toODialect = function(writer) {
    writer.append("category mappings {\n");
    writer.indent();
    for(var i = 0;i<this.length;i++) {
        this[i].toDialect(writer);
        writer.append(';');
        writer.newLine();
    }
    writer.dedent();
    writer.append("}");
}

exports.NativeCategoryMappingList = NativeCategoryMappingList;