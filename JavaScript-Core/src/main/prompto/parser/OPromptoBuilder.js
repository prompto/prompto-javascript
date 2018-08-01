var argument = require("../argument/index");
var constraint = require("../constraint/index");
var instance = require("../instance/index");
var declaration = require("../declaration/index");
var expression = require("../expression/index");
var javascript = require("../javascript/index");
var statement = require("../statement/index");
var literal = require("../literal/index");
var grammar = require("../grammar/index");
var value = require("../value/index");
var utils = require("../utils/index");
var parser = require("../parser/index");
var type = require("../type/index");
var jsx = require("../jsx/index");
var css = require("../css/index");
var java = require("../java/index");
var csharp = require("../csharp/index");
var python = require("../python/index");

function OPromptoBuilder(oparser) {
	parser.OParserListener.call(this);
	this.input = oparser.getTokenStream();
	this.path = oparser.path;
	this.nodeValues = {};
    this.nextNodeId = 0;
	return this;
};

OPromptoBuilder.prototype = Object.create(parser.OParserListener.prototype);
OPromptoBuilder.prototype.constructor = OPromptoBuilder;


OPromptoBuilder.prototype.setNodeValue = function(node, value) {
    if(node["%id"]===undefined)
        node["%id"] = this.nextNodeId++;
    this.nodeValues[node["%id"]] = value;
    if(value instanceof parser.Section) {
        this.buildSection(node, value);
    };
};


OPromptoBuilder.prototype.getNodeValue = function(node) {
    if(node==null || node===undefined || node["%id"]===null || node["%id"]===undefined)
        return null;
    else
        return this.nodeValues[node["%id"]];
};



OPromptoBuilder.prototype.exitSelectableExpression = function(ctx) {
	var e = this.getNodeValue(ctx.parent);
	this.setNodeValue(ctx, e);
};


OPromptoBuilder.prototype.exitSelectorExpression = function(ctx) {
	var parent = this.getNodeValue(ctx.parent);
	var selector = this.getNodeValue(ctx.selector);
	selector.parent = parent;
	this.setNodeValue(ctx, selector);
};

OPromptoBuilder.prototype.exitSet_literal = function(ctx) {
    var items = this.getNodeValue(ctx.expression_list());
    var set_ = new literal.SetLiteral(items);
    this.setNodeValue(ctx, set_);
};


OPromptoBuilder.prototype.exitStoreStatement = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.stmt));
};

OPromptoBuilder.prototype.exitStore_statement = function(ctx) {
    var del = this.getNodeValue(ctx.to_del);
    var add = this.getNodeValue(ctx.to_add);
    var stmt = new statement.StoreStatement(del, add);
    this.setNodeValue(ctx, stmt);
};



OPromptoBuilder.prototype.exitAtomicLiteral = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitCollectionLiteral = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitCommentStatement = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.comment_statement()));
};


OPromptoBuilder.prototype.exitComment_statement = function(ctx) {
    this.setNodeValue(ctx, new statement.CommentStatement(ctx.getText()));
};


OPromptoBuilder.prototype.exitListLiteral = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};



OPromptoBuilder.prototype.exitBlob_expression = function(ctx) {
    var exp = this.getNodeValue(ctx.expression());
    this.setNodeValue(ctx, new expression.BlobExpression(exp));
};



OPromptoBuilder.prototype.exitBlobType = function(ctx) {
    this.setNodeValue(ctx, type.BlobType.instance);
};


OPromptoBuilder.prototype.exitBooleanLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.BooleanLiteral(ctx.t.text));
};


OPromptoBuilder.prototype.exitBreakStatement = function(ctx) {
    this.setNodeValue(ctx, new statement.BreakStatement());
};



OPromptoBuilder.prototype.exitMinIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.MinIntegerLiteral());
};


OPromptoBuilder.prototype.exitMaxIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.MaxIntegerLiteral());
};


OPromptoBuilder.prototype.exitIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.IntegerLiteral(ctx.t.text, ctx.t.text));
};


OPromptoBuilder.prototype.exitDecimalLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.DecimalLiteral(ctx.t.text));
};


OPromptoBuilder.prototype.exitHexadecimalLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.HexaLiteral(ctx.t.text));
};


OPromptoBuilder.prototype.exitCharacterLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.CharacterLiteral(ctx.t.text));
};


OPromptoBuilder.prototype.exitDateLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.DateLiteral(ctx.t.text));
};


OPromptoBuilder.prototype.exitDateTimeLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.DateTimeLiteral(ctx.t.text));
};

OPromptoBuilder.prototype.exitTernaryExpression = function(ctx) {
    var condition = this.getNodeValue(ctx.test);
    var ifTrue = this.getNodeValue(ctx.ifTrue);
    var ifFalse = this.getNodeValue(ctx.ifFalse);
    var exp = new expression.TernaryExpression(condition, ifTrue, ifFalse);
    this.setNodeValue(ctx, exp);
};

OPromptoBuilder.prototype.exitTest_method_declaration = function(ctx) {
    var name = new grammar.Identifier(ctx.name.text);
    name.setSectionFrom(this.path, ctx.name, ctx.name, parser.Dialect.O);
    var stmts = this.getNodeValue(ctx.stmts);
    var exps = this.getNodeValue(ctx.exps);
    var errorName = this.getNodeValue(ctx.error);
    var error = errorName==null ? null : new expression.SymbolExpression(errorName);
    this.setNodeValue(ctx, new declaration.TestMethodDeclaration(name, stmts, exps, error));
};


OPromptoBuilder.prototype.exitTextLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.TextLiteral(ctx.t.text));
};


OPromptoBuilder.prototype.exitTimeLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.TimeLiteral(ctx.t.text));
};


OPromptoBuilder.prototype.exitPeriodLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.PeriodLiteral(ctx.t.text));
};



OPromptoBuilder.prototype.exitPeriodType = function(ctx) {
    this.setNodeValue(ctx, type.PeriodType.instance);
};


OPromptoBuilder.prototype.exitVersionLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.VersionLiteral(ctx.t.text));
};


OPromptoBuilder.prototype.exitVersionType = function(ctx) {
    this.setNodeValue(ctx, type.VersionType.instance);
};


OPromptoBuilder.prototype.exitAttribute_identifier = function(ctx) {
    var name = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, name);
};


OPromptoBuilder.prototype.exitVariable_identifier = function(ctx) {
    var name = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, name);
};


OPromptoBuilder.prototype.exitList_literal = function(ctx) {
    var mutable = ctx.MUTABLE() !== null;
    var items = this.getNodeValue(ctx.expression_list()) || null;
    var value = new literal.ListLiteral(mutable, items);
	this.setNodeValue(ctx, value);
};


OPromptoBuilder.prototype.exitDict_literal = function(ctx) {
    var mutable = ctx.MUTABLE() !== null;
	var items = this.getNodeValue(ctx.dict_entry_list()) || null;
	var value = new literal.DictLiteral(mutable, items);
	this.setNodeValue(ctx, value);
};


OPromptoBuilder.prototype.exitTuple_literal = function(ctx) {
    var mutable = ctx.MUTABLE() !== null;
	var items = this.getNodeValue(ctx.expression_tuple()) || null;
	var value = new literal.TupleLiteral(mutable, items);
	this.setNodeValue(ctx, value);
};



OPromptoBuilder.prototype.exitRange_literal = function(ctx) {
	var low = this.getNodeValue(ctx.low);
	var high = this.getNodeValue(ctx.high);
	this.setNodeValue(ctx, new literal.RangeLiteral(low, high));
};


OPromptoBuilder.prototype.exitRangeLiteral = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitDict_entry_list = function(ctx) {
    var self = this;
    var items = new literal.DictEntryList(null, null);
    ctx.dict_entry().forEach(function(r) {
        var item = self.getNodeValue(r);
        items.add(item);
    });
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitDict_entry = function(ctx) {
	var key = this.getNodeValue(ctx.key);
	var value= this.getNodeValue(ctx.value);
	var entry = new literal.DictEntry(key, value);
	this.setNodeValue(ctx, entry);
};


OPromptoBuilder.prototype.exitLiteral_expression = function(ctx) {
    var exp = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitLiteralExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitIdentifierExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitVariableIdentifier = function(ctx) {
	var id = this.getNodeValue(ctx.variable_identifier());
	this.setNodeValue(ctx, new expression.InstanceExpression(id));
};


OPromptoBuilder.prototype.exitInstanceExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitSymbol_identifier = function(ctx) {
    var name = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, name);
};


OPromptoBuilder.prototype.exitNative_symbol = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new expression.NativeSymbol(name, exp));
};


OPromptoBuilder.prototype.exitTypeIdentifier = function(ctx) {
    var name = this.getNodeValue(ctx.type_identifier());
    this.setNodeValue(ctx, new expression.UnresolvedIdentifier(name));
};


OPromptoBuilder.prototype.exitSymbolIdentifier = function(ctx) {
	var name = this.getNodeValue(ctx.symbol_identifier());
	this.setNodeValue(ctx, new expression.SymbolExpression(name));
};



OPromptoBuilder.prototype.exitBlobType = function(ctx) {
    this.setNodeValue(ctx, type.BlobType.instance);
};


OPromptoBuilder.prototype.exitBooleanType = function(ctx) {
	this.setNodeValue(ctx, type.BooleanType.instance);
};


OPromptoBuilder.prototype.exitCharacterType = function(ctx) {
	this.setNodeValue(ctx, type.CharacterType.instance);
};


OPromptoBuilder.prototype.exitImageType = function(ctx) {
    this.setNodeValue(ctx, type.ImageType.instance);
};


OPromptoBuilder.prototype.exitTextType = function(ctx) {
	this.setNodeValue(ctx, type.TextType.instance);
};


OPromptoBuilder.prototype.exitHtmlType = function(ctx) {
    this.setNodeValue(ctx, type.HtmlType.instance);
};


OPromptoBuilder.prototype.exitThisExpression = function(ctx) {
    this.setNodeValue(ctx, new expression.ThisExpression());
};


OPromptoBuilder.prototype.exitIntegerType = function(ctx) {
	this.setNodeValue(ctx, type.IntegerType.instance);
};


OPromptoBuilder.prototype.exitDecimalType = function(ctx) {
	this.setNodeValue(ctx, type.DecimalType.instance);
};


OPromptoBuilder.prototype.exitDateType = function(ctx) {
	this.setNodeValue(ctx, type.DateType.instance);
};


OPromptoBuilder.prototype.exitDateTimeType = function(ctx) {
	this.setNodeValue(ctx, type.DateTimeType.instance);
};


OPromptoBuilder.prototype.exitTimeType = function(ctx) {
	this.setNodeValue(ctx, type.TimeType.instance);
};


OPromptoBuilder.prototype.exitCodeType = function(ctx) {
	this.setNodeValue(ctx, type.CodeType.instance);
};


OPromptoBuilder.prototype.exitPrimaryType = function(ctx) {
	var type = this.getNodeValue(ctx.p);
	this.setNodeValue(ctx, type);
};


OPromptoBuilder.prototype.exitAttribute_declaration = function(ctx) {
	var id = this.getNodeValue(ctx.name);
	var type = this.getNodeValue(ctx.typ);
	var match = this.getNodeValue(ctx.match);
    var indices = null;
    if (ctx.indices !=null)
        indices = indices = this.getNodeValue(ctx.indices);
    else if(ctx.INDEX()!=null)
        indices = new grammar.IdentifierList();
    var decl = new declaration.AttributeDeclaration(id, type, match, indices);
    decl.storable = ctx.STORABLE()!=null;
    this.setNodeValue(ctx, decl);
};


OPromptoBuilder.prototype.exitNativeType = function(ctx) {
	var type = this.getNodeValue(ctx.n);
	this.setNodeValue(ctx, type);
};


OPromptoBuilder.prototype.exitCategoryType = function(ctx) {
	var type = this.getNodeValue(ctx.c);
	this.setNodeValue(ctx, type);
};


OPromptoBuilder.prototype.exitCategory_type = function(ctx) {
    var name = new grammar.Identifier(ctx.getText());
    this.buildSection(ctx, name);
	this.setNodeValue(ctx, new type.CategoryType(name));
};


OPromptoBuilder.prototype.exitListType = function(ctx) {
	var typ = this.getNodeValue(ctx.l);
	this.setNodeValue(ctx, new type.ListType(typ));
};


OPromptoBuilder.prototype.exitDictType = function(ctx) {
	var typ = this.getNodeValue(ctx.d);
	this.setNodeValue(ctx, new type.DictionaryType(typ));
};


OPromptoBuilder.prototype.exitAttribute_identifier_list = function(ctx) {
    var list = new grammar.IdentifierList();
    var rules = ctx.attribute_identifier();
    rules.forEach(function(rule) {
        var item = this.getNodeValue(rule);
        list.add(item);
    }, this);
    this.setNodeValue(ctx, list);
};



OPromptoBuilder.prototype.exitVariable_identifier_list = function(ctx) {
    var list = new grammar.IdentifierList();
    var rules = ctx.variable_identifier();
    rules.forEach(function(rule) {
        var item = this.getNodeValue(rule);
        list.add(item);
    }, this);
    this.setNodeValue(ctx, list);
};


OPromptoBuilder.prototype.exitConcrete_category_declaration = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var attrs = this.getNodeValue(ctx.attrs);
	var derived = this.getNodeValue(ctx.derived);
	var methods = this.getNodeValue(ctx.methods);
    var decl = new declaration.ConcreteCategoryDeclaration(name, attrs, derived, methods);
    decl.storable = ctx.STORABLE()!=null;
    this.setNodeValue(ctx, decl);
};



OPromptoBuilder.prototype.exitConcrete_widget_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var derived = this.getNodeValue(ctx.derived);
    var methods = this.getNodeValue(ctx.methods);
    var decl = new declaration.ConcreteWidgetDeclaration(name, derived, methods);
    this.setNodeValue(ctx, decl);
};



OPromptoBuilder.prototype.exitConcreteCategoryDeclaration = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


OPromptoBuilder.prototype.exitConcreteWidgetDeclaration = function(ctx) {
    var decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
};


OPromptoBuilder.prototype.exitNativeWidgetDeclaration = function(ctx) {
    var decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
};


OPromptoBuilder.prototype.exitDerivedList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new grammar.IdentifierList(item));
};


OPromptoBuilder.prototype.exitDerivedListItem = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	var item = this.getNodeValue(ctx.item);
	items.add(item);
	this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitType_identifier = function(ctx) {
    var name = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, name);
};


OPromptoBuilder.prototype.exitType_identifier_list = function(ctx) {
    var self = this;
    var items = new grammar.IdentifierList();
    ctx.type_identifier().forEach(function(r) {
        var item = self.getNodeValue(r);
        items.add(item);
    });
    this.setNodeValue(ctx, items);
};



OPromptoBuilder.prototype.exitMemberSelector = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new expression.MemberSelector(null, name));
};

OPromptoBuilder.prototype.exitAn_expression = function(ctx) {
    var typ = this.getNodeValue(ctx.typ);
    this.setNodeValue(ctx, typ);
};

OPromptoBuilder.prototype.exitIsAnExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var type = this.getNodeValue(ctx.right);
    var right = new expression.TypeExpression(type);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.IS_A, right));
};

OPromptoBuilder.prototype.exitIsNotAnExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var type = this.getNodeValue(ctx.right);
    var right = new expression.TypeExpression(type);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.IS_NOT_A, right));
};

OPromptoBuilder.prototype.exitIsExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.IS, right));
};

OPromptoBuilder.prototype.exitIsNotExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.IS_NOT, right));
};



OPromptoBuilder.prototype.exitItemSelector = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new expression.ItemSelector(null, exp));
};


OPromptoBuilder.prototype.exitSliceSelector = function(ctx) {
	var slice = this.getNodeValue(ctx.xslice);
	this.setNodeValue(ctx, slice);
};


OPromptoBuilder.prototype.exitTyped_argument = function(ctx) {
	var typ = this.getNodeValue(ctx.typ);
	var name = this.getNodeValue(ctx.name);
	var attrs = this.getNodeValue(ctx.attrs);
    var arg = attrs ?
        new argument.ExtendedArgument(typ, name, attrs) :
        new argument.CategoryArgument(typ, name);
    var exp = this.getNodeValue(ctx.value);
    arg.defaultExpression = exp || null;
    this.setNodeValue(ctx, arg);
};


OPromptoBuilder.prototype.exitCodeArgument = function(ctx) {
	var arg = this.getNodeValue(ctx.arg);
	this.setNodeValue(ctx, arg);
};


OPromptoBuilder.prototype.exitArgument_list = function(ctx) {
    var self = this;
    var items = new grammar.ArgumentList();
    ctx.argument().forEach(function(r) {
        var item = self.getNodeValue(r);
        items.add(item);
    });
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitMethodName = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new expression.UnresolvedIdentifier(name));
};



OPromptoBuilder.prototype.exitMethodParent = function(ctx) {
	var parent = this.getNodeValue(ctx.parent);
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new expression.MethodSelector(parent, name));
};


OPromptoBuilder.prototype.exitExpressionAssignmentList = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var assign = new grammar.ArgumentAssignment(null, exp);
	this.setNodeValue(ctx, new grammar.ArgumentAssignmentList([assign]));
};


OPromptoBuilder.prototype.exitArgument_assignment = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var exp = this.getNodeValue(ctx.exp);
	var arg = new argument.UnresolvedArgument(name);
	this.setNodeValue(ctx, new grammar.ArgumentAssignment(arg, exp));
};


OPromptoBuilder.prototype.exitArgumentAssignmentList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new grammar.ArgumentAssignmentList([item]));
};


OPromptoBuilder.prototype.exitArgumentAssignmentListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitMethod_call = function(ctx) {
	var method = this.getNodeValue(ctx.method);
	var args = this.getNodeValue(ctx.args);
	this.setNodeValue(ctx, new statement.UnresolvedCall(method, args));
};


OPromptoBuilder.prototype.exitCallableRoot = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new expression.UnresolvedIdentifier(name));
};


OPromptoBuilder.prototype.exitCallableSelector = function(ctx) {
	var parent = this.getNodeValue(ctx.parent);
	var select = this.getNodeValue(ctx.select);
	select.parent = parent;
	this.setNodeValue(ctx, select);
};


OPromptoBuilder.prototype.exitCallableMemberSelector = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new expression.MemberSelector(null, name));
};


OPromptoBuilder.prototype.exitCallableItemSelector = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new expression.ItemSelector(null, exp));
};


OPromptoBuilder.prototype.exitAddExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	var exp = ctx.op.type==parser.OParser.PLUS ?
		new expression.PlusExpression(left, right) :
		new expression.SubtractExpression(left, right);
	this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitMember_method_declaration_list = function(ctx) {
    var self = this;
    var items = new grammar.MethodDeclarationList();
    ctx.member_method_declaration().forEach(function(r) {
        var item = self.getNodeValue(r);
        items.add(item);
    });
    this.setNodeValue(ctx, items);
};

OPromptoBuilder.prototype.exitNative_member_method_declaration_list = function(ctx) {
    var self = this;
    var items = new grammar.MethodDeclarationList();
    ctx.native_member_method_declaration().forEach(function(r) {
        var item = self.getNodeValue(r);
        items.add(item);
    });
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitEmptyCategoryMethodList = function(ctx) {
	this.setNodeValue(ctx, new grammar.MethodDeclarationList);
};


OPromptoBuilder.prototype.exitCurlyCategoryMethodList = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitSetter_method_declaration = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new declaration.SetterMethodDeclaration(name, stmts));
};


OPromptoBuilder.prototype.exitGetter_method_declaration = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new declaration.GetterMethodDeclaration(name, stmts));
};

OPromptoBuilder.prototype.exitNative_setter_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new declaration.NativeSetterMethodDeclaration(name, stmts));
};


OPromptoBuilder.prototype.exitNative_getter_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new declaration.NativeGetterMethodDeclaration(name, stmts));
};


OPromptoBuilder.prototype.exitMember_method_declaration = function(ctx) {
    var decl = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, decl);
};

OPromptoBuilder.prototype.exitConcreteMemberMethod = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};

OPromptoBuilder.prototype.exitSingleStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, new statement.StatementList(stmt));
};


OPromptoBuilder.prototype.exitCurlyStatementList = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitStatement_list = function(ctx) {
    var self = this;
    var items = new statement.StatementList();
    ctx.statement().forEach(function(r) {
        var item = self.getNodeValue(r);
        items.add(item);
    });
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitAbstract_method_declaration = function(ctx) {
	var type = this.getNodeValue(ctx.typ);
	var name = this.getNodeValue(ctx.name);
	var args = this.getNodeValue(ctx.args);
	this.setNodeValue(ctx, new declaration.AbstractMethodDeclaration(name, args, type));
};


OPromptoBuilder.prototype.exitConcrete_method_declaration = function(ctx) {
	var type = this.getNodeValue(ctx.typ);
	var name = this.getNodeValue(ctx.name);
	var args = this.getNodeValue(ctx.args);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new declaration.ConcreteMethodDeclaration(name, args, type, stmts));
};


OPromptoBuilder.prototype.exitMethod_declaration = function(ctx) {
    var value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};


OPromptoBuilder.prototype.exitMethodCallStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitMethod_identifier = function(ctx) {
    var value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};



OPromptoBuilder.prototype.exitConstructorFrom = function(ctx) {
    var type = this.getNodeValue(ctx.typ);
    var copyFrom = this.getNodeValue(ctx.copyExp) || null;
    var args = this.getNodeValue(ctx.args) || null;
    this.setNodeValue(ctx, new expression.ConstructorExpression(type, copyFrom, args, true));
};


OPromptoBuilder.prototype.exitConstructorNoFrom = function(ctx) {
    var type = this.getNodeValue(ctx.typ);
    var args = this.getNodeValue(ctx.args) || null;
    this.setNodeValue(ctx, new expression.ConstructorExpression(type, null, args, true));
};


OPromptoBuilder.prototype.exitCopy_from = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
};




OPromptoBuilder.prototype.exitAssertion = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitAssertion_list = function(ctx) {
    var self = this;
    var items = new utils.ExpressionList();
    ctx.assertion().forEach(function(r) {
        var item = self.getNodeValue(r);
        items.add(item);
    });
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitAssign_instance_statement = function(ctx) {
	var inst = this.getNodeValue(ctx.inst);
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new statement.AssignInstanceStatement(inst, exp));
};


OPromptoBuilder.prototype.exitAssignInstanceStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitAssign_variable_statement = function(ctx) {
	var name = this.getNodeValue(ctx.variable_identifier());
	var exp = this.getNodeValue(ctx.expression());
	this.setNodeValue(ctx, new statement.AssignVariableStatement(name, exp));
};


OPromptoBuilder.prototype.exitAssign_tuple_statement = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new statement.AssignTupleStatement(items, exp));
};


OPromptoBuilder.prototype.exitRootInstance = function(ctx) {
	var name = this.getNodeValue(ctx.variable_identifier());
	this.setNodeValue(ctx, new instance.VariableInstance(name));
};

OPromptoBuilder.prototype.exitRoughlyEqualsExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.ROUGHLY, right));
};


OPromptoBuilder.prototype.exitChildInstance = function(ctx) {
    var parent = this.getNodeValue(ctx.assignable_instance());
    var child = this.getNodeValue(ctx.child_instance());
	child.parent = parent;
	this.setNodeValue(ctx, child);
};


OPromptoBuilder.prototype.exitMemberInstance = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new instance.MemberInstance(name));
};



OPromptoBuilder.prototype.exitItemInstance = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new instance.ItemInstance(exp));
};



OPromptoBuilder.prototype.exitMethod_expression = function(ctx) {
	var exp = this.getNodeValue(ctx.getChild(0));
	this.setNodeValue(ctx, exp);
};



OPromptoBuilder.prototype.exitMethodExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};




OPromptoBuilder.prototype.exitNative_statement_list = function(ctx) {
    var self = this;
    var items = new statement.StatementList();
    ctx.native_statement().forEach(function (r) {
        var item = self.getNodeValue(r);
        items.add(item);
    });
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitJava_identifier = function(ctx) {
	this.setNodeValue(ctx, ctx.getText());
};

OPromptoBuilder.prototype.exitJavascript_identifier = function(ctx) {
    var id = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, id);
};

OPromptoBuilder.prototype.exitJavascript_member_expression = function(ctx) {
    var name = ctx.name.getText ();
    this.setNodeValue (ctx, new javascript.JavaScriptMemberExpression(name));
};

OPromptoBuilder.prototype.exitJavascript_primary_expression = function(ctx) {
    var exp = this.getNodeValue (ctx.getChild(0));
    this.setNodeValue (ctx, exp);
};

OPromptoBuilder.prototype.exitJavascript_new_expression = function(ctx) {
    var method = this.getNodeValue(ctx.javascript_method_expression());
    this.setNodeValue (ctx, new javascript.JavaScriptNewExpression(method));
};


OPromptoBuilder.prototype.exitJavascript_this_expression = function(ctx) {
    this.setNodeValue (ctx, new javascript.JavaScriptThisExpression ());
};


OPromptoBuilder.prototype.exitJavaIdentifier = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new java.JavaIdentifierExpression(null, name));
};

OPromptoBuilder.prototype.exitJavaIdentifierExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitJavaChildIdentifier = function(ctx) {
	var parent = this.getNodeValue(ctx.parent);
	var name = this.getNodeValue(ctx.name);
	var child = new java.JavaIdentifierExpression(parent, name);
	this.setNodeValue(ctx, child);
};

OPromptoBuilder.prototype.exitJavascriptBooleanLiteral = function(ctx) {
    this.setNodeValue(ctx, new javascript.JavaScriptBooleanLiteral(ctx.getText()));
};

OPromptoBuilder.prototype.exitJavascriptCharacterLiteral = function(ctx) {
    this.setNodeValue(ctx, new javascript.JavaScriptCharacterLiteral(ctx.getText()));
};

OPromptoBuilder.prototype.exitJavascriptTextLiteral = function(ctx) {
    this.setNodeValue(ctx, new javascript.JavaScriptTextLiteral(ctx.getText()));
};

OPromptoBuilder.prototype.exitJavascriptIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new javascript.JavaScriptIntegerLiteral(ctx.getText()));
};


OPromptoBuilder.prototype.exitJavascriptDecimalLiteral = function(ctx) {
    this.setNodeValue(ctx, new javascript.JavaScriptDecimalLiteral(ctx.getText()));
};



OPromptoBuilder.prototype.exitJavaClassIdentifier = function(ctx) {
	var klass = this.getNodeValue(ctx.klass);
	this.setNodeValue(ctx, klass);
};


OPromptoBuilder.prototype.exitJavaChildClassIdentifier = function(ctx) {
	var parent = this.getNodeValue(ctx.parent);
	var child = new java.JavaIdentifierExpression(parent, ctx.name.getText());
	this.setNodeValue(ctx, child);
};


OPromptoBuilder.prototype.exitJavaPrimaryExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitJavascriptPrimaryExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};

OPromptoBuilder.prototype.exitJavascript_identifier_expression = function(ctx) {
    var id = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new javascript.JavaScriptIdentifierExpression(id));
};

OPromptoBuilder.prototype.exitJavaSelectorExpression = function(ctx) {
	var parent = this.getNodeValue(ctx.parent);
	var child = this.getNodeValue(ctx.child);
	child.parent = parent;
	this.setNodeValue(ctx, child);
};

OPromptoBuilder.prototype.exitJavascriptSelectorExpression = function(ctx) {
	var parent = this.getNodeValue(ctx.parent);
	var child = this.getNodeValue(ctx.child);
	child.parent = parent;
	this.setNodeValue(ctx, child);
};

OPromptoBuilder.prototype.exitJavaScriptMemberExpression = function(ctx) {
    var id = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new javascript.JavaScriptMemberExpression(id));
};

OPromptoBuilder.prototype.exitJava_primary_expression = function(ctx) {
    var exp = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, exp);
};

OPromptoBuilder.prototype.exitJava_item_expression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new java.JavaItemExpression(exp));
};

OPromptoBuilder.prototype.exitJavascript_item_expression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new javascript.JavaScriptItemExpression(exp));
};

OPromptoBuilder.prototype.exitJavascriptItemExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

OPromptoBuilder.prototype.exitJavaStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var stmt = new java.JavaStatement(exp,false);
    this.setNodeValue(ctx, stmt);
};

OPromptoBuilder.prototype.exitJavascriptStatement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var stmt = new javascript.JavaScriptStatement(exp,false);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitJavaReturnStatement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new java.JavaStatement(exp,true));
};


OPromptoBuilder.prototype.exitJavascriptReturnStatement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new javascript.JavaScriptStatement(exp,true));
};


OPromptoBuilder.prototype.exitJavaNativeStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.java_statement());
	this.setNodeValue(ctx, new java.JavaNativeCall(stmt));
};


OPromptoBuilder.prototype.exitJavaScriptNativeStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.javascript_native_statement());
	this.setNodeValue(ctx, stmt);
};

OPromptoBuilder.prototype.exitJavascript_native_statement = function(ctx) {
	var stmt = this.getNodeValue(ctx.javascript_statement());
	var module = this.getNodeValue(ctx.javascript_module());
    stmt.module = module || null;
	this.setNodeValue(ctx, new javascript.JavaScriptNativeCall(stmt));
}


OPromptoBuilder.prototype.exitNative_method_declaration = function(ctx) {
	var type = this.getNodeValue(ctx.typ);
	var name = this.getNodeValue(ctx.name);
	var args = this.getNodeValue(ctx.args);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new declaration.NativeMethodDeclaration(name, args, type, stmts));
};


OPromptoBuilder.prototype.exitJavaArgumentList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new java.JavaExpressionList(item));
};

OPromptoBuilder.prototype.exitJavascriptArgumentList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new javascript.JavaScriptExpressionList(item));
};

OPromptoBuilder.prototype.exitJavaArgumentListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};

OPromptoBuilder.prototype.exitJavascriptArgumentListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};

OPromptoBuilder.prototype.exitJava_method_expression = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var args = this.getNodeValue(ctx.args);
	this.setNodeValue(ctx, new java.JavaMethodExpression(name, args));
};

OPromptoBuilder.prototype.exitJava_this_expression = function(ctx) {
    this.setNodeValue(ctx, new java.JavaThisExpression());
};

OPromptoBuilder.prototype.exitJavaScriptMethodExpression = function(ctx) {
    var method = this.getNodeValue(ctx.method);
    this.setNodeValue(ctx, method);
};

OPromptoBuilder.prototype.exitJavascript_method_expression = function(ctx) {
	var id = this.getNodeValue(ctx.name);
	var args = this.getNodeValue(ctx.args);
	this.setNodeValue(ctx, new javascript.JavaScriptMethodExpression(id, args));
};

OPromptoBuilder.prototype.exitJavaMethodExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};



OPromptoBuilder.prototype.exitFlush_statement = function(ctx) {
    this.setNodeValue(ctx, new statement.FlushStatement());
};


OPromptoBuilder.prototype.exitFlushStatement = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.stmt));
};


OPromptoBuilder.prototype.exitFullDeclarationList = function(ctx) {
	var items = this.getNodeValue(ctx.declarations()) || new declaration.DeclarationList();
	this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitDeclaration = function(ctx) {
    var comments = ctx.comment_statement().map(function(csc) {
        return this.getNodeValue(csc);
    }, this);
    if(comments.length==0)
        comments = null;
    var annotations = ctx.annotation_constructor().map(function(csc) {
        return this.getNodeValue(csc);
    }, this);
    if(annotations.length==0)
        annotations = null;
    var ctx_ = ctx.attribute_declaration();
    if(ctx_==null)
        ctx_ = ctx.category_declaration();
    if(ctx_==null)
        ctx_ = ctx.enum_declaration();
    if(ctx_==null)
        ctx_ = ctx.method_declaration();
    if(ctx_==null)
        ctx_ = ctx.resource_declaration();
    if(ctx_==null)
        ctx_ = ctx.widget_declaration();
    decl = this.getNodeValue(ctx_);
    if(decl!=null) {
        decl.comments = comments;
        decl.annotations = annotations;
        this.setNodeValue(ctx, decl);
    }
};


OPromptoBuilder.prototype.exitDeclarations = function(ctx) {
    var self = this;
    var items = new declaration.DeclarationList();
    ctx.declaration().forEach(function(r) {
        var item = self.getNodeValue(r);
        items.add(item);
    });
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitIteratorExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var name = this.getNodeValue(ctx.name);
    var source = this.getNodeValue(ctx.source);
    this.setNodeValue(ctx, new expression.IteratorExpression(name, source, exp));
};


OPromptoBuilder.prototype.exitIteratorType = function(ctx) {
    var typ = this.getNodeValue(ctx.i);
    this.setNodeValue(ctx, new type.IteratorType(typ));
};


OPromptoBuilder.prototype.exitJavaBooleanLiteral = function(ctx) {
	this.setNodeValue(ctx, new java.JavaBooleanLiteral(ctx.getText()));
};


OPromptoBuilder.prototype.exitJavaIntegerLiteral = function(ctx) {
	this.setNodeValue(ctx, new java.JavaIntegerLiteral(ctx.getText()));
};


OPromptoBuilder.prototype.exitJavaDecimalLiteral = function(ctx) {
	this.setNodeValue(ctx, new java.JavaDecimalLiteral(ctx.getText()));
};


OPromptoBuilder.prototype.exitJavaCharacterLiteral = function(ctx) {
	this.setNodeValue(ctx, new java.JavaCharacterLiteral(ctx.getText()));
};


OPromptoBuilder.prototype.exitJavaTextLiteral = function(ctx) {
	this.setNodeValue(ctx, new java.JavaTextLiteral(ctx.getText()));
};


OPromptoBuilder.prototype.exitJavaCategoryBinding = function(ctx) {
	var map = this.getNodeValue(ctx.binding);
	this.setNodeValue(ctx, new java.JavaNativeCategoryBinding(map));
};

OPromptoBuilder.prototype.exitJavaScriptCategoryBinding = function(ctx) {
	this.setNodeValue(ctx, this.getNodeValue(ctx.binding));
};


OPromptoBuilder.prototype.exitJavascript_category_binding = function(ctx) {
    var identifier = ctx.identifier().map(function(cx) { return cx.getText(); }).join(".");
    var module = this.getNodeValue(ctx.javascript_module()) || null;
	var map = new javascript.JavaScriptNativeCategoryBinding(identifier, module);
	this.setNodeValue(ctx, map);
};


OPromptoBuilder.prototype.exitJavascript_module = function(ctx) {
	ids = ctx.javascript_identifier().map(function(rule) {
        return rule.getText();
	});
	var module = new javascript.JavaScriptModule(ids);
	this.setNodeValue(ctx, module);
};


OPromptoBuilder.prototype.exitNativeCategoryBindingList = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = new grammar.NativeCategoryBindingList(item);
	this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitNativeCategoryBindingListItem = function(ctx) {
	var item = this.getNodeValue(ctx.item);
	var items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitNative_category_bindings = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitNative_category_declaration = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var attrs = this.getNodeValue(ctx.attrs);
	var bindings = this.getNodeValue(ctx.bindings);
    var methods = this.getNodeValue(ctx.methods);
    var decl = new declaration.NativeCategoryDeclaration(name, attrs, bindings, null, methods);
    decl.storable = ctx.STORABLE()!=null;
    this.setNodeValue(ctx, decl);
};


OPromptoBuilder.prototype.exitNative_widget_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var bindings = this.getNodeValue(ctx.bindings);
    var methods = this.getNodeValue(ctx.methods);
    var decl = new declaration.NativeWidgetDeclaration(name, bindings, methods);
    this.setNodeValue(ctx, decl);
};



OPromptoBuilder.prototype.exitNativeCategoryDeclaration = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


OPromptoBuilder.prototype.exitNative_resource_declaration = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var attrs = this.getNodeValue(ctx.attrs);
	var bindings = this.getNodeValue(ctx.bindings);
    var methods = this.getNodeValue(ctx.methods);
    var decl = new declaration.NativeResourceDeclaration(name, attrs, bindings, null, methods);
    decl.storable = ctx.STORABLE()!=null;
    this.setNodeValue(ctx, decl);
};


OPromptoBuilder.prototype.exitResource_declaration = function(ctx) {
    var decl = this.getNodeValue(ctx.native_resource_declaration());
	this.setNodeValue(ctx, decl);
};


OPromptoBuilder.prototype.exitParenthesis_expression = function(ctx) {
	var exp = this.getNodeValue(ctx.expression());
	this.setNodeValue(ctx, new expression.ParenthesisExpression(exp));
};


OPromptoBuilder.prototype.exitParenthesisExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitNative_symbol_list = function(ctx) {
    var self = this;
    var items = new grammar.NativeSymbolList();
    ctx.native_symbol().forEach(function(r) {
        var item = self.getNodeValue(r);
        items.add(item);
    });
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitEnum_native_declaration = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var type = this.getNodeValue(ctx.typ);
	var symbols = this.getNodeValue(ctx.symbols);
	this.setNodeValue(ctx, new declaration.EnumeratedNativeDeclaration(name, type, symbols));
};


OPromptoBuilder.prototype.exitFor_each_statement = function(ctx) {
	var name1 = this.getNodeValue(ctx.name1);
	var name2 = this.getNodeValue(ctx.name2);
	var source = this.getNodeValue(ctx.source);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.ForEachStatement(name1, name2, source, stmts));
};


OPromptoBuilder.prototype.exitForEachStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitKey_token = function(ctx) {
	this.setNodeValue(ctx, ctx.getText());
};


OPromptoBuilder.prototype.exitUUIDLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.UUIDLiteral(ctx.t.text));
};



OPromptoBuilder.prototype.exitUUIDType = function(ctx) {
    this.setNodeValue(ctx, type.UUIDType.instance);
};



OPromptoBuilder.prototype.exitValue_token = function(ctx) {
	this.setNodeValue(ctx, ctx.getText());
};


OPromptoBuilder.prototype.exitNamed_argument = function(ctx) {
    var name = this.getNodeValue(ctx.variable_identifier());
    var arg = new argument.UnresolvedArgument(name);
    var exp = this.getNodeValue(ctx.literal_expression());
    arg.defaultExpression = exp || null;
    this.setNodeValue(ctx, arg);
};


OPromptoBuilder.prototype.exitClosureStatement = function(ctx) {
	var decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, new statement.DeclarationStatement(decl));
};


OPromptoBuilder.prototype.exitReturn_statement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new statement.ReturnStatement(exp));
};


OPromptoBuilder.prototype.exitReturnStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitClosure_expression = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new MethodExpression(name));
};


OPromptoBuilder.prototype.exitClosureExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitIf_statement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var stmts = this.getNodeValue(ctx.stmts);
	var elseIfs = this.getNodeValue(ctx.elseIfs);
	var elseStmts = this.getNodeValue(ctx.elseStmts);
	this.setNodeValue(ctx, new statement.IfStatement(exp, stmts, elseIfs, elseStmts));
};


OPromptoBuilder.prototype.exitElseIfStatementList = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var stmts = this.getNodeValue(ctx.stmts);
	var elem = new statement.IfElement(exp, stmts);
	this.setNodeValue(ctx, new statement.IfElementList(elem));
};


OPromptoBuilder.prototype.exitElseIfStatementListItem = function(ctx) {
	var items = this.getNodeValue(ctx.items);
	var exp = this.getNodeValue(ctx.exp);
	var stmts = this.getNodeValue(ctx.stmts);
	var elem = new statement.IfElement(exp, stmts);
	items.add(elem);
	this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitIfStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitSwitchStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitAssignTupleStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitRaiseStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitWriteStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitWithResourceStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitWhileStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitDoWhileStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitTryStatement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitEqualsExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.EQUALS, right));
};


OPromptoBuilder.prototype.exitNotEqualsExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.NOT_EQUALS, right));
};


OPromptoBuilder.prototype.exitGreaterThanExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.GT, right));
};


OPromptoBuilder.prototype.exitGreaterThanOrEqualExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.GTE, right));
};


OPromptoBuilder.prototype.exitLessThanExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.LT, right));
};


OPromptoBuilder.prototype.exitLessThanOrEqualExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.LTE, right));
};


OPromptoBuilder.prototype.exitAtomicSwitchCase = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.AtomicSwitchCase(exp, stmts));
};


OPromptoBuilder.prototype.exitCollection_literal = function(ctx) {
    var value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};


OPromptoBuilder.prototype.exitCollectionSwitchCase = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.CollectionSwitchCase(exp, stmts));
};


OPromptoBuilder.prototype.exitSwitch_case_statement_list = function(ctx) {
    var self = this;
    var items = new statement.SwitchCaseList();
    ctx.switch_case_statement().forEach(function(r) {
        var item = self.getNodeValue(r);
        items.add(item);
    });
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitSwitch_statement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var cases = this.getNodeValue(ctx.cases);
	var stmts = this.getNodeValue(ctx.stmts);
	var stmt = new statement.SwitchStatement(exp, cases, stmts);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitLiteralRangeLiteral = function(ctx) {
	var low = this.getNodeValue(ctx.low);
	var high = this.getNodeValue(ctx.high);
	this.setNodeValue(ctx, new literal.RangeLiteral(low, high));
};


OPromptoBuilder.prototype.exitLiteralListLiteral = function(ctx) {
    var exp = this.getNodeValue(ctx.literal_list_literal());
    this.setNodeValue(ctx, new literal.ListLiteral(false, exp));
};


OPromptoBuilder.prototype.exitLiteral_list_literal = function(ctx) {
    var self = this;
    var items = new utils.ExpressionList();
    ctx.atomic_literal().forEach(function(r) {
        var item = self.getNodeValue(r);
        items.add(item);
    });
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitInExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.IN, right));
};


OPromptoBuilder.prototype.exitNotInExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_IN, right));
};


OPromptoBuilder.prototype.exitHasExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.HAS, right));
};


OPromptoBuilder.prototype.exitNotHasExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_HAS, right));
};


OPromptoBuilder.prototype.exitHasAllExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.HAS_ALL, right));
};


OPromptoBuilder.prototype.exitNotHasAllExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_HAS_ALL, right));
};


OPromptoBuilder.prototype.exitHasAnyExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.HAS_ANY, right));
};


OPromptoBuilder.prototype.exitNotHasAnyExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_HAS_ANY, right));
};


OPromptoBuilder.prototype.exitContainsExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.CONTAINS, right));
};


OPromptoBuilder.prototype.exitNotContainsExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.NOT_CONTAINS, right));
};


OPromptoBuilder.prototype.exitDivideExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.DivideExpression(left, right));
};


OPromptoBuilder.prototype.exitIntDivideExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.IntDivideExpression(left, right));
};


OPromptoBuilder.prototype.exitModuloExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.ModuloExpression(left, right));
};


OPromptoBuilder.prototype.exitAnnotation_constructor = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new grammar.Annotation(name, exp));
};


OPromptoBuilder.prototype.exitAnnotation_identifier = function(ctx) {
    var name = ctx.getText();
    this.setNodeValue(ctx, new grammar.Identifier(name));
};


OPromptoBuilder.prototype.exitAndExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.AndExpression(left, right));
};

OPromptoBuilder.prototype.exitNullLiteral = function(ctx) {
    this.setNodeValue(ctx, literal.NullLiteral.instance);
};


OPromptoBuilder.prototype.exitOperator_argument = function(ctx) {
    var value = this.getNodeValue (ctx.getChild (0));
    this.setNodeValue (ctx, value);
};


OPromptoBuilder.prototype.exitOperatorArgument = function(ctx) {
    var arg = this.getNodeValue(ctx.arg);
    arg.mutable = ctx.MUTABLE()!=null;
    this.setNodeValue(ctx, arg);
};


OPromptoBuilder.prototype.exitOperatorPlus = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.PLUS);
};


OPromptoBuilder.prototype.exitOperatorMinus = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.MINUS);
};


OPromptoBuilder.prototype.exitOperatorMultiply = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.MULTIPLY);
};


OPromptoBuilder.prototype.exitOperatorDivide = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.DIVIDE);
};


OPromptoBuilder.prototype.exitOperatorIDivide = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.IDIVIDE);
};


OPromptoBuilder.prototype.exitOperatorModulo = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.MODULO);
};


OPromptoBuilder.prototype.exitNative_member_method_declaration = function(ctx) {
    var value = this.getNodeValue (ctx.getChild (0));
    this.setNodeValue (ctx, value);
};


OPromptoBuilder.prototype.exitOperator_method_declaration= function(ctx) {
    var op = this.getNodeValue(ctx.op);
    var arg = this.getNodeValue(ctx.arg);
    var typ = this.getNodeValue(ctx.typ);
    var stmts = this.getNodeValue(ctx.stmts);
    var decl = new declaration.OperatorMethodDeclaration(op, arg, typ, stmts);
    this.setNodeValue(ctx, decl);
};


OPromptoBuilder.prototype.exitOrder_by = function(ctx) {
    var self = this;
    var names = new grammar.IdentifierList();
    ctx.variable_identifier().map( function(ctx_) {
        names.push(self.getNodeValue(ctx_));
    });
    var clause = new grammar.OrderByClause(names, ctx.DESC()!=null);
    this.setNodeValue(ctx, clause);
};

OPromptoBuilder.prototype.exitOrder_by_list = function(ctx) {
    var self = this;
    var list = new grammar.OrderByClauseList();
    ctx.order_by().map( function(ctx_) {
        list.add(self.getNodeValue(ctx_));
    });
    this.setNodeValue(ctx, list);
};

OPromptoBuilder.prototype.exitOrExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.OrExpression(left, right));
};


OPromptoBuilder.prototype.exitMultiplyExpression = function(ctx) {
	var left = this.getNodeValue(ctx.left);
	var right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.MultiplyExpression(left, right));
};


OPromptoBuilder.prototype.exitMutable_category_type = function(ctx) {
    var typ = this.getNodeValue (ctx.category_type());
    typ.mutable = ctx.MUTABLE()!=null;
    this.setNodeValue(ctx, typ);
};


OPromptoBuilder.prototype.exitMinusExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new expression.MinusExpression(exp));
};


OPromptoBuilder.prototype.exitNotExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new expression.NotExpression(exp));
};


OPromptoBuilder.prototype.exitWhile_statement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.WhileStatement(exp, stmts));
};


OPromptoBuilder.prototype.exitDo_while_statement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.DoWhileStatement(exp, stmts));
};

OPromptoBuilder.prototype.exitSingleton_category_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var attrs = this.getNodeValue(ctx.attrs);
    var methods = this.getNodeValue(ctx.methods);
    this.setNodeValue(ctx, new declaration.SingletonCategoryDeclaration(name, attrs, methods));
};

OPromptoBuilder.prototype.exitSingletonCategoryDeclaration = function(ctx) {
    var decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
};

OPromptoBuilder.prototype.exitSliceFirstAndLast = function(ctx) {
	var first = this.getNodeValue(ctx.first);
	var last = this.getNodeValue(ctx.last);
	this.setNodeValue(ctx, new expression.SliceSelector(null, first, last));
};


OPromptoBuilder.prototype.exitSliceFirstOnly = function(ctx) {
	var first = this.getNodeValue(ctx.first);
	this.setNodeValue(ctx, new expression.SliceSelector(null, first, null));
};



OPromptoBuilder.prototype.exitSliceLastOnly = function(ctx) {
	var last = this.getNodeValue(ctx.last);
	this.setNodeValue(ctx, new expression.SliceSelector(null, null, last));
};



OPromptoBuilder.prototype.exitSorted_expression = function(ctx) {
	var source = this.getNodeValue(ctx.source);
    var desc = ctx.DESC()!=null;
    var key = this.getNodeValue(ctx.key);
	this.setNodeValue(ctx, new expression.SortedExpression(source, desc, key));
};



OPromptoBuilder.prototype.exitDocument_expression = function(ctx) {
    var exp = this.getNodeValue(ctx.expression());
    this.setNodeValue(ctx, new expression.DocumentExpression(exp));
};


OPromptoBuilder.prototype.exitDocumentType = function(ctx) {
	this.setNodeValue(ctx, type.DocumentType.instance);
};



OPromptoBuilder.prototype.exitFetchOne = function(ctx) {
    var category = this.getNodeValue(ctx.typ);
    var predicate = this.getNodeValue(ctx.predicate);
    this.setNodeValue(ctx, new expression.FetchOneExpression(category, predicate));
};



OPromptoBuilder.prototype.exitFetchMany = function(ctx) {
    var category = this.getNodeValue(ctx.typ);
    var predicate = this.getNodeValue(ctx.predicate);
    var start = this.getNodeValue(ctx.xstart);
    var stop = this.getNodeValue(ctx.xstop);
    var orderBy = this.getNodeValue(ctx.orderby);
    this.setNodeValue(ctx, new expression.FetchManyExpression(category, start, stop, predicate, orderBy));
};



OPromptoBuilder.prototype.exitFiltered_list_expression = function(ctx) {
    var itemName = this.getNodeValue(ctx.name);
    var source = this.getNodeValue(ctx.source);
    var predicate = this.getNodeValue(ctx.predicate);
    this.setNodeValue(ctx, new expression.FilteredExpression(itemName, source, predicate));
};



OPromptoBuilder.prototype.exitCode_type = function(ctx) {
	this.setNodeValue(ctx, type.CodeType.instance);
};


OPromptoBuilder.prototype.exitExecuteExpression = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new expression.ExecuteExpression(name));
};


OPromptoBuilder.prototype.exitExpression_list = function(ctx) {
    var self = this;
    var items = new utils.ExpressionList();
    ctx.expression().forEach(function(r) {
        var item = self.getNodeValue(r);
        items.add(item);
    });
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitExpression_tuple = function(ctx) {
    var self = this;
    var items = new utils.ExpressionList();
    ctx.expression().forEach(function(r) {
        var item = self.getNodeValue(r);
        items.add(item);
    });
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitCodeExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new expression.CodeExpression(exp));
};


OPromptoBuilder.prototype.exitCategory_or_any_type = function(ctx) {
    var exp = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitCode_argument = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new argument.CodeArgument(name));
};


OPromptoBuilder.prototype.exitCategory_symbol = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var args = this.getNodeValue(ctx.args);
	this.setNodeValue(ctx, new expression.CategorySymbol(name, args));
};


OPromptoBuilder.prototype.exitCategory_symbol_list = function(ctx) {
    var self = this;
    var items = new grammar.CategorySymbolList();
    ctx.category_symbol().forEach(function(r) {
        var item = self.getNodeValue(r);
        items.add(item);
    });
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitEnum_category_declaration = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var attrs = this.getNodeValue(ctx.attrs);
	var parent = this.getNodeValue(ctx.derived);
	var derived = parent==null ? null : new grammar.IdentifierList(parent);
	var symbols = this.getNodeValue(ctx.symbols);
	this.setNodeValue(ctx, new declaration.EnumeratedCategoryDeclaration(name, attrs, derived, symbols));
};


OPromptoBuilder.prototype.exitEnum_declaration = function(ctx) {
    var value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};


OPromptoBuilder.prototype.exitRead_all_expression = function(ctx) {
	var source = this.getNodeValue(ctx.source);
	this.setNodeValue(ctx, new expression.ReadAllExpression(source));
};



OPromptoBuilder.prototype.exitRead_one_expression = function(ctx) {
    var source = this.getNodeValue(ctx.source);
    this.setNodeValue(ctx, new expression.ReadOneExpression(source));
};



OPromptoBuilder.prototype.exitWith_singleton_statement = function(ctx) {
    var name = this.getNodeValue(ctx.typ);
    var typ = new type.CategoryType(name);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.WithSingletonStatement(typ, stmts));
};

OPromptoBuilder.prototype.exitWithSingletonStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};

OPromptoBuilder.prototype.exitWrite_statement = function(ctx) {
	var what = this.getNodeValue(ctx.what);
	var target = this.getNodeValue(ctx.target);
	this.setNodeValue(ctx, new statement.WriteStatement(what, target));
};


OPromptoBuilder.prototype.exitWith_resource_statement = function(ctx) {
	var stmt = this.getNodeValue(ctx.stmt);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.WithResourceStatement(stmt, stmts));
};


OPromptoBuilder.prototype.exitAnyType = function(ctx) {
	this.setNodeValue(ctx, type.AnyType.instance);
};


OPromptoBuilder.prototype.exitAnyListType = function(ctx) {
	var type = this.getNodeValue(ctx.typ);
	this.setNodeValue(ctx, new type.ListType(type));
};


OPromptoBuilder.prototype.exitAnyDictType = function(ctx) {
	var type = this.getNodeValue(ctx.typ);
	this.setNodeValue(ctx, new DictType(type));
};


OPromptoBuilder.prototype.exitCastExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var type = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.CastExpression(left, type));
}

OPromptoBuilder.prototype.exitCatchAtomicStatement = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.AtomicSwitchCase(new expression.SymbolExpression(name), stmts));
};


OPromptoBuilder.prototype.exitCatchCollectionStatement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	var stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new CollectionSwitchCase(exp, stmts));
};


OPromptoBuilder.prototype.exitCatch_statement_list = function(ctx) {
    var self = this;
    var items = new statement.SwitchCaseList();
    ctx.catch_statement().forEach(function(r) {
        var item = self.getNodeValue(r);
        items.add(item);
    });
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitTry_statement = function(ctx) {
	var name = this.getNodeValue(ctx.name);
	var stmts = this.getNodeValue(ctx.stmts);
	var handlers = this.getNodeValue(ctx.handlers);
	var anyStmts = this.getNodeValue(ctx.anyStmts);
	var finalStmts = this.getNodeValue(ctx.finalStmts);
	var stmt = new statement.SwitchErrorStatement(name, stmts, handlers, anyStmts, finalStmts);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitRaise_statement = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new statement.RaiseStatement(exp));
};

OPromptoBuilder.prototype.exitMatchingList = function(ctx) {
	var exp = this.getNodeValue(ctx.source);
	this.setNodeValue(ctx, new constraint.MatchingCollectionConstraint(exp));
};

OPromptoBuilder.prototype.exitMatchingRange = function(ctx) {
	var exp = this.getNodeValue(ctx.source);
	this.setNodeValue(ctx, new constraint.MatchingCollectionConstraint(exp));
};

OPromptoBuilder.prototype.exitMatchingExpression = function(ctx) {
	var exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new constraint.MatchingExpressionConstraint(exp));
};

OPromptoBuilder.prototype.exitMatchingPattern = function(ctx) {
	this.setNodeValue(ctx, new constraint.MatchingPatternConstraint(new literal.TextLiteral(ctx.text.text)));
};

OPromptoBuilder.prototype.exitLiteralSetLiteral = function(ctx) {
    var items = this.getNodeValue(ctx.literal_list_literal());
    this.setNodeValue(ctx, new literal.SetLiteral(items));
};

OPromptoBuilder.prototype.exitCsharp_identifier = function(ctx) {
    this.setNodeValue(ctx, ctx.getText());
};

OPromptoBuilder.prototype.exitCSharpIdentifier = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new csharp.CSharpIdentifierExpression(null, name));
};

OPromptoBuilder.prototype.exitCSharpChildIdentifier = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var name = this.getNodeValue(ctx.name);
    var child = new csharp.CSharpIdentifierExpression(parent, name);
    this.setNodeValue(ctx, child);
};

OPromptoBuilder.prototype.exitCSharpBooleanLiteral = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpBooleanLiteral(ctx.getText()));
};


OPromptoBuilder.prototype.exitCSharpIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpIntegerLiteral(ctx.getText()));
};


OPromptoBuilder.prototype.exitCSharpDecimalLiteral = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpDecimalLiteral(ctx.getText()));
};


OPromptoBuilder.prototype.exitCSharpCharacterLiteral = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpCharacterLiteral(ctx.getText()));
};


OPromptoBuilder.prototype.exitCSharpTextLiteral = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpTextLiteral(ctx.getText()));
};


OPromptoBuilder.prototype.exitCSharpCategoryBinding = function(ctx) {
    var binding = this.getNodeValue(ctx.binding);
    this.setNodeValue(ctx, new csharp.CSharpNativeCategoryBinding(binding));
};

OPromptoBuilder.prototype.exitCsharp_primary_expression = function(ctx) {
    var value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};

OPromptoBuilder.prototype.exitCsharp_this_expression = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpThisExpression());
};

OPromptoBuilder.prototype.exitCsharp_method_expression = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var args = this.getNodeValue(ctx.args);
    this.setNodeValue(ctx, new csharp.CSharpMethodExpression(name, args));
};

OPromptoBuilder.prototype.exitCSharpMethodExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

OPromptoBuilder.prototype.exitCSharpArgumentList = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    this.setNodeValue(ctx, new csharp.CSharpExpressionList(item));
};

OPromptoBuilder.prototype.exitCSharpArgumentListItem = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    var items = this.getNodeValue(ctx.items);
    items.add(item);
    this.setNodeValue(ctx, items);
};

OPromptoBuilder.prototype.exitCSharpNativeStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.csharp_statement());
    var call = new csharp.CSharpNativeCall(stmt);
    this.setNodeValue(ctx, call);
};


OPromptoBuilder.prototype.exitCSharpPromptoIdentifier = function(ctx) {
    var name = ctx.DOLLAR_IDENTIFIER().getText();
    this.setNodeValue(ctx, new csharp.CSharpIdentifierExpression(null, name));
};


OPromptoBuilder.prototype.exitCSharpPrimaryExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

OPromptoBuilder.prototype.exitCSharpSelectorExpression = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var child = this.getNodeValue(ctx.child);
    child.parent = parent;
    this.setNodeValue(ctx, child);
};

OPromptoBuilder.prototype.exitCSharpStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var stmt = new csharp.CSharpStatement(exp,false);
    this.setNodeValue(ctx, stmt);
};

OPromptoBuilder.prototype.exitCSharpReturnStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new csharp.CSharpStatement(exp,true));
};


OPromptoBuilder.prototype.exitPythonStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new python.PythonStatement(exp,false));
};

OPromptoBuilder.prototype.exitPythonReturnStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new python.PythonStatement(exp,true));
};

OPromptoBuilder.prototype.exitPython2CategoryBinding = function(ctx) {
    var map = this.getNodeValue(ctx.binding);
    this.setNodeValue(ctx, new python.Python2NativeCategoryBinding(map));
};


OPromptoBuilder.prototype.exitPython3CategoryBinding = function(ctx) {
    var map = this.getNodeValue(ctx.binding);
    this.setNodeValue(ctx, new python.Python3NativeCategoryBinding(map));
};


OPromptoBuilder.prototype.exitPython_category_binding = function(ctx) {
    var identifier = ctx.identifier().getText();
    var module = this.getNodeValue(ctx.python_module());
    var map = new python.PythonNativeCategoryBinding(identifier, module);
    this.setNodeValue(ctx, map);
};

OPromptoBuilder.prototype.exitPython_method_expression = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var args = this.getNodeValue(ctx.args);
    var method = new python.PythonMethodExpression(name, args);
    this.setNodeValue(ctx, method);
};

OPromptoBuilder.prototype.exitPythonGlobalMethodExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

OPromptoBuilder.prototype.exitPythonMethodExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

OPromptoBuilder.prototype.exitPython_module = function(ctx) {
    var ids = ctx.identifier().map(function(rule) {
        return rule.getText();
    });
    var module = new python.PythonModule(ids);
    this.setNodeValue(ctx, module);
};

OPromptoBuilder.prototype.exitPython2NativeStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.python_native_statement());
    this.setNodeValue(ctx, new python.Python2NativeCall(stmt));
};


OPromptoBuilder.prototype.exitPython3NativeStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.python_native_statement());
    this.setNodeValue(ctx, new python.Python3NativeCall(stmt));
};

OPromptoBuilder.prototype.exitPython_native_statement = function(ctx) {
    var stmt = this.getNodeValue(ctx.python_statement());
    var module = this.getNodeValue(ctx.python_module());
    stmt.module = module || null;
    this.setNodeValue(ctx, new python.PythonNativeCall(stmt));
}

OPromptoBuilder.prototype.exitPython_identifier = function(ctx) {
    this.setNodeValue(ctx, ctx.getText());
};

OPromptoBuilder.prototype.exitPythonIdentifier = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new python.PythonIdentifierExpression(null, name));
};

OPromptoBuilder.prototype.exitPythonIdentifierExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

OPromptoBuilder.prototype.exitPythonChildIdentifier = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var name = this.getNodeValue(ctx.name);
    var child = new python.PythonIdentifierExpression(parent, name);
    this.setNodeValue(ctx, child);
};


OPromptoBuilder.prototype.exitPythonBooleanLiteral = function(ctx) {
    this.setNodeValue(ctx, new python.PythonBooleanLiteral(ctx.getText()));
};

OPromptoBuilder.prototype.exitPythonIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new python.PythonIntegerLiteral(ctx.getText()));
};


OPromptoBuilder.prototype.exitPythonDecimalLiteral = function(ctx) {
    this.setNodeValue(ctx, new python.PythonDecimalLiteral(ctx.getText()));
};

OPromptoBuilder.prototype.exitPythonCharacterLiteral = function(ctx) {
    this.setNodeValue(ctx, new python.PythonCharacterLiteral(ctx.getText()));
};


OPromptoBuilder.prototype.exitPythonTextLiteral = function(ctx) {
    this.setNodeValue(ctx, new python.PythonTextLiteral(ctx.getText()));
};

OPromptoBuilder.prototype.exitPythonLiteralExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitPythonPromptoIdentifier = function(ctx) {
    var name = ctx.DOLLAR_IDENTIFIER().getText();
    this.setNodeValue(ctx, new python.PythonIdentifierExpression(null, name));
};


OPromptoBuilder.prototype.exitPythonPrimaryExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

OPromptoBuilder.prototype.exitPythonArgumentList = function(ctx) {
    var ordinal = this.getNodeValue(ctx.ordinal);
    var named = this.getNodeValue(ctx.named);
    ordinal.addAll(named);
    this.setNodeValue(ctx, ordinal);
};


OPromptoBuilder.prototype.exitPythonNamedOnlyArgumentList = function(ctx) {
    var named = this.getNodeValue(ctx.named);
    this.setNodeValue(ctx, named);
};

OPromptoBuilder.prototype.exitPythonNamedArgumentList = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var exp = this.getNodeValue(ctx.exp);
    var arg = new python.PythonNamedArgument(name, exp);
    this.setNodeValue(ctx, new python.PythonArgumentList(arg));
};

OPromptoBuilder.prototype.exitPythonNamedArgumentListItem = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var exp = this.getNodeValue(ctx.exp);
    var arg = new python.PythonNamedArgument(name, exp);
    var items = this.getNodeValue(ctx.items);
    items.add(arg);
    this.setNodeValue(ctx, items);
};

OPromptoBuilder.prototype.exitPythonOrdinalOnlyArgumentList = function(ctx) {
    var ordinal = this.getNodeValue(ctx.ordinal);
    this.setNodeValue(ctx, ordinal);
};

OPromptoBuilder.prototype.exitPythonOrdinalArgumentList = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    var arg = new python.PythonOrdinalArgument(item);
    this.setNodeValue(ctx, new python.PythonArgumentList(arg));
};

OPromptoBuilder.prototype.exitPythonOrdinalOnlyArgumentList = function(ctx) {
    var ordinal = this.getNodeValue(ctx.ordinal);
    this.setNodeValue(ctx, ordinal);
};


OPromptoBuilder.prototype.exitPythonSelectorExpression = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var selector = this.getNodeValue(ctx.child);
    selector.parent = parent;
    this.setNodeValue(ctx, selector);
};


OPromptoBuilder.prototype.exitPythonSelfExpression = function(ctx) {
    this.setNodeValue(ctx, new python.PythonSelfExpression());
};



OPromptoBuilder.prototype.exitJsxChild = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.jsx));
};


OPromptoBuilder.prototype.exitJsxCode = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new jsx.JsxCode(exp));
};



OPromptoBuilder.prototype.exitJsxExpression = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
};



OPromptoBuilder.prototype.exitJsxElement = function(ctx) {
    var elem = this.getNodeValue(ctx.jsx);
    var children = this.getNodeValue(ctx.children_);
    elem.setChildren(children);
    this.setNodeValue(ctx, elem);
};


OPromptoBuilder.prototype.exitJsxSelfClosing = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.jsx));
};



OPromptoBuilder.prototype.exitJsxText = function(ctx) {
    var text = parser.ParserUtils.getFullText(ctx.text);
    this.setNodeValue(ctx, new jsx.JsxText(text));
};



OPromptoBuilder.prototype.exitJsxValue = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new jsx.JsxExpression(exp));
};


OPromptoBuilder.prototype.exitJsx_attribute = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var value = this.getNodeValue(ctx.value);
    this.setNodeValue(ctx, new jsx.JsxAttribute(name, value));
};



OPromptoBuilder.prototype.exitJsx_children = function(ctx) {
    var list = ctx.jsx_child()
        .map(cx => this.getNodeValue(cx), this);
    this.setNodeValue(ctx, list);
};


OPromptoBuilder.prototype.exitJsx_element_name = function(ctx) {
    var name = ctx.getText();
    this.setNodeValue(ctx, new grammar.Identifier(name));
};


OPromptoBuilder.prototype.exitJsx_expression = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.getChild(0)));
};


OPromptoBuilder.prototype.exitJsx_identifier = function(ctx) {
    var name = ctx.getText();
    this.setNodeValue(ctx, new grammar.Identifier(name));
};


OPromptoBuilder.prototype.exitJsxLiteral = function(ctx) {
    var text = ctx.getText();
    this.setNodeValue(ctx, new jsx.JsxLiteral(text));
};


OPromptoBuilder.prototype.exitJsx_opening = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var attributes = ctx.jsx_attribute()
        .map(cx => this.getNodeValue(cx), this);
    this.setNodeValue(ctx, new jsx.JsxElement(name, attributes));
};


OPromptoBuilder.prototype.exitJsx_self_closing = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var attributes = ctx.jsx_attribute()
        .map(cx => this.getNodeValue(cx), this);
    this.setNodeValue(ctx, new jsx.JsxSelfClosing(name, attributes));
};


	
OPromptoBuilder.prototype.exitCssExpression = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
}
	
	
OPromptoBuilder.prototype.exitCss_expression = function(ctx) {
    var exp = new css.CssExpression();
    ctx.css_field().forEach(function(cx) {
        var field = this.getNodeValue(cx);
        exp.addField(field);
    }, this);
    this.setNodeValue(ctx, exp);
};
	
	
OPromptoBuilder.prototype.exitCss_field = function(ctx) {
    var name = ctx.name.getText();
    var value = this.getNodeValue(ctx.value);
    this.setNodeValue(ctx, new css.CssField(name, value));
};
	
	
	
OPromptoBuilder.prototype.exitCssText = function(ctx) {
    var text = ctx.text.getText();
    this.setNodeValue(ctx, new css.CssText(text));
};
	
	
OPromptoBuilder.prototype.exitCssValue = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new css.CssCode(exp));
};



OPromptoBuilder.prototype.buildSection = function(node, section) {
	var first = this.findFirstValidToken(node.start.tokenIndex);
	var last = this.findLastValidToken(node.stop.tokenIndex);
    section.setSectionFrom(this.path, first, last, parser.Dialect.O);
};

OPromptoBuilder.prototype.findFirstValidToken = function(idx) {
	if(idx===-1) { // happens because input.index() is called before any other read operation (bug?)
		idx = 0;
	};
	do {
		var token = this.readValidToken(idx++);
		if(token!==null) {
			return token;
		};
	} while(idx<this.input.tokenSource.size);
	return null;
};

OPromptoBuilder.prototype.findLastValidToken = function(idx) {
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

OPromptoBuilder.prototype.readValidToken = function(idx) {
	var token = this.input.get(idx);
	var text = token.text;
	if(text!==null && text.length>0 && !value.CharacterValue.isWhitespace(text[0])) {
		return token;
	} else {
		return null;
	}
};


exports.OPromptoBuilder = OPromptoBuilder;
