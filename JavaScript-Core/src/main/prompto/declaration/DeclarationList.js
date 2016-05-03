var ObjectList = require("../utils/ObjectList").ObjectList;
var AttributeDeclaration = require("./AttributeDeclaration").AttributeDeclaration;
var CategoryDeclaration = require("./CategoryDeclaration").CategoryDeclaration;
var EnumeratedNativeDeclaration = require("./EnumeratedNativeDeclaration").EnumeratedNativeDeclaration;
var BaseMethodDeclaration = require("./BaseMethodDeclaration").BaseMethodDeclaration;
var TestMethodDeclaration = require("./TestMethodDeclaration").TestMethodDeclaration;

function DeclarationList(items, item) {
	items = items || [];
	ObjectList.call(this, items);
	item = item || null;
	if(item!==null) {
		this.add(item);
	}
	return this;
}

DeclarationList.prototype = Object.create(ObjectList.prototype);
DeclarationList.prototype.constructor = DeclarationList;

DeclarationList.prototype.register = function(context) {
    this.registerAttributes(context);
    this.registerCategories(context);
    this.registerEnumerated(context);
    this.registerMethods(context);
    this.registerTests(context);
};

DeclarationList.prototype.registerAttributes = function(context) {
    this.forEach(function (decl) {
        if(decl instanceof AttributeDeclaration)
            decl.register(context);
    });
};

DeclarationList.prototype.registerCategories = function(context) {
    this.forEach(function (decl) {
        if(decl instanceof CategoryDeclaration)
            decl.register(context);
    });
};

DeclarationList.prototype.registerEnumerated = function(context) {
    this.forEach(function (decl) {
        if(decl instanceof EnumeratedNativeDeclaration)
            decl.register(context);
    });
};

DeclarationList.prototype.registerMethods = function(context) {
    this.forEach(function (decl) {
        if(decl instanceof BaseMethodDeclaration)
            decl.register(context);
    });
};

DeclarationList.prototype.registerTests = function(context) {
    this.forEach(function (decl) {
        if(decl instanceof TestMethodDeclaration)
            decl.register(context);
    });
};

DeclarationList.prototype.unregister = function(context) {
    this.forEach(function(decl) {
        decl.unregister(context);
    });
};

DeclarationList.prototype.check = function(context) {
    this.forEach(function(decl) {
        decl.check(context);
    });
};

DeclarationList.prototype.toDialect = function(writer) {
    this.forEach(function(decl) {
        if(decl.comments) {
            decl.comments.forEach(function (cmt) {
                cmt.toDialect(writer);
            });
        }
        decl.toDialect(writer);
        writer.append("\n");
    });
};


exports.DeclarationList = DeclarationList;