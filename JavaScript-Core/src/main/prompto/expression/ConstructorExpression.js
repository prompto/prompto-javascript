var Section = require("../parser/Section").Section;
var CategoryType = null;
var DocumentType = require("../type/DocumentType").DocumentType;
var NotMutableError = require("../error/NotMutableError").NotMutableError;
var ArgumentAssignment = require("../grammar/ArgumentAssignment").ArgumentAssignment;
var ArgumentAssignmentList = require("../grammar/ArgumentAssignmentList").ArgumentAssignmentList;

exports.resolve = function() {
	CategoryType = require("../type/CategoryType").CategoryType;
};


function ConstructorExpression(type, assignments) {
    Section.call(this);
	this.type = type;
	this.copyFrom = null;
	this.assignments = null;
	this.setAssignments(assignments);
	return this;
}

ConstructorExpression.prototype  = Object.create(Section.prototype);
ConstructorExpression.prototype.constructor = ConstructorExpression;

ConstructorExpression.prototype.setAssignments = function(assignments) {
	this.assignments = assignments;
	// first anonymous argument is copyFrom
	if(assignments!==null && assignments.length>0 && assignments[0].argument===null) {
		this.copyFrom = assignments[0].expression;
		this.assignments.remove(0);
	}
};

ConstructorExpression.prototype.toDialect = function(writer) {
    writer.toDialect(this);
}

ConstructorExpression.prototype.toSDialect = function(writer) {
    this.toODialect(writer);
}

ConstructorExpression.prototype.toODialect = function(writer) {
    this.type.toDialect(writer);
    var assignments = new ArgumentAssignmentList();
    if (this.copyFrom != null)
        assignments.add(new ArgumentAssignment(null, this.copyFrom));
    if(this.assignments!=null)
        assignments.addAll(this.assignments);
    assignments.toDialect(writer);
};

ConstructorExpression.prototype.toEDialect = function(writer) {
    this.type.toDialect(writer);
    if (this.copyFrom != null) {
        writer.append(" from ");
        writer.append(this.copyFrom.toString());
        if (this.assignments != null && this.assignments.length>0)
            writer.append(",");
    }
    if (this.assignments != null)
        this.assignments.toDialect(writer);
};

ConstructorExpression.prototype.check = function(context) {
	// need to update type, since it was arbitrarily set to CategoryType
	var cd = context.getRegisteredDeclaration(this.type.name);
	if(cd==null)
        context.problemenListener.reportUnknownCategory(this.type.id);
	var type = cd.getType();
	cd.checkConstructorContext(context);
	if(this.copyFrom!=null) {
		var cft = this.copyFrom.check(context);
		if(!(cft instanceof CategoryType) && cft!=DocumentType.instance)
            context.problemenListener.reportInvalidCopySource();
            // throw new SyntaxError("Cannot copy from " + cft.getName());
	}
	if(this.assignments!=null) {
        this.assignments.forEach(function(assignment) {
			if(!cd.hasAttribute(context, assignment.name))
                context.problemListener.reportUnknownAttribute(assignment.name);
                //	throw new SyntaxError("\"" + assignment.name + "\" is not an attribute of " + this.type.name);
			assignment.check(context);
		});
	}
	return type;
};

ConstructorExpression.prototype.interpret = function(context) {
	var instance = this.type.newInstance(context);
    instance.mutable = true;
	if(this.copyFrom!=null) {
		var copyObj = this.copyFrom.interpret(context);
		if((copyObj.getMember || null)!=null) {
			var cd = context.getRegisteredDeclaration(this.type.name);
			var names = copyObj.getMemberNames();
			names.forEach(function(name) {
				if(cd.hasAttribute(context, name)) {
                    var value = copyObj.getMember(context, name);
                    if(value!=null && value.mutable && !this.type.mutable)
                        throw new NotMutableError();
                    // TODO convert Document member to attribute type
					instance.setMember(context, name, value);
				}
			}, this);
		}
	}
	if(this.assignments!=null) {
        this.assignments.forEach(function(assignment) {
			var value = assignment.expression.interpret(context);
            if(value!=null && value.mutable && !this.type.mutable)
                throw new NotMutableError();
			instance.setMember(context, assignment.name, value);
		}, this);
	}
    instance.mutable = this.type.mutable;
	return instance;
};

exports.ConstructorExpression = ConstructorExpression;
