var BaseDeclaration = require("./BaseDeclaration").BaseDeclaration;

function BaseCategoryMethodDeclaration(name, arguments, instructions) {
	BaseDeclaration.call(this, name);
	this.arguments = arguments;
	this.instructions = instructions;
	return this;
}

BaseCategoryMethodDeclaration.prototype = Object.create(BaseDeclaration.prototype);
BaseCategoryMethodDeclaration.prototype.constructor = BaseCategoryMethodDeclaration;

BaseCategoryMethodDeclaration.prototype.memberCheck = function(category, context) {
	// TODO
};

exports.BaseCategoryMethodDeclaration = BaseCategoryMethodDeclaration;

