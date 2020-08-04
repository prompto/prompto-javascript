var BaseMethodDeclaration = require("./BaseMethodDeclaration").BaseMethodDeclaration;
var ParameterList = require("../param/ParameterList").ParameterList;
var InternalError = require("../error/InternalError").InternalError;
var BuiltInContext = null;

exports.resolve = function() {
    BuiltInContext = require("../runtime/Context").BuiltInContext;
};

class BuiltInMethodDeclaration extends BaseMethodDeclaration {

    constructor(name) {
        var args = null;
        if ( arguments.length > 1 ) {
            args = new ParameterList();
            for(var i = 1;i<arguments.length; i++) {
                args.add(arguments[i]);
            }
        }
        super(name, args);
    }

    getValue(context) {
        while (context) {
            if (context instanceof BuiltInContext)
                return context.value;
            context = context.getParentContext();
        }
        throw new InternalError("Could not locate context for built-in value!");
    }

    transpileCall(transpiler, assignments) {
        throw new Error("Need to override transpileCall in " + this.constructor.name);
    }
}

exports.BuiltInMethodDeclaration = BuiltInMethodDeclaration;
