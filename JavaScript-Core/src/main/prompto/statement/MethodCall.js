var SimpleStatement = require("./SimpleStatement").SimpleStatement;
var MethodFinder = require("../runtime/MethodFinder").MethodFinder;
var MethodSelector = require("../expression/MethodSelector").MethodSelector;
var ArgumentAssignmentList = require("../grammar/ArgumentAssignmentList").ArgumentAssignmentList;
var AbstractMethodDeclaration = require("../declaration/AbstractMethodDeclaration").AbstractMethodDeclaration;
var ConcreteMethodDeclaration = require("../declaration/ConcreteMethodDeclaration").ConcreteMethodDeclaration;
var DispatchMethodDeclaration = require("../declaration/DispatchMethodDeclaration").DispatchMethodDeclaration;
var BuiltInMethodDeclaration = require("../declaration/BuiltInMethodDeclaration").BuiltInMethodDeclaration;
var MethodDeclarationMap = null;
var ClosureDeclaration = require("../declaration/ClosureDeclaration").ClosureDeclaration;
var ClosureValue = require("../value/ClosureValue").ClosureValue;
var NotMutableError = require("../error/NotMutableError").NotMutableError;
var PromptoError = require("../error/PromptoError").PromptoError;
var InstanceContext = null;
var ThisExpression = null;
var VoidType = require("../type/VoidType").VoidType;
var Section = require("../parser/Section").Section;
var Dialect = require("../parser/Dialect").Dialect;
var BooleanValue = require("../value/BooleanValue").BooleanValue;
var IntegerType = require("../type/IntegerType").IntegerType;
var DecimalType = require("../type/DecimalType").DecimalType;
var Identifier = require("../grammar/Identifier").Identifier;
var CodeParameter = require("../param/CodeParameter").CodeParameter;


exports.resolve = function() {
    InstanceContext = require("../runtime/Context").InstanceContext;
    ThisExpression = require("../expression/ThisExpression").ThisExpression;
    MethodDeclarationMap = require("../runtime/Context").MethodDeclarationMap;
};


function MethodCall(selector, assignments) {
	SimpleStatement.call(this);
	this.selector = selector;
	this.assignments = assignments || null;
	return this;
}

MethodCall.prototype = Object.create(SimpleStatement.prototype);
MethodCall.prototype.constructor = MethodCall;

MethodCall.prototype.toDialect = function(writer) {
    if (this.requiresInvoke(writer))
        writer.append("invoke: ");
    this.selector.toDialect(writer);
    if (this.assignments != null)
        this.assignments.toDialect(writer);
    else if (writer.dialect!= Dialect.E)
        writer.append("()");
};

MethodCall.prototype.requiresInvoke = function(writer) {
    if (writer.dialect != Dialect.E || (this.assignments != null && this.assignments.length > 0))
        return false;
    try {
        finder = new MethodFinder(writer.context, this);
        var declaration = finder.findMethod(false);
        /* if method is a reference, need to prefix with invoke */
        return declaration instanceof AbstractMethodDeclaration || declaration.closureOf !== null;
    } catch(e) {
        // ok
    }
    return false;
}

MethodCall.prototype.toString = function() {
	return this.selector.toString() + " " + (this.assignments!==null ? this.assignments.toString() : "");
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
    return this.checkDeclaration(declaration, context, local);
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
	declaration.registerArguments(local);
	return declaration.check(local, false);
};

MethodCall.prototype.fullCheck = function(declaration, parent, local) {
	try {
		var assignments = this.makeAssignments(parent, declaration);
		declaration.registerArguments(local);
		assignments.forEach(function(assignment) {
			var expression = assignment.resolve(local, declaration, true);
			var value = assignment.argument.checkValue(parent, expression);
			local.setValue(assignment.id, value);
		});
		return declaration.check(local, false);
	} catch (e) {
		if(e instanceof PromptoError) {
			throw new SyntaxError(e.message);
		}
	}
};


MethodCall.prototype.declare = function(transpiler) {
    if (this.assignments != null)
        this.assignments.declare(transpiler);
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
        var assignments = this.makeAssignments(transpiler.context, declaration);
        declaration.registerArguments(local);
        assignments.forEach(function(assignment) {
            var expression = assignment.resolve(local, declaration, true);
            var value = assignment.argument.checkValue(transpiler.context, expression);
            local.setValue(assignment.id, value);
        });
        transpiler = transpiler.copyTranspiler(local);
        this.fullSelector = this.selector.newFullSelector(++fullDeclareCounter);
        declaration.fullDeclare(transpiler, this.fullSelector.id);
    }
};



MethodCall.prototype.transpile = function(transpiler) {
    var finder = new MethodFinder(transpiler.context, this);
    var declarations = finder.findCompatibleMethods(false, true);
    if (declarations.size === 1) {
        var first = declarations.values().next().value;
        this.transpileSingle(transpiler, first, false);
    } else
        this.transpileMultiple(transpiler, declarations);
};


MethodCall.prototype.transpileMultiple = function(transpiler, declarations) {
    var name = this.dispatcher.getTranspiledName(transpiler.context);
    var parent = this.selector.resolveParent(transpiler.context);
    var first = declarations.values().next().value;
    if(parent==null && first.memberOf && transpiler.context.parent instanceof InstanceContext)
        parent = new ThisExpression();
    var selector = new MethodSelector(parent, new Identifier(name));
    selector.transpile(transpiler);
    this.transpileAssignments(transpiler, this.dispatcher);
};

MethodCall.prototype.transpileSingle = function(transpiler, declaration, allowDerived) {
    if (declaration instanceof BuiltInMethodDeclaration)
        this.transpileBuiltin(transpiler, declaration);
    else {
        this.transpileSelector(transpiler, declaration);
        this.transpileAssignments(transpiler, declaration, allowDerived);
    }
};

MethodCall.prototype.transpileBuiltin = function(transpiler, declaration) {
    var parent = this.selector.resolveParent(transpiler.context);
    parent.transpile(transpiler);
    transpiler.append(".");
    declaration.transpileCall(transpiler, this.assignments);
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
    else
        name = declaration.getTranspiledName(transpiler.context);
    selector = new MethodSelector(parent, new Identifier(name));
    selector.transpile(transpiler);
};


MethodCall.prototype.transpileAssignments = function(transpiler, declaration, allowDerived) {
    var assignments = this.makeAssignments(transpiler.context, declaration);
    assignments = assignments.filter(function(assignment) {
        return !(assignment.argument instanceof CodeParameter);
    });
    if(assignments.length > 0) {
        transpiler.append("(");
        assignments.forEach(function (assignment) {
            var argument = assignment.argument;
            var expression = assignment.resolve(transpiler.context, declaration, false, allowDerived);
            argument.transpileCall(transpiler, expression);
            transpiler.append(", ");
        });
        transpiler.trimLast(2);
        transpiler.append(")");
    } else
        transpiler.append("()");
};



MethodCall.prototype.makeAssignments = function(context, declaration) {
	return (this.assignments || new ArgumentAssignmentList()).makeAssignments(context, declaration);
};

MethodCall.prototype.interpret = function(context) {
	var declaration = this.findDeclaration(context);
	var local = this.selector.newLocalContext(context, declaration);
	declaration.registerArguments(local);
	var assignments = this.makeAssignments(context, declaration);
	assignments.forEach(function(assignment) {
		var expression = assignment.resolve(local, declaration, true);
        var argument = assignment.argument;
		var value = argument.checkValue(context, expression);
        if(value!=null && argument.mutable && !value.mutable)
            throw new NotMutableError();
		local.setValue(assignment.id, value);
	});
	return declaration.interpret(local, true);
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
	// look for method as value
	try {
		var o = context.getValue(this.selector.id);
		if(o instanceof ClosureValue) {
			return new ClosureDeclaration(o);
		}
	} catch (e) {
		if(!(e instanceof PromptoError)) {
			throw e;
		}
	}
	// look for declared method
	var finder = new MethodFinder(context,this);
	return finder.findMethod(true);
};

exports.MethodCall = MethodCall;