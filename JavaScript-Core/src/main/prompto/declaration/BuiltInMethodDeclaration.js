var BaseMethodDeclaration = require("./BaseMethodDeclaration").BaseMethodDeclaration;
var ArgumentList = require("../grammar/ArgumentList").ArgumentList;
var BuiltInContext = require("../runtime/Context").BuiltInContext;

function BuiltInMethodDeclaration(name, arg) {
    var args = arg ? new ArgumentList(arg) : null;
    BaseMethodDeclaration.call(this, name, args);
    return this;
}

BuiltInMethodDeclaration.prototype = Object.create(BaseMethodDeclaration.prototype);
BuiltInMethodDeclaration.prototype.constructor = BuiltInMethodDeclaration;

BuiltInMethodDeclaration.prototype.getValue = function(context) {
    while (context) {
        if (context instanceof BuiltInContext)
            return context.value;
        context = context.getParentContext();
    }
    throw new InternalError("Could not locate context for built-in value!");
};

exports.BuiltInMethodDeclaration = BuiltInMethodDeclaration;
