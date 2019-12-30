var BuiltInMethodDeclaration = require("../declaration/BuiltInMethodDeclaration").BuiltInMethodDeclaration;
var ListType = require("./ListType").ListType;

function ToListMethodDeclaration(itemType) {
    BuiltInMethodDeclaration.call(this, "toList");
    this.itemType = itemType;
    return this;
}

ToListMethodDeclaration.prototype = Object.create(BuiltInMethodDeclaration.prototype);
ToListMethodDeclaration.prototype.constructor = ToListMethodDeclaration;

ToListMethodDeclaration.prototype.interpret = function(context) {
    var value = this.getValue(context);
    return value.toListValue(context);
};

ToListMethodDeclaration.prototype.check = function(context) {
    return new ListType(this.itemType);
};

ToListMethodDeclaration.prototype.declareCall = function(transpiler) {
    var List = require("../intrinsic/List").List;
    transpiler.require(List);
};

ToListMethodDeclaration.prototype.transpileCall = function(transpiler, assignments) {
    transpiler.append("toList()");
};

exports.ToListMethodDeclaration = ToListMethodDeclaration;