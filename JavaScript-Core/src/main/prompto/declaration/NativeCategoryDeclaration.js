var ConcreteCategoryDeclaration = require("./ConcreteCategoryDeclaration").ConcreteCategoryDeclaration;
var getTypeName = require("../javascript/JavaScriptUtils").getTypeName;
var NativeInstance = require("../value/NativeInstance").NativeInstance;
var JavaScriptNativeCategoryBinding = require("../javascript/JavaScriptNativeCategoryBinding").JavaScriptNativeCategoryBinding;

function NativeCategoryDeclaration(id, attributes, categoryBindings, attributeBindings, methods) {
    ConcreteCategoryDeclaration.call(this, id, attributes, null, methods);
	this.categoryBindings = categoryBindings;
	this.attributeBindings = attributeBindings;
	this.bound = null;
	return this;
}

NativeCategoryDeclaration.prototype = Object.create(ConcreteCategoryDeclaration.prototype);
NativeCategoryDeclaration.prototype.constructor = NativeCategoryDeclaration;

NativeCategoryDeclaration.prototype.register = function(context) {
    context.registerDeclaration(this);
    var bound = this.getBoundFunction(false);
    if(bound!=null) {
        var name = getTypeName(bound);
        context.registerNativeBinding(name, this);
    }
};

NativeCategoryDeclaration.prototype.toEDialect = function(writer) {
    this.protoToEDialect(writer, false, true);
    this.bindingsToEDialect(writer);
    if(this.methods!=null && this.methods.length>0) {
        writer.append("and methods:");
        writer.newLine();
        this.methodsToEDialect(writer, this.methods);
    }
};

NativeCategoryDeclaration.prototype.categoryTypeToEDialect = function(writer) {
    writer.append("native category");
};

NativeCategoryDeclaration.prototype.bindingsToEDialect = function(writer) {
    writer.indent();
    this.categoryBindings.toDialect(writer);
    writer.dedent();
    writer.newLine();
};

NativeCategoryDeclaration.prototype.toODialect = function(writer) {
    var hasBody = true; // always one
    this.allToODialect(writer, hasBody);
};

NativeCategoryDeclaration.prototype.categoryTypeToODialect = function(writer) {
    writer.append("native category");
};

NativeCategoryDeclaration.prototype.bodyToODialect = function(writer) {
    this.categoryBindings.toDialect(writer);
    if(this.methods!=null && this.methods.length>0) {
        writer.newLine();
        writer.newLine();
        this.methodsToODialect(writer, this.methods);
    }
};

NativeCategoryDeclaration.prototype.toMDialect = function(writer) {
    this.protoToMDialect(writer, null);
    writer.indent();
    writer.newLine();
    this.categoryBindings.toDialect(writer);
    if(this.methods!=null && this.methods.length>0) {
        this.methods.forEach(function(method) {
            var w = writer.newMemberWriter();
            method.toDialect(w);
            writer.newLine();
        });
    }
    writer.dedent();
    writer.newLine();
};

NativeCategoryDeclaration.prototype.categoryTypeToMDialect = function(writer) {
    writer.append("native category");
};

NativeCategoryDeclaration.prototype.newInstance = function() {
	return new NativeInstance(this);
};

NativeCategoryDeclaration.prototype.getBoundFunction = function(fail) {
	if(this.bound==null) {
		var binding = this.getBinding(fail);
        if(binding!=null) {
            this.bound = binding.resolve();
            if(fail && this.bound==null)
                throw new SyntaxError("No JavaScript function:" + binding.toString());
		}
	}
	return this.bound;
};

NativeCategoryDeclaration.prototype.getBinding = function(fail) {
	for(var i=0;i<this.categoryBindings.length;i++) {
		if(this.categoryBindings[i] instanceof JavaScriptNativeCategoryBinding) {
			return this.categoryBindings[i];
		}
	}
    if(fail)
	    throw new SyntaxError("Missing JavaScript binding for category: " + this.name);
    else
        return null;
};

exports.NativeCategoryDeclaration = NativeCategoryDeclaration;