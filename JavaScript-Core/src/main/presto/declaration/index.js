exports.AttributeDeclaration = require('./AttributeDeclaration').AttributeDeclaration;
exports.CategoryDeclaration = require('./CategoryDeclaration').CategoryDeclaration;
exports.ConcreteCategoryDeclaration = require('./ConcreteCategoryDeclaration').ConcreteCategoryDeclaration;
exports.AbstractMethodDeclaration = require('./AbstractMethodDeclaration').AbstractMethodDeclaration;
exports.ConcreteMethodDeclaration = require('./ConcreteMethodDeclaration').ConcreteMethodDeclaration;
exports.NativeMethodDeclaration = require('./NativeMethodDeclaration').NativeMethodDeclaration;
exports.EnumeratedCategoryDeclaration = require('./EnumeratedCategoryDeclaration').EnumeratedCategoryDeclaration;
exports.SingletonCategoryDeclaration = require('./SingletonCategoryDeclaration').SingletonCategoryDeclaration;
exports.NativeCategoryDeclaration = require('./NativeCategoryDeclaration').NativeCategoryDeclaration;
exports.NativeResourceDeclaration = require('./NativeResourceDeclaration').NativeResourceDeclaration;
exports.EnumeratedNativeDeclaration = require("./EnumeratedNativeDeclaration").EnumeratedNativeDeclaration;
exports.MemberMethodDeclaration = require("./MemberMethodDeclaration").MemberMethodDeclaration;
exports.OperatorMethodDeclaration = require("./OperatorMethodDeclaration").OperatorMethodDeclaration;
exports.GetterMethodDeclaration = require("./GetterMethodDeclaration").GetterMethodDeclaration;
exports.SetterMethodDeclaration = require("./SetterMethodDeclaration").SetterMethodDeclaration;
exports.CategoryMethodList = require("./CategoryMethodList").CategoryMethodList;

require('./BaseMethodDeclaration').resolve();
require('./ConcreteCategoryDeclaration').resolve();