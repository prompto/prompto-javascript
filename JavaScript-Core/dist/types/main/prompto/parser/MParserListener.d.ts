import { ParseTreeListener } from "antlr4";
import { Enum_category_declarationContext } from "./MParser";
import { Enum_native_declarationContext } from "./MParser";
import { Native_symbolContext } from "./MParser";
import { Category_symbolContext } from "./MParser";
import { Attribute_declarationContext } from "./MParser";
import { Index_clauseContext } from "./MParser";
import { Concrete_widget_declarationContext } from "./MParser";
import { Native_widget_declarationContext } from "./MParser";
import { Concrete_category_declarationContext } from "./MParser";
import { Singleton_category_declarationContext } from "./MParser";
import { Derived_listContext } from "./MParser";
import { Operator_method_declarationContext } from "./MParser";
import { Setter_method_declarationContext } from "./MParser";
import { Native_setter_declarationContext } from "./MParser";
import { Getter_method_declarationContext } from "./MParser";
import { Native_getter_declarationContext } from "./MParser";
import { Native_category_declarationContext } from "./MParser";
import { Native_resource_declarationContext } from "./MParser";
import { Native_category_bindingsContext } from "./MParser";
import { NativeCategoryBindingListItemContext } from "./MParser";
import { NativeCategoryBindingListContext } from "./MParser";
import { Abstract_global_method_declarationContext } from "./MParser";
import { Abstract_member_method_declarationContext } from "./MParser";
import { Concrete_method_declarationContext } from "./MParser";
import { Native_method_declarationContext } from "./MParser";
import { Test_method_declarationContext } from "./MParser";
import { AssertionContext } from "./MParser";
import { Typed_argumentContext } from "./MParser";
import { MethodCallStatementContext } from "./MParser";
import { AssignInstanceStatementContext } from "./MParser";
import { AssignTupleStatementContext } from "./MParser";
import { StoreStatementContext } from "./MParser";
import { FetchStatementContext } from "./MParser";
import { ReadStatementContext } from "./MParser";
import { FlushStatementContext } from "./MParser";
import { BreakStatementContext } from "./MParser";
import { ReturnStatementContext } from "./MParser";
import { IfStatementContext } from "./MParser";
import { SwitchStatementContext } from "./MParser";
import { ForEachStatementContext } from "./MParser";
import { WhileStatementContext } from "./MParser";
import { DoWhileStatementContext } from "./MParser";
import { RaiseStatementContext } from "./MParser";
import { TryStatementContext } from "./MParser";
import { WriteStatementContext } from "./MParser";
import { WithResourceStatementContext } from "./MParser";
import { WithSingletonStatementContext } from "./MParser";
import { ClosureStatementContext } from "./MParser";
import { CommentStatementContext } from "./MParser";
import { Flush_statementContext } from "./MParser";
import { Store_statementContext } from "./MParser";
import { Method_call_expressionContext } from "./MParser";
import { Method_call_statementContext } from "./MParser";
import { With_resource_statementContext } from "./MParser";
import { With_singleton_statementContext } from "./MParser";
import { Switch_statementContext } from "./MParser";
import { AtomicSwitchCaseContext } from "./MParser";
import { CollectionSwitchCaseContext } from "./MParser";
import { For_each_statementContext } from "./MParser";
import { Do_while_statementContext } from "./MParser";
import { While_statementContext } from "./MParser";
import { If_statementContext } from "./MParser";
import { ElseIfStatementListContext } from "./MParser";
import { ElseIfStatementListItemContext } from "./MParser";
import { Raise_statementContext } from "./MParser";
import { Try_statementContext } from "./MParser";
import { CatchAtomicStatementContext } from "./MParser";
import { CatchCollectionStatementContext } from "./MParser";
import { Break_statementContext } from "./MParser";
import { Return_statementContext } from "./MParser";
import { IntDivideExpressionContext } from "./MParser";
import { HasAnyExpressionContext } from "./MParser";
import { HasExpressionContext } from "./MParser";
import { TernaryExpressionContext } from "./MParser";
import { InExpressionContext } from "./MParser";
import { JsxExpressionContext } from "./MParser";
import { NotExpressionContext } from "./MParser";
import { CompareExpressionContext } from "./MParser";
import { OrExpressionContext } from "./MParser";
import { CodeExpressionContext } from "./MParser";
import { AndExpressionContext } from "./MParser";
import { ArrowExpressionContext } from "./MParser";
import { ContainsExpressionContext } from "./MParser";
import { FilteredListExpressionContext } from "./MParser";
import { TypeExpressionContext } from "./MParser";
import { MultiplyExpressionContext } from "./MParser";
import { ExecuteExpressionContext } from "./MParser";
import { IteratorExpressionContext } from "./MParser";
import { DivideExpressionContext } from "./MParser";
import { IsExpressionContext } from "./MParser";
import { MinusExpressionContext } from "./MParser";
import { AddExpressionContext } from "./MParser";
import { HasAllExpressionContext } from "./MParser";
import { InstanceExpressionContext } from "./MParser";
import { MutableInstanceExpressionContext } from "./MParser";
import { CssExpressionContext } from "./MParser";
import { CastExpressionContext } from "./MParser";
import { ModuloExpressionContext } from "./MParser";
import { EqualsExpressionContext } from "./MParser";
import { ArrowFilterExpressionContext } from "./MParser";
import { ExplicitFilterExpressionContext } from "./MParser";
import { OtherFilterExpressionContext } from "./MParser";
import { Type_expressionContext } from "./MParser";
import { MethodExpressionContext } from "./MParser";
import { ParenthesisExpressionContext } from "./MParser";
import { LiteralExpressionContext } from "./MParser";
import { IdentifierExpressionContext } from "./MParser";
import { ThisExpressionContext } from "./MParser";
import { SuperExpressionContext } from "./MParser";
import { SelectorExpressionContext } from "./MParser";
import { SelectableExpressionContext } from "./MParser";
import { MutableSelectableExpressionContext } from "./MParser";
import { MutableSelectorExpressionContext } from "./MParser";
import { Method_expressionContext } from "./MParser";
import { MemberSelectorContext } from "./MParser";
import { MethodSelectorContext } from "./MParser";
import { SliceSelectorContext } from "./MParser";
import { ItemSelectorContext } from "./MParser";
import { Blob_expressionContext } from "./MParser";
import { Document_expressionContext } from "./MParser";
import { ConstructorFromContext } from "./MParser";
import { ConstructorNoFromContext } from "./MParser";
import { Copy_fromContext } from "./MParser";
import { ExpressionAssignmentListContext } from "./MParser";
import { ArgumentAssignmentListContext } from "./MParser";
import { ArgumentAssignmentListItemContext } from "./MParser";
import { Argument_assignmentContext } from "./MParser";
import { Write_statementContext } from "./MParser";
import { Filtered_list_suffixContext } from "./MParser";
import { FetchOneContext } from "./MParser";
import { FetchManyContext } from "./MParser";
import { FetchOneAsyncContext } from "./MParser";
import { FetchManyAsyncContext } from "./MParser";
import { ThenContext } from "./MParser";
import { Read_statementContext } from "./MParser";
import { Sorted_expressionContext } from "./MParser";
import { Assign_instance_statementContext } from "./MParser";
import { MemberInstanceContext } from "./MParser";
import { ItemInstanceContext } from "./MParser";
import { Assign_tuple_statementContext } from "./MParser";
import { LfsContext } from "./MParser";
import { LfpContext } from "./MParser";
import { Ws_plusContext } from "./MParser";
import { IndentContext } from "./MParser";
import { DedentContext } from "./MParser";
import { Type_literalContext } from "./MParser";
import { Null_literalContext } from "./MParser";
import { Comment_statementContext } from "./MParser";
import { ReplContext } from "./MParser";
import { FullDeclarationListContext } from "./MParser";
import { DeclarationsContext } from "./MParser";
import { DeclarationContext } from "./MParser";
import { Annotation_constructorContext } from "./MParser";
import { Annotation_identifierContext } from "./MParser";
import { Annotation_argumentContext } from "./MParser";
import { Annotation_argument_nameContext } from "./MParser";
import { AnnotationLiteralValueContext } from "./MParser";
import { AnnotationTypeValueContext } from "./MParser";
import { Resource_declarationContext } from "./MParser";
import { Enum_declarationContext } from "./MParser";
import { Native_symbol_listContext } from "./MParser";
import { Category_symbol_listContext } from "./MParser";
import { Symbol_listContext } from "./MParser";
import { MatchingListContext } from "./MParser";
import { MatchingSetContext } from "./MParser";
import { MatchingRangeContext } from "./MParser";
import { MatchingPatternContext } from "./MParser";
import { MatchingExpressionContext } from "./MParser";
import { List_literalContext } from "./MParser";
import { Set_literalContext } from "./MParser";
import { Expression_listContext } from "./MParser";
import { Range_literalContext } from "./MParser";
import { IteratorTypeContext } from "./MParser";
import { SetTypeContext } from "./MParser";
import { ListTypeContext } from "./MParser";
import { DictTypeContext } from "./MParser";
import { CursorTypeContext } from "./MParser";
import { TypeTypeContext } from "./MParser";
import { PrimaryTypeContext } from "./MParser";
import { NativeTypeContext } from "./MParser";
import { CategoryTypeContext } from "./MParser";
import { BooleanTypeContext } from "./MParser";
import { CssTypeContext } from "./MParser";
import { CharacterTypeContext } from "./MParser";
import { TextTypeContext } from "./MParser";
import { ImageTypeContext } from "./MParser";
import { IntegerTypeContext } from "./MParser";
import { DecimalTypeContext } from "./MParser";
import { DocumentTypeContext } from "./MParser";
import { DateTypeContext } from "./MParser";
import { DateTimeTypeContext } from "./MParser";
import { TimeTypeContext } from "./MParser";
import { PeriodTypeContext } from "./MParser";
import { VersionTypeContext } from "./MParser";
import { CodeTypeContext } from "./MParser";
import { BlobTypeContext } from "./MParser";
import { UUIDTypeContext } from "./MParser";
import { DbIdTypeContext } from "./MParser";
import { HtmlTypeContext } from "./MParser";
import { Category_typeContext } from "./MParser";
import { Mutable_category_typeContext } from "./MParser";
import { Code_typeContext } from "./MParser";
import { ConcreteCategoryDeclarationContext } from "./MParser";
import { NativeCategoryDeclarationContext } from "./MParser";
import { SingletonCategoryDeclarationContext } from "./MParser";
import { ConcreteWidgetDeclarationContext } from "./MParser";
import { NativeWidgetDeclarationContext } from "./MParser";
import { Type_identifier_listContext } from "./MParser";
import { Method_identifierContext } from "./MParser";
import { Identifier_or_keywordContext } from "./MParser";
import { Nospace_hyphen_identifier_or_keywordContext } from "./MParser";
import { Nospace_identifier_or_keywordContext } from "./MParser";
import { VariableIdentifierContext } from "./MParser";
import { TypeIdentifierContext } from "./MParser";
import { SymbolIdentifierContext } from "./MParser";
import { Member_identifierContext } from "./MParser";
import { Variable_identifierContext } from "./MParser";
import { Attribute_identifierContext } from "./MParser";
import { Type_identifierContext } from "./MParser";
import { Symbol_identifierContext } from "./MParser";
import { Argument_listContext } from "./MParser";
import { CodeArgumentContext } from "./MParser";
import { OperatorArgumentContext } from "./MParser";
import { Operator_argumentContext } from "./MParser";
import { Named_argumentContext } from "./MParser";
import { Code_argumentContext } from "./MParser";
import { Category_or_any_typeContext } from "./MParser";
import { AnyListTypeContext } from "./MParser";
import { AnyTypeContext } from "./MParser";
import { AnyDictTypeContext } from "./MParser";
import { Member_method_declaration_listContext } from "./MParser";
import { Member_method_declarationContext } from "./MParser";
import { Native_member_method_declaration_listContext } from "./MParser";
import { Native_member_method_declarationContext } from "./MParser";
import { JavaCategoryBindingContext } from "./MParser";
import { CSharpCategoryBindingContext } from "./MParser";
import { Python2CategoryBindingContext } from "./MParser";
import { Python3CategoryBindingContext } from "./MParser";
import { JavascriptCategoryBindingContext } from "./MParser";
import { Python_category_bindingContext } from "./MParser";
import { Python_moduleContext } from "./MParser";
import { Javascript_category_bindingContext } from "./MParser";
import { Javascript_moduleContext } from "./MParser";
import { Variable_identifier_listContext } from "./MParser";
import { Attribute_identifier_listContext } from "./MParser";
import { Method_declarationContext } from "./MParser";
import { Native_statement_listContext } from "./MParser";
import { JavaNativeStatementContext } from "./MParser";
import { CSharpNativeStatementContext } from "./MParser";
import { Python2NativeStatementContext } from "./MParser";
import { Python3NativeStatementContext } from "./MParser";
import { JavascriptNativeStatementContext } from "./MParser";
import { Python_native_statementContext } from "./MParser";
import { Javascript_native_statementContext } from "./MParser";
import { Statement_listContext } from "./MParser";
import { Assertion_listContext } from "./MParser";
import { Switch_case_statement_listContext } from "./MParser";
import { Catch_statement_listContext } from "./MParser";
import { LiteralRangeLiteralContext } from "./MParser";
import { LiteralListLiteralContext } from "./MParser";
import { LiteralSetLiteralContext } from "./MParser";
import { MinIntegerLiteralContext } from "./MParser";
import { MaxIntegerLiteralContext } from "./MParser";
import { IntegerLiteralContext } from "./MParser";
import { HexadecimalLiteralContext } from "./MParser";
import { CharacterLiteralContext } from "./MParser";
import { DateLiteralContext } from "./MParser";
import { TimeLiteralContext } from "./MParser";
import { TextLiteralContext } from "./MParser";
import { DecimalLiteralContext } from "./MParser";
import { DateTimeLiteralContext } from "./MParser";
import { BooleanLiteralContext } from "./MParser";
import { PeriodLiteralContext } from "./MParser";
import { VersionLiteralContext } from "./MParser";
import { UUIDLiteralContext } from "./MParser";
import { SymbolLiteralContext } from "./MParser";
import { TypeLiteralContext } from "./MParser";
import { NullLiteralContext } from "./MParser";
import { Literal_list_literalContext } from "./MParser";
import { This_expressionContext } from "./MParser";
import { Super_expressionContext } from "./MParser";
import { Parenthesis_expressionContext } from "./MParser";
import { Literal_expressionContext } from "./MParser";
import { Collection_literalContext } from "./MParser";
import { Tuple_literalContext } from "./MParser";
import { Dict_literalContext } from "./MParser";
import { Document_literalContext } from "./MParser";
import { Expression_tupleContext } from "./MParser";
import { Doc_entry_listContext } from "./MParser";
import { Doc_entryContext } from "./MParser";
import { DocKeyIdentifierContext } from "./MParser";
import { DocKeyTextContext } from "./MParser";
import { Dict_entry_listContext } from "./MParser";
import { Dict_entryContext } from "./MParser";
import { DictKeyIdentifierContext } from "./MParser";
import { DictKeyTextContext } from "./MParser";
import { SliceFirstAndLastContext } from "./MParser";
import { SliceFirstOnlyContext } from "./MParser";
import { SliceLastOnlyContext } from "./MParser";
import { Assign_variable_statementContext } from "./MParser";
import { ChildInstanceContext } from "./MParser";
import { RootInstanceContext } from "./MParser";
import { IsATypeExpressionContext } from "./MParser";
import { IsOtherExpressionContext } from "./MParser";
import { MetadataContext } from "./MParser";
import { ArrowExpressionBodyContext } from "./MParser";
import { ArrowStatementsBodyContext } from "./MParser";
import { Arrow_prefixContext } from "./MParser";
import { ArrowSingleArgContext } from "./MParser";
import { ArrowListArgContext } from "./MParser";
import { Sorted_keyContext } from "./MParser";
import { Read_blob_expressionContext } from "./MParser";
import { Read_all_expressionContext } from "./MParser";
import { Read_one_expressionContext } from "./MParser";
import { Order_by_listContext } from "./MParser";
import { Order_byContext } from "./MParser";
import { Include_listContext } from "./MParser";
import { OperatorPlusContext } from "./MParser";
import { OperatorMinusContext } from "./MParser";
import { OperatorMultiplyContext } from "./MParser";
import { OperatorDivideContext } from "./MParser";
import { OperatorIDivideContext } from "./MParser";
import { OperatorModuloContext } from "./MParser";
import { KeywordContext } from "./MParser";
import { New_tokenContext } from "./MParser";
import { Key_tokenContext } from "./MParser";
import { Module_tokenContext } from "./MParser";
import { Value_tokenContext } from "./MParser";
import { Symbols_tokenContext } from "./MParser";
import { AssignContext } from "./MParser";
import { MultiplyContext } from "./MParser";
import { DivideContext } from "./MParser";
import { IdivideContext } from "./MParser";
import { ModuloContext } from "./MParser";
import { JavascriptReturnStatementContext } from "./MParser";
import { JavascriptStatementContext } from "./MParser";
import { JavascriptSelectorExpressionContext } from "./MParser";
import { JavascriptPrimaryExpressionContext } from "./MParser";
import { Javascript_primary_expressionContext } from "./MParser";
import { Javascript_this_expressionContext } from "./MParser";
import { Javascript_new_expressionContext } from "./MParser";
import { JavascriptMethodExpressionContext } from "./MParser";
import { JavascriptMemberExpressionContext } from "./MParser";
import { JavascriptItemExpressionContext } from "./MParser";
import { Javascript_method_expressionContext } from "./MParser";
import { JavascriptArgumentListContext } from "./MParser";
import { JavascriptArgumentListItemContext } from "./MParser";
import { Javascript_item_expressionContext } from "./MParser";
import { Javascript_parenthesis_expressionContext } from "./MParser";
import { Javascript_identifier_expressionContext } from "./MParser";
import { JavascriptIntegerLiteralContext } from "./MParser";
import { JavascriptDecimalLiteralContext } from "./MParser";
import { JavascriptTextLiteralContext } from "./MParser";
import { JavascriptBooleanLiteralContext } from "./MParser";
import { JavascriptCharacterLiteralContext } from "./MParser";
import { Javascript_identifierContext } from "./MParser";
import { PythonReturnStatementContext } from "./MParser";
import { PythonStatementContext } from "./MParser";
import { PythonSelectorExpressionContext } from "./MParser";
import { PythonPrimaryExpressionContext } from "./MParser";
import { PythonSelfExpressionContext } from "./MParser";
import { PythonParenthesisExpressionContext } from "./MParser";
import { PythonIdentifierExpressionContext } from "./MParser";
import { PythonLiteralExpressionContext } from "./MParser";
import { PythonGlobalMethodExpressionContext } from "./MParser";
import { Python_self_expressionContext } from "./MParser";
import { PythonMethodExpressionContext } from "./MParser";
import { PythonItemExpressionContext } from "./MParser";
import { Python_method_expressionContext } from "./MParser";
import { PythonOrdinalOnlyArgumentListContext } from "./MParser";
import { PythonNamedOnlyArgumentListContext } from "./MParser";
import { PythonArgumentListContext } from "./MParser";
import { PythonOrdinalArgumentListContext } from "./MParser";
import { PythonOrdinalArgumentListItemContext } from "./MParser";
import { PythonNamedArgumentListContext } from "./MParser";
import { PythonNamedArgumentListItemContext } from "./MParser";
import { Python_parenthesis_expressionContext } from "./MParser";
import { PythonChildIdentifierContext } from "./MParser";
import { PythonPromptoIdentifierContext } from "./MParser";
import { PythonIdentifierContext } from "./MParser";
import { PythonIntegerLiteralContext } from "./MParser";
import { PythonDecimalLiteralContext } from "./MParser";
import { PythonTextLiteralContext } from "./MParser";
import { PythonBooleanLiteralContext } from "./MParser";
import { PythonCharacterLiteralContext } from "./MParser";
import { Python_identifierContext } from "./MParser";
import { JavaReturnStatementContext } from "./MParser";
import { JavaStatementContext } from "./MParser";
import { JavaSelectorExpressionContext } from "./MParser";
import { JavaPrimaryExpressionContext } from "./MParser";
import { Java_primary_expressionContext } from "./MParser";
import { Java_this_expressionContext } from "./MParser";
import { Java_new_expressionContext } from "./MParser";
import { JavaMethodExpressionContext } from "./MParser";
import { JavaItemExpressionContext } from "./MParser";
import { Java_method_expressionContext } from "./MParser";
import { JavaArgumentListItemContext } from "./MParser";
import { JavaArgumentListContext } from "./MParser";
import { Java_item_expressionContext } from "./MParser";
import { Java_parenthesis_expressionContext } from "./MParser";
import { JavaIdentifierContext } from "./MParser";
import { JavaChildIdentifierContext } from "./MParser";
import { JavaClassIdentifierContext } from "./MParser";
import { JavaChildClassIdentifierContext } from "./MParser";
import { JavaIntegerLiteralContext } from "./MParser";
import { JavaDecimalLiteralContext } from "./MParser";
import { JavaTextLiteralContext } from "./MParser";
import { JavaBooleanLiteralContext } from "./MParser";
import { JavaCharacterLiteralContext } from "./MParser";
import { Java_identifierContext } from "./MParser";
import { CSharpReturnStatementContext } from "./MParser";
import { CSharpStatementContext } from "./MParser";
import { CSharpSelectorExpressionContext } from "./MParser";
import { CSharpPrimaryExpressionContext } from "./MParser";
import { Csharp_primary_expressionContext } from "./MParser";
import { Csharp_this_expressionContext } from "./MParser";
import { Csharp_new_expressionContext } from "./MParser";
import { CSharpMethodExpressionContext } from "./MParser";
import { CSharpItemExpressionContext } from "./MParser";
import { Csharp_method_expressionContext } from "./MParser";
import { CSharpArgumentListContext } from "./MParser";
import { CSharpArgumentListItemContext } from "./MParser";
import { Csharp_item_expressionContext } from "./MParser";
import { Csharp_parenthesis_expressionContext } from "./MParser";
import { CSharpIdentifierContext } from "./MParser";
import { CSharpChildIdentifierContext } from "./MParser";
import { CSharpPromptoIdentifierContext } from "./MParser";
import { CSharpIntegerLiteralContext } from "./MParser";
import { CSharpDecimalLiteralContext } from "./MParser";
import { CSharpTextLiteralContext } from "./MParser";
import { CSharpBooleanLiteralContext } from "./MParser";
import { CSharpCharacterLiteralContext } from "./MParser";
import { Csharp_identifierContext } from "./MParser";
import { Jsx_expressionContext } from "./MParser";
import { JsxSelfClosingContext } from "./MParser";
import { JsxElementContext } from "./MParser";
import { Jsx_fragmentContext } from "./MParser";
import { Jsx_fragment_startContext } from "./MParser";
import { Jsx_fragment_endContext } from "./MParser";
import { Jsx_self_closingContext } from "./MParser";
import { Jsx_openingContext } from "./MParser";
import { Jsx_closingContext } from "./MParser";
import { Jsx_element_nameContext } from "./MParser";
import { Jsx_identifierContext } from "./MParser";
import { Jsx_attributeContext } from "./MParser";
import { JsxLiteralContext } from "./MParser";
import { JsxValueContext } from "./MParser";
import { Jsx_childrenContext } from "./MParser";
import { JsxTextContext } from "./MParser";
import { JsxChildContext } from "./MParser";
import { JsxCodeContext } from "./MParser";
import { Jsx_textContext } from "./MParser";
import { Jsx_charContext } from "./MParser";
import { Css_expressionContext } from "./MParser";
import { Css_fieldContext } from "./MParser";
import { Css_identifierContext } from "./MParser";
import { CssValueContext } from "./MParser";
import { CssTextContext } from "./MParser";
import { Css_textContext } from "./MParser";
/**
 * This interface defines a complete listener for a parse tree produced by
 * `MParser`.
 */
export default class MParserListener extends ParseTreeListener {
    /**
     * Enter a parse tree produced by `MParser.enum_category_declaration`.
     * @param ctx the parse tree
     */
    enterEnum_category_declaration?: (ctx: Enum_category_declarationContext) => void;
    /**
     * Exit a parse tree produced by `MParser.enum_category_declaration`.
     * @param ctx the parse tree
     */
    exitEnum_category_declaration?: (ctx: Enum_category_declarationContext) => void;
    /**
     * Enter a parse tree produced by `MParser.enum_native_declaration`.
     * @param ctx the parse tree
     */
    enterEnum_native_declaration?: (ctx: Enum_native_declarationContext) => void;
    /**
     * Exit a parse tree produced by `MParser.enum_native_declaration`.
     * @param ctx the parse tree
     */
    exitEnum_native_declaration?: (ctx: Enum_native_declarationContext) => void;
    /**
     * Enter a parse tree produced by `MParser.native_symbol`.
     * @param ctx the parse tree
     */
    enterNative_symbol?: (ctx: Native_symbolContext) => void;
    /**
     * Exit a parse tree produced by `MParser.native_symbol`.
     * @param ctx the parse tree
     */
    exitNative_symbol?: (ctx: Native_symbolContext) => void;
    /**
     * Enter a parse tree produced by `MParser.category_symbol`.
     * @param ctx the parse tree
     */
    enterCategory_symbol?: (ctx: Category_symbolContext) => void;
    /**
     * Exit a parse tree produced by `MParser.category_symbol`.
     * @param ctx the parse tree
     */
    exitCategory_symbol?: (ctx: Category_symbolContext) => void;
    /**
     * Enter a parse tree produced by `MParser.attribute_declaration`.
     * @param ctx the parse tree
     */
    enterAttribute_declaration?: (ctx: Attribute_declarationContext) => void;
    /**
     * Exit a parse tree produced by `MParser.attribute_declaration`.
     * @param ctx the parse tree
     */
    exitAttribute_declaration?: (ctx: Attribute_declarationContext) => void;
    /**
     * Enter a parse tree produced by `MParser.index_clause`.
     * @param ctx the parse tree
     */
    enterIndex_clause?: (ctx: Index_clauseContext) => void;
    /**
     * Exit a parse tree produced by `MParser.index_clause`.
     * @param ctx the parse tree
     */
    exitIndex_clause?: (ctx: Index_clauseContext) => void;
    /**
     * Enter a parse tree produced by `MParser.concrete_widget_declaration`.
     * @param ctx the parse tree
     */
    enterConcrete_widget_declaration?: (ctx: Concrete_widget_declarationContext) => void;
    /**
     * Exit a parse tree produced by `MParser.concrete_widget_declaration`.
     * @param ctx the parse tree
     */
    exitConcrete_widget_declaration?: (ctx: Concrete_widget_declarationContext) => void;
    /**
     * Enter a parse tree produced by `MParser.native_widget_declaration`.
     * @param ctx the parse tree
     */
    enterNative_widget_declaration?: (ctx: Native_widget_declarationContext) => void;
    /**
     * Exit a parse tree produced by `MParser.native_widget_declaration`.
     * @param ctx the parse tree
     */
    exitNative_widget_declaration?: (ctx: Native_widget_declarationContext) => void;
    /**
     * Enter a parse tree produced by `MParser.concrete_category_declaration`.
     * @param ctx the parse tree
     */
    enterConcrete_category_declaration?: (ctx: Concrete_category_declarationContext) => void;
    /**
     * Exit a parse tree produced by `MParser.concrete_category_declaration`.
     * @param ctx the parse tree
     */
    exitConcrete_category_declaration?: (ctx: Concrete_category_declarationContext) => void;
    /**
     * Enter a parse tree produced by `MParser.singleton_category_declaration`.
     * @param ctx the parse tree
     */
    enterSingleton_category_declaration?: (ctx: Singleton_category_declarationContext) => void;
    /**
     * Exit a parse tree produced by `MParser.singleton_category_declaration`.
     * @param ctx the parse tree
     */
    exitSingleton_category_declaration?: (ctx: Singleton_category_declarationContext) => void;
    /**
     * Enter a parse tree produced by `MParser.derived_list`.
     * @param ctx the parse tree
     */
    enterDerived_list?: (ctx: Derived_listContext) => void;
    /**
     * Exit a parse tree produced by `MParser.derived_list`.
     * @param ctx the parse tree
     */
    exitDerived_list?: (ctx: Derived_listContext) => void;
    /**
     * Enter a parse tree produced by `MParser.operator_method_declaration`.
     * @param ctx the parse tree
     */
    enterOperator_method_declaration?: (ctx: Operator_method_declarationContext) => void;
    /**
     * Exit a parse tree produced by `MParser.operator_method_declaration`.
     * @param ctx the parse tree
     */
    exitOperator_method_declaration?: (ctx: Operator_method_declarationContext) => void;
    /**
     * Enter a parse tree produced by `MParser.setter_method_declaration`.
     * @param ctx the parse tree
     */
    enterSetter_method_declaration?: (ctx: Setter_method_declarationContext) => void;
    /**
     * Exit a parse tree produced by `MParser.setter_method_declaration`.
     * @param ctx the parse tree
     */
    exitSetter_method_declaration?: (ctx: Setter_method_declarationContext) => void;
    /**
     * Enter a parse tree produced by `MParser.native_setter_declaration`.
     * @param ctx the parse tree
     */
    enterNative_setter_declaration?: (ctx: Native_setter_declarationContext) => void;
    /**
     * Exit a parse tree produced by `MParser.native_setter_declaration`.
     * @param ctx the parse tree
     */
    exitNative_setter_declaration?: (ctx: Native_setter_declarationContext) => void;
    /**
     * Enter a parse tree produced by `MParser.getter_method_declaration`.
     * @param ctx the parse tree
     */
    enterGetter_method_declaration?: (ctx: Getter_method_declarationContext) => void;
    /**
     * Exit a parse tree produced by `MParser.getter_method_declaration`.
     * @param ctx the parse tree
     */
    exitGetter_method_declaration?: (ctx: Getter_method_declarationContext) => void;
    /**
     * Enter a parse tree produced by `MParser.native_getter_declaration`.
     * @param ctx the parse tree
     */
    enterNative_getter_declaration?: (ctx: Native_getter_declarationContext) => void;
    /**
     * Exit a parse tree produced by `MParser.native_getter_declaration`.
     * @param ctx the parse tree
     */
    exitNative_getter_declaration?: (ctx: Native_getter_declarationContext) => void;
    /**
     * Enter a parse tree produced by `MParser.native_category_declaration`.
     * @param ctx the parse tree
     */
    enterNative_category_declaration?: (ctx: Native_category_declarationContext) => void;
    /**
     * Exit a parse tree produced by `MParser.native_category_declaration`.
     * @param ctx the parse tree
     */
    exitNative_category_declaration?: (ctx: Native_category_declarationContext) => void;
    /**
     * Enter a parse tree produced by `MParser.native_resource_declaration`.
     * @param ctx the parse tree
     */
    enterNative_resource_declaration?: (ctx: Native_resource_declarationContext) => void;
    /**
     * Exit a parse tree produced by `MParser.native_resource_declaration`.
     * @param ctx the parse tree
     */
    exitNative_resource_declaration?: (ctx: Native_resource_declarationContext) => void;
    /**
     * Enter a parse tree produced by `MParser.native_category_bindings`.
     * @param ctx the parse tree
     */
    enterNative_category_bindings?: (ctx: Native_category_bindingsContext) => void;
    /**
     * Exit a parse tree produced by `MParser.native_category_bindings`.
     * @param ctx the parse tree
     */
    exitNative_category_bindings?: (ctx: Native_category_bindingsContext) => void;
    /**
     * Enter a parse tree produced by the `NativeCategoryBindingListItem`
     * labeled alternative in `MParser.native_category_binding_list`.
     * @param ctx the parse tree
     */
    enterNativeCategoryBindingListItem?: (ctx: NativeCategoryBindingListItemContext) => void;
    /**
     * Exit a parse tree produced by the `NativeCategoryBindingListItem`
     * labeled alternative in `MParser.native_category_binding_list`.
     * @param ctx the parse tree
     */
    exitNativeCategoryBindingListItem?: (ctx: NativeCategoryBindingListItemContext) => void;
    /**
     * Enter a parse tree produced by the `NativeCategoryBindingList`
     * labeled alternative in `MParser.native_category_binding_list`.
     * @param ctx the parse tree
     */
    enterNativeCategoryBindingList?: (ctx: NativeCategoryBindingListContext) => void;
    /**
     * Exit a parse tree produced by the `NativeCategoryBindingList`
     * labeled alternative in `MParser.native_category_binding_list`.
     * @param ctx the parse tree
     */
    exitNativeCategoryBindingList?: (ctx: NativeCategoryBindingListContext) => void;
    /**
     * Enter a parse tree produced by `MParser.abstract_global_method_declaration`.
     * @param ctx the parse tree
     */
    enterAbstract_global_method_declaration?: (ctx: Abstract_global_method_declarationContext) => void;
    /**
     * Exit a parse tree produced by `MParser.abstract_global_method_declaration`.
     * @param ctx the parse tree
     */
    exitAbstract_global_method_declaration?: (ctx: Abstract_global_method_declarationContext) => void;
    /**
     * Enter a parse tree produced by `MParser.abstract_member_method_declaration`.
     * @param ctx the parse tree
     */
    enterAbstract_member_method_declaration?: (ctx: Abstract_member_method_declarationContext) => void;
    /**
     * Exit a parse tree produced by `MParser.abstract_member_method_declaration`.
     * @param ctx the parse tree
     */
    exitAbstract_member_method_declaration?: (ctx: Abstract_member_method_declarationContext) => void;
    /**
     * Enter a parse tree produced by `MParser.concrete_method_declaration`.
     * @param ctx the parse tree
     */
    enterConcrete_method_declaration?: (ctx: Concrete_method_declarationContext) => void;
    /**
     * Exit a parse tree produced by `MParser.concrete_method_declaration`.
     * @param ctx the parse tree
     */
    exitConcrete_method_declaration?: (ctx: Concrete_method_declarationContext) => void;
    /**
     * Enter a parse tree produced by `MParser.native_method_declaration`.
     * @param ctx the parse tree
     */
    enterNative_method_declaration?: (ctx: Native_method_declarationContext) => void;
    /**
     * Exit a parse tree produced by `MParser.native_method_declaration`.
     * @param ctx the parse tree
     */
    exitNative_method_declaration?: (ctx: Native_method_declarationContext) => void;
    /**
     * Enter a parse tree produced by `MParser.test_method_declaration`.
     * @param ctx the parse tree
     */
    enterTest_method_declaration?: (ctx: Test_method_declarationContext) => void;
    /**
     * Exit a parse tree produced by `MParser.test_method_declaration`.
     * @param ctx the parse tree
     */
    exitTest_method_declaration?: (ctx: Test_method_declarationContext) => void;
    /**
     * Enter a parse tree produced by `MParser.assertion`.
     * @param ctx the parse tree
     */
    enterAssertion?: (ctx: AssertionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.assertion`.
     * @param ctx the parse tree
     */
    exitAssertion?: (ctx: AssertionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.typed_argument`.
     * @param ctx the parse tree
     */
    enterTyped_argument?: (ctx: Typed_argumentContext) => void;
    /**
     * Exit a parse tree produced by `MParser.typed_argument`.
     * @param ctx the parse tree
     */
    exitTyped_argument?: (ctx: Typed_argumentContext) => void;
    /**
     * Enter a parse tree produced by the `MethodCallStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    enterMethodCallStatement?: (ctx: MethodCallStatementContext) => void;
    /**
     * Exit a parse tree produced by the `MethodCallStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    exitMethodCallStatement?: (ctx: MethodCallStatementContext) => void;
    /**
     * Enter a parse tree produced by the `AssignInstanceStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    enterAssignInstanceStatement?: (ctx: AssignInstanceStatementContext) => void;
    /**
     * Exit a parse tree produced by the `AssignInstanceStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    exitAssignInstanceStatement?: (ctx: AssignInstanceStatementContext) => void;
    /**
     * Enter a parse tree produced by the `AssignTupleStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    enterAssignTupleStatement?: (ctx: AssignTupleStatementContext) => void;
    /**
     * Exit a parse tree produced by the `AssignTupleStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    exitAssignTupleStatement?: (ctx: AssignTupleStatementContext) => void;
    /**
     * Enter a parse tree produced by the `StoreStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    enterStoreStatement?: (ctx: StoreStatementContext) => void;
    /**
     * Exit a parse tree produced by the `StoreStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    exitStoreStatement?: (ctx: StoreStatementContext) => void;
    /**
     * Enter a parse tree produced by the `FetchStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    enterFetchStatement?: (ctx: FetchStatementContext) => void;
    /**
     * Exit a parse tree produced by the `FetchStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    exitFetchStatement?: (ctx: FetchStatementContext) => void;
    /**
     * Enter a parse tree produced by the `ReadStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    enterReadStatement?: (ctx: ReadStatementContext) => void;
    /**
     * Exit a parse tree produced by the `ReadStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    exitReadStatement?: (ctx: ReadStatementContext) => void;
    /**
     * Enter a parse tree produced by the `FlushStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    enterFlushStatement?: (ctx: FlushStatementContext) => void;
    /**
     * Exit a parse tree produced by the `FlushStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    exitFlushStatement?: (ctx: FlushStatementContext) => void;
    /**
     * Enter a parse tree produced by the `BreakStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    enterBreakStatement?: (ctx: BreakStatementContext) => void;
    /**
     * Exit a parse tree produced by the `BreakStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    exitBreakStatement?: (ctx: BreakStatementContext) => void;
    /**
     * Enter a parse tree produced by the `ReturnStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    enterReturnStatement?: (ctx: ReturnStatementContext) => void;
    /**
     * Exit a parse tree produced by the `ReturnStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    exitReturnStatement?: (ctx: ReturnStatementContext) => void;
    /**
     * Enter a parse tree produced by the `IfStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    enterIfStatement?: (ctx: IfStatementContext) => void;
    /**
     * Exit a parse tree produced by the `IfStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    exitIfStatement?: (ctx: IfStatementContext) => void;
    /**
     * Enter a parse tree produced by the `SwitchStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    enterSwitchStatement?: (ctx: SwitchStatementContext) => void;
    /**
     * Exit a parse tree produced by the `SwitchStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    exitSwitchStatement?: (ctx: SwitchStatementContext) => void;
    /**
     * Enter a parse tree produced by the `ForEachStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    enterForEachStatement?: (ctx: ForEachStatementContext) => void;
    /**
     * Exit a parse tree produced by the `ForEachStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    exitForEachStatement?: (ctx: ForEachStatementContext) => void;
    /**
     * Enter a parse tree produced by the `WhileStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    enterWhileStatement?: (ctx: WhileStatementContext) => void;
    /**
     * Exit a parse tree produced by the `WhileStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    exitWhileStatement?: (ctx: WhileStatementContext) => void;
    /**
     * Enter a parse tree produced by the `DoWhileStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    enterDoWhileStatement?: (ctx: DoWhileStatementContext) => void;
    /**
     * Exit a parse tree produced by the `DoWhileStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    exitDoWhileStatement?: (ctx: DoWhileStatementContext) => void;
    /**
     * Enter a parse tree produced by the `RaiseStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    enterRaiseStatement?: (ctx: RaiseStatementContext) => void;
    /**
     * Exit a parse tree produced by the `RaiseStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    exitRaiseStatement?: (ctx: RaiseStatementContext) => void;
    /**
     * Enter a parse tree produced by the `TryStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    enterTryStatement?: (ctx: TryStatementContext) => void;
    /**
     * Exit a parse tree produced by the `TryStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    exitTryStatement?: (ctx: TryStatementContext) => void;
    /**
     * Enter a parse tree produced by the `WriteStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    enterWriteStatement?: (ctx: WriteStatementContext) => void;
    /**
     * Exit a parse tree produced by the `WriteStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    exitWriteStatement?: (ctx: WriteStatementContext) => void;
    /**
     * Enter a parse tree produced by the `WithResourceStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    enterWithResourceStatement?: (ctx: WithResourceStatementContext) => void;
    /**
     * Exit a parse tree produced by the `WithResourceStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    exitWithResourceStatement?: (ctx: WithResourceStatementContext) => void;
    /**
     * Enter a parse tree produced by the `WithSingletonStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    enterWithSingletonStatement?: (ctx: WithSingletonStatementContext) => void;
    /**
     * Exit a parse tree produced by the `WithSingletonStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    exitWithSingletonStatement?: (ctx: WithSingletonStatementContext) => void;
    /**
     * Enter a parse tree produced by the `ClosureStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    enterClosureStatement?: (ctx: ClosureStatementContext) => void;
    /**
     * Exit a parse tree produced by the `ClosureStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    exitClosureStatement?: (ctx: ClosureStatementContext) => void;
    /**
     * Enter a parse tree produced by the `CommentStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    enterCommentStatement?: (ctx: CommentStatementContext) => void;
    /**
     * Exit a parse tree produced by the `CommentStatement`
     * labeled alternative in `MParser.statement`.
     * @param ctx the parse tree
     */
    exitCommentStatement?: (ctx: CommentStatementContext) => void;
    /**
     * Enter a parse tree produced by `MParser.flush_statement`.
     * @param ctx the parse tree
     */
    enterFlush_statement?: (ctx: Flush_statementContext) => void;
    /**
     * Exit a parse tree produced by `MParser.flush_statement`.
     * @param ctx the parse tree
     */
    exitFlush_statement?: (ctx: Flush_statementContext) => void;
    /**
     * Enter a parse tree produced by `MParser.store_statement`.
     * @param ctx the parse tree
     */
    enterStore_statement?: (ctx: Store_statementContext) => void;
    /**
     * Exit a parse tree produced by `MParser.store_statement`.
     * @param ctx the parse tree
     */
    exitStore_statement?: (ctx: Store_statementContext) => void;
    /**
     * Enter a parse tree produced by `MParser.method_call_expression`.
     * @param ctx the parse tree
     */
    enterMethod_call_expression?: (ctx: Method_call_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.method_call_expression`.
     * @param ctx the parse tree
     */
    exitMethod_call_expression?: (ctx: Method_call_expressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.method_call_statement`.
     * @param ctx the parse tree
     */
    enterMethod_call_statement?: (ctx: Method_call_statementContext) => void;
    /**
     * Exit a parse tree produced by `MParser.method_call_statement`.
     * @param ctx the parse tree
     */
    exitMethod_call_statement?: (ctx: Method_call_statementContext) => void;
    /**
     * Enter a parse tree produced by `MParser.with_resource_statement`.
     * @param ctx the parse tree
     */
    enterWith_resource_statement?: (ctx: With_resource_statementContext) => void;
    /**
     * Exit a parse tree produced by `MParser.with_resource_statement`.
     * @param ctx the parse tree
     */
    exitWith_resource_statement?: (ctx: With_resource_statementContext) => void;
    /**
     * Enter a parse tree produced by `MParser.with_singleton_statement`.
     * @param ctx the parse tree
     */
    enterWith_singleton_statement?: (ctx: With_singleton_statementContext) => void;
    /**
     * Exit a parse tree produced by `MParser.with_singleton_statement`.
     * @param ctx the parse tree
     */
    exitWith_singleton_statement?: (ctx: With_singleton_statementContext) => void;
    /**
     * Enter a parse tree produced by `MParser.switch_statement`.
     * @param ctx the parse tree
     */
    enterSwitch_statement?: (ctx: Switch_statementContext) => void;
    /**
     * Exit a parse tree produced by `MParser.switch_statement`.
     * @param ctx the parse tree
     */
    exitSwitch_statement?: (ctx: Switch_statementContext) => void;
    /**
     * Enter a parse tree produced by the `AtomicSwitchCase`
     * labeled alternative in `MParser.switch_case_statement`.
     * @param ctx the parse tree
     */
    enterAtomicSwitchCase?: (ctx: AtomicSwitchCaseContext) => void;
    /**
     * Exit a parse tree produced by the `AtomicSwitchCase`
     * labeled alternative in `MParser.switch_case_statement`.
     * @param ctx the parse tree
     */
    exitAtomicSwitchCase?: (ctx: AtomicSwitchCaseContext) => void;
    /**
     * Enter a parse tree produced by the `CollectionSwitchCase`
     * labeled alternative in `MParser.switch_case_statement`.
     * @param ctx the parse tree
     */
    enterCollectionSwitchCase?: (ctx: CollectionSwitchCaseContext) => void;
    /**
     * Exit a parse tree produced by the `CollectionSwitchCase`
     * labeled alternative in `MParser.switch_case_statement`.
     * @param ctx the parse tree
     */
    exitCollectionSwitchCase?: (ctx: CollectionSwitchCaseContext) => void;
    /**
     * Enter a parse tree produced by `MParser.for_each_statement`.
     * @param ctx the parse tree
     */
    enterFor_each_statement?: (ctx: For_each_statementContext) => void;
    /**
     * Exit a parse tree produced by `MParser.for_each_statement`.
     * @param ctx the parse tree
     */
    exitFor_each_statement?: (ctx: For_each_statementContext) => void;
    /**
     * Enter a parse tree produced by `MParser.do_while_statement`.
     * @param ctx the parse tree
     */
    enterDo_while_statement?: (ctx: Do_while_statementContext) => void;
    /**
     * Exit a parse tree produced by `MParser.do_while_statement`.
     * @param ctx the parse tree
     */
    exitDo_while_statement?: (ctx: Do_while_statementContext) => void;
    /**
     * Enter a parse tree produced by `MParser.while_statement`.
     * @param ctx the parse tree
     */
    enterWhile_statement?: (ctx: While_statementContext) => void;
    /**
     * Exit a parse tree produced by `MParser.while_statement`.
     * @param ctx the parse tree
     */
    exitWhile_statement?: (ctx: While_statementContext) => void;
    /**
     * Enter a parse tree produced by `MParser.if_statement`.
     * @param ctx the parse tree
     */
    enterIf_statement?: (ctx: If_statementContext) => void;
    /**
     * Exit a parse tree produced by `MParser.if_statement`.
     * @param ctx the parse tree
     */
    exitIf_statement?: (ctx: If_statementContext) => void;
    /**
     * Enter a parse tree produced by the `ElseIfStatementList`
     * labeled alternative in `MParser.else_if_statement_list`.
     * @param ctx the parse tree
     */
    enterElseIfStatementList?: (ctx: ElseIfStatementListContext) => void;
    /**
     * Exit a parse tree produced by the `ElseIfStatementList`
     * labeled alternative in `MParser.else_if_statement_list`.
     * @param ctx the parse tree
     */
    exitElseIfStatementList?: (ctx: ElseIfStatementListContext) => void;
    /**
     * Enter a parse tree produced by the `ElseIfStatementListItem`
     * labeled alternative in `MParser.else_if_statement_list`.
     * @param ctx the parse tree
     */
    enterElseIfStatementListItem?: (ctx: ElseIfStatementListItemContext) => void;
    /**
     * Exit a parse tree produced by the `ElseIfStatementListItem`
     * labeled alternative in `MParser.else_if_statement_list`.
     * @param ctx the parse tree
     */
    exitElseIfStatementListItem?: (ctx: ElseIfStatementListItemContext) => void;
    /**
     * Enter a parse tree produced by `MParser.raise_statement`.
     * @param ctx the parse tree
     */
    enterRaise_statement?: (ctx: Raise_statementContext) => void;
    /**
     * Exit a parse tree produced by `MParser.raise_statement`.
     * @param ctx the parse tree
     */
    exitRaise_statement?: (ctx: Raise_statementContext) => void;
    /**
     * Enter a parse tree produced by `MParser.try_statement`.
     * @param ctx the parse tree
     */
    enterTry_statement?: (ctx: Try_statementContext) => void;
    /**
     * Exit a parse tree produced by `MParser.try_statement`.
     * @param ctx the parse tree
     */
    exitTry_statement?: (ctx: Try_statementContext) => void;
    /**
     * Enter a parse tree produced by the `CatchAtomicStatement`
     * labeled alternative in `MParser.catch_statement`.
     * @param ctx the parse tree
     */
    enterCatchAtomicStatement?: (ctx: CatchAtomicStatementContext) => void;
    /**
     * Exit a parse tree produced by the `CatchAtomicStatement`
     * labeled alternative in `MParser.catch_statement`.
     * @param ctx the parse tree
     */
    exitCatchAtomicStatement?: (ctx: CatchAtomicStatementContext) => void;
    /**
     * Enter a parse tree produced by the `CatchCollectionStatement`
     * labeled alternative in `MParser.catch_statement`.
     * @param ctx the parse tree
     */
    enterCatchCollectionStatement?: (ctx: CatchCollectionStatementContext) => void;
    /**
     * Exit a parse tree produced by the `CatchCollectionStatement`
     * labeled alternative in `MParser.catch_statement`.
     * @param ctx the parse tree
     */
    exitCatchCollectionStatement?: (ctx: CatchCollectionStatementContext) => void;
    /**
     * Enter a parse tree produced by `MParser.break_statement`.
     * @param ctx the parse tree
     */
    enterBreak_statement?: (ctx: Break_statementContext) => void;
    /**
     * Exit a parse tree produced by `MParser.break_statement`.
     * @param ctx the parse tree
     */
    exitBreak_statement?: (ctx: Break_statementContext) => void;
    /**
     * Enter a parse tree produced by `MParser.return_statement`.
     * @param ctx the parse tree
     */
    enterReturn_statement?: (ctx: Return_statementContext) => void;
    /**
     * Exit a parse tree produced by `MParser.return_statement`.
     * @param ctx the parse tree
     */
    exitReturn_statement?: (ctx: Return_statementContext) => void;
    /**
     * Enter a parse tree produced by the `IntDivideExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterIntDivideExpression?: (ctx: IntDivideExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `IntDivideExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitIntDivideExpression?: (ctx: IntDivideExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `HasAnyExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterHasAnyExpression?: (ctx: HasAnyExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `HasAnyExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitHasAnyExpression?: (ctx: HasAnyExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `HasExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterHasExpression?: (ctx: HasExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `HasExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitHasExpression?: (ctx: HasExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `TernaryExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterTernaryExpression?: (ctx: TernaryExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `TernaryExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitTernaryExpression?: (ctx: TernaryExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `InExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterInExpression?: (ctx: InExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `InExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitInExpression?: (ctx: InExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `JsxExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterJsxExpression?: (ctx: JsxExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `JsxExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitJsxExpression?: (ctx: JsxExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `NotExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterNotExpression?: (ctx: NotExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `NotExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitNotExpression?: (ctx: NotExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `CompareExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterCompareExpression?: (ctx: CompareExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `CompareExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitCompareExpression?: (ctx: CompareExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `OrExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterOrExpression?: (ctx: OrExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `OrExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitOrExpression?: (ctx: OrExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `CodeExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterCodeExpression?: (ctx: CodeExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `CodeExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitCodeExpression?: (ctx: CodeExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `AndExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterAndExpression?: (ctx: AndExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `AndExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitAndExpression?: (ctx: AndExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `ArrowExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterArrowExpression?: (ctx: ArrowExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `ArrowExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitArrowExpression?: (ctx: ArrowExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `ContainsExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterContainsExpression?: (ctx: ContainsExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `ContainsExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitContainsExpression?: (ctx: ContainsExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `FilteredListExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterFilteredListExpression?: (ctx: FilteredListExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `FilteredListExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitFilteredListExpression?: (ctx: FilteredListExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `TypeExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterTypeExpression?: (ctx: TypeExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `TypeExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitTypeExpression?: (ctx: TypeExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `MultiplyExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterMultiplyExpression?: (ctx: MultiplyExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `MultiplyExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitMultiplyExpression?: (ctx: MultiplyExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `ExecuteExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterExecuteExpression?: (ctx: ExecuteExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `ExecuteExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitExecuteExpression?: (ctx: ExecuteExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `IteratorExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterIteratorExpression?: (ctx: IteratorExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `IteratorExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitIteratorExpression?: (ctx: IteratorExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `DivideExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterDivideExpression?: (ctx: DivideExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `DivideExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitDivideExpression?: (ctx: DivideExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `IsExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterIsExpression?: (ctx: IsExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `IsExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitIsExpression?: (ctx: IsExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `MinusExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterMinusExpression?: (ctx: MinusExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `MinusExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitMinusExpression?: (ctx: MinusExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `AddExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterAddExpression?: (ctx: AddExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `AddExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitAddExpression?: (ctx: AddExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `HasAllExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterHasAllExpression?: (ctx: HasAllExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `HasAllExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitHasAllExpression?: (ctx: HasAllExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `InstanceExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterInstanceExpression?: (ctx: InstanceExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `InstanceExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitInstanceExpression?: (ctx: InstanceExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `MutableInstanceExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterMutableInstanceExpression?: (ctx: MutableInstanceExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `MutableInstanceExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitMutableInstanceExpression?: (ctx: MutableInstanceExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `CssExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterCssExpression?: (ctx: CssExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `CssExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitCssExpression?: (ctx: CssExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `CastExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterCastExpression?: (ctx: CastExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `CastExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitCastExpression?: (ctx: CastExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `ModuloExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterModuloExpression?: (ctx: ModuloExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `ModuloExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitModuloExpression?: (ctx: ModuloExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `EqualsExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    enterEqualsExpression?: (ctx: EqualsExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `EqualsExpression`
     * labeled alternative in `MParser.expression`.
     * @param ctx the parse tree
     */
    exitEqualsExpression?: (ctx: EqualsExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `ArrowFilterExpression`
     * labeled alternative in `MParser.filter_expression`.
     * @param ctx the parse tree
     */
    enterArrowFilterExpression?: (ctx: ArrowFilterExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `ArrowFilterExpression`
     * labeled alternative in `MParser.filter_expression`.
     * @param ctx the parse tree
     */
    exitArrowFilterExpression?: (ctx: ArrowFilterExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `ExplicitFilterExpression`
     * labeled alternative in `MParser.filter_expression`.
     * @param ctx the parse tree
     */
    enterExplicitFilterExpression?: (ctx: ExplicitFilterExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `ExplicitFilterExpression`
     * labeled alternative in `MParser.filter_expression`.
     * @param ctx the parse tree
     */
    exitExplicitFilterExpression?: (ctx: ExplicitFilterExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `OtherFilterExpression`
     * labeled alternative in `MParser.filter_expression`.
     * @param ctx the parse tree
     */
    enterOtherFilterExpression?: (ctx: OtherFilterExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `OtherFilterExpression`
     * labeled alternative in `MParser.filter_expression`.
     * @param ctx the parse tree
     */
    exitOtherFilterExpression?: (ctx: OtherFilterExpressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.type_expression`.
     * @param ctx the parse tree
     */
    enterType_expression?: (ctx: Type_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.type_expression`.
     * @param ctx the parse tree
     */
    exitType_expression?: (ctx: Type_expressionContext) => void;
    /**
     * Enter a parse tree produced by the `MethodExpression`
     * labeled alternative in `MParser.selectable_expression`.
     * @param ctx the parse tree
     */
    enterMethodExpression?: (ctx: MethodExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `MethodExpression`
     * labeled alternative in `MParser.selectable_expression`.
     * @param ctx the parse tree
     */
    exitMethodExpression?: (ctx: MethodExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `ParenthesisExpression`
     * labeled alternative in `MParser.selectable_expression`.
     * @param ctx the parse tree
     */
    enterParenthesisExpression?: (ctx: ParenthesisExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `ParenthesisExpression`
     * labeled alternative in `MParser.selectable_expression`.
     * @param ctx the parse tree
     */
    exitParenthesisExpression?: (ctx: ParenthesisExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `LiteralExpression`
     * labeled alternative in `MParser.selectable_expression`.
     * @param ctx the parse tree
     */
    enterLiteralExpression?: (ctx: LiteralExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `LiteralExpression`
     * labeled alternative in `MParser.selectable_expression`.
     * @param ctx the parse tree
     */
    exitLiteralExpression?: (ctx: LiteralExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `IdentifierExpression`
     * labeled alternative in `MParser.selectable_expression`.
     * @param ctx the parse tree
     */
    enterIdentifierExpression?: (ctx: IdentifierExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `IdentifierExpression`
     * labeled alternative in `MParser.selectable_expression`.
     * @param ctx the parse tree
     */
    exitIdentifierExpression?: (ctx: IdentifierExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `ThisExpression`
     * labeled alternative in `MParser.selectable_expression`.
     * @param ctx the parse tree
     */
    enterThisExpression?: (ctx: ThisExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `ThisExpression`
     * labeled alternative in `MParser.selectable_expression`.
     * @param ctx the parse tree
     */
    exitThisExpression?: (ctx: ThisExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `SuperExpression`
     * labeled alternative in `MParser.selectable_expression`.
     * @param ctx the parse tree
     */
    enterSuperExpression?: (ctx: SuperExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `SuperExpression`
     * labeled alternative in `MParser.selectable_expression`.
     * @param ctx the parse tree
     */
    exitSuperExpression?: (ctx: SuperExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `SelectorExpression`
     * labeled alternative in `MParser.instance_expression`.
     * @param ctx the parse tree
     */
    enterSelectorExpression?: (ctx: SelectorExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `SelectorExpression`
     * labeled alternative in `MParser.instance_expression`.
     * @param ctx the parse tree
     */
    exitSelectorExpression?: (ctx: SelectorExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `SelectableExpression`
     * labeled alternative in `MParser.instance_expression`.
     * @param ctx the parse tree
     */
    enterSelectableExpression?: (ctx: SelectableExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `SelectableExpression`
     * labeled alternative in `MParser.instance_expression`.
     * @param ctx the parse tree
     */
    exitSelectableExpression?: (ctx: SelectableExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `MutableSelectableExpression`
     * labeled alternative in `MParser.mutable_instance_expression`.
     * @param ctx the parse tree
     */
    enterMutableSelectableExpression?: (ctx: MutableSelectableExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `MutableSelectableExpression`
     * labeled alternative in `MParser.mutable_instance_expression`.
     * @param ctx the parse tree
     */
    exitMutableSelectableExpression?: (ctx: MutableSelectableExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `MutableSelectorExpression`
     * labeled alternative in `MParser.mutable_instance_expression`.
     * @param ctx the parse tree
     */
    enterMutableSelectorExpression?: (ctx: MutableSelectorExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `MutableSelectorExpression`
     * labeled alternative in `MParser.mutable_instance_expression`.
     * @param ctx the parse tree
     */
    exitMutableSelectorExpression?: (ctx: MutableSelectorExpressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.method_expression`.
     * @param ctx the parse tree
     */
    enterMethod_expression?: (ctx: Method_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.method_expression`.
     * @param ctx the parse tree
     */
    exitMethod_expression?: (ctx: Method_expressionContext) => void;
    /**
     * Enter a parse tree produced by the `MemberSelector`
     * labeled alternative in `MParser.instance_selector`.
     * @param ctx the parse tree
     */
    enterMemberSelector?: (ctx: MemberSelectorContext) => void;
    /**
     * Exit a parse tree produced by the `MemberSelector`
     * labeled alternative in `MParser.instance_selector`.
     * @param ctx the parse tree
     */
    exitMemberSelector?: (ctx: MemberSelectorContext) => void;
    /**
     * Enter a parse tree produced by the `MethodSelector`
     * labeled alternative in `MParser.instance_selector`.
     * @param ctx the parse tree
     */
    enterMethodSelector?: (ctx: MethodSelectorContext) => void;
    /**
     * Exit a parse tree produced by the `MethodSelector`
     * labeled alternative in `MParser.instance_selector`.
     * @param ctx the parse tree
     */
    exitMethodSelector?: (ctx: MethodSelectorContext) => void;
    /**
     * Enter a parse tree produced by the `SliceSelector`
     * labeled alternative in `MParser.instance_selector`.
     * @param ctx the parse tree
     */
    enterSliceSelector?: (ctx: SliceSelectorContext) => void;
    /**
     * Exit a parse tree produced by the `SliceSelector`
     * labeled alternative in `MParser.instance_selector`.
     * @param ctx the parse tree
     */
    exitSliceSelector?: (ctx: SliceSelectorContext) => void;
    /**
     * Enter a parse tree produced by the `ItemSelector`
     * labeled alternative in `MParser.instance_selector`.
     * @param ctx the parse tree
     */
    enterItemSelector?: (ctx: ItemSelectorContext) => void;
    /**
     * Exit a parse tree produced by the `ItemSelector`
     * labeled alternative in `MParser.instance_selector`.
     * @param ctx the parse tree
     */
    exitItemSelector?: (ctx: ItemSelectorContext) => void;
    /**
     * Enter a parse tree produced by `MParser.blob_expression`.
     * @param ctx the parse tree
     */
    enterBlob_expression?: (ctx: Blob_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.blob_expression`.
     * @param ctx the parse tree
     */
    exitBlob_expression?: (ctx: Blob_expressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.document_expression`.
     * @param ctx the parse tree
     */
    enterDocument_expression?: (ctx: Document_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.document_expression`.
     * @param ctx the parse tree
     */
    exitDocument_expression?: (ctx: Document_expressionContext) => void;
    /**
     * Enter a parse tree produced by the `ConstructorFrom`
     * labeled alternative in `MParser.constructor_expression`.
     * @param ctx the parse tree
     */
    enterConstructorFrom?: (ctx: ConstructorFromContext) => void;
    /**
     * Exit a parse tree produced by the `ConstructorFrom`
     * labeled alternative in `MParser.constructor_expression`.
     * @param ctx the parse tree
     */
    exitConstructorFrom?: (ctx: ConstructorFromContext) => void;
    /**
     * Enter a parse tree produced by the `ConstructorNoFrom`
     * labeled alternative in `MParser.constructor_expression`.
     * @param ctx the parse tree
     */
    enterConstructorNoFrom?: (ctx: ConstructorNoFromContext) => void;
    /**
     * Exit a parse tree produced by the `ConstructorNoFrom`
     * labeled alternative in `MParser.constructor_expression`.
     * @param ctx the parse tree
     */
    exitConstructorNoFrom?: (ctx: ConstructorNoFromContext) => void;
    /**
     * Enter a parse tree produced by `MParser.copy_from`.
     * @param ctx the parse tree
     */
    enterCopy_from?: (ctx: Copy_fromContext) => void;
    /**
     * Exit a parse tree produced by `MParser.copy_from`.
     * @param ctx the parse tree
     */
    exitCopy_from?: (ctx: Copy_fromContext) => void;
    /**
     * Enter a parse tree produced by the `ExpressionAssignmentList`
     * labeled alternative in `MParser.argument_assignment_list`.
     * @param ctx the parse tree
     */
    enterExpressionAssignmentList?: (ctx: ExpressionAssignmentListContext) => void;
    /**
     * Exit a parse tree produced by the `ExpressionAssignmentList`
     * labeled alternative in `MParser.argument_assignment_list`.
     * @param ctx the parse tree
     */
    exitExpressionAssignmentList?: (ctx: ExpressionAssignmentListContext) => void;
    /**
     * Enter a parse tree produced by the `ArgumentAssignmentList`
     * labeled alternative in `MParser.argument_assignment_list`.
     * @param ctx the parse tree
     */
    enterArgumentAssignmentList?: (ctx: ArgumentAssignmentListContext) => void;
    /**
     * Exit a parse tree produced by the `ArgumentAssignmentList`
     * labeled alternative in `MParser.argument_assignment_list`.
     * @param ctx the parse tree
     */
    exitArgumentAssignmentList?: (ctx: ArgumentAssignmentListContext) => void;
    /**
     * Enter a parse tree produced by the `ArgumentAssignmentListItem`
     * labeled alternative in `MParser.argument_assignment_list`.
     * @param ctx the parse tree
     */
    enterArgumentAssignmentListItem?: (ctx: ArgumentAssignmentListItemContext) => void;
    /**
     * Exit a parse tree produced by the `ArgumentAssignmentListItem`
     * labeled alternative in `MParser.argument_assignment_list`.
     * @param ctx the parse tree
     */
    exitArgumentAssignmentListItem?: (ctx: ArgumentAssignmentListItemContext) => void;
    /**
     * Enter a parse tree produced by `MParser.argument_assignment`.
     * @param ctx the parse tree
     */
    enterArgument_assignment?: (ctx: Argument_assignmentContext) => void;
    /**
     * Exit a parse tree produced by `MParser.argument_assignment`.
     * @param ctx the parse tree
     */
    exitArgument_assignment?: (ctx: Argument_assignmentContext) => void;
    /**
     * Enter a parse tree produced by `MParser.write_statement`.
     * @param ctx the parse tree
     */
    enterWrite_statement?: (ctx: Write_statementContext) => void;
    /**
     * Exit a parse tree produced by `MParser.write_statement`.
     * @param ctx the parse tree
     */
    exitWrite_statement?: (ctx: Write_statementContext) => void;
    /**
     * Enter a parse tree produced by `MParser.filtered_list_suffix`.
     * @param ctx the parse tree
     */
    enterFiltered_list_suffix?: (ctx: Filtered_list_suffixContext) => void;
    /**
     * Exit a parse tree produced by `MParser.filtered_list_suffix`.
     * @param ctx the parse tree
     */
    exitFiltered_list_suffix?: (ctx: Filtered_list_suffixContext) => void;
    /**
     * Enter a parse tree produced by the `FetchOne`
     * labeled alternative in `MParser.fetch_expression`.
     * @param ctx the parse tree
     */
    enterFetchOne?: (ctx: FetchOneContext) => void;
    /**
     * Exit a parse tree produced by the `FetchOne`
     * labeled alternative in `MParser.fetch_expression`.
     * @param ctx the parse tree
     */
    exitFetchOne?: (ctx: FetchOneContext) => void;
    /**
     * Enter a parse tree produced by the `FetchMany`
     * labeled alternative in `MParser.fetch_expression`.
     * @param ctx the parse tree
     */
    enterFetchMany?: (ctx: FetchManyContext) => void;
    /**
     * Exit a parse tree produced by the `FetchMany`
     * labeled alternative in `MParser.fetch_expression`.
     * @param ctx the parse tree
     */
    exitFetchMany?: (ctx: FetchManyContext) => void;
    /**
     * Enter a parse tree produced by the `FetchOneAsync`
     * labeled alternative in `MParser.fetch_statement`.
     * @param ctx the parse tree
     */
    enterFetchOneAsync?: (ctx: FetchOneAsyncContext) => void;
    /**
     * Exit a parse tree produced by the `FetchOneAsync`
     * labeled alternative in `MParser.fetch_statement`.
     * @param ctx the parse tree
     */
    exitFetchOneAsync?: (ctx: FetchOneAsyncContext) => void;
    /**
     * Enter a parse tree produced by the `FetchManyAsync`
     * labeled alternative in `MParser.fetch_statement`.
     * @param ctx the parse tree
     */
    enterFetchManyAsync?: (ctx: FetchManyAsyncContext) => void;
    /**
     * Exit a parse tree produced by the `FetchManyAsync`
     * labeled alternative in `MParser.fetch_statement`.
     * @param ctx the parse tree
     */
    exitFetchManyAsync?: (ctx: FetchManyAsyncContext) => void;
    /**
     * Enter a parse tree produced by `MParser.then`.
     * @param ctx the parse tree
     */
    enterThen?: (ctx: ThenContext) => void;
    /**
     * Exit a parse tree produced by `MParser.then`.
     * @param ctx the parse tree
     */
    exitThen?: (ctx: ThenContext) => void;
    /**
     * Enter a parse tree produced by `MParser.read_statement`.
     * @param ctx the parse tree
     */
    enterRead_statement?: (ctx: Read_statementContext) => void;
    /**
     * Exit a parse tree produced by `MParser.read_statement`.
     * @param ctx the parse tree
     */
    exitRead_statement?: (ctx: Read_statementContext) => void;
    /**
     * Enter a parse tree produced by `MParser.sorted_expression`.
     * @param ctx the parse tree
     */
    enterSorted_expression?: (ctx: Sorted_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.sorted_expression`.
     * @param ctx the parse tree
     */
    exitSorted_expression?: (ctx: Sorted_expressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.assign_instance_statement`.
     * @param ctx the parse tree
     */
    enterAssign_instance_statement?: (ctx: Assign_instance_statementContext) => void;
    /**
     * Exit a parse tree produced by `MParser.assign_instance_statement`.
     * @param ctx the parse tree
     */
    exitAssign_instance_statement?: (ctx: Assign_instance_statementContext) => void;
    /**
     * Enter a parse tree produced by the `MemberInstance`
     * labeled alternative in `MParser.child_instance`.
     * @param ctx the parse tree
     */
    enterMemberInstance?: (ctx: MemberInstanceContext) => void;
    /**
     * Exit a parse tree produced by the `MemberInstance`
     * labeled alternative in `MParser.child_instance`.
     * @param ctx the parse tree
     */
    exitMemberInstance?: (ctx: MemberInstanceContext) => void;
    /**
     * Enter a parse tree produced by the `ItemInstance`
     * labeled alternative in `MParser.child_instance`.
     * @param ctx the parse tree
     */
    enterItemInstance?: (ctx: ItemInstanceContext) => void;
    /**
     * Exit a parse tree produced by the `ItemInstance`
     * labeled alternative in `MParser.child_instance`.
     * @param ctx the parse tree
     */
    exitItemInstance?: (ctx: ItemInstanceContext) => void;
    /**
     * Enter a parse tree produced by `MParser.assign_tuple_statement`.
     * @param ctx the parse tree
     */
    enterAssign_tuple_statement?: (ctx: Assign_tuple_statementContext) => void;
    /**
     * Exit a parse tree produced by `MParser.assign_tuple_statement`.
     * @param ctx the parse tree
     */
    exitAssign_tuple_statement?: (ctx: Assign_tuple_statementContext) => void;
    /**
     * Enter a parse tree produced by `MParser.lfs`.
     * @param ctx the parse tree
     */
    enterLfs?: (ctx: LfsContext) => void;
    /**
     * Exit a parse tree produced by `MParser.lfs`.
     * @param ctx the parse tree
     */
    exitLfs?: (ctx: LfsContext) => void;
    /**
     * Enter a parse tree produced by `MParser.lfp`.
     * @param ctx the parse tree
     */
    enterLfp?: (ctx: LfpContext) => void;
    /**
     * Exit a parse tree produced by `MParser.lfp`.
     * @param ctx the parse tree
     */
    exitLfp?: (ctx: LfpContext) => void;
    /**
     * Enter a parse tree produced by `MParser.ws_plus`.
     * @param ctx the parse tree
     */
    enterWs_plus?: (ctx: Ws_plusContext) => void;
    /**
     * Exit a parse tree produced by `MParser.ws_plus`.
     * @param ctx the parse tree
     */
    exitWs_plus?: (ctx: Ws_plusContext) => void;
    /**
     * Enter a parse tree produced by `MParser.indent`.
     * @param ctx the parse tree
     */
    enterIndent?: (ctx: IndentContext) => void;
    /**
     * Exit a parse tree produced by `MParser.indent`.
     * @param ctx the parse tree
     */
    exitIndent?: (ctx: IndentContext) => void;
    /**
     * Enter a parse tree produced by `MParser.dedent`.
     * @param ctx the parse tree
     */
    enterDedent?: (ctx: DedentContext) => void;
    /**
     * Exit a parse tree produced by `MParser.dedent`.
     * @param ctx the parse tree
     */
    exitDedent?: (ctx: DedentContext) => void;
    /**
     * Enter a parse tree produced by `MParser.type_literal`.
     * @param ctx the parse tree
     */
    enterType_literal?: (ctx: Type_literalContext) => void;
    /**
     * Exit a parse tree produced by `MParser.type_literal`.
     * @param ctx the parse tree
     */
    exitType_literal?: (ctx: Type_literalContext) => void;
    /**
     * Enter a parse tree produced by `MParser.null_literal`.
     * @param ctx the parse tree
     */
    enterNull_literal?: (ctx: Null_literalContext) => void;
    /**
     * Exit a parse tree produced by `MParser.null_literal`.
     * @param ctx the parse tree
     */
    exitNull_literal?: (ctx: Null_literalContext) => void;
    /**
     * Enter a parse tree produced by `MParser.comment_statement`.
     * @param ctx the parse tree
     */
    enterComment_statement?: (ctx: Comment_statementContext) => void;
    /**
     * Exit a parse tree produced by `MParser.comment_statement`.
     * @param ctx the parse tree
     */
    exitComment_statement?: (ctx: Comment_statementContext) => void;
    /**
     * Enter a parse tree produced by `MParser.repl`.
     * @param ctx the parse tree
     */
    enterRepl?: (ctx: ReplContext) => void;
    /**
     * Exit a parse tree produced by `MParser.repl`.
     * @param ctx the parse tree
     */
    exitRepl?: (ctx: ReplContext) => void;
    /**
     * Enter a parse tree produced by the `FullDeclarationList`
     * labeled alternative in `MParser.declaration_list`.
     * @param ctx the parse tree
     */
    enterFullDeclarationList?: (ctx: FullDeclarationListContext) => void;
    /**
     * Exit a parse tree produced by the `FullDeclarationList`
     * labeled alternative in `MParser.declaration_list`.
     * @param ctx the parse tree
     */
    exitFullDeclarationList?: (ctx: FullDeclarationListContext) => void;
    /**
     * Enter a parse tree produced by `MParser.declarations`.
     * @param ctx the parse tree
     */
    enterDeclarations?: (ctx: DeclarationsContext) => void;
    /**
     * Exit a parse tree produced by `MParser.declarations`.
     * @param ctx the parse tree
     */
    exitDeclarations?: (ctx: DeclarationsContext) => void;
    /**
     * Enter a parse tree produced by `MParser.declaration`.
     * @param ctx the parse tree
     */
    enterDeclaration?: (ctx: DeclarationContext) => void;
    /**
     * Exit a parse tree produced by `MParser.declaration`.
     * @param ctx the parse tree
     */
    exitDeclaration?: (ctx: DeclarationContext) => void;
    /**
     * Enter a parse tree produced by `MParser.annotation_constructor`.
     * @param ctx the parse tree
     */
    enterAnnotation_constructor?: (ctx: Annotation_constructorContext) => void;
    /**
     * Exit a parse tree produced by `MParser.annotation_constructor`.
     * @param ctx the parse tree
     */
    exitAnnotation_constructor?: (ctx: Annotation_constructorContext) => void;
    /**
     * Enter a parse tree produced by `MParser.annotation_identifier`.
     * @param ctx the parse tree
     */
    enterAnnotation_identifier?: (ctx: Annotation_identifierContext) => void;
    /**
     * Exit a parse tree produced by `MParser.annotation_identifier`.
     * @param ctx the parse tree
     */
    exitAnnotation_identifier?: (ctx: Annotation_identifierContext) => void;
    /**
     * Enter a parse tree produced by `MParser.annotation_argument`.
     * @param ctx the parse tree
     */
    enterAnnotation_argument?: (ctx: Annotation_argumentContext) => void;
    /**
     * Exit a parse tree produced by `MParser.annotation_argument`.
     * @param ctx the parse tree
     */
    exitAnnotation_argument?: (ctx: Annotation_argumentContext) => void;
    /**
     * Enter a parse tree produced by `MParser.annotation_argument_name`.
     * @param ctx the parse tree
     */
    enterAnnotation_argument_name?: (ctx: Annotation_argument_nameContext) => void;
    /**
     * Exit a parse tree produced by `MParser.annotation_argument_name`.
     * @param ctx the parse tree
     */
    exitAnnotation_argument_name?: (ctx: Annotation_argument_nameContext) => void;
    /**
     * Enter a parse tree produced by the `AnnotationLiteralValue`
     * labeled alternative in `MParser.annotation_argument_value`.
     * @param ctx the parse tree
     */
    enterAnnotationLiteralValue?: (ctx: AnnotationLiteralValueContext) => void;
    /**
     * Exit a parse tree produced by the `AnnotationLiteralValue`
     * labeled alternative in `MParser.annotation_argument_value`.
     * @param ctx the parse tree
     */
    exitAnnotationLiteralValue?: (ctx: AnnotationLiteralValueContext) => void;
    /**
     * Enter a parse tree produced by the `AnnotationTypeValue`
     * labeled alternative in `MParser.annotation_argument_value`.
     * @param ctx the parse tree
     */
    enterAnnotationTypeValue?: (ctx: AnnotationTypeValueContext) => void;
    /**
     * Exit a parse tree produced by the `AnnotationTypeValue`
     * labeled alternative in `MParser.annotation_argument_value`.
     * @param ctx the parse tree
     */
    exitAnnotationTypeValue?: (ctx: AnnotationTypeValueContext) => void;
    /**
     * Enter a parse tree produced by `MParser.resource_declaration`.
     * @param ctx the parse tree
     */
    enterResource_declaration?: (ctx: Resource_declarationContext) => void;
    /**
     * Exit a parse tree produced by `MParser.resource_declaration`.
     * @param ctx the parse tree
     */
    exitResource_declaration?: (ctx: Resource_declarationContext) => void;
    /**
     * Enter a parse tree produced by `MParser.enum_declaration`.
     * @param ctx the parse tree
     */
    enterEnum_declaration?: (ctx: Enum_declarationContext) => void;
    /**
     * Exit a parse tree produced by `MParser.enum_declaration`.
     * @param ctx the parse tree
     */
    exitEnum_declaration?: (ctx: Enum_declarationContext) => void;
    /**
     * Enter a parse tree produced by `MParser.native_symbol_list`.
     * @param ctx the parse tree
     */
    enterNative_symbol_list?: (ctx: Native_symbol_listContext) => void;
    /**
     * Exit a parse tree produced by `MParser.native_symbol_list`.
     * @param ctx the parse tree
     */
    exitNative_symbol_list?: (ctx: Native_symbol_listContext) => void;
    /**
     * Enter a parse tree produced by `MParser.category_symbol_list`.
     * @param ctx the parse tree
     */
    enterCategory_symbol_list?: (ctx: Category_symbol_listContext) => void;
    /**
     * Exit a parse tree produced by `MParser.category_symbol_list`.
     * @param ctx the parse tree
     */
    exitCategory_symbol_list?: (ctx: Category_symbol_listContext) => void;
    /**
     * Enter a parse tree produced by `MParser.symbol_list`.
     * @param ctx the parse tree
     */
    enterSymbol_list?: (ctx: Symbol_listContext) => void;
    /**
     * Exit a parse tree produced by `MParser.symbol_list`.
     * @param ctx the parse tree
     */
    exitSymbol_list?: (ctx: Symbol_listContext) => void;
    /**
     * Enter a parse tree produced by the `MatchingList`
     * labeled alternative in `MParser.attribute_constraint`.
     * @param ctx the parse tree
     */
    enterMatchingList?: (ctx: MatchingListContext) => void;
    /**
     * Exit a parse tree produced by the `MatchingList`
     * labeled alternative in `MParser.attribute_constraint`.
     * @param ctx the parse tree
     */
    exitMatchingList?: (ctx: MatchingListContext) => void;
    /**
     * Enter a parse tree produced by the `MatchingSet`
     * labeled alternative in `MParser.attribute_constraint`.
     * @param ctx the parse tree
     */
    enterMatchingSet?: (ctx: MatchingSetContext) => void;
    /**
     * Exit a parse tree produced by the `MatchingSet`
     * labeled alternative in `MParser.attribute_constraint`.
     * @param ctx the parse tree
     */
    exitMatchingSet?: (ctx: MatchingSetContext) => void;
    /**
     * Enter a parse tree produced by the `MatchingRange`
     * labeled alternative in `MParser.attribute_constraint`.
     * @param ctx the parse tree
     */
    enterMatchingRange?: (ctx: MatchingRangeContext) => void;
    /**
     * Exit a parse tree produced by the `MatchingRange`
     * labeled alternative in `MParser.attribute_constraint`.
     * @param ctx the parse tree
     */
    exitMatchingRange?: (ctx: MatchingRangeContext) => void;
    /**
     * Enter a parse tree produced by the `MatchingPattern`
     * labeled alternative in `MParser.attribute_constraint`.
     * @param ctx the parse tree
     */
    enterMatchingPattern?: (ctx: MatchingPatternContext) => void;
    /**
     * Exit a parse tree produced by the `MatchingPattern`
     * labeled alternative in `MParser.attribute_constraint`.
     * @param ctx the parse tree
     */
    exitMatchingPattern?: (ctx: MatchingPatternContext) => void;
    /**
     * Enter a parse tree produced by the `MatchingExpression`
     * labeled alternative in `MParser.attribute_constraint`.
     * @param ctx the parse tree
     */
    enterMatchingExpression?: (ctx: MatchingExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `MatchingExpression`
     * labeled alternative in `MParser.attribute_constraint`.
     * @param ctx the parse tree
     */
    exitMatchingExpression?: (ctx: MatchingExpressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.list_literal`.
     * @param ctx the parse tree
     */
    enterList_literal?: (ctx: List_literalContext) => void;
    /**
     * Exit a parse tree produced by `MParser.list_literal`.
     * @param ctx the parse tree
     */
    exitList_literal?: (ctx: List_literalContext) => void;
    /**
     * Enter a parse tree produced by `MParser.set_literal`.
     * @param ctx the parse tree
     */
    enterSet_literal?: (ctx: Set_literalContext) => void;
    /**
     * Exit a parse tree produced by `MParser.set_literal`.
     * @param ctx the parse tree
     */
    exitSet_literal?: (ctx: Set_literalContext) => void;
    /**
     * Enter a parse tree produced by `MParser.expression_list`.
     * @param ctx the parse tree
     */
    enterExpression_list?: (ctx: Expression_listContext) => void;
    /**
     * Exit a parse tree produced by `MParser.expression_list`.
     * @param ctx the parse tree
     */
    exitExpression_list?: (ctx: Expression_listContext) => void;
    /**
     * Enter a parse tree produced by `MParser.range_literal`.
     * @param ctx the parse tree
     */
    enterRange_literal?: (ctx: Range_literalContext) => void;
    /**
     * Exit a parse tree produced by `MParser.range_literal`.
     * @param ctx the parse tree
     */
    exitRange_literal?: (ctx: Range_literalContext) => void;
    /**
     * Enter a parse tree produced by the `IteratorType`
     * labeled alternative in `MParser.typedef`.
     * @param ctx the parse tree
     */
    enterIteratorType?: (ctx: IteratorTypeContext) => void;
    /**
     * Exit a parse tree produced by the `IteratorType`
     * labeled alternative in `MParser.typedef`.
     * @param ctx the parse tree
     */
    exitIteratorType?: (ctx: IteratorTypeContext) => void;
    /**
     * Enter a parse tree produced by the `SetType`
     * labeled alternative in `MParser.typedef`.
     * @param ctx the parse tree
     */
    enterSetType?: (ctx: SetTypeContext) => void;
    /**
     * Exit a parse tree produced by the `SetType`
     * labeled alternative in `MParser.typedef`.
     * @param ctx the parse tree
     */
    exitSetType?: (ctx: SetTypeContext) => void;
    /**
     * Enter a parse tree produced by the `ListType`
     * labeled alternative in `MParser.typedef`.
     * @param ctx the parse tree
     */
    enterListType?: (ctx: ListTypeContext) => void;
    /**
     * Exit a parse tree produced by the `ListType`
     * labeled alternative in `MParser.typedef`.
     * @param ctx the parse tree
     */
    exitListType?: (ctx: ListTypeContext) => void;
    /**
     * Enter a parse tree produced by the `DictType`
     * labeled alternative in `MParser.typedef`.
     * @param ctx the parse tree
     */
    enterDictType?: (ctx: DictTypeContext) => void;
    /**
     * Exit a parse tree produced by the `DictType`
     * labeled alternative in `MParser.typedef`.
     * @param ctx the parse tree
     */
    exitDictType?: (ctx: DictTypeContext) => void;
    /**
     * Enter a parse tree produced by the `CursorType`
     * labeled alternative in `MParser.typedef`.
     * @param ctx the parse tree
     */
    enterCursorType?: (ctx: CursorTypeContext) => void;
    /**
     * Exit a parse tree produced by the `CursorType`
     * labeled alternative in `MParser.typedef`.
     * @param ctx the parse tree
     */
    exitCursorType?: (ctx: CursorTypeContext) => void;
    /**
     * Enter a parse tree produced by the `TypeType`
     * labeled alternative in `MParser.typedef`.
     * @param ctx the parse tree
     */
    enterTypeType?: (ctx: TypeTypeContext) => void;
    /**
     * Exit a parse tree produced by the `TypeType`
     * labeled alternative in `MParser.typedef`.
     * @param ctx the parse tree
     */
    exitTypeType?: (ctx: TypeTypeContext) => void;
    /**
     * Enter a parse tree produced by the `PrimaryType`
     * labeled alternative in `MParser.typedef`.
     * @param ctx the parse tree
     */
    enterPrimaryType?: (ctx: PrimaryTypeContext) => void;
    /**
     * Exit a parse tree produced by the `PrimaryType`
     * labeled alternative in `MParser.typedef`.
     * @param ctx the parse tree
     */
    exitPrimaryType?: (ctx: PrimaryTypeContext) => void;
    /**
     * Enter a parse tree produced by the `NativeType`
     * labeled alternative in `MParser.primary_type`.
     * @param ctx the parse tree
     */
    enterNativeType?: (ctx: NativeTypeContext) => void;
    /**
     * Exit a parse tree produced by the `NativeType`
     * labeled alternative in `MParser.primary_type`.
     * @param ctx the parse tree
     */
    exitNativeType?: (ctx: NativeTypeContext) => void;
    /**
     * Enter a parse tree produced by the `CategoryType`
     * labeled alternative in `MParser.primary_type`.
     * @param ctx the parse tree
     */
    enterCategoryType?: (ctx: CategoryTypeContext) => void;
    /**
     * Exit a parse tree produced by the `CategoryType`
     * labeled alternative in `MParser.primary_type`.
     * @param ctx the parse tree
     */
    exitCategoryType?: (ctx: CategoryTypeContext) => void;
    /**
     * Enter a parse tree produced by the `BooleanType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    enterBooleanType?: (ctx: BooleanTypeContext) => void;
    /**
     * Exit a parse tree produced by the `BooleanType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    exitBooleanType?: (ctx: BooleanTypeContext) => void;
    /**
     * Enter a parse tree produced by the `CssType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    enterCssType?: (ctx: CssTypeContext) => void;
    /**
     * Exit a parse tree produced by the `CssType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    exitCssType?: (ctx: CssTypeContext) => void;
    /**
     * Enter a parse tree produced by the `CharacterType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    enterCharacterType?: (ctx: CharacterTypeContext) => void;
    /**
     * Exit a parse tree produced by the `CharacterType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    exitCharacterType?: (ctx: CharacterTypeContext) => void;
    /**
     * Enter a parse tree produced by the `TextType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    enterTextType?: (ctx: TextTypeContext) => void;
    /**
     * Exit a parse tree produced by the `TextType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    exitTextType?: (ctx: TextTypeContext) => void;
    /**
     * Enter a parse tree produced by the `ImageType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    enterImageType?: (ctx: ImageTypeContext) => void;
    /**
     * Exit a parse tree produced by the `ImageType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    exitImageType?: (ctx: ImageTypeContext) => void;
    /**
     * Enter a parse tree produced by the `IntegerType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    enterIntegerType?: (ctx: IntegerTypeContext) => void;
    /**
     * Exit a parse tree produced by the `IntegerType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    exitIntegerType?: (ctx: IntegerTypeContext) => void;
    /**
     * Enter a parse tree produced by the `DecimalType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    enterDecimalType?: (ctx: DecimalTypeContext) => void;
    /**
     * Exit a parse tree produced by the `DecimalType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    exitDecimalType?: (ctx: DecimalTypeContext) => void;
    /**
     * Enter a parse tree produced by the `DocumentType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    enterDocumentType?: (ctx: DocumentTypeContext) => void;
    /**
     * Exit a parse tree produced by the `DocumentType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    exitDocumentType?: (ctx: DocumentTypeContext) => void;
    /**
     * Enter a parse tree produced by the `DateType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    enterDateType?: (ctx: DateTypeContext) => void;
    /**
     * Exit a parse tree produced by the `DateType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    exitDateType?: (ctx: DateTypeContext) => void;
    /**
     * Enter a parse tree produced by the `DateTimeType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    enterDateTimeType?: (ctx: DateTimeTypeContext) => void;
    /**
     * Exit a parse tree produced by the `DateTimeType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    exitDateTimeType?: (ctx: DateTimeTypeContext) => void;
    /**
     * Enter a parse tree produced by the `TimeType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    enterTimeType?: (ctx: TimeTypeContext) => void;
    /**
     * Exit a parse tree produced by the `TimeType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    exitTimeType?: (ctx: TimeTypeContext) => void;
    /**
     * Enter a parse tree produced by the `PeriodType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    enterPeriodType?: (ctx: PeriodTypeContext) => void;
    /**
     * Exit a parse tree produced by the `PeriodType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    exitPeriodType?: (ctx: PeriodTypeContext) => void;
    /**
     * Enter a parse tree produced by the `VersionType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    enterVersionType?: (ctx: VersionTypeContext) => void;
    /**
     * Exit a parse tree produced by the `VersionType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    exitVersionType?: (ctx: VersionTypeContext) => void;
    /**
     * Enter a parse tree produced by the `CodeType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    enterCodeType?: (ctx: CodeTypeContext) => void;
    /**
     * Exit a parse tree produced by the `CodeType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    exitCodeType?: (ctx: CodeTypeContext) => void;
    /**
     * Enter a parse tree produced by the `BlobType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    enterBlobType?: (ctx: BlobTypeContext) => void;
    /**
     * Exit a parse tree produced by the `BlobType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    exitBlobType?: (ctx: BlobTypeContext) => void;
    /**
     * Enter a parse tree produced by the `UUIDType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    enterUUIDType?: (ctx: UUIDTypeContext) => void;
    /**
     * Exit a parse tree produced by the `UUIDType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    exitUUIDType?: (ctx: UUIDTypeContext) => void;
    /**
     * Enter a parse tree produced by the `DbIdType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    enterDbIdType?: (ctx: DbIdTypeContext) => void;
    /**
     * Exit a parse tree produced by the `DbIdType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    exitDbIdType?: (ctx: DbIdTypeContext) => void;
    /**
     * Enter a parse tree produced by the `HtmlType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    enterHtmlType?: (ctx: HtmlTypeContext) => void;
    /**
     * Exit a parse tree produced by the `HtmlType`
     * labeled alternative in `MParser.native_type`.
     * @param ctx the parse tree
     */
    exitHtmlType?: (ctx: HtmlTypeContext) => void;
    /**
     * Enter a parse tree produced by `MParser.category_type`.
     * @param ctx the parse tree
     */
    enterCategory_type?: (ctx: Category_typeContext) => void;
    /**
     * Exit a parse tree produced by `MParser.category_type`.
     * @param ctx the parse tree
     */
    exitCategory_type?: (ctx: Category_typeContext) => void;
    /**
     * Enter a parse tree produced by `MParser.mutable_category_type`.
     * @param ctx the parse tree
     */
    enterMutable_category_type?: (ctx: Mutable_category_typeContext) => void;
    /**
     * Exit a parse tree produced by `MParser.mutable_category_type`.
     * @param ctx the parse tree
     */
    exitMutable_category_type?: (ctx: Mutable_category_typeContext) => void;
    /**
     * Enter a parse tree produced by `MParser.code_type`.
     * @param ctx the parse tree
     */
    enterCode_type?: (ctx: Code_typeContext) => void;
    /**
     * Exit a parse tree produced by `MParser.code_type`.
     * @param ctx the parse tree
     */
    exitCode_type?: (ctx: Code_typeContext) => void;
    /**
     * Enter a parse tree produced by the `ConcreteCategoryDeclaration`
     * labeled alternative in `MParser.category_declaration`.
     * @param ctx the parse tree
     */
    enterConcreteCategoryDeclaration?: (ctx: ConcreteCategoryDeclarationContext) => void;
    /**
     * Exit a parse tree produced by the `ConcreteCategoryDeclaration`
     * labeled alternative in `MParser.category_declaration`.
     * @param ctx the parse tree
     */
    exitConcreteCategoryDeclaration?: (ctx: ConcreteCategoryDeclarationContext) => void;
    /**
     * Enter a parse tree produced by the `NativeCategoryDeclaration`
     * labeled alternative in `MParser.category_declaration`.
     * @param ctx the parse tree
     */
    enterNativeCategoryDeclaration?: (ctx: NativeCategoryDeclarationContext) => void;
    /**
     * Exit a parse tree produced by the `NativeCategoryDeclaration`
     * labeled alternative in `MParser.category_declaration`.
     * @param ctx the parse tree
     */
    exitNativeCategoryDeclaration?: (ctx: NativeCategoryDeclarationContext) => void;
    /**
     * Enter a parse tree produced by the `SingletonCategoryDeclaration`
     * labeled alternative in `MParser.category_declaration`.
     * @param ctx the parse tree
     */
    enterSingletonCategoryDeclaration?: (ctx: SingletonCategoryDeclarationContext) => void;
    /**
     * Exit a parse tree produced by the `SingletonCategoryDeclaration`
     * labeled alternative in `MParser.category_declaration`.
     * @param ctx the parse tree
     */
    exitSingletonCategoryDeclaration?: (ctx: SingletonCategoryDeclarationContext) => void;
    /**
     * Enter a parse tree produced by the `ConcreteWidgetDeclaration`
     * labeled alternative in `MParser.widget_declaration`.
     * @param ctx the parse tree
     */
    enterConcreteWidgetDeclaration?: (ctx: ConcreteWidgetDeclarationContext) => void;
    /**
     * Exit a parse tree produced by the `ConcreteWidgetDeclaration`
     * labeled alternative in `MParser.widget_declaration`.
     * @param ctx the parse tree
     */
    exitConcreteWidgetDeclaration?: (ctx: ConcreteWidgetDeclarationContext) => void;
    /**
     * Enter a parse tree produced by the `NativeWidgetDeclaration`
     * labeled alternative in `MParser.widget_declaration`.
     * @param ctx the parse tree
     */
    enterNativeWidgetDeclaration?: (ctx: NativeWidgetDeclarationContext) => void;
    /**
     * Exit a parse tree produced by the `NativeWidgetDeclaration`
     * labeled alternative in `MParser.widget_declaration`.
     * @param ctx the parse tree
     */
    exitNativeWidgetDeclaration?: (ctx: NativeWidgetDeclarationContext) => void;
    /**
     * Enter a parse tree produced by `MParser.type_identifier_list`.
     * @param ctx the parse tree
     */
    enterType_identifier_list?: (ctx: Type_identifier_listContext) => void;
    /**
     * Exit a parse tree produced by `MParser.type_identifier_list`.
     * @param ctx the parse tree
     */
    exitType_identifier_list?: (ctx: Type_identifier_listContext) => void;
    /**
     * Enter a parse tree produced by `MParser.method_identifier`.
     * @param ctx the parse tree
     */
    enterMethod_identifier?: (ctx: Method_identifierContext) => void;
    /**
     * Exit a parse tree produced by `MParser.method_identifier`.
     * @param ctx the parse tree
     */
    exitMethod_identifier?: (ctx: Method_identifierContext) => void;
    /**
     * Enter a parse tree produced by `MParser.identifier_or_keyword`.
     * @param ctx the parse tree
     */
    enterIdentifier_or_keyword?: (ctx: Identifier_or_keywordContext) => void;
    /**
     * Exit a parse tree produced by `MParser.identifier_or_keyword`.
     * @param ctx the parse tree
     */
    exitIdentifier_or_keyword?: (ctx: Identifier_or_keywordContext) => void;
    /**
     * Enter a parse tree produced by `MParser.nospace_hyphen_identifier_or_keyword`.
     * @param ctx the parse tree
     */
    enterNospace_hyphen_identifier_or_keyword?: (ctx: Nospace_hyphen_identifier_or_keywordContext) => void;
    /**
     * Exit a parse tree produced by `MParser.nospace_hyphen_identifier_or_keyword`.
     * @param ctx the parse tree
     */
    exitNospace_hyphen_identifier_or_keyword?: (ctx: Nospace_hyphen_identifier_or_keywordContext) => void;
    /**
     * Enter a parse tree produced by `MParser.nospace_identifier_or_keyword`.
     * @param ctx the parse tree
     */
    enterNospace_identifier_or_keyword?: (ctx: Nospace_identifier_or_keywordContext) => void;
    /**
     * Exit a parse tree produced by `MParser.nospace_identifier_or_keyword`.
     * @param ctx the parse tree
     */
    exitNospace_identifier_or_keyword?: (ctx: Nospace_identifier_or_keywordContext) => void;
    /**
     * Enter a parse tree produced by the `VariableIdentifier`
     * labeled alternative in `MParser.identifier`.
     * @param ctx the parse tree
     */
    enterVariableIdentifier?: (ctx: VariableIdentifierContext) => void;
    /**
     * Exit a parse tree produced by the `VariableIdentifier`
     * labeled alternative in `MParser.identifier`.
     * @param ctx the parse tree
     */
    exitVariableIdentifier?: (ctx: VariableIdentifierContext) => void;
    /**
     * Enter a parse tree produced by the `TypeIdentifier`
     * labeled alternative in `MParser.identifier`.
     * @param ctx the parse tree
     */
    enterTypeIdentifier?: (ctx: TypeIdentifierContext) => void;
    /**
     * Exit a parse tree produced by the `TypeIdentifier`
     * labeled alternative in `MParser.identifier`.
     * @param ctx the parse tree
     */
    exitTypeIdentifier?: (ctx: TypeIdentifierContext) => void;
    /**
     * Enter a parse tree produced by the `SymbolIdentifier`
     * labeled alternative in `MParser.identifier`.
     * @param ctx the parse tree
     */
    enterSymbolIdentifier?: (ctx: SymbolIdentifierContext) => void;
    /**
     * Exit a parse tree produced by the `SymbolIdentifier`
     * labeled alternative in `MParser.identifier`.
     * @param ctx the parse tree
     */
    exitSymbolIdentifier?: (ctx: SymbolIdentifierContext) => void;
    /**
     * Enter a parse tree produced by `MParser.member_identifier`.
     * @param ctx the parse tree
     */
    enterMember_identifier?: (ctx: Member_identifierContext) => void;
    /**
     * Exit a parse tree produced by `MParser.member_identifier`.
     * @param ctx the parse tree
     */
    exitMember_identifier?: (ctx: Member_identifierContext) => void;
    /**
     * Enter a parse tree produced by `MParser.variable_identifier`.
     * @param ctx the parse tree
     */
    enterVariable_identifier?: (ctx: Variable_identifierContext) => void;
    /**
     * Exit a parse tree produced by `MParser.variable_identifier`.
     * @param ctx the parse tree
     */
    exitVariable_identifier?: (ctx: Variable_identifierContext) => void;
    /**
     * Enter a parse tree produced by `MParser.attribute_identifier`.
     * @param ctx the parse tree
     */
    enterAttribute_identifier?: (ctx: Attribute_identifierContext) => void;
    /**
     * Exit a parse tree produced by `MParser.attribute_identifier`.
     * @param ctx the parse tree
     */
    exitAttribute_identifier?: (ctx: Attribute_identifierContext) => void;
    /**
     * Enter a parse tree produced by `MParser.type_identifier`.
     * @param ctx the parse tree
     */
    enterType_identifier?: (ctx: Type_identifierContext) => void;
    /**
     * Exit a parse tree produced by `MParser.type_identifier`.
     * @param ctx the parse tree
     */
    exitType_identifier?: (ctx: Type_identifierContext) => void;
    /**
     * Enter a parse tree produced by `MParser.symbol_identifier`.
     * @param ctx the parse tree
     */
    enterSymbol_identifier?: (ctx: Symbol_identifierContext) => void;
    /**
     * Exit a parse tree produced by `MParser.symbol_identifier`.
     * @param ctx the parse tree
     */
    exitSymbol_identifier?: (ctx: Symbol_identifierContext) => void;
    /**
     * Enter a parse tree produced by `MParser.argument_list`.
     * @param ctx the parse tree
     */
    enterArgument_list?: (ctx: Argument_listContext) => void;
    /**
     * Exit a parse tree produced by `MParser.argument_list`.
     * @param ctx the parse tree
     */
    exitArgument_list?: (ctx: Argument_listContext) => void;
    /**
     * Enter a parse tree produced by the `CodeArgument`
     * labeled alternative in `MParser.argument`.
     * @param ctx the parse tree
     */
    enterCodeArgument?: (ctx: CodeArgumentContext) => void;
    /**
     * Exit a parse tree produced by the `CodeArgument`
     * labeled alternative in `MParser.argument`.
     * @param ctx the parse tree
     */
    exitCodeArgument?: (ctx: CodeArgumentContext) => void;
    /**
     * Enter a parse tree produced by the `OperatorArgument`
     * labeled alternative in `MParser.argument`.
     * @param ctx the parse tree
     */
    enterOperatorArgument?: (ctx: OperatorArgumentContext) => void;
    /**
     * Exit a parse tree produced by the `OperatorArgument`
     * labeled alternative in `MParser.argument`.
     * @param ctx the parse tree
     */
    exitOperatorArgument?: (ctx: OperatorArgumentContext) => void;
    /**
     * Enter a parse tree produced by `MParser.operator_argument`.
     * @param ctx the parse tree
     */
    enterOperator_argument?: (ctx: Operator_argumentContext) => void;
    /**
     * Exit a parse tree produced by `MParser.operator_argument`.
     * @param ctx the parse tree
     */
    exitOperator_argument?: (ctx: Operator_argumentContext) => void;
    /**
     * Enter a parse tree produced by `MParser.named_argument`.
     * @param ctx the parse tree
     */
    enterNamed_argument?: (ctx: Named_argumentContext) => void;
    /**
     * Exit a parse tree produced by `MParser.named_argument`.
     * @param ctx the parse tree
     */
    exitNamed_argument?: (ctx: Named_argumentContext) => void;
    /**
     * Enter a parse tree produced by `MParser.code_argument`.
     * @param ctx the parse tree
     */
    enterCode_argument?: (ctx: Code_argumentContext) => void;
    /**
     * Exit a parse tree produced by `MParser.code_argument`.
     * @param ctx the parse tree
     */
    exitCode_argument?: (ctx: Code_argumentContext) => void;
    /**
     * Enter a parse tree produced by `MParser.category_or_any_type`.
     * @param ctx the parse tree
     */
    enterCategory_or_any_type?: (ctx: Category_or_any_typeContext) => void;
    /**
     * Exit a parse tree produced by `MParser.category_or_any_type`.
     * @param ctx the parse tree
     */
    exitCategory_or_any_type?: (ctx: Category_or_any_typeContext) => void;
    /**
     * Enter a parse tree produced by the `AnyListType`
     * labeled alternative in `MParser.any_type`.
     * @param ctx the parse tree
     */
    enterAnyListType?: (ctx: AnyListTypeContext) => void;
    /**
     * Exit a parse tree produced by the `AnyListType`
     * labeled alternative in `MParser.any_type`.
     * @param ctx the parse tree
     */
    exitAnyListType?: (ctx: AnyListTypeContext) => void;
    /**
     * Enter a parse tree produced by the `AnyType`
     * labeled alternative in `MParser.any_type`.
     * @param ctx the parse tree
     */
    enterAnyType?: (ctx: AnyTypeContext) => void;
    /**
     * Exit a parse tree produced by the `AnyType`
     * labeled alternative in `MParser.any_type`.
     * @param ctx the parse tree
     */
    exitAnyType?: (ctx: AnyTypeContext) => void;
    /**
     * Enter a parse tree produced by the `AnyDictType`
     * labeled alternative in `MParser.any_type`.
     * @param ctx the parse tree
     */
    enterAnyDictType?: (ctx: AnyDictTypeContext) => void;
    /**
     * Exit a parse tree produced by the `AnyDictType`
     * labeled alternative in `MParser.any_type`.
     * @param ctx the parse tree
     */
    exitAnyDictType?: (ctx: AnyDictTypeContext) => void;
    /**
     * Enter a parse tree produced by `MParser.member_method_declaration_list`.
     * @param ctx the parse tree
     */
    enterMember_method_declaration_list?: (ctx: Member_method_declaration_listContext) => void;
    /**
     * Exit a parse tree produced by `MParser.member_method_declaration_list`.
     * @param ctx the parse tree
     */
    exitMember_method_declaration_list?: (ctx: Member_method_declaration_listContext) => void;
    /**
     * Enter a parse tree produced by `MParser.member_method_declaration`.
     * @param ctx the parse tree
     */
    enterMember_method_declaration?: (ctx: Member_method_declarationContext) => void;
    /**
     * Exit a parse tree produced by `MParser.member_method_declaration`.
     * @param ctx the parse tree
     */
    exitMember_method_declaration?: (ctx: Member_method_declarationContext) => void;
    /**
     * Enter a parse tree produced by `MParser.native_member_method_declaration_list`.
     * @param ctx the parse tree
     */
    enterNative_member_method_declaration_list?: (ctx: Native_member_method_declaration_listContext) => void;
    /**
     * Exit a parse tree produced by `MParser.native_member_method_declaration_list`.
     * @param ctx the parse tree
     */
    exitNative_member_method_declaration_list?: (ctx: Native_member_method_declaration_listContext) => void;
    /**
     * Enter a parse tree produced by `MParser.native_member_method_declaration`.
     * @param ctx the parse tree
     */
    enterNative_member_method_declaration?: (ctx: Native_member_method_declarationContext) => void;
    /**
     * Exit a parse tree produced by `MParser.native_member_method_declaration`.
     * @param ctx the parse tree
     */
    exitNative_member_method_declaration?: (ctx: Native_member_method_declarationContext) => void;
    /**
     * Enter a parse tree produced by the `JavaCategoryBinding`
     * labeled alternative in `MParser.native_category_binding`.
     * @param ctx the parse tree
     */
    enterJavaCategoryBinding?: (ctx: JavaCategoryBindingContext) => void;
    /**
     * Exit a parse tree produced by the `JavaCategoryBinding`
     * labeled alternative in `MParser.native_category_binding`.
     * @param ctx the parse tree
     */
    exitJavaCategoryBinding?: (ctx: JavaCategoryBindingContext) => void;
    /**
     * Enter a parse tree produced by the `CSharpCategoryBinding`
     * labeled alternative in `MParser.native_category_binding`.
     * @param ctx the parse tree
     */
    enterCSharpCategoryBinding?: (ctx: CSharpCategoryBindingContext) => void;
    /**
     * Exit a parse tree produced by the `CSharpCategoryBinding`
     * labeled alternative in `MParser.native_category_binding`.
     * @param ctx the parse tree
     */
    exitCSharpCategoryBinding?: (ctx: CSharpCategoryBindingContext) => void;
    /**
     * Enter a parse tree produced by the `Python2CategoryBinding`
     * labeled alternative in `MParser.native_category_binding`.
     * @param ctx the parse tree
     */
    enterPython2CategoryBinding?: (ctx: Python2CategoryBindingContext) => void;
    /**
     * Exit a parse tree produced by the `Python2CategoryBinding`
     * labeled alternative in `MParser.native_category_binding`.
     * @param ctx the parse tree
     */
    exitPython2CategoryBinding?: (ctx: Python2CategoryBindingContext) => void;
    /**
     * Enter a parse tree produced by the `Python3CategoryBinding`
     * labeled alternative in `MParser.native_category_binding`.
     * @param ctx the parse tree
     */
    enterPython3CategoryBinding?: (ctx: Python3CategoryBindingContext) => void;
    /**
     * Exit a parse tree produced by the `Python3CategoryBinding`
     * labeled alternative in `MParser.native_category_binding`.
     * @param ctx the parse tree
     */
    exitPython3CategoryBinding?: (ctx: Python3CategoryBindingContext) => void;
    /**
     * Enter a parse tree produced by the `JavascriptCategoryBinding`
     * labeled alternative in `MParser.native_category_binding`.
     * @param ctx the parse tree
     */
    enterJavascriptCategoryBinding?: (ctx: JavascriptCategoryBindingContext) => void;
    /**
     * Exit a parse tree produced by the `JavascriptCategoryBinding`
     * labeled alternative in `MParser.native_category_binding`.
     * @param ctx the parse tree
     */
    exitJavascriptCategoryBinding?: (ctx: JavascriptCategoryBindingContext) => void;
    /**
     * Enter a parse tree produced by `MParser.python_category_binding`.
     * @param ctx the parse tree
     */
    enterPython_category_binding?: (ctx: Python_category_bindingContext) => void;
    /**
     * Exit a parse tree produced by `MParser.python_category_binding`.
     * @param ctx the parse tree
     */
    exitPython_category_binding?: (ctx: Python_category_bindingContext) => void;
    /**
     * Enter a parse tree produced by `MParser.python_module`.
     * @param ctx the parse tree
     */
    enterPython_module?: (ctx: Python_moduleContext) => void;
    /**
     * Exit a parse tree produced by `MParser.python_module`.
     * @param ctx the parse tree
     */
    exitPython_module?: (ctx: Python_moduleContext) => void;
    /**
     * Enter a parse tree produced by `MParser.javascript_category_binding`.
     * @param ctx the parse tree
     */
    enterJavascript_category_binding?: (ctx: Javascript_category_bindingContext) => void;
    /**
     * Exit a parse tree produced by `MParser.javascript_category_binding`.
     * @param ctx the parse tree
     */
    exitJavascript_category_binding?: (ctx: Javascript_category_bindingContext) => void;
    /**
     * Enter a parse tree produced by `MParser.javascript_module`.
     * @param ctx the parse tree
     */
    enterJavascript_module?: (ctx: Javascript_moduleContext) => void;
    /**
     * Exit a parse tree produced by `MParser.javascript_module`.
     * @param ctx the parse tree
     */
    exitJavascript_module?: (ctx: Javascript_moduleContext) => void;
    /**
     * Enter a parse tree produced by `MParser.variable_identifier_list`.
     * @param ctx the parse tree
     */
    enterVariable_identifier_list?: (ctx: Variable_identifier_listContext) => void;
    /**
     * Exit a parse tree produced by `MParser.variable_identifier_list`.
     * @param ctx the parse tree
     */
    exitVariable_identifier_list?: (ctx: Variable_identifier_listContext) => void;
    /**
     * Enter a parse tree produced by `MParser.attribute_identifier_list`.
     * @param ctx the parse tree
     */
    enterAttribute_identifier_list?: (ctx: Attribute_identifier_listContext) => void;
    /**
     * Exit a parse tree produced by `MParser.attribute_identifier_list`.
     * @param ctx the parse tree
     */
    exitAttribute_identifier_list?: (ctx: Attribute_identifier_listContext) => void;
    /**
     * Enter a parse tree produced by `MParser.method_declaration`.
     * @param ctx the parse tree
     */
    enterMethod_declaration?: (ctx: Method_declarationContext) => void;
    /**
     * Exit a parse tree produced by `MParser.method_declaration`.
     * @param ctx the parse tree
     */
    exitMethod_declaration?: (ctx: Method_declarationContext) => void;
    /**
     * Enter a parse tree produced by `MParser.native_statement_list`.
     * @param ctx the parse tree
     */
    enterNative_statement_list?: (ctx: Native_statement_listContext) => void;
    /**
     * Exit a parse tree produced by `MParser.native_statement_list`.
     * @param ctx the parse tree
     */
    exitNative_statement_list?: (ctx: Native_statement_listContext) => void;
    /**
     * Enter a parse tree produced by the `JavaNativeStatement`
     * labeled alternative in `MParser.native_statement`.
     * @param ctx the parse tree
     */
    enterJavaNativeStatement?: (ctx: JavaNativeStatementContext) => void;
    /**
     * Exit a parse tree produced by the `JavaNativeStatement`
     * labeled alternative in `MParser.native_statement`.
     * @param ctx the parse tree
     */
    exitJavaNativeStatement?: (ctx: JavaNativeStatementContext) => void;
    /**
     * Enter a parse tree produced by the `CSharpNativeStatement`
     * labeled alternative in `MParser.native_statement`.
     * @param ctx the parse tree
     */
    enterCSharpNativeStatement?: (ctx: CSharpNativeStatementContext) => void;
    /**
     * Exit a parse tree produced by the `CSharpNativeStatement`
     * labeled alternative in `MParser.native_statement`.
     * @param ctx the parse tree
     */
    exitCSharpNativeStatement?: (ctx: CSharpNativeStatementContext) => void;
    /**
     * Enter a parse tree produced by the `Python2NativeStatement`
     * labeled alternative in `MParser.native_statement`.
     * @param ctx the parse tree
     */
    enterPython2NativeStatement?: (ctx: Python2NativeStatementContext) => void;
    /**
     * Exit a parse tree produced by the `Python2NativeStatement`
     * labeled alternative in `MParser.native_statement`.
     * @param ctx the parse tree
     */
    exitPython2NativeStatement?: (ctx: Python2NativeStatementContext) => void;
    /**
     * Enter a parse tree produced by the `Python3NativeStatement`
     * labeled alternative in `MParser.native_statement`.
     * @param ctx the parse tree
     */
    enterPython3NativeStatement?: (ctx: Python3NativeStatementContext) => void;
    /**
     * Exit a parse tree produced by the `Python3NativeStatement`
     * labeled alternative in `MParser.native_statement`.
     * @param ctx the parse tree
     */
    exitPython3NativeStatement?: (ctx: Python3NativeStatementContext) => void;
    /**
     * Enter a parse tree produced by the `JavascriptNativeStatement`
     * labeled alternative in `MParser.native_statement`.
     * @param ctx the parse tree
     */
    enterJavascriptNativeStatement?: (ctx: JavascriptNativeStatementContext) => void;
    /**
     * Exit a parse tree produced by the `JavascriptNativeStatement`
     * labeled alternative in `MParser.native_statement`.
     * @param ctx the parse tree
     */
    exitJavascriptNativeStatement?: (ctx: JavascriptNativeStatementContext) => void;
    /**
     * Enter a parse tree produced by `MParser.python_native_statement`.
     * @param ctx the parse tree
     */
    enterPython_native_statement?: (ctx: Python_native_statementContext) => void;
    /**
     * Exit a parse tree produced by `MParser.python_native_statement`.
     * @param ctx the parse tree
     */
    exitPython_native_statement?: (ctx: Python_native_statementContext) => void;
    /**
     * Enter a parse tree produced by `MParser.javascript_native_statement`.
     * @param ctx the parse tree
     */
    enterJavascript_native_statement?: (ctx: Javascript_native_statementContext) => void;
    /**
     * Exit a parse tree produced by `MParser.javascript_native_statement`.
     * @param ctx the parse tree
     */
    exitJavascript_native_statement?: (ctx: Javascript_native_statementContext) => void;
    /**
     * Enter a parse tree produced by `MParser.statement_list`.
     * @param ctx the parse tree
     */
    enterStatement_list?: (ctx: Statement_listContext) => void;
    /**
     * Exit a parse tree produced by `MParser.statement_list`.
     * @param ctx the parse tree
     */
    exitStatement_list?: (ctx: Statement_listContext) => void;
    /**
     * Enter a parse tree produced by `MParser.assertion_list`.
     * @param ctx the parse tree
     */
    enterAssertion_list?: (ctx: Assertion_listContext) => void;
    /**
     * Exit a parse tree produced by `MParser.assertion_list`.
     * @param ctx the parse tree
     */
    exitAssertion_list?: (ctx: Assertion_listContext) => void;
    /**
     * Enter a parse tree produced by `MParser.switch_case_statement_list`.
     * @param ctx the parse tree
     */
    enterSwitch_case_statement_list?: (ctx: Switch_case_statement_listContext) => void;
    /**
     * Exit a parse tree produced by `MParser.switch_case_statement_list`.
     * @param ctx the parse tree
     */
    exitSwitch_case_statement_list?: (ctx: Switch_case_statement_listContext) => void;
    /**
     * Enter a parse tree produced by `MParser.catch_statement_list`.
     * @param ctx the parse tree
     */
    enterCatch_statement_list?: (ctx: Catch_statement_listContext) => void;
    /**
     * Exit a parse tree produced by `MParser.catch_statement_list`.
     * @param ctx the parse tree
     */
    exitCatch_statement_list?: (ctx: Catch_statement_listContext) => void;
    /**
     * Enter a parse tree produced by the `LiteralRangeLiteral`
     * labeled alternative in `MParser.literal_collection`.
     * @param ctx the parse tree
     */
    enterLiteralRangeLiteral?: (ctx: LiteralRangeLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `LiteralRangeLiteral`
     * labeled alternative in `MParser.literal_collection`.
     * @param ctx the parse tree
     */
    exitLiteralRangeLiteral?: (ctx: LiteralRangeLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `LiteralListLiteral`
     * labeled alternative in `MParser.literal_collection`.
     * @param ctx the parse tree
     */
    enterLiteralListLiteral?: (ctx: LiteralListLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `LiteralListLiteral`
     * labeled alternative in `MParser.literal_collection`.
     * @param ctx the parse tree
     */
    exitLiteralListLiteral?: (ctx: LiteralListLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `LiteralSetLiteral`
     * labeled alternative in `MParser.literal_collection`.
     * @param ctx the parse tree
     */
    enterLiteralSetLiteral?: (ctx: LiteralSetLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `LiteralSetLiteral`
     * labeled alternative in `MParser.literal_collection`.
     * @param ctx the parse tree
     */
    exitLiteralSetLiteral?: (ctx: LiteralSetLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `MinIntegerLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    enterMinIntegerLiteral?: (ctx: MinIntegerLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `MinIntegerLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    exitMinIntegerLiteral?: (ctx: MinIntegerLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `MaxIntegerLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    enterMaxIntegerLiteral?: (ctx: MaxIntegerLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `MaxIntegerLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    exitMaxIntegerLiteral?: (ctx: MaxIntegerLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `IntegerLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    enterIntegerLiteral?: (ctx: IntegerLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `IntegerLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    exitIntegerLiteral?: (ctx: IntegerLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `HexadecimalLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    enterHexadecimalLiteral?: (ctx: HexadecimalLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `HexadecimalLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    exitHexadecimalLiteral?: (ctx: HexadecimalLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `CharacterLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    enterCharacterLiteral?: (ctx: CharacterLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `CharacterLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    exitCharacterLiteral?: (ctx: CharacterLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `DateLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    enterDateLiteral?: (ctx: DateLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `DateLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    exitDateLiteral?: (ctx: DateLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `TimeLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    enterTimeLiteral?: (ctx: TimeLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `TimeLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    exitTimeLiteral?: (ctx: TimeLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `TextLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    enterTextLiteral?: (ctx: TextLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `TextLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    exitTextLiteral?: (ctx: TextLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `DecimalLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    enterDecimalLiteral?: (ctx: DecimalLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `DecimalLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    exitDecimalLiteral?: (ctx: DecimalLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `DateTimeLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    enterDateTimeLiteral?: (ctx: DateTimeLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `DateTimeLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    exitDateTimeLiteral?: (ctx: DateTimeLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `BooleanLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    enterBooleanLiteral?: (ctx: BooleanLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `BooleanLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    exitBooleanLiteral?: (ctx: BooleanLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `PeriodLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    enterPeriodLiteral?: (ctx: PeriodLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `PeriodLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    exitPeriodLiteral?: (ctx: PeriodLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `VersionLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    enterVersionLiteral?: (ctx: VersionLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `VersionLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    exitVersionLiteral?: (ctx: VersionLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `UUIDLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    enterUUIDLiteral?: (ctx: UUIDLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `UUIDLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    exitUUIDLiteral?: (ctx: UUIDLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `SymbolLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    enterSymbolLiteral?: (ctx: SymbolLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `SymbolLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    exitSymbolLiteral?: (ctx: SymbolLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `TypeLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    enterTypeLiteral?: (ctx: TypeLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `TypeLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    exitTypeLiteral?: (ctx: TypeLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `NullLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    enterNullLiteral?: (ctx: NullLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `NullLiteral`
     * labeled alternative in `MParser.atomic_literal`.
     * @param ctx the parse tree
     */
    exitNullLiteral?: (ctx: NullLiteralContext) => void;
    /**
     * Enter a parse tree produced by `MParser.literal_list_literal`.
     * @param ctx the parse tree
     */
    enterLiteral_list_literal?: (ctx: Literal_list_literalContext) => void;
    /**
     * Exit a parse tree produced by `MParser.literal_list_literal`.
     * @param ctx the parse tree
     */
    exitLiteral_list_literal?: (ctx: Literal_list_literalContext) => void;
    /**
     * Enter a parse tree produced by `MParser.this_expression`.
     * @param ctx the parse tree
     */
    enterThis_expression?: (ctx: This_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.this_expression`.
     * @param ctx the parse tree
     */
    exitThis_expression?: (ctx: This_expressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.super_expression`.
     * @param ctx the parse tree
     */
    enterSuper_expression?: (ctx: Super_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.super_expression`.
     * @param ctx the parse tree
     */
    exitSuper_expression?: (ctx: Super_expressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.parenthesis_expression`.
     * @param ctx the parse tree
     */
    enterParenthesis_expression?: (ctx: Parenthesis_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.parenthesis_expression`.
     * @param ctx the parse tree
     */
    exitParenthesis_expression?: (ctx: Parenthesis_expressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.literal_expression`.
     * @param ctx the parse tree
     */
    enterLiteral_expression?: (ctx: Literal_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.literal_expression`.
     * @param ctx the parse tree
     */
    exitLiteral_expression?: (ctx: Literal_expressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.collection_literal`.
     * @param ctx the parse tree
     */
    enterCollection_literal?: (ctx: Collection_literalContext) => void;
    /**
     * Exit a parse tree produced by `MParser.collection_literal`.
     * @param ctx the parse tree
     */
    exitCollection_literal?: (ctx: Collection_literalContext) => void;
    /**
     * Enter a parse tree produced by `MParser.tuple_literal`.
     * @param ctx the parse tree
     */
    enterTuple_literal?: (ctx: Tuple_literalContext) => void;
    /**
     * Exit a parse tree produced by `MParser.tuple_literal`.
     * @param ctx the parse tree
     */
    exitTuple_literal?: (ctx: Tuple_literalContext) => void;
    /**
     * Enter a parse tree produced by `MParser.dict_literal`.
     * @param ctx the parse tree
     */
    enterDict_literal?: (ctx: Dict_literalContext) => void;
    /**
     * Exit a parse tree produced by `MParser.dict_literal`.
     * @param ctx the parse tree
     */
    exitDict_literal?: (ctx: Dict_literalContext) => void;
    /**
     * Enter a parse tree produced by `MParser.document_literal`.
     * @param ctx the parse tree
     */
    enterDocument_literal?: (ctx: Document_literalContext) => void;
    /**
     * Exit a parse tree produced by `MParser.document_literal`.
     * @param ctx the parse tree
     */
    exitDocument_literal?: (ctx: Document_literalContext) => void;
    /**
     * Enter a parse tree produced by `MParser.expression_tuple`.
     * @param ctx the parse tree
     */
    enterExpression_tuple?: (ctx: Expression_tupleContext) => void;
    /**
     * Exit a parse tree produced by `MParser.expression_tuple`.
     * @param ctx the parse tree
     */
    exitExpression_tuple?: (ctx: Expression_tupleContext) => void;
    /**
     * Enter a parse tree produced by `MParser.doc_entry_list`.
     * @param ctx the parse tree
     */
    enterDoc_entry_list?: (ctx: Doc_entry_listContext) => void;
    /**
     * Exit a parse tree produced by `MParser.doc_entry_list`.
     * @param ctx the parse tree
     */
    exitDoc_entry_list?: (ctx: Doc_entry_listContext) => void;
    /**
     * Enter a parse tree produced by `MParser.doc_entry`.
     * @param ctx the parse tree
     */
    enterDoc_entry?: (ctx: Doc_entryContext) => void;
    /**
     * Exit a parse tree produced by `MParser.doc_entry`.
     * @param ctx the parse tree
     */
    exitDoc_entry?: (ctx: Doc_entryContext) => void;
    /**
     * Enter a parse tree produced by the `DocKeyIdentifier`
     * labeled alternative in `MParser.doc_key`.
     * @param ctx the parse tree
     */
    enterDocKeyIdentifier?: (ctx: DocKeyIdentifierContext) => void;
    /**
     * Exit a parse tree produced by the `DocKeyIdentifier`
     * labeled alternative in `MParser.doc_key`.
     * @param ctx the parse tree
     */
    exitDocKeyIdentifier?: (ctx: DocKeyIdentifierContext) => void;
    /**
     * Enter a parse tree produced by the `DocKeyText`
     * labeled alternative in `MParser.doc_key`.
     * @param ctx the parse tree
     */
    enterDocKeyText?: (ctx: DocKeyTextContext) => void;
    /**
     * Exit a parse tree produced by the `DocKeyText`
     * labeled alternative in `MParser.doc_key`.
     * @param ctx the parse tree
     */
    exitDocKeyText?: (ctx: DocKeyTextContext) => void;
    /**
     * Enter a parse tree produced by `MParser.dict_entry_list`.
     * @param ctx the parse tree
     */
    enterDict_entry_list?: (ctx: Dict_entry_listContext) => void;
    /**
     * Exit a parse tree produced by `MParser.dict_entry_list`.
     * @param ctx the parse tree
     */
    exitDict_entry_list?: (ctx: Dict_entry_listContext) => void;
    /**
     * Enter a parse tree produced by `MParser.dict_entry`.
     * @param ctx the parse tree
     */
    enterDict_entry?: (ctx: Dict_entryContext) => void;
    /**
     * Exit a parse tree produced by `MParser.dict_entry`.
     * @param ctx the parse tree
     */
    exitDict_entry?: (ctx: Dict_entryContext) => void;
    /**
     * Enter a parse tree produced by the `DictKeyIdentifier`
     * labeled alternative in `MParser.dict_key`.
     * @param ctx the parse tree
     */
    enterDictKeyIdentifier?: (ctx: DictKeyIdentifierContext) => void;
    /**
     * Exit a parse tree produced by the `DictKeyIdentifier`
     * labeled alternative in `MParser.dict_key`.
     * @param ctx the parse tree
     */
    exitDictKeyIdentifier?: (ctx: DictKeyIdentifierContext) => void;
    /**
     * Enter a parse tree produced by the `DictKeyText`
     * labeled alternative in `MParser.dict_key`.
     * @param ctx the parse tree
     */
    enterDictKeyText?: (ctx: DictKeyTextContext) => void;
    /**
     * Exit a parse tree produced by the `DictKeyText`
     * labeled alternative in `MParser.dict_key`.
     * @param ctx the parse tree
     */
    exitDictKeyText?: (ctx: DictKeyTextContext) => void;
    /**
     * Enter a parse tree produced by the `SliceFirstAndLast`
     * labeled alternative in `MParser.slice_arguments`.
     * @param ctx the parse tree
     */
    enterSliceFirstAndLast?: (ctx: SliceFirstAndLastContext) => void;
    /**
     * Exit a parse tree produced by the `SliceFirstAndLast`
     * labeled alternative in `MParser.slice_arguments`.
     * @param ctx the parse tree
     */
    exitSliceFirstAndLast?: (ctx: SliceFirstAndLastContext) => void;
    /**
     * Enter a parse tree produced by the `SliceFirstOnly`
     * labeled alternative in `MParser.slice_arguments`.
     * @param ctx the parse tree
     */
    enterSliceFirstOnly?: (ctx: SliceFirstOnlyContext) => void;
    /**
     * Exit a parse tree produced by the `SliceFirstOnly`
     * labeled alternative in `MParser.slice_arguments`.
     * @param ctx the parse tree
     */
    exitSliceFirstOnly?: (ctx: SliceFirstOnlyContext) => void;
    /**
     * Enter a parse tree produced by the `SliceLastOnly`
     * labeled alternative in `MParser.slice_arguments`.
     * @param ctx the parse tree
     */
    enterSliceLastOnly?: (ctx: SliceLastOnlyContext) => void;
    /**
     * Exit a parse tree produced by the `SliceLastOnly`
     * labeled alternative in `MParser.slice_arguments`.
     * @param ctx the parse tree
     */
    exitSliceLastOnly?: (ctx: SliceLastOnlyContext) => void;
    /**
     * Enter a parse tree produced by `MParser.assign_variable_statement`.
     * @param ctx the parse tree
     */
    enterAssign_variable_statement?: (ctx: Assign_variable_statementContext) => void;
    /**
     * Exit a parse tree produced by `MParser.assign_variable_statement`.
     * @param ctx the parse tree
     */
    exitAssign_variable_statement?: (ctx: Assign_variable_statementContext) => void;
    /**
     * Enter a parse tree produced by the `ChildInstance`
     * labeled alternative in `MParser.assignable_instance`.
     * @param ctx the parse tree
     */
    enterChildInstance?: (ctx: ChildInstanceContext) => void;
    /**
     * Exit a parse tree produced by the `ChildInstance`
     * labeled alternative in `MParser.assignable_instance`.
     * @param ctx the parse tree
     */
    exitChildInstance?: (ctx: ChildInstanceContext) => void;
    /**
     * Enter a parse tree produced by the `RootInstance`
     * labeled alternative in `MParser.assignable_instance`.
     * @param ctx the parse tree
     */
    enterRootInstance?: (ctx: RootInstanceContext) => void;
    /**
     * Exit a parse tree produced by the `RootInstance`
     * labeled alternative in `MParser.assignable_instance`.
     * @param ctx the parse tree
     */
    exitRootInstance?: (ctx: RootInstanceContext) => void;
    /**
     * Enter a parse tree produced by the `IsATypeExpression`
     * labeled alternative in `MParser.is_expression`.
     * @param ctx the parse tree
     */
    enterIsATypeExpression?: (ctx: IsATypeExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `IsATypeExpression`
     * labeled alternative in `MParser.is_expression`.
     * @param ctx the parse tree
     */
    exitIsATypeExpression?: (ctx: IsATypeExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `IsOtherExpression`
     * labeled alternative in `MParser.is_expression`.
     * @param ctx the parse tree
     */
    enterIsOtherExpression?: (ctx: IsOtherExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `IsOtherExpression`
     * labeled alternative in `MParser.is_expression`.
     * @param ctx the parse tree
     */
    exitIsOtherExpression?: (ctx: IsOtherExpressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.metadata`.
     * @param ctx the parse tree
     */
    enterMetadata?: (ctx: MetadataContext) => void;
    /**
     * Exit a parse tree produced by `MParser.metadata`.
     * @param ctx the parse tree
     */
    exitMetadata?: (ctx: MetadataContext) => void;
    /**
     * Enter a parse tree produced by the `ArrowExpressionBody`
     * labeled alternative in `MParser.arrow_expression`.
     * @param ctx the parse tree
     */
    enterArrowExpressionBody?: (ctx: ArrowExpressionBodyContext) => void;
    /**
     * Exit a parse tree produced by the `ArrowExpressionBody`
     * labeled alternative in `MParser.arrow_expression`.
     * @param ctx the parse tree
     */
    exitArrowExpressionBody?: (ctx: ArrowExpressionBodyContext) => void;
    /**
     * Enter a parse tree produced by the `ArrowStatementsBody`
     * labeled alternative in `MParser.arrow_expression`.
     * @param ctx the parse tree
     */
    enterArrowStatementsBody?: (ctx: ArrowStatementsBodyContext) => void;
    /**
     * Exit a parse tree produced by the `ArrowStatementsBody`
     * labeled alternative in `MParser.arrow_expression`.
     * @param ctx the parse tree
     */
    exitArrowStatementsBody?: (ctx: ArrowStatementsBodyContext) => void;
    /**
     * Enter a parse tree produced by `MParser.arrow_prefix`.
     * @param ctx the parse tree
     */
    enterArrow_prefix?: (ctx: Arrow_prefixContext) => void;
    /**
     * Exit a parse tree produced by `MParser.arrow_prefix`.
     * @param ctx the parse tree
     */
    exitArrow_prefix?: (ctx: Arrow_prefixContext) => void;
    /**
     * Enter a parse tree produced by the `ArrowSingleArg`
     * labeled alternative in `MParser.arrow_args`.
     * @param ctx the parse tree
     */
    enterArrowSingleArg?: (ctx: ArrowSingleArgContext) => void;
    /**
     * Exit a parse tree produced by the `ArrowSingleArg`
     * labeled alternative in `MParser.arrow_args`.
     * @param ctx the parse tree
     */
    exitArrowSingleArg?: (ctx: ArrowSingleArgContext) => void;
    /**
     * Enter a parse tree produced by the `ArrowListArg`
     * labeled alternative in `MParser.arrow_args`.
     * @param ctx the parse tree
     */
    enterArrowListArg?: (ctx: ArrowListArgContext) => void;
    /**
     * Exit a parse tree produced by the `ArrowListArg`
     * labeled alternative in `MParser.arrow_args`.
     * @param ctx the parse tree
     */
    exitArrowListArg?: (ctx: ArrowListArgContext) => void;
    /**
     * Enter a parse tree produced by `MParser.sorted_key`.
     * @param ctx the parse tree
     */
    enterSorted_key?: (ctx: Sorted_keyContext) => void;
    /**
     * Exit a parse tree produced by `MParser.sorted_key`.
     * @param ctx the parse tree
     */
    exitSorted_key?: (ctx: Sorted_keyContext) => void;
    /**
     * Enter a parse tree produced by `MParser.read_blob_expression`.
     * @param ctx the parse tree
     */
    enterRead_blob_expression?: (ctx: Read_blob_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.read_blob_expression`.
     * @param ctx the parse tree
     */
    exitRead_blob_expression?: (ctx: Read_blob_expressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.read_all_expression`.
     * @param ctx the parse tree
     */
    enterRead_all_expression?: (ctx: Read_all_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.read_all_expression`.
     * @param ctx the parse tree
     */
    exitRead_all_expression?: (ctx: Read_all_expressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.read_one_expression`.
     * @param ctx the parse tree
     */
    enterRead_one_expression?: (ctx: Read_one_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.read_one_expression`.
     * @param ctx the parse tree
     */
    exitRead_one_expression?: (ctx: Read_one_expressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.order_by_list`.
     * @param ctx the parse tree
     */
    enterOrder_by_list?: (ctx: Order_by_listContext) => void;
    /**
     * Exit a parse tree produced by `MParser.order_by_list`.
     * @param ctx the parse tree
     */
    exitOrder_by_list?: (ctx: Order_by_listContext) => void;
    /**
     * Enter a parse tree produced by `MParser.order_by`.
     * @param ctx the parse tree
     */
    enterOrder_by?: (ctx: Order_byContext) => void;
    /**
     * Exit a parse tree produced by `MParser.order_by`.
     * @param ctx the parse tree
     */
    exitOrder_by?: (ctx: Order_byContext) => void;
    /**
     * Enter a parse tree produced by `MParser.include_list`.
     * @param ctx the parse tree
     */
    enterInclude_list?: (ctx: Include_listContext) => void;
    /**
     * Exit a parse tree produced by `MParser.include_list`.
     * @param ctx the parse tree
     */
    exitInclude_list?: (ctx: Include_listContext) => void;
    /**
     * Enter a parse tree produced by the `OperatorPlus`
     * labeled alternative in `MParser.operator`.
     * @param ctx the parse tree
     */
    enterOperatorPlus?: (ctx: OperatorPlusContext) => void;
    /**
     * Exit a parse tree produced by the `OperatorPlus`
     * labeled alternative in `MParser.operator`.
     * @param ctx the parse tree
     */
    exitOperatorPlus?: (ctx: OperatorPlusContext) => void;
    /**
     * Enter a parse tree produced by the `OperatorMinus`
     * labeled alternative in `MParser.operator`.
     * @param ctx the parse tree
     */
    enterOperatorMinus?: (ctx: OperatorMinusContext) => void;
    /**
     * Exit a parse tree produced by the `OperatorMinus`
     * labeled alternative in `MParser.operator`.
     * @param ctx the parse tree
     */
    exitOperatorMinus?: (ctx: OperatorMinusContext) => void;
    /**
     * Enter a parse tree produced by the `OperatorMultiply`
     * labeled alternative in `MParser.operator`.
     * @param ctx the parse tree
     */
    enterOperatorMultiply?: (ctx: OperatorMultiplyContext) => void;
    /**
     * Exit a parse tree produced by the `OperatorMultiply`
     * labeled alternative in `MParser.operator`.
     * @param ctx the parse tree
     */
    exitOperatorMultiply?: (ctx: OperatorMultiplyContext) => void;
    /**
     * Enter a parse tree produced by the `OperatorDivide`
     * labeled alternative in `MParser.operator`.
     * @param ctx the parse tree
     */
    enterOperatorDivide?: (ctx: OperatorDivideContext) => void;
    /**
     * Exit a parse tree produced by the `OperatorDivide`
     * labeled alternative in `MParser.operator`.
     * @param ctx the parse tree
     */
    exitOperatorDivide?: (ctx: OperatorDivideContext) => void;
    /**
     * Enter a parse tree produced by the `OperatorIDivide`
     * labeled alternative in `MParser.operator`.
     * @param ctx the parse tree
     */
    enterOperatorIDivide?: (ctx: OperatorIDivideContext) => void;
    /**
     * Exit a parse tree produced by the `OperatorIDivide`
     * labeled alternative in `MParser.operator`.
     * @param ctx the parse tree
     */
    exitOperatorIDivide?: (ctx: OperatorIDivideContext) => void;
    /**
     * Enter a parse tree produced by the `OperatorModulo`
     * labeled alternative in `MParser.operator`.
     * @param ctx the parse tree
     */
    enterOperatorModulo?: (ctx: OperatorModuloContext) => void;
    /**
     * Exit a parse tree produced by the `OperatorModulo`
     * labeled alternative in `MParser.operator`.
     * @param ctx the parse tree
     */
    exitOperatorModulo?: (ctx: OperatorModuloContext) => void;
    /**
     * Enter a parse tree produced by `MParser.keyword`.
     * @param ctx the parse tree
     */
    enterKeyword?: (ctx: KeywordContext) => void;
    /**
     * Exit a parse tree produced by `MParser.keyword`.
     * @param ctx the parse tree
     */
    exitKeyword?: (ctx: KeywordContext) => void;
    /**
     * Enter a parse tree produced by `MParser.new_token`.
     * @param ctx the parse tree
     */
    enterNew_token?: (ctx: New_tokenContext) => void;
    /**
     * Exit a parse tree produced by `MParser.new_token`.
     * @param ctx the parse tree
     */
    exitNew_token?: (ctx: New_tokenContext) => void;
    /**
     * Enter a parse tree produced by `MParser.key_token`.
     * @param ctx the parse tree
     */
    enterKey_token?: (ctx: Key_tokenContext) => void;
    /**
     * Exit a parse tree produced by `MParser.key_token`.
     * @param ctx the parse tree
     */
    exitKey_token?: (ctx: Key_tokenContext) => void;
    /**
     * Enter a parse tree produced by `MParser.module_token`.
     * @param ctx the parse tree
     */
    enterModule_token?: (ctx: Module_tokenContext) => void;
    /**
     * Exit a parse tree produced by `MParser.module_token`.
     * @param ctx the parse tree
     */
    exitModule_token?: (ctx: Module_tokenContext) => void;
    /**
     * Enter a parse tree produced by `MParser.value_token`.
     * @param ctx the parse tree
     */
    enterValue_token?: (ctx: Value_tokenContext) => void;
    /**
     * Exit a parse tree produced by `MParser.value_token`.
     * @param ctx the parse tree
     */
    exitValue_token?: (ctx: Value_tokenContext) => void;
    /**
     * Enter a parse tree produced by `MParser.symbols_token`.
     * @param ctx the parse tree
     */
    enterSymbols_token?: (ctx: Symbols_tokenContext) => void;
    /**
     * Exit a parse tree produced by `MParser.symbols_token`.
     * @param ctx the parse tree
     */
    exitSymbols_token?: (ctx: Symbols_tokenContext) => void;
    /**
     * Enter a parse tree produced by `MParser.assign`.
     * @param ctx the parse tree
     */
    enterAssign?: (ctx: AssignContext) => void;
    /**
     * Exit a parse tree produced by `MParser.assign`.
     * @param ctx the parse tree
     */
    exitAssign?: (ctx: AssignContext) => void;
    /**
     * Enter a parse tree produced by `MParser.multiply`.
     * @param ctx the parse tree
     */
    enterMultiply?: (ctx: MultiplyContext) => void;
    /**
     * Exit a parse tree produced by `MParser.multiply`.
     * @param ctx the parse tree
     */
    exitMultiply?: (ctx: MultiplyContext) => void;
    /**
     * Enter a parse tree produced by `MParser.divide`.
     * @param ctx the parse tree
     */
    enterDivide?: (ctx: DivideContext) => void;
    /**
     * Exit a parse tree produced by `MParser.divide`.
     * @param ctx the parse tree
     */
    exitDivide?: (ctx: DivideContext) => void;
    /**
     * Enter a parse tree produced by `MParser.idivide`.
     * @param ctx the parse tree
     */
    enterIdivide?: (ctx: IdivideContext) => void;
    /**
     * Exit a parse tree produced by `MParser.idivide`.
     * @param ctx the parse tree
     */
    exitIdivide?: (ctx: IdivideContext) => void;
    /**
     * Enter a parse tree produced by `MParser.modulo`.
     * @param ctx the parse tree
     */
    enterModulo?: (ctx: ModuloContext) => void;
    /**
     * Exit a parse tree produced by `MParser.modulo`.
     * @param ctx the parse tree
     */
    exitModulo?: (ctx: ModuloContext) => void;
    /**
     * Enter a parse tree produced by the `JavascriptReturnStatement`
     * labeled alternative in `MParser.javascript_statement`.
     * @param ctx the parse tree
     */
    enterJavascriptReturnStatement?: (ctx: JavascriptReturnStatementContext) => void;
    /**
     * Exit a parse tree produced by the `JavascriptReturnStatement`
     * labeled alternative in `MParser.javascript_statement`.
     * @param ctx the parse tree
     */
    exitJavascriptReturnStatement?: (ctx: JavascriptReturnStatementContext) => void;
    /**
     * Enter a parse tree produced by the `JavascriptStatement`
     * labeled alternative in `MParser.javascript_statement`.
     * @param ctx the parse tree
     */
    enterJavascriptStatement?: (ctx: JavascriptStatementContext) => void;
    /**
     * Exit a parse tree produced by the `JavascriptStatement`
     * labeled alternative in `MParser.javascript_statement`.
     * @param ctx the parse tree
     */
    exitJavascriptStatement?: (ctx: JavascriptStatementContext) => void;
    /**
     * Enter a parse tree produced by the `JavascriptSelectorExpression`
     * labeled alternative in `MParser.javascript_expression`.
     * @param ctx the parse tree
     */
    enterJavascriptSelectorExpression?: (ctx: JavascriptSelectorExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `JavascriptSelectorExpression`
     * labeled alternative in `MParser.javascript_expression`.
     * @param ctx the parse tree
     */
    exitJavascriptSelectorExpression?: (ctx: JavascriptSelectorExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `JavascriptPrimaryExpression`
     * labeled alternative in `MParser.javascript_expression`.
     * @param ctx the parse tree
     */
    enterJavascriptPrimaryExpression?: (ctx: JavascriptPrimaryExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `JavascriptPrimaryExpression`
     * labeled alternative in `MParser.javascript_expression`.
     * @param ctx the parse tree
     */
    exitJavascriptPrimaryExpression?: (ctx: JavascriptPrimaryExpressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.javascript_primary_expression`.
     * @param ctx the parse tree
     */
    enterJavascript_primary_expression?: (ctx: Javascript_primary_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.javascript_primary_expression`.
     * @param ctx the parse tree
     */
    exitJavascript_primary_expression?: (ctx: Javascript_primary_expressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.javascript_this_expression`.
     * @param ctx the parse tree
     */
    enterJavascript_this_expression?: (ctx: Javascript_this_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.javascript_this_expression`.
     * @param ctx the parse tree
     */
    exitJavascript_this_expression?: (ctx: Javascript_this_expressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.javascript_new_expression`.
     * @param ctx the parse tree
     */
    enterJavascript_new_expression?: (ctx: Javascript_new_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.javascript_new_expression`.
     * @param ctx the parse tree
     */
    exitJavascript_new_expression?: (ctx: Javascript_new_expressionContext) => void;
    /**
     * Enter a parse tree produced by the `JavascriptMethodExpression`
     * labeled alternative in `MParser.javascript_selector_expression`.
     * @param ctx the parse tree
     */
    enterJavascriptMethodExpression?: (ctx: JavascriptMethodExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `JavascriptMethodExpression`
     * labeled alternative in `MParser.javascript_selector_expression`.
     * @param ctx the parse tree
     */
    exitJavascriptMethodExpression?: (ctx: JavascriptMethodExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `JavascriptMemberExpression`
     * labeled alternative in `MParser.javascript_selector_expression`.
     * @param ctx the parse tree
     */
    enterJavascriptMemberExpression?: (ctx: JavascriptMemberExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `JavascriptMemberExpression`
     * labeled alternative in `MParser.javascript_selector_expression`.
     * @param ctx the parse tree
     */
    exitJavascriptMemberExpression?: (ctx: JavascriptMemberExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `JavascriptItemExpression`
     * labeled alternative in `MParser.javascript_selector_expression`.
     * @param ctx the parse tree
     */
    enterJavascriptItemExpression?: (ctx: JavascriptItemExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `JavascriptItemExpression`
     * labeled alternative in `MParser.javascript_selector_expression`.
     * @param ctx the parse tree
     */
    exitJavascriptItemExpression?: (ctx: JavascriptItemExpressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.javascript_method_expression`.
     * @param ctx the parse tree
     */
    enterJavascript_method_expression?: (ctx: Javascript_method_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.javascript_method_expression`.
     * @param ctx the parse tree
     */
    exitJavascript_method_expression?: (ctx: Javascript_method_expressionContext) => void;
    /**
     * Enter a parse tree produced by the `JavascriptArgumentList`
     * labeled alternative in `MParser.javascript_arguments`.
     * @param ctx the parse tree
     */
    enterJavascriptArgumentList?: (ctx: JavascriptArgumentListContext) => void;
    /**
     * Exit a parse tree produced by the `JavascriptArgumentList`
     * labeled alternative in `MParser.javascript_arguments`.
     * @param ctx the parse tree
     */
    exitJavascriptArgumentList?: (ctx: JavascriptArgumentListContext) => void;
    /**
     * Enter a parse tree produced by the `JavascriptArgumentListItem`
     * labeled alternative in `MParser.javascript_arguments`.
     * @param ctx the parse tree
     */
    enterJavascriptArgumentListItem?: (ctx: JavascriptArgumentListItemContext) => void;
    /**
     * Exit a parse tree produced by the `JavascriptArgumentListItem`
     * labeled alternative in `MParser.javascript_arguments`.
     * @param ctx the parse tree
     */
    exitJavascriptArgumentListItem?: (ctx: JavascriptArgumentListItemContext) => void;
    /**
     * Enter a parse tree produced by `MParser.javascript_item_expression`.
     * @param ctx the parse tree
     */
    enterJavascript_item_expression?: (ctx: Javascript_item_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.javascript_item_expression`.
     * @param ctx the parse tree
     */
    exitJavascript_item_expression?: (ctx: Javascript_item_expressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.javascript_parenthesis_expression`.
     * @param ctx the parse tree
     */
    enterJavascript_parenthesis_expression?: (ctx: Javascript_parenthesis_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.javascript_parenthesis_expression`.
     * @param ctx the parse tree
     */
    exitJavascript_parenthesis_expression?: (ctx: Javascript_parenthesis_expressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.javascript_identifier_expression`.
     * @param ctx the parse tree
     */
    enterJavascript_identifier_expression?: (ctx: Javascript_identifier_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.javascript_identifier_expression`.
     * @param ctx the parse tree
     */
    exitJavascript_identifier_expression?: (ctx: Javascript_identifier_expressionContext) => void;
    /**
     * Enter a parse tree produced by the `JavascriptIntegerLiteral`
     * labeled alternative in `MParser.javascript_literal_expression`.
     * @param ctx the parse tree
     */
    enterJavascriptIntegerLiteral?: (ctx: JavascriptIntegerLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `JavascriptIntegerLiteral`
     * labeled alternative in `MParser.javascript_literal_expression`.
     * @param ctx the parse tree
     */
    exitJavascriptIntegerLiteral?: (ctx: JavascriptIntegerLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `JavascriptDecimalLiteral`
     * labeled alternative in `MParser.javascript_literal_expression`.
     * @param ctx the parse tree
     */
    enterJavascriptDecimalLiteral?: (ctx: JavascriptDecimalLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `JavascriptDecimalLiteral`
     * labeled alternative in `MParser.javascript_literal_expression`.
     * @param ctx the parse tree
     */
    exitJavascriptDecimalLiteral?: (ctx: JavascriptDecimalLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `JavascriptTextLiteral`
     * labeled alternative in `MParser.javascript_literal_expression`.
     * @param ctx the parse tree
     */
    enterJavascriptTextLiteral?: (ctx: JavascriptTextLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `JavascriptTextLiteral`
     * labeled alternative in `MParser.javascript_literal_expression`.
     * @param ctx the parse tree
     */
    exitJavascriptTextLiteral?: (ctx: JavascriptTextLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `JavascriptBooleanLiteral`
     * labeled alternative in `MParser.javascript_literal_expression`.
     * @param ctx the parse tree
     */
    enterJavascriptBooleanLiteral?: (ctx: JavascriptBooleanLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `JavascriptBooleanLiteral`
     * labeled alternative in `MParser.javascript_literal_expression`.
     * @param ctx the parse tree
     */
    exitJavascriptBooleanLiteral?: (ctx: JavascriptBooleanLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `JavascriptCharacterLiteral`
     * labeled alternative in `MParser.javascript_literal_expression`.
     * @param ctx the parse tree
     */
    enterJavascriptCharacterLiteral?: (ctx: JavascriptCharacterLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `JavascriptCharacterLiteral`
     * labeled alternative in `MParser.javascript_literal_expression`.
     * @param ctx the parse tree
     */
    exitJavascriptCharacterLiteral?: (ctx: JavascriptCharacterLiteralContext) => void;
    /**
     * Enter a parse tree produced by `MParser.javascript_identifier`.
     * @param ctx the parse tree
     */
    enterJavascript_identifier?: (ctx: Javascript_identifierContext) => void;
    /**
     * Exit a parse tree produced by `MParser.javascript_identifier`.
     * @param ctx the parse tree
     */
    exitJavascript_identifier?: (ctx: Javascript_identifierContext) => void;
    /**
     * Enter a parse tree produced by the `PythonReturnStatement`
     * labeled alternative in `MParser.python_statement`.
     * @param ctx the parse tree
     */
    enterPythonReturnStatement?: (ctx: PythonReturnStatementContext) => void;
    /**
     * Exit a parse tree produced by the `PythonReturnStatement`
     * labeled alternative in `MParser.python_statement`.
     * @param ctx the parse tree
     */
    exitPythonReturnStatement?: (ctx: PythonReturnStatementContext) => void;
    /**
     * Enter a parse tree produced by the `PythonStatement`
     * labeled alternative in `MParser.python_statement`.
     * @param ctx the parse tree
     */
    enterPythonStatement?: (ctx: PythonStatementContext) => void;
    /**
     * Exit a parse tree produced by the `PythonStatement`
     * labeled alternative in `MParser.python_statement`.
     * @param ctx the parse tree
     */
    exitPythonStatement?: (ctx: PythonStatementContext) => void;
    /**
     * Enter a parse tree produced by the `PythonSelectorExpression`
     * labeled alternative in `MParser.python_expression`.
     * @param ctx the parse tree
     */
    enterPythonSelectorExpression?: (ctx: PythonSelectorExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `PythonSelectorExpression`
     * labeled alternative in `MParser.python_expression`.
     * @param ctx the parse tree
     */
    exitPythonSelectorExpression?: (ctx: PythonSelectorExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `PythonPrimaryExpression`
     * labeled alternative in `MParser.python_expression`.
     * @param ctx the parse tree
     */
    enterPythonPrimaryExpression?: (ctx: PythonPrimaryExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `PythonPrimaryExpression`
     * labeled alternative in `MParser.python_expression`.
     * @param ctx the parse tree
     */
    exitPythonPrimaryExpression?: (ctx: PythonPrimaryExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `PythonSelfExpression`
     * labeled alternative in `MParser.python_primary_expression`.
     * @param ctx the parse tree
     */
    enterPythonSelfExpression?: (ctx: PythonSelfExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `PythonSelfExpression`
     * labeled alternative in `MParser.python_primary_expression`.
     * @param ctx the parse tree
     */
    exitPythonSelfExpression?: (ctx: PythonSelfExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `PythonParenthesisExpression`
     * labeled alternative in `MParser.python_primary_expression`.
     * @param ctx the parse tree
     */
    enterPythonParenthesisExpression?: (ctx: PythonParenthesisExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `PythonParenthesisExpression`
     * labeled alternative in `MParser.python_primary_expression`.
     * @param ctx the parse tree
     */
    exitPythonParenthesisExpression?: (ctx: PythonParenthesisExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `PythonIdentifierExpression`
     * labeled alternative in `MParser.python_primary_expression`.
     * @param ctx the parse tree
     */
    enterPythonIdentifierExpression?: (ctx: PythonIdentifierExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `PythonIdentifierExpression`
     * labeled alternative in `MParser.python_primary_expression`.
     * @param ctx the parse tree
     */
    exitPythonIdentifierExpression?: (ctx: PythonIdentifierExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `PythonLiteralExpression`
     * labeled alternative in `MParser.python_primary_expression`.
     * @param ctx the parse tree
     */
    enterPythonLiteralExpression?: (ctx: PythonLiteralExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `PythonLiteralExpression`
     * labeled alternative in `MParser.python_primary_expression`.
     * @param ctx the parse tree
     */
    exitPythonLiteralExpression?: (ctx: PythonLiteralExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `PythonGlobalMethodExpression`
     * labeled alternative in `MParser.python_primary_expression`.
     * @param ctx the parse tree
     */
    enterPythonGlobalMethodExpression?: (ctx: PythonGlobalMethodExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `PythonGlobalMethodExpression`
     * labeled alternative in `MParser.python_primary_expression`.
     * @param ctx the parse tree
     */
    exitPythonGlobalMethodExpression?: (ctx: PythonGlobalMethodExpressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.python_self_expression`.
     * @param ctx the parse tree
     */
    enterPython_self_expression?: (ctx: Python_self_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.python_self_expression`.
     * @param ctx the parse tree
     */
    exitPython_self_expression?: (ctx: Python_self_expressionContext) => void;
    /**
     * Enter a parse tree produced by the `PythonMethodExpression`
     * labeled alternative in `MParser.python_selector_expression`.
     * @param ctx the parse tree
     */
    enterPythonMethodExpression?: (ctx: PythonMethodExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `PythonMethodExpression`
     * labeled alternative in `MParser.python_selector_expression`.
     * @param ctx the parse tree
     */
    exitPythonMethodExpression?: (ctx: PythonMethodExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `PythonItemExpression`
     * labeled alternative in `MParser.python_selector_expression`.
     * @param ctx the parse tree
     */
    enterPythonItemExpression?: (ctx: PythonItemExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `PythonItemExpression`
     * labeled alternative in `MParser.python_selector_expression`.
     * @param ctx the parse tree
     */
    exitPythonItemExpression?: (ctx: PythonItemExpressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.python_method_expression`.
     * @param ctx the parse tree
     */
    enterPython_method_expression?: (ctx: Python_method_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.python_method_expression`.
     * @param ctx the parse tree
     */
    exitPython_method_expression?: (ctx: Python_method_expressionContext) => void;
    /**
     * Enter a parse tree produced by the `PythonOrdinalOnlyArgumentList`
     * labeled alternative in `MParser.python_argument_list`.
     * @param ctx the parse tree
     */
    enterPythonOrdinalOnlyArgumentList?: (ctx: PythonOrdinalOnlyArgumentListContext) => void;
    /**
     * Exit a parse tree produced by the `PythonOrdinalOnlyArgumentList`
     * labeled alternative in `MParser.python_argument_list`.
     * @param ctx the parse tree
     */
    exitPythonOrdinalOnlyArgumentList?: (ctx: PythonOrdinalOnlyArgumentListContext) => void;
    /**
     * Enter a parse tree produced by the `PythonNamedOnlyArgumentList`
     * labeled alternative in `MParser.python_argument_list`.
     * @param ctx the parse tree
     */
    enterPythonNamedOnlyArgumentList?: (ctx: PythonNamedOnlyArgumentListContext) => void;
    /**
     * Exit a parse tree produced by the `PythonNamedOnlyArgumentList`
     * labeled alternative in `MParser.python_argument_list`.
     * @param ctx the parse tree
     */
    exitPythonNamedOnlyArgumentList?: (ctx: PythonNamedOnlyArgumentListContext) => void;
    /**
     * Enter a parse tree produced by the `PythonArgumentList`
     * labeled alternative in `MParser.python_argument_list`.
     * @param ctx the parse tree
     */
    enterPythonArgumentList?: (ctx: PythonArgumentListContext) => void;
    /**
     * Exit a parse tree produced by the `PythonArgumentList`
     * labeled alternative in `MParser.python_argument_list`.
     * @param ctx the parse tree
     */
    exitPythonArgumentList?: (ctx: PythonArgumentListContext) => void;
    /**
     * Enter a parse tree produced by the `PythonOrdinalArgumentList`
     * labeled alternative in `MParser.python_ordinal_argument_list`.
     * @param ctx the parse tree
     */
    enterPythonOrdinalArgumentList?: (ctx: PythonOrdinalArgumentListContext) => void;
    /**
     * Exit a parse tree produced by the `PythonOrdinalArgumentList`
     * labeled alternative in `MParser.python_ordinal_argument_list`.
     * @param ctx the parse tree
     */
    exitPythonOrdinalArgumentList?: (ctx: PythonOrdinalArgumentListContext) => void;
    /**
     * Enter a parse tree produced by the `PythonOrdinalArgumentListItem`
     * labeled alternative in `MParser.python_ordinal_argument_list`.
     * @param ctx the parse tree
     */
    enterPythonOrdinalArgumentListItem?: (ctx: PythonOrdinalArgumentListItemContext) => void;
    /**
     * Exit a parse tree produced by the `PythonOrdinalArgumentListItem`
     * labeled alternative in `MParser.python_ordinal_argument_list`.
     * @param ctx the parse tree
     */
    exitPythonOrdinalArgumentListItem?: (ctx: PythonOrdinalArgumentListItemContext) => void;
    /**
     * Enter a parse tree produced by the `PythonNamedArgumentList`
     * labeled alternative in `MParser.python_named_argument_list`.
     * @param ctx the parse tree
     */
    enterPythonNamedArgumentList?: (ctx: PythonNamedArgumentListContext) => void;
    /**
     * Exit a parse tree produced by the `PythonNamedArgumentList`
     * labeled alternative in `MParser.python_named_argument_list`.
     * @param ctx the parse tree
     */
    exitPythonNamedArgumentList?: (ctx: PythonNamedArgumentListContext) => void;
    /**
     * Enter a parse tree produced by the `PythonNamedArgumentListItem`
     * labeled alternative in `MParser.python_named_argument_list`.
     * @param ctx the parse tree
     */
    enterPythonNamedArgumentListItem?: (ctx: PythonNamedArgumentListItemContext) => void;
    /**
     * Exit a parse tree produced by the `PythonNamedArgumentListItem`
     * labeled alternative in `MParser.python_named_argument_list`.
     * @param ctx the parse tree
     */
    exitPythonNamedArgumentListItem?: (ctx: PythonNamedArgumentListItemContext) => void;
    /**
     * Enter a parse tree produced by `MParser.python_parenthesis_expression`.
     * @param ctx the parse tree
     */
    enterPython_parenthesis_expression?: (ctx: Python_parenthesis_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.python_parenthesis_expression`.
     * @param ctx the parse tree
     */
    exitPython_parenthesis_expression?: (ctx: Python_parenthesis_expressionContext) => void;
    /**
     * Enter a parse tree produced by the `PythonChildIdentifier`
     * labeled alternative in `MParser.python_identifier_expression`.
     * @param ctx the parse tree
     */
    enterPythonChildIdentifier?: (ctx: PythonChildIdentifierContext) => void;
    /**
     * Exit a parse tree produced by the `PythonChildIdentifier`
     * labeled alternative in `MParser.python_identifier_expression`.
     * @param ctx the parse tree
     */
    exitPythonChildIdentifier?: (ctx: PythonChildIdentifierContext) => void;
    /**
     * Enter a parse tree produced by the `PythonPromptoIdentifier`
     * labeled alternative in `MParser.python_identifier_expression`.
     * @param ctx the parse tree
     */
    enterPythonPromptoIdentifier?: (ctx: PythonPromptoIdentifierContext) => void;
    /**
     * Exit a parse tree produced by the `PythonPromptoIdentifier`
     * labeled alternative in `MParser.python_identifier_expression`.
     * @param ctx the parse tree
     */
    exitPythonPromptoIdentifier?: (ctx: PythonPromptoIdentifierContext) => void;
    /**
     * Enter a parse tree produced by the `PythonIdentifier`
     * labeled alternative in `MParser.python_identifier_expression`.
     * @param ctx the parse tree
     */
    enterPythonIdentifier?: (ctx: PythonIdentifierContext) => void;
    /**
     * Exit a parse tree produced by the `PythonIdentifier`
     * labeled alternative in `MParser.python_identifier_expression`.
     * @param ctx the parse tree
     */
    exitPythonIdentifier?: (ctx: PythonIdentifierContext) => void;
    /**
     * Enter a parse tree produced by the `PythonIntegerLiteral`
     * labeled alternative in `MParser.python_literal_expression`.
     * @param ctx the parse tree
     */
    enterPythonIntegerLiteral?: (ctx: PythonIntegerLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `PythonIntegerLiteral`
     * labeled alternative in `MParser.python_literal_expression`.
     * @param ctx the parse tree
     */
    exitPythonIntegerLiteral?: (ctx: PythonIntegerLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `PythonDecimalLiteral`
     * labeled alternative in `MParser.python_literal_expression`.
     * @param ctx the parse tree
     */
    enterPythonDecimalLiteral?: (ctx: PythonDecimalLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `PythonDecimalLiteral`
     * labeled alternative in `MParser.python_literal_expression`.
     * @param ctx the parse tree
     */
    exitPythonDecimalLiteral?: (ctx: PythonDecimalLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `PythonTextLiteral`
     * labeled alternative in `MParser.python_literal_expression`.
     * @param ctx the parse tree
     */
    enterPythonTextLiteral?: (ctx: PythonTextLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `PythonTextLiteral`
     * labeled alternative in `MParser.python_literal_expression`.
     * @param ctx the parse tree
     */
    exitPythonTextLiteral?: (ctx: PythonTextLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `PythonBooleanLiteral`
     * labeled alternative in `MParser.python_literal_expression`.
     * @param ctx the parse tree
     */
    enterPythonBooleanLiteral?: (ctx: PythonBooleanLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `PythonBooleanLiteral`
     * labeled alternative in `MParser.python_literal_expression`.
     * @param ctx the parse tree
     */
    exitPythonBooleanLiteral?: (ctx: PythonBooleanLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `PythonCharacterLiteral`
     * labeled alternative in `MParser.python_literal_expression`.
     * @param ctx the parse tree
     */
    enterPythonCharacterLiteral?: (ctx: PythonCharacterLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `PythonCharacterLiteral`
     * labeled alternative in `MParser.python_literal_expression`.
     * @param ctx the parse tree
     */
    exitPythonCharacterLiteral?: (ctx: PythonCharacterLiteralContext) => void;
    /**
     * Enter a parse tree produced by `MParser.python_identifier`.
     * @param ctx the parse tree
     */
    enterPython_identifier?: (ctx: Python_identifierContext) => void;
    /**
     * Exit a parse tree produced by `MParser.python_identifier`.
     * @param ctx the parse tree
     */
    exitPython_identifier?: (ctx: Python_identifierContext) => void;
    /**
     * Enter a parse tree produced by the `JavaReturnStatement`
     * labeled alternative in `MParser.java_statement`.
     * @param ctx the parse tree
     */
    enterJavaReturnStatement?: (ctx: JavaReturnStatementContext) => void;
    /**
     * Exit a parse tree produced by the `JavaReturnStatement`
     * labeled alternative in `MParser.java_statement`.
     * @param ctx the parse tree
     */
    exitJavaReturnStatement?: (ctx: JavaReturnStatementContext) => void;
    /**
     * Enter a parse tree produced by the `JavaStatement`
     * labeled alternative in `MParser.java_statement`.
     * @param ctx the parse tree
     */
    enterJavaStatement?: (ctx: JavaStatementContext) => void;
    /**
     * Exit a parse tree produced by the `JavaStatement`
     * labeled alternative in `MParser.java_statement`.
     * @param ctx the parse tree
     */
    exitJavaStatement?: (ctx: JavaStatementContext) => void;
    /**
     * Enter a parse tree produced by the `JavaSelectorExpression`
     * labeled alternative in `MParser.java_expression`.
     * @param ctx the parse tree
     */
    enterJavaSelectorExpression?: (ctx: JavaSelectorExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `JavaSelectorExpression`
     * labeled alternative in `MParser.java_expression`.
     * @param ctx the parse tree
     */
    exitJavaSelectorExpression?: (ctx: JavaSelectorExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `JavaPrimaryExpression`
     * labeled alternative in `MParser.java_expression`.
     * @param ctx the parse tree
     */
    enterJavaPrimaryExpression?: (ctx: JavaPrimaryExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `JavaPrimaryExpression`
     * labeled alternative in `MParser.java_expression`.
     * @param ctx the parse tree
     */
    exitJavaPrimaryExpression?: (ctx: JavaPrimaryExpressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.java_primary_expression`.
     * @param ctx the parse tree
     */
    enterJava_primary_expression?: (ctx: Java_primary_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.java_primary_expression`.
     * @param ctx the parse tree
     */
    exitJava_primary_expression?: (ctx: Java_primary_expressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.java_this_expression`.
     * @param ctx the parse tree
     */
    enterJava_this_expression?: (ctx: Java_this_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.java_this_expression`.
     * @param ctx the parse tree
     */
    exitJava_this_expression?: (ctx: Java_this_expressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.java_new_expression`.
     * @param ctx the parse tree
     */
    enterJava_new_expression?: (ctx: Java_new_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.java_new_expression`.
     * @param ctx the parse tree
     */
    exitJava_new_expression?: (ctx: Java_new_expressionContext) => void;
    /**
     * Enter a parse tree produced by the `JavaMethodExpression`
     * labeled alternative in `MParser.java_selector_expression`.
     * @param ctx the parse tree
     */
    enterJavaMethodExpression?: (ctx: JavaMethodExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `JavaMethodExpression`
     * labeled alternative in `MParser.java_selector_expression`.
     * @param ctx the parse tree
     */
    exitJavaMethodExpression?: (ctx: JavaMethodExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `JavaItemExpression`
     * labeled alternative in `MParser.java_selector_expression`.
     * @param ctx the parse tree
     */
    enterJavaItemExpression?: (ctx: JavaItemExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `JavaItemExpression`
     * labeled alternative in `MParser.java_selector_expression`.
     * @param ctx the parse tree
     */
    exitJavaItemExpression?: (ctx: JavaItemExpressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.java_method_expression`.
     * @param ctx the parse tree
     */
    enterJava_method_expression?: (ctx: Java_method_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.java_method_expression`.
     * @param ctx the parse tree
     */
    exitJava_method_expression?: (ctx: Java_method_expressionContext) => void;
    /**
     * Enter a parse tree produced by the `JavaArgumentListItem`
     * labeled alternative in `MParser.java_arguments`.
     * @param ctx the parse tree
     */
    enterJavaArgumentListItem?: (ctx: JavaArgumentListItemContext) => void;
    /**
     * Exit a parse tree produced by the `JavaArgumentListItem`
     * labeled alternative in `MParser.java_arguments`.
     * @param ctx the parse tree
     */
    exitJavaArgumentListItem?: (ctx: JavaArgumentListItemContext) => void;
    /**
     * Enter a parse tree produced by the `JavaArgumentList`
     * labeled alternative in `MParser.java_arguments`.
     * @param ctx the parse tree
     */
    enterJavaArgumentList?: (ctx: JavaArgumentListContext) => void;
    /**
     * Exit a parse tree produced by the `JavaArgumentList`
     * labeled alternative in `MParser.java_arguments`.
     * @param ctx the parse tree
     */
    exitJavaArgumentList?: (ctx: JavaArgumentListContext) => void;
    /**
     * Enter a parse tree produced by `MParser.java_item_expression`.
     * @param ctx the parse tree
     */
    enterJava_item_expression?: (ctx: Java_item_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.java_item_expression`.
     * @param ctx the parse tree
     */
    exitJava_item_expression?: (ctx: Java_item_expressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.java_parenthesis_expression`.
     * @param ctx the parse tree
     */
    enterJava_parenthesis_expression?: (ctx: Java_parenthesis_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.java_parenthesis_expression`.
     * @param ctx the parse tree
     */
    exitJava_parenthesis_expression?: (ctx: Java_parenthesis_expressionContext) => void;
    /**
     * Enter a parse tree produced by the `JavaIdentifier`
     * labeled alternative in `MParser.java_identifier_expression`.
     * @param ctx the parse tree
     */
    enterJavaIdentifier?: (ctx: JavaIdentifierContext) => void;
    /**
     * Exit a parse tree produced by the `JavaIdentifier`
     * labeled alternative in `MParser.java_identifier_expression`.
     * @param ctx the parse tree
     */
    exitJavaIdentifier?: (ctx: JavaIdentifierContext) => void;
    /**
     * Enter a parse tree produced by the `JavaChildIdentifier`
     * labeled alternative in `MParser.java_identifier_expression`.
     * @param ctx the parse tree
     */
    enterJavaChildIdentifier?: (ctx: JavaChildIdentifierContext) => void;
    /**
     * Exit a parse tree produced by the `JavaChildIdentifier`
     * labeled alternative in `MParser.java_identifier_expression`.
     * @param ctx the parse tree
     */
    exitJavaChildIdentifier?: (ctx: JavaChildIdentifierContext) => void;
    /**
     * Enter a parse tree produced by the `JavaClassIdentifier`
     * labeled alternative in `MParser.java_class_identifier_expression`.
     * @param ctx the parse tree
     */
    enterJavaClassIdentifier?: (ctx: JavaClassIdentifierContext) => void;
    /**
     * Exit a parse tree produced by the `JavaClassIdentifier`
     * labeled alternative in `MParser.java_class_identifier_expression`.
     * @param ctx the parse tree
     */
    exitJavaClassIdentifier?: (ctx: JavaClassIdentifierContext) => void;
    /**
     * Enter a parse tree produced by the `JavaChildClassIdentifier`
     * labeled alternative in `MParser.java_class_identifier_expression`.
     * @param ctx the parse tree
     */
    enterJavaChildClassIdentifier?: (ctx: JavaChildClassIdentifierContext) => void;
    /**
     * Exit a parse tree produced by the `JavaChildClassIdentifier`
     * labeled alternative in `MParser.java_class_identifier_expression`.
     * @param ctx the parse tree
     */
    exitJavaChildClassIdentifier?: (ctx: JavaChildClassIdentifierContext) => void;
    /**
     * Enter a parse tree produced by the `JavaIntegerLiteral`
     * labeled alternative in `MParser.java_literal_expression`.
     * @param ctx the parse tree
     */
    enterJavaIntegerLiteral?: (ctx: JavaIntegerLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `JavaIntegerLiteral`
     * labeled alternative in `MParser.java_literal_expression`.
     * @param ctx the parse tree
     */
    exitJavaIntegerLiteral?: (ctx: JavaIntegerLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `JavaDecimalLiteral`
     * labeled alternative in `MParser.java_literal_expression`.
     * @param ctx the parse tree
     */
    enterJavaDecimalLiteral?: (ctx: JavaDecimalLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `JavaDecimalLiteral`
     * labeled alternative in `MParser.java_literal_expression`.
     * @param ctx the parse tree
     */
    exitJavaDecimalLiteral?: (ctx: JavaDecimalLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `JavaTextLiteral`
     * labeled alternative in `MParser.java_literal_expression`.
     * @param ctx the parse tree
     */
    enterJavaTextLiteral?: (ctx: JavaTextLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `JavaTextLiteral`
     * labeled alternative in `MParser.java_literal_expression`.
     * @param ctx the parse tree
     */
    exitJavaTextLiteral?: (ctx: JavaTextLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `JavaBooleanLiteral`
     * labeled alternative in `MParser.java_literal_expression`.
     * @param ctx the parse tree
     */
    enterJavaBooleanLiteral?: (ctx: JavaBooleanLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `JavaBooleanLiteral`
     * labeled alternative in `MParser.java_literal_expression`.
     * @param ctx the parse tree
     */
    exitJavaBooleanLiteral?: (ctx: JavaBooleanLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `JavaCharacterLiteral`
     * labeled alternative in `MParser.java_literal_expression`.
     * @param ctx the parse tree
     */
    enterJavaCharacterLiteral?: (ctx: JavaCharacterLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `JavaCharacterLiteral`
     * labeled alternative in `MParser.java_literal_expression`.
     * @param ctx the parse tree
     */
    exitJavaCharacterLiteral?: (ctx: JavaCharacterLiteralContext) => void;
    /**
     * Enter a parse tree produced by `MParser.java_identifier`.
     * @param ctx the parse tree
     */
    enterJava_identifier?: (ctx: Java_identifierContext) => void;
    /**
     * Exit a parse tree produced by `MParser.java_identifier`.
     * @param ctx the parse tree
     */
    exitJava_identifier?: (ctx: Java_identifierContext) => void;
    /**
     * Enter a parse tree produced by the `CSharpReturnStatement`
     * labeled alternative in `MParser.csharp_statement`.
     * @param ctx the parse tree
     */
    enterCSharpReturnStatement?: (ctx: CSharpReturnStatementContext) => void;
    /**
     * Exit a parse tree produced by the `CSharpReturnStatement`
     * labeled alternative in `MParser.csharp_statement`.
     * @param ctx the parse tree
     */
    exitCSharpReturnStatement?: (ctx: CSharpReturnStatementContext) => void;
    /**
     * Enter a parse tree produced by the `CSharpStatement`
     * labeled alternative in `MParser.csharp_statement`.
     * @param ctx the parse tree
     */
    enterCSharpStatement?: (ctx: CSharpStatementContext) => void;
    /**
     * Exit a parse tree produced by the `CSharpStatement`
     * labeled alternative in `MParser.csharp_statement`.
     * @param ctx the parse tree
     */
    exitCSharpStatement?: (ctx: CSharpStatementContext) => void;
    /**
     * Enter a parse tree produced by the `CSharpSelectorExpression`
     * labeled alternative in `MParser.csharp_expression`.
     * @param ctx the parse tree
     */
    enterCSharpSelectorExpression?: (ctx: CSharpSelectorExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `CSharpSelectorExpression`
     * labeled alternative in `MParser.csharp_expression`.
     * @param ctx the parse tree
     */
    exitCSharpSelectorExpression?: (ctx: CSharpSelectorExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `CSharpPrimaryExpression`
     * labeled alternative in `MParser.csharp_expression`.
     * @param ctx the parse tree
     */
    enterCSharpPrimaryExpression?: (ctx: CSharpPrimaryExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `CSharpPrimaryExpression`
     * labeled alternative in `MParser.csharp_expression`.
     * @param ctx the parse tree
     */
    exitCSharpPrimaryExpression?: (ctx: CSharpPrimaryExpressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.csharp_primary_expression`.
     * @param ctx the parse tree
     */
    enterCsharp_primary_expression?: (ctx: Csharp_primary_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.csharp_primary_expression`.
     * @param ctx the parse tree
     */
    exitCsharp_primary_expression?: (ctx: Csharp_primary_expressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.csharp_this_expression`.
     * @param ctx the parse tree
     */
    enterCsharp_this_expression?: (ctx: Csharp_this_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.csharp_this_expression`.
     * @param ctx the parse tree
     */
    exitCsharp_this_expression?: (ctx: Csharp_this_expressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.csharp_new_expression`.
     * @param ctx the parse tree
     */
    enterCsharp_new_expression?: (ctx: Csharp_new_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.csharp_new_expression`.
     * @param ctx the parse tree
     */
    exitCsharp_new_expression?: (ctx: Csharp_new_expressionContext) => void;
    /**
     * Enter a parse tree produced by the `CSharpMethodExpression`
     * labeled alternative in `MParser.csharp_selector_expression`.
     * @param ctx the parse tree
     */
    enterCSharpMethodExpression?: (ctx: CSharpMethodExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `CSharpMethodExpression`
     * labeled alternative in `MParser.csharp_selector_expression`.
     * @param ctx the parse tree
     */
    exitCSharpMethodExpression?: (ctx: CSharpMethodExpressionContext) => void;
    /**
     * Enter a parse tree produced by the `CSharpItemExpression`
     * labeled alternative in `MParser.csharp_selector_expression`.
     * @param ctx the parse tree
     */
    enterCSharpItemExpression?: (ctx: CSharpItemExpressionContext) => void;
    /**
     * Exit a parse tree produced by the `CSharpItemExpression`
     * labeled alternative in `MParser.csharp_selector_expression`.
     * @param ctx the parse tree
     */
    exitCSharpItemExpression?: (ctx: CSharpItemExpressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.csharp_method_expression`.
     * @param ctx the parse tree
     */
    enterCsharp_method_expression?: (ctx: Csharp_method_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.csharp_method_expression`.
     * @param ctx the parse tree
     */
    exitCsharp_method_expression?: (ctx: Csharp_method_expressionContext) => void;
    /**
     * Enter a parse tree produced by the `CSharpArgumentList`
     * labeled alternative in `MParser.csharp_arguments`.
     * @param ctx the parse tree
     */
    enterCSharpArgumentList?: (ctx: CSharpArgumentListContext) => void;
    /**
     * Exit a parse tree produced by the `CSharpArgumentList`
     * labeled alternative in `MParser.csharp_arguments`.
     * @param ctx the parse tree
     */
    exitCSharpArgumentList?: (ctx: CSharpArgumentListContext) => void;
    /**
     * Enter a parse tree produced by the `CSharpArgumentListItem`
     * labeled alternative in `MParser.csharp_arguments`.
     * @param ctx the parse tree
     */
    enterCSharpArgumentListItem?: (ctx: CSharpArgumentListItemContext) => void;
    /**
     * Exit a parse tree produced by the `CSharpArgumentListItem`
     * labeled alternative in `MParser.csharp_arguments`.
     * @param ctx the parse tree
     */
    exitCSharpArgumentListItem?: (ctx: CSharpArgumentListItemContext) => void;
    /**
     * Enter a parse tree produced by `MParser.csharp_item_expression`.
     * @param ctx the parse tree
     */
    enterCsharp_item_expression?: (ctx: Csharp_item_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.csharp_item_expression`.
     * @param ctx the parse tree
     */
    exitCsharp_item_expression?: (ctx: Csharp_item_expressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.csharp_parenthesis_expression`.
     * @param ctx the parse tree
     */
    enterCsharp_parenthesis_expression?: (ctx: Csharp_parenthesis_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.csharp_parenthesis_expression`.
     * @param ctx the parse tree
     */
    exitCsharp_parenthesis_expression?: (ctx: Csharp_parenthesis_expressionContext) => void;
    /**
     * Enter a parse tree produced by the `CSharpIdentifier`
     * labeled alternative in `MParser.csharp_identifier_expression`.
     * @param ctx the parse tree
     */
    enterCSharpIdentifier?: (ctx: CSharpIdentifierContext) => void;
    /**
     * Exit a parse tree produced by the `CSharpIdentifier`
     * labeled alternative in `MParser.csharp_identifier_expression`.
     * @param ctx the parse tree
     */
    exitCSharpIdentifier?: (ctx: CSharpIdentifierContext) => void;
    /**
     * Enter a parse tree produced by the `CSharpChildIdentifier`
     * labeled alternative in `MParser.csharp_identifier_expression`.
     * @param ctx the parse tree
     */
    enterCSharpChildIdentifier?: (ctx: CSharpChildIdentifierContext) => void;
    /**
     * Exit a parse tree produced by the `CSharpChildIdentifier`
     * labeled alternative in `MParser.csharp_identifier_expression`.
     * @param ctx the parse tree
     */
    exitCSharpChildIdentifier?: (ctx: CSharpChildIdentifierContext) => void;
    /**
     * Enter a parse tree produced by the `CSharpPromptoIdentifier`
     * labeled alternative in `MParser.csharp_identifier_expression`.
     * @param ctx the parse tree
     */
    enterCSharpPromptoIdentifier?: (ctx: CSharpPromptoIdentifierContext) => void;
    /**
     * Exit a parse tree produced by the `CSharpPromptoIdentifier`
     * labeled alternative in `MParser.csharp_identifier_expression`.
     * @param ctx the parse tree
     */
    exitCSharpPromptoIdentifier?: (ctx: CSharpPromptoIdentifierContext) => void;
    /**
     * Enter a parse tree produced by the `CSharpIntegerLiteral`
     * labeled alternative in `MParser.csharp_literal_expression`.
     * @param ctx the parse tree
     */
    enterCSharpIntegerLiteral?: (ctx: CSharpIntegerLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `CSharpIntegerLiteral`
     * labeled alternative in `MParser.csharp_literal_expression`.
     * @param ctx the parse tree
     */
    exitCSharpIntegerLiteral?: (ctx: CSharpIntegerLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `CSharpDecimalLiteral`
     * labeled alternative in `MParser.csharp_literal_expression`.
     * @param ctx the parse tree
     */
    enterCSharpDecimalLiteral?: (ctx: CSharpDecimalLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `CSharpDecimalLiteral`
     * labeled alternative in `MParser.csharp_literal_expression`.
     * @param ctx the parse tree
     */
    exitCSharpDecimalLiteral?: (ctx: CSharpDecimalLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `CSharpTextLiteral`
     * labeled alternative in `MParser.csharp_literal_expression`.
     * @param ctx the parse tree
     */
    enterCSharpTextLiteral?: (ctx: CSharpTextLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `CSharpTextLiteral`
     * labeled alternative in `MParser.csharp_literal_expression`.
     * @param ctx the parse tree
     */
    exitCSharpTextLiteral?: (ctx: CSharpTextLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `CSharpBooleanLiteral`
     * labeled alternative in `MParser.csharp_literal_expression`.
     * @param ctx the parse tree
     */
    enterCSharpBooleanLiteral?: (ctx: CSharpBooleanLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `CSharpBooleanLiteral`
     * labeled alternative in `MParser.csharp_literal_expression`.
     * @param ctx the parse tree
     */
    exitCSharpBooleanLiteral?: (ctx: CSharpBooleanLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `CSharpCharacterLiteral`
     * labeled alternative in `MParser.csharp_literal_expression`.
     * @param ctx the parse tree
     */
    enterCSharpCharacterLiteral?: (ctx: CSharpCharacterLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `CSharpCharacterLiteral`
     * labeled alternative in `MParser.csharp_literal_expression`.
     * @param ctx the parse tree
     */
    exitCSharpCharacterLiteral?: (ctx: CSharpCharacterLiteralContext) => void;
    /**
     * Enter a parse tree produced by `MParser.csharp_identifier`.
     * @param ctx the parse tree
     */
    enterCsharp_identifier?: (ctx: Csharp_identifierContext) => void;
    /**
     * Exit a parse tree produced by `MParser.csharp_identifier`.
     * @param ctx the parse tree
     */
    exitCsharp_identifier?: (ctx: Csharp_identifierContext) => void;
    /**
     * Enter a parse tree produced by `MParser.jsx_expression`.
     * @param ctx the parse tree
     */
    enterJsx_expression?: (ctx: Jsx_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.jsx_expression`.
     * @param ctx the parse tree
     */
    exitJsx_expression?: (ctx: Jsx_expressionContext) => void;
    /**
     * Enter a parse tree produced by the `JsxSelfClosing`
     * labeled alternative in `MParser.jsx_element`.
     * @param ctx the parse tree
     */
    enterJsxSelfClosing?: (ctx: JsxSelfClosingContext) => void;
    /**
     * Exit a parse tree produced by the `JsxSelfClosing`
     * labeled alternative in `MParser.jsx_element`.
     * @param ctx the parse tree
     */
    exitJsxSelfClosing?: (ctx: JsxSelfClosingContext) => void;
    /**
     * Enter a parse tree produced by the `JsxElement`
     * labeled alternative in `MParser.jsx_element`.
     * @param ctx the parse tree
     */
    enterJsxElement?: (ctx: JsxElementContext) => void;
    /**
     * Exit a parse tree produced by the `JsxElement`
     * labeled alternative in `MParser.jsx_element`.
     * @param ctx the parse tree
     */
    exitJsxElement?: (ctx: JsxElementContext) => void;
    /**
     * Enter a parse tree produced by `MParser.jsx_fragment`.
     * @param ctx the parse tree
     */
    enterJsx_fragment?: (ctx: Jsx_fragmentContext) => void;
    /**
     * Exit a parse tree produced by `MParser.jsx_fragment`.
     * @param ctx the parse tree
     */
    exitJsx_fragment?: (ctx: Jsx_fragmentContext) => void;
    /**
     * Enter a parse tree produced by `MParser.jsx_fragment_start`.
     * @param ctx the parse tree
     */
    enterJsx_fragment_start?: (ctx: Jsx_fragment_startContext) => void;
    /**
     * Exit a parse tree produced by `MParser.jsx_fragment_start`.
     * @param ctx the parse tree
     */
    exitJsx_fragment_start?: (ctx: Jsx_fragment_startContext) => void;
    /**
     * Enter a parse tree produced by `MParser.jsx_fragment_end`.
     * @param ctx the parse tree
     */
    enterJsx_fragment_end?: (ctx: Jsx_fragment_endContext) => void;
    /**
     * Exit a parse tree produced by `MParser.jsx_fragment_end`.
     * @param ctx the parse tree
     */
    exitJsx_fragment_end?: (ctx: Jsx_fragment_endContext) => void;
    /**
     * Enter a parse tree produced by `MParser.jsx_self_closing`.
     * @param ctx the parse tree
     */
    enterJsx_self_closing?: (ctx: Jsx_self_closingContext) => void;
    /**
     * Exit a parse tree produced by `MParser.jsx_self_closing`.
     * @param ctx the parse tree
     */
    exitJsx_self_closing?: (ctx: Jsx_self_closingContext) => void;
    /**
     * Enter a parse tree produced by `MParser.jsx_opening`.
     * @param ctx the parse tree
     */
    enterJsx_opening?: (ctx: Jsx_openingContext) => void;
    /**
     * Exit a parse tree produced by `MParser.jsx_opening`.
     * @param ctx the parse tree
     */
    exitJsx_opening?: (ctx: Jsx_openingContext) => void;
    /**
     * Enter a parse tree produced by `MParser.jsx_closing`.
     * @param ctx the parse tree
     */
    enterJsx_closing?: (ctx: Jsx_closingContext) => void;
    /**
     * Exit a parse tree produced by `MParser.jsx_closing`.
     * @param ctx the parse tree
     */
    exitJsx_closing?: (ctx: Jsx_closingContext) => void;
    /**
     * Enter a parse tree produced by `MParser.jsx_element_name`.
     * @param ctx the parse tree
     */
    enterJsx_element_name?: (ctx: Jsx_element_nameContext) => void;
    /**
     * Exit a parse tree produced by `MParser.jsx_element_name`.
     * @param ctx the parse tree
     */
    exitJsx_element_name?: (ctx: Jsx_element_nameContext) => void;
    /**
     * Enter a parse tree produced by `MParser.jsx_identifier`.
     * @param ctx the parse tree
     */
    enterJsx_identifier?: (ctx: Jsx_identifierContext) => void;
    /**
     * Exit a parse tree produced by `MParser.jsx_identifier`.
     * @param ctx the parse tree
     */
    exitJsx_identifier?: (ctx: Jsx_identifierContext) => void;
    /**
     * Enter a parse tree produced by `MParser.jsx_attribute`.
     * @param ctx the parse tree
     */
    enterJsx_attribute?: (ctx: Jsx_attributeContext) => void;
    /**
     * Exit a parse tree produced by `MParser.jsx_attribute`.
     * @param ctx the parse tree
     */
    exitJsx_attribute?: (ctx: Jsx_attributeContext) => void;
    /**
     * Enter a parse tree produced by the `JsxLiteral`
     * labeled alternative in `MParser.jsx_attribute_value`.
     * @param ctx the parse tree
     */
    enterJsxLiteral?: (ctx: JsxLiteralContext) => void;
    /**
     * Exit a parse tree produced by the `JsxLiteral`
     * labeled alternative in `MParser.jsx_attribute_value`.
     * @param ctx the parse tree
     */
    exitJsxLiteral?: (ctx: JsxLiteralContext) => void;
    /**
     * Enter a parse tree produced by the `JsxValue`
     * labeled alternative in `MParser.jsx_attribute_value`.
     * @param ctx the parse tree
     */
    enterJsxValue?: (ctx: JsxValueContext) => void;
    /**
     * Exit a parse tree produced by the `JsxValue`
     * labeled alternative in `MParser.jsx_attribute_value`.
     * @param ctx the parse tree
     */
    exitJsxValue?: (ctx: JsxValueContext) => void;
    /**
     * Enter a parse tree produced by `MParser.jsx_children`.
     * @param ctx the parse tree
     */
    enterJsx_children?: (ctx: Jsx_childrenContext) => void;
    /**
     * Exit a parse tree produced by `MParser.jsx_children`.
     * @param ctx the parse tree
     */
    exitJsx_children?: (ctx: Jsx_childrenContext) => void;
    /**
     * Enter a parse tree produced by the `JsxText`
     * labeled alternative in `MParser.jsx_child`.
     * @param ctx the parse tree
     */
    enterJsxText?: (ctx: JsxTextContext) => void;
    /**
     * Exit a parse tree produced by the `JsxText`
     * labeled alternative in `MParser.jsx_child`.
     * @param ctx the parse tree
     */
    exitJsxText?: (ctx: JsxTextContext) => void;
    /**
     * Enter a parse tree produced by the `JsxChild`
     * labeled alternative in `MParser.jsx_child`.
     * @param ctx the parse tree
     */
    enterJsxChild?: (ctx: JsxChildContext) => void;
    /**
     * Exit a parse tree produced by the `JsxChild`
     * labeled alternative in `MParser.jsx_child`.
     * @param ctx the parse tree
     */
    exitJsxChild?: (ctx: JsxChildContext) => void;
    /**
     * Enter a parse tree produced by the `JsxCode`
     * labeled alternative in `MParser.jsx_child`.
     * @param ctx the parse tree
     */
    enterJsxCode?: (ctx: JsxCodeContext) => void;
    /**
     * Exit a parse tree produced by the `JsxCode`
     * labeled alternative in `MParser.jsx_child`.
     * @param ctx the parse tree
     */
    exitJsxCode?: (ctx: JsxCodeContext) => void;
    /**
     * Enter a parse tree produced by `MParser.jsx_text`.
     * @param ctx the parse tree
     */
    enterJsx_text?: (ctx: Jsx_textContext) => void;
    /**
     * Exit a parse tree produced by `MParser.jsx_text`.
     * @param ctx the parse tree
     */
    exitJsx_text?: (ctx: Jsx_textContext) => void;
    /**
     * Enter a parse tree produced by `MParser.jsx_char`.
     * @param ctx the parse tree
     */
    enterJsx_char?: (ctx: Jsx_charContext) => void;
    /**
     * Exit a parse tree produced by `MParser.jsx_char`.
     * @param ctx the parse tree
     */
    exitJsx_char?: (ctx: Jsx_charContext) => void;
    /**
     * Enter a parse tree produced by `MParser.css_expression`.
     * @param ctx the parse tree
     */
    enterCss_expression?: (ctx: Css_expressionContext) => void;
    /**
     * Exit a parse tree produced by `MParser.css_expression`.
     * @param ctx the parse tree
     */
    exitCss_expression?: (ctx: Css_expressionContext) => void;
    /**
     * Enter a parse tree produced by `MParser.css_field`.
     * @param ctx the parse tree
     */
    enterCss_field?: (ctx: Css_fieldContext) => void;
    /**
     * Exit a parse tree produced by `MParser.css_field`.
     * @param ctx the parse tree
     */
    exitCss_field?: (ctx: Css_fieldContext) => void;
    /**
     * Enter a parse tree produced by `MParser.css_identifier`.
     * @param ctx the parse tree
     */
    enterCss_identifier?: (ctx: Css_identifierContext) => void;
    /**
     * Exit a parse tree produced by `MParser.css_identifier`.
     * @param ctx the parse tree
     */
    exitCss_identifier?: (ctx: Css_identifierContext) => void;
    /**
     * Enter a parse tree produced by the `CssValue`
     * labeled alternative in `MParser.css_value`.
     * @param ctx the parse tree
     */
    enterCssValue?: (ctx: CssValueContext) => void;
    /**
     * Exit a parse tree produced by the `CssValue`
     * labeled alternative in `MParser.css_value`.
     * @param ctx the parse tree
     */
    exitCssValue?: (ctx: CssValueContext) => void;
    /**
     * Enter a parse tree produced by the `CssText`
     * labeled alternative in `MParser.css_value`.
     * @param ctx the parse tree
     */
    enterCssText?: (ctx: CssTextContext) => void;
    /**
     * Exit a parse tree produced by the `CssText`
     * labeled alternative in `MParser.css_value`.
     * @param ctx the parse tree
     */
    exitCssText?: (ctx: CssTextContext) => void;
    /**
     * Enter a parse tree produced by `MParser.css_text`.
     * @param ctx the parse tree
     */
    enterCss_text?: (ctx: Css_textContext) => void;
    /**
     * Exit a parse tree produced by `MParser.css_text`.
     * @param ctx the parse tree
     */
    exitCss_text?: (ctx: Css_textContext) => void;
}
