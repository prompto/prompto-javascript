import argument from '../param/index.js';
import constraint from '../constraint/index.js';
import instance from '../instance/index.js';
import declaration from '../declaration/index.js';
import expression from '../expression/index.js';
import javascript from '../javascript/index.js';
import statement from '../statement/index.js';
import literal from '../literal/index.js';
import grammar from '../grammar/index.js';
import param from '../param/index.js';
import utils from '../utils/index.js';
import parser from '../parser/index.js';
import type from '../type/index.js';
import jsx from '../jsx/index.js';
import css from '../css/index.js';
import java from '../java/index.js';
import csharp from '../csharp/index.js';
import python from '../python/index.js';

export default function EPromptoBuilder(eparser) {
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
    const hidden = this.input.getHiddenTokensToLeft(token.tokenIndex);
    return this.getHiddenTokensText(hidden);
};

EPromptoBuilder.prototype.getHiddenTokensAfter = function(token) {
    if(token.tokenIndex<0)
        return null;
    const hidden = this.input.getHiddenTokensToRight(token.tokenIndex);
    return this.getHiddenTokensText(hidden);
};


EPromptoBuilder.prototype.getHiddenTokensText = hidden => {
    if(hidden==null || hidden.length===0)
        return null;
    else
        return hidden.map(token => token.text).join("");
};

EPromptoBuilder.prototype.getWhiteSpacePlus = function(ctx) {
    let within = ctx.children==null ? null : ctx.children
        .filter(function(child) { return this.isNotIndent(child); } , this)
        .map(child => child.getText(), this)
        .join("");
    if(within==null || within.length===0)
        return null;
    const before = this.getHiddenTokensBefore(ctx.start);
    if(before!=null)
        within = before + within;
    const after = this.getHiddenTokensAfter(ctx.stop);
    if(after!=null)
        within = within + after;
    return within;
};

EPromptoBuilder.prototype.isNotIndent = tree => !tree.symbol || tree.symbol.type!=parser.EParser.INDENT

EPromptoBuilder.prototype.readAnnotations = function(ctxs) {
    const annotations = ctxs.map(function (csc) {
        return this.getNodeValue(csc);
    }, this);
    return (annotations.length == 0) ? null : annotations;
};


EPromptoBuilder.prototype.readComments = function(ctxs) {
    const comments = ctxs.map(function (csc) {
        return this.getNodeValue(csc);
    }, this);
    return (comments.length == 0) ? null : comments;
};


EPromptoBuilder.prototype.exitIdentifierExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new expression.UnresolvedIdentifier(exp));
};

EPromptoBuilder.prototype.exitTypeIdentifier = function(ctx) {
    const name = this.getNodeValue(ctx.type_identifier());
    this.setNodeValue(ctx, name);
};

EPromptoBuilder.prototype.exitMethodCallExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp1 || ctx.exp2);
    const args = this.getNodeValue(ctx.args);
    const call = new statement.UnresolvedCall(exp, args);
    this.setNodeValue(ctx, call);
};


EPromptoBuilder.prototype.exitUnresolvedExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitUnresolvedIdentifier = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new expression.UnresolvedIdentifier(name));
};

EPromptoBuilder.prototype.exitUnresolvedSelector = function(ctx) {
    const parent = this.getNodeValue(ctx.parent);
    const selector = this.getNodeValue(ctx.selector);
    selector.parent = parent;
    this.setNodeValue(ctx, selector);
};


EPromptoBuilder.prototype.exitUnresolved_selector = function(ctx) {
    const name = this.getNodeValue(ctx.name);
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
    const exp = this.getNodeValue(ctx.expression());
    this.setNodeValue(ctx, new expression.BlobExpression(exp));
};


EPromptoBuilder.prototype.exitBlobExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
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
    const condition = this.getNodeValue(ctx.test);
    const ifTrue = this.getNodeValue(ctx.ifTrue);
    const ifFalse = this.getNodeValue(ctx.ifFalse);
    const exp = new expression.TernaryExpression(condition, ifTrue, ifFalse);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitTest_method_declaration = function(ctx) {
    const name = new grammar.Identifier(ctx.name.text);
    name.setSectionFrom(this.path, ctx.name, ctx.name, parser.Dialect.E);
    const stmts = this.getNodeValue(ctx.stmts);
    const exps = this.getNodeValue(ctx.exps);
    const errorName = this.getNodeValue(ctx.error);
    const error = errorName==null ? null : new expression.SymbolExpression(errorName);
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
    const name = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, name);
};

EPromptoBuilder.prototype.exitVariable_identifier = function(ctx) {
    const name = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, name);
};

EPromptoBuilder.prototype.exitList_literal = function(ctx) {
    const mutable = ctx.MUTABLE() !== null;
    const items = this.getNodeValue(ctx.expression_list()) || null;
    const value = new literal.ListLiteral(mutable, items);
    this.setNodeValue(ctx, value);
};

EPromptoBuilder.prototype.exitDict_literal = function(ctx) {
    const mutable = ctx.MUTABLE() !== null;
    const items = this.getNodeValue(ctx.dict_entry_list()) || null;
    const value = new literal.DictLiteral(mutable, items);
    this.setNodeValue(ctx, value);
};

EPromptoBuilder.prototype.exitTuple_literal = function(ctx) {
    const mutable = ctx.MUTABLE() !== null;
    const items = this.getNodeValue(ctx.expression_tuple()) || null;
    const value = new literal.TupleLiteral(mutable, items);
    this.setNodeValue(ctx, value);
};


EPromptoBuilder.prototype.exitRange_literal = function(ctx) {
    const low = this.getNodeValue(ctx.low);
    const high = this.getNodeValue(ctx.high);
    this.setNodeValue(ctx, new literal.RangeLiteral(low, high));
};



EPromptoBuilder.prototype.exitDict_entry_list = function(ctx) {
    const items = new literal.DictEntryList(null, null);
    ctx.dict_entry().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitDict_entry = function(ctx) {
    const key = this.getNodeValue(ctx.key);
    const value = this.getNodeValue(ctx.value);
    const entry = new literal.DictEntry(key, value);
    this.setNodeValue(ctx, entry);
};


EPromptoBuilder.prototype.exitDoc_entry_list = function(ctx) {
    const items = new literal.DocEntryList(null, null);
    ctx.doc_entry().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitDoc_entry = function(ctx) {
    const key = this.getNodeValue(ctx.key);
    const value = this.getNodeValue(ctx.value);
    const entry = new literal.DocEntry(key, value);
    this.setNodeValue(ctx, entry);
};


EPromptoBuilder.prototype.exitDocKeyIdentifier = function(ctx) {
    const text = ctx.name.getText();
    this.setNodeValue(ctx, new literal.DocIdentifierKey(new grammar.Identifier(text)));
};


EPromptoBuilder.prototype.exitDocKeyText = function(ctx) {
    const text = ctx.name.text;
    this.setNodeValue(ctx, new literal.DocTextKey(text));
};


EPromptoBuilder.prototype.exitDoc_entry_list = function(ctx) {
    const items = new literal.DocEntryList(null, null);
    ctx.doc_entry().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitDoc_entry = function(ctx) {
    const key = this.getNodeValue(ctx.key);
    const value = this.getNodeValue(ctx.value);
    const entry = new literal.DocEntry(key, value);
    this.setNodeValue(ctx, entry);
};


EPromptoBuilder.prototype.exitDocKeyIdentifier = function(ctx) {
    const text = ctx.name.getText();
    this.setNodeValue(ctx, new literal.DocIdentifierKey(new grammar.Identifier(text)));
};


EPromptoBuilder.prototype.exitDocKeyText = function(ctx) {
    const text = ctx.name.text;
    this.setNodeValue(ctx, new literal.DocTextKey(text));
};


EPromptoBuilder.prototype.exitLiteral_expression = function(ctx) {
    const exp = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitLiteralExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitVariableIdentifier = function(ctx) {
    const name = this.getNodeValue(ctx.variable_identifier());
    this.setNodeValue(ctx, name);
};


EPromptoBuilder.prototype.exitSymbol_identifier = function(ctx) {
    const name = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, name);
};


EPromptoBuilder.prototype.exitNative_symbol = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new expression.NativeSymbol(name, exp));
};


EPromptoBuilder.prototype.exitSymbolIdentifier = function(ctx) {
    const name = this.getNodeValue(ctx.symbol_identifier());
    this.setNodeValue(ctx, name);
};


EPromptoBuilder.prototype.exitSymbolLiteral = function(ctx) {
    const name = ctx.getText();
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
    const type = this.getNodeValue(ctx.p);
    this.setNodeValue(ctx, type);
};


EPromptoBuilder.prototype.exitAttribute_declaration = function(ctx) {
    const id = this.getNodeValue(ctx.name);
    const type = this.getNodeValue(ctx.typ);
    const match = this.getNodeValue(ctx.match);
    let indices = null;
    if (ctx.indices !=null)
        indices = indices = this.getNodeValue(ctx.indices);
    else if(ctx.INDEX()!=null)
        indices =  new grammar.IdentifierList();
    if (ctx.index !=null)
        indices.push(this.getNodeValue(ctx.index))
    const decl = new declaration.AttributeDeclaration(id, type, match, indices);
    decl.storable = ctx.STORABLE()!=null;
    this.setNodeValue(ctx, decl);
};

EPromptoBuilder.prototype.exitNativeType = function(ctx) {
    const type = this.getNodeValue(ctx.n);
    this.setNodeValue(ctx, type);
};

EPromptoBuilder.prototype.exitCategoryType = function(ctx) {
    const type = this.getNodeValue(ctx.c);
    this.setNodeValue(ctx, type);
};


EPromptoBuilder.prototype.exitCategory_type = function(ctx) {
    const name = new grammar.Identifier(ctx.getText());
    this.buildSection(ctx, name);
    this.setNodeValue(ctx, new type.CategoryType(name));
};

EPromptoBuilder.prototype.exitListType = function(ctx) {
    const typ = this.getNodeValue(ctx.l);
    this.setNodeValue(ctx, new type.ListType(typ));
};

EPromptoBuilder.prototype.exitDictKeyIdentifier = function(ctx) {
    const text = ctx.name.getText();
    this.setNodeValue(ctx, new literal.DictIdentifierKey(new grammar.Identifier(text)));
};

EPromptoBuilder.prototype.exitDictKeyText = function(ctx) {
    const text = ctx.name.text;
    this.setNodeValue(ctx, new literal.DictTextKey(text));
};

EPromptoBuilder.prototype.exitDictType = function(ctx) {
    const typ = this.getNodeValue(ctx.d);
    this.setNodeValue(ctx, new type.DictionaryType(typ));
};

EPromptoBuilder.prototype.exitAttributeList = function(ctx) {
    const item = this.getNodeValue(ctx.item);
    this.setNodeValue(ctx, new grammar.IdentifierList(item));
};


EPromptoBuilder.prototype.exitAttributeListItem = function(ctx) {
    const items = this.getNodeValue(ctx.items);
    const item = this.getNodeValue(ctx.item);
    items.add(item);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitAttribute_identifier_list = function(ctx) {
    const list = new grammar.IdentifierList();
    const rules = ctx.attribute_identifier();
    rules.forEach(function(rule) {
        const item = this.getNodeValue(rule);
        list.add(item);
    }, this);
    this.setNodeValue(ctx, list);
};


EPromptoBuilder.prototype.exitVariable_identifier_list = function(ctx) {
    const list = new grammar.IdentifierList();
    const rules = ctx.variable_identifier();
    rules.forEach(function(rule) {
        const item = this.getNodeValue(rule);
        list.add(item);
    }, this);
    this.setNodeValue(ctx, list);
};




EPromptoBuilder.prototype.exitConcrete_category_declaration = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const attrs = this.getNodeValue(ctx.attrs) || null;
    const derived = this.getNodeValue(ctx.derived) || null;
    const methods = this.getNodeValue(ctx.methods) || null;
    const decl = new declaration.ConcreteCategoryDeclaration(name, attrs, derived, methods);
    decl.storable = ctx.STORABLE()!=null;
    this.setNodeValue(ctx, decl);
};



EPromptoBuilder.prototype.exitConcrete_widget_declaration = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const derived = this.getNodeValue(ctx.derived);
    const methods = this.getNodeValue(ctx.methods);
    const decl = new declaration.ConcreteWidgetDeclaration(name, derived, methods);
    this.setNodeValue(ctx, decl);
};


EPromptoBuilder.prototype.exitConcreteCategoryDeclaration = function(ctx) {
    const decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
};


EPromptoBuilder.prototype.exitConcreteWidgetDeclaration = function(ctx) {
    const decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
};


EPromptoBuilder.prototype.exitNativeWidgetDeclaration = function(ctx) {
    const decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
};


EPromptoBuilder.prototype.exitDerivedList = function(ctx) {
    const items = this.getNodeValue(ctx.items);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitDerivedListItem = function(ctx) {
    const items = this.getNodeValue(ctx.items);
    const item = this.getNodeValue(ctx.item);
    items.add(item);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitType_identifier = function(ctx) {
    const name = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, name);
};


EPromptoBuilder.prototype.exitType_identifier_list = function(ctx) {
    const items = new grammar.IdentifierList();
    ctx.type_identifier().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitType_literal = function(ctx) {
    const type = this.getNodeValue(ctx.category_or_any_type());
    this.setNodeValue(ctx, new literal.TypeLiteral(type));
};


EPromptoBuilder.prototype.exitTypeLiteral = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.type_literal()));
};


EPromptoBuilder.prototype.exitInstanceExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitSelectableExpression = function(ctx) {
    const parent = this.getNodeValue(ctx.parent);
    this.setNodeValue(ctx, parent);
};


EPromptoBuilder.prototype.exitSelectorExpression = function(ctx) {
    const selector = this.getNodeValue(ctx.selector);
    if(selector) {
        selector.parent = this.getNodeValue(ctx.parent);
        this.setNodeValue(ctx, selector);
    }
};

EPromptoBuilder.prototype.exitSet_literal = function(ctx) {
    const items = this.getNodeValue(ctx.expression_list());
    const set_ = new literal.SetLiteral(items);
    this.setNodeValue(ctx, set_);
};


EPromptoBuilder.prototype.exitStoreStatement = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.stmt));
};

EPromptoBuilder.prototype.exitStore_statement = function(ctx) {
    const del = this.getNodeValue(ctx.to_del);
    const add = this.getNodeValue(ctx.to_add);
    const stmts = this.getNodeValue(ctx.stmts);
    const stmt = new statement.StoreStatement(del, add, stmts);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitMember_identifier = function(ctx) {
    const name = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, name);
};


EPromptoBuilder.prototype.exitMemberSelector = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new expression.UnresolvedSelector(null, name));
};


EPromptoBuilder.prototype.exitItemSelector = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new expression.ItemSelector(null, exp));
};


EPromptoBuilder.prototype.exitSliceSelector = function(ctx) {
    const slice = this.getNodeValue(ctx.xslice);
    this.setNodeValue(ctx, slice);
};


EPromptoBuilder.prototype.exitTyped_argument = function(ctx) {
    const typ = this.getNodeValue(ctx.typ);
    const name = this.getNodeValue(ctx.name);
    const attrs = this.getNodeValue(ctx.attrs);
    const arg = attrs ?
        new argument.ExtendedParameter(typ, name, attrs) :
        new argument.CategoryParameter(typ, name);
    const exp = this.getNodeValue(ctx.value);
    arg.defaultExpression = exp || null;
    this.setNodeValue(ctx, arg);
};


EPromptoBuilder.prototype.exitCodeArgument = function(ctx) {
    const arg = this.getNodeValue(ctx.arg);
    this.setNodeValue(ctx, arg);
};


EPromptoBuilder.prototype.exitArgument_list = function(ctx) {
    const items = new param.ParameterList();
    ctx.argument().forEach(function(r) {
        const item = this.getNodeValue(r);
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
    const items = this.getNodeValue(ctx.items);
    const item = this.getNodeValue(ctx.item) || null;
    if(item!==null) {
        items.add(item);
    }
    this.setNodeValue(ctx, items);
};

EPromptoBuilder.prototype.exitArgument_assignment = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const exp = this.getNodeValue(ctx.exp);
    const arg = new argument.UnresolvedParameter(name);
    this.setNodeValue(ctx, new grammar.Argument(arg, exp));
};


EPromptoBuilder.prototype.exitArgumentAssignmentListExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    let items = this.getNodeValue(ctx.items) || null;
    if(items===null) {
        items = new grammar.ArgumentList();
    }
    items.insert(0, new grammar.Argument(null, exp));
    const item = this.getNodeValue(ctx.item) || null;
    if(item!==null) {
        items.add(item);
    } else {
        items.checkLastAnd();
    }
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitArgumentAssignmentListNoExpression = function(ctx) {
    const items = this.getNodeValue(ctx.items);
    const item = this.getNodeValue(ctx.item) || null;
    if(item!==null) {
        items.add(item);
    } else {
        items.checkLastAnd();
    }
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitArgumentAssignmentList = function(ctx) {
    const item = this.getNodeValue(ctx.item);
    const items = new grammar.ArgumentList([item]);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitArgumentAssignmentListItem = function(ctx) {
    const item = this.getNodeValue(ctx.item);
    const items = this.getNodeValue(ctx.items);
    items.add(item);
    this.setNodeValue(ctx, items);
};



EPromptoBuilder.prototype.exitArrow_prefix = function(ctx) {
    const args = this.getNodeValue(ctx.arrow_args());
    let argsSuite = this.getWhiteSpacePlus(ctx.s1);
    if(argsSuite==null) // happens when only WS
        argsSuite = this.getHiddenTokensBefore(ctx.EGT().getSymbol());
    let arrowSuite = this.getWhiteSpacePlus(ctx.s2);
    if(arrowSuite==null) // happens when only WS
        arrowSuite = this.getHiddenTokensAfter(ctx.EGT().getSymbol());
    this.setNodeValue(ctx, new expression.ArrowExpression(args, argsSuite, arrowSuite));
};


EPromptoBuilder.prototype.exitArrowExpression = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
};


EPromptoBuilder.prototype.exitArrowExpressionBody = function(ctx) {
    const arrow = this.getNodeValue(ctx.arrow_prefix());
    const exp = this.getNodeValue(ctx.expression());
    arrow.setExpression(exp);
    this.setNodeValue(ctx, arrow);
};


EPromptoBuilder.prototype.exitArrowListArg = function(ctx) {
    const list = this.getNodeValue(ctx.variable_identifier_list());
    this.setNodeValue(ctx, list);
};


EPromptoBuilder.prototype.exitArrowSingleArg = function(ctx) {
    const arg = this.getNodeValue(ctx.variable_identifier());
    this.setNodeValue(ctx, new grammar.IdentifierList(arg));
};


EPromptoBuilder.prototype.exitArrowStatementsBody = function(ctx) {
    const arrow = this.getNodeValue(ctx.arrow_prefix());
    const stmts = this.getNodeValue(ctx.statement_list());
    arrow.setStatements(stmts);
    this.setNodeValue(ctx, arrow);
};


EPromptoBuilder.prototype.exitUnresolvedWithArgsStatement = function(ctx) {
    const exp = ctx.exp1 ? this.getNodeValue(ctx.exp1) : this.getNodeValue(ctx.exp2);
    const args = this.getNodeValue(ctx.args);
    const name = this.getNodeValue(ctx.name);
    const stmts = this.getNodeValue(ctx.stmts);
    if (name!=null || stmts!=null)
        this.setNodeValue(ctx, new statement.RemoteCall(exp, args, name, stmts));
    else
        this.setNodeValue(ctx, new statement.UnresolvedCall(exp, args));
};


EPromptoBuilder.prototype.exitAddExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    const exp = ctx.op.type===parser.EParser.PLUS ? new expression.PlusExpression(left, right) : new expression.SubtractExpression(left, right);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitMember_method_declaration_list = function(ctx) {
    const items = new grammar.MethodDeclarationList();
    ctx.member_method_declaration().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};

EPromptoBuilder.prototype.exitNative_member_method_declaration_list = function(ctx) {
    const items = new grammar.MethodDeclarationList();
    ctx.native_member_method_declaration().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};

EPromptoBuilder.prototype.exitGetter_method_declaration = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new declaration.GetterMethodDeclaration(name, stmts));
};


EPromptoBuilder.prototype.exitNative_setter_declaration = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new declaration.NativeSetterMethodDeclaration(name, stmts));
};


EPromptoBuilder.prototype.exitNative_getter_declaration = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new declaration.NativeGetterMethodDeclaration(name, stmts));
};

EPromptoBuilder.prototype.exitSetter_method_declaration = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new declaration.SetterMethodDeclaration(name, stmts));
};


EPromptoBuilder.prototype.exitSetType = function(ctx) {
    const typ = this.getNodeValue(ctx.s);
    this.setNodeValue(ctx, new type.SetType(typ));
};


EPromptoBuilder.prototype.exitMember_method_declaration = function(ctx) {
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


EPromptoBuilder.prototype.exitStatement_list = function(ctx) {
    const items = new statement.StatementList();
    ctx.statement().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};

EPromptoBuilder.prototype.exitAbstract_method_declaration = function(ctx) {
    const typ = this.getNodeValue(ctx.typ);
    if(typ instanceof type.CategoryType)
        typ.mutable = ctx.MUTABLE()!=null;
    const name = this.getNodeValue(ctx.name);
    const args = this.getNodeValue(ctx.args);
    this.setNodeValue(ctx, new declaration.AbstractMethodDeclaration(name, args, typ));
};


EPromptoBuilder.prototype.exitConcrete_method_declaration = function(ctx) {
    const typ = this.getNodeValue(ctx.typ);
    if(typ instanceof type.CategoryType)
        typ.mutable = ctx.MUTABLE()!=null;
    const name = this.getNodeValue(ctx.name);
    const args = this.getNodeValue(ctx.args);
    const stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new declaration.ConcreteMethodDeclaration(name, args, typ, stmts));
};


EPromptoBuilder.prototype.exitMethod_declaration = function(ctx) {
    const value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};


EPromptoBuilder.prototype.exitMethodCallStatement = function(ctx) {
    const stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitMethod_identifier = function(ctx) {
    const value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};

EPromptoBuilder.prototype.exitConstructorFrom = function(ctx) {
    const type = this.getNodeValue(ctx.typ);
    const copyFrom = this.getNodeValue(ctx.copyExp) || null;
    let args = this.getNodeValue(ctx.args) || null;
    const arg = this.getNodeValue(ctx.arg) || null;
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
    const type = this.getNodeValue(ctx.typ);
    let args = this.getNodeValue(ctx.args) || null;
    const arg = this.getNodeValue(ctx.arg) || null;
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
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new parser.Assertion(exp));
};

EPromptoBuilder.prototype.exitAssertion_list = function(ctx) {
    const items = new utils.ExpressionList();
    ctx.assertion().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitAssignInstanceStatement = function(ctx) {
    const stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitAssign_instance_statement = function(ctx) {
    const inst = this.getNodeValue(ctx.inst);
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new statement.AssignInstanceStatement(inst, exp));
};


EPromptoBuilder.prototype.exitAssign_variable_statement = function(ctx) {
    const name = this.getNodeValue(ctx.variable_identifier());
    const exp = this.getNodeValue(ctx.expression());
    this.setNodeValue(ctx, new statement.AssignVariableStatement(name, exp));
};


EPromptoBuilder.prototype.exitAssign_tuple_statement = function(ctx) {
    const items = this.getNodeValue(ctx.items);
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new statement.AssignTupleStatement(items, exp));
};

EPromptoBuilder.prototype.exitRootInstance = function(ctx) {
    const name = this.getNodeValue(ctx.variable_identifier());
    this.setNodeValue(ctx, new instance.VariableInstance(name));
};

EPromptoBuilder.prototype.exitRoughlyEqualsExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.ROUGHLY, right));
};



EPromptoBuilder.prototype.exitChildInstance = function(ctx) {
    const parent = this.getNodeValue(ctx.assignable_instance());
    const child = this.getNodeValue(ctx.child_instance());
    child.parent = parent;
    this.setNodeValue(ctx, child);
};

EPromptoBuilder.prototype.exitMemberInstance = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new instance.MemberInstance(name));
};

EPromptoBuilder.prototype.exitIsATypeExpression = function(ctx) {
    const type = this.getNodeValue(ctx.category_or_any_type());
    const exp = new expression.TypeExpression(type);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitIsOtherExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.expression());
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitIsExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    const op = right instanceof expression.TypeExpression ? grammar.EqOp.IS_A : grammar.EqOp.IS;
    this.setNodeValue(ctx, new expression.EqualsExpression(left, op, right));
};

EPromptoBuilder.prototype.exitIsNotExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    const op = right instanceof expression.TypeExpression ? grammar.EqOp.IS_NOT_A : grammar.EqOp.IS_NOT;
    this.setNodeValue(ctx, new expression.EqualsExpression(left, op, right));
};

EPromptoBuilder.prototype.exitItemInstance = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new instance.ItemInstance(exp));
};

EPromptoBuilder.prototype.exitConstructorExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitNative_statement_list = function(ctx) {
    const items = new statement.StatementList();
    ctx.native_statement().forEach(function (r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};

EPromptoBuilder.prototype.exitJava_identifier = function(ctx) {
    this.setNodeValue(ctx, ctx.getText());
};

EPromptoBuilder.prototype.exitJavascript_identifier = function(ctx) {
    const id = new grammar.Identifier(ctx.getText());
    this.setNodeValue(ctx, id);
};

EPromptoBuilder.prototype.exitJavascript_member_expression = function(ctx) {
    const name = ctx.name.getText ();
    this.setNodeValue (ctx, new javascript.JavaScriptMemberExpression(name));
};

EPromptoBuilder.prototype.exitJavascript_new_expression = function(ctx) {
    const method = this.getNodeValue(ctx.javascript_method_expression());
    this.setNodeValue (ctx, new javascript.JavaScriptNewExpression(method));
};

EPromptoBuilder.prototype.exitJavascript_primary_expression = function(ctx) {
    const exp = this.getNodeValue (ctx.getChild(0));
    this.setNodeValue (ctx, exp);
};

EPromptoBuilder.prototype.exitJavascript_this_expression = function(ctx) {
    this.setNodeValue (ctx, new javascript.JavaScriptThisExpression ());
};


EPromptoBuilder.prototype.exitJavaIdentifier = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new java.JavaIdentifierExpression(null, name));
};

EPromptoBuilder.prototype.exitJavaIdentifierExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitJavaChildIdentifier = function(ctx) {
    const parent = this.getNodeValue(ctx.parent);
    const name = this.getNodeValue(ctx.name);
    const child = new java.JavaIdentifierExpression(parent, name);
    this.setNodeValue(ctx, child);
};


EPromptoBuilder.prototype.exitJavaClassIdentifier = function(ctx) {
    const klass = this.getNodeValue(ctx.klass);
    this.setNodeValue(ctx, klass);
};

EPromptoBuilder.prototype.exitJavaChildClassIdentifier = function(ctx) {
    const parent = this.getNodeValue(ctx.parent);
    const child = new java.JavaIdentifierExpression(parent, ctx.name.text);
    this.setNodeValue(ctx, child);
};


EPromptoBuilder.prototype.exitJavaPrimaryExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
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
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitJavascript_identifier_expression = function(ctx) {
    const id = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new javascript.JavaScriptIdentifierExpression(id));
};

EPromptoBuilder.prototype.exitJavaSelectorExpression = function(ctx) {
    const parent = this.getNodeValue(ctx.parent);
    const child = this.getNodeValue(ctx.child);
    child.parent = parent;
    this.setNodeValue(ctx, child);
};

EPromptoBuilder.prototype.exitJavascriptSelectorExpression = function(ctx) {
    const parent = this.getNodeValue(ctx.parent);
    const child = this.getNodeValue(ctx.child);
    child.parent = parent;
    this.setNodeValue(ctx, child);
};

EPromptoBuilder.prototype.exitJavaScriptMemberExpression = function(ctx) {
    const id = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new javascript.JavaScriptMemberExpression(id));
};

EPromptoBuilder.prototype.exitJava_primary_expression = function(ctx) {
    const exp = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitJava_item_expression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new java.JavaItemExpression(exp));
};

EPromptoBuilder.prototype.exitJavascript_item_expression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new javascript.JavaScriptItemExpression(exp));
};

EPromptoBuilder.prototype.exitJavaItemExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitJavascriptItemExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitJavaStatement = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    const stmt = new java.JavaStatement(exp,false);
    this.setNodeValue(ctx, stmt);
};

EPromptoBuilder.prototype.exitJavascriptStatement = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    const stmt = new javascript.JavaScriptStatement(exp,false);
    this.setNodeValue(ctx, stmt);
};

EPromptoBuilder.prototype.exitJavaReturnStatement = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new java.JavaStatement(exp,true));
};

EPromptoBuilder.prototype.exitJavascriptReturnStatement = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new javascript.JavaScriptStatement(exp,true));
};


EPromptoBuilder.prototype.exitJavaNativeStatement = function(ctx) {
    const stmt = this.getNodeValue(ctx.java_statement());
    const call = new java.JavaNativeCall(stmt);
    this.setNodeValue(ctx, call);
};


EPromptoBuilder.prototype.exitJavaScriptNativeStatement = function(ctx) {
    const stmt = this.getNodeValue(ctx.javascript_native_statement());
    this.setNodeValue(ctx, stmt);
};

EPromptoBuilder.prototype.exitJavascript_native_statement = function(ctx) {
    const stmt = this.getNodeValue(ctx.javascript_statement());
    const module = this.getNodeValue(ctx.javascript_module());
    stmt.module = module || null;
    this.setNodeValue(ctx, new javascript.JavaScriptNativeCall(stmt));
};


EPromptoBuilder.prototype.exitNative_method_declaration = function(ctx) {
    const type = this.getNodeValue(ctx.typ);
    const name = this.getNodeValue(ctx.name);
    const params = this.getNodeValue(ctx.args);
    const stmts = this.getNodeValue(ctx.stmts);
    const decl = new declaration.NativeMethodDeclaration(name, params, type, stmts);
    this.setNodeValue(ctx, decl);
};

EPromptoBuilder.prototype.exitJavaArgumentList = function(ctx) {
    const item = this.getNodeValue(ctx.item);
    this.setNodeValue(ctx, new java.JavaExpressionList(item));
};

EPromptoBuilder.prototype.exitJavascriptArgumentList = function(ctx) {
    const item = this.getNodeValue(ctx.item);
    this.setNodeValue(ctx, new javascript.JavaScriptExpressionList(item));
};


EPromptoBuilder.prototype.exitJavaArgumentListItem = function(ctx) {
    const item = this.getNodeValue(ctx.item);
    const items = this.getNodeValue(ctx.items);
    items.add(item);
    this.setNodeValue(ctx, items);
};

EPromptoBuilder.prototype.exitJavascriptArgumentListItem = function(ctx) {
    const item = this.getNodeValue(ctx.item);
    const items = this.getNodeValue(ctx.items);
    items.add(item);
    this.setNodeValue(ctx, items);
};

EPromptoBuilder.prototype.exitJava_method_expression = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const args = this.getNodeValue(ctx.args);
    this.setNodeValue(ctx, new java.JavaMethodExpression(name, args));
};

EPromptoBuilder.prototype.exitJava_this_expression = function(ctx) {
    this.setNodeValue(ctx, new java.JavaThisExpression());
};

EPromptoBuilder.prototype.exitJavaScriptMethodExpression = function(ctx) {
    const method = this.getNodeValue(ctx.method);
    this.setNodeValue(ctx, method);
};


EPromptoBuilder.prototype.exitJavascript_method_expression = function(ctx) {
    const id = this.getNodeValue(ctx.name);
    const args = this.getNodeValue(ctx.args);
    this.setNodeValue(ctx, new javascript.JavaScriptMethodExpression(id, args));
};

EPromptoBuilder.prototype.exitJavaMethodExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitFullDeclarationList = function(ctx) {
    const items = this.getNodeValue(ctx.declarations()) || new declaration.DeclarationList();
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitDeclaration = function(ctx) {
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


EPromptoBuilder.prototype.exitDeclarations = function(ctx) {
    const items = new declaration.DeclarationList();
    ctx.declaration().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitIteratorExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    const name = this.getNodeValue(ctx.name);
    const source = this.getNodeValue(ctx.source);
    this.setNodeValue(ctx, new expression.IteratorExpression(name, source, exp));
};


EPromptoBuilder.prototype.exitIteratorType = function(ctx) {
    const typ = this.getNodeValue(ctx.i);
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
    const map = this.getNodeValue(ctx.binding);
    this.setNodeValue(ctx, new java.JavaNativeCategoryBinding(map));
};

EPromptoBuilder.prototype.exitJavaScriptCategoryBinding = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.binding));
};

EPromptoBuilder.prototype.exitJavascript_category_binding = function(ctx) {
    const identifier = ctx.javascript_identifier().map(cx => cx.getText()).join(".");
    const module = this.getNodeValue(ctx.javascript_module()) || null;
    const map = new javascript.JavaScriptNativeCategoryBinding(identifier, module);
    this.setNodeValue(ctx, map);
};

EPromptoBuilder.prototype.exitJavascript_module = function(ctx) {
    const ids = ctx.javascript_identifier().map(rule => rule.getText());
    const module = new javascript.JavaScriptModule(ids);
    this.setNodeValue(ctx, module);
};

EPromptoBuilder.prototype.exitNativeCategoryBindingList = function(ctx) {
    const item = this.getNodeValue(ctx.item);
    const items = new grammar.NativeCategoryBindingList(item);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitNativeCategoryBindingListItem = function(ctx) {
    const item = this.getNodeValue(ctx.item);
    const items = this.getNodeValue(ctx.items);
    items.add(item);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitNative_category_bindings = function(ctx) {
    const items = this.getNodeValue(ctx.items);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitNative_category_declaration = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const attrs = this.getNodeValue(ctx.attrs);
    const bindings = this.getNodeValue(ctx.bindings);
    const methods = this.getNodeValue(ctx.methods);
    const decl = new declaration.NativeCategoryDeclaration(name, attrs, bindings, null, methods);
    decl.storable = ctx.STORABLE()!=null;
    this.setNodeValue(ctx, decl);
};


EPromptoBuilder.prototype.exitNative_widget_declaration = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const bindings = this.getNodeValue(ctx.bindings);
    const methods = this.getNodeValue(ctx.methods);
    const decl = new declaration.NativeWidgetDeclaration(name, bindings, methods);
    this.setNodeValue(ctx, decl);
};


EPromptoBuilder.prototype.exitNativeCategoryDeclaration = function(ctx) {
    const decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
};


EPromptoBuilder.prototype.exitNative_resource_declaration = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const attrs = this.getNodeValue(ctx.attrs);
    const bindings = this.getNodeValue(ctx.bindings);
    const methods = this.getNodeValue(ctx.methods);
    const decl = new declaration.NativeResourceDeclaration(name, attrs, bindings, null, methods);
    decl.storable = ctx.STORABLE()!=null;
    this.setNodeValue(ctx, decl);
};


EPromptoBuilder.prototype.exitResource_declaration = function(ctx) {
    const decl = this.getNodeValue(ctx.native_resource_declaration());
    this.setNodeValue(ctx, decl);
};



EPromptoBuilder.prototype.exitParenthesis_expression = function(ctx) {
    const exp = this.getNodeValue(ctx.expression());
    this.setNodeValue(ctx, new expression.ParenthesisExpression(exp));
};


EPromptoBuilder.prototype.exitParenthesisExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitNative_symbol_list = function(ctx) {
    const items = new grammar.NativeSymbolList();
    ctx.native_symbol().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitEnum_native_declaration = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const type = this.getNodeValue(ctx.typ);
    const symbols = this.getNodeValue(ctx.symbols);
    this.setNodeValue(ctx, new declaration.EnumeratedNativeDeclaration(name, type, symbols));
};


EPromptoBuilder.prototype.exitFor_each_statement = function(ctx) {
    const name1 = this.getNodeValue(ctx.name1);
    const name2 = this.getNodeValue(ctx.name2);
    const source = this.getNodeValue(ctx.source);
    const stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.ForEachStatement(name1, name2, source, stmts));
};


EPromptoBuilder.prototype.exitForEachStatement = function(ctx) {
    const stmt = this.getNodeValue(ctx.stmt);
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
    const name = this.getNodeValue(ctx.variable_identifier());
    const arg = new argument.UnresolvedParameter(name);
    const exp = this.getNodeValue(ctx.literal_expression());
    arg.defaultExpression = exp || null;
    this.setNodeValue(ctx, arg);
};


EPromptoBuilder.prototype.exitClosureStatement = function(ctx) {
    const decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, new statement.DeclarationStatement(decl));
};


EPromptoBuilder.prototype.exitReturn_statement = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new statement.ReturnStatement(exp));
};


EPromptoBuilder.prototype.exitReturnStatement = function(ctx) {
    const stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitClosureExpression = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new expression.MethodExpression(name));
};


EPromptoBuilder.prototype.exitIf_statement = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    const stmts = this.getNodeValue(ctx.stmts);
    const elseIfs = this.getNodeValue(ctx.elseIfs);
    const elseStmts = this.getNodeValue(ctx.elseStmts);
    this.setNodeValue(ctx, new statement.IfStatement(exp, stmts, elseIfs, elseStmts));
};


EPromptoBuilder.prototype.exitElseIfStatementList = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    const stmts = this.getNodeValue(ctx.stmts);
    const elem = new statement.IfElement(exp, stmts);
    this.setNodeValue(ctx, new statement.IfElementList(elem));
};


EPromptoBuilder.prototype.exitElseIfStatementListItem = function(ctx) {
    const items = this.getNodeValue(ctx.items);
    const exp = this.getNodeValue(ctx.exp);
    const stmts = this.getNodeValue(ctx.stmts);
    const elem = new statement.IfElement(exp, stmts);
    items.add(elem);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitIfStatement = function(ctx) {
    const stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitSuperExpression = function(ctx) {
    this.setNodeValue(ctx, new expression.SuperExpression());
};


EPromptoBuilder.prototype.exitSwitchStatement = function(ctx) {
    const stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitAssignTupleStatement = function(ctx) {
    const stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitRaiseStatement = function(ctx) {
    const stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitWriteStatement = function(ctx) {
    const stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitWithResourceStatement = function(ctx) {
    const stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitWhileStatement = function(ctx) {
    const stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitDoWhileStatement = function(ctx) {
    const stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitTryStatement = function(ctx) {
    const stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitEqualsExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.EQUALS, right));
};


EPromptoBuilder.prototype.exitNotEqualsExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.NOT_EQUALS, right));
};


EPromptoBuilder.prototype.exitGreaterThanExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.GT, right));
};


EPromptoBuilder.prototype.exitGreaterThanOrEqualExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.GTE, right));
};


EPromptoBuilder.prototype.exitLessThanExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.LT, right));
};


EPromptoBuilder.prototype.exitLessThanOrEqualExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.CompareExpression(left, grammar.CmpOp.LTE, right));
};


EPromptoBuilder.prototype.exitAtomicSwitchCase = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    const stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.AtomicSwitchCase(exp, stmts));
};



EPromptoBuilder.prototype.exitCollection_literal = function(ctx) {
    const value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};



EPromptoBuilder.prototype.exitCollectionSwitchCase = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    const stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.CollectionSwitchCase(exp, stmts));
};


EPromptoBuilder.prototype.exitSwitch_case_statement_list = function(ctx) {
    const items = new statement.SwitchCaseList();
    ctx.switch_case_statement().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitSwitch_statement = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    const cases = this.getNodeValue(ctx.cases);
    const stmts = this.getNodeValue(ctx.stmts);
    const stmt = new statement.SwitchStatement(exp, cases, stmts);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitLiteralRangeLiteral = function(ctx) {
    const low = this.getNodeValue(ctx.low);
    const high = this.getNodeValue(ctx.high);
    this.setNodeValue(ctx, new literal.RangeLiteral(low, high));
};

EPromptoBuilder.prototype.exitLiteralListLiteral = function(ctx) {
    const exp = this.getNodeValue(ctx.literal_list_literal());
    this.setNodeValue(ctx, new literal.ListLiteral(false, exp));
};


EPromptoBuilder.prototype.exitLiteral_list_literal = function(ctx) {
    const items = new utils.ExpressionList();
    ctx.atomic_literal().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitInExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.IN, right));
};


EPromptoBuilder.prototype.exitNotInExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_IN, right));
};


EPromptoBuilder.prototype.exitCssType = function(ctx) {
    this.setNodeValue(ctx, type.CssType.instance);
};


EPromptoBuilder.prototype.exitHasExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.HAS, right));
};


EPromptoBuilder.prototype.exitNotHasExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_HAS, right));
};


EPromptoBuilder.prototype.exitHasAllExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.HAS_ALL, right));
};


EPromptoBuilder.prototype.exitNotHasAllExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_HAS_ALL, right));
};


EPromptoBuilder.prototype.exitHasAnyExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.HAS_ANY, right));
};


EPromptoBuilder.prototype.exitNotHasAnyExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ContainsExpression(left, grammar.ContOp.NOT_HAS_ANY, right));
};


EPromptoBuilder.prototype.exitContainsExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.CONTAINS, right));
};


EPromptoBuilder.prototype.exitNotContainsExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.EqualsExpression(left, grammar.EqOp.NOT_CONTAINS, right));
};


EPromptoBuilder.prototype.exitDivideExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.DivideExpression(left, right));
};


EPromptoBuilder.prototype.exitIntDivideExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.IntDivideExpression(left, right));
};


EPromptoBuilder.prototype.exitModuloExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.ModuloExpression(left, right));
};


EPromptoBuilder.prototype.exitAnnotation_constructor = function(ctx) {
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


EPromptoBuilder.prototype.exitAnnotation_argument = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new literal.DocEntry(name, exp));
};


EPromptoBuilder.prototype.exitAnnotation_identifier = function(ctx) {
    this.setNodeValue(ctx, new grammar.Identifier(ctx.getText()));
};


EPromptoBuilder.prototype.exitAnnotation_argument_name = function(ctx) {
    this.setNodeValue(ctx, ctx.getText());
};


EPromptoBuilder.prototype.exitAnnotationLiteralValue = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitAnnotationTypeValue = function(ctx) {
    const typ = this.getNodeValue(ctx.typ);
    this.setNodeValue(ctx, new expression.TypeExpression(typ));
};


EPromptoBuilder.prototype.exitAndExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.AndExpression(left, right));
};


EPromptoBuilder.prototype.exitNullLiteral = function(ctx) {
    this.setNodeValue(ctx, literal.NullLiteral.instance);
};


EPromptoBuilder.prototype.exitOperator_argument = function(ctx) {
    const value = this.getNodeValue (ctx.getChild (0));
    this.setNodeValue (ctx, value);
};


EPromptoBuilder.prototype.exitOperatorArgument = function(ctx) {
    const arg = this.getNodeValue(ctx.arg);
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
    const value = this.getNodeValue (ctx.getChild (0));
    this.setNodeValue (ctx, value);
};

EPromptoBuilder.prototype.exitOperator_method_declaration= function(ctx) {
    const op = this.getNodeValue(ctx.op);
    const arg = this.getNodeValue(ctx.arg);
    const typ = this.getNodeValue(ctx.typ);
    const stmts = this.getNodeValue(ctx.stmts);
    const decl = new declaration.OperatorMethodDeclaration(op, arg, typ, stmts);
    this.setNodeValue(ctx, decl);
};

EPromptoBuilder.prototype.exitOrder_by = function(ctx) {
    const ids = new grammar.IdentifierList();
    ctx.variable_identifier().map( function(ctx_) {
        ids.push(this.getNodeValue(ctx_));
    }, this);
    const clause = new grammar.OrderByClause(ids, ctx.DESC()!=null);
    this.setNodeValue(ctx, clause);
};

EPromptoBuilder.prototype.exitOrder_by_list = function(ctx) {
    const list = new grammar.OrderByClauseList();
    ctx.order_by().map( function(ctx_) {
        list.add(this.getNodeValue(ctx_));
    }, this);
    this.setNodeValue(ctx, list);
};


EPromptoBuilder.prototype.exitOrExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.OrExpression(left, right));
};


EPromptoBuilder.prototype.exitMultiplyExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const right = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.MultiplyExpression(left, right));
};


EPromptoBuilder.prototype.exitMutable_category_type = function(ctx) {
    const typ = this.getNodeValue (ctx.category_type());
    typ.mutable = ctx.MUTABLE()!=null;
    this.setNodeValue(ctx, typ);
};


EPromptoBuilder.prototype.exitMutableInstanceExpression = function(ctx) {
    const source = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new expression.MutableExpression(source));
};


EPromptoBuilder.prototype.exitMutableSelectableExpression = function(ctx) {
    const name = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new expression.InstanceExpression(name));
};


EPromptoBuilder.prototype.exitMutableSelectorExpression = function(ctx) {
    const parent = this.getNodeValue(ctx.parent);
    const selector = this.getNodeValue(ctx.selector);
    selector.parent = parent;
    this.setNodeValue(ctx, selector);
};


EPromptoBuilder.prototype.exitMinusExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new expression.MinusExpression(exp));
};


EPromptoBuilder.prototype.exitNotExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new expression.NotExpression(exp));
};


EPromptoBuilder.prototype.exitWhile_statement = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    const stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.WhileStatement(exp, stmts));
};


EPromptoBuilder.prototype.exitDo_while_statement = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    const stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.DoWhileStatement(exp, stmts));
};

EPromptoBuilder.prototype.exitSingleton_category_declaration = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const attrs = this.getNodeValue(ctx.attrs);
    const methods = this.getNodeValue(ctx.methods);
    this.setNodeValue(ctx, new declaration.SingletonCategoryDeclaration(name, attrs, methods));
};

EPromptoBuilder.prototype.exitSingletonCategoryDeclaration = function(ctx) {
    const decl = this.getNodeValue(ctx.decl);
    this.setNodeValue(ctx, decl);
};

EPromptoBuilder.prototype.exitSliceFirstAndLast = function(ctx) {
    const first = this.getNodeValue(ctx.first);
    const last = this.getNodeValue(ctx.last);
    this.setNodeValue(ctx, new expression.SliceSelector(null, first, last));
};


EPromptoBuilder.prototype.exitSliceFirstOnly = function(ctx) {
    const first = this.getNodeValue(ctx.first);
    this.setNodeValue(ctx, new expression.SliceSelector(null, first, null));
};


EPromptoBuilder.prototype.exitSliceLastOnly = function(ctx) {
    const last = this.getNodeValue(ctx.last);
    this.setNodeValue(ctx, new expression.SliceSelector(null, null, last));
};


EPromptoBuilder.prototype.exitSorted_expression = function(ctx) {
    const source = this.getNodeValue(ctx.source);
    const desc = ctx.DESC()!=null;
    const key = this.getNodeValue(ctx.key);
    this.setNodeValue(ctx, new expression.SortedExpression(source, desc, key));
};


EPromptoBuilder.prototype.exitSorted_key = function(ctx) {
    const exp = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitSortedExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitDocumentExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitDocument_expression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new expression.DocumentExpression(exp));
};


EPromptoBuilder.prototype.exitDocumentType = function(ctx) {
    this.setNodeValue(ctx, type.DocumentType.instance);
};


EPromptoBuilder.prototype.exitDocument_literal = function(ctx) {
    const entries = this.getNodeValue(ctx.doc_entry_list()) || new literal.DocEntryList();
    this.setNodeValue(ctx, new literal.DocumentLiteral(entries));
};


EPromptoBuilder.prototype.exitFetchExpression = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
};


EPromptoBuilder.prototype.exitFetchStatement = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.stmt));
};


EPromptoBuilder.prototype.exitFetchMany = function(ctx) {
    const category = this.getNodeValue(ctx.typ);
    const predicate = this.getNodeValue(ctx.predicate);
    const start = this.getNodeValue(ctx.xstart);
    const stop = this.getNodeValue(ctx.xstop);
    const orderBy = this.getNodeValue(ctx.orderby);
    this.setNodeValue(ctx, new expression.FetchManyExpression(category, start, stop, predicate, orderBy));
};


EPromptoBuilder.prototype.exitFetchManyAsync = function(ctx) {
    const category = this.getNodeValue(ctx.typ);
    const predicate = this.getNodeValue(ctx.predicate);
    const start = this.getNodeValue(ctx.xstart);
    const stop = this.getNodeValue(ctx.xstop);
    const orderBy = this.getNodeValue(ctx.orderby);
    const name = this.getNodeValue(ctx.name);
    const stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.FetchManyStatement(category, start, stop, predicate, orderBy, name, stmts));
};


EPromptoBuilder.prototype.exitFetchOne = function(ctx) {
    const category = this.getNodeValue(ctx.typ);
    const predicate = this.getNodeValue(ctx.predicate);
    this.setNodeValue(ctx, new expression.FetchOneExpression(category, predicate));
};


EPromptoBuilder.prototype.exitFetchOneAsync = function(ctx) {
    const category = this.getNodeValue(ctx.typ);
    const predicate = this.getNodeValue(ctx.predicate);
    const name = this.getNodeValue(ctx.name);
    const stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.FetchOneStatement(category, predicate, name, stmts));
};


EPromptoBuilder.prototype.exitFilteredListExpression = function(ctx) {
    const filtered = this.getNodeValue(ctx.filtered_list_suffix());
    const source = this.getNodeValue(ctx.src);
    filtered.source = source;
    this.setNodeValue(ctx, filtered);
};


EPromptoBuilder.prototype.exitFiltered_list_suffix = function(ctx) {
    const itemName = this.getNodeValue(ctx.name);
    const predicate = this.getNodeValue(ctx.predicate);
    this.setNodeValue(ctx, new expression.FilteredExpression(itemName, null, predicate));
};



EPromptoBuilder.prototype.exitCode_type = function(ctx) {
    this.setNodeValue(ctx, type.CodeType.instance);
};


EPromptoBuilder.prototype.exitExecuteExpression = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new expression.ExecuteExpression(name));
};


EPromptoBuilder.prototype.exitExpression_list = function(ctx) {
    const items = new utils.ExpressionList();
    ctx.expression().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitExpression_tuple = function(ctx) {
    const items = new utils.ExpressionList();
    ctx.expression().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitCodeExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new expression.CodeExpression(exp));
};


EPromptoBuilder.prototype.exitCode_argument = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new argument.CodeParameter(name));
};


EPromptoBuilder.prototype.exitCategory_or_any_type = function(ctx) {
    const exp = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitCategory_symbol = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const args = this.getNodeValue(ctx.args);
    const arg = this.getNodeValue(ctx.arg) || null;
    if(arg!==null) {
        args.add(arg);
    }
    this.setNodeValue(ctx, new expression.CategorySymbol(name, args));
};


EPromptoBuilder.prototype.exitCategory_symbol_list = function(ctx) {
    const items = new grammar.CategorySymbolList();
    ctx.category_symbol().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitEnum_category_declaration = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const attrs = this.getNodeValue(ctx.attrs);
    const parent = this.getNodeValue(ctx.derived);
    const derived = parent==null ? null : new grammar.IdentifierList(parent);
    const symbols = this.getNodeValue(ctx.symbols);
    this.setNodeValue(ctx, new declaration.EnumeratedCategoryDeclaration(name, attrs, derived, symbols));
};


EPromptoBuilder.prototype.exitEnum_declaration = function(ctx) {
    const value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};


EPromptoBuilder.prototype.exitRead_all_expression = function(ctx) {
    const source = this.getNodeValue(ctx.source);
    this.setNodeValue(ctx, new expression.ReadAllExpression(source));
};


EPromptoBuilder.prototype.exitRead_blob_expression = function(ctx) {
    const source = this.getNodeValue(ctx.source);
    this.setNodeValue(ctx, new expression.ReadBlobExpression(source));
};


EPromptoBuilder.prototype.exitRead_one_expression = function(ctx) {
    const source = this.getNodeValue(ctx.source);
    this.setNodeValue(ctx, new expression.ReadOneExpression(source));
};


EPromptoBuilder.prototype.exitRead_statement = function(ctx) {
    const source = this.getNodeValue(ctx.source);
    const name = this.getNodeValue(ctx.name);
    const stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.ReadStatement(source, name, stmts));
};


EPromptoBuilder.prototype.exitReadAllExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitReadBlobExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitReadOneExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitReadStatement = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.stmt));
};


EPromptoBuilder.prototype.exitRepl = function(ctx) {
    const value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};


EPromptoBuilder.prototype.exitWith_singleton_statement = function(ctx) {
    const name = this.getNodeValue(ctx.typ);
    const typ = new type.CategoryType(name);
    const stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.WithSingletonStatement(typ, stmts));
};


EPromptoBuilder.prototype.exitWithSingletonStatement = function(ctx) {
    const stmt = this.getNodeValue(ctx.stmt);
    this.setNodeValue(ctx, stmt);
};



EPromptoBuilder.prototype.exitWrite_statement = function(ctx) {
    const what = this.getNodeValue(ctx.what);
    const target = this.getNodeValue(ctx.target);
    this.setNodeValue(ctx, new statement.WriteStatement(what, target));
};


EPromptoBuilder.prototype.exitWith_resource_statement = function(ctx) {
    const stmt = this.getNodeValue(ctx.stmt);
    const stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.WithResourceStatement(stmt, stmts));
};


EPromptoBuilder.prototype.exitAnyType = function(ctx) {
    this.setNodeValue(ctx, type.AnyType.instance);
};


EPromptoBuilder.prototype.exitAnyListType = function(ctx) {
    const typ = this.getNodeValue(ctx.any_type());
    this.setNodeValue(ctx, new type.ListType(typ));
};


EPromptoBuilder.prototype.exitAnyDictType = function(ctx) {
    const typ = this.getNodeValue(ctx.typ);
    this.setNodeValue(ctx, new type.DictType(typ));
};


EPromptoBuilder.prototype.exitCastExpression = function(ctx) {
    const left = this.getNodeValue(ctx.left);
    const type = this.getNodeValue(ctx.right);
    this.setNodeValue(ctx, new expression.CastExpression(left, type, ctx.MUTABLE() != null));
};

EPromptoBuilder.prototype.exitCatchAtomicStatement = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.AtomicSwitchCase(new expression.SymbolExpression(name), stmts));
};


EPromptoBuilder.prototype.exitCatchCollectionStatement = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    const stmts = this.getNodeValue(ctx.stmts);
    this.setNodeValue(ctx, new statement.CollectionSwitchCase(exp, stmts));
};


EPromptoBuilder.prototype.exitCatch_statement_list = function(ctx) {
    const items = new statement.SwitchCaseList();
    ctx.catch_statement().forEach(function(r) {
        const item = this.getNodeValue(r);
        items.add(item);
    }, this);
    this.setNodeValue(ctx, items);
};


EPromptoBuilder.prototype.exitTry_statement = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const stmts = this.getNodeValue(ctx.stmts);
    const handlers = this.getNodeValue(ctx.handlers);
    const anyStmts = this.getNodeValue(ctx.anyStmts);
    const finalStmts = this.getNodeValue(ctx.finalStmts);
    const stmt = new statement.SwitchErrorStatement(name, stmts, handlers, anyStmts, finalStmts);
    this.setNodeValue(ctx, stmt);
};


EPromptoBuilder.prototype.exitRaise_statement = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new statement.RaiseStatement(exp));
};

EPromptoBuilder.prototype.exitMatchingList = function(ctx) {
    const exp = this.getNodeValue(ctx.source);
    this.setNodeValue(ctx, new constraint.MatchingCollectionConstraint(exp));
};

EPromptoBuilder.prototype.exitMatchingRange = function(ctx) {
    const exp = this.getNodeValue(ctx.source);
    this.setNodeValue(ctx, new constraint.MatchingCollectionConstraint(exp));
};

EPromptoBuilder.prototype.exitMatchingExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new constraint.MatchingExpressionConstraint(exp));
};

EPromptoBuilder.prototype.exitMatchingPattern = function(ctx) {
    this.setNodeValue(ctx, new constraint.MatchingPatternConstraint(new literal.TextLiteral(ctx.text.text)));
};

EPromptoBuilder.prototype.exitLiteralSetLiteral = function(ctx) {
    const items = this.getNodeValue(ctx.literal_list_literal());
    this.setNodeValue(ctx, new literal.SetLiteral(items));
};


EPromptoBuilder.prototype.exitInvocation_expression = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const select = new expression.MethodSelector(null, name);
    this.setNodeValue(ctx, new statement.MethodCall(select));
};


EPromptoBuilder.prototype.exitInvocationExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitInvokeStatement = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};



EPromptoBuilder.prototype.exitCsharp_identifier = function(ctx) {
    this.setNodeValue(ctx, ctx.getText());
};

EPromptoBuilder.prototype.exitCSharpIdentifier = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new csharp.CSharpIdentifierExpression(null, name));
};

EPromptoBuilder.prototype.exitCSharpChildIdentifier = function(ctx) {
    const parent = this.getNodeValue(ctx.parent);
    const name = this.getNodeValue(ctx.name);
    const child = new csharp.CSharpIdentifierExpression(parent, name);
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
    const binding = this.getNodeValue(ctx.binding);
    this.setNodeValue(ctx, new csharp.CSharpNativeCategoryBinding(binding));
};

EPromptoBuilder.prototype.exitCsharp_primary_expression = function(ctx) {
    const value = this.getNodeValue(ctx.getChild(0));
    this.setNodeValue(ctx, value);
};

EPromptoBuilder.prototype.exitCsharp_this_expression = function(ctx) {
    this.setNodeValue(ctx, new csharp.CSharpThisExpression());
};

EPromptoBuilder.prototype.exitCsharp_method_expression = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const args = this.getNodeValue(ctx.args);
    this.setNodeValue(ctx, new csharp.CSharpMethodExpression(name, args));
};

EPromptoBuilder.prototype.exitCSharpMethodExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitCSharpArgumentList = function(ctx) {
    const item = this.getNodeValue(ctx.item);
    this.setNodeValue(ctx, new csharp.CSharpExpressionList(item));
};

EPromptoBuilder.prototype.exitCSharpArgumentListItem = function(ctx) {
    const item = this.getNodeValue(ctx.item);
    const items = this.getNodeValue(ctx.items);
    items.add(item);
    this.setNodeValue(ctx, items);
};

EPromptoBuilder.prototype.exitCSharpNativeStatement = function(ctx) {
    const stmt = this.getNodeValue(ctx.csharp_statement());
    const call = new csharp.CSharpNativeCall(stmt);
    this.setNodeValue(ctx, call);
};

EPromptoBuilder.prototype.exitCSharpPromptoIdentifier = function(ctx) {
    const name = ctx.DOLLAR_IDENTIFIER().getText();
    this.setNodeValue(ctx, new csharp.CSharpIdentifierExpression(null, name));
};

EPromptoBuilder.prototype.exitCSharpPrimaryExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitCSharpSelectorExpression = function(ctx) {
    const parent = this.getNodeValue(ctx.parent);
    const child = this.getNodeValue(ctx.child);
    child.parent = parent;
    this.setNodeValue(ctx, child);
};

EPromptoBuilder.prototype.exitCSharpStatement = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    const stmt = new csharp.CSharpStatement(exp,false);
    this.setNodeValue(ctx, stmt);
};

EPromptoBuilder.prototype.exitCSharpReturnStatement = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new csharp.CSharpStatement(exp,true));
};


EPromptoBuilder.prototype.exitPythonStatement = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new python.PythonStatement(exp,false));
};

EPromptoBuilder.prototype.exitPythonReturnStatement = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new python.PythonStatement(exp,true));
};

EPromptoBuilder.prototype.exitPython2CategoryBinding = function(ctx) {
    const map = this.getNodeValue(ctx.binding);
    this.setNodeValue(ctx, new python.Python2NativeCategoryBinding(map));
};


EPromptoBuilder.prototype.exitPython3CategoryBinding = function(ctx) {
    const map = this.getNodeValue(ctx.binding);
    this.setNodeValue(ctx, new python.Python3NativeCategoryBinding(map));
};


EPromptoBuilder.prototype.exitPython_category_binding = function(ctx) {
    const identifier = ctx.identifier().getText();
    const module = this.getNodeValue(ctx.python_module()) || null;
    const map = new python.PythonNativeCategoryBinding(identifier, module);
    this.setNodeValue(ctx, map);
};

EPromptoBuilder.prototype.exitPython_method_expression = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const args = this.getNodeValue(ctx.args);
    const method = new python.PythonMethodExpression(name, args);
    this.setNodeValue(ctx, method);
};

EPromptoBuilder.prototype.exitPythonGlobalMethodExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitPythonMethodExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitPython_module = function(ctx) {
    const ids = ctx.python_identifier().map(rule => rule.getText());
    const module = new python.PythonModule(ids);
    this.setNodeValue(ctx, module);
};

EPromptoBuilder.prototype.exitPython2NativeStatement = function(ctx) {
    const stmt = this.getNodeValue(ctx.python_native_statement());
    this.setNodeValue(ctx, new python.Python2NativeCall(stmt));
};


EPromptoBuilder.prototype.exitPython3NativeStatement = function(ctx) {
    const stmt = this.getNodeValue(ctx.python_native_statement());
    this.setNodeValue(ctx, new python.Python3NativeCall(stmt));
};

EPromptoBuilder.prototype.exitPython_native_statement = function(ctx) {
    const stmt = this.getNodeValue(ctx.python_statement());
    const module = this.getNodeValue(ctx.python_module());
    stmt.module = module || null;
    this.setNodeValue(ctx, new python.PythonNativeCall(stmt));
}

EPromptoBuilder.prototype.exitPython_identifier = function(ctx) {
    this.setNodeValue(ctx, ctx.getText());
};

EPromptoBuilder.prototype.exitPythonIdentifier = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new python.PythonIdentifierExpression(null, name));
};

EPromptoBuilder.prototype.exitPythonIdentifierExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitPythonChildIdentifier = function(ctx) {
    const parent = this.getNodeValue(ctx.parent);
    const name = this.getNodeValue(ctx.name);
    const child = new python.PythonIdentifierExpression(parent, name);
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
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitPythonPromptoIdentifier = function(ctx) {
    const name = ctx.DOLLAR_IDENTIFIER().getText();
    this.setNodeValue(ctx, new python.PythonIdentifierExpression(null, name));
};

EPromptoBuilder.prototype.exitPythonPrimaryExpression = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, exp);
};

EPromptoBuilder.prototype.exitPythonArgumentList = function(ctx) {
    const ordinal = this.getNodeValue(ctx.ordinal);
    const named = this.getNodeValue(ctx.named);
    ordinal.addAll(named);
    this.setNodeValue(ctx, ordinal);
};


EPromptoBuilder.prototype.exitPythonNamedOnlyArgumentList = function(ctx) {
    const named = this.getNodeValue(ctx.named);
    this.setNodeValue(ctx, named);
};

EPromptoBuilder.prototype.exitPythonNamedArgumentList = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const exp = this.getNodeValue(ctx.exp);
    const arg = new python.PythonNamedArgument(name, exp);
    this.setNodeValue(ctx, new python.PythonArgumentList(arg));
};

EPromptoBuilder.prototype.exitPythonNamedArgumentListItem = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const exp = this.getNodeValue(ctx.exp);
    const arg = new python.PythonNamedArgument(name, exp);
    const items = this.getNodeValue(ctx.items);
    items.add(arg);
    this.setNodeValue(ctx, items);
};

EPromptoBuilder.prototype.exitPythonOrdinalOnlyArgumentList = function(ctx) {
    const ordinal = this.getNodeValue(ctx.ordinal);
    this.setNodeValue(ctx, ordinal);
};

EPromptoBuilder.prototype.exitPythonOrdinalArgumentList = function(ctx) {
    const item = this.getNodeValue(ctx.item);
    const arg = new python.PythonOrdinalArgument(item);
    this.setNodeValue(ctx, new python.PythonArgumentList(arg));
};

EPromptoBuilder.prototype.exitPythonOrdinalArgumentListItem = function(ctx) {
    const item = this.getNodeValue(ctx.item);
    const arg = new python.PythonOrdinalArgument(item);
    const items = this.getNodeValue(ctx.items);
    items.add(arg);
    this.setNodeValue(ctx, items);
};

EPromptoBuilder.prototype.exitPythonSelectorExpression = function(ctx) {
    const parent = this.getNodeValue(ctx.parent);
    const selector = this.getNodeValue(ctx.child);
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
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new jsx.JsxCode(exp));
};



EPromptoBuilder.prototype.exitJsxExpression = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
};



EPromptoBuilder.prototype.exitJsxElement = function(ctx) {
    const elem = this.getNodeValue(ctx.opening);
    const closing = this.getNodeValue(ctx.closing);
    elem.setClosing(closing);
    const children = this.getNodeValue(ctx.children_);
    elem.setChildren(children);
    this.setNodeValue(ctx, elem);
};


EPromptoBuilder.prototype.exitJsxSelfClosing = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.jsx));
};



EPromptoBuilder.prototype.exitJsxText = function(ctx) {
    const text = parser.ParserUtils.getFullText(ctx.text);
    this.setNodeValue(ctx, new jsx.JsxText(text));
};



EPromptoBuilder.prototype.exitJsxValue = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new jsx.JsxExpression(exp));
};


EPromptoBuilder.prototype.exitJsx_attribute = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const value = this.getNodeValue(ctx.value);
    const suite = this.getWhiteSpacePlus(ctx.ws_plus());
    this.setNodeValue(ctx, new jsx.JsxProperty(name, value, suite));
};



EPromptoBuilder.prototype.exitJsx_children = function(ctx) {
    const list = ctx.jsx_child().map(function(cx) { return this.getNodeValue(cx); }, this);
    this.setNodeValue(ctx, list);
};


EPromptoBuilder.prototype.exitJsx_element_name = function(ctx) {
    const name = ctx.getText();
    this.setNodeValue(ctx, new grammar.Identifier(name));
};


EPromptoBuilder.prototype.exitJsx_expression = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.getChild(0)));
};


EPromptoBuilder.prototype.exitJsx_identifier = function(ctx) {
    const name = ctx.getText();
    this.setNodeValue(ctx, new grammar.Identifier(name));
};


EPromptoBuilder.prototype.exitJsx_fragment = function(ctx) {
    const openingSuite = this.getWhiteSpacePlus(ctx.ws_plus(0));
    const fragment = new jsx.JsxFragment(openingSuite);
    fragment.children = this.getNodeValue(ctx.children_);
    this.setNodeValue(ctx, fragment);
};


EPromptoBuilder.prototype.exitJsxLiteral = function(ctx) {
    const text = ctx.getText();
    this.setNodeValue(ctx, new jsx.JsxLiteral(text));
};


EPromptoBuilder.prototype.exitJsx_opening = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const nameSuite = this.getWhiteSpacePlus(ctx.ws_plus());
    const attributes = ctx.jsx_attribute()
        .map(function(cx) { return this.getNodeValue(cx); }, this);
    this.setNodeValue(ctx, new jsx.JsxElement(name, nameSuite, attributes, null));
};


EPromptoBuilder.prototype.exitJsx_closing = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    this.setNodeValue(ctx, new jsx.JsxClosing(name, null));
};


EPromptoBuilder.prototype.exitJsx_self_closing = function(ctx) {
    const name = this.getNodeValue(ctx.name);
    const nameSuite = this.getWhiteSpacePlus(ctx.ws_plus());
    const attributes = ctx.jsx_attribute()
        .map(function(cx) { return this.getNodeValue(cx); }, this);
    this.setNodeValue(ctx, new jsx.JsxSelfClosing(name, nameSuite, attributes, null));
};



EPromptoBuilder.prototype.exitCssExpression = function(ctx) {
    this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
}


EPromptoBuilder.prototype.exitCss_expression = function(ctx) {
    const exp = new css.CssExpression();
    ctx.css_field().forEach(function(cx) {
        const field = this.getNodeValue(cx);
        exp.addField(field);
    }, this);
    this.setNodeValue(ctx, exp);
};


EPromptoBuilder.prototype.exitCss_field = function(ctx) {
    const name = ctx.name.getText();
    const value = this.getNodeValue(ctx.value);
    this.setNodeValue(ctx, new css.CssField(name, value));
};



EPromptoBuilder.prototype.exitCssText = function(ctx) {
    const text = this.input.getText({start: ctx.text.start, stop: ctx.text.stop});
    this.setNodeValue(ctx, new css.CssText(text));
};


EPromptoBuilder.prototype.exitCssValue = function(ctx) {
    const exp = this.getNodeValue(ctx.exp);
    this.setNodeValue(ctx, new css.CssCode(exp));
};


EPromptoBuilder.prototype.buildSection = function(node, section) {
    const first = this.findFirstValidToken(node.start.tokenIndex, section instanceof jsx.JsxText);
    const last = this.findLastValidToken(node.stop.tokenIndex, section instanceof jsx.JsxText);
    section.setSectionFrom(this.path, first, last, parser.Dialect.E);
};

EPromptoBuilder.prototype.findFirstValidToken = function(idx, allowWS) {
    if(idx===-1) { // happens because input.index() is called before any other read operation (bug?)
        idx = 0;
    }
    do {
        const token = this.readValidToken(idx++, allowWS);
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
        const token = this.readValidToken(idx--, allowWS);
        if(token!==null) {
            return token;
        }
    }
    return null;
};

EPromptoBuilder.prototype.readValidToken = function(idx, allowWS) {
    const token = this.input.get(idx);
    const text = token.text;
    // ignore trailing whitespace
    if(text!==null && (allowWS || text.replace(/(\n|\r|\t|' ')/g,"").length>0)) {
        return token;
    } else {
        return null;
    }
};

