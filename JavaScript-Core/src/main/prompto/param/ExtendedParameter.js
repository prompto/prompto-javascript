var CategoryParameter = require("./CategoryParameter").CategoryParameter;
var IdentifierList = require("../grammar/IdentifierList").IdentifierList;
var AttributeDeclaration = require("../declaration/AttributeDeclaration").AttributeDeclaration;
var ConcreteCategoryDeclaration = null;
var utils = require("../utils/index");

exports.resolve = function() {
    ConcreteCategoryDeclaration = require("../declaration/ConcreteCategoryDeclaration").ConcreteCategoryDeclaration;
}

function ExtendedParameter(type, id, attributes) {
    CategoryParameter.call(this, type, id);
	this.attributes = attributes;
	return this;
}

ExtendedParameter.prototype = Object.create(CategoryParameter.prototype);
ExtendedParameter.prototype.constructor = ExtendedParameter;



ExtendedParameter.prototype.getProto = function() {
	return this.type.name + '(' + this.attributes.toString() + ')';
};
	


ExtendedParameter.prototype.equals = function(obj) {
	if(obj===this) {
		return true;
	} 
	if(obj===null || obj===undefined) {
		return false;
	}
	if(!(obj instanceof ExtendedParameter)) {
		return false;
	}
	return utils.equalObjects(this.type, obj.type) && 
		this.name===obj.name && 
		utils.equalArrays(this.attributes, obj.attributes);
};

ExtendedParameter.prototype.register = function(context) {
	var actual = context.getRegisteredValue(this.name);
	if(actual!==null) {
		throw new SyntaxError("Duplicate argument: \"" + this.id.name + "\"");
	}
    var declaration = new ConcreteCategoryDeclaration(this.id, this.attributes, new IdentifierList(this.type.id), null);
    context.registerDeclaration(declaration);
	context.registerValue(this);
    if(this.defaultExpression!=null)
        context.setValue(this.id, this.defaultExpression.interpret(context));
};

ExtendedParameter.prototype.check = function(context) {
	this.type.checkExists(context);
	if(this.attributes!==null) {
		this.attributes.forEach(function(attr) {
			var actual = context.getRegisteredDeclaration(attr);
			if (!(actual instanceof AttributeDeclaration)) {
				throw new SyntaxError("Unknown attribute: \"" + attr + "\"");
			}
		});
	}
};

ExtendedParameter.prototype.getType = function(context) {
    var decl = context.getRegisteredDeclaration(this.name);
    return decl ? decl.getType(context) : this.type;
};

ExtendedParameter.prototype.toEDialect = function(writer) {
    this.type.toDialect(writer);
    writer.append(' ');
    writer.append(this.name);
    switch(this.attributes.length) {
        case 0:
            break;
        case 1:
            writer.append(" with attribute ");
            this.attributes.toDialect(writer, false);
            break;
        default:
            writer.append(" with attributes ");
            this.attributes.toDialect(writer, true);
            break;
    }
};

ExtendedParameter.prototype.toODialect = function(writer) {
    this.type.toDialect(writer);
    writer.append('(');
    this.attributes.toDialect(writer, false);
    writer.append(')');
    writer.append(' ');
    writer.append(this.name);
};

ExtendedParameter.prototype.toMDialect = function(writer) {
    writer.append(this.name);
    writer.append(':');
    this.type.toDialect(writer);
    writer.append('(');
    this.attributes.toDialect(writer, false);
    writer.append(')');
};

exports.ExtendedParameter = ExtendedParameter;
