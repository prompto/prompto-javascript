var CategoryDeclaration = require("./CategoryDeclaration").CategoryDeclaration;
var getTypeName = require("../JavaScript/JavaScriptUtils").getTypeName;
var getFunctionName = require("../JavaScript/JavaScriptUtils").getFunctionName;
var NativeInstance = require("../value/NativeInstance").NativeInstance;
var SyntaxError = require("../error/SyntaxError").SyntaxError;
var JavaScriptNativeCategoryBinding = require("../javascript/JavaScriptNativeCategoryBinding").JavaScriptNativeCategoryBinding;

function NativeCategoryDeclaration(name, attributes, categoryBindings, attributeBindings) {
	CategoryDeclaration.call(this, name, attributes);
	this.categoryBindings = categoryBindings;
	this.attributeBindings = attributeBindings;
	this.mapped = null;
	return this;
}

NativeCategoryDeclaration.prototype = Object.create(CategoryDeclaration.prototype);
NativeCategoryDeclaration.prototype.constructor = NativeCategoryDeclaration;

NativeCategoryDeclaration.prototype.register = function(context) {
    context.registerDeclaration(this);
    var mapped = this.getMapped(false);
    if(mapped!=null) {
        var name = getFunctionName(mapped);
        context.registerNativeBinding(name, this);
    }
};

NativeCategoryDeclaration.prototype.toEDialect = function(writer) {
    this.protoToEDialect(writer, false, true);
    this.bindingsToEDialect(writer);
};

NativeCategoryDeclaration.prototype.categoryTypeToEDialect = function(writer) {
    writer.append("native category");
};

NativeCategoryDeclaration.prototype.bindingsToEDialect = function(writer) {
    writer.indent();
    this.categoryBindings.toDialect(writer);
    writer.dedent();
    writer.newLine();
};

NativeCategoryDeclaration.prototype.toODialect = function(writer) {
    var hasBody = true; // always one
    this.allToODialect(writer, hasBody);
};

NativeCategoryDeclaration.prototype.categoryTypeToODialect = function(writer) {
    writer.append("native category");
};

NativeCategoryDeclaration.prototype.bodyToODialect = function(writer) {
    this.categoryBindings.toDialect(writer);
};

NativeCategoryDeclaration.prototype.toSDialect = function(writer) {
    this.protoToPDialect(writer, null);
    writer.indent();
    writer.newLine();
    this.categoryBindings.toDialect(writer);
    writer.dedent();
    writer.newLine();
};

NativeCategoryDeclaration.prototype.categoryTypeToPDialect = function(writer) {
    writer.append("native category");
};

NativeCategoryDeclaration.prototype.newInstance = function() {
	return new NativeInstance(this);
};

NativeCategoryDeclaration.prototype.getMapped = function(fail) {
	if(this.mapped==null) {
		var binding = this.getBinding(fail);
        if(binding!=null) {
            this.mapped = binding.resolve();
            if(fail && this.mapped==null)
                throw new SyntaxError("No JavaScript function:" + binding.toString());
		}
	}
	return this.mapped;
};

NativeCategoryDeclaration.prototype.getBinding = function(fail) {
	for(var i=0;i<this.categoryBindings.length;i++) {
		if(this.categoryBindings[i] instanceof JavaScriptNativeCategoryBinding) {
			return this.categoryBindings[i];
		}
	}
    if(fail)
	    throw new SyntaxError("Missing JavaScript binding for category: " + this.name);
    else
        return null;
};

exports.NativeCategoryDeclaration = NativeCategoryDeclaration;