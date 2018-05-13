var Section = require("../parser/Section").Section;
var CategoryType = null;
var Identifier = require("../grammar/Identifier").Identifier;
var DocumentType = require("../type/DocumentType").DocumentType;
var NotMutableError = require("../error/NotMutableError").NotMutableError;
var AttributeArgument = require("../argument/AttributeArgument").AttributeArgument;
var ArgumentAssignment = require("../grammar/ArgumentAssignment").ArgumentAssignment;
var ArgumentAssignmentList = require("../grammar/ArgumentAssignmentList").ArgumentAssignmentList;
var UnresolvedIdentifier = require("../expression/UnresolvedIdentifier").UnresolvedIdentifier;
var InstanceExpression = require("../expression/InstanceExpression").InstanceExpression;

exports.resolve = function() {
	CategoryType = require("../type/CategoryType").CategoryType;
};


function ConstructorExpression(type, copyFrom, assignments, checked) {
    Section.call(this);
	this.type = type;
	this.mutable = false;
	this.copyFrom = copyFrom;
	this.assignments = assignments;
	this.checked = checked;
	return this;
}

ConstructorExpression.prototype  = Object.create(Section.prototype);
ConstructorExpression.prototype.constructor = ConstructorExpression;


ConstructorExpression.prototype.checkFirstHomonym = function(context, decl) {
    if(this.checked)
        return;
    if(this.assignments && this.assignments.length>0) {
        var assign = this.assignments[0];
        if(!assign.argument) {
            var id = null;
            if (assign.expression instanceof UnresolvedIdentifier || assign.expression instanceof InstanceExpression)
                id = assign.expression.id;
            if (id && decl.hasAttribute(context, id.name)) {
                assign.argument = new AttributeArgument(id);
                assign._expression = null;
            }
        }
    }
    this.checked = true;

};

ConstructorExpression.prototype.toDialect = function(writer) {
    var cd = writer.context.getRegisteredDeclaration(this.type.name);
    if(cd==null)
        writer.context.problemListener.reportUnknownCategory(this.type.id);
    this.checkFirstHomonym(writer.context, cd);
    writer.toDialect(this);
};

ConstructorExpression.prototype.toMDialect = function(writer) {
    this.toODialect(writer);
};

ConstructorExpression.prototype.toODialect = function(writer) {
    this.type.toDialect(writer);
    var assignments = new ArgumentAssignmentList();
    if (this.copyFrom != null)
        assignments.add(new ArgumentAssignment(new AttributeArgument(new Identifier("from")), this.copyFrom));
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
        context.problemListener.reportUnknownCategory(this.type.id);
	this.checkFirstHomonym(context, cd);
	cd.checkConstructorContext(context);
	if(this.copyFrom!=null) {
		var cft = this.copyFrom.check(context);
		if(!(cft instanceof CategoryType) && cft!=DocumentType.instance)
            context.problemListener.reportInvalidCopySource();
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
	return cd.getType();
};

ConstructorExpression.prototype.interpret = function(context) {
    var cd = context.getRegisteredDeclaration(this.type.name);
    this.checkFirstHomonym(context, cd);
	var instance = this.type.newInstance(context);
    instance.mutable = true;
	if(this.copyFrom!=null) {
		var copyObj = this.copyFrom.interpret(context);
		if((copyObj.getMemberValue || null)!=null) {
			var names = copyObj.getMemberNames();
			names.forEach(function(name) {
				if(cd.hasAttribute(context, name)) {
                    var value = copyObj.getMemberValue(context, name);
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

ConstructorExpression.prototype.declare = function(transpiler) {
    var cd = transpiler.context.getRegisteredDeclaration(this.type.name);
    cd.declare(transpiler);
    if(this.copyFrom)
        this.copyFrom.declare(transpiler);
    if(this.assignments)
        this.assignments.declare(transpiler);
};

ConstructorExpression.prototype.transpile = function(transpiler) {
    transpiler.append("new ").append(this.type.name).append("(");
    // TODO copyFrom
    if(this.assignments!=null) {
        transpiler.append("{");
        this.assignments.forEach(function(assignment) {
            transpiler.append(assignment.argument.name).append(":");
            assignment.expression.transpile(transpiler);
            transpiler.append(", ");
        }, this);
        transpiler.trimLast(2);
        transpiler.append("}");
    }
    transpiler.append(")");
};

exports.ConstructorExpression = ConstructorExpression;
