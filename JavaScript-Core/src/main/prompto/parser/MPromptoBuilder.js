var argument = require("../param/index");
var constraint = require("../constraint/index");
var instance = require("../instance/index");
var declaration = require("../declaration/index");
var expression = require("../expression/index");
var javascript = require("../javascript/index");
var statement = require("../statement/index");
var literal = require("../literal/index");
var grammar = require("../grammar/index");
var utils = require("../utils/index");
var param = require("../param/index");
var parser = require("../parser/index");
var type = require("../type/index");
var jsx = require("../jsx/index");
var css = require("../css/index");
var java = require("../java/index");
var csharp = require("../csharp/index");
var python = require("../python/index");


function MPromptoBuilder(pparser) {
    parser.MParserListener.call(this);
    this.input = pparser.getTokenStream();
    this.path = pparser.path;
    this.nodeValues = {};
    this.nextNodeId = 0;
    return this;
}

MPromptoBuilder.prototype = Object.create(parser.MParserListener.prototype);
MPromptoBuilder.prototype.constructor = MPromptoBuilder;


MPromptoBuilder.prototype.setNodeValue = function(node, value) {
    if(node["%id"]===undefined)
        node["%id"] = this.nextNodeId++;
    this.nodeValues[node["%id"]] = value;
    if(value instanceof parser.Section) {
        this.buildSection(node, value);
    }
};


MPromptoBuilder.prototype.getNodeValue = function(node) {
    if(node==null || node===undefined || node["%id"]===null || node["%id"]===undefined)
        return null;
    else
        return this.nodeValues[node["%id"]];
};



MPromptoBuilder.prototype.getHiddenTokensBefore = function(token) {
    var hidden = this.input.getHiddenTokensToLeft(token.tokenIndex);
    return this.getHiddenTokensText(hidden);
};

MPromptoBuilder.prototype.getHiddenTokensAfter = function(token) {
    if(token.tokenIndex<0)
        return null;
    var hidden = this.input.getHiddenTokensToRight(token.tokenIndex);
    return this.getHiddenTokensText(hidden);
};


MPromptoBuilder.prototype.getHiddenTokensText = function(hidden) {
    if(hidden==null || hidden.length===0)
        return null;
    else
        return hidden.map(function(token) { return token.text; }).join("");
};

MPromptoBuilder.prototype.getWhiteSpacePlus = function(ctx) {
    var within = ctx.children==null ? null : ctx.children
        .filter(function(child) { return this.isNotIndent(child); } , this)
        .map(function(child) { return child.getText(); }, this)
        .join("");
    if(within==null || within.length===0)
        return null;
    var before = this.getHiddenTokensBefore(ctx.start);
    if(before!=null)
        within = before + within;
    var after = this.getHiddenTokensAfter(ctx.stop);
    if(after!=null)
        within = within + after;
    return within;
};

MPromptoBuilder.prototype.isNotIndent = function(tree) {
    return !tree.symbol || tree.symbol.type!=parser.MParser.INDENT;
}

MPromptoBuilder.prototype.readAnnotations = function(ctxs) {
    var annotations = ctxs.map(function (csc) {
        return this.getNodeValue(csc);
    }, this);
    return (annotations.length == 0) ? null : annotations;
};


MPromptoBuilder.prototype.readComments = function(ctxs) {
    var comments = ctxs.map(function (csc) {
        return this.getNodeValue(csc);
    }, this);
    return (comments.length == 0) ? null : comments;
};


MPromptoBuilder.prototype.exitSelectableExpression = function(ctx) {
    var e = this.getNodeValue(ctx.parent);
    this.setNodeValue(ctx, e);
};


MPromptoBuilder.prototype.exitSelectorExpression = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var selector = this.getNodeValue(ctx.selector);
    if(selector instanceof statement.UnresolvedCall)
        selector.setParent(parent);
    else
        selector.parent = parent;
    this.setNodeValue(ctx, selector);
};

MPromptoBuilder.prototype.exitSet_literal = function(ctx) {
    var items = this.getNodeValue(ctx.expression_list());
    var set_ = new literal.SetLiteral(items);
    this.setNodeValue(ctx, set_);
};


MPromptoBuilder.prototype.exitStoreStatement = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.stmt));
};

MPromptoBuilder.prototype.exitStore_statement = function(ctx) {
    var del = this.getNodeValue(ctx.to_del);
    var add = this.getNodeValue(ctx.to_add);
    var stmts = this.getNodeValue(ctx.stmts);
    var stmt = new statement.StoreStatement(del, add, stmts);
    this.setNodeValue(ctx, stmt);
};



MPromptoBuilder.prototype.exitAtomicLiteral = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


MPromptoBuilder.prototype.exitCollectionLiteral = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


MPromptoBuilder.prototype.exitCommentStatement = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.comment_statement()));
};


MPromptoBuilder.prototype.exitComment_statement = function(ctx) {
    this.setNodeValue(ctx, new statement.CommentStatement(ctx.getText()));
};


MPromptoBuilder.prototype.exitListLiteral = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};



MPromptoBuilder.prototype.exitBlob_expression = function(ctx) {
    var exp = this.getNodeValue(ctx.expression());
    this.setNodeValue(ctx, new expression.BlobExpression(exp));
};



MPromptoBuilder.prototype.exitBlobType = function(ctx) {
    this.setNodeValue(ctx, type.BlobType.instance);
};


MPromptoBuilder.prototype.exitBooleanLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.BooleanLiteral(ctx.getText()));
};


MPromptoBuilder.prototype.exitBreakStatement = function(ctx) {
    this.setNodeValue(ctx, new statement.BreakStatement());
};



MPromptoBuilder.prototype.exitMinIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.MinIntegerLiteral());
};


MPromptoBuilder.prototype.exitMaxIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.MaxIntegerLiteral());
};


MPromptoBuilder.prototype.exitIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.IntegerLiteral(ctx.getText()));
};


MPromptoBuilder.prototype.exitDecimalLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.DecimalLiteral(ctx.getText()));
};


MPromptoBuilder.prototype.exitHexadecimalLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.HexaLiteral(ctx.getText()));
};


MPromptoBuilder.prototype.exitCharacterLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.CharacterLiteral(ctx.getText()));
};


MPromptoBuilder.prototype.exitDateLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.DateLiteral(ctx.getText()));
};


MPromptoBuilder.prototype.exitDateTimeLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.DateTimeLiteral(ctx.getText()));
};

MPromptoBuilder.prototype.exitTernaryExpression = function(ctx) {
    var condition = this.getNodeValue(ctx.test);
    var ifTrue = this.getNodeValue(ctx.ifTrue);
    var ifFalse = this.getNodeValue(ctx.ifFalse);
    var exp = new expression.TernaryExpression(condition, ifTrue, ifFalse);
    this.setNodeValue(ctx, exp);
};

MPromptoBuilder.prototype.exitTest_method_declaration = function(ctx) {
    var name = new grammar.Identifier(ctx.name.text);
    name.setSectionFrom(this.path, ctx.name, ctx.name, parser.Dialect.M);
    var stmts = this.getNodeValue(ctx.stmts);
    var exps = this.getNodeValue(ctx.exps);
    var errorName = this.getNodeValue(ctx.error);
    var error = errorName==null ? null : new expression.SymbolExpression(errorName);
    this.setNodeValue(ctx, new declaration.TestMethodDeclaration(name, stmts, exps, error));
};


MPromptoBuilder.prototype.exitTextLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.TextLiteral(ctx.getText()));
};


MPromptoBuilder.prototype.exitTimeLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.TimeLiteral(ctx.getText()));
};


MPromptoBuilder.prototype.exitPeriodLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.PeriodLiteral(ctx.getText()));
};


MPromptoBuilder.prototype.exitPeriodType = function(ctx) {
    this.setNodeValue(ctx, type.PeriodType.instance);
};


MPromptoBuilder.prototype.exitVersionLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.VersionLiteral(ctx.getText()));
};


MPromptoBuilder.prototype.exitVersionType = function(ctx) {
    this.setNodeValue(ctx, type.VersionType.instance);
};

MPromptoBuilder.prototype.exitAttribute_identifier = function(ctx) {
    var name = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, name);
};


MPromptoBuilder.prototype.exitVariable_identifier = function(ctx) {
    var name = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, name);
};


MPromptoBuilder.prototype.exitList_literal = function(ctx) {
    var mutable = ctx.MUTABLE() !== null;
    var items = this.getNodeValue(ctx.expression_list()) || null;
    var value = new literal.ListLiteral(mutable, items);
    this.setNodeValue(ctx, value);
};


MPromptoBuilder.prototype.exitDict_literal = function(ctx) {
    var mutable = ctx.MUTABLE() !== null;
    var items = this.getNodeValue(ctx.dict_entry_list()) || null;
    var value = new literal.DictLiteral(mutable, items);
    this.setNodeValue(ctx, value);
};


MPromptoBuilder.prototype.exitTuple_literal = function(ctx) {
    var mutable = ctx.MUTABLE() !== null;
    var items = this.getNodeValue(ctx.expression_tuple()) || null;
    var value = new literal.TupleLiteral(mutable, items);
    this.setNodeValue(ctx, value);
};



MPromptoBuilder.prototype.exitRange_literal = function(ctx) {
    var low = this.getNodeValue(ctx.low);
    var high = this.getNodeValue(ctx.high);
    this.setNodeValue(ctx, new literal.RangeLiteral(low, high));
};


MPromptoBuilder.prototype.exitRangeLiteral = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


MPromptoBuilder.prototype.exitDict_entry_list = function(ctx) {
    var items = new literal.DictEntryList(null, null);
    ctx.dict_entry().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


MPromptoBuilder.prototype.exitDict_entry = function(ctx) {
    var key = this.getNodeValue(ctx.key);
    var value= this.getNodeValue(ctx.value);
    var entry = new literal.DictEntry(key, value);
    this.setNodeValue(ctx, entry);
};


MPromptoBuilder.prototype.exitLiteral_expression = function(ctx) {
    var exp = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, exp);
};


MPromptoBuilder.prototype.exitLiteralExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


MPromptoBuilder.prototype.exitIdentifierExpression = function(ctx) {
    var name = this.getNodeValue(ctx.exp);
    var exp = new expression.UnresolvedIdentifier(name);
    this.setNodeValue(ctx, exp);
};


MPromptoBuilder.prototype.exitVariableIdentifier = function(ctx) {
    var id = this.getNodeValue(ctx.variable_identifier());
    this.setNodeValue(ctx, new expression.InstanceExpression(id));
};


MPromptoBuilder.prototype.exitInstanceExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


MPromptoBuilder.prototype.exitSymbol_identifier = function(ctx) {
    var name = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, name);
};


MPromptoBuilder.prototype.exitNative_symbol = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new expression.NativeSymbol(name, exp));
};


MPromptoBuilder.prototype.exitTypeIdentifier = function(ctx) {
    var name = this.getNodeValue(ctx.type_identifier());
    this.setNodeValue(ctx, name);
};


MPromptoBuilder.prototype.exitSymbolIdentifier = function(ctx) {
    var name = this.getNodeValue(ctx.symbol_identifier());
    this.setNodeValue(ctx, name);
};



MPromptoBuilder.prototype.exitBlobType = function(ctx) {
    this.setNodeValue(ctx, type.BlobType.instance);
};


MPromptoBuilder.prototype.exitBooleanType = function(ctx) {
    this.setNodeValue(ctx, type.BooleanType.instance);
};


MPromptoBuilder.prototype.exitCharacterType = function(ctx) {
    this.setNodeValue(ctx, type.CharacterType.instance);
};


MPromptoBuilder.prototype.exitImageType = function(ctx) {
    this.setNodeValue(ctx, type.ImageType.instance);
};


MPromptoBuilder.prototype.exitTextType = function(ctx) {
    this.setNodeValue(ctx, type.TextType.instance);
};


MPromptoBuilder.prototype.exitHtmlType = function(ctx) {
    this.setNodeValue(ctx, type.HtmlType.instance);
};


MPromptoBuilder.prototype.exitThisExpression = function(ctx) {
    this.setNodeValue(ctx, new expression.ThisExpression());
};


MPromptoBuilder.prototype.exitIntegerType = function(ctx) {
    this.setNodeValue(ctx, type.IntegerType.instance);
};


MPromptoBuilder.prototype.exitDecimalType = function(ctx) {
    this.setNodeValue(ctx, type.DecimalType.instance);
};


MPromptoBuilder.prototype.exitDateType = function(ctx) {
    this.setNodeValue(ctx, type.DateType.instance);
};


MPromptoBuilder.prototype.exitDateTimeType = function(ctx) {
    this.setNodeValue(ctx, type.DateTimeType.instance);
};


MPromptoBuilder.prototype.exitTimeType = function(ctx) {
    this.setNodeValue(ctx, type.TimeType.instance);
};


MPromptoBuilder.prototype.exitCodeType = function(ctx) {
    this.setNodeValue(ctx, type.CodeType.instance);
};


MPromptoBuilder.prototype.exitPrimaryType = function(ctx) {
    var type = this.getNodeValue(ctx.p);
    this.setNodeValue(ctx, type);
};


MPromptoBuilder.prototype.exitAttribute_declaration = function(ctx) {
    var id = this.getNodeValue(ctx.name);
    var type = this.getNodeValue(ctx.typ);
    var match = this.getNodeValue(ctx.match);
    var indices = ctx.index_clause()==null ? null : this.getNodeValue(ctx.index_clause());
    var decl = new declaration.AttributeDeclaration(id, type, match, indices);
    decl.storable = ctx.STORABLE()!=null;
    this.setNodeValue(ctx, decl);
};


MPromptoBuilder.prototype.exitIndex_clause = function(ctx) {
    var indices = ctx.indices==null ? new grammar.IdentifierList() : this.getNodeValue(ctx.indices);
    this.setNodeValue(ctx, indices);
};



MPromptoBuilder.prototype.exitNativeType = function(ctx) {
    var type = this.getNodeValue(ctx.n);
    this.setNodeValue(ctx, type);
};


MPromptoBuilder.prototype.exitCategoryType = function(ctx) {
    var type = this.getNodeValue(ctx.c);
    this.setNodeValue(ctx, type);
};


MPromptoBuilder.prototype.exitCategory_type = function(ctx) {
    var name = new grammar.Identifier(ctx.getText());
    this.buildSection(ctx, name);
    this.setNodeValue(ctx, new type.CategoryType(name));
};


MPromptoBuilder.prototype.exitListType = function(ctx) {
    var typ = this.getNodeValue(ctx.l);
    this.setNodeValue(ctx, new type.ListType(typ));
};


MPromptoBuilder.prototype.exitDictKeyIdentifier = function(ctx) {
    var text = ctx.name.getText();
    this.setNodeValue(ctx, new literal.DictIdentifierKey(new grammar.Identifier(text)));
};

MPromptoBuilder.prototype.exitDictKeyText = function(ctx) {
    var text = ctx.name.text;
    this.setNodeValue(ctx, new literal.DictTextKey(text));
};


MPromptoBuilder.prototype.exitDictType = function(ctx) {
    var typ = this.getNodeValue(ctx.d);
    this.setNodeValue(ctx, new type.DictionaryType(typ));
};


MPromptoBuilder.prototype.exitAttribute_identifier_list = function(ctx) {
    var list = new grammar.IdentifierList();
    ctx.attribute_identifier().forEach(function(rule) {
        var item = this.getNodeValue(rule);
        list.add(item);
    }, this);
    this.setNodeValue(ctx, list);
};



MPromptoBuilder.prototype.exitVariable_identifier_list = function(ctx) {
    var list = new grammar.IdentifierList();
    ctx.variable_identifier().forEach(function(rule) {
        var item = this.getNodeValue(rule);
        list.add(item);
    }, this);
    this.setNodeValue(ctx, list);
};


MPromptoBuilder.prototype.exitConcrete_category_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var attrs = this.getNodeValue(ctx.attrs);
    var derived = this.getNodeValue(ctx.derived);
    var methods = this.getNodeValue(ctx.methods);
    var decl = new declaration.ConcreteCategoryDeclaration(name, attrs, derived, methods);
    decl.storable = ctx.STORABLE()!=null;
    this.setNodeValue(ctx, decl);
};


MPromptoBuilder.prototype.exitConcrete_widget_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var derived = this.getNodeValue(ctx.derived);
    var methods = this.getNodeValue(ctx.methods);
    var decl = new declaration.ConcreteWidgetDeclaration(name, derived, methods);
    this.setNodeValue(ctx, decl);
};



MPromptoBuilder.prototype.exitConcreteCategoryDeclaration = function(ctx) {
    var decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
};


MPromptoBuilder.prototype.exitConcreteWidgetDeclaration = function(ctx) {
    var decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
};


MPromptoBuilder.prototype.exitNativeWidgetDeclaration = function(ctx) {
    var decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
};


MPromptoBuilder.prototype.exitDerived_list = function(ctx) {
    var items = this.getNodeValue(ctx.items);
    this.setNodeValue(ctx, items);
};

MPromptoBuilder.prototype.exitType_identifier = function(ctx) {
    var name = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, name);
};


MPromptoBuilder.prototype.exitType_identifier_list = function(ctx) {
    var items = new grammar.IdentifierList();
    ctx.type_identifier().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


MPromptoBuilder.prototype.exitType_literal = function(ctx) {
    var type = this.getNodeValue(ctx.category_or_any_type());
    this.setNodeValue(ctx, new literal.TypeLiteral(type));
};


MPromptoBuilder.prototype.exitTypeLiteral = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.type_literal()));
};


MPromptoBuilder.prototype.exitMemberSelector = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new expression.MemberSelector(null, name));
};

MPromptoBuilder.prototype.exitIsATypeExpression = function(ctx) {
    var type = this.getNodeValue(ctx.category_or_any_type());
    var exp = new expression.TypeExpression(type);
    this.setNodeValue(ctx, exp);
};

MPromptoBuilder.prototype.exitIsOtherExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.expression());
    this.setNodeValue(ctx, exp);
};

MPromptoBuilder.prototype.exitIsExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    var op = right instanceof expression.TypeExpression ? grammar.EqOp.IS_A : grammar.EqOp.IS;
    this.setNodeValue(ctx, new expression.EqualsExpression(left, op, right));
};

MPromptoBuilder.prototype.exitIsNotExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    var op = right instanceof expression.TypeExpression ? grammar.EqOp.IS_NOT_A : grammar.EqOp.IS_NOT;
    this.setNodeValue(ctx, new expression.EqualsExpression(left, op, right));
};



MPromptoBuilder.prototype.exitItemSelector = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new expression.ItemSelector(null, exp));
};


MPromptoBuilder.prototype.exitSliceSelector = function(ctx) {
    var slice = this.getNodeValue(ctx.xslice);
    this.setNodeValue(ctx, slice);
};


MPromptoBuilder.prototype.exitTyped_argument = function(ctx) {
    var typ = this.getNodeValue(ctx.typ);
    var name = this.getNodeValue(ctx.name);
    var attrs = this.getNodeValue(ctx.attrs);
    var arg = attrs ?
        new argument.ExtendedParameter(typ, name, attrs) :
        new argument.CategoryParameter(typ, name);
    var exp = this.getNodeValue(ctx.value);
    arg.defaultExpression = exp || null;
    this.setNodeValue(ctx, arg);
};


MPromptoBuilder.prototype.exitCodeArgument = function(ctx) {
    var arg = this.getNodeValue(ctx.arg);
    this.setNodeValue(ctx, arg);
};


MPromptoBuilder.prototype.exitArgument_list = function(ctx) {
    var items = new param.ParameterList();
    ctx.argument().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


MPromptoBuilder.prototype.exitMethodName = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new expression.UnresolvedIdentifier(name));
};



MPromptoBuilder.prototype.exitMethodParent = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new expression.MethodSelector(parent, name));
};


MPromptoBuilder.prototype.exitExpressionAssignmentList = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var assign = new grammar.Argument(null, exp);
    this.setNodeValue(ctx, new grammar.ArgumentList([assign]));
};


MPromptoBuilder.prototype.exitArgument_assignment = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var exp = this.getNodeValue(ctx.exp);
    var arg = new argument.UnresolvedParameter(name);
    this.setNodeValue(ctx, new grammar.Argument(arg, exp));
};


MPromptoBuilder.prototype.exitArgumentAssignmentList = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    this.setNodeValue(ctx, new grammar.ArgumentList([item]));
};


MPromptoBuilder.prototype.exitArgumentAssignmentListItem = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    var items = this.getNodeValue(ctx.items);
    items.add(item);
    this.setNodeValue(ctx, items);
};


MPromptoBuilder.prototype.exitArrow_prefix = function(ctx) {
    var args = this.getNodeValue(ctx.arrow_args());
    var argsSuite = this.getWhiteSpacePlus(ctx.s1);
    if(argsSuite==null) // happens when only WS
        argsSuite = this.getHiddenTokensBefore(ctx.EGT().getSymbol());
    var arrowSuite = this.getWhiteSpacePlus(ctx.s2);
    if(arrowSuite==null) // happens when only WS
        arrowSuite = this.getHiddenTokensAfter(ctx.EGT().getSymbol());
    this.setNodeValue(ctx, new expression.ArrowExpression(args, argsSuite, arrowSuite));
};


MPromptoBuilder.prototype.exitArrowExpression = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
};


MPromptoBuilder.prototype.exitArrowExpressionBody = function(ctx) {
    var arrow = this.getNodeValue(ctx.arrow_prefix());
    var exp = this.getNodeValue(ctx.expression());
    arrow.setExpression(exp);
    this.setNodeValue(ctx, arrow);
};


MPromptoBuilder.prototype.exitArrowListArg = function(ctx) {
    var list = this.getNodeValue(ctx.variable_identifier_list());
    this.setNodeValue(ctx, list);
};


MPromptoBuilder.prototype.exitArrowSingleArg = function(ctx) {
    var arg = this.getNodeValue(ctx.variable_identifier());
    this.setNodeValue(ctx, new grammar.IdentifierList(arg));
};


MPromptoBuilder.prototype.exitArrowStatementsBody = function(ctx) {
    var arrow = this.getNodeValue(ctx.arrow_prefix());
    var stmts = this.getNodeValue(ctx.statement_list());
    arrow.setStatements(stmts);
    this.setNodeValue(ctx, arrow);
};


MPromptoBuilder.prototype.exitMethod_call_expression = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var caller = new expression.UnresolvedIdentifier(name);
    var args = this.getNodeValue(ctx.args);
    this.setNodeValue(ctx, new statement.UnresolvedCall(caller, args));
};


MPromptoBuilder.prototype.exitMethod_call_statement = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var call = this.getNodeValue(ctx.method);
    call && call.setParent(parent);
    var name = this.getNodeValue(ctx.name);
    var stmts = this.getNodeValue(ctx.stmts);
    if (call && name!=null || stmts!=null)
        this.setNodeValue(ctx, new statement.RemoteCall(call.callable, call.args, name, stmts));
    else
        this.setNodeValue(ctx, call)
};


MPromptoBuilder.prototype.exitMethodSelector = function(ctx) {
    var call = this.getNodeValue(ctx.method);
    if (call.callable instanceof expression.UnresolvedIdentifier) {
        var id = call.callable.id;
        call.callable = new expression.UnresolvedSelector(null, id);
    }
    this.setNodeValue(ctx, call);
};


MPromptoBuilder.prototype.exitAddExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    var exp = ctx.op.type==parser.MParser.PLUS ?
        new expression.PlusExpression(left, right) :
        new expression.SubtractExpression(left, right);
    this.setNodeValue(ctx, exp);
};


MPromptoBuilder.prototype.exitMember_method_declaration_list = function(ctx) {
    var items = new grammar.MethodDeclarationList();
    ctx.member_method_declaration().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};

MPromptoBuilder.prototype.exitNative_member_method_declaration_list = function(ctx) {
    var items = new grammar.MethodDeclarationList();
    ctx.native_member_method_declaration().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


MPromptoBuilder.prototype.exitSetter_method_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new declaration.SetterMethodDeclaration(name, stmts));
};


MPromptoBuilder.prototype.exitGetter_method_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new declaration.GetterMethodDeclaration(name, stmts));
};

MPromptoBuilder.prototype.exitNative_setter_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new declaration.NativeSetterMethodDeclaration(name, stmts));
};


MPromptoBuilder.prototype.exitNative_getter_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new declaration.NativeGetterMethodDeclaration(name, stmts));
};


MPromptoBuilder.prototype.exitMember_method_declaration = function(ctx) {
    var comments = this.readComments(ctx.comment_statement());
    var annotations = this.readAnnotations(ctx.annotation_constructor());
    var ctx_ = ctx.children[ctx.getChildCount()-1];
    var decl = this.getNodeValue(ctx_);
    if(decl!=null) {
        decl.comments = comments;
        decl.annotations = annotations;
        this.setNodeValue(ctx, decl);
    }
};

MPromptoBuilder.prototype.exitStatement_list = function(ctx) {
    var items = new statement.StatementList();
    ctx.statement().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


MPromptoBuilder.prototype.exitAbstract_method_declaration = function(ctx) {
    var type = this.getNodeValue(ctx.typ);
    var name = this.getNodeValue(ctx.name);
    var args = this.getNodeValue(ctx.args);
    this.setNodeValue(ctx, new declaration.AbstractMethodDeclaration(name, args, type));
};


MPromptoBuilder.prototype.exitConcrete_method_declaration = function(ctx) {
    var type = this.getNodeValue(ctx.typ);
    var name = this.getNodeValue(ctx.name);
    var args = this.getNodeValue(ctx.args);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new declaration.ConcreteMethodDeclaration(name, args, type, stmts));
};


MPromptoBuilder.prototype.exitMethod_declaration = function(ctx) {
    var value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};


MPromptoBuilder.prototype.exitMethodCallStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


MPromptoBuilder.prototype.exitMethod_identifier = function(ctx) {
    var value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};


MPromptoBuilder.prototype.exitMethod_Expression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


MPromptoBuilder.prototype.exitConstructorFrom = function(ctx) {
    var type = this.getNodeValue(ctx.typ);
    var copyFrom = this.getNodeValue(ctx.copyExp) || null;
    var args = this.getNodeValue(ctx.args) || null;
    this.setNodeValue(ctx, new expression.ConstructorExpression(type, copyFrom, args, true));
};


MPromptoBuilder.prototype.exitConstructorNoFrom = function(ctx) {
    var type = this.getNodeValue(ctx.typ);
    var args = this.getNodeValue(ctx.args) || null;
    this.setNodeValue(ctx, new expression.ConstructorExpression(type, null, args, true));
};


MPromptoBuilder.prototype.exitCopy_from = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
};



MPromptoBuilder.prototype.exitAssertion = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new parser.Assertion(exp));
};


MPromptoBuilder.prototype.exitAssertion_list = function(ctx) {
    var items = new utils.ExpressionList();
    ctx.assertion().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


MPromptoBuilder.prototype.exitAssign_instance_statement = function(ctx) {
    var inst = this.getNodeValue(ctx.inst);
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new statement.AssignInstanceStatement(inst, exp));
};


MPromptoBuilder.prototype.exitAssignInstanceStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


MPromptoBuilder.prototype.exitAssign_variable_statement = function(ctx) {
    var name = this.getNodeValue(ctx.variable_identifier());
    var exp = this.getNodeValue(ctx.expression());
    this.setNodeValue(ctx, new statement.AssignVariableStatement(name, exp));
};


MPromptoBuilder.prototype.exitAssign_tuple_statement = function(ctx) {
    var items = this.getNodeValue(ctx.items);
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new statement.AssignTupleStatement(items, exp));
};


MPromptoBuilder.prototype.exitRootInstance = function(ctx) {
    var name = this.getNodeValue(ctx.variable_identifier());
    this.setNodeValue(ctx, new instance.VariableInstance(name));
};

MPromptoBuilder.prototype.exitRoughlyEqualsExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.ROUGHLY, right));
};


MPromptoBuilder.prototype.exitChildInstance = function(ctx) {
    var parent = this.getNodeValue(ctx.assignable_instance());
    var child = this.getNodeValue(ctx.child_instance());
    child.parent = parent;
    this.setNodeValue(ctx, child);
};


MPromptoBuilder.prototype.exitMemberInstance = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new instance.MemberInstance(name));
};


MPromptoBuilder.prototype.exitItemInstance = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new instance.ItemInstance(exp));
};



MPromptoBuilder.prototype.exitMethod_expression = function(ctx) {
    var exp = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, exp);
};



MPromptoBuilder.prototype.exitMethodExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


MPromptoBuilder.prototype.exitConstructorExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


MPromptoBuilder.prototype.exitNative_statement_list = function(ctx) {
    var items = new statement.StatementList();
    ctx.native_statement().forEach(function (r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


MPromptoBuilder.prototype.exitJava_identifier = function(ctx) {
    this.setNodeValue(ctx, ctx.getText());
};

MPromptoBuilder.prototype.exitJavascript_identifier = function(ctx) {
    var id = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, id);
};

MPromptoBuilder.prototype.exitJavascript_member_expression = function(ctx) {
    var name = ctx.name.getText ();
    this.setNodeValue (ctx, new javascript.JavaScriptMemberExpression(name));
};

MPromptoBuilder.prototype.exitJavascript_primary_expression = function(ctx) {
    var exp = this.getNodeValue (ctx.getChild(0));
    this.setNodeValue (ctx, exp);
};

MPromptoBuilder.prototype.exitJavascript_new_expression = function(ctx) {
    var method = this.getNodeValue(ctx.javascript_method_expression());
    this.setNodeValue (ctx, new javascript.JavaScriptNewExpression(method));
};


MPromptoBuilder.prototype.exitJavascript_this_expression = function(ctx) {
    this.setNodeValue (ctx, new javascript.JavaScriptThisExpression ());
};


MPromptoBuilder.prototype.exitJavaIdentifier = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new java.JavaIdentifierExpression(null, name));
};

MPromptoBuilder.prototype.exitJavaIdentifierExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


MPromptoBuilder.prototype.exitJavaChildIdentifier = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var name = this.getNodeValue(ctx.name);
    var child = new java.JavaIdentifierExpression(parent, name);
    this.setNodeValue(ctx, child);
};

MPromptoBuilder.prototype.exitJavascriptBooleanLiteral = function(ctx) {
    this.setNodeValue(ctx, new javascript.JavaScriptBooleanLiteral(ctx.getText()));
};

MPromptoBuilder.prototype.exitJavascriptCharacterLiteral = function(ctx) {
    this.setNodeValue(ctx, new javascript.JavaScriptCharacterLiteral(ctx.getText()));
};

MPromptoBuilder.prototype.exitJavascriptTextLiteral = function(ctx) {
    this.setNodeValue(ctx, new javascript.JavaScriptTextLiteral(ctx.getText()));
};

MPromptoBuilder.prototype.exitJavascriptIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new javascript.JavaScriptIntegerLiteral(ctx.getText()));
};


MPromptoBuilder.prototype.exitJavascriptDecimalLiteral = function(ctx) {
    this.setNodeValue(ctx, new javascript.JavaScriptDecimalLiteral(ctx.getText()));
};



MPromptoBuilder.prototype.exitJavaClassIdentifier = function(ctx) {
    var klass = this.getNodeValue(ctx.klass);
    this.setNodeValue(ctx, klass);
};


MPromptoBuilder.prototype.exitJavaChildClassIdentifier = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var child = new java.JavaIdentifierExpression(parent, ctx.name.getText());
    this.setNodeValue(ctx, child);
};


MPromptoBuilder.prototype.exitJavaPrimaryExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


MPromptoBuilder.prototype.exitJavascriptPrimaryExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

MPromptoBuilder.prototype.exitJavascript_identifier_expression = function(ctx) {
    var id = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new javascript.JavaScriptIdentifierExpression(id));
};

MPromptoBuilder.prototype.exitJavaSelectorExpression = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var child = this.getNodeValue(ctx.child);
    child.parent = parent;
    this.setNodeValue(ctx, child);
};

MPromptoBuilder.prototype.exitJavascriptSelectorExpression = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var child = this.getNodeValue(ctx.child);
    child.parent = parent;
    this.setNodeValue(ctx, child);
};

MPromptoBuilder.prototype.exitJavaScriptMemberExpression = function(ctx) {
    var id = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new javascript.JavaScriptMemberExpression(id));
};

MPromptoBuilder.prototype.exitJava_primary_expression = function(ctx) {
    var exp = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, exp);
};

MPromptoBuilder.prototype.exitJava_item_expression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new java.JavaItemExpression(exp));
};

MPromptoBuilder.prototype.exitJavascript_item_expression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new javascript.JavaScriptItemExpression(exp));
};

MPromptoBuilder.prototype.exitJavascriptItemExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

MPromptoBuilder.prototype.exitJavaStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var stmt = new java.JavaStatement(exp,false);
    this.setNodeValue(ctx, stmt);
};

MPromptoBuilder.prototype.exitJavascriptStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var stmt = new javascript.JavaScriptStatement(exp,false);
    this.setNodeValue(ctx, stmt);
};


MPromptoBuilder.prototype.exitJavaReturnStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new java.JavaStatement(exp,true));
};


MPromptoBuilder.prototype.exitJavascriptReturnStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new javascript.JavaScriptStatement(exp,true));
};


MPromptoBuilder.prototype.exitJavaNativeStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.java_statement());
    this.setNodeValue(ctx, new java.JavaNativeCall(stmt));
};


MPromptoBuilder.prototype.exitJavaScriptNativeStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.javascript_native_statement());
    this.setNodeValue(ctx, stmt);
};

MPromptoBuilder.prototype.exitJavascript_native_statement = function(ctx) {
    var stmt = this.getNodeValue(ctx.javascript_statement());
    var module = this.getNodeValue(ctx.javascript_module());
    stmt.module = module || null;
    this.setNodeValue(ctx, new javascript.JavaScriptNativeCall(stmt));
}


MPromptoBuilder.prototype.exitNative_method_declaration = function(ctx) {
    var type = this.getNodeValue(ctx.typ);
    var name = this.getNodeValue(ctx.name);
    var args = this.getNodeValue(ctx.args);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new declaration.NativeMethodDeclaration(name, args, type, stmts));
};


MPromptoBuilder.prototype.exitJavaArgumentList = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    this.setNodeValue(ctx, new java.JavaExpressionList(item));
};

MPromptoBuilder.prototype.exitJavascriptArgumentList = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    this.setNodeValue(ctx, new javascript.JavaScriptExpressionList(item));
};

MPromptoBuilder.prototype.exitJavaArgumentListItem = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    var items = this.getNodeValue(ctx.items);
    items.add(item);
    this.setNodeValue(ctx, items);
};

MPromptoBuilder.prototype.exitJavascriptArgumentListItem = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    var items = this.getNodeValue(ctx.items);
    items.add(item);
    this.setNodeValue(ctx, items);
};

MPromptoBuilder.prototype.exitJava_method_expression = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var args = this.getNodeValue(ctx.args);
    this.setNodeValue(ctx, new java.JavaMethodExpression(name, args));
};

MPromptoBuilder.prototype.exitJava_this_expression = function(ctx) {
    this.setNodeValue(ctx, new java.JavaThisExpression());
};

MPromptoBuilder.prototype.exitJavaScriptMethodExpression = function(ctx) {
    var method = this.getNodeValue(ctx.method);
    this.setNodeValue(ctx, method);
};

MPromptoBuilder.prototype.exitJavascript_method_expression = function(ctx) {
    var id = this.getNodeValue(ctx.name);
    var args = this.getNodeValue(ctx.args);
    this.setNodeValue(ctx, new javascript.JavaScriptMethodExpression(id, args));
};

MPromptoBuilder.prototype.exitJavaMethodExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};



MPromptoBuilder.prototype.exitFlush_statement = function(ctx) {
    this.setNodeValue(ctx, new statement.FlushStatement());
};


MPromptoBuilder.prototype.exitFlushStatement = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.stmt));
};


MPromptoBuilder.prototype.exitFullDeclarationList = function(ctx) {
    var items = this.getNodeValue(ctx.declarations()) || new declaration.DeclarationList();
    this.setNodeValue(ctx, items);
};


MPromptoBuilder.prototype.exitDeclaration = function(ctx) {
    var comments = this.readComments(ctx.comment_statement());
    var annotations = this.readAnnotations(ctx.annotation_constructor());
    var ctx_ = ctx.children[ctx.getChildCount()-1];
    var decl = this.getNodeValue(ctx_);
    if(decl!=null) {
        decl.comments = comments;
        decl.annotations = annotations;
        this.setNodeValue(ctx, decl);
    }
};


MPromptoBuilder.prototype.exitDeclarations = function(ctx) {
    var items = new declaration.DeclarationList();
    ctx.declaration().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


MPromptoBuilder.prototype.exitIteratorExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var name = this.getNodeValue(ctx.name);
    var source = this.getNodeValue(ctx.source);
    this.setNodeValue(ctx, new expression.IteratorExpression(name, source, exp));
};


MPromptoBuilder.prototype.exitIteratorType = function(ctx) {
    var typ = this.getNodeValue(ctx.i);
    this.setNodeValue(ctx, new type.IteratorType(typ));
};


MPromptoBuilder.prototype.exitJavaBooleanLiteral = function(ctx) {
    this.setNodeValue(ctx, new java.JavaBooleanLiteral(ctx.getText()));
};


MPromptoBuilder.prototype.exitJavaIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new java.JavaIntegerLiteral(ctx.getText()));
};


MPromptoBuilder.prototype.exitJavaDecimalLiteral = function(ctx) {
    this.setNodeValue(ctx, new java.JavaDecimalLiteral(ctx.getText()));
};


MPromptoBuilder.prototype.exitJavaCharacterLiteral = function(ctx) {
    this.setNodeValue(ctx, new java.JavaCharacterLiteral(ctx.getText()));
};


MPromptoBuilder.prototype.exitJavaTextLiteral = function(ctx) {
    this.setNodeValue(ctx, new java.JavaTextLiteral(ctx.getText()));
};


MPromptoBuilder.prototype.exitJavaCategoryBinding = function(ctx) {
    var map = this.getNodeValue(ctx.binding);
    this.setNodeValue(ctx, new java.JavaNativeCategoryBinding(map));
};

MPromptoBuilder.prototype.exitJavaScriptCategoryBinding = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.binding));
};


MPromptoBuilder.prototype.exitJavascript_category_binding = function(ctx) {
    var identifier = ctx.javascript_identifier().map(function(cx) { return cx.getText(); }).join(".");
    var module = this.getNodeValue(ctx.javascript_module());
    var map = new javascript.JavaScriptNativeCategoryBinding(identifier, module);
    this.setNodeValue(ctx, map);
};


MPromptoBuilder.prototype.exitJavascript_module = function(ctx) {
    var ids = ctx.javascript_identifier().map(function(rule) {
        return rule.getText();
    });
    var module = new javascript.JavaScriptModule(ids);
    this.setNodeValue(ctx, module);
};


MPromptoBuilder.prototype.exitNativeCategoryBindingList = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    var items = new grammar.NativeCategoryBindingList(item);
    this.setNodeValue(ctx, items);
};


MPromptoBuilder.prototype.exitNativeCategoryBindingListItem = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    var items = this.getNodeValue(ctx.items);
    items.add(item);
    this.setNodeValue(ctx, items);
};


MPromptoBuilder.prototype.exitNative_category_bindings = function(ctx) {
    var items = this.getNodeValue(ctx.items);
    this.setNodeValue(ctx, items);
};


MPromptoBuilder.prototype.exitNative_category_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var attrs = this.getNodeValue(ctx.attrs);
    var bindings = this.getNodeValue(ctx.bindings);
    var methods = this.getNodeValue(ctx.methods);
    var decl = new declaration.NativeCategoryDeclaration(name, attrs, bindings, null, methods);
    decl.storable = ctx.STORABLE()!=null;
    this.setNodeValue(ctx, decl);
};


MPromptoBuilder.prototype.exitNative_widget_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var bindings = this.getNodeValue(ctx.bindings);
    var methods = this.getNodeValue(ctx.methods);
    var decl = new declaration.NativeWidgetDeclaration(name, bindings, methods);
    this.setNodeValue(ctx, decl);
};


MPromptoBuilder.prototype.exitNativeCategoryDeclaration = function(ctx) {
    var decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
};


MPromptoBuilder.prototype.exitNative_resource_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var attrs = this.getNodeValue(ctx.attrs);
    var bindings = this.getNodeValue(ctx.bindings);
    var methods = this.getNodeValue(ctx.methods);
    var decl = new declaration.NativeResourceDeclaration(name, attrs, bindings, null, methods);
    decl.storable = ctx.STORABLE()!=null;
    this.setNodeValue(ctx, decl);
};


MPromptoBuilder.prototype.exitResource_declaration = function(ctx) {
    var decl = this.getNodeValue(ctx.native_resource_declaration());
    this.setNodeValue(ctx, decl);
};


MPromptoBuilder.prototype.exitParenthesis_expression = function(ctx) {
    var exp = this.getNodeValue(ctx.expression());
    this.setNodeValue(ctx, new expression.ParenthesisExpression(exp));
};


MPromptoBuilder.prototype.exitParenthesisExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


MPromptoBuilder.prototype.exitNative_symbol_list = function(ctx) {
    var items = new grammar.NativeSymbolList();
    ctx.native_symbol().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


MPromptoBuilder.prototype.exitEnum_native_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var type = this.getNodeValue(ctx.typ);
    var symbols = this.getNodeValue(ctx.symbols);
    this.setNodeValue(ctx, new declaration.EnumeratedNativeDeclaration(name, type, symbols));
};


MPromptoBuilder.prototype.exitFor_each_statement = function(ctx) {
    var name1 = this.getNodeValue(ctx.name1);
    var name2 = this.getNodeValue(ctx.name2);
    var source = this.getNodeValue(ctx.source);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.ForEachStatement(name1, name2, source, stmts));
};


MPromptoBuilder.prototype.exitForEachStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


MPromptoBuilder.prototype.exitKey_token = function(ctx) {
    this.setNodeValue(ctx, ctx.getText());
};


MPromptoBuilder.prototype.exitUUIDLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.UUIDLiteral(ctx.getText()));
};



MPromptoBuilder.prototype.exitUUIDType = function(ctx) {
    this.setNodeValue(ctx, type.UUIDType.instance);
};



MPromptoBuilder.prototype.exitValue_token = function(ctx) {
    this.setNodeValue(ctx, ctx.getText());
};


MPromptoBuilder.prototype.exitNamed_argument = function(ctx) {
    var name = this.getNodeValue(ctx.variable_identifier());
    var arg = new argument.UnresolvedParameter(name);
    var exp = this.getNodeValue(ctx.literal_expression());
    arg.defaultExpression = exp || null;
    this.setNodeValue(ctx, arg);
};


MPromptoBuilder.prototype.exitClosureStatement = function(ctx) {
    var decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, new statement.DeclarationStatement(decl));
};


MPromptoBuilder.prototype.exitReturn_statement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new statement.ReturnStatement(exp));
};


MPromptoBuilder.prototype.exitReturnStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


MPromptoBuilder.prototype.exitClosure_expression = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new expression.MethodExpression(name));
};


MPromptoBuilder.prototype.exitClosureExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


MPromptoBuilder.prototype.exitIf_statement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var stmts = this.getNodeValue(ctx.stmts);
    var elseIfs = this.getNodeValue(ctx.elseIfs);
    var elseStmts = this.getNodeValue(ctx.elseStmts);
    this.setNodeValue(ctx, new statement.IfStatement(exp, stmts, elseIfs, elseStmts));
};


MPromptoBuilder.prototype.exitElseIfStatementList = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var stmts = this.getNodeValue(ctx.stmts);
    var elem = new statement.IfElement(exp, stmts);
    this.setNodeValue(ctx, new statement.IfElementList(elem));
};


MPromptoBuilder.prototype.exitElseIfStatementListItem = function(ctx) {
    var items = this.getNodeValue(ctx.items);
    var exp = this.getNodeValue(ctx.exp);
    var stmts = this.getNodeValue(ctx.stmts);
    var elem = new statement.IfElement(exp, stmts);
    items.add(elem);
    this.setNodeValue(ctx, items);
};


MPromptoBuilder.prototype.exitIfStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


MPromptoBuilder.prototype.exitSwitchStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


MPromptoBuilder.prototype.exitAssignTupleStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


MPromptoBuilder.prototype.exitRaiseStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


MPromptoBuilder.prototype.exitWriteStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


MPromptoBuilder.prototype.exitWithResourceStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


MPromptoBuilder.prototype.exitWhileStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


MPromptoBuilder.prototype.exitDoWhileStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


MPromptoBuilder.prototype.exitTryStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


MPromptoBuilder.prototype.exitEqualsExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.EQUALS, right));
};


MPromptoBuilder.prototype.exitNotEqualsExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.NOT_EQUALS, right));
};


MPromptoBuilder.prototype.exitGreaterThanExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.GT, right));
};


MPromptoBuilder.prototype.exitGreaterThanOrEqualExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.GTE, right));
};


MPromptoBuilder.prototype.exitLessThanExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.LT, right));
};


MPromptoBuilder.prototype.exitLessThanOrEqualExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.LTE, right));
};


MPromptoBuilder.prototype.exitAtomicSwitchCase = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.AtomicSwitchCase(exp, stmts));
};


MPromptoBuilder.prototype.exitCollection_literal = function(ctx) {
    var value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};


MPromptoBuilder.prototype.exitCollectionSwitchCase = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.CollectionSwitchCase(exp, stmts));
};


MPromptoBuilder.prototype.exitSwitch_case_statement_list = function(ctx) {
    var items = new statement.SwitchCaseList();
    ctx.switch_case_statement().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


MPromptoBuilder.prototype.exitSwitch_statement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var cases = this.getNodeValue(ctx.cases);
    var stmts = this.getNodeValue(ctx.stmts);
    var stmt = new statement.SwitchStatement(exp, cases, stmts);
    this.setNodeValue(ctx, stmt);
};


MPromptoBuilder.prototype.exitLiteralRangeLiteral = function(ctx) {
    var low = this.getNodeValue(ctx.low);
    var high = this.getNodeValue(ctx.high);
    this.setNodeValue(ctx, new literal.RangeLiteral(low, high));
};


MPromptoBuilder.prototype.exitLiteralListLiteral = function(ctx) {
    var exp = this.getNodeValue(ctx.literal_list_literal());
    this.setNodeValue(ctx, new literal.ListLiteral(false, exp));
};


MPromptoBuilder.prototype.exitLiteral_list_literal = function(ctx) {
    var items = new utils.ExpressionList();
    ctx.atomic_literal().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


MPromptoBuilder.prototype.exitInExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.IN, right));
};


MPromptoBuilder.prototype.exitNotInExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_IN, right));
};


MPromptoBuilder.prototype.exitCssType = function(ctx) {
    this.setNodeValue(ctx, type.CssType.instance);
};


MPromptoBuilder.prototype.exitHasExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.HAS, right));
};


MPromptoBuilder.prototype.exitNotHasExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_HAS, right));
};


MPromptoBuilder.prototype.exitHasAllExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.HAS_ALL, right));
};


MPromptoBuilder.prototype.exitNotHasAllExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_HAS_ALL, right));
};


MPromptoBuilder.prototype.exitHasAnyExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.HAS_ANY, right));
};


MPromptoBuilder.prototype.exitNotHasAnyExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_HAS_ANY, right));
};


MPromptoBuilder.prototype.exitContainsExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.CONTAINS, right));
};


MPromptoBuilder.prototype.exitNotContainsExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.NOT_CONTAINS, right));
};

MPromptoBuilder.prototype.exitDivideExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.DivideExpression(left, right));
};


MPromptoBuilder.prototype.exitIntDivideExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.IntDivideExpression(left, right));
};


MPromptoBuilder.prototype.exitModuloExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ModuloExpression(left, right));
};


MPromptoBuilder.prototype.exitAnnotation_constructor = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var args = new literal.DictEntryList();
    var exp = this.getNodeValue(ctx.exp);
    if (exp != null) {
        args.add(new literal.DictEntry(null, exp));
    }
    ctx.annotation_argument().map(function(argCtx) {
        var arg = this.getNodeValue(argCtx);
        args.add(arg);
    }, this);
    this.setNodeValue(ctx, new grammar.Annotation(name, args));
};


MPromptoBuilder.prototype.exitAnnotation_argument = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new literal.DictEntry(name, exp));
};


MPromptoBuilder.prototype.exitAnnotation_identifier = function(ctx) {
    this.setNodeValue(ctx, new grammar.Identifier(ctx.getText()));
};


MPromptoBuilder.prototype.exitAnnotation_argument_name = function(ctx) {
    this.setNodeValue(ctx, ctx.getText());
};


MPromptoBuilder.prototype.exitAnnotationLiteralValue = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


MPromptoBuilder.prototype.exitAnnotationTypeValue = function(ctx) {
    var typ = this.getNodeValue(ctx.typ);
    this.setNodeValue(ctx, new expression.TypeExpression(typ));
};


MPromptoBuilder.prototype.exitAndExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.AndExpression(left, right));
};

MPromptoBuilder.prototype.exitNullLiteral = function(ctx) {
    this.setNodeValue(ctx, literal.NullLiteral.instance);
};


MPromptoBuilder.prototype.exitOperator_argument = function(ctx) {
    var value = this.getNodeValue (ctx.getChild (0));
    this.setNodeValue (ctx, value);
};


MPromptoBuilder.prototype.exitOperatorArgument = function(ctx) {
    var arg = this.getNodeValue(ctx.arg);
    arg.mutable = ctx.MUTABLE()!=null;
    this.setNodeValue(ctx, arg);
};


MPromptoBuilder.prototype.exitOperatorPlus = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.PLUS);
};


MPromptoBuilder.prototype.exitOperatorMinus = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.MINUS);
};


MPromptoBuilder.prototype.exitOperatorMultiply = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.MULTIPLY);
};


MPromptoBuilder.prototype.exitOperatorDivide = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.DIVIDE);
};


MPromptoBuilder.prototype.exitOperatorIDivide = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.IDIVIDE);
};


MPromptoBuilder.prototype.exitOperatorModulo = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.MODULO);
};


MPromptoBuilder.prototype.exitNative_member_method_declaration = function(ctx) {
    var value = this.getNodeValue (ctx.getChild (0));
    this.setNodeValue (ctx, value);
};


MPromptoBuilder.prototype.exitOperator_method_declaration= function(ctx) {
    var op = this.getNodeValue(ctx.op);
    var arg = this.getNodeValue(ctx.arg);
    var typ = this.getNodeValue(ctx.typ);
    var stmts = this.getNodeValue(ctx.stmts);
    var decl = new declaration.OperatorMethodDeclaration(op, arg, typ, stmts);
    this.setNodeValue(ctx, decl);
};


MPromptoBuilder.prototype.exitOrder_by = function(ctx) {
    var names = new grammar.IdentifierList();
    ctx.variable_identifier().map( function(ctx_) {
        names.push(this.getNodeValue(ctx_));
    }, this);
    var clause = new grammar.OrderByClause(names, ctx.DESC()!=null);
    this.setNodeValue(ctx, clause);
};

MPromptoBuilder.prototype.exitOrder_by_list = function(ctx) {
     var list = new grammar.OrderByClauseList();
    ctx.order_by().map( function(ctx_) {
        list.add(this.getNodeValue(ctx_));
    }, this);
    this.setNodeValue(ctx, list);
};

MPromptoBuilder.prototype.exitOrExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.OrExpression(left, right));
};


MPromptoBuilder.prototype.exitMultiplyExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.MultiplyExpression(left, right));
};


MPromptoBuilder.prototype.exitMutable_category_type = function(ctx) {
    var typ = this.getNodeValue (ctx.category_type());
    typ.mutable = ctx.MUTABLE()!=null;
    this.setNodeValue(ctx, typ);
};


MPromptoBuilder.prototype.exitMutableInstanceExpression = function(ctx) {
    var source = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new expression.MutableExpression(source));
};


MPromptoBuilder.prototype.exitMutableSelectableExpression = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
};


MPromptoBuilder.prototype.exitMutableSelectorExpression = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var selector = this.getNodeValue(ctx.selector);
    selector.parent = parent;
    this.setNodeValue(ctx, selector);
};


MPromptoBuilder.prototype.exitMinusExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new expression.MinusExpression(exp));
};


MPromptoBuilder.prototype.exitNotExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new expression.NotExpression(exp));
};


MPromptoBuilder.prototype.exitWhile_statement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.WhileStatement(exp, stmts));
};


MPromptoBuilder.prototype.exitDo_while_statement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.DoWhileStatement(exp, stmts));
};

MPromptoBuilder.prototype.exitSingleton_category_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var attrs = this.getNodeValue(ctx.attrs);
    var methods = this.getNodeValue(ctx.methods);
    this.setNodeValue(ctx, new declaration.SingletonCategoryDeclaration(name, attrs, methods));
};

MPromptoBuilder.prototype.exitSingletonCategoryDeclaration = function(ctx) {
    var decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
};

MPromptoBuilder.prototype.exitSliceFirstAndLast = function(ctx) {
    var first = this.getNodeValue(ctx.first);
    var last = this.getNodeValue(ctx.last);
    this.setNodeValue(ctx, new expression.SliceSelector(null, first, last));
};


MPromptoBuilder.prototype.exitSliceFirstOnly = function(ctx) {
    var first = this.getNodeValue(ctx.first);
    this.setNodeValue(ctx, new expression.SliceSelector(null, first, null));
};


MPromptoBuilder.prototype.exitSliceLastOnly = function(ctx) {
    var last = this.getNodeValue(ctx.last);
    this.setNodeValue(ctx, new expression.SliceSelector(null, null, last));
};


MPromptoBuilder.prototype.exitSorted_expression = function(ctx) {
    var source = this.getNodeValue(ctx.source);
    var desc = ctx.DESC()!=null;
    var key = this.getNodeValue(ctx.key);
    this.setNodeValue(ctx, new expression.SortedExpression(source, desc, key));
};


MPromptoBuilder.prototype.exitSorted_key = function(ctx) {
    var exp = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, exp);
};


MPromptoBuilder.prototype.exitDocument_expression = function(ctx) {
    var exp = this.getNodeValue(ctx.expression());
    this.setNodeValue(ctx, new expression.DocumentExpression(exp));
};


MPromptoBuilder.prototype.exitDocumentType = function(ctx) {
    this.setNodeValue(ctx, type.DocumentType.instance);
};


MPromptoBuilder.prototype.exitDocument_literal = function(ctx) {
    var entries = this.getNodeValue(ctx.dict_entry_list());
    var items = entries ? new literal.DocEntryList(entries.items) : null;
    this.setNodeValue(ctx, new literal.DocumentLiteral(items));
};


MPromptoBuilder.prototype.exitFetchStatement = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.stmt));
};


MPromptoBuilder.prototype.exitFetchMany = function(ctx) {
    var category = this.getNodeValue(ctx.typ);
    var predicate = this.getNodeValue(ctx.predicate);
    var start = this.getNodeValue(ctx.xstart);
    var stop = this.getNodeValue(ctx.xstop);
    var orderBy = this.getNodeValue(ctx.orderby);
    this.setNodeValue(ctx, new expression.FetchManyExpression(category, start, stop, predicate, orderBy));
};


MPromptoBuilder.prototype.exitFetchManyAsync = function(ctx) {
    var category = this.getNodeValue(ctx.typ);
    var predicate = this.getNodeValue(ctx.predicate);
    var start = this.getNodeValue(ctx.xstart);
    var stop = this.getNodeValue(ctx.xstop);
    var orderBy = this.getNodeValue(ctx.orderby);
    var name = this.getNodeValue(ctx.name);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.FetchManyStatement(category, start, stop, predicate, orderBy, name, stmts));
};


MPromptoBuilder.prototype.exitFetchOne = function(ctx) {
    var category = this.getNodeValue(ctx.typ);
    var predicate = this.getNodeValue(ctx.predicate);
    this.setNodeValue(ctx, new expression.FetchOneExpression(category, predicate));
};


MPromptoBuilder.prototype.exitFetchOneAsync = function(ctx) {
    var category = this.getNodeValue(ctx.typ);
    var predicate = this.getNodeValue(ctx.predicate);
    var name = this.getNodeValue(ctx.name);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.FetchOneStatement(category, predicate, name, stmts));
};


MPromptoBuilder.prototype.exitFilteredListExpression = function(ctx) {
    var filtered = this.getNodeValue(ctx.filtered_list_suffix());
    var source = this.getNodeValue(ctx.src);
    filtered.source = source;
    this.setNodeValue(ctx, filtered);
};


MPromptoBuilder.prototype.exitFiltered_list_suffix = function(ctx) {
    var itemName = this.getNodeValue(ctx.name);
    var predicate = this.getNodeValue(ctx.predicate);
    this.setNodeValue(ctx, new expression.FilteredExpression(itemName, null, predicate));
};


MPromptoBuilder.prototype.exitCode_type = function(ctx) {
    this.setNodeValue(ctx, type.CodeType.instance);
};


MPromptoBuilder.prototype.exitExecuteExpression = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new expression.ExecuteExpression(name));
};


MPromptoBuilder.prototype.exitExpression_list = function(ctx) {
    var items = new utils.ExpressionList();
    ctx.expression().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


MPromptoBuilder.prototype.exitExpression_tuple = function(ctx) {
    var items = new utils.ExpressionList();
    ctx.expression().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


MPromptoBuilder.prototype.exitCodeExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new expression.CodeExpression(exp));
};


MPromptoBuilder.prototype.exitCategory_or_any_type = function(ctx) {
    var exp = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, exp);
};


MPromptoBuilder.prototype.exitCode_argument = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new argument.CodeParameter(name));
};


MPromptoBuilder.prototype.exitCategory_symbol = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var args = this.getNodeValue(ctx.args);
    this.setNodeValue(ctx, new expression.CategorySymbol(name, args));
};


MPromptoBuilder.prototype.exitCategory_symbol_list = function(ctx) {
    var items = new grammar.CategorySymbolList();
    ctx.category_symbol().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


MPromptoBuilder.prototype.exitEnum_category_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var attrs = this.getNodeValue(ctx.attrs);
    var parent = this.getNodeValue(ctx.derived);
    var derived = parent==null ? null : new grammar.IdentifierList(parent);
    var symbols = this.getNodeValue(ctx.symbols);
    this.setNodeValue(ctx, new declaration.EnumeratedCategoryDeclaration(name, attrs, derived, symbols));
};


MPromptoBuilder.prototype.exitEnum_declaration = function(ctx) {
    var value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};


MPromptoBuilder.prototype.exitRead_all_expression = function(ctx) {
    var source = this.getNodeValue(ctx.source);
    this.setNodeValue(ctx, new expression.ReadAllExpression(source));
};


MPromptoBuilder.prototype.exitRead_one_expression = function(ctx) {
    var source = this.getNodeValue(ctx.source);
    this.setNodeValue(ctx, new expression.ReadOneExpression(source));
};


MPromptoBuilder.prototype.exitRepl = function(ctx) {
    var value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};


MPromptoBuilder.prototype.exitWith_singleton_statement = function(ctx) {
    var name = this.getNodeValue(ctx.typ);
    var typ = new type.CategoryType(name);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.WithSingletonStatement(typ, stmts));
};


MPromptoBuilder.prototype.exitWithSingletonStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};

MPromptoBuilder.prototype.exitWrite_statement = function(ctx) {
    var what = this.getNodeValue(ctx.what);
    var target = this.getNodeValue(ctx.target);
    this.setNodeValue(ctx, new statement.WriteStatement(what, target));
};


MPromptoBuilder.prototype.exitWith_resource_statement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.WithResourceStatement(stmt, stmts));
};


MPromptoBuilder.prototype.exitAnyType = function(ctx) {
    this.setNodeValue(ctx, type.AnyType.instance);
};


MPromptoBuilder.prototype.exitAnyListType = function(ctx) {
    var type = this.getNodeValue(ctx.typ);
    this.setNodeValue(ctx, new type.ListType(type));
};


MPromptoBuilder.prototype.exitAnyDictType = function(ctx) {
    var type = this.getNodeValue(ctx.typ);
    this.setNodeValue(ctx, new type.DictType(type));
};


MPromptoBuilder.prototype.exitCastExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var type = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.CastExpression(left, type));
}

MPromptoBuilder.prototype.exitCatchAtomicStatement = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.AtomicSwitchCase(new expression.SymbolExpression(name), stmts));
};


MPromptoBuilder.prototype.exitCatchCollectionStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.CollectionSwitchCase(exp, stmts));
};


MPromptoBuilder.prototype.exitCatch_statement_list = function(ctx) {
    var items = new statement.SwitchCaseList();
    ctx.catch_statement().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


MPromptoBuilder.prototype.exitTry_statement = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var stmts = this.getNodeValue(ctx.stmts);
    var handlers = this.getNodeValue(ctx.handlers);
    var anyStmts = this.getNodeValue(ctx.anyStmts);
    var finalStmts = this.getNodeValue(ctx.finalStmts);
    var stmt = new statement.SwitchErrorStatement(name, stmts, handlers, anyStmts, finalStmts);
    this.setNodeValue(ctx, stmt);
};


MPromptoBuilder.prototype.exitRaise_statement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new statement.RaiseStatement(exp));
};

MPromptoBuilder.prototype.exitMatchingList = function(ctx) {
    var exp = this.getNodeValue(ctx.source);
    this.setNodeValue(ctx, new constraint.MatchingCollectionConstraint(exp));
};

MPromptoBuilder.prototype.exitMatchingRange = function(ctx) {
    var exp = this.getNodeValue(ctx.source);
    this.setNodeValue(ctx, new constraint.MatchingCollectionConstraint(exp));
};

MPromptoBuilder.prototype.exitMatchingExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new constraint.MatchingExpressionConstraint(exp));
};

MPromptoBuilder.prototype.exitMatchingPattern = function(ctx) {
    this.setNodeValue(ctx, new constraint.MatchingPatternConstraint(new literal.TextLiteral(ctx.text.text)));
};

MPromptoBuilder.prototype.exitLiteralSetLiteral = function(ctx) {
    var items = this.getNodeValue(ctx.literal_list_literal());
    this.setNodeValue(ctx, new literal.SetLiteral(items));
};

MPromptoBuilder.prototype.exitCsharp_identifier = function(ctx) {
    this.setNodeValue(ctx, ctx.getText());
};

MPromptoBuilder.prototype.exitCSharpIdentifier = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new csharp.CSharpIdentifierExpression(null, name));
};

MPromptoBuilder.prototype.exitCSharpChildIdentifier = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var name = this.getNodeValue(ctx.name);
    var child = new csharp.CSharpIdentifierExpression(parent, name);
    this.setNodeValue(ctx, child);
};

MPromptoBuilder.prototype.exitCSharpBooleanLiteral = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpBooleanLiteral(ctx.getText()));
};


MPromptoBuilder.prototype.exitCSharpIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpIntegerLiteral(ctx.getText()));
};


MPromptoBuilder.prototype.exitCSharpDecimalLiteral = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpDecimalLiteral(ctx.getText()));
};


MPromptoBuilder.prototype.exitCSharpCharacterLiteral = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpCharacterLiteral(ctx.getText()));
};


MPromptoBuilder.prototype.exitCSharpTextLiteral = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpTextLiteral(ctx.getText()));
};


MPromptoBuilder.prototype.exitCSharpCategoryBinding = function(ctx) {
    var binding = this.getNodeValue(ctx.binding);
    this.setNodeValue(ctx, new csharp.CSharpNativeCategoryBinding(binding));
};

MPromptoBuilder.prototype.exitCsharp_primary_expression = function(ctx) {
    var value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};

MPromptoBuilder.prototype.exitCsharp_this_expression = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpThisExpression());
};

MPromptoBuilder.prototype.exitCsharp_method_expression = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var args = this.getNodeValue(ctx.args);
    this.setNodeValue(ctx, new csharp.CSharpMethodExpression(name, args));
};

MPromptoBuilder.prototype.exitCSharpMethodExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

MPromptoBuilder.prototype.exitCSharpArgumentList = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    this.setNodeValue(ctx, new csharp.CSharpExpressionList(item));
};

MPromptoBuilder.prototype.exitCSharpArgumentListItem = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    var items = this.getNodeValue(ctx.items);
    items.add(item);
    this.setNodeValue(ctx, items);
};

MPromptoBuilder.prototype.exitCSharpNativeStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.csharp_statement());
    var call = new csharp.CSharpNativeCall(stmt);
    this.setNodeValue(ctx, call);
};


MPromptoBuilder.prototype.exitCSharpPromptoIdentifier = function(ctx) {
    var name = ctx.DOLLAR_IDENTIFIER().getText();
    this.setNodeValue(ctx, new csharp.CSharpIdentifierExpression(null, name));
};


MPromptoBuilder.prototype.exitCSharpPrimaryExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

MPromptoBuilder.prototype.exitCSharpSelectorExpression = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var child = this.getNodeValue(ctx.child);
    child.parent = parent;
    this.setNodeValue(ctx, child);
};

MPromptoBuilder.prototype.exitCSharpStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var stmt = new csharp.CSharpStatement(exp,false);
    this.setNodeValue(ctx, stmt);
};

MPromptoBuilder.prototype.exitCSharpReturnStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new csharp.CSharpStatement(exp,true));
};


MPromptoBuilder.prototype.exitPythonStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new python.PythonStatement(exp,false));
};

MPromptoBuilder.prototype.exitPythonReturnStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new python.PythonStatement(exp,true));
};

MPromptoBuilder.prototype.exitPython2CategoryBinding = function(ctx) {
    var map = this.getNodeValue(ctx.binding);
    this.setNodeValue(ctx, new python.Python2NativeCategoryBinding(map));
};


MPromptoBuilder.prototype.exitPython3CategoryBinding = function(ctx) {
    var map = this.getNodeValue(ctx.binding);
    this.setNodeValue(ctx, new python.Python3NativeCategoryBinding(map));
};


MPromptoBuilder.prototype.exitPython_category_binding = function(ctx) {
    var identifier = ctx.identifier().getText();
    var module = this.getNodeValue(ctx.python_module());
    var map = new python.PythonNativeCategoryBinding(identifier, module);
    this.setNodeValue(ctx, map);
};

MPromptoBuilder.prototype.exitPython_method_expression = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var args = this.getNodeValue(ctx.args);
    var method = new python.PythonMethodExpression(name, args);
    this.setNodeValue(ctx, method);
};

MPromptoBuilder.prototype.exitPythonGlobalMethodExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

MPromptoBuilder.prototype.exitPythonMethodExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

MPromptoBuilder.prototype.exitPython_module = function(ctx) {
    var ids = ctx.python_identifier().map(function(rule) {
        return rule.getText();
    });
    var module = new python.PythonModule(ids);
    this.setNodeValue(ctx, module);
};

MPromptoBuilder.prototype.exitPython2NativeStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.python_native_statement());
    this.setNodeValue(ctx, new python.Python2NativeCall(stmt));
};


MPromptoBuilder.prototype.exitPython3NativeStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.python_native_statement());
    this.setNodeValue(ctx, new python.Python3NativeCall(stmt));
};

MPromptoBuilder.prototype.exitPython_native_statement = function(ctx) {
    var stmt = this.getNodeValue(ctx.python_statement());
    var module = this.getNodeValue(ctx.python_module());
    stmt.module = module || null;
    this.setNodeValue(ctx, new python.PythonNativeCall(stmt));
}

MPromptoBuilder.prototype.exitPython_identifier = function(ctx) {
    this.setNodeValue(ctx, ctx.getText());
};

MPromptoBuilder.prototype.exitPythonIdentifier = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new python.PythonIdentifierExpression(null, name));
};

MPromptoBuilder.prototype.exitPythonIdentifierExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

MPromptoBuilder.prototype.exitPythonChildIdentifier = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var name = this.getNodeValue(ctx.name);
    var child = new python.PythonIdentifierExpression(parent, name);
    this.setNodeValue(ctx, child);
};


MPromptoBuilder.prototype.exitPythonBooleanLiteral = function(ctx) {
    this.setNodeValue(ctx, new python.PythonBooleanLiteral(ctx.getText()));
};

MPromptoBuilder.prototype.exitPythonIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new python.PythonIntegerLiteral(ctx.getText()));
};


MPromptoBuilder.prototype.exitPythonDecimalLiteral = function(ctx) {
    this.setNodeValue(ctx, new python.PythonDecimalLiteral(ctx.getText()));
};

MPromptoBuilder.prototype.exitPythonCharacterLiteral = function(ctx) {
    this.setNodeValue(ctx, new python.PythonCharacterLiteral(ctx.getText()));
};


MPromptoBuilder.prototype.exitPythonTextLiteral = function(ctx) {
    this.setNodeValue(ctx, new python.PythonTextLiteral(ctx.getText()));
};

MPromptoBuilder.prototype.exitPythonLiteralExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


MPromptoBuilder.prototype.exitPythonPromptoIdentifier = function(ctx) {
    var name = ctx.DOLLAR_IDENTIFIER().getText();
    this.setNodeValue(ctx, new python.PythonIdentifierExpression(null, name));
};


MPromptoBuilder.prototype.exitPythonPrimaryExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

MPromptoBuilder.prototype.exitPythonArgumentList = function(ctx) {
    var ordinal = this.getNodeValue(ctx.ordinal);
    var named = this.getNodeValue(ctx.named);
    ordinal.addAll(named);
    this.setNodeValue(ctx, ordinal);
};


MPromptoBuilder.prototype.exitPythonNamedOnlyArgumentList = function(ctx) {
    var named = this.getNodeValue(ctx.named);
    this.setNodeValue(ctx, named);
};

MPromptoBuilder.prototype.exitPythonNamedArgumentList = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var exp = this.getNodeValue(ctx.exp);
    var arg = new python.PythonNamedArgument(name, exp);
    this.setNodeValue(ctx, new python.PythonArgumentList(arg));
};

MPromptoBuilder.prototype.exitPythonNamedArgumentListItem = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var exp = this.getNodeValue(ctx.exp);
    var arg = new python.PythonNamedArgument(name, exp);
    var items = this.getNodeValue(ctx.items);
    items.add(arg);
    this.setNodeValue(ctx, items);
};

MPromptoBuilder.prototype.exitPythonOrdinalOnlyArgumentList = function(ctx) {
    var ordinal = this.getNodeValue(ctx.ordinal);
    this.setNodeValue(ctx, ordinal);
};

MPromptoBuilder.prototype.exitPythonOrdinalArgumentList = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    var arg = new python.PythonOrdinalArgument(item);
    this.setNodeValue(ctx, new python.PythonArgumentList(arg));
};

MPromptoBuilder.prototype.exitPythonOrdinalOnlyArgumentList = function(ctx) {
    var ordinal = this.getNodeValue(ctx.ordinal);
    this.setNodeValue(ctx, ordinal);
};


MPromptoBuilder.prototype.exitPythonSelectorExpression = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var selector = this.getNodeValue(ctx.child);
    selector.parent = parent;
    this.setNodeValue(ctx, selector);
};


MPromptoBuilder.prototype.exitPythonSelfExpression = function(ctx) {
    this.setNodeValue(ctx, new python.PythonSelfExpression());
};



MPromptoBuilder.prototype.exitJsxChild = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.jsx));
};



MPromptoBuilder.prototype.exitJsxCode = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new jsx.JsxCode(exp));
};



MPromptoBuilder.prototype.exitJsxExpression = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
};



MPromptoBuilder.prototype.exitJsxElement = function(ctx) {
    var elem = this.getNodeValue(ctx.opening);
    var closing = this.getNodeValue(ctx.closing);
    elem.setClosing(closing);
    var children = this.getNodeValue(ctx.children_);
    elem.setChildren(children);
    this.setNodeValue(ctx, elem);
};


MPromptoBuilder.prototype.exitJsxSelfClosing = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.jsx));
};



MPromptoBuilder.prototype.exitJsxText = function(ctx) {
    var text = parser.ParserUtils.getFullText(ctx.text);
    this.setNodeValue(ctx, new jsx.JsxText(text));
};



MPromptoBuilder.prototype.exitJsxValue = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new jsx.JsxExpression(exp));
};


MPromptoBuilder.prototype.exitJsx_attribute = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var value = this.getNodeValue(ctx.value);
    var suite = this.getWhiteSpacePlus(ctx.ws_plus());
    this.setNodeValue(ctx, new jsx.JsxProperty(name, value, suite));
};



MPromptoBuilder.prototype.exitJsx_children = function(ctx) {
    var list = ctx.jsx_child()
        .map(cx => this.getNodeValue(cx), this);
    this.setNodeValue(ctx, list);
};


MPromptoBuilder.prototype.exitJsx_element_name = function(ctx) {
    var name = ctx.getText();
    this.setNodeValue(ctx, new grammar.Identifier(name));
};


MPromptoBuilder.prototype.exitJsx_expression = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.getChild(0)));
};


MPromptoBuilder.prototype.exitJsx_identifier = function(ctx) {
    var name = ctx.getText();
    this.setNodeValue(ctx, new grammar.Identifier(name));
};


MPromptoBuilder.prototype.exitJsx_fragment = function(ctx) {
    var openingSuite = this.getWhiteSpacePlus(ctx.ws_plus(0));
    var fragment = new jsx.JsxFragment(openingSuite);
    fragment.children = this.getNodeValue(ctx.children_);
    this.setNodeValue(ctx, fragment);
};


MPromptoBuilder.prototype.exitJsxLiteral = function(ctx) {
    var text = ctx.getText();
    this.setNodeValue(ctx, new jsx.JsxLiteral(text));
};


MPromptoBuilder.prototype.exitJsx_opening = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var nameSuite = this.getWhiteSpacePlus(ctx.ws_plus());
    var attributes = ctx.jsx_attribute()
        .map(function(cx) { return this.getNodeValue(cx); }, this);
    this.setNodeValue(ctx, new jsx.JsxElement(name, nameSuite, attributes, null));
};



MPromptoBuilder.prototype.exitJsx_closing = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new jsx.JsxClosing(name, null));
};


MPromptoBuilder.prototype.exitJsx_self_closing = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var nameSuite = this.getWhiteSpacePlus(ctx.ws_plus());
    var attributes = ctx.jsx_attribute()
        .map(function(cx) { return this.getNodeValue(cx); }, this);
    this.setNodeValue(ctx, new jsx.JsxSelfClosing(name, nameSuite, attributes, null));
};


MPromptoBuilder.prototype.exitCssExpression = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
}


MPromptoBuilder.prototype.exitCss_expression = function(ctx) {
    var exp = new css.CssExpression();
    ctx.css_field().forEach(function(cx) {
        var field = this.getNodeValue(cx);
        exp.addField(field);
    }, this);
    this.setNodeValue(ctx, exp);
};


MPromptoBuilder.prototype.exitCss_field = function(ctx) {
    var name = ctx.name.getText();
    var value = this.getNodeValue(ctx.value);
    this.setNodeValue(ctx, new css.CssField(name, value));
};



MPromptoBuilder.prototype.exitCssText = function(ctx) {
    var text = ctx.text.getText();
    this.setNodeValue(ctx, new css.CssText(text));
};


MPromptoBuilder.prototype.exitCssValue = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new css.CssCode(exp));
};


MPromptoBuilder.prototype.buildSection = function(node, section) {
    var first = this.findFirstValidToken(node.start.tokenIndex, section instanceof jsx.JsxText);
    var last = this.findLastValidToken(node.stop.tokenIndex, section instanceof jsx.JsxText);
    section.setSectionFrom(this.path, first, last, parser.Dialect.M);
};

MPromptoBuilder.prototype.findFirstValidToken = function(idx, allowWS) {
    if(idx===-1) { // happens because input.index() is called before any other read operation (bug?)
        idx = 0;
    }
    do {
        var token = this.readValidToken(idx++, allowWS);
        if(token!==null) {
            return token;
        }
    } while(idx<this.input.tokenSource.size);
    return null;
};

MPromptoBuilder.prototype.findLastValidToken = function(idx, allowWS) {
    if(idx===-1) { // happens because input.index() is called before any other read operation (bug?)
        idx = 0;
    }
    while(idx>=0) {
        var token = this.readValidToken(idx--, allowWS);
        if(token!==null) {
            return token;
        }
    }
    return null;
};

MPromptoBuilder.prototype.readValidToken = function(idx, allowWS) {
    var token = this.input.get(idx);
    var text = token.text;
    // ignore trailing whitespace
    if(text!==null && (allowWS || text.replace(/(\n|\r|\t|' ')/g,"").length>0)) {
        return token;
    } else {
        return null;
    }
};

exports.MPromptoBuilder = MPromptoBuilder;
