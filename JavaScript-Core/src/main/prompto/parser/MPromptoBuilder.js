import MParserListener from './MParserListener.js';
import MLexer from './MLexer.js';
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


export default class MPromptoBuilder extends MParserListener {

    constructor(parser) {
        super();
        this.input = parser.getTokenStream();
        this.path = parser.path;
        this.nodeValues = {}
        this.nextNodeId = 0;
    }

    setNodeValue(node, value) {
        if (node["%id"] === undefined)
            node["%id"] = this.nextNodeId++;
        this.nodeValues[node["%id"]] = value;
        if (value instanceof parser.Section) {
            this.buildSection(node, value);
        }
    }


    getNodeValue(node) {
        if (node == null || node === undefined || node["%id"] === null || node["%id"] === undefined)
            return null;
        else
            return this.nodeValues[node["%id"]];
    }


    getHiddenTokensBefore(token) {
        const hidden = this.input.getHiddenTokensToLeft(token.tokenIndex);
        return this.getHiddenTokensText(hidden);
    }

    getHiddenTokensAfter(token) {
        if (token.tokenIndex < 0)
            return null;
        const hidden = this.input.getHiddenTokensToRight(token.tokenIndex);
        return this.getHiddenTokensText(hidden);
    }


    getHiddenTokensText(hidden) {
        if (hidden == null || hidden.length === 0)
            return null;
        else
            return hidden.map(token => token.text).join("");
    }

    getWhiteSpacePlus(ctx) {
        let within = ctx.children == null ? null : ctx.children
            .filter(function (child) {
                return this.isNotIndent(child);
            }, this)
            .map(child => child.getText(), this)
            .join("");
        if (within == null || within.length === 0)
            return null;
        const before = this.getHiddenTokensBefore(ctx.start);
        if (before != null)
            within = before + within;
        const after = this.getHiddenTokensAfter(ctx.stop);
        if (after != null)
            within = within + after;
        return within;
    }

    isNotIndent(tree) {
        return !tree.symbol || tree.symbol.type != parser.MParser.INDENT;
    }

    readAnnotations(ctxs) {
        const annotations = ctxs.map(function (csc) {
            return this.getNodeValue(csc);
        }, this);
        return (annotations.length == 0) ? null : annotations;
    }


    readComments(ctxs) {
        const comments = ctxs.map(function (csc) {
            return this.getNodeValue(csc);
        }, this);
        return (comments.length == 0) ? null : comments;
    }


    exitSelectableExpression(ctx) {
        const e = this.getNodeValue(ctx.parent);
        this.setNodeValue(ctx, e);
    }


    exitSelectorExpression(ctx) {
        const selector = this.getNodeValue(ctx.selector);
        if (selector) {
            const parent = this.getNodeValue(ctx.parent);
            if (selector instanceof statement.UnresolvedCall)
                selector.setParent(parent);
            else
                selector.parent = parent;
            this.setNodeValue(ctx, selector);
        }
    }

    exitSet_literal(ctx) {
        const items = this.getNodeValue(ctx.expression_list());
        const set_ = new literal.SetLiteral(items);
        this.setNodeValue(ctx, set_);
    }


    exitStoreStatement(ctx) {
        this.setNodeValue(ctx, this.getNodeValue(ctx.stmt));
    }

    exitStore_statement(ctx) {
        const del = this.getNodeValue(ctx.to_del);
        const add = this.getNodeValue(ctx.to_add);
        const meta = this.getNodeValue(ctx.with_meta);
        const stmts = this.getNodeValue(ctx.stmts);
        const stmt = new statement.DeleteAndStoreStatement(del, add, meta, stmts);
        this.setNodeValue(ctx, stmt);
    }


    exitAtomicLiteral(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitCollectionLiteral(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitCommentStatement(ctx) {
        this.setNodeValue(ctx, this.getNodeValue(ctx.comment_statement()));
    }


    exitComment_statement(ctx) {
        this.setNodeValue(ctx, new statement.CommentStatement(ctx.getText()));
    }


    exitListLiteral(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitBlob_expression(ctx) {
        const exp = this.getNodeValue(ctx.expression());
        this.setNodeValue(ctx, new expression.BlobExpression(exp));
    }


    exitBooleanLiteral(ctx) {
        this.setNodeValue(ctx, new literal.BooleanLiteral(ctx.getText()));
    }


    exitBreakStatement(ctx) {
        this.setNodeValue(ctx, new statement.BreakStatement());
    }


    exitMinIntegerLiteral(ctx) {
        this.setNodeValue(ctx, new literal.MinIntegerLiteral());
    }


    exitMaxIntegerLiteral(ctx) {
        this.setNodeValue(ctx, new literal.MaxIntegerLiteral());
    }


    exitIntegerLiteral(ctx) {
        this.setNodeValue(ctx, new literal.IntegerLiteral(ctx.getText()));
    }


    exitDecimalLiteral(ctx) {
        this.setNodeValue(ctx, new literal.DecimalLiteral(ctx.getText()));
    }


    exitHexadecimalLiteral(ctx) {
        this.setNodeValue(ctx, new literal.HexaLiteral(ctx.getText()));
    }


    exitCharacterLiteral(ctx) {
        this.setNodeValue(ctx, new literal.CharacterLiteral(ctx.getText()));
    }


    exitDateLiteral(ctx) {
        this.setNodeValue(ctx, new literal.DateLiteral(ctx.getText()));
    }


    exitDateTimeLiteral(ctx) {
        this.setNodeValue(ctx, new literal.DateTimeLiteral(ctx.getText()));
    }

    exitTernaryExpression(ctx) {
        const condition = this.getNodeValue(ctx.test);
        const ifTrue = this.getNodeValue(ctx.ifTrue);
        const ifFalse = this.getNodeValue(ctx.ifFalse);
        const exp = new expression.TernaryExpression(condition, ifTrue, ifFalse);
        this.setNodeValue(ctx, exp);
    }

    exitTest_method_declaration(ctx) {
        const name = new grammar.Identifier(ctx.name.text);
        name.setSectionFrom(this.path, ctx.name, ctx.name, parser.Dialect.M);
        const stmts = this.getNodeValue(ctx.stmts);
        const exps = this.getNodeValue(ctx.exps);
        const errorName = this.getNodeValue(ctx.error);
        const error = errorName == null ? null : new expression.SymbolExpression(errorName);
        this.setNodeValue(ctx, new declaration.TestMethodDeclaration(name, stmts, exps, error));
    }


    exitTextLiteral(ctx) {
        this.setNodeValue(ctx, new literal.TextLiteral(ctx.getText()));
    }


    exitTimeLiteral(ctx) {
        this.setNodeValue(ctx, new literal.TimeLiteral(ctx.getText()));
    }


    exitPeriodLiteral(ctx) {
        this.setNodeValue(ctx, new literal.PeriodLiteral(ctx.getText()));
    }


    exitPeriodType(ctx) {
        this.setNodeValue(ctx, type.PeriodType.instance);
    }


    exitVersionLiteral(ctx) {
        this.setNodeValue(ctx, new literal.VersionLiteral(ctx.getText()));
    }


    exitVersionType(ctx) {
        this.setNodeValue(ctx, type.VersionType.instance);
    }

    exitAttribute_identifier(ctx) {
        const name = new grammar.Identifier(ctx.getText());
        this.setNodeValue(ctx, name);
    }


    exitVariable_identifier(ctx) {
        const name = new grammar.Identifier(ctx.getText());
        this.setNodeValue(ctx, name);
    }


    exitList_literal(ctx) {
        const mutable = ctx.MUTABLE() !== null;
        const items = this.getNodeValue(ctx.expression_list()) || null;
        const value = new literal.ListLiteral(mutable, items);
        this.setNodeValue(ctx, value);
    }


    exitDict_literal(ctx) {
        const mutable = ctx.MUTABLE() !== null;
        const items = this.getNodeValue(ctx.dict_entry_list()) || null;
        const value = new literal.DictLiteral(mutable, items);
        this.setNodeValue(ctx, value);
    }


    exitTuple_literal(ctx) {
        const mutable = ctx.MUTABLE() !== null;
        const items = this.getNodeValue(ctx.expression_tuple()) || null;
        const value = new literal.TupleLiteral(mutable, items);
        this.setNodeValue(ctx, value);
    }


    exitRange_literal(ctx) {
        const low = this.getNodeValue(ctx.low);
        const high = this.getNodeValue(ctx.high);
        this.setNodeValue(ctx, new literal.RangeLiteral(low, high));
    }


    exitRangeLiteral(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitDict_entry_list(ctx) {
        const items = new literal.DictEntryList(null, null);
        ctx.dict_entry().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitDict_entry(ctx) {
        const key = this.getNodeValue(ctx.key);
        const value = this.getNodeValue(ctx.value);
        const entry = new literal.DictEntry(key, value);
        this.setNodeValue(ctx, entry);
    }


    exitDoc_entry_list(ctx) {
        const items = new literal.DocEntryList(null, null);
        ctx.doc_entry().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitDoc_entry(ctx) {
        const key = this.getNodeValue(ctx.key);
        const value = this.getNodeValue(ctx.value);
        const entry = new literal.DocEntry(key, value);
        this.setNodeValue(ctx, entry);
    }


    exitDocKeyIdentifier(ctx) {
        const text = ctx.name.getText();
        this.setNodeValue(ctx, new literal.DocIdentifierKey(new grammar.Identifier(text)));
    }


    exitDocKeyText(ctx) {
        const text = ctx.name.text;
        this.setNodeValue(ctx, new literal.DocTextKey(text));
    }


    exitLiteral_expression(ctx) {
        const exp = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, exp);
    }


    exitLiteralExpression(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitIdentifierExpression(ctx) {
        const name = this.getNodeValue(ctx.exp);
        const exp = new expression.UnresolvedIdentifier(name);
        this.setNodeValue(ctx, exp);
    }


    exitVariableIdentifier(ctx) {
        const id = this.getNodeValue(ctx.variable_identifier());
        this.setNodeValue(ctx, new expression.InstanceExpression(id));
    }


    exitInstanceExpression(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitSymbol_identifier(ctx) {
        const name = new grammar.Identifier(ctx.getText());
        this.setNodeValue(ctx, name);
    }


    exitNative_symbol(ctx) {
        const name = this.getNodeValue(ctx.name);
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new expression.NativeSymbol(name, exp));
    }


    exitTypeIdentifier(ctx) {
        const name = this.getNodeValue(ctx.type_identifier());
        this.setNodeValue(ctx, name);
    }


    exitSymbolIdentifier(ctx) {
        const name = this.getNodeValue(ctx.symbol_identifier());
        this.setNodeValue(ctx, name);
    }


    exitSymbolLiteral(ctx) {
        const name = ctx.getText();
        this.setNodeValue(ctx, new expression.SymbolExpression(new grammar.Identifier(name)));
    }


    exitBlobType(ctx) {
        this.setNodeValue(ctx, type.BlobType.instance);
    }


    exitBooleanType(ctx) {
        this.setNodeValue(ctx, type.BooleanType.instance);
    }


    exitCharacterType(ctx) {
        this.setNodeValue(ctx, type.CharacterType.instance);
    }


    exitImageType(ctx) {
        this.setNodeValue(ctx, type.ImageType.instance);
    }


    exitTextType(ctx) {
        this.setNodeValue(ctx, type.TextType.instance);
    }


    exitHtmlType(ctx) {
        this.setNodeValue(ctx, type.HtmlType.instance);
    }


    exitThisExpression(ctx) {
        this.setNodeValue(ctx, new expression.ThisExpression());
    }


    exitIntegerType(ctx) {
        this.setNodeValue(ctx, type.IntegerType.instance);
    }


    exitDecimalType(ctx) {
        this.setNodeValue(ctx, type.DecimalType.instance);
    }


    exitDateType(ctx) {
        this.setNodeValue(ctx, type.DateType.instance);
    }


    exitDateTimeType(ctx) {
        this.setNodeValue(ctx, type.DateTimeType.instance);
    }


    exitTimeType(ctx) {
        this.setNodeValue(ctx, type.TimeType.instance);
    }


    exitCodeType(ctx) {
        this.setNodeValue(ctx, type.CodeType.instance);
    }


    exitPrimaryType(ctx) {
        const type = this.getNodeValue(ctx.p);
        this.setNodeValue(ctx, type);
    }


    exitAttribute_declaration(ctx) {
        const id = this.getNodeValue(ctx.name);
        const type = this.getNodeValue(ctx.typ);
        const match = this.getNodeValue(ctx.match);
        const indices = ctx.index_clause() == null ? null : this.getNodeValue(ctx.index_clause());
        const decl = new declaration.AttributeDeclaration(id, type, match, indices);
        decl.storable = ctx.STORABLE() != null;
        this.setNodeValue(ctx, decl);
    }


    exitIndex_clause(ctx) {
        const indices = ctx.indices == null ? new grammar.IdentifierList() : this.getNodeValue(ctx.indices);
        this.setNodeValue(ctx, indices);
    }


    exitNativeType(ctx) {
        const type = this.getNodeValue(ctx.n);
        this.setNodeValue(ctx, type);
    }


    exitCategoryType(ctx) {
        const type = this.getNodeValue(ctx.c);
        this.setNodeValue(ctx, type);
    }


    exitCategory_type(ctx) {
        const name = new grammar.Identifier(ctx.getText());
        this.buildSection(ctx, name);
        this.setNodeValue(ctx, new type.CategoryType(name));
    }


    exitListType(ctx) {
        const typ = this.getNodeValue(ctx.l);
        this.setNodeValue(ctx, new type.ListType(typ));
    }


    exitDictKeyIdentifier(ctx) {
        const text = ctx.name.getText();
        this.setNodeValue(ctx, new literal.DictIdentifierKey(new grammar.Identifier(text)));
    }

    exitDictKeyText(ctx) {
        const text = ctx.name.text;
        this.setNodeValue(ctx, new literal.DictTextKey(text));
    }


    exitDictType(ctx) {
        const typ = this.getNodeValue(ctx.d);
        this.setNodeValue(ctx, new type.DictionaryType(typ));
    }


    exitAttribute_identifier_list(ctx) {
        const list = new grammar.IdentifierList();
        ctx.attribute_identifier().forEach(function (rule) {
            const item = this.getNodeValue(rule);
            list.add(item);
        }, this);
        this.setNodeValue(ctx, list);
    }


    exitVariable_identifier_list(ctx) {
        const list = new grammar.IdentifierList();
        ctx.variable_identifier().forEach(function (rule) {
            const item = this.getNodeValue(rule);
            list.add(item);
        }, this);
        this.setNodeValue(ctx, list);
    }


    exitConcrete_category_declaration(ctx) {
        const name = this.getNodeValue(ctx.name);
        const attrs = this.getNodeValue(ctx.attrs);
        const derived = this.getNodeValue(ctx.derived);
        const methods = this.getNodeValue(ctx.methods);
        const decl = new declaration.ConcreteCategoryDeclaration(name, attrs, derived, methods);
        decl.storable = ctx.STORABLE() != null;
        this.setNodeValue(ctx, decl);
    }


    exitConcrete_widget_declaration(ctx) {
        const name = this.getNodeValue(ctx.name);
        const derived = this.getNodeValue(ctx.derived);
        const methods = this.getNodeValue(ctx.methods);
        const decl = new declaration.ConcreteWidgetDeclaration(name, derived, methods);
        this.setNodeValue(ctx, decl);
    }


    exitConcreteCategoryDeclaration(ctx) {
        const decl = this.getNodeValue(ctx.decl);
        this.setNodeValue(ctx, decl);
    }


    exitConcreteWidgetDeclaration(ctx) {
        const decl = this.getNodeValue(ctx.decl);
        this.setNodeValue(ctx, decl);
    }


    exitNativeWidgetDeclaration(ctx) {
        const decl = this.getNodeValue(ctx.decl);
        this.setNodeValue(ctx, decl);
    }


    exitDerived_list(ctx) {
        const items = this.getNodeValue(ctx.items);
        this.setNodeValue(ctx, items);
    }

    exitType_identifier(ctx) {
        const name = new grammar.Identifier(ctx.getText());
        this.setNodeValue(ctx, name);
    }


    exitType_identifier_list(ctx) {
        const items = new grammar.IdentifierList();
        ctx.type_identifier().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitType_literal(ctx) {
        const type = this.getNodeValue(ctx.category_or_any_type());
        this.setNodeValue(ctx, new literal.TypeLiteral(type));
    }


    exitTypeLiteral(ctx) {
        this.setNodeValue(ctx, this.getNodeValue(ctx.type_literal()));
    }


    exitMember_identifier(ctx) {
        const name = new grammar.Identifier(ctx.getText());
        this.setNodeValue(ctx, name);
    }


    exitMemberSelector(ctx) {
        const name = this.getNodeValue(ctx.name);
        this.setNodeValue(ctx, new expression.MemberSelector(null, name));
    }

    exitIsATypeExpression(ctx) {
        const type = this.getNodeValue(ctx.category_or_any_type());
        const exp = new expression.TypeExpression(type);
        this.setNodeValue(ctx, exp);
    }

    exitIsOtherExpression(ctx) {
        const exp = this.getNodeValue(ctx.expression());
        this.setNodeValue(ctx, exp);
    }

    exitIsExpression(ctx) {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        let op;
        if(ctx.NOT())
            op = right instanceof expression.TypeExpression ? grammar.EqOp.IS_NOT_A : grammar.EqOp.IS_NOT;
        else
            op = right instanceof expression.TypeExpression ? grammar.EqOp.IS_A : grammar.EqOp.IS;
        this.setNodeValue(ctx, new expression.EqualsExpression(left, op, right));
    }


    exitItemSelector(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new expression.ItemSelector(null, exp));
    }


    exitSliceSelector(ctx) {
        const slice = this.getNodeValue(ctx.xslice);
        this.setNodeValue(ctx, slice);
    }


    exitTyped_argument(ctx) {
        const typ = this.getNodeValue(ctx.typ);
        const name = this.getNodeValue(ctx.name);
        const attrs = this.getNodeValue(ctx.attrs);
        const arg = attrs ?
            new param.ExtendedParameter(typ, name, attrs) :
            new param.CategoryParameter(typ, name);
        const exp = this.getNodeValue(ctx.value);
        arg.defaultExpression = exp || null;
        this.setNodeValue(ctx, arg);
    }


    exitCodeArgument(ctx) {
        const arg = this.getNodeValue(ctx.arg);
        this.setNodeValue(ctx, arg);
    }


    exitArgument_list(ctx) {
        const items = new param.ParameterList();
        ctx.argument().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitMethodName(ctx) {
        const name = this.getNodeValue(ctx.name);
        this.setNodeValue(ctx, new expression.UnresolvedIdentifier(name));
    }


    exitMethodParent(ctx) {
        const parent = this.getNodeValue(ctx.parent);
        const name = this.getNodeValue(ctx.name);
        this.setNodeValue(ctx, new expression.MethodSelector(parent, name));
    }


    exitExpressionAssignmentList(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        const assign = new grammar.Argument(null, exp);
        this.setNodeValue(ctx, new grammar.ArgumentList([assign]));
    }


    exitArgument_assignment(ctx) {
        const name = this.getNodeValue(ctx.name);
        const exp = this.getNodeValue(ctx.exp);
        const arg = new param.UnresolvedParameter(name);
        this.setNodeValue(ctx, new grammar.Argument(arg, exp));
    }


    exitArgumentAssignmentList(ctx) {
        const item = this.getNodeValue(ctx.item);
        this.setNodeValue(ctx, new grammar.ArgumentList([item]));
    }


    exitArgumentAssignmentListItem(ctx) {
        const item = this.getNodeValue(ctx.item);
        const items = this.getNodeValue(ctx.items);
        items.add(item);
        this.setNodeValue(ctx, items);
    }


    exitArrow_prefix(ctx) {
        const args = this.getNodeValue(ctx.arrow_args());
        let argsSuite = this.getWhiteSpacePlus(ctx.s1);
        if (argsSuite == null) // happens when only WS
            argsSuite = this.getHiddenTokensBefore(ctx.EGT().getSymbol());
        let arrowSuite = this.getWhiteSpacePlus(ctx.s2);
        if (arrowSuite == null) // happens when only WS
            arrowSuite = this.getHiddenTokensAfter(ctx.EGT().getSymbol());
        this.setNodeValue(ctx, new expression.ArrowExpression(args, argsSuite, arrowSuite));
    }


    exitArrowExpression(ctx) {
        this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
    }


    exitArrowExpressionBody(ctx) {
        const arrow = this.getNodeValue(ctx.arrow_prefix());
        const exp = this.getNodeValue(ctx.expression());
        arrow.setExpression(exp);
        this.setNodeValue(ctx, arrow);
    }


    exitArrowListArg(ctx) {
        const list = this.getNodeValue(ctx.variable_identifier_list());
        this.setNodeValue(ctx, list);
    }


    exitArrowSingleArg(ctx) {
        const arg = this.getNodeValue(ctx.variable_identifier());
        this.setNodeValue(ctx, new grammar.IdentifierList(arg));
    }


    exitArrowStatementsBody(ctx) {
        const arrow = this.getNodeValue(ctx.arrow_prefix());
        const stmts = this.getNodeValue(ctx.statement_list());
        arrow.setStatements(stmts);
        this.setNodeValue(ctx, arrow);
    }


    exitMethod_call_expression(ctx) {
        const name = this.getNodeValue(ctx.name);
        const caller = new expression.UnresolvedIdentifier(name);
        caller.copySectionFrom(name);
        const args = this.getNodeValue(ctx.args);
        this.setNodeValue(ctx, new statement.UnresolvedCall(caller, args));
    }


    exitMethod_call_statement(ctx) {
        const parent = this.getNodeValue(ctx.parent);
        const call = this.getNodeValue(ctx.method);
        call && call.setParent(parent);
        const name = this.getNodeValue(ctx.name);
        const stmts = this.getNodeValue(ctx.stmts);
        if (call && name != null || stmts != null)
            this.setNodeValue(ctx, new statement.RemoteCall(call.callable, call.args, name, stmts));
        else
            this.setNodeValue(ctx, call)
    }


    exitMethodSelector(ctx) {
        const call = this.getNodeValue(ctx.method);
        if (call.callable instanceof expression.UnresolvedIdentifier) {
            const callable = new expression.UnresolvedSelector(null, call.callable.id);
            callable.copySectionFrom(call.callable);
            call.callable = callable;
        }
        this.setNodeValue(ctx, call);
    }


    exitAddExpression(ctx) {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        const exp = ctx.op.type == parser.MParser.PLUS ?
            new expression.PlusExpression(left, right) :
            new expression.SubtractExpression(left, right);
        this.setNodeValue(ctx, exp);
    }


    exitMember_method_declaration_list(ctx) {
        const items = new grammar.MethodDeclarationList();
        ctx.member_method_declaration().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }

    exitNative_member_method_declaration_list(ctx) {
        const items = new grammar.MethodDeclarationList();
        ctx.native_member_method_declaration().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitSetter_method_declaration(ctx) {
        const name = this.getNodeValue(ctx.name);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new declaration.SetterMethodDeclaration(name, stmts));
    }


    exitSetType(ctx) {
        const typ = this.getNodeValue(ctx.s);
        this.setNodeValue(ctx, new type.SetType(typ));
    }


    exitGetter_method_declaration(ctx) {
        const name = this.getNodeValue(ctx.name);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new declaration.GetterMethodDeclaration(name, stmts));
    }

    exitNative_setter_declaration(ctx) {
        const name = this.getNodeValue(ctx.name);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new declaration.NativeSetterMethodDeclaration(name, stmts));
    }


    exitNative_getter_declaration(ctx) {
        const name = this.getNodeValue(ctx.name);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new declaration.NativeGetterMethodDeclaration(name, stmts));
    }


    exitMember_method_declaration(ctx) {
        const comments = this.readComments(ctx.comment_statement());
        const annotations = this.readAnnotations(ctx.annotation_constructor());
        const ctx_ = ctx.children[ctx.getChildCount() - 1];
        const decl = this.getNodeValue(ctx_);
        if (decl != null) {
            decl.comments = comments;
            decl.annotations = annotations;
            this.setNodeValue(ctx, decl);
        }
    }

    exitStatement_list(ctx) {
        const items = new statement.StatementList();
        ctx.statement().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitAbstract_method_declaration(ctx) {
        const typ = this.getNodeValue(ctx.typ);
        if (typ instanceof type.CategoryType)
            typ.mutable = ctx.MUTABLE() != null;
        const name = this.getNodeValue(ctx.name);
        const args = this.getNodeValue(ctx.args);
        this.setNodeValue(ctx, new declaration.AbstractMethodDeclaration(name, args, typ));
    }


    exitConcrete_method_declaration(ctx) {
        const typ = this.getNodeValue(ctx.typ);
        if (typ instanceof type.CategoryType)
            typ.mutable = ctx.MUTABLE() != null;
        const name = this.getNodeValue(ctx.name);
        const args = this.getNodeValue(ctx.args);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new declaration.ConcreteMethodDeclaration(name, args, typ, stmts));
    }


    exitMethod_declaration(ctx) {
        const value = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, value);
    }


    exitMethodCallStatement(ctx) {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitMethod_identifier(ctx) {
        const value = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, value);
    }


    exitMethod_Expression(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitConstructorFrom(ctx) {
        const type = this.getNodeValue(ctx.typ);
        const copyFrom = this.getNodeValue(ctx.copyExp) || null;
        const args = this.getNodeValue(ctx.args) || null;
        this.setNodeValue(ctx, new expression.ConstructorExpression(type, copyFrom, args, true));
    }


    exitConstructorNoFrom(ctx) {
        const type = this.getNodeValue(ctx.typ);
        const args = this.getNodeValue(ctx.args) || null;
        this.setNodeValue(ctx, new expression.ConstructorExpression(type, null, args, true));
    }


    exitCopy_from(ctx) {
        this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
    }


    exitAssertion(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new parser.Assertion(exp));
    }


    exitAssertion_list(ctx) {
        const items = new expression.ExpressionList();
        ctx.assertion().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitAssign_instance_statement(ctx) {
        const inst = this.getNodeValue(ctx.inst);
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new statement.AssignInstanceStatement(inst, exp));
    }


    exitAssignInstanceStatement(ctx) {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitAssign_variable_statement(ctx) {
        const name = this.getNodeValue(ctx.variable_identifier());
        const exp = this.getNodeValue(ctx.expression());
        this.setNodeValue(ctx, new statement.AssignVariableStatement(name, exp));
    }


    exitAssign_tuple_statement(ctx) {
        const items = this.getNodeValue(ctx.items);
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new statement.AssignTupleStatement(items, exp));
    }


    exitRootInstance(ctx) {
        const name = this.getNodeValue(ctx.variable_identifier());
        this.setNodeValue(ctx, new instance.VariableInstance(name));
    }

    exitChildInstance(ctx) {
        const parent = this.getNodeValue(ctx.assignable_instance());
        const child = this.getNodeValue(ctx.child_instance());
        child.parent = parent;
        this.setNodeValue(ctx, child);
    }


    exitMemberInstance(ctx) {
        const name = this.getNodeValue(ctx.name);
        this.setNodeValue(ctx, new instance.MemberInstance(name));
    }


    exitItemInstance(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new instance.ItemInstance(exp));
    }


    exitMethod_expression(ctx) {
        const exp = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, exp);
    }


    exitMethodExpression(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitConstructorExpression(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitNative_statement_list(ctx) {
        const items = new statement.StatementList();
        ctx.native_statement().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitJava_identifier(ctx) {
        this.setNodeValue(ctx, ctx.getText());
    }

    exitJavascript_identifier(ctx) {
        const id = new grammar.Identifier(ctx.getText());
        this.setNodeValue(ctx, id);
    }

    exitJavascript_member_expression(ctx) {
        const name = ctx.name.getText();
        this.setNodeValue(ctx, new javascript.JavaScriptMemberExpression(name));
    }

    exitJavascript_primary_expression(ctx) {
        const exp = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, exp);
    }

    exitJavascript_new_expression(ctx) {
        const method = this.getNodeValue(ctx.javascript_method_expression());
        this.setNodeValue(ctx, new javascript.JavaScriptNewExpression(method));
    }


    exitJavascript_this_expression(ctx) {
        this.setNodeValue(ctx, new javascript.JavaScriptThisExpression());
    }


    exitJavaIdentifier(ctx) {
        const name = this.getNodeValue(ctx.name);
        this.setNodeValue(ctx, new java.JavaIdentifierExpression(null, name));
    }

    exitJavaIdentifierExpression(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitJavaChildIdentifier(ctx) {
        const parent = this.getNodeValue(ctx.parent);
        const name = this.getNodeValue(ctx.name);
        const child = new java.JavaIdentifierExpression(parent, name);
        this.setNodeValue(ctx, child);
    }

    exitJavascriptBooleanLiteral(ctx) {
        this.setNodeValue(ctx, new javascript.JavaScriptBooleanLiteral(ctx.getText()));
    }

    exitJavascriptCharacterLiteral(ctx) {
        this.setNodeValue(ctx, new javascript.JavaScriptCharacterLiteral(ctx.getText()));
    }

    exitJavascriptTextLiteral(ctx) {
        this.setNodeValue(ctx, new javascript.JavaScriptTextLiteral(ctx.getText()));
    }

    exitJavascriptIntegerLiteral(ctx) {
        this.setNodeValue(ctx, new javascript.JavaScriptIntegerLiteral(ctx.getText()));
    }


    exitJavascriptDecimalLiteral(ctx) {
        this.setNodeValue(ctx, new javascript.JavaScriptDecimalLiteral(ctx.getText()));
    }


    exitJavaClassIdentifier(ctx) {
        const klass = this.getNodeValue(ctx.klass);
        this.setNodeValue(ctx, klass);
    }


    exitJavaChildClassIdentifier(ctx) {
        const parent = this.getNodeValue(ctx.parent);
        const child = new java.JavaIdentifierExpression(parent, ctx.name.getText());
        this.setNodeValue(ctx, child);
    }


    exitJavaPrimaryExpression(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitJavascriptPrimaryExpression(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitJavascript_identifier_expression(ctx) {
        const id = this.getNodeValue(ctx.name);
        this.setNodeValue(ctx, new javascript.JavaScriptIdentifierExpression(id));
    }

    exitJavaSelectorExpression(ctx) {
        const parent = this.getNodeValue(ctx.parent);
        const child = this.getNodeValue(ctx.child);
        child.parent = parent;
        this.setNodeValue(ctx, child);
    }

    exitJavascriptSelectorExpression(ctx) {
        const parent = this.getNodeValue(ctx.parent);
        const child = this.getNodeValue(ctx.child);
        child.parent = parent;
        this.setNodeValue(ctx, child);
    }

    exitJavascriptMemberExpression(ctx) {
        const id = this.getNodeValue(ctx.name);
        this.setNodeValue(ctx, new javascript.JavaScriptMemberExpression(id));
    }

    exitJava_primary_expression(ctx) {
        const exp = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, exp);
    }

    exitJava_item_expression(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new java.JavaItemExpression(exp));
    }

    exitJavascript_item_expression(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new javascript.JavaScriptItemExpression(exp));
    }

    exitJavascriptItemExpression(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitJavaStatement(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        const stmt = new java.JavaStatement(exp, false);
        this.setNodeValue(ctx, stmt);
    }

    exitJavascriptStatement(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        const stmt = new javascript.JavaScriptStatement(exp, false);
        this.setNodeValue(ctx, stmt);
    }


    exitJavaReturnStatement(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new java.JavaStatement(exp, true));
    }


    exitJavascriptReturnStatement(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new javascript.JavaScriptStatement(exp, true));
    }


    exitJavaNativeStatement(ctx) {
        const stmt = this.getNodeValue(ctx.java_statement());
        this.setNodeValue(ctx, new java.JavaNativeCall(stmt));
    }


    exitJavascriptNativeStatement(ctx) {
        const stmt = this.getNodeValue(ctx.javascript_native_statement());
        this.setNodeValue(ctx, stmt);
    }

    exitJavascript_native_statement(ctx) {
        const stmt = this.getNodeValue(ctx.javascript_statement());
        const module = this.getNodeValue(ctx.javascript_module());
        stmt.module = module || null;
        this.setNodeValue(ctx, new javascript.JavaScriptNativeCall(stmt));
    }


    exitNative_method_declaration(ctx) {
        const type = this.getNodeValue(ctx.typ);
        const name = this.getNodeValue(ctx.name);
        const args = this.getNodeValue(ctx.args);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new declaration.NativeMethodDeclaration(name, args, type, stmts));
    }


    exitJavaArgumentList(ctx) {
        const item = this.getNodeValue(ctx.item);
        this.setNodeValue(ctx, new java.JavaExpressionList(item));
    }

    exitJavascriptArgumentList(ctx) {
        const item = this.getNodeValue(ctx.item);
        this.setNodeValue(ctx, new javascript.JavaScriptExpressionList(item));
    }

    exitJavaArgumentListItem(ctx) {
        const item = this.getNodeValue(ctx.item);
        const items = this.getNodeValue(ctx.items);
        items.add(item);
        this.setNodeValue(ctx, items);
    }

    exitJavascriptArgumentListItem(ctx) {
        const item = this.getNodeValue(ctx.item);
        const items = this.getNodeValue(ctx.items);
        items.add(item);
        this.setNodeValue(ctx, items);
    }

    exitJava_method_expression(ctx) {
        const name = this.getNodeValue(ctx.name);
        const args = this.getNodeValue(ctx.args);
        this.setNodeValue(ctx, new java.JavaMethodExpression(name, args));
    }

    exitJava_this_expression(ctx) {
        this.setNodeValue(ctx, new java.JavaThisExpression());
    }

    exitJavascriptMethodExpression(ctx) {
        const method = this.getNodeValue(ctx.method);
        this.setNodeValue(ctx, method);
    }

    exitJavascript_method_expression(ctx) {
        const id = this.getNodeValue(ctx.name);
        const args = this.getNodeValue(ctx.args);
        this.setNodeValue(ctx, new javascript.JavaScriptMethodExpression(id, args));
    }

    exitJavaMethodExpression(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitFlush_statement(ctx) {
        this.setNodeValue(ctx, new statement.FlushStatement());
    }


    exitFlushStatement(ctx) {
        this.setNodeValue(ctx, this.getNodeValue(ctx.stmt));
    }


    exitFullDeclarationList(ctx) {
        const items = this.getNodeValue(ctx.declarations()) || new declaration.DeclarationList();
        this.setNodeValue(ctx, items);
    }


    exitDeclaration(ctx) {
        const comments = this.readComments(ctx.comment_statement());
        const annotations = this.readAnnotations(ctx.annotation_constructor());
        const ctx_ = ctx.children[ctx.getChildCount() - 1];
        const decl = this.getNodeValue(ctx_);
        if (decl != null) {
            decl.comments = comments;
            decl.annotations = annotations;
            this.setNodeValue(ctx, decl);
        }
    }


    exitDeclarations(ctx) {
        const items = new declaration.DeclarationList();
        ctx.declaration().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitIteratorExpression(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        const name = this.getNodeValue(ctx.name);
        const source = this.getNodeValue(ctx.source);
        this.setNodeValue(ctx, new expression.IteratorExpression(name, source, exp));
    }


    exitIteratorType(ctx) {
        const typ = this.getNodeValue(ctx.i);
        this.setNodeValue(ctx, new type.IteratorType(typ));
    }


    exitJavaBooleanLiteral(ctx) {
        this.setNodeValue(ctx, new java.JavaBooleanLiteral(ctx.getText()));
    }


    exitJavaIntegerLiteral(ctx) {
        this.setNodeValue(ctx, new java.JavaIntegerLiteral(ctx.getText()));
    }


    exitJavaDecimalLiteral(ctx) {
        this.setNodeValue(ctx, new java.JavaDecimalLiteral(ctx.getText()));
    }


    exitJavaCharacterLiteral(ctx) {
        this.setNodeValue(ctx, new java.JavaCharacterLiteral(ctx.getText()));
    }


    exitJavaTextLiteral(ctx) {
        this.setNodeValue(ctx, new java.JavaTextLiteral(ctx.getText()));
    }


    exitJavaCategoryBinding(ctx) {
        const map = this.getNodeValue(ctx.binding);
        this.setNodeValue(ctx, new java.JavaNativeCategoryBinding(map));
    }

    exitJavascriptCategoryBinding(ctx) {
        this.setNodeValue(ctx, this.getNodeValue(ctx.binding));
    }


    exitJavascript_category_binding(ctx) {
        const identifier = ctx.javascript_identifier().map(cx => cx.getText()).join(".");
        const module = this.getNodeValue(ctx.javascript_module());
        const map = new javascript.JavaScriptNativeCategoryBinding(identifier, module);
        this.setNodeValue(ctx, map);
    }


    exitJavascript_module(ctx) {
        const ids = ctx.javascript_identifier().map(rule => rule.getText());
        const module = new javascript.JavaScriptModule(ids);
        this.setNodeValue(ctx, module);
    }


    exitNativeCategoryBindingList(ctx) {
        const item = this.getNodeValue(ctx.item);
        const items = new grammar.NativeCategoryBindingList(item);
        this.setNodeValue(ctx, items);
    }


    exitNativeCategoryBindingListItem(ctx) {
        const item = this.getNodeValue(ctx.item);
        const items = this.getNodeValue(ctx.items);
        items.add(item);
        this.setNodeValue(ctx, items);
    }


    exitNative_category_bindings(ctx) {
        const items = this.getNodeValue(ctx.items);
        this.setNodeValue(ctx, items);
    }


    exitNative_category_declaration(ctx) {
        const name = this.getNodeValue(ctx.name);
        const attrs = this.getNodeValue(ctx.attrs);
        const bindings = this.getNodeValue(ctx.bindings);
        const methods = this.getNodeValue(ctx.methods);
        const decl = new declaration.NativeCategoryDeclaration(name, attrs, bindings, null, methods);
        decl.storable = ctx.STORABLE() != null;
        this.setNodeValue(ctx, decl);
    }


    exitNative_widget_declaration(ctx) {
        const name = this.getNodeValue(ctx.name);
        const bindings = this.getNodeValue(ctx.bindings);
        const methods = this.getNodeValue(ctx.methods);
        const decl = new declaration.NativeWidgetDeclaration(name, bindings, methods);
        this.setNodeValue(ctx, decl);
    }


    exitNativeCategoryDeclaration(ctx) {
        const decl = this.getNodeValue(ctx.decl);
        this.setNodeValue(ctx, decl);
    }


    exitNative_resource_declaration(ctx) {
        const name = this.getNodeValue(ctx.name);
        const attrs = this.getNodeValue(ctx.attrs);
        const bindings = this.getNodeValue(ctx.bindings);
        const methods = this.getNodeValue(ctx.methods);
        const decl = new declaration.NativeResourceDeclaration(name, attrs, bindings, null, methods);
        decl.storable = ctx.STORABLE() != null;
        this.setNodeValue(ctx, decl);
    }


    exitResource_declaration(ctx) {
        const decl = this.getNodeValue(ctx.native_resource_declaration());
        this.setNodeValue(ctx, decl);
    }


    exitParenthesis_expression(ctx) {
        const exp = this.getNodeValue(ctx.expression());
        this.setNodeValue(ctx, new expression.ParenthesisExpression(exp));
    }


    exitParenthesisExpression(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitNative_symbol_list(ctx) {
        const items = new grammar.NativeSymbolList();
        ctx.native_symbol().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitEnum_native_declaration(ctx) {
        const name = this.getNodeValue(ctx.name);
        const type = this.getNodeValue(ctx.typ);
        const symbols = this.getNodeValue(ctx.symbols);
        this.setNodeValue(ctx, new declaration.EnumeratedNativeDeclaration(name, type, symbols));
    }


    exitFor_each_statement(ctx) {
        const name1 = this.getNodeValue(ctx.name1);
        const name2 = this.getNodeValue(ctx.name2);
        const source = this.getNodeValue(ctx.source);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new statement.ForEachStatement(name1, name2, source, stmts));
    }


    exitForEachStatement(ctx) {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitKey_token(ctx) {
        this.setNodeValue(ctx, ctx.getText());
    }


    exitUUIDLiteral(ctx) {
        this.setNodeValue(ctx, new literal.UUIDLiteral(ctx.getText()));
    }


    exitUUIDType(ctx) {
        this.setNodeValue(ctx, type.UUIDType.instance);
    }


    exitValue_token(ctx) {
        this.setNodeValue(ctx, ctx.getText());
    }


    exitNamed_argument(ctx) {
        const name = this.getNodeValue(ctx.variable_identifier());
        const arg = new param.UnresolvedParameter(name);
        const exp = this.getNodeValue(ctx.literal_expression());
        arg.defaultExpression = exp || null;
        this.setNodeValue(ctx, arg);
    }


    exitClosureStatement(ctx) {
        const decl = this.getNodeValue(ctx.decl);
        this.setNodeValue(ctx, new statement.DeclarationStatement(decl));
    }


    exitReturn_statement(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new statement.ReturnStatement(exp));
    }


    exitReturnStatement(ctx) {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitType_expression(ctx) {
        const name = this.getNodeValue(ctx.name);
        this.setNodeValue(ctx, new expression.TypeExpression(new type.CategoryType(name)))
    }


    exitTypeExpression(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitIf_statement(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        const stmts = this.getNodeValue(ctx.stmts);
        const elseIfs = this.getNodeValue(ctx.elseIfs);
        const elseStmts = this.getNodeValue(ctx.elseStmts);
        this.setNodeValue(ctx, new statement.IfStatement(exp, stmts, elseIfs, elseStmts));
    }


    exitElseIfStatementList(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        const stmts = this.getNodeValue(ctx.stmts);
        const elem = new statement.IfElement(exp, stmts);
        this.setNodeValue(ctx, new statement.IfElementList(elem));
    }


    exitElseIfStatementListItem(ctx) {
        const items = this.getNodeValue(ctx.items);
        const exp = this.getNodeValue(ctx.exp);
        const stmts = this.getNodeValue(ctx.stmts);
        const elem = new statement.IfElement(exp, stmts);
        items.add(elem);
        this.setNodeValue(ctx, items);
    }


    exitIfStatement(ctx) {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitSuperExpression(ctx) {
        this.setNodeValue(ctx, new expression.SuperExpression());
    }


    exitSwitchStatement(ctx) {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitAssignTupleStatement(ctx) {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitRaiseStatement(ctx) {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitWriteStatement(ctx) {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitWithResourceStatement(ctx) {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitWhileStatement(ctx) {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitDoWhileStatement(ctx) {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitTryStatement(ctx) {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitEqualsExpression(ctx) {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        let op = null;
        switch(ctx.op.type) {
            case MLexer.EQ2:
                op = grammar.EqOp.EQUALS;
                break;
            case MLexer.XEQ:
                op = grammar.EqOp.NOT_EQUALS;
                break;
            case MLexer.TEQ:
                op = grammar.EqOp.ROUGHLY;
                break;
            default:
                throw new Error("Operator " + ctx.op.type);
        }
        this.setNodeValue(ctx, new expression.EqualsExpression(left, op, right));
    }


    exitCompareExpression(ctx) {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        let op = null;
        switch(ctx.op.type) {
            case MLexer.LT:
                op = grammar.CmpOp.LT;
                break;
            case MLexer.LTE:
                op = grammar.CmpOp.LTE;
                break;
            case MLexer.GT:
                op = grammar.CmpOp.GT;
                break;
            case MLexer.GTE:
                op = grammar.CmpOp.GTE;
                break;
            default:
                throw new Error("Operator " + ctx.op.type);
        }
        this.setNodeValue(ctx, new expression.CompareExpression(left, op, right));
    }


    exitAtomicSwitchCase(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new statement.AtomicSwitchCase(exp, stmts));
    }


    exitCollection_literal(ctx) {
        const value = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, value);
    }


    exitCollectionSwitchCase(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new statement.CollectionSwitchCase(exp, stmts));
    }


    exitSwitch_case_statement_list(ctx) {
        const items = new statement.SwitchCaseList();
        ctx.switch_case_statement().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitSwitch_statement(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        const cases = this.getNodeValue(ctx.cases);
        const stmts = this.getNodeValue(ctx.stmts);
        const stmt = new statement.SwitchStatement(exp, cases, stmts);
        this.setNodeValue(ctx, stmt);
    }


    exitLiteralRangeLiteral(ctx) {
        const low = this.getNodeValue(ctx.low);
        const high = this.getNodeValue(ctx.high);
        this.setNodeValue(ctx, new literal.RangeLiteral(low, high));
    }


    exitLiteralListLiteral(ctx) {
        const exp = this.getNodeValue(ctx.literal_list_literal());
        this.setNodeValue(ctx, new literal.ListLiteral(false, exp));
    }


    exitLiteral_list_literal(ctx) {
        const items = new expression.ExpressionList();
        ctx.atomic_literal().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitInExpression(ctx) {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        const op = ctx.NOT() ? grammar.ContOp.NOT_IN : grammar.ContOp.IN;
        this.setNodeValue(ctx, new expression.ContainsExpression(left, op, right));
    }


    exitCssType(ctx) {
        this.setNodeValue(ctx, type.CssType.instance);
    }


    exitHasExpression(ctx) {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        const op = ctx.NOT() ? grammar.ContOp.NOT_HAS : grammar.ContOp.HAS;
        this.setNodeValue(ctx, new expression.ContainsExpression(left, op, right));
    }



    exitHasAllExpression(ctx) {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        const op = ctx.NOT() ? grammar.ContOp.NOT_HAS_ALL : grammar.ContOp.HAS_ALL;
        this.setNodeValue(ctx, new expression.ContainsExpression(left, op, right));
    }


    exitHasAnyExpression(ctx) {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        const op = ctx.NOT() ? grammar.ContOp.NOT_HAS_ANY : grammar.ContOp.HAS_ANY;
        this.setNodeValue(ctx, new expression.ContainsExpression(left, op, right));
    }


    exitContainsExpression(ctx) {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        const op = ctx.NOT() ? grammar.EqOp.NOT_CONTAINS : grammar.EqOp.CONTAINS;
        this.setNodeValue(ctx, new expression.EqualsExpression(left, op, right));
    }

    exitDivideExpression(ctx) {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        this.setNodeValue(ctx, new expression.DivideExpression(left, right));
    }


    exitIntDivideExpression(ctx) {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        this.setNodeValue(ctx, new expression.IntDivideExpression(left, right));
    }


    exitModuloExpression(ctx) {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        this.setNodeValue(ctx, new expression.ModuloExpression(left, right));
    }


    exitAnnotation_constructor(ctx) {
        const name = this.getNodeValue(ctx.name);
        const args = new literal.DocEntryList();
        const exp = this.getNodeValue(ctx.exp);
        if (exp != null) {
            args.add(new literal.DocEntry(null, exp));
        }
        ctx.annotation_argument().map(function (argCtx) {
            const arg = this.getNodeValue(argCtx);
            args.add(arg);
        }, this);
        this.setNodeValue(ctx, new grammar.Annotation(name, args));
    }


    exitAnnotation_argument(ctx) {
        const name = this.getNodeValue(ctx.name);
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new literal.DocEntry(name, exp));
    }


    exitAnnotation_identifier(ctx) {
        this.setNodeValue(ctx, new grammar.Identifier(ctx.getText()));
    }


    exitAnnotation_argument_name(ctx) {
        this.setNodeValue(ctx, ctx.getText());
    }


    exitAnnotationLiteralValue(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitAnnotationTypeValue(ctx) {
        const typ = this.getNodeValue(ctx.typ);
        this.setNodeValue(ctx, new expression.TypeExpression(typ));
    }


    exitAndExpression(ctx) {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        this.setNodeValue(ctx, new expression.AndExpression(left, right));
    }

    exitNullLiteral(ctx) {
        this.setNodeValue(ctx, literal.NullLiteral.instance);
    }


    exitOperator_argument(ctx) {
        const value = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, value);
    }


    exitOperatorArgument(ctx) {
        const arg = this.getNodeValue(ctx.arg);
        arg.setMutable(ctx.MUTABLE() != null);
        this.setNodeValue(ctx, arg);
    }


    exitOperatorPlus(ctx) {
        this.setNodeValue(ctx, grammar.Operator.PLUS);
    }


    exitOperatorMinus(ctx) {
        this.setNodeValue(ctx, grammar.Operator.MINUS);
    }


    exitOperatorMultiply(ctx) {
        this.setNodeValue(ctx, grammar.Operator.MULTIPLY);
    }


    exitOperatorDivide(ctx) {
        this.setNodeValue(ctx, grammar.Operator.DIVIDE);
    }


    exitOperatorIDivide(ctx) {
        this.setNodeValue(ctx, grammar.Operator.IDIVIDE);
    }


    exitOperatorModulo(ctx) {
        this.setNodeValue(ctx, grammar.Operator.MODULO);
    }


    exitNative_member_method_declaration(ctx) {
        const comments = this.readComments(ctx.comment_statement());
        const annotations = this.readAnnotations(ctx.annotation_constructor());
        const ctx_ = ctx.children[ctx.getChildCount() - 1];
        const decl = this.getNodeValue(ctx_);
        if (decl != null) {
            decl.comments = comments;
            decl.annotations = annotations;
            this.setNodeValue(ctx, decl);
        }
    }


    exitOperator_method_declaration = function (ctx) {
        const op = this.getNodeValue(ctx.op);
        const arg = this.getNodeValue(ctx.arg);
        const typ = this.getNodeValue(ctx.typ);
        const stmts = this.getNodeValue(ctx.stmts);
        const decl = new declaration.OperatorMethodDeclaration(op, arg, typ, stmts);
        this.setNodeValue(ctx, decl);
    }


    exitOrder_by(ctx) {
        const ids = new grammar.IdentifierList();
        ctx.variable_identifier().map(function (ctx_) {
            ids.push(this.getNodeValue(ctx_));
        }, this);
        const clause = new grammar.OrderByClause(ids, ctx.DESC() != null);
        this.setNodeValue(ctx, clause);
    }

    exitOrder_by_list(ctx) {
        const list = new grammar.OrderByClauseList();
        ctx.order_by().map(function (ctx_) {
            list.add(this.getNodeValue(ctx_));
        }, this);
        this.setNodeValue(ctx, list);
    }

    exitOrExpression(ctx) {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        this.setNodeValue(ctx, new expression.OrExpression(left, right));
    }


    exitMultiplyExpression(ctx) {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        this.setNodeValue(ctx, new expression.MultiplyExpression(left, right));
    }


    exitMutable_category_type(ctx) {
        const typ = this.getNodeValue(ctx.category_type());
        typ.mutable = ctx.MUTABLE() != null;
        this.setNodeValue(ctx, typ);
    }


    exitMutableInstanceExpression(ctx) {
        const source = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new expression.MutableExpression(source));
    }


    exitMutableSelectableExpression(ctx) {
        this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
    }


    exitMutableSelectorExpression(ctx) {
        const parent = this.getNodeValue(ctx.parent);
        const selector = this.getNodeValue(ctx.selector);
        selector.parent = parent;
        this.setNodeValue(ctx, selector);
    }


    exitMinusExpression(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new expression.MinusExpression(exp));
    }


    exitNotExpression(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new expression.NotExpression(exp));
    }


    exitWhile_statement(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new statement.WhileStatement(exp, stmts));
    }


    exitDo_while_statement(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new statement.DoWhileStatement(exp, stmts));
    }

    exitSingleton_category_declaration(ctx) {
        const name = this.getNodeValue(ctx.name);
        const attrs = this.getNodeValue(ctx.attrs);
        const methods = this.getNodeValue(ctx.methods);
        this.setNodeValue(ctx, new declaration.SingletonCategoryDeclaration(name, attrs, methods));
    }

    exitSingletonCategoryDeclaration(ctx) {
        const decl = this.getNodeValue(ctx.decl);
        this.setNodeValue(ctx, decl);
    }

    exitSliceFirstAndLast(ctx) {
        const first = this.getNodeValue(ctx.first);
        const last = this.getNodeValue(ctx.last);
        this.setNodeValue(ctx, new expression.SliceSelector(null, first, last));
    }


    exitSliceFirstOnly(ctx) {
        const first = this.getNodeValue(ctx.first);
        this.setNodeValue(ctx, new expression.SliceSelector(null, first, null));
    }


    exitSliceLastOnly(ctx) {
        const last = this.getNodeValue(ctx.last);
        this.setNodeValue(ctx, new expression.SliceSelector(null, null, last));
    }


    exitSorted_expression(ctx) {
        const source = this.getNodeValue(ctx.source);
        const desc = ctx.DESC() != null;
        const key = this.getNodeValue(ctx.key);
        this.setNodeValue(ctx, new expression.SortedExpression(source, desc, key));
    }


    exitSorted_key(ctx) {
        const exp = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, exp);
    }


    exitDocument_expression(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new expression.DocumentExpression(exp));
    }


    exitDocumentType(ctx) {
        this.setNodeValue(ctx, type.DocumentType.instance);
    }


    exitDocument_literal(ctx) {
        const entries = this.getNodeValue(ctx.doc_entry_list()) || new literal.DocEntryList();
        this.setNodeValue(ctx, new literal.DocumentLiteral(entries));
    }


    exitFetchStatement(ctx) {
        this.setNodeValue(ctx, this.getNodeValue(ctx.stmt));
    }


    exitFetchMany(ctx) {
        const category = this.getNodeValue(ctx.typ);
        const predicate = this.getNodeValue(ctx.predicate);
        const start = this.getNodeValue(ctx.xstart);
        const stop = this.getNodeValue(ctx.xstop);
        const orderBy = this.getNodeValue(ctx.orderby);
        this.setNodeValue(ctx, new expression.FetchManyExpression(category, start, stop, predicate, orderBy));
    }


    exitFetchManyAsync(ctx) {
        const category = this.getNodeValue(ctx.typ);
        const predicate = this.getNodeValue(ctx.predicate);
        const start = this.getNodeValue(ctx.xstart);
        const stop = this.getNodeValue(ctx.xstop);
        const orderBy = this.getNodeValue(ctx.orderby);
        const thenWith = grammar.ThenWith.OrEmpty(this.getNodeValue(ctx.then()));
        this.setNodeValue(ctx, new statement.FetchManyStatement(category, start, stop, predicate, orderBy, thenWith));
    }


    exitFetchOne(ctx) {
        const category = this.getNodeValue(ctx.typ);
        const predicate = this.getNodeValue(ctx.predicate);
        this.setNodeValue(ctx, new expression.FetchOneExpression(category, predicate));
    }


    exitFetchOneAsync(ctx) {
        const category = this.getNodeValue(ctx.typ);
        const predicate = this.getNodeValue(ctx.predicate);
        const thenWith = grammar.ThenWith.OrEmpty(this.getNodeValue(ctx.then()));
        this.setNodeValue(ctx, new statement.FetchOneStatement(category, predicate, thenWith));
    }


    exitThen(ctx) {
        const name = this.getNodeValue(ctx.name);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new grammar.ThenWith(name, stmts));
    }


    exitFilteredListExpression(ctx) {
        const filtered = this.getNodeValue(ctx.filtered_list_suffix());
        const source = this.getNodeValue(ctx.src);
        filtered.source = source;
        this.setNodeValue(ctx, filtered);
    }


    exitFiltered_list_suffix(ctx) {
        const itemName = this.getNodeValue(ctx.name);
        const predicate = this.getNodeValue(ctx.predicate);
        let exp;
        if(itemName)
            exp = new expression.ExplicitPredicateExpression(itemName, predicate);
        else if(predicate instanceof expression.PredicateExpression)
            exp = predicate;
        else
            throw new Error("What?");
        this.setNodeValue(ctx, new expression.FilteredExpression(null, exp));
    }


    exitArrowFilterExpression(ctx) {
        this.setNodeValue(ctx, this.getNodeValue(ctx.arrow_expression()));
    }


    exitExplicitFilterExpression(ctx) {
        const name = this.getNodeValue(ctx.variable_identifier());
        const predicate = this.getNodeValue(ctx.expression());
        this.setNodeValue(ctx, new expression.ExplicitPredicateExpression(name, predicate));
    }


    exitOtherFilterExpression(ctx) {
        this.setNodeValue(ctx, this.getNodeValue(ctx.expression()));
    }

    exitCode_type(ctx) {
        this.setNodeValue(ctx, type.CodeType.instance);
    }


    exitExecuteExpression(ctx) {
        const name = this.getNodeValue(ctx.name);
        this.setNodeValue(ctx, new expression.ExecuteExpression(name));
    }


    exitExpression_list(ctx) {
        const items = new expression.ExpressionList();
        ctx.expression().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitExpression_tuple(ctx) {
        const items = new expression.ExpressionList();
        ctx.expression().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitCodeExpression(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new expression.CodeExpression(exp));
    }


    exitCategory_or_any_type(ctx) {
        const exp = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, exp);
    }


    exitCode_argument(ctx) {
        const name = this.getNodeValue(ctx.name);
        this.setNodeValue(ctx, new param.CodeParameter(name));
    }


    exitCategory_symbol(ctx) {
        const name = this.getNodeValue(ctx.name);
        const args = this.getNodeValue(ctx.args);
        this.setNodeValue(ctx, new expression.CategorySymbol(name, args));
    }


    exitCategory_symbol_list(ctx) {
        const items = new grammar.CategorySymbolList();
        ctx.category_symbol().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitEnum_category_declaration(ctx) {
        const name = this.getNodeValue(ctx.name);
        const attrs = this.getNodeValue(ctx.attrs);
        const parent = this.getNodeValue(ctx.derived);
        const derived = parent == null ? null : new grammar.IdentifierList(parent);
        const symbols = this.getNodeValue(ctx.symbols);
        this.setNodeValue(ctx, new declaration.EnumeratedCategoryDeclaration(name, attrs, derived, symbols));
    }


    exitEnum_declaration(ctx) {
        const value = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, value);
    }


    exitRead_all_expression(ctx) {
        const source = this.getNodeValue(ctx.source);
        this.setNodeValue(ctx, new expression.ReadAllExpression(source));
    }


    exitRead_blob_expression(ctx) {
        const source = this.getNodeValue(ctx.source);
        this.setNodeValue(ctx, new expression.ReadBlobExpression(source));
    }


    exitRead_one_expression(ctx) {
        const source = this.getNodeValue(ctx.source);
        this.setNodeValue(ctx, new expression.ReadOneExpression(source));
    }


    exitRead_statement(ctx) {
        const source = this.getNodeValue(ctx.source);
        const thenWith = grammar.ThenWith.OrEmpty(this.getNodeValue(ctx.then()));
        this.setNodeValue(ctx, new statement.ReadStatement(source, thenWith));
    }


    exitReadStatement(ctx) {
        this.setNodeValue(ctx, this.getNodeValue(ctx.stmt));
    }


    exitRepl(ctx) {
        const value = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, value);
    }


    exitWith_singleton_statement(ctx) {
        const name = this.getNodeValue(ctx.typ);
        const typ = new type.CategoryType(name);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new statement.WithSingletonStatement(typ, stmts));
    }


    exitWithSingletonStatement(ctx) {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }

    exitWrite_statement(ctx) {
        const what = this.getNodeValue(ctx.what);
        const target = this.getNodeValue(ctx.target);
        const thenWith = this.getNodeValue(ctx.then());
        this.setNodeValue(ctx, new statement.WriteStatement(what, target, thenWith));
    }


    exitWith_resource_statement(ctx) {
        const stmt = this.getNodeValue(ctx.stmt);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new statement.WithResourceStatement(stmt, stmts));
    }


    exitAnyType(ctx) {
        this.setNodeValue(ctx, type.AnyType.instance);
    }


    exitAnyListType(ctx) {
        const typ = this.getNodeValue(ctx.any_type());
        this.setNodeValue(ctx, new type.ListType(typ));
    }


    exitAnyDictType(ctx) {
        const typ = this.getNodeValue(ctx.any_type());
        this.setNodeValue(ctx, new type.DictionaryType(typ));
    }


    exitCastExpression(ctx) {
        const left = this.getNodeValue(ctx.left);
        const type = this.getNodeValue(ctx.right);
        this.setNodeValue(ctx, new expression.CastExpression(left, type, ctx.MUTABLE() != null));
    }

    exitCatchAtomicStatement(ctx) {
        const name = this.getNodeValue(ctx.name);
        const stmts = this.getNodeValue(ctx.stmts);
        const symbol = new expression.SymbolExpression(name);
        symbol.copySectionFrom(name);
        this.setNodeValue(ctx, new statement.AtomicSwitchCase(symbol, stmts));
    }


    exitCatchCollectionStatement(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new statement.CollectionSwitchCase(exp, stmts));
    }


    exitCatch_statement_list(ctx) {
        const items = new statement.SwitchCaseList();
        ctx.catch_statement().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitTry_statement(ctx) {
        const name = this.getNodeValue(ctx.name);
        const stmts = this.getNodeValue(ctx.stmts);
        const handlers = this.getNodeValue(ctx.handlers);
        const anyStmts = this.getNodeValue(ctx.anyStmts);
        const finalStmts = this.getNodeValue(ctx.finalStmts);
        const stmt = new statement.SwitchErrorStatement(name, stmts, handlers, anyStmts, finalStmts);
        this.setNodeValue(ctx, stmt);
    }


    exitRaise_statement(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new statement.RaiseStatement(exp));
    }

    exitMatchingList(ctx) {
        const exp = this.getNodeValue(ctx.source);
        this.setNodeValue(ctx, new constraint.MatchingCollectionConstraint(exp));
    }

    exitMatchingRange(ctx) {
        const exp = this.getNodeValue(ctx.source);
        this.setNodeValue(ctx, new constraint.MatchingCollectionConstraint(exp));
    }

    exitMatchingExpression(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new constraint.MatchingExpressionConstraint(exp));
    }

    exitMatchingPattern(ctx) {
        this.setNodeValue(ctx, new constraint.MatchingPatternConstraint(new literal.TextLiteral(ctx.text.text)));
    }

    exitLiteralSetLiteral(ctx) {
        const items = this.getNodeValue(ctx.literal_list_literal());
        this.setNodeValue(ctx, new literal.SetLiteral(items));
    }

    exitCsharp_identifier(ctx) {
        this.setNodeValue(ctx, ctx.getText());
    }

    exitCSharpIdentifier(ctx) {
        const name = this.getNodeValue(ctx.name);
        this.setNodeValue(ctx, new csharp.CSharpIdentifierExpression(null, name));
    }

    exitCSharpChildIdentifier(ctx) {
        const parent = this.getNodeValue(ctx.parent);
        const name = this.getNodeValue(ctx.name);
        const child = new csharp.CSharpIdentifierExpression(parent, name);
        this.setNodeValue(ctx, child);
    }

    exitCSharpBooleanLiteral(ctx) {
        this.setNodeValue(ctx, new csharp.CSharpBooleanLiteral(ctx.getText()));
    }


    exitCSharpIntegerLiteral(ctx) {
        this.setNodeValue(ctx, new csharp.CSharpIntegerLiteral(ctx.getText()));
    }


    exitCSharpDecimalLiteral(ctx) {
        this.setNodeValue(ctx, new csharp.CSharpDecimalLiteral(ctx.getText()));
    }


    exitCSharpCharacterLiteral(ctx) {
        this.setNodeValue(ctx, new csharp.CSharpCharacterLiteral(ctx.getText()));
    }


    exitCSharpTextLiteral(ctx) {
        this.setNodeValue(ctx, new csharp.CSharpTextLiteral(ctx.getText()));
    }


    exitCSharpCategoryBinding(ctx) {
        const binding = this.getNodeValue(ctx.binding);
        this.setNodeValue(ctx, new csharp.CSharpNativeCategoryBinding(binding));
    }

    exitCsharp_primary_expression(ctx) {
        const value = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, value);
    }

    exitCsharp_this_expression(ctx) {
        this.setNodeValue(ctx, new csharp.CSharpThisExpression());
    }

    exitCsharp_method_expression(ctx) {
        const name = this.getNodeValue(ctx.name);
        const args = this.getNodeValue(ctx.args);
        this.setNodeValue(ctx, new csharp.CSharpMethodExpression(name, args));
    }

    exitCSharpMethodExpression(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitCSharpArgumentList(ctx) {
        const item = this.getNodeValue(ctx.item);
        this.setNodeValue(ctx, new csharp.CSharpExpressionList(item));
    }

    exitCSharpArgumentListItem(ctx) {
        const item = this.getNodeValue(ctx.item);
        const items = this.getNodeValue(ctx.items);
        items.add(item);
        this.setNodeValue(ctx, items);
    }

    exitCSharpNativeStatement(ctx) {
        const stmt = this.getNodeValue(ctx.csharp_statement());
        const call = new csharp.CSharpNativeCall(stmt);
        this.setNodeValue(ctx, call);
    }


    exitCSharpPromptoIdentifier(ctx) {
        const name = ctx.DOLLAR_IDENTIFIER().getText();
        this.setNodeValue(ctx, new csharp.CSharpIdentifierExpression(null, name));
    }


    exitCSharpPrimaryExpression(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitCSharpSelectorExpression(ctx) {
        const parent = this.getNodeValue(ctx.parent);
        const child = this.getNodeValue(ctx.child);
        child.parent = parent;
        this.setNodeValue(ctx, child);
    }

    exitCSharpStatement(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        const stmt = new csharp.CSharpStatement(exp, false);
        this.setNodeValue(ctx, stmt);
    }

    exitCSharpReturnStatement(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new csharp.CSharpStatement(exp, true));
    }


    exitPythonStatement(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new python.PythonStatement(exp, false));
    }

    exitPythonReturnStatement(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new python.PythonStatement(exp, true));
    }

    exitPython2CategoryBinding(ctx) {
        const map = this.getNodeValue(ctx.binding);
        this.setNodeValue(ctx, new python.Python2NativeCategoryBinding(map));
    }


    exitPython3CategoryBinding(ctx) {
        const map = this.getNodeValue(ctx.binding);
        this.setNodeValue(ctx, new python.Python3NativeCategoryBinding(map));
    }


    exitPython_category_binding(ctx) {
        const identifier = ctx.identifier().getText();
        const module = this.getNodeValue(ctx.python_module());
        const map = new python.PythonNativeCategoryBinding(identifier, module);
        this.setNodeValue(ctx, map);
    }

    exitPython_method_expression(ctx) {
        const name = this.getNodeValue(ctx.name);
        const args = this.getNodeValue(ctx.args);
        const method = new python.PythonMethodExpression(name, args);
        this.setNodeValue(ctx, method);
    }

    exitPythonGlobalMethodExpression(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitPythonMethodExpression(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitPython_module(ctx) {
        const ids = ctx.python_identifier().map(rule => rule.getText());
        const module = new python.PythonModule(ids);
        this.setNodeValue(ctx, module);
    }

    exitPython2NativeStatement(ctx) {
        const stmt = this.getNodeValue(ctx.python_native_statement());
        this.setNodeValue(ctx, new python.Python2NativeCall(stmt));
    }


    exitPython3NativeStatement(ctx) {
        const stmt = this.getNodeValue(ctx.python_native_statement());
        this.setNodeValue(ctx, new python.Python3NativeCall(stmt));
    }

    exitPython_native_statement(ctx) {
        const stmt = this.getNodeValue(ctx.python_statement());
        const module = this.getNodeValue(ctx.python_module());
        stmt.module = module || null;
        this.setNodeValue(ctx, new python.PythonNativeCall(stmt));
    }

    exitPython_identifier(ctx) {
        this.setNodeValue(ctx, ctx.getText());
    }

    exitPythonIdentifier(ctx) {
        const name = this.getNodeValue(ctx.name);
        this.setNodeValue(ctx, new python.PythonIdentifierExpression(null, name));
    }

    exitPythonIdentifierExpression(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitPythonChildIdentifier(ctx) {
        const parent = this.getNodeValue(ctx.parent);
        const name = this.getNodeValue(ctx.name);
        const child = new python.PythonIdentifierExpression(parent, name);
        this.setNodeValue(ctx, child);
    }


    exitPythonBooleanLiteral(ctx) {
        this.setNodeValue(ctx, new python.PythonBooleanLiteral(ctx.getText()));
    }

    exitPythonIntegerLiteral(ctx) {
        this.setNodeValue(ctx, new python.PythonIntegerLiteral(ctx.getText()));
    }


    exitPythonDecimalLiteral(ctx) {
        this.setNodeValue(ctx, new python.PythonDecimalLiteral(ctx.getText()));
    }

    exitPythonCharacterLiteral(ctx) {
        this.setNodeValue(ctx, new python.PythonCharacterLiteral(ctx.getText()));
    }


    exitPythonTextLiteral(ctx) {
        this.setNodeValue(ctx, new python.PythonTextLiteral(ctx.getText()));
    }

    exitPythonLiteralExpression(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitPythonPromptoIdentifier(ctx) {
        const name = ctx.DOLLAR_IDENTIFIER().getText();
        this.setNodeValue(ctx, new python.PythonIdentifierExpression(null, name));
    }


    exitPythonPrimaryExpression(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitPythonArgumentList(ctx) {
        const ordinal = this.getNodeValue(ctx.ordinal);
        const named = this.getNodeValue(ctx.named);
        ordinal.addAll(named);
        this.setNodeValue(ctx, ordinal);
    }


    exitPythonNamedOnlyArgumentList(ctx) {
        const named = this.getNodeValue(ctx.named);
        this.setNodeValue(ctx, named);
    }

    exitPythonNamedArgumentList(ctx) {
        const name = this.getNodeValue(ctx.name);
        const exp = this.getNodeValue(ctx.exp);
        const arg = new python.PythonNamedArgument(name, exp);
        this.setNodeValue(ctx, new python.PythonArgumentList(arg));
    }

    exitPythonNamedArgumentListItem(ctx) {
        const name = this.getNodeValue(ctx.name);
        const exp = this.getNodeValue(ctx.exp);
        const arg = new python.PythonNamedArgument(name, exp);
        const items = this.getNodeValue(ctx.items);
        items.add(arg);
        this.setNodeValue(ctx, items);
    }

    exitPythonOrdinalOnlyArgumentList(ctx) {
        const ordinal = this.getNodeValue(ctx.ordinal);
        this.setNodeValue(ctx, ordinal);
    }

    exitPythonOrdinalArgumentList(ctx) {
        const item = this.getNodeValue(ctx.item);
        const arg = new python.PythonOrdinalArgument(item);
        this.setNodeValue(ctx, new python.PythonArgumentList(arg));
    }


    exitPythonSelectorExpression(ctx) {
        const parent = this.getNodeValue(ctx.parent);
        const selector = this.getNodeValue(ctx.child);
        selector.parent = parent;
        this.setNodeValue(ctx, selector);
    }


    exitPythonSelfExpression(ctx) {
        this.setNodeValue(ctx, new python.PythonSelfExpression());
    }


    exitJsxChild(ctx) {
        this.setNodeValue(ctx, this.getNodeValue(ctx.jsx));
    }


    exitJsxCode(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new jsx.JsxCode(exp));
    }


    exitJsxExpression(ctx) {
        this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
    }


    exitJsxElement(ctx) {
        const elem = this.getNodeValue(ctx.opening);
        const closing = this.getNodeValue(ctx.closing);
        elem.setClosing(closing);
        const children = this.getNodeValue(ctx.children_);
        elem.setChildren(children);
        this.setNodeValue(ctx, elem);
    }


    exitJsxSelfClosing(ctx) {
        this.setNodeValue(ctx, this.getNodeValue(ctx.jsx));
    }


    exitJsxText(ctx) {
        const text = parser.getFullText(ctx.text);
        this.setNodeValue(ctx, new jsx.JsxText(text));
    }


    exitJsxValue(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new jsx.JsxExpression(exp));
    }


    exitJsx_attribute(ctx) {
        const name = this.getNodeValue(ctx.name);
        const value = this.getNodeValue(ctx.value);
        const suite = this.getWhiteSpacePlus(ctx.ws_plus());
        this.setNodeValue(ctx, new jsx.JsxProperty(name, value, suite));
    }


    exitJsx_children(ctx) {
        const list = ctx.jsx_child()
            .map(cx => this.getNodeValue(cx), this);
        this.setNodeValue(ctx, list);
    }


    exitJsx_element_name(ctx) {
        const name = ctx.getText();
        this.setNodeValue(ctx, new grammar.Identifier(name));
    }


    exitJsx_expression(ctx) {
        this.setNodeValue(ctx, this.getNodeValue(ctx.getChild(0)));
    }


    exitJsx_identifier(ctx) {
        const name = ctx.getText();
        this.setNodeValue(ctx, new grammar.Identifier(name));
    }


    exitJsx_fragment(ctx) {
        const openingSuite = this.getWhiteSpacePlus(ctx.ws_plus(0));
        const fragment = new jsx.JsxFragment(openingSuite);
        fragment.children = this.getNodeValue(ctx.children_);
        this.setNodeValue(ctx, fragment);
    }


    exitJsxLiteral(ctx) {
        const text = ctx.getText();
        this.setNodeValue(ctx, new jsx.JsxLiteral(text));
    }


    exitJsx_opening(ctx) {
        const name = this.getNodeValue(ctx.name);
        const nameSuite = this.getWhiteSpacePlus(ctx.ws_plus());
        const attributes = ctx.jsx_attribute()
            .map(function (cx) {
                return this.getNodeValue(cx);
            }, this);
        this.setNodeValue(ctx, new jsx.JsxElement(name, nameSuite, attributes, null));
    }


    exitJsx_closing(ctx) {
        const name = this.getNodeValue(ctx.name);
        this.setNodeValue(ctx, new jsx.JsxClosing(name, null));
    }


    exitJsx_self_closing(ctx) {
        const name = this.getNodeValue(ctx.name);
        const nameSuite = this.getWhiteSpacePlus(ctx.ws_plus());
        const attributes = ctx.jsx_attribute()
            .map(function (cx) {
                return this.getNodeValue(cx);
            }, this);
        this.setNodeValue(ctx, new jsx.JsxSelfClosing(name, nameSuite, attributes, null));
    }


    exitCssExpression(ctx) {
        this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
    }


    exitCss_expression(ctx) {
        const exp = new css.CssExpression();
        ctx.css_field().forEach(function (cx) {
            const field = this.getNodeValue(cx);
            exp.addField(field);
        }, this);
        this.setNodeValue(ctx, exp);
    }


    exitCss_field(ctx) {
        const name = ctx.name.getText();
        const value = this.getNodeValue(ctx.value);
        this.setNodeValue(ctx, new css.CssField(name, value));
    }


    exitCssText(ctx) {
        const text = this.input.getText({start: ctx.text.start, stop: ctx.text.stop});
        this.setNodeValue(ctx, new css.CssText(text));
    }


    exitCssValue(ctx) {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new css.CssCode(exp));
    }


    buildSection(node, section) {
        if(!section.dialect) {
            const first = this.findFirstValidToken(node.start.tokenIndex, section instanceof jsx.JsxText);
            const last = this.findLastValidToken(node.stop.tokenIndex, section instanceof jsx.JsxText);
            section.setSectionFrom(this.path, first, last, parser.Dialect.M);
        }
    }

    findFirstValidToken(idx, allowWS) {
        if (idx === -1) { // happens because input.index() is called before any other read operation (bug?)
            idx = 0;
        }
        do {
            const token = this.readValidToken(idx++, allowWS);
            if (token !== null) {
                return token;
            }
        } while (idx < this.input.tokenSource.size);
        return null;
    }

    findLastValidToken(idx, allowWS) {
        if (idx === -1) { // happens because input.index() is called before any other read operation (bug?)
            idx = 0;
        }
        while (idx >= 0) {
            const token = this.readValidToken(idx--, allowWS);
            if (token !== null) {
                return token;
            }
        }
        return null;
    }

    readValidToken(idx, allowWS) {
        const token = this.input.get(idx);
        const text = token.text;
        // ignore trailing whitespace
        if (text !== null && (allowWS || text.replace(/(\n|\r|\t|' ')/g, "").length > 0)) {
            return token;
        } else {
            return null;
        }
    }

}
