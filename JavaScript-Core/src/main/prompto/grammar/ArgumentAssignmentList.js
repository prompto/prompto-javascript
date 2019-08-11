var ObjectList = require("../utils/ObjectList").ObjectList;
var Dialect = require("../parser/Dialect").Dialect;
var ContextualExpression = require("../value/ContextualExpression").ContextualExpression;
var AttributeParameter = require("../param/AttributeParameter").AttributeParameter;
var ArgumentAssignment = require("./ArgumentAssignment").ArgumentAssignment;
var AndExpression = null;
var UnresolvedIdentifier = null;

exports.resolve = function() {
    AndExpression = require("../expression/AndExpression").AndExpression;
    UnresolvedIdentifier = require("../expression/UnresolvedIdentifier").UnresolvedIdentifier;
}

function ArgumentAssignmentList(items) {
	ObjectList.call(this, items || []);
	return this;
}

ArgumentAssignmentList.prototype = Object.create(ObjectList.prototype);
ArgumentAssignmentList.prototype.constructor = ArgumentAssignmentList;


/* post-fix expression priority for final assignment in E dialect */
/* 'xyz with a and b as c' should read 'xyz with a, b as c' NOT 'xyz with (a and b) as c' */
ArgumentAssignmentList.prototype.checkLastAnd = function() {
    var assignment = this.slice(-1).pop();
    if(assignment!=null && assignment.argument!=null && assignment.expression instanceof AndExpression) {
        var and = assignment.expression;
        if(and.left instanceof UnresolvedIdentifier) {
            var id = and.left.id;
            var leading = id.name.charAt(0);
            if(leading !== leading.toUpperCase()) {
                this.pop();
                // add AttributeParameter
                var argument = new AttributeParameter(id);
                var attribute = new ArgumentAssignment(argument, null);
                this.add(attribute);
                // fix last assignment
                assignment.expression = and.right;
                this.add(assignment);
            }
        }
    }
};

ArgumentAssignmentList.prototype.findIndex = function(name) {
	for(var i=0;i<this.length;i++) {
		if(name==this[i].name) {
			return i;
		}
	}
	return -1;
};

ArgumentAssignmentList.prototype.find = function(name) {
	for(var i=0;i<this.length;i++) {
		if(name==this[i].name) {
			return this[i];
		}
	}
	return null;
};

ArgumentAssignmentList.prototype.makeAssignments = function(context, declaration) {
    var local = new ArgumentAssignmentList(this);
	var assignments = new ArgumentAssignmentList();
	for(var i=0;i<declaration.args.length;i++) {
	    var argument = declaration.args[i];
        var assignment = null;
        var index = local.findIndex(argument.name);
	    if(index<0 && i==0 && this.length>0 && this[0].argument==null)
	        index = 0;
	    if(index>=0) {
            assignment = local[index];
            local.splice(index, 1);
        }
        if(assignment==null) {
            if (argument.defaultExpression != null)
                assignments.push(new ArgumentAssignment(argument, argument.defaultExpression));
            else
                throw new SyntaxError("Missing argument:" + argument.name);
        } else {
            var expression = new ContextualExpression(context, assignment.expression);
            assignments.push(new ArgumentAssignment(argument, expression));
        }
    }
    if(local.length > 0)
        throw new SyntaxError("Method has no argument:" + local[0].name);
	return assignments;
};



ArgumentAssignmentList.prototype.toDialect = function(writer) {
    writer.toDialect(this);
};

ArgumentAssignmentList.prototype.toEDialect = function(writer) {
    var idx = 0;
    // anonymous argument before 'with'
    if(this.length>0 && this[0].argument==null) {
        writer.append(' ');
        this[idx++].toDialect(writer);
    }
    if(idx<this.length) {
        writer.append(" with ");
        this[idx++].toDialect(writer);
        writer.append(", ");
        while(idx<this.length-1) {
            this[idx++].toDialect(writer);
            writer.append(", ");
        }
        writer.trimLast(2);
        if(idx<this.length) {
            writer.append(" and ");
            this[idx++].toDialect(writer);
        }
    }
};

ArgumentAssignmentList.prototype.toODialect = function(writer) {
    writer.append("(");
    this.forEach(function(arg) {
        arg.toDialect(writer);
        writer.append(", ");
    });
    if(this.length>0)
        writer.trimLast(2);
    writer.append(")");
};

ArgumentAssignmentList.prototype.toMDialect = function(writer) {
    this.toODialect(writer);
};


ArgumentAssignmentList.prototype.declare = function(transpiler) {
    this.forEach(function(arg) {
        arg.declare(transpiler);
    });
};


ArgumentAssignmentList.prototype.transpile = function(transpiler) {
    transpiler.append("(");
    this.forEach(function(arg) {
        arg.transpile(transpiler);
        transpiler.append(", ");
    });
    if(this.length>0)
        transpiler.trimLast(2);
    transpiler.append(")");
};

exports.ArgumentAssignmentList = ArgumentAssignmentList;

