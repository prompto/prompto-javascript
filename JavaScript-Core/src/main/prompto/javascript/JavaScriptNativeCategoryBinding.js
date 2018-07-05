var NativeCategoryBinding = require("./../grammar/NativeCategoryBinding").NativeCategoryBinding;

function JavaScriptNativeCategoryBinding(identifier, module) {
	NativeCategoryBinding.call(this);
	this.identifier = identifier;
	this.module = module || null;
	return this;
}

JavaScriptNativeCategoryBinding.prototype = Object.create(NativeCategoryBinding.prototype);
JavaScriptNativeCategoryBinding.prototype.creator = JavaScriptNativeCategoryBinding;

JavaScriptNativeCategoryBinding.prototype.resolve = function() {
	var m = this.resolve_module();
	if(m==null) {
		return eval(this.identifier);
	} else {
		return m[this.identifier] || null;
	}
};

JavaScriptNativeCategoryBinding.prototype.resolve_module = function(context) {
	if (this.module == null) {
		return null;
	} else {
		return this.module.resolve();
	}
};


JavaScriptNativeCategoryBinding.prototype.resolveWidget = function(context) {
    var m = this.resolve_widget_module();
    if(m==null) {
        return eval(this.identifier);
    } else {
        return m[this.identifier] || null;
    }
};


JavaScriptNativeCategoryBinding.prototype.resolve_widget_module = function(context) {
    if (this.module == null) {
        return null;
    } else {
        return eval(this.module.toString());
    }
};


JavaScriptNativeCategoryBinding.prototype.toDialect = function(writer) {
    writer.append("JavaScript: ");
    writer.append(this.identifier);
    if(this.module!=null)
        this.module.toDialect(writer);
};

JavaScriptNativeCategoryBinding.prototype.transpile = function(transpiler) {
    if(this.module)
        this.module.transpile(transpiler, this.identifier);
};


JavaScriptNativeCategoryBinding.prototype.transpileWidget = function(transpiler) {
    // assumption is that required module is already imported through other means
    if(this.module!=null) {
        transpiler.append("var ").append(this.identifier).append(" = ");
        this.module.transpileWidget(transpiler);
        transpiler.append(".").append(this.identifier).append(";").newLine();
    }
};

exports.JavaScriptNativeCategoryBinding = JavaScriptNativeCategoryBinding;

