import OParserListener from './OParserListener.js';
import OLexer from './OLexer.js';
import * as parser from './index.ts';
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

export default class OPromptoBuilder extends OParserListener {

    constructor(parser) {
        super();
        this.input = parser.getTokenStream();
        this.path = parser.path;
        this.nodeValues = {}
        this.nextNodeId = 0;
    }


    setNodeValue(node, value) {
        if (node["%id"] == undefined)
            node["%id"] = this.nextNodeId++;
        this.nodeValues[node["%id"]] = value;
        if (value instanceof parser.Section) {
            this.buildSection(node, value);
        }
    }


    getNodeValue(node) {
        if (node == null || node == undefined || node["%id"] == null || node["%id"] == undefined)
            return null;
        else
            return this.nodeValues[node["%id"]];
    }


    getHiddenTokensBeforeNode(node) {
        return node ? this.getHiddenTokensBeforeToken(node.symbol) : null;
    }


    getHiddenTokensBeforeToken(token) {
        return this.getHiddenTokens(token, this.input.getHiddenTokensToLeft);
    }


    getHiddenTokensAfterNode(node) {
        return node ? this.getHiddenTokensAfterToken(node.symbol) : null;
    }


    getHiddenTokensAfterToken(token) {
        return this.getHiddenTokens(token, this.input.getHiddenTokensToRight);
    }


    getHiddenTokens(token, fetcher) {
        if (token.tokenIndex < 0)
            return null;
        fetcher = fetcher.bind(this.input);
        const hidden = fetcher(token.tokenIndex);
        if (hidden == null || hidden.length == 0)
            return null;
        else
            return hidden.map(token => token.text).join("");
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

    exitSelectableExpression = (ctx: SelectableExpressionContext) => {
        const e = this.getNodeValue(ctx.parent);
        this.setNodeValue(ctx, e);
    }

    exitSelectorExpression = (ctx: SelectorExpressionContext) => {
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

    exitSet_literal = (ctx: Set_literalContext) => {
        const items = this.getNodeValue(ctx.expression_list());
        const set_ = new literal.SetLiteral(items);
        this.setNodeValue(ctx, set_);
    }

    exitStoreStatement = (ctx: StoreStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.stmt));
    }

    exitStore_statement = (ctx: Store_statementContext) => {
        const del = this.getNodeValue(ctx.to_del);
        const add = this.getNodeValue(ctx.to_add);
        const meta = this.getNodeValue(ctx.with_meta);
        const stmts = this.getNodeValue(ctx.stmts);
        const stmt = new statement.DeleteAndStoreStatement(del, add, meta, stmts);
        this.setNodeValue(ctx, stmt);
    }

    exitAtomicLiteral = (ctx: AtomicLiteralContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitCollectionLiteral = (ctx: CollectionLiteralContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitCommentStatement = (ctx: CommentStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.comment_statement()));
    }

    exitComment_statement = (ctx: Comment_statementContext) => {
        this.setNodeValue(ctx, new statement.CommentStatement(ctx.getText()));
    }

    exitListLiteral = (ctx: ListLiteralContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitBlob_expression = (ctx: Blob_expressionContext) => {
        const exp = this.getNodeValue(ctx.expression());
        this.setNodeValue(ctx, new expression.BlobExpression(exp));
    }

   exitBooleanLiteral = (ctx: BooleanLiteralContext) => {
        this.setNodeValue(ctx, new literal.BooleanLiteral(ctx.getText()));
    }

    exitBreakStatement = (ctx: BreakStatementContext) => {
        this.setNodeValue(ctx, new statement.BreakStatement());
    }

    exitMinIntegerLiteral = (ctx: MinIntegerLiteralContext) => {
        this.setNodeValue(ctx, new literal.MinIntegerLiteral());
    }

    exitMaxIntegerLiteral = (ctx: MaxIntegerLiteralContext) => {
        this.setNodeValue(ctx, new literal.MaxIntegerLiteral());
    }

    exitInclude_list = (ctx: Include_listContext) => {
        const include = ctx.variable_identifier().map(c => this.getNodeValue(c), this);
        this.setNodeValue(ctx, include)
    }

    exitIntegerLiteral = (ctx: IntegerLiteralContext) => {
        this.setNodeValue(ctx, new literal.IntegerLiteral(ctx.getText()));
    }

    exitDecimalLiteral = (ctx: DecimalLiteralContext) => {
        this.setNodeValue(ctx, new literal.DecimalLiteral(ctx.getText()));
    }

    exitHexadecimalLiteral = (ctx: HexadecimalLiteralContext) => {
        this.setNodeValue(ctx, new literal.HexaLiteral(ctx.getText()));
    }

    exitCharacterLiteral = (ctx: CharacterLiteralContext) => {
        this.setNodeValue(ctx, new literal.CharacterLiteral(ctx.getText()));
    }

    exitDateLiteral = (ctx: DateLiteralContext) => {
        this.setNodeValue(ctx, new literal.DateLiteral(ctx.getText()));
    }

    exitDateTimeLiteral = (ctx: DateTimeLiteralContext) => {
        this.setNodeValue(ctx, new literal.DateTimeLiteral(ctx.getText()));
    }

    exitDbIdType = (ctx: DbIdTypeContext) => {
        this.setNodeValue(ctx, type.DbIdType.instance);
    }

    exitTernaryExpression = (ctx: TernaryExpressionContext) => {
        const condition = this.getNodeValue(ctx.test);
        const ifTrue = this.getNodeValue(ctx.ifTrue);
        const ifFalse = this.getNodeValue(ctx.ifFalse);
        const exp = new expression.TernaryExpression(condition, ifTrue, ifFalse);
        this.setNodeValue(ctx, exp);
    }

    exitTest_method_declaration = (ctx: Test_method_declarationContext) => {
        const name = new grammar.Identifier(ctx.name.text);
        name.setSectionFrom(this.path, ctx.name, ctx.name, parser.Dialect.O);
        const stmts = this.getNodeValue(ctx.stmts);
        const exps = this.getNodeValue(ctx.exps);
        const errorName = this.getNodeValue(ctx.error);
        const error = errorName == null ? null : new expression.SymbolExpression(errorName);
        this.setNodeValue(ctx, new declaration.TestMethodDeclaration(name, stmts, exps, error));
    }


    exitTextLiteral = (ctx: TextLiteralContext) => {
        this.setNodeValue(ctx, new literal.TextLiteral(ctx.getText()));
    }


    exitTimeLiteral = (ctx: TimeLiteralContext) => {
        this.setNodeValue(ctx, new literal.TimeLiteral(ctx.getText()));
    }


    exitPeriodLiteral = (ctx: PeriodLiteralContext) => {
        this.setNodeValue(ctx, new literal.PeriodLiteral(ctx.getText()));
    }


    exitPeriodType = (ctx: PeriodTypeContext) => {
        this.setNodeValue(ctx, type.PeriodType.instance);
    }


    exitVersionLiteral = (ctx: VersionLiteralContext) => {
        this.setNodeValue(ctx, new literal.VersionLiteral(ctx.getText()));
    }


    exitVersionType = (ctx: VersionTypeContext) => {
        this.setNodeValue(ctx, type.VersionType.instance);
    }


    exitAttribute_identifier = (ctx: Attribute_identifierContext) => {
        const name = new grammar.Identifier(ctx.getText());
        this.setNodeValue(ctx, name);
    }


    exitVariable_identifier = (ctx: Variable_identifierContext) => {
        const name = new grammar.Identifier(ctx.getText());
        this.setNodeValue(ctx, name);
    }


    exitList_literal = (ctx: List_literalContext) => {
        const mutable = ctx.MUTABLE() != null;
        const items = this.getNodeValue(ctx.expression_list()) || null;
        const value = new literal.ListLiteral(mutable, items);
        this.setNodeValue(ctx, value);
    }


    exitDict_literal = (ctx: Dict_literalContext) => {
        const mutable = ctx.MUTABLE() != null;
        const items = this.getNodeValue(ctx.dict_entry_list()) || null;
        const value = new literal.DictLiteral(mutable, items);
        this.setNodeValue(ctx, value);
    }


    exitTuple_literal = (ctx: Tuple_literalContext) => {
        const mutable = ctx.MUTABLE() != null;
        const items = this.getNodeValue(ctx.expression_tuple()) || null;
        const value = new literal.TupleLiteral(mutable, items);
        this.setNodeValue(ctx, value);
    }


    exitRange_literal = (ctx: Range_literalContext) => {
        const low = this.getNodeValue(ctx.low);
        const high = this.getNodeValue(ctx.high);
        this.setNodeValue(ctx, new literal.RangeLiteral(low, high));
    }


    exitRangeLiteral = (ctx: RangeLiteralContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitDict_entry_list = (ctx: Dict_entry_listContext) => {
        const items = new literal.DictEntryList(null, null);
        ctx.dict_entry().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitDict_entry = (ctx: Dict_entryContext) => {
        const key = this.getNodeValue(ctx.key);
        const value = this.getNodeValue(ctx.value);
        const entry = new literal.DictEntry(key, value);
        this.setNodeValue(ctx, entry);
    }


    exitDoc_entry_list = (ctx: Doc_entry_listContext) => {
        const items = new literal.DocEntryList(null, null);
        ctx.doc_entry().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitDoc_entry = (ctx: Doc_entryContext) => {
        const key = this.getNodeValue(ctx.key);
        const value = this.getNodeValue(ctx.value);
        const entry = new literal.DocEntry(key, value);
        this.setNodeValue(ctx, entry);
    }


    exitDocKeyIdentifier = (ctx: DocKeyIdentifierContext) => {
        const text = ctx.name.getText();
        this.setNodeValue(ctx, new literal.IDocIdentifierKey(new grammar.Identifier(text)));
    }


    exitDocKeyText = (ctx: DocKeyTextContext) => {
        const text = ctx.name.text;
        this.setNodeValue(ctx, new literal.DocTextKey(text));
    }


    exitLiteral_expression = (ctx: Literal_expressionContext) => {
        const exp = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, exp);
    }


    exitLiteralExpression = (ctx: LiteralExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitIdentifierExpression = (ctx: IdentifierExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitVariableIdentifier = (ctx: VariableIdentifierContext) => {
        const id = this.getNodeValue(ctx.variable_identifier());
        this.setNodeValue(ctx, new expression.InstanceExpression(id));
    }


    exitInstanceExpression = (ctx: InstanceExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitSymbol_identifier = (ctx: Symbol_identifierContext) => {
        const name = new grammar.Identifier(ctx.getText());
        this.setNodeValue(ctx, name);
    }


    exitNative_symbol = (ctx: Native_symbolContext) => {
        const name = this.getNodeValue(ctx.name);
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new expression.NativeSymbol(name, exp));
    }


    exitTypeIdentifier = (ctx: TypeIdentifierContext) => {
        const name = this.getNodeValue(ctx.type_identifier());
        this.setNodeValue(ctx, new expression.UnresolvedIdentifier(name));
    }


    exitSymbolIdentifier = (ctx: SymbolIdentifierContext) => {
        const name = this.getNodeValue(ctx.symbol_identifier());
        this.setNodeValue(ctx, new expression.SymbolExpression(name));
    }


    exitSymbolLiteral = (ctx: SymbolLiteralContext) => {
        const name = ctx.getText();
        this.setNodeValue(ctx, new expression.SymbolExpression(new grammar.Identifier(name)));
    }


    exitBlobType = (ctx: BlobTypeContext) => {
        this.setNodeValue(ctx, type.BlobType.instance);
    }


    exitBooleanType = (ctx: BooleanTypeContext) => {
        this.setNodeValue(ctx, type.BooleanType.instance);
    }


    exitCharacterType = (ctx: CharacterTypeContext) => {
        this.setNodeValue(ctx, type.CharacterType.instance);
    }


    exitImageType = (ctx: ImageTypeContext) => {
        this.setNodeValue(ctx, type.ImageType.instance);
    }


    exitTextType = (ctx: TextTypeContext) => {
        this.setNodeValue(ctx, type.TextType.instance);
    }


    exitHtmlType = (ctx: HtmlTypeContext) => {
        this.setNodeValue(ctx, type.HtmlType.instance);
    }


    exitThisExpression = (ctx: ThisExpressionContext) => {
        this.setNodeValue(ctx, new expression.ThisExpression());
    }


    exitIntegerType = (ctx: IntegerTypeContext) => {
        this.setNodeValue(ctx, type.IntegerType.instance);
    }


    exitDecimalType = (ctx: DecimalTypeContext) => {
        this.setNodeValue(ctx, type.DecimalType.instance);
    }


    exitDateType = (ctx: DateTypeContext) => {
        this.setNodeValue(ctx, type.DateType.instance);
    }


    exitDateTimeType = (ctx: DateTimeTypeContext) => {
        this.setNodeValue(ctx, type.DateTimeType.instance);
    }


    exitTimeType = (ctx: TimeTypeContext) => {
        this.setNodeValue(ctx, type.TimeType.instance);
    }


    exitCodeType = (ctx: CodeTypeContext) => {
        this.setNodeValue(ctx, type.CodeType.instance);
    }


    exitPrimaryType = (ctx: PrimaryTypeContext) => {
        const type = this.getNodeValue(ctx.p);
        this.setNodeValue(ctx, type);
    }


    exitAttribute_declaration = (ctx: Attribute_declarationContext) => {
        const id = this.getNodeValue(ctx.name);
        const type = this.getNodeValue(ctx.typ);
        const match = this.getNodeValue(ctx.match);
        let indices = null;
        if (ctx.indices != null)
            indices = indices = this.getNodeValue(ctx.indices);
        else if (ctx.INDEX() != null)
            indices = new grammar.IdentifierList();
        const decl = new declaration.AttributeDeclaration(id, type, match, indices);
        decl.storable = ctx.STORABLE() != null;
        this.setNodeValue(ctx, decl);
    }


    exitNativeType = (ctx: NativeTypeContext) => {
        const type = this.getNodeValue(ctx.n);
        this.setNodeValue(ctx, type);
    }


    exitCategoryType = (ctx: CategoryTypeContext) => {
        const type = this.getNodeValue(ctx.c);
        this.setNodeValue(ctx, type);
    }


    exitCategory_type = (ctx: Category_typeContext) => {
        const name = new grammar.Identifier(ctx.getText());
        this.buildSection(ctx, name);
        this.setNodeValue(ctx, new type.CategoryType(name));
    }


    exitListType = (ctx: ListTypeContext) => {
        const typ = this.getNodeValue(ctx.l);
        this.setNodeValue(ctx, new type.ListType(typ));
    }


    exitDictKeyIdentifier = (ctx: DictKeyIdentifierContext) => {
        const text = ctx.name.getText();
        this.setNodeValue(ctx, new literal.DictIdentifierKey(new grammar.Identifier(text)));
    }

    exitDictKeyText = (ctx: DictKeyTextContext) => {
        const text = ctx.name.text;
        this.setNodeValue(ctx, new literal.DictTextKey(text));
    }

    exitDictType = (ctx: DictTypeContext) => {
        const typ = this.getNodeValue(ctx.d);
        this.setNodeValue(ctx, new type.DictionaryType(typ));
    }


    exitAttribute_identifier_list = (ctx: Attribute_identifier_listContext) => {
        const list = new grammar.IdentifierList();
        const rules = ctx.attribute_identifier();
        rules.forEach(function (rule) {
            const item = this.getNodeValue(rule);
            list.add(item);
        }, this);
        this.setNodeValue(ctx, list);
    }


    exitVariable_identifier_list = (ctx: Variable_identifier_listContext) => {
        const list = new grammar.IdentifierList();
        const rules = ctx.variable_identifier();
        rules.forEach(function (rule) {
            const item = this.getNodeValue(rule);
            list.add(item);
        }, this);
        this.setNodeValue(ctx, list);
    }


    exitConcrete_category_declaration = (ctx: Concrete_category_declarationContext) => {
        const name = this.getNodeValue(ctx.name);
        const attrs = this.getNodeValue(ctx.attrs);
        const derived = this.getNodeValue(ctx.derived);
        const methods = this.getNodeValue(ctx.methods);
        const decl = new declaration.ConcreteCategoryDeclaration(name, attrs, derived, methods);
        decl.storable = ctx.STORABLE() != null;
        this.setNodeValue(ctx, decl);
    }


    exitConcrete_widget_declaration = (ctx: Concrete_widget_declarationContext) => {
        const name = this.getNodeValue(ctx.name);
        const derived = this.getNodeValue(ctx.derived);
        const methods = this.getNodeValue(ctx.methods);
        const decl = new declaration.ConcreteWidgetDeclaration(name, derived, methods);
        this.setNodeValue(ctx, decl);
    }


    exitConcreteCategoryDeclaration = (ctx: ConcreteCategoryDeclarationContext) => {
        const decl = this.getNodeValue(ctx.decl);
        this.setNodeValue(ctx, decl);
    }


    exitConcreteWidgetDeclaration = (ctx: ConcreteWidgetDeclarationContext) => {
        const decl = this.getNodeValue(ctx.decl);
        this.setNodeValue(ctx, decl);
    }


    exitNativeWidgetDeclaration = (ctx: NativeWidgetDeclarationContext) => {
        const decl = this.getNodeValue(ctx.decl);
        this.setNodeValue(ctx, decl);
    }


    exitDerivedList = (ctx: DerivedListContext) => {
        const item = this.getNodeValue(ctx.item);
        this.setNodeValue(ctx, new grammar.IdentifierList(item));
    }


    exitDerivedListItem = (ctx: DerivedListItemContext) => {
        const items = this.getNodeValue(ctx.items);
        const item = this.getNodeValue(ctx.item);
        items.add(item);
        this.setNodeValue(ctx, items);
    }


    exitType_identifier = (ctx: Type_identifierContext) => {
        const name = new grammar.Identifier(ctx.getText());
        this.setNodeValue(ctx, name);
    }


    exitType_identifier_list = (ctx: Type_identifier_listContext) => {
        const items = new grammar.IdentifierList();
        ctx.type_identifier().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitType_literal = (ctx: Type_literalContext) => {
        const typ = this.getNodeValue(ctx.category_or_any_type());
        this.setNodeValue(ctx, new literal.TypeLiteral(typ));
    }


    exitTypeLiteral = (ctx: TypeLiteralContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.type_literal()));
    }


    exitTypeType = (ctx: TypeTypeContext) => {
        const typ = this.getNodeValue(ctx.t);
        this.setNodeValue(ctx, new type.TypeType(typ));
    }


    exitMember_identifier = (ctx: Member_identifierContext) => {
        const name = new grammar.Identifier(ctx.getText());
        this.setNodeValue(ctx, name);
    }


    exitMemberSelector = (ctx: MemberSelectorContext) => {
        const name = this.getNodeValue(ctx.name);
        this.setNodeValue(ctx, new expression.MemberSelector(null, name));
    }

    exitAn_expression = (ctx: An_expressionContext) => {
        const typ = this.getNodeValue(ctx.typ);
        this.setNodeValue(ctx, typ);
    }

    exitIsAnExpression = (ctx: IsAnExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const type = this.getNodeValue(ctx.right);
        const right = new expression.TypeExpression(type);
        const op = ctx.NOT() ? grammar.EqOp.IS_NOT_A : grammar.EqOp.IS_A;
        this.setNodeValue(ctx, new expression.EqualsExpression(left, op, right))
    }

    exitIsExpression = (ctx: IsExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        const op = ctx.NOT() ? grammar.EqOp.IS_NOT : grammar.EqOp.IS;
        this.setNodeValue(ctx, new expression.EqualsExpression(left, op, right));
    }

    exitItemSelector = (ctx: ItemSelectorContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new expression.ItemSelector(null, exp));
    }


    exitSliceSelector = (ctx: SliceSelectorContext) => {
        const slice = this.getNodeValue(ctx.xslice);
        this.setNodeValue(ctx, slice);
    }


    exitTyped_argument = (ctx: Typed_argumentContext) => {
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


    exitCodeArgument = (ctx: CodeArgumentContext) => {
        const arg = this.getNodeValue(ctx.arg);
        this.setNodeValue(ctx, arg);
    }


    exitArgument_list = (ctx: Argument_listContext) => {
        const items = new param.ParameterList();
        ctx.argument().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitExpressionAssignmentList = (ctx: ExpressionAssignmentListContext) => {
        const exp = this.getNodeValue(ctx.exp);
        const assign = new grammar.Argument(null, exp);
        if(exp instanceof parser.Section)
            assign.copySectionFrom(exp);
        this.setNodeValue(ctx, new grammar.ArgumentList([assign]));
    }


    exitArgument_assignment = (ctx: Argument_assignmentContext) => {
        const name = this.getNodeValue(ctx.name);
        const exp = this.getNodeValue(ctx.exp);
        const arg = new param.UnresolvedParameter(name);
        this.setNodeValue(ctx, new grammar.Argument(arg, exp));
    }


    exitArgumentAssignmentList = (ctx: ArgumentAssignmentListContext) => {
        const item = this.getNodeValue(ctx.item);
        this.setNodeValue(ctx, new grammar.ArgumentList([item]));
    }


    exitArgumentAssignmentListItem = (ctx: ArgumentAssignmentListItemContext) => {
        const item = this.getNodeValue(ctx.item);
        const items = this.getNodeValue(ctx.items);
        items.add(item);
        this.setNodeValue(ctx, items);
    }


    exitArrow_prefix = (ctx: Arrow_prefixContext) => {
        const args = this.getNodeValue(ctx.arrow_args());
        const argsSuite = this.getHiddenTokensBeforeNode(ctx.EGT());
        const arrowSuite = this.getHiddenTokensAfterNode(ctx.EGT());
        this.setNodeValue(ctx, new expression.ArrowExpression(args, argsSuite, arrowSuite));
    }


    exitArrowExpression = (ctx: ArrowExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
    }


    exitArrowExpressionBody = (ctx: ArrowExpressionBodyContext) => {
        const arrow = this.getNodeValue(ctx.arrow_prefix());
        const exp = this.getNodeValue(ctx.expression());
        arrow.setExpression(exp);
        this.setNodeValue(ctx, arrow);
    }


    exitArrowListArg = (ctx: ArrowListArgContext) => {
        const list = this.getNodeValue(ctx.variable_identifier_list());
        this.setNodeValue(ctx, list);
    }


    exitArrowSingleArg = (ctx: ArrowSingleArgContext) => {
        const arg = this.getNodeValue(ctx.variable_identifier());
        this.setNodeValue(ctx, new grammar.IdentifierList(arg));
    }


    exitArrowStatementsBody = (ctx: ArrowStatementsBodyContext) => {
        const arrow = this.getNodeValue(ctx.arrow_prefix());
        const stmts = this.getNodeValue(ctx.statement_list());
        arrow.setStatements(stmts);
        this.setNodeValue(ctx, arrow);
    }


    exitMethod_call_expression = (ctx: Method_call_expressionContext) => {
        const name = this.getNodeValue(ctx.name);
        const caller = new expression.UnresolvedIdentifier(name);
        caller.copySectionFrom(name);
        const args = this.getNodeValue(ctx.args);
        this.setNodeValue(ctx, new statement.UnresolvedCall(caller, args));
    }


    exitMethod_call_statement = (ctx: Method_call_statementContext) => {
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


    exitMethodSelector = (ctx: MethodSelectorContext) => {
        const call = this.getNodeValue(ctx.method);
        if (call.callable instanceof expression.UnresolvedIdentifier) {
            const callable = new expression.UnresolvedSelector(null, call.callable.id);
            callable.copySectionFrom(call.callable);
            call.callable = callable;
        }
        this.setNodeValue(ctx, call);
    }


    exitAddExpression = (ctx: AddExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        const exp = ctx.op.type == parser.OParser.PLUS ?
            new expression.PlusExpression(left, right) :
            new expression.SubtractExpression(left, right);
        this.setNodeValue(ctx, exp);
    }


    exitMember_method_declaration_list = (ctx: Member_method_declaration_listContext) => {
        const items = new grammar.MethodDeclarationList();
        ctx.member_method_declaration().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitNative_member_method_declaration_list = (ctx: Native_member_method_declaration_listContext) => {
        const items = new grammar.MethodDeclarationList();
        ctx.native_member_method_declaration().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitEmptyCategoryMethodList = (ctx: EmptyCategoryMethodListContext) => {
        this.setNodeValue(ctx, new grammar.MethodDeclarationList);
    }


    exitCurlyCategoryMethodList = (ctx: CurlyCategoryMethodListContext) => {
        const items = this.getNodeValue(ctx.items);
        this.setNodeValue(ctx, items);
    }


    exitSetter_method_declaration = (ctx: Setter_method_declarationContext) => {
        const name = this.getNodeValue(ctx.name);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new declaration.SetterMethodDeclaration(name, stmts));
    }


    exitSetType = (ctx: SetTypeContext) => {
        const typ = this.getNodeValue(ctx.s);
        this.setNodeValue(ctx, new type.SetType(typ));
    }


    exitGetter_method_declaration = (ctx: Getter_method_declarationContext) => {
        const name = this.getNodeValue(ctx.name);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new declaration.GetterMethodDeclaration(name, stmts));
    }

    exitNative_setter_declaration = (ctx: Native_setter_declarationContext) => {
        const name = this.getNodeValue(ctx.name);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new declaration.NativeSetterMethodDeclaration(name, stmts));
    }


    exitNative_getter_declaration = (ctx: Native_getter_declarationContext) => {
        const name = this.getNodeValue(ctx.name);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new declaration.NativeGetterMethodDeclaration(name, stmts));
    }


    exitMember_method_declaration = (ctx: Member_method_declarationContext) => {
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

    exitConcreteMemberMethod = (ctx: ConcreteMemberMethodContext) => {
        const decl = this.getNodeValue(ctx.decl);
        this.setNodeValue(ctx, decl);
    }

    exitSingleStatement = (ctx: SingleStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, new statement.StatementList(stmt));
    }


    exitCurlyStatementList = (ctx: CurlyStatementListContext) => {
        const items = this.getNodeValue(ctx.items);
        this.setNodeValue(ctx, items);
    }


    exitStatement_list = (ctx: Statement_listContext) => {
        const items = new statement.StatementList();
        ctx.statement().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitAbstract_global_method_declaration = (ctx: Abstract_global_method_declarationContext) => {
        const typ = this.getNodeValue(ctx.typ);
        if (typ instanceof type.CategoryType)
            typ.mutable = ctx.MUTABLE() != null;
        const name = this.getNodeValue(ctx.name);
        const args = this.getNodeValue(ctx.args);
        this.setNodeValue(ctx, new declaration.AbstractMethodDeclaration(name, args, typ));
    }

    exitAbstract_member_method_declaration = (ctx: Abstract_member_method_declarationContext) => {
        const typ = this.getNodeValue(ctx.typ);
        if (typ instanceof type.CategoryType)
            typ.mutable = ctx.MUTABLE() != null;
        const name = this.getNodeValue(ctx.name);
        const args = this.getNodeValue(ctx.args);
        this.setNodeValue(ctx, new declaration.AbstractMethodDeclaration(name, args, typ));
    }

    exitConcrete_method_declaration = (ctx: Concrete_method_declarationContext) => {
        const typ = this.getNodeValue(ctx.typ);
        if (typ instanceof type.CategoryType)
            typ.mutable = ctx.MUTABLE() != null;
        const name = this.getNodeValue(ctx.name);
        const args = this.getNodeValue(ctx.args);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new declaration.ConcreteMethodDeclaration(name, args, typ, stmts));
    }


    exitMethod_declaration = (ctx: Method_declarationContext) => {
        const value = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, value);
    }


    exitMethodCallStatement = (ctx: MethodCallStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitMethod_identifier = (ctx: Method_identifierContext) => {
        const value = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, value);
    }


    exitConstructorFrom = (ctx: ConstructorFromContext) => {
        const type = this.getNodeValue(ctx.typ);
        const copyFrom = this.getNodeValue(ctx.copyExp) || null;
        const args = this.getNodeValue(ctx.args) || null;
        this.setNodeValue(ctx, new expression.ConstructorExpression(type, copyFrom, args, true));
    }


    exitConstructorNoFrom = (ctx: ConstructorNoFromContext) => {
        const type = this.getNodeValue(ctx.typ);
        const args = this.getNodeValue(ctx.args) || null;
        this.setNodeValue(ctx, new expression.ConstructorExpression(type, null, args, true));
    }


    exitCopy_from = (ctx: Copy_fromContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
    }


    exitAssertion = (ctx: AssertionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new parser.Assertion(exp));
    }


    exitAssertion_list = (ctx: Assertion_listContext) => {
        const items = new expression.ExpressionList();
        ctx.assertion().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitAssign_instance_statement = (ctx: Assign_instance_statementContext) => {
        const inst = this.getNodeValue(ctx.inst);
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new statement.AssignInstanceStatement(inst, exp));
    }


    exitAssignInstanceStatement = (ctx: AssignInstanceStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitAssign_variable_statement = (ctx: Assign_variable_statementContext) => {
        const name = this.getNodeValue(ctx.variable_identifier());
        const exp = this.getNodeValue(ctx.expression());
        this.setNodeValue(ctx, new statement.AssignVariableStatement(name, exp));
    }


    exitAssign_tuple_statement = (ctx: Assign_tuple_statementContext) => {
        const items = this.getNodeValue(ctx.items);
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new statement.AssignTupleStatement(items, exp));
    }


    exitRootInstance = (ctx: RootInstanceContext) => {
        const name = this.getNodeValue(ctx.variable_identifier());
        this.setNodeValue(ctx, new instance.VariableInstance(name));
    }


    exitChildInstance = (ctx: ChildInstanceContext) => {
        const parent = this.getNodeValue(ctx.assignable_instance());
        const child = this.getNodeValue(ctx.child_instance());
        child.parent = parent;
        this.setNodeValue(ctx, child);
    }


    exitMemberInstance = (ctx: MemberInstanceContext) => {
        const name = this.getNodeValue(ctx.name);
        this.setNodeValue(ctx, new instance.MemberInstance(name));
    }


    exitItemInstance = (ctx: ItemInstanceContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new instance.ItemInstance(exp));
    }


    exitMethod_expression = (ctx: Method_expressionContext) => {
        const exp = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, exp);
    }


    exitMethodExpression = (ctx: MethodExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitNative_statement_list = (ctx: Native_statement_listContext) => {
        const items = new statement.StatementList();
        ctx.native_statement().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitJava_identifier = (ctx: Java_identifierContext) => {
        this.setNodeValue(ctx, ctx.getText());
    }

    exitJavascript_identifier = (ctx: Javascript_identifierContext) => {
        const id = new grammar.Identifier(ctx.getText());
        this.setNodeValue(ctx, id);
    }

    exitJavascript_member_expression = (ctx: Javascript_member_expressionContext) => {
        const name = ctx.name.getText();
        this.setNodeValue(ctx, new javascript.JavaScriptMemberExpression(name));
    }

    exitJavascript_primary_expression = (ctx: Javascript_primary_expressionContext) => {
        const exp = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, exp);
    }

    exitJavascript_new_expression = (ctx: Javascript_new_expressionContext) => {
        const method = this.getNodeValue(ctx.javascript_method_expression());
        this.setNodeValue(ctx, new javascript.JavaScriptNewExpression(method));
    }


    exitJavascript_this_expression = (ctx: Javascript_this_expressionContext) => {
        this.setNodeValue(ctx, new javascript.JavaScriptThisExpression());
    }


    exitJavaIdentifier = (ctx: JavaIdentifierContext) => {
        const name = this.getNodeValue(ctx.name);
        this.setNodeValue(ctx, new java.JavaIdentifierExpression(null, name));
    }

    exitJavaIdentifierExpression = (ctx: JavaIdentifierExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitJavaChildIdentifier = (ctx: JavaChildIdentifierContext) => {
        const parent = this.getNodeValue(ctx.parent);
        const name = this.getNodeValue(ctx.name);
        const child = new java.JavaIdentifierExpression(parent, name);
        this.setNodeValue(ctx, child);
    }

    exitJavascriptBooleanLiteral = (ctx: JavascriptBooleanLiteralContext) => {
        this.setNodeValue(ctx, new javascript.JavaScriptBooleanLiteral(ctx.getText()));
    }

    exitJavascriptCharacterLiteral = (ctx: JavascriptCharacterLiteralContext) => {
        this.setNodeValue(ctx, new javascript.JavaScriptCharacterLiteral(ctx.getText()));
    }

    exitJavascriptTextLiteral = (ctx: JavascriptTextLiteralContext) => {
        this.setNodeValue(ctx, new javascript.JavaScriptTextLiteral(ctx.getText()));
    }

    exitJavascriptIntegerLiteral = (ctx: JavascriptIntegerLiteralContext) => {
        this.setNodeValue(ctx, new javascript.JavaScriptIntegerLiteral(ctx.getText()));
    }


    exitJavascriptDecimalLiteral = (ctx: JavascriptDecimalLiteralContext) => {
        this.setNodeValue(ctx, new javascript.JavaScriptDecimalLiteral(ctx.getText()));
    }


    exitJavaClassIdentifier = (ctx: JavaClassIdentifierContext) => {
        const klass = this.getNodeValue(ctx.klass);
        this.setNodeValue(ctx, klass);
    }


    exitJavaChildClassIdentifier = (ctx: JavaChildClassIdentifierContext) => {
        const parent = this.getNodeValue(ctx.parent);
        const child = new java.JavaIdentifierExpression(parent, ctx.name.getText());
        this.setNodeValue(ctx, child);
    }


    exitJavaPrimaryExpression = (ctx: JavaPrimaryExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitJavascriptPrimaryExpression = (ctx: JavascriptPrimaryExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitJavascript_identifier_expression = (ctx: Javascript_identifier_expressionContext) => {
        const id = this.getNodeValue(ctx.name);
        this.setNodeValue(ctx, new javascript.JavaScriptIdentifierExpression(id));
    }

    exitJavaSelectorExpression = (ctx: JavaSelectorExpressionContext) => {
        const parent = this.getNodeValue(ctx.parent);
        const child = this.getNodeValue(ctx.child);
        child.parent = parent;
        this.setNodeValue(ctx, child);
    }

    exitJavascriptSelectorExpression = (ctx: JavascriptSelectorExpressionContext) => {
        const parent = this.getNodeValue(ctx.parent);
        const child = this.getNodeValue(ctx.child);
        child.parent = parent;
        this.setNodeValue(ctx, child);
    }

    exitJavascriptMemberExpression = (ctx: JavascriptMemberExpressionContext) => {
        const id = this.getNodeValue(ctx.name);
        this.setNodeValue(ctx, new javascript.JavaScriptMemberExpression(id));
    }

    exitJava_primary_expression = (ctx: Java_primary_expressionContext) => {
        const exp = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, exp);
    }

    exitJava_item_expression = (ctx: Java_item_expressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new java.JavaItemExpression(exp));
    }

    exitJavascript_item_expression = (ctx: Javascript_item_expressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new javascript.JavaScriptItemExpression(exp));
    }

    exitJavascriptItemExpression = (ctx: JavascriptItemExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitJavaStatement = (ctx: JavaStatementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        const stmt = new java.JavaStatement(exp, false);
        this.setNodeValue(ctx, stmt);
    }

    exitJavascriptStatement = (ctx: JavascriptStatementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        const stmt = new javascript.JavaScriptStatement(exp, false);
        this.setNodeValue(ctx, stmt);
    }


    exitJavaReturnStatement = (ctx: JavaReturnStatementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new java.JavaStatement(exp, true));
    }


    exitJavascriptReturnStatement = (ctx: JavascriptReturnStatementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new javascript.JavaScriptStatement(exp, true));
    }


    exitJavaNativeStatement = (ctx: JavaNativeStatementContext) => {
        const stmt = this.getNodeValue(ctx.java_statement());
        this.setNodeValue(ctx, new java.JavaNativeCall(stmt));
    }


    exitJavascriptNativeStatement = (ctx: JavascriptNativeStatementContext) => {
        const stmt = this.getNodeValue(ctx.javascript_native_statement());
        this.setNodeValue(ctx, stmt);
    }

    exitJavascript_native_statement = (ctx: Javascript_native_statementContext) => {
        const stmt = this.getNodeValue(ctx.javascript_statement());
        const module = this.getNodeValue(ctx.javascript_module());
        stmt.module = module || null;
        this.setNodeValue(ctx, new javascript.JavaScriptNativeCall(stmt));
    }


    exitNative_method_declaration = (ctx: Native_method_declarationContext) => {
        const type = this.getNodeValue(ctx.typ);
        const name = this.getNodeValue(ctx.name);
        const params = this.getNodeValue(ctx.args);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new declaration.NativeMethodDeclaration(name, params, type, stmts));
    }


    exitJavaArgumentList = (ctx: JavaArgumentListContext) => {
        const item = this.getNodeValue(ctx.item);
        this.setNodeValue(ctx, new java.JavaExpressionList(item));
    }

    exitJavascriptArgumentList = (ctx: JavascriptArgumentListContext) => {
        const item = this.getNodeValue(ctx.item);
        this.setNodeValue(ctx, new javascript.JavaScriptExpressionList(item));
    }

    exitJavaArgumentListItem = (ctx: JavaArgumentListItemContext) => {
        const item = this.getNodeValue(ctx.item);
        const items = this.getNodeValue(ctx.items);
        items.add(item);
        this.setNodeValue(ctx, items);
    }

    exitJavascriptArgumentListItem = (ctx: JavascriptArgumentListItemContext) => {
        const item = this.getNodeValue(ctx.item);
        const items = this.getNodeValue(ctx.items);
        items.add(item);
        this.setNodeValue(ctx, items);
    }

    exitJava_method_expression = (ctx: Java_method_expressionContext) => {
        const name = this.getNodeValue(ctx.name);
        const args = this.getNodeValue(ctx.args);
        this.setNodeValue(ctx, new java.JavaMethodExpression(name, args));
    }

    exitJava_this_expression = (ctx: Java_this_expressionContext) => {
        this.setNodeValue(ctx, new java.JavaThisExpression());
    }

    exitJavascriptMethodExpression = (ctx: JavascriptMethodExpressionContext) => {
        const method = this.getNodeValue(ctx.method);
        this.setNodeValue(ctx, method);
    }

    exitJavascript_method_expression = (ctx: Javascript_method_expressionContext) => {
        const id = this.getNodeValue(ctx.name);
        const args = this.getNodeValue(ctx.args);
        this.setNodeValue(ctx, new javascript.JavaScriptMethodExpression(id, args));
    }

    exitJavaMethodExpression = (ctx: JavaMethodExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitFlush_statement = (ctx: Flush_statementContext) => {
        this.setNodeValue(ctx, new statement.FlushStatement());
    }


    exitFlushStatement = (ctx: FlushStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.stmt));
    }


    exitFullDeclarationList = (ctx: FullDeclarationListContext) => {
        const items = this.getNodeValue(ctx.declarations()) || new declaration.DeclarationList();
        this.setNodeValue(ctx, items);
    }


    exitDeclaration = (ctx: DeclarationContext) => {
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


    exitDeclarations = (ctx: DeclarationsContext) => {
        const items = new declaration.DeclarationList();
        ctx.declaration().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitIteratorExpression = (ctx: IteratorExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        const name = this.getNodeValue(ctx.name);
        const source = this.getNodeValue(ctx.source);
        this.setNodeValue(ctx, new expression.IteratorExpression(name, source, exp));
    }


    exitIteratorType = (ctx: IteratorTypeContext) => {
        const typ = this.getNodeValue(ctx.i);
        this.setNodeValue(ctx, new type.IteratorType(typ));
    }


    exitJavaBooleanLiteral = (ctx: JavaBooleanLiteralContext) => {
        this.setNodeValue(ctx, new java.JavaBooleanLiteral(ctx.getText()));
    }


    exitJavaIntegerLiteral = (ctx: JavaIntegerLiteralContext) => {
        this.setNodeValue(ctx, new java.JavaIntegerLiteral(ctx.getText()));
    }


    exitJavaDecimalLiteral = (ctx: JavaDecimalLiteralContext) => {
        this.setNodeValue(ctx, new java.JavaDecimalLiteral(ctx.getText()));
    }


    exitJavaCharacterLiteral = (ctx: JavaCharacterLiteralContext) => {
        this.setNodeValue(ctx, new java.JavaCharacterLiteral(ctx.getText()));
    }


    exitJavaTextLiteral = (ctx: JavaTextLiteralContext) => {
        this.setNodeValue(ctx, new java.JavaTextLiteral(ctx.getText()));
    }


    exitJavaCategoryBinding = (ctx: JavaCategoryBindingContext) => {
        const map = this.getNodeValue(ctx.binding);
        this.setNodeValue(ctx, new java.JavaNativeCategoryBinding(map));
    }

    exitJavascriptCategoryBinding = (ctx: JavascriptCategoryBindingContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.binding));
    }


    exitJavascript_category_binding = (ctx: Javascript_category_bindingContext) => {
        const identifier = ctx.javascript_identifier().map(cx => cx.getText()).join(".");
        const module = this.getNodeValue(ctx.javascript_module()) || null;
        const map = new javascript.JavaScriptNativeCategoryBinding(identifier, module);
        this.setNodeValue(ctx, map);
    }


    exitJavascript_module = (ctx: Javascript_moduleContext) => {
        const ids = ctx.javascript_identifier().map(rule => rule.getText());
        const module = new javascript.JavaScriptModule(ids);
        this.setNodeValue(ctx, module);
    }


    exitNativeCategoryBindingList = (ctx: NativeCategoryBindingListContext) => {
        const item = this.getNodeValue(ctx.item);
        const items = new grammar.NativeCategoryBindingList(item);
        this.setNodeValue(ctx, items);
    }


    exitNativeCategoryBindingListItem = (ctx: NativeCategoryBindingListItemContext) => {
        const item = this.getNodeValue(ctx.item);
        const items = this.getNodeValue(ctx.items);
        items.add(item);
        this.setNodeValue(ctx, items);
    }


    exitNative_category_bindings = (ctx: Native_category_bindingsContext) => {
        const items = this.getNodeValue(ctx.items);
        this.setNodeValue(ctx, items);
    }


    exitNative_category_declaration = (ctx: Native_category_declarationContext) => {
        const name = this.getNodeValue(ctx.name);
        const attrs = this.getNodeValue(ctx.attrs);
        const bindings = this.getNodeValue(ctx.bindings);
        const methods = this.getNodeValue(ctx.methods);
        const decl = new declaration.NativeCategoryDeclaration(name, attrs, bindings, null, methods);
        decl.storable = ctx.STORABLE() != null;
        this.setNodeValue(ctx, decl);
    }


    exitNative_widget_declaration = (ctx: Native_widget_declarationContext) => {
        const name = this.getNodeValue(ctx.name);
        const bindings = this.getNodeValue(ctx.bindings);
        const methods = this.getNodeValue(ctx.methods);
        const decl = new declaration.NativeWidgetDeclaration(name, bindings, methods);
        this.setNodeValue(ctx, decl);
    }


    exitNativeCategoryDeclaration = (ctx: NativeCategoryDeclarationContext) => {
        const decl = this.getNodeValue(ctx.decl);
        this.setNodeValue(ctx, decl);
    }


    exitNative_resource_declaration = (ctx: Native_resource_declarationContext) => {
        const name = this.getNodeValue(ctx.name);
        const attrs = this.getNodeValue(ctx.attrs);
        const bindings = this.getNodeValue(ctx.bindings);
        const methods = this.getNodeValue(ctx.methods);
        const decl = new declaration.NativeResourceDeclaration(name, attrs, bindings, null, methods);
        decl.storable = ctx.STORABLE() != null;
        this.setNodeValue(ctx, decl);
    }


    exitResource_declaration = (ctx: Resource_declarationContext) => {
        const decl = this.getNodeValue(ctx.native_resource_declaration());
        this.setNodeValue(ctx, decl);
    }


    exitParenthesis_expression = (ctx: Parenthesis_expressionContext) => {
        const exp = this.getNodeValue(ctx.expression());
        this.setNodeValue(ctx, new expression.ParenthesisExpression(exp));
    }


    exitParenthesisExpression = (ctx: ParenthesisExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitNative_symbol_list = (ctx: Native_symbol_listContext) => {
        const items = new grammar.NativeSymbolList();
        ctx.native_symbol().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitEnum_native_declaration = (ctx: Enum_native_declarationContext) => {
        const name = this.getNodeValue(ctx.name);
        const type = this.getNodeValue(ctx.typ);
        const symbols = this.getNodeValue(ctx.symbols);
        this.setNodeValue(ctx, new declaration.EnumeratedNativeDeclaration(name, type, symbols));
    }


    exitFor_each_statement = (ctx: For_each_statementContext) => {
        const name1 = this.getNodeValue(ctx.name1);
        const name2 = this.getNodeValue(ctx.name2);
        const source = this.getNodeValue(ctx.source);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new statement.ForEachStatement(name1, name2, source, stmts));
    }


    exitForEachStatement = (ctx: ForEachStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitKey_token = (ctx: Key_tokenContext) => {
        this.setNodeValue(ctx, ctx.getText());
    }


    exitUUIDLiteral = (ctx: UUIDLiteralContext) => {
        this.setNodeValue(ctx, new literal.UUIDLiteral(ctx.getText()));
    }


    exitUUIDType = (ctx: UUIDTypeContext) => {
        this.setNodeValue(ctx, type.UUIDType.instance);
    }


    exitValue_token = (ctx: Value_tokenContext) => {
        this.setNodeValue(ctx, ctx.getText());
    }


    exitNamed_argument = (ctx: Named_argumentContext) => {
        const name = this.getNodeValue(ctx.variable_identifier());
        const arg = new param.UnresolvedParameter(name);
        const exp = this.getNodeValue(ctx.literal_expression());
        arg.defaultExpression = exp || null;
        this.setNodeValue(ctx, arg);
    }


    exitClosureStatement = (ctx: ClosureStatementContext) => {
        const decl = this.getNodeValue(ctx.decl);
        this.setNodeValue(ctx, new statement.DeclarationStatement(decl));
    }


    exitReturn_statement = (ctx: Return_statementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new statement.ReturnStatement(exp));
    }


    exitReturnStatement = (ctx: ReturnStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitType_expression = (ctx: Type_expressionContext) => {
        const name = this.getNodeValue(ctx.name);
        this.setNodeValue(ctx, new expression.TypeExpression(new type.CategoryType(name)))
    }


    exitTypeExpression = (ctx: TypeExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitIf_statement = (ctx: If_statementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        const stmts = this.getNodeValue(ctx.stmts);
        const elseIfs = this.getNodeValue(ctx.elseIfs);
        const elseStmts = this.getNodeValue(ctx.elseStmts);
        this.setNodeValue(ctx, new statement.IfStatement(exp, stmts, elseIfs, elseStmts));
    }


    exitElseIfStatementList = (ctx: ElseIfStatementListContext) => {
        const exp = this.getNodeValue(ctx.exp);
        const stmts = this.getNodeValue(ctx.stmts);
        const elem = new statement.IfElement(exp, stmts);
        this.setNodeValue(ctx, new statement.IfElementList(elem));
    }


    exitElseIfStatementListItem = (ctx: ElseIfStatementListItemContext) => {
        const items = this.getNodeValue(ctx.items);
        const exp = this.getNodeValue(ctx.exp);
        const stmts = this.getNodeValue(ctx.stmts);
        const elem = new statement.IfElement(exp, stmts);
        items.add(elem);
        this.setNodeValue(ctx, items);
    }


    exitIfStatement = (ctx: IfStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitSuperExpression = (ctx: SuperExpressionContext) => {
        this.setNodeValue(ctx, new expression.SuperExpression());
    }


    exitSwitchStatement = (ctx: SwitchStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitAssignTupleStatement = (ctx: AssignTupleStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitRaiseStatement = (ctx: RaiseStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitWriteStatement = (ctx: WriteStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitWithResourceStatement = (ctx: WithResourceStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitWhileStatement = (ctx: WhileStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitDoWhileStatement = (ctx: DoWhileStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitTryStatement = (ctx: TryStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }


    exitEqualsExpression = (ctx: EqualsExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        let op = null;
        switch(ctx.op.type) {
            case OLexer.EQ2:
                op = grammar.EqOp.EQUALS;
                break;
            case OLexer.XEQ:
                op = grammar.EqOp.NOT_EQUALS;
                break;
            case OLexer.TEQ:
                op = grammar.EqOp.ROUGHLY;
                break;
            default:
                throw new Error("Operator " + ctx.op.type);
        }
        this.setNodeValue(ctx, new expression.EqualsExpression(left, op, right));
    }


    exitCompareExpression = (ctx: CompareExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        let op = null;
        switch(ctx.op.type) {
            case OLexer.LT:
                op = grammar.CmpOp.LT;
                break;
            case OLexer.LTE:
                op = grammar.CmpOp.LTE;
                break;
            case OLexer.GT:
                op = grammar.CmpOp.GT;
                break;
            case OLexer.GTE:
                op = grammar.CmpOp.GTE;
                break;
            default:
                throw new Error("Operator " + ctx.op.type);
        }
        this.setNodeValue(ctx, new expression.CompareExpression(left, op, right));
    }


    exitAtomicSwitchCase = (ctx: AtomicSwitchCaseContext) => {
        const exp = this.getNodeValue(ctx.exp);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new statement.AtomicSwitchCase(exp, stmts));
    }


    exitCollection_literal = (ctx: Collection_literalContext) => {
        const value = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, value);
    }


    exitCollectionSwitchCase = (ctx: CollectionSwitchCaseContext) => {
        const exp = this.getNodeValue(ctx.exp);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new statement.CollectionSwitchCase(exp, stmts));
    }


    exitSwitch_case_statement_list = (ctx: Switch_case_statement_listContext) => {
        const items = new statement.SwitchCaseList();
        ctx.switch_case_statement().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitSwitch_statement = (ctx: Switch_statementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        const cases = this.getNodeValue(ctx.cases);
        const stmts = this.getNodeValue(ctx.stmts);
        const stmt = new statement.SwitchStatement(exp, cases, stmts);
        this.setNodeValue(ctx, stmt);
    }


    exitLiteralRangeLiteral = (ctx: LiteralRangeLiteralContext) => {
        const low = this.getNodeValue(ctx.low);
        const high = this.getNodeValue(ctx.high);
        this.setNodeValue(ctx, new literal.RangeLiteral(low, high));
    }


    exitLiteralListLiteral = (ctx: LiteralListLiteralContext) => {
        const exp = this.getNodeValue(ctx.literal_list_literal());
        this.setNodeValue(ctx, new literal.ListLiteral(false, exp));
    }


    exitLiteral_list_literal = (ctx: Literal_list_literalContext) => {
        const items = new expression.ExpressionList();
        ctx.atomic_literal().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitInExpression = (ctx: InExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        const op = ctx.NOT() ? grammar.ContOp.NOT_IN : grammar.ContOp.IN;
        this.setNodeValue(ctx, new expression.ContainsExpression(left, op, right));
    }


    exitCssType = (ctx: CssTypeContext) => {
        this.setNodeValue(ctx, type.CssType.instance);
    }


    exitHasExpression = (ctx: HasExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        const op = ctx.NOT() ? grammar.ContOp.NOT_HAS : grammar.ContOp.HAS;
        this.setNodeValue(ctx, new expression.ContainsExpression(left, op, right));
    }



    exitHasAllExpression = (ctx: HasAllExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        const op = ctx.NOT() ? grammar.ContOp.NOT_HAS_ALL : grammar.ContOp.HAS_ALL;
        this.setNodeValue(ctx, new expression.ContainsExpression(left, op, right));
    }


    exitHasAnyExpression = (ctx: HasAnyExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        const op = ctx.NOT() ? grammar.ContOp.NOT_HAS_ANY : grammar.ContOp.HAS_ANY;
        this.setNodeValue(ctx, new expression.ContainsExpression(left, op, right));
    }


    exitContainsExpression = (ctx: ContainsExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        const op = ctx.NOT() ? grammar.EqOp.NOT_CONTAINS : grammar.EqOp.CONTAINS;
        this.setNodeValue(ctx, new expression.EqualsExpression(left, op, right));
    }


    exitDivideExpression = (ctx: DivideExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        this.setNodeValue(ctx, new expression.DivideExpression(left, right));
    }


    exitIntDivideExpression = (ctx: IntDivideExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        this.setNodeValue(ctx, new expression.IntDivideExpression(left, right));
    }


    exitModuloExpression = (ctx: ModuloExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        this.setNodeValue(ctx, new expression.ModuloExpression(left, right));
    }


    exitAnnotation_constructor = (ctx: Annotation_constructorContext) => {
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


    exitAnnotation_argument = (ctx: Annotation_argumentContext) => {
        const name = this.getNodeValue(ctx.name);
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new literal.DocEntry(name, exp));
    }


    exitAnnotation_identifier = (ctx: Annotation_identifierContext) => {
        this.setNodeValue(ctx, new grammar.Identifier(ctx.getText()));
    }


    exitAnnotation_argument_name = (ctx: Annotation_argument_nameContext) => {
        this.setNodeValue(ctx, ctx.getText());
    }


    exitAnnotationLiteralValue = (ctx: AnnotationLiteralValueContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitAnnotationTypeValue = (ctx: AnnotationTypeValueContext) => {
        const typ = this.getNodeValue(ctx.typ);
        this.setNodeValue(ctx, new expression.TypeExpression(typ));
    }


    exitAndExpression = (ctx: AndExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        this.setNodeValue(ctx, new expression.AndExpression(left, right));
    }

    exitNullLiteral = (ctx: NullLiteralContext) => {
        this.setNodeValue(ctx, literal.NullLiteral.instance);
    }


    exitOperator_argument = (ctx: Operator_argumentContext) => {
        const value = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, value);
    }


    exitOperatorArgument = (ctx: OperatorArgumentContext) => {
        const arg = this.getNodeValue(ctx.arg);
        arg.setMutable(ctx.MUTABLE() != null);
        this.setNodeValue(ctx, arg);
    }


    exitOperatorPlus = (ctx: OperatorPlusContext) => {
        this.setNodeValue(ctx, grammar.Operator.PLUS);
    }


    exitOperatorMinus = (ctx: OperatorMinusContext) => {
        this.setNodeValue(ctx, grammar.Operator.MINUS);
    }


    exitOperatorMultiply = (ctx: OperatorMultiplyContext) => {
        this.setNodeValue(ctx, grammar.Operator.MULTIPLY);
    }


    exitOperatorDivide = (ctx: OperatorDivideContext) => {
        this.setNodeValue(ctx, grammar.Operator.DIVIDE);
    }


    exitOperatorIDivide = (ctx: OperatorIDivideContext) => {
        this.setNodeValue(ctx, grammar.Operator.IDIVIDE);
    }


    exitOperatorModulo = (ctx: OperatorModuloContext) => {
        this.setNodeValue(ctx, grammar.Operator.MODULO);
    }


    exitNative_member_method_declaration = (ctx: Native_member_method_declarationContext) => {
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


    exitOperator_method_declaration = (ctx: Operator_method_declarationContext) => {
        const op = this.getNodeValue(ctx.op);
        const arg = this.getNodeValue(ctx.arg);
        const typ = this.getNodeValue(ctx.typ);
        const stmts = this.getNodeValue(ctx.stmts);
        const decl = new declaration.OperatorMethodDeclaration(op, arg, typ, stmts);
        this.setNodeValue(ctx, decl);
    }


    exitOrder_by = (ctx: Order_byContext) => {
        const ids = new grammar.IdentifierList();
        ctx.variable_identifier().map(function (ctx_) {
            ids.push(this.getNodeValue(ctx_));
        }, this);
        const clause = new grammar.OrderByClause(ids, ctx.DESC() != null);
        this.setNodeValue(ctx, clause);
    }

    exitOrder_by_list = (ctx: Order_by_listContext) => {
        const list = new grammar.OrderByClauseList();
        ctx.order_by().map(function (ctx_) {
            list.add(this.getNodeValue(ctx_));
        }, this);
        this.setNodeValue(ctx, list);
    }

    exitOrExpression = (ctx: OrExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        this.setNodeValue(ctx, new expression.OrExpression(left, right));
    }


    exitMultiplyExpression = (ctx: MultiplyExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const right = this.getNodeValue(ctx.right);
        this.setNodeValue(ctx, new expression.MultiplyExpression(left, right));
    }


    exitMutable_category_type = (ctx: Mutable_category_typeContext) => {
        const typ = this.getNodeValue(ctx.category_type());
        typ.mutable = ctx.MUTABLE() != null;
        this.setNodeValue(ctx, typ);
    }


    exitMutableInstanceExpression = (ctx: MutableInstanceExpressionContext) => {
        const source = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new expression.MutableExpression(source));
    }


    exitMutableSelectableExpression = (ctx: MutableSelectableExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
    }


    exitMutableSelectorExpression = (ctx: MutableSelectorExpressionContext) => {
        const parent = this.getNodeValue(ctx.parent);
        const selector = this.getNodeValue(ctx.selector);
        selector.parent = parent;
        this.setNodeValue(ctx, selector);
    }


    exitMinusExpression = (ctx: MinusExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new expression.MinusExpression(exp));
    }


    exitNotExpression = (ctx: NotExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new expression.NotExpression(exp));
    }


    exitWhile_statement = (ctx: While_statementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new statement.WhileStatement(exp, stmts));
    }


    exitDo_while_statement = (ctx: Do_while_statementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new statement.DoWhileStatement(exp, stmts));
    }

    exitSingleton_category_declaration = (ctx: Singleton_category_declarationContext) => {
        const name = this.getNodeValue(ctx.name);
        const attrs = this.getNodeValue(ctx.attrs);
        const methods = this.getNodeValue(ctx.methods);
        this.setNodeValue(ctx, new declaration.SingletonCategoryDeclaration(name, attrs, methods));
    }

    exitSingletonCategoryDeclaration = (ctx: SingletonCategoryDeclarationContext) => {
        const decl = this.getNodeValue(ctx.decl);
        this.setNodeValue(ctx, decl);
    }

    exitSliceFirstAndLast = (ctx: SliceFirstAndLastContext) => {
        const first = this.getNodeValue(ctx.first);
        const last = this.getNodeValue(ctx.last);
        this.setNodeValue(ctx, new expression.SelectorExpression(null, first, last));
    }


    exitSliceFirstOnly = (ctx: SliceFirstOnlyContext) => {
        const first = this.getNodeValue(ctx.first);
        this.setNodeValue(ctx, new expression.SelectorExpression(null, first, null));
    }


    exitSliceLastOnly = (ctx: SliceLastOnlyContext) => {
        const last = this.getNodeValue(ctx.last);
        this.setNodeValue(ctx, new expression.SelectorExpression(null, null, last));
    }


    exitSorted_expression = (ctx: Sorted_expressionContext) => {
        const source = this.getNodeValue(ctx.source);
        const desc = ctx.DESC() != null;
        const key = this.getNodeValue(ctx.key);
        this.setNodeValue(ctx, new expression.SortedExpression(source, desc, key));
    }


    exitSorted_key = (ctx: Sorted_keyContext) => {
        const exp = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, exp);
    }


    exitDocument_expression = (ctx: Document_expressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new expression.DocumentExpression(exp));
    }


    exitDocumentType = (ctx: DocumentTypeContext) => {
        this.setNodeValue(ctx, type.DocumentType.instance);
    }


    exitDocument_literal = (ctx: Document_literalContext) => {
        const entries = this.getNodeValue(ctx.doc_entry_list()) || new literal.DocEntryList();
        this.setNodeValue(ctx, new literal.DocumentLiteral(entries));
    }


    exitFetchStatement = (ctx: FetchStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.stmt));
    }


    exitFetchMany = (ctx: FetchManyContext) => {
        const category = this.getNodeValue(ctx.typ);
        const predicate = this.getNodeValue(ctx.predicate);
        const start = this.getNodeValue(ctx.xstart);
        const stop = this.getNodeValue(ctx.xstop);
        const include = this.getNodeValue(ctx.include);
        const orderBy = this.getNodeValue(ctx.orderby);
        this.setNodeValue(ctx, new expression.FetchManyExpression(category, start, stop, predicate, include, orderBy));
    }


    exitFetchManyAsync = (ctx: FetchManyAsyncContext) => {
        const category = this.getNodeValue(ctx.typ);
        const predicate = this.getNodeValue(ctx.predicate);
        const start = this.getNodeValue(ctx.xstart);
        const stop = this.getNodeValue(ctx.xstop);
        const include = this.getNodeValue(ctx.include);
        const orderBy = this.getNodeValue(ctx.orderby);
        const thenWith = grammar.ThenWith.OrEmpty(this.getNodeValue(ctx.then()));
        this.setNodeValue(ctx, new statement.FetchManyStatement(category, start, stop, predicate, include, orderBy, thenWith));
    }


    exitFetchOne = (ctx: FetchOneContext) => {
        const category = this.getNodeValue(ctx.typ);
        const predicate = this.getNodeValue(ctx.predicate);
        const include = this.getNodeValue(ctx.include);
        this.setNodeValue(ctx, new expression.FetchOneExpression(category, predicate, include));
    }


    exitFetchOneAsync = (ctx: FetchOneAsyncContext) => {
        const category = this.getNodeValue(ctx.typ);
        const predicate = this.getNodeValue(ctx.predicate);
        const include = this.getNodeValue(ctx.include);
        const thenWith = grammar.ThenWith.OrEmpty(this.getNodeValue(ctx.then()));
        this.setNodeValue(ctx, new statement.FetchOneStatement(category, predicate, include, thenWith));
    }


    exitThen = (ctx: ThenContext) => {
        const name = this.getNodeValue(ctx.name);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new grammar.ThenWith(name, stmts));
    }


    exitFiltered_list_expression = (ctx: Filtered_list_expressionContext) => {
        const source = this.getNodeValue(ctx.source);
        const itemName = this.getNodeValue(ctx.name);
        const predicate = this.getNodeValue(ctx.predicate);
        let exp;
        if(itemName)
            exp = new expression.ExplicitPredicateExpression(itemName, predicate);
        else if(predicate instanceof expression.PredicateExpression)
            exp = predicate;
        else
            throw new Error("What?");
        this.setNodeValue(ctx, new expression.FilteredExpression(source, exp));
    }


    exitArrowFilterExpression = (ctx: ArrowFilterExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.arrow_expression()));
    }


    exitExplicitFilterExpression = (ctx: ExplicitFilterExpressionContext) => {
        const name = this.getNodeValue(ctx.variable_identifier());
        const predicate = this.getNodeValue(ctx.expression());
        this.setNodeValue(ctx, new expression.ExplicitPredicateExpression(name, predicate));
    }


    exitOtherFilterExpression = (ctx: OtherFilterExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.expression()));
    }


    exitCode_type = (ctx: Code_typeContext) => {
        this.setNodeValue(ctx, type.CodeType.instance);
    }


    exitExecuteExpression = (ctx: ExecuteExpressionContext) => {
        const name = this.getNodeValue(ctx.name);
        this.setNodeValue(ctx, new expression.ExecuteExpression(name));
    }


    exitExpression_list = (ctx: Expression_listContext) => {
        const items = new expression.ExpressionList();
        ctx.expression().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitExpression_tuple = (ctx: Expression_tupleContext) => {
        const items = new expression.ExpressionList();
        ctx.expression().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitCodeExpression = (ctx: CodeExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new expression.CodeExpression(exp));
    }


    exitCategory_or_any_type = (ctx: Category_or_any_typeContext) => {
        const exp = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, exp);
    }


    exitCode_argument = (ctx: Code_argumentContext) => {
        const name = this.getNodeValue(ctx.name);
        this.setNodeValue(ctx, new param.CodeParameter(name));
    }


    exitCategory_symbol = (ctx: Category_symbolContext) => {
        const name = this.getNodeValue(ctx.name);
        const args = this.getNodeValue(ctx.args);
        this.setNodeValue(ctx, new expression.CategorySymbol(name, args));
    }


    exitCategory_symbol_list = (ctx: Category_symbol_listContext) => {
        const items = new grammar.CategorySymbolList();
        ctx.category_symbol().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitEnum_category_declaration = (ctx: Enum_category_declarationContext) => {
        const name = this.getNodeValue(ctx.name);
        const attrs = this.getNodeValue(ctx.attrs);
        const parent = this.getNodeValue(ctx.derived);
        const derived = parent == null ? null : new grammar.IdentifierList(parent);
        const symbols = this.getNodeValue(ctx.symbols);
        this.setNodeValue(ctx, new declaration.EnumeratedCategoryDeclaration(name, attrs, derived, symbols));
    }


    exitEnum_declaration = (ctx: Enum_declarationContext) => {
        const value = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, value);
    }


    exitRead_all_expression = (ctx: Read_all_expressionContext) => {
        const source = this.getNodeValue(ctx.source);
        this.setNodeValue(ctx, new expression.ReadAllExpression(source));
    }


    exitRead_blob_expression = (ctx: Read_blob_expressionContext) => {
        const source = this.getNodeValue(ctx.source);
        this.setNodeValue(ctx, new expression.ReadBlobExpression(source));
    }


    exitRead_one_expression = (ctx: Read_one_expressionContext) => {
        const source = this.getNodeValue(ctx.source);
        this.setNodeValue(ctx, new expression.ReadOneExpression(source));
    }


    exitRead_statement = (ctx: Read_statementContext) => {
        const source = this.getNodeValue(ctx.source);
        const thenWith = grammar.ThenWith.OrEmpty(this.getNodeValue(ctx.then()));
        this.setNodeValue(ctx, new statement.ReadStatement(source, thenWith));
    }


    exitReadStatement = (ctx: ReadStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.stmt));
    }


    exitRepl = (ctx: ReplContext) => {
        const value = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, value);
    }


    exitWith_singleton_statement = (ctx: With_singleton_statementContext) => {
        const name = this.getNodeValue(ctx.typ);
        const typ = new type.CategoryType(name);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new statement.WithSingletonStatement(typ, stmts));
    }


    exitWithSingletonStatement = (ctx: WithSingletonStatementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        this.setNodeValue(ctx, stmt);
    }

    exitWrite_statement = (ctx: Write_statementContext) => {
        const what = this.getNodeValue(ctx.what);
        const target = this.getNodeValue(ctx.target);
        const thenWith = this.getNodeValue(ctx.then());
        this.setNodeValue(ctx, new statement.WriteStatement(what, target, thenWith));
    }


    exitWith_resource_statement = (ctx: With_resource_statementContext) => {
        const stmt = this.getNodeValue(ctx.stmt);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new statement.WithResourceStatement(stmt, stmts));
    }


    exitAnyType = (ctx: AnyTypeContext) => {
        this.setNodeValue(ctx, type.AnyType.instance);
    }


    exitAnyListType = (ctx: AnyListTypeContext) => {
        const typ = this.getNodeValue(ctx.any_type());
        this.setNodeValue(ctx, new type.ListType(typ));
    }


    exitAnyDictType = (ctx: AnyDictTypeContext) => {
        const typ = this.getNodeValue(ctx.any_type());
        this.setNodeValue(ctx, new type.DictionaryType(typ));
    }


    exitCastExpression = (ctx: CastExpressionContext) => {
        const left = this.getNodeValue(ctx.left);
        const type = this.getNodeValue(ctx.right);
        this.setNodeValue(ctx, new expression.CastExpression(left, type, ctx.MUTABLE() != null));
    }


    exitCatchAtomicStatement = (ctx: CatchAtomicStatementContext) => {
        const name = this.getNodeValue(ctx.name);
        const stmts = this.getNodeValue(ctx.stmts);
        const symbol = new expression.SymbolExpression(name);
        symbol.copySectionFrom(name);
        this.setNodeValue(ctx, new statement.AtomicSwitchCase(symbol, stmts));
    }


    exitCatchCollectionStatement = (ctx: CatchCollectionStatementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        const stmts = this.getNodeValue(ctx.stmts);
        this.setNodeValue(ctx, new statement.CollectionSwitchCase(exp, stmts));
    }


    exitCatch_statement_list = (ctx: Catch_statement_listContext) => {
        const items = new statement.SwitchCaseList();
        ctx.catch_statement().forEach(function (r) {
            const item = this.getNodeValue(r);
            items.add(item);
        }, this);
        this.setNodeValue(ctx, items);
    }


    exitTry_statement = (ctx: Try_statementContext) => {
        const name = this.getNodeValue(ctx.name);
        const stmts = this.getNodeValue(ctx.stmts);
        const handlers = this.getNodeValue(ctx.handlers);
        const anyStmts = this.getNodeValue(ctx.anyStmts);
        const finalStmts = this.getNodeValue(ctx.finalStmts);
        const stmt = new statement.SwitchErrorStatement(name, stmts, handlers, anyStmts, finalStmts);
        this.setNodeValue(ctx, stmt);
    }


    exitRaise_statement = (ctx: Raise_statementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new statement.RaiseStatement(exp));
    }


    exitMatchingList = (ctx: MatchingListContext) => {
        const exp = this.getNodeValue(ctx.source);
        this.setNodeValue(ctx, new constraint.MatchingCollectionConstraint(exp));
    }


    exitMatchingRange = (ctx: MatchingRangeContext) => {
        const exp = this.getNodeValue(ctx.source);
        this.setNodeValue(ctx, new constraint.MatchingCollectionConstraint(exp));
    }


    exitMatchingExpression = (ctx: MatchingExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new constraint.MatchingExpressionConstraint(exp));
    }


    exitMatchingPattern = (ctx: MatchingPatternContext) => {
        this.setNodeValue(ctx, new constraint.MatchingPatternConstraint(new literal.TextLiteral(ctx.text.text)));
    }

    exitLiteralSetLiteral = (ctx: LiteralSetLiteralContext) => {
        const items = this.getNodeValue(ctx.literal_list_literal());
        this.setNodeValue(ctx, new literal.SetLiteral(items));
    }

    exitCsharp_identifier = (ctx: Csharp_identifierContext) => {
        this.setNodeValue(ctx, ctx.getText());
    }

    exitCSharpIdentifier = (ctx: CSharpIdentifierContext) => {
        const name = this.getNodeValue(ctx.name);
        this.setNodeValue(ctx, new csharp.CSharpIdentifierExpression(null, name));
    }

    exitCSharpChildIdentifier = (ctx: CSharpChildIdentifierContext) => {
        const parent = this.getNodeValue(ctx.parent);
        const name = this.getNodeValue(ctx.name);
        const child = new csharp.CSharpIdentifierExpression(parent, name);
        this.setNodeValue(ctx, child);
    }

    exitCSharpBooleanLiteral = (ctx: CSharpBooleanLiteralContext) => {
        this.setNodeValue(ctx, new csharp.CSharpBooleanLiteral(ctx.getText()));
    }


    exitCSharpIntegerLiteral = (ctx: CSharpIntegerLiteralContext) => {
        this.setNodeValue(ctx, new csharp.CSharpIntegerLiteral(ctx.getText()));
    }


    exitCSharpDecimalLiteral = (ctx: CSharpDecimalLiteralContext) => {
        this.setNodeValue(ctx, new csharp.CSharpDecimalLiteral(ctx.getText()));
    }


    exitCSharpCharacterLiteral = (ctx: CSharpCharacterLiteralContext) => {
        this.setNodeValue(ctx, new csharp.CSharpCharacterLiteral(ctx.getText()));
    }


    exitCSharpTextLiteral = (ctx: CSharpTextLiteralContext) => {
        this.setNodeValue(ctx, new csharp.CSharpTextLiteral(ctx.getText()));
    }


    exitCSharpCategoryBinding = (ctx: CSharpCategoryBindingContext) => {
        const binding = this.getNodeValue(ctx.binding);
        this.setNodeValue(ctx, new csharp.CSharpNativeCategoryBinding(binding));
    }

    exitCsharp_primary_expression = (ctx: Csharp_primary_expressionContext) => {
        const value = this.getNodeValue(ctx.getChild(0));
        this.setNodeValue(ctx, value);
    }

    exitCsharp_this_expression = (ctx: Csharp_this_expressionContext) => {
        this.setNodeValue(ctx, new csharp.CSharpThisExpression());
    }

    exitCsharp_method_expression = (ctx: Csharp_method_expressionContext) => {
        const name = this.getNodeValue(ctx.name);
        const args = this.getNodeValue(ctx.args);
        this.setNodeValue(ctx, new csharp.CSharpMethodExpression(name, args));
    }

    exitCSharpMethodExpression = (ctx: CSharpMethodExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitCSharpArgumentList = (ctx: CSharpArgumentListContext) => {
        const item = this.getNodeValue(ctx.item);
        this.setNodeValue(ctx, new csharp.CSharpExpressionList(item));
    }

    exitCSharpArgumentListItem = (ctx: CSharpArgumentListItemContext) => {
        const item = this.getNodeValue(ctx.item);
        const items = this.getNodeValue(ctx.items);
        items.add(item);
        this.setNodeValue(ctx, items);
    }

    exitCSharpNativeStatement = (ctx: CSharpNativeStatementContext) => {
        const stmt = this.getNodeValue(ctx.csharp_statement());
        const call = new csharp.CSharpNativeCall(stmt);
        this.setNodeValue(ctx, call);
    }


    exitCSharpPromptoIdentifier = (ctx: CSharpPromptoIdentifierContext) => {
        const name = ctx.DOLLAR_IDENTIFIER().getText();
        this.setNodeValue(ctx, new csharp.CSharpIdentifierExpression(null, name));
    }


    exitCSharpPrimaryExpression = (ctx: CSharpPrimaryExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitCSharpSelectorExpression = (ctx: CSharpSelectorExpressionContext) => {
        const parent = this.getNodeValue(ctx.parent);
        const child = this.getNodeValue(ctx.child);
        child.parent = parent;
        this.setNodeValue(ctx, child);
    }

    exitCSharpStatement = (ctx: CSharpStatementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        const stmt = new csharp.CSharpStatement(exp, false);
        this.setNodeValue(ctx, stmt);
    }

    exitCSharpReturnStatement = (ctx: CSharpReturnStatementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new csharp.CSharpStatement(exp, true));
    }


    exitPythonStatement = (ctx: PythonStatementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new python.PythonStatement(exp, false));
    }

    exitPythonReturnStatement = (ctx: PythonReturnStatementContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new python.PythonStatement(exp, true));
    }

    exitPython2CategoryBinding = (ctx: Python2CategoryBindingContext) => {
        const map = this.getNodeValue(ctx.binding);
        this.setNodeValue(ctx, new python.Python2NativeCategoryBinding(map));
    }


    exitPython3CategoryBinding = (ctx: Python3CategoryBindingContext) => {
        const map = this.getNodeValue(ctx.binding);
        this.setNodeValue(ctx, new python.Python3NativeCategoryBinding(map));
    }


    exitPython_category_binding = (ctx: Python_category_bindingContext) => {
        const identifier = ctx.identifier().getText();
        const module = this.getNodeValue(ctx.python_module());
        const map = new python.PythonNativeCategoryBinding(identifier, module);
        this.setNodeValue(ctx, map);
    }

    exitPython_method_expression = (ctx: Python_method_expressionContext) => {
        const name = this.getNodeValue(ctx.name);
        const args = this.getNodeValue(ctx.args);
        const method = new python.PythonMethodExpression(name, args);
        this.setNodeValue(ctx, method);
    }

    exitPythonGlobalMethodExpression = (ctx: PythonGlobalMethodExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitPythonMethodExpression = (ctx: PythonMethodExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitPython_module = (ctx: Python_moduleContext) => {
        const ids = ctx.python_identifier().map(rule => rule.getText());
        const module = new python.PythonModule(ids);
        this.setNodeValue(ctx, module);
    }

    exitPython2NativeStatement = (ctx: Python2NativeStatementContext) => {
        const stmt = this.getNodeValue(ctx.python_native_statement());
        this.setNodeValue(ctx, new python.Python2NativeCall(stmt));
    }


    exitPython3NativeStatement = (ctx: Python3NativeStatementContext) => {
        const stmt = this.getNodeValue(ctx.python_native_statement());
        this.setNodeValue(ctx, new python.Python3NativeCall(stmt));
    }

    exitPython_native_statement = (ctx: Python_native_statementContext) => {
        const stmt = this.getNodeValue(ctx.python_statement());
        const module = this.getNodeValue(ctx.python_module());
        stmt.module = module || null;
        this.setNodeValue(ctx, new python.PythonNativeCall(stmt));
    }

    exitPython_identifier = (ctx: Python_identifierContext) => {
        this.setNodeValue(ctx, ctx.getText());
    }

    exitPythonIdentifier = (ctx: PythonIdentifierContext) => {
        const name = this.getNodeValue(ctx.name);
        this.setNodeValue(ctx, new python.PythonIdentifierExpression(null, name));
    }

    exitPythonIdentifierExpression = (ctx: PythonIdentifierExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitPythonChildIdentifier = (ctx: PythonChildIdentifierContext) => {
        const parent = this.getNodeValue(ctx.parent);
        const name = this.getNodeValue(ctx.name);
        const child = new python.PythonIdentifierExpression(parent, name);
        this.setNodeValue(ctx, child);
    }


    exitPythonBooleanLiteral = (ctx: PythonBooleanLiteralContext) => {
        this.setNodeValue(ctx, new python.PythonBooleanLiteral(ctx.getText()));
    }

    exitPythonIntegerLiteral = (ctx: PythonIntegerLiteralContext) => {
        this.setNodeValue(ctx, new python.PythonIntegerLiteral(ctx.getText()));
    }


    exitPythonDecimalLiteral = (ctx: PythonDecimalLiteralContext) => {
        this.setNodeValue(ctx, new python.PythonDecimalLiteral(ctx.getText()));
    }

    exitPythonCharacterLiteral = (ctx: PythonCharacterLiteralContext) => {
        this.setNodeValue(ctx, new python.PythonCharacterLiteral(ctx.getText()));
    }


    exitPythonTextLiteral = (ctx: PythonTextLiteralContext) => {
        this.setNodeValue(ctx, new python.PythonTextLiteral(ctx.getText()));
    }

    exitPythonLiteralExpression = (ctx: PythonLiteralExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }


    exitPythonPromptoIdentifier = (ctx: PythonPromptoIdentifierContext) => {
        const name = ctx.DOLLAR_IDENTIFIER().getText();
        this.setNodeValue(ctx, new python.PythonIdentifierExpression(null, name));
    }


    exitPythonPrimaryExpression = (ctx: PythonPrimaryExpressionContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, exp);
    }

    exitPythonArgumentList = (ctx: PythonArgumentListContext) => {
        const ordinal = this.getNodeValue(ctx.ordinal);
        const named = this.getNodeValue(ctx.named);
        ordinal.addAll(named);
        this.setNodeValue(ctx, ordinal);
    }


    exitPythonNamedOnlyArgumentList = (ctx: PythonNamedOnlyArgumentListContext) => {
        const named = this.getNodeValue(ctx.named);
        this.setNodeValue(ctx, named);
    }

    exitPythonNamedArgumentList = (ctx: PythonNamedArgumentListContext) => {
        const name = this.getNodeValue(ctx.name);
        const exp = this.getNodeValue(ctx.exp);
        const arg = new python.PythonNamedArgument(name, exp);
        this.setNodeValue(ctx, new python.PythonArgumentList(arg));
    }

    exitPythonNamedArgumentListItem = (ctx: PythonNamedArgumentListItemContext) => {
        const name = this.getNodeValue(ctx.name);
        const exp = this.getNodeValue(ctx.exp);
        const arg = new python.PythonNamedArgument(name, exp);
        const items = this.getNodeValue(ctx.items);
        items.add(arg);
        this.setNodeValue(ctx, items);
    }

    exitPythonOrdinalOnlyArgumentList = (ctx: PythonOrdinalOnlyArgumentListContext) => {
        const ordinal = this.getNodeValue(ctx.ordinal);
        this.setNodeValue(ctx, ordinal);
    }

    exitPythonOrdinalArgumentList = (ctx: PythonOrdinalArgumentListContext) => {
        const item = this.getNodeValue(ctx.item);
        const arg = new python.PythonOrdinalArgument(item);
        this.setNodeValue(ctx, new python.PythonArgumentList(arg));
    }

    exitPythonOrdinalArgumentListItem = (ctx: PythonOrdinalArgumentListItemContext) => {
        const item = this.getNodeValue(ctx.item);
        const arg = new python.PythonOrdinalArgument(item);
        const items = this.getNodeValue(ctx.items);
        items.add(arg);
        this.setNodeValue(ctx, items);
    }

    exitPythonSelectorExpression = (ctx: PythonSelectorExpressionContext) => {
        const parent = this.getNodeValue(ctx.parent);
        const selector = this.getNodeValue(ctx.child);
        selector.parent = parent;
        this.setNodeValue(ctx, selector);
    }


    exitPythonSelfExpression = (ctx: PythonSelfExpressionContext) => {
        this.setNodeValue(ctx, new python.PythonSelfExpression());
    }


    exitJsxChild = (ctx: JsxChildContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.jsx));
    }


    exitJsxCode = (ctx: JsxCodeContext) => {
        const exp = this.getNodeValue(ctx.exp);
        const suite = this.getHiddenTokensAfterNode(ctx.RCURL());
        this.setNodeValue(ctx, new jsx.JsxCode(exp, suite));
    }


    exitJsxExpression = (ctx: JsxExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
    }


    exitJsxElement = (ctx: JsxElementContext) => {
        const elem = this.getNodeValue(ctx.opening);
        const closing = this.getNodeValue(ctx.closing);
        elem.setClosing(closing);
        const children = this.getNodeValue(ctx.children_);
        elem.setChildren(children);
        this.setNodeValue(ctx, elem);
    }


    exitJsxSelfClosing = (ctx: JsxSelfClosingContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.jsx));
    }


    exitJsxText = (ctx: JsxTextContext) => {
        const text = parser.getFullText(ctx.text);
        this.setNodeValue(ctx, new jsx.JsxText(text));
    }


    exitJsxValue = (ctx: JsxValueContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new jsx.JsxExpression(exp));
    }


    exitJsx_attribute = (ctx: Jsx_attributeContext) => {
        const name = this.getNodeValue(ctx.name);
        const value = this.getNodeValue(ctx.value);
        const stop = value != null ? ctx.value.stop : ctx.name.stop;
        const suite = value == null ? null : this.getHiddenTokensAfterToken(stop);
        this.setNodeValue(ctx, new jsx.JsxProperty(name, value, suite));
    }


    exitJsx_children = (ctx: Jsx_childrenContext) => {
        const list = ctx.jsx_child()
            .map(cx => this.getNodeValue(cx), this);
        this.setNodeValue(ctx, list);
    }


    exitJsx_element_name = (ctx: Jsx_element_nameContext) => {
        const name = ctx.getText();
        this.setNodeValue(ctx, new grammar.Identifier(name));
    }


    exitJsx_expression = (ctx: Jsx_expressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.getChild(0)));
    }


    exitJsx_identifier = (ctx: Jsx_identifierContext) => {
        const name = ctx.getText();
        this.setNodeValue(ctx, new grammar.Identifier(name));
    }


    exitJsx_fragment = (ctx: Jsx_fragmentContext) => {
        const openingSuite = this.getHiddenTokensAfterToken(ctx.jsx_fragment_start().stop);
        const fragment = new jsx.JsxFragment(openingSuite);
        fragment.children = this.getNodeValue(ctx.children_);
        this.setNodeValue(ctx, fragment);
    }


    exitJsxLiteral = (ctx: JsxLiteralContext) => {
        const text = ctx.getText();
        this.setNodeValue(ctx, new jsx.JsxLiteral(text));
    }


    exitJsx_opening = (ctx: Jsx_openingContext) => {
        const name = this.getNodeValue(ctx.name);
        const nameSuite = this.getHiddenTokensAfterToken(ctx.name.stop);
        const attributes = ctx.jsx_attribute()
            .map(cx => this.getNodeValue(cx), this);
        const openingSuite = this.getHiddenTokensAfterNode(ctx.GT());
        this.setNodeValue(ctx, new jsx.JsxElement(name, nameSuite, attributes, openingSuite));
    }


    exitJsx_closing = (ctx: Jsx_closingContext) => {
        const name = this.getNodeValue(ctx.name);
        const suite = this.getHiddenTokensAfterNode(ctx.GT());
        this.setNodeValue(ctx, new jsx.JsxClosing(name, suite));
    }


    exitJsx_self_closing = (ctx: Jsx_self_closingContext) => {
        const name = this.getNodeValue(ctx.name);
        const nameSuite = this.getHiddenTokensAfterToken(ctx.name.stop);
        const attributes = ctx.jsx_attribute()
            .map(cx => this.getNodeValue(cx), this);
        const suite = this.getHiddenTokensAfterNode(ctx.GT());
        this.setNodeValue(ctx, new jsx.JsxSelfClosing(name, nameSuite, attributes, suite));
    }


    exitCssExpression = (ctx: CssExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.exp));
    }


    exitCss_expression = (ctx: Css_expressionContext) => {
        const exp = new css.CssExpression();
        ctx.css_field().forEach(function (cx) {
            const field = this.getNodeValue(cx);
            exp.addField(field);
        }, this);
        this.setNodeValue(ctx, exp);
    }


    exitCss_field = (ctx: Css_fieldContext) => {
        const name = ctx.name.getText();
        const values = ctx.css_value().map(x => this.getNodeValue(x), this);
        this.setNodeValue(ctx, new css.CssField(name, values));
    }


    exitCssText = (ctx: CssTextContext) => {
        const text = this.input.getText({start: ctx.text.start, stop: ctx.text.stop});
        this.setNodeValue(ctx, new css.CssText(text));
    }


    exitCssValue = (ctx: CssValueContext) => {
        const exp = this.getNodeValue(ctx.exp);
        this.setNodeValue(ctx, new css.CssCode(exp));
    }


    buildSection(node, section) {
        if(!section.dialect) {
            const first = this.findFirstValidToken(node.start.tokenIndex);
            const last = this.findLastValidToken(node.stop.tokenIndex);
            section.setSectionFrom(this.path, first, last, parser.Dialect.O);
        }
    }

    findFirstValidToken(idx) {
        if (idx == -1) { // happens because input.index() is called before any other read operation (bug?)
            idx = 0;
        }
        do {
            const token = this.readValidToken(idx++);
            if (token != null) {
                return token;
            }
        } while (idx < this.input.tokenSource.size);
        return null;
    }

    findLastValidToken(idx) {
        if (idx == -1) { // happens because input.index() is called before any other read operation (bug?)
            idx = 0;
        }
        while (idx >= 0) {
            const token = this.readValidToken(idx--);
            if (token != null) {
                return token;
            }
        }
        return null;
    }

    readValidToken(idx) {
        const token = this.input.get(idx);
        const text = token.text;
        // ignore trailing whitespace
        if (text != null && text.replace(/(\n|\r|\t| )/g, "").length > 0) {
            return token;
        } else {
            return null;
        }
    }

}
