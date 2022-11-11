/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {Interval, ParserRuleContext, ParseTree, TerminalNode, Token, TokenStream} from 'antlr4';
import EParserListener from './EParserListener';
import ECleverParser from './ECleverParser';
import ELexer from './ELexer';
import {Dialect, EParser, Section} from "./index";
import {
    Annotation,
    Argument,
    ArgumentList, CategorySymbolList,
    CmpOp,
    ContOp,
    EqOp,
    Identifier,
    IdentifierList,
    MethodDeclarationList,
    NativeCategoryBindingList,
    NativeSymbolList,
    Operator,
    OrderByClause,
    OrderByClauseList, ThenWith
} from "../grammar";
import {
    AssignInstanceStatement,
    AssignTupleStatement,
    AssignVariableStatement,
    AtomicSwitchCase,
    BreakStatement,
    CollectionSwitchCase,
    CommentStatement,
    DeclarationStatement,
    DeleteAndStoreStatement, DoWhileStatement, FetchManyStatement, FetchOneStatement,
    FlushStatement,
    ForEachStatement,
    IfElement,
    IfElementList,
    IfStatement,
    IStatement, MethodCall, RaiseStatement, ReadStatement,
    RemoteCall,
    ReturnStatement,
    StatementList,
    SwitchCase,
    SwitchCaseList, SwitchErrorStatement,
    SwitchStatement,
    UnresolvedCall, WhileStatement, WithResourceStatement, WithSingletonStatement, WriteStatement
} from "../statement";
import {
    Abstract_global_method_declarationContext,
    Abstract_member_method_declarationContext,
    AddExpressionContext,
    AndExpressionContext,
    Annotation_argument_nameContext,
    Annotation_argumentContext,
    Annotation_constructorContext,
    Annotation_identifierContext,
    AnnotationLiteralValueContext,
    AnnotationTypeValueContext,
    Argument_assignmentContext,
    Argument_listContext,
    ArgumentAssignmentListContext,
    ArgumentAssignmentListExpressionContext,
    ArgumentAssignmentListItemContext,
    ArgumentAssignmentListNoExpressionContext,
    Arrow_prefixContext,
    ArrowExpressionBodyContext,
    ArrowExpressionContext,
    ArrowFilterExpressionContext,
    ArrowListArgContext,
    ArrowSingleArgContext,
    ArrowStatementsBodyContext,
    Assertion_listContext,
    AssertionContext,
    Assign_instance_statementContext,
    Assign_tuple_statementContext,
    Assign_variable_statementContext,
    AssignInstanceStatementContext,
    AssignTupleStatementContext,
    AtomicSwitchCaseContext,
    Attribute_declarationContext,
    Attribute_identifier_listContext,
    Attribute_identifierContext,
    AttributeListContext,
    AttributeListItemContext,
    Blob_expressionContext,
    BlobExpressionContext,
    BlobTypeContext,
    BooleanLiteralContext,
    BooleanTypeContext,
    BreakStatementContext,
    Category_typeContext,
    CategoryTypeContext,
    CharacterLiteralContext,
    CharacterTypeContext,
    ChildInstanceContext,
    ClosureExpressionContext,
    ClosureStatementContext,
    CodeArgumentContext,
    CodeTypeContext,
    Collection_literalContext,
    CollectionSwitchCaseContext,
    Comment_statementContext,
    CommentStatementContext,
    CompareExpressionContext,
    Concrete_category_declarationContext,
    Concrete_method_declarationContext,
    Concrete_widget_declarationContext,
    ConcreteCategoryDeclarationContext,
    ConcreteWidgetDeclarationContext,
    ConstructorExpressionContext,
    ConstructorFromContext,
    ConstructorNoFromContext,
    ContainsExpressionContext,
    CssTypeContext,
    DateLiteralContext,
    DateTimeLiteralContext,
    DateTimeTypeContext,
    DateTypeContext,
    DbIdTypeContext,
    DecimalLiteralContext,
    DecimalTypeContext,
    DeclarationContext,
    DeclarationsContext,
    DerivedListContext,
    DerivedListItemContext,
    Dict_entry_listContext,
    Dict_entryContext,
    Dict_literalContext,
    DictKeyIdentifierContext,
    DictKeyTextContext,
    DictTypeContext,
    DivideExpressionContext,
    Do_while_statementContext,
    Doc_entry_listContext,
    Doc_entryContext,
    DocKeyIdentifierContext,
    DocKeyTextContext,
    Document_expressionContext,
    Document_literalContext,
    DocumentExpressionContext,
    DocumentTypeContext,
    DoWhileStatementContext,
    ElseIfStatementListContext,
    ElseIfStatementListItemContext,
    Enum_native_declarationContext,
    EqualsExpressionContext,
    ExplicitFilterExpressionContext,
    FetchExpressionContext,
    FetchManyAsyncContext,
    FetchManyContext,
    FetchOneAsyncContext,
    FetchOneContext,
    FetchStatementContext,
    Filtered_list_suffixContext,
    FilteredListExpressionContext,
    Flush_statementContext,
    FlushStatementContext,
    For_each_statementContext,
    ForEachStatementContext,
    Full_argument_listContext,
    FullDeclarationListContext,
    Getter_method_declarationContext,
    HasAllExpressionContext,
    HasAnyExpressionContext,
    HasExpressionContext,
    HexadecimalLiteralContext,
    HtmlTypeContext,
    IdentifierExpressionContext,
    If_statementContext,
    IfStatementContext,
    ImageTypeContext,
    InExpressionContext,
    InstanceExpressionContext,
    IntDivideExpressionContext,
    IntegerLiteralContext,
    IntegerTypeContext,
    IsATypeExpressionContext,
    IsExpressionContext,
    IsOtherExpressionContext,
    ItemInstanceContext,
    ItemSelectorContext,
    IteratorExpressionContext,
    IteratorTypeContext,
    Java_identifierContext,
    Java_item_expressionContext,
    Java_method_expressionContext,
    Java_primary_expressionContext,
    Java_this_expressionContext,
    JavaArgumentListContext,
    JavaArgumentListItemContext,
    JavaBooleanLiteralContext,
    JavaCategoryBindingContext,
    JavaCharacterLiteralContext,
    JavaChildClassIdentifierContext,
    JavaChildIdentifierContext,
    JavaClassIdentifierContext,
    JavaDecimalLiteralContext,
    JavaIdentifierContext,
    JavaIntegerLiteralContext,
    JavaItemExpressionContext,
    JavaMethodExpressionContext,
    JavaNativeStatementContext,
    JavaPrimaryExpressionContext,
    JavaReturnStatementContext,
    Javascript_category_bindingContext,
    Javascript_identifier_expressionContext,
    Javascript_identifierContext,
    Javascript_item_expressionContext,
    Javascript_method_expressionContext,
    Javascript_moduleContext,
    Javascript_native_statementContext,
    Javascript_new_expressionContext,
    Javascript_primary_expressionContext,
    Javascript_this_expressionContext,
    JavascriptArgumentListContext,
    JavascriptArgumentListItemContext,
    JavascriptBooleanLiteralContext,
    JavascriptCategoryBindingContext,
    JavascriptCharacterLiteralContext,
    JavascriptDecimalLiteralContext,
    JavascriptIntegerLiteralContext,
    JavascriptItemExpressionContext,
    JavascriptMemberExpressionContext,
    JavascriptMethodExpressionContext,
    JavascriptNativeStatementContext,
    JavascriptPrimaryExpressionContext,
    JavascriptReturnStatementContext,
    JavascriptSelectorExpressionContext,
    JavascriptStatementContext,
    JavascriptTextLiteralContext,
    JavaSelectorExpressionContext,
    JavaStatementContext,
    JavaTextLiteralContext,
    Key_tokenContext,
    List_literalContext,
    ListTypeContext,
    Literal_expressionContext,
    Literal_list_literalContext,
    LiteralExpressionContext,
    LiteralListLiteralContext,
    LiteralRangeLiteralContext,
    MaxIntegerLiteralContext,
    Member_identifierContext,
    Member_method_declaration_listContext,
    Member_method_declarationContext,
    MemberInstanceContext,
    MemberSelectorContext,
    Method_declarationContext,
    Method_identifierContext,
    MethodCallExpressionContext,
    MethodCallStatementContext,
    MinIntegerLiteralContext,
    MinusExpressionContext,
    ModuloExpressionContext,
    MultiplyExpressionContext,
    Mutable_category_typeContext,
    MutableInstanceExpressionContext,
    MutableSelectableExpressionContext,
    MutableSelectorExpressionContext,
    Named_argumentContext,
    Native_category_bindingsContext,
    Native_category_declarationContext,
    Native_getter_declarationContext,
    Native_member_method_declaration_listContext,
    Native_member_method_declarationContext,
    Native_method_declarationContext,
    Native_resource_declarationContext,
    Native_setter_declarationContext,
    Native_statement_listContext,
    Native_symbol_listContext,
    Native_symbolContext,
    Native_widget_declarationContext,
    NativeCategoryBindingListContext,
    NativeCategoryBindingListItemContext,
    NativeCategoryDeclarationContext,
    NativeTypeContext,
    NativeWidgetDeclarationContext,
    NotExpressionContext,
    NullLiteralContext,
    Operator_argumentContext,
    Operator_method_declarationContext,
    OperatorArgumentContext,
    OperatorDivideContext,
    OperatorIDivideContext,
    OperatorMinusContext,
    OperatorModuloContext,
    OperatorMultiplyContext,
    OperatorPlusContext,
    Order_by_listContext,
    Order_byContext,
    OrExpressionContext,
    Parenthesis_expressionContext,
    ParenthesisExpressionContext,
    PeriodLiteralContext,
    PeriodTypeContext,
    PrimaryTypeContext,
    RaiseStatementContext,
    Range_literalContext,
    Resource_declarationContext,
    Return_statementContext,
    ReturnStatementContext,
    RootInstanceContext,
    SelectableExpressionContext,
    SelectorExpressionContext,
    Set_literalContext,
    Setter_method_declarationContext,
    SetTypeContext,
    Singleton_category_declarationContext,
    SingletonCategoryDeclarationContext,
    SliceFirstAndLastContext,
    SliceFirstOnlyContext,
    SliceLastOnlyContext,
    SliceSelectorContext,
    Sorted_expressionContext,
    Sorted_keyContext,
    SortedExpressionContext,
    Statement_listContext,
    Store_statementContext,
    StoreStatementContext,
    SuperExpressionContext,
    Switch_case_statement_listContext,
    Switch_statementContext,
    SwitchStatementContext,
    Symbol_identifierContext,
    SymbolIdentifierContext,
    SymbolLiteralContext,
    Symbols_tokenContext,
    TernaryExpressionContext,
    Test_method_declarationContext,
    TextLiteralContext,
    TextTypeContext,
    ThenContext,
    ThisExpressionContext,
    TimeLiteralContext,
    TimeTypeContext,
    TryStatementContext,
    Tuple_literalContext,
    Type_identifier_listContext,
    Type_identifierContext,
    Type_literalContext,
    Typed_argumentContext,
    TypeIdentifierContext,
    TypeLiteralContext,
    TypeTypeContext,
    Unresolved_selectorContext,
    UnresolvedExpressionContext,
    UnresolvedIdentifierContext,
    UnresolvedSelectorContext,
    UnresolvedWithArgsStatementContext,
    UUIDLiteralContext,
    UUIDTypeContext,
    Value_tokenContext,
    Variable_identifier_listContext,
    Variable_identifierContext,
    VariableIdentifierContext,
    VersionLiteralContext,
    VersionTypeContext,
    While_statementContext,
    WhileStatementContext,
    WithResourceStatementContext,
    WriteStatementContext,
    OtherFilterExpressionContext,
    Code_typeContext,
    ExecuteExpressionContext,
    Expression_listContext,
    Expression_tupleContext,
    CodeExpressionContext,
    Code_argumentContext,
    Category_or_any_typeContext,
    Category_symbolContext,
    Category_symbol_listContext,
    Enum_category_declarationContext,
    Enum_declarationContext,
    Read_all_expressionContext,
    Read_blob_expressionContext,
    Read_one_expressionContext,
    Read_statementContext,
    ReadAllExpressionContext,
    ReadBlobExpressionContext,
    ReadOneExpressionContext,
    ReadStatementContext,
    ReplContext,
    With_singleton_statementContext,
    WithSingletonStatementContext,
    Write_statementContext,
    With_resource_statementContext,
    AnyTypeContext,
    AnyListTypeContext,
    AnyDictTypeContext,
    CastExpressionContext,
    CatchAtomicStatementContext,
    Catch_statement_listContext,
    CatchCollectionStatementContext,
    Try_statementContext,
    Raise_statementContext,
    MatchingListContext,
    MatchingRangeContext,
    MatchingExpressionContext,
    MatchingPatternContext,
    LiteralSetLiteralContext,
    Include_listContext,
    Invocation_expressionContext,
    InvocationExpressionContext,
    InvokeStatementContext,
    Csharp_identifierContext,
    CSharpIdentifierContext,
    CSharpChildIdentifierContext,
    CSharpBooleanLiteralContext,
    CSharpIntegerLiteralContext,
    CSharpDecimalLiteralContext,
    CSharpCharacterLiteralContext,
    CSharpTextLiteralContext,
    CSharpCategoryBindingContext,
    Csharp_this_expressionContext,
    Csharp_primary_expressionContext,
    Csharp_method_expressionContext,
    CSharpMethodExpressionContext,
    CSharpArgumentListContext,
    CSharpArgumentListItemContext,
    CSharpNativeStatementContext,
    CSharpPromptoIdentifierContext,
    CSharpPrimaryExpressionContext,
    CSharpSelectorExpressionContext,
    CSharpStatementContext,
    CSharpReturnStatementContext,
    PythonStatementContext,
    PythonReturnStatementContext,
    Python2CategoryBindingContext,
    Python3CategoryBindingContext,
    Python_category_bindingContext,
    Python_method_expressionContext,
    PythonGlobalMethodExpressionContext,
    PythonMethodExpressionContext,
    Python_moduleContext,
    Python2NativeStatementContext,
    Python3NativeStatementContext,
    Python_native_statementContext,
    Python_identifierContext,
    PythonIdentifierContext,
    PythonIdentifierExpressionContext,
    PythonChildIdentifierContext,
    PythonBooleanLiteralContext,
    PythonIntegerLiteralContext,
    PythonDecimalLiteralContext,
    PythonCharacterLiteralContext,
    PythonTextLiteralContext,
    PythonLiteralExpressionContext,
    PythonPromptoIdentifierContext,
    PythonPrimaryExpressionContext,
    PythonArgumentListContext,
    PythonNamedOnlyArgumentListContext,
    PythonNamedArgumentListContext,
    PythonNamedArgumentListItemContext,
    PythonOrdinalOnlyArgumentListContext,
    PythonOrdinalArgumentListContext,
    PythonOrdinalArgumentListItemContext,
    PythonSelectorExpressionContext,
    PythonSelfExpressionContext,
    JsxChildContext,
    JsxCodeContext,
    JsxExpressionContext,
    JsxElementContext,
    JsxSelfClosingContext,
    JsxTextContext,
    JsxValueContext,
    Jsx_attributeContext,
    Jsx_childrenContext,
    Jsx_element_nameContext,
    Jsx_expressionContext,
    Jsx_identifierContext,
    Jsx_fragmentContext,
    JsxLiteralContext,
    Jsx_openingContext,
    Jsx_closingContext,
    Jsx_self_closingContext,
    CssExpressionContext,
    Css_expressionContext,
    Css_fieldContext,
    CssTextContext,
    CssValueContext
} from "./EParser";
import {
    AndExpression,
    ArrowExpression,
    AssertionList,
    BaseExpression,
    BlobExpression, CastExpression, CategorySymbol, CodeExpression,
    CompareExpression,
    ConstructorExpression,
    ContainsExpression,
    DivideExpression,
    DocumentExpression,
    EqualsExpression, ExecuteExpression, ExplicitPredicateExpression,
    ExpressionList, FetchManyExpression, FetchOneExpression, FilteredExpression,
    IAssertion,
    IExpression,
    InstanceExpression,
    IntDivideExpression,
    ItemSelector,
    IteratorExpression,
    MemberSelector,
    MethodExpression, MethodSelector,
    MinusExpression,
    ModuloExpression,
    MultiplyExpression,
    MutableExpression,
    NativeSymbol, NotExpression,
    OrExpression,
    ParenthesisExpression,
    PlusExpression, PredicateExpression, ReadAllExpression, ReadBlobExpression,
    ReadOneExpression, SelectorExpression, SortedExpression,
    SubtractExpression,
    SuperExpression,
    SymbolExpression,
    TernaryExpression,
    ThisExpression,
    TypeExpression,
    UnresolvedIdentifier,
    UnresolvedSelector
} from "../expression";
import SelectorBase from "../expression/SelectorBase";
import {
    BooleanLiteral,
    CharacterLiteral,
    DateLiteral,
    DateTimeLiteral,
    DecimalLiteral,
    DictEntry,
    DictEntryList,
    DictIdentifierKey,
    DictLiteral,
    DictTextKey,
    DocEntry,
    DocEntryList,
    DocTextKey, DocumentLiteral,
    HexaLiteral,
    IntegerLiteral,
    ListLiteral,
    MaxIntegerLiteral,
    MinIntegerLiteral,
    NullLiteral,
    PeriodLiteral,
    RangeLiteral,
    SetLiteral,
    TextLiteral,
    TimeLiteral,
    TupleLiteral,
    TypeLiteral,
    UUIDLiteral,
    VersionLiteral
} from "../literal";
import {
    AnyType,
    BlobType,
    BooleanType,
    CategoryType,
    CharacterType,
    CodeType,
    CssType,
    DateTimeType,
    DateType,
    DbIdType,
    DecimalType,
    DictionaryType, DocumentType,
    HtmlType,
    ImageType,
    IntegerType,
    IteratorType,
    IType,
    ListType,
    PeriodType,
    SetType,
    TextType,
    TimeType,
    TypeType,
    UUIDType,
    VersionType
} from "../type";
import {
    AbstractMethodDeclaration,
    AttributeDeclaration,
    ConcreteCategoryDeclaration,
    ConcreteMethodDeclaration,
    ConcreteWidgetDeclaration,
    DeclarationList, EnumeratedCategoryDeclaration,
    EnumeratedNativeDeclaration,
    GetterMethodDeclaration,
    IDeclaration,
    IMethodDeclaration,
    NativeCategoryDeclaration,
    NativeGetterMethodDeclaration,
    NativeMethodDeclaration,
    NativeResourceDeclaration,
    NativeSetterMethodDeclaration,
    NativeWidgetDeclaration,
    OperatorMethodDeclaration,
    SetterMethodDeclaration, SingletonCategoryDeclaration,
    TestMethodDeclaration
} from "../declaration";
import DictKey from "../literal/DictKey";
import DocIdentifierKey from "../literal/DocIdentifierKey";
import {
    IConstraint,
    MatchingCollectionConstraint,
    MatchingExpressionConstraint,
    MatchingPatternConstraint
} from "../constraint";
import {
    CategoryParameter,
    CodeParameter,
    ExtendedParameter,
    IParameter,
    ParameterList,
    UnresolvedParameter
} from "../param";
import {ItemInstance, MemberInstance, VariableInstance} from "../instance";
import IAssignableSelector from "../instance/IAssignableSelector";
import IAssignableInstance from "../instance/IAssignableInstance";
import {
    JavaScriptBooleanLiteral,
    JavaScriptCharacterLiteral,
    JavaScriptDecimalLiteral,
    JavaScriptExpression,
    JavaScriptExpressionList,
    JavaScriptIdentifierExpression,
    JavaScriptIntegerLiteral,
    JavaScriptItemExpression,
    JavaScriptMemberExpression,
    JavaScriptMethodExpression,
    JavaScriptModule,
    JavaScriptNativeCall,
    JavaScriptNativeCategoryBinding,
    JavaScriptNewExpression,
    JavaScriptStatement,
    JavaScriptTextLiteral,
    JavaScriptThisExpression
} from "../javascript";
import {
    JavaBooleanLiteral,
    JavaCharacterLiteral,
    JavaDecimalLiteral,
    JavaExpressionList,
    JavaIdentifierExpression,
    JavaIntegerLiteral,
    JavaItemExpression,
    JavaMethodExpression,
    JavaNativeCall,
    JavaNativeCategoryBinding,
    JavaStatement,
    JavaTextLiteral,
    JavaThisExpression
} from "../java";
import JavaExpression from "../java/JavaExpression";
import JavaSelectorExpression from "../java/JavaSelectorExpression";
import JavaScriptSelectorExpression from "../javascript/JavaScriptSelectorExpression";
import INativeCategoryBinding from "../grammar/INativeCategoryBinding";
import DocKey from "../literal/DocKey";
import {
    CSharpBooleanLiteral,
    CSharpCharacterLiteral,
    CSharpDecimalLiteral, CSharpExpressionList,
    CSharpIdentifierExpression,
    CSharpIntegerLiteral, CSharpMethodExpression, CSharpNativeCall,
    CSharpNativeCategoryBinding, CSharpSelectorExpression, CSharpStatement,
    CSharpTextLiteral, CSharpThisExpression
} from "../csharp";
import CSharpExpression from "../csharp/CSharpExpression";
import {
    Python2NativeCall,
    Python2NativeCategoryBinding,
    Python3NativeCall,
    Python3NativeCategoryBinding, PythonArgumentList,
    PythonBooleanLiteral, PythonCharacterLiteral, PythonDecimalLiteral,
    PythonIdentifierExpression, PythonIntegerLiteral,
    PythonMethodExpression,
    PythonModule, PythonNamedArgument,
    PythonNativeCall,
    PythonNativeCategoryBinding, PythonOrdinalArgument, PythonSelfExpression,
    PythonStatement,
    PythonTextLiteral,
    PythonSelectorExpression
} from "../python";
import {
    JsxClosing,
    JsxCode,
    JsxElement,
    JsxExpression,
    JsxFragment,
    JsxLiteral,
    JsxProperty,
    JsxSelfClosing,
    JsxText
} from "../jsx";
import {getFullText} from "./ParserUtils";
import IJsxValue from "../jsx/IJsxValue";
import IJsxExpression from "../jsx/IJsxExpression";
import {CssCode, CssExpression, CssField, CssText} from "../css";
import ICssValue from "../css/ICssValue";
import IPythonExpression from "../python/IPythonExpression";

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

    setNodeValue(node: ParserRuleContext, value: object | null) {
        if(value == null)
            return;
        const indexedNode = node as IndexedNode;
        let id = indexedNode.__id
        if (id == undefined) {
            id = this.nextNodeId++;
            indexedNode.__id = id;
        }
        this.nodeValues.set(id, value);
        if (value instanceof Section) {
            this.buildSection(node, value);
        }
    }

    getNodeValue<T>(node: ParserRuleContext): T | null {
        const indexedNode = node as IndexedNode;
        const id = indexedNode == null ? undefined : indexedNode.__id;
        if (id == undefined)
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
        if (hidden == null || hidden.length == 0)
            return null;
        else
            return hidden.map(token => token.text).join("");
    }

    getWhiteSpacePlus(ctx: ParserRuleContext): string | null {
        let within: string | null = null;
        if(ctx.children != null) {
            within = ctx.children
                .filter(child => this.isNotIndent(child), this)
                .map(child => child.getText(), this)
                .join("");
        }
        if (within == null || within.length == 0)
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

    isNotIndent(tree: ParseTree): boolean {
        if(tree instanceof TerminalNode)
            return tree.symbol.type != EParser.INDENT;
        else
            return false;
    }

    readAnnotations(ctxs: ParserRuleContext[]): Annotation[] | null {
        const annotations = ctxs.map(csc => this.getNodeValue<Annotation>(csc)!, this);
        return (annotations.length == 0) ? null : annotations;
    }

    readComments(ctxs: ParserRuleContext[]): CommentStatement[] | null {
        const comments = ctxs.map(csc => this.getNodeValue<CommentStatement>(csc)!, this);
        return (comments.length == 0) ? null : comments;
    }

    buildSection(node: ParserRuleContext, section: Section) {
        if(!section.dialect) {
            const first = this.findFirstValidToken(node.start.tokenIndex, section instanceof JsxText);
            const last = this.findLastValidToken(node.stop!.tokenIndex, section instanceof JsxText);
            section.setSectionFrom(this.path, first!, last!, Dialect.E);
        }
    }

    findFirstValidToken(idx: number, allowWS: boolean): Token | null {
        if (idx == -1) { // happens because input.index() is called before any other read operation (bug?)
            idx = 0;
        }
        do {
            const token = this.readValidToken(idx++, allowWS);
            if (token) {
                return token;
            }
        } while (idx < this.input.size);
        return null;
    }

    findLastValidToken(idx: number, allowWS: boolean): Token | null {
        if (idx == -1) { // happens because input.index() is called before any other read operation (bug?)
            idx = 0;
        }
        while (idx >= 0) {
            const token = this.readValidToken(idx--, allowWS);
            if (token != null) {
                return token;
            }
        }
        return null;
    }

    readValidToken(idx: number, allowWS: boolean): Token | null {
        const token = this.input.get(idx);
        const text = token.text;
        // ignore trailing whitespace
        if (text != null && (allowWS || text.replace(/(\n|\r|\t| )/g, "").length > 0)) {
            return token;
        } else {
            return null;
        }
    }

    exitIdentifierExpression = (ctx: IdentifierExpressionContext) => {
        const exp = this.getNodeValue<Identifier>(ctx._exp);
        this.setNodeValue(ctx, new UnresolvedIdentifier(exp!));
    };

    exitTypeIdentifier = (ctx: TypeIdentifierContext) => {
        const name = this.getNodeValue<Identifier>(ctx.type_identifier());
        this.setNodeValue(ctx, name);
    };

    exitMethodCallExpression = (ctx: MethodCallExpressionContext) => {
        const exp = this.getNodeValue<IExpression>(ctx._exp1 || ctx._exp2);
        const args = this.getNodeValue<ArgumentList>(ctx._args);
        const call = new UnresolvedCall(exp!, args);
        this.setNodeValue(ctx, call);
    }
    
    exitUnresolvedExpression = (ctx: UnresolvedExpressionContext) => {
        const exp = this.getNodeValue<BaseExpression>(ctx._exp);
        this.setNodeValue(ctx, exp);
    }

    exitUnresolvedIdentifier = (ctx: UnresolvedIdentifierContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        this.setNodeValue(ctx, new UnresolvedIdentifier(name!));
    }

    exitUnresolvedSelector = (ctx: UnresolvedSelectorContext) => {
        const parent = this.getNodeValue<BaseExpression>(ctx._parent);
        const selector = this.getNodeValue<SelectorBase>(ctx._selector);
        if(selector)
            selector.parent = parent!;
        this.setNodeValue(ctx, selector);
    }

    exitUnresolved_selector = (ctx: Unresolved_selectorContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        this.setNodeValue(ctx, new MemberSelector(null, name!));
    }

    exitUUIDLiteral = (ctx: UUIDLiteralContext) => {
        this.setNodeValue(ctx, new UUIDLiteral(ctx.getText()));
    }

    exitUUIDType = (ctx: UUIDTypeContext) => {
        this.setNodeValue(ctx, UUIDType.instance);
    }

    exitCommentStatement = (ctx: CommentStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.comment_statement()));
    }

    exitComment_statement = (ctx: Comment_statementContext) => {
        this.setNodeValue(ctx, new CommentStatement(ctx.getText()));
    }

    exitBlob_expression = (ctx: Blob_expressionContext) => {
        const exp = this.getNodeValue<IExpression>(ctx.expression());
        this.setNodeValue(ctx, new BlobExpression(exp!));
    }

    exitBlobExpression = (ctx: BlobExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue<IExpression>(ctx._exp));
    }

    exitBooleanLiteral = (ctx: BooleanLiteralContext) => {
        this.setNodeValue(ctx, new BooleanLiteral(ctx.getText()));
    }


    exitBreakStatement = (ctx: BreakStatementContext) => {
        this.setNodeValue(ctx, new BreakStatement());
    }


    exitMinIntegerLiteral = (ctx: MinIntegerLiteralContext) => {
        this.setNodeValue(ctx, new MinIntegerLiteral());
    }

    exitMaxIntegerLiteral = (ctx: MaxIntegerLiteralContext) => {
        this.setNodeValue(ctx, new MaxIntegerLiteral());
    }

    exitIntegerLiteral = (ctx: IntegerLiteralContext) => {
        this.setNodeValue(ctx, new IntegerLiteral(ctx.getText()));
    }

    exitDecimalLiteral = (ctx: DecimalLiteralContext) => {
        this.setNodeValue(ctx, new DecimalLiteral(ctx.getText()));
    }

    exitHexadecimalLiteral = (ctx: HexadecimalLiteralContext) => {
        this.setNodeValue(ctx, new HexaLiteral(ctx.getText()));
    }

    exitCharacterLiteral = (ctx: CharacterLiteralContext) => {
        this.setNodeValue(ctx, new CharacterLiteral(ctx.getText()));
    }

    exitDateLiteral = (ctx: DateLiteralContext) => {
        this.setNodeValue(ctx, new DateLiteral(ctx.getText()));
    }

    exitDateTimeLiteral = (ctx: DateTimeLiteralContext) => {
        this.setNodeValue(ctx, new DateTimeLiteral(ctx.getText()));
    }

    exitDbIdType = (ctx: DbIdTypeContext) => {
        this.setNodeValue(ctx, DbIdType.instance);
    }

    exitTernaryExpression = (ctx: TernaryExpressionContext) => {
        const condition = this.getNodeValue<IExpression>(ctx._test);
        const ifTrue = this.getNodeValue<IExpression>(ctx._ifTrue);
        const ifFalse = this.getNodeValue<IExpression>(ctx._ifFalse);
        const exp = new TernaryExpression(condition!, ifTrue!, ifFalse!);
        this.setNodeValue(ctx, exp);
    }

    exitTest_method_declaration = (ctx: Test_method_declarationContext) => {
        const name = new Identifier(ctx._name.text);
        name.setSectionFrom(this.path, ctx._name, ctx._name, Dialect.E);
        const stmts = this.getNodeValue<StatementList>(ctx._stmts);
        const exps = this.getNodeValue<AssertionList>(ctx._exps);
        const errorName = this.getNodeValue<Identifier>(ctx._error);
        const error = errorName == null ? null : new SymbolExpression(errorName);
        this.setNodeValue(ctx, new TestMethodDeclaration(name, stmts!, exps!, error));
    }

    exitTextLiteral = (ctx: TextLiteralContext) => {
        this.setNodeValue(ctx, new TextLiteral(ctx.getText()));
    }

    exitTimeLiteral = (ctx: TimeLiteralContext) => {
        this.setNodeValue(ctx, new TimeLiteral(ctx.getText()));
    }


    exitPeriodLiteral = (ctx: PeriodLiteralContext) => {
        this.setNodeValue(ctx, new PeriodLiteral(ctx.getText()));
    }


    exitPeriodType = (ctx: PeriodTypeContext) => {
        this.setNodeValue(ctx, PeriodType.instance);
    }


    exitVersionLiteral = (ctx: VersionLiteralContext) => {
        this.setNodeValue(ctx, new VersionLiteral(ctx.getText()));
    }


    exitVersionType = (ctx: VersionTypeContext) => {
        this.setNodeValue(ctx, VersionType.instance);
    }


    exitAttribute_identifier = (ctx: Attribute_identifierContext) => {
        const name = new Identifier(ctx.getText());
        this.setNodeValue(ctx, name);
    }

    exitVariable_identifier = (ctx: Variable_identifierContext) => {
        const name = new Identifier(ctx.getText());
        this.setNodeValue(ctx, name);
    }

    exitList_literal = (ctx: List_literalContext) => {
        const mutable = ctx.MUTABLE() != null;
        const items = this.getNodeValue<ExpressionList>(ctx.expression_list()) || null;
        const value = new ListLiteral(mutable, items);
        this.setNodeValue(ctx, value);
    }

    exitDict_literal = (ctx: Dict_literalContext) => {
        const mutable = ctx.MUTABLE() != null;
        const items = this.getNodeValue<DictEntryList>(ctx.dict_entry_list()) || null;
        const value = new DictLiteral(mutable, items);
        this.setNodeValue(ctx, value);
    }

    exitTuple_literal = (ctx: Tuple_literalContext) => {
        const mutable = ctx.MUTABLE() != null;
        const items = this.getNodeValue<ExpressionList>(ctx.expression_tuple()) || null;
        const value = new TupleLiteral(mutable, items);
        this.setNodeValue(ctx, value);
    }


    exitRange_literal = (ctx: Range_literalContext) => {
        const low = this.getNodeValue<IExpression>(ctx._low);
        const high = this.getNodeValue<IExpression>(ctx._high);
        this.setNodeValue(ctx, new RangeLiteral(low!, high!));
    }


    exitDict_entry_list = (ctx: Dict_entry_listContext) => {
        const items = ctx.dict_entry_list().map(r =>this.getNodeValue<DictEntry>(r)!, this);
        this.setNodeValue(ctx, new DictEntryList(items));
    }


    exitDict_entry = (ctx: Dict_entryContext) => {
        const key = this.getNodeValue<DictKey>(ctx._key);
        const value = this.getNodeValue<IExpression>(ctx._value);
        const entry = new DictEntry(key!, value!);
        this.setNodeValue(ctx, entry);
    }


    exitDoc_entry_list = (ctx: Doc_entry_listContext) => {
        const items = ctx.doc_entry_list().map(r => this.getNodeValue<DocEntry>(r)!, this);
        this.setNodeValue(ctx, new DocEntryList(items));
    }


    exitDoc_entry = (ctx: Doc_entryContext) => {
        const key = this.getNodeValue<DocKey>(ctx._key);
        const value = this.getNodeValue<IExpression>(ctx._value);
        const entry = new DocEntry(key, value!);
        this.setNodeValue(ctx, entry);
    }


    exitDocKeyIdentifier = (ctx: DocKeyIdentifierContext) => {
        const text = ctx._name.getText();
        this.setNodeValue(ctx, new DocIdentifierKey(new Identifier(text)));
    }


    exitDocKeyText = (ctx: DocKeyTextContext) => {
        const text = ctx._name.text;
        this.setNodeValue(ctx, new DocTextKey(text));
    }


    exitLiteral_expression = (ctx: Literal_expressionContext) => {
        const exp = this.getNodeValue<BaseExpression>(ctx.getChild(0) as ParserRuleContext);
        this.setNodeValue(ctx, exp);
    }


    exitLiteralExpression = (ctx: LiteralExpressionContext) => {
        const exp = this.getNodeValue<BaseExpression>(ctx._exp);
        this.setNodeValue(ctx, exp);
    }


    exitVariableIdentifier = (ctx: VariableIdentifierContext) => {
        const name = this.getNodeValue<Identifier>(ctx.variable_identifier());
        this.setNodeValue(ctx, name);
    }


    exitSymbol_identifier = (ctx: Symbol_identifierContext) => {
        const name = new Identifier(ctx.getText());
        this.setNodeValue(ctx, name);
    }


    exitNative_symbol = (ctx: Native_symbolContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        this.setNodeValue(ctx, new NativeSymbol(name!, exp!));
    }


    exitSymbolIdentifier = (ctx: SymbolIdentifierContext) => {
        const name = this.getNodeValue<Identifier>(ctx.symbol_identifier());
        this.setNodeValue(ctx, name);
    }


    exitSymbolLiteral = (ctx: SymbolLiteralContext) => {
        const name = ctx.getText();
        this.setNodeValue(ctx, new SymbolExpression(new Identifier(name)));
    }


    exitBlobType = (ctx: BlobTypeContext) => {
        this.setNodeValue(ctx, BlobType.instance);
    }

    exitBooleanType = (ctx: BooleanTypeContext) => {
        this.setNodeValue(ctx, BooleanType.instance);
    }


    exitCharacterType = (ctx: CharacterTypeContext) => {
        this.setNodeValue(ctx, CharacterType.instance);
    }

    exitImageType = (ctx: ImageTypeContext) => {
        this.setNodeValue(ctx, ImageType.instance);
    }


    exitTextType = (ctx: TextTypeContext) => {
        this.setNodeValue(ctx, TextType.instance);
    }


    exitHtmlType = (ctx: HtmlTypeContext) => {
        this.setNodeValue(ctx, HtmlType.instance);
    }


    exitThisExpression = (ctx: ThisExpressionContext) => {
        this.setNodeValue(ctx, new ThisExpression());
    }

    exitIntegerType = (ctx: IntegerTypeContext) => {
        this.setNodeValue(ctx, IntegerType.instance);
    }

    exitDecimalType = (ctx: DecimalTypeContext) => {
        this.setNodeValue(ctx, DecimalType.instance);
    }


    exitDateType = (ctx: DateTypeContext) => {
        this.setNodeValue(ctx, DateType.instance);
    }


    exitDateTimeType = (ctx: DateTimeTypeContext) => {
        this.setNodeValue(ctx, DateTimeType.instance);
    }


    exitTimeType = (ctx: TimeTypeContext) => {
        this.setNodeValue(ctx, TimeType.instance);
    }


    exitCodeType = (ctx: CodeTypeContext) => {
        this.setNodeValue(ctx, CodeType.instance);
    }


    exitPrimaryType = (ctx: PrimaryTypeContext) => {
        const type = this.getNodeValue<IType>(ctx._p);
        this.setNodeValue(ctx, type);
    }

    exitAttribute_declaration = (ctx: Attribute_declarationContext) => {
        const id = this.getNodeValue<Identifier>(ctx._name);
        const typ = this.getNodeValue<IType>(ctx._typ);
        const match = this.getNodeValue<IConstraint>(ctx._match);
        let indices: IdentifierList | null = null;
        if (ctx._indices != null)
            indices = this.getNodeValue(ctx._indices);
        else if (ctx.INDEX() != null)
            indices = new IdentifierList();
        if (ctx._index != null)
            indices!.push(this.getNodeValue<Identifier>(ctx._index)!);
        const decl = new AttributeDeclaration(id!, typ!, match, indices);
        decl.storable = ctx.STORABLE() != null;
        this.setNodeValue(ctx, decl);
    }

    exitNativeType = (ctx: NativeTypeContext) => {
        const type = this.getNodeValue<IType>(ctx._n);
        this.setNodeValue(ctx, type);
    }

    exitCategoryType = (ctx: CategoryTypeContext) => {
        const type = this.getNodeValue<IType>(ctx._c);
        this.setNodeValue(ctx, type);
    }


    exitCategory_type = (ctx: Category_typeContext) => {
        const name = new Identifier(ctx.getText());
        this.buildSection(ctx, name);
        this.setNodeValue(ctx, new CategoryType(name));
    }

    exitListType = (ctx: ListTypeContext) => {
        const typ = this.getNodeValue<IType>(ctx._l);
        this.setNodeValue(ctx, new ListType(typ!));
    }

    exitDictKeyIdentifier = (ctx: DictKeyIdentifierContext) => {
        const text = ctx._name.getText();
        this.setNodeValue(ctx, new DictIdentifierKey(new Identifier(text)));
    }

    exitDictKeyText = (ctx: DictKeyTextContext) => {
        const text = ctx._name.text;
        this.setNodeValue(ctx, new DictTextKey(text));
    }

    exitDictType = (ctx: DictTypeContext) => {
        const typ = this.getNodeValue<IType>(ctx._d);
        this.setNodeValue(ctx, new DictionaryType(typ!));
    }

    exitAttributeList = (ctx: AttributeListContext) => {
        const item = this.getNodeValue<Identifier>(ctx._item);
        this.setNodeValue(ctx, new IdentifierList(null, item));
    }
    
    exitAttributeListItem = (ctx: AttributeListItemContext) => {
        const items = this.getNodeValue<IdentifierList>(ctx._items);
        const item = this.getNodeValue<Identifier>(ctx._item);
        items!.add(item!);
        this.setNodeValue(ctx, items);
    }
    
    exitAttribute_identifier_list = (ctx: Attribute_identifier_listContext) => {
        const items = ctx.attribute_identifier_list().map(r => this.getNodeValue<Identifier>(r)!, this);
        this.setNodeValue(ctx, new IdentifierList(items));
    }
    
    exitVariable_identifier_list = (ctx: Variable_identifier_listContext) => {
        const items = ctx.variable_identifier_list().map(r => this.getNodeValue<Identifier>(r)!, this);
        this.setNodeValue(ctx, new IdentifierList(items));
    }
    
    exitConcrete_category_declaration = (ctx: Concrete_category_declarationContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        const attrs = this.getNodeValue<IdentifierList>(ctx._attrs) || null;
        const derived = this.getNodeValue<IdentifierList>(ctx._derived) || null;
        const methods = this.getNodeValue<IMethodDeclaration[]>(ctx._methods) || null;
        const decl = new ConcreteCategoryDeclaration(name!, attrs, derived, methods);
        decl.storable = ctx.STORABLE() != null;
        this.setNodeValue(ctx, decl);
    }

    exitConcrete_widget_declaration = (ctx: Concrete_widget_declarationContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        const derived = this.getNodeValue<Identifier>(ctx._derived) || null;
        const methods = this.getNodeValue<IMethodDeclaration[]>(ctx._methods) || null;
        const decl = new ConcreteWidgetDeclaration(name!, derived, methods);
        this.setNodeValue(ctx, decl);
    }

    exitConcreteCategoryDeclaration = (ctx: ConcreteCategoryDeclarationContext) => {
        const decl = this.getNodeValue<IDeclaration>(ctx._decl);
        this.setNodeValue(ctx, decl);
    }

    exitConcreteWidgetDeclaration = (ctx: ConcreteWidgetDeclarationContext) => {
        const decl = this.getNodeValue<IDeclaration>(ctx._decl);
        this.setNodeValue(ctx, decl);
    }

    exitNativeWidgetDeclaration = (ctx: NativeWidgetDeclarationContext) => {
        const decl = this.getNodeValue<IDeclaration>(ctx._decl);
        this.setNodeValue(ctx, decl);
    }

    exitDerivedList = (ctx: DerivedListContext) => {
        const items = this.getNodeValue<IdentifierList>(ctx._items);
        this.setNodeValue(ctx, items);
    }


    exitDerivedListItem = (ctx: DerivedListItemContext) => {
        const items = this.getNodeValue<IdentifierList>(ctx._items);
        const item = this.getNodeValue<Identifier>(ctx._item);
        items!.add(item!);
        this.setNodeValue(ctx, items);
    }

    exitType_identifier = (ctx: Type_identifierContext) => {
        const name = new Identifier(ctx.getText());
        this.setNodeValue(ctx, name);
    }

    exitType_identifier_list = (ctx: Type_identifier_listContext) => {
        const items = ctx.type_identifier_list().map(r => this.getNodeValue<Identifier>(r)!, this);
        this.setNodeValue(ctx, new IdentifierList(items));
    }

    exitType_literal = (ctx: Type_literalContext) => {
        const typ = this.getNodeValue<IType>(ctx.category_or_any_type());
        this.setNodeValue(ctx, new TypeLiteral(typ!));
    }

    exitTypeLiteral = (ctx: TypeLiteralContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.type_literal()));
    }

    exitTypeType = (ctx: TypeTypeContext) => {
        const typ = this.getNodeValue<IType>(ctx._t);
        this.setNodeValue(ctx, new TypeType(typ!));
    }

    exitInstanceExpression = (ctx: InstanceExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitSelectableExpression = (ctx: SelectableExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._parent));
    }

    exitSelectorExpression = (ctx: SelectorExpressionContext) => {
        const selector = this.getNodeValue<SelectorBase>(ctx._selector);
        if (selector) {
            selector.parent = this.getNodeValue<IExpression>(ctx._parent)!;
            this.setNodeValue(ctx, selector);
        }
    }

    exitSet_literal = (ctx: Set_literalContext) => {
        const items = this.getNodeValue<ExpressionList>(ctx.expression_list());
        this.setNodeValue(ctx, new SetLiteral(items));
    }

    exitStoreStatement = (ctx: StoreStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._stmt));
    }

    exitStore_statement = (ctx: Store_statementContext) => {
        const del = this.getNodeValue<ExpressionList>(ctx._to_del);
        const add = this.getNodeValue<ExpressionList>(ctx._to_add);
        const meta = this.getNodeValue<IExpression>(ctx._with_meta);
        const stmts = this.getNodeValue<StatementList>(ctx._stmts);
        const stmt = new DeleteAndStoreStatement(del, add, meta, stmts!);
        this.setNodeValue(ctx, stmt);
    }


    exitMember_identifier = (ctx: Member_identifierContext) => {
        const name = new Identifier(ctx.getText());
        this.setNodeValue(ctx, name);
    }

    exitMemberSelector = (ctx: MemberSelectorContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        this.setNodeValue(ctx, new UnresolvedSelector(null, name!));
    }

    exitItemSelector = (ctx: ItemSelectorContext) => {
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        this.setNodeValue(ctx, new ItemSelector(undefined, exp!));
    }

    exitSliceSelector = (ctx: SliceSelectorContext) => {
        const slice = this.getNodeValue(ctx._xslice);
        this.setNodeValue(ctx, slice as object);
    }

    exitTyped_argument = (ctx: Typed_argumentContext) => {
        const typ = this.getNodeValue<IType>(ctx._typ);
        const name = this.getNodeValue<Identifier>(ctx._name);
        const attrs = this.getNodeValue<IdentifierList>(ctx._attrs);
        const arg = attrs ?
            new ExtendedParameter(name!, false, typ!, attrs) :
            new CategoryParameter(name!, false, typ!);
        const exp = this.getNodeValue<IExpression>(ctx._value);
        if(exp)
            arg.defaultExpression = exp;
        this.setNodeValue(ctx, arg);
    }

    exitCodeArgument = (ctx: CodeArgumentContext) => {
        const arg = this.getNodeValue(ctx._arg);
        this.setNodeValue(ctx, arg as object);
    }


    exitArgument_list = (ctx: Argument_listContext) => {
        const items = ctx.argument_list().map(r => this.getNodeValue<IParameter>(r)!, this);
        this.setNodeValue(ctx, new ParameterList(...items));
    }


    exitFlush_statement = (ctx: Flush_statementContext) => {
        this.setNodeValue(ctx, new FlushStatement());
    }


    exitFlushStatement = (ctx: FlushStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._stmt));
    }


    exitFull_argument_list = (ctx: Full_argument_listContext) => {
        const items = this.getNodeValue<ParameterList>(ctx._items);
        const item = this.getNodeValue<IParameter>(ctx._item);
        items!.add(item!);
        this.setNodeValue(ctx, items);
    }

    exitArgument_assignment = (ctx: Argument_assignmentContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        const arg = new UnresolvedParameter(name!);
        this.setNodeValue(ctx, new Argument(arg, exp));
    }


    exitArgumentAssignmentListExpression = (ctx: ArgumentAssignmentListExpressionContext) => {
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        let items = this.getNodeValue<ArgumentList>(ctx._items);
        if (!items)
            items = new ArgumentList();
        let item: Argument | null = new Argument(null, exp);
        if(exp instanceof Section)
            item.copySectionFrom(exp);
        items.insert(0, item);
        item = this.getNodeValue<Argument>(ctx._item) || null;
        if (item)
            items.add(item);
        else
            items.checkLastAnd();
        this.setNodeValue(ctx, items);
    }


    exitArgumentAssignmentListNoExpression = (ctx: ArgumentAssignmentListNoExpressionContext) => {
        const items = this.getNodeValue<ArgumentList>(ctx._items);
        const item = this.getNodeValue<Argument>(ctx._item) || null;
        if (item)
            items!.add(item);
        else
            items!.checkLastAnd();
        this.setNodeValue(ctx, items);
    }


    exitArgumentAssignmentList = (ctx: ArgumentAssignmentListContext) => {
        const item = this.getNodeValue<Argument>(ctx._item);
        this.setNodeValue(ctx, new ArgumentList([item!]));
    }


    exitArgumentAssignmentListItem = (ctx: ArgumentAssignmentListItemContext) => {
        const item = this.getNodeValue<Argument>(ctx._item);
        const items = this.getNodeValue<ArgumentList>(ctx._items);
        items!.add(item!);
        this.setNodeValue(ctx, items);
    }


    exitArrow_prefix = (ctx: Arrow_prefixContext) => {
        const args = this.getNodeValue<IdentifierList>(ctx.arrow_args());
        let argsSuite = this.getWhiteSpacePlus(ctx._s1);
        if (argsSuite == null) // happens when only WS
            argsSuite = this.getHiddenTokensBefore(ctx.EGT().symbol);
        let arrowSuite = this.getWhiteSpacePlus(ctx._s2);
        if (arrowSuite == null) // happens when only WS
            arrowSuite = this.getHiddenTokensAfter(ctx.EGT().symbol);
        this.setNodeValue(ctx, new ArrowExpression(args!, argsSuite, arrowSuite));
    }

    exitArrowExpression = (ctx: ArrowExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitArrowExpressionBody = (ctx: ArrowExpressionBodyContext) => {
        const arrow = this.getNodeValue<ArrowExpression>(ctx.arrow_prefix());
        const exp = this.getNodeValue<IExpression>(ctx.expression());
        arrow!.setExpression(exp!);
        this.setNodeValue(ctx, arrow);
    }

    exitArrowListArg = (ctx: ArrowListArgContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.variable_identifier_list()));
    }

    exitArrowSingleArg = (ctx: ArrowSingleArgContext) => {
        const arg = this.getNodeValue<Identifier>(ctx.variable_identifier());
        this.setNodeValue(ctx, new IdentifierList(undefined, arg));
    }

    exitArrowStatementsBody = (ctx: ArrowStatementsBodyContext) => {
        const arrow = this.getNodeValue<ArrowExpression>(ctx.arrow_prefix());
        const stmts = this.getNodeValue<StatementList>(ctx.statement_list());
        arrow!.statements = stmts!;
        this.setNodeValue(ctx, arrow);
    }


    exitUnresolvedWithArgsStatement = (ctx: UnresolvedWithArgsStatementContext) => {
        const exp = ctx._exp1 ? this.getNodeValue<IExpression>(ctx._exp1) : this.getNodeValue<IExpression>(ctx._exp2);
        const args = this.getNodeValue<ArgumentList>(ctx._args);
        const name = this.getNodeValue<Identifier>(ctx._name);
        const stmts = this.getNodeValue<StatementList>(ctx._stmts);
        if (name != null || stmts != null)
            this.setNodeValue(ctx, new RemoteCall(exp!, args!, new ThenWith(name!, stmts!)));
        else
            this.setNodeValue(ctx, new UnresolvedCall(exp!, args));
    }


    exitAddExpression = (ctx: AddExpressionContext) => {
        const left = this.getNodeValue<IExpression>(ctx._left);
        const right = this.getNodeValue<IExpression>(ctx._right);
        const exp = ctx._op.type == EParser.PLUS ? new PlusExpression(left!, right!) : new SubtractExpression(left!, right!);
        this.setNodeValue(ctx, exp);
    }

    exitMember_method_declaration_list = (ctx: Member_method_declaration_listContext) => {
        const items = ctx.member_method_declaration_list().map(r => this.getNodeValue<IMethodDeclaration>(r)!, this);
        this.setNodeValue(ctx, new MethodDeclarationList(items));
    }

    exitNative_member_method_declaration_list = (ctx: Native_member_method_declaration_listContext) => {
        const items = ctx.native_member_method_declaration_list().map(r => this.getNodeValue<IMethodDeclaration>(r)!, this);
        this.setNodeValue(ctx, new MethodDeclarationList(items));
    }

    exitGetter_method_declaration = (ctx: Getter_method_declarationContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        const stmts = this.getNodeValue<StatementList>(ctx._stmts);
        this.setNodeValue(ctx, new GetterMethodDeclaration(name!, stmts!));
    }


    exitNative_setter_declaration = (ctx: Native_setter_declarationContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        const stmts = this.getNodeValue<StatementList>(ctx._stmts);
        this.setNodeValue(ctx, new NativeSetterMethodDeclaration(name!, stmts!));
    }

    exitNative_getter_declaration = (ctx: Native_getter_declarationContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        const stmts = this.getNodeValue<StatementList>(ctx._stmts);
        this.setNodeValue(ctx, new NativeGetterMethodDeclaration(name!, stmts!));
    }

    exitSetter_method_declaration = (ctx: Setter_method_declarationContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        const stmts = this.getNodeValue<StatementList>(ctx._stmts);
        this.setNodeValue(ctx, new SetterMethodDeclaration(name!, stmts!));
    }

    exitSetType = (ctx: SetTypeContext) => {
        const typ = this.getNodeValue<IType>(ctx._s);
        this.setNodeValue(ctx, new SetType(typ!));
    }

    exitMember_method_declaration = (ctx: Member_method_declarationContext) => {
        const comments = this.readComments(ctx.comment_statement_list());
        const annotations = this.readAnnotations(ctx.annotation_constructor_list());
        const ctx_ = ctx.children![ctx.getChildCount() - 1];
        const decl = this.getNodeValue<IDeclaration>(ctx_ as ParserRuleContext);
        if (decl) {
            decl.comments = comments;
            decl.annotations = annotations;
            this.setNodeValue(ctx, decl);
        }
    }

    exitStatement_list = (ctx: Statement_listContext) => {
        const items = ctx.statement_list().map(r => this.getNodeValue<IStatement>(r)!, this);
        this.setNodeValue(ctx, new StatementList(items));
    }

    exitAbstract_global_method_declaration = (ctx: Abstract_global_method_declarationContext) => {
        const typ = this.getNodeValue<IType>(ctx._typ);
        if (typ instanceof CategoryType)
            typ._mutable = ctx.MUTABLE() != null;
        const name = this.getNodeValue<Identifier>(ctx._name);
        const args = this.getNodeValue<ParameterList>(ctx._args);
        this.setNodeValue(ctx, new AbstractMethodDeclaration(name!, args!, typ));
    }

    exitAbstract_member_method_declaration = (ctx: Abstract_member_method_declarationContext) => {
        const typ = this.getNodeValue<IType>(ctx._typ);
        if (typ instanceof CategoryType)
            typ._mutable = ctx.MUTABLE() != null;
        const name = this.getNodeValue<Identifier>(ctx._name);
        const args = this.getNodeValue<ParameterList>(ctx._args);
        this.setNodeValue(ctx, new AbstractMethodDeclaration(name!, args!, typ));
    }

    exitConcrete_method_declaration = (ctx: Concrete_method_declarationContext) => {
        const typ = this.getNodeValue<IType>(ctx._typ);
        if (typ instanceof CategoryType)
            typ._mutable = ctx.MUTABLE() != null;
        const name = this.getNodeValue<Identifier>(ctx._name);
        const args = this.getNodeValue<ParameterList>(ctx._args);
        const stmts = this.getNodeValue<StatementList>(ctx._stmts);
        this.setNodeValue(ctx, new ConcreteMethodDeclaration(name!, args, typ, stmts!));
    }

    exitMethod_declaration = (ctx: Method_declarationContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.getChild(0) as ParserRuleContext));
    }

    exitMethodCallStatement = (ctx: MethodCallStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._stmt));
    }

    exitMethod_identifier = (ctx: Method_identifierContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.getChild(0) as ParserRuleContext));
    }

    exitConstructorFrom = (ctx: ConstructorFromContext) => {
        const type = this.getNodeValue<CategoryType>(ctx._typ);
        const copyFrom = this.getNodeValue<IExpression>(ctx._copyExp) || null;
        let args = this.getNodeValue<ArgumentList>(ctx._args) || null;
        const arg = this.getNodeValue<Argument>(ctx._arg) || null;
        if (arg) {
            if (!args)
                args = new ArgumentList();
            args.add(arg);
        } else if (args)
            args.checkLastAnd();
        this.setNodeValue(ctx, new ConstructorExpression(type!, copyFrom, args));
    }


    exitConstructorNoFrom = (ctx: ConstructorNoFromContext) => {
        const type = this.getNodeValue<CategoryType>(ctx._typ);
        let args = this.getNodeValue<ArgumentList>(ctx._args) || null;
        const arg = this.getNodeValue<Argument>(ctx._arg) || null;
        if (arg) {
            if (!args)
                args = new ArgumentList();
            args.add(arg);
        } else if (args)
            args.checkLastAnd();
        this.setNodeValue(ctx, new ConstructorExpression(type!, null, args));
    }

    exitAssertion = (ctx: AssertionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitAssertion_list = (ctx: Assertion_listContext) => {
        const items = ctx.assertion_list().map(r => this.getNodeValue<IAssertion>(r)!, this);
        this.setNodeValue(ctx, new AssertionList(items));
    }

    exitAssignInstanceStatement = (ctx: AssignInstanceStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._stmt));
    }

    exitAssign_instance_statement = (ctx: Assign_instance_statementContext) => {
        const inst = this.getNodeValue<IAssignableInstance>(ctx._inst);
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        this.setNodeValue(ctx, new AssignInstanceStatement(inst!, exp!));
    }

    exitAssign_variable_statement = (ctx: Assign_variable_statementContext) => {
        const name = this.getNodeValue<Identifier>(ctx.variable_identifier());
        const exp = this.getNodeValue<IExpression>(ctx.expression());
        this.setNodeValue(ctx, new AssignVariableStatement(name!, exp!));
    }

    exitAssign_tuple_statement = (ctx: Assign_tuple_statementContext) => {
        const items = this.getNodeValue<IdentifierList>(ctx._items);
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        this.setNodeValue(ctx, new AssignTupleStatement(items!, exp!));
    }

    exitRootInstance = (ctx: RootInstanceContext) => {
        const name = this.getNodeValue<Identifier>(ctx.variable_identifier());
        this.setNodeValue(ctx, new VariableInstance(name!));
    }

    exitChildInstance = (ctx: ChildInstanceContext) => {
        const parent = this.getNodeValue<IAssignableInstance>(ctx.assignable_instance());
        const child = this.getNodeValue<IAssignableSelector>(ctx.child_instance());
        child!.parent = parent!;
        this.setNodeValue(ctx, child);
    }

    exitMemberInstance = (ctx: MemberInstanceContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        this.setNodeValue(ctx, new MemberInstance(name!));
    }

    exitIsATypeExpression = (ctx: IsATypeExpressionContext) => {
        const type = this.getNodeValue<IType>(ctx.category_or_any_type());
        const exp = new TypeExpression(type!);
        this.setNodeValue(ctx, exp);
    }

    exitIsOtherExpression = (ctx: IsOtherExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.expression()));
    }

    exitIsExpression = (ctx: IsExpressionContext) => {
        const left = this.getNodeValue<IExpression>(ctx._left);
        const right = this.getNodeValue<IExpression>(ctx._right);
        let op;
        if(ctx.NOT())
            op = right instanceof TypeExpression ? EqOp.IS_NOT_A : EqOp.IS_NOT;
        else
            op = right instanceof TypeExpression ? EqOp.IS_A : EqOp.IS;
        this.setNodeValue(ctx, new EqualsExpression(left!, op, right!));
    }

    exitItemInstance = (ctx: ItemInstanceContext) => {
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        this.setNodeValue(ctx, new ItemInstance(exp!));
    }

    exitConstructorExpression = (ctx: ConstructorExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitNative_statement_list = (ctx: Native_statement_listContext) => {
        const items = ctx.native_statement_list().map(r => this.getNodeValue<IStatement>(r)!, this);
        this.setNodeValue(ctx, new StatementList(items));
    }

    exitJava_identifier = (ctx: Java_identifierContext) => {
        this.setNodeValue(ctx, ctx.getText() as unknown as object);
    }

    exitJavascript_identifier = (ctx: Javascript_identifierContext) => {
        this.setNodeValue(ctx, new Identifier(ctx.getText()));
    }

    exitJavascript_new_expression = (ctx: Javascript_new_expressionContext) => {
        const method = this.getNodeValue<JavaScriptMethodExpression>(ctx.javascript_method_expression());
        this.setNodeValue(ctx, new JavaScriptNewExpression(method!));
    }

    exitJavascript_primary_expression = (ctx: Javascript_primary_expressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.getChild(0) as ParserRuleContext));
    }

    exitJavascript_this_expression = (ctx: Javascript_this_expressionContext) => {
        this.setNodeValue(ctx, new JavaScriptThisExpression());
    }


    exitJavaIdentifier = (ctx: JavaIdentifierContext) => {
        const name = this.getNodeValue<string>(ctx._name);
        this.setNodeValue(ctx, new JavaIdentifierExpression(null, name!));
    }

    exitJavaChildIdentifier = (ctx: JavaChildIdentifierContext) => {
        const parent = this.getNodeValue<JavaExpression>(ctx._parent);
        const name = this.getNodeValue<string>(ctx._name);
        const child = new JavaIdentifierExpression(parent, name!);
        this.setNodeValue(ctx, child);
    }

    exitJavaClassIdentifier = (ctx: JavaClassIdentifierContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._klass));
    }

    exitJavaChildClassIdentifier = (ctx: JavaChildClassIdentifierContext) => {
        const parent = this.getNodeValue<JavaExpression>(ctx._parent);
        const child = new JavaIdentifierExpression(parent, ctx._name.text);
        this.setNodeValue(ctx, child);
    }

    exitJavaPrimaryExpression = (ctx: JavaPrimaryExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitJavascriptBooleanLiteral = (ctx: JavascriptBooleanLiteralContext) => {
        this.setNodeValue(ctx, new JavaScriptBooleanLiteral(ctx.getText()));
    }

    exitJavascriptCharacterLiteral = (ctx: JavascriptCharacterLiteralContext) => {
        this.setNodeValue(ctx, new JavaScriptCharacterLiteral(ctx.getText()));
    }

    exitJavascriptTextLiteral = (ctx: JavascriptTextLiteralContext) => {
        this.setNodeValue(ctx, new JavaScriptTextLiteral(ctx.getText()));
    }

    exitJavascriptIntegerLiteral = (ctx: JavascriptIntegerLiteralContext) => {
        this.setNodeValue(ctx, new JavaScriptIntegerLiteral(ctx.getText()));
    }


    exitJavascriptDecimalLiteral = (ctx: JavascriptDecimalLiteralContext) => {
        this.setNodeValue(ctx, new JavaScriptDecimalLiteral(ctx.getText()));
    }

    exitJavascriptPrimaryExpression = (ctx: JavascriptPrimaryExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitJavascript_identifier_expression = (ctx: Javascript_identifier_expressionContext) => {
        const id = this.getNodeValue<Identifier>(ctx._name);
        this.setNodeValue(ctx, new JavaScriptIdentifierExpression(id!));
    }

    exitJavaSelectorExpression = (ctx: JavaSelectorExpressionContext) => {
        const parent = this.getNodeValue<JavaExpression>(ctx._parent);
        const child = this.getNodeValue<JavaSelectorExpression>(ctx._child);
        child!.parent = parent;
        this.setNodeValue(ctx, child);
    }

    exitJavascriptSelectorExpression = (ctx: JavascriptSelectorExpressionContext) => {
        const parent = this.getNodeValue<JavaScriptExpression>(ctx._parent);
        const child = this.getNodeValue<JavaScriptSelectorExpression>(ctx._child);
        child!.parent = parent;
        this.setNodeValue(ctx, child);
    }

    exitJavascriptMemberExpression = (ctx: JavascriptMemberExpressionContext) => {
        const id = this.getNodeValue<Identifier>(ctx._name);
        this.setNodeValue(ctx, new JavaScriptMemberExpression(id!));
    }

    exitJava_primary_expression = (ctx: Java_primary_expressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.getChild(0) as ParserRuleContext));
    }

    exitJava_item_expression = (ctx: Java_item_expressionContext) => {
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        this.setNodeValue(ctx, new JavaItemExpression(exp!));
    }

    exitJavascript_item_expression = (ctx: Javascript_item_expressionContext) => {
        const exp = this.getNodeValue<JavaScriptExpression>(ctx._exp);
        this.setNodeValue(ctx, new JavaScriptItemExpression(exp!));
    }

    exitJavascriptItemExpression = (ctx: JavascriptItemExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitJavaItemExpression = (ctx: JavaItemExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitJavaStatement = (ctx: JavaStatementContext) => {
        const exp = this.getNodeValue<JavaExpression>(ctx._exp);
        const stmt = new JavaStatement(exp!, false);
        this.setNodeValue(ctx, stmt);
    }

    exitJavascriptStatement = (ctx: JavascriptStatementContext) => {
        const exp = this.getNodeValue<JavaScriptExpression>(ctx._exp);
        const stmt = new JavaScriptStatement(exp!, false);
        this.setNodeValue(ctx, stmt);
    }

    exitJavaReturnStatement = (ctx: JavaReturnStatementContext) => {
        const exp = this.getNodeValue<JavaExpression>(ctx._exp);
        this.setNodeValue(ctx, new JavaStatement(exp!, true));
    }

    exitJavascriptReturnStatement = (ctx: JavascriptReturnStatementContext) => {
        const exp = this.getNodeValue<JavaScriptExpression>(ctx._exp);
        this.setNodeValue(ctx, new JavaScriptStatement(exp!, true));
    }

    exitJavaNativeStatement = (ctx: JavaNativeStatementContext) => {
        const stmt = this.getNodeValue<JavaStatement>(ctx.java_statement());
        const call = new JavaNativeCall(stmt!);
        this.setNodeValue(ctx, call);
    }

    exitJavascriptNativeStatement = (ctx: JavascriptNativeStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.javascript_native_statement()));
    }

    exitJavascript_native_statement = (ctx: Javascript_native_statementContext) => {
        const stmt = this.getNodeValue<JavaScriptStatement>(ctx.javascript_statement());
        const module = this.getNodeValue<JavaScriptModule>(ctx.javascript_module());
        if(module)
            stmt!.module = module;
        this.setNodeValue(ctx, new JavaScriptNativeCall(stmt!));
    }

    exitNative_method_declaration = (ctx: Native_method_declarationContext) => {
        const type = this.getNodeValue<IType>(ctx._typ);
        const name = this.getNodeValue<Identifier>(ctx._name);
        const params = this.getNodeValue<ParameterList>(ctx._args);
        const stmts = this.getNodeValue<StatementList>(ctx._stmts);
        const decl = new NativeMethodDeclaration(name!, params!, type!, stmts!);
        this.setNodeValue(ctx, decl);
    }

    exitJavaArgumentList = (ctx: JavaArgumentListContext) => {
        const item = this.getNodeValue<JavaExpression>(ctx._item);
        this.setNodeValue(ctx, new JavaExpressionList(undefined, item!));
    }

    exitJavascriptArgumentList = (ctx: JavascriptArgumentListContext) => {
        const item = this.getNodeValue<JavaScriptExpression>(ctx._item);
        this.setNodeValue(ctx, new JavaScriptExpressionList(undefined, item!));
    }

    exitJavaArgumentListItem = (ctx: JavaArgumentListItemContext) => {
        const item = this.getNodeValue<JavaExpression>(ctx._item);
        const items = this.getNodeValue<JavaExpressionList>(ctx._items);
        items!.add(item!);
        this.setNodeValue(ctx, items);
    }

    exitJavascriptArgumentListItem = (ctx: JavascriptArgumentListItemContext) => {
        const item = this.getNodeValue<JavaScriptExpression>(ctx._item);
        const items = this.getNodeValue<JavaScriptExpressionList>(ctx._items);
        items!.add(item!);
        this.setNodeValue(ctx, items);
    }

    exitJava_method_expression = (ctx: Java_method_expressionContext) => {
        const name = this.getNodeValue<string>(ctx._name);
        const args = this.getNodeValue<JavaExpressionList>(ctx._args);
        this.setNodeValue(ctx, new JavaMethodExpression(name!, args));
    }

    exitJava_this_expression = (ctx: Java_this_expressionContext) => {
        this.setNodeValue(ctx, new JavaThisExpression());
    }

    exitJavascriptMethodExpression = (ctx: JavascriptMethodExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._method));
    }

    exitJavascript_method_expression = (ctx: Javascript_method_expressionContext) => {
        const id = this.getNodeValue<Identifier>(ctx._name);
        const args = this.getNodeValue<JavaScriptExpressionList>(ctx._args);
        this.setNodeValue(ctx, new JavaScriptMethodExpression(id!, args));
    }

    exitJavaMethodExpression = (ctx: JavaMethodExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitFullDeclarationList = (ctx: FullDeclarationListContext) => {
        const items = this.getNodeValue<DeclarationList>(ctx.declarations()) || new DeclarationList();
        this.setNodeValue(ctx, items);
    }

    exitDeclaration = (ctx: DeclarationContext) => {
        const comments = this.readComments(ctx.comment_statement_list());
        const annotations = this.readAnnotations(ctx.annotation_constructor_list());
        const ctx_ = ctx.children![ctx.getChildCount() - 1] as ParserRuleContext;
        const decl = this.getNodeValue<IDeclaration>(ctx_);
        if (decl) {
            decl.comments = comments;
            decl.annotations = annotations;
            this.setNodeValue(ctx, decl);
        }
    }

    exitDeclarations = (ctx: DeclarationsContext) => {
        const items = ctx.declaration_list().map(r => this.getNodeValue<IDeclaration>(r)!, this);
        this.setNodeValue(ctx, new DeclarationList(items));
    }

    exitIteratorExpression = (ctx: IteratorExpressionContext) => {
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        const name = this.getNodeValue<Identifier>(ctx._name);
        const source = this.getNodeValue<IExpression>(ctx._source);
        this.setNodeValue(ctx, new IteratorExpression(name!, source!, exp!));
    }

    exitIteratorType = (ctx: IteratorTypeContext) => {
        const typ = this.getNodeValue<IType>(ctx._i);
        this.setNodeValue(ctx, new IteratorType(typ!));
    }

    exitJavaBooleanLiteral = (ctx: JavaBooleanLiteralContext) => {
        this.setNodeValue(ctx, new JavaBooleanLiteral(ctx.getText()));
    }

    exitJavaIntegerLiteral = (ctx: JavaIntegerLiteralContext) => {
        this.setNodeValue(ctx, new JavaIntegerLiteral(ctx.getText()));
    }

    exitJavaDecimalLiteral = (ctx: JavaDecimalLiteralContext) => {
        this.setNodeValue(ctx, new JavaDecimalLiteral(ctx.getText()));
    }

    exitJavaCharacterLiteral = (ctx: JavaCharacterLiteralContext) => {
        this.setNodeValue(ctx, new JavaCharacterLiteral(ctx.getText()));
    }

    exitJavaTextLiteral = (ctx: JavaTextLiteralContext) => {
        this.setNodeValue(ctx, new JavaTextLiteral(ctx.getText()));
    }

    exitJavaCategoryBinding = (ctx: JavaCategoryBindingContext) => {
        const map = this.getNodeValue<JavaIdentifierExpression>(ctx._binding);
        this.setNodeValue(ctx, new JavaNativeCategoryBinding(map!));
    }

    exitJavascriptCategoryBinding = (ctx: JavascriptCategoryBindingContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._binding));
    }

    exitJavascript_category_binding = (ctx: Javascript_category_bindingContext) => {
        const identifiers = ctx.javascript_identifier_list().map(r => r.getText()).join(".");
        const module = this.getNodeValue<JavaScriptModule>(ctx.javascript_module()) || null;
        const map = new JavaScriptNativeCategoryBinding(identifiers, module);
        this.setNodeValue(ctx, map);
    }

    exitJavascript_module = (ctx: Javascript_moduleContext) => {
        const ids = ctx.javascript_identifier_list().map(r => r.getText());
        const module = new JavaScriptModule(ids);
        this.setNodeValue(ctx, module);
    }

    exitNativeCategoryBindingList = (ctx: NativeCategoryBindingListContext) => {
        const item = this.getNodeValue<INativeCategoryBinding>(ctx._item);
        const items = new NativeCategoryBindingList(undefined, item!);
        this.setNodeValue(ctx, items);
    }

    exitNativeCategoryBindingListItem = (ctx: NativeCategoryBindingListItemContext) => {
        const item = this.getNodeValue<INativeCategoryBinding>(ctx._item);
        const items = this.getNodeValue<NativeCategoryBindingList>(ctx._items);
        items!.add(item!);
        this.setNodeValue(ctx, items);
    }

    exitNative_category_bindings = (ctx: Native_category_bindingsContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._items));
    }

    exitNative_category_declaration = (ctx: Native_category_declarationContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        const attrs = this.getNodeValue<IdentifierList>(ctx._attrs);
        const bindings = this.getNodeValue<NativeCategoryBindingList>(ctx._bindings);
        const methods = this.getNodeValue<IMethodDeclaration[]>(ctx._methods);
        const decl = new NativeCategoryDeclaration(name!, attrs, bindings!, null, methods);
        decl.storable = ctx.STORABLE() != null;
        this.setNodeValue(ctx, decl);
    }

    exitNative_widget_declaration = (ctx: Native_widget_declarationContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        const bindings = this.getNodeValue<NativeCategoryBindingList>(ctx._bindings);
        const methods = this.getNodeValue<IMethodDeclaration[]>(ctx._methods);
        const decl = new NativeWidgetDeclaration(name!, bindings!, methods);
        this.setNodeValue(ctx, decl);
    }

    exitNativeCategoryDeclaration = (ctx: NativeCategoryDeclarationContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._decl));
    }

    exitNative_resource_declaration = (ctx: Native_resource_declarationContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        const attrs = this.getNodeValue<IdentifierList>(ctx._attrs);
        const bindings = this.getNodeValue<NativeCategoryBindingList>(ctx._bindings);
        const methods = this.getNodeValue<IMethodDeclaration[]>(ctx._methods);
        const decl = new NativeResourceDeclaration(name!, attrs!, bindings!, null, methods!);
        decl.storable = ctx.STORABLE() != null;
        this.setNodeValue(ctx, decl);
    }

    exitResource_declaration = (ctx: Resource_declarationContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.native_resource_declaration()));
    }

    exitParenthesis_expression = (ctx: Parenthesis_expressionContext) => {
        const exp = this.getNodeValue<IExpression>(ctx.expression());
        this.setNodeValue(ctx, new ParenthesisExpression(exp!));
    }

    exitParenthesisExpression = (ctx: ParenthesisExpressionContext) => {
         this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitNative_symbol_list = (ctx: Native_symbol_listContext) => {
        const items = ctx.native_symbol_list().map(r => this.getNodeValue<NativeSymbol>(r)!, this);
        this.setNodeValue(ctx, new NativeSymbolList(items));
    }

    exitEnum_native_declaration = (ctx: Enum_native_declarationContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        const type = this.getNodeValue<IType>(ctx._typ);
        const symbols = this.getNodeValue<NativeSymbolList>(ctx._symbols);
        this.setNodeValue(ctx, new EnumeratedNativeDeclaration(name!, type!, symbols!));
    }

    exitFor_each_statement = (ctx: For_each_statementContext) => {
        const name1 = this.getNodeValue<Identifier>(ctx._name1);
        const name2 = this.getNodeValue<Identifier>(ctx._name2);
        const source = this.getNodeValue<IExpression>(ctx._source);
        const stmts = this.getNodeValue<StatementList>(ctx._stmts);
        this.setNodeValue(ctx, new ForEachStatement(name1, name2, source!, stmts!));
    }

    exitForEachStatement = (ctx: ForEachStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._stmt));
    }

    exitSymbols_token = (ctx: Symbols_tokenContext) => {
        this.setNodeValue(ctx, ctx.getText() as unknown as object);
    }

    exitKey_token = (ctx: Key_tokenContext) => {
        this.setNodeValue(ctx, ctx.getText() as unknown as object);
    }

    exitValue_token = (ctx: Value_tokenContext) => {
        this.setNodeValue(ctx, ctx.getText() as unknown as object);
    }

    exitNamed_argument = (ctx: Named_argumentContext) => {
        const name = this.getNodeValue<Identifier>(ctx.variable_identifier());
        const arg = new UnresolvedParameter(name!);
        const exp = this.getNodeValue<IExpression>(ctx.literal_expression());
        if(exp)
            arg.defaultExpression = exp;
        this.setNodeValue(ctx, arg);
    }

    exitClosureStatement = (ctx: ClosureStatementContext) => {
        const decl = this.getNodeValue<IDeclaration>(ctx._decl);
        this.setNodeValue(ctx, new DeclarationStatement(decl!));
    }

    exitReturn_statement = (ctx: Return_statementContext) => {
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        this.setNodeValue(ctx, new ReturnStatement(exp, false));
    }

    exitReturnStatement = (ctx: ReturnStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._stmt));
    }

    exitClosureExpression = (ctx: ClosureExpressionContext) => {
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        this.setNodeValue(ctx, new MethodExpression(exp!));
    }

    exitIf_statement = (ctx: If_statementContext) => {
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        const stmts = this.getNodeValue<StatementList>(ctx._stmts);
        const elseIfs = this.getNodeValue<IfElementList>(ctx._elseIfs);
        const elseStmts = this.getNodeValue<StatementList>(ctx._elseStmts);
        this.setNodeValue(ctx, new IfStatement(exp!, stmts!, elseIfs, elseStmts));
    }

    exitElseIfStatementList = (ctx: ElseIfStatementListContext) => {
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        const stmts = this.getNodeValue<StatementList>(ctx._stmts);
        const elem = new IfElement(exp, stmts!);
        this.setNodeValue(ctx, new IfElementList(undefined, elem));
    }

    exitElseIfStatementListItem = (ctx: ElseIfStatementListItemContext) => {
        const items = this.getNodeValue<IfElementList>(ctx._items);
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        const stmts = this.getNodeValue<StatementList>(ctx._stmts);
        const elem = new IfElement(exp, stmts!);
        items!.add(elem);
        this.setNodeValue(ctx, items);
    }

    exitIfStatement = (ctx: IfStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._stmt));
    }

    exitSuperExpression = (ctx: SuperExpressionContext) => {
        this.setNodeValue(ctx, new SuperExpression());
    }

    exitSwitchStatement = (ctx: SwitchStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._stmt));
    }

    exitAssignTupleStatement = (ctx: AssignTupleStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._stmt));
    }

    exitRaiseStatement = (ctx: RaiseStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._stmt));
    }

    exitWriteStatement = (ctx: WriteStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._stmt));
    }

    exitWithResourceStatement = (ctx: WithResourceStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._stmt));
    }

    exitWhileStatement = (ctx: WhileStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._stmt));
    }

    exitDoWhileStatement = (ctx: DoWhileStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._stmt));
    }

    exitTryStatement = (ctx: TryStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._stmt));
    }

    exitEqualsExpression = (ctx: EqualsExpressionContext) => {
        const left = this.getNodeValue<IExpression>(ctx._left);
        const right = this.getNodeValue<IExpression>(ctx._right);
        let op = null;
        switch(ctx._op.type) {
            case ELexer.EQ:
                op = EqOp.EQUALS;
                break;
            case ELexer.LTGT:
                op = EqOp.NOT_EQUALS;
                break;
            case ELexer.TILDE:
                op = EqOp.ROUGHLY;
                break;
            default:
                throw new Error("Operator " + ctx._op.text);
        }
        this.setNodeValue(ctx, new EqualsExpression(left!, op, right!));
    }

    exitCompareExpression = (ctx: CompareExpressionContext) => {
        const left = this.getNodeValue<IExpression>(ctx._left);
        const right = this.getNodeValue<IExpression>(ctx._right);
        let op = null;
        switch(ctx._op.type) {
            case ELexer.LT:
                op = CmpOp.LT;
                break;
            case ELexer.LTE:
                op = CmpOp.LTE;
                break;
            case ELexer.GT:
                op = CmpOp.GT;
                break;
            case ELexer.GTE:
                op = CmpOp.GTE;
                break;
            default:
                throw new Error("Operator " + ctx._op.text);
        }
        this.setNodeValue(ctx, new CompareExpression(left!, op, right!));
    }

    exitAtomicSwitchCase = (ctx: AtomicSwitchCaseContext) => {
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        const stmts = this.getNodeValue<StatementList>(ctx._stmts);
        this.setNodeValue(ctx, new AtomicSwitchCase(exp, stmts!));
    }

    exitCollection_literal = (ctx: Collection_literalContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.getChild(0) as ParserRuleContext));
    }

    exitCollectionSwitchCase = (ctx: CollectionSwitchCaseContext) => {
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        const stmts = this.getNodeValue<StatementList>(ctx._stmts);
        this.setNodeValue(ctx, new CollectionSwitchCase(exp!, stmts!));
    }

    exitSwitch_case_statement_list = (ctx: Switch_case_statement_listContext) => {
        const items = ctx.switch_case_statement_list().map(r => this.getNodeValue<SwitchCase>(r)!, this);
        this.setNodeValue(ctx, new SwitchCaseList(items));
    }

    exitSwitch_statement = (ctx: Switch_statementContext) => {
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        const cases = this.getNodeValue<SwitchCaseList>(ctx._cases);
        const stmts = this.getNodeValue<StatementList>(ctx._stmts);
        const stmt = new SwitchStatement(exp!, cases!, stmts);
        this.setNodeValue(ctx, stmt);
    }

    exitLiteralRangeLiteral = (ctx: LiteralRangeLiteralContext) => {
        const low = this.getNodeValue<IExpression>(ctx._low);
        const high = this.getNodeValue<IExpression>(ctx._high);
        this.setNodeValue(ctx, new RangeLiteral(low!, high!));
    }

    exitLiteralListLiteral = (ctx: LiteralListLiteralContext) => {
        const exp = this.getNodeValue<ExpressionList>(ctx.literal_list_literal());
        this.setNodeValue(ctx, new ListLiteral(false, exp));
    }

    exitLiteral_list_literal = (ctx: Literal_list_literalContext) => {
        const items = ctx.atomic_literal_list().map(r => this.getNodeValue<IExpression>(r)!, this);
        this.setNodeValue(ctx, new ExpressionList(items));
    }

    exitInExpression = (ctx: InExpressionContext) => {
        const left = this.getNodeValue<IExpression>(ctx._left);
        const right = this.getNodeValue<IExpression>(ctx._right);
        const op = ctx.NOT() ? ContOp.NOT_IN : ContOp.IN;
        this.setNodeValue(ctx, new ContainsExpression(left!, op, right!));
    }

    exitCssType = (ctx: CssTypeContext) => {
        this.setNodeValue(ctx, CssType.instance);
    }

    exitHasExpression = (ctx: HasExpressionContext) => {
        const left = this.getNodeValue<IExpression>(ctx._left);
        const right = this.getNodeValue<IExpression>(ctx._right);
        const op = ctx.NOT() ? ContOp.NOT_HAS : ContOp.HAS;
        this.setNodeValue(ctx, new ContainsExpression(left!, op, right!));
    }

    exitHasAllExpression = (ctx: HasAllExpressionContext) => {
        const left = this.getNodeValue<IExpression>(ctx._left);
        const right = this.getNodeValue<IExpression>(ctx._right);
        const op = ctx.NOT() ? ContOp.NOT_HAS_ALL : ContOp.HAS_ALL;
        this.setNodeValue(ctx, new ContainsExpression(left!, op, right!));
    }

    exitHasAnyExpression = (ctx: HasAnyExpressionContext) => {
        const left = this.getNodeValue<IExpression>(ctx._left);
        const right = this.getNodeValue<IExpression>(ctx._right);
        const op = ctx.NOT() ? ContOp.NOT_HAS_ANY : ContOp.HAS_ANY;
        this.setNodeValue(ctx, new ContainsExpression(left!, op, right!));
    }


    exitContainsExpression = (ctx: ContainsExpressionContext) => {
        const left = this.getNodeValue<IExpression>(ctx._left);
        const right = this.getNodeValue<IExpression>(ctx._right);
        const op = ctx.NOT() ? EqOp.NOT_CONTAINS : EqOp.CONTAINS;
        this.setNodeValue(ctx, new EqualsExpression(left!, op, right!));
    }

    exitDivideExpression = (ctx: DivideExpressionContext) => {
        const left = this.getNodeValue<IExpression>(ctx._left);
        const right = this.getNodeValue<IExpression>(ctx._right);
        this.setNodeValue(ctx, new DivideExpression(left!, right!));
    }

    exitIntDivideExpression = (ctx: IntDivideExpressionContext) => {
        const left = this.getNodeValue<IExpression>(ctx._left);
        const right = this.getNodeValue<IExpression>(ctx._right);
        this.setNodeValue(ctx, new IntDivideExpression(left!, right!));
    }

    exitModuloExpression = (ctx: ModuloExpressionContext) => {
        const left = this.getNodeValue<IExpression>(ctx._left);
        const right = this.getNodeValue<IExpression>(ctx._right);
        this.setNodeValue(ctx, new ModuloExpression(left!, right!));
    }

    exitAnnotation_constructor = (ctx: Annotation_constructorContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        let items = ctx.annotation_argument_list().map(r => this.getNodeValue<DocEntry>(r)!, this);
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        if (exp)
            items = [new DocEntry(null, exp)].concat(items);
        const args = new DocEntryList(items);
        this.setNodeValue(ctx, new Annotation(name!, args));
    }

    exitAnnotation_argument = (ctx: Annotation_argumentContext) => {
        const name = this.getNodeValue<DocKey>(ctx._name);
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        this.setNodeValue(ctx, new DocEntry(name, exp!));
    }

    exitAnnotation_identifier = (ctx: Annotation_identifierContext) => {
        this.setNodeValue(ctx, new Identifier(ctx.getText()));
    }

    exitAnnotation_argument_name = (ctx: Annotation_argument_nameContext) => {
        this.setNodeValue(ctx, ctx.getText() as unknown as object);
    }

    exitAnnotationLiteralValue = (ctx: AnnotationLiteralValueContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitAnnotationTypeValue = (ctx: AnnotationTypeValueContext) => {
        const typ = this.getNodeValue<IType>(ctx._typ);
        this.setNodeValue(ctx, new TypeExpression(typ!));
    }

    exitAndExpression = (ctx: AndExpressionContext) => {
        const left = this.getNodeValue<IExpression>(ctx._left);
        const right = this.getNodeValue<IExpression>(ctx._right);
        this.setNodeValue(ctx, new AndExpression(left!, right!));
    }

    exitNullLiteral = (ctx: NullLiteralContext) => {
        this.setNodeValue(ctx, NullLiteral.instance);
    }

    exitOperator_argument = (ctx: Operator_argumentContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.getChild(0) as ParserRuleContext));
    }

    exitOperatorArgument = (ctx: OperatorArgumentContext) => {
        const arg = this.getNodeValue<IParameter>(ctx._arg);
        if(arg)
            arg.setMutable(ctx.MUTABLE() != null);
        this.setNodeValue(ctx, arg);
    }

    exitOperatorPlus = (ctx: OperatorPlusContext) => {
        this.setNodeValue(ctx, Operator.PLUS);
    }


    exitOperatorMinus = (ctx: OperatorMinusContext) => {
        this.setNodeValue(ctx, Operator.MINUS);
    }

    exitOperatorMultiply = (ctx: OperatorMultiplyContext) => {
        this.setNodeValue(ctx, Operator.MULTIPLY);
    }

    exitOperatorDivide = (ctx: OperatorDivideContext) => {
        this.setNodeValue(ctx, Operator.DIVIDE);
    }

    exitOperatorIDivide = (ctx: OperatorIDivideContext) => {
        this.setNodeValue(ctx, Operator.IDIVIDE);
    }

    exitOperatorModulo = (ctx: OperatorModuloContext) => {
        this.setNodeValue(ctx, Operator.MODULO);
    }

    exitNative_member_method_declaration = (ctx: Native_member_method_declarationContext) => {
        const comments = this.readComments(ctx.comment_statement_list());
        const annotations = this.readAnnotations(ctx.annotation_constructor_list());
        const ctx_ = ctx.children![ctx.getChildCount() - 1] as ParserRuleContext;
        const decl = this.getNodeValue<IMethodDeclaration>(ctx_);
        if (decl) {
            decl.comments = comments;
            decl.annotations = annotations;
            this.setNodeValue(ctx, decl);
        }
    }

    exitOperator_method_declaration = (ctx: Operator_method_declarationContext) => {
        const op = this.getNodeValue<Operator>(ctx._op);
        const arg = this.getNodeValue<IParameter>(ctx._arg);
        const typ = this.getNodeValue<IType>(ctx._typ);
        const stmts = this.getNodeValue<StatementList>(ctx._stmts);
        const decl = new OperatorMethodDeclaration(op!, arg!, typ, stmts!);
        this.setNodeValue(ctx, decl);
    }

    exitOrder_by = (ctx: Order_byContext) => {
        const items = ctx.variable_identifier_list().map(r => this.getNodeValue<Identifier>(r)!, this);
        const ids = new IdentifierList(items);
        const clause = new OrderByClause(ids, ctx.DESC() != null);
        this.setNodeValue(ctx, clause);
    }

    exitOrder_by_list = (ctx: Order_by_listContext) => {
        const items = ctx.order_by_list().map(r => this.getNodeValue<OrderByClause>(r)!, this);
        this.setNodeValue(ctx, new OrderByClauseList(items));
    }

    exitOrExpression = (ctx: OrExpressionContext) => {
        const left = this.getNodeValue<IExpression>(ctx._left);
        const right = this.getNodeValue<IExpression>(ctx._right);
        this.setNodeValue(ctx, new OrExpression(left!, right!));
    }

    exitMultiplyExpression = (ctx: MultiplyExpressionContext) => {
        const left = this.getNodeValue<IExpression>(ctx._left);
        const right = this.getNodeValue<IExpression>(ctx._right);
        this.setNodeValue(ctx, new MultiplyExpression(left!, right!));
    }

    exitMutable_category_type = (ctx: Mutable_category_typeContext) => {
        const typ = this.getNodeValue<CategoryType>(ctx.category_type());
        typ!._mutable = ctx.MUTABLE() != null;
        this.setNodeValue(ctx, typ);
    }

    exitMutableInstanceExpression = (ctx: MutableInstanceExpressionContext) => {
        const source = this.getNodeValue<IExpression>(ctx._exp);
        this.setNodeValue(ctx, new MutableExpression(source!));
    }


    exitMutableSelectableExpression = (ctx: MutableSelectableExpressionContext) => {
        const name = this.getNodeValue<Identifier>(ctx._exp);
        this.setNodeValue(ctx, new InstanceExpression(name!));
    }


    exitMutableSelectorExpression = (ctx: MutableSelectorExpressionContext) => {
        const parent = this.getNodeValue<IExpression>(ctx._parent);
        const selector = this.getNodeValue<SelectorBase>(ctx._selector);
        selector!.parent = parent!;
        this.setNodeValue(ctx, selector);
    }


    exitMinusExpression = (ctx: MinusExpressionContext) => {
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        this.setNodeValue(ctx, new MinusExpression(exp!));
    }


    exitNotExpression = (ctx: NotExpressionContext) => {
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        this.setNodeValue(ctx, new NotExpression(exp!));
    }


    exitWhile_statement = (ctx: While_statementContext) => {
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        const stmts = this.getNodeValue<StatementList>(ctx._stmts);
        this.setNodeValue(ctx, new WhileStatement(exp!, stmts));
    }


    exitDo_while_statement = (ctx: Do_while_statementContext) => {
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        const stmts = this.getNodeValue<StatementList>(ctx._stmts);
        this.setNodeValue(ctx, new DoWhileStatement(exp!, stmts));
    }

    exitSingleton_category_declaration = (ctx: Singleton_category_declarationContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        const attrs = this.getNodeValue<IdentifierList>(ctx._attrs);
        const methods = this.getNodeValue<IMethodDeclaration[]>(ctx._methods);
        this.setNodeValue(ctx, new SingletonCategoryDeclaration(name!, attrs!, methods!));
    }

    exitSingletonCategoryDeclaration = (ctx: SingletonCategoryDeclarationContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._decl));
    }

    exitSliceFirstAndLast = (ctx: SliceFirstAndLastContext) => {
        const first = this.getNodeValue<IExpression>(ctx._first);
        const last = this.getNodeValue<IExpression>(ctx._last);
        this.setNodeValue(ctx, new SelectorExpression(null, first, last));
    }

    exitSliceFirstOnly = (ctx: SliceFirstOnlyContext) => {
        const first = this.getNodeValue<IExpression>(ctx._first);
        this.setNodeValue(ctx, new SelectorExpression(null, first, null));
    }

    exitSliceLastOnly = (ctx: SliceLastOnlyContext) => {
        const last = this.getNodeValue<IExpression>(ctx._last);
        this.setNodeValue(ctx, new SelectorExpression(null, null, last));
    }

    exitSorted_expression = (ctx: Sorted_expressionContext) => {
        const source = this.getNodeValue<IExpression>(ctx._source);
        const desc = ctx.DESC() != null;
        const key = this.getNodeValue<IExpression>(ctx._key);
        this.setNodeValue(ctx, new SortedExpression(source!, desc, key));
    }

    exitSorted_key = (ctx: Sorted_keyContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.getChild(0) as ParserRuleContext));
    }

    exitSortedExpression = (ctx: SortedExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitDocumentExpression = (ctx: DocumentExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitDocument_expression = (ctx: Document_expressionContext) => {
        this.setNodeValue(ctx, new DocumentExpression(this.getNodeValue(ctx._exp)));
    }

    exitDocumentType = (ctx: DocumentTypeContext) => {
        this.setNodeValue(ctx, DocumentType.instance);
    }

    exitDocument_literal = (ctx: Document_literalContext) => {
        const entries = this.getNodeValue<DocEntryList>(ctx.doc_entry_list()) || new DocEntryList();
        this.setNodeValue(ctx, new DocumentLiteral(entries));
    }

    exitFetchExpression = (ctx: FetchExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitFetchStatement = (ctx: FetchStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._stmt));
    }

    exitFetchMany = (ctx: FetchManyContext) => {
        const category = this.getNodeValue<IType>(ctx._typ);
        const predicate = this.getNodeValue<IExpression>(ctx._predicate);
        const start = this.getNodeValue<IExpression>(ctx._xstart);
        const stop = this.getNodeValue<IExpression>(ctx._xstop);
        const include = this.getNodeValue<IdentifierList>(ctx._include);
        const orderBy = this.getNodeValue<OrderByClauseList>(ctx._orderby);
        this.setNodeValue(ctx, new FetchManyExpression(category, start, stop, predicate, include, orderBy));
    }

    exitFetchManyAsync = (ctx: FetchManyAsyncContext) => {
        const category = this.getNodeValue<IType>(ctx._typ);
        const predicate = this.getNodeValue<IExpression>(ctx._predicate);
        const start = this.getNodeValue<IExpression>(ctx._xstart);
        const stop = this.getNodeValue<IExpression>(ctx._xstop);
        const include = this.getNodeValue<IdentifierList>(ctx._include);
        const orderBy = this.getNodeValue<OrderByClauseList>(ctx._orderby);
        const thenWith = ThenWith.OrEmpty(this.getNodeValue(ctx.then()));
        this.setNodeValue(ctx, new FetchManyStatement(category, start, stop, predicate, include, orderBy, thenWith));
    }

    exitFetchOne = (ctx: FetchOneContext) => {
        const category = this.getNodeValue<IType>(ctx._typ);
        const predicate = this.getNodeValue<IExpression>(ctx._predicate);
        const include = this.getNodeValue<IdentifierList>(ctx._include);
        this.setNodeValue(ctx, new FetchOneExpression(category, predicate, include));
    }

    exitFetchOneAsync = (ctx: FetchOneAsyncContext) => {
        const category = this.getNodeValue<IType>(ctx._typ);
        const predicate = this.getNodeValue<IExpression>(ctx._predicate);
        const include = this.getNodeValue<IdentifierList>(ctx._include);
        const thenWith = ThenWith.OrEmpty(this.getNodeValue(ctx.then()));
        this.setNodeValue(ctx, new FetchOneStatement(category!, predicate!, include, thenWith));
    }

    exitThen = (ctx: ThenContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        const stmts = this.getNodeValue<StatementList>(ctx._stmts);
        this.setNodeValue(ctx, new ThenWith(name!, stmts!));
    }

    exitFilteredListExpression = (ctx: FilteredListExpressionContext) => {
        const filtered = this.getNodeValue<FilteredExpression>(ctx.filtered_list_suffix());
        const source = this.getNodeValue<IExpression>(ctx._src);
        filtered!.source = source!;
        this.setNodeValue(ctx, filtered);
    }

    exitFiltered_list_suffix = (ctx: Filtered_list_suffixContext) => {
        const itemName = this.getNodeValue<Identifier>(ctx._name);
        const predicate = this.getNodeValue<IExpression>(ctx._predicate);
        let exp;
        if(itemName)
            exp = new ExplicitPredicateExpression(itemName, predicate!);
        else if(predicate instanceof PredicateExpression)
            exp = predicate;
        else
            throw new Error("What?");
        this.setNodeValue(ctx, new FilteredExpression(null, exp));
    }

    exitArrowFilterExpression = (ctx: ArrowFilterExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.arrow_expression()));
    }

    exitExplicitFilterExpression = (ctx: ExplicitFilterExpressionContext) => {
        const name = this.getNodeValue<Identifier>(ctx.variable_identifier());
        const predicate = this.getNodeValue<IExpression>(ctx.expression());
        this.setNodeValue(ctx, new ExplicitPredicateExpression(name!, predicate!));
    }

    exitOtherFilterExpression = (ctx: OtherFilterExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.expression()));
    }

    exitCode_type = (ctx: Code_typeContext) => {
        this.setNodeValue(ctx, CodeType.instance);
    }

    exitExecuteExpression = (ctx: ExecuteExpressionContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        this.setNodeValue(ctx, new ExecuteExpression(name!));
    }

    exitExpression_list = (ctx: Expression_listContext) => {
        const items = ctx.expression_list().map(r => this.getNodeValue<IExpression>(r)!, this);
        this.setNodeValue(ctx, new ExpressionList(items));
    }

    exitExpression_tuple = (ctx: Expression_tupleContext) => {
        const items = ctx.expression_list().map(r => this.getNodeValue<IExpression>(r)!, this);
        this.setNodeValue(ctx, new ExpressionList(items));
    }

    exitCodeExpression = (ctx: CodeExpressionContext) => {
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        this.setNodeValue(ctx, new CodeExpression(exp!));
    }

    exitCode_argument = (ctx: Code_argumentContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        this.setNodeValue(ctx, new CodeParameter(name!));
    }

    exitCategory_or_any_type = (ctx: Category_or_any_typeContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.getChild(0) as ParserRuleContext));
    }

    exitCategory_symbol = (ctx: Category_symbolContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        const args = this.getNodeValue<ArgumentList>(ctx._args);
        const arg = this.getNodeValue<Argument>(ctx._arg) || null;
        if (arg)
            args!.add(arg);
        this.setNodeValue(ctx, new CategorySymbol(name!, args!));
    }

    exitCategory_symbol_list = (ctx: Category_symbol_listContext) => {
        const items = ctx.category_symbol_list().map(r => this.getNodeValue<CategorySymbol>(r)!, this);
        this.setNodeValue(ctx, new CategorySymbolList(items));
    }

    exitEnum_category_declaration = (ctx: Enum_category_declarationContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        const attrs = this.getNodeValue<IdentifierList>(ctx._attrs);
        const parent = this.getNodeValue<Identifier>(ctx._derived);
        const symbols = this.getNodeValue<CategorySymbolList>(ctx._symbols);
        this.setNodeValue(ctx, new EnumeratedCategoryDeclaration(name!, attrs!, parent, symbols));
    }

    exitEnum_declaration = (ctx: Enum_declarationContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.getChild(0) as ParserRuleContext));
    }

    exitRead_all_expression = (ctx: Read_all_expressionContext) => {
        const source = this.getNodeValue<IExpression>(ctx._source);
        this.setNodeValue(ctx, new ReadAllExpression(source!));
    }

    exitRead_blob_expression = (ctx: Read_blob_expressionContext) => {
        const source = this.getNodeValue<IExpression>(ctx._source);
        this.setNodeValue(ctx, new ReadBlobExpression(source!));
    }

    exitRead_one_expression = (ctx: Read_one_expressionContext) => {
        const source = this.getNodeValue<IExpression>(ctx._source);
        this.setNodeValue(ctx, new ReadOneExpression(source!));
    }

    exitRead_statement = (ctx: Read_statementContext) => {
        const source = this.getNodeValue<IExpression>(ctx._source);
        const thenWith = ThenWith.OrEmpty(this.getNodeValue(ctx.then()));
        this.setNodeValue(ctx, new ReadStatement(source!, thenWith));
    }

    exitReadAllExpression = (ctx: ReadAllExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitReadBlobExpression = (ctx: ReadBlobExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitReadOneExpression = (ctx: ReadOneExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitReadStatement = (ctx: ReadStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._stmt));
    }

    exitRepl = (ctx: ReplContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.getChild(0) as ParserRuleContext));
    }

    exitWith_singleton_statement = (ctx: With_singleton_statementContext) => {
        const name = this.getNodeValue<Identifier>(ctx._typ);
        const typ = new CategoryType(name!);
        const stmts = this.getNodeValue<StatementList>(ctx._stmts);
        this.setNodeValue(ctx, new WithSingletonStatement(typ, stmts));
    }

    exitWithSingletonStatement = (ctx: WithSingletonStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._stmt));
    }

    exitWrite_statement = (ctx: Write_statementContext) => {
        const what = this.getNodeValue<IExpression>(ctx._what);
        const target = this.getNodeValue<IExpression>(ctx._target);
        const thenWith = this.getNodeValue<ThenWith>(ctx.then());
        this.setNodeValue(ctx, new WriteStatement(what!, target!, thenWith));
    }

    exitWith_resource_statement = (ctx: With_resource_statementContext) => {
        const stmt = this.getNodeValue<AssignVariableStatement>(ctx._stmt);
        const stmts = this.getNodeValue<StatementList>(ctx._stmts);
        this.setNodeValue(ctx, new WithResourceStatement(stmt!, stmts));
    }

    exitAnyType = (ctx: AnyTypeContext) => {
        this.setNodeValue(ctx, AnyType.instance);
    }

    exitAnyListType = (ctx: AnyListTypeContext) => {
        const typ = this.getNodeValue<IType>(ctx.any_type());
        this.setNodeValue(ctx, new ListType(typ!));
    }

    exitAnyDictType = (ctx: AnyDictTypeContext) => {
        const typ = this.getNodeValue<IType>(ctx.any_type());
        this.setNodeValue(ctx, new DictionaryType(typ!));
    }

    exitCastExpression = (ctx: CastExpressionContext) => {
        const left = this.getNodeValue<IExpression>(ctx._left);
        const type = this.getNodeValue<IType>(ctx._right);
        this.setNodeValue(ctx, new CastExpression(left!, type!, ctx.MUTABLE() != null));
    }

    exitCatchAtomicStatement = (ctx: CatchAtomicStatementContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        const stmts = this.getNodeValue<StatementList>(ctx._stmts);
        const symbol = new SymbolExpression(name!);
        symbol.copySectionFrom(name!);
        this.setNodeValue(ctx, new AtomicSwitchCase(symbol, stmts!));
    }

    exitCatchCollectionStatement = (ctx: CatchCollectionStatementContext) => {
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        const stmts = this.getNodeValue<StatementList>(ctx._stmts);
        this.setNodeValue(ctx, new CollectionSwitchCase(exp!, stmts!));
    }

    exitCatch_statement_list = (ctx: Catch_statement_listContext) => {
        const items = ctx.catch_statement_list().map(r => this.getNodeValue<SwitchCase>(r)!, this);
        this.setNodeValue(ctx, new SwitchCaseList(items));
    }

    exitTry_statement = (ctx: Try_statementContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        const stmts = this.getNodeValue<StatementList>(ctx._stmts);
        const handlers = this.getNodeValue<SwitchCaseList>(ctx._handlers);
        const anyStmts = this.getNodeValue<StatementList>(ctx._anyStmts);
        const finalStmts = this.getNodeValue<StatementList>(ctx._finalStmts);
        const stmt = new SwitchErrorStatement(name!, stmts!, handlers!, anyStmts, finalStmts);
        this.setNodeValue(ctx, stmt);
    }

    exitRaise_statement = (ctx: Raise_statementContext) => {
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        this.setNodeValue(ctx, new RaiseStatement(exp!));
    }

    exitMatchingList = (ctx: MatchingListContext) => {
        const exp = this.getNodeValue<IExpression>(ctx._source);
        this.setNodeValue(ctx, new MatchingCollectionConstraint(exp!));
    }

    exitMatchingRange = (ctx: MatchingRangeContext) => {
        const exp = this.getNodeValue<IExpression>(ctx._source);
        this.setNodeValue(ctx, new MatchingCollectionConstraint(exp!));
    }

    exitMatchingExpression = (ctx: MatchingExpressionContext) => {
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        this.setNodeValue(ctx, new MatchingExpressionConstraint(exp!));
    }

    exitMatchingPattern = (ctx: MatchingPatternContext) => {
        this.setNodeValue(ctx, new MatchingPatternConstraint(new TextLiteral(ctx._text.text)));
    }

    exitLiteralSetLiteral = (ctx: LiteralSetLiteralContext) => {
        const items = this.getNodeValue<ExpressionList>(ctx.literal_list_literal());
        this.setNodeValue(ctx, new SetLiteral(items));
    }

    exitInclude_list = (ctx: Include_listContext) => {
        const include = ctx.variable_identifier_list().map(c => this.getNodeValue<string>(c), this);
        this.setNodeValue(ctx, include)
    }

    exitInvocation_expression = (ctx: Invocation_expressionContext) => {
        let select = null;
        const exp = this.getNodeValue(ctx._exp);
        if(exp instanceof  UnresolvedIdentifier)
            select = new MethodSelector(null, exp.id);
        else if(exp instanceof MemberSelector)
            select = new MethodSelector(exp.parent!, exp.id);
        if(select != null)
            this.setNodeValue(ctx, new MethodCall(select, null));
    }

    exitInvocationExpression = (ctx: InvocationExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitInvokeStatement = (ctx: InvokeStatementContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitCsharp_identifier = (ctx: Csharp_identifierContext) => {
        this.setNodeValue(ctx, ctx.getText() as unknown as object);
    }

    exitCSharpIdentifier = (ctx: CSharpIdentifierContext) => {
        const name = this.getNodeValue<string>(ctx._name);
        this.setNodeValue(ctx, new CSharpIdentifierExpression(null, name!));
    }

    exitCSharpChildIdentifier = (ctx: CSharpChildIdentifierContext) => {
        const parent = this.getNodeValue<CSharpIdentifierExpression>(ctx._parent);
        const name = this.getNodeValue<string>(ctx._name);
        const child = new CSharpIdentifierExpression(parent, name!);
        this.setNodeValue(ctx, child);
    }

    exitCSharpBooleanLiteral = (ctx: CSharpBooleanLiteralContext) => {
        this.setNodeValue(ctx, new CSharpBooleanLiteral(ctx.getText()));
    }

    exitCSharpIntegerLiteral = (ctx: CSharpIntegerLiteralContext) => {
        this.setNodeValue(ctx, new CSharpIntegerLiteral(ctx.getText()));
    }

    exitCSharpDecimalLiteral = (ctx: CSharpDecimalLiteralContext) => {
        this.setNodeValue(ctx, new CSharpDecimalLiteral(ctx.getText()));
    }

    exitCSharpCharacterLiteral = (ctx: CSharpCharacterLiteralContext) => {
        this.setNodeValue(ctx, new CSharpCharacterLiteral(ctx.getText()));
    }

    exitCSharpTextLiteral = (ctx: CSharpTextLiteralContext) => {
        this.setNodeValue(ctx, new CSharpTextLiteral(ctx.getText()));
    }

    exitCSharpCategoryBinding = (ctx: CSharpCategoryBindingContext) => {
        const binding = this.getNodeValue<CSharpIdentifierExpression>(ctx._binding);
        this.setNodeValue(ctx, new CSharpNativeCategoryBinding(binding!));
    }

    exitCsharp_primary_expression = (ctx: Csharp_primary_expressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.getChild(0) as ParserRuleContext));
    }

    exitCsharp_this_expression = (ctx: Csharp_this_expressionContext) => {
        this.setNodeValue(ctx, new CSharpThisExpression());
    }

    exitCsharp_method_expression = (ctx: Csharp_method_expressionContext) => {
        const name = this.getNodeValue<string>(ctx._name);
        const args = this.getNodeValue<CSharpExpressionList>(ctx._args);
        this.setNodeValue(ctx, new CSharpMethodExpression(name!, args));
    }

    exitCSharpMethodExpression = (ctx: CSharpMethodExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitCSharpArgumentList = (ctx: CSharpArgumentListContext) => {
        const item = this.getNodeValue<CSharpExpression>(ctx._item);
        this.setNodeValue(ctx, new CSharpExpressionList(undefined, item!));
    }

    exitCSharpArgumentListItem = (ctx: CSharpArgumentListItemContext) => {
        const item = this.getNodeValue<CSharpExpression>(ctx._item);
        const items = this.getNodeValue<CSharpExpressionList>(ctx._items);
        items!.add(item!);
        this.setNodeValue(ctx, items);
    }

    exitCSharpNativeStatement = (ctx: CSharpNativeStatementContext) => {
        const stmt = this.getNodeValue<CSharpStatement>(ctx.csharp_statement());
        const call = new CSharpNativeCall(stmt!);
        this.setNodeValue(ctx, call);
    }

    exitCSharpPromptoIdentifier = (ctx: CSharpPromptoIdentifierContext) => {
        const name = ctx.DOLLAR_IDENTIFIER().getText();
        this.setNodeValue(ctx, new CSharpIdentifierExpression(null, name));
    }

    exitCSharpPrimaryExpression = (ctx: CSharpPrimaryExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitCSharpSelectorExpression = (ctx: CSharpSelectorExpressionContext) => {
        const parent = this.getNodeValue<CSharpExpression>(ctx._parent);
        const child = this.getNodeValue<CSharpSelectorExpression>(ctx._child);
        child!.parent = parent;
        this.setNodeValue(ctx, child);
    }

    exitCSharpStatement = (ctx: CSharpStatementContext) => {
        const exp = this.getNodeValue<CSharpExpression>(ctx._exp);
        this.setNodeValue(ctx, new CSharpStatement(exp!, false));
    }

    exitCSharpReturnStatement = (ctx: CSharpReturnStatementContext) => {
        const exp = this.getNodeValue<CSharpExpression>(ctx._exp);
        this.setNodeValue(ctx, new CSharpStatement(exp!, true));
    }


    exitPythonStatement = (ctx: PythonStatementContext) => {
        const exp = this.getNodeValue<IPythonExpression>(ctx._exp);
        this.setNodeValue(ctx, new PythonStatement(exp!, false));
    }

    exitPythonReturnStatement = (ctx: PythonReturnStatementContext) => {
        const exp = this.getNodeValue<IPythonExpression>(ctx._exp);
        this.setNodeValue(ctx, new PythonStatement(exp!, true));
    }

    exitPython2CategoryBinding = (ctx: Python2CategoryBindingContext) => {
        const binding = this.getNodeValue<PythonNativeCategoryBinding>(ctx._binding);
        this.setNodeValue(ctx, new Python2NativeCategoryBinding(binding!));
    }


    exitPython3CategoryBinding = (ctx: Python3CategoryBindingContext) => {
        const binding = this.getNodeValue<PythonNativeCategoryBinding>(ctx._binding);
        this.setNodeValue(ctx, new Python3NativeCategoryBinding(binding!));
    }


    exitPython_category_binding = (ctx: Python_category_bindingContext) => {
        const identifier = ctx.identifier().getText();
        const module = this.getNodeValue<PythonModule>(ctx.python_module()) || null;
        this.setNodeValue(ctx, new PythonNativeCategoryBinding(identifier, module!));
    }

    exitPython_method_expression = (ctx: Python_method_expressionContext) => {
        const name = this.getNodeValue<string>(ctx._name);
        const args = this.getNodeValue<PythonArgumentList>(ctx._args);
        const method = new PythonMethodExpression(name!, args!);
        this.setNodeValue(ctx, method);
    }

    exitPythonGlobalMethodExpression = (ctx: PythonGlobalMethodExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitPythonMethodExpression = (ctx: PythonMethodExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitPython_module = (ctx: Python_moduleContext) => {
        const ids = ctx.python_identifier_list().map(rule => rule.getText());
        const module = new PythonModule(ids);
        this.setNodeValue(ctx, module);
    }

    exitPython2NativeStatement = (ctx: Python2NativeStatementContext) => {
        const stmt = this.getNodeValue<PythonStatement>(ctx.python_native_statement());
        this.setNodeValue(ctx, new Python2NativeCall(stmt!));
    }


    exitPython3NativeStatement = (ctx: Python3NativeStatementContext) => {
        const stmt = this.getNodeValue<PythonStatement>(ctx.python_native_statement());
        this.setNodeValue(ctx, new Python3NativeCall(stmt!));
    }

    exitPython_native_statement = (ctx: Python_native_statementContext) => {
        const stmt = this.getNodeValue<PythonStatement>(ctx.python_statement());
        const module = this.getNodeValue<PythonModule>(ctx.python_module());
        if(module)
            stmt!.module = module;
        this.setNodeValue(ctx, new PythonNativeCall(stmt!, module || undefined));
    }

    exitPython_identifier = (ctx: Python_identifierContext) => {
        this.setNodeValue(ctx, ctx.getText() as unknown as object);
    }

    exitPythonIdentifier = (ctx: PythonIdentifierContext) => {
        const name = this.getNodeValue<string>(ctx._name);
        this.setNodeValue(ctx, new PythonIdentifierExpression(null, name!));
    }

    exitPythonIdentifierExpression = (ctx: PythonIdentifierExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitPythonChildIdentifier = (ctx: PythonChildIdentifierContext) => {
        const parent = this.getNodeValue<IPythonExpression>(ctx._parent);
        const name = this.getNodeValue<string>(ctx._name);
        const child = new PythonIdentifierExpression(parent, name!);
        this.setNodeValue(ctx, child);
    }

    exitPythonBooleanLiteral = (ctx: PythonBooleanLiteralContext) => {
        this.setNodeValue(ctx, new PythonBooleanLiteral(ctx.getText()));
    }

    exitPythonIntegerLiteral = (ctx: PythonIntegerLiteralContext) => {
        this.setNodeValue(ctx, new PythonIntegerLiteral(ctx.getText()));
    }

    exitPythonDecimalLiteral = (ctx: PythonDecimalLiteralContext) => {
        this.setNodeValue(ctx, new PythonDecimalLiteral(ctx.getText()));
    }

    exitPythonCharacterLiteral = (ctx: PythonCharacterLiteralContext) => {
        this.setNodeValue(ctx, new PythonCharacterLiteral(ctx.getText()));
    }

    exitPythonTextLiteral = (ctx: PythonTextLiteralContext) => {
        this.setNodeValue(ctx, new PythonTextLiteral(ctx.getText()));
    }

    exitPythonLiteralExpression = (ctx: PythonLiteralExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitPythonPromptoIdentifier = (ctx: PythonPromptoIdentifierContext) => {
        const name = ctx.DOLLAR_IDENTIFIER().getText();
        this.setNodeValue(ctx, new PythonIdentifierExpression(null, name));
    }

    exitPythonPrimaryExpression = (ctx: PythonPrimaryExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitPythonArgumentList = (ctx: PythonArgumentListContext) => {
        const ordinal = this.getNodeValue<PythonArgumentList>(ctx._ordinal);
        const named = this.getNodeValue<PythonArgumentList>(ctx._named);
        ordinal!.addAll(named!);
        this.setNodeValue(ctx, ordinal);
    }

    exitPythonNamedOnlyArgumentList = (ctx: PythonNamedOnlyArgumentListContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._named));
    }

    exitPythonNamedArgumentList = (ctx: PythonNamedArgumentListContext) => {
        const name = this.getNodeValue<string>(ctx._name);
        const exp = this.getNodeValue<IPythonExpression>(ctx._exp);
        const arg = new PythonNamedArgument(name!, exp!);
        this.setNodeValue(ctx, new PythonArgumentList(undefined, arg));
    }

    exitPythonNamedArgumentListItem = (ctx: PythonNamedArgumentListItemContext) => {
        const name = this.getNodeValue<string>(ctx._name);
        const exp = this.getNodeValue<IPythonExpression>(ctx._exp);
        const arg = new PythonNamedArgument(name!, exp!);
        const items = this.getNodeValue<PythonArgumentList>(ctx._items);
        items!.add(arg);
        this.setNodeValue(ctx, items);
    }

    exitPythonOrdinalOnlyArgumentList = (ctx: PythonOrdinalOnlyArgumentListContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._ordinal));
    }

    exitPythonOrdinalArgumentList = (ctx: PythonOrdinalArgumentListContext) => {
        const item = this.getNodeValue<IPythonExpression>(ctx._item);
        const arg = new PythonOrdinalArgument(item!);
        this.setNodeValue(ctx, new PythonArgumentList(undefined, arg));
    }

    exitPythonOrdinalArgumentListItem = (ctx: PythonOrdinalArgumentListItemContext) => {
        const item = this.getNodeValue<IPythonExpression>(ctx._item);
        const arg = new PythonOrdinalArgument(item!);
        const items = this.getNodeValue<PythonArgumentList>(ctx._items);
        items!.add(arg);
        this.setNodeValue(ctx, items);
    }

    exitPythonSelectorExpression = (ctx: PythonSelectorExpressionContext) => {
        const parent = this.getNodeValue<IPythonExpression>(ctx._parent);
        const selector = this.getNodeValue<PythonSelectorExpression>(ctx._child);
        selector!.parent = parent;
        this.setNodeValue(ctx, selector);
    }

    exitPythonSelfExpression = (ctx: PythonSelfExpressionContext) => {
        this.setNodeValue(ctx, new PythonSelfExpression());
    }

    exitJsxChild = (ctx: JsxChildContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._jsx));
    }

    exitJsxCode = (ctx: JsxCodeContext) => {
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        this.setNodeValue(ctx, new JsxCode(exp!));
    }

    exitJsxExpression = (ctx: JsxExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitJsxElement = (ctx: JsxElementContext) => {
        const elem = this.getNodeValue<JsxElement>(ctx._opening);
        const closing = this.getNodeValue<JsxClosing>(ctx._closing);
        elem!.setClosing(closing!);
        const children = this.getNodeValue<JsxExpression[]>(ctx._children_);
        elem!.setChildren(children!);
        this.setNodeValue(ctx, elem);
    }

    exitJsxSelfClosing = (ctx: JsxSelfClosingContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._jsx));
    }

    exitJsxText = (ctx: JsxTextContext) => {
        const text = getFullText(ctx._text);
        this.setNodeValue(ctx, new JsxText(text));
    }

    exitJsxValue = (ctx: JsxValueContext) => {
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        this.setNodeValue(ctx, new JsxExpression(exp!));
    }

    exitJsx_attribute = (ctx: Jsx_attributeContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        const value = this.getNodeValue<IJsxValue>(ctx._value);
        const suite = this.getWhiteSpacePlus(ctx.ws_plus());
        this.setNodeValue(ctx, new JsxProperty(name!, value!, suite));
    }

    exitJsx_children = (ctx: Jsx_childrenContext) => {
        const list = ctx.jsx_child_list().map(r => this.getNodeValue(r), this);
        this.setNodeValue(ctx, list);
    }

    exitJsx_element_name = (ctx: Jsx_element_nameContext) => {
        this.setNodeValue(ctx, new Identifier(ctx.getText()));
    }

    exitJsx_expression = (ctx: Jsx_expressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx.getChild(0) as ParserRuleContext));
    }

    exitJsx_identifier = (ctx: Jsx_identifierContext) => {
        this.setNodeValue(ctx, new Identifier(ctx.getText()));
    }

    exitJsx_fragment = (ctx: Jsx_fragmentContext) => {
        const openingSuite = this.getWhiteSpacePlus(ctx.ws_plus(0));
        const fragment = new JsxFragment(openingSuite!);
        const children = this.getNodeValue<IJsxExpression[]>(ctx._children_);
        if(children)
            fragment.children = children;
        this.setNodeValue(ctx, fragment);
    }

    exitJsxLiteral = (ctx: JsxLiteralContext) => {
        this.setNodeValue(ctx, new JsxLiteral(ctx.getText()));
    }

    exitJsx_opening = (ctx: Jsx_openingContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        const nameSuite = this.getWhiteSpacePlus(ctx.ws_plus());
        const attributes = ctx.jsx_attribute_list().map(r => this.getNodeValue<JsxProperty>(r)!, this);
        this.setNodeValue(ctx, new JsxElement(name!, nameSuite, attributes, null));
    }

    exitJsx_closing = (ctx: Jsx_closingContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        this.setNodeValue(ctx, new JsxClosing(name!, ""));
    }

    exitJsx_self_closing = (ctx: Jsx_self_closingContext) => {
        const name = this.getNodeValue<Identifier>(ctx._name);
        const nameSuite = this.getWhiteSpacePlus(ctx.ws_plus());
        const attributes = ctx.jsx_attribute_list().map(r => this.getNodeValue<JsxProperty>(r)!, this);
        this.setNodeValue(ctx, new JsxSelfClosing(name!, nameSuite!, attributes, ""));
    }

    exitCssExpression = (ctx: CssExpressionContext) => {
        this.setNodeValue(ctx, this.getNodeValue(ctx._exp));
    }

    exitCss_expression = (ctx: Css_expressionContext) => {
        const fields = ctx.css_field_list().map(r => this.getNodeValue<CssField>(r)!, this);
        this.setNodeValue(ctx, new CssExpression(fields));
    }

    exitCss_field = (ctx: Css_fieldContext) => {
        const name = ctx._name.getText();
        const values = ctx.css_value_list().map(r => this.getNodeValue<ICssValue>(r)!, this);
        this.setNodeValue(ctx, new CssField(name, values));
    }

    exitCssText = (ctx: CssTextContext) => {
        const text = this.input.getText(new Interval(ctx._text.start, ctx._text.stop));
        this.setNodeValue(ctx, new CssText(text));
    }

    exitCssValue = (ctx: CssValueContext) => {
        const exp = this.getNodeValue<IExpression>(ctx._exp);
        this.setNodeValue(ctx, new CssCode(exp!));
    }


}
