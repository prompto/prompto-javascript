var GetterMethodDeclaration = require("./GetterMethodDeclaration").GetterMethodDeclaration;

function NativeGetterMethodDeclaration(id, statements) {
    GetterMethodDeclaration.call(this, id, statements);
    return this;
}

NativeGetterMethodDeclaration.prototype = Object.create(GetterMethodDeclaration.prototype);
NativeGetterMethodDeclaration.prototype.contructor = NativeGetterMethodDeclaration;

NativeGetterMethodDeclaration.prototype.interpret = function(context) {
    context.enterMethod(this);
    try {
        var result = this.statements.interpretNative(context, this.returnType);
        return this.castToReturnType(context, result);
    } finally {
        context.leaveMethod(this);
    }
};

NativeGetterMethodDeclaration.prototype.castToReturnType = function(context, value) {
    // can only cast to specified type, and if required
    if(this.returnType!=null && !(this.returnType.isAssignableFrom(context, value.type))) {
        // only cast if implemented, on a per type basis
        if(this.returnType.nativeCast)
            value = this.returnType.nativeCast(context, value);
    }
    return value;
};

exports.NativeGetterMethodDeclaration = NativeGetterMethodDeclaration;