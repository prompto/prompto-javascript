var NativeCategoryMapping = require("./../grammar/NativeCategoryMapping").NativeCategoryMapping;

function JavaScriptNativeCategoryMapping(identifier, module) {
	NativeCategoryMapping.call(this);
	this.identifier = identifier;
	this.module = module || null;
	return this;
}

JavaScriptNativeCategoryMapping.prototype = Object.create(NativeCategoryMapping.prototype);
JavaScriptNativeCategoryMapping.prototype.creator = JavaScriptNativeCategoryMapping;

JavaScriptNativeCategoryMapping.prototype.resolve = function() {
	var m = this.resolve_module();
	if(m==null) {
		return eval(this.identifier);
	} else {
		return m[this.identifier] || null;
	}
};

JavaScriptNativeCategoryMapping.prototype.resolve_module = function(context) {
	if (this.module == null) {
		return null;
	} else {
		return this.module.resolve();
	}
};

JavaScriptNativeCategoryMapping.prototype.toDialect = function(writer) {
    writer.append("JavaScript: ");
    writer.append(this.identifier);
    if(this.module!=null)
        this.module.toDialect(writer);
};

exports.JavaScriptNativeCategoryMapping = JavaScriptNativeCategoryMapping;

