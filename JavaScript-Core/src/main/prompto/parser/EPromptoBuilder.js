var argument = require("../param/index");
var constraint = require("../constraint/index");
var instance = require("../instance/index");
var declaration = require("../declaration/index");
var expression = require("../expression/index");
var javascript = require("../javascript/index");
var statement = require("../statement/index");
var literal = require("../literal/index");
var grammar = require("../grammar/index");
var param = require("../param/index");
var utils = require("../utils/index");
var parser = require("../parser/index");
var type = require("../type/index");
var jsx = require("../jsx/index");
var css = require("../css/index");
var java = require("../java/index");
var csharp = require("../csharp/index");
var python = require("../python/index");

function EPromptoBuilder(eparser) {
    parser.EParserListener.call(this);
    this.input = eparser.getTokenStream();
    this.path = eparser.path;
    this.nodeValues = {};
    this.nextNodeId = 0;
    return this;
}

EPromptoBuilder.prototype = Object.create(parser.EParserListener.prototype);
EPromptoBuilder.prototype.constructor = EPromptoBuilder;

 
EPromptoBuilder.prototype.setNodeValue = function(node, value) {
    if(node["%id"]===undefined)
        node["%id"] = this.nextNodeId++;
    this.nodeValues[node["%id"]] = value;
    if(value instanceof parser.Section) {
        this.buildSection(node, value);
    }
};

EPromptoBuilder.prototype.getNodeValue = function(node) {
    if(node==null || node===undefined || node["%id"]===null || node["%id"]===undefined)
        return null;
    else
        return this.nodeValues[node["%id"]];
};


EPromptoBuilder.prototype.getHiddenTokensBefore = function(token) {
    var hidden = this.input.getHiddenTokensToLeft(token.tokenIndex);
    return this.getHiddenTokensText(hidden);
};

EPromptoBuilder.prototype.getHiddenTokensAfter = function(token) {
    if(token.tokenIndex<0)
        return null;
    var hidden = this.input.getHiddenTokensToRight(token.tokenIndex);
    return this.getHiddenTokensText(hidden);
};


EPromptoBuilder.prototype.getHiddenTokensText = function(hidden) {
    if(hidden==null || hidden.length===0)
        return null;
    else
        return hidden.map(function(token) { return token.text; }).join("");
};

EPromptoBuilder.prototype.getWhiteSpacePlus = function(ctx) {
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

EPromptoBuilder.prototype.isNotIndent = function(tree) {
    return !tree.symbol || tree.symbol.type!=parser.EParser.INDENT;
}

EPromptoBuilder.prototype.readAnnotations = function(ctxs) {
    var annotations = ctxs.map(function (csc) {
        return this.getNodeValue(csc);
    }, this);
    return (annotations.length == 0) ? null : annotations;
};


EPromptoBuilder.prototype.readComments = function(ctxs) {
    var comments = ctxs.map(function (csc) {
        return this.getNodeValue(csc);
    }, this);
    return (comments.length == 0) ? null : comments;
};


EPromptoBuilder.prototype.exitIdentifierExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new expression.UnresolvedIdentifier(exp));
};

EPromptoBuilder.prototype.exitTypeIdentifier = function(ctx) {
    var name = this.getNodeValue(ctx.type_identifier());
    this.setNodeValue(ctx, name);
};

EPromptoBuilder.prototype.exitMethodCallExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp1 || ctx.exp2);
    var args = this.getNodeValue(ctx.args);
    var call = new statement.UnresolvedCall(exp, args);
    this.setNodeValue(ctx, call);
};


EPromptoBuilder.prototype.exitUnresolvedExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitUnresolvedIdentifier = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new expression.UnresolvedIdentifier(name));
};

EPromptoBuilder.prototype.exitUnresolvedSelector = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var selector = this.getNodeValue(ctx.selector);
    selector.parent = parent;
    this.setNodeValue(ctx, selector);
};


EPromptoBuilder.prototype.exitUnresolved_selector = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new expression.MemberSelector(null, name));
};



EPromptoBuilder.prototype.exitUUIDLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.UUIDLiteral(ctx.getText()));
};



EPromptoBuilder.prototype.exitUUIDType = function(ctx) {
    this.setNodeValue(ctx, type.UUIDType.instance);
};


EPromptoBuilder.prototype.exitCommentStatement = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.comment_statement()));
};


EPromptoBuilder.prototype.exitComment_statement = function(ctx) {
    this.setNodeValue(ctx, new statement.CommentStatement(ctx.getText()));
};


EPromptoBuilder.prototype.exitBlob_expression = function(ctx) {
    var exp = this.getNodeValue(ctx.expression());
    this.setNodeValue(ctx, new expression.BlobExpression(exp));
};


EPromptoBuilder.prototype.exitBlobExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitBlobType = function(ctx) {
    this.setNodeValue(ctx, type.BlobType.instance);
};


EPromptoBuilder.prototype.exitBooleanLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.BooleanLiteral(ctx.getText()));
};


EPromptoBuilder.prototype.exitBreakStatement = function(ctx) {
    this.setNodeValue(ctx, new statement.BreakStatement());
};


EPromptoBuilder.prototype.exitMinIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.MinIntegerLiteral());
};


EPromptoBuilder.prototype.exitMaxIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.MaxIntegerLiteral());
};


EPromptoBuilder.prototype.exitIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.IntegerLiteral(ctx.getText()));
};


EPromptoBuilder.prototype.exitDecimalLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.DecimalLiteral(ctx.getText()));
};

EPromptoBuilder.prototype.exitHexadecimalLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.HexaLiteral(ctx.getText()));
};


EPromptoBuilder.prototype.exitCharacterLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.CharacterLiteral(ctx.getText()));
};

EPromptoBuilder.prototype.exitDateLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.DateLiteral(ctx.getText()));
};


EPromptoBuilder.prototype.exitDateTimeLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.DateTimeLiteral(ctx.getText()));
};

EPromptoBuilder.prototype.exitTernaryExpression = function(ctx) {
    var condition = this.getNodeValue(ctx.test);
    var ifTrue = this.getNodeValue(ctx.ifTrue);
    var ifFalse = this.getNodeValue(ctx.ifFalse);
    var exp = new expression.TernaryExpression(condition, ifTrue, ifFalse);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitTest_method_declaration = function(ctx) {
    var name = new grammar.Identifier(ctx.name.text);
    name.setSectionFrom(this.path, ctx.name, ctx.name, parser.Dialect.E);
    var stmts = this.getNodeValue(ctx.stmts);
    var exps = this.getNodeValue(ctx.exps);
    var errorName = this.getNodeValue(ctx.error);
    var error = errorName==null ? null : new expression.SymbolExpression(errorName);
    this.setNodeValue(ctx, new declaration.TestMethodDeclaration(name, stmts, exps, error));
};

EPromptoBuilder.prototype.exitTextLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.TextLiteral(ctx.getText()));
};

EPromptoBuilder.prototype.exitTimeLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.TimeLiteral(ctx.getText()));
};


EPromptoBuilder.prototype.exitPeriodLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.PeriodLiteral(ctx.getText()));
};


EPromptoBuilder.prototype.exitPeriodType = function(ctx) {
    this.setNodeValue(ctx, type.PeriodType.instance);
};


EPromptoBuilder.prototype.exitVersionLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.VersionLiteral(ctx.getText()));
};


EPromptoBuilder.prototype.exitVersionType = function(ctx) {
    this.setNodeValue(ctx, type.VersionType.instance);
};


EPromptoBuilder.prototype.exitAttribute_identifier = function(ctx) {
    var name = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, name);
};

EPromptoBuilder.prototype.exitVariable_identifier = function(ctx) {
    var name = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, name);
};

EPromptoBuilder.prototype.exitList_literal = function(ctx) {
    var mutable = ctx.MUTABLE() !== null;
    var items = this.getNodeValue(ctx.expression_list()) || null;
    var value = new literal.ListLiteral(mutable, items);
    this.setNodeValue(ctx, value);
};

EPromptoBuilder.prototype.exitDict_literal = function(ctx) {
    var mutable = ctx.MUTABLE() !== null;
    var items = this.getNodeValue(ctx.dict_entry_list()) || null;
    var value = new literal.DictLiteral(mutable, items);
    this.setNodeValue(ctx, value);
};

EPromptoBuilder.prototype.exitTuple_literal = function(ctx) {
    var mutable = ctx.MUTABLE() !== null;
    var items = this.getNodeValue(ctx.expression_tuple()) || null;
    var value = new literal.TupleLiteral(mutable, items);
    this.setNodeValue(ctx, value);
};


EPromptoBuilder.prototype.exitRange_literal = function(ctx) {
    var low = this.getNodeValue(ctx.low);
    var high = this.getNodeValue(ctx.high);
    this.setNodeValue(ctx, new literal.RangeLiteral(low, high));
};



EPromptoBuilder.prototype.exitDict_entry_list = function(ctx) {
    var items = new literal.DictEntryList(null, null);
    ctx.dict_entry().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitDict_entry = function(ctx) {
    var key = this.getNodeValue(ctx.key);
    var value = this.getNodeValue(ctx.value);
    var entry = new literal.DictEntry(key, value);
    this.setNodeValue(ctx, entry);
};

EPromptoBuilder.prototype.exitLiteral_expression = function(ctx) {
    var exp = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitLiteralExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitVariableIdentifier = function(ctx) {
    var name = this.getNodeValue(ctx.variable_identifier());
    this.setNodeValue(ctx, name);
};


EPromptoBuilder.prototype.exitSymbol_identifier = function(ctx) {
    var name = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, name);
};


EPromptoBuilder.prototype.exitNative_symbol = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new expression.NativeSymbol(name, exp));
};


EPromptoBuilder.prototype.exitSymbolIdentifier = function(ctx) {
    var name = this.getNodeValue(ctx.symbol_identifier());
    this.setNodeValue(ctx, name);
};


EPromptoBuilder.prototype.exitSymbolLiteral = function(ctx) {
    var name = ctx.getText();
    this.setNodeValue(ctx, new expression.SymbolExpression(new grammar.Identifier(name)));
};


EPromptoBuilder.prototype.exitBlobType = function(ctx) {
    this.setNodeValue(ctx, type.BlobType.instance);
};

EPromptoBuilder.prototype.exitBooleanType = function(ctx) {
    this.setNodeValue(ctx, type.BooleanType.instance);
};


EPromptoBuilder.prototype.exitCharacterType = function(ctx) {
    this.setNodeValue(ctx, type.CharacterType.instance);
};

EPromptoBuilder.prototype.exitImageType = function(ctx) {
    this.setNodeValue(ctx, type.ImageType.instance);
};


EPromptoBuilder.prototype.exitTextType = function(ctx) {
    this.setNodeValue(ctx, type.TextType.instance);
};


EPromptoBuilder.prototype.exitHtmlType = function(ctx) {
    this.setNodeValue(ctx, type.HtmlType.instance);
};


EPromptoBuilder.prototype.exitThisExpression = function(ctx) {
    this.setNodeValue(ctx, new expression.ThisExpression());
};

EPromptoBuilder.prototype.exitIntegerType = function(ctx) {
    this.setNodeValue(ctx, type.IntegerType.instance);
};

EPromptoBuilder.prototype.exitDecimalType = function(ctx) {
    this.setNodeValue(ctx, type.DecimalType.instance);
};


EPromptoBuilder.prototype.exitDateType = function(ctx) {
    this.setNodeValue(ctx, type.DateType.instance);
};


EPromptoBuilder.prototype.exitDateTimeType = function(ctx) {
    this.setNodeValue(ctx, type.DateTimeType.instance);
};


EPromptoBuilder.prototype.exitTimeType = function(ctx) {
    this.setNodeValue(ctx, type.TimeType.instance);
};


EPromptoBuilder.prototype.exitCodeType = function(ctx) {
    this.setNodeValue(ctx, type.CodeType.instance);
};


EPromptoBuilder.prototype.exitPrimaryType = function(ctx) {
    var type = this.getNodeValue(ctx.p);
    this.setNodeValue(ctx, type);
};


EPromptoBuilder.prototype.exitAttribute_declaration = function(ctx) {
    var id = this.getNodeValue(ctx.name);
    var type = this.getNodeValue(ctx.typ);
    var match = this.getNodeValue(ctx.match);
    var indices = null;
    if (ctx.indices !=null)
        indices = indices = this.getNodeValue(ctx.indices);
    else if(ctx.INDEX()!=null)
        indices =  new grammar.IdentifierList();
    if (ctx.index !=null)
        indices.push(this.getNodeValue(ctx.index))
    var decl = new declaration.AttributeDeclaration(id, type, match, indices);
    decl.storable = ctx.STORABLE()!=null;
    this.setNodeValue(ctx, decl);
};

EPromptoBuilder.prototype.exitNativeType = function(ctx) {
    var type = this.getNodeValue(ctx.n);
    this.setNodeValue(ctx, type);
};

EPromptoBuilder.prototype.exitCategoryType = function(ctx) {
    var type = this.getNodeValue(ctx.c);
    this.setNodeValue(ctx, type);
};


EPromptoBuilder.prototype.exitCategory_type = function(ctx) {
    var name = new grammar.Identifier(ctx.getText());
    this.buildSection(ctx, name);
    this.setNodeValue(ctx, new type.CategoryType(name));
};

EPromptoBuilder.prototype.exitListType = function(ctx) {
    var typ = this.getNodeValue(ctx.l);
    this.setNodeValue(ctx, new type.ListType(typ));
};

EPromptoBuilder.prototype.exitDictKeyIdentifier = function(ctx) {
    var text = ctx.name.getText();
    this.setNodeValue(ctx, new literal.DictIdentifierKey(new grammar.Identifier(text)));
};

EPromptoBuilder.prototype.exitDictKeyText = function(ctx) {
    var text = ctx.name.text;
    this.setNodeValue(ctx, new literal.DictTextKey(text));
};

EPromptoBuilder.prototype.exitDictType = function(ctx) {
    var typ = this.getNodeValue(ctx.d);
    this.setNodeValue(ctx, new type.DictionaryType(typ));
};

EPromptoBuilder.prototype.exitAttributeList = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    this.setNodeValue(ctx, new grammar.IdentifierList(item));
};


EPromptoBuilder.prototype.exitAttributeListItem = function(ctx) {
    var items = this.getNodeValue(ctx.items);
    var item = this.getNodeValue(ctx.item);
    items.add(item);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitAttribute_identifier_list = function(ctx) {
    var list = new grammar.IdentifierList();
    var rules = ctx.attribute_identifier();
    rules.forEach(function(rule) {
        var item = this.getNodeValue(rule);
        list.add(item);
    }, this);
    this.setNodeValue(ctx, list);
};


EPromptoBuilder.prototype.exitVariable_identifier_list = function(ctx) {
    var list = new grammar.IdentifierList();
    var rules = ctx.variable_identifier();
    rules.forEach(function(rule) {
        var item = this.getNodeValue(rule);
        list.add(item);
    }, this);
    this.setNodeValue(ctx, list);
};




EPromptoBuilder.prototype.exitConcrete_category_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var attrs = this.getNodeValue(ctx.attrs) || null;
    var derived = this.getNodeValue(ctx.derived) || null;
    var methods = this.getNodeValue(ctx.methods) || null;
    var decl = new declaration.ConcreteCategoryDeclaration(name, attrs, derived, methods);
    decl.storable = ctx.STORABLE()!=null;
    this.setNodeValue(ctx, decl);
};



EPromptoBuilder.prototype.exitConcrete_widget_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var derived = this.getNodeValue(ctx.derived);
    var methods = this.getNodeValue(ctx.methods);
    var decl = new declaration.ConcreteWidgetDeclaration(name, derived, methods);
    this.setNodeValue(ctx, decl);
};


EPromptoBuilder.prototype.exitConcreteCategoryDeclaration = function(ctx) {
    var decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
};


EPromptoBuilder.prototype.exitConcreteWidgetDeclaration = function(ctx) {
    var decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
};


EPromptoBuilder.prototype.exitNativeWidgetDeclaration = function(ctx) {
    var decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
};


EPromptoBuilder.prototype.exitDerivedList = function(ctx) {
    var items = this.getNodeValue(ctx.items);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitDerivedListItem = function(ctx) {
    var items = this.getNodeValue(ctx.items);
    var item = this.getNodeValue(ctx.item);
    items.add(item);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitType_identifier = function(ctx) {
    var name = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, name);
};


EPromptoBuilder.prototype.exitType_identifier_list = function(ctx) {
    var items = new grammar.IdentifierList();
    ctx.type_identifier().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitType_literal = function(ctx) {
    var type = this.getNodeValue(ctx.category_or_any_type());
    this.setNodeValue(ctx, new literal.TypeLiteral(type));
};


EPromptoBuilder.prototype.exitTypeLiteral = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.type_literal()));
};


EPromptoBuilder.prototype.exitInstanceExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitSelectableExpression = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    this.setNodeValue(ctx, parent);
};


EPromptoBuilder.prototype.exitSelectorExpression = function(ctx) {
    var selector = this.getNodeValue(ctx.selector);
    if(selector) {
        selector.parent = this.getNodeValue(ctx.parent);
        this.setNodeValue(ctx, selector);
    }
};

EPromptoBuilder.prototype.exitSet_literal = function(ctx) {
    var items = this.getNodeValue(ctx.expression_list());
    var set_ = new literal.SetLiteral(items);
    this.setNodeValue(ctx, set_);
};


EPromptoBuilder.prototype.exitStoreStatement = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.stmt));
};

EPromptoBuilder.prototype.exitStore_statement = function(ctx) {
    var del = this.getNodeValue(ctx.to_del);
    var add = this.getNodeValue(ctx.to_add);
    var stmts = this.getNodeValue(ctx.stmts);
    var stmt = new statement.StoreStatement(del, add, stmts);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitMember_identifier = function(ctx) {
    var name = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, name);
};


EPromptoBuilder.prototype.exitMemberSelector = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new expression.UnresolvedSelector(null, name));
};


EPromptoBuilder.prototype.exitItemSelector = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new expression.ItemSelector(null, exp));
};


EPromptoBuilder.prototype.exitSliceSelector = function(ctx) {
    var slice = this.getNodeValue(ctx.xslice);
    this.setNodeValue(ctx, slice);
};


EPromptoBuilder.prototype.exitTyped_argument = function(ctx) {
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


EPromptoBuilder.prototype.exitCodeArgument = function(ctx) {
    var arg = this.getNodeValue(ctx.arg);
    this.setNodeValue(ctx, arg);
};


EPromptoBuilder.prototype.exitArgument_list = function(ctx) {
    var items = new param.ParameterList();
    ctx.argument().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitFlush_statement = function(ctx) {
    this.setNodeValue(ctx, new statement.FlushStatement());
};


EPromptoBuilder.prototype.exitFlushStatement = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.stmt));
};


EPromptoBuilder.prototype.exitFull_argument_list = function(ctx) {
    var items = this.getNodeValue(ctx.items);
    var item = this.getNodeValue(ctx.item) || null;
    if(item!==null) {
        items.add(item);
    }
    this.setNodeValue(ctx, items);
};

EPromptoBuilder.prototype.exitArgument_assignment = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var exp = this.getNodeValue(ctx.exp);
    var arg = new argument.UnresolvedParameter(name);
    this.setNodeValue(ctx, new grammar.Argument(arg, exp));
};


EPromptoBuilder.prototype.exitArgumentAssignmentListExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var items = this.getNodeValue(ctx.items) || null;
    if(items===null) {
        items = new grammar.ArgumentList();
    }
    items.insert(0, new grammar.Argument(null, exp));
    var item = this.getNodeValue(ctx.item) || null;
    if(item!==null) {
        items.add(item);
    } else {
        items.checkLastAnd();
    }
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitArgumentAssignmentListNoExpression = function(ctx) {
    var items = this.getNodeValue(ctx.items);
    var item = this.getNodeValue(ctx.item) || null;
    if(item!==null) {
        items.add(item);
    } else {
        items.checkLastAnd();
    }
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitArgumentAssignmentList = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    var items = new grammar.ArgumentList([item]);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitArgumentAssignmentListItem = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    var items = this.getNodeValue(ctx.items);
    items.add(item);
    this.setNodeValue(ctx, items);
};



EPromptoBuilder.prototype.exitArrow_prefix = function(ctx) {
    var args = this.getNodeValue(ctx.arrow_args());
    var argsSuite = this.getWhiteSpacePlus(ctx.s1);
    if(argsSuite==null) // happens when only WS
        argsSuite = this.getHiddenTokensBefore(ctx.EGT().getSymbol());
    var arrowSuite = this.getWhiteSpacePlus(ctx.s2);
    if(arrowSuite==null) // happens when only WS
        arrowSuite = this.getHiddenTokensAfter(ctx.EGT().getSymbol());
    this.setNodeValue(ctx, new expression.ArrowExpression(args, argsSuite, arrowSuite));
};


EPromptoBuilder.prototype.exitArrowExpression = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
};


EPromptoBuilder.prototype.exitArrowExpressionBody = function(ctx) {
    var arrow = this.getNodeValue(ctx.arrow_prefix());
    var exp = this.getNodeValue(ctx.expression());
    arrow.setExpression(exp);
    this.setNodeValue(ctx, arrow);
};


EPromptoBuilder.prototype.exitArrowListArg = function(ctx) {
    var list = this.getNodeValue(ctx.variable_identifier_list());
    this.setNodeValue(ctx, list);
};


EPromptoBuilder.prototype.exitArrowSingleArg = function(ctx) {
    var arg = this.getNodeValue(ctx.variable_identifier());
    this.setNodeValue(ctx, new grammar.IdentifierList(arg));
};


EPromptoBuilder.prototype.exitArrowStatementsBody = function(ctx) {
    var arrow = this.getNodeValue(ctx.arrow_prefix());
    var stmts = this.getNodeValue(ctx.statement_list());
    arrow.setStatements(stmts);
    this.setNodeValue(ctx, arrow);
};


EPromptoBuilder.prototype.exitUnresolvedWithArgsStatement = function(ctx) {
    var exp = ctx.exp1 ? this.getNodeValue(ctx.exp1) : this.getNodeValue(ctx.exp2);
    var args = this.getNodeValue(ctx.args);
    var name = this.getNodeValue(ctx.name);
    var stmts = this.getNodeValue(ctx.stmts);
    if (name!=null || stmts!=null)
        this.setNodeValue(ctx, new statement.RemoteCall(exp, args, name, stmts));
    else
        this.setNodeValue(ctx, new statement.UnresolvedCall(exp, args));
};


EPromptoBuilder.prototype.exitAddExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    var exp = ctx.op.type===parser.EParser.PLUS ? new expression.PlusExpression(left, right) : new expression.SubtractExpression(left, right);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitMember_method_declaration_list = function(ctx) {
    var items = new grammar.MethodDeclarationList();
    ctx.member_method_declaration().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};

EPromptoBuilder.prototype.exitNative_member_method_declaration_list = function(ctx) {
    var items = new grammar.MethodDeclarationList();
    ctx.native_member_method_declaration().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};

EPromptoBuilder.prototype.exitGetter_method_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new declaration.GetterMethodDeclaration(name, stmts));
};


EPromptoBuilder.prototype.exitNative_setter_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new declaration.NativeSetterMethodDeclaration(name, stmts));
};


EPromptoBuilder.prototype.exitNative_getter_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new declaration.NativeGetterMethodDeclaration(name, stmts));
};

EPromptoBuilder.prototype.exitSetter_method_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new declaration.SetterMethodDeclaration(name, stmts));
};


EPromptoBuilder.prototype.exitSetType = function(ctx) {
    var typ = this.getNodeValue(ctx.s);
    this.setNodeValue(ctx, new type.SetType(typ));
};


EPromptoBuilder.prototype.exitMember_method_declaration = function(ctx) {
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


EPromptoBuilder.prototype.exitStatement_list = function(ctx) {
    var items = new statement.StatementList();
    ctx.statement().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};

EPromptoBuilder.prototype.exitAbstract_method_declaration = function(ctx) {
    var typ = this.getNodeValue(ctx.typ);
    if(typ instanceof type.CategoryType)
        typ.mutable = ctx.MUTABLE()!=null;
    var name = this.getNodeValue(ctx.name);
    var args = this.getNodeValue(ctx.args);
    this.setNodeValue(ctx, new declaration.AbstractMethodDeclaration(name, args, typ));
};


EPromptoBuilder.prototype.exitConcrete_method_declaration = function(ctx) {
    var typ = this.getNodeValue(ctx.typ);
    if(typ instanceof type.CategoryType)
        typ.mutable = ctx.MUTABLE()!=null;
    var name = this.getNodeValue(ctx.name);
    var args = this.getNodeValue(ctx.args);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new declaration.ConcreteMethodDeclaration(name, args, typ, stmts));
};


EPromptoBuilder.prototype.exitMethod_declaration = function(ctx) {
    var value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};


EPromptoBuilder.prototype.exitMethodCallStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitMethod_identifier = function(ctx) {
    var value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};

EPromptoBuilder.prototype.exitConstructorFrom = function(ctx) {
    var type = this.getNodeValue(ctx.typ);
    var copyFrom = this.getNodeValue(ctx.copyExp) || null;
    var args = this.getNodeValue(ctx.args) || null;
    var arg = this.getNodeValue(ctx.arg) || null;
    if(arg!==null) {
        if(args===null) {
            args = new grammar.ArgumentList();
        }
        args.add(arg);
    } else if(args!==null)
        args.checkLastAnd();
    this.setNodeValue(ctx, new expression.ConstructorExpression(type, copyFrom, args, true));
};


EPromptoBuilder.prototype.exitConstructorNoFrom = function(ctx) {
    var type = this.getNodeValue(ctx.typ);
    var args = this.getNodeValue(ctx.args) || null;
    var arg = this.getNodeValue(ctx.arg) || null;
    if(arg!==null) {
        if(args===null) {
            args = new grammar.ArgumentList();
        }
        args.add(arg);
    } else if(args!==null)
        args.checkLastAnd();
    this.setNodeValue(ctx, new expression.ConstructorExpression(type, null, args, true));
};

EPromptoBuilder.prototype.exitAssertion = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new parser.Assertion(exp));
};

EPromptoBuilder.prototype.exitAssertion_list = function(ctx) {
    var items = new utils.ExpressionList();
    ctx.assertion().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitAssignInstanceStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitAssign_instance_statement = function(ctx) {
    var inst = this.getNodeValue(ctx.inst);
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new statement.AssignInstanceStatement(inst, exp));
};


EPromptoBuilder.prototype.exitAssign_variable_statement = function(ctx) {
    var name = this.getNodeValue(ctx.variable_identifier());
    var exp = this.getNodeValue(ctx.expression());
    this.setNodeValue(ctx, new statement.AssignVariableStatement(name, exp));
};


EPromptoBuilder.prototype.exitAssign_tuple_statement = function(ctx) {
    var items = this.getNodeValue(ctx.items);
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new statement.AssignTupleStatement(items, exp));
};

EPromptoBuilder.prototype.exitRootInstance = function(ctx) {
    var name = this.getNodeValue(ctx.variable_identifier());
    this.setNodeValue(ctx, new instance.VariableInstance(name));
};

EPromptoBuilder.prototype.exitRoughlyEqualsExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.ROUGHLY, right));
};



EPromptoBuilder.prototype.exitChildInstance = function(ctx) {
    var parent = this.getNodeValue(ctx.assignable_instance());
    var child = this.getNodeValue(ctx.child_instance());
    child.parent = parent;
    this.setNodeValue(ctx, child);
};

EPromptoBuilder.prototype.exitMemberInstance = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new instance.MemberInstance(name));
};

EPromptoBuilder.prototype.exitIsATypeExpression = function(ctx) {
    var type = this.getNodeValue(ctx.category_or_any_type());
    var exp = new expression.TypeExpression(type);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitIsOtherExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.expression());
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitIsExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    var op = right instanceof expression.TypeExpression ? grammar.EqOp.IS_A : grammar.EqOp.IS;
    this.setNodeValue(ctx, new expression.EqualsExpression(left, op, right));
};

EPromptoBuilder.prototype.exitIsNotExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    var op = right instanceof expression.TypeExpression ? grammar.EqOp.IS_NOT_A : grammar.EqOp.IS_NOT;
    this.setNodeValue(ctx, new expression.EqualsExpression(left, op, right));
};

EPromptoBuilder.prototype.exitItemInstance = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new instance.ItemInstance(exp));
};

EPromptoBuilder.prototype.exitConstructorExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitNative_statement_list = function(ctx) {
    var items = new statement.StatementList();
    ctx.native_statement().forEach(function (r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};

EPromptoBuilder.prototype.exitJava_identifier = function(ctx) {
    this.setNodeValue(ctx, ctx.getText());
};

EPromptoBuilder.prototype.exitJavascript_identifier = function(ctx) {
    var id = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, id);
};

EPromptoBuilder.prototype.exitJavascript_member_expression = function(ctx) {
    var name = ctx.name.getText ();
    this.setNodeValue (ctx, new javascript.JavaScriptMemberExpression(name));
};

EPromptoBuilder.prototype.exitJavascript_new_expression = function(ctx) {
    var method = this.getNodeValue(ctx.javascript_method_expression());
    this.setNodeValue (ctx, new javascript.JavaScriptNewExpression(method));
};

EPromptoBuilder.prototype.exitJavascript_primary_expression = function(ctx) {
    var exp = this.getNodeValue (ctx.getChild(0));
    this.setNodeValue (ctx, exp);
};

EPromptoBuilder.prototype.exitJavascript_this_expression = function(ctx) {
    this.setNodeValue (ctx, new javascript.JavaScriptThisExpression ());
};


EPromptoBuilder.prototype.exitJavaIdentifier = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new java.JavaIdentifierExpression(null, name));
};

EPromptoBuilder.prototype.exitJavaIdentifierExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitJavaChildIdentifier = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var name = this.getNodeValue(ctx.name);
    var child = new java.JavaIdentifierExpression(parent, name);
    this.setNodeValue(ctx, child);
};


EPromptoBuilder.prototype.exitJavaClassIdentifier = function(ctx) {
    var klass = this.getNodeValue(ctx.klass);
    this.setNodeValue(ctx, klass);
};

EPromptoBuilder.prototype.exitJavaChildClassIdentifier = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var child = new java.JavaIdentifierExpression(parent, ctx.name.text);
    this.setNodeValue(ctx, child);
};


EPromptoBuilder.prototype.exitJavaPrimaryExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitJavascriptBooleanLiteral = function(ctx) {
    this.setNodeValue(ctx, new javascript.JavaScriptBooleanLiteral(ctx.getText()));
};

EPromptoBuilder.prototype.exitJavascriptCharacterLiteral = function(ctx) {
    this.setNodeValue(ctx, new javascript.JavaScriptCharacterLiteral(ctx.getText()));
};

EPromptoBuilder.prototype.exitJavascriptTextLiteral = function(ctx) {
    this.setNodeValue(ctx, new javascript.JavaScriptTextLiteral(ctx.getText()));
};

EPromptoBuilder.prototype.exitJavascriptIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new javascript.JavaScriptIntegerLiteral(ctx.getText()));
};


EPromptoBuilder.prototype.exitJavascriptDecimalLiteral = function(ctx) {
    this.setNodeValue(ctx, new javascript.JavaScriptDecimalLiteral(ctx.getText()));
};

EPromptoBuilder.prototype.exitJavascriptPrimaryExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitJavascript_identifier_expression = function(ctx) {
    var id = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new javascript.JavaScriptIdentifierExpression(id));
};

EPromptoBuilder.prototype.exitJavaSelectorExpression = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var child = this.getNodeValue(ctx.child);
    child.parent = parent;
    this.setNodeValue(ctx, child);
};

EPromptoBuilder.prototype.exitJavascriptSelectorExpression = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var child = this.getNodeValue(ctx.child);
    child.parent = parent;
    this.setNodeValue(ctx, child);
};

EPromptoBuilder.prototype.exitJavaScriptMemberExpression = function(ctx) {
    var id = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new javascript.JavaScriptMemberExpression(id));
};

EPromptoBuilder.prototype.exitJava_primary_expression = function(ctx) {
    var exp = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitJava_item_expression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new java.JavaItemExpression(exp));
};

EPromptoBuilder.prototype.exitJavascript_item_expression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new javascript.JavaScriptItemExpression(exp));
};

EPromptoBuilder.prototype.exitJavaItemExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitJavascriptItemExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitJavaStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var stmt = new java.JavaStatement(exp,false);
    this.setNodeValue(ctx, stmt);
};

EPromptoBuilder.prototype.exitJavascriptStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var stmt = new javascript.JavaScriptStatement(exp,false);
    this.setNodeValue(ctx, stmt);
};

EPromptoBuilder.prototype.exitJavaReturnStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new java.JavaStatement(exp,true));
};

EPromptoBuilder.prototype.exitJavascriptReturnStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new javascript.JavaScriptStatement(exp,true));
};


EPromptoBuilder.prototype.exitJavaNativeStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.java_statement());
    var call = new java.JavaNativeCall(stmt);
    this.setNodeValue(ctx, call);
};


EPromptoBuilder.prototype.exitJavaScriptNativeStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.javascript_native_statement());
    this.setNodeValue(ctx, stmt);
};

EPromptoBuilder.prototype.exitJavascript_native_statement = function(ctx) {
    var stmt = this.getNodeValue(ctx.javascript_statement());
    var module = this.getNodeValue(ctx.javascript_module());
    stmt.module = module || null;
    this.setNodeValue(ctx, new javascript.JavaScriptNativeCall(stmt));
};


EPromptoBuilder.prototype.exitNative_method_declaration = function(ctx) {
    var type = this.getNodeValue(ctx.typ);
    var name = this.getNodeValue(ctx.name);
    var params = this.getNodeValue(ctx.args);
    var stmts = this.getNodeValue(ctx.stmts);
    var decl = new declaration.NativeMethodDeclaration(name, params, type, stmts);
    this.setNodeValue(ctx, decl);
};

EPromptoBuilder.prototype.exitJavaArgumentList = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    this.setNodeValue(ctx, new java.JavaExpressionList(item));
};

EPromptoBuilder.prototype.exitJavascriptArgumentList = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    this.setNodeValue(ctx, new javascript.JavaScriptExpressionList(item));
};


EPromptoBuilder.prototype.exitJavaArgumentListItem = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    var items = this.getNodeValue(ctx.items);
    items.add(item);
    this.setNodeValue(ctx, items);
};

EPromptoBuilder.prototype.exitJavascriptArgumentListItem = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    var items = this.getNodeValue(ctx.items);
    items.add(item);
    this.setNodeValue(ctx, items);
};

EPromptoBuilder.prototype.exitJava_method_expression = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var args = this.getNodeValue(ctx.args);
    this.setNodeValue(ctx, new java.JavaMethodExpression(name, args));
};

EPromptoBuilder.prototype.exitJava_this_expression = function(ctx) {
    this.setNodeValue(ctx, new java.JavaThisExpression());
};

EPromptoBuilder.prototype.exitJavaScriptMethodExpression = function(ctx) {
    var method = this.getNodeValue(ctx.method);
    this.setNodeValue(ctx, method);
};


EPromptoBuilder.prototype.exitJavascript_method_expression = function(ctx) {
    var id = this.getNodeValue(ctx.name);
    var args = this.getNodeValue(ctx.args);
    this.setNodeValue(ctx, new javascript.JavaScriptMethodExpression(id, args));
};

EPromptoBuilder.prototype.exitJavaMethodExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitFullDeclarationList = function(ctx) {
    var items = this.getNodeValue(ctx.declarations()) || new declaration.DeclarationList();
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitDeclaration = function(ctx) {
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


EPromptoBuilder.prototype.exitDeclarations = function(ctx) {
    var items = new declaration.DeclarationList();
    ctx.declaration().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitIteratorExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var name = this.getNodeValue(ctx.name);
    var source = this.getNodeValue(ctx.source);
    this.setNodeValue(ctx, new expression.IteratorExpression(name, source, exp));
};


EPromptoBuilder.prototype.exitIteratorType = function(ctx) {
    var typ = this.getNodeValue(ctx.i);
    this.setNodeValue(ctx, new type.IteratorType(typ));
};


EPromptoBuilder.prototype.exitJavaBooleanLiteral = function(ctx) {
    this.setNodeValue(ctx, new java.JavaBooleanLiteral(ctx.getText()));
};


EPromptoBuilder.prototype.exitJavaIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new java.JavaIntegerLiteral(ctx.getText()));
};


EPromptoBuilder.prototype.exitJavaDecimalLiteral = function(ctx) {
    this.setNodeValue(ctx, new java.JavaDecimalLiteral(ctx.getText()));
};


EPromptoBuilder.prototype.exitJavaCharacterLiteral = function(ctx) {
    this.setNodeValue(ctx, new java.JavaCharacterLiteral(ctx.getText()));
};


EPromptoBuilder.prototype.exitJavaTextLiteral = function(ctx) {
    this.setNodeValue(ctx, new java.JavaTextLiteral(ctx.getText()));
};

EPromptoBuilder.prototype.exitJavaCategoryBinding = function(ctx) {
    var map = this.getNodeValue(ctx.binding);
    this.setNodeValue(ctx, new java.JavaNativeCategoryBinding(map));
};

EPromptoBuilder.prototype.exitJavaScriptCategoryBinding = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.binding));
};

EPromptoBuilder.prototype.exitJavascript_category_binding = function(ctx) {
    var identifier = ctx.javascript_identifier().map(function(cx) { return cx.getText(); }).join(".");
    var module = this.getNodeValue(ctx.javascript_module()) || null;
    var map = new javascript.JavaScriptNativeCategoryBinding(identifier, module);
    this.setNodeValue(ctx, map);
};

EPromptoBuilder.prototype.exitJavascript_module = function(ctx) {
    var ids = ctx.javascript_identifier().map(function(rule) {
        return rule.getText();
    });
    var module = new javascript.JavaScriptModule(ids);
    this.setNodeValue(ctx, module);
};

EPromptoBuilder.prototype.exitNativeCategoryBindingList = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    var items = new grammar.NativeCategoryBindingList(item);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitNativeCategoryBindingListItem = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    var items = this.getNodeValue(ctx.items);
    items.add(item);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitNative_category_bindings = function(ctx) {
    var items = this.getNodeValue(ctx.items);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitNative_category_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var attrs = this.getNodeValue(ctx.attrs);
    var bindings = this.getNodeValue(ctx.bindings);
    var methods = this.getNodeValue(ctx.methods);
    var decl = new declaration.NativeCategoryDeclaration(name, attrs, bindings, null, methods);
    decl.storable = ctx.STORABLE()!=null;
    this.setNodeValue(ctx, decl);
};


EPromptoBuilder.prototype.exitNative_widget_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var bindings = this.getNodeValue(ctx.bindings);
    var methods = this.getNodeValue(ctx.methods);
    var decl = new declaration.NativeWidgetDeclaration(name, bindings, methods);
    this.setNodeValue(ctx, decl);
};


EPromptoBuilder.prototype.exitNativeCategoryDeclaration = function(ctx) {
    var decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
};


EPromptoBuilder.prototype.exitNative_resource_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var attrs = this.getNodeValue(ctx.attrs);
    var bindings = this.getNodeValue(ctx.bindings);
    var methods = this.getNodeValue(ctx.methods);
    var decl = new declaration.NativeResourceDeclaration(name, attrs, bindings, null, methods);
    decl.storable = ctx.STORABLE()!=null;
    this.setNodeValue(ctx, decl);
};


EPromptoBuilder.prototype.exitResource_declaration = function(ctx) {
    var decl = this.getNodeValue(ctx.native_resource_declaration());
    this.setNodeValue(ctx, decl);
};



EPromptoBuilder.prototype.exitParenthesis_expression = function(ctx) {
    var exp = this.getNodeValue(ctx.expression());
    this.setNodeValue(ctx, new expression.ParenthesisExpression(exp));
};


EPromptoBuilder.prototype.exitParenthesisExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitNative_symbol_list = function(ctx) {
    var items = new grammar.NativeSymbolList();
    ctx.native_symbol().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitEnum_native_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var type = this.getNodeValue(ctx.typ);
    var symbols = this.getNodeValue(ctx.symbols);
    this.setNodeValue(ctx, new declaration.EnumeratedNativeDeclaration(name, type, symbols));
};


EPromptoBuilder.prototype.exitFor_each_statement = function(ctx) {
    var name1 = this.getNodeValue(ctx.name1);
    var name2 = this.getNodeValue(ctx.name2);
    var source = this.getNodeValue(ctx.source);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.ForEachStatement(name1, name2, source, stmts));
};


EPromptoBuilder.prototype.exitForEachStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitSymbols_token = function(ctx) {
    this.setNodeValue(ctx, ctx.getText());
};


EPromptoBuilder.prototype.exitKey_token = function(ctx) {
    this.setNodeValue(ctx, ctx.getText());
};


EPromptoBuilder.prototype.exitValue_token = function(ctx) {
    this.setNodeValue(ctx, ctx.getText());
};


EPromptoBuilder.prototype.exitNamed_argument = function(ctx) {
    var name = this.getNodeValue(ctx.variable_identifier());
    var arg = new argument.UnresolvedParameter(name);
    var exp = this.getNodeValue(ctx.literal_expression());
    arg.defaultExpression = exp || null;
    this.setNodeValue(ctx, arg);
};


EPromptoBuilder.prototype.exitClosureStatement = function(ctx) {
    var decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, new statement.DeclarationStatement(decl));
};


EPromptoBuilder.prototype.exitReturn_statement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new statement.ReturnStatement(exp));
};


EPromptoBuilder.prototype.exitReturnStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitClosureExpression = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new expression.MethodExpression(name));
};


EPromptoBuilder.prototype.exitIf_statement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var stmts = this.getNodeValue(ctx.stmts);
    var elseIfs = this.getNodeValue(ctx.elseIfs);
    var elseStmts = this.getNodeValue(ctx.elseStmts);
    this.setNodeValue(ctx, new statement.IfStatement(exp, stmts, elseIfs, elseStmts));
};


EPromptoBuilder.prototype.exitElseIfStatementList = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var stmts = this.getNodeValue(ctx.stmts);
    var elem = new statement.IfElement(exp, stmts);
    this.setNodeValue(ctx, new statement.IfElementList(elem));
};


EPromptoBuilder.prototype.exitElseIfStatementListItem = function(ctx) {
    var items = this.getNodeValue(ctx.items);
    var exp = this.getNodeValue(ctx.exp);
    var stmts = this.getNodeValue(ctx.stmts);
    var elem = new statement.IfElement(exp, stmts);
    items.add(elem);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitIfStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitSuperExpression = function(ctx) {
    this.setNodeValue(ctx, new expression.SuperExpression());
};


EPromptoBuilder.prototype.exitSwitchStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitAssignTupleStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitRaiseStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitWriteStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitWithResourceStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitWhileStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitDoWhileStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitTryStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitEqualsExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.EQUALS, right));
};


EPromptoBuilder.prototype.exitNotEqualsExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.NOT_EQUALS, right));
};


EPromptoBuilder.prototype.exitGreaterThanExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.GT, right));
};


EPromptoBuilder.prototype.exitGreaterThanOrEqualExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.GTE, right));
};


EPromptoBuilder.prototype.exitLessThanExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.LT, right));
};


EPromptoBuilder.prototype.exitLessThanOrEqualExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.LTE, right));
};


EPromptoBuilder.prototype.exitAtomicSwitchCase = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.AtomicSwitchCase(exp, stmts));
};



EPromptoBuilder.prototype.exitCollection_literal = function(ctx) {
    var value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};



EPromptoBuilder.prototype.exitCollectionSwitchCase = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.CollectionSwitchCase(exp, stmts));
};


EPromptoBuilder.prototype.exitSwitch_case_statement_list = function(ctx) {
    var items = new statement.SwitchCaseList();
    ctx.switch_case_statement().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitSwitch_statement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var cases = this.getNodeValue(ctx.cases);
    var stmts = this.getNodeValue(ctx.stmts);
    var stmt = new statement.SwitchStatement(exp, cases, stmts);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitLiteralRangeLiteral = function(ctx) {
    var low = this.getNodeValue(ctx.low);
    var high = this.getNodeValue(ctx.high);
    this.setNodeValue(ctx, new literal.RangeLiteral(low, high));
};

EPromptoBuilder.prototype.exitLiteralListLiteral = function(ctx) {
    var exp = this.getNodeValue(ctx.literal_list_literal());
    this.setNodeValue(ctx, new literal.ListLiteral(false, exp));
};


EPromptoBuilder.prototype.exitLiteral_list_literal = function(ctx) {
    var items = new utils.ExpressionList();
    ctx.atomic_literal().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitInExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.IN, right));
};


EPromptoBuilder.prototype.exitNotInExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_IN, right));
};


EPromptoBuilder.prototype.exitCssType = function(ctx) {
    this.setNodeValue(ctx, type.CssType.instance);
};


EPromptoBuilder.prototype.exitHasExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.HAS, right));
};


EPromptoBuilder.prototype.exitNotHasExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_HAS, right));
};


EPromptoBuilder.prototype.exitHasAllExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.HAS_ALL, right));
};


EPromptoBuilder.prototype.exitNotHasAllExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_HAS_ALL, right));
};


EPromptoBuilder.prototype.exitHasAnyExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.HAS_ANY, right));
};


EPromptoBuilder.prototype.exitNotHasAnyExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_HAS_ANY, right));
};


EPromptoBuilder.prototype.exitContainsExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.CONTAINS, right));
};


EPromptoBuilder.prototype.exitNotContainsExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.NOT_CONTAINS, right));
};


EPromptoBuilder.prototype.exitDivideExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.DivideExpression(left, right));
};


EPromptoBuilder.prototype.exitIntDivideExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.IntDivideExpression(left, right));
};


EPromptoBuilder.prototype.exitModuloExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ModuloExpression(left, right));
};


EPromptoBuilder.prototype.exitAnnotation_constructor = function(ctx) {
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


EPromptoBuilder.prototype.exitAnnotation_argument = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new literal.DictEntry(name, exp));
};


EPromptoBuilder.prototype.exitAnnotation_identifier = function(ctx) {
    this.setNodeValue(ctx, new grammar.Identifier(ctx.getText()));
};


EPromptoBuilder.prototype.exitAnnotation_argument_name = function(ctx) {
    this.setNodeValue(ctx, ctx.getText());
};


EPromptoBuilder.prototype.exitAnnotationLiteralValue = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitAnnotationTypeValue = function(ctx) {
    var typ = this.getNodeValue(ctx.typ);
    this.setNodeValue(ctx, new expression.TypeExpression(typ));
};


EPromptoBuilder.prototype.exitAndExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.AndExpression(left, right));
};


EPromptoBuilder.prototype.exitNullLiteral = function(ctx) {
    this.setNodeValue(ctx, literal.NullLiteral.instance);
};


EPromptoBuilder.prototype.exitOperator_argument = function(ctx) {
    var value = this.getNodeValue (ctx.getChild (0));
    this.setNodeValue (ctx, value);
};


EPromptoBuilder.prototype.exitOperatorArgument = function(ctx) {
    var arg = this.getNodeValue(ctx.arg);
    arg.setMutable(ctx.MUTABLE()!=null);
    this.setNodeValue(ctx, arg);
};


EPromptoBuilder.prototype.exitOperatorPlus = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.PLUS);
};


EPromptoBuilder.prototype.exitOperatorMinus = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.MINUS);
};


EPromptoBuilder.prototype.exitOperatorMultiply = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.MULTIPLY);
};


EPromptoBuilder.prototype.exitOperatorDivide = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.DIVIDE);
};


EPromptoBuilder.prototype.exitOperatorIDivide = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.IDIVIDE);
};


EPromptoBuilder.prototype.exitOperatorModulo = function(ctx) {
    this.setNodeValue(ctx, grammar.Operator.MODULO);
};

EPromptoBuilder.prototype.exitNative_member_method_declaration = function(ctx) {
    var value = this.getNodeValue (ctx.getChild (0));
    this.setNodeValue (ctx, value);
};

EPromptoBuilder.prototype.exitOperator_method_declaration= function(ctx) {
    var op = this.getNodeValue(ctx.op);
    var arg = this.getNodeValue(ctx.arg);
    var typ = this.getNodeValue(ctx.typ);
    var stmts = this.getNodeValue(ctx.stmts);
    var decl = new declaration.OperatorMethodDeclaration(op, arg, typ, stmts);
    this.setNodeValue(ctx, decl);
};

EPromptoBuilder.prototype.exitOrder_by = function(ctx) {
    var names = new grammar.IdentifierList();
    ctx.variable_identifier().map( function(ctx_) {
        names.push(this.getNodeValue(ctx_));
    }, this);
    var clause = new grammar.OrderByClause(names, ctx.DESC()!=null);
    this.setNodeValue(ctx, clause);
};

EPromptoBuilder.prototype.exitOrder_by_list = function(ctx) {
    var list = new grammar.OrderByClauseList();
    ctx.order_by().map( function(ctx_) {
        list.add(this.getNodeValue(ctx_));
    }, this);
    this.setNodeValue(ctx, list);
};


EPromptoBuilder.prototype.exitOrExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.OrExpression(left, right));
};


EPromptoBuilder.prototype.exitMultiplyExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.MultiplyExpression(left, right));
};


EPromptoBuilder.prototype.exitMutable_category_type = function(ctx) {
    var typ = this.getNodeValue (ctx.category_type());
    typ.mutable = ctx.MUTABLE()!=null;
    this.setNodeValue(ctx, typ);
};


EPromptoBuilder.prototype.exitMutableInstanceExpression = function(ctx) {
    var source = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new expression.MutableExpression(source));
};


EPromptoBuilder.prototype.exitMutableSelectableExpression = function(ctx) {
    var name = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new expression.InstanceExpression(name));
};


EPromptoBuilder.prototype.exitMutableSelectorExpression = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var selector = this.getNodeValue(ctx.selector);
    selector.parent = parent;
    this.setNodeValue(ctx, selector);
};


EPromptoBuilder.prototype.exitMinusExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new expression.MinusExpression(exp));
};


EPromptoBuilder.prototype.exitNotExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new expression.NotExpression(exp));
};


EPromptoBuilder.prototype.exitWhile_statement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.WhileStatement(exp, stmts));
};


EPromptoBuilder.prototype.exitDo_while_statement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.DoWhileStatement(exp, stmts));
};

EPromptoBuilder.prototype.exitSingleton_category_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var attrs = this.getNodeValue(ctx.attrs);
    var methods = this.getNodeValue(ctx.methods);
    this.setNodeValue(ctx, new declaration.SingletonCategoryDeclaration(name, attrs, methods));
};

EPromptoBuilder.prototype.exitSingletonCategoryDeclaration = function(ctx) {
    var decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
};

EPromptoBuilder.prototype.exitSliceFirstAndLast = function(ctx) {
    var first = this.getNodeValue(ctx.first);
    var last = this.getNodeValue(ctx.last);
    this.setNodeValue(ctx, new expression.SliceSelector(null, first, last));
};


EPromptoBuilder.prototype.exitSliceFirstOnly = function(ctx) {
    var first = this.getNodeValue(ctx.first);
    this.setNodeValue(ctx, new expression.SliceSelector(null, first, null));
};


EPromptoBuilder.prototype.exitSliceLastOnly = function(ctx) {
    var last = this.getNodeValue(ctx.last);
    this.setNodeValue(ctx, new expression.SliceSelector(null, null, last));
};


EPromptoBuilder.prototype.exitSorted_expression = function(ctx) {
    var source = this.getNodeValue(ctx.source);
    var desc = ctx.DESC()!=null;
    var key = this.getNodeValue(ctx.key);
    this.setNodeValue(ctx, new expression.SortedExpression(source, desc, key));
};


EPromptoBuilder.prototype.exitSorted_key = function(ctx) {
    var exp = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitSortedExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitDocumentExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitDocument_expression = function(ctx) {
    var exp = this.getNodeValue(ctx.expression());
    this.setNodeValue(ctx, new expression.DocumentExpression(exp));
};


EPromptoBuilder.prototype.exitDocumentType = function(ctx) {
    this.setNodeValue(ctx, type.DocumentType.instance);
};


EPromptoBuilder.prototype.exitDocument_literal = function(ctx) {
    var entries = this.getNodeValue(ctx.dict_entry_list());
    var items = entries ? new literal.DocEntryList(entries.items) : null;
    this.setNodeValue(ctx, new literal.DocumentLiteral(items));
};


EPromptoBuilder.prototype.exitFetchExpression = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
};


EPromptoBuilder.prototype.exitFetchStatement = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.stmt));
};


EPromptoBuilder.prototype.exitFetchMany = function(ctx) {
    var category = this.getNodeValue(ctx.typ);
    var predicate = this.getNodeValue(ctx.predicate);
    var start = this.getNodeValue(ctx.xstart);
    var stop = this.getNodeValue(ctx.xstop);
    var orderBy = this.getNodeValue(ctx.orderby);
    this.setNodeValue(ctx, new expression.FetchManyExpression(category, start, stop, predicate, orderBy));
};


EPromptoBuilder.prototype.exitFetchManyAsync = function(ctx) {
    var category = this.getNodeValue(ctx.typ);
    var predicate = this.getNodeValue(ctx.predicate);
    var start = this.getNodeValue(ctx.xstart);
    var stop = this.getNodeValue(ctx.xstop);
    var orderBy = this.getNodeValue(ctx.orderby);
    var name = this.getNodeValue(ctx.name);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.FetchManyStatement(category, start, stop, predicate, orderBy, name, stmts));
};


EPromptoBuilder.prototype.exitFetchOne = function(ctx) {
    var category = this.getNodeValue(ctx.typ);
    var predicate = this.getNodeValue(ctx.predicate);
    this.setNodeValue(ctx, new expression.FetchOneExpression(category, predicate));
};


EPromptoBuilder.prototype.exitFetchOneAsync = function(ctx) {
    var category = this.getNodeValue(ctx.typ);
    var predicate = this.getNodeValue(ctx.predicate);
    var name = this.getNodeValue(ctx.name);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.FetchOneStatement(category, predicate, name, stmts));
};


EPromptoBuilder.prototype.exitFilteredListExpression = function(ctx) {
    var filtered = this.getNodeValue(ctx.filtered_list_suffix());
    var source = this.getNodeValue(ctx.src);
    filtered.source = source;
    this.setNodeValue(ctx, filtered);
};


EPromptoBuilder.prototype.exitFiltered_list_suffix = function(ctx) {
    var itemName = this.getNodeValue(ctx.name);
    var predicate = this.getNodeValue(ctx.predicate);
    this.setNodeValue(ctx, new expression.FilteredExpression(itemName, null, predicate));
};



EPromptoBuilder.prototype.exitCode_type = function(ctx) {
    this.setNodeValue(ctx, type.CodeType.instance);
};


EPromptoBuilder.prototype.exitExecuteExpression = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new expression.ExecuteExpression(name));
};


EPromptoBuilder.prototype.exitExpression_list = function(ctx) {
    var items = new utils.ExpressionList();
    ctx.expression().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitExpression_tuple = function(ctx) {
    var items = new utils.ExpressionList();
    ctx.expression().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitCodeExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new expression.CodeExpression(exp));
};


EPromptoBuilder.prototype.exitCode_argument = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new argument.CodeParameter(name));
};


EPromptoBuilder.prototype.exitCategory_or_any_type = function(ctx) {
    var exp = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitCategory_symbol = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var args = this.getNodeValue(ctx.args);
    var arg = this.getNodeValue(ctx.arg) || null;
    if(arg!==null) {
        args.add(arg);
    }
    this.setNodeValue(ctx, new expression.CategorySymbol(name, args));
};


EPromptoBuilder.prototype.exitCategory_symbol_list = function(ctx) {
    var items = new grammar.CategorySymbolList();
    ctx.category_symbol().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitEnum_category_declaration = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var attrs = this.getNodeValue(ctx.attrs);
    var parent = this.getNodeValue(ctx.derived);
    var derived = parent==null ? null : new grammar.IdentifierList(parent);
    var symbols = this.getNodeValue(ctx.symbols);
    this.setNodeValue(ctx, new declaration.EnumeratedCategoryDeclaration(name, attrs, derived, symbols));
};


EPromptoBuilder.prototype.exitEnum_declaration = function(ctx) {
    var value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};


EPromptoBuilder.prototype.exitRead_all_expression = function(ctx) {
    var source = this.getNodeValue(ctx.source);
    this.setNodeValue(ctx, new expression.ReadAllExpression(source));
};


EPromptoBuilder.prototype.exitRead_blob_expression = function(ctx) {
    var source = this.getNodeValue(ctx.source);
    this.setNodeValue(ctx, new expression.ReadBlobExpression(source));
};


EPromptoBuilder.prototype.exitRead_one_expression = function(ctx) {
    var source = this.getNodeValue(ctx.source);
    this.setNodeValue(ctx, new expression.ReadOneExpression(source));
};


EPromptoBuilder.prototype.exitReadAllExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitReadBlobExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitReadOneExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitRepl = function(ctx) {
    var value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};


EPromptoBuilder.prototype.exitWith_singleton_statement = function(ctx) {
    var name = this.getNodeValue(ctx.typ);
    var typ = new type.CategoryType(name);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.WithSingletonStatement(typ, stmts));
};


EPromptoBuilder.prototype.exitWithSingletonStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};



EPromptoBuilder.prototype.exitWrite_statement = function(ctx) {
    var what = this.getNodeValue(ctx.what);
    var target = this.getNodeValue(ctx.target);
    this.setNodeValue(ctx, new statement.WriteStatement(what, target));
};


EPromptoBuilder.prototype.exitWith_resource_statement = function(ctx) {
    var stmt = this.getNodeValue(ctx.stmt);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.WithResourceStatement(stmt, stmts));
};


EPromptoBuilder.prototype.exitAnyType = function(ctx) {
    this.setNodeValue(ctx, type.AnyType.instance);
};


EPromptoBuilder.prototype.exitAnyListType = function(ctx) {
    var typ = this.getNodeValue(ctx.any_type());
    this.setNodeValue(ctx, new type.ListType(typ));
};


EPromptoBuilder.prototype.exitAnyDictType = function(ctx) {
    var typ = this.getNodeValue(ctx.typ);
    this.setNodeValue(ctx, new type.DictType(typ));
};


EPromptoBuilder.prototype.exitCastExpression = function(ctx) {
    var left = this.getNodeValue(ctx.left);
    var type = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.CastExpression(left, type, ctx.MUTABLE() != null));
};

EPromptoBuilder.prototype.exitCatchAtomicStatement = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.AtomicSwitchCase(new expression.SymbolExpression(name), stmts));
};


EPromptoBuilder.prototype.exitCatchCollectionStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.CollectionSwitchCase(exp, stmts));
};


EPromptoBuilder.prototype.exitCatch_statement_list = function(ctx) {
    var items = new statement.SwitchCaseList();
    ctx.catch_statement().forEach(function(r) {
        var item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitTry_statement = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var stmts = this.getNodeValue(ctx.stmts);
    var handlers = this.getNodeValue(ctx.handlers);
    var anyStmts = this.getNodeValue(ctx.anyStmts);
    var finalStmts = this.getNodeValue(ctx.finalStmts);
    var stmt = new statement.SwitchErrorStatement(name, stmts, handlers, anyStmts, finalStmts);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitRaise_statement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new statement.RaiseStatement(exp));
};

EPromptoBuilder.prototype.exitMatchingList = function(ctx) {
    var exp = this.getNodeValue(ctx.source);
    this.setNodeValue(ctx, new constraint.MatchingCollectionConstraint(exp));
};

EPromptoBuilder.prototype.exitMatchingRange = function(ctx) {
    var exp = this.getNodeValue(ctx.source);
    this.setNodeValue(ctx, new constraint.MatchingCollectionConstraint(exp));
};

EPromptoBuilder.prototype.exitMatchingExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new constraint.MatchingExpressionConstraint(exp));
};

EPromptoBuilder.prototype.exitMatchingPattern = function(ctx) {
    this.setNodeValue(ctx, new constraint.MatchingPatternConstraint(new literal.TextLiteral(ctx.text.text)));
};

EPromptoBuilder.prototype.exitLiteralSetLiteral = function(ctx) {
    var items = this.getNodeValue(ctx.literal_list_literal());
    this.setNodeValue(ctx, new literal.SetLiteral(items));
};


EPromptoBuilder.prototype.exitInvocation_expression = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var select = new expression.MethodSelector(null, name);
    this.setNodeValue(ctx, new statement.MethodCall(select));
};


EPromptoBuilder.prototype.exitInvocationExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitInvokeStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};



EPromptoBuilder.prototype.exitCsharp_identifier = function(ctx) {
    this.setNodeValue(ctx, ctx.getText());
};

EPromptoBuilder.prototype.exitCSharpIdentifier = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new csharp.CSharpIdentifierExpression(null, name));
};

EPromptoBuilder.prototype.exitCSharpChildIdentifier = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var name = this.getNodeValue(ctx.name);
    var child = new csharp.CSharpIdentifierExpression(parent, name);
    this.setNodeValue(ctx, child);
};

EPromptoBuilder.prototype.exitCSharpBooleanLiteral = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpBooleanLiteral(ctx.getText()));
};


EPromptoBuilder.prototype.exitCSharpIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpIntegerLiteral(ctx.getText()));
};


EPromptoBuilder.prototype.exitCSharpDecimalLiteral = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpDecimalLiteral(ctx.getText()));
};


EPromptoBuilder.prototype.exitCSharpCharacterLiteral = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpCharacterLiteral(ctx.getText()));
};


EPromptoBuilder.prototype.exitCSharpTextLiteral = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpTextLiteral(ctx.getText()));
};


EPromptoBuilder.prototype.exitCSharpCategoryBinding = function(ctx) {
    var binding = this.getNodeValue(ctx.binding);
    this.setNodeValue(ctx, new csharp.CSharpNativeCategoryBinding(binding));
};

EPromptoBuilder.prototype.exitCsharp_primary_expression = function(ctx) {
    var value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};

EPromptoBuilder.prototype.exitCsharp_this_expression = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpThisExpression());
};

EPromptoBuilder.prototype.exitCsharp_method_expression = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var args = this.getNodeValue(ctx.args);
    this.setNodeValue(ctx, new csharp.CSharpMethodExpression(name, args));
};

EPromptoBuilder.prototype.exitCSharpMethodExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitCSharpArgumentList = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    this.setNodeValue(ctx, new csharp.CSharpExpressionList(item));
};

EPromptoBuilder.prototype.exitCSharpArgumentListItem = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    var items = this.getNodeValue(ctx.items);
    items.add(item);
    this.setNodeValue(ctx, items);
};

EPromptoBuilder.prototype.exitCSharpNativeStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.csharp_statement());
    var call = new csharp.CSharpNativeCall(stmt);
    this.setNodeValue(ctx, call);
};

EPromptoBuilder.prototype.exitCSharpPromptoIdentifier = function(ctx) {
    var name = ctx.DOLLAR_IDENTIFIER().getText();
    this.setNodeValue(ctx, new csharp.CSharpIdentifierExpression(null, name));
};

EPromptoBuilder.prototype.exitCSharpPrimaryExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitCSharpSelectorExpression = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var child = this.getNodeValue(ctx.child);
    child.parent = parent;
    this.setNodeValue(ctx, child);
};

EPromptoBuilder.prototype.exitCSharpStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    var stmt = new csharp.CSharpStatement(exp,false);
    this.setNodeValue(ctx, stmt);
};

EPromptoBuilder.prototype.exitCSharpReturnStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new csharp.CSharpStatement(exp,true));
};


EPromptoBuilder.prototype.exitPythonStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new python.PythonStatement(exp,false));
};

EPromptoBuilder.prototype.exitPythonReturnStatement = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new python.PythonStatement(exp,true));
};

EPromptoBuilder.prototype.exitPython2CategoryBinding = function(ctx) {
    var map = this.getNodeValue(ctx.binding);
    this.setNodeValue(ctx, new python.Python2NativeCategoryBinding(map));
};


EPromptoBuilder.prototype.exitPython3CategoryBinding = function(ctx) {
    var map = this.getNodeValue(ctx.binding);
    this.setNodeValue(ctx, new python.Python3NativeCategoryBinding(map));
};


EPromptoBuilder.prototype.exitPython_category_binding = function(ctx) {
    var identifier = ctx.identifier().getText();
    var module = this.getNodeValue(ctx.python_module()) || null;
    var map = new python.PythonNativeCategoryBinding(identifier, module);
    this.setNodeValue(ctx, map);
};

EPromptoBuilder.prototype.exitPython_method_expression = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var args = this.getNodeValue(ctx.args);
    var method = new python.PythonMethodExpression(name, args);
    this.setNodeValue(ctx, method);
};

EPromptoBuilder.prototype.exitPythonGlobalMethodExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitPythonMethodExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitPython_module = function(ctx) {
    var ids = ctx.python_identifier().map(function(rule) {
        return rule.getText();
    });
    var module = new python.PythonModule(ids);
    this.setNodeValue(ctx, module);
};

EPromptoBuilder.prototype.exitPython2NativeStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.python_native_statement());
    this.setNodeValue(ctx, new python.Python2NativeCall(stmt));
};


EPromptoBuilder.prototype.exitPython3NativeStatement = function(ctx) {
    var stmt = this.getNodeValue(ctx.python_native_statement());
    this.setNodeValue(ctx, new python.Python3NativeCall(stmt));
};

EPromptoBuilder.prototype.exitPython_native_statement = function(ctx) {
    var stmt = this.getNodeValue(ctx.python_statement());
    var module = this.getNodeValue(ctx.python_module());
    stmt.module = module || null;
    this.setNodeValue(ctx, new python.PythonNativeCall(stmt));
}

EPromptoBuilder.prototype.exitPython_identifier = function(ctx) {
    this.setNodeValue(ctx, ctx.getText());
};

EPromptoBuilder.prototype.exitPythonIdentifier = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new python.PythonIdentifierExpression(null, name));
};

EPromptoBuilder.prototype.exitPythonIdentifierExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitPythonChildIdentifier = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var name = this.getNodeValue(ctx.name);
    var child = new python.PythonIdentifierExpression(parent, name);
    this.setNodeValue(ctx, child);
};


EPromptoBuilder.prototype.exitPythonBooleanLiteral = function(ctx) {
    this.setNodeValue(ctx, new python.PythonBooleanLiteral(ctx.getText()));
};

EPromptoBuilder.prototype.exitPythonIntegerLiteral = function(ctx) {
    this.setNodeValue(ctx, new python.PythonIntegerLiteral(ctx.getText()));
};


EPromptoBuilder.prototype.exitPythonDecimalLiteral = function(ctx) {
    this.setNodeValue(ctx, new python.PythonDecimalLiteral(ctx.getText()));
};


EPromptoBuilder.prototype.exitPythonCharacterLiteral = function(ctx) {
    this.setNodeValue(ctx, new python.PythonCharacterLiteral(ctx.getText()));
};


EPromptoBuilder.prototype.exitPythonTextLiteral = function(ctx) {
    this.setNodeValue(ctx, new python.PythonTextLiteral(ctx.getText()));
};

EPromptoBuilder.prototype.exitPythonLiteralExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitPythonPromptoIdentifier = function(ctx) {
    var name = ctx.DOLLAR_IDENTIFIER().getText();
    this.setNodeValue(ctx, new python.PythonIdentifierExpression(null, name));
};

EPromptoBuilder.prototype.exitPythonPrimaryExpression = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitPythonArgumentList = function(ctx) {
    var ordinal = this.getNodeValue(ctx.ordinal);
    var named = this.getNodeValue(ctx.named);
    ordinal.addAll(named);
    this.setNodeValue(ctx, ordinal);
};


EPromptoBuilder.prototype.exitPythonNamedOnlyArgumentList = function(ctx) {
    var named = this.getNodeValue(ctx.named);
    this.setNodeValue(ctx, named);
};

EPromptoBuilder.prototype.exitPythonNamedArgumentList = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var exp = this.getNodeValue(ctx.exp);
    var arg = new python.PythonNamedArgument(name, exp);
    this.setNodeValue(ctx, new python.PythonArgumentList(arg));
};

EPromptoBuilder.prototype.exitPythonNamedArgumentListItem = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var exp = this.getNodeValue(ctx.exp);
    var arg = new python.PythonNamedArgument(name, exp);
    var items = this.getNodeValue(ctx.items);
    items.add(arg);
    this.setNodeValue(ctx, items);
};

EPromptoBuilder.prototype.exitPythonOrdinalOnlyArgumentList = function(ctx) {
    var ordinal = this.getNodeValue(ctx.ordinal);
    this.setNodeValue(ctx, ordinal);
};

EPromptoBuilder.prototype.exitPythonOrdinalArgumentList = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    var arg = new python.PythonOrdinalArgument(item);
    this.setNodeValue(ctx, new python.PythonArgumentList(arg));
};

EPromptoBuilder.prototype.exitPythonOrdinalArgumentListItem = function(ctx) {
    var item = this.getNodeValue(ctx.item);
    var arg = new python.PythonOrdinalArgument(item);
    var items = this.getNodeValue(ctx.items);
    items.add(arg);
    this.setNodeValue(ctx, items);
};

EPromptoBuilder.prototype.exitPythonSelectorExpression = function(ctx) {
    var parent = this.getNodeValue(ctx.parent);
    var selector = this.getNodeValue(ctx.child);
    selector.parent = parent;
    this.setNodeValue(ctx, selector);
};

EPromptoBuilder.prototype.exitPythonSelfExpression = function(ctx) {
    this.setNodeValue(ctx, new python.PythonSelfExpression());
};



EPromptoBuilder.prototype.exitJsxChild = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.jsx));
};



EPromptoBuilder.prototype.exitJsxCode = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new jsx.JsxCode(exp));
};



EPromptoBuilder.prototype.exitJsxExpression = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
};



EPromptoBuilder.prototype.exitJsxElement = function(ctx) {
    var elem = this.getNodeValue(ctx.opening);
    var closing = this.getNodeValue(ctx.closing);
    elem.setClosing(closing);
    var children = this.getNodeValue(ctx.children_);
    elem.setChildren(children);
    this.setNodeValue(ctx, elem);
};


EPromptoBuilder.prototype.exitJsxSelfClosing = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.jsx));
};



EPromptoBuilder.prototype.exitJsxText = function(ctx) {
    var text = parser.ParserUtils.getFullText(ctx.text);
    this.setNodeValue(ctx, new jsx.JsxText(text));
};



EPromptoBuilder.prototype.exitJsxValue = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new jsx.JsxExpression(exp));
};


EPromptoBuilder.prototype.exitJsx_attribute = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var value = this.getNodeValue(ctx.value);
    var suite = this.getWhiteSpacePlus(ctx.ws_plus());
    this.setNodeValue(ctx, new jsx.JsxProperty(name, value, suite));
};



EPromptoBuilder.prototype.exitJsx_children = function(ctx) {
    var list = ctx.jsx_child().map(function(cx) { return this.getNodeValue(cx); }, this);
    this.setNodeValue(ctx, list);
};


EPromptoBuilder.prototype.exitJsx_element_name = function(ctx) {
    var name = ctx.getText();
    this.setNodeValue(ctx, new grammar.Identifier(name));
};


EPromptoBuilder.prototype.exitJsx_expression = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.getChild(0)));
};


EPromptoBuilder.prototype.exitJsx_identifier = function(ctx) {
    var name = ctx.getText();
    this.setNodeValue(ctx, new grammar.Identifier(name));
};


EPromptoBuilder.prototype.exitJsx_fragment = function(ctx) {
    var openingSuite = this.getWhiteSpacePlus(ctx.ws_plus(0));
    var fragment = new jsx.JsxFragment(openingSuite);
    fragment.children = this.getNodeValue(ctx.children_);
    this.setNodeValue(ctx, fragment);
};


EPromptoBuilder.prototype.exitJsxLiteral = function(ctx) {
    var text = ctx.getText();
    this.setNodeValue(ctx, new jsx.JsxLiteral(text));
};


EPromptoBuilder.prototype.exitJsx_opening = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var nameSuite = this.getWhiteSpacePlus(ctx.ws_plus());
    var attributes = ctx.jsx_attribute()
        .map(function(cx) { return this.getNodeValue(cx); }, this);
    this.setNodeValue(ctx, new jsx.JsxElement(name, nameSuite, attributes, null));
};


EPromptoBuilder.prototype.exitJsx_closing = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new jsx.JsxClosing(name, null));
};


EPromptoBuilder.prototype.exitJsx_self_closing = function(ctx) {
    var name = this.getNodeValue(ctx.name);
    var nameSuite = this.getWhiteSpacePlus(ctx.ws_plus());
    var attributes = ctx.jsx_attribute()
        .map(function(cx) { return this.getNodeValue(cx); }, this);
    this.setNodeValue(ctx, new jsx.JsxSelfClosing(name, nameSuite, attributes, null));
};



EPromptoBuilder.prototype.exitCssExpression = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
}


EPromptoBuilder.prototype.exitCss_expression = function(ctx) {
    var exp = new css.CssExpression();
    ctx.css_field().forEach(function(cx) {
        var field = this.getNodeValue(cx);
        exp.addField(field);
    }, this);
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitCss_field = function(ctx) {
    var name = ctx.name.getText();
    var value = this.getNodeValue(ctx.value);
    this.setNodeValue(ctx, new css.CssField(name, value));
};



EPromptoBuilder.prototype.exitCssText = function(ctx) {
    var text = this.input.getText({start: ctx.text.start, stop: ctx.text.stop});
    this.setNodeValue(ctx, new css.CssText(text));
};


EPromptoBuilder.prototype.exitCssValue = function(ctx) {
    var exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new css.CssCode(exp));
};


EPromptoBuilder.prototype.buildSection = function(node, section) {
    var first = this.findFirstValidToken(node.start.tokenIndex, section instanceof jsx.JsxText);
    var last = this.findLastValidToken(node.stop.tokenIndex, section instanceof jsx.JsxText);
    section.setSectionFrom(this.path, first, last, parser.Dialect.E);
};

EPromptoBuilder.prototype.findFirstValidToken = function(idx, allowWS) {
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

EPromptoBuilder.prototype.findLastValidToken = function(idx, allowWS) {
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

EPromptoBuilder.prototype.readValidToken = function(idx, allowWS) {
    var token = this.input.get(idx);
    var text = token.text;
    // ignore trailing whitespace
    if(text!==null && (allowWS || text.replace(/(\n|\r|\t|' ')/g,"").length>0)) {
        return token;
    } else {
        return null;
    }
};


exports.EPromptoBuilder = EPromptoBuilder;
