var SetterMethodDeclaration = require("./SetterMethodDeclaration").SetterMethodDeclaration;

function NativeSetterMethodDeclaration(id, statements) {
    SetterMethodDeclaration.call(this, id, statements);
    return this;
}

NativeSetterMethodDeclaration.prototype = Object.create(SetterMethodDeclaration.prototype);
NativeSetterMethodDeclaration.prototype.contructor = NativeSetterMethodDeclaration;


exports.NativeSetterMethodDeclaration = NativeSetterMethodDeclaration;