var BaseMethodDeclaration = require("./BaseMethodDeclaration").BaseMethodDeclaration;
var VoidType = require("../type/VoidType").VoidType;
var DictionaryType = require("../type/DictionaryType").DictionaryType;
var TextType = require("../type/TextType").TextType;
var CodeParameter = require("../param/CodeParameter").CodeParameter;
var CategoryParameter = require("../param/CategoryParameter").CategoryParameter;
var StatementList = require("../statement/StatementList").StatementList;
var DeclarationStatement = require("../statement/DeclarationStatement").DeclarationStatement;
var SyntaxError = require("../error/SyntaxError").SyntaxError;

function ConcreteMethodDeclaration(id, args, returnType, statements) {
	BaseMethodDeclaration.call(this, id, args, returnType);
	this.statements = statements || new StatementList();
	this.declarationOf = null;
    this.statements.forEach(function(stmt) {
        if(stmt instanceof DeclarationStatement)
            stmt.declaration.closureOf = this;
    }, this);
	return this;
}

ConcreteMethodDeclaration.prototype = Object.create(BaseMethodDeclaration.prototype);
ConcreteMethodDeclaration.prototype.constructor = ConcreteMethodDeclaration;

ConcreteMethodDeclaration.prototype.check = function(context, isStart) {
	if(this.canBeChecked(context, isStart)) {
		return this.fullCheck(context, isStart);
	} else {
		return VoidType.instance;
	}
};

ConcreteMethodDeclaration.prototype.canBeChecked = function(context, isStart) {
	if(isStart) {
		return !this.mustBeCheckedInCallContext(context);
	} else {
		return true;
	}
};

ConcreteMethodDeclaration.prototype.mustBeCheckedInCallContext = function(context) {
	// if at least one argument is 'Code'
	if(this.parameters===null) {
		return false;
	}
	for(var i=0; i<this.parameters.length; i++) {
		if(this.parameters[i] instanceof CodeParameter) {
			return true;
		}
	}
	return false;
};

ConcreteMethodDeclaration.prototype.fullCheck = function(context, isStart) {
	if(isStart) {
		context = context.newLocalContext();
		this.registerParameters(context);
	}
	if(this.parameters!==null) {
		this.parameters.check(context);
	}
	return this.checkStatements(context);
};

ConcreteMethodDeclaration.prototype.checkChild = function(context) {
	if(this.parameters!=null) {
		this.parameters.check(context);
	}
	var child = context.newChildContext();
	this.registerParameters(child);
    return this.checkStatements(child);
};


ConcreteMethodDeclaration.prototype.checkStatements = function(context) {
    try {
        return this.statements.check(context, this.returnType);
    } catch(e) {
        if(e instanceof SyntaxError)
            throw new SyntaxError(e.message + " in method '" + this.name + "'");
        else
            throw e;
    }
};


ConcreteMethodDeclaration.prototype.interpret = function(context) {
	context.enterMethod(this);
	try {
		return this.statements.interpret(context);
	} finally {
		context.leaveMethod(this);
	}
};

ConcreteMethodDeclaration.prototype.toDialect = function(writer) {
    if(writer.context.isGlobalContext())
        writer = writer.newLocalWriter();
    this.registerParameters(writer.context);
    writer.toDialect(this);
};


ConcreteMethodDeclaration.prototype.isEligibleAsMain = function () {
    if(this.parameters.length==0)
        return true;
    else if(this.parameters.length==1) {
        var arg = this.parameters[0];
        if( arg instanceof CategoryParameter
            && arg.type instanceof DictionaryType
            && arg.type.itemType==TextType.instance )
                return true;
    }
    return false;
};


ConcreteMethodDeclaration.prototype.toMDialect = function(writer) {
    writer.append("def ").append(this.name).append(" (");
    this.parameters.toDialect(writer);
    writer.append(")");
    if(this.returnType!=null && this.returnType!=VoidType.instance) {
        writer.append("->");
        this.returnType.toDialect(writer);
    }
    writer.append(":").newLine().indent();
    this.statements.toDialect(writer);
    writer.dedent();
};

ConcreteMethodDeclaration.prototype.toEDialect = function(writer) {
    writer.append("define ").append(this.name).append(" as method ");
    this.parameters.toDialect(writer);
    if(this.returnType!=null && this.returnType!=VoidType.instance) {
        writer.append("returning ");
        this.returnType.toDialect(writer);
        writer.append(" ");
    }
    writer.append("doing:").newLine().indent();
    this.statements.toDialect(writer);
    writer.dedent();
};

ConcreteMethodDeclaration.prototype.toODialect = function(writer) {
    if(this.returnType!=null && this.returnType!=VoidType.instance) {
        this.returnType.toDialect(writer);
        writer.append(" ");
    }
    writer.append("method ").append(this.name).append(" (");
    this.parameters.toDialect(writer);
    writer.append(") {").newLine().indent();
    this.statements.toDialect(writer);
    writer.dedent().append("}").newLine();
};

ConcreteMethodDeclaration.prototype.declare = function(transpiler) {
    if(!this.declaring) {
        this.declaring = true;
        try {
            this.doDeclare(transpiler);
        } finally {
            this.declaring = false;
        }
    }
};


ConcreteMethodDeclaration.prototype.doDeclare = function(transpiler) {
    if(this.returnType)
        this.returnType.declare(transpiler);
    if (this.memberOf)
        this.memberOf.declare(transpiler);
    else {
        transpiler = transpiler.newLocalTranspiler();
        transpiler.declare(this);
        this.declareArguments(transpiler);
    }
    this.registerParameters(transpiler.context);
    this.statements.declare(transpiler);
};

ConcreteMethodDeclaration.prototype.transpile = function(transpiler) {
    this.registerParameters(transpiler.context);
    this.registerCodeArguments(transpiler.context);
    this.transpileProlog(transpiler);
    this.statements.transpile(transpiler);
    this.transpileEpilog(transpiler);
};


ConcreteMethodDeclaration.prototype.declareChild = function(transpiler) {
    this.declareArguments(transpiler);
    transpiler = transpiler.newChildTranspiler();
    this.registerParameters(transpiler.context);
    return this.statements.declare(transpiler);
};



ConcreteMethodDeclaration.prototype.registerCodeArguments = function(context) {
    if(!this.codeArguments)
        return;
    Object.getOwnPropertyNames(this.codeArguments).forEach(function(name) {
        var arg = this.codeArguments[name];
        context.setValue(arg.id, arg.value);
    }, this);
};

ConcreteMethodDeclaration.prototype.fullDeclare = function(transpiler, id) {
    var declaration = new ConcreteMethodDeclaration(id, this.parameters, this.returnType, this.statements);
    declaration.memberOf = this.memberOf;
    transpiler.declare(declaration);
    this.statements.declare(transpiler);
    // remember code arguments
    declaration.codeArguments = {};
    this.parameters.filter(function(arg) {
        return arg instanceof CodeParameter;
    }).forEach(function(arg) {
        declaration.codeArguments[arg.name] = { id: arg.id, value: transpiler.context.getValue(arg.id) };
    });
};

ConcreteMethodDeclaration.prototype.locateSectionAtLine = function(line) {
    return this.statements.locateSectionAtLine(line);
};

exports.ConcreteMethodDeclaration = ConcreteMethodDeclaration;
