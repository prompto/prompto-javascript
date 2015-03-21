var Document = require("../value/Document").Document;
var InvalidDataError = require("../error/InvalidDataError").InvalidDataError;

function MemberInstance(name) {
	this.parent = null;
	this.name = name;
	return this;
}
	

MemberInstance.prototype.toString = function() {
	return this.parent.toString() + "." + this.name;
};

MemberInstance.prototype.toDialect = function(writer) {
    this.parent.toDialect(writer);
    writer.append(".");
    writer.append(this.name);
};

MemberInstance.prototype.checkAssignValue = function(context, expression) {
	this.parent.checkAssignMember(context, this.name);
	expression.check(context);
};

MemberInstance.prototype.checkAssignMember = function(context, memberName) {
	this.parent.checkAssignMember(context, this.name);
};

MemberInstance.prototype.checkAssignElement = function(context) {
	// TODO Auto-generated method stub
};


MemberInstance.prototype.assign = function(context, expression) {
	var value = expression.interpret(context);
	var doc = this.parent.interpret(context);
	if(doc instanceof Document) {
		doc.SetMember(this.name, value);
	} else {
		throw new InvalidDataError("Expecting a document, got:" + typeof(doc));
	}
};

MemberInstance.prototype.interpret = function(context) {
	var doc = this.parent.interpret(context);
	if(doc instanceof Document) {
		return doc.getMember(context, this.name);
	} else {
		throw new InvalidDataError("Expecting a document, got:" + typeof(doc));
	}
};

exports.MemberInstance = MemberInstance;
