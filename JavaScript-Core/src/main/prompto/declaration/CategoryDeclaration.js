var AttributeDeclaration = require("./AttributeDeclaration").AttributeDeclaration;
var BaseDeclaration = require("./BaseDeclaration").BaseDeclaration;
var CategoryType = require("../type/CategoryType").CategoryType;
var TypeUtils = require("../utils/TypeUtils");
var Identifier = require("../grammar/Identifier").Identifier;
var DocumentValue = require("../value/DocumentValue").DocumentValue;
var NullValue = require("../value/NullValue").NullValue;

function CategoryDeclaration(id, attributes) {
	BaseDeclaration.call(this, id);
	this.attributes = attributes || null;
	this.derivedFrom = null;
    this.storable = false;
    return this;
}

CategoryDeclaration.prototype = Object.create(BaseDeclaration.prototype);
CategoryDeclaration.prototype.constructor = CategoryDeclaration;

CategoryDeclaration.prototype.getDeclarationType = function() {
    return "Category";
};

CategoryDeclaration.prototype.newInstanceFromStored = function(context, stored) {
    var instance = this.newInstance(context);
    instance.mutable = true;
    try {
        var dbId = stored.dbId;
        var value = TypeUtils.convertFromJavaScript(dbId);
        instance.setMember(context, "dbId", value);
        var allAttributes = this.getAllAttributes(context);
        allAttributes.forEach(function(name) {
            var decl = context.getRegisteredDeclaration(name);
            if (decl.storable) {
                var data = stored.getData(name);
                var value = data==null ? NullValue.instance : decl.getType(context).convertJavaScriptValueToPromptoValue(context, data, null)
                instance.setMember(context, name, value);
            }
        }, this);
    } finally {
        instance.mutable = false;
    }
    return instance;
};

CategoryDeclaration.prototype.getAllAttributes = function(context) {
    if(this.attributes)
        return new Set(this.attributes);
    else
        return null;
};


CategoryDeclaration.prototype.register = function(context) {
	context.registerDeclaration(this);
    this.registerMethods(context);
};

CategoryDeclaration.prototype.check = function(context) {
	if(this.attributes!=null) {
		this.attributes.forEach(function(id) {
			var ad = context.getRegisteredDeclaration(id.name);
			if (ad == null)
                context.problemListener.reportUnknownAttribute(id)
		});
	}
	return new CategoryType(this.id);
}

CategoryDeclaration.prototype.getType = function(context) {
	return new CategoryType(this.id);
};

CategoryDeclaration.prototype.hasAttribute = function(context, name) {
	if(this.attributes==null)
        return false;
    var names = this.attributes.map(function(attr) { return attr.name; });
    return names.indexOf(name)>=0;
};

CategoryDeclaration.prototype.hasMethod = function(context, key, object) {
	return false;
};

CategoryDeclaration.prototype.isDerivedFrom = function(context, categoryType) {
	return false;
};


CategoryDeclaration.prototype.checkConstructorContext = function(context) {
	// nothing to do
};

CategoryDeclaration.prototype.toDialect = function(writer) {
    var type = this.getType(writer.context);
    writer = writer.newInstanceWriter(type);
    writer.toDialect(this);
};


CategoryDeclaration.prototype.protoToEDialect = function(writer, hasMethods, hasBindings) {
    var hasAttributes = this.attributes!=null && this.attributes.length>0;
    writer.append("define ");
    writer.append(this.name);
    writer.append(" as ");
    if(this.storable)
        writer.append("storable ");
    this.categoryTypeToEDialect(writer);
    if(hasAttributes) {
        if(this.attributes.length==1)
            writer.append(" with attribute ");
        else
            writer.append(" with attributes ");
        this.attributes.toDialect(writer, true);
    }
    if(hasMethods) {
        if(hasAttributes)
            writer.append(", and methods:");
        else
            writer.append(" with methods:");
    } else if (hasBindings) {
        if(hasAttributes)
            writer.append(", and bindings:");
        else
            writer.append(" with bindings:");
    }
    writer.newLine();
};


CategoryDeclaration.prototype.methodsToEDialect = function(writer, methods) {
    writer.indent();
    methods.forEach(function(method) {
        writer.newLine();
        var w = writer.newMemberWriter();
        method.toDialect(w);
    });
    writer.dedent();
};

CategoryDeclaration.prototype.methodsToODialect = function(writer, methods) {
    methods.forEach(function(method) {
        var w = writer.newMemberWriter();
        method.toDialect(w);
        w.newLine();
    });
}


CategoryDeclaration.prototype.allToODialect = function(writer, hasBody) {
    if(this.storable)
        writer.append("storable ");
    this.categoryTypeToODialect(writer);
    writer.append(" ");
    writer.append(this.name);
    if(this.attributes!=null) {
        writer.append('(');
        this.attributes.toDialect(writer, true);
        writer.append(')');
    }
    this.categoryExtensionToODialect(writer);
    if(hasBody) {
        writer.append(" {\n");
        writer.newLine();
        writer.indent();
        this.bodyToODialect(writer);
        writer.dedent();
        writer.append('}');
        writer.newLine();
    } else
        writer.append(';');
};

CategoryDeclaration.prototype.categoryExtensionToODialect = function(writer) {
    // by default no extension
};


CategoryDeclaration.prototype.protoToMDialect = function(writer, derivedFrom) {
    if(this.storable)
        writer.append("storable ");
    this.categoryTypeToMDialect(writer);
    writer.append(" ");
    writer.append(this.name);
    writer.append("(");
    if(this.derivedFrom!=null) {
        this.derivedFrom.toDialect(writer, false);
        if(this.attributes!=null)
            writer.append(", ");
    }
    if(this.attributes!=null)
        this.attributes.toDialect(writer, false);
    writer.append("):\n");
};


exports.CategoryDeclaration = CategoryDeclaration;

