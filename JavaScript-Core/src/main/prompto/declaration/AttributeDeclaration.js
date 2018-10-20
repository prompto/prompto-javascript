var BaseDeclaration = require("./BaseDeclaration").BaseDeclaration;
var InternalError = require("../error/InternalError").InternalError;
var ContainerType = require("../type/ContainerType").ContainerType;
var AttributeInfo = require("../store/AttributeInfo").AttributeInfo;
var Value = require("../value/Value").Value;

function AttributeDeclaration(id, type, constraint, indexTypes) {
	BaseDeclaration.call(this, id);
	this.type = type;
	this.constraint = constraint;
    this.indexTypes = indexTypes;
    this.storable = false;
    return this;
}

AttributeDeclaration.prototype = Object.create(BaseDeclaration.prototype);
AttributeDeclaration.prototype.constructor = AttributeDeclaration;

AttributeDeclaration.prototype.getDeclarationType = function() {
    return "Attribute";
};

AttributeDeclaration.prototype.getType = function() {
	return this.type;
};
	
AttributeDeclaration.prototype.toString = function() {
	return this.name + ':' + this.type.toString();
};

AttributeDeclaration.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

AttributeDeclaration.prototype.toEDialect = function(writer) {
    writer.append("define ");
    writer.append(this.name);
    writer.append(" as ");
    if(this.storable)
        writer.append("storable ");
    this.type.toDialect(writer);
    writer.append(" attribute");
    if (this.constraint != null)
        this.constraint.toDialect(writer);
    if (this.indexTypes != null) {
        writer.append(" with ");
        this.indexTypes.toDialect(writer, true);
        writer.append(" index");
    }
};

AttributeDeclaration.prototype.toODialect = function(writer) {
    if(this.storable)
        writer.append("storable ");
    writer.append("attribute ");
    writer.append(this.name);
    writer.append(" : ");
    this.type.toDialect(writer);
    if (this.constraint != null)
        this.constraint.toDialect(writer);
    if (this.indexTypes != null) {
        writer.append(" with index")
        if (this.indexTypes.length > 0) {
            writer.append(" (");
            this.indexTypes.toDialect(writer, false);
            writer.append(')');
        }
    }
    writer.append(';');
};

AttributeDeclaration.prototype.toMDialect = function(writer) {
    if(this.storable)
        writer.append("storable ");
    writer.append("attr ");
    writer.append(this.name);
    writer.append(" ( ");
    this.type.toDialect(writer);
    writer.append(" ):\n");
    writer.indent();
    if (this.constraint != null)
        this.constraint.toDialect(writer);
    if (this.indexTypes != null) {
        if (this.constraint != null)
            writer.newLine();
        writer.append("index (");
        this.indexTypes.toDialect(writer, false);
        writer.append(')');
    }
    if (this.constraint ==null && this.indexTypes ==null)
        writer.append("pass");
    writer.dedent();
};

AttributeDeclaration.prototype.register = function(context) {
	context.registerDeclaration(this);
};

AttributeDeclaration.prototype.check = function(context, isStart) {
	this.type.checkExists(context);
	return this.type;
};

AttributeDeclaration.prototype.checkValue = function(context, expression) {
    var value = expression.interpret(context);
	if(this.constraint==null) {
		return value;
	}
	this.constraint.checkValue(context, value);
	return value;
};

AttributeDeclaration.prototype.getAttributeInfo = function() {
    var collection = this.type instanceof ContainerType;
    var family = collection ? this.type.itemType.family : this.type.family;
    return new AttributeInfo(this.name, family, collection, this.indexTypes);
};

AttributeDeclaration.prototype.declare = function(transpiler) {
    this.type.declare(transpiler);
    if(this.constraint)
        this.constraint.declare(transpiler, this.name, this.type);
};

exports.AttributeDeclaration = AttributeDeclaration;