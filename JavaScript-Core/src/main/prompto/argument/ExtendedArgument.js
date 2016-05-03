var CategoryArgument = require("./CategoryArgument").CategoryArgument;
var IdentifierList = require("../grammar/IdentifierList").IdentifierList;
var AttributeDeclaration = require("../declaration/AttributeDeclaration").AttributeDeclaration;
var ConcreteCategoryDeclaration = null;
var utils = require("../utils/index");

exports.resolve = function() {
    ConcreteCategoryDeclaration = require("../declaration/ConcreteCategoryDeclaration").ConcreteCategoryDeclaration;
}

function ExtendedArgument(type, id, attributes) {
    CategoryArgument.call(this, type, id);
	this.attributes = attributes;
	return this;
}

ExtendedArgument.prototype = Object.create(CategoryArgument.prototype);
ExtendedArgument.prototype.constructor = ExtendedArgument;

/*
	public ExtendedArgument(IType type, String name) {
		super(name);
		this.type = type;
	}

	public void setAttributes(IdentifierList attributes) {
		this.attributes = attributes;
	}
	
	@Override
	public IType getType() {
		return type;
	}
	
	@Override
	public String getSignature(Dialect dialect) {
		return getProto();
	}

*/

ExtendedArgument.prototype.getProto = function(context) {
	return this.type.name + '(' + this.attributes.toString() + ')';
};
	
/*
	@Override
	public String toString() {
		return name + ':' + getProto();
	}
	
	public boolean hasAttributes() {
		return attributes!=null;
	}

	public IdentifierList getAttributes() {
		return attributes;
	}
*/

ExtendedArgument.prototype.equals = function(obj) {
	if(obj===this) {
		return true;
	} 
	if(obj===null || obj===undefined) {
		return false;
	}
	if(!(obj instanceof ExtendedArgument)) {
		return false;
	}
	return utils.equalObjects(this.type, obj.type) && 
		this.name===obj.name && 
		utils.equalArrays(this.attributes, obj.attributes);
};

ExtendedArgument.prototype.register = function(context) {
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

ExtendedArgument.prototype.check = function(context) {
	this.type.checkExists(context);
	if(this.attributes!==null) {
		this.attributes.forEach(function(attr) {
			var actual = context.getRegisteredDeclaration(attr);
			if (!actual instanceof AttributeDeclaration) {
				throw new SyntaxError("Unknown attribute: \"" + attr + "\"");
			}
		});
	}
};

ExtendedArgument.prototype.getType = function(context) {
	return context.getRegisteredDeclaration(this.name).getType(context);
};

ExtendedArgument.prototype.toEDialect = function(writer) {
    var anonymous = "any"==this.type.name;
    this.type.toDialect(writer);
    if(anonymous) {
        writer.append(' ');
        writer.append(this.name);
    }
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
    if(!anonymous) {
        writer.append(' ');
        writer.append(this.name);
    }
};

ExtendedArgument.prototype.toODialect = function(writer) {
    this.type.toDialect(writer);
    writer.append('(');
    this.attributes.toDialect(writer, false);
    writer.append(')');
    writer.append(' ');
    writer.append(this.name);
};

ExtendedArgument.prototype.toSDialect = function(writer) {
    writer.append(this.name);
    writer.append(':');
    this.type.toDialect(writer);
    writer.append('(');
    this.attributes.toDialect(writer, false);
    writer.append(')');
};

exports.ExtendedArgument = ExtendedArgument;
