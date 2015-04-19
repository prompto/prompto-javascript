var CategoryDeclaration = require("./CategoryDeclaration").CategoryDeclaration;
var getTypeName = require("../JavaScript/JavaScriptUtils").getTypeName;
var getFunctionName = require("../JavaScript/JavaScriptUtils").getFunctionName;
var NativeInstance = require("../value/NativeInstance").NativeInstance;
var SyntaxError = require("../error/SyntaxError").SyntaxError;
var JavaScriptNativeCategoryMapping = require("../javascript/JavaScriptNativeCategoryMapping").JavaScriptNativeCategoryMapping;

function NativeCategoryDeclaration(name, attributes, categoryMappings, attributeMappings) {
	CategoryDeclaration.call(this, name, attributes);
	this.categoryMappings = categoryMappings;
	this.attributeMappings = attributeMappings;
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
        context.registerNativeMapping(name, this);
    }
};

NativeCategoryDeclaration.prototype.toEDialect = function(writer) {
    this.protoToEDialect(writer, false, true);
    this.mappingsToEDialect(writer);
};

NativeCategoryDeclaration.prototype.categoryTypeToEDialect = function(writer) {
    writer.append("native category");
};

NativeCategoryDeclaration.prototype.mappingsToEDialect = function(writer) {
    writer.indent();
    this.categoryMappings.toDialect(writer);
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
    this.categoryMappings.toDialect(writer);
};

NativeCategoryDeclaration.prototype.toSDialect = function(writer) {
    this.protoToPDialect(writer, null);
    writer.indent();
    writer.newLine();
    this.categoryMappings.toDialect(writer);
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
		var mapping = this.getMapping(fail);
        if(mapping!=null) {
            this.mapped = mapping.resolve();
            if(fail && this.mapped==null)
                throw new SyntaxError("No JavaScript function:" + mapping.toString());
		}
	}
	return this.mapped;
};

NativeCategoryDeclaration.prototype.getMapping = function(fail) {
	for(var i=0;i<this.categoryMappings.length;i++) {
		if(this.categoryMappings[i] instanceof JavaScriptNativeCategoryMapping) {
			return this.categoryMappings[i];
		}
	}
    if(fail)
	    throw new SyntaxError("Missing JavaScript mapping for category: " + this.name);
    else
        return null;
};

exports.NativeCategoryDeclaration = NativeCategoryDeclaration;