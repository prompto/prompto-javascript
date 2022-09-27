import antlr4, { Token, TokenStream } from 'antlr4';
import EParserListener from './EParserListener';
import ECleverParser from './ECleverParser';
import ELexer from './ELexer';
import * as contexts from './EParser';
import * as parser from '../parser';
import * as constraint from '../constraint';
import * as instance from '../instance';
import * as declaration from '../declaration';
import * as expression from '../expression';
import * as javascript from '../javascript';
import * as statement from '../statement';
import * as literal from '../literal';
import * as grammar from '../grammar';
import * as param from '../param';
import * as type from '../type';
import * as jsx from '../jsx';
import * as css from '../css';
import * as java from '../java';
import * as csharp from '../csharp';
import * as python from '../python';

interface IndexedNode {
    __id?: number;
}

export default class EPromptoBuilder extends EParserListener {

    input: TokenStream;
    path: string;
    nodeValues: Map<number, object>;
    nextNodeId: number;

    constructor(parser: ECleverParser) {
        super();
        this.input = parser.getTokenStream();
        this.path = parser.path;
        this.nodeValues = new Map<number, object>();
        this.nextNodeId = 0;
    }

    setNodeValue(node: antlr4.context.ParserRuleContext, value: object | null) {
        if(value == null)
            return;
        const indexedNode = node as IndexedNode;
        let id = indexedNode.__id
        if (id === undefined) {
            id = this.nextNodeId++;
            indexedNode.__id = id;
        }
        this.nodeValues.set(id, value);
        if (value instanceof parser.Section) {
            this.buildSection(node, value);
        }
    }

    getNodeValue<T>(node: antlr4.context.ParserRuleContext): T | null {
        const indexedNode = node as IndexedNode;
        const id = indexedNode == null ? undefined : indexedNode.__id;
        if (id === undefined)
            return null;
        else
            return this.nodeValues.get(id) as T || null;
    }


    getHiddenTokensBefore(token: Token): string | null {
        const hidden = this.input.getHiddenTokensToLeft(token.tokenIndex);
        return this.getHiddenTokensText(hidden);
    }

    getHiddenTokensAfter(token: Token): string | null {
        if (token.tokenIndex < 0)
            return null;
        const hidden = this.input.getHiddenTokensToRight(token.tokenIndex);
        return this.getHiddenTokensText(hidden);
    }


    getHiddenTokensText(hidden: Token[]): string | null {
        if (hidden == null || hidden.length === 0)
            return null;
        else
            return hidden.map(token => token.text).join("");
    }

    getWhiteSpacePlus(ctx: contexts.antlr4.context.ParserRuleContext): string | null {
        let within: string | null = null;
        if(ctx.children != null) {
            within = ctx.children
                .filter(child => this.isNotIndent(child), this)
                .map(child => child.getText(), this)
                .join("");
        }
        if (within == null || within.length === 0)
            return null;
        const before = this.getHiddenTokensBefore(ctx.start);
        if (before != null)
            within = before + within;
        if(ctx.stop != null ) {
            const after = this.getHiddenTokensAfter(ctx.stop);
            if (after != null)
                within = within + after;
        }
        return within;
    }

    isNotIndent(tree: antlr4.tree.ParseTree): boolean {
        if(tree instanceof antlr4.tree.TerminalNode)
            return tree.symbol.type != parser.EParser.INDENT;
        else
            return false;
    }

    readAnnotations(ctxs: antlr4.context.ParserRuleContext[]): grammar.Annotation[] | null {
        const annotations = ctxs.map(csc=> this.getNodeValue(csc), this);
        return (annotations.length == 0) ? null : annotations;
    }

    readComments(ctxs: antlr4.context.ParserRuleContext[]): statement.CommentStatement[] | null {
        const comments = ctxs.map(csc => this.getNodeValue(csc), this);
        return (comments.length === 0) ? null : comments;
    }
    
    exitIdentifierExpression = (ctx: contexts.contexts.IdentifierExpressionContext) => {
        const exp = this.getNodeValue(ctx._exp);
        this.setNodeValue(ctx, new expression.UnresolvedIdentifier(exp));
    };

    exitTypeIdentifier = (ctx: contexts.TypeIdentifierContext) => {
        const name = this.getNodeValue<grammar.Identifier>(ctx.type_identifier());
        this.setNodeValue(ctx, name);
    };

    exitMethodCallExpression = (ctx: contexts.MethodCallExpressionContext) => {
        const exp = this.getNodeValue<expression.BaseExpression>(ctx._exp1 || ctx._exp2);
        const args = this.getNodeValue<grammar.ArgumentList>(ctx._args);
        const call = new statement.UnresolvedCall(exp, args);
        this.setNodeValue(ctx, call);
    }
    
    exitUnresolvedExpression = (ctx: contexts.UnresolvedExpressionContext) => {
        const exp = this.getNodeValue<expression.BaseExpression>(ctx._exp);
        this.setNodeValue(ctx, exp);
    }

    exitUnresolvedIdentifier = (ctx: contexts.UnresolvedIdentifierContext) => {
        const name = this.getNodeValue(ctx._name);
        this.setNodeValue(ctx, new expression.UnresolvedIdentifier(name));
    }

    exitUnresolvedSelector = (ctx: contexts.UnresolvedSelectorContext) => {
        const parent = this.getNodeValue<expression.BaseExpression>(ctx._parent);
        const selector = this.getNodeValue<expression.SelectorExpression>(ctx._selector);
        selector.parent = parent;
        this.setNodeValue(ctx, selector);
    }


    exitUnresolved_selector = (ctx: contexts.Unresolved_selectorContext) => {
        const name = this.getNodeValue<grammar.Identifier>(ctx._name);
        this.setNodeValue(ctx, new expression.MemberSelector(null, name));
    }


    exitUUIDLiteral = (ctx: contexts.UUIDLiteralContext) => {
        this.setNodeValue(ctx, new literal.UUIDLiteral(ctx.getText()));
    }


    exitUUIDType = (ctx: contexts.UUIDTypeContext) => {
        this.setNodeValue(ctx, type.UUIDType.instance);
    }


    exitCommentStatement = (ctx: contexts.CommentStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.comment_statement()));
    }


    exitComment_statement = (ctx: contexts.Comment_statementContext) => {
        this.setNodeValue(ctx, new statement.CommentStatement(ctx.getText()));
    }


    exitBlob_expression = (ctx: contexts.Blob_expressionContext) => {
        const exp = this.getNodeValue(ctx.expression());
        this.setNodeValue(ctx, new expression.BlobExpression(exp));
    }


    exitBlobExpression = (ctx: contexts.BlobExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitBooleanLiteral = (ctx: contexts.BooleanLiteralContext) => {
        this.setNodeValue(ctx, new literal.BooleanLiteral(ctx.getText()));
    }


    exitBreakStatement = (ctx: contexts.BreakStatementContext) => {
        this.setNodeValue(ctx, new statement.BreakStatement());
    }


    exitMinIntegerLiteral = (ctx: contexts.MinIntegerLiteralContext) => {
        this.setNodeValue(ctx, new literal.MinIntegerLiteral());
    }


    exitMaxIntegerLiteral = (ctx: contexts.MaxIntegerLiteralContext) => {
        this.setNodeValue(ctx, new literal.MaxIntegerLiteral());
    }


    exitIntegerLiteral = (ctx: contexts.IntegerLiteralContext) => {
        this.setNodeValue(ctx, new literal.IntegerLiteral(ctx.getText()));
    }


    exitDecimalLiteral = (ctx: contexts.DecimalLiteralContext) => {
        this.setNodeValue(ctx, new literal.DecimalLiteral(ctx.getText()));
    }

    exitHexadecimalLiteral = (ctx: contexts.HexadecimalLiteralContext) => {
        this.setNodeValue(ctx, new literal.HexaLiteral(ctx.getText()));
    }

    exitCharacterLiteral = (ctx: contexts.CharacterLiteralContext) => {
        this.setNodeValue(ctx, new literal.CharacterLiteral(ctx.getText()));
    }

    exitDateLiteral = (ctx: contexts.DateLiteralContext) => {
        this.setNodeValue(ctx, new literal.DateLiteral(ctx.getText()));
    }

    exitDateTimeLiteral = (ctx: contexts.DateTimeLiteralContext) => {
        this.setNodeValue(ctx, new literal.DateTimeLiteral(ctx.getText()));
    }

    exitDbIdType = (ctx: contexts.DbIdTypeContext) => {
        this.setNodeValue(ctx, type.DbIdType.instance);
    }

    exitTernaryExpression = (ctx: contexts.TernaryExpressionContext) => {
        const condition = this.getNodeValue(ctx.test);
        const ifTrue = this.getNodeValue(ctx.ifTrue);
        const ifFalse = this.getNodeValue(ctx.ifFalse);
        const exp = new expression.TernaryExpression(condition, ifTrue, ifFalse);
        this.setNodeValue(ctx, exp);
    }

    exitTest_method_declaration = (ctx: contexts.Test_method_declarationContext) => {
        const name = new grammar.Identifier(ctx.name.text);
        name.setSectionFrom(this.path, ctx.name, ctx.name, parser.Dialect.E);
        const stmts = this.getNodeValue(ctx.stmts);
        const exps = this.getNodeValue(ctx.exps);
        const errorName = this.getNodeValue(ctx.error);
        const error = errorName == null ? null : new expression.SymbolExpression(errorName);
        this.setNodeValue(ctx, new declaration.TestMethodDeclaration(name, stmts, exps, error));
    }

    exitTextLiteral = (ctx: contexts.TextLiteralContext) => {
        this.setNodeValue(ctx, new literal.TextLiteral(ctx.getText()));
    }

    exitTimeLiteral = (ctx: contexts.TimeLiteralContext) => {
        this.setNodeValue(ctx, new literal.TimeLiteral(ctx.getText()));
    }


    exitPeriodLiteral = (ctx: contexts.PeriodLiteralContext) => {
        this.setNodeValue(ctx, new literal.PeriodLiteral(ctx.getText()));
    }


    exitPeriodType = (ctx: contexts.PeriodTypeContext) => {
        this.setNodeValue(ctx, type.PeriodType.instance);
    }


    exitVersionLiteral = (ctx: contexts.VersionLiteralContext) => {
        this.setNodeValue(ctx, new literal.VersionLiteral(ctx.getText()));
    }


    exitVersionType = (ctx: contexts.VersionTypeContext) => {
        this.setNodeValue(ctx, type.VersionType.instance);
    }


    exitAttribute_identifier = (ctx: contexts.Attribute_identifierContext) => {
        const name = new grammar.Identifier(ctx.getText());
        this.setNodeValue(ctx, name);
    }

    exitVariable_identifier = (ctx: contexts.Variable_identifierContext) => {
        const name = new grammar.Identifier(ctx.getText());
        this.setNodeValue(ctx, name);
    }

    exitList_literal = (ctx: contexts.List_literalContext) => {
        const mutable = ctx.MUTABLE() !== null;
        const items = this.getNodeValue(ctx.expression_list()) || null;
        const value = new literal.ListLiteral(mutable, items);
        this.setNodeValue(ctx, value);
    }

    exitDict_literal = (ctx: contexts.Dict_literalContext) => {
        const mutable = ctx.MUTABLE() !== null;
        const items = this.getNodeValue(ctx.dict_entry_list()) || null;
        const value = new literal.DictLiteral(mutable, items);
        this.setNodeValue(ctx, value);
    }

    exitTuple_literal = (ctx: contexts.Tuple_literalContext) => {
        const mutable = ctx.MUTABLE() !== null;
        const items = this.getNodeValue(ctx.expression_tuple()) || null;
        const value = new literal.TupleLiteral(mutable, items);
        this.setNodeValue(ctx, value);
    }


    exitRange_literal = (ctx: contexts.Range_literalContext) => {
        const low = this.getNodeValue(ctx.low);
        const high = this.getNodeValue(ctx.high);
        this.setNodeValue(ctx, new literal.RangeLiteral(low, high));
    }


    exitDict_entry_list = (ctx: contexts.Dict_entry_listContext) => {
        const items = new literal.DictEntryList(null, null);
        ctx.dict_entry().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitDict_entry = (ctx: contexts.Dict_entryContext) => {
        const key = this.getNodeValue(ctx.key);
        const value = this.getNodeValue(ctx.value);
        const entry = new literal.DictEntry(key, value);
        this.setNodeValue(ctx, entry);
    }


    exitDoc_entry_list = (ctx: contexts.Doc_entry_listContext) => {
        const items = new literal.DocEntryList(null, null);
        ctx.doc_entry().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitDoc_entry = (ctx: contexts.Doc_entryContext) => {
        const key = this.getNodeValue(ctx.key);
        const value = this.getNodeValue(ctx.value);
        const entry = new literal.DocEntry(key, value);
        this.setNodeValue(ctx, entry);
    }


    exitDocKeyIdentifier = (ctx: contexts.DocKeyIdentifierContext) => {
        const text = ctx.name.getText();
        this.setNodeValue(ctx, new literal.IDocIdentifierKey(new grammar.Identifier(text)));
    }


    exitDocKeyText = (ctx: contexts.DocKeyTextContext) => {
        const text = ctx._name.text;
        this.setNodeValue(ctx, new literal.DocTextKey(text));
    }


    exitLiteral_expression = (ctx: contexts.Literal_expressionContext) => {
        const exp = this.getNodeValue<expression.BaseExpression>(ctx.getChild(0) as antlr4.context.ParserRuleContext);
        this.setNodeValue(ctx, exp);
    }


    exitLiteralExpression = (ctx: contexts.LiteralExpressionContext) => {
        const exp = this.getNodeValue<expression.BaseExpression>(ctx._exp);
        this.setNodeValue(ctx, exp);
    }


    exitVariableIdentifier = (ctx: contexts.VariableIdentifierContext) => {
        const name = this.getNodeValue<grammar.Identifier>(ctx.variable_identifier());
        this.setNodeValue(ctx, name);
    }


    exitSymbol_identifier = (ctx: contexts.Symbol_identifierContext) => {
        const name = new grammar.Identifier(ctx.getText());
        this.setNodeValue(ctx, name);
    }


    exitNative_symbol = (ctx: contexts.Native_symbolContext) => {
        const name = this.getNodeValue(ctx._name);
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new expression.NativeSymbol(name, exp));
    }


    exitSymbolIdentifier = (ctx: contexts.SymbolIdentifierContext) => {
        const name = this.getNodeValue(ctx.symbol_identifier());
        this.setNodeValue(ctx, name);
    }


    exitSymbolLiteral = (ctx: contexts.SymbolLiteralContext) => {
        const name = ctx.getText();
        this.setNodeValue(ctx, new expression.SymbolExpression(new grammar.Identifier(name)));
    }


    exitBlobType = (ctx: contexts.BlobTypeContext) => {
        this.setNodeValue(ctx, type.BlobType.instance);
    }

    exitBooleanType = (ctx: contexts.BooleanTypeContext) => {
        this.setNodeValue(ctx, type.BooleanType.instance);
    }


    exitCharacterType = (ctx: contexts.CharacterTypeContext) => {
        this.setNodeValue(ctx, type.CharacterType.instance);
    }

    exitImageType = (ctx: contexts.ImageTypeContext) => {
        this.setNodeValue(ctx, type.ImageType.instance);
    }


    exitTextType = (ctx: contexts.TextTypeContext) => {
        this.setNodeValue(ctx, type.TextType.instance);
    }


    exitHtmlType = (ctx: contexts.HtmlTypeContext) => {
        this.setNodeValue(ctx, type.HtmlType.instance);
    }


    exitThisExpression = (ctx: contexts.ThisExpressionContext) => {
        this.setNodeValue(ctx, new expression.ThisExpression());
    }

    exitIntegerType = (ctx: contexts.IntegerTypeContext) => {
        this.setNodeValue(ctx, type.IntegerType.instance);
    }

    exitDecimalType = (ctx: contexts.DecimalTypeContext) => {
        this.setNodeValue(ctx, type.DecimalType.instance);
    }


    exitDateType = (ctx: contexts.DateTypeContext) => {
        this.setNodeValue(ctx, type.DateType.instance);
    }


    exitDateTimeType = (ctx: contexts.DateTimeTypeContext) => {
        this.setNodeValue(ctx, type.DateTimeType.instance);
    }


    exitTimeType = (ctx: contexts.TimeTypeContext) => {
        this.setNodeValue(ctx, type.TimeType.instance);
    }


    exitCodeType = (ctx: contexts.CodeTypeContext) => {
        this.setNodeValue(ctx, type.CodeType.instance);
    }


    exitPrimaryType = (ctx: contexts.PrimaryTypeContext) => {
        const type = this.getNodeValue<type.IType>(ctx._p);
        this.setNodeValue(ctx, type);
    }

    exitAttribute_declaration = (ctx: contexts.Attribute_declarationContext) => {
        const id = this.getNodeValue(ctx._name);
        const type = this.getNodeValue(ctx._typ);
        const match = this.getNodeValue(ctx._match);
        let indices: grammar.IdentifierList | null = null;
        if (ctx._indices != null)
            indices = indices = this.getNodeValue(ctx._indices);
        else if (ctx.INDEX() != null)
            indices = new grammar.IdentifierList();
        if (ctx._index != null)
            indices!.push(this.getNodeValue(ctx._index));
        const decl = new declaration.AttributeDeclaration(id, type, match, indices);
        decl.storable = ctx.STORABLE() != null;
        this.setNodeValue(ctx, decl);
    }

    exitNativeType = (ctx: contexts.NativeTypeContext) => {
        const type = this.getNodeValue<type.IType>(ctx._n);
        this.setNodeValue(ctx, type);
    }

    exitCategoryType = (ctx: contexts.CategoryTypeContext) => {
        const type = this.getNodeValue<type.IType>(ctx._c);
        this.setNodeValue(ctx, type);
    }


    exitCategory_type = (ctx: contexts.Category_typeContext) => {
        const name = new grammar.Identifier(ctx.getText());
        this.buildSection(ctx, name);
        this.setNodeValue(ctx, new type.CategoryType(name));
    }

    exitListType = (ctx: contexts.ListTypeContext) => {
        const typ = this.getNodeValue<type.IType>(ctx._l);
        this.setNodeValue(ctx, new type.ListType(typ));
    }

    exitDictKeyIdentifier = (ctx: contexts.DictKeyIdentifierContext) => {
        const text = ctx._name.getText();
        this.setNodeValue(ctx, new literal.DictIdentifierKey(new grammar.Identifier(text)));
    }

    exitDictKeyText = (ctx: contexts.DictKeyTextContext) => {
        const text = ctx._name.text;
        this.setNodeValue(ctx, new literal.DictTextKey(text));
    }

    exitDictType = (ctx: contexts.DictTypeContext) => {
        const typ = this.getNodeValue<type.IType>(ctx._d);
        this.setNodeValue(ctx, new type.DictionaryType(typ));
    }

    exitAttributeList = (ctx: contexts.AttributeListContext) => {
        const item = this.getNodeValue(ctx._item);
        this.setNodeValue(ctx, new grammar.IdentifierList(item));
    }
    
    exitAttributeListItem = (ctx: contexts.AttributeListItemContext) => {
        const items = this.getNodeValue<grammar.IdentifierList>(ctx._items);
        const item = this.getNodeValue(ctx._item);
        items.add(item);
        this.setNodeValue(ctx, items);
    }
    
    exitAttribute_identifier_list = (ctx: contexts.Attribute_identifier_listContext) => {
        const list = new grammar.IdentifierList();
        const rules = ctx.attribute_identifier_list();
        rules.map(rule => this.getNodeValue(rule), this)
            .forEach(item => list.add(item));
        this.setNodeValue(ctx, list);
    }
    
    exitVariable_identifier_list = (ctx: contexts.Variable_identifier_listContext) => {
        const list = new grammar.IdentifierList();
        const rules = ctx.variable_identifier_list();
        rules.map(rule => this.getNodeValue(rule), this)
            .forEach(item => list.add(item));
        this.setNodeValue(ctx, list);
    }
    
    exitConcrete_category_declaration = (ctx: contexts.Concrete_category_declarationContext) => {
        const name = this.getNodeValue(ctx._name);
        const attrs = this.getNodeValue(ctx._attrs) || null;
        const derived = this.getNodeValue(ctx._derived) || null;
        const methods = this.getNodeValue(ctx._methods) || null;
        const decl = new declaration.ConcreteCategoryDeclaration(name, attrs, derived, methods);
        decl.storable = ctx.STORABLE() != null;
        this.setNodeValue(ctx, decl);
    }


    exitConcrete_widget_declaration = (ctx: contexts.Concrete_widget_declarationContext) => {
        const name = this.getNodeValue(ctx._name);
        const derived = this.getNodeValue(ctx._derived);
        const methods = this.getNodeValue(ctx._methods);
        const decl = new declaration.ConcreteWidgetDeclaration(name, derived, methods);
        this.setNodeValue(ctx, decl);
    }


    exitConcreteCategoryDeclaration = (ctx: contexts.ConcreteCategoryDeclarationContext) => {
        const decl = this.getNodeValue<declaration.IDeclaration>(ctx._decl);
        this.setNodeValue(ctx, decl);
    }


    exitConcreteWidgetDeclaration = (ctx: contexts.ConcreteWidgetDeclarationContext) => {
        const decl = this.getNodeValue<declaration.IDeclaration>(ctx._decl);
        this.setNodeValue(ctx, decl);
    }


    exitNativeWidgetDeclaration = (ctx: contexts.NativeWidgetDeclarationContext) => {
        const decl = this.getNodeValue<declaration.IDeclaration>(ctx._decl);
        this.setNodeValue(ctx, decl);
    }


    exitDerivedList = (ctx: contexts.DerivedListContext) => {
        const items = this.getNodeValue<grammar.IdentifierList>(ctx._items);
        this.setNodeValue(ctx, items);
    }


    exitDerivedListItem = (ctx: contexts.DerivedListItemContext) => {
        const items = this.getNodeValue<grammar.IdentifierList>(ctx._items);
        const item = this.getNodeValue(ctx._item);
        items.add(item);
        this.setNodeValue(ctx, items);
    }


    exitType_identifier = (ctx: contexts.Type_identifierContext) => {
        const name = new grammar.Identifier(ctx.getText());
        this.setNodeValue(ctx, name);
    }


    exitType_identifier_list = (ctx: contexts.Type_identifier_listContext) => {
        const items = new grammar.IdentifierList();
        ctx.type_identifier().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitType_literal = (ctx: contexts.Type_literalContext) => {
        const typ = this.getNodeValue(ctx.category_or_any_type());
        this.setNodeValue(ctx, new literal.TypeLiteral(typ));
    }


    exitTypeLiteral = (ctx: contexts.TypeLiteralContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.type_literal()));
    }


    exitTypeType = (ctx: contexts.TypeTypeContext) => {
        const typ = this.getNodeValue(ctx.t);
        this.setNodeValue(ctx, new type.TypeType(typ));
    }

    exitInstanceExpression = (ctx: contexts.InstanceExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitSelectableExpression = (ctx: contexts.SelectableExpressionContext) => {
        const parent = this.getNodeValue(ctx.parent);
        this.setNodeValue(ctx, parent);
    }


    exitSelectorExpression = (ctx: contexts.SelectorExpressionContext) => {
        const selector = this.getNodeValue(ctx.selector);
        if (selector) {
            selector.parent = this.getNodeValue(ctx.parent);
            this.setNodeValue(ctx, selector);
        }
    }

    exitSet_literal = (ctx: contexts.Set_literalContext) => {
        const items = this.getNodeValue(ctx.expression_list());
        const set_ = new literal.SetLiteral(items);
        this.setNodeValue(ctx, set_);
    }


    exitStoreStatement = (ctx: contexts.StoreStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.stmt));
    }

    exitStore_statement = (ctx: contexts.Store_statementContext) => {
        const del = this.getNodeValue(ctx.to_del);
        const add = this.getNodeValue(ctx.to_add);
        const meta = this.getNodeValue(ctx.with_meta);
        const stmts = this.getNodeValue(ctx.stmts);
        const stmt = new statement.DeleteAndStoreStatement(del, add, meta, stmts);
        this.setNodeValue(ctx, stmt);
    }


    exitMember_identifier = (ctx: contexts.Member_identifierContext) => {
        const name = new grammar.Identifier(ctx.getText());
        this.setNodeValue(ctx, name);
    }


    exitMemberSelector = (ctx: contexts.MemberSelectorContext) => {
        const name = this.getNodeValue(ctx._name);
        this.setNodeValue(ctx, new expression.UnresolvedSelector(null, name));
    }


    exitItemSelector = (ctx: contexts.ItemSelectorContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new expression.ItemSelector(null, exp));
    }


    exitSliceSelector = (ctx: contexts.SliceSelectorContext) => {
        const slice = this.getNodeValue(ctx.xslice);
        this.setNodeValue(ctx, slice);
    }


    exitTyped_argument = (ctx: contexts.Typed_argumentContext) => {
        const typ = this.getNodeValue(ctx.typ);
        const name = this.getNodeValue(ctx._name);
        const attrs = this.getNodeValue(ctx.attrs);
        const arg = attrs ?
            new param.ExtendedParameter(typ, name, attrs) :
            new param.CategoryParameter(typ, name);
        const exp = this.getNodeValue(ctx.value);
        arg.defaultExpression = exp || null;
        this.setNodeValue(ctx, arg);
    }


    exitCodeArgument = (ctx: contexts.CodeArgumentContext) => {
        const arg = this.getNodeValue(ctx.arg);
        this.setNodeValue(ctx, arg);
    }


    exitArgument_list = (ctx: contexts.Argument_listContext) => {
        const items = new param.ParameterList();
        ctx.argument().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitFlush_statement = (ctx: contexts.Flush_statementContext) => {
        this.setNodeValue(ctx, new statement.FlushStatement());
    }


    exitFlushStatement = (ctx: contexts.FlushStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.stmt));
    }


    exitFull_argument_list = (ctx: contexts.Full_argument_listContext) => {
        const items = this.getNodeValue(ctx.items);
        const item = this.getNodeValue(ctx.item) || null;
        if (item !== null) {
            items.add(item);
        }
        this.setNodeValue(ctx, items);
    }

    exitArgument_assignment = (ctx: contexts.Argument_assignmentContext) => {
        const name = this.getNodeValue(ctx._name);
        const exp = this.getNodeValue(ctx.exp);
        const arg = new param.UnresolvedParameter(name);
        this.setNodeValue(ctx, new grammar.Argument(arg, exp));
    }


    exitArgumentAssignmentListExpression = (ctx: contexts.ArgumentAssignmentListExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        let items = this.getNodeValue(ctx.items) || null;
        if (items === null) {
            items = new grammar.ArgumentList();
        }
        let item = new grammar.Argument(null, exp);
        if(exp instanceof parser.Section)
            item.copySectionFrom(exp);
        items.insert(0, item);
        item = this.getNodeValue(ctx.item) || null;
        if (item !== null) {
            items.add(item);
        } else {
            items.checkLastAnd();
        }
        this.setNodeValue(ctx, items);
    }


    exitArgumentAssignmentListNoExpression = (ctx: contexts.ArgumentAssignmentListNoExpressionContext) => {
        const items = this.getNodeValue(ctx.items);
        const item = this.getNodeValue(ctx.item) || null;
        if (item !== null) {
            items.add(item);
        } else {
            items.checkLastAnd();
        }
        this.setNodeValue(ctx, items);
    }


    exitArgumentAssignmentList = (ctx: contexts.ArgumentAssignmentListContext) => {
        const item = this.getNodeValue(ctx.item);
        const items = new grammar.ArgumentList([item]);
        this.setNodeValue(ctx, items);
    }


    exitArgumentAssignmentListItem = (ctx: contexts.ArgumentAssignmentListItemContext) => {
        const item = this.getNodeValue(ctx.item);
        const items = this.getNodeValue(ctx.items);
        items.add(item);
        this.setNodeValue(ctx, items);
    }


    exitArrow_prefix = (ctx: contexts.Arrow_prefixContext) => {
        const args = this.getNodeValue(ctx.arrow_args());
        let argsSuite = this.getWhiteSpacePlus(ctx.s1);
        if (argsSuite == null) // happens when only WS
            argsSuite = this.getHiddenTokensBefore(ctx.EGT().getSymbol());
        let arrowSuite = this.getWhiteSpacePlus(ctx.s2);
        if (arrowSuite == null) // happens when only WS
            arrowSuite = this.getHiddenTokensAfter(ctx.EGT().getSymbol());
        this.setNodeValue(ctx, new expression.ArrowExpression(args, argsSuite, arrowSuite));
    }


    exitArrowExpression = (ctx: contexts.ArrowExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
    }


    exitArrowExpressionBody = (ctx: contexts.ArrowExpressionBodyContext) => {
        const arrow = this.getNodeValue(ctx.arrow_prefix());
        const exp = this.getNodeValue(ctx.expression());
        arrow.setExpression(exp);
        this.setNodeValue(ctx, arrow);
    }


    exitArrowListArg = (ctx: contexts.ArrowListArgContext) => {
        const list = this.getNodeValue(ctx.variable_identifier_list());
        this.setNodeValue(ctx, list);
    }


    exitArrowSingleArg = (ctx: contexts.ArrowSingleArgContext) => {
        const arg = this.getNodeValue(ctx.variable_identifier());
        this.setNodeValue(ctx, new grammar.IdentifierList(arg));
    }


    exitArrowStatementsBody = (ctx: contexts.ArrowStatementsBodyContext) => {
        const arrow = this.getNodeValue(ctx.arrow_prefix());
        const stmts = this.getNodeValue(ctx.statement_list());
        arrow.setStatements(stmts);
        this.setNodeValue(ctx, arrow);
    }


    exitUnresolvedWithArgsStatement = (ctx: contexts.UnresolvedWithArgsStatementContext) => {
        const exp = ctx.exp1 ? this.getNodeValue(ctx.exp1) : this.getNodeValue(ctx.exp2);
        const args = this.getNodeValue(ctx.args);
        const name = this.getNodeValue(ctx._name);
        const stmts = this.getNodeValue(ctx.stmts);
        if (name != null || stmts != null)
            this.setNodeValue(ctx, new statement.RemoteCall(exp, args, name, stmts));
        else
            this.setNodeValue(ctx, new statement.UnresolvedCall(exp, args));
    }


    exitAddExpression = (ctx: contexts.AddExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        const exp = ctx.op.type === parser.EParser.PLUS ? new expression.PlusExpression(left, right) : new expression.SubtractExpression(left, right);
        this.setNodeValue(ctx, exp);
    }

    exitMember_method_declaration_list = (ctx: contexts.Member_method_declaration_listContext) => {
        const items = new grammar.MethodDeclarationList();
        ctx.member_method_declaration().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }

    exitNative_member_method_declaration_list = (ctx: contexts.Native_member_method_declaration_listContext) => {
        const items = new grammar.MethodDeclarationList();
        ctx.native_member_method_declaration().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }

    exitGetter_method_declaration = (ctx: contexts.Getter_method_declarationContext) => {
        const name = this.getNodeValue(ctx._name);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new declaration.GetterMethodDeclaration(name, stmts));
    }


    exitNative_setter_declaration = (ctx: contexts.Native_setter_declarationContext) => {
        const name = this.getNodeValue(ctx._name);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new declaration.NativeSetterMethodDeclaration(name, stmts));
    }


    exitNative_getter_declaration = (ctx: contexts.Native_getter_declarationContext) => {
        const name = this.getNodeValue(ctx._name);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new declaration.NativeGetterMethodDeclaration(name, stmts));
    }

    exitSetter_method_declaration = (ctx: contexts.Setter_method_declarationContext) => {
        const name = this.getNodeValue(ctx._name);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new declaration.SetterMethodDeclaration(name, stmts));
    }


    exitSetType = (ctx: contexts.SetTypeContext) => {
        const typ = this.getNodeValue(ctx.s);
        this.setNodeValue(ctx, new type.SetType(typ));
    }


    exitMember_method_declaration = (ctx: contexts.Member_method_declarationContext) => {
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


    exitStatement_list = (ctx: contexts.Statement_listContext) => {
        const items = new statement.StatementList();
        ctx.statement().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }

    exitAbstract_global_method_declaration = (ctx: contexts.Abstract_global_method_declarationContext) => {
        const typ = this.getNodeValue(ctx.typ);
        if (typ instanceof type.CategoryType)
            typ.mutable = ctx.MUTABLE() != null;
        const name = this.getNodeValue(ctx._name);
        const args = this.getNodeValue(ctx.args);
        this.setNodeValue(ctx, new declaration.AbstractMethodDeclaration(name, args, typ));
    }

    exitAbstract_member_method_declaration = (ctx: contexts.Abstract_member_method_declarationContext) => {
        const typ = this.getNodeValue(ctx.typ);
        if (typ instanceof type.CategoryType)
            typ.mutable = ctx.MUTABLE() != null;
        const name = this.getNodeValue(ctx._name);
        const args = this.getNodeValue(ctx.args);
        this.setNodeValue(ctx, new declaration.AbstractMethodDeclaration(name, args, typ));
    }

    exitConcrete_method_declaration = (ctx: contexts.Concrete_method_declarationContext) => {
        const typ = this.getNodeValue(ctx.typ);
        if (typ instanceof type.CategoryType)
            typ.mutable = ctx.MUTABLE() != null;
        const name = this.getNodeValue(ctx._name);
        const args = this.getNodeValue(ctx.args);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new declaration.ConcreteMethodDeclaration(name, args, typ, stmts));
    }


    exitMethod_declaration = (ctx: contexts.Method_declarationContext) => {
        const value = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, value);
    }


    exitMethodCallStatement = (ctx: contexts.MethodCallStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitMethod_identifier = (ctx: contexts.Method_identifierContext) => {
        const value = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, value);
    }

    exitConstructorFrom = (ctx: contexts.ConstructorFromContext) => {
        const type = this.getNodeValue(ctx.typ);
        const copyFrom = this.getNodeValue(ctx.copyExp) || null;
        let args = this.getNodeValue(ctx.args) || null;
        const arg = this.getNodeValue(ctx.arg) || null;
        if (arg !== null) {
            if (args === null) {
                args = new grammar.ArgumentList();
            }
            args.add(arg);
        } else if (args !== null)
            args.checkLastAnd();
        this.setNodeValue(ctx, new expression.ConstructorExpression(type, copyFrom, args, true));
    }


    exitConstructorNoFrom = (ctx: contexts.ConstructorNoFromContext) => {
        const type = this.getNodeValue(ctx.typ);
        let args = this.getNodeValue(ctx.args) || null;
        const arg = this.getNodeValue(ctx.arg) || null;
        if (arg !== null) {
            if (args === null) {
                args = new grammar.ArgumentList();
            }
            args.add(arg);
        } else if (args !== null)
            args.checkLastAnd();
        this.setNodeValue(ctx, new expression.ConstructorExpression(type, null, args, true));
    }

    exitAssertion = (ctx: contexts.AssertionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new parser.Assertion(exp));
    }

    exitAssertion_list = (ctx: contexts.Assertion_listContext) => {
        const items = new expression.ExpressionList();
        ctx.assertion().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitAssignInstanceStatement = (ctx: contexts.AssignInstanceStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitAssign_instance_statement = (ctx: contexts.Assign_instance_statementContext) => {
        const inst = this.getNodeValue(ctx.inst);
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new statement.AssignInstanceStatement(inst, exp));
    }


    exitAssign_variable_statement = (ctx: contexts.Assign_variable_statementContext) => {
        const name = this.getNodeValue(ctx.variable_identifier());
        const exp = this.getNodeValue(ctx.expression());
        this.setNodeValue(ctx, new statement.AssignVariableStatement(name, exp));
    }


    exitAssign_tuple_statement = (ctx: contexts.Assign_tuple_statementContext) => {
        const items = this.getNodeValue(ctx.items);
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new statement.AssignTupleStatement(items, exp));
    }


    exitRootInstance = (ctx: contexts.RootInstanceContext) => {
        const name = this.getNodeValue(ctx.variable_identifier());
        this.setNodeValue(ctx, new instance.VariableInstance(name));
    }


    exitChildInstance = (ctx: contexts.ChildInstanceContext) => {
        const parent = this.getNodeValue(ctx.assignable_instance());
        const child = this.getNodeValue(ctx.child_instance());
        child.parent = parent;
        this.setNodeValue(ctx, child);
    }

    exitMemberInstance = (ctx: contexts.MemberInstanceContext) => {
        const name = this.getNodeValue(ctx._name);
        this.setNodeValue(ctx, new instance.MemberInstance(name));
    }

    exitIsATypeExpression = (ctx: contexts.IsATypeExpressionContext) => {
        const type = this.getNodeValue(ctx.category_or_any_type());
        const exp = new expression.TypeExpression(type);
        this.setNodeValue(ctx, exp);
    }

    exitIsOtherExpression = (ctx: contexts.IsOtherExpressionContext) => {
        const exp = this.getNodeValue(ctx.expression());
        this.setNodeValue(ctx, exp);
    }

    exitIsExpression = (ctx: contexts.IsExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        let op;
        if(ctx.NOT())
            op = right instanceof expression.TypeExpression ? grammar.EqOp.IS_NOT_A : grammar.EqOp.IS_NOT;
        else
            op = right instanceof expression.TypeExpression ? grammar.EqOp.IS_A : grammar.EqOp.IS;
        this.setNodeValue(ctx, new expression.EqualsExpression(left, op, right));
    }

    exitItemInstance = (ctx: contexts.ItemInstanceContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new instance.ItemInstance(exp));
    }

    exitConstructorExpression = (ctx: contexts.ConstructorExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitNative_statement_list = (ctx: contexts.Native_statement_listContext) => {
        const items = new statement.StatementList();
        ctx.native_statement().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }

    exitJava_identifier = (ctx: contexts.Java_identifierContext) => {
        this.setNodeValue(ctx, ctx.getText());
    }

    exitJavascript_identifier = (ctx: contexts.Javascript_identifierContext) => {
        const id = new grammar.Identifier(ctx.getText());
        this.setNodeValue(ctx, id);
    }

    exitJavascript_member_expression = (ctx: contexts.Javascript_member_expressionContext) => {
        const name = ctx.name.getText();
        this.setNodeValue(ctx, new javascript.JavaScriptMemberExpression(name));
    }

    exitJavascript_new_expression = (ctx: contexts.Javascript_new_expressionContext) => {
        const method = this.getNodeValue(ctx.javascript_method_expression());
        this.setNodeValue(ctx, new javascript.JavaScriptNewExpression(method));
    }

    exitJavascript_primary_expression = (ctx: contexts.Javascript_primary_expressionContext) => {
        const exp = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, exp);
    }

    exitJavascript_this_expression = (ctx: contexts.Javascript_this_expressionContext) => {
        this.setNodeValue(ctx, new javascript.JavaScriptThisExpression());
    }


    exitJavaIdentifier = (ctx: contexts.JavaIdentifierContext) => {
        const name = this.getNodeValue(ctx._name);
        this.setNodeValue(ctx, new java.JavaIdentifierExpression(null, name));
    }

    exitJavaIdentifierExpression = (ctx: contexts.JavaIdentifierExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitJavaChildIdentifier = (ctx: contexts.JavaChildIdentifierContext) => {
        const parent = this.getNodeValue(ctx.parent);
        const name = this.getNodeValue(ctx._name);
        const child = new java.JavaIdentifierExpression(parent, name);
        this.setNodeValue(ctx, child);
    }


    exitJavaClassIdentifier = (ctx: contexts.JavaClassIdentifierContext) => {
        const klass = this.getNodeValue(ctx.klass);
        this.setNodeValue(ctx, klass);
    }

    exitJavaChildClassIdentifier = (ctx: contexts.JavaChildClassIdentifierContext) => {
        const parent = this.getNodeValue(ctx.parent);
        const child = new java.JavaIdentifierExpression(parent, ctx.name.text);
        this.setNodeValue(ctx, child);
    }


    exitJavaPrimaryExpression = (ctx: contexts.JavaPrimaryExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitJavascriptBooleanLiteral = (ctx: contexts.JavascriptBooleanLiteralContext) => {
        this.setNodeValue(ctx, new javascript.JavaScriptBooleanLiteral(ctx.getText()));
    }

    exitJavascriptCharacterLiteral = (ctx: contexts.JavascriptCharacterLiteralContext) => {
        this.setNodeValue(ctx, new javascript.JavaScriptCharacterLiteral(ctx.getText()));
    }

    exitJavascriptTextLiteral = (ctx: contexts.JavascriptTextLiteralContext) => {
        this.setNodeValue(ctx, new javascript.JavaScriptTextLiteral(ctx.getText()));
    }

    exitJavascriptIntegerLiteral = (ctx: contexts.JavascriptIntegerLiteralContext) => {
        this.setNodeValue(ctx, new javascript.JavaScriptIntegerLiteral(ctx.getText()));
    }


    exitJavascriptDecimalLiteral = (ctx: contexts.JavascriptDecimalLiteralContext) => {
        this.setNodeValue(ctx, new javascript.JavaScriptDecimalLiteral(ctx.getText()));
    }

    exitJavascriptPrimaryExpression = (ctx: contexts.JavascriptPrimaryExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitJavascript_identifier_expression = (ctx: contexts.Javascript_identifier_expressionContext) => {
        const id = this.getNodeValue(ctx._name);
        this.setNodeValue(ctx, new javascript.JavaScriptIdentifierExpression(id));
    }

    exitJavaSelectorExpression = (ctx: contexts.JavaSelectorExpressionContext) => {
        const parent = this.getNodeValue(ctx.parent);
        const child = this.getNodeValue(ctx.child);
        child.parent = parent;
        this.setNodeValue(ctx, child);
    }

    exitJavascriptSelectorExpression = (ctx: contexts.JavascriptSelectorExpressionContext) => {
        const parent = this.getNodeValue(ctx.parent);
        const child = this.getNodeValue(ctx.child);
        child.parent = parent;
        this.setNodeValue(ctx, child);
    }

    exitJavascriptMemberExpression = (ctx: contexts.JavascriptMemberExpressionContext) => {
        const id = this.getNodeValue(ctx._name);
        this.setNodeValue(ctx, new javascript.JavaScriptMemberExpression(id));
    }

    exitJava_primary_expression = (ctx: contexts.Java_primary_expressionContext) => {
        const exp = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, exp);
    }

    exitJava_item_expression = (ctx: contexts.Java_item_expressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new java.JavaItemExpression(exp));
    }

    exitJavascript_item_expression = (ctx: contexts.Javascript_item_expressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new javascript.JavaScriptItemExpression(exp));
    }

    exitJavascriptItemExpression = (ctx: contexts.JavascriptItemExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
    }


    exitJavaItemExpression = (ctx: contexts.JavaItemExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitJavaStatement = (ctx: contexts.JavaStatementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        const stmt = new java.JavaStatement(exp, false);
        this.setNodeValue(ctx, stmt);
    }

    exitJavascriptStatement = (ctx: contexts.JavascriptStatementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        const stmt = new javascript.JavaScriptStatement(exp, false);
        this.setNodeValue(ctx, stmt);
    }

    exitJavaReturnStatement = (ctx: contexts.JavaReturnStatementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new java.JavaStatement(exp, true));
    }

    exitJavascriptReturnStatement = (ctx: contexts.JavascriptReturnStatementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new javascript.JavaScriptStatement(exp, true));
    }


    exitJavaNativeStatement = (ctx: contexts.JavaNativeStatementContext) => {
        const stmt = this.getNodeValue(ctx.java_statement());
        const call = new java.JavaNativeCall(stmt);
        this.setNodeValue(ctx, call);
    }


    exitJavascriptNativeStatement = (ctx: contexts.JavascriptNativeStatementContext) => {
        const stmt = this.getNodeValue(ctx.javascript_native_statement());
        this.setNodeValue(ctx, stmt);
    }

    exitJavascript_native_statement = (ctx: contexts.Javascript_native_statementContext) => {
        const stmt = this.getNodeValue(ctx.javascript_statement());
        const module = this.getNodeValue(ctx.javascript_module());
        stmt.module = module || null;
        this.setNodeValue(ctx, new javascript.JavaScriptNativeCall(stmt));
    }


    exitNative_method_declaration = (ctx: contexts.Native_method_declarationContext) => {
        const type = this.getNodeValue(ctx.typ);
        const name = this.getNodeValue(ctx._name);
        const params = this.getNodeValue(ctx.args);
        const stmts = this.getNodeValue(ctx.stmts);
        const decl = new declaration.NativeMethodDeclaration(name, params, type, stmts);
        this.setNodeValue(ctx, decl);
    }

    exitJavaArgumentList = (ctx: contexts.JavaArgumentListContext) => {
        const item = this.getNodeValue(ctx.item);
        this.setNodeValue(ctx, new java.JavaExpressionList(item));
    }

    exitJavascriptArgumentList = (ctx: contexts.JavascriptArgumentListContext) => {
        const item = this.getNodeValue(ctx.item);
        this.setNodeValue(ctx, new javascript.JavaScriptExpressionList(item));
    }


    exitJavaArgumentListItem = (ctx: contexts.JavaArgumentListItemContext) => {
        const item = this.getNodeValue(ctx.item);
        const items = this.getNodeValue(ctx.items);
        items.add(item);
        this.setNodeValue(ctx, items);
    }

    exitJavascriptArgumentListItem = (ctx: contexts.JavascriptArgumentListItemContext) => {
        const item = this.getNodeValue(ctx.item);
        const items = this.getNodeValue(ctx.items);
        items.add(item);
        this.setNodeValue(ctx, items);
    }

    exitJava_method_expression = (ctx: contexts.Java_method_expressionContext) => {
        const name = this.getNodeValue(ctx._name);
        const args = this.getNodeValue(ctx.args);
        this.setNodeValue(ctx, new java.JavaMethodExpression(name, args));
    }

    exitJava_this_expression = (ctx: contexts.Java_this_expressionContext) => {
        this.setNodeValue(ctx, new java.JavaThisExpression());
    }

    exitJavascriptMethodExpression = (ctx: contexts.JavascriptMethodExpressionContext) => {
        const method = this.getNodeValue(ctx.method);
        this.setNodeValue(ctx, method);
    }


    exitJavascript_method_expression = (ctx: contexts.Javascript_method_expressionContext) => {
        const id = this.getNodeValue(ctx._name);
        const args = this.getNodeValue(ctx.args);
        this.setNodeValue(ctx, new javascript.JavaScriptMethodExpression(id, args));
    }

    exitJavaMethodExpression = (ctx: contexts.JavaMethodExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitFullDeclarationList = (ctx: contexts.FullDeclarationListContext) => {
        const items = this.getNodeValue(ctx.declarations()) || new declaration.DeclarationList();
        this.setNodeValue(ctx, items);
    }


    exitDeclaration = (ctx: contexts.DeclarationContext) => {
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


    exitDeclarations = (ctx: contexts.DeclarationsContext) => {
        const items = new declaration.DeclarationList();
        ctx.declaration().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitIteratorExpression = (ctx: contexts.IteratorExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        const name = this.getNodeValue(ctx._name);
        const source = this.getNodeValue(ctx.source);
        this.setNodeValue(ctx, new expression.IteratorExpression(name, source, exp));
    }


    exitIteratorType = (ctx: contexts.IteratorTypeContext) => {
        const typ = this.getNodeValue(ctx.i);
        this.setNodeValue(ctx, new type.IteratorType(typ));
    }


    exitJavaBooleanLiteral = (ctx: contexts.JavaBooleanLiteralContext) => {
        this.setNodeValue(ctx, new java.JavaBooleanLiteral(ctx.getText()));
    }


    exitJavaIntegerLiteral = (ctx: contexts.JavaIntegerLiteralContext) => {
        this.setNodeValue(ctx, new java.JavaIntegerLiteral(ctx.getText()));
    }


    exitJavaDecimalLiteral = (ctx: contexts.JavaDecimalLiteralContext) => {
        this.setNodeValue(ctx, new java.JavaDecimalLiteral(ctx.getText()));
    }


    exitJavaCharacterLiteral = (ctx: contexts.JavaCharacterLiteralContext) => {
        this.setNodeValue(ctx, new java.JavaCharacterLiteral(ctx.getText()));
    }


    exitJavaTextLiteral = (ctx: contexts.JavaTextLiteralContext) => {
        this.setNodeValue(ctx, new java.JavaTextLiteral(ctx.getText()));
    }

    exitJavaCategoryBinding = (ctx: contexts.JavaCategoryBindingContext) => {
        const map = this.getNodeValue(ctx.binding);
        this.setNodeValue(ctx, new java.JavaNativeCategoryBinding(map));
    }

    exitJavascriptCategoryBinding = (ctx: contexts.JavascriptCategoryBindingContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.binding));
    }

    exitJavascript_category_binding = (ctx: contexts.Javascript_category_bindingContext) => {
        const identifier = ctx.javascript_identifier().map(cx => cx.getText()).join(".");
        const module = this.getNodeValue(ctx.javascript_module()) || null;
        const map = new javascript.JavaScriptNativeCategoryBinding(identifier, module);
        this.setNodeValue(ctx, map);
    }

    exitJavascript_module = (ctx: contexts.Javascript_moduleContext) => {
        const ids = ctx.javascript_identifier().map(rule => rule.getText());
        const module = new javascript.JavaScriptModule(ids);
        this.setNodeValue(ctx, module);
    }

    exitNativeCategoryBindingList = (ctx: contexts.NativeCategoryBindingListContext) => {
        const item = this.getNodeValue(ctx.item);
        const items = new grammar.NativeCategoryBindingList(item);
        this.setNodeValue(ctx, items);
    }


    exitNativeCategoryBindingListItem = (ctx: contexts.NativeCategoryBindingListItemContext) => {
        const item = this.getNodeValue(ctx.item);
        const items = this.getNodeValue(ctx.items);
        items.add(item);
        this.setNodeValue(ctx, items);
    }


    exitNative_category_bindings = (ctx: contexts.Native_category_bindingsContext) => {
        const items = this.getNodeValue(ctx.items);
        this.setNodeValue(ctx, items);
    }


    exitNative_category_declaration = (ctx: contexts.Native_category_declarationContext) => {
        const name = this.getNodeValue(ctx._name);
        const attrs = this.getNodeValue(ctx.attrs);
        const bindings = this.getNodeValue(ctx.bindings);
        const methods = this.getNodeValue(ctx.methods);
        const decl = new declaration.NativeCategoryDeclaration(name, attrs, bindings, null, methods);
        decl.storable = ctx.STORABLE() != null;
        this.setNodeValue(ctx, decl);
    }


    exitNative_widget_declaration = (ctx: contexts.Native_widget_declarationContext) => {
        const name = this.getNodeValue(ctx._name);
        const bindings = this.getNodeValue(ctx.bindings);
        const methods = this.getNodeValue(ctx.methods);
        const decl = new declaration.NativeWidgetDeclaration(name, bindings, methods);
        this.setNodeValue(ctx, decl);
    }


    exitNativeCategoryDeclaration = (ctx: contexts.NativeCategoryDeclarationContext) => {
        const decl = this.getNodeValue(ctx.decl);
        this.setNodeValue(ctx, decl);
    }


    exitNative_resource_declaration = (ctx: contexts.Native_resource_declarationContext) => {
        const name = this.getNodeValue(ctx._name);
        const attrs = this.getNodeValue(ctx.attrs);
        const bindings = this.getNodeValue(ctx.bindings);
        const methods = this.getNodeValue(ctx.methods);
        const decl = new declaration.NativeResourceDeclaration(name, attrs, bindings, null, methods);
        decl.storable = ctx.STORABLE() != null;
        this.setNodeValue(ctx, decl);
    }


    exitResource_declaration = (ctx: contexts.Resource_declarationContext) => {
        const decl = this.getNodeValue(ctx.native_resource_declaration());
        this.setNodeValue(ctx, decl);
    }


    exitParenthesis_expression = (ctx: contexts.Parenthesis_expressionContext) => {
        const exp = this.getNodeValue(ctx.expression());
        this.setNodeValue(ctx, new expression.ParenthesisExpression(exp));
    }


    exitParenthesisExpression = (ctx: contexts.ParenthesisExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitNative_symbol_list = (ctx: contexts.Native_symbol_listContext) => {
        const items = new grammar.NativeSymbolList();
        ctx.native_symbol().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitEnum_native_declaration = (ctx: contexts.Enum_native_declarationContext) => {
        const name = this.getNodeValue(ctx._name);
        const type = this.getNodeValue(ctx.typ);
        const symbols = this.getNodeValue(ctx.symbols);
        this.setNodeValue(ctx, new declaration.EnumeratedNativeDeclaration(name, type, symbols));
    }


    exitFor_each_statement = (ctx: contexts.For_each_statementContext) => {
        const name1 = this.getNodeValue(ctx.name1);
        const name2 = this.getNodeValue(ctx.name2);
        const source = this.getNodeValue(ctx.source);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new statement.ForEachStatement(name1, name2, source, stmts));
    }


    exitForEachStatement = (ctx: contexts.ForEachStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitSymbols_token = (ctx: contexts.Symbols_tokenContext) => {
        this.setNodeValue(ctx, ctx.getText());
    }


    exitKey_token = (ctx: contexts.Key_tokenContext) => {
        this.setNodeValue(ctx, ctx.getText());
    }


    exitValue_token = (ctx: contexts.Value_tokenContext) => {
        this.setNodeValue(ctx, ctx.getText());
    }


    exitNamed_argument = (ctx: contexts.Named_argumentContext) => {
        const name = this.getNodeValue(ctx.variable_identifier());
        const arg = new param.UnresolvedParameter(name);
        const exp = this.getNodeValue(ctx.literal_expression());
        arg.defaultExpression = exp || null;
        this.setNodeValue(ctx, arg);
    }


    exitClosureStatement = (ctx: contexts.ClosureStatementContext) => {
        const decl = this.getNodeValue(ctx.decl);
        this.setNodeValue(ctx, new statement.DeclarationStatement(decl));
    }


    exitReturn_statement = (ctx: contexts.Return_statementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new statement.ReturnStatement(exp));
    }


    exitReturnStatement = (ctx: contexts.ReturnStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitClosureExpression = (ctx: contexts.ClosureExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new expression.MethodExpression(exp));
    }


    exitIf_statement = (ctx: contexts.If_statementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        const stmts = this.getNodeValue(ctx.stmts);
        const elseIfs = this.getNodeValue(ctx.elseIfs);
        const elseStmts = this.getNodeValue(ctx.elseStmts);
        this.setNodeValue(ctx, new statement.IfStatement(exp, stmts, elseIfs, elseStmts));
    }


    exitElseIfStatementList = (ctx: contexts.ElseIfStatementListContext) => {
        const exp = this.getNodeValue(ctx.exp);
        const stmts = this.getNodeValue(ctx.stmts);
        const elem = new statement.IfElement(exp, stmts);
        this.setNodeValue(ctx, new statement.IfElementList(elem));
    }


    exitElseIfStatementListItem = (ctx: contexts.ElseIfStatementListItemContext) => {
        const items = this.getNodeValue(ctx.items);
        const exp = this.getNodeValue(ctx.exp);
        const stmts = this.getNodeValue(ctx.stmts);
        const elem = new statement.IfElement(exp, stmts);
        items.add(elem);
        this.setNodeValue(ctx, items);
    }


    exitIfStatement = (ctx: contexts.IfStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitSuperExpression = (ctx: contexts.SuperExpressionContext) => {
        this.setNodeValue(ctx, new expression.SuperExpression());
    }


    exitSwitchStatement = (ctx: contexts.SwitchStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitAssignTupleStatement = (ctx: contexts.AssignTupleStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitRaiseStatement = (ctx: contexts.RaiseStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitWriteStatement = (ctx: contexts.WriteStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitWithResourceStatement = (ctx: contexts.WithResourceStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitWhileStatement = (ctx: contexts.WhileStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitDoWhileStatement = (ctx: contexts.DoWhileStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitTryStatement = (ctx: contexts.TryStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitEqualsExpression = (ctx: contexts.EqualsExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        let op = null;
        switch(ctx.op.type) {
            case ELexer.EQ:
                op = grammar.EqOp.EQUALS;
                break;
            case ELexer.LTGT:
                op = grammar.EqOp.NOT_EQUALS;
                break;
            case ELexer.TILDE:
                op = grammar.EqOp.ROUGHLY;
                break;
            default:
                throw new Error("Operator " + ctx.op.type);
        }
        this.setNodeValue(ctx, new expression.EqualsExpression(left, op, right));
    }


    exitCompareExpression = (ctx: contexts.CompareExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        let op = null;
        switch(ctx.op.type) {
            case ELexer.LT:
                op = grammar.CmpOp.LT;
                break;
            case ELexer.LTE:
                op = grammar.CmpOp.LTE;
                break;
            case ELexer.GT:
                op = grammar.CmpOp.GT;
                break;
            case ELexer.GTE:
                op = grammar.CmpOp.GTE;
                break;
            default:
                throw new Error("Operator " + ctx.op.type);
        }
        this.setNodeValue(ctx, new expression.CompareExpression(left, op, right));
    }


    exitAtomicSwitchCase = (ctx: contexts.AtomicSwitchCaseContext) => {
        const exp = this.getNodeValue(ctx.exp);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new statement.AtomicSwitchCase(exp, stmts));
    }


    exitCollection_literal = (ctx: contexts.Collection_literalContext) => {
        const value = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, value);
    }


    exitCollectionSwitchCase = (ctx: contexts.CollectionSwitchCaseContext) => {
        const exp = this.getNodeValue(ctx.exp);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new statement.CollectionSwitchCase(exp, stmts));
    }


    exitSwitch_case_statement_list = (ctx: contexts.Switch_case_statement_listContext) => {
        const items = new statement.SwitchCaseList();
        ctx.switch_case_statement().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitSwitch_statement = (ctx: contexts.Switch_statementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        const cases = this.getNodeValue(ctx.cases);
        const stmts = this.getNodeValue(ctx.stmts);
        const stmt = new statement.SwitchStatement(exp, cases, stmts);
        this.setNodeValue(ctx, stmt);
    }


    exitLiteralRangeLiteral = (ctx: contexts.LiteralRangeLiteralContext) => {
        const low = this.getNodeValue(ctx.low);
        const high = this.getNodeValue(ctx.high);
        this.setNodeValue(ctx, new literal.RangeLiteral(low, high));
    }

    exitLiteralListLiteral = (ctx: contexts.LiteralListLiteralContext) => {
        const exp = this.getNodeValue(ctx.literal_list_literal());
        this.setNodeValue(ctx, new literal.ListLiteral(false, exp));
    }


    exitLiteral_list_literal = (ctx: contexts.Literal_list_literalContext) => {
        const items = new expression.ExpressionList();
        ctx.atomic_literal().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitInExpression = (ctx: contexts.InExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        const op = ctx.NOT() ? grammar.ContOp.NOT_IN : grammar.ContOp.IN;
        this.setNodeValue(ctx, new expression.ContainsExpression(left, op, right));
    }


    exitCssType = (ctx: contexts.CssTypeContext) => {
        this.setNodeValue(ctx, type.CssType.instance);
    }


    exitHasExpression = (ctx: contexts.HasExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        const op = ctx.NOT() ? grammar.ContOp.NOT_HAS : grammar.ContOp.HAS;
        this.setNodeValue(ctx, new expression.ContainsExpression(left, op, right));
    }



    exitHasAllExpression = (ctx: contexts.HasAllExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        const op = ctx.NOT() ? grammar.ContOp.NOT_HAS_ALL : grammar.ContOp.HAS_ALL;
        this.setNodeValue(ctx, new expression.ContainsExpression(left, op, right));
    }


    exitHasAnyExpression = (ctx: contexts.HasAnyExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        const op = ctx.NOT() ? grammar.ContOp.NOT_HAS_ANY : grammar.ContOp.HAS_ANY;
        this.setNodeValue(ctx, new expression.ContainsExpression(left, op, right));
    }


    exitContainsExpression = (ctx: contexts.ContainsExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        const op = ctx.NOT() ? grammar.EqOp.NOT_CONTAINS : grammar.EqOp.CONTAINS;
        this.setNodeValue(ctx, new expression.EqualsExpression(left, op, right));
    }


    exitDivideExpression = (ctx: contexts.DivideExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        this.setNodeValue(ctx, new expression.DivideExpression(left, right));
    }


    exitIntDivideExpression = (ctx: contexts.IntDivideExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        this.setNodeValue(ctx, new expression.IntDivideExpression(left, right));
    }


    exitModuloExpression = (ctx: contexts.ModuloExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        this.setNodeValue(ctx, new expression.ModuloExpression(left, right));
    }


    exitAnnotation_constructor = (ctx: contexts.Annotation_constructorContext) => {
        const name = this.getNodeValue(ctx._name);
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


    exitAnnotation_argument = (ctx: contexts.Annotation_argumentContext) => {
        const name = this.getNodeValue(ctx._name);
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new literal.DocEntry(name, exp));
    }


    exitAnnotation_identifier = (ctx: contexts.Annotation_identifierContext) => {
        this.setNodeValue(ctx, new grammar.Identifier(ctx.getText()));
    }


    exitAnnotation_argument_name = (ctx: contexts.Annotation_argument_nameContext) => {
        this.setNodeValue(ctx, ctx.getText());
    }


    exitAnnotationLiteralValue = (ctx: contexts.AnnotationLiteralValueContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitAnnotationTypeValue = (ctx: contexts.AnnotationTypeValueContext) => {
        const typ = this.getNodeValue(ctx.typ);
        this.setNodeValue(ctx, new expression.TypeExpression(typ));
    }


    exitAndExpression = (ctx: contexts.AndExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        this.setNodeValue(ctx, new expression.AndExpression(left, right));
    }


    exitNullLiteral = (ctx: contexts.NullLiteralContext) => {
        this.setNodeValue(ctx, literal.NullLiteral.instance);
    }


    exitOperator_argument = (ctx: contexts.Operator_argumentContext) => {
        const value = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, value);
    }


    exitOperatorArgument = (ctx: contexts.OperatorArgumentContext) => {
        const arg = this.getNodeValue(ctx.arg);
        arg.setMutable(ctx.MUTABLE() != null);
        this.setNodeValue(ctx, arg);
    }


    exitOperatorPlus = (ctx: contexts.OperatorPlusContext) => {
        this.setNodeValue(ctx, grammar.Operator.PLUS);
    }


    exitOperatorMinus = (ctx: contexts.OperatorMinusContext) => {
        this.setNodeValue(ctx, grammar.Operator.MINUS);
    }


    exitOperatorMultiply = (ctx: contexts.OperatorMultiplyContext) => {
        this.setNodeValue(ctx, grammar.Operator.MULTIPLY);
    }


    exitOperatorDivide = (ctx: contexts.OperatorDivideContext) => {
        this.setNodeValue(ctx, grammar.Operator.DIVIDE);
    }


    exitOperatorIDivide = (ctx: contexts.OperatorIDivideContext) => {
        this.setNodeValue(ctx, grammar.Operator.IDIVIDE);
    }


    exitOperatorModulo = (ctx: contexts.OperatorModuloContext) => {
        this.setNodeValue(ctx, grammar.Operator.MODULO);
    }

    exitNative_member_method_declaration = (ctx: contexts.Native_member_method_declarationContext) => {
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

    exitOperator_method_declaration = function  = (ctx: contexts.Operator_method_declaration = function Context) => {
        const op = this.getNodeValue(ctx.op);
        const arg = this.getNodeValue(ctx.arg);
        const typ = this.getNodeValue(ctx.typ);
        const stmts = this.getNodeValue(ctx.stmts);
        const decl = new declaration.OperatorMethodDeclaration(op, arg, typ, stmts);
        this.setNodeValue(ctx, decl);
    }

    exitOrder_by = (ctx: contexts.Order_byContext) => {
        const ids = new grammar.IdentifierList();
        ctx.variable_identifier().map(function (ctx_) {
            ids.push(this.getNodeValue(ctx_));
        }, this);
        const clause = new grammar.OrderByClause(ids, ctx.DESC() != null);
        this.setNodeValue(ctx, clause);
    }

    exitOrder_by_list = (ctx: contexts.Order_by_listContext) => {
        const list = new grammar.OrderByClauseList();
        ctx.order_by().map(function (ctx_) {
            list.add(this.getNodeValue(ctx_));
        }, this);
        this.setNodeValue(ctx, list);
    }


    exitOrExpression = (ctx: contexts.OrExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        this.setNodeValue(ctx, new expression.OrExpression(left, right));
    }


    exitMultiplyExpression = (ctx: contexts.MultiplyExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        this.setNodeValue(ctx, new expression.MultiplyExpression(left, right));
    }


    exitMutable_category_type = (ctx: contexts.Mutable_category_typeContext) => {
        const typ = this.getNodeValue(ctx.category_type());
        typ.mutable = ctx.MUTABLE() != null;
        this.setNodeValue(ctx, typ);
    }


    exitMutableInstanceExpression = (ctx: contexts.MutableInstanceExpressionContext) => {
        const source = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new expression.MutableExpression(source));
    }


    exitMutableSelectableExpression = (ctx: contexts.MutableSelectableExpressionContext) => {
        const name = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new expression.InstanceExpression(name));
    }


    exitMutableSelectorExpression = (ctx: contexts.MutableSelectorExpressionContext) => {
        const parent = this.getNodeValue(ctx.parent);
        const selector = this.getNodeValue(ctx.selector);
        selector.parent = parent;
        this.setNodeValue(ctx, selector);
    }


    exitMinusExpression = (ctx: contexts.MinusExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new expression.MinusExpression(exp));
    }


    exitNotExpression = (ctx: contexts.NotExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new expression.NotExpression(exp));
    }


    exitWhile_statement = (ctx: contexts.While_statementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new statement.WhileStatement(exp, stmts));
    }


    exitDo_while_statement = (ctx: contexts.Do_while_statementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new statement.DoWhileStatement(exp, stmts));
    }

    exitSingleton_category_declaration = (ctx: contexts.Singleton_category_declarationContext) => {
        const name = this.getNodeValue(ctx._name);
        const attrs = this.getNodeValue(ctx.attrs);
        const methods = this.getNodeValue(ctx.methods);
        this.setNodeValue(ctx, new declaration.SingletonCategoryDeclaration(name, attrs, methods));
    }

    exitSingletonCategoryDeclaration = (ctx: contexts.SingletonCategoryDeclarationContext) => {
        const decl = this.getNodeValue(ctx.decl);
        this.setNodeValue(ctx, decl);
    }

    exitSliceFirstAndLast = (ctx: contexts.SliceFirstAndLastContext) => {
        const first = this.getNodeValue(ctx.first);
        const last = this.getNodeValue(ctx.last);
        this.setNodeValue(ctx, new expression.SliceSelector(null, first, last));
    }


    exitSliceFirstOnly = (ctx: contexts.SliceFirstOnlyContext) => {
        const first = this.getNodeValue(ctx.first);
        this.setNodeValue(ctx, new expression.SliceSelector(null, first, null));
    }


    exitSliceLastOnly = (ctx: contexts.SliceLastOnlyContext) => {
        const last = this.getNodeValue(ctx.last);
        this.setNodeValue(ctx, new expression.SliceSelector(null, null, last));
    }


    exitSorted_expression = (ctx: contexts.Sorted_expressionContext) => {
        const source = this.getNodeValue(ctx.source);
        const desc = ctx.DESC() != null;
        const key = this.getNodeValue(ctx.key);
        this.setNodeValue(ctx, new expression.SortedExpression(source, desc, key));
    }


    exitSorted_key = (ctx: contexts.Sorted_keyContext) => {
        const exp = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, exp);
    }


    exitSortedExpression = (ctx: contexts.SortedExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitDocumentExpression = (ctx: contexts.DocumentExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitDocument_expression = (ctx: contexts.Document_expressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new expression.DocumentExpression(exp));
    }


    exitDocumentType = (ctx: contexts.DocumentTypeContext) => {
        this.setNodeValue(ctx, type.DocumentType.instance);
    }


    exitDocument_literal = (ctx: contexts.Document_literalContext) => {
        const entries = this.getNodeValue(ctx.doc_entry_list()) || new literal.DocEntryList();
        this.setNodeValue(ctx, new literal.DocumentLiteral(entries));
    }


    exitFetchExpression = (ctx: contexts.FetchExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
    }


    exitFetchStatement = (ctx: contexts.FetchStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.stmt));
    }


    exitFetchMany = (ctx: contexts.FetchManyContext) => {
        const category = this.getNodeValue(ctx.typ);
        const predicate = this.getNodeValue(ctx.predicate);
        const start = this.getNodeValue(ctx.xstart);
        const stop = this.getNodeValue(ctx.xstop);
        const include = this.getNodeValue(ctx.include);
        const orderBy = this.getNodeValue(ctx.orderby);
        this.setNodeValue(ctx, new expression.FetchManyExpression(category, start, stop, predicate, include, orderBy));
    }


    exitFetchManyAsync = (ctx: contexts.FetchManyAsyncContext) => {
        const category = this.getNodeValue(ctx.typ);
        const predicate = this.getNodeValue(ctx.predicate);
        const start = this.getNodeValue(ctx.xstart);
        const stop = this.getNodeValue(ctx.xstop);
        const orderBy = this.getNodeValue(ctx.orderby);
        const include = this.getNodeValue(ctx.include);
        const thenWith = grammar.ThenWith.OrEmpty(this.getNodeValue(ctx.then()));
        this.setNodeValue(ctx, new statement.FetchManyStatement(category, start, stop, predicate, include, orderBy, thenWith));
    }


    exitFetchOne = (ctx: contexts.FetchOneContext) => {
        const category = this.getNodeValue(ctx.typ);
        const predicate = this.getNodeValue(ctx.predicate);
        const include = this.getNodeValue(ctx.include);
        this.setNodeValue(ctx, new expression.FetchOneExpression(category, predicate, include));
    }


    exitFetchOneAsync = (ctx: contexts.FetchOneAsyncContext) => {
        const category = this.getNodeValue(ctx.typ);
        const predicate = this.getNodeValue(ctx.predicate);
        const include = this.getNodeValue(ctx.include);
        const thenWith = grammar.ThenWith.OrEmpty(this.getNodeValue(ctx.then()));
        this.setNodeValue(ctx, new statement.FetchOneStatement(category, predicate, include, thenWith));
    }


    exitThen = (ctx: contexts.ThenContext) => {
        const name = this.getNodeValue(ctx._name);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new grammar.ThenWith(name, stmts));
    }


    exitFilteredListExpression = (ctx: contexts.FilteredListExpressionContext) => {
        const filtered = this.getNodeValue(ctx.filtered_list_suffix());
        const source = this.getNodeValue(ctx.src);
        filtered.source = source;
        this.setNodeValue(ctx, filtered);
    }


    exitFiltered_list_suffix = (ctx: contexts.Filtered_list_suffixContext) => {
        const itemName = this.getNodeValue(ctx._name);
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


    exitArrowFilterExpression = (ctx: contexts.ArrowFilterExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.arrow_expression()));
    }


    exitExplicitFilterExpression = (ctx: contexts.ExplicitFilterExpressionContext) => {
        const name = this.getNodeValue(ctx.variable_identifier());
        const predicate = this.getNodeValue(ctx.expression());
        this.setNodeValue(ctx, new expression.ExplicitPredicateExpression(name, predicate));
    }


    exitOtherFilterExpression = (ctx: contexts.OtherFilterExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.expression()));
    }


    exitCode_type = (ctx: contexts.Code_typeContext) => {
        this.setNodeValue(ctx, type.CodeType.instance);
    }


    exitExecuteExpression = (ctx: contexts.ExecuteExpressionContext) => {
        const name = this.getNodeValue(ctx._name);
        this.setNodeValue(ctx, new expression.ExecuteExpression(name));
    }


    exitExpression_list = (ctx: contexts.Expression_listContext) => {
        const items = new expression.ExpressionList();
        ctx.expression().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitExpression_tuple = (ctx: contexts.Expression_tupleContext) => {
        const items = new expression.ExpressionList();
        ctx.expression().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitCodeExpression = (ctx: contexts.CodeExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new expression.CodeExpression(exp));
    }


    exitCode_argument = (ctx: contexts.Code_argumentContext) => {
        const name = this.getNodeValue(ctx._name);
        this.setNodeValue(ctx, new param.CodeParameter(name));
    }


    exitCategory_or_any_type = (ctx: contexts.Category_or_any_typeContext) => {
        const exp = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, exp);
    }


    exitCategory_symbol = (ctx: contexts.Category_symbolContext) => {
        const name = this.getNodeValue(ctx._name);
        const args = this.getNodeValue(ctx.args);
        const arg = this.getNodeValue(ctx.arg) || null;
        if (arg !== null) {
            args.add(arg);
        }
        this.setNodeValue(ctx, new expression.CategorySymbol(name, args));
    }


    exitCategory_symbol_list = (ctx: contexts.Category_symbol_listContext) => {
        const items = new grammar.CategorySymbolList();
        ctx.category_symbol().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitEnum_category_declaration = (ctx: contexts.Enum_category_declarationContext) => {
        const name = this.getNodeValue(ctx._name);
        const attrs = this.getNodeValue(ctx.attrs);
        const parent = this.getNodeValue(ctx.derived);
        const derived = parent == null ? null : new grammar.IdentifierList(parent);
        const symbols = this.getNodeValue(ctx.symbols);
        this.setNodeValue(ctx, new declaration.EnumeratedCategoryDeclaration(name, attrs, derived, symbols));
    }


    exitEnum_declaration = (ctx: contexts.Enum_declarationContext) => {
        const value = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, value);
    }


    exitRead_all_expression = (ctx: contexts.Read_all_expressionContext) => {
        const source = this.getNodeValue(ctx.source);
        this.setNodeValue(ctx, new expression.ReadAllExpression(source));
    }


    exitRead_blob_expression = (ctx: contexts.Read_blob_expressionContext) => {
        const source = this.getNodeValue(ctx.source);
        this.setNodeValue(ctx, new expression.ReadBlobExpression(source));
    }


    exitRead_one_expression = (ctx: contexts.Read_one_expressionContext) => {
        const source = this.getNodeValue(ctx.source);
        this.setNodeValue(ctx, new expression.ReadOneExpression(source));
    }


    exitRead_statement = (ctx: contexts.Read_statementContext) => {
        const source = this.getNodeValue(ctx.source);
        const thenWith = grammar.ThenWith.OrEmpty(this.getNodeValue(ctx.then()));
        this.setNodeValue(ctx, new statement.ReadStatement(source, thenWith));
    }


    exitReadAllExpression = (ctx: contexts.ReadAllExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitReadBlobExpression = (ctx: contexts.ReadBlobExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitReadOneExpression = (ctx: contexts.ReadOneExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitReadStatement = (ctx: contexts.ReadStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.stmt));
    }


    exitRepl = (ctx: contexts.ReplContext) => {
        const value = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, value);
    }


    exitWith_singleton_statement = (ctx: contexts.With_singleton_statementContext) => {
        const name = this.getNodeValue(ctx.typ);
        const typ = new type.CategoryType(name);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new statement.WithSingletonStatement(typ, stmts));
    }


    exitWithSingletonStatement = (ctx: contexts.WithSingletonStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitWrite_statement = (ctx: contexts.Write_statementContext) => {
        const what = this.getNodeValue(ctx.what);
        const target = this.getNodeValue(ctx.target);
        const thenWith = this.getNodeValue(ctx.then());
        this.setNodeValue(ctx, new statement.WriteStatement(what, target, thenWith));
    }


    exitWith_resource_statement = (ctx: contexts.With_resource_statementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new statement.WithResourceStatement(stmt, stmts));
    }


    exitAnyType = (ctx: contexts.AnyTypeContext) => {
        this.setNodeValue(ctx, type.AnyType.instance);
    }


    exitAnyListType = (ctx: contexts.AnyListTypeContext) => {
        const typ = this.getNodeValue(ctx.any_type());
        this.setNodeValue(ctx, new type.ListType(typ));
    }


    exitAnyDictType = (ctx: contexts.AnyDictTypeContext) => {
        const typ = this.getNodeValue(ctx.any_type());
        this.setNodeValue(ctx, new type.DictionaryType(typ));
    }


    exitCastExpression = (ctx: contexts.CastExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const type = this.getNodeValue(ctx.right);
        this.setNodeValue(ctx, new expression.CastExpression(left, type, ctx.MUTABLE() != null));
    }

    exitCatchAtomicStatement = (ctx: contexts.CatchAtomicStatementContext) => {
        const name = this.getNodeValue(ctx._name);
        const stmts = this.getNodeValue(ctx.stmts);
        const symbol = new expression.SymbolExpression(name);
        symbol.copySectionFrom(name);
        this.setNodeValue(ctx, new statement.AtomicSwitchCase(symbol, stmts));
    }


    exitCatchCollectionStatement = (ctx: contexts.CatchCollectionStatementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new statement.CollectionSwitchCase(exp, stmts));
    }


    exitCatch_statement_list = (ctx: contexts.Catch_statement_listContext) => {
        const items = new statement.SwitchCaseList();
        ctx.catch_statement().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitTry_statement = (ctx: contexts.Try_statementContext) => {
        const name = this.getNodeValue(ctx._name);
        const stmts = this.getNodeValue(ctx.stmts);
        const handlers = this.getNodeValue(ctx.handlers);
        const anyStmts = this.getNodeValue(ctx.anyStmts);
        const finalStmts = this.getNodeValue(ctx.finalStmts);
        const stmt = new statement.SwitchErrorStatement(name, stmts, handlers, anyStmts, finalStmts);
        this.setNodeValue(ctx, stmt);
    }


    exitRaise_statement = (ctx: contexts.Raise_statementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new statement.RaiseStatement(exp));
    }

    exitMatchingList = (ctx: contexts.MatchingListContext) => {
        const exp = this.getNodeValue(ctx.source);
        this.setNodeValue(ctx, new constraint.MatchingCollectionConstraint(exp));
    }

    exitMatchingRange = (ctx: contexts.MatchingRangeContext) => {
        const exp = this.getNodeValue(ctx.source);
        this.setNodeValue(ctx, new constraint.MatchingCollectionConstraint(exp));
    }

    exitMatchingExpression = (ctx: contexts.MatchingExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new constraint.MatchingExpressionConstraint(exp));
    }

    exitMatchingPattern = (ctx: contexts.MatchingPatternContext) => {
        this.setNodeValue(ctx, new constraint.MatchingPatternConstraint(new literal.TextLiteral(ctx.text.text)));
    }

    exitLiteralSetLiteral = (ctx: contexts.LiteralSetLiteralContext) => {
        const items = this.getNodeValue(ctx.literal_list_literal());
        this.setNodeValue(ctx, new literal.SetLiteral(items));
    }


    exitInclude_list = (ctx: contexts.Include_listContext) => {
        const include = ctx.variable_identifier().map(c => this.getNodeValue(c), this);
        this.setNodeValue(ctx, include)
    }

    exitInvocation_expression = (ctx: contexts.Invocation_expressionContext) => {
        let select = null;
        const exp = this.getNodeValue(ctx.exp);
        if(exp instanceof expression.UnresolvedIdentifier)
            select = new expression.MethodSelector(null, exp.id);
        else if(exp instanceof expression.MemberSelector)
            select = new expression.MethodSelector(exp.parent, exp.id);
        if(select !== null)
            this.setNodeValue(ctx, new statement.MethodCall(select));
    }


    exitInvocationExpression = (ctx: contexts.InvocationExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitInvokeStatement = (ctx: contexts.InvokeStatementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitCsharp_identifier = (ctx: contexts.Csharp_identifierContext) => {
        this.setNodeValue(ctx, ctx.getText());
    }

    exitCSharpIdentifier = (ctx: contexts.CSharpIdentifierContext) => {
        const name = this.getNodeValue(ctx._name);
        this.setNodeValue(ctx, new csharp.CSharpIdentifierExpression(null, name));
    }

    exitCSharpChildIdentifier = (ctx: contexts.CSharpChildIdentifierContext) => {
        const parent = this.getNodeValue(ctx.parent);
        const name = this.getNodeValue(ctx._name);
        const child = new csharp.CSharpIdentifierExpression(parent, name);
        this.setNodeValue(ctx, child);
    }

    exitCSharpBooleanLiteral = (ctx: contexts.CSharpBooleanLiteralContext) => {
        this.setNodeValue(ctx, new csharp.CSharpBooleanLiteral(ctx.getText()));
    }


    exitCSharpIntegerLiteral = (ctx: contexts.CSharpIntegerLiteralContext) => {
        this.setNodeValue(ctx, new csharp.CSharpIntegerLiteral(ctx.getText()));
    }


    exitCSharpDecimalLiteral = (ctx: contexts.CSharpDecimalLiteralContext) => {
        this.setNodeValue(ctx, new csharp.CSharpDecimalLiteral(ctx.getText()));
    }


    exitCSharpCharacterLiteral = (ctx: contexts.CSharpCharacterLiteralContext) => {
        this.setNodeValue(ctx, new csharp.CSharpCharacterLiteral(ctx.getText()));
    }


    exitCSharpTextLiteral = (ctx: contexts.CSharpTextLiteralContext) => {
        this.setNodeValue(ctx, new csharp.CSharpTextLiteral(ctx.getText()));
    }


    exitCSharpCategoryBinding = (ctx: contexts.CSharpCategoryBindingContext) => {
        const binding = this.getNodeValue(ctx.binding);
        this.setNodeValue(ctx, new csharp.CSharpNativeCategoryBinding(binding));
    }

    exitCsharp_primary_expression = (ctx: contexts.Csharp_primary_expressionContext) => {
        const value = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, value);
    }

    exitCsharp_this_expression = (ctx: contexts.Csharp_this_expressionContext) => {
        this.setNodeValue(ctx, new csharp.CSharpThisExpression());
    }

    exitCsharp_method_expression = (ctx: contexts.Csharp_method_expressionContext) => {
        const name = this.getNodeValue(ctx._name);
        const args = this.getNodeValue(ctx.args);
        this.setNodeValue(ctx, new csharp.CSharpMethodExpression(name, args));
    }

    exitCSharpMethodExpression = (ctx: contexts.CSharpMethodExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitCSharpArgumentList = (ctx: contexts.CSharpArgumentListContext) => {
        const item = this.getNodeValue(ctx.item);
        this.setNodeValue(ctx, new csharp.CSharpExpressionList(item));
    }

    exitCSharpArgumentListItem = (ctx: contexts.CSharpArgumentListItemContext) => {
        const item = this.getNodeValue(ctx.item);
        const items = this.getNodeValue(ctx.items);
        items.add(item);
        this.setNodeValue(ctx, items);
    }

    exitCSharpNativeStatement = (ctx: contexts.CSharpNativeStatementContext) => {
        const stmt = this.getNodeValue(ctx.csharp_statement());
        const call = new csharp.CSharpNativeCall(stmt);
        this.setNodeValue(ctx, call);
    }

    exitCSharpPromptoIdentifier = (ctx: contexts.CSharpPromptoIdentifierContext) => {
        const name = ctx.DOLLAR_IDENTIFIER().getText();
        this.setNodeValue(ctx, new csharp.CSharpIdentifierExpression(null, name));
    }

    exitCSharpPrimaryExpression = (ctx: contexts.CSharpPrimaryExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitCSharpSelectorExpression = (ctx: contexts.CSharpSelectorExpressionContext) => {
        const parent = this.getNodeValue(ctx.parent);
        const child = this.getNodeValue(ctx.child);
        child.parent = parent;
        this.setNodeValue(ctx, child);
    }

    exitCSharpStatement = (ctx: contexts.CSharpStatementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        const stmt = new csharp.CSharpStatement(exp, false);
        this.setNodeValue(ctx, stmt);
    }

    exitCSharpReturnStatement = (ctx: contexts.CSharpReturnStatementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new csharp.CSharpStatement(exp, true));
    }


    exitPythonStatement = (ctx: contexts.PythonStatementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new python.PythonStatement(exp, false));
    }

    exitPythonReturnStatement = (ctx: contexts.PythonReturnStatementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new python.PythonStatement(exp, true));
    }

    exitPython2CategoryBinding = (ctx: contexts.Python2CategoryBindingContext) => {
        const map = this.getNodeValue(ctx.binding);
        this.setNodeValue(ctx, new python.Python2NativeCategoryBinding(map));
    }


    exitPython3CategoryBinding = (ctx: contexts.Python3CategoryBindingContext) => {
        const map = this.getNodeValue(ctx.binding);
        this.setNodeValue(ctx, new python.Python3NativeCategoryBinding(map));
    }


    exitPython_category_binding = (ctx: contexts.Python_category_bindingContext) => {
        const identifier = ctx.identifier().getText();
        const module = this.getNodeValue(ctx.python_module()) || null;
        const map = new python.PythonNativeCategoryBinding(identifier, module);
        this.setNodeValue(ctx, map);
    }

    exitPython_method_expression = (ctx: contexts.Python_method_expressionContext) => {
        const name = this.getNodeValue(ctx._name);
        const args = this.getNodeValue(ctx.args);
        const method = new python.PythonMethodExpression(name, args);
        this.setNodeValue(ctx, method);
    }

    exitPythonGlobalMethodExpression = (ctx: contexts.PythonGlobalMethodExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitPythonMethodExpression = (ctx: contexts.PythonMethodExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitPython_module = (ctx: contexts.Python_moduleContext) => {
        const ids = ctx.python_identifier().map(rule => rule.getText());
        const module = new python.PythonModule(ids);
        this.setNodeValue(ctx, module);
    }

    exitPython2NativeStatement = (ctx: contexts.Python2NativeStatementContext) => {
        const stmt = this.getNodeValue(ctx.python_native_statement());
        this.setNodeValue(ctx, new python.Python2NativeCall(stmt));
    }


    exitPython3NativeStatement = (ctx: contexts.Python3NativeStatementContext) => {
        const stmt = this.getNodeValue(ctx.python_native_statement());
        this.setNodeValue(ctx, new python.Python3NativeCall(stmt));
    }

    exitPython_native_statement = (ctx: contexts.Python_native_statementContext) => {
        const stmt = this.getNodeValue(ctx.python_statement());
        const module = this.getNodeValue(ctx.python_module());
        stmt.module = module || null;
        this.setNodeValue(ctx, new python.PythonNativeCall(stmt));
    }

    exitPython_identifier = (ctx: contexts.Python_identifierContext) => {
        this.setNodeValue(ctx, ctx.getText());
    }

    exitPythonIdentifier = (ctx: contexts.PythonIdentifierContext) => {
        const name = this.getNodeValue(ctx._name);
        this.setNodeValue(ctx, new python.PythonIdentifierExpression(null, name));
    }

    exitPythonIdentifierExpression = (ctx: contexts.PythonIdentifierExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitPythonChildIdentifier = (ctx: contexts.PythonChildIdentifierContext) => {
        const parent = this.getNodeValue(ctx.parent);
        const name = this.getNodeValue(ctx._name);
        const child = new python.PythonIdentifierExpression(parent, name);
        this.setNodeValue(ctx, child);
    }


    exitPythonBooleanLiteral = (ctx: contexts.PythonBooleanLiteralContext) => {
        this.setNodeValue(ctx, new python.PythonBooleanLiteral(ctx.getText()));
    }

    exitPythonIntegerLiteral = (ctx: contexts.PythonIntegerLiteralContext) => {
        this.setNodeValue(ctx, new python.PythonIntegerLiteral(ctx.getText()));
    }


    exitPythonDecimalLiteral = (ctx: contexts.PythonDecimalLiteralContext) => {
        this.setNodeValue(ctx, new python.PythonDecimalLiteral(ctx.getText()));
    }


    exitPythonCharacterLiteral = (ctx: contexts.PythonCharacterLiteralContext) => {
        this.setNodeValue(ctx, new python.PythonCharacterLiteral(ctx.getText()));
    }


    exitPythonTextLiteral = (ctx: contexts.PythonTextLiteralContext) => {
        this.setNodeValue(ctx, new python.PythonTextLiteral(ctx.getText()));
    }

    exitPythonLiteralExpression = (ctx: contexts.PythonLiteralExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitPythonPromptoIdentifier = (ctx: contexts.PythonPromptoIdentifierContext) => {
        const name = ctx.DOLLAR_IDENTIFIER().getText();
        this.setNodeValue(ctx, new python.PythonIdentifierExpression(null, name));
    }

    exitPythonPrimaryExpression = (ctx: contexts.PythonPrimaryExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitPythonArgumentList = (ctx: contexts.PythonArgumentListContext) => {
        const ordinal = this.getNodeValue(ctx.ordinal);
        const named = this.getNodeValue(ctx.named);
        ordinal.addAll(named);
        this.setNodeValue(ctx, ordinal);
    }


    exitPythonNamedOnlyArgumentList = (ctx: contexts.PythonNamedOnlyArgumentListContext) => {
        const named = this.getNodeValue(ctx.named);
        this.setNodeValue(ctx, named);
    }

    exitPythonNamedArgumentList = (ctx: contexts.PythonNamedArgumentListContext) => {
        const name = this.getNodeValue(ctx._name);
        const exp = this.getNodeValue(ctx.exp);
        const arg = new python.PythonNamedArgument(name, exp);
        this.setNodeValue(ctx, new python.PythonArgumentList(arg));
    }

    exitPythonNamedArgumentListItem = (ctx: contexts.PythonNamedArgumentListItemContext) => {
        const name = this.getNodeValue(ctx._name);
        const exp = this.getNodeValue(ctx.exp);
        const arg = new python.PythonNamedArgument(name, exp);
        const items = this.getNodeValue(ctx.items);
        items.add(arg);
        this.setNodeValue(ctx, items);
    }

    exitPythonOrdinalOnlyArgumentList = (ctx: contexts.PythonOrdinalOnlyArgumentListContext) => {
        const ordinal = this.getNodeValue(ctx.ordinal);
        this.setNodeValue(ctx, ordinal);
    }

    exitPythonOrdinalArgumentList = (ctx: contexts.PythonOrdinalArgumentListContext) => {
        const item = this.getNodeValue(ctx.item);
        const arg = new python.PythonOrdinalArgument(item);
        this.setNodeValue(ctx, new python.PythonArgumentList(arg));
    }

    exitPythonOrdinalArgumentListItem = (ctx: contexts.PythonOrdinalArgumentListItemContext) => {
        const item = this.getNodeValue(ctx.item);
        const arg = new python.PythonOrdinalArgument(item);
        const items = this.getNodeValue(ctx.items);
        items.add(arg);
        this.setNodeValue(ctx, items);
    }

    exitPythonSelectorExpression = (ctx: contexts.PythonSelectorExpressionContext) => {
        const parent = this.getNodeValue(ctx.parent);
        const selector = this.getNodeValue(ctx.child);
        selector.parent = parent;
        this.setNodeValue(ctx, selector);
    }

    exitPythonSelfExpression = (ctx: contexts.PythonSelfExpressionContext) => {
        this.setNodeValue(ctx, new python.PythonSelfExpression());
    }


    exitJsxChild = (ctx: contexts.JsxChildContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.jsx));
    }


    exitJsxCode = (ctx: contexts.JsxCodeContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new jsx.JsxCode(exp));
    }


    exitJsxExpression = (ctx: contexts.JsxExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
    }


    exitJsxElement = (ctx: contexts.JsxElementContext) => {
        const elem = this.getNodeValue(ctx.opening);
        const closing = this.getNodeValue(ctx.closing);
        elem.setClosing(closing);
        const children = this.getNodeValue(ctx.children_);
        elem.setChildren(children);
        this.setNodeValue(ctx, elem);
    }


    exitJsxSelfClosing = (ctx: contexts.JsxSelfClosingContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.jsx));
    }


    exitJsxText = (ctx: contexts.JsxTextContext) => {
        const text = parser.getFullText(ctx.text);
        this.setNodeValue(ctx, new jsx.JsxText(text));
    }


    exitJsxValue = (ctx: contexts.JsxValueContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new jsx.JsxExpression(exp));
    }


    exitJsx_attribute = (ctx: contexts.Jsx_attributeContext) => {
        const name = this.getNodeValue(ctx._name);
        const value = this.getNodeValue(ctx.value);
        const suite = this.getWhiteSpacePlus(ctx.ws_plus());
        this.setNodeValue(ctx, new jsx.JsxProperty(name, value, suite));
    }


    exitJsx_children = (ctx: contexts.Jsx_childrenContext) => {
        const list = ctx.jsx_child().map(function (cx) {
            return this.getNodeValue(cx);
        }, this);
        this.setNodeValue(ctx, list);
    }


    exitJsx_element_name = (ctx: contexts.Jsx_element_nameContext) => {
        const name = ctx.getText();
        this.setNodeValue(ctx, new grammar.Identifier(name));
    }


    exitJsx_expression = (ctx: contexts.Jsx_expressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.getChild(0)));
    }


    exitJsx_identifier = (ctx: contexts.Jsx_identifierContext) => {
        const name = ctx.getText();
        this.setNodeValue(ctx, new grammar.Identifier(name));
    }


    exitJsx_fragment = (ctx: contexts.Jsx_fragmentContext) => {
        const openingSuite = this.getWhiteSpacePlus(ctx.ws_plus(0));
        const fragment = new jsx.JsxFragment(openingSuite);
        fragment.children = this.getNodeValue(ctx.children_);
        this.setNodeValue(ctx, fragment);
    }


    exitJsxLiteral = (ctx: contexts.JsxLiteralContext) => {
        const text = ctx.getText();
        this.setNodeValue(ctx, new jsx.JsxLiteral(text));
    }


    exitJsx_opening = (ctx: contexts.Jsx_openingContext) => {
        const name = this.getNodeValue(ctx._name);
        const nameSuite = this.getWhiteSpacePlus(ctx.ws_plus());
        const attributes = ctx.jsx_attribute()
            .map(function (cx) {
                return this.getNodeValue(cx);
            }, this);
        this.setNodeValue(ctx, new jsx.JsxElement(name, nameSuite, attributes, null));
    }


    exitJsx_closing = (ctx: contexts.Jsx_closingContext) => {
        const name = this.getNodeValue(ctx._name);
        this.setNodeValue(ctx, new jsx.JsxClosing(name, null));
    }


    exitJsx_self_closing = (ctx: contexts.Jsx_self_closingContext) => {
        const name = this.getNodeValue(ctx._name);
        const nameSuite = this.getWhiteSpacePlus(ctx.ws_plus());
        const attributes = ctx.jsx_attribute()
            .map(function (cx) {
                return this.getNodeValue(cx);
            }, this);
        this.setNodeValue(ctx, new jsx.JsxSelfClosing(name, nameSuite, attributes, null));
    }


    exitCssExpression = (ctx: contexts.CssExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
    }


    exitCss_expression = (ctx: contexts.Css_expressionContext) => {
        const exp = new css.CssExpression();
        ctx.css_field().forEach(function (cx) {
            const field = this.getNodeValue(cx);
            exp.addField(field);
        }, this);
        this.setNodeValue(ctx, exp);
    }


    exitCss_field = (ctx: contexts.Css_fieldContext) => {
        const name = ctx.name.getText();
        const values = ctx.css_value().map(x => this.getNodeValue(x), this);
        this.setNodeValue(ctx, new css.CssField(name, values));
    }


    exitCssText = (ctx: contexts.CssTextContext) => {
        const text = this.input.getText({start: ctx.text.start, stop: ctx.text.stop});
        this.setNodeValue(ctx, new css.CssText(text));
    }


    exitCssValue = (ctx: contexts.CssValueContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new css.CssCode(exp));
    }


    buildSection(node, section) {
        if(!section.dialect) {
            const first = this.findFirstValidToken(node.start.tokenIndex, section instanceof jsx.JsxText);
            const last = this.findLastValidToken(node.stop.tokenIndex, section instanceof jsx.JsxText);
            section.setSectionFrom(this.path, first, last, parser.Dialect.E);
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
        if (text !== null && (allowWS || text.replace(/(\n|\r|\t| )/g, "").length > 0)) {
            return token;
        } else {
            return null;
        }
    }

}
