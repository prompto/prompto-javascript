var BaseStatement = require("./BaseStatement").BaseStatement;
var ObjectList = require("../utils/ObjectList").ObjectList;
var BooleanType = require("../type/BooleanType").BooleanType;
var EqualsExpression = require("../expression/EqualsExpression").EqualsExpression;
var BooleanValue = require("../value/BooleanValue").BooleanValue;

function IfStatement(condition, statements, elseIfs, elseStmts) {
	BaseStatement.call(this);
	this.elements = new IfElementList();
	this.elements.add(new IfElement(condition, statements));
	elseIfs = elseIfs || null;
	if(elseIfs!=null) {
		this.elements.addAll(elseIfs);
	}
	elseStmts = elseStmts || null;
	if(elseStmts!=null) {
		this.elements.add(new IfElement(null, elseStmts));
	}
	return this;
}

IfStatement.prototype = Object.create(BaseStatement.prototype);
IfStatement.prototype.constructor = IfStatement;


IfStatement.prototype.addAdditional = function(condition, statements) {
	this.elements.add(new IfElement(condition, statements));
};

IfStatement.prototype.setFinal = function(statements) {
	this.elements.add(new IfElement(null, statements));
};

IfStatement.prototype.check = function(context) {
	return this.elements[0].check(context);
	// TODO check consistency with additional elements
}

IfStatement.prototype.interpret = function(context) {
	for(var i=0;i<this.elements.length;i++) {
		var element = this.elements[i];
		var condition = element.condition || null;
		var test = condition==null ? BooleanValue.TRUE : condition.interpret(context);
		if(test instanceof BooleanValue && BooleanValue.TRUE.equals(test)) {
			return element.interpret(context);
		}
	}
	return null;
};


IfStatement.prototype.declare = function(transpiler) {
    this.elements.forEach(function(element) {
        element.declare(transpiler);
    });
};



IfStatement.prototype.transpile = function(transpiler) {
    for(var i=0;i<this.elements.length;i++) {
        var element = this.elements[i];
        if (i > 0)
            transpiler.append(" else ");
        if (element.condition) {
            transpiler.append("if (");
            element.condition.transpile(transpiler);
            transpiler.append(") ");
        }
        transpiler.append("{");
        transpiler.indent();
        element.transpile(transpiler);
        transpiler.dedent();
        transpiler.append("}");
    }
    transpiler.newLine();
    return true;
};



IfStatement.prototype.toDialect = function(writer) {
    writer.toDialect(this);
}


IfStatement.prototype.toMDialect = function(writer) {
    this.toEDialect(writer);
};


IfStatement.prototype.toODialect = function(writer) {
    var curly = false;
    for(var i=0;i<this.elements.length; i++) {
        if(i>0) {
            if (curly)
                writer.append(" ");
            writer.append("else ");
        }
        this.elements[i].toODialect(writer);
        curly = this.elements[i].statements.length>1;
    }
    writer.newLine();
};


IfStatement.prototype.toEDialect = function(writer) {
    for(var i=0;i<this.elements.length; i++) {
        if(i>0)
            writer.append("else ");
        this.elements[i].toEDialect(writer);
    }
    writer.newLine();
};


IfStatement.prototype.canReturn = function() {
    return true;
};

exports.IfStatement = IfStatement;

function IfElementList(item) {
	ObjectList.call(this);
	item = item || null;
	if (item != null) {
		this.add(item);
	}
	return this;
}

IfElementList.prototype = Object.create(ObjectList.prototype);
IfElementList.prototype.constructor = IfElementList;

exports.IfElementList = IfElementList;

function IfElement(condition, statements) {
	BaseStatement.call(this);
	this.condition = condition;
	this.statements = statements;
	return this;
}

IfElement.prototype = Object.create(BaseStatement.prototype);
IfElement.prototype.constructor = IfElement;


IfElement.prototype.check = function(context) {
	var type = this.condition.check(context);
	if(type!=BooleanType.instance) {
		throw new SyntaxError("Expected a boolean condition!");
	}
    context = this.downCast(context, false);
	return this.statements.check(context, null);
};


IfElement.prototype.declare = function(transpiler) {
    if(this.condition)
        this.condition.declare(transpiler);
    var context = transpiler.context;
    if(this.condition instanceof EqualsExpression)
        context = this.condition.downCast(transpiler.context, false);
    if(context!=transpiler.context)
        transpiler = transpiler.newChildTranspiler(context);
    else
        transpiler = transpiler.newChildTranspiler();
    this.statements.declare(transpiler);
};


IfElement.prototype.transpile = function(transpiler) {
    var context = transpiler.context;
    if(this.condition instanceof EqualsExpression)
        context = this.condition.downCast(context, false);
    if(context!=transpiler.context)
        transpiler = transpiler.newChildTranspiler(context);
    else
        transpiler = transpiler.newChildTranspiler();
    this.statements.transpile(transpiler);
};



IfElement.prototype.downCast = function(context, setValue) {
    var parent = context;
    if(this.condition instanceof EqualsExpression)
        context = this.condition.downCast(context, setValue);
    context = parent!=context ? context : context.newChildContext();
    return context;
};

IfElement.prototype.interpret = function(context) {
    context = this.downCast(context, true);
    return this.statements.interpret(context);
};

IfElement.prototype.toMDialect = function(writer) {
    this.toEDialect(writer);
}

IfElement.prototype.toEDialect = function(writer) {
    if(this.condition!=null) {
        writer.append("if ");
        this.condition.toDialect(writer);
    }
    writer.append(":\n");
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
};

IfElement.prototype.toODialect = function(writer) {
    if(this.condition!=null)
    {
        writer.append("if (");
        this.condition.toDialect(writer);
        writer.append(") ");
    }
    var curly = this.statements!=null && this.statements.length>1;
    if(curly)
        writer.append("{\n");
    else
        writer.newLine();
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
    if(curly)
        writer.append("}");
};

exports.IfElement = IfElement;
