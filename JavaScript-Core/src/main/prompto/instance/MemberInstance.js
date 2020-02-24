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


MemberInstance.prototype.interpret = function(context) {
    var root = this.parent.interpret(context);
    return root.getMemberValue(context, this.name, true);
};


MemberInstance.prototype.checkAssignValue = function(context, valueType, section) {
	return this.parent.checkAssignMember(context, this.id, valueType, section);
};

MemberInstance.prototype.checkAssignMember = function(context, id, valueType, section) {
	this.parent.checkAssignMember(context, this.id, section);
    return valueType; // TODO
};

MemberInstance.prototype.checkAssignItem = function(context, itemType, valueType, section) {
    return valueType; // TODO
};


MemberInstance.prototype.assign = function(context, expression) {
    var root = this.parent.interpret(context);
    if(!root.mutable)
        throw new NotMutableError();
	var value = expression.interpret(context);
    root.setMember(context, this.name, value);
};


MemberInstance.prototype.check = function(context) {
    var parentType = this.parent.check(context);
    return parentType.checkMember(context, this.id, this.name);
};



MemberInstance.prototype.declare = function(transpiler) {
    this.parent.declare(transpiler);
};


MemberInstance.prototype.transpile = function(transpiler) {
    this.parent.transpile(transpiler);
    transpiler.append(".").append(this.name);
};


MemberInstance.prototype.declareAssign = function(transpiler, expression) {
    this.parent.declare(transpiler);
    expression.declare(transpiler);
};



MemberInstance.prototype.transpileAssign = function(transpiler, expression) {
    var parentType = this.parent.check(transpiler.context);
    this.parent.transpileAssignParent(transpiler);
    parentType.transpileAssignMemberValue(transpiler, this.name, expression);
};


MemberInstance.prototype.transpileAssignParent = function(transpiler) {
    var parentType = this.parent.check(transpiler.context);
    this.parent.transpileAssignParent(transpiler);
    parentType.transpileAssignMember(transpiler, this.name);
};


exports.MemberInstance = MemberInstance;
