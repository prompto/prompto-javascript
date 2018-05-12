var BaseMethodDeclaration = require("./BaseMethodDeclaration").BaseMethodDeclaration;
var ArgumentList = require("../grammar/ArgumentList").ArgumentList;
var BuiltInContext = require("../runtime/Context").BuiltInContext;

function BuiltInMethodDeclaration(name) {
    var args = null;
    if ( arguments.length > 1 ) {
        args = new ArgumentList();
        for(var i = 1;i<arguments.length; i++) {
            args.add(arguments[i]);
        }
    }
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

BuiltInMethodDeclaration.prototype.transpileCall = function(transpiler, assignments) {
    throw new Error("Need to override transpileCall in " + this.constructor.name);
};

exports.BuiltInMethodDeclaration = BuiltInMethodDeclaration;
