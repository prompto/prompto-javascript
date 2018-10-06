var BaseMethodDeclaration = require("./BaseMethodDeclaration").BaseMethodDeclaration;
var VoidType = require("../type/VoidType").VoidType;
var DictionaryType = require("../type/DictionaryType").DictionaryType;
var TextType = require("../type/TextType").TextType;
var CodeArgument = require("../argument/CodeArgument").CodeArgument;
var CategoryArgument = require("../argument/CategoryArgument").CategoryArgument;
var StatementList = require("../statement/StatementList").StatementList;

function ConcreteMethodDeclaration(id, args, returnType, statements) {
	BaseMethodDeclaration.call(this, id, args, returnType);
	this.statements = statements || new StatementList();
	return this;
}

ConcreteMethodDeclaration.prototype = Object.create(BaseMethodDeclaration.prototype);
ConcreteMethodDeclaration.prototype.constructor = ConcreteMethodDeclaration;

ConcreteMethodDeclaration.prototype.checkMember = function(declaration, context) {
    context = context.newInstanceContext(null, declaration.getType(context), false)
    return this.checkChild(context);
};

ConcreteMethodDeclaration.prototype.check = function(context) {
	if(this.canBeChecked(context)) {
		return this.fullCheck(context, false);
	} else {
		return VoidType.instance;
	}
};

ConcreteMethodDeclaration.prototype.canBeChecked = function(context) {
	if(context.isGlobalContext()) {
		return !this.mustBeCheckedInCallContext(context);
	} else {
		return true;
	}
};

ConcreteMethodDeclaration.prototype.mustBeCheckedInCallContext = function(context) {
	// if at least one argument is 'Code'
	if(this.args===null) {
		return false;
	}
	for(var i=0;i<this.args.length;i++) {
		if(this.args[i] instanceof CodeArgument) {
			return true;
		}
	}
	return false;
};

ConcreteMethodDeclaration.prototype.fullCheck = function(context, nativeOnly) {
	if(context.isGlobalContext()) {
		context = context.newLocalContext();
		this.registerArguments(context);
	}
	if(this.args!==null) {
		this.args.check(context);
	}
	return this.statements.check(context, this.returnType, nativeOnly);
};

ConcreteMethodDeclaration.prototype.checkChild = function(context) {
	if(this.args!=null) {
		this.args.check(context);
	}
	var child = context.newChildContext();
	this.registerArguments(child);
	return this.statements.check(child, this.returnType);
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
    this.registerArguments(writer.context);
    writer.toDialect(this);
};


ConcreteMethodDeclaration.prototype.isEligibleAsMain = function () {
    if(this.args.length==0)
        return true;
    else if(this.args.length==1) {
        var arg = this.args[0];
        if( arg instanceof CategoryArgument
            && arg.type instanceof DictionaryType
            && arg.type.itemType==TextType.instance )
                return true;
    }
    return false;
};


ConcreteMethodDeclaration.prototype.toMDialect = function(writer) {
    writer.append("def ");
    writer.append(this.name);
    writer.append(" (");
    this.args.toDialect(writer);
    writer.append(")");
    if(this.returnType!=null && this.returnType!=VoidType.instance) {
        writer.append("->");
        this.returnType.toDialect(writer);
    }
    writer.append(":\n");
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
};

ConcreteMethodDeclaration.prototype.toEDialect = function(writer) {
    writer.append("define ");
    writer.append(this.name);
    writer.append(" as method ");
    this.args.toDialect(writer);
    if(this.returnType!=null && this.returnType!=VoidType.instance) {
        writer.append("returning ");
        this.returnType.toDialect(writer);
        writer.append(" ");
    }
    writer.append("doing:\n");
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
};

ConcreteMethodDeclaration.prototype.toODialect = function(writer) {
    if(this.returnType!=null && this.returnType!=VoidType.instance) {
        this.returnType.toDialect(writer);
        writer.append(" ");
    }
    writer.append("method ");
    writer.append(this.name);
    writer.append(" (");
    this.args.toDialect(writer);
    writer.append(") {\n");
    writer.indent();
    this.statements.toDialect(writer);
    writer.dedent();
    writer.append("}\n");
};

ConcreteMethodDeclaration.prototype.declare = function(transpiler) {
    if(this.declaring)
        return;
    this.declaring = true;
    try {
        if (!this.memberOf) {
            transpiler = transpiler.newLocalTranspiler();
            transpiler.declare(this);
            this.declareArguments(transpiler);
        }
        this.registerArguments(transpiler.context);
        this.statements.declare(transpiler);
    } finally {
        this.declaring = false;
    }
};


ConcreteMethodDeclaration.prototype.declareChild = function(transpiler) {
    this.declareArguments(transpiler);
    transpiler = transpiler.newChildTranspiler();
    this.registerArguments(transpiler.context);
    return this.statements.declare(transpiler);
};




ConcreteMethodDeclaration.prototype.transpile = function(transpiler) {
    this.registerArguments(transpiler.context);
    this.registerCodeArguments(transpiler.context);
    this.transpileProlog(transpiler);
    this.statements.transpile(transpiler);
    this.transpileEpilog(transpiler);
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
    var declaration = new ConcreteMethodDeclaration(id, this.args, this.returnType, this.statements);
    declaration.memberOf = this.memberOf;
    transpiler.declare(declaration);
    this.statements.declare(transpiler);
    // remember code arguments
    declaration.codeArguments = {};
    this.args.filter(function(arg) {
        return arg instanceof CodeArgument;
    }).forEach(function(arg) {
        declaration.codeArguments[arg.name] = { id: arg.id, value: transpiler.context.getValue(arg.id) };
    });
};


exports.ConcreteMethodDeclaration = ConcreteMethodDeclaration;
