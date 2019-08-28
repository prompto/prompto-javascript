var JavaExpression = require("./JavaExpression").JavaExpression;

function JavaIdentifierExpression(parent, identifier, isChildClass) {
	JavaExpression.call(this);
	this.parent = parent || null;
	this.identifier = identifier || null;
	this.isChildClass = isChildClass || false;
	return this;
}

JavaIdentifierExpression.prototype = Object.create(JavaExpression.prototype);
JavaIdentifierExpression.prototype.constructor = JavaIdentifierExpression;

JavaIdentifierExpression.prototype.parse = function(ids) {
	var result = null;
	ids.split("\\.").forEach(function(part) {
		result = new JavaIdentifierExpression(result, part);
	});
	return result;
};

JavaIdentifierExpression.prototype.toString = function() {
	if(this.parent==null) {
		return this.identifier;
	} else {
		return this.parent.toString() + (this.isChildClass ? '$' : '.') + this.identifier;
	}
}

JavaIdentifierExpression.prototype.toDialect = function(writer) {
    if(this.parent!=null) {
        this.parent.toDialect(writer);
        writer.append(this.isChildClass ? '$' : '.');
    }
    writer.append(this.identifier);
};


exports.JavaIdentifierExpression = JavaIdentifierExpression;
