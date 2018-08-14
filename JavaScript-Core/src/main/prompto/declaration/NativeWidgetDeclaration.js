var NativeCategoryDeclaration = require("./NativeCategoryDeclaration").NativeCategoryDeclaration;

function NativeWidgetDeclaration(name, categoryBindings, methods) {
    NativeCategoryDeclaration.call(this, name, null, categoryBindings, null, methods);
    return this;
}


NativeWidgetDeclaration.prototype = Object.create(NativeCategoryDeclaration.prototype);
NativeWidgetDeclaration.prototype.constructor = NativeCategoryDeclaration;

NativeWidgetDeclaration.prototype.isWidget = function(context) {
    return true;
};

NativeWidgetDeclaration.prototype.getDeclarationType = function() {
    return "Widget";
};


NativeWidgetDeclaration.prototype.getBoundFunction = function(fail) {
    if(this.bound==null) {
        var binding = this.getBinding(fail);
        if(binding!=null) {
            this.bound = binding.resolveWidget();
            if(fail && this.bound==null)
                throw new SyntaxError("No JavaScript function:" + binding.toString());
        }
    }
    return this.bound;
};

NativeWidgetDeclaration.prototype.categoryTypeToEDialect = function(writer) {
    writer.append("native widget");
};

NativeWidgetDeclaration.prototype.categoryTypeToODialect = function(writer) {
    writer.append("native widget");
};

NativeWidgetDeclaration.prototype.categoryTypeToMDialect = function(writer) {
    writer.append("native widget");
};

NativeWidgetDeclaration.prototype.transpile = function(transpiler) {
    var binding = this.getBinding();
    binding.transpileWidget(transpiler);
    return true;
};


exports.NativeWidgetDeclaration = NativeWidgetDeclaration;
