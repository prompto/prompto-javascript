var SetterMethodDeclaration = require("./SetterMethodDeclaration").SetterMethodDeclaration;

class NativeSetterMethodDeclaration extends SetterMethodDeclaration {
    constructor(id, statements) {
        super(id, statements);
        return this;
    }
}

NativeSetterMethodDeclaration.prototype.contructor = NativeSetterMethodDeclaration;


exports.NativeSetterMethodDeclaration = NativeSetterMethodDeclaration;