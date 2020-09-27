import { OParserListener } from './OParserListener.js';
import * as parser from '../parser/index.js';
import * as constraint from '../constraint/index.js';
import * as instance from '../instance/index.js';
import * as declaration from '../declaration/index.js';
import * as expression from '../expression/index.js';
import * as javascript from '../javascript/index.js';
import * as statement from '../statement/index.js';
import * as literal from '../literal/index.js';
import * as grammar from '../grammar/index.js';
import * as param from '../param/index.js';
import * as type from '../type/index.js';
import * as jsx from '../jsx/index.js';
import * as css from '../css/index.js';
import * as java from '../java/index.js';
import * as csharp from '../csharp/index.js';
import * as python from '../python/index.js';

export default function OPromptoBuilder(parser) {
	OParserListener.call(this);
	this.input = parser.getTokenStream();
	this.path = parser.path;
	this.nodeValues = {};
    this.nextNodeId = 0;
	return this;
}

OPromptoBuilder.prototype = Object.create(OParserListener.prototype);
OPromptoBuilder.prototype.constructor = OPromptoBuilder;


OPromptoBuilder.prototype.setNodeValue = function(node, value) {
    if(node["%id"]===undefined)
        node["%id"] = this.nextNodeId++;
    this.nodeValues[node["%id"]] = value;
    if(value instanceof parser.Section) {
        this.buildSection(node, value);
    }
};


OPromptoBuilder.prototype.getNodeValue = function(node) {
    if(node==null || node===undefined || node["%id"]===null || node["%id"]===undefined)
        return null;
    else
        return this.nodeValues[node["%id"]];
};


OPromptoBuilder.prototype.getHiddenTokensBeforeNode = function(node) {
    return node ? this.getHiddenTokensBeforeToken(node.symbol) : null;
};


OPromptoBuilder.prototype.getHiddenTokensBeforeToken = function(token) {
    return this.getHiddenTokens(token, this.input.getHiddenTokensToLeft);
};


OPromptoBuilder.prototype.getHiddenTokensAfterNode = function(node) {
    return node ? this.getHiddenTokensAfterToken(node.symbol) : null;
};


OPromptoBuilder.prototype.getHiddenTokensAfterToken = function(token) {
    return this.getHiddenTokens(token, this.input.getHiddenTokensToRight);
};


OPromptoBuilder.prototype.getHiddenTokens = function(token, fetcher) {
    if(token.tokenIndex<0)
        return null;
    fetcher = fetcher.bind(this.input);
    const hidden = fetcher(token.tokenIndex);
    if(hidden==null || hidden.length===0)
        return null;
    else
        return hidden.map(token => token.text).join("");
};


OPromptoBuilder.prototype.readAnnotations = function(ctxs) {
    const annotations = ctxs.map(function (csc) {
        return this.getNodeValue(csc);
    }, this);
    return (annotations.length == 0) ? null : annotations;
};


OPromptoBuilder.prototype.readComments = function(ctxs) {
    const comments = ctxs.map(function (csc) {
        return this.getNodeValue(csc);
    }, this);
    return (comments.length == 0) ? null : comments;
};


OPromptoBuilder.prototype.exitSelectableExpression = function(ctx) {
	const e = this.getNodeValue(ctx.parent);
	this.setNodeValue(ctx, e);
};


OPromptoBuilder.prototype.exitSelectorExpression = function(ctx) {
	const selector = this.getNodeValue(ctx.selector);
	if(selector) {
        const parent = this.getNodeValue(ctx.parent);
        if(selector instanceof statement.UnresolvedCall)
            selector.setParent(parent);
        else
            selector.parent = parent;
        this.setNodeValue(ctx, selector);
    }
};

OPromptoBuilder.prototype.exitSet_literal = function(ctx) {
    const items = this.getNodeValue(ctx.expression_list());
    const set_ = new literal.SetLiteral(items);
    this.setNodeValue(ctx, set_);
};


OPromptoBuilder.prototype.exitStoreStatement = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.stmt));
};

OPromptoBuilder.prototype.exitStore_statement = function(ctx) {
    const del = this.getNodeValue(ctx.to_del);
    const add = this.getNodeValue(ctx.to_add);
    const stmts = this.getNodeValue(ctx.stmts);
    const stmt = new statement.StoreStatement(del, add, stmts);
    this.setNodeValue(ctx, stmt);
};



OPromptoBuilder.prototype.exitAtomicLiteral = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitCollectionLiteral = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitCommentStatement = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.comment_statement()));
};


OPromptoBuilder.prototype.exitComment_statement = function(ctx) {
    this.setNodeValue(ctx, new statement.CommentStatement(ctx.getText()));
};


OPromptoBuilder.prototype.exitListLiteral = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};



OPromptoBuilder.prototype.exitBlob_expression = function(ctx) {
    const exp = this.getNodeValue(ctx.expression());
    this.setNodeValue(ctx, new expression.BlobExpression(exp));
};



OPromptoBuilder.prototype.exitBlobType = function(ctx) {
    this.setNodeValue(ctx, type.BlobType.instance);
};


OPromptoBuilder.prototype.exitBooleanLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.BooleanLiteral(ctx.getText()));
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
    this.setNodeValue(ctx, new literal.IntegerLiteral(ctx.getText()));
};


OPromptoBuilder.prototype.exitDecimalLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.DecimalLiteral(ctx.getText()));
};


OPromptoBuilder.prototype.exitHexadecimalLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.HexaLiteral(ctx.getText()));
};


OPromptoBuilder.prototype.exitCharacterLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.CharacterLiteral(ctx.getText()));
};


OPromptoBuilder.prototype.exitDateLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.DateLiteral(ctx.getText()));
};


OPromptoBuilder.prototype.exitDateTimeLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.DateTimeLiteral(ctx.getText()));
};

OPromptoBuilder.prototype.exitTernaryExpression = function(ctx) {
    const condition = this.getNodeValue(ctx.test);
    const ifTrue = this.getNodeValue(ctx.ifTrue);
    const ifFalse = this.getNodeValue(ctx.ifFalse);
    const exp = new expression.TernaryExpression(condition, ifTrue, ifFalse);
    this.setNodeValue(ctx, exp);
};

OPromptoBuilder.prototype.exitTest_method_declaration = function(ctx) {
    const name = new grammar.Identifier(ctx.name.text);
    name.setSectionFrom(this.path, ctx.name, ctx.name, parser.Dialect.O);
    const stmts = this.getNodeValue(ctx.stmts);
    const exps = this.getNodeValue(ctx.exps);
    const errorName = this.getNodeValue(ctx.error);
    const error = errorName==null ? null : new expression.SymbolExpression(errorName);
    this.setNodeValue(ctx, new declaration.TestMethodDeclaration(name, stmts, exps, error));
};


OPromptoBuilder.prototype.exitTextLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.TextLiteral(ctx.getText()));
};


OPromptoBuilder.prototype.exitTimeLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.TimeLiteral(ctx.getText()));
};


OPromptoBuilder.prototype.exitPeriodLiteral = function(ctx) {
	this.setNodeValue(ctx, new literal.PeriodLiteral(ctx.getText()));
};



OPromptoBuilder.prototype.exitPeriodType = function(ctx) {
    this.setNodeValue(ctx, type.PeriodType.instance);
};


OPromptoBuilder.prototype.exitVersionLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.VersionLiteral(ctx.getText()));
};


OPromptoBuilder.prototype.exitVersionType = function(ctx) {
    this.setNodeValue(ctx, type.VersionType.instance);
};


OPromptoBuilder.prototype.exitAttribute_identifier = function(ctx) {
    const name = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, name);
};


OPromptoBuilder.prototype.exitVariable_identifier = function(ctx) {
    const name = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, name);
};


OPromptoBuilder.prototype.exitList_literal = function(ctx) {
    const mutable = ctx.MUTABLE() !== null;
    const items = this.getNodeValue(ctx.expression_list()) || null;
    const value = new literal.ListLiteral(mutable, items);
	this.setNodeValue(ctx, value);
};


OPromptoBuilder.prototype.exitDict_literal = function(ctx) {
    const mutable = ctx.MUTABLE() !== null;
	const items = this.getNodeValue(ctx.dict_entry_list()) || null;
	const value = new literal.DictLiteral(mutable, items);
	this.setNodeValue(ctx, value);
};


OPromptoBuilder.prototype.exitTuple_literal = function(ctx) {
    const mutable = ctx.MUTABLE() !== null;
	const items = this.getNodeValue(ctx.expression_tuple()) || null;
	const value = new literal.TupleLiteral(mutable, items);
	this.setNodeValue(ctx, value);
};



OPromptoBuilder.prototype.exitRange_literal = function(ctx) {
	const low = this.getNodeValue(ctx.low);
	const high = this.getNodeValue(ctx.high);
	this.setNodeValue(ctx, new literal.RangeLiteral(low, high));
};


OPromptoBuilder.prototype.exitRangeLiteral = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitDict_entry_list = function(ctx) {
    const items = new literal.DictEntryList(null, null);
    ctx.dict_entry().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitDict_entry = function(ctx) {
	const key = this.getNodeValue(ctx.key);
	const value= this.getNodeValue(ctx.value);
	const entry = new literal.DictEntry(key, value);
	this.setNodeValue(ctx, entry);
};


OPromptoBuilder.prototype.exitDoc_entry_list = function(ctx) {
    const items = new literal.DocEntryList(null, null);
    ctx.doc_entry().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitDoc_entry = function(ctx) {
    const key = this.getNodeValue(ctx.key);
    const value = this.getNodeValue(ctx.value);
    const entry = new literal.DocEntry(key, value);
    this.setNodeValue(ctx, entry);
};


OPromptoBuilder.prototype.exitDocKeyIdentifier = function(ctx) {
    const text = ctx.name.getText();
    this.setNodeValue(ctx, new literal.DocIdentifierKey(new grammar.Identifier(text)));
};


OPromptoBuilder.prototype.exitDocKeyText = function(ctx) {
    const text = ctx.name.text;
    this.setNodeValue(ctx, new literal.DocTextKey(text));
};


OPromptoBuilder.prototype.exitLiteral_expression = function(ctx) {
    const exp = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitLiteralExpression = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitIdentifierExpression = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitVariableIdentifier = function(ctx) {
	const id = this.getNodeValue(ctx.variable_identifier());
	this.setNodeValue(ctx, new expression.InstanceExpression(id));
};


OPromptoBuilder.prototype.exitInstanceExpression = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitSymbol_identifier = function(ctx) {
    const name = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, name);
};


OPromptoBuilder.prototype.exitNative_symbol = function(ctx) {
	const name = this.getNodeValue(ctx.name);
	const exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new expression.NativeSymbol(name, exp));
};


OPromptoBuilder.prototype.exitTypeIdentifier = function(ctx) {
    const name = this.getNodeValue(ctx.type_identifier());
    this.setNodeValue(ctx, new expression.UnresolvedIdentifier(name));
};


OPromptoBuilder.prototype.exitSymbolIdentifier = function(ctx) {
	const name = this.getNodeValue(ctx.symbol_identifier());
	this.setNodeValue(ctx, new expression.SymbolExpression(name));
};


OPromptoBuilder.prototype.exitSymbolLiteral = function(ctx) {
    const name = ctx.getText();
    this.setNodeValue(ctx, new expression.SymbolExpression(new grammar.Identifier(name)));
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
	const type = this.getNodeValue(ctx.p);
	this.setNodeValue(ctx, type);
};


OPromptoBuilder.prototype.exitAttribute_declaration = function(ctx) {
	const id = this.getNodeValue(ctx.name);
	const type = this.getNodeValue(ctx.typ);
	const match = this.getNodeValue(ctx.match);
    let indices = null;
    if (ctx.indices !=null)
        indices = indices = this.getNodeValue(ctx.indices);
    else if(ctx.INDEX()!=null)
        indices = new grammar.IdentifierList();
    const decl = new declaration.AttributeDeclaration(id, type, match, indices);
    decl.storable = ctx.STORABLE()!=null;
    this.setNodeValue(ctx, decl);
};


OPromptoBuilder.prototype.exitNativeType = function(ctx) {
	const type = this.getNodeValue(ctx.n);
	this.setNodeValue(ctx, type);
};


OPromptoBuilder.prototype.exitCategoryType = function(ctx) {
	const type = this.getNodeValue(ctx.c);
	this.setNodeValue(ctx, type);
};


OPromptoBuilder.prototype.exitCategory_type = function(ctx) {
    const name = new grammar.Identifier(ctx.getText());
    this.buildSection(ctx, name);
	this.setNodeValue(ctx, new type.CategoryType(name));
};


OPromptoBuilder.prototype.exitListType = function(ctx) {
	const typ = this.getNodeValue(ctx.l);
	this.setNodeValue(ctx, new type.ListType(typ));
};


OPromptoBuilder.prototype.exitDictKeyIdentifier = function(ctx) {
    const text = ctx.name.getText();
    this.setNodeValue(ctx, new literal.DictIdentifierKey(new grammar.Identifier(text)));
};

OPromptoBuilder.prototype.exitDictKeyText = function(ctx) {
    const text = ctx.name.text;
    this.setNodeValue(ctx, new literal.DictTextKey(text));
};

OPromptoBuilder.prototype.exitDictType = function(ctx) {
	const typ = this.getNodeValue(ctx.d);
	this.setNodeValue(ctx, new type.DictionaryType(typ));
};


OPromptoBuilder.prototype.exitAttribute_identifier_list = function(ctx) {
    const list = new grammar.IdentifierList();
    const rules = ctx.attribute_identifier();
    rules.forEach(function(rule) {
        const item = this.getNodeValue(rule);
        list.add(item);
    }, this);
    this.setNodeValue(ctx, list);
};



OPromptoBuilder.prototype.exitVariable_identifier_list = function(ctx) {
    const list = new grammar.IdentifierList();
    const rules = ctx.variable_identifier();
    rules.forEach(function(rule) {
        const item = this.getNodeValue(rule);
        list.add(item);
    }, this);
    this.setNodeValue(ctx, list);
};


OPromptoBuilder.prototype.exitConcrete_category_declaration = function(ctx) {
	const name = this.getNodeValue(ctx.name);
	const attrs = this.getNodeValue(ctx.attrs);
	const derived = this.getNodeValue(ctx.derived);
	const methods = this.getNodeValue(ctx.methods);
    const decl = new declaration.ConcreteCategoryDeclaration(name, attrs, derived, methods);
    decl.storable = ctx.STORABLE()!=null;
    this.setNodeValue(ctx, decl);
};



OPromptoBuilder.prototype.exitConcrete_widget_declaration = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const derived = this.getNodeValue(ctx.derived);
    const methods = this.getNodeValue(ctx.methods);
    const decl = new declaration.ConcreteWidgetDeclaration(name, derived, methods);
    this.setNodeValue(ctx, decl);
};



OPromptoBuilder.prototype.exitConcreteCategoryDeclaration = function(ctx) {
	const decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


OPromptoBuilder.prototype.exitConcreteWidgetDeclaration = function(ctx) {
    const decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
};


OPromptoBuilder.prototype.exitNativeWidgetDeclaration = function(ctx) {
    const decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
};


OPromptoBuilder.prototype.exitDerivedList = function(ctx) {
	const item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new grammar.IdentifierList(item));
};


OPromptoBuilder.prototype.exitDerivedListItem = function(ctx) {
	const items = this.getNodeValue(ctx.items);
	const item = this.getNodeValue(ctx.item);
	items.add(item);
	this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitType_identifier = function(ctx) {
    const name = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, name);
};


OPromptoBuilder.prototype.exitType_identifier_list = function(ctx) {
    const items = new grammar.IdentifierList();
    ctx.type_identifier().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitType_literal = function(ctx) {
    const type = this.getNodeValue(ctx.category_or_any_type());
    this.setNodeValue(ctx, new literal.TypeLiteral(type));
};


OPromptoBuilder.prototype.exitTypeLiteral = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.type_literal()));
};


OPromptoBuilder.prototype.exitMember_identifier = function(ctx) {
    const name = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, name);
};


OPromptoBuilder.prototype.exitMemberSelector = function(ctx) {
	const name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new expression.MemberSelector(null, name));
};

OPromptoBuilder.prototype.exitAn_expression = function(ctx) {
    const typ = this.getNodeValue(ctx.typ);
    this.setNodeValue(ctx, typ);
};

OPromptoBuilder.prototype.exitIsAnExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const type = this.getNodeValue(ctx.right);
    const right = new expression.TypeExpression(type);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.IS_A, right));
};

OPromptoBuilder.prototype.exitIsNotAnExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const type = this.getNodeValue(ctx.right);
    const right = new expression.TypeExpression(type);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.IS_NOT_A, right));
};

OPromptoBuilder.prototype.exitIsExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.IS, right));
};

OPromptoBuilder.prototype.exitIsNotExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.IS_NOT, right));
};



OPromptoBuilder.prototype.exitItemSelector = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new expression.ItemSelector(null, exp));
};


OPromptoBuilder.prototype.exitSliceSelector = function(ctx) {
	const slice = this.getNodeValue(ctx.xslice);
	this.setNodeValue(ctx, slice);
};


OPromptoBuilder.prototype.exitTyped_argument = function(ctx) {
	const typ = this.getNodeValue(ctx.typ);
	const name = this.getNodeValue(ctx.name);
	const attrs = this.getNodeValue(ctx.attrs);
    const arg = attrs ?
        new param.ExtendedParameter(typ, name, attrs) :
        new param.CategoryParameter(typ, name);
    const exp = this.getNodeValue(ctx.value);
    arg.defaultExpression = exp || null;
    this.setNodeValue(ctx, arg);
};


OPromptoBuilder.prototype.exitCodeArgument = function(ctx) {
	const arg = this.getNodeValue(ctx.arg);
	this.setNodeValue(ctx, arg);
};


OPromptoBuilder.prototype.exitArgument_list = function(ctx) {
    const items = new param.ParameterList();
    ctx.argument().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};




OPromptoBuilder.prototype.exitExpressionAssignmentList = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	const assign = new grammar.Argument(null, exp);
	this.setNodeValue(ctx, new grammar.ArgumentList([assign]));
};


OPromptoBuilder.prototype.exitArgument_assignment = function(ctx) {
	const name = this.getNodeValue(ctx.name);
	const exp = this.getNodeValue(ctx.exp);
	const arg = new param.UnresolvedParameter(name);
	this.setNodeValue(ctx, new grammar.Argument(arg, exp));
};


OPromptoBuilder.prototype.exitArgumentAssignmentList = function(ctx) {
	const item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new grammar.ArgumentList([item]));
};


OPromptoBuilder.prototype.exitArgumentAssignmentListItem = function(ctx) {
	const item = this.getNodeValue(ctx.item);
	const items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitArrow_prefix = function(ctx) {
    const args = this.getNodeValue(ctx.arrow_args());
    const argsSuite = this.getHiddenTokensBeforeNode(ctx.EGT());
    const arrowSuite = this.getHiddenTokensAfterNode(ctx.EGT());
    this.setNodeValue(ctx, new expression.ArrowExpression(args, argsSuite, arrowSuite));
};


OPromptoBuilder.prototype.exitArrowExpression = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
};


OPromptoBuilder.prototype.exitArrowExpressionBody = function(ctx) {
    const arrow = this.getNodeValue(ctx.arrow_prefix());
    const exp = this.getNodeValue(ctx.expression());
    arrow.setExpression(exp);
    this.setNodeValue(ctx, arrow);
};


OPromptoBuilder.prototype.exitArrowListArg = function(ctx) {
    const list = this.getNodeValue(ctx.variable_identifier_list());
    this.setNodeValue(ctx, list);
};


OPromptoBuilder.prototype.exitArrowSingleArg = function(ctx) {
    const arg = this.getNodeValue(ctx.variable_identifier());
    this.setNodeValue(ctx, new grammar.IdentifierList(arg));
};


OPromptoBuilder.prototype.exitArrowStatementsBody = function(ctx) {
    const arrow = this.getNodeValue(ctx.arrow_prefix());
    const stmts = this.getNodeValue(ctx.statement_list());
    arrow.setStatements(stmts);
    this.setNodeValue(ctx, arrow);
};


OPromptoBuilder.prototype.exitMethod_call_expression = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const caller = new expression.UnresolvedIdentifier(name);
    const args = this.getNodeValue(ctx.args);
    this.setNodeValue(ctx, new statement.UnresolvedCall(caller, args));
};



OPromptoBuilder.prototype.exitMethod_call_statement = function(ctx) {
    const parent = this.getNodeValue(ctx.parent);
    const call = this.getNodeValue(ctx.method);
    call && call.setParent(parent);
    const name = this.getNodeValue(ctx.name);
    const stmts = this.getNodeValue(ctx.stmts);
    if (call && name!=null || stmts!=null)
        this.setNodeValue(ctx, new statement.RemoteCall(call.callable, call.args, name, stmts));
    else
        this.setNodeValue(ctx, call)
};


OPromptoBuilder.prototype.exitMethodSelector = function(ctx) {
    const call = this.getNodeValue(ctx.method);
    if (call.callable instanceof expression.UnresolvedIdentifier) {
        const callable = new expression.UnresolvedSelector(null, call.callable.id);
        callable.copySectionFrom(call.callable);
        call.callable = callable;
    }
    this.setNodeValue(ctx, call);
};


OPromptoBuilder.prototype.exitAddExpression = function(ctx) {
	const left = this.getNodeValue(ctx.left);
	const right = this.getNodeValue(ctx.right);
	const exp = ctx.op.type==parser.OParser.PLUS ?
		new expression.PlusExpression(left, right) :
		new expression.SubtractExpression(left, right);
	this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitMember_method_declaration_list = function(ctx) {
    const items = new grammar.MethodDeclarationList();
    ctx.member_method_declaration().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitNative_member_method_declaration_list = function(ctx) {
    const items = new grammar.MethodDeclarationList();
    ctx.native_member_method_declaration().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitEmptyCategoryMethodList = function(ctx) {
	this.setNodeValue(ctx, new grammar.MethodDeclarationList);
};


OPromptoBuilder.prototype.exitCurlyCategoryMethodList = function(ctx) {
	const items = this.getNodeValue(ctx.items);
	this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitSetter_method_declaration = function(ctx) {
	const name = this.getNodeValue(ctx.name);
	const stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new declaration.SetterMethodDeclaration(name, stmts));
};


OPromptoBuilder.prototype.exitSetType = function(ctx) {
    const typ = this.getNodeValue(ctx.s);
    this.setNodeValue(ctx, new type.SetType(typ));
};


OPromptoBuilder.prototype.exitGetter_method_declaration = function(ctx) {
	const name = this.getNodeValue(ctx.name);
	const stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new declaration.GetterMethodDeclaration(name, stmts));
};

OPromptoBuilder.prototype.exitNative_setter_declaration = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new declaration.NativeSetterMethodDeclaration(name, stmts));
};


OPromptoBuilder.prototype.exitNative_getter_declaration = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new declaration.NativeGetterMethodDeclaration(name, stmts));
};


OPromptoBuilder.prototype.exitMember_method_declaration = function(ctx) {
    const comments = this.readComments(ctx.comment_statement());
    const annotations = this.readAnnotations(ctx.annotation_constructor());
    const ctx_ = ctx.children[ctx.getChildCount()-1];
    const decl = this.getNodeValue(ctx_);
    if(decl!=null) {
        decl.comments = comments;
        decl.annotations = annotations;
        this.setNodeValue(ctx, decl);
    }
};

OPromptoBuilder.prototype.exitConcreteMemberMethod = function(ctx) {
	const decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};

OPromptoBuilder.prototype.exitSingleStatement = function(ctx) {
	const stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, new statement.StatementList(stmt));
};


OPromptoBuilder.prototype.exitCurlyStatementList = function(ctx) {
	const items = this.getNodeValue(ctx.items);
	this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitStatement_list = function(ctx) {
    const items = new statement.StatementList();
    ctx.statement().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitAbstract_method_declaration = function(ctx) {
	const typ = this.getNodeValue(ctx.typ);
    if(typ instanceof type.CategoryType)
        typ.mutable = ctx.MUTABLE()!=null;
	const name = this.getNodeValue(ctx.name);
	const args = this.getNodeValue(ctx.args);
	this.setNodeValue(ctx, new declaration.AbstractMethodDeclaration(name, args, typ));
};


OPromptoBuilder.prototype.exitConcrete_method_declaration = function(ctx) {
	const typ = this.getNodeValue(ctx.typ);
    if(typ instanceof type.CategoryType)
        typ.mutable = ctx.MUTABLE()!=null;
	const name = this.getNodeValue(ctx.name);
	const args = this.getNodeValue(ctx.args);
	const stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new declaration.ConcreteMethodDeclaration(name, args, typ, stmts));
};


OPromptoBuilder.prototype.exitMethod_declaration = function(ctx) {
    const value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};


OPromptoBuilder.prototype.exitMethodCallStatement = function(ctx) {
	const stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitMethod_identifier = function(ctx) {
    const value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};



OPromptoBuilder.prototype.exitConstructorFrom = function(ctx) {
    const type = this.getNodeValue(ctx.typ);
    const copyFrom = this.getNodeValue(ctx.copyExp) || null;
    const args = this.getNodeValue(ctx.args) || null;
    this.setNodeValue(ctx, new expression.ConstructorExpression(type, copyFrom, args, true));
};


OPromptoBuilder.prototype.exitConstructorNoFrom = function(ctx) {
    const type = this.getNodeValue(ctx.typ);
    const args = this.getNodeValue(ctx.args) || null;
    this.setNodeValue(ctx, new expression.ConstructorExpression(type, null, args, true));
};


OPromptoBuilder.prototype.exitCopy_from = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
};




OPromptoBuilder.prototype.exitAssertion = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new parser.Assertion(exp));
};


OPromptoBuilder.prototype.exitAssertion_list = function(ctx) {
    const items = new expression.ExpressionList();
    ctx.assertion().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitAssign_instance_statement = function(ctx) {
	const inst = this.getNodeValue(ctx.inst);
	const exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new statement.AssignInstanceStatement(inst, exp));
};


OPromptoBuilder.prototype.exitAssignInstanceStatement = function(ctx) {
	const stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitAssign_variable_statement = function(ctx) {
	const name = this.getNodeValue(ctx.variable_identifier());
	const exp = this.getNodeValue(ctx.expression());
	this.setNodeValue(ctx, new statement.AssignVariableStatement(name, exp));
};


OPromptoBuilder.prototype.exitAssign_tuple_statement = function(ctx) {
	const items = this.getNodeValue(ctx.items);
	const exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new statement.AssignTupleStatement(items, exp));
};


OPromptoBuilder.prototype.exitRootInstance = function(ctx) {
	const name = this.getNodeValue(ctx.variable_identifier());
	this.setNodeValue(ctx, new instance.VariableInstance(name));
};

OPromptoBuilder.prototype.exitRoughlyEqualsExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.ROUGHLY, right));
};


OPromptoBuilder.prototype.exitChildInstance = function(ctx) {
    const parent = this.getNodeValue(ctx.assignable_instance());
    const child = this.getNodeValue(ctx.child_instance());
	child.parent = parent;
	this.setNodeValue(ctx, child);
};


OPromptoBuilder.prototype.exitMemberInstance = function(ctx) {
	const name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new instance.MemberInstance(name));
};



OPromptoBuilder.prototype.exitItemInstance = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new instance.ItemInstance(exp));
};



OPromptoBuilder.prototype.exitMethod_expression = function(ctx) {
	const exp = this.getNodeValue(ctx.getChild(0));
	this.setNodeValue(ctx, exp);
};



OPromptoBuilder.prototype.exitMethodExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};




OPromptoBuilder.prototype.exitNative_statement_list = function(ctx) {
    const items = new statement.StatementList();
    ctx.native_statement().forEach(function (r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitJava_identifier = function(ctx) {
	this.setNodeValue(ctx, ctx.getText());
};

OPromptoBuilder.prototype.exitJavascript_identifier = function(ctx) {
    const id = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, id);
};

OPromptoBuilder.prototype.exitJavascript_member_expression = function(ctx) {
    const name = ctx.name.getText ();
    this.setNodeValue (ctx, new javascript.JavaScriptMemberExpression(name));
};

OPromptoBuilder.prototype.exitJavascript_primary_expression = function(ctx) {
    const exp = this.getNodeValue (ctx.getChild(0));
    this.setNodeValue (ctx, exp);
};

OPromptoBuilder.prototype.exitJavascript_new_expression = function(ctx) {
    const method = this.getNodeValue(ctx.javascript_method_expression());
    this.setNodeValue (ctx, new javascript.JavaScriptNewExpression(method));
};


OPromptoBuilder.prototype.exitJavascript_this_expression = function(ctx) {
    this.setNodeValue (ctx, new javascript.JavaScriptThisExpression ());
};


OPromptoBuilder.prototype.exitJavaIdentifier = function(ctx) {
	const name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new java.JavaIdentifierExpression(null, name));
};

OPromptoBuilder.prototype.exitJavaIdentifierExpression = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitJavaChildIdentifier = function(ctx) {
	const parent = this.getNodeValue(ctx.parent);
	const name = this.getNodeValue(ctx.name);
	const child = new java.JavaIdentifierExpression(parent, name);
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
	const klass = this.getNodeValue(ctx.klass);
	this.setNodeValue(ctx, klass);
};


OPromptoBuilder.prototype.exitJavaChildClassIdentifier = function(ctx) {
	const parent = this.getNodeValue(ctx.parent);
	const child = new java.JavaIdentifierExpression(parent, ctx.name.getText());
	this.setNodeValue(ctx, child);
};


OPromptoBuilder.prototype.exitJavaPrimaryExpression = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitJavascriptPrimaryExpression = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};

OPromptoBuilder.prototype.exitJavascript_identifier_expression = function(ctx) {
    const id = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new javascript.JavaScriptIdentifierExpression(id));
};

OPromptoBuilder.prototype.exitJavaSelectorExpression = function(ctx) {
	const parent = this.getNodeValue(ctx.parent);
	const child = this.getNodeValue(ctx.child);
	child.parent = parent;
	this.setNodeValue(ctx, child);
};

OPromptoBuilder.prototype.exitJavascriptSelectorExpression = function(ctx) {
	const parent = this.getNodeValue(ctx.parent);
	const child = this.getNodeValue(ctx.child);
	child.parent = parent;
	this.setNodeValue(ctx, child);
};

OPromptoBuilder.prototype.exitJavaScriptMemberExpression = function(ctx) {
    const id = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new javascript.JavaScriptMemberExpression(id));
};

OPromptoBuilder.prototype.exitJava_primary_expression = function(ctx) {
    const exp = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, exp);
};

OPromptoBuilder.prototype.exitJava_item_expression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new java.JavaItemExpression(exp));
};

OPromptoBuilder.prototype.exitJavascript_item_expression = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new javascript.JavaScriptItemExpression(exp));
};

OPromptoBuilder.prototype.exitJavascriptItemExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

OPromptoBuilder.prototype.exitJavaStatement = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    const stmt = new java.JavaStatement(exp,false);
    this.setNodeValue(ctx, stmt);
};

OPromptoBuilder.prototype.exitJavascriptStatement = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	const stmt = new javascript.JavaScriptStatement(exp,false);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitJavaReturnStatement = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new java.JavaStatement(exp,true));
};


OPromptoBuilder.prototype.exitJavascriptReturnStatement = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new javascript.JavaScriptStatement(exp,true));
};


OPromptoBuilder.prototype.exitJavaNativeStatement = function(ctx) {
	const stmt = this.getNodeValue(ctx.java_statement());
	this.setNodeValue(ctx, new java.JavaNativeCall(stmt));
};


OPromptoBuilder.prototype.exitJavaScriptNativeStatement = function(ctx) {
	const stmt = this.getNodeValue(ctx.javascript_native_statement());
	this.setNodeValue(ctx, stmt);
};

OPromptoBuilder.prototype.exitJavascript_native_statement = function(ctx) {
	const stmt = this.getNodeValue(ctx.javascript_statement());
	const module = this.getNodeValue(ctx.javascript_module());
    stmt.module = module || null;
	this.setNodeValue(ctx, new javascript.JavaScriptNativeCall(stmt));
}


OPromptoBuilder.prototype.exitNative_method_declaration = function(ctx) {
	const type = this.getNodeValue(ctx.typ);
	const name = this.getNodeValue(ctx.name);
	const params = this.getNodeValue(ctx.args);
	const stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new declaration.NativeMethodDeclaration(name, params, type, stmts));
};


OPromptoBuilder.prototype.exitJavaArgumentList = function(ctx) {
	const item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new java.JavaExpressionList(item));
};

OPromptoBuilder.prototype.exitJavascriptArgumentList = function(ctx) {
	const item = this.getNodeValue(ctx.item);
	this.setNodeValue(ctx, new javascript.JavaScriptExpressionList(item));
};

OPromptoBuilder.prototype.exitJavaArgumentListItem = function(ctx) {
	const item = this.getNodeValue(ctx.item);
	const items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};

OPromptoBuilder.prototype.exitJavascriptArgumentListItem = function(ctx) {
	const item = this.getNodeValue(ctx.item);
	const items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};

OPromptoBuilder.prototype.exitJava_method_expression = function(ctx) {
	const name = this.getNodeValue(ctx.name);
	const args = this.getNodeValue(ctx.args);
	this.setNodeValue(ctx, new java.JavaMethodExpression(name, args));
};

OPromptoBuilder.prototype.exitJava_this_expression = function(ctx) {
    this.setNodeValue(ctx, new java.JavaThisExpression());
};

OPromptoBuilder.prototype.exitJavaScriptMethodExpression = function(ctx) {
    const method = this.getNodeValue(ctx.method);
    this.setNodeValue(ctx, method);
};

OPromptoBuilder.prototype.exitJavascript_method_expression = function(ctx) {
	const id = this.getNodeValue(ctx.name);
	const args = this.getNodeValue(ctx.args);
	this.setNodeValue(ctx, new javascript.JavaScriptMethodExpression(id, args));
};

OPromptoBuilder.prototype.exitJavaMethodExpression = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};



OPromptoBuilder.prototype.exitFlush_statement = function(ctx) {
    this.setNodeValue(ctx, new statement.FlushStatement());
};


OPromptoBuilder.prototype.exitFlushStatement = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.stmt));
};


OPromptoBuilder.prototype.exitFullDeclarationList = function(ctx) {
	const items = this.getNodeValue(ctx.declarations()) || new declaration.DeclarationList();
	this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitDeclaration = function(ctx) {
    const comments = this.readComments(ctx.comment_statement());
    const annotations = this.readAnnotations(ctx.annotation_constructor());
    const ctx_ = ctx.children[ctx.getChildCount()-1];
    const decl = this.getNodeValue(ctx_);
    if(decl!=null) {
        decl.comments = comments;
        decl.annotations = annotations;
        this.setNodeValue(ctx, decl);
    }
};


OPromptoBuilder.prototype.exitDeclarations = function(ctx) {
    const items = new declaration.DeclarationList();
    ctx.declaration().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitIteratorExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    const name = this.getNodeValue(ctx.name);
    const source = this.getNodeValue(ctx.source);
    this.setNodeValue(ctx, new expression.IteratorExpression(name, source, exp));
};


OPromptoBuilder.prototype.exitIteratorType = function(ctx) {
    const typ = this.getNodeValue(ctx.i);
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
	const map = this.getNodeValue(ctx.binding);
	this.setNodeValue(ctx, new java.JavaNativeCategoryBinding(map));
};

OPromptoBuilder.prototype.exitJavaScriptCategoryBinding = function(ctx) {
	this.setNodeValue(ctx, this.getNodeValue(ctx.binding));
};


OPromptoBuilder.prototype.exitJavascript_category_binding = function(ctx) {
    const identifier = ctx.javascript_identifier().map(cx => cx.getText()).join(".");
    const module = this.getNodeValue(ctx.javascript_module()) || null;
	const map = new javascript.JavaScriptNativeCategoryBinding(identifier, module);
	this.setNodeValue(ctx, map);
};


OPromptoBuilder.prototype.exitJavascript_module = function(ctx) {
	const ids = ctx.javascript_identifier().map(rule => rule.getText());
	const module = new javascript.JavaScriptModule(ids);
	this.setNodeValue(ctx, module);
};


OPromptoBuilder.prototype.exitNativeCategoryBindingList = function(ctx) {
	const item = this.getNodeValue(ctx.item);
	const items = new grammar.NativeCategoryBindingList(item);
	this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitNativeCategoryBindingListItem = function(ctx) {
	const item = this.getNodeValue(ctx.item);
	const items = this.getNodeValue(ctx.items);
	items.add(item);
	this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitNative_category_bindings = function(ctx) {
	const items = this.getNodeValue(ctx.items);
	this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitNative_category_declaration = function(ctx) {
	const name = this.getNodeValue(ctx.name);
	const attrs = this.getNodeValue(ctx.attrs);
	const bindings = this.getNodeValue(ctx.bindings);
    const methods = this.getNodeValue(ctx.methods);
    const decl = new declaration.NativeCategoryDeclaration(name, attrs, bindings, null, methods);
    decl.storable = ctx.STORABLE()!=null;
    this.setNodeValue(ctx, decl);
};


OPromptoBuilder.prototype.exitNative_widget_declaration = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const bindings = this.getNodeValue(ctx.bindings);
    const methods = this.getNodeValue(ctx.methods);
    const decl = new declaration.NativeWidgetDeclaration(name, bindings, methods);
    this.setNodeValue(ctx, decl);
};



OPromptoBuilder.prototype.exitNativeCategoryDeclaration = function(ctx) {
	const decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, decl);
};


OPromptoBuilder.prototype.exitNative_resource_declaration = function(ctx) {
	const name = this.getNodeValue(ctx.name);
	const attrs = this.getNodeValue(ctx.attrs);
	const bindings = this.getNodeValue(ctx.bindings);
    const methods = this.getNodeValue(ctx.methods);
    const decl = new declaration.NativeResourceDeclaration(name, attrs, bindings, null, methods);
    decl.storable = ctx.STORABLE()!=null;
    this.setNodeValue(ctx, decl);
};


OPromptoBuilder.prototype.exitResource_declaration = function(ctx) {
    const decl = this.getNodeValue(ctx.native_resource_declaration());
	this.setNodeValue(ctx, decl);
};


OPromptoBuilder.prototype.exitParenthesis_expression = function(ctx) {
	const exp = this.getNodeValue(ctx.expression());
	this.setNodeValue(ctx, new expression.ParenthesisExpression(exp));
};


OPromptoBuilder.prototype.exitParenthesisExpression = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitNative_symbol_list = function(ctx) {
    const items = new grammar.NativeSymbolList();
    ctx.native_symbol().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitEnum_native_declaration = function(ctx) {
	const name = this.getNodeValue(ctx.name);
	const type = this.getNodeValue(ctx.typ);
	const symbols = this.getNodeValue(ctx.symbols);
	this.setNodeValue(ctx, new declaration.EnumeratedNativeDeclaration(name, type, symbols));
};


OPromptoBuilder.prototype.exitFor_each_statement = function(ctx) {
	const name1 = this.getNodeValue(ctx.name1);
	const name2 = this.getNodeValue(ctx.name2);
	const source = this.getNodeValue(ctx.source);
	const stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.ForEachStatement(name1, name2, source, stmts));
};


OPromptoBuilder.prototype.exitForEachStatement = function(ctx) {
	const stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitKey_token = function(ctx) {
	this.setNodeValue(ctx, ctx.getText());
};


OPromptoBuilder.prototype.exitUUIDLiteral = function(ctx) {
    this.setNodeValue(ctx, new literal.UUIDLiteral(ctx.getText()));
};



OPromptoBuilder.prototype.exitUUIDType = function(ctx) {
    this.setNodeValue(ctx, type.UUIDType.instance);
};



OPromptoBuilder.prototype.exitValue_token = function(ctx) {
	this.setNodeValue(ctx, ctx.getText());
};


OPromptoBuilder.prototype.exitNamed_argument = function(ctx) {
    const name = this.getNodeValue(ctx.variable_identifier());
    const arg = new param.UnresolvedParameter(name);
    const exp = this.getNodeValue(ctx.literal_expression());
    arg.defaultExpression = exp || null;
    this.setNodeValue(ctx, arg);
};


OPromptoBuilder.prototype.exitClosureStatement = function(ctx) {
	const decl = this.getNodeValue(ctx.decl);
	this.setNodeValue(ctx, new statement.DeclarationStatement(decl));
};


OPromptoBuilder.prototype.exitReturn_statement = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new statement.ReturnStatement(exp));
};


OPromptoBuilder.prototype.exitReturnStatement = function(ctx) {
	const stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitClosure_expression = function(ctx) {
	const name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new expression.MethodExpression(name));
};


OPromptoBuilder.prototype.exitClosureExpression = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitIf_statement = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	const stmts = this.getNodeValue(ctx.stmts);
	const elseIfs = this.getNodeValue(ctx.elseIfs);
	const elseStmts = this.getNodeValue(ctx.elseStmts);
	this.setNodeValue(ctx, new statement.IfStatement(exp, stmts, elseIfs, elseStmts));
};


OPromptoBuilder.prototype.exitElseIfStatementList = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	const stmts = this.getNodeValue(ctx.stmts);
	const elem = new statement.IfElement(exp, stmts);
	this.setNodeValue(ctx, new statement.IfElementList(elem));
};


OPromptoBuilder.prototype.exitElseIfStatementListItem = function(ctx) {
	const items = this.getNodeValue(ctx.items);
	const exp = this.getNodeValue(ctx.exp);
	const stmts = this.getNodeValue(ctx.stmts);
	const elem = new statement.IfElement(exp, stmts);
	items.add(elem);
	this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitIfStatement = function(ctx) {
	const stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitSuperExpression = function(ctx) {
    this.setNodeValue(ctx, new expression.SuperExpression());
};


OPromptoBuilder.prototype.exitSwitchStatement = function(ctx) {
	const stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitAssignTupleStatement = function(ctx) {
	const stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitRaiseStatement = function(ctx) {
	const stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitWriteStatement = function(ctx) {
	const stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitWithResourceStatement = function(ctx) {
	const stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitWhileStatement = function(ctx) {
	const stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitDoWhileStatement = function(ctx) {
	const stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitTryStatement = function(ctx) {
	const stmt = this.getNodeValue(ctx.stmt);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitEqualsExpression = function(ctx) {
	const left = this.getNodeValue(ctx.left);
	const right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.EQUALS, right));
};


OPromptoBuilder.prototype.exitNotEqualsExpression = function(ctx) {
	const left = this.getNodeValue(ctx.left);
	const right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.NOT_EQUALS, right));
};


OPromptoBuilder.prototype.exitGreaterThanExpression = function(ctx) {
	const left = this.getNodeValue(ctx.left);
	const right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.GT, right));
};


OPromptoBuilder.prototype.exitGreaterThanOrEqualExpression = function(ctx) {
	const left = this.getNodeValue(ctx.left);
	const right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.GTE, right));
};


OPromptoBuilder.prototype.exitLessThanExpression = function(ctx) {
	const left = this.getNodeValue(ctx.left);
	const right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.LT, right));
};


OPromptoBuilder.prototype.exitLessThanOrEqualExpression = function(ctx) {
	const left = this.getNodeValue(ctx.left);
	const right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.LTE, right));
};


OPromptoBuilder.prototype.exitAtomicSwitchCase = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	const stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.AtomicSwitchCase(exp, stmts));
};


OPromptoBuilder.prototype.exitCollection_literal = function(ctx) {
    const value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};


OPromptoBuilder.prototype.exitCollectionSwitchCase = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	const stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.CollectionSwitchCase(exp, stmts));
};


OPromptoBuilder.prototype.exitSwitch_case_statement_list = function(ctx) {
    const items = new statement.SwitchCaseList();
    ctx.switch_case_statement().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitSwitch_statement = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	const cases = this.getNodeValue(ctx.cases);
	const stmts = this.getNodeValue(ctx.stmts);
	const stmt = new statement.SwitchStatement(exp, cases, stmts);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitLiteralRangeLiteral = function(ctx) {
	const low = this.getNodeValue(ctx.low);
	const high = this.getNodeValue(ctx.high);
	this.setNodeValue(ctx, new literal.RangeLiteral(low, high));
};


OPromptoBuilder.prototype.exitLiteralListLiteral = function(ctx) {
    const exp = this.getNodeValue(ctx.literal_list_literal());
    this.setNodeValue(ctx, new literal.ListLiteral(false, exp));
};


OPromptoBuilder.prototype.exitLiteral_list_literal = function(ctx) {
    const items = new expression.ExpressionList();
    ctx.atomic_literal().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitInExpression = function(ctx) {
	const left = this.getNodeValue(ctx.left);
	const right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.IN, right));
};


OPromptoBuilder.prototype.exitNotInExpression = function(ctx) {
	const left = this.getNodeValue(ctx.left);
	const right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_IN, right));
};


OPromptoBuilder.prototype.exitCssType = function(ctx) {
    this.setNodeValue(ctx, type.CssType.instance);
};


OPromptoBuilder.prototype.exitHasExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.HAS, right));
};


OPromptoBuilder.prototype.exitNotHasExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_HAS, right));
};


OPromptoBuilder.prototype.exitHasAllExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.HAS_ALL, right));
};


OPromptoBuilder.prototype.exitNotHasAllExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_HAS_ALL, right));
};


OPromptoBuilder.prototype.exitHasAnyExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.HAS_ANY, right));
};


OPromptoBuilder.prototype.exitNotHasAnyExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_HAS_ANY, right));
};


OPromptoBuilder.prototype.exitContainsExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.CONTAINS, right));
};


OPromptoBuilder.prototype.exitNotContainsExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.NOT_CONTAINS, right));
};


OPromptoBuilder.prototype.exitDivideExpression = function(ctx) {
	const left = this.getNodeValue(ctx.left);
	const right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.DivideExpression(left, right));
};


OPromptoBuilder.prototype.exitIntDivideExpression = function(ctx) {
	const left = this.getNodeValue(ctx.left);
	const right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.IntDivideExpression(left, right));
};


OPromptoBuilder.prototype.exitModuloExpression = function(ctx) {
	const left = this.getNodeValue(ctx.left);
	const right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.ModuloExpression(left, right));
};


OPromptoBuilder.prototype.exitAnnotation_constructor = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const args = new literal.DocEntryList();
    const exp = this.getNodeValue(ctx.exp);
    if (exp != null) {
        args.add(new literal.DocEntry(null, exp));
    }
    ctx.annotation_argument().map(function(argCtx) {
        const arg = this.getNodeValue(argCtx);
        args.add(arg);
    }, this);
    this.setNodeValue(ctx, new grammar.Annotation(name, args));
};


OPromptoBuilder.prototype.exitAnnotation_argument = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new literal.DocEntry(name, exp));
};


OPromptoBuilder.prototype.exitAnnotation_identifier = function(ctx) {
    this.setNodeValue(ctx, new grammar.Identifier(ctx.getText()));
};


OPromptoBuilder.prototype.exitAnnotation_argument_name = function(ctx) {
    this.setNodeValue(ctx, ctx.getText());
};


OPromptoBuilder.prototype.exitAnnotationLiteralValue = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitAnnotationTypeValue = function(ctx) {
    const typ = this.getNodeValue(ctx.typ);
    this.setNodeValue(ctx, new expression.TypeExpression(typ));
};


OPromptoBuilder.prototype.exitAndExpression = function(ctx) {
	const left = this.getNodeValue(ctx.left);
	const right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.AndExpression(left, right));
};

OPromptoBuilder.prototype.exitNullLiteral = function(ctx) {
    this.setNodeValue(ctx, literal.NullLiteral.instance);
};


OPromptoBuilder.prototype.exitOperator_argument = function(ctx) {
    const value = this.getNodeValue (ctx.getChild (0));
    this.setNodeValue (ctx, value);
};


OPromptoBuilder.prototype.exitOperatorArgument = function(ctx) {
    const arg = this.getNodeValue(ctx.arg);
    arg.setMutable(ctx.MUTABLE()!=null);
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
    const value = this.getNodeValue (ctx.getChild (0));
    this.setNodeValue (ctx, value);
};


OPromptoBuilder.prototype.exitOperator_method_declaration= function(ctx) {
    const op = this.getNodeValue(ctx.op);
    const arg = this.getNodeValue(ctx.arg);
    const typ = this.getNodeValue(ctx.typ);
    const stmts = this.getNodeValue(ctx.stmts);
    const decl = new declaration.OperatorMethodDeclaration(op, arg, typ, stmts);
    this.setNodeValue(ctx, decl);
};


OPromptoBuilder.prototype.exitOrder_by = function(ctx) {
    const ids = new grammar.IdentifierList();
    ctx.variable_identifier().map( function(ctx_) {
        ids.push(this.getNodeValue(ctx_));
    }, this);
    const clause = new grammar.OrderByClause(ids, ctx.DESC()!=null);
    this.setNodeValue(ctx, clause);
};

OPromptoBuilder.prototype.exitOrder_by_list = function(ctx) {
    const list = new grammar.OrderByClauseList();
    ctx.order_by().map( function(ctx_) {
        list.add(this.getNodeValue(ctx_));
    }, this);
    this.setNodeValue(ctx, list);
};

OPromptoBuilder.prototype.exitOrExpression = function(ctx) {
	const left = this.getNodeValue(ctx.left);
	const right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.OrExpression(left, right));
};


OPromptoBuilder.prototype.exitMultiplyExpression = function(ctx) {
	const left = this.getNodeValue(ctx.left);
	const right = this.getNodeValue(ctx.right);
	this.setNodeValue(ctx, new expression.MultiplyExpression(left, right));
};


OPromptoBuilder.prototype.exitMutable_category_type = function(ctx) {
    const typ = this.getNodeValue (ctx.category_type());
    typ.mutable = ctx.MUTABLE()!=null;
    this.setNodeValue(ctx, typ);
};


OPromptoBuilder.prototype.exitMutableInstanceExpression = function(ctx) {
    const source = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new expression.MutableExpression(source));
};


OPromptoBuilder.prototype.exitMutableSelectableExpression = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
};


OPromptoBuilder.prototype.exitMutableSelectorExpression = function(ctx) {
    const parent = this.getNodeValue(ctx.parent);
    const selector = this.getNodeValue(ctx.selector);
    selector.parent = parent;
    this.setNodeValue(ctx, selector);
};


OPromptoBuilder.prototype.exitMinusExpression = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new expression.MinusExpression(exp));
};


OPromptoBuilder.prototype.exitNotExpression = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new expression.NotExpression(exp));
};


OPromptoBuilder.prototype.exitWhile_statement = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	const stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.WhileStatement(exp, stmts));
};


OPromptoBuilder.prototype.exitDo_while_statement = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	const stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.DoWhileStatement(exp, stmts));
};

OPromptoBuilder.prototype.exitSingleton_category_declaration = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const attrs = this.getNodeValue(ctx.attrs);
    const methods = this.getNodeValue(ctx.methods);
    this.setNodeValue(ctx, new declaration.SingletonCategoryDeclaration(name, attrs, methods));
};

OPromptoBuilder.prototype.exitSingletonCategoryDeclaration = function(ctx) {
    const decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
};

OPromptoBuilder.prototype.exitSliceFirstAndLast = function(ctx) {
	const first = this.getNodeValue(ctx.first);
	const last = this.getNodeValue(ctx.last);
	this.setNodeValue(ctx, new expression.SliceSelector(null, first, last));
};


OPromptoBuilder.prototype.exitSliceFirstOnly = function(ctx) {
	const first = this.getNodeValue(ctx.first);
	this.setNodeValue(ctx, new expression.SliceSelector(null, first, null));
};


OPromptoBuilder.prototype.exitSliceLastOnly = function(ctx) {
	const last = this.getNodeValue(ctx.last);
	this.setNodeValue(ctx, new expression.SliceSelector(null, null, last));
};


OPromptoBuilder.prototype.exitSorted_expression = function(ctx) {
	const source = this.getNodeValue(ctx.source);
    const desc = ctx.DESC()!=null;
    const key = this.getNodeValue(ctx.key);
	this.setNodeValue(ctx, new expression.SortedExpression(source, desc, key));
};


OPromptoBuilder.prototype.exitSorted_key = function(ctx) {
    const exp = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitDocument_expression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new expression.DocumentExpression(exp));
};


OPromptoBuilder.prototype.exitDocumentType = function(ctx) {
	this.setNodeValue(ctx, type.DocumentType.instance);
};


OPromptoBuilder.prototype.exitDocument_literal = function(ctx) {
    const entries = this.getNodeValue(ctx.doc_entry_list()) || new literal.DocEntryList();
    this.setNodeValue(ctx, new literal.DocumentLiteral(entries));
};


OPromptoBuilder.prototype.exitFetchStatement = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.stmt));
};


OPromptoBuilder.prototype.exitFetchMany = function(ctx) {
    const category = this.getNodeValue(ctx.typ);
    const predicate = this.getNodeValue(ctx.predicate);
    const start = this.getNodeValue(ctx.xstart);
    const stop = this.getNodeValue(ctx.xstop);
    const orderBy = this.getNodeValue(ctx.orderby);
    this.setNodeValue(ctx, new expression.FetchManyExpression(category, start, stop, predicate, orderBy));
};


OPromptoBuilder.prototype.exitFetchManyAsync = function(ctx) {
    const category = this.getNodeValue(ctx.typ);
    const predicate = this.getNodeValue(ctx.predicate);
    const start = this.getNodeValue(ctx.xstart);
    const stop = this.getNodeValue(ctx.xstop);
    const orderBy = this.getNodeValue(ctx.orderby);
    const name = this.getNodeValue(ctx.name);
    const stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.FetchManyStatement(category, start, stop, predicate, orderBy, name, stmts));
};


OPromptoBuilder.prototype.exitFetchOne = function(ctx) {
    const category = this.getNodeValue(ctx.typ);
    const predicate = this.getNodeValue(ctx.predicate);
    this.setNodeValue(ctx, new expression.FetchOneExpression(category, predicate));
};


OPromptoBuilder.prototype.exitFetchOneAsync = function(ctx) {
    const category = this.getNodeValue(ctx.typ);
    const predicate = this.getNodeValue(ctx.predicate);
    const name = this.getNodeValue(ctx.name);
    const stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.FetchOneStatement(category, predicate, name, stmts));
};


OPromptoBuilder.prototype.exitFiltered_list_expression = function(ctx) {
    const itemName = this.getNodeValue(ctx.name);
    const source = this.getNodeValue(ctx.source);
    const predicate = this.getNodeValue(ctx.predicate);
    this.setNodeValue(ctx, new expression.FilteredExpression(itemName, source, predicate));
};


OPromptoBuilder.prototype.exitCode_type = function(ctx) {
	this.setNodeValue(ctx, type.CodeType.instance);
};


OPromptoBuilder.prototype.exitExecuteExpression = function(ctx) {
	const name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new expression.ExecuteExpression(name));
};


OPromptoBuilder.prototype.exitExpression_list = function(ctx) {
    const items = new expression.ExpressionList();
    ctx.expression().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitExpression_tuple = function(ctx) {
    const items = new expression.ExpressionList();
    ctx.expression().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitCodeExpression = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new expression.CodeExpression(exp));
};


OPromptoBuilder.prototype.exitCategory_or_any_type = function(ctx) {
    const exp = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitCode_argument = function(ctx) {
	const name = this.getNodeValue(ctx.name);
	this.setNodeValue(ctx, new param.CodeParameter(name));
};


OPromptoBuilder.prototype.exitCategory_symbol = function(ctx) {
	const name = this.getNodeValue(ctx.name);
	const args = this.getNodeValue(ctx.args);
	this.setNodeValue(ctx, new expression.CategorySymbol(name, args));
};


OPromptoBuilder.prototype.exitCategory_symbol_list = function(ctx) {
    const items = new grammar.CategorySymbolList();
    ctx.category_symbol().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitEnum_category_declaration = function(ctx) {
	const name = this.getNodeValue(ctx.name);
	const attrs = this.getNodeValue(ctx.attrs);
	const parent = this.getNodeValue(ctx.derived);
	const derived = parent==null ? null : new grammar.IdentifierList(parent);
	const symbols = this.getNodeValue(ctx.symbols);
	this.setNodeValue(ctx, new declaration.EnumeratedCategoryDeclaration(name, attrs, derived, symbols));
};


OPromptoBuilder.prototype.exitEnum_declaration = function(ctx) {
    const value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};


OPromptoBuilder.prototype.exitRead_all_expression = function(ctx) {
	const source = this.getNodeValue(ctx.source);
	this.setNodeValue(ctx, new expression.ReadAllExpression(source));
};


OPromptoBuilder.prototype.exitRead_blob_expression = function(ctx) {
    const source = this.getNodeValue(ctx.source);
    this.setNodeValue(ctx, new expression.ReadBlobExpression(source));
};


OPromptoBuilder.prototype.exitRead_one_expression = function(ctx) {
    const source = this.getNodeValue(ctx.source);
    this.setNodeValue(ctx, new expression.ReadOneExpression(source));
};


OPromptoBuilder.prototype.exitRead_statement = function(ctx) {
    const source = this.getNodeValue(ctx.source);
    const name = this.getNodeValue(ctx.name);
    const stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.ReadStatement(source, name, stmts));
};


OPromptoBuilder.prototype.exitReadStatement = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.stmt));
};


OPromptoBuilder.prototype.exitRepl = function(ctx) {
    const value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};


OPromptoBuilder.prototype.exitWith_singleton_statement = function(ctx) {
    const name = this.getNodeValue(ctx.typ);
    const typ = new type.CategoryType(name);
    const stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.WithSingletonStatement(typ, stmts));
};


OPromptoBuilder.prototype.exitWithSingletonStatement = function(ctx) {
    const stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};

OPromptoBuilder.prototype.exitWrite_statement = function(ctx) {
	const what = this.getNodeValue(ctx.what);
	const target = this.getNodeValue(ctx.target);
	this.setNodeValue(ctx, new statement.WriteStatement(what, target));
};


OPromptoBuilder.prototype.exitWith_resource_statement = function(ctx) {
	const stmt = this.getNodeValue(ctx.stmt);
	const stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.WithResourceStatement(stmt, stmts));
};


OPromptoBuilder.prototype.exitAnyType = function(ctx) {
	this.setNodeValue(ctx, type.AnyType.instance);
};


OPromptoBuilder.prototype.exitAnyListType = function(ctx) {
	const type = this.getNodeValue(ctx.typ);
	this.setNodeValue(ctx, new type.ListType(type));
};


OPromptoBuilder.prototype.exitAnyDictType = function(ctx) {
	const type = this.getNodeValue(ctx.typ);
	this.setNodeValue(ctx, new type.DictType(type));
};


OPromptoBuilder.prototype.exitCastExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const type = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.CastExpression(left, type, ctx.MUTABLE() != null));
};


OPromptoBuilder.prototype.exitCatchAtomicStatement = function(ctx) {
	const name = this.getNodeValue(ctx.name);
	const stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.AtomicSwitchCase(new expression.SymbolExpression(name), stmts));
};


OPromptoBuilder.prototype.exitCatchCollectionStatement = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	const stmts = this.getNodeValue(ctx.stmts);
	this.setNodeValue(ctx, new statement.CollectionSwitchCase(exp, stmts));
};


OPromptoBuilder.prototype.exitCatch_statement_list = function(ctx) {
    const items = new statement.SwitchCaseList();
    ctx.catch_statement().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


OPromptoBuilder.prototype.exitTry_statement = function(ctx) {
	const name = this.getNodeValue(ctx.name);
	const stmts = this.getNodeValue(ctx.stmts);
	const handlers = this.getNodeValue(ctx.handlers);
	const anyStmts = this.getNodeValue(ctx.anyStmts);
	const finalStmts = this.getNodeValue(ctx.finalStmts);
	const stmt = new statement.SwitchErrorStatement(name, stmts, handlers, anyStmts, finalStmts);
	this.setNodeValue(ctx, stmt);
};


OPromptoBuilder.prototype.exitRaise_statement = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new statement.RaiseStatement(exp));
};


OPromptoBuilder.prototype.exitMatchingList = function(ctx) {
	const exp = this.getNodeValue(ctx.source);
	this.setNodeValue(ctx, new constraint.MatchingCollectionConstraint(exp));
};


OPromptoBuilder.prototype.exitMatchingRange = function(ctx) {
	const exp = this.getNodeValue(ctx.source);
	this.setNodeValue(ctx, new constraint.MatchingCollectionConstraint(exp));
};


OPromptoBuilder.prototype.exitMatchingExpression = function(ctx) {
	const exp = this.getNodeValue(ctx.exp);
	this.setNodeValue(ctx, new constraint.MatchingExpressionConstraint(exp));
};


OPromptoBuilder.prototype.exitMatchingPattern = function(ctx) {
	this.setNodeValue(ctx, new constraint.MatchingPatternConstraint(new literal.TextLiteral(ctx.text.text)));
};

OPromptoBuilder.prototype.exitLiteralSetLiteral = function(ctx) {
    const items = this.getNodeValue(ctx.literal_list_literal());
    this.setNodeValue(ctx, new literal.SetLiteral(items));
};

OPromptoBuilder.prototype.exitCsharp_identifier = function(ctx) {
    this.setNodeValue(ctx, ctx.getText());
};

OPromptoBuilder.prototype.exitCSharpIdentifier = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new csharp.CSharpIdentifierExpression(null, name));
};

OPromptoBuilder.prototype.exitCSharpChildIdentifier = function(ctx) {
    const parent = this.getNodeValue(ctx.parent);
    const name = this.getNodeValue(ctx.name);
    const child = new csharp.CSharpIdentifierExpression(parent, name);
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
    const binding = this.getNodeValue(ctx.binding);
    this.setNodeValue(ctx, new csharp.CSharpNativeCategoryBinding(binding));
};

OPromptoBuilder.prototype.exitCsharp_primary_expression = function(ctx) {
    const value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};

OPromptoBuilder.prototype.exitCsharp_this_expression = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpThisExpression());
};

OPromptoBuilder.prototype.exitCsharp_method_expression = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const args = this.getNodeValue(ctx.args);
    this.setNodeValue(ctx, new csharp.CSharpMethodExpression(name, args));
};

OPromptoBuilder.prototype.exitCSharpMethodExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

OPromptoBuilder.prototype.exitCSharpArgumentList = function(ctx) {
    const item = this.getNodeValue(ctx.item);
    this.setNodeValue(ctx, new csharp.CSharpExpressionList(item));
};

OPromptoBuilder.prototype.exitCSharpArgumentListItem = function(ctx) {
    const item = this.getNodeValue(ctx.item);
    const items = this.getNodeValue(ctx.items);
    items.add(item);
    this.setNodeValue(ctx, items);
};

OPromptoBuilder.prototype.exitCSharpNativeStatement = function(ctx) {
    const stmt = this.getNodeValue(ctx.csharp_statement());
    const call = new csharp.CSharpNativeCall(stmt);
    this.setNodeValue(ctx, call);
};


OPromptoBuilder.prototype.exitCSharpPromptoIdentifier = function(ctx) {
    const name = ctx.DOLLAR_IDENTIFIER().getText();
    this.setNodeValue(ctx, new csharp.CSharpIdentifierExpression(null, name));
};


OPromptoBuilder.prototype.exitCSharpPrimaryExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

OPromptoBuilder.prototype.exitCSharpSelectorExpression = function(ctx) {
    const parent = this.getNodeValue(ctx.parent);
    const child = this.getNodeValue(ctx.child);
    child.parent = parent;
    this.setNodeValue(ctx, child);
};

OPromptoBuilder.prototype.exitCSharpStatement = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    const stmt = new csharp.CSharpStatement(exp,false);
    this.setNodeValue(ctx, stmt);
};

OPromptoBuilder.prototype.exitCSharpReturnStatement = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new csharp.CSharpStatement(exp,true));
};


OPromptoBuilder.prototype.exitPythonStatement = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new python.PythonStatement(exp,false));
};

OPromptoBuilder.prototype.exitPythonReturnStatement = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new python.PythonStatement(exp,true));
};

OPromptoBuilder.prototype.exitPython2CategoryBinding = function(ctx) {
    const map = this.getNodeValue(ctx.binding);
    this.setNodeValue(ctx, new python.Python2NativeCategoryBinding(map));
};


OPromptoBuilder.prototype.exitPython3CategoryBinding = function(ctx) {
    const map = this.getNodeValue(ctx.binding);
    this.setNodeValue(ctx, new python.Python3NativeCategoryBinding(map));
};


OPromptoBuilder.prototype.exitPython_category_binding = function(ctx) {
    const identifier = ctx.identifier().getText();
    const module = this.getNodeValue(ctx.python_module());
    const map = new python.PythonNativeCategoryBinding(identifier, module);
    this.setNodeValue(ctx, map);
};

OPromptoBuilder.prototype.exitPython_method_expression = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const args = this.getNodeValue(ctx.args);
    const method = new python.PythonMethodExpression(name, args);
    this.setNodeValue(ctx, method);
};

OPromptoBuilder.prototype.exitPythonGlobalMethodExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

OPromptoBuilder.prototype.exitPythonMethodExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

OPromptoBuilder.prototype.exitPython_module = function(ctx) {
    const ids = ctx.python_identifier().map(rule => rule.getText());
    const module = new python.PythonModule(ids);
    this.setNodeValue(ctx, module);
};

OPromptoBuilder.prototype.exitPython2NativeStatement = function(ctx) {
    const stmt = this.getNodeValue(ctx.python_native_statement());
    this.setNodeValue(ctx, new python.Python2NativeCall(stmt));
};


OPromptoBuilder.prototype.exitPython3NativeStatement = function(ctx) {
    const stmt = this.getNodeValue(ctx.python_native_statement());
    this.setNodeValue(ctx, new python.Python3NativeCall(stmt));
};

OPromptoBuilder.prototype.exitPython_native_statement = function(ctx) {
    const stmt = this.getNodeValue(ctx.python_statement());
    const module = this.getNodeValue(ctx.python_module());
    stmt.module = module || null;
    this.setNodeValue(ctx, new python.PythonNativeCall(stmt));
}

OPromptoBuilder.prototype.exitPython_identifier = function(ctx) {
    this.setNodeValue(ctx, ctx.getText());
};

OPromptoBuilder.prototype.exitPythonIdentifier = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new python.PythonIdentifierExpression(null, name));
};

OPromptoBuilder.prototype.exitPythonIdentifierExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

OPromptoBuilder.prototype.exitPythonChildIdentifier = function(ctx) {
    const parent = this.getNodeValue(ctx.parent);
    const name = this.getNodeValue(ctx.name);
    const child = new python.PythonIdentifierExpression(parent, name);
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
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitPythonPromptoIdentifier = function(ctx) {
    const name = ctx.DOLLAR_IDENTIFIER().getText();
    this.setNodeValue(ctx, new python.PythonIdentifierExpression(null, name));
};


OPromptoBuilder.prototype.exitPythonPrimaryExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

OPromptoBuilder.prototype.exitPythonArgumentList = function(ctx) {
    const ordinal = this.getNodeValue(ctx.ordinal);
    const named = this.getNodeValue(ctx.named);
    ordinal.addAll(named);
    this.setNodeValue(ctx, ordinal);
};


OPromptoBuilder.prototype.exitPythonNamedOnlyArgumentList = function(ctx) {
    const named = this.getNodeValue(ctx.named);
    this.setNodeValue(ctx, named);
};

OPromptoBuilder.prototype.exitPythonNamedArgumentList = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const exp = this.getNodeValue(ctx.exp);
    const arg = new python.PythonNamedArgument(name, exp);
    this.setNodeValue(ctx, new python.PythonArgumentList(arg));
};

OPromptoBuilder.prototype.exitPythonNamedArgumentListItem = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const exp = this.getNodeValue(ctx.exp);
    const arg = new python.PythonNamedArgument(name, exp);
    const items = this.getNodeValue(ctx.items);
    items.add(arg);
    this.setNodeValue(ctx, items);
};

OPromptoBuilder.prototype.exitPythonOrdinalOnlyArgumentList = function(ctx) {
    const ordinal = this.getNodeValue(ctx.ordinal);
    this.setNodeValue(ctx, ordinal);
};

OPromptoBuilder.prototype.exitPythonOrdinalArgumentList = function(ctx) {
    const item = this.getNodeValue(ctx.item);
    const arg = new python.PythonOrdinalArgument(item);
    this.setNodeValue(ctx, new python.PythonArgumentList(arg));
};

OPromptoBuilder.prototype.exitPythonOrdinalOnlyArgumentList = function(ctx) {
    const ordinal = this.getNodeValue(ctx.ordinal);
    this.setNodeValue(ctx, ordinal);
};


OPromptoBuilder.prototype.exitPythonSelectorExpression = function(ctx) {
    const parent = this.getNodeValue(ctx.parent);
    const selector = this.getNodeValue(ctx.child);
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
    const exp = this.getNodeValue(ctx.exp);
    const suite = this.getHiddenTokensAfterNode(ctx.RCURL());
    this.setNodeValue(ctx, new jsx.JsxCode(exp, suite));
};


OPromptoBuilder.prototype.exitJsxExpression = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
};



OPromptoBuilder.prototype.exitJsxElement = function(ctx) {
    const elem = this.getNodeValue(ctx.opening);
    const closing = this.getNodeValue(ctx.closing);
    elem.setClosing(closing);
    const children = this.getNodeValue(ctx.children_);
    elem.setChildren(children);
    this.setNodeValue(ctx, elem);
};


OPromptoBuilder.prototype.exitJsxSelfClosing = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.jsx));
};



OPromptoBuilder.prototype.exitJsxText = function(ctx) {
    const text = parser.getFullText(ctx.text);
    this.setNodeValue(ctx, new jsx.JsxText(text));
};



OPromptoBuilder.prototype.exitJsxValue = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new jsx.JsxExpression(exp));
};


OPromptoBuilder.prototype.exitJsx_attribute = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const value = this.getNodeValue(ctx.value);
    const stop = value!=null ? ctx.value.stop : ctx.name.stop;
    const suite = value==null ? null : this.getHiddenTokensAfterToken(stop);
    this.setNodeValue(ctx, new jsx.JsxProperty(name, value, suite));
};



OPromptoBuilder.prototype.exitJsx_children = function(ctx) {
    const list = ctx.jsx_child()
        .map(cx => this.getNodeValue(cx), this);
    this.setNodeValue(ctx, list);
};


OPromptoBuilder.prototype.exitJsx_element_name = function(ctx) {
    const name = ctx.getText();
    this.setNodeValue(ctx, new grammar.Identifier(name));
};


OPromptoBuilder.prototype.exitJsx_expression = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.getChild(0)));
};


OPromptoBuilder.prototype.exitJsx_identifier = function(ctx) {
    const name = ctx.getText();
    this.setNodeValue(ctx, new grammar.Identifier(name));
};


OPromptoBuilder.prototype.exitJsx_fragment = function(ctx) {
    const openingSuite = this.getHiddenTokensAfterToken(ctx.jsx_fragment_start().stop);
    const fragment = new jsx.JsxFragment(openingSuite);
    fragment.children = this.getNodeValue(ctx.children_);
    this.setNodeValue(ctx, fragment);
};


OPromptoBuilder.prototype.exitJsxLiteral = function(ctx) {
    const text = ctx.getText();
    this.setNodeValue(ctx, new jsx.JsxLiteral(text));
};


OPromptoBuilder.prototype.exitJsx_opening = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const nameSuite = this.getHiddenTokensAfterToken(ctx.name.stop);
    const attributes = ctx.jsx_attribute()
        .map(cx => this.getNodeValue(cx), this);
    const openingSuite = this.getHiddenTokensAfterNode(ctx.GT());
    this.setNodeValue(ctx, new jsx.JsxElement(name, nameSuite, attributes, openingSuite));
};


OPromptoBuilder.prototype.exitJsx_closing = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const suite = this.getHiddenTokensAfterNode(ctx.GT());
    this.setNodeValue(ctx, new jsx.JsxClosing(name, suite));
};


OPromptoBuilder.prototype.exitJsx_self_closing = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const nameSuite = this.getHiddenTokensAfterToken(ctx.name.stop);
    const attributes = ctx.jsx_attribute()
        .map(cx => this.getNodeValue(cx), this);
    const suite = this.getHiddenTokensAfterNode(ctx.GT());
    this.setNodeValue(ctx, new jsx.JsxSelfClosing(name, nameSuite, attributes, suite));
};



OPromptoBuilder.prototype.exitCssExpression = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
}


OPromptoBuilder.prototype.exitCss_expression = function(ctx) {
    const exp = new css.CssExpression();
    ctx.css_field().forEach(function(cx) {
        const field = this.getNodeValue(cx);
        exp.addField(field);
    }, this);
    this.setNodeValue(ctx, exp);
};


OPromptoBuilder.prototype.exitCss_field = function(ctx) {
    const name = ctx.name.getText();
    const value = this.getNodeValue(ctx.value);
    this.setNodeValue(ctx, new css.CssField(name, value));
};



OPromptoBuilder.prototype.exitCssText = function(ctx) {
    const text = this.input.getText({start: ctx.text.start, stop: ctx.text.stop});
    this.setNodeValue(ctx, new css.CssText(text));
};


OPromptoBuilder.prototype.exitCssValue = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new css.CssCode(exp));
};



OPromptoBuilder.prototype.buildSection = function(node, section) {
	const first = this.findFirstValidToken(node.start.tokenIndex);
	const last = this.findLastValidToken(node.stop.tokenIndex);
    section.setSectionFrom(this.path, first, last, parser.Dialect.O);
};

OPromptoBuilder.prototype.findFirstValidToken = function(idx) {
	if(idx===-1) { // happens because input.index() is called before any other read operation (bug?)
		idx = 0;
	}
	do {
		const token = this.readValidToken(idx++);
		if(token!==null) {
			return token;
		}
	} while(idx<this.input.tokenSource.size);
	return null;
};

OPromptoBuilder.prototype.findLastValidToken = function(idx) {
	if(idx===-1) { // happens because input.index() is called before any other read operation (bug?)
		idx = 0;
	}
	while(idx>=0) {
		const token = this.readValidToken(idx--);
		if(token!==null) {
			return token;
		}
	}
	return null;
};

OPromptoBuilder.prototype.readValidToken = function(idx) {
	const token = this.input.get(idx);
	const text = token.text;
	// ignore trailing whitespace
	if(text!==null && text.replace(/(\n|\r|\t|' ')/g,"").length>0) {
		return token;
	} else {
		return null;
	}
};

