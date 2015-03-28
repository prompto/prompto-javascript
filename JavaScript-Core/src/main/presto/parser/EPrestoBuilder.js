var declaration = require("../declaration");
var expression = require("../expression");
var javascript = require("../javascript");
var statement = require("../statement");
var literal = require("../literal");
var grammar = require("../grammar");
var value = require("../value");
var utils = require("../utils");
var parser = require("../parser");
var type = require("../type");
var java = require("../java");
var csharp = require("../csharp");
var python = require("../python");

function EPrestoBuilder(eparser) {
	parser.EParserListener.call(this);
	this.input = eparser.getTokenStream();
	this.path = eparser.path;
	this.nodeValues = {};
	return this;
}

EPrestoBuilder.prototype = Object.create(parser.EParserListener.prototype);
EPrestoBuilder.prototype.constructor = EPrestoBuilder;

 
EPrestoBuilder.prototype.getNodeValue = function(node) {
	return this.nodeValues[node];
};
	
EPrestoBuilder.prototype.setNodeValue = function(node, value) {
	this.nodeValues[node] = value;
	if(value instanceof parser.Section) {
		this.buildSection(node, value);
	}
};
	

EPrestoBuilder.prototype.exitIdentifierExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new grammar.UnresolvedIdentifier(exp));
};

EPrestoBuilder.prototype.exitTypeIdentifier = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, name);
};

EPrestoBuilder.prototype.exitMethodCallExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var args = this.getNodeValue(ctx.args);
	var call = new statement.UnresolvedCall(exp,args);
	this.setNodeValue(ctx, call);
};


EPrestoBuilder.prototype.exitUnresolvedExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


EPrestoBuilder.prototype.exitUnresolvedIdentifier = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new grammar.UnresolvedIdentifier(name));
};

EPrestoBuilder.prototype.exitUnresolvedSelector = function(ctx) {
	var parent = this.getNodeValue(ctx.parent);
	var selector = this.getNodeValue(ctx.selector);
	selector.parent = parent;
	this.setNodeValue(ctx, selector);
};


EPrestoBuilder.prototype.exitUnresolved_selector = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new expression.MemberSelector(null, name));
};
	

EPrestoBuilder.prototype.exitAtomicLiteral = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitCollectionLiteral = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitListLiteral = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


EPrestoBuilder.prototype.exitBooleanLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.BooleanLiteral(ctx.t.text));
};


EPrestoBuilder.prototype.exitMinIntegerLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.MinIntegerLiteral());
};


EPrestoBuilder.prototype.exitMaxIntegerLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.MaxIntegerLiteral());
};


EPrestoBuilder.prototype.exitIntegerLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.IntegerLiteral(ctx.t.text, ctx.t.text));
};
	

EPrestoBuilder.prototype.exitDecimalLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.DecimalLiteral(ctx.t.text));
};

EPrestoBuilder.prototype.exitHexadecimalLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.HexaLiteral(ctx.t.text));
};


EPrestoBuilder.prototype.exitCharacterLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.CharacterLiteral(ctx.t.text));
};

EPrestoBuilder.prototype.exitDateLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.DateLiteral(ctx.t.text));
};


EPrestoBuilder.prototype.exitDateTimeLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.DateTimeLiteral(ctx.t.text));
};

EPrestoBuilder.prototype.exitTernaryExpression = function(ctx) {
    var condition = this.getNodeValue(ctx.test);
    var ifTrue = this.getNodeValue(ctx.ifTrue);
    var ifFalse = this.getNodeValue(ctx.ifFalse);
    var exp = new expression.TernaryExpression(condition, ifTrue, ifFalse);
    this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitTest_method_declaration = function(ctx) {
    var name = ctx.name.text;
    var stmts = this.getNodeValue(ctx.stmts);
    var exps = this.getNodeValue(ctx.exps);
    var errorName = this.getNodeValue(ctx.error);
    var error = errorName==null ? null : new expression.SymbolExpression(errorName);
    this.setNodeValue(ctx, new declaration.TestMethodDeclaration(name, stmts, exps, error));
};

EPrestoBuilder.prototype.exitTestMethod = function(ctx) {
    var decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
};


EPrestoBuilder.prototype.exitTextLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.TextLiteral(ctx.t.text));
};

EPrestoBuilder.prototype.exitTimeLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.TimeLiteral(ctx.t.text));
};


EPrestoBuilder.prototype.exitPeriodLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.PeriodLiteral(ctx.t.text));
};

EPrestoBuilder.prototype.exitVariable_identifier = function(ctx) {
	this.setNodeValue(ctx, ctx.getText());
};

EPrestoBuilder.prototype.exitList_literal = function(ctx) {
	var items = this.getNodeValue(ctx.items) || null;
	var value = new literal.ListLiteral(items);
	this.setNodeValue(ctx, value);
};

EPrestoBuilder.prototype.exitDict_literal = function(ctx) {
	var items = this.getNodeValue(ctx.items) || null;
	var value = new literal.DictLiteral(items);
	this.setNodeValue(ctx, value);
};

EPrestoBuilder.prototype.exitTuple_literal = function(ctx) {
	var items = this.getNodeValue(ctx.items) || null;
	var value = new literal.TupleLiteral(items);
	this.setNodeValue(ctx, value);
};

EPrestoBuilder.prototype.exitTupleLiteral = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitRange_literal = function(ctx) {
	var low = this.getNodeValue(ctx.low);
	var high = this.getNodeValue(ctx.high);
	this.setNodeValue(ctx, new literal.RangeLiteral(low, high));
};


EPrestoBuilder.prototype.exitRangeLiteral = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


EPrestoBuilder.prototype.exitDictLiteral = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


EPrestoBuilder.prototype.exitDictEntryList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new literal.DictEntryList(null, item));
};


EPrestoBuilder.prototype.exitDictEntryListItem = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	var item = this.getNodeValue(ctx.item);
	items.add(item);
	this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitDict_entry = function(ctx) {
	var key = this.getNodeValue(ctx.key);
	var value = this.getNodeValue(ctx.value);
	var entry = new literal.DictEntry(key, value);
	this.setNodeValue(ctx, entry);
};

EPrestoBuilder.prototype.exitLiteralExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


EPrestoBuilder.prototype.exitVariableIdentifier = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, name);
};


EPrestoBuilder.prototype.exitValueList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
    var items = new utils.ExpressionList(null, item);
	this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitValueListItem = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	var item = this.getNodeValue(ctx.item);
	items.add(item);
	this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitValueTuple = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new utils.ExpressionList(null, item));
};


EPrestoBuilder.prototype.exitValueTupleItem = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	var item = this.getNodeValue(ctx.item);
	items.add(item);
	this.setNodeValue(ctx, items);
};

EPrestoBuilder.prototype.exitSymbol_identifier = function(ctx) {
	this.setNodeValue(ctx, ctx.getText());
};

EPrestoBuilder.prototype.exitNative_symbol = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new grammar.NativeSymbol(name, exp));
};

EPrestoBuilder.prototype.exitSymbolIdentifier = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, name);
};

EPrestoBuilder.prototype.exitBooleanType = function(ctx) {
	this.setNodeValue(ctx, type.BooleanType.instance);
};


EPrestoBuilder.prototype.exitCharacterType = function(ctx) {
	this.setNodeValue(ctx, type.CharacterType.instance);
};


EPrestoBuilder.prototype.exitTextType = function(ctx) {
	this.setNodeValue(ctx, type.TextType.instance);
};

EPrestoBuilder.prototype.exitThisExpression = function(ctx) {
    this.setNodeValue(ctx, new expression.ThisExpression());
};

EPrestoBuilder.prototype.exitIntegerType = function(ctx) {
	this.setNodeValue(ctx, type.IntegerType.instance);
};

EPrestoBuilder.prototype.exitDecimalType = function(ctx) {
	this.setNodeValue(ctx, type.DecimalType.instance);
};


EPrestoBuilder.prototype.exitDateType = function(ctx) {
	this.setNodeValue(ctx, type.DateType.instance);
};


EPrestoBuilder.prototype.exitDateTimeType = function(ctx) {
	this.setNodeValue(ctx, type.TextType.instance);
};


EPrestoBuilder.prototype.exitTimeType = function(ctx) {
	this.setNodeValue(ctx, type.TimeType.instance);
};


EPrestoBuilder.prototype.exitCodeType = function(ctx) {
	this.setNodeValue(ctx, type.CodeType.instance);
};


EPrestoBuilder.prototype.exitPrimaryType = function(ctx) {
	var type = this.getNodeValue(ctx.p);
	this.setNodeValue(ctx, type);
};


EPrestoBuilder.prototype.exitAttribute_declaration = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var type = this.getNodeValue(ctx.typ);
	var match = this.getNodeValue(ctx.match);
	this.setNodeValue(ctx, new declaration.AttributeDeclaration(name, type, match));
};

EPrestoBuilder.prototype.exitNativeType = function(ctx) {
	var type = this.getNodeValue(ctx.n);
	this.setNodeValue(ctx, type);
};

EPrestoBuilder.prototype.exitCategoryType = function(ctx) {
	var type = this.getNodeValue(ctx.c);
	this.setNodeValue(ctx, type);
};


EPrestoBuilder.prototype.exitCategory_type = function(ctx) {
	var name = ctx.getText();
	this.setNodeValue(ctx, new type.CategoryType(name));
};

EPrestoBuilder.prototype.exitListType = function(ctx) {
	var typ = this.getNodeValue(ctx.l);
	this.setNodeValue(ctx, new type.ListType(typ));
};

EPrestoBuilder.prototype.exitDictType = function(ctx) {
	var typ = this.getNodeValue(ctx.d);
	this.setNodeValue(ctx, new type.DictType(typ));
};


EPrestoBuilder.prototype.exitAttributeList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new grammar.IdentifierList(item));
};


EPrestoBuilder.prototype.exitAttributeListItem = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	var item = this.getNodeValue(ctx.item);
	items.add(item);
	this.setNodeValue(ctx, items);
};

EPrestoBuilder.prototype.exitVariableList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new grammar.IdentifierList(item));
};


EPrestoBuilder.prototype.exitVariableListItem = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	var item = this.getNodeValue(ctx.item);
	items.add(item);
	this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitConcrete_category_declaration = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var attrs = this.getNodeValue(ctx.attrs);
	var derived = this.getNodeValue(ctx.derived);
	var methods = this.getNodeValue(ctx.methods);
	this.setNodeValue(ctx, new declaration.ConcreteCategoryDeclaration(name, attrs, derived, methods));
};


EPrestoBuilder.prototype.exitConcreteCategoryDeclaration = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


EPrestoBuilder.prototype.exitDerivedList = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitDerivedListItem = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	var item = this.getNodeValue(ctx.item);
	items.add(item);
	this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitType_identifier = function(ctx) {
	this.setNodeValue(ctx, ctx.getText());
};


EPrestoBuilder.prototype.exitTypeIdentifierList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new grammar.IdentifierList(item));
};


EPrestoBuilder.prototype.exitTypeIdentifierListItem = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	var item = this.getNodeValue(ctx.item);
	items.add(item);
	this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitInstanceExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


EPrestoBuilder.prototype.exitSelectableExpression = function(ctx) {
	var parent = this.getNodeValue(ctx.parent);
	this.setNodeValue(ctx, parent);
};


EPrestoBuilder.prototype.exitSelectorExpression = function(ctx) {
	var parent = this.getNodeValue(ctx.parent);
	var selector = this.getNodeValue(ctx.selector);
	selector.parent = parent;
	this.setNodeValue(ctx, selector);
};

EPrestoBuilder.prototype.exitSet_literal = function(ctx) {
    var items = this.getNodeValue(ctx.items);
    var set_ = new literal.SetLiteral(items);
    this.setNodeValue(ctx, set_);
};

EPrestoBuilder.prototype.exitSetLiteral = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitMemberSelector = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new expression.MemberSelector(null, name));
};


EPrestoBuilder.prototype.exitItemSelector = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new expression.ItemSelector(null, exp));
};


EPrestoBuilder.prototype.exitSliceSelector = function(ctx) {
	var slice = this.getNodeValue(ctx.xslice);
	this.setNodeValue(ctx, slice);
};


EPrestoBuilder.prototype.exitTyped_argument = function(ctx) {
	var typ = this.getNodeValue(ctx.typ);
	var name = this.getNodeValue(ctx.name);
	var attrs = this.getNodeValue(ctx.attrs);
    var arg = new grammar.CategoryArgument(typ, name, attrs);
    var exp = this.getNodeValue(ctx.value);
    arg.defaultExpression = exp || null;
    this.setNodeValue(ctx, arg);
};


EPrestoBuilder.prototype.exitTypedArgument = function(ctx) {
	var arg = this.getNodeValue(ctx.arg); 
	this.setNodeValue(ctx, arg);
};


EPrestoBuilder.prototype.exitNamedArgument = function(ctx) {
	var arg = this.getNodeValue(ctx.arg);
	this.setNodeValue(ctx, arg);
};


EPrestoBuilder.prototype.exitCodeArgument = function(ctx) {
	var arg = this.getNodeValue(ctx.arg);
	this.setNodeValue(ctx, arg);
};


EPrestoBuilder.prototype.exitCategoryArgumentType = function(ctx) {
	var type = this.getNodeValue(ctx.typ);
	this.setNodeValue(ctx, type);
};

EPrestoBuilder.prototype.exitArgumentList = function(ctx) {
	var item = this.getNodeValue(ctx.item); 
	this.setNodeValue(ctx, new grammar.ArgumentList(item));
};


EPrestoBuilder.prototype.exitArgumentListItem = function(ctx) {
	var items = this.getNodeValue(ctx.items); 
	var item = this.getNodeValue(ctx.item); 
	items.add(item);
	this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitFull_argument_list = function(ctx) {
	var items = this.getNodeValue(ctx.items); 
	var item = this.getNodeValue(ctx.item) || null; 
	if(item!==null) {
		items.add(item);
	}
	this.setNodeValue(ctx, items);
};

EPrestoBuilder.prototype.exitMethodTypeIdentifier = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, name);
};


EPrestoBuilder.prototype.exitMethodVariableIdentifier = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, name);
};


EPrestoBuilder.prototype.exitArgument_assignment = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var exp = this.getNodeValue(ctx.exp);
	var arg = new grammar.UnresolvedArgument(name);
	this.setNodeValue(ctx, new grammar.ArgumentAssignment(arg, exp));
};


EPrestoBuilder.prototype.exitArgumentAssignmentListExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var items = this.getNodeValue(ctx.items) || null;
	if(items===null) {
		items = new grammar.ArgumentAssignmentList();
	}
	items.insert(0, new grammar.ArgumentAssignment(null, exp));
	var item = this.getNodeValue(ctx.item) || null;
	if(item!==null) {
		items.add(item);
	}
	this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitArgumentAssignmentListNoExpression = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	var item = this.getNodeValue(ctx.item) || null;
	if(item!==null) {
		items.add(item);
	}
	this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitArgumentAssignmentList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = new grammar.ArgumentAssignmentList(null, item);
	this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitArgumentAssignmentListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitUnresolvedWithArgsStatement = function(ctx) {
 	var exp = this.getNodeValue(ctx.exp);
	var args = this.getNodeValue(ctx.args);
    var call = new statement.UnresolvedCall(exp, args);
	this.setNodeValue(ctx, call);
};

EPrestoBuilder.prototype.exitAddExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	var exp = ctx.op.type===parser.EParser.PLUS ? new expression.AddExpression(left, right) : new expression.SubtractExpression(left, right);
	this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitCategoryMethodList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = new declaration.CategoryMethodList(item);
	this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitCategoryMethodListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitMember_method_declaration = function(ctx) {
	var type = this.getNodeValue(ctx.typ);
	var name = this.getNodeValue(ctx.name);
	var args = this.getNodeValue(ctx.args);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new declaration.MemberMethodDeclaration(name, args, type, stmts));
};


EPrestoBuilder.prototype.exitSetter_method_declaration = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new declaration.SetterMethodDeclaration(name, stmts));
};


EPrestoBuilder.prototype.exitGetter_method_declaration = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new declaration.GetterMethodDeclaration(name, stmts));
};


EPrestoBuilder.prototype.exitMemberMethod = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


EPrestoBuilder.prototype.exitSetterMethod = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


EPrestoBuilder.prototype.exitGetterMethod = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


EPrestoBuilder.prototype.exitStatementList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new statement.StatementList(item));
};


EPrestoBuilder.prototype.exitStatementListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};

EPrestoBuilder.prototype.exitAbstract_method_declaration = function(ctx) {
	var type = this.getNodeValue(ctx.typ);
	var name = this.getNodeValue(ctx.name);
	var args = this.getNodeValue(ctx.args);
	this.setNodeValue(ctx, new declaration.AbstractMethodDeclaration(name, args, type));
};


EPrestoBuilder.prototype.exitConcrete_method_declaration = function(ctx) {
	var type = this.getNodeValue(ctx.typ);
	var name = this.getNodeValue(ctx.name);
	var args = this.getNodeValue(ctx.args);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new declaration.ConcreteMethodDeclaration(name, args, type, stmts));
};


EPrestoBuilder.prototype.exitMethodCallStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};

EPrestoBuilder.prototype.exitConstructorFrom = function(ctx) {
	var type = this.getNodeValue(ctx.typ);
	var args = this.getNodeValue(ctx.args) || null;
	if(args===null) {
		args = new grammar.ArgumentAssignmentList();
	}
	var firstArg = this.getNodeValue(ctx.firstArg);
	args.insert(0, new grammar.ArgumentAssignment(null, firstArg));
	var arg = this.getNodeValue(ctx.arg) || null;
	if(arg!==null) {
		args.add(arg);
	}
	this.setNodeValue(ctx, new expression.ConstructorExpression(type, args));
};


EPrestoBuilder.prototype.exitConstructorNoFrom = function(ctx) {
	var type = this.getNodeValue(ctx.typ);
	var args = this.getNodeValue(ctx.args) || null;
	if(args===null) {
		args = new grammar.ArgumentAssignmentList();
	}
	var arg = this.getNodeValue(ctx.arg) || null;
	if(arg!==null) {
		args.add(arg);
	}
	this.setNodeValue(ctx, new expression.ConstructorExpression(type, args));
};

EPrestoBuilder.prototype.exitAssertion = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitAssertionList = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    var items = new utils.ExpressionList(null, item);
    this.setNodeValue(ctx, items);
};

EPrestoBuilder.prototype.exitAssertionListItem = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    var items = this.getNodeValue(ctx.items);
    items.add(item);
    this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitAssignInstanceStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


EPrestoBuilder.prototype.exitAssign_instance_statement = function(ctx) {
	var inst = this.getNodeValue(ctx.inst);
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new statement.AssignInstanceStatement(inst, exp));
};


EPrestoBuilder.prototype.exitAssign_variable_statement = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new statement.AssignVariableStatement(name, exp));
};


EPrestoBuilder.prototype.exitAssign_tuple_statement = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new statement.AssignTupleStatement(items, exp));
};

EPrestoBuilder.prototype.exitRootInstance = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new grammar.VariableInstance(name));
};

EPrestoBuilder.prototype.exitRoughlyEqualsExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.ROUGHLY, right));
};



EPrestoBuilder.prototype.exitChildInstance = function(ctx) {
	var parent = this.getNodeValue(ctx.parent);
	var child = this.getNodeValue(ctx.child);
	child.parent = parent;
	this.setNodeValue(ctx, child);
};

EPrestoBuilder.prototype.exitMemberInstance = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new grammar.MemberInstance(name));
};

EPrestoBuilder.prototype.exitIsATypeExpression = function(ctx) {
    var type = this.getNodeValue(ctx.typ);
    var exp = new expression.TypeExpression(type);
    this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitIsOtherExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitIsExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    var op = right instanceof expression.TypeExpression ? grammar.EqOp.IS_A : grammar.EqOp.IS;
    this.setNodeValue(ctx, new expression.EqualsExpression(left, op, right));
};

EPrestoBuilder.prototype.exitIsNotExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    var op = right instanceof expression.TypeExpression ? grammar.EqOp.IS_NOT_A : grammar.EqOp.IS_NOT;
    this.setNodeValue(ctx, new expression.EqualsExpression(left, op, right));
};

EPrestoBuilder.prototype.exitItemInstance = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new grammar.ItemInstance(exp));
};

EPrestoBuilder.prototype.exitConstructorExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitNativeStatementList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = new statement.StatementList(item);
	this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitNativeStatementListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};

EPrestoBuilder.prototype.exitJava_identifier = function(ctx) {
	this.setNodeValue(ctx, ctx.getText());
};

EPrestoBuilder.prototype.exitJavascript_identifier = function(ctx) {
	this.setNodeValue(ctx, ctx.getText());
};

EPrestoBuilder.prototype.exitJavaIdentifier = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new java.JavaIdentifierExpression(null, name));
};

EPrestoBuilder.prototype.exitJavascriptIdentifier = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new javascript.JavaScriptIdentifierExpression(null, name));
};


EPrestoBuilder.prototype.exitJavaIdentifierExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitJavascriptIdentifierExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitJavaChildIdentifier = function(ctx) {
	var parent = this.getNodeValue(ctx.parent);
	var name = this.getNodeValue(ctx.name);
	var child = new java.JavaIdentifierExpression(parent, name);
	this.setNodeValue(ctx, child);
};

EPrestoBuilder.prototype.exitJavascriptChildIdentifier = function(ctx) {
	var parent = this.getNodeValue(ctx.parent);
	var name = this.getNodeValue(ctx.name);
	var child = new javascript.JavaScriptIdentifierExpression(parent, name);
	this.setNodeValue(ctx, child);
};

EPrestoBuilder.prototype.exitJavaClassIdentifier = function(ctx) {
	var klass = this.getNodeValue(ctx.klass);
	this.setNodeValue(ctx, klass);
};

EPrestoBuilder.prototype.exitJavaChildClassIdentifier = function(ctx) {
	var parent = this.getNodeValue(ctx.parent);
	var child = new java.JavaIdentifierExpression(parent, ctx.name.text);
	this.setNodeValue(ctx, child);
};


EPrestoBuilder.prototype.exitJavaPrimaryExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitJavascriptPrimaryExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


EPrestoBuilder.prototype.exitJavaSelectorExpression = function(ctx) {
	var parent = this.getNodeValue(ctx.parent);
	var child = this.getNodeValue(ctx.child);
	child.parent = parent;
	this.setNodeValue(ctx, child);
};

EPrestoBuilder.prototype.exitJavascriptSelectorExpression = function(ctx) {
	var parent = this.getNodeValue(ctx.parent);
	var child = this.getNodeValue(ctx.child);
	child.parent = parent;
	this.setNodeValue(ctx, child);
};


EPrestoBuilder.prototype.exitJava_item_expression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new java.JavaItemExpression(exp));
};

EPrestoBuilder.prototype.exitJavascript_item_expression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new javascript.JavaScriptItemExpression(exp));
};

EPrestoBuilder.prototype.exitJavaItemExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitJavascriptItemExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitJavaStatement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var stmt = new java.JavaStatement(exp,false);
	this.setNodeValue(ctx, stmt);
};

EPrestoBuilder.prototype.exitJavascriptStatement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var stmt = new javascript.JavaScriptStatement(exp,false);
	this.setNodeValue(ctx, stmt);
};

EPrestoBuilder.prototype.exitJavaReturnStatement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new java.JavaStatement(exp,true));
};

EPrestoBuilder.prototype.exitJavascriptReturnStatement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new javascript.JavaScriptStatement(exp,true));
};


EPrestoBuilder.prototype.exitJavaNativeStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	var call = new java.JavaNativeCall(stmt);
	this.setNodeValue(ctx, call);
};


EPrestoBuilder.prototype.exitJavaScriptNativeStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};

EPrestoBuilder.prototype.exitJavascript_native_statement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	var module = this.getNodeValue(ctx.module);
    stmt.module = module || null;
	this.setNodeValue(ctx, new javascript.JavaScriptNativeCall(stmt));
};

EPrestoBuilder.prototype.exitNative_method_declaration = function(ctx) {
	var type = this.getNodeValue(ctx.typ);
	var name = this.getNodeValue(ctx.name);
	var args = this.getNodeValue(ctx.args);
	var stmts = this.getNodeValue(ctx.stmts);
	var decl = new declaration.NativeMethodDeclaration(name, args, type, stmts);
	this.setNodeValue(ctx, decl);
};

EPrestoBuilder.prototype.exitJavaArgumentList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new java.JavaExpressionList(item));
};

EPrestoBuilder.prototype.exitJavascriptArgumentList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new javascript.JavaScriptExpressionList(item));
};


EPrestoBuilder.prototype.exitJavaArgumentListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};

EPrestoBuilder.prototype.exitJavascriptArgumentListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};

EPrestoBuilder.prototype.exitJava_method_expression = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var args = this.getNodeValue(ctx.args);
	this.setNodeValue(ctx, new java.JavaMethodExpression(name, args));
};

EPrestoBuilder.prototype.exitJavascript_method_expression = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var args = this.getNodeValue(ctx.args);
	this.setNodeValue(ctx, new javascript.JavaScriptMethodExpression(name, args));
};

EPrestoBuilder.prototype.exitJavaMethodExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitJavascriptMethodExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitFullDeclarationList = function(ctx) {
	var items = this.getNodeValue(ctx.items) || new grammar.DeclarationList();
	this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitDeclarationList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = new grammar.DeclarationList(items, item);
	this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitDeclarationListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitMethodDeclaration = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


EPrestoBuilder.prototype.exitNativeMethod = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


EPrestoBuilder.prototype.exitConcreteMethod = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


EPrestoBuilder.prototype.exitAbstractMethod = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


EPrestoBuilder.prototype.exitJavaBooleanLiteral = function(ctx) {
	this.setNodeValue(ctx, new java.JavaBooleanLiteral(ctx.getText()));
};


EPrestoBuilder.prototype.exitJavaIntegerLiteral = function(ctx) {
	this.setNodeValue(ctx, new java.JavaIntegerLiteral(ctx.getText()));
};


EPrestoBuilder.prototype.exitJavaDecimalLiteral = function(ctx) {
	this.setNodeValue(ctx, new java.JavaDecimalLiteral(ctx.getText()));
};


EPrestoBuilder.prototype.exitJavaCharacterLiteral = function(ctx) {
	this.setNodeValue(ctx, new java.JavaCharacterLiteral(ctx.getText()));
};


EPrestoBuilder.prototype.exitJavaTextLiteral = function(ctx) {
	this.setNodeValue(ctx, new java.JavaTextLiteral(ctx.getText()));
};

EPrestoBuilder.prototype.exitJavascriptBooleanLiteral = function(ctx) {
	this.setNodeValue(ctx, new javascript.JavaScriptBooleanLiteral(ctx.getText()));
};


EPrestoBuilder.prototype.exitJavascriptIntegerLiteral = function(ctx) {
	this.setNodeValue(ctx, new javascript.JavaScriptIntegerLiteral(ctx.getText()));
};


EPrestoBuilder.prototype.exitJavascriptDecimalLiteral = function(ctx) {
	this.setNodeValue(ctx, new javascript.JavaScriptDecimalLiteral(ctx.getText()));
};


EPrestoBuilder.prototype.exitJavascriptCharacterLiteral = function(ctx) {
	this.setNodeValue(ctx, new javascript.JavaScriptCharacterLiteral(ctx.getText()));
};


EPrestoBuilder.prototype.exitJavascriptTextLiteral = function(ctx) {
	this.setNodeValue(ctx, new javascript.JavaScriptTextLiteral(ctx.getText()));
};


EPrestoBuilder.prototype.exitJavaLiteralExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitJavascriptLiteralExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitJavaCategoryMapping = function(ctx) {
	var map = this.getNodeValue(ctx.mapping);
	this.setNodeValue(ctx, new java.JavaNativeCategoryMapping(map));
};

EPrestoBuilder.prototype.exitJavaScriptCategoryMapping = function(ctx) {
	this.setNodeValue(ctx, this.getNodeValue(ctx.mapping));
};

EPrestoBuilder.prototype.exitJavascript_category_mapping = function(ctx) {
	var identifier = ctx.id_.getText();
	var module = this.getNodeValue(ctx.module) || null;
	var map = new javascript.JavaScriptNativeCategoryMapping(identifier, module);
	this.setNodeValue(ctx, map);
};

EPrestoBuilder.prototype.exitJavascript_module = function(ctx) {
	var ids = []
	var ctxs = ctx.javascript_identifier();
	for(var i=0;i<ctxs.length;i++) {
		ids.push(ctxs[i].getText());
	}
	var module = new javascript.JavaScriptModule(ids);
	this.setNodeValue(ctx, module);
};

EPrestoBuilder.prototype.exitNativeCategoryMappingList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = new grammar.NativeCategoryMappingList(item);
	this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitNativeCategoryMappingListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitNative_category_mappings = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitNative_category_declaration = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var attrs = this.getNodeValue(ctx.attrs);
	var mappings = this.getNodeValue(ctx.mappings);
	this.setNodeValue(ctx, new declaration.NativeCategoryDeclaration(name, attrs, mappings, null));
};


EPrestoBuilder.prototype.exitNativeCategoryDeclaration = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


EPrestoBuilder.prototype.exitNative_resource_declaration = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var attrs = this.getNodeValue(ctx.attrs);
	var mappings = this.getNodeValue(ctx.mappings);
	this.setNodeValue(ctx, new declaration.NativeResourceDeclaration(name, attrs, mappings, null));
};


EPrestoBuilder.prototype.exitResource_declaration = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


EPrestoBuilder.prototype.exitResourceDeclaration = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


EPrestoBuilder.prototype.exitCategoryDeclaration = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};

EPrestoBuilder.prototype.exitAttributeDeclaration = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


EPrestoBuilder.prototype.exitEnumCategoryDeclaration = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


EPrestoBuilder.prototype.exitEnumNativeDeclaration = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


EPrestoBuilder.prototype.exitEnumDeclaration = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


EPrestoBuilder.prototype.exitParenthesis_expression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new expression.ParenthesisExpression(exp));
};


EPrestoBuilder.prototype.exitParenthesisExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


EPrestoBuilder.prototype.exitNativeSymbolList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new grammar.NativeSymbolList(item));
};


EPrestoBuilder.prototype.exitNativeSymbolListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitEnum_native_declaration = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var type = this.getNodeValue(ctx.typ);
	var symbols = this.getNodeValue(ctx.symbols);
	this.setNodeValue(ctx, new declaration.EnumeratedNativeDeclaration(name, type, symbols));
};


EPrestoBuilder.prototype.exitFor_each_statement = function(ctx) {
	var name1 = this.getNodeValue(ctx.name1);
	var name2 = this.getNodeValue(ctx.name2);
	var source = this.getNodeValue(ctx.source);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.ForEachStatement(name1, name2, source, stmts));
};


EPrestoBuilder.prototype.exitForEachStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


EPrestoBuilder.prototype.exitSymbols_token = function(ctx) {
	this.setNodeValue(ctx, ctx.getText());
};


EPrestoBuilder.prototype.exitKey_token = function(ctx) {
	this.setNodeValue(ctx, ctx.getText());
};


EPrestoBuilder.prototype.exitValue_token = function(ctx) {
	this.setNodeValue(ctx, ctx.getText());
};


EPrestoBuilder.prototype.exitNamed_argument = function(ctx) {
	var name = this.getNodeValue(ctx.name);
    var arg = new grammar.UnresolvedArgument(name);
    var exp = this.getNodeValue(ctx.value);
    arg.defaultExpression = exp || null;
	this.setNodeValue(ctx, arg);
};


EPrestoBuilder.prototype.exitClosureStatement = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, new statement.DeclarationInstruction(decl));
};


EPrestoBuilder.prototype.exitReturn_statement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new statement.ReturnStatement(exp));
};


EPrestoBuilder.prototype.exitReturnStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


EPrestoBuilder.prototype.exitClosureExpression = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new expression.MethodExpression(name));
};


EPrestoBuilder.prototype.exitIf_statement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var stmts = this.getNodeValue(ctx.stmts);
	var elseIfs = this.getNodeValue(ctx.elseIfs);
	var elseStmts = this.getNodeValue(ctx.elseStmts);
	this.setNodeValue(ctx, new statement.IfStatement(exp, stmts, elseIfs, elseStmts));
};


EPrestoBuilder.prototype.exitElseIfStatementList = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var stmts = this.getNodeValue(ctx.stmts);
	var elem = new statement.IfElement(exp, stmts);
	this.setNodeValue(ctx, new statement.IfElementList(elem));
};


EPrestoBuilder.prototype.exitElseIfStatementListItem = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	var exp = this.getNodeValue(ctx.exp);
	var stmts = this.getNodeValue(ctx.stmts);
	var elem = new statement.IfElement(exp, stmts);
	items.add(elem);
	this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitIfStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


EPrestoBuilder.prototype.exitSwitchStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


EPrestoBuilder.prototype.exitAssignTupleStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


EPrestoBuilder.prototype.exitRaiseStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


EPrestoBuilder.prototype.exitWriteStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


EPrestoBuilder.prototype.exitWithResourceStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


EPrestoBuilder.prototype.exitWhileStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


EPrestoBuilder.prototype.exitDoWhileStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


EPrestoBuilder.prototype.exitTryStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


EPrestoBuilder.prototype.exitEqualsExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.EQUALS, right));
};


EPrestoBuilder.prototype.exitNotEqualsExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.NOT_EQUALS, right));
};


EPrestoBuilder.prototype.exitGreaterThanExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.GT, right));
};


EPrestoBuilder.prototype.exitGreaterThanOrEqualExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.GTE, right));
};


EPrestoBuilder.prototype.exitLessThanExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.LT, right));
};


EPrestoBuilder.prototype.exitLessThanOrEqualExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.LTE, right));
};


EPrestoBuilder.prototype.exitAtomicSwitchCase = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.AtomicSwitchCase(exp, stmts));
};


EPrestoBuilder.prototype.exitCollectionSwitchCase = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.CollectionSwitchCase(exp, stmts));
};


EPrestoBuilder.prototype.exitSwitchCaseStatementList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new statement.SwitchCaseList(item));
};


EPrestoBuilder.prototype.exitSwitchCaseStatementListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitSwitch_statement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var cases = this.getNodeValue(ctx.cases);
	var stmts = this.getNodeValue(ctx.stmts);
	var stmt = new statement.SwitchStatement(exp, cases, stmts);
	this.setNodeValue(ctx, stmt);
};


EPrestoBuilder.prototype.exitLiteralRangeLiteral = function(ctx) {
	var low = this.getNodeValue(ctx.low);
	var high = this.getNodeValue(ctx.high);
	this.setNodeValue(ctx, new literal.RangeLiteral(low, high));
};

EPrestoBuilder.prototype.exitLiteralListLiteral = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new literal.ListLiteral(exp));
};


EPrestoBuilder.prototype.exitLiteralList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new utils.ExpressionList(null, item));
};


EPrestoBuilder.prototype.exitLiteralListItem = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	var item = this.getNodeValue(ctx.item);
	items.add(item);
	this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitInExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.IN, right));
};


EPrestoBuilder.prototype.exitNotInExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_IN, right));
};


EPrestoBuilder.prototype.exitContainsAllExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.CONTAINS_ALL, right));
};


EPrestoBuilder.prototype.exitNotContainsAllExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_CONTAINS_ALL, right));
};


EPrestoBuilder.prototype.exitContainsAnyExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.CONTAINS_ANY, right));
};


EPrestoBuilder.prototype.exitNotContainsAnyExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_CONTAINS_ANY, right));
};


EPrestoBuilder.prototype.exitContainsExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.CONTAINS, right));
};


EPrestoBuilder.prototype.exitNotContainsExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_CONTAINS, right));
};


EPrestoBuilder.prototype.exitDivideExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.DivideExpression(left, right));
};


EPrestoBuilder.prototype.exitIntDivideExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.IntDivideExpression(left, right));
};


EPrestoBuilder.prototype.exitModuloExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.ModuloExpression(left, right));
};


EPrestoBuilder.prototype.exitAndExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.AndExpression(left, right));
};


EPrestoBuilder.prototype.exitNullLiteral = function(ctx) {
    this.setNodeValue(ctx, literal.NullLiteral.instance);
};


EPrestoBuilder.prototype.exitOperatorArgument = function(ctx) {
    var arg = this.getNodeValue(ctx.arg);
    this.setNodeValue(ctx, arg);
};


EPrestoBuilder.prototype.exitOperatorPlus = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.PLUS);
};


EPrestoBuilder.prototype.exitOperatorMinus = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.MINUS);
};


EPrestoBuilder.prototype.exitOperatorMultiply = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.MULTIPLY);
};


EPrestoBuilder.prototype.exitOperatorDivide = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.DIVIDE);
};


EPrestoBuilder.prototype.exitOperatorIDivide = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.IDIVIDE);
};


EPrestoBuilder.prototype.exitOperatorModulo = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.MODULO);
};


EPrestoBuilder.prototype.exitOperator_method_declaration= function(ctx) {
    var op = this.getNodeValue(ctx.op);
    var arg = this.getNodeValue(ctx.arg);
    var typ = this.getNodeValue(ctx.typ);
    var stmts = this.getNodeValue(ctx.stmts);
    var decl = new declaration.OperatorMethodDeclaration(op, arg, typ, stmts);
    this.setNodeValue(ctx, decl);
}


EPrestoBuilder.prototype.exitOperatorMethod= function(ctx) {
    var decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
}

EPrestoBuilder.prototype.exitOrExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.OrExpression(left, right));
};


EPrestoBuilder.prototype.exitMultiplyExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.MultiplyExpression(left, right));
};


EPrestoBuilder.prototype.exitMinusExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new expression.MinusExpression(exp));
};


EPrestoBuilder.prototype.exitNotExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new expression.NotExpression(exp));
};


EPrestoBuilder.prototype.exitWhile_statement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.WhileStatement(exp, stmts));
};


EPrestoBuilder.prototype.exitDo_while_statement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.DoWhileStatement(exp, stmts));
};

EPrestoBuilder.prototype.exitSingleton_category_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var attrs = this.getNodeValue(ctx.attrs);
    var methods = this.getNodeValue(ctx.methods);
    this.setNodeValue(ctx, new declaration.SingletonCategoryDeclaration(name, attrs, methods));
};

EPrestoBuilder.prototype.exitSingletonCategoryDeclaration = function(ctx) {
    var decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
};

EPrestoBuilder.prototype.exitSliceFirstAndLast = function(ctx) {
	var first = this.getNodeValue(ctx.first);
	var last = this.getNodeValue(ctx.last);
	this.setNodeValue(ctx, new expression.SliceSelector(null, first, last));
};


EPrestoBuilder.prototype.exitSliceFirstOnly = function(ctx) {
	var first = this.getNodeValue(ctx.first);
	this.setNodeValue(ctx, new expression.SliceSelector(null, first, null));
};


EPrestoBuilder.prototype.exitSliceLastOnly = function(ctx) {
	var last = this.getNodeValue(ctx.last);
	this.setNodeValue(ctx, new expression.SliceSelector(null, null, last));
};


EPrestoBuilder.prototype.exitSorted_expression = function(ctx) {
	var source = this.getNodeValue(ctx.source);
	var key = this.getNodeValue(ctx.key);
	this.setNodeValue(ctx, new expression.SortedExpression(source, key));
};


EPrestoBuilder.prototype.exitSortedExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


EPrestoBuilder.prototype.exitDocumentExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


EPrestoBuilder.prototype.exitDocument_expression = function(ctx) {
	this.setNodeValue(ctx, new expression.DocumentExpression());
};


EPrestoBuilder.prototype.exitDocument_type = function(ctx) {
	this.setNodeValue(ctx, type.DocumentType.instance);
};


EPrestoBuilder.prototype.exitFetchExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


EPrestoBuilder.prototype.exitFetch_expression = function(ctx) {
	var itemName = this.getNodeValue(ctx.name);
	var source = this.getNodeValue(ctx.source);
	var filter = this.getNodeValue(ctx.xfilter);
	this.setNodeValue(ctx, new expression.FetchExpression(itemName, source, filter));
};


EPrestoBuilder.prototype.exitCode_type = function(ctx) {
	this.setNodeValue(ctx, type.CodeType.instance);
};


EPrestoBuilder.prototype.exitExecuteExpression = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new expression.ExecuteExpression(name));
};


EPrestoBuilder.prototype.exitCodeExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new expression.CodeExpression(exp));
};


EPrestoBuilder.prototype.exitCode_argument = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new grammar.CodeArgument(name));
};


EPrestoBuilder.prototype.exitCategory_symbol = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var args = this.getNodeValue(ctx.args);
	var arg = this.getNodeValue(ctx.arg) || null;
	if(arg!==null) {
		args.add(arg);
	}
	this.setNodeValue(ctx, new grammar.CategorySymbol(name, args));
};


EPrestoBuilder.prototype.exitCategorySymbolList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new grammar.CategorySymbolList(item));
};


EPrestoBuilder.prototype.exitCategorySymbolListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitEnum_category_declaration = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var attrs = this.getNodeValue(ctx.attrs);
	var parent = this.getNodeValue(ctx.derived);
	var derived = parent==null ? null : new grammar.IdentifierList(parent);
	var symbols = this.getNodeValue(ctx.symbols);
	this.setNodeValue(ctx, new declaration.EnumeratedCategoryDeclaration(name, attrs, derived, symbols));
};


EPrestoBuilder.prototype.exitRead_expression = function(ctx) {
	var source = this.getNodeValue(ctx.source);
	this.setNodeValue(ctx, new expression.ReadExpression(source));
};


EPrestoBuilder.prototype.exitReadExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitWith_singleton_statement = function(ctx) {
    var name = this.getNodeValue(ctx.typ);
    var typ = new type.CategoryType(name);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.WithSingletonStatement(typ, stmts));
};

EPrestoBuilder.prototype.exitWithSingletonStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};

EPrestoBuilder.prototype.exitWrite_statement = function(ctx) {
	var what = this.getNodeValue(ctx.what);
	var target = this.getNodeValue(ctx.target);
	this.setNodeValue(ctx, new statement.WriteStatement(what, target));
};


EPrestoBuilder.prototype.exitWith_resource_statement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.WithResourceStatement(stmt, stmts));
};


EPrestoBuilder.prototype.exitAnyType = function(ctx) {
	this.setNodeValue(ctx, type.AnyType.instance);
};


EPrestoBuilder.prototype.exitAnyListType = function(ctx) {
	var type = this.getNodeValue(ctx.typ);
	this.setNodeValue(ctx, new type.ListType(type));
};


EPrestoBuilder.prototype.exitAnyDictType = function(ctx) {
	var type = this.getNodeValue(ctx.typ);
	this.setNodeValue(ctx, new type.DictType(type));
};


EPrestoBuilder.prototype.exitAnyArgumentType = function(ctx) {
	var type = this.getNodeValue(ctx.typ);
	this.setNodeValue(ctx, type);
};


EPrestoBuilder.prototype.exitCastExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var type = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.CastExpression(left, type));
}

EPrestoBuilder.prototype.exitCatchAtomicStatement = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.AtomicSwitchCase(new expression.SymbolExpression(name), stmts));
};


EPrestoBuilder.prototype.exitCatchCollectionStatement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.CollectionSwitchCase(exp, stmts));
};


EPrestoBuilder.prototype.exitCatchStatementList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new statement.SwitchCaseList(item));
};


EPrestoBuilder.prototype.exitCatchStatementListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};


EPrestoBuilder.prototype.exitTry_statement = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var stmts = this.getNodeValue(ctx.stmts);
	var handlers = this.getNodeValue(ctx.handlers);
	var anyStmts = this.getNodeValue(ctx.anyStmts);
	var finalStmts = this.getNodeValue(ctx.finalStmts);
	var stmt = new statement.SwitchErrorStatement(name, stmts, handlers, anyStmts, finalStmts);
	this.setNodeValue(ctx, stmt);
};


EPrestoBuilder.prototype.exitRaise_statement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new statement.RaiseStatement(exp));
};

EPrestoBuilder.prototype.exitMatchingList = function(ctx) {
	var exp = this.getNodeValue(ctx.source);
	this.setNodeValue(ctx, new grammar.MatchingCollectionConstraint(exp));
};

EPrestoBuilder.prototype.exitMatchingRange = function(ctx) {
	var exp = this.getNodeValue(ctx.source);
	this.setNodeValue(ctx, new grammar.MatchingCollectionConstraint(exp));
};

EPrestoBuilder.prototype.exitMatchingExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new grammar.MatchingExpressionConstraint(exp));
};

EPrestoBuilder.prototype.exitMatchingPattern = function(ctx) {
	this.setNodeValue(ctx, new grammar.MatchingPatternConstraint(new literal.TextLiteral(ctx.text.text)));
};

EPrestoBuilder.prototype.exitLiteralSetLiteral = function(ctx) {
    var items = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new literal.SetLiteral(items));
};


EPrestoBuilder.prototype.exitInvocation_expression = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var select = new expression.MethodSelector(null, name);
	this.setNodeValue(ctx, new statement.MethodCall(select));
};


EPrestoBuilder.prototype.exitInvocationExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


EPrestoBuilder.prototype.exitInvokeStatement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};



EPrestoBuilder.prototype.exitCsharp_identifier = function(ctx) {
    this.setNodeValue(ctx, ctx.getText());
};

EPrestoBuilder.prototype.exitCSharpIdentifier = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new csharp.CSharpIdentifierExpression(null, name));
};

EPrestoBuilder.prototype.exitCSharpIdentifierExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitCSharpChildIdentifier = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var name = this.getNodeValue(ctx.name);
    var child = new csharp.CSharpIdentifierExpression(parent, name);
    this.setNodeValue(ctx, child);
};

EPrestoBuilder.prototype.exitCSharpBooleanLiteral = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpBooleanLiteral(ctx.getText()));
};


EPrestoBuilder.prototype.exitCSharpIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpIntegerLiteral(ctx.getText()));
};


EPrestoBuilder.prototype.exitCSharpDecimalLiteral = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpDecimalLiteral(ctx.getText()));
};


EPrestoBuilder.prototype.exitCSharpCharacterLiteral = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpCharacterLiteral(ctx.getText()));
};


EPrestoBuilder.prototype.exitCSharpTextLiteral = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpTextLiteral(ctx.getText()));
};


EPrestoBuilder.prototype.exitCSharpCategoryMapping = function(ctx) {
    var map = this.getNodeValue(ctx.mapping);
    this.setNodeValue(ctx, new csharp.CSharpNativeCategoryMapping(map));
};

EPrestoBuilder.prototype.exitCSharpLiteralExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitCsharp_method_expression = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var args = this.getNodeValue(ctx.args);
    this.setNodeValue(ctx, new csharp.CSharpMethodExpression(name, args));
};

EPrestoBuilder.prototype.exitCSharpMethodExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitCSharpArgumentList = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    this.setNodeValue(ctx, new csharp.CSharpExpressionList(item));
};

EPrestoBuilder.prototype.exitCSharpArgumentListItem = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    var items = this.getNodeValue(ctx.items);
    items.add(item);
    this.setNodeValue(ctx, items);
};

EPrestoBuilder.prototype.exitCSharpNativeStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    var call = new csharp.CSharpNativeCall(stmt);
    this.setNodeValue(ctx, call);
};

EPrestoBuilder.prototype.exitCSharpPrimaryExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitCSharpSelectorExpression = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var child = this.getNodeValue(ctx.child);
    child.parent = parent;
    this.setNodeValue(ctx, child);
};

EPrestoBuilder.prototype.exitCSharpStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var stmt = new csharp.CSharpStatement(exp,false);
    this.setNodeValue(ctx, stmt);
};

EPrestoBuilder.prototype.exitCSharpReturnStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new csharp.CSharpStatement(exp,true));
};


EPrestoBuilder.prototype.exitPythonStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new python.PythonStatement(exp,false));
};

EPrestoBuilder.prototype.exitPythonReturnStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new python.PythonStatement(exp,true));
};

EPrestoBuilder.prototype.exitPython2CategoryMapping = function(ctx) {
    var map = this.getNodeValue(ctx.mapping);
    this.setNodeValue(ctx, new python.Python2NativeCategoryMapping(map));
};


EPrestoBuilder.prototype.exitPython3CategoryMapping = function(ctx) {
    var map = this.getNodeValue(ctx.mapping);
    this.setNodeValue(ctx, new python.Python3NativeCategoryMapping(map));
};


EPrestoBuilder.prototype.exitPython_category_mapping = function(ctx) {
    var identifier = ctx.id_.getText();
    var module = this.getNodeValue(ctx.python_module()) || null;
    var map = new python.PythonNativeCategoryMapping(identifier, module);
    this.setNodeValue(ctx, map);
};

EPrestoBuilder.prototype.exitPython_method_expression = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var args = this.getNodeValue(ctx.args);
    var method = new python.PythonMethodExpression(name, args);
    this.setNodeValue(ctx, method);
};

EPrestoBuilder.prototype.exitPythonGlobalMethodExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitPythonMethodExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitPython_module = function(ctx) {
    var ids = []
    var ctxs = ctx.identifier();
    for(var i=0;i<ctxs.length;i++) {
        ids.push(ctxs[i].getText());
    }
    var module = new python.PythonModule(ids);
    this.setNodeValue(ctx, module);
};

EPrestoBuilder.prototype.exitPython2NativeStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, new python.Python2NativeCall(stmt));
};


EPrestoBuilder.prototype.exitPython3NativeStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, new python.Python3NativeCall(stmt));
};

EPrestoBuilder.prototype.exitPython_native_statement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    var module = this.getNodeValue(ctx.module);
    stmt.module = module || null;
    this.setNodeValue(ctx, new python.PythonNativeCall(stmt));
}

EPrestoBuilder.prototype.exitPython_identifier = function(ctx) {
    this.setNodeValue(ctx, ctx.getText());
};

EPrestoBuilder.prototype.exitPythonIdentifier = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new python.PythonIdentifierExpression(null, name));
};

EPrestoBuilder.prototype.exitPythonIdentifierExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitPythonChildIdentifier = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var name = this.getNodeValue(ctx.name);
    var child = new python.PythonIdentifierExpression(parent, name);
    this.setNodeValue(ctx, child);
};


EPrestoBuilder.prototype.exitPythonBooleanLiteral = function(ctx) {
    this.setNodeValue(ctx, new python.PythonBooleanLiteral(ctx.getText()));
};

EPrestoBuilder.prototype.exitPythonIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new python.PythonIntegerLiteral(ctx.getText()));
};


EPrestoBuilder.prototype.exitPythonDecimalLiteral = function(ctx) {
    this.setNodeValue(ctx, new python.PythonDecimalLiteral(ctx.getText()));
};


EPrestoBuilder.prototype.exitPythonCharacterLiteral = function(ctx) {
    this.setNodeValue(ctx, new python.PythonCharacterLiteral(ctx.getText()));
};


EPrestoBuilder.prototype.exitPythonTextLiteral = function(ctx) {
    this.setNodeValue(ctx, new python.PythonTextLiteral(ctx.getText()));
};

EPrestoBuilder.prototype.exitPythonLiteralExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitPythonPrimaryExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPrestoBuilder.prototype.exitPythonArgumentList = function(ctx) {
    var ordinal = this.getNodeValue(ctx.ordinal);
    var named = this.getNodeValue(ctx.named);
    ordinal.addAll(named);
    this.setNodeValue(ctx, ordinal);
};


EPrestoBuilder.prototype.exitPythonNamedOnlyArgumentList = function(ctx) {
    var named = this.getNodeValue(ctx.named);
    this.setNodeValue(ctx, named);
};

EPrestoBuilder.prototype.exitPythonNamedArgumentList = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var exp = this.getNodeValue(ctx.exp);
    var arg = new python.PythonNamedArgument(name, exp);
    this.setNodeValue(ctx, new python.PythonArgumentList(arg));
};

EPrestoBuilder.prototype.exitPythonNamedArgumentListItem = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var exp = this.getNodeValue(ctx.exp);
    var arg = new python.PythonNamedArgument(name, exp);
    var items = this.getNodeValue(ctx.items);
    items.add(arg);
    this.setNodeValue(ctx, items);
}

EPrestoBuilder.prototype.exitPythonSelectorExpression = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var selector = this.getNodeValue(ctx.child);
    selector.parent = parent;
    this.setNodeValue(ctx, selector);
}

EPrestoBuilder.prototype.buildSection = function(node, section) {
	var first = this.findFirstValidToken(node.start.tokenIndex);
	var last = this.findLastValidToken(node.stop.tokenIndex);
	section.setFrom(this.path, first, last, parser.Dialect.E);
};

EPrestoBuilder.prototype.findFirstValidToken = function(idx) {
	if(idx===-1) { // happens because input.index() is called before any other read operation (bug?)
		idx = 0;
	}
	do {
		var token = this.readValidToken(idx++);
		if(token!==null) {
			return token;
		}
	} while(idx<this.input.size());
	return null;
};

EPrestoBuilder.prototype.findLastValidToken = function(idx) {
	if(idx===-1) { // happens because input.index() is called before any other read operation (bug?)
		idx = 0;
	}
	while(idx>=0) {
		var token = this.readValidToken(idx--);
		if(token!==null) {
			return token;
		}
	}
	return null;
};

EPrestoBuilder.prototype.readValidToken = function(idx) {
	var token = this.input.get(idx);
	var text = token.text;
	if(text!==null && text.length>0 && !value.Character.isWhitespace(text[0])) {
		return token;
	} else {
		return null;
	}
};


exports.EPrestoBuilder = EPrestoBuilder;
