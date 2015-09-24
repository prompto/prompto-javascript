var ConcreteCategoryDeclaration = require("./ConcreteCategoryDeclaration").ConcreteCategoryDeclaration;

function SingletonCategoryDeclaration(id, attributes, methods) {
    ConcreteCategoryDeclaration.call(this, id, attributes, null, methods);
    return this;
}

SingletonCategoryDeclaration.prototype = Object.create(ConcreteCategoryDeclaration.prototype);
SingletonCategoryDeclaration.prototype.constructor = SingletonCategoryDeclaration;

SingletonCategoryDeclaration.prototype.categoryTypeToEDialect = function(writer) {
    writer.append("singleton");
};

SingletonCategoryDeclaration.prototype.categoryTypeToODialect = function(writer) {
    writer.append("singleton");
};

SingletonCategoryDeclaration.prototype.categoryTypeToSDialect = function(writer) {
    writer.append("singleton");
};

exports.SingletonCategoryDeclaration = SingletonCategoryDeclaration;