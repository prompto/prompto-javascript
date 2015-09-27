var NativeCategoryDeclaration = require("./NativeCategoryDeclaration").NativeCategoryDeclaration;
var ResourceType = require("../type/ResourceType").ResourceType;
var NativeResource = require("../value/NativeResource").NativeResource;
var ResourceContext = require("../runtime/Context").ResourceContext;

function NativeResourceDeclaration(id, attributes, categoryBindings, attributeBindings, methods) {
	NativeCategoryDeclaration.call(this, id, attributes, categoryBindings, attributeBindings, methods);
	return this;
}

NativeResourceDeclaration.prototype = Object.create(NativeCategoryDeclaration.prototype);
NativeResourceDeclaration.prototype.constructor = NativeResourceDeclaration;


NativeResourceDeclaration.prototype.getType = function(context) {
	return new ResourceType(this.id);
};


NativeResourceDeclaration.prototype.newInstance = function() {
	return new NativeResource(this);
};

NativeResourceDeclaration.prototype.checkConstructorContext = function(context) {
	if(!(context instanceof ResourceContext))
        context.problemListener.reportNotAResourceContext(this);
};

NativeResourceDeclaration.prototype.categoryTypeToEDialect = function(writer) {
    writer.append("native resource");
};

NativeResourceDeclaration.prototype.categoryTypeToODialect = function(writer) {
    writer.append("native resource");
};

NativeResourceDeclaration.prototype.categoryTypeToSDialect = function(writer) {
    writer.append("native resource");
};



exports.NativeResourceDeclaration = NativeResourceDeclaration;
