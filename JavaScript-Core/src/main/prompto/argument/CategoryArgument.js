var Argument = require("./Argument").Argument;
var IdentifierList = require("../grammar/IdentifierList").IdentifierList;
var utils = require("../utils/index");

function CategoryArgument(type, id) {
	Argument.call(this, id);
	this.type = type;
	return this;
}

CategoryArgument.prototype = Object.create(Argument.prototype);
CategoryArgument.prototype.constructor = CategoryArgument;

/*
	public CategoryArgument(IType type, String name) {
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

CategoryArgument.prototype.getProto = function(context) {
	return this.type.name;
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

CategoryArgument.prototype.equals = function(obj) {
	if(obj===this) {
		return true;
	} 
	if(obj===null || obj===undefined) {
		return false;
	}
	if(!(obj instanceof CategoryArgument)) {
		return false;
	}
	return utils.equalObjects(this.type, obj.type) && this.name===obj.name;
};

CategoryArgument.prototype.register = function(context) {
	var actual = context.getRegisteredValue(this.id.name);
	if(actual!==null) {
		throw new SyntaxError("Duplicate argument: \"" + this.id.name + "\"");
	}
	context.registerValue(this);
    if(this.defaultExpression!=null)
        context.setValue(this.id, this.defaultExpression.interpret(context));
};

CategoryArgument.prototype.check = function(context) {
	this.type.checkExists(context);
};

CategoryArgument.prototype.getType = function(context) {
	return this.type;
};

CategoryArgument.prototype.toEDialect = function(writer) {
    var anonymous = "any"==this.type.name;
    this.type.toDialect(writer);
    if(anonymous) {
        writer.append(' ');
        writer.append(this.name);
    }
    if(!anonymous) {
        writer.append(' ');
        writer.append(this.name);
    }
};

CategoryArgument.prototype.toODialect = function(writer) {
    this.type.toDialect(writer);
    writer.append(' ');
    writer.append(this.name);
};

CategoryArgument.prototype.toSDialect = function(writer) {
    writer.append(this.name);
    writer.append(':');
    this.type.toDialect(writer);
};

exports.CategoryArgument = CategoryArgument;
