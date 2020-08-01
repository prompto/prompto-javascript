var SimpleStatement = require("./SimpleStatement").SimpleStatement;
var MethodFinder = require("../runtime/MethodFinder").MethodFinder;
var MethodSelector = require("../expression/MethodSelector").MethodSelector;
var ArgumentList = require("../grammar/ArgumentList").ArgumentList;
var AbstractMethodDeclaration = require("../declaration/AbstractMethodDeclaration").AbstractMethodDeclaration;
var ConcreteMethodDeclaration = require("../declaration/ConcreteMethodDeclaration").ConcreteMethodDeclaration;
var DispatchMethodDeclaration = require("../declaration/DispatchMethodDeclaration").DispatchMethodDeclaration;
var BuiltInMethodDeclaration = require("../declaration/BuiltInMethodDeclaration").BuiltInMethodDeclaration;
var MethodDeclarationMap = null;
var ClosureDeclaration = require("../declaration/ClosureDeclaration").ClosureDeclaration;
var ClosureValue = require("../value/ClosureValue").ClosureValue;
var ArrowDeclaration = require("../declaration/ArrowDeclaration").ArrowDeclaration;
var ArrowValue = require("../value/ArrowValue").ArrowValue;
var NotMutableError = require("../error/NotMutableError").NotMutableError;
var PromptoError = require("../error/PromptoError").PromptoError;
var InstanceContext = null;
var ThisExpression = null;
var MethodType = require("../type/MethodType").MethodType;
var VoidType = require("../type/VoidType").VoidType;
var Dialect = require("../parser/Dialect").Dialect;
var BooleanValue = require("../value/BooleanValue").BooleanValue;
var Identifier = require("../grammar/Identifier").Identifier;
var CodeParameter = require("../param/CodeParameter").CodeParameter;
var CodeWriter = require("../utils/CodeWriter").CodeWriter;

exports.resolve = function() {
    InstanceContext = require("../runtime/Context").InstanceContext;
    ThisExpression = require("../expression/ThisExpression").ThisExpression;
    MethodDeclarationMap = require("../runtime/Context").MethodDeclarationMap;
};


function MethodCall(selector, args) {
	SimpleStatement.call(this);
	this.selector = selector;
	this.args = args || null;
	return this;
}

MethodCall.prototype = Object.create(SimpleStatement.prototype);
MethodCall.prototype.constructor = MethodCall;

MethodCall.prototype.toDialect = function(writer) {
    if (this.requiresInvoke(writer))
        writer.append("invoke: ");
    this.selector.toDialect(writer);
    if (this.args != null)
        this.args.toDialect(writer);
    else if (writer.dialect!= Dialect.E)
        writer.append("()");
};

MethodCall.prototype.requiresInvoke = function(writer) {
    if (writer.dialect != Dialect.E || (this.args != null && this.args.length > 0))
        return false;
    try {
        var finder = new MethodFinder(writer.context, this);
        var declaration = finder.findMethod(false);
        /* if method is a reference, need to prefix with invoke */
        return declaration instanceof AbstractMethodDeclaration || declaration.closureOf !== null;
    } catch(e) {
        // ok
    }
    return false;
}

MethodCall.prototype.toString = function() {
	return this.selector.toString() + " " + (this.args!==null ? this.args.toString() : "");
};


MethodCall.prototype.check = function(context, updateSelectorParent) {
	var finder = new MethodFinder(context, this);
	var declaration = finder.findMethod(false);
    if(!declaration) {
        context.problemListener.reportUnknownMethod(this.selector.id);
        return VoidType.instance;
    }
    if(updateSelectorParent && declaration.memberOf && !this.selector.parent)
        this.selector.parent = new ThisExpression();
    var local = this.isLocalClosure(context) ? context : this.selector.newLocalCheckContext(context, declaration);
    // don't bubble up problems
    try {
        local.pushProblemListener();
        return this.checkDeclaration(declaration, context, local);
    } finally {
        local.popProblemListener();
    }
};


MethodCall.prototype.checkReference = function(context) {
    var finder = new MethodFinder(context, this);
    var method = finder.findMethod(false);
    if(method)
        return new MethodType(method);
    else
        return null;
};


MethodCall.prototype.isLocalClosure = function(context) {
    if (this.selector.parent !== null) {
        return false;
    }
    var decl = context.getLocalDeclaration(this.selector.name)
    return decl instanceof MethodDeclarationMap;
};



MethodCall.prototype.checkDeclaration = function(declaration, parent, local) {
	if(declaration instanceof ConcreteMethodDeclaration && declaration.mustBeCheckedInCallContext(parent)) {
		return this.fullCheck(declaration, parent, local);
	} else {
		return this.lightCheck(declaration, local);
	}
};

MethodCall.prototype.lightCheck = function(declaration, local) {
	declaration.registerParameters(local);
	return declaration.check(local, false);
};

MethodCall.prototype.fullCheck = function(declaration, parent, local) {
	try {
		var args = this.makeArguments(parent, declaration);
		declaration.registerParameters(local);
		args.forEach(function(argument) {
			var expression = argument.resolve(local, declaration, true);
			var value = argument.parameter.checkValue(parent, expression);
			local.setValue(argument.id, value);
		});
		return declaration.check(local, false);
	} catch (e) {
		if(e instanceof PromptoError) {
			throw new SyntaxError(e.message);
		}
	}
};


MethodCall.prototype.declare = function(transpiler) {
    var finder = new MethodFinder(transpiler.context, this);
    var declarations = finder.findCompatibleMethods(false, true);
    var first = declarations.size===1 ? declarations.values().next().value : null;
    if(declarations.size===1 && first instanceof BuiltInMethodDeclaration) {
        if(first.declareCall)
            first.declareCall(transpiler);
    } else {
        if(!this.isLocalClosure(transpiler.context)) {
            declarations.forEach(function(declaration) {
                var local = this.selector.newLocalCheckContext(transpiler.context, declaration);
                this.declareDeclaration(transpiler, declaration, local);
            }, this);
        }
        if(declarations.size>1 && !this.dispatcher) {
            var declaration = finder.findMethod(false);
            var sorted = finder.sortMostSpecificFirst(declarations);
            this.dispatcher = new DispatchMethodDeclaration(transpiler.context, this, declaration, sorted);
            transpiler.declare(this.dispatcher);
        }
    }
};

MethodCall.prototype.declareDeclaration = function(transpiler, declaration, local) {
    if (this.args != null)
        this.args.declare(transpiler, declaration);
    if(declaration instanceof ConcreteMethodDeclaration && declaration.mustBeCheckedInCallContext(transpiler.context)) {
        this.fullDeclareDeclaration(declaration, transpiler, local);
    } else {
        this.lightDeclareDeclaration(declaration, transpiler, local);
    }
};

MethodCall.prototype.lightDeclareDeclaration = function(declaration, transpiler, local) {
    transpiler = transpiler.copyTranspiler(local);
    declaration.declare(transpiler);
};

var fullDeclareCounter = 0;

MethodCall.prototype.fullDeclareDeclaration = function(declaration, transpiler, local) {
    if(!this.fullSelector) {
        var args = this.makeArguments(transpiler.context, declaration);
        declaration.registerParameters(local);
        args.forEach(function(argument) {
            var expression = argument.resolve(local, declaration, true);
            var value = argument.parameter.checkValue(transpiler.context, expression);
            local.setValue(argument.id, value);
        });
        transpiler = transpiler.copyTranspiler(local);
        this.fullSelector = this.selector.newFullSelector(++fullDeclareCounter);
        declaration.fullDeclare(transpiler, this.fullSelector.id);
    }
};



MethodCall.prototype.transpile = function(transpiler) {
    this.doTranspile(transpiler, false);
};


MethodCall.prototype.transpileReference = function(transpiler) {
    this.doTranspile(transpiler, true);
};

MethodCall.prototype.doTranspile = function(transpiler, refOnly) {
    var finder = new MethodFinder(transpiler.context, this);
    var declarations = finder.findCompatibleMethods(false, true);
    if (declarations.size === 1) {
        var first = declarations.values().next().value;
        this.transpileSingle(transpiler, first, false, refOnly);
    } else
        this.transpileMultiple(transpiler, declarations, refOnly);
};


MethodCall.prototype.transpileSingle = function(transpiler, declaration, allowDerived, refOnly) {
    if (declaration instanceof BuiltInMethodDeclaration)
        this.transpileBuiltin(transpiler, declaration, refOnly);
    else {
        this.transpileSelector(transpiler, declaration);
        if(!refOnly)
            this.transpileAssignments(transpiler, declaration, allowDerived);
    }
};

MethodCall.prototype.transpileMultiple = function(transpiler, declarations, refOnly) {
    var name = this.dispatcher.getTranspiledName(transpiler.context);
    var parent = this.selector.resolveParent(transpiler.context);
    var first = declarations.values().next().value;
    if(parent==null && first.memberOf && transpiler.context.parent instanceof InstanceContext)
        parent = new ThisExpression();
    var selector = new MethodSelector(parent, new Identifier(name));
    selector.transpile(transpiler);
    if(!refOnly)
        this.transpileAssignments(transpiler, this.dispatcher);
};



MethodCall.prototype.transpileBuiltin = function(transpiler, declaration, refOnly) {
    var parent = this.selector.resolveParent(transpiler.context);
    parent.transpileParent(transpiler);
    transpiler.append(".");
    if(refOnly)
        transpiler.append(declaration.name);
    else
        declaration.transpileCall(transpiler, this.args, refOnly);
};


MethodCall.prototype.transpileSelector = function(transpiler, declaration) {
    var selector = this.fullSelector || this.selector;
    var parent = selector.resolveParent(transpiler.context);
    if (parent == null && declaration.memberOf && transpiler.context.parent instanceof InstanceContext)
        parent = new ThisExpression();
    var name = null;
    if(this.variableName)
        name = this.variableName;
    else if(this.fullSelector)
        name = this.fullSelector.name;
    else if(selector.name !== declaration.name)
        name = selector.name;
    else
        name = declaration.getTranspiledName(transpiler.context);
    selector = new MethodSelector(parent, new Identifier(name));
    selector.transpile(transpiler);
};


MethodCall.prototype.transpileAssignments = function(transpiler, declaration, allowDerived) {
    var args = this.makeArguments(transpiler.context, declaration);
    args = args.filter(function(argument) {
        return !(argument.parameter instanceof CodeParameter);
    });
    if(args.length > 0) {
        transpiler.append("(");
        args.forEach(function (argument) {
            var parameter = argument.parameter;
            var expression = argument.resolve(transpiler.context, declaration, false, allowDerived);
            parameter.transpileCall(transpiler, expression);
            transpiler.append(", ");
        });
        transpiler.trimLast(2);
        transpiler.append(")");
    } else
        transpiler.append("()");
};



MethodCall.prototype.makeArguments = function(context, declaration) {
	return (this.args || new ArgumentList()).makeArguments(context, declaration);
};

MethodCall.prototype.interpret = function(context) {
	var declaration = this.findDeclaration(context);
	var local = this.selector.newLocalContext(context, declaration);
	declaration.registerParameters(local);
	var args = this.makeArguments(context, declaration);
	args.forEach(function(argument) {
		var expression = argument.resolve(local, declaration, true);
        var parameter = argument.parameter;
		var value = parameter.checkValue(context, expression);
        if(value!=null && parameter.mutable && !value.mutable)
            throw new NotMutableError();
		local.setValue(argument.id, value);
	});
	return declaration.interpret(local, true);
};


MethodCall.prototype.interpretReference = function(context) {
    var declaration = this.findDeclaration(context)
    return new ClosureValue(context, new MethodType(declaration));
};


MethodCall.prototype.interpretAssert = function(context, testMethodDeclaration) {
    var value = this.interpret(context);
    if(value instanceof BooleanValue)
        return value.value;
    else {
        var expected = this.getExpected(context, this.dialect);
        throw new SyntaxError("Cannot test '" + expected + "'");
    }
};


MethodCall.prototype.getExpected = function(context, dialect, escapeMode) {
    var writer = new CodeWriter(this.dialect, context);
    writer.escapeMode = escapeMode;
    this.toDialect(writer);
    return writer.toString();
};


MethodCall.prototype.transpileFound = function(transpiler, dialect) {
    transpiler.append("'<unknown>'");
};


MethodCall.prototype.findDeclaration = function(context) {
    var method = this.findRegistered(context);
    if(method)
        return method;
    else {
        // look for declared method
        var finder = new MethodFinder(context, this);
        return finder.findMethod(true);
    }
};


MethodCall.prototype.findRegistered = function(context) {
    // look for method as value
    if(!this.selector.parent)  try {
        var o = context.getValue(this.selector.id);
        if(o instanceof ClosureValue) {
            return this.getClosureDeclaration(context, o);
        } else if(o instanceof ArrowValue) {
            return new ArrowDeclaration(o);
        }
    } catch (e) {
        if(!(e instanceof PromptoError)) {
            throw e;
        }
    }
    return null;
};


MethodCall.prototype.getClosureDeclaration = function(context, closure) {
    var decl = closure.type.method
    if(decl.memberOf!=null) {
        // the closure references a member method (useful when a method reference is needed)
        // in which case we may simply want to return that method to avoid spilling context into method body
        // this is only true if the closure comes straight from the method's instance context
        // if the closure comes from an accessible context that is not the instance context
        // then it is a local variable that needs the closure context to be interpreted
        declaring = context.contextForValue(this.selector.name);
        if (declaring === closure.context)
            return decl;
    }
    return new ClosureDeclaration(closure);
};


exports.MethodCall = MethodCall;