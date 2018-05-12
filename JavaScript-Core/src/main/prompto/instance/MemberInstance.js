var DocumentValue = require("../value/DocumentValue").DocumentValue;
var NotMutableError = require("../error/NotMutableError").NotMutableError;

function MemberInstance(id) {
	this.parent = null;
	this.id = id;
	return this;
}

Object.defineProperty(MemberInstance.prototype, "name", {
    get : function() {
        return this.id.name;
    }
});


MemberInstance.prototype.toString = function() {
	return this.parent.toString() + "." + this.name;
};

MemberInstance.prototype.toDialect = function(writer) {
    this.parent.toDialect(writer);
    writer.append(".");
    writer.append(this.name);
};

MemberInstance.prototype.checkAssignValue = function(context, valueType) {
	return this.parent.checkAssignMember(context, this.name, valueType);
};

MemberInstance.prototype.checkAssignMember = function(context, name, valueType) {
	this.parent.checkAssignMember(context, this.name);
    return valueType; // TODO
};

MemberInstance.prototype.checkAssignItem = function(context, itemType, valueType) {
    return valueType; // TODO
};


MemberInstance.prototype.assign = function(context, expression) {
    var root = this.parent.interpret(context);
    if(!root.mutable)
        throw new NotMutableError();
	var value = expression.interpret(context);
    root.setMember(context, this.name, value);
};

MemberInstance.prototype.transpileAssign = function(transpiler, expression) {
    this.parent.transpile(transpiler);
    transpiler.append(".").append(this.name).append(" = ");
    expression.transpile(transpiler);
};

MemberInstance.prototype.interpret = function(context) {
	var root = this.parent.interpret(context);
	return root.getMemberValue(context, this.name, true);
};

exports.MemberInstance = MemberInstance;
