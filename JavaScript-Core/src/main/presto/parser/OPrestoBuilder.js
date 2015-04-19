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

function OPrestoBuilder(oparser) {
	parser.OParserListener.call(this);
	this.input = oparser.getTokenStream();
	this.path = oparser.path;
	this.nodeValues = {};
	return this;
};

OPrestoBuilder.prototype = Object.create(parser.OParserListener.prototype);
OPrestoBuilder.prototype.constructor = OPrestoBuilder;


OPrestoBuilder.prototype.getNodeValue = function(node) {
	return this.nodeValues[node];
};

OPrestoBuilder.prototype.setNodeValue = function(node, value) {
	this.nodeValues[node] = value;
	if(value instanceof parser.Section) {
		this.buildSection(node, value);
	};
};



OPrestoBuilder.prototype.exitSelectableExpression = function(ctx) {
	var e = this.getNodeValue(ctx.parent);
	this.setNodeValue(ctx, e);
};


OPrestoBuilder.prototype.exitSelectorExpression = function(ctx) {
	var parent = this.getNodeValue(ctx.parent);
	var selector = this.getNodeValue(ctx.selector);
	selector.parent = parent;
	this.setNodeValue(ctx, selector);
};

OPrestoBuilder.prototype.exitSet_literal = function(ctx) {
    var items = this.getNodeValue(ctx.items);
    var set_ = new literal.SetLiteral(items);
    this.setNodeValue(ctx, set_);
};

OPrestoBuilder.prototype.exitSetLiteral = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

OPrestoBuilder.prototype.exitAtomicLiteral = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPrestoBuilder.prototype.exitCollectionLiteral = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPrestoBuilder.prototype.exitListLiteral = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPrestoBuilder.prototype.exitBooleanLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.BooleanLiteral(ctx.t.text));
};

OPrestoBuilder.prototype.exitMinIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.MinIntegerLiteral());
};


OPrestoBuilder.prototype.exitMaxIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.MaxIntegerLiteral());
};


OPrestoBuilder.prototype.exitIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.IntegerLiteral(ctx.t.text, ctx.t.text));
};


OPrestoBuilder.prototype.exitDecimalLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.DecimalLiteral(ctx.t.text));
};


OPrestoBuilder.prototype.exitHexadecimalLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.HexaLiteral(ctx.t.text));
};


OPrestoBuilder.prototype.exitCharacterLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.CharacterLiteral(ctx.t.text));
};


OPrestoBuilder.prototype.exitDateLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.DateLiteral(ctx.t.text));
};


OPrestoBuilder.prototype.exitDateTimeLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.DateTimeLiteral(ctx.t.text));
};

OPrestoBuilder.prototype.exitTernaryExpression = function(ctx) {
    var condition = this.getNodeValue(ctx.test);
    var ifTrue = this.getNodeValue(ctx.ifTrue);
    var ifFalse = this.getNodeValue(ctx.ifFalse);
    var exp = new expression.TernaryExpression(condition, ifTrue, ifFalse);
    this.setNodeValue(ctx, exp);
};

OPrestoBuilder.prototype.exitTest_method_declaration = function(ctx) {
    var name = ctx.name.text;
    var stmts = this.getNodeValue(ctx.stmts);
    var exps = this.getNodeValue(ctx.exps);
    var errorName = this.getNodeValue(ctx.error);
    var error = errorName==null ? null : new expression.SymbolExpression(errorName);
    this.setNodeValue(ctx, new declaration.TestMethodDeclaration(name, stmts, exps, error));
};

OPrestoBuilder.prototype.exitTestMethod = function(ctx) {
    var decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
};


OPrestoBuilder.prototype.exitTextLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.TextLiteral(ctx.t.text));
};


OPrestoBuilder.prototype.exitTimeLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.TimeLiteral(ctx.t.text));
};


OPrestoBuilder.prototype.exitPeriodLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.PeriodLiteral(ctx.t.text));
};


OPrestoBuilder.prototype.exitVariable_identifier = function(ctx) {
	this.setNodeValue(ctx, ctx.getText());
};


OPrestoBuilder.prototype.exitList_literal = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	var value = items==null ? new literal.ListLiteral() : new literal.ListLiteral(items);
	this.setNodeValue(ctx, value);
};


OPrestoBuilder.prototype.exitDict_literal = function(ctx) {
	var items = this.getNodeValue(ctx.items) || null;
	var value = items==null ? new literal.DictLiteral() : new literal.DictLiteral(items);
	this.setNodeValue(ctx, value);
};


OPrestoBuilder.prototype.exitTuple_literal = function(ctx) {
	var items = this.getNodeValue(ctx.items) || null;
	var value = items==null ? new literal.TupleLiteral() : new literal.TupleLiteral(items);
	this.setNodeValue(ctx, value);
};


OPrestoBuilder.prototype.exitTupleLiteral = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};



OPrestoBuilder.prototype.exitRange_literal = function(ctx) {
	var low = this.getNodeValue(ctx.low);
	var high = this.getNodeValue(ctx.high);
	this.setNodeValue(ctx, new literal.RangeLiteral(low, high));
};


OPrestoBuilder.prototype.exitRangeLiteral = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPrestoBuilder.prototype.exitDictLiteral = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPrestoBuilder.prototype.exitDictEntryList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new literal.DictEntryList(null, item));
};


OPrestoBuilder.prototype.exitDictEntryListItem = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	var item = this.getNodeValue(ctx.item);
	items.add(item);
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitDict_entry = function(ctx) {
	var key = this.getNodeValue(ctx.key);
	var value= this.getNodeValue(ctx.value);
	var entry = new literal.DictEntry(key, value);
	this.setNodeValue(ctx, entry);
};


OPrestoBuilder.prototype.exitLiteralExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPrestoBuilder.prototype.exitIdentifierExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPrestoBuilder.prototype.exitVariableIdentifier = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new expression.InstanceExpression(name));
};


OPrestoBuilder.prototype.exitInstanceExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPrestoBuilder.prototype.exitValueList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new utils.ExpressionList(null, item));
};


OPrestoBuilder.prototype.exitValueListItem = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	var item = this.getNodeValue(ctx.item);
	items.add(item);
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitValueTuple = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new utils.ExpressionList(null, item));
};


OPrestoBuilder.prototype.exitValueTupleItem = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	var item = this.getNodeValue(ctx.item);
	items.add(item);
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitSymbol_identifier = function(ctx) {
	this.setNodeValue(ctx, ctx.getText());
};


OPrestoBuilder.prototype.exitNative_symbol = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new grammar.NativeSymbol(name, exp));
};


OPrestoBuilder.prototype.exitTypeIdentifier = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new grammar.UnresolvedIdentifier(name));
};


OPrestoBuilder.prototype.exitSymbolIdentifier = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new expression.SymbolExpression(name));
};



OPrestoBuilder.prototype.exitBooleanType = function(ctx) {
	this.setNodeValue(ctx, type.BooleanType.instance);
};


OPrestoBuilder.prototype.exitCharacterType = function(ctx) {
	this.setNodeValue(ctx, type.CharacterType.instance);
};


OPrestoBuilder.prototype.exitTextType = function(ctx) {
	this.setNodeValue(ctx, type.TextType.instance);
};

OPrestoBuilder.prototype.exitThisExpression = function(ctx) {
    this.setNodeValue(ctx, new expression.ThisExpression());
};

OPrestoBuilder.prototype.exitIntegerType = function(ctx) {
	this.setNodeValue(ctx, type.IntegerType.instance);
};


OPrestoBuilder.prototype.exitDecimalType = function(ctx) {
	this.setNodeValue(ctx, type.DecimalType.instance);
};


OPrestoBuilder.prototype.exitDateType = function(ctx) {
	this.setNodeValue(ctx, type.DateType.instance);
};


OPrestoBuilder.prototype.exitDateTimeType = function(ctx) {
	this.setNodeValue(ctx, type.TextType.instance);
};


OPrestoBuilder.prototype.exitTimeType = function(ctx) {
	this.setNodeValue(ctx, type.TimeType.instance);
};


OPrestoBuilder.prototype.exitCodeType = function(ctx) {
	this.setNodeValue(ctx, type.CodeType.instance);
};


OPrestoBuilder.prototype.exitPrimaryType = function(ctx) {
	var type = this.getNodeValue(ctx.p);
	this.setNodeValue(ctx, type);
};


OPrestoBuilder.prototype.exitAttribute_declaration = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var type = this.getNodeValue(ctx.typ);
	var match = this.getNodeValue(ctx.match);
	this.setNodeValue(ctx, new declaration.AttributeDeclaration(name, type, match));
};


OPrestoBuilder.prototype.exitNativeType = function(ctx) {
	var type = this.getNodeValue(ctx.n);
	this.setNodeValue(ctx, type);
};


OPrestoBuilder.prototype.exitCategoryType = function(ctx) {
	var type = this.getNodeValue(ctx.c);
	this.setNodeValue(ctx, type);
};


OPrestoBuilder.prototype.exitCategory_type = function(ctx) {
	var name = ctx.getText();
	this.setNodeValue(ctx, new type.CategoryType(name));
};


OPrestoBuilder.prototype.exitListType = function(ctx) {
	var typ = this.getNodeValue(ctx.l);
	this.setNodeValue(ctx, new type.ListType(typ));
};


OPrestoBuilder.prototype.exitDictType = function(ctx) {
	var typ = this.getNodeValue(ctx.d);
	this.setNodeValue(ctx, new type.DictType(typ));
};


OPrestoBuilder.prototype.exitAttributeList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new grammar.IdentifierList(item));
};


OPrestoBuilder.prototype.exitAttributeListItem = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	var item = this.getNodeValue(ctx.item);
	items.add(item);
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitConcrete_category_declaration = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var attrs = this.getNodeValue(ctx.attrs);
	var derived = this.getNodeValue(ctx.derived);
	var methods = this.getNodeValue(ctx.methods);
	this.setNodeValue(ctx, new declaration.ConcreteCategoryDeclaration(name, attrs, derived, methods));
};


OPrestoBuilder.prototype.exitConcreteCategoryDeclaration = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


OPrestoBuilder.prototype.exitDerivedList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new grammar.IdentifierList(item));
};


OPrestoBuilder.prototype.exitDerivedListItem = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	var item = this.getNodeValue(ctx.item);
	items.add(item);
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitType_identifier = function(ctx) {
	this.setNodeValue(ctx, ctx.getText());
};


OPrestoBuilder.prototype.exitTypeIdentifierList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new grammar.IdentifierList(item));
};


OPrestoBuilder.prototype.exitTypeIdentifierListItem = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	var item = this.getNodeValue(ctx.item);
	items.add(item);
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitMemberSelector = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new expression.MemberSelector(null, name));
};

OPrestoBuilder.prototype.exitIsATypeExpression = function(ctx) {
    var type = this.getNodeValue(ctx.typ);
    var exp = new expression.TypeExpression(type);
    this.setNodeValue(ctx, exp);
};

OPrestoBuilder.prototype.exitIsOtherExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

OPrestoBuilder.prototype.exitIsExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    var op = right instanceof expression.TypeExpression ? grammar.EqOp.IS_A : grammar.EqOp.IS;
    this.setNodeValue(ctx, new expression.EqualsExpression(left, op, right));
};

OPrestoBuilder.prototype.exitIsNotExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    var op = right instanceof expression.TypeExpression ? grammar.EqOp.IS_NOT_A : grammar.EqOp.IS_NOT;
    this.setNodeValue(ctx, new expression.EqualsExpression(left, op, right));
};



OPrestoBuilder.prototype.exitItemSelector = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new expression.ItemSelector(null, exp));
};


OPrestoBuilder.prototype.exitSliceSelector = function(ctx) {
	var slice = this.getNodeValue(ctx.xslice);
	this.setNodeValue(ctx, slice);
};


OPrestoBuilder.prototype.exitTyped_argument = function(ctx) {
	var typ = this.getNodeValue(ctx.typ);
	var name = this.getNodeValue(ctx.name);
	var attrs = this.getNodeValue(ctx.attrs);
    var arg = new grammar.CategoryArgument(typ, name, attrs);
    var exp = this.getNodeValue(ctx.value);
    arg.defaultExpression = exp || null;
    this.setNodeValue(ctx, arg);
};


OPrestoBuilder.prototype.exitTypedArgument = function(ctx) {
	var arg = this.getNodeValue(ctx.arg);
	this.setNodeValue(ctx, arg);
};


OPrestoBuilder.prototype.exitNamedArgument = function(ctx) {
	var arg = this.getNodeValue(ctx.arg);
	this.setNodeValue(ctx, arg);
};


OPrestoBuilder.prototype.exitCodeArgument = function(ctx) {
	var arg = this.getNodeValue(ctx.arg);
	this.setNodeValue(ctx, arg);
};


OPrestoBuilder.prototype.exitCategoryArgumentType = function(ctx) {
	var type = this.getNodeValue(ctx.typ);
	this.setNodeValue(ctx, type);
};


OPrestoBuilder.prototype.exitArgumentList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new grammar.ArgumentList(item));
};


OPrestoBuilder.prototype.exitArgumentListItem = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	var item = this.getNodeValue(ctx.item);
	items.add(item);
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitMethodTypeIdentifier = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, name);
};


OPrestoBuilder.prototype.exitMethodVariableIdentifier = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, name);
};


OPrestoBuilder.prototype.exitMethodName = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new grammar.UnresolvedIdentifier(name));
};



OPrestoBuilder.prototype.exitMethodParent = function(ctx) {
	var parent = this.getNodeValue(ctx.parent);
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new expression.MethodSelector(parent, name));
};


OPrestoBuilder.prototype.exitExpressionAssignmentList = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var assign = new grammar.ArgumentAssignment(null, exp);
	this.setNodeValue(ctx, new grammar.ArgumentAssignmentList(null, assign));
};


OPrestoBuilder.prototype.exitArgument_assignment = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var exp = this.getNodeValue(ctx.exp);
	var arg = new grammar.UnresolvedArgument(name);
	this.setNodeValue(ctx, new grammar.ArgumentAssignment(arg, exp));
};


OPrestoBuilder.prototype.exitArgumentAssignmentList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new grammar.ArgumentAssignmentList(null, item));
};


OPrestoBuilder.prototype.exitArgumentAssignmentListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitMethod_call = function(ctx) {
	var method = this.getNodeValue(ctx.method);
	var args = this.getNodeValue(ctx.args);
	this.setNodeValue(ctx, new statement.UnresolvedCall(method, args));
};


OPrestoBuilder.prototype.exitCallableRoot = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, name);
};


OPrestoBuilder.prototype.exitCallableSelector = function(ctx) {
	var parent = this.getNodeValue(ctx.parent);
	var select = this.getNodeValue(ctx.select);
	select.setParent(parent);
	this.setNodeValue(ctx, select);
};


OPrestoBuilder.prototype.exitCallableMemberSelector = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new MemberSelector(name));
};


OPrestoBuilder.prototype.exitCallableItemSelector = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new ItemSelector(exp));
};


OPrestoBuilder.prototype.exitAddExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	var exp = ctx.op.type==parser.OParser.PLUS ?
		new expression.AddExpression(left, right) :
		new expression.SubtractExpression(left, right);
	this.setNodeValue(ctx, exp);
};


OPrestoBuilder.prototype.exitCategoryMethodList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = new declaration.CategoryMethodList(item);
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitCategoryMethodListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitEmptyCategoryMethodList = function(ctx) {
	this.setNodeValue(ctx, new declaration.CategoryMethodList());
};


OPrestoBuilder.prototype.exitCurlyCategoryMethodList = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitSetter_method_declaration = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new declaration.SetterMethodDeclaration(name, stmts));
};


OPrestoBuilder.prototype.exitGetter_method_declaration = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new declaration.GetterMethodDeclaration(name, stmts));
};


OPrestoBuilder.prototype.exitConcreteMemberMethod = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};

OPrestoBuilder.prototype.exitAbstractMemberMethod = function(ctx) {
    var decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
};

OPrestoBuilder.prototype.exitSetterMemberMethod = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


OPrestoBuilder.prototype.exitGetterMemberMethod = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


OPrestoBuilder.prototype.exitSingleStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, new statement.StatementList(stmt));
};


OPrestoBuilder.prototype.exitCurlyStatementList = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitStatementList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new statement.StatementList(item));
};


OPrestoBuilder.prototype.exitStatementListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitAbstract_method_declaration = function(ctx) {
	var type = this.getNodeValue(ctx.typ);
	var name = this.getNodeValue(ctx.name);
	var args = this.getNodeValue(ctx.args);
	this.setNodeValue(ctx, new declaration.AbstractMethodDeclaration(name, args, type));
};


OPrestoBuilder.prototype.exitConcrete_method_declaration = function(ctx) {
	var type = this.getNodeValue(ctx.typ);
	var name = this.getNodeValue(ctx.name);
	var args = this.getNodeValue(ctx.args);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new declaration.ConcreteMethodDeclaration(name, args, type, stmts));
};


OPrestoBuilder.prototype.exitMethodCallStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPrestoBuilder.prototype.exitMethodCallExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPrestoBuilder.prototype.exitConstructor_expression = function(ctx) {
    var mutable = ctx.MUTABLE()!=null;
	var type = this.getNodeValue(ctx.typ);
	var args = this.getNodeValue(ctx.args) || null;
	this.setNodeValue(ctx, new expression.ConstructorExpression(type, mutable, args));
};

OPrestoBuilder.prototype.exitAssertion = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

OPrestoBuilder.prototype.exitAssertionList = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    var items = new utils.ExpressionList(null, item);
    this.setNodeValue(ctx, items);
};

OPrestoBuilder.prototype.exitAssertionListItem = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    var items = this.getNodeValue(ctx.items);
    items.add(item);
    this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitAssign_instance_statement = function(ctx) {
	var inst = this.getNodeValue(ctx.inst);
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new statement.AssignInstanceStatement(inst, exp));
};


OPrestoBuilder.prototype.exitAssignInstanceStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPrestoBuilder.prototype.exitAssign_variable_statement = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new statement.AssignVariableStatement(name, exp));
};


OPrestoBuilder.prototype.exitAssign_tuple_statement = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new statement.AssignTupleStatement(items, exp));
};


OPrestoBuilder.prototype.exitVariableList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new grammar.IdentifierList(item));
};


OPrestoBuilder.prototype.exitVariableListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitRootInstance = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new grammar.VariableInstance(name));
};

OPrestoBuilder.prototype.exitRoughlyEqualsExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.ROUGHLY, right));
};


OPrestoBuilder.prototype.exitChildInstance = function(ctx) {
	var parent = this.getNodeValue(ctx.parent);
	var child = this.getNodeValue(ctx.child);
	child.parent = parent;
	this.setNodeValue(ctx, child);
};


OPrestoBuilder.prototype.exitMemberInstance = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new grammar.MemberInstance(name));
};


OPrestoBuilder.prototype.exitItemInstance = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new grammar.ItemInstance(exp));
};


OPrestoBuilder.prototype.exitMethodExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPrestoBuilder.prototype.exitConstructorExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPrestoBuilder.prototype.exitNativeStatementList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = new statement.StatementList(item);
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitNativeStatementListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitJava_identifier = function(ctx) {
	this.setNodeValue(ctx, ctx.getText());
};


OPrestoBuilder.prototype.exitJavascript_identifier = function(ctx) {
	this.setNodeValue(ctx, ctx.getText());
};

OPrestoBuilder.prototype.exitJavaIdentifier = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new java.JavaIdentifierExpression(null, name));
};

OPrestoBuilder.prototype.exitJavascriptIdentifier = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new javascript.JavaScriptIdentifierExpression(null, name));
};

OPrestoBuilder.prototype.exitJavaIdentifierExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};

OPrestoBuilder.prototype.exitJavascriptIdentifierExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};

OPrestoBuilder.prototype.exitJavaChildIdentifier = function(ctx) {
	var parent = this.getNodeValue(ctx.parent);
	var name = this.getNodeValue(ctx.name);
	var child = new java.JavaIdentifierExpression(parent, name);
	this.setNodeValue(ctx, child);
};

OPrestoBuilder.prototype.exitJavascriptIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new javascript.JavaScriptIntegerLiteral(ctx.getText()));
};

OPrestoBuilder.prototype.exitJavascriptChildIdentifier = function(ctx) {
	var parent = this.getNodeValue(ctx.parent);
	var name = this.getNodeValue(ctx.name);
	var child = new javascript.JavaScriptIdentifierExpression(parent, name);
	this.setNodeValue(ctx, child);
};

OPrestoBuilder.prototype.exitJavascriptDecimalLiteral = function(ctx) {
    this.setNodeValue(ctx, new javascript.JavaScriptDecimalLiteral(ctx.getText()));
};

OPrestoBuilder.prototype.exitJavaClassIdentifier = function(ctx) {
	var klass = this.getNodeValue(ctx.klass);
	this.setNodeValue(ctx, klass);
};


OPrestoBuilder.prototype.exitJavaChildClassIdentifier = function(ctx) {
	var parent = this.getNodeValue(ctx.parent);
	var child = new java.JavaIdentifierExpression(parent, ctx.name.getText());
	this.setNodeValue(ctx, child);
};


OPrestoBuilder.prototype.exitJavaPrimaryExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPrestoBuilder.prototype.exitJavascriptPrimaryExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPrestoBuilder.prototype.exitJavaSelectorExpression = function(ctx) {
	var parent = this.getNodeValue(ctx.parent);
	var child = this.getNodeValue(ctx.child);
	child.parent = parent;
	this.setNodeValue(ctx, child);
};

OPrestoBuilder.prototype.exitJavascriptSelectorExpression = function(ctx) {
	var parent = this.getNodeValue(ctx.parent);
	var child = this.getNodeValue(ctx.child);
	child.parent = parent;
	this.setNodeValue(ctx, child);
};


OPrestoBuilder.prototype.exitJavaStatement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new java.JavaStatement(exp,false));
};


OPrestoBuilder.prototype.exitJavascriptStatement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var stmt = new javascript.JavaScriptStatement(exp,false);
	this.setNodeValue(ctx, stmt);
};


OPrestoBuilder.prototype.exitJavaReturnStatement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new java.JavaStatement(exp,true));
};


OPrestoBuilder.prototype.exitJavascriptReturnStatement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new javascript.JavaScriptStatement(exp,true));
};


OPrestoBuilder.prototype.exitJavaNativeStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, new java.JavaNativeCall(stmt));
};


OPrestoBuilder.prototype.exitJavaScriptNativeStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};

OPrestoBuilder.prototype.exitJavascript_native_statement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	var module = this.getNodeValue(ctx.module);
    stmt.module = module || null;
	this.setNodeValue(ctx, new javascript.JavaScriptNativeCall(stmt));
}


OPrestoBuilder.prototype.exitNative_method_declaration = function(ctx) {
	var type = this.getNodeValue(ctx.typ);
	var name = this.getNodeValue(ctx.name);
	var args = this.getNodeValue(ctx.args);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new declaration.NativeMethodDeclaration(name, args, type, stmts));
};


OPrestoBuilder.prototype.exitJavaArgumentList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new java.JavaExpressionList(item));
};

OPrestoBuilder.prototype.exitJavascriptArgumentList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new javascript.JavaScriptExpressionList(item));
};

OPrestoBuilder.prototype.exitJavaArgumentListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};

OPrestoBuilder.prototype.exitJavascriptArgumentListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};

OPrestoBuilder.prototype.exitJava_method_expression = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var args = this.getNodeValue(ctx.args);
	this.setNodeValue(ctx, new java.JavaMethodExpression(name, args));
};

OPrestoBuilder.prototype.exitJavascript_method_expression = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var args = this.getNodeValue(ctx.args);
	this.setNodeValue(ctx, new javascript.JavaScriptMethodExpression(name, args));
};

OPrestoBuilder.prototype.exitJavaMethodExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};

OPrestoBuilder.prototype.exitJavascriptMethodExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};

OPrestoBuilder.prototype.exitFullDeclarationList = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	if(items==null)
		items = new grammar.DeclarationList();
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitDeclarationList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = new grammar.DeclarationList(null, item);
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitDeclarationListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitMethodDeclaration = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


OPrestoBuilder.prototype.exitNativeMethod = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


OPrestoBuilder.prototype.exitConcreteMethod = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


OPrestoBuilder.prototype.exitAbstractMethod = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


OPrestoBuilder.prototype.exitJavaBooleanLiteral = function(ctx) {
	this.setNodeValue(ctx, new java.JavaBooleanLiteral(ctx.getText()));
};


OPrestoBuilder.prototype.exitJavascriptBooleanLiteral = function(ctx) {
	this.setNodeValue(ctx, new javascript.JavaScriptBooleanLiteral(ctx.getText()));
};

OPrestoBuilder.prototype.exitJavaIntegerLiteral = function(ctx) {
	this.setNodeValue(ctx, new java.JavaIntegerLiteral(ctx.getText()));
};


OPrestoBuilder.prototype.exitJavaDecimalLiteral = function(ctx) {
	this.setNodeValue(ctx, new java.JavaDecimalLiteral(ctx.getText()));
};


OPrestoBuilder.prototype.exitJavaCharacterLiteral = function(ctx) {
	this.setNodeValue(ctx, new java.JavaCharacterLiteral(ctx.getText()));
};


OPrestoBuilder.prototype.exitJavascriptCharacterLiteral = function(ctx) {
	this.setNodeValue(ctx, new javascript.JavaScriptCharacterLiteral(ctx.getText()));
};

OPrestoBuilder.prototype.exitJavascriptTextLiteral = function(ctx) {
    this.setNodeValue(ctx, new javascript.JavaScriptTextLiteral(ctx.getText()));
};

OPrestoBuilder.prototype.exitJavaTextLiteral = function(ctx) {
	this.setNodeValue(ctx, new java.JavaTextLiteral(ctx.getText()));
};


OPrestoBuilder.prototype.exitJavaLiteralExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};

OPrestoBuilder.prototype.exitJavascriptLiteralExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPrestoBuilder.prototype.exitJavaCategoryMapping = function(ctx) {
	var map = this.getNodeValue(ctx.mapping);
	this.setNodeValue(ctx, new java.JavaNativeCategoryMapping(map));
};

OPrestoBuilder.prototype.exitJavaScriptCategoryMapping = function(ctx) {
	this.setNodeValue(ctx, this.getNodeValue(ctx.mapping));
};


OPrestoBuilder.prototype.exitJavascript_category_mapping = function(ctx) {
	var identifier = ctx.identifier().getText();
	var module = this.getNodeValue(ctx.javascript_module());
	var map = new javascript.JavaScriptNativeCategoryMapping(identifier, module);
	this.setNodeValue(ctx, map);
};


OPrestoBuilder.prototype.exitJavascript_module = function(ctx) {
	ids = [];
	for(var i=0;i<ctx.javascript_identifier().length;i++) {
		ids.push(ctx.javascript_identifier(i).getText());
	}
	var module = new javascript.JavaScriptModule(ids);
	this.setNodeValue(ctx, module);
};


OPrestoBuilder.prototype.exitNativeCategoryMappingList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = new grammar.NativeCategoryMappingList(item);
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitNativeCategoryMappingListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitNative_category_mappings = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitNative_category_declaration = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var attrs = this.getNodeValue(ctx.attrs);
	var mappings = this.getNodeValue(ctx.mappings);
	this.setNodeValue(ctx, new declaration.NativeCategoryDeclaration(name, attrs, mappings, null));
};


OPrestoBuilder.prototype.exitNativeCategoryDeclaration = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


OPrestoBuilder.prototype.exitNative_resource_declaration = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var attrs = this.getNodeValue(ctx.attrs);
	var mappings = this.getNodeValue(ctx.mappings);
	this.setNodeValue(ctx, new declaration.NativeResourceDeclaration(name, attrs, mappings, null));
};


OPrestoBuilder.prototype.exitResource_declaration = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


OPrestoBuilder.prototype.exitResourceDeclaration = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


OPrestoBuilder.prototype.exitCategoryDeclaration = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


OPrestoBuilder.prototype.exitAttributeDeclaration = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


OPrestoBuilder.prototype.exitEnumCategoryDeclaration = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


OPrestoBuilder.prototype.exitEnumNativeDeclaration = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


OPrestoBuilder.prototype.exitEnumDeclaration = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


OPrestoBuilder.prototype.exitParenthesis_expression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new expression.ParenthesisExpression(exp));
};


OPrestoBuilder.prototype.exitParenthesisExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPrestoBuilder.prototype.exitNativeSymbolList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new grammar.NativeSymbolList(item));
};


OPrestoBuilder.prototype.exitNativeSymbolListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitEnum_native_declaration = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var type = this.getNodeValue(ctx.typ);
	var symbols = this.getNodeValue(ctx.symbols);
	this.setNodeValue(ctx, new declaration.EnumeratedNativeDeclaration(name, type, symbols));
};


OPrestoBuilder.prototype.exitFor_each_statement = function(ctx) {
	var name1 = this.getNodeValue(ctx.name1);
	var name2 = this.getNodeValue(ctx.name2);
	var source = this.getNodeValue(ctx.source);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.ForEachStatement(name1, name2, source, stmts));
};


OPrestoBuilder.prototype.exitForEachStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPrestoBuilder.prototype.exitKey_token = function(ctx) {
	this.setNodeValue(ctx, ctx.getText());
};


OPrestoBuilder.prototype.exitValue_token = function(ctx) {
	this.setNodeValue(ctx, ctx.getText());
};


OPrestoBuilder.prototype.exitNamed_argument = function(ctx) {
	var name = this.getNodeValue(ctx.name);
    var arg = new grammar.UnresolvedArgument(name);
    var exp = this.getNodeValue(ctx.value);
    arg.defaultExpression = exp || null;
    this.setNodeValue(ctx, arg);
};


OPrestoBuilder.prototype.exitClosureStatement = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, new statement.DeclarationInstruction(decl));
};


OPrestoBuilder.prototype.exitReturn_statement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new statement.ReturnStatement(exp));
};


OPrestoBuilder.prototype.exitReturnStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPrestoBuilder.prototype.exitClosure_expression = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new MethodExpression(name));
};


OPrestoBuilder.prototype.exitClosureExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPrestoBuilder.prototype.exitIf_statement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var stmts = this.getNodeValue(ctx.stmts);
	var elseIfs = this.getNodeValue(ctx.elseIfs);
	var elseStmts = this.getNodeValue(ctx.elseStmts);
	this.setNodeValue(ctx, new statement.IfStatement(exp, stmts, elseIfs, elseStmts));
};


OPrestoBuilder.prototype.exitElseIfStatementList = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var stmts = this.getNodeValue(ctx.stmts);
	var elem = new statement.IfElement(exp, stmts);
	this.setNodeValue(ctx, new statement.IfElementList(elem));
};


OPrestoBuilder.prototype.exitElseIfStatementListItem = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	var exp = this.getNodeValue(ctx.exp);
	var stmts = this.getNodeValue(ctx.stmts);
	var elem = new statement.IfElement(exp, stmts);
	items.add(elem);
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitIfStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPrestoBuilder.prototype.exitSwitchStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPrestoBuilder.prototype.exitAssignTupleStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPrestoBuilder.prototype.exitRaiseStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPrestoBuilder.prototype.exitWriteStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPrestoBuilder.prototype.exitWithResourceStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPrestoBuilder.prototype.exitWhileStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPrestoBuilder.prototype.exitDoWhileStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPrestoBuilder.prototype.exitTryStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPrestoBuilder.prototype.exitEqualsExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.EQUALS, right));
};


OPrestoBuilder.prototype.exitNotEqualsExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.NOT_EQUALS, right));
};


OPrestoBuilder.prototype.exitGreaterThanExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.GT, right));
};


OPrestoBuilder.prototype.exitGreaterThanOrEqualExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.GTE, right));
};


OPrestoBuilder.prototype.exitLessThanExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.LT, right));
};


OPrestoBuilder.prototype.exitLessThanOrEqualExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.LTE, right));
};


OPrestoBuilder.prototype.exitAtomicSwitchCase = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.AtomicSwitchCase(exp, stmts));
};


OPrestoBuilder.prototype.exitCollectionSwitchCase = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.CollectionSwitchCase(exp, stmts));
};


OPrestoBuilder.prototype.exitSwitchCaseStatementList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new statement.SwitchCaseList(item));
};


OPrestoBuilder.prototype.exitSwitchCaseStatementListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitSwitch_statement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var cases = this.getNodeValue(ctx.cases);
	var stmts = this.getNodeValue(ctx.stmts);
	var stmt = new statement.SwitchStatement(exp, cases, stmts);
	this.setNodeValue(ctx, stmt);
};


OPrestoBuilder.prototype.exitLiteralRangeLiteral = function(ctx) {
	var low = this.getNodeValue(ctx.low);
	var high = this.getNodeValue(ctx.high);
	this.setNodeValue(ctx, new literal.RangeLiteral(low, high));
};


OPrestoBuilder.prototype.exitLiteralListLiteral = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new literal.ListLiteral(exp));
};


OPrestoBuilder.prototype.exitLiteralList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new utils.ExpressionList(null, item));
};


OPrestoBuilder.prototype.exitLiteralListItem = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	var item = this.getNodeValue(ctx.item);
	items.add(item);
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitInExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.IN, right));
};


OPrestoBuilder.prototype.exitNotInExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_IN, right));
};


OPrestoBuilder.prototype.exitContainsAllExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.CONTAINS_ALL, right));
};


OPrestoBuilder.prototype.exitNotContainsAllExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_CONTAINS_ALL, right));
};


OPrestoBuilder.prototype.exitContainsAnyExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.CONTAINS_ANY, right));
};


OPrestoBuilder.prototype.exitNotContainsAnyExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_CONTAINS_ANY, right));
};


OPrestoBuilder.prototype.exitContainsExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.CONTAINS, right));
};


OPrestoBuilder.prototype.exitNotContainsExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_CONTAINS, right));
};


OPrestoBuilder.prototype.exitDivideExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.DivideExpression(left, right));
};


OPrestoBuilder.prototype.exitIntDivideExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.IntDivideExpression(left, right));
};


OPrestoBuilder.prototype.exitModuloExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.ModuloExpression(left, right));
};


OPrestoBuilder.prototype.exitAndExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.AndExpression(left, right));
};

OPrestoBuilder.prototype.exitNullLiteral = function(ctx) {
    this.setNodeValue(ctx, literal.NullLiteral.instance);
};


OPrestoBuilder.prototype.exitOperatorArgument = function(ctx) {
    var arg = this.getNodeValue(ctx.arg);
    arg.mutable = ctx.MUTABLE()!=null;
    this.setNodeValue(ctx, arg);
};


OPrestoBuilder.prototype.exitOperatorPlus = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.PLUS);
};


OPrestoBuilder.prototype.exitOperatorMinus = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.MINUS);
};


OPrestoBuilder.prototype.exitOperatorMultiply = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.MULTIPLY);
};


OPrestoBuilder.prototype.exitOperatorDivide = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.DIVIDE);
};


OPrestoBuilder.prototype.exitOperatorIDivide = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.IDIVIDE);
};


OPrestoBuilder.prototype.exitOperatorModulo = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.MODULO);
};


OPrestoBuilder.prototype.exitOperator_method_declaration= function(ctx) {
    var op = this.getNodeValue(ctx.op);
    var arg = this.getNodeValue(ctx.arg);
    var typ = this.getNodeValue(ctx.typ);
    var stmts = this.getNodeValue(ctx.stmts);
    var decl = new declaration.OperatorMethodDeclaration(op, arg, typ, stmts);
    this.setNodeValue(ctx, decl);
}


OPrestoBuilder.prototype.exitOperatorMemberMethod= function(ctx) {
    var decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
}

OPrestoBuilder.prototype.exitOrExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.OrExpression(left, right));
};


OPrestoBuilder.prototype.exitMultiplyExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.MultiplyExpression(left, right));
};


OPrestoBuilder.prototype.exitMinusExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new expression.MinusExpression(exp));
};


OPrestoBuilder.prototype.exitNotExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new expression.NotExpression(exp));
};


OPrestoBuilder.prototype.exitWhile_statement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.WhileStatement(exp, stmts));
};


OPrestoBuilder.prototype.exitDo_while_statement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.DoWhileStatement(exp, stmts));
};

OPrestoBuilder.prototype.exitSingleton_category_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var attrs = this.getNodeValue(ctx.attrs);
    var methods = this.getNodeValue(ctx.methods);
    this.setNodeValue(ctx, new declaration.SingletonCategoryDeclaration(name, attrs, methods));
};

OPrestoBuilder.prototype.exitSingletonCategoryDeclaration = function(ctx) {
    var decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
};

OPrestoBuilder.prototype.exitSliceFirstAndLast = function(ctx) {
	var first = this.getNodeValue(ctx.first);
	var last = this.getNodeValue(ctx.last);
	this.setNodeValue(ctx, new expression.SliceSelector(null, first, last));
};


OPrestoBuilder.prototype.exitSliceFirstOnly = function(ctx) {
	var first = this.getNodeValue(ctx.first);
	this.setNodeValue(ctx, new expression.SliceSelector(null, first, null));
};


OPrestoBuilder.prototype.exitSliceLastOnly = function(ctx) {
	var last = this.getNodeValue(ctx.last);
	this.setNodeValue(ctx, new expression.SliceSelector(null, null, last));
};


OPrestoBuilder.prototype.exitSorted_expression = function(ctx) {
	var source = this.getNodeValue(ctx.source);
	var key = this.getNodeValue(ctx.key);
	this.setNodeValue(ctx, new expression.SortedExpression(source, key));
};


OPrestoBuilder.prototype.exitSortedExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPrestoBuilder.prototype.exitDocumentExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPrestoBuilder.prototype.exitDocument_expression = function(ctx) {
	this.setNodeValue(ctx, new expression.DocumentExpression());
};


OPrestoBuilder.prototype.exitDocument_type = function(ctx) {
	this.setNodeValue(ctx, type.DocumentType.instance);
};


OPrestoBuilder.prototype.exitFetchExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPrestoBuilder.prototype.exitFetch_expression = function(ctx) {
	var itemName = this.getNodeValue(ctx.name);
	var source = this.getNodeValue(ctx.source);
	var filter = this.getNodeValue(ctx.xfilter);
	this.setNodeValue(ctx, new expression.FetchExpression(itemName, source, filter));
};


OPrestoBuilder.prototype.exitCode_type = function(ctx) {
	this.setNodeValue(ctx, type.CodeType.instance);
};


OPrestoBuilder.prototype.exitExecuteExpression = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new expression.ExecuteExpression(name));
};


OPrestoBuilder.prototype.exitCodeExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new expression.CodeExpression(exp));
};


OPrestoBuilder.prototype.exitCode_argument = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new grammar.CodeArgument(name));
};


OPrestoBuilder.prototype.exitCategory_symbol = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var args = this.getNodeValue(ctx.args);
	this.setNodeValue(ctx, new grammar.CategorySymbol(name, args));
};


OPrestoBuilder.prototype.exitCategorySymbolList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new grammar.CategorySymbolList(item));
};


OPrestoBuilder.prototype.exitCategorySymbolListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitEnum_category_declaration = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var attrs = this.getNodeValue(ctx.attrs);
	var parent = this.getNodeValue(ctx.derived);
	var derived = parent==null ? null : new grammar.IdentifierList(parent);
	var symbols = this.getNodeValue(ctx.symbols);
	this.setNodeValue(ctx, new declaration.EnumeratedCategoryDeclaration(name, attrs, derived, symbols));
};


OPrestoBuilder.prototype.exitRead_expression = function(ctx) {
	var source = this.getNodeValue(ctx.source);
	this.setNodeValue(ctx, new expression.ReadExpression(source));
};


OPrestoBuilder.prototype.exitReadExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPrestoBuilder.prototype.exitWith_singleton_statement = function(ctx) {
    var name = this.getNodeValue(ctx.typ);
    var typ = new type.CategoryType(name);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.WithSingletonStatement(typ, stmts));
};

OPrestoBuilder.prototype.exitWithSingletonStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};

OPrestoBuilder.prototype.exitWrite_statement = function(ctx) {
	var what = this.getNodeValue(ctx.what);
	var target = this.getNodeValue(ctx.target);
	this.setNodeValue(ctx, new statement.WriteStatement(what, target));
};


OPrestoBuilder.prototype.exitWith_resource_statement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.WithResourceStatement(stmt, stmts));
};


OPrestoBuilder.prototype.exitAnyType = function(ctx) {
	this.setNodeValue(ctx, type.AnyType.instance);
};


OPrestoBuilder.prototype.exitAnyListType = function(ctx) {
	var type = this.getNodeValue(ctx.typ);
	this.setNodeValue(ctx, new type.ListType(type));
};


OPrestoBuilder.prototype.exitAnyDictType = function(ctx) {
	var type = this.getNodeValue(ctx.typ);
	this.setNodeValue(ctx, new DictType(type));
};


OPrestoBuilder.prototype.exitAnyArgumentType = function(ctx) {
	var type = this.getNodeValue(ctx.typ);
	this.setNodeValue(ctx, type);
};

OPrestoBuilder.prototype.exitCastExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var type = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.CastExpression(left, type));
}

OPrestoBuilder.prototype.exitCatchAtomicStatement = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.AtomicSwitchCase(new expression.SymbolExpression(name), stmts));
};


OPrestoBuilder.prototype.exitCatchCollectionStatement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new CollectionSwitchCase(exp, stmts));
};


OPrestoBuilder.prototype.exitCatchStatementList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new statement.SwitchCaseList(item));
};


OPrestoBuilder.prototype.exitCatchStatementListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};


OPrestoBuilder.prototype.exitTry_statement = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var stmts = this.getNodeValue(ctx.stmts);
	var handlers = this.getNodeValue(ctx.handlers);
	var anyStmts = this.getNodeValue(ctx.anyStmts);
	var finalStmts = this.getNodeValue(ctx.finalStmts);
	var stmt = new statement.SwitchErrorStatement(name, stmts, handlers, anyStmts, finalStmts);
	this.setNodeValue(ctx, stmt);
};


OPrestoBuilder.prototype.exitRaise_statement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new statement.RaiseStatement(exp));
};

OPrestoBuilder.prototype.exitMatchingList = function(ctx) {
	var exp = this.getNodeValue(ctx.source);
	this.setNodeValue(ctx, new grammar.MatchingCollectionConstraint(exp));
};

OPrestoBuilder.prototype.exitMatchingRange = function(ctx) {
	var exp = this.getNodeValue(ctx.source);
	this.setNodeValue(ctx, new grammar.MatchingCollectionConstraint(exp));
};

OPrestoBuilder.prototype.exitMatchingExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new grammar.MatchingExpressionConstraint(exp));
};

OPrestoBuilder.prototype.exitMatchingPattern = function(ctx) {
	this.setNodeValue(ctx, new grammar.MatchingPatternConstraint(new literal.TextLiteral(ctx.text.text)));
};

OPrestoBuilder.prototype.exitLiteralSetLiteral = function(ctx) {
    var items = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new literal.SetLiteral(items));
};

OPrestoBuilder.prototype.exitCsharp_identifier = function(ctx) {
    this.setNodeValue(ctx, ctx.getText());
};

OPrestoBuilder.prototype.exitCSharpIdentifier = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new csharp.CSharpIdentifierExpression(null, name));
};

OPrestoBuilder.prototype.exitCSharpIdentifierExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

OPrestoBuilder.prototype.exitCSharpChildIdentifier = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var name = this.getNodeValue(ctx.name);
    var child = new csharp.CSharpIdentifierExpression(parent, name);
    this.setNodeValue(ctx, child);
};

OPrestoBuilder.prototype.exitCSharpBooleanLiteral = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpBooleanLiteral(ctx.getText()));
};


OPrestoBuilder.prototype.exitCSharpIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpIntegerLiteral(ctx.getText()));
};


OPrestoBuilder.prototype.exitCSharpDecimalLiteral = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpDecimalLiteral(ctx.getText()));
};


OPrestoBuilder.prototype.exitCSharpCharacterLiteral = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpCharacterLiteral(ctx.getText()));
};


OPrestoBuilder.prototype.exitCSharpTextLiteral = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpTextLiteral(ctx.getText()));
};


OPrestoBuilder.prototype.exitCSharpCategoryMapping = function(ctx) {
    var map = this.getNodeValue(ctx.mapping);
    this.setNodeValue(ctx, new csharp.CSharpNativeCategoryMapping(map));
};

OPrestoBuilder.prototype.exitCSharpLiteralExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

OPrestoBuilder.prototype.exitCsharp_method_expression = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var args = this.getNodeValue(ctx.args);
    this.setNodeValue(ctx, new csharp.CSharpMethodExpression(name, args));
};

OPrestoBuilder.prototype.exitCSharpMethodExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

OPrestoBuilder.prototype.exitCSharpArgumentList = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    this.setNodeValue(ctx, new csharp.CSharpExpressionList(item));
};

OPrestoBuilder.prototype.exitCSharpArgumentListItem = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    var items = this.getNodeValue(ctx.items);
    items.add(item);
    this.setNodeValue(ctx, items);
};

OPrestoBuilder.prototype.exitCSharpNativeStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    var call = new csharp.CSharpNativeCall(stmt);
    this.setNodeValue(ctx, call);
};

OPrestoBuilder.prototype.exitCSharpPrestoIdentifier = function(ctx) {
    var name = ctx.DOLLAR_IDENTIFIER().getText();
    this.setNodeValue(ctx, new csharp.CSharpIdentifierExpression(null, name));
};

OPrestoBuilder.prototype.exitCSharpPrimaryExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

OPrestoBuilder.prototype.exitCSharpSelectorExpression = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var child = this.getNodeValue(ctx.child);
    child.parent = parent;
    this.setNodeValue(ctx, child);
};

OPrestoBuilder.prototype.exitCSharpStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var stmt = new csharp.CSharpStatement(exp,false);
    this.setNodeValue(ctx, stmt);
};

OPrestoBuilder.prototype.exitCSharpReturnStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new csharp.CSharpStatement(exp,true));
};


OPrestoBuilder.prototype.exitPythonStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new python.PythonStatement(exp,false));
};

OPrestoBuilder.prototype.exitPythonReturnStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new python.PythonStatement(exp,true));
};

OPrestoBuilder.prototype.exitPython2CategoryMapping = function(ctx) {
    var map = this.getNodeValue(ctx.mapping);
    this.setNodeValue(ctx, new python.Python2NativeCategoryMapping(map));
};


OPrestoBuilder.prototype.exitPython3CategoryMapping = function(ctx) {
    var map = this.getNodeValue(ctx.mapping);
    this.setNodeValue(ctx, new python.Python3NativeCategoryMapping(map));
};


OPrestoBuilder.prototype.exitPython_category_mapping = function(ctx) {
    var identifier = ctx.id_.getText();
    var module = this.getNodeValue(ctx.python_module());
    var map = new python.PythonNativeCategoryMapping(identifier, module);
    this.setNodeValue(ctx, map);
};

OPrestoBuilder.prototype.exitPython_method_expression = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var args = this.getNodeValue(ctx.args);
    var method = new python.PythonMethodExpression(name, args);
    this.setNodeValue(ctx, method);
};

OPrestoBuilder.prototype.exitPythonGlobalMethodExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

OPrestoBuilder.prototype.exitPythonMethodExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

OPrestoBuilder.prototype.exitPython_module = function(ctx) {
    var ids = []
    var ctxs = ctx.identifier();
    for(var i=0;i<ctxs.length;i++) {
        ids.push(ctxs[i].getText());
    }
    var module = new python.PythonModule(ids);
    this.setNodeValue(ctx, module);
};

OPrestoBuilder.prototype.exitPython2NativeStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, new python.Python2NativeCall(stmt));
};


OPrestoBuilder.prototype.exitPython3NativeStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, new python.Python3NativeCall(stmt));
};

OPrestoBuilder.prototype.exitPython_native_statement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    var module = this.getNodeValue(ctx.module);
    stmt.module = module || null;
    this.setNodeValue(ctx, new python.PythonNativeCall(stmt));
}

OPrestoBuilder.prototype.exitPython_identifier = function(ctx) {
    this.setNodeValue(ctx, ctx.getText());
};

OPrestoBuilder.prototype.exitPythonIdentifier = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new python.PythonIdentifierExpression(null, name));
};

OPrestoBuilder.prototype.exitPythonIdentifierExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

OPrestoBuilder.prototype.exitPythonChildIdentifier = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var name = this.getNodeValue(ctx.name);
    var child = new python.PythonIdentifierExpression(parent, name);
    this.setNodeValue(ctx, child);
};


OPrestoBuilder.prototype.exitPythonBooleanLiteral = function(ctx) {
    this.setNodeValue(ctx, new python.PythonBooleanLiteral(ctx.getText()));
};

OPrestoBuilder.prototype.exitPythonIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new python.PythonIntegerLiteral(ctx.getText()));
};


OPrestoBuilder.prototype.exitPythonDecimalLiteral = function(ctx) {
    this.setNodeValue(ctx, new python.PythonDecimalLiteral(ctx.getText()));
};

OPrestoBuilder.prototype.exitPythonCharacterLiteral = function(ctx) {
    this.setNodeValue(ctx, new python.PythonCharacterLiteral(ctx.getText()));
};


OPrestoBuilder.prototype.exitPythonTextLiteral = function(ctx) {
    this.setNodeValue(ctx, new python.PythonTextLiteral(ctx.getText()));
};

OPrestoBuilder.prototype.exitPythonLiteralExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


OPrestoBuilder.prototype.exitPythonPrestoIdentifier = function(ctx) {
    var name = ctx.DOLLAR_IDENTIFIER().getText();
    this.setNodeValue(ctx, new python.PythonIdentifierExpression(null, name));
};


OPrestoBuilder.prototype.exitPythonPrimaryExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

OPrestoBuilder.prototype.exitPythonArgumentList = function(ctx) {
    var ordinal = this.getNodeValue(ctx.ordinal);
    var named = this.getNodeValue(ctx.named);
    ordinal.addAll(named);
    this.setNodeValue(ctx, ordinal);
};


OPrestoBuilder.prototype.exitPythonNamedOnlyArgumentList = function(ctx) {
    var named = this.getNodeValue(ctx.named);
    this.setNodeValue(ctx, named);
};

OPrestoBuilder.prototype.exitPythonNamedArgumentList = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var exp = this.getNodeValue(ctx.exp);
    var arg = new python.PythonNamedArgument(name, exp);
    this.setNodeValue(ctx, new python.PythonArgumentList(arg));
};

OPrestoBuilder.prototype.exitPythonNamedArgumentListItem = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var exp = this.getNodeValue(ctx.exp);
    var arg = new python.PythonNamedArgument(name, exp);
    var items = this.getNodeValue(ctx.items);
    items.add(arg);
    this.setNodeValue(ctx, items);
};

OPrestoBuilder.prototype.exitPythonOrdinalOnlyArgumentList = function(ctx) {
    var ordinal = this.getNodeValue(ctx.ordinal);
    this.setNodeValue(ctx, ordinal);
};

OPrestoBuilder.prototype.exitPythonOrdinalArgumentList = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    var arg = new python.PythonOrdinalArgument(item);
    this.setNodeValue(ctx, new python.PythonArgumentList(arg));
};

OPrestoBuilder.prototype.exitPythonOrdinalOnlyArgumentList = function(ctx) {
    var ordinal = this.getNodeValue(ctx.ordinal);
    this.setNodeValue(ctx, ordinal);
};


OPrestoBuilder.prototype.exitPythonSelectorExpression = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var selector = this.getNodeValue(ctx.child);
    selector.parent = parent;
    this.setNodeValue(ctx, selector);
}


OPrestoBuilder.prototype.buildSection = function(node, section) {
	var first = this.findFirstValidToken(node.start.tokenIndex);
	var last = this.findLastValidToken(node.stop.tokenIndex);
    section.setFrom(this.path, first, last, parser.Dialect.O);
};

OPrestoBuilder.prototype.findFirstValidToken = function(idx) {
	if(idx===-1) { // happens because input.index() is called before any other read operation (bug?)
		idx = 0;
	};
	do {
		var token = this.readValidToken(idx++);
		if(token!==null) {
			return token;
		};
	} while(idx<this.input.size());
	return null;
};

OPrestoBuilder.prototype.findLastValidToken = function(idx) {
	if(idx===-1) { // happens because input.index() is called before any other read operation (bug?)
		idx = 0;
	};
	while(idx>=0) {
		var token = this.readValidToken(idx--);
		if(token!==null) {
			return token;
		}
	};
	return null;
};

OPrestoBuilder.prototype.readValidToken = function(idx) {
	var token = this.input.get(idx);
	var text = token.text;
	if(text!==null && text.length>0 && !value.Character.isWhitespace(text[0])) {
		return token;
	} else {
		return null;
	}
};

exports.OPrestoBuilder = OPrestoBuilder;
