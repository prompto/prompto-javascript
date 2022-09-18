// Generated from EParser.g4 by ANTLR 4.11.2-SNAPSHOT

import { default as antlr4 } from 'antlr4';


import { Enum_category_declarationContext } from "./EParser.js";
import { Enum_native_declarationContext } from "./EParser.js";
import { Native_symbolContext } from "./EParser.js";
import { Category_symbolContext } from "./EParser.js";
import { Attribute_declarationContext } from "./EParser.js";
import { Concrete_widget_declarationContext } from "./EParser.js";
import { Native_widget_declarationContext } from "./EParser.js";
import { Concrete_category_declarationContext } from "./EParser.js";
import { Singleton_category_declarationContext } from "./EParser.js";
import { DerivedListContext } from "./EParser.js";
import { DerivedListItemContext } from "./EParser.js";
import { Operator_method_declarationContext } from "./EParser.js";
import { Setter_method_declarationContext } from "./EParser.js";
import { Native_setter_declarationContext } from "./EParser.js";
import { Getter_method_declarationContext } from "./EParser.js";
import { Native_getter_declarationContext } from "./EParser.js";
import { Native_category_declarationContext } from "./EParser.js";
import { Native_resource_declarationContext } from "./EParser.js";
import { Native_category_bindingsContext } from "./EParser.js";
import { NativeCategoryBindingListItemContext } from "./EParser.js";
import { NativeCategoryBindingListContext } from "./EParser.js";
import { AttributeListContext } from "./EParser.js";
import { AttributeListItemContext } from "./EParser.js";
import { Abstract_global_method_declarationContext } from "./EParser.js";
import { Abstract_member_method_declarationContext } from "./EParser.js";
import { Concrete_method_declarationContext } from "./EParser.js";
import { Native_method_declarationContext } from "./EParser.js";
import { Test_method_declarationContext } from "./EParser.js";
import { AssertionContext } from "./EParser.js";
import { Full_argument_listContext } from "./EParser.js";
import { Typed_argumentContext } from "./EParser.js";
import { AssignInstanceStatementContext } from "./EParser.js";
import { MethodCallStatementContext } from "./EParser.js";
import { AssignTupleStatementContext } from "./EParser.js";
import { StoreStatementContext } from "./EParser.js";
import { FetchStatementContext } from "./EParser.js";
import { ReadStatementContext } from "./EParser.js";
import { FlushStatementContext } from "./EParser.js";
import { BreakStatementContext } from "./EParser.js";
import { ReturnStatementContext } from "./EParser.js";
import { IfStatementContext } from "./EParser.js";
import { SwitchStatementContext } from "./EParser.js";
import { ForEachStatementContext } from "./EParser.js";
import { WhileStatementContext } from "./EParser.js";
import { DoWhileStatementContext } from "./EParser.js";
import { RaiseStatementContext } from "./EParser.js";
import { TryStatementContext } from "./EParser.js";
import { WriteStatementContext } from "./EParser.js";
import { WithResourceStatementContext } from "./EParser.js";
import { WithSingletonStatementContext } from "./EParser.js";
import { ClosureStatementContext } from "./EParser.js";
import { CommentStatementContext } from "./EParser.js";
import { Flush_statementContext } from "./EParser.js";
import { Store_statementContext } from "./EParser.js";
import { UnresolvedWithArgsStatementContext } from "./EParser.js";
import { InvokeStatementContext } from "./EParser.js";
import { With_resource_statementContext } from "./EParser.js";
import { With_singleton_statementContext } from "./EParser.js";
import { Switch_statementContext } from "./EParser.js";
import { AtomicSwitchCaseContext } from "./EParser.js";
import { CollectionSwitchCaseContext } from "./EParser.js";
import { For_each_statementContext } from "./EParser.js";
import { Do_while_statementContext } from "./EParser.js";
import { While_statementContext } from "./EParser.js";
import { If_statementContext } from "./EParser.js";
import { ElseIfStatementListContext } from "./EParser.js";
import { ElseIfStatementListItemContext } from "./EParser.js";
import { Raise_statementContext } from "./EParser.js";
import { Try_statementContext } from "./EParser.js";
import { CatchAtomicStatementContext } from "./EParser.js";
import { CatchCollectionStatementContext } from "./EParser.js";
import { Break_statementContext } from "./EParser.js";
import { Return_statementContext } from "./EParser.js";
import { IntDivideExpressionContext } from "./EParser.js";
import { HasAnyExpressionContext } from "./EParser.js";
import { HasExpressionContext } from "./EParser.js";
import { TernaryExpressionContext } from "./EParser.js";
import { InExpressionContext } from "./EParser.js";
import { DocumentExpressionContext } from "./EParser.js";
import { JsxExpressionContext } from "./EParser.js";
import { NotExpressionContext } from "./EParser.js";
import { InvocationExpressionContext } from "./EParser.js";
import { CompareExpressionContext } from "./EParser.js";
import { OrExpressionContext } from "./EParser.js";
import { CodeExpressionContext } from "./EParser.js";
import { AmbiguousExpressionContext } from "./EParser.js";
import { ReadOneExpressionContext } from "./EParser.js";
import { AndExpressionContext } from "./EParser.js";
import { ArrowExpressionContext } from "./EParser.js";
import { MethodCallExpressionContext } from "./EParser.js";
import { FetchExpressionContext } from "./EParser.js";
import { ClosureExpressionContext } from "./EParser.js";
import { SortedExpressionContext } from "./EParser.js";
import { BlobExpressionContext } from "./EParser.js";
import { ContainsExpressionContext } from "./EParser.js";
import { FilteredListExpressionContext } from "./EParser.js";
import { ConstructorExpressionContext } from "./EParser.js";
import { ReadBlobExpressionContext } from "./EParser.js";
import { MultiplyExpressionContext } from "./EParser.js";
import { ExecuteExpressionContext } from "./EParser.js";
import { IteratorExpressionContext } from "./EParser.js";
import { UnresolvedExpressionContext } from "./EParser.js";
import { DivideExpressionContext } from "./EParser.js";
import { IsExpressionContext } from "./EParser.js";
import { MinusExpressionContext } from "./EParser.js";
import { AddExpressionContext } from "./EParser.js";
import { HasAllExpressionContext } from "./EParser.js";
import { InstanceExpressionContext } from "./EParser.js";
import { MutableInstanceExpressionContext } from "./EParser.js";
import { ReadAllExpressionContext } from "./EParser.js";
import { CssExpressionContext } from "./EParser.js";
import { CastExpressionContext } from "./EParser.js";
import { ModuloExpressionContext } from "./EParser.js";
import { EqualsExpressionContext } from "./EParser.js";
import { ArrowFilterExpressionContext } from "./EParser.js";
import { ExplicitFilterExpressionContext } from "./EParser.js";
import { OtherFilterExpressionContext } from "./EParser.js";
import { UnresolvedSelectorContext } from "./EParser.js";
import { UnresolvedIdentifierContext } from "./EParser.js";
import { Unresolved_selectorContext } from "./EParser.js";
import { Invocation_expressionContext } from "./EParser.js";
import { Invocation_trailerContext } from "./EParser.js";
import { ParenthesisExpressionContext } from "./EParser.js";
import { LiteralExpressionContext } from "./EParser.js";
import { IdentifierExpressionContext } from "./EParser.js";
import { ThisExpressionContext } from "./EParser.js";
import { SuperExpressionContext } from "./EParser.js";
import { SelectorExpressionContext } from "./EParser.js";
import { SelectableExpressionContext } from "./EParser.js";
import { MemberSelectorContext } from "./EParser.js";
import { SliceSelectorContext } from "./EParser.js";
import { ItemSelectorContext } from "./EParser.js";
import { MutableSelectableExpressionContext } from "./EParser.js";
import { MutableSelectorExpressionContext } from "./EParser.js";
import { Document_expressionContext } from "./EParser.js";
import { Blob_expressionContext } from "./EParser.js";
import { ConstructorFromContext } from "./EParser.js";
import { ConstructorNoFromContext } from "./EParser.js";
import { Write_statementContext } from "./EParser.js";
import { Ambiguous_expressionContext } from "./EParser.js";
import { Filtered_list_suffixContext } from "./EParser.js";
import { FetchOneContext } from "./EParser.js";
import { FetchManyContext } from "./EParser.js";
import { FetchOneAsyncContext } from "./EParser.js";
import { FetchManyAsyncContext } from "./EParser.js";
import { Include_listContext } from "./EParser.js";
import { ThenContext } from "./EParser.js";
import { Read_statementContext } from "./EParser.js";
import { Sorted_expressionContext } from "./EParser.js";
import { ArgumentAssignmentListExpressionContext } from "./EParser.js";
import { ArgumentAssignmentListNoExpressionContext } from "./EParser.js";
import { ArgumentAssignmentListContext } from "./EParser.js";
import { ArgumentAssignmentListItemContext } from "./EParser.js";
import { Argument_assignmentContext } from "./EParser.js";
import { Assign_instance_statementContext } from "./EParser.js";
import { MemberInstanceContext } from "./EParser.js";
import { ItemInstanceContext } from "./EParser.js";
import { Assign_tuple_statementContext } from "./EParser.js";
import { LfsContext } from "./EParser.js";
import { LfpContext } from "./EParser.js";
import { Ws_plusContext } from "./EParser.js";
import { IndentContext } from "./EParser.js";
import { DedentContext } from "./EParser.js";
import { Type_literalContext } from "./EParser.js";
import { Null_literalContext } from "./EParser.js";
import { ReplContext } from "./EParser.js";
import { FullDeclarationListContext } from "./EParser.js";
import { DeclarationsContext } from "./EParser.js";
import { DeclarationContext } from "./EParser.js";
import { Annotation_constructorContext } from "./EParser.js";
import { Annotation_identifierContext } from "./EParser.js";
import { Annotation_argumentContext } from "./EParser.js";
import { Annotation_argument_nameContext } from "./EParser.js";
import { AnnotationLiteralValueContext } from "./EParser.js";
import { AnnotationTypeValueContext } from "./EParser.js";
import { Resource_declarationContext } from "./EParser.js";
import { Enum_declarationContext } from "./EParser.js";
import { Native_symbol_listContext } from "./EParser.js";
import { Category_symbol_listContext } from "./EParser.js";
import { Symbol_listContext } from "./EParser.js";
import { MatchingListContext } from "./EParser.js";
import { MatchingSetContext } from "./EParser.js";
import { MatchingRangeContext } from "./EParser.js";
import { MatchingPatternContext } from "./EParser.js";
import { MatchingExpressionContext } from "./EParser.js";
import { List_literalContext } from "./EParser.js";
import { Set_literalContext } from "./EParser.js";
import { Expression_listContext } from "./EParser.js";
import { Range_literalContext } from "./EParser.js";
import { IteratorTypeContext } from "./EParser.js";
import { SetTypeContext } from "./EParser.js";
import { ListTypeContext } from "./EParser.js";
import { DictTypeContext } from "./EParser.js";
import { CursorTypeContext } from "./EParser.js";
import { TypeTypeContext } from "./EParser.js";
import { PrimaryTypeContext } from "./EParser.js";
import { NativeTypeContext } from "./EParser.js";
import { CategoryTypeContext } from "./EParser.js";
import { BooleanTypeContext } from "./EParser.js";
import { CssTypeContext } from "./EParser.js";
import { CharacterTypeContext } from "./EParser.js";
import { TextTypeContext } from "./EParser.js";
import { ImageTypeContext } from "./EParser.js";
import { IntegerTypeContext } from "./EParser.js";
import { DecimalTypeContext } from "./EParser.js";
import { DocumentTypeContext } from "./EParser.js";
import { DateTypeContext } from "./EParser.js";
import { DateTimeTypeContext } from "./EParser.js";
import { TimeTypeContext } from "./EParser.js";
import { PeriodTypeContext } from "./EParser.js";
import { VersionTypeContext } from "./EParser.js";
import { CodeTypeContext } from "./EParser.js";
import { BlobTypeContext } from "./EParser.js";
import { UUIDTypeContext } from "./EParser.js";
import { DbIdTypeContext } from "./EParser.js";
import { HtmlTypeContext } from "./EParser.js";
import { Category_typeContext } from "./EParser.js";
import { Mutable_category_typeContext } from "./EParser.js";
import { Code_typeContext } from "./EParser.js";
import { ConcreteCategoryDeclarationContext } from "./EParser.js";
import { NativeCategoryDeclarationContext } from "./EParser.js";
import { SingletonCategoryDeclarationContext } from "./EParser.js";
import { ConcreteWidgetDeclarationContext } from "./EParser.js";
import { NativeWidgetDeclarationContext } from "./EParser.js";
import { Type_identifier_listContext } from "./EParser.js";
import { Method_identifierContext } from "./EParser.js";
import { Identifier_or_keywordContext } from "./EParser.js";
import { Nospace_hyphen_identifier_or_keywordContext } from "./EParser.js";
import { Nospace_identifier_or_keywordContext } from "./EParser.js";
import { VariableIdentifierContext } from "./EParser.js";
import { TypeIdentifierContext } from "./EParser.js";
import { SymbolIdentifierContext } from "./EParser.js";
import { Member_identifierContext } from "./EParser.js";
import { Variable_identifierContext } from "./EParser.js";
import { Attribute_identifierContext } from "./EParser.js";
import { Type_identifierContext } from "./EParser.js";
import { Symbol_identifierContext } from "./EParser.js";
import { Argument_listContext } from "./EParser.js";
import { CodeArgumentContext } from "./EParser.js";
import { OperatorArgumentContext } from "./EParser.js";
import { Operator_argumentContext } from "./EParser.js";
import { Named_argumentContext } from "./EParser.js";
import { Code_argumentContext } from "./EParser.js";
import { Category_or_any_typeContext } from "./EParser.js";
import { AnyListTypeContext } from "./EParser.js";
import { AnyTypeContext } from "./EParser.js";
import { AnyDictTypeContext } from "./EParser.js";
import { Member_method_declaration_listContext } from "./EParser.js";
import { Member_method_declarationContext } from "./EParser.js";
import { Native_member_method_declaration_listContext } from "./EParser.js";
import { Native_member_method_declarationContext } from "./EParser.js";
import { JavaCategoryBindingContext } from "./EParser.js";
import { CSharpCategoryBindingContext } from "./EParser.js";
import { Python2CategoryBindingContext } from "./EParser.js";
import { Python3CategoryBindingContext } from "./EParser.js";
import { JavascriptCategoryBindingContext } from "./EParser.js";
import { Python_category_bindingContext } from "./EParser.js";
import { Python_moduleContext } from "./EParser.js";
import { Javascript_category_bindingContext } from "./EParser.js";
import { Javascript_moduleContext } from "./EParser.js";
import { Variable_identifier_listContext } from "./EParser.js";
import { Attribute_identifier_listContext } from "./EParser.js";
import { Method_declarationContext } from "./EParser.js";
import { Comment_statementContext } from "./EParser.js";
import { Native_statement_listContext } from "./EParser.js";
import { JavaNativeStatementContext } from "./EParser.js";
import { CSharpNativeStatementContext } from "./EParser.js";
import { Python2NativeStatementContext } from "./EParser.js";
import { Python3NativeStatementContext } from "./EParser.js";
import { JavascriptNativeStatementContext } from "./EParser.js";
import { Python_native_statementContext } from "./EParser.js";
import { Javascript_native_statementContext } from "./EParser.js";
import { Statement_listContext } from "./EParser.js";
import { Assertion_listContext } from "./EParser.js";
import { Switch_case_statement_listContext } from "./EParser.js";
import { Catch_statement_listContext } from "./EParser.js";
import { LiteralRangeLiteralContext } from "./EParser.js";
import { LiteralListLiteralContext } from "./EParser.js";
import { LiteralSetLiteralContext } from "./EParser.js";
import { MinIntegerLiteralContext } from "./EParser.js";
import { MaxIntegerLiteralContext } from "./EParser.js";
import { IntegerLiteralContext } from "./EParser.js";
import { HexadecimalLiteralContext } from "./EParser.js";
import { CharacterLiteralContext } from "./EParser.js";
import { DateLiteralContext } from "./EParser.js";
import { TimeLiteralContext } from "./EParser.js";
import { TextLiteralContext } from "./EParser.js";
import { DecimalLiteralContext } from "./EParser.js";
import { DateTimeLiteralContext } from "./EParser.js";
import { BooleanLiteralContext } from "./EParser.js";
import { PeriodLiteralContext } from "./EParser.js";
import { VersionLiteralContext } from "./EParser.js";
import { UUIDLiteralContext } from "./EParser.js";
import { SymbolLiteralContext } from "./EParser.js";
import { TypeLiteralContext } from "./EParser.js";
import { NullLiteralContext } from "./EParser.js";
import { Literal_list_literalContext } from "./EParser.js";
import { This_expressionContext } from "./EParser.js";
import { Super_expressionContext } from "./EParser.js";
import { Parenthesis_expressionContext } from "./EParser.js";
import { Literal_expressionContext } from "./EParser.js";
import { Collection_literalContext } from "./EParser.js";
import { Tuple_literalContext } from "./EParser.js";
import { Dict_literalContext } from "./EParser.js";
import { Document_literalContext } from "./EParser.js";
import { Expression_tupleContext } from "./EParser.js";
import { Doc_entry_listContext } from "./EParser.js";
import { Doc_entryContext } from "./EParser.js";
import { DocKeyIdentifierContext } from "./EParser.js";
import { DocKeyTextContext } from "./EParser.js";
import { Dict_entry_listContext } from "./EParser.js";
import { Dict_entryContext } from "./EParser.js";
import { DictKeyIdentifierContext } from "./EParser.js";
import { DictKeyTextContext } from "./EParser.js";
import { SliceFirstAndLastContext } from "./EParser.js";
import { SliceFirstOnlyContext } from "./EParser.js";
import { SliceLastOnlyContext } from "./EParser.js";
import { Assign_variable_statementContext } from "./EParser.js";
import { ChildInstanceContext } from "./EParser.js";
import { RootInstanceContext } from "./EParser.js";
import { IsATypeExpressionContext } from "./EParser.js";
import { IsOtherExpressionContext } from "./EParser.js";
import { MetadataContext } from "./EParser.js";
import { ArrowExpressionBodyContext } from "./EParser.js";
import { ArrowStatementsBodyContext } from "./EParser.js";
import { Arrow_prefixContext } from "./EParser.js";
import { ArrowSingleArgContext } from "./EParser.js";
import { ArrowListArgContext } from "./EParser.js";
import { Sorted_keyContext } from "./EParser.js";
import { Read_blob_expressionContext } from "./EParser.js";
import { Read_all_expressionContext } from "./EParser.js";
import { Read_one_expressionContext } from "./EParser.js";
import { Order_by_listContext } from "./EParser.js";
import { Order_byContext } from "./EParser.js";
import { OperatorPlusContext } from "./EParser.js";
import { OperatorMinusContext } from "./EParser.js";
import { OperatorMultiplyContext } from "./EParser.js";
import { OperatorDivideContext } from "./EParser.js";
import { OperatorIDivideContext } from "./EParser.js";
import { OperatorModuloContext } from "./EParser.js";
import { KeywordContext } from "./EParser.js";
import { New_tokenContext } from "./EParser.js";
import { Key_tokenContext } from "./EParser.js";
import { Module_tokenContext } from "./EParser.js";
import { Value_tokenContext } from "./EParser.js";
import { Symbols_tokenContext } from "./EParser.js";
import { AssignContext } from "./EParser.js";
import { MultiplyContext } from "./EParser.js";
import { DivideContext } from "./EParser.js";
import { IdivideContext } from "./EParser.js";
import { ModuloContext } from "./EParser.js";
import { JavascriptReturnStatementContext } from "./EParser.js";
import { JavascriptStatementContext } from "./EParser.js";
import { JavascriptSelectorExpressionContext } from "./EParser.js";
import { JavascriptPrimaryExpressionContext } from "./EParser.js";
import { Javascript_primary_expressionContext } from "./EParser.js";
import { Javascript_this_expressionContext } from "./EParser.js";
import { Javascript_new_expressionContext } from "./EParser.js";
import { JavascriptMethodExpressionContext } from "./EParser.js";
import { JavascriptMemberExpressionContext } from "./EParser.js";
import { JavascriptItemExpressionContext } from "./EParser.js";
import { Javascript_method_expressionContext } from "./EParser.js";
import { JavascriptArgumentListContext } from "./EParser.js";
import { JavascriptArgumentListItemContext } from "./EParser.js";
import { Javascript_item_expressionContext } from "./EParser.js";
import { Javascript_parenthesis_expressionContext } from "./EParser.js";
import { Javascript_identifier_expressionContext } from "./EParser.js";
import { JavascriptIntegerLiteralContext } from "./EParser.js";
import { JavascriptDecimalLiteralContext } from "./EParser.js";
import { JavascriptTextLiteralContext } from "./EParser.js";
import { JavascriptBooleanLiteralContext } from "./EParser.js";
import { JavascriptCharacterLiteralContext } from "./EParser.js";
import { Javascript_identifierContext } from "./EParser.js";
import { PythonReturnStatementContext } from "./EParser.js";
import { PythonStatementContext } from "./EParser.js";
import { PythonSelectorExpressionContext } from "./EParser.js";
import { PythonPrimaryExpressionContext } from "./EParser.js";
import { PythonSelfExpressionContext } from "./EParser.js";
import { PythonParenthesisExpressionContext } from "./EParser.js";
import { PythonIdentifierExpressionContext } from "./EParser.js";
import { PythonLiteralExpressionContext } from "./EParser.js";
import { PythonGlobalMethodExpressionContext } from "./EParser.js";
import { Python_self_expressionContext } from "./EParser.js";
import { PythonMethodExpressionContext } from "./EParser.js";
import { PythonItemExpressionContext } from "./EParser.js";
import { Python_method_expressionContext } from "./EParser.js";
import { PythonOrdinalOnlyArgumentListContext } from "./EParser.js";
import { PythonNamedOnlyArgumentListContext } from "./EParser.js";
import { PythonArgumentListContext } from "./EParser.js";
import { PythonOrdinalArgumentListContext } from "./EParser.js";
import { PythonOrdinalArgumentListItemContext } from "./EParser.js";
import { PythonNamedArgumentListContext } from "./EParser.js";
import { PythonNamedArgumentListItemContext } from "./EParser.js";
import { Python_parenthesis_expressionContext } from "./EParser.js";
import { PythonChildIdentifierContext } from "./EParser.js";
import { PythonPromptoIdentifierContext } from "./EParser.js";
import { PythonIdentifierContext } from "./EParser.js";
import { PythonIntegerLiteralContext } from "./EParser.js";
import { PythonDecimalLiteralContext } from "./EParser.js";
import { PythonTextLiteralContext } from "./EParser.js";
import { PythonBooleanLiteralContext } from "./EParser.js";
import { PythonCharacterLiteralContext } from "./EParser.js";
import { Python_identifierContext } from "./EParser.js";
import { JavaReturnStatementContext } from "./EParser.js";
import { JavaStatementContext } from "./EParser.js";
import { JavaSelectorExpressionContext } from "./EParser.js";
import { JavaPrimaryExpressionContext } from "./EParser.js";
import { Java_primary_expressionContext } from "./EParser.js";
import { Java_this_expressionContext } from "./EParser.js";
import { Java_new_expressionContext } from "./EParser.js";
import { JavaMethodExpressionContext } from "./EParser.js";
import { JavaItemExpressionContext } from "./EParser.js";
import { Java_method_expressionContext } from "./EParser.js";
import { JavaArgumentListItemContext } from "./EParser.js";
import { JavaArgumentListContext } from "./EParser.js";
import { Java_item_expressionContext } from "./EParser.js";
import { Java_parenthesis_expressionContext } from "./EParser.js";
import { JavaIdentifierContext } from "./EParser.js";
import { JavaChildIdentifierContext } from "./EParser.js";
import { JavaClassIdentifierContext } from "./EParser.js";
import { JavaChildClassIdentifierContext } from "./EParser.js";
import { JavaIntegerLiteralContext } from "./EParser.js";
import { JavaDecimalLiteralContext } from "./EParser.js";
import { JavaTextLiteralContext } from "./EParser.js";
import { JavaBooleanLiteralContext } from "./EParser.js";
import { JavaCharacterLiteralContext } from "./EParser.js";
import { Java_identifierContext } from "./EParser.js";
import { CSharpReturnStatementContext } from "./EParser.js";
import { CSharpStatementContext } from "./EParser.js";
import { CSharpSelectorExpressionContext } from "./EParser.js";
import { CSharpPrimaryExpressionContext } from "./EParser.js";
import { Csharp_primary_expressionContext } from "./EParser.js";
import { Csharp_this_expressionContext } from "./EParser.js";
import { Csharp_new_expressionContext } from "./EParser.js";
import { CSharpMethodExpressionContext } from "./EParser.js";
import { CSharpItemExpressionContext } from "./EParser.js";
import { Csharp_method_expressionContext } from "./EParser.js";
import { CSharpArgumentListContext } from "./EParser.js";
import { CSharpArgumentListItemContext } from "./EParser.js";
import { Csharp_item_expressionContext } from "./EParser.js";
import { Csharp_parenthesis_expressionContext } from "./EParser.js";
import { CSharpIdentifierContext } from "./EParser.js";
import { CSharpChildIdentifierContext } from "./EParser.js";
import { CSharpPromptoIdentifierContext } from "./EParser.js";
import { CSharpIntegerLiteralContext } from "./EParser.js";
import { CSharpDecimalLiteralContext } from "./EParser.js";
import { CSharpTextLiteralContext } from "./EParser.js";
import { CSharpBooleanLiteralContext } from "./EParser.js";
import { CSharpCharacterLiteralContext } from "./EParser.js";
import { Csharp_identifierContext } from "./EParser.js";
import { Jsx_expressionContext } from "./EParser.js";
import { JsxSelfClosingContext } from "./EParser.js";
import { JsxElementContext } from "./EParser.js";
import { Jsx_fragmentContext } from "./EParser.js";
import { Jsx_fragment_startContext } from "./EParser.js";
import { Jsx_fragment_endContext } from "./EParser.js";
import { Jsx_self_closingContext } from "./EParser.js";
import { Jsx_openingContext } from "./EParser.js";
import { Jsx_closingContext } from "./EParser.js";
import { Jsx_element_nameContext } from "./EParser.js";
import { Jsx_identifierContext } from "./EParser.js";
import { Jsx_attributeContext } from "./EParser.js";
import { JsxLiteralContext } from "./EParser.js";
import { JsxValueContext } from "./EParser.js";
import { Jsx_childrenContext } from "./EParser.js";
import { JsxTextContext } from "./EParser.js";
import { JsxChildContext } from "./EParser.js";
import { JsxCodeContext } from "./EParser.js";
import { Jsx_textContext } from "./EParser.js";
import { Jsx_charContext } from "./EParser.js";
import { Css_expressionContext } from "./EParser.js";
import { Css_fieldContext } from "./EParser.js";
import { Css_identifierContext } from "./EParser.js";
import { CssValueContext } from "./EParser.js";
import { CssTextContext } from "./EParser.js";
import { Css_textContext } from "./EParser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `EParser`.
 */
export default class EParserListener extends antlr4.tree.ParseTreeListener {
	/**
	 * Enter a parse tree produced by `EParser.enum_category_declaration`.
	 * @param ctx the parse tree
	 */
	enterEnum_category_declaration?: (ctx: Enum_category_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.enum_category_declaration`.
	 * @param ctx the parse tree
	 */
	exitEnum_category_declaration?: (ctx: Enum_category_declarationContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.enum_native_declaration`.
	 * @param ctx the parse tree
	 */
	enterEnum_native_declaration?: (ctx: Enum_native_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.enum_native_declaration`.
	 * @param ctx the parse tree
	 */
	exitEnum_native_declaration?: (ctx: Enum_native_declarationContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.native_symbol`.
	 * @param ctx the parse tree
	 */
	enterNative_symbol?: (ctx: Native_symbolContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.native_symbol`.
	 * @param ctx the parse tree
	 */
	exitNative_symbol?: (ctx: Native_symbolContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.category_symbol`.
	 * @param ctx the parse tree
	 */
	enterCategory_symbol?: (ctx: Category_symbolContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.category_symbol`.
	 * @param ctx the parse tree
	 */
	exitCategory_symbol?: (ctx: Category_symbolContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.attribute_declaration`.
	 * @param ctx the parse tree
	 */
	enterAttribute_declaration?: (ctx: Attribute_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.attribute_declaration`.
	 * @param ctx the parse tree
	 */
	exitAttribute_declaration?: (ctx: Attribute_declarationContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.concrete_widget_declaration`.
	 * @param ctx the parse tree
	 */
	enterConcrete_widget_declaration?: (ctx: Concrete_widget_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.concrete_widget_declaration`.
	 * @param ctx the parse tree
	 */
	exitConcrete_widget_declaration?: (ctx: Concrete_widget_declarationContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.native_widget_declaration`.
	 * @param ctx the parse tree
	 */
	enterNative_widget_declaration?: (ctx: Native_widget_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.native_widget_declaration`.
	 * @param ctx the parse tree
	 */
	exitNative_widget_declaration?: (ctx: Native_widget_declarationContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.concrete_category_declaration`.
	 * @param ctx the parse tree
	 */
	enterConcrete_category_declaration?: (ctx: Concrete_category_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.concrete_category_declaration`.
	 * @param ctx the parse tree
	 */
	exitConcrete_category_declaration?: (ctx: Concrete_category_declarationContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.singleton_category_declaration`.
	 * @param ctx the parse tree
	 */
	enterSingleton_category_declaration?: (ctx: Singleton_category_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.singleton_category_declaration`.
	 * @param ctx the parse tree
	 */
	exitSingleton_category_declaration?: (ctx: Singleton_category_declarationContext) => void;
	/**
	 * Enter a parse tree produced by the `DerivedList`
	 * labeled alternative in `EParser.derived_list`.
	 * @param ctx the parse tree
	 */
	enterDerivedList?: (ctx: DerivedListContext) => void;
	/**
	 * Exit a parse tree produced by the `DerivedList`
	 * labeled alternative in `EParser.derived_list`.
	 * @param ctx the parse tree
	 */
	exitDerivedList?: (ctx: DerivedListContext) => void;
	/**
	 * Enter a parse tree produced by the `DerivedListItem`
	 * labeled alternative in `EParser.derived_list`.
	 * @param ctx the parse tree
	 */
	enterDerivedListItem?: (ctx: DerivedListItemContext) => void;
	/**
	 * Exit a parse tree produced by the `DerivedListItem`
	 * labeled alternative in `EParser.derived_list`.
	 * @param ctx the parse tree
	 */
	exitDerivedListItem?: (ctx: DerivedListItemContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.operator_method_declaration`.
	 * @param ctx the parse tree
	 */
	enterOperator_method_declaration?: (ctx: Operator_method_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.operator_method_declaration`.
	 * @param ctx the parse tree
	 */
	exitOperator_method_declaration?: (ctx: Operator_method_declarationContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.setter_method_declaration`.
	 * @param ctx the parse tree
	 */
	enterSetter_method_declaration?: (ctx: Setter_method_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.setter_method_declaration`.
	 * @param ctx the parse tree
	 */
	exitSetter_method_declaration?: (ctx: Setter_method_declarationContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.native_setter_declaration`.
	 * @param ctx the parse tree
	 */
	enterNative_setter_declaration?: (ctx: Native_setter_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.native_setter_declaration`.
	 * @param ctx the parse tree
	 */
	exitNative_setter_declaration?: (ctx: Native_setter_declarationContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.getter_method_declaration`.
	 * @param ctx the parse tree
	 */
	enterGetter_method_declaration?: (ctx: Getter_method_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.getter_method_declaration`.
	 * @param ctx the parse tree
	 */
	exitGetter_method_declaration?: (ctx: Getter_method_declarationContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.native_getter_declaration`.
	 * @param ctx the parse tree
	 */
	enterNative_getter_declaration?: (ctx: Native_getter_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.native_getter_declaration`.
	 * @param ctx the parse tree
	 */
	exitNative_getter_declaration?: (ctx: Native_getter_declarationContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.native_category_declaration`.
	 * @param ctx the parse tree
	 */
	enterNative_category_declaration?: (ctx: Native_category_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.native_category_declaration`.
	 * @param ctx the parse tree
	 */
	exitNative_category_declaration?: (ctx: Native_category_declarationContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.native_resource_declaration`.
	 * @param ctx the parse tree
	 */
	enterNative_resource_declaration?: (ctx: Native_resource_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.native_resource_declaration`.
	 * @param ctx the parse tree
	 */
	exitNative_resource_declaration?: (ctx: Native_resource_declarationContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.native_category_bindings`.
	 * @param ctx the parse tree
	 */
	enterNative_category_bindings?: (ctx: Native_category_bindingsContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.native_category_bindings`.
	 * @param ctx the parse tree
	 */
	exitNative_category_bindings?: (ctx: Native_category_bindingsContext) => void;
	/**
	 * Enter a parse tree produced by the `NativeCategoryBindingListItem`
	 * labeled alternative in `EParser.native_category_binding_list`.
	 * @param ctx the parse tree
	 */
	enterNativeCategoryBindingListItem?: (ctx: NativeCategoryBindingListItemContext) => void;
	/**
	 * Exit a parse tree produced by the `NativeCategoryBindingListItem`
	 * labeled alternative in `EParser.native_category_binding_list`.
	 * @param ctx the parse tree
	 */
	exitNativeCategoryBindingListItem?: (ctx: NativeCategoryBindingListItemContext) => void;
	/**
	 * Enter a parse tree produced by the `NativeCategoryBindingList`
	 * labeled alternative in `EParser.native_category_binding_list`.
	 * @param ctx the parse tree
	 */
	enterNativeCategoryBindingList?: (ctx: NativeCategoryBindingListContext) => void;
	/**
	 * Exit a parse tree produced by the `NativeCategoryBindingList`
	 * labeled alternative in `EParser.native_category_binding_list`.
	 * @param ctx the parse tree
	 */
	exitNativeCategoryBindingList?: (ctx: NativeCategoryBindingListContext) => void;
	/**
	 * Enter a parse tree produced by the `AttributeList`
	 * labeled alternative in `EParser.attribute_list`.
	 * @param ctx the parse tree
	 */
	enterAttributeList?: (ctx: AttributeListContext) => void;
	/**
	 * Exit a parse tree produced by the `AttributeList`
	 * labeled alternative in `EParser.attribute_list`.
	 * @param ctx the parse tree
	 */
	exitAttributeList?: (ctx: AttributeListContext) => void;
	/**
	 * Enter a parse tree produced by the `AttributeListItem`
	 * labeled alternative in `EParser.attribute_list`.
	 * @param ctx the parse tree
	 */
	enterAttributeListItem?: (ctx: AttributeListItemContext) => void;
	/**
	 * Exit a parse tree produced by the `AttributeListItem`
	 * labeled alternative in `EParser.attribute_list`.
	 * @param ctx the parse tree
	 */
	exitAttributeListItem?: (ctx: AttributeListItemContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.abstract_global_method_declaration`.
	 * @param ctx the parse tree
	 */
	enterAbstract_global_method_declaration?: (ctx: Abstract_global_method_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.abstract_global_method_declaration`.
	 * @param ctx the parse tree
	 */
	exitAbstract_global_method_declaration?: (ctx: Abstract_global_method_declarationContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.abstract_member_method_declaration`.
	 * @param ctx the parse tree
	 */
	enterAbstract_member_method_declaration?: (ctx: Abstract_member_method_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.abstract_member_method_declaration`.
	 * @param ctx the parse tree
	 */
	exitAbstract_member_method_declaration?: (ctx: Abstract_member_method_declarationContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.concrete_method_declaration`.
	 * @param ctx the parse tree
	 */
	enterConcrete_method_declaration?: (ctx: Concrete_method_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.concrete_method_declaration`.
	 * @param ctx the parse tree
	 */
	exitConcrete_method_declaration?: (ctx: Concrete_method_declarationContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.native_method_declaration`.
	 * @param ctx the parse tree
	 */
	enterNative_method_declaration?: (ctx: Native_method_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.native_method_declaration`.
	 * @param ctx the parse tree
	 */
	exitNative_method_declaration?: (ctx: Native_method_declarationContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.test_method_declaration`.
	 * @param ctx the parse tree
	 */
	enterTest_method_declaration?: (ctx: Test_method_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.test_method_declaration`.
	 * @param ctx the parse tree
	 */
	exitTest_method_declaration?: (ctx: Test_method_declarationContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.assertion`.
	 * @param ctx the parse tree
	 */
	enterAssertion?: (ctx: AssertionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.assertion`.
	 * @param ctx the parse tree
	 */
	exitAssertion?: (ctx: AssertionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.full_argument_list`.
	 * @param ctx the parse tree
	 */
	enterFull_argument_list?: (ctx: Full_argument_listContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.full_argument_list`.
	 * @param ctx the parse tree
	 */
	exitFull_argument_list?: (ctx: Full_argument_listContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.typed_argument`.
	 * @param ctx the parse tree
	 */
	enterTyped_argument?: (ctx: Typed_argumentContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.typed_argument`.
	 * @param ctx the parse tree
	 */
	exitTyped_argument?: (ctx: Typed_argumentContext) => void;
	/**
	 * Enter a parse tree produced by the `AssignInstanceStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	enterAssignInstanceStatement?: (ctx: AssignInstanceStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `AssignInstanceStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	exitAssignInstanceStatement?: (ctx: AssignInstanceStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `MethodCallStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	enterMethodCallStatement?: (ctx: MethodCallStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `MethodCallStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	exitMethodCallStatement?: (ctx: MethodCallStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `AssignTupleStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	enterAssignTupleStatement?: (ctx: AssignTupleStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `AssignTupleStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	exitAssignTupleStatement?: (ctx: AssignTupleStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `StoreStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	enterStoreStatement?: (ctx: StoreStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `StoreStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	exitStoreStatement?: (ctx: StoreStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `FetchStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	enterFetchStatement?: (ctx: FetchStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `FetchStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	exitFetchStatement?: (ctx: FetchStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `ReadStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	enterReadStatement?: (ctx: ReadStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `ReadStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	exitReadStatement?: (ctx: ReadStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `FlushStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	enterFlushStatement?: (ctx: FlushStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `FlushStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	exitFlushStatement?: (ctx: FlushStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `BreakStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	enterBreakStatement?: (ctx: BreakStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `BreakStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	exitBreakStatement?: (ctx: BreakStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `ReturnStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	enterReturnStatement?: (ctx: ReturnStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `ReturnStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	exitReturnStatement?: (ctx: ReturnStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `IfStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	enterIfStatement?: (ctx: IfStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `IfStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	exitIfStatement?: (ctx: IfStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `SwitchStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	enterSwitchStatement?: (ctx: SwitchStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `SwitchStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	exitSwitchStatement?: (ctx: SwitchStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `ForEachStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	enterForEachStatement?: (ctx: ForEachStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `ForEachStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	exitForEachStatement?: (ctx: ForEachStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `WhileStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	enterWhileStatement?: (ctx: WhileStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `WhileStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	exitWhileStatement?: (ctx: WhileStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `DoWhileStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	enterDoWhileStatement?: (ctx: DoWhileStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `DoWhileStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	exitDoWhileStatement?: (ctx: DoWhileStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `RaiseStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	enterRaiseStatement?: (ctx: RaiseStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `RaiseStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	exitRaiseStatement?: (ctx: RaiseStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `TryStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	enterTryStatement?: (ctx: TryStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `TryStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	exitTryStatement?: (ctx: TryStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `WriteStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	enterWriteStatement?: (ctx: WriteStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `WriteStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	exitWriteStatement?: (ctx: WriteStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `WithResourceStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	enterWithResourceStatement?: (ctx: WithResourceStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `WithResourceStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	exitWithResourceStatement?: (ctx: WithResourceStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `WithSingletonStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	enterWithSingletonStatement?: (ctx: WithSingletonStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `WithSingletonStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	exitWithSingletonStatement?: (ctx: WithSingletonStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `ClosureStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	enterClosureStatement?: (ctx: ClosureStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `ClosureStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	exitClosureStatement?: (ctx: ClosureStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `CommentStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	enterCommentStatement?: (ctx: CommentStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `CommentStatement`
	 * labeled alternative in `EParser.statement`.
	 * @param ctx the parse tree
	 */
	exitCommentStatement?: (ctx: CommentStatementContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.flush_statement`.
	 * @param ctx the parse tree
	 */
	enterFlush_statement?: (ctx: Flush_statementContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.flush_statement`.
	 * @param ctx the parse tree
	 */
	exitFlush_statement?: (ctx: Flush_statementContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.store_statement`.
	 * @param ctx the parse tree
	 */
	enterStore_statement?: (ctx: Store_statementContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.store_statement`.
	 * @param ctx the parse tree
	 */
	exitStore_statement?: (ctx: Store_statementContext) => void;
	/**
	 * Enter a parse tree produced by the `UnresolvedWithArgsStatement`
	 * labeled alternative in `EParser.method_call_statement`.
	 * @param ctx the parse tree
	 */
	enterUnresolvedWithArgsStatement?: (ctx: UnresolvedWithArgsStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `UnresolvedWithArgsStatement`
	 * labeled alternative in `EParser.method_call_statement`.
	 * @param ctx the parse tree
	 */
	exitUnresolvedWithArgsStatement?: (ctx: UnresolvedWithArgsStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `InvokeStatement`
	 * labeled alternative in `EParser.method_call_statement`.
	 * @param ctx the parse tree
	 */
	enterInvokeStatement?: (ctx: InvokeStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `InvokeStatement`
	 * labeled alternative in `EParser.method_call_statement`.
	 * @param ctx the parse tree
	 */
	exitInvokeStatement?: (ctx: InvokeStatementContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.with_resource_statement`.
	 * @param ctx the parse tree
	 */
	enterWith_resource_statement?: (ctx: With_resource_statementContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.with_resource_statement`.
	 * @param ctx the parse tree
	 */
	exitWith_resource_statement?: (ctx: With_resource_statementContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.with_singleton_statement`.
	 * @param ctx the parse tree
	 */
	enterWith_singleton_statement?: (ctx: With_singleton_statementContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.with_singleton_statement`.
	 * @param ctx the parse tree
	 */
	exitWith_singleton_statement?: (ctx: With_singleton_statementContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.switch_statement`.
	 * @param ctx the parse tree
	 */
	enterSwitch_statement?: (ctx: Switch_statementContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.switch_statement`.
	 * @param ctx the parse tree
	 */
	exitSwitch_statement?: (ctx: Switch_statementContext) => void;
	/**
	 * Enter a parse tree produced by the `AtomicSwitchCase`
	 * labeled alternative in `EParser.switch_case_statement`.
	 * @param ctx the parse tree
	 */
	enterAtomicSwitchCase?: (ctx: AtomicSwitchCaseContext) => void;
	/**
	 * Exit a parse tree produced by the `AtomicSwitchCase`
	 * labeled alternative in `EParser.switch_case_statement`.
	 * @param ctx the parse tree
	 */
	exitAtomicSwitchCase?: (ctx: AtomicSwitchCaseContext) => void;
	/**
	 * Enter a parse tree produced by the `CollectionSwitchCase`
	 * labeled alternative in `EParser.switch_case_statement`.
	 * @param ctx the parse tree
	 */
	enterCollectionSwitchCase?: (ctx: CollectionSwitchCaseContext) => void;
	/**
	 * Exit a parse tree produced by the `CollectionSwitchCase`
	 * labeled alternative in `EParser.switch_case_statement`.
	 * @param ctx the parse tree
	 */
	exitCollectionSwitchCase?: (ctx: CollectionSwitchCaseContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.for_each_statement`.
	 * @param ctx the parse tree
	 */
	enterFor_each_statement?: (ctx: For_each_statementContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.for_each_statement`.
	 * @param ctx the parse tree
	 */
	exitFor_each_statement?: (ctx: For_each_statementContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.do_while_statement`.
	 * @param ctx the parse tree
	 */
	enterDo_while_statement?: (ctx: Do_while_statementContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.do_while_statement`.
	 * @param ctx the parse tree
	 */
	exitDo_while_statement?: (ctx: Do_while_statementContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.while_statement`.
	 * @param ctx the parse tree
	 */
	enterWhile_statement?: (ctx: While_statementContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.while_statement`.
	 * @param ctx the parse tree
	 */
	exitWhile_statement?: (ctx: While_statementContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.if_statement`.
	 * @param ctx the parse tree
	 */
	enterIf_statement?: (ctx: If_statementContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.if_statement`.
	 * @param ctx the parse tree
	 */
	exitIf_statement?: (ctx: If_statementContext) => void;
	/**
	 * Enter a parse tree produced by the `ElseIfStatementList`
	 * labeled alternative in `EParser.else_if_statement_list`.
	 * @param ctx the parse tree
	 */
	enterElseIfStatementList?: (ctx: ElseIfStatementListContext) => void;
	/**
	 * Exit a parse tree produced by the `ElseIfStatementList`
	 * labeled alternative in `EParser.else_if_statement_list`.
	 * @param ctx the parse tree
	 */
	exitElseIfStatementList?: (ctx: ElseIfStatementListContext) => void;
	/**
	 * Enter a parse tree produced by the `ElseIfStatementListItem`
	 * labeled alternative in `EParser.else_if_statement_list`.
	 * @param ctx the parse tree
	 */
	enterElseIfStatementListItem?: (ctx: ElseIfStatementListItemContext) => void;
	/**
	 * Exit a parse tree produced by the `ElseIfStatementListItem`
	 * labeled alternative in `EParser.else_if_statement_list`.
	 * @param ctx the parse tree
	 */
	exitElseIfStatementListItem?: (ctx: ElseIfStatementListItemContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.raise_statement`.
	 * @param ctx the parse tree
	 */
	enterRaise_statement?: (ctx: Raise_statementContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.raise_statement`.
	 * @param ctx the parse tree
	 */
	exitRaise_statement?: (ctx: Raise_statementContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.try_statement`.
	 * @param ctx the parse tree
	 */
	enterTry_statement?: (ctx: Try_statementContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.try_statement`.
	 * @param ctx the parse tree
	 */
	exitTry_statement?: (ctx: Try_statementContext) => void;
	/**
	 * Enter a parse tree produced by the `CatchAtomicStatement`
	 * labeled alternative in `EParser.catch_statement`.
	 * @param ctx the parse tree
	 */
	enterCatchAtomicStatement?: (ctx: CatchAtomicStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `CatchAtomicStatement`
	 * labeled alternative in `EParser.catch_statement`.
	 * @param ctx the parse tree
	 */
	exitCatchAtomicStatement?: (ctx: CatchAtomicStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `CatchCollectionStatement`
	 * labeled alternative in `EParser.catch_statement`.
	 * @param ctx the parse tree
	 */
	enterCatchCollectionStatement?: (ctx: CatchCollectionStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `CatchCollectionStatement`
	 * labeled alternative in `EParser.catch_statement`.
	 * @param ctx the parse tree
	 */
	exitCatchCollectionStatement?: (ctx: CatchCollectionStatementContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.break_statement`.
	 * @param ctx the parse tree
	 */
	enterBreak_statement?: (ctx: Break_statementContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.break_statement`.
	 * @param ctx the parse tree
	 */
	exitBreak_statement?: (ctx: Break_statementContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.return_statement`.
	 * @param ctx the parse tree
	 */
	enterReturn_statement?: (ctx: Return_statementContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.return_statement`.
	 * @param ctx the parse tree
	 */
	exitReturn_statement?: (ctx: Return_statementContext) => void;
	/**
	 * Enter a parse tree produced by the `IntDivideExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterIntDivideExpression?: (ctx: IntDivideExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `IntDivideExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitIntDivideExpression?: (ctx: IntDivideExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `HasAnyExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterHasAnyExpression?: (ctx: HasAnyExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `HasAnyExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitHasAnyExpression?: (ctx: HasAnyExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `HasExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterHasExpression?: (ctx: HasExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `HasExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitHasExpression?: (ctx: HasExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `TernaryExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterTernaryExpression?: (ctx: TernaryExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `TernaryExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitTernaryExpression?: (ctx: TernaryExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `InExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterInExpression?: (ctx: InExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `InExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitInExpression?: (ctx: InExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `DocumentExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterDocumentExpression?: (ctx: DocumentExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `DocumentExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitDocumentExpression?: (ctx: DocumentExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `JsxExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterJsxExpression?: (ctx: JsxExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `JsxExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitJsxExpression?: (ctx: JsxExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `NotExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterNotExpression?: (ctx: NotExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `NotExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitNotExpression?: (ctx: NotExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `InvocationExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterInvocationExpression?: (ctx: InvocationExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `InvocationExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitInvocationExpression?: (ctx: InvocationExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `CompareExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterCompareExpression?: (ctx: CompareExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `CompareExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitCompareExpression?: (ctx: CompareExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `OrExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterOrExpression?: (ctx: OrExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `OrExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitOrExpression?: (ctx: OrExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `CodeExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterCodeExpression?: (ctx: CodeExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `CodeExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitCodeExpression?: (ctx: CodeExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `AmbiguousExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterAmbiguousExpression?: (ctx: AmbiguousExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `AmbiguousExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitAmbiguousExpression?: (ctx: AmbiguousExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `ReadOneExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterReadOneExpression?: (ctx: ReadOneExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ReadOneExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitReadOneExpression?: (ctx: ReadOneExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `AndExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterAndExpression?: (ctx: AndExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `AndExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitAndExpression?: (ctx: AndExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `ArrowExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterArrowExpression?: (ctx: ArrowExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ArrowExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitArrowExpression?: (ctx: ArrowExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `MethodCallExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterMethodCallExpression?: (ctx: MethodCallExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `MethodCallExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitMethodCallExpression?: (ctx: MethodCallExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `FetchExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterFetchExpression?: (ctx: FetchExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `FetchExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitFetchExpression?: (ctx: FetchExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `ClosureExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterClosureExpression?: (ctx: ClosureExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ClosureExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitClosureExpression?: (ctx: ClosureExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `SortedExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterSortedExpression?: (ctx: SortedExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `SortedExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitSortedExpression?: (ctx: SortedExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `BlobExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterBlobExpression?: (ctx: BlobExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `BlobExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitBlobExpression?: (ctx: BlobExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `ContainsExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterContainsExpression?: (ctx: ContainsExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ContainsExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitContainsExpression?: (ctx: ContainsExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `FilteredListExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterFilteredListExpression?: (ctx: FilteredListExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `FilteredListExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitFilteredListExpression?: (ctx: FilteredListExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `ConstructorExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterConstructorExpression?: (ctx: ConstructorExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ConstructorExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitConstructorExpression?: (ctx: ConstructorExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `ReadBlobExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterReadBlobExpression?: (ctx: ReadBlobExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ReadBlobExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitReadBlobExpression?: (ctx: ReadBlobExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `MultiplyExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterMultiplyExpression?: (ctx: MultiplyExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `MultiplyExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitMultiplyExpression?: (ctx: MultiplyExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `ExecuteExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterExecuteExpression?: (ctx: ExecuteExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ExecuteExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitExecuteExpression?: (ctx: ExecuteExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `IteratorExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterIteratorExpression?: (ctx: IteratorExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `IteratorExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitIteratorExpression?: (ctx: IteratorExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `UnresolvedExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterUnresolvedExpression?: (ctx: UnresolvedExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `UnresolvedExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitUnresolvedExpression?: (ctx: UnresolvedExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `DivideExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterDivideExpression?: (ctx: DivideExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `DivideExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitDivideExpression?: (ctx: DivideExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `IsExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterIsExpression?: (ctx: IsExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `IsExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitIsExpression?: (ctx: IsExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `MinusExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterMinusExpression?: (ctx: MinusExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `MinusExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitMinusExpression?: (ctx: MinusExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `AddExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterAddExpression?: (ctx: AddExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `AddExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitAddExpression?: (ctx: AddExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `HasAllExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterHasAllExpression?: (ctx: HasAllExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `HasAllExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitHasAllExpression?: (ctx: HasAllExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `InstanceExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterInstanceExpression?: (ctx: InstanceExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `InstanceExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitInstanceExpression?: (ctx: InstanceExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `MutableInstanceExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterMutableInstanceExpression?: (ctx: MutableInstanceExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `MutableInstanceExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitMutableInstanceExpression?: (ctx: MutableInstanceExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `ReadAllExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterReadAllExpression?: (ctx: ReadAllExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ReadAllExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitReadAllExpression?: (ctx: ReadAllExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `CssExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterCssExpression?: (ctx: CssExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `CssExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitCssExpression?: (ctx: CssExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `CastExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterCastExpression?: (ctx: CastExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `CastExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitCastExpression?: (ctx: CastExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `ModuloExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterModuloExpression?: (ctx: ModuloExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ModuloExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitModuloExpression?: (ctx: ModuloExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `EqualsExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	enterEqualsExpression?: (ctx: EqualsExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `EqualsExpression`
	 * labeled alternative in `EParser.expression`.
	 * @param ctx the parse tree
	 */
	exitEqualsExpression?: (ctx: EqualsExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `ArrowFilterExpression`
	 * labeled alternative in `EParser.filter_expression`.
	 * @param ctx the parse tree
	 */
	enterArrowFilterExpression?: (ctx: ArrowFilterExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ArrowFilterExpression`
	 * labeled alternative in `EParser.filter_expression`.
	 * @param ctx the parse tree
	 */
	exitArrowFilterExpression?: (ctx: ArrowFilterExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `ExplicitFilterExpression`
	 * labeled alternative in `EParser.filter_expression`.
	 * @param ctx the parse tree
	 */
	enterExplicitFilterExpression?: (ctx: ExplicitFilterExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ExplicitFilterExpression`
	 * labeled alternative in `EParser.filter_expression`.
	 * @param ctx the parse tree
	 */
	exitExplicitFilterExpression?: (ctx: ExplicitFilterExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `OtherFilterExpression`
	 * labeled alternative in `EParser.filter_expression`.
	 * @param ctx the parse tree
	 */
	enterOtherFilterExpression?: (ctx: OtherFilterExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `OtherFilterExpression`
	 * labeled alternative in `EParser.filter_expression`.
	 * @param ctx the parse tree
	 */
	exitOtherFilterExpression?: (ctx: OtherFilterExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `UnresolvedSelector`
	 * labeled alternative in `EParser.unresolved_expression`.
	 * @param ctx the parse tree
	 */
	enterUnresolvedSelector?: (ctx: UnresolvedSelectorContext) => void;
	/**
	 * Exit a parse tree produced by the `UnresolvedSelector`
	 * labeled alternative in `EParser.unresolved_expression`.
	 * @param ctx the parse tree
	 */
	exitUnresolvedSelector?: (ctx: UnresolvedSelectorContext) => void;
	/**
	 * Enter a parse tree produced by the `UnresolvedIdentifier`
	 * labeled alternative in `EParser.unresolved_expression`.
	 * @param ctx the parse tree
	 */
	enterUnresolvedIdentifier?: (ctx: UnresolvedIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by the `UnresolvedIdentifier`
	 * labeled alternative in `EParser.unresolved_expression`.
	 * @param ctx the parse tree
	 */
	exitUnresolvedIdentifier?: (ctx: UnresolvedIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.unresolved_selector`.
	 * @param ctx the parse tree
	 */
	enterUnresolved_selector?: (ctx: Unresolved_selectorContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.unresolved_selector`.
	 * @param ctx the parse tree
	 */
	exitUnresolved_selector?: (ctx: Unresolved_selectorContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.invocation_expression`.
	 * @param ctx the parse tree
	 */
	enterInvocation_expression?: (ctx: Invocation_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.invocation_expression`.
	 * @param ctx the parse tree
	 */
	exitInvocation_expression?: (ctx: Invocation_expressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.invocation_trailer`.
	 * @param ctx the parse tree
	 */
	enterInvocation_trailer?: (ctx: Invocation_trailerContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.invocation_trailer`.
	 * @param ctx the parse tree
	 */
	exitInvocation_trailer?: (ctx: Invocation_trailerContext) => void;
	/**
	 * Enter a parse tree produced by the `ParenthesisExpression`
	 * labeled alternative in `EParser.selectable_expression`.
	 * @param ctx the parse tree
	 */
	enterParenthesisExpression?: (ctx: ParenthesisExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ParenthesisExpression`
	 * labeled alternative in `EParser.selectable_expression`.
	 * @param ctx the parse tree
	 */
	exitParenthesisExpression?: (ctx: ParenthesisExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `LiteralExpression`
	 * labeled alternative in `EParser.selectable_expression`.
	 * @param ctx the parse tree
	 */
	enterLiteralExpression?: (ctx: LiteralExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `LiteralExpression`
	 * labeled alternative in `EParser.selectable_expression`.
	 * @param ctx the parse tree
	 */
	exitLiteralExpression?: (ctx: LiteralExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `IdentifierExpression`
	 * labeled alternative in `EParser.selectable_expression`.
	 * @param ctx the parse tree
	 */
	enterIdentifierExpression?: (ctx: IdentifierExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `IdentifierExpression`
	 * labeled alternative in `EParser.selectable_expression`.
	 * @param ctx the parse tree
	 */
	exitIdentifierExpression?: (ctx: IdentifierExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `ThisExpression`
	 * labeled alternative in `EParser.selectable_expression`.
	 * @param ctx the parse tree
	 */
	enterThisExpression?: (ctx: ThisExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ThisExpression`
	 * labeled alternative in `EParser.selectable_expression`.
	 * @param ctx the parse tree
	 */
	exitThisExpression?: (ctx: ThisExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `SuperExpression`
	 * labeled alternative in `EParser.selectable_expression`.
	 * @param ctx the parse tree
	 */
	enterSuperExpression?: (ctx: SuperExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `SuperExpression`
	 * labeled alternative in `EParser.selectable_expression`.
	 * @param ctx the parse tree
	 */
	exitSuperExpression?: (ctx: SuperExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `SelectorExpression`
	 * labeled alternative in `EParser.instance_expression`.
	 * @param ctx the parse tree
	 */
	enterSelectorExpression?: (ctx: SelectorExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `SelectorExpression`
	 * labeled alternative in `EParser.instance_expression`.
	 * @param ctx the parse tree
	 */
	exitSelectorExpression?: (ctx: SelectorExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `SelectableExpression`
	 * labeled alternative in `EParser.instance_expression`.
	 * @param ctx the parse tree
	 */
	enterSelectableExpression?: (ctx: SelectableExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `SelectableExpression`
	 * labeled alternative in `EParser.instance_expression`.
	 * @param ctx the parse tree
	 */
	exitSelectableExpression?: (ctx: SelectableExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `MemberSelector`
	 * labeled alternative in `EParser.instance_selector`.
	 * @param ctx the parse tree
	 */
	enterMemberSelector?: (ctx: MemberSelectorContext) => void;
	/**
	 * Exit a parse tree produced by the `MemberSelector`
	 * labeled alternative in `EParser.instance_selector`.
	 * @param ctx the parse tree
	 */
	exitMemberSelector?: (ctx: MemberSelectorContext) => void;
	/**
	 * Enter a parse tree produced by the `SliceSelector`
	 * labeled alternative in `EParser.instance_selector`.
	 * @param ctx the parse tree
	 */
	enterSliceSelector?: (ctx: SliceSelectorContext) => void;
	/**
	 * Exit a parse tree produced by the `SliceSelector`
	 * labeled alternative in `EParser.instance_selector`.
	 * @param ctx the parse tree
	 */
	exitSliceSelector?: (ctx: SliceSelectorContext) => void;
	/**
	 * Enter a parse tree produced by the `ItemSelector`
	 * labeled alternative in `EParser.instance_selector`.
	 * @param ctx the parse tree
	 */
	enterItemSelector?: (ctx: ItemSelectorContext) => void;
	/**
	 * Exit a parse tree produced by the `ItemSelector`
	 * labeled alternative in `EParser.instance_selector`.
	 * @param ctx the parse tree
	 */
	exitItemSelector?: (ctx: ItemSelectorContext) => void;
	/**
	 * Enter a parse tree produced by the `MutableSelectableExpression`
	 * labeled alternative in `EParser.mutable_instance_expression`.
	 * @param ctx the parse tree
	 */
	enterMutableSelectableExpression?: (ctx: MutableSelectableExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `MutableSelectableExpression`
	 * labeled alternative in `EParser.mutable_instance_expression`.
	 * @param ctx the parse tree
	 */
	exitMutableSelectableExpression?: (ctx: MutableSelectableExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `MutableSelectorExpression`
	 * labeled alternative in `EParser.mutable_instance_expression`.
	 * @param ctx the parse tree
	 */
	enterMutableSelectorExpression?: (ctx: MutableSelectorExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `MutableSelectorExpression`
	 * labeled alternative in `EParser.mutable_instance_expression`.
	 * @param ctx the parse tree
	 */
	exitMutableSelectorExpression?: (ctx: MutableSelectorExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.document_expression`.
	 * @param ctx the parse tree
	 */
	enterDocument_expression?: (ctx: Document_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.document_expression`.
	 * @param ctx the parse tree
	 */
	exitDocument_expression?: (ctx: Document_expressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.blob_expression`.
	 * @param ctx the parse tree
	 */
	enterBlob_expression?: (ctx: Blob_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.blob_expression`.
	 * @param ctx the parse tree
	 */
	exitBlob_expression?: (ctx: Blob_expressionContext) => void;
	/**
	 * Enter a parse tree produced by the `ConstructorFrom`
	 * labeled alternative in `EParser.constructor_expression`.
	 * @param ctx the parse tree
	 */
	enterConstructorFrom?: (ctx: ConstructorFromContext) => void;
	/**
	 * Exit a parse tree produced by the `ConstructorFrom`
	 * labeled alternative in `EParser.constructor_expression`.
	 * @param ctx the parse tree
	 */
	exitConstructorFrom?: (ctx: ConstructorFromContext) => void;
	/**
	 * Enter a parse tree produced by the `ConstructorNoFrom`
	 * labeled alternative in `EParser.constructor_expression`.
	 * @param ctx the parse tree
	 */
	enterConstructorNoFrom?: (ctx: ConstructorNoFromContext) => void;
	/**
	 * Exit a parse tree produced by the `ConstructorNoFrom`
	 * labeled alternative in `EParser.constructor_expression`.
	 * @param ctx the parse tree
	 */
	exitConstructorNoFrom?: (ctx: ConstructorNoFromContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.write_statement`.
	 * @param ctx the parse tree
	 */
	enterWrite_statement?: (ctx: Write_statementContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.write_statement`.
	 * @param ctx the parse tree
	 */
	exitWrite_statement?: (ctx: Write_statementContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.ambiguous_expression`.
	 * @param ctx the parse tree
	 */
	enterAmbiguous_expression?: (ctx: Ambiguous_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.ambiguous_expression`.
	 * @param ctx the parse tree
	 */
	exitAmbiguous_expression?: (ctx: Ambiguous_expressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.filtered_list_suffix`.
	 * @param ctx the parse tree
	 */
	enterFiltered_list_suffix?: (ctx: Filtered_list_suffixContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.filtered_list_suffix`.
	 * @param ctx the parse tree
	 */
	exitFiltered_list_suffix?: (ctx: Filtered_list_suffixContext) => void;
	/**
	 * Enter a parse tree produced by the `FetchOne`
	 * labeled alternative in `EParser.fetch_expression`.
	 * @param ctx the parse tree
	 */
	enterFetchOne?: (ctx: FetchOneContext) => void;
	/**
	 * Exit a parse tree produced by the `FetchOne`
	 * labeled alternative in `EParser.fetch_expression`.
	 * @param ctx the parse tree
	 */
	exitFetchOne?: (ctx: FetchOneContext) => void;
	/**
	 * Enter a parse tree produced by the `FetchMany`
	 * labeled alternative in `EParser.fetch_expression`.
	 * @param ctx the parse tree
	 */
	enterFetchMany?: (ctx: FetchManyContext) => void;
	/**
	 * Exit a parse tree produced by the `FetchMany`
	 * labeled alternative in `EParser.fetch_expression`.
	 * @param ctx the parse tree
	 */
	exitFetchMany?: (ctx: FetchManyContext) => void;
	/**
	 * Enter a parse tree produced by the `FetchOneAsync`
	 * labeled alternative in `EParser.fetch_statement`.
	 * @param ctx the parse tree
	 */
	enterFetchOneAsync?: (ctx: FetchOneAsyncContext) => void;
	/**
	 * Exit a parse tree produced by the `FetchOneAsync`
	 * labeled alternative in `EParser.fetch_statement`.
	 * @param ctx the parse tree
	 */
	exitFetchOneAsync?: (ctx: FetchOneAsyncContext) => void;
	/**
	 * Enter a parse tree produced by the `FetchManyAsync`
	 * labeled alternative in `EParser.fetch_statement`.
	 * @param ctx the parse tree
	 */
	enterFetchManyAsync?: (ctx: FetchManyAsyncContext) => void;
	/**
	 * Exit a parse tree produced by the `FetchManyAsync`
	 * labeled alternative in `EParser.fetch_statement`.
	 * @param ctx the parse tree
	 */
	exitFetchManyAsync?: (ctx: FetchManyAsyncContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.include_list`.
	 * @param ctx the parse tree
	 */
	enterInclude_list?: (ctx: Include_listContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.include_list`.
	 * @param ctx the parse tree
	 */
	exitInclude_list?: (ctx: Include_listContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.then`.
	 * @param ctx the parse tree
	 */
	enterThen?: (ctx: ThenContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.then`.
	 * @param ctx the parse tree
	 */
	exitThen?: (ctx: ThenContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.read_statement`.
	 * @param ctx the parse tree
	 */
	enterRead_statement?: (ctx: Read_statementContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.read_statement`.
	 * @param ctx the parse tree
	 */
	exitRead_statement?: (ctx: Read_statementContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.sorted_expression`.
	 * @param ctx the parse tree
	 */
	enterSorted_expression?: (ctx: Sorted_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.sorted_expression`.
	 * @param ctx the parse tree
	 */
	exitSorted_expression?: (ctx: Sorted_expressionContext) => void;
	/**
	 * Enter a parse tree produced by the `ArgumentAssignmentListExpression`
	 * labeled alternative in `EParser.argument_assignment_list`.
	 * @param ctx the parse tree
	 */
	enterArgumentAssignmentListExpression?: (ctx: ArgumentAssignmentListExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ArgumentAssignmentListExpression`
	 * labeled alternative in `EParser.argument_assignment_list`.
	 * @param ctx the parse tree
	 */
	exitArgumentAssignmentListExpression?: (ctx: ArgumentAssignmentListExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `ArgumentAssignmentListNoExpression`
	 * labeled alternative in `EParser.argument_assignment_list`.
	 * @param ctx the parse tree
	 */
	enterArgumentAssignmentListNoExpression?: (ctx: ArgumentAssignmentListNoExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `ArgumentAssignmentListNoExpression`
	 * labeled alternative in `EParser.argument_assignment_list`.
	 * @param ctx the parse tree
	 */
	exitArgumentAssignmentListNoExpression?: (ctx: ArgumentAssignmentListNoExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `ArgumentAssignmentList`
	 * labeled alternative in `EParser.with_argument_assignment_list`.
	 * @param ctx the parse tree
	 */
	enterArgumentAssignmentList?: (ctx: ArgumentAssignmentListContext) => void;
	/**
	 * Exit a parse tree produced by the `ArgumentAssignmentList`
	 * labeled alternative in `EParser.with_argument_assignment_list`.
	 * @param ctx the parse tree
	 */
	exitArgumentAssignmentList?: (ctx: ArgumentAssignmentListContext) => void;
	/**
	 * Enter a parse tree produced by the `ArgumentAssignmentListItem`
	 * labeled alternative in `EParser.with_argument_assignment_list`.
	 * @param ctx the parse tree
	 */
	enterArgumentAssignmentListItem?: (ctx: ArgumentAssignmentListItemContext) => void;
	/**
	 * Exit a parse tree produced by the `ArgumentAssignmentListItem`
	 * labeled alternative in `EParser.with_argument_assignment_list`.
	 * @param ctx the parse tree
	 */
	exitArgumentAssignmentListItem?: (ctx: ArgumentAssignmentListItemContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.argument_assignment`.
	 * @param ctx the parse tree
	 */
	enterArgument_assignment?: (ctx: Argument_assignmentContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.argument_assignment`.
	 * @param ctx the parse tree
	 */
	exitArgument_assignment?: (ctx: Argument_assignmentContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.assign_instance_statement`.
	 * @param ctx the parse tree
	 */
	enterAssign_instance_statement?: (ctx: Assign_instance_statementContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.assign_instance_statement`.
	 * @param ctx the parse tree
	 */
	exitAssign_instance_statement?: (ctx: Assign_instance_statementContext) => void;
	/**
	 * Enter a parse tree produced by the `MemberInstance`
	 * labeled alternative in `EParser.child_instance`.
	 * @param ctx the parse tree
	 */
	enterMemberInstance?: (ctx: MemberInstanceContext) => void;
	/**
	 * Exit a parse tree produced by the `MemberInstance`
	 * labeled alternative in `EParser.child_instance`.
	 * @param ctx the parse tree
	 */
	exitMemberInstance?: (ctx: MemberInstanceContext) => void;
	/**
	 * Enter a parse tree produced by the `ItemInstance`
	 * labeled alternative in `EParser.child_instance`.
	 * @param ctx the parse tree
	 */
	enterItemInstance?: (ctx: ItemInstanceContext) => void;
	/**
	 * Exit a parse tree produced by the `ItemInstance`
	 * labeled alternative in `EParser.child_instance`.
	 * @param ctx the parse tree
	 */
	exitItemInstance?: (ctx: ItemInstanceContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.assign_tuple_statement`.
	 * @param ctx the parse tree
	 */
	enterAssign_tuple_statement?: (ctx: Assign_tuple_statementContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.assign_tuple_statement`.
	 * @param ctx the parse tree
	 */
	exitAssign_tuple_statement?: (ctx: Assign_tuple_statementContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.lfs`.
	 * @param ctx the parse tree
	 */
	enterLfs?: (ctx: LfsContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.lfs`.
	 * @param ctx the parse tree
	 */
	exitLfs?: (ctx: LfsContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.lfp`.
	 * @param ctx the parse tree
	 */
	enterLfp?: (ctx: LfpContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.lfp`.
	 * @param ctx the parse tree
	 */
	exitLfp?: (ctx: LfpContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.ws_plus`.
	 * @param ctx the parse tree
	 */
	enterWs_plus?: (ctx: Ws_plusContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.ws_plus`.
	 * @param ctx the parse tree
	 */
	exitWs_plus?: (ctx: Ws_plusContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.indent`.
	 * @param ctx the parse tree
	 */
	enterIndent?: (ctx: IndentContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.indent`.
	 * @param ctx the parse tree
	 */
	exitIndent?: (ctx: IndentContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.dedent`.
	 * @param ctx the parse tree
	 */
	enterDedent?: (ctx: DedentContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.dedent`.
	 * @param ctx the parse tree
	 */
	exitDedent?: (ctx: DedentContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.type_literal`.
	 * @param ctx the parse tree
	 */
	enterType_literal?: (ctx: Type_literalContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.type_literal`.
	 * @param ctx the parse tree
	 */
	exitType_literal?: (ctx: Type_literalContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.null_literal`.
	 * @param ctx the parse tree
	 */
	enterNull_literal?: (ctx: Null_literalContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.null_literal`.
	 * @param ctx the parse tree
	 */
	exitNull_literal?: (ctx: Null_literalContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.repl`.
	 * @param ctx the parse tree
	 */
	enterRepl?: (ctx: ReplContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.repl`.
	 * @param ctx the parse tree
	 */
	exitRepl?: (ctx: ReplContext) => void;
	/**
	 * Enter a parse tree produced by the `FullDeclarationList`
	 * labeled alternative in `EParser.declaration_list`.
	 * @param ctx the parse tree
	 */
	enterFullDeclarationList?: (ctx: FullDeclarationListContext) => void;
	/**
	 * Exit a parse tree produced by the `FullDeclarationList`
	 * labeled alternative in `EParser.declaration_list`.
	 * @param ctx the parse tree
	 */
	exitFullDeclarationList?: (ctx: FullDeclarationListContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.declarations`.
	 * @param ctx the parse tree
	 */
	enterDeclarations?: (ctx: DeclarationsContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.declarations`.
	 * @param ctx the parse tree
	 */
	exitDeclarations?: (ctx: DeclarationsContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.declaration`.
	 * @param ctx the parse tree
	 */
	enterDeclaration?: (ctx: DeclarationContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.declaration`.
	 * @param ctx the parse tree
	 */
	exitDeclaration?: (ctx: DeclarationContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.annotation_constructor`.
	 * @param ctx the parse tree
	 */
	enterAnnotation_constructor?: (ctx: Annotation_constructorContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.annotation_constructor`.
	 * @param ctx the parse tree
	 */
	exitAnnotation_constructor?: (ctx: Annotation_constructorContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.annotation_identifier`.
	 * @param ctx the parse tree
	 */
	enterAnnotation_identifier?: (ctx: Annotation_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.annotation_identifier`.
	 * @param ctx the parse tree
	 */
	exitAnnotation_identifier?: (ctx: Annotation_identifierContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.annotation_argument`.
	 * @param ctx the parse tree
	 */
	enterAnnotation_argument?: (ctx: Annotation_argumentContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.annotation_argument`.
	 * @param ctx the parse tree
	 */
	exitAnnotation_argument?: (ctx: Annotation_argumentContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.annotation_argument_name`.
	 * @param ctx the parse tree
	 */
	enterAnnotation_argument_name?: (ctx: Annotation_argument_nameContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.annotation_argument_name`.
	 * @param ctx the parse tree
	 */
	exitAnnotation_argument_name?: (ctx: Annotation_argument_nameContext) => void;
	/**
	 * Enter a parse tree produced by the `AnnotationLiteralValue`
	 * labeled alternative in `EParser.annotation_argument_value`.
	 * @param ctx the parse tree
	 */
	enterAnnotationLiteralValue?: (ctx: AnnotationLiteralValueContext) => void;
	/**
	 * Exit a parse tree produced by the `AnnotationLiteralValue`
	 * labeled alternative in `EParser.annotation_argument_value`.
	 * @param ctx the parse tree
	 */
	exitAnnotationLiteralValue?: (ctx: AnnotationLiteralValueContext) => void;
	/**
	 * Enter a parse tree produced by the `AnnotationTypeValue`
	 * labeled alternative in `EParser.annotation_argument_value`.
	 * @param ctx the parse tree
	 */
	enterAnnotationTypeValue?: (ctx: AnnotationTypeValueContext) => void;
	/**
	 * Exit a parse tree produced by the `AnnotationTypeValue`
	 * labeled alternative in `EParser.annotation_argument_value`.
	 * @param ctx the parse tree
	 */
	exitAnnotationTypeValue?: (ctx: AnnotationTypeValueContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.resource_declaration`.
	 * @param ctx the parse tree
	 */
	enterResource_declaration?: (ctx: Resource_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.resource_declaration`.
	 * @param ctx the parse tree
	 */
	exitResource_declaration?: (ctx: Resource_declarationContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.enum_declaration`.
	 * @param ctx the parse tree
	 */
	enterEnum_declaration?: (ctx: Enum_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.enum_declaration`.
	 * @param ctx the parse tree
	 */
	exitEnum_declaration?: (ctx: Enum_declarationContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.native_symbol_list`.
	 * @param ctx the parse tree
	 */
	enterNative_symbol_list?: (ctx: Native_symbol_listContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.native_symbol_list`.
	 * @param ctx the parse tree
	 */
	exitNative_symbol_list?: (ctx: Native_symbol_listContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.category_symbol_list`.
	 * @param ctx the parse tree
	 */
	enterCategory_symbol_list?: (ctx: Category_symbol_listContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.category_symbol_list`.
	 * @param ctx the parse tree
	 */
	exitCategory_symbol_list?: (ctx: Category_symbol_listContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.symbol_list`.
	 * @param ctx the parse tree
	 */
	enterSymbol_list?: (ctx: Symbol_listContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.symbol_list`.
	 * @param ctx the parse tree
	 */
	exitSymbol_list?: (ctx: Symbol_listContext) => void;
	/**
	 * Enter a parse tree produced by the `MatchingList`
	 * labeled alternative in `EParser.attribute_constraint`.
	 * @param ctx the parse tree
	 */
	enterMatchingList?: (ctx: MatchingListContext) => void;
	/**
	 * Exit a parse tree produced by the `MatchingList`
	 * labeled alternative in `EParser.attribute_constraint`.
	 * @param ctx the parse tree
	 */
	exitMatchingList?: (ctx: MatchingListContext) => void;
	/**
	 * Enter a parse tree produced by the `MatchingSet`
	 * labeled alternative in `EParser.attribute_constraint`.
	 * @param ctx the parse tree
	 */
	enterMatchingSet?: (ctx: MatchingSetContext) => void;
	/**
	 * Exit a parse tree produced by the `MatchingSet`
	 * labeled alternative in `EParser.attribute_constraint`.
	 * @param ctx the parse tree
	 */
	exitMatchingSet?: (ctx: MatchingSetContext) => void;
	/**
	 * Enter a parse tree produced by the `MatchingRange`
	 * labeled alternative in `EParser.attribute_constraint`.
	 * @param ctx the parse tree
	 */
	enterMatchingRange?: (ctx: MatchingRangeContext) => void;
	/**
	 * Exit a parse tree produced by the `MatchingRange`
	 * labeled alternative in `EParser.attribute_constraint`.
	 * @param ctx the parse tree
	 */
	exitMatchingRange?: (ctx: MatchingRangeContext) => void;
	/**
	 * Enter a parse tree produced by the `MatchingPattern`
	 * labeled alternative in `EParser.attribute_constraint`.
	 * @param ctx the parse tree
	 */
	enterMatchingPattern?: (ctx: MatchingPatternContext) => void;
	/**
	 * Exit a parse tree produced by the `MatchingPattern`
	 * labeled alternative in `EParser.attribute_constraint`.
	 * @param ctx the parse tree
	 */
	exitMatchingPattern?: (ctx: MatchingPatternContext) => void;
	/**
	 * Enter a parse tree produced by the `MatchingExpression`
	 * labeled alternative in `EParser.attribute_constraint`.
	 * @param ctx the parse tree
	 */
	enterMatchingExpression?: (ctx: MatchingExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `MatchingExpression`
	 * labeled alternative in `EParser.attribute_constraint`.
	 * @param ctx the parse tree
	 */
	exitMatchingExpression?: (ctx: MatchingExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.list_literal`.
	 * @param ctx the parse tree
	 */
	enterList_literal?: (ctx: List_literalContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.list_literal`.
	 * @param ctx the parse tree
	 */
	exitList_literal?: (ctx: List_literalContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.set_literal`.
	 * @param ctx the parse tree
	 */
	enterSet_literal?: (ctx: Set_literalContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.set_literal`.
	 * @param ctx the parse tree
	 */
	exitSet_literal?: (ctx: Set_literalContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.expression_list`.
	 * @param ctx the parse tree
	 */
	enterExpression_list?: (ctx: Expression_listContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.expression_list`.
	 * @param ctx the parse tree
	 */
	exitExpression_list?: (ctx: Expression_listContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.range_literal`.
	 * @param ctx the parse tree
	 */
	enterRange_literal?: (ctx: Range_literalContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.range_literal`.
	 * @param ctx the parse tree
	 */
	exitRange_literal?: (ctx: Range_literalContext) => void;
	/**
	 * Enter a parse tree produced by the `IteratorType`
	 * labeled alternative in `EParser.typedef`.
	 * @param ctx the parse tree
	 */
	enterIteratorType?: (ctx: IteratorTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `IteratorType`
	 * labeled alternative in `EParser.typedef`.
	 * @param ctx the parse tree
	 */
	exitIteratorType?: (ctx: IteratorTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `SetType`
	 * labeled alternative in `EParser.typedef`.
	 * @param ctx the parse tree
	 */
	enterSetType?: (ctx: SetTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `SetType`
	 * labeled alternative in `EParser.typedef`.
	 * @param ctx the parse tree
	 */
	exitSetType?: (ctx: SetTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `ListType`
	 * labeled alternative in `EParser.typedef`.
	 * @param ctx the parse tree
	 */
	enterListType?: (ctx: ListTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `ListType`
	 * labeled alternative in `EParser.typedef`.
	 * @param ctx the parse tree
	 */
	exitListType?: (ctx: ListTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `DictType`
	 * labeled alternative in `EParser.typedef`.
	 * @param ctx the parse tree
	 */
	enterDictType?: (ctx: DictTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `DictType`
	 * labeled alternative in `EParser.typedef`.
	 * @param ctx the parse tree
	 */
	exitDictType?: (ctx: DictTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `CursorType`
	 * labeled alternative in `EParser.typedef`.
	 * @param ctx the parse tree
	 */
	enterCursorType?: (ctx: CursorTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `CursorType`
	 * labeled alternative in `EParser.typedef`.
	 * @param ctx the parse tree
	 */
	exitCursorType?: (ctx: CursorTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `TypeType`
	 * labeled alternative in `EParser.typedef`.
	 * @param ctx the parse tree
	 */
	enterTypeType?: (ctx: TypeTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `TypeType`
	 * labeled alternative in `EParser.typedef`.
	 * @param ctx the parse tree
	 */
	exitTypeType?: (ctx: TypeTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `PrimaryType`
	 * labeled alternative in `EParser.typedef`.
	 * @param ctx the parse tree
	 */
	enterPrimaryType?: (ctx: PrimaryTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `PrimaryType`
	 * labeled alternative in `EParser.typedef`.
	 * @param ctx the parse tree
	 */
	exitPrimaryType?: (ctx: PrimaryTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `NativeType`
	 * labeled alternative in `EParser.primary_type`.
	 * @param ctx the parse tree
	 */
	enterNativeType?: (ctx: NativeTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `NativeType`
	 * labeled alternative in `EParser.primary_type`.
	 * @param ctx the parse tree
	 */
	exitNativeType?: (ctx: NativeTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `CategoryType`
	 * labeled alternative in `EParser.primary_type`.
	 * @param ctx the parse tree
	 */
	enterCategoryType?: (ctx: CategoryTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `CategoryType`
	 * labeled alternative in `EParser.primary_type`.
	 * @param ctx the parse tree
	 */
	exitCategoryType?: (ctx: CategoryTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `BooleanType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	enterBooleanType?: (ctx: BooleanTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `BooleanType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	exitBooleanType?: (ctx: BooleanTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `CssType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	enterCssType?: (ctx: CssTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `CssType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	exitCssType?: (ctx: CssTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `CharacterType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	enterCharacterType?: (ctx: CharacterTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `CharacterType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	exitCharacterType?: (ctx: CharacterTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `TextType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	enterTextType?: (ctx: TextTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `TextType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	exitTextType?: (ctx: TextTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `ImageType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	enterImageType?: (ctx: ImageTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `ImageType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	exitImageType?: (ctx: ImageTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `IntegerType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	enterIntegerType?: (ctx: IntegerTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `IntegerType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	exitIntegerType?: (ctx: IntegerTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `DecimalType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	enterDecimalType?: (ctx: DecimalTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `DecimalType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	exitDecimalType?: (ctx: DecimalTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `DocumentType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	enterDocumentType?: (ctx: DocumentTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `DocumentType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	exitDocumentType?: (ctx: DocumentTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `DateType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	enterDateType?: (ctx: DateTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `DateType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	exitDateType?: (ctx: DateTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `DateTimeType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	enterDateTimeType?: (ctx: DateTimeTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `DateTimeType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	exitDateTimeType?: (ctx: DateTimeTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `TimeType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	enterTimeType?: (ctx: TimeTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `TimeType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	exitTimeType?: (ctx: TimeTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `PeriodType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	enterPeriodType?: (ctx: PeriodTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `PeriodType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	exitPeriodType?: (ctx: PeriodTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `VersionType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	enterVersionType?: (ctx: VersionTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `VersionType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	exitVersionType?: (ctx: VersionTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `CodeType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	enterCodeType?: (ctx: CodeTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `CodeType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	exitCodeType?: (ctx: CodeTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `BlobType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	enterBlobType?: (ctx: BlobTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `BlobType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	exitBlobType?: (ctx: BlobTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `UUIDType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	enterUUIDType?: (ctx: UUIDTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `UUIDType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	exitUUIDType?: (ctx: UUIDTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `DbIdType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	enterDbIdType?: (ctx: DbIdTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `DbIdType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	exitDbIdType?: (ctx: DbIdTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `HtmlType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	enterHtmlType?: (ctx: HtmlTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `HtmlType`
	 * labeled alternative in `EParser.native_type`.
	 * @param ctx the parse tree
	 */
	exitHtmlType?: (ctx: HtmlTypeContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.category_type`.
	 * @param ctx the parse tree
	 */
	enterCategory_type?: (ctx: Category_typeContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.category_type`.
	 * @param ctx the parse tree
	 */
	exitCategory_type?: (ctx: Category_typeContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.mutable_category_type`.
	 * @param ctx the parse tree
	 */
	enterMutable_category_type?: (ctx: Mutable_category_typeContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.mutable_category_type`.
	 * @param ctx the parse tree
	 */
	exitMutable_category_type?: (ctx: Mutable_category_typeContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.code_type`.
	 * @param ctx the parse tree
	 */
	enterCode_type?: (ctx: Code_typeContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.code_type`.
	 * @param ctx the parse tree
	 */
	exitCode_type?: (ctx: Code_typeContext) => void;
	/**
	 * Enter a parse tree produced by the `ConcreteCategoryDeclaration`
	 * labeled alternative in `EParser.category_declaration`.
	 * @param ctx the parse tree
	 */
	enterConcreteCategoryDeclaration?: (ctx: ConcreteCategoryDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by the `ConcreteCategoryDeclaration`
	 * labeled alternative in `EParser.category_declaration`.
	 * @param ctx the parse tree
	 */
	exitConcreteCategoryDeclaration?: (ctx: ConcreteCategoryDeclarationContext) => void;
	/**
	 * Enter a parse tree produced by the `NativeCategoryDeclaration`
	 * labeled alternative in `EParser.category_declaration`.
	 * @param ctx the parse tree
	 */
	enterNativeCategoryDeclaration?: (ctx: NativeCategoryDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by the `NativeCategoryDeclaration`
	 * labeled alternative in `EParser.category_declaration`.
	 * @param ctx the parse tree
	 */
	exitNativeCategoryDeclaration?: (ctx: NativeCategoryDeclarationContext) => void;
	/**
	 * Enter a parse tree produced by the `SingletonCategoryDeclaration`
	 * labeled alternative in `EParser.category_declaration`.
	 * @param ctx the parse tree
	 */
	enterSingletonCategoryDeclaration?: (ctx: SingletonCategoryDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by the `SingletonCategoryDeclaration`
	 * labeled alternative in `EParser.category_declaration`.
	 * @param ctx the parse tree
	 */
	exitSingletonCategoryDeclaration?: (ctx: SingletonCategoryDeclarationContext) => void;
	/**
	 * Enter a parse tree produced by the `ConcreteWidgetDeclaration`
	 * labeled alternative in `EParser.widget_declaration`.
	 * @param ctx the parse tree
	 */
	enterConcreteWidgetDeclaration?: (ctx: ConcreteWidgetDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by the `ConcreteWidgetDeclaration`
	 * labeled alternative in `EParser.widget_declaration`.
	 * @param ctx the parse tree
	 */
	exitConcreteWidgetDeclaration?: (ctx: ConcreteWidgetDeclarationContext) => void;
	/**
	 * Enter a parse tree produced by the `NativeWidgetDeclaration`
	 * labeled alternative in `EParser.widget_declaration`.
	 * @param ctx the parse tree
	 */
	enterNativeWidgetDeclaration?: (ctx: NativeWidgetDeclarationContext) => void;
	/**
	 * Exit a parse tree produced by the `NativeWidgetDeclaration`
	 * labeled alternative in `EParser.widget_declaration`.
	 * @param ctx the parse tree
	 */
	exitNativeWidgetDeclaration?: (ctx: NativeWidgetDeclarationContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.type_identifier_list`.
	 * @param ctx the parse tree
	 */
	enterType_identifier_list?: (ctx: Type_identifier_listContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.type_identifier_list`.
	 * @param ctx the parse tree
	 */
	exitType_identifier_list?: (ctx: Type_identifier_listContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.method_identifier`.
	 * @param ctx the parse tree
	 */
	enterMethod_identifier?: (ctx: Method_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.method_identifier`.
	 * @param ctx the parse tree
	 */
	exitMethod_identifier?: (ctx: Method_identifierContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.identifier_or_keyword`.
	 * @param ctx the parse tree
	 */
	enterIdentifier_or_keyword?: (ctx: Identifier_or_keywordContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.identifier_or_keyword`.
	 * @param ctx the parse tree
	 */
	exitIdentifier_or_keyword?: (ctx: Identifier_or_keywordContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.nospace_hyphen_identifier_or_keyword`.
	 * @param ctx the parse tree
	 */
	enterNospace_hyphen_identifier_or_keyword?: (ctx: Nospace_hyphen_identifier_or_keywordContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.nospace_hyphen_identifier_or_keyword`.
	 * @param ctx the parse tree
	 */
	exitNospace_hyphen_identifier_or_keyword?: (ctx: Nospace_hyphen_identifier_or_keywordContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.nospace_identifier_or_keyword`.
	 * @param ctx the parse tree
	 */
	enterNospace_identifier_or_keyword?: (ctx: Nospace_identifier_or_keywordContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.nospace_identifier_or_keyword`.
	 * @param ctx the parse tree
	 */
	exitNospace_identifier_or_keyword?: (ctx: Nospace_identifier_or_keywordContext) => void;
	/**
	 * Enter a parse tree produced by the `VariableIdentifier`
	 * labeled alternative in `EParser.identifier`.
	 * @param ctx the parse tree
	 */
	enterVariableIdentifier?: (ctx: VariableIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by the `VariableIdentifier`
	 * labeled alternative in `EParser.identifier`.
	 * @param ctx the parse tree
	 */
	exitVariableIdentifier?: (ctx: VariableIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by the `TypeIdentifier`
	 * labeled alternative in `EParser.identifier`.
	 * @param ctx the parse tree
	 */
	enterTypeIdentifier?: (ctx: TypeIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by the `TypeIdentifier`
	 * labeled alternative in `EParser.identifier`.
	 * @param ctx the parse tree
	 */
	exitTypeIdentifier?: (ctx: TypeIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by the `SymbolIdentifier`
	 * labeled alternative in `EParser.identifier`.
	 * @param ctx the parse tree
	 */
	enterSymbolIdentifier?: (ctx: SymbolIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by the `SymbolIdentifier`
	 * labeled alternative in `EParser.identifier`.
	 * @param ctx the parse tree
	 */
	exitSymbolIdentifier?: (ctx: SymbolIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.member_identifier`.
	 * @param ctx the parse tree
	 */
	enterMember_identifier?: (ctx: Member_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.member_identifier`.
	 * @param ctx the parse tree
	 */
	exitMember_identifier?: (ctx: Member_identifierContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.variable_identifier`.
	 * @param ctx the parse tree
	 */
	enterVariable_identifier?: (ctx: Variable_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.variable_identifier`.
	 * @param ctx the parse tree
	 */
	exitVariable_identifier?: (ctx: Variable_identifierContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.attribute_identifier`.
	 * @param ctx the parse tree
	 */
	enterAttribute_identifier?: (ctx: Attribute_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.attribute_identifier`.
	 * @param ctx the parse tree
	 */
	exitAttribute_identifier?: (ctx: Attribute_identifierContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.type_identifier`.
	 * @param ctx the parse tree
	 */
	enterType_identifier?: (ctx: Type_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.type_identifier`.
	 * @param ctx the parse tree
	 */
	exitType_identifier?: (ctx: Type_identifierContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.symbol_identifier`.
	 * @param ctx the parse tree
	 */
	enterSymbol_identifier?: (ctx: Symbol_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.symbol_identifier`.
	 * @param ctx the parse tree
	 */
	exitSymbol_identifier?: (ctx: Symbol_identifierContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.argument_list`.
	 * @param ctx the parse tree
	 */
	enterArgument_list?: (ctx: Argument_listContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.argument_list`.
	 * @param ctx the parse tree
	 */
	exitArgument_list?: (ctx: Argument_listContext) => void;
	/**
	 * Enter a parse tree produced by the `CodeArgument`
	 * labeled alternative in `EParser.argument`.
	 * @param ctx the parse tree
	 */
	enterCodeArgument?: (ctx: CodeArgumentContext) => void;
	/**
	 * Exit a parse tree produced by the `CodeArgument`
	 * labeled alternative in `EParser.argument`.
	 * @param ctx the parse tree
	 */
	exitCodeArgument?: (ctx: CodeArgumentContext) => void;
	/**
	 * Enter a parse tree produced by the `OperatorArgument`
	 * labeled alternative in `EParser.argument`.
	 * @param ctx the parse tree
	 */
	enterOperatorArgument?: (ctx: OperatorArgumentContext) => void;
	/**
	 * Exit a parse tree produced by the `OperatorArgument`
	 * labeled alternative in `EParser.argument`.
	 * @param ctx the parse tree
	 */
	exitOperatorArgument?: (ctx: OperatorArgumentContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.operator_argument`.
	 * @param ctx the parse tree
	 */
	enterOperator_argument?: (ctx: Operator_argumentContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.operator_argument`.
	 * @param ctx the parse tree
	 */
	exitOperator_argument?: (ctx: Operator_argumentContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.named_argument`.
	 * @param ctx the parse tree
	 */
	enterNamed_argument?: (ctx: Named_argumentContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.named_argument`.
	 * @param ctx the parse tree
	 */
	exitNamed_argument?: (ctx: Named_argumentContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.code_argument`.
	 * @param ctx the parse tree
	 */
	enterCode_argument?: (ctx: Code_argumentContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.code_argument`.
	 * @param ctx the parse tree
	 */
	exitCode_argument?: (ctx: Code_argumentContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.category_or_any_type`.
	 * @param ctx the parse tree
	 */
	enterCategory_or_any_type?: (ctx: Category_or_any_typeContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.category_or_any_type`.
	 * @param ctx the parse tree
	 */
	exitCategory_or_any_type?: (ctx: Category_or_any_typeContext) => void;
	/**
	 * Enter a parse tree produced by the `AnyListType`
	 * labeled alternative in `EParser.any_type`.
	 * @param ctx the parse tree
	 */
	enterAnyListType?: (ctx: AnyListTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `AnyListType`
	 * labeled alternative in `EParser.any_type`.
	 * @param ctx the parse tree
	 */
	exitAnyListType?: (ctx: AnyListTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `AnyType`
	 * labeled alternative in `EParser.any_type`.
	 * @param ctx the parse tree
	 */
	enterAnyType?: (ctx: AnyTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `AnyType`
	 * labeled alternative in `EParser.any_type`.
	 * @param ctx the parse tree
	 */
	exitAnyType?: (ctx: AnyTypeContext) => void;
	/**
	 * Enter a parse tree produced by the `AnyDictType`
	 * labeled alternative in `EParser.any_type`.
	 * @param ctx the parse tree
	 */
	enterAnyDictType?: (ctx: AnyDictTypeContext) => void;
	/**
	 * Exit a parse tree produced by the `AnyDictType`
	 * labeled alternative in `EParser.any_type`.
	 * @param ctx the parse tree
	 */
	exitAnyDictType?: (ctx: AnyDictTypeContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.member_method_declaration_list`.
	 * @param ctx the parse tree
	 */
	enterMember_method_declaration_list?: (ctx: Member_method_declaration_listContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.member_method_declaration_list`.
	 * @param ctx the parse tree
	 */
	exitMember_method_declaration_list?: (ctx: Member_method_declaration_listContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.member_method_declaration`.
	 * @param ctx the parse tree
	 */
	enterMember_method_declaration?: (ctx: Member_method_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.member_method_declaration`.
	 * @param ctx the parse tree
	 */
	exitMember_method_declaration?: (ctx: Member_method_declarationContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.native_member_method_declaration_list`.
	 * @param ctx the parse tree
	 */
	enterNative_member_method_declaration_list?: (ctx: Native_member_method_declaration_listContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.native_member_method_declaration_list`.
	 * @param ctx the parse tree
	 */
	exitNative_member_method_declaration_list?: (ctx: Native_member_method_declaration_listContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.native_member_method_declaration`.
	 * @param ctx the parse tree
	 */
	enterNative_member_method_declaration?: (ctx: Native_member_method_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.native_member_method_declaration`.
	 * @param ctx the parse tree
	 */
	exitNative_member_method_declaration?: (ctx: Native_member_method_declarationContext) => void;
	/**
	 * Enter a parse tree produced by the `JavaCategoryBinding`
	 * labeled alternative in `EParser.native_category_binding`.
	 * @param ctx the parse tree
	 */
	enterJavaCategoryBinding?: (ctx: JavaCategoryBindingContext) => void;
	/**
	 * Exit a parse tree produced by the `JavaCategoryBinding`
	 * labeled alternative in `EParser.native_category_binding`.
	 * @param ctx the parse tree
	 */
	exitJavaCategoryBinding?: (ctx: JavaCategoryBindingContext) => void;
	/**
	 * Enter a parse tree produced by the `CSharpCategoryBinding`
	 * labeled alternative in `EParser.native_category_binding`.
	 * @param ctx the parse tree
	 */
	enterCSharpCategoryBinding?: (ctx: CSharpCategoryBindingContext) => void;
	/**
	 * Exit a parse tree produced by the `CSharpCategoryBinding`
	 * labeled alternative in `EParser.native_category_binding`.
	 * @param ctx the parse tree
	 */
	exitCSharpCategoryBinding?: (ctx: CSharpCategoryBindingContext) => void;
	/**
	 * Enter a parse tree produced by the `Python2CategoryBinding`
	 * labeled alternative in `EParser.native_category_binding`.
	 * @param ctx the parse tree
	 */
	enterPython2CategoryBinding?: (ctx: Python2CategoryBindingContext) => void;
	/**
	 * Exit a parse tree produced by the `Python2CategoryBinding`
	 * labeled alternative in `EParser.native_category_binding`.
	 * @param ctx the parse tree
	 */
	exitPython2CategoryBinding?: (ctx: Python2CategoryBindingContext) => void;
	/**
	 * Enter a parse tree produced by the `Python3CategoryBinding`
	 * labeled alternative in `EParser.native_category_binding`.
	 * @param ctx the parse tree
	 */
	enterPython3CategoryBinding?: (ctx: Python3CategoryBindingContext) => void;
	/**
	 * Exit a parse tree produced by the `Python3CategoryBinding`
	 * labeled alternative in `EParser.native_category_binding`.
	 * @param ctx the parse tree
	 */
	exitPython3CategoryBinding?: (ctx: Python3CategoryBindingContext) => void;
	/**
	 * Enter a parse tree produced by the `JavascriptCategoryBinding`
	 * labeled alternative in `EParser.native_category_binding`.
	 * @param ctx the parse tree
	 */
	enterJavascriptCategoryBinding?: (ctx: JavascriptCategoryBindingContext) => void;
	/**
	 * Exit a parse tree produced by the `JavascriptCategoryBinding`
	 * labeled alternative in `EParser.native_category_binding`.
	 * @param ctx the parse tree
	 */
	exitJavascriptCategoryBinding?: (ctx: JavascriptCategoryBindingContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.python_category_binding`.
	 * @param ctx the parse tree
	 */
	enterPython_category_binding?: (ctx: Python_category_bindingContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.python_category_binding`.
	 * @param ctx the parse tree
	 */
	exitPython_category_binding?: (ctx: Python_category_bindingContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.python_module`.
	 * @param ctx the parse tree
	 */
	enterPython_module?: (ctx: Python_moduleContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.python_module`.
	 * @param ctx the parse tree
	 */
	exitPython_module?: (ctx: Python_moduleContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.javascript_category_binding`.
	 * @param ctx the parse tree
	 */
	enterJavascript_category_binding?: (ctx: Javascript_category_bindingContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.javascript_category_binding`.
	 * @param ctx the parse tree
	 */
	exitJavascript_category_binding?: (ctx: Javascript_category_bindingContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.javascript_module`.
	 * @param ctx the parse tree
	 */
	enterJavascript_module?: (ctx: Javascript_moduleContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.javascript_module`.
	 * @param ctx the parse tree
	 */
	exitJavascript_module?: (ctx: Javascript_moduleContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.variable_identifier_list`.
	 * @param ctx the parse tree
	 */
	enterVariable_identifier_list?: (ctx: Variable_identifier_listContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.variable_identifier_list`.
	 * @param ctx the parse tree
	 */
	exitVariable_identifier_list?: (ctx: Variable_identifier_listContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.attribute_identifier_list`.
	 * @param ctx the parse tree
	 */
	enterAttribute_identifier_list?: (ctx: Attribute_identifier_listContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.attribute_identifier_list`.
	 * @param ctx the parse tree
	 */
	exitAttribute_identifier_list?: (ctx: Attribute_identifier_listContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.method_declaration`.
	 * @param ctx the parse tree
	 */
	enterMethod_declaration?: (ctx: Method_declarationContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.method_declaration`.
	 * @param ctx the parse tree
	 */
	exitMethod_declaration?: (ctx: Method_declarationContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.comment_statement`.
	 * @param ctx the parse tree
	 */
	enterComment_statement?: (ctx: Comment_statementContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.comment_statement`.
	 * @param ctx the parse tree
	 */
	exitComment_statement?: (ctx: Comment_statementContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.native_statement_list`.
	 * @param ctx the parse tree
	 */
	enterNative_statement_list?: (ctx: Native_statement_listContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.native_statement_list`.
	 * @param ctx the parse tree
	 */
	exitNative_statement_list?: (ctx: Native_statement_listContext) => void;
	/**
	 * Enter a parse tree produced by the `JavaNativeStatement`
	 * labeled alternative in `EParser.native_statement`.
	 * @param ctx the parse tree
	 */
	enterJavaNativeStatement?: (ctx: JavaNativeStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `JavaNativeStatement`
	 * labeled alternative in `EParser.native_statement`.
	 * @param ctx the parse tree
	 */
	exitJavaNativeStatement?: (ctx: JavaNativeStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `CSharpNativeStatement`
	 * labeled alternative in `EParser.native_statement`.
	 * @param ctx the parse tree
	 */
	enterCSharpNativeStatement?: (ctx: CSharpNativeStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `CSharpNativeStatement`
	 * labeled alternative in `EParser.native_statement`.
	 * @param ctx the parse tree
	 */
	exitCSharpNativeStatement?: (ctx: CSharpNativeStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `Python2NativeStatement`
	 * labeled alternative in `EParser.native_statement`.
	 * @param ctx the parse tree
	 */
	enterPython2NativeStatement?: (ctx: Python2NativeStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `Python2NativeStatement`
	 * labeled alternative in `EParser.native_statement`.
	 * @param ctx the parse tree
	 */
	exitPython2NativeStatement?: (ctx: Python2NativeStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `Python3NativeStatement`
	 * labeled alternative in `EParser.native_statement`.
	 * @param ctx the parse tree
	 */
	enterPython3NativeStatement?: (ctx: Python3NativeStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `Python3NativeStatement`
	 * labeled alternative in `EParser.native_statement`.
	 * @param ctx the parse tree
	 */
	exitPython3NativeStatement?: (ctx: Python3NativeStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `JavascriptNativeStatement`
	 * labeled alternative in `EParser.native_statement`.
	 * @param ctx the parse tree
	 */
	enterJavascriptNativeStatement?: (ctx: JavascriptNativeStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `JavascriptNativeStatement`
	 * labeled alternative in `EParser.native_statement`.
	 * @param ctx the parse tree
	 */
	exitJavascriptNativeStatement?: (ctx: JavascriptNativeStatementContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.python_native_statement`.
	 * @param ctx the parse tree
	 */
	enterPython_native_statement?: (ctx: Python_native_statementContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.python_native_statement`.
	 * @param ctx the parse tree
	 */
	exitPython_native_statement?: (ctx: Python_native_statementContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.javascript_native_statement`.
	 * @param ctx the parse tree
	 */
	enterJavascript_native_statement?: (ctx: Javascript_native_statementContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.javascript_native_statement`.
	 * @param ctx the parse tree
	 */
	exitJavascript_native_statement?: (ctx: Javascript_native_statementContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.statement_list`.
	 * @param ctx the parse tree
	 */
	enterStatement_list?: (ctx: Statement_listContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.statement_list`.
	 * @param ctx the parse tree
	 */
	exitStatement_list?: (ctx: Statement_listContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.assertion_list`.
	 * @param ctx the parse tree
	 */
	enterAssertion_list?: (ctx: Assertion_listContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.assertion_list`.
	 * @param ctx the parse tree
	 */
	exitAssertion_list?: (ctx: Assertion_listContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.switch_case_statement_list`.
	 * @param ctx the parse tree
	 */
	enterSwitch_case_statement_list?: (ctx: Switch_case_statement_listContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.switch_case_statement_list`.
	 * @param ctx the parse tree
	 */
	exitSwitch_case_statement_list?: (ctx: Switch_case_statement_listContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.catch_statement_list`.
	 * @param ctx the parse tree
	 */
	enterCatch_statement_list?: (ctx: Catch_statement_listContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.catch_statement_list`.
	 * @param ctx the parse tree
	 */
	exitCatch_statement_list?: (ctx: Catch_statement_listContext) => void;
	/**
	 * Enter a parse tree produced by the `LiteralRangeLiteral`
	 * labeled alternative in `EParser.literal_collection`.
	 * @param ctx the parse tree
	 */
	enterLiteralRangeLiteral?: (ctx: LiteralRangeLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `LiteralRangeLiteral`
	 * labeled alternative in `EParser.literal_collection`.
	 * @param ctx the parse tree
	 */
	exitLiteralRangeLiteral?: (ctx: LiteralRangeLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `LiteralListLiteral`
	 * labeled alternative in `EParser.literal_collection`.
	 * @param ctx the parse tree
	 */
	enterLiteralListLiteral?: (ctx: LiteralListLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `LiteralListLiteral`
	 * labeled alternative in `EParser.literal_collection`.
	 * @param ctx the parse tree
	 */
	exitLiteralListLiteral?: (ctx: LiteralListLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `LiteralSetLiteral`
	 * labeled alternative in `EParser.literal_collection`.
	 * @param ctx the parse tree
	 */
	enterLiteralSetLiteral?: (ctx: LiteralSetLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `LiteralSetLiteral`
	 * labeled alternative in `EParser.literal_collection`.
	 * @param ctx the parse tree
	 */
	exitLiteralSetLiteral?: (ctx: LiteralSetLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `MinIntegerLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	enterMinIntegerLiteral?: (ctx: MinIntegerLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `MinIntegerLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	exitMinIntegerLiteral?: (ctx: MinIntegerLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `MaxIntegerLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	enterMaxIntegerLiteral?: (ctx: MaxIntegerLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `MaxIntegerLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	exitMaxIntegerLiteral?: (ctx: MaxIntegerLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `IntegerLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	enterIntegerLiteral?: (ctx: IntegerLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `IntegerLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	exitIntegerLiteral?: (ctx: IntegerLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `HexadecimalLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	enterHexadecimalLiteral?: (ctx: HexadecimalLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `HexadecimalLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	exitHexadecimalLiteral?: (ctx: HexadecimalLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `CharacterLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	enterCharacterLiteral?: (ctx: CharacterLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `CharacterLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	exitCharacterLiteral?: (ctx: CharacterLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `DateLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	enterDateLiteral?: (ctx: DateLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `DateLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	exitDateLiteral?: (ctx: DateLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `TimeLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	enterTimeLiteral?: (ctx: TimeLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `TimeLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	exitTimeLiteral?: (ctx: TimeLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `TextLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	enterTextLiteral?: (ctx: TextLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `TextLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	exitTextLiteral?: (ctx: TextLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `DecimalLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	enterDecimalLiteral?: (ctx: DecimalLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `DecimalLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	exitDecimalLiteral?: (ctx: DecimalLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `DateTimeLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	enterDateTimeLiteral?: (ctx: DateTimeLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `DateTimeLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	exitDateTimeLiteral?: (ctx: DateTimeLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `BooleanLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	enterBooleanLiteral?: (ctx: BooleanLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `BooleanLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	exitBooleanLiteral?: (ctx: BooleanLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `PeriodLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	enterPeriodLiteral?: (ctx: PeriodLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `PeriodLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	exitPeriodLiteral?: (ctx: PeriodLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `VersionLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	enterVersionLiteral?: (ctx: VersionLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `VersionLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	exitVersionLiteral?: (ctx: VersionLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `UUIDLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	enterUUIDLiteral?: (ctx: UUIDLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `UUIDLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	exitUUIDLiteral?: (ctx: UUIDLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `SymbolLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	enterSymbolLiteral?: (ctx: SymbolLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `SymbolLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	exitSymbolLiteral?: (ctx: SymbolLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `TypeLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	enterTypeLiteral?: (ctx: TypeLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `TypeLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	exitTypeLiteral?: (ctx: TypeLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `NullLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	enterNullLiteral?: (ctx: NullLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `NullLiteral`
	 * labeled alternative in `EParser.atomic_literal`.
	 * @param ctx the parse tree
	 */
	exitNullLiteral?: (ctx: NullLiteralContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.literal_list_literal`.
	 * @param ctx the parse tree
	 */
	enterLiteral_list_literal?: (ctx: Literal_list_literalContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.literal_list_literal`.
	 * @param ctx the parse tree
	 */
	exitLiteral_list_literal?: (ctx: Literal_list_literalContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.this_expression`.
	 * @param ctx the parse tree
	 */
	enterThis_expression?: (ctx: This_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.this_expression`.
	 * @param ctx the parse tree
	 */
	exitThis_expression?: (ctx: This_expressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.super_expression`.
	 * @param ctx the parse tree
	 */
	enterSuper_expression?: (ctx: Super_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.super_expression`.
	 * @param ctx the parse tree
	 */
	exitSuper_expression?: (ctx: Super_expressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.parenthesis_expression`.
	 * @param ctx the parse tree
	 */
	enterParenthesis_expression?: (ctx: Parenthesis_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.parenthesis_expression`.
	 * @param ctx the parse tree
	 */
	exitParenthesis_expression?: (ctx: Parenthesis_expressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.literal_expression`.
	 * @param ctx the parse tree
	 */
	enterLiteral_expression?: (ctx: Literal_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.literal_expression`.
	 * @param ctx the parse tree
	 */
	exitLiteral_expression?: (ctx: Literal_expressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.collection_literal`.
	 * @param ctx the parse tree
	 */
	enterCollection_literal?: (ctx: Collection_literalContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.collection_literal`.
	 * @param ctx the parse tree
	 */
	exitCollection_literal?: (ctx: Collection_literalContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.tuple_literal`.
	 * @param ctx the parse tree
	 */
	enterTuple_literal?: (ctx: Tuple_literalContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.tuple_literal`.
	 * @param ctx the parse tree
	 */
	exitTuple_literal?: (ctx: Tuple_literalContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.dict_literal`.
	 * @param ctx the parse tree
	 */
	enterDict_literal?: (ctx: Dict_literalContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.dict_literal`.
	 * @param ctx the parse tree
	 */
	exitDict_literal?: (ctx: Dict_literalContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.document_literal`.
	 * @param ctx the parse tree
	 */
	enterDocument_literal?: (ctx: Document_literalContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.document_literal`.
	 * @param ctx the parse tree
	 */
	exitDocument_literal?: (ctx: Document_literalContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.expression_tuple`.
	 * @param ctx the parse tree
	 */
	enterExpression_tuple?: (ctx: Expression_tupleContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.expression_tuple`.
	 * @param ctx the parse tree
	 */
	exitExpression_tuple?: (ctx: Expression_tupleContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.doc_entry_list`.
	 * @param ctx the parse tree
	 */
	enterDoc_entry_list?: (ctx: Doc_entry_listContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.doc_entry_list`.
	 * @param ctx the parse tree
	 */
	exitDoc_entry_list?: (ctx: Doc_entry_listContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.doc_entry`.
	 * @param ctx the parse tree
	 */
	enterDoc_entry?: (ctx: Doc_entryContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.doc_entry`.
	 * @param ctx the parse tree
	 */
	exitDoc_entry?: (ctx: Doc_entryContext) => void;
	/**
	 * Enter a parse tree produced by the `DocKeyIdentifier`
	 * labeled alternative in `EParser.doc_key`.
	 * @param ctx the parse tree
	 */
	enterDocKeyIdentifier?: (ctx: DocKeyIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by the `DocKeyIdentifier`
	 * labeled alternative in `EParser.doc_key`.
	 * @param ctx the parse tree
	 */
	exitDocKeyIdentifier?: (ctx: DocKeyIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by the `DocKeyText`
	 * labeled alternative in `EParser.doc_key`.
	 * @param ctx the parse tree
	 */
	enterDocKeyText?: (ctx: DocKeyTextContext) => void;
	/**
	 * Exit a parse tree produced by the `DocKeyText`
	 * labeled alternative in `EParser.doc_key`.
	 * @param ctx the parse tree
	 */
	exitDocKeyText?: (ctx: DocKeyTextContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.dict_entry_list`.
	 * @param ctx the parse tree
	 */
	enterDict_entry_list?: (ctx: Dict_entry_listContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.dict_entry_list`.
	 * @param ctx the parse tree
	 */
	exitDict_entry_list?: (ctx: Dict_entry_listContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.dict_entry`.
	 * @param ctx the parse tree
	 */
	enterDict_entry?: (ctx: Dict_entryContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.dict_entry`.
	 * @param ctx the parse tree
	 */
	exitDict_entry?: (ctx: Dict_entryContext) => void;
	/**
	 * Enter a parse tree produced by the `DictKeyIdentifier`
	 * labeled alternative in `EParser.dict_key`.
	 * @param ctx the parse tree
	 */
	enterDictKeyIdentifier?: (ctx: DictKeyIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by the `DictKeyIdentifier`
	 * labeled alternative in `EParser.dict_key`.
	 * @param ctx the parse tree
	 */
	exitDictKeyIdentifier?: (ctx: DictKeyIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by the `DictKeyText`
	 * labeled alternative in `EParser.dict_key`.
	 * @param ctx the parse tree
	 */
	enterDictKeyText?: (ctx: DictKeyTextContext) => void;
	/**
	 * Exit a parse tree produced by the `DictKeyText`
	 * labeled alternative in `EParser.dict_key`.
	 * @param ctx the parse tree
	 */
	exitDictKeyText?: (ctx: DictKeyTextContext) => void;
	/**
	 * Enter a parse tree produced by the `SliceFirstAndLast`
	 * labeled alternative in `EParser.slice_arguments`.
	 * @param ctx the parse tree
	 */
	enterSliceFirstAndLast?: (ctx: SliceFirstAndLastContext) => void;
	/**
	 * Exit a parse tree produced by the `SliceFirstAndLast`
	 * labeled alternative in `EParser.slice_arguments`.
	 * @param ctx the parse tree
	 */
	exitSliceFirstAndLast?: (ctx: SliceFirstAndLastContext) => void;
	/**
	 * Enter a parse tree produced by the `SliceFirstOnly`
	 * labeled alternative in `EParser.slice_arguments`.
	 * @param ctx the parse tree
	 */
	enterSliceFirstOnly?: (ctx: SliceFirstOnlyContext) => void;
	/**
	 * Exit a parse tree produced by the `SliceFirstOnly`
	 * labeled alternative in `EParser.slice_arguments`.
	 * @param ctx the parse tree
	 */
	exitSliceFirstOnly?: (ctx: SliceFirstOnlyContext) => void;
	/**
	 * Enter a parse tree produced by the `SliceLastOnly`
	 * labeled alternative in `EParser.slice_arguments`.
	 * @param ctx the parse tree
	 */
	enterSliceLastOnly?: (ctx: SliceLastOnlyContext) => void;
	/**
	 * Exit a parse tree produced by the `SliceLastOnly`
	 * labeled alternative in `EParser.slice_arguments`.
	 * @param ctx the parse tree
	 */
	exitSliceLastOnly?: (ctx: SliceLastOnlyContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.assign_variable_statement`.
	 * @param ctx the parse tree
	 */
	enterAssign_variable_statement?: (ctx: Assign_variable_statementContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.assign_variable_statement`.
	 * @param ctx the parse tree
	 */
	exitAssign_variable_statement?: (ctx: Assign_variable_statementContext) => void;
	/**
	 * Enter a parse tree produced by the `ChildInstance`
	 * labeled alternative in `EParser.assignable_instance`.
	 * @param ctx the parse tree
	 */
	enterChildInstance?: (ctx: ChildInstanceContext) => void;
	/**
	 * Exit a parse tree produced by the `ChildInstance`
	 * labeled alternative in `EParser.assignable_instance`.
	 * @param ctx the parse tree
	 */
	exitChildInstance?: (ctx: ChildInstanceContext) => void;
	/**
	 * Enter a parse tree produced by the `RootInstance`
	 * labeled alternative in `EParser.assignable_instance`.
	 * @param ctx the parse tree
	 */
	enterRootInstance?: (ctx: RootInstanceContext) => void;
	/**
	 * Exit a parse tree produced by the `RootInstance`
	 * labeled alternative in `EParser.assignable_instance`.
	 * @param ctx the parse tree
	 */
	exitRootInstance?: (ctx: RootInstanceContext) => void;
	/**
	 * Enter a parse tree produced by the `IsATypeExpression`
	 * labeled alternative in `EParser.is_expression`.
	 * @param ctx the parse tree
	 */
	enterIsATypeExpression?: (ctx: IsATypeExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `IsATypeExpression`
	 * labeled alternative in `EParser.is_expression`.
	 * @param ctx the parse tree
	 */
	exitIsATypeExpression?: (ctx: IsATypeExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `IsOtherExpression`
	 * labeled alternative in `EParser.is_expression`.
	 * @param ctx the parse tree
	 */
	enterIsOtherExpression?: (ctx: IsOtherExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `IsOtherExpression`
	 * labeled alternative in `EParser.is_expression`.
	 * @param ctx the parse tree
	 */
	exitIsOtherExpression?: (ctx: IsOtherExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.metadata`.
	 * @param ctx the parse tree
	 */
	enterMetadata?: (ctx: MetadataContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.metadata`.
	 * @param ctx the parse tree
	 */
	exitMetadata?: (ctx: MetadataContext) => void;
	/**
	 * Enter a parse tree produced by the `ArrowExpressionBody`
	 * labeled alternative in `EParser.arrow_expression`.
	 * @param ctx the parse tree
	 */
	enterArrowExpressionBody?: (ctx: ArrowExpressionBodyContext) => void;
	/**
	 * Exit a parse tree produced by the `ArrowExpressionBody`
	 * labeled alternative in `EParser.arrow_expression`.
	 * @param ctx the parse tree
	 */
	exitArrowExpressionBody?: (ctx: ArrowExpressionBodyContext) => void;
	/**
	 * Enter a parse tree produced by the `ArrowStatementsBody`
	 * labeled alternative in `EParser.arrow_expression`.
	 * @param ctx the parse tree
	 */
	enterArrowStatementsBody?: (ctx: ArrowStatementsBodyContext) => void;
	/**
	 * Exit a parse tree produced by the `ArrowStatementsBody`
	 * labeled alternative in `EParser.arrow_expression`.
	 * @param ctx the parse tree
	 */
	exitArrowStatementsBody?: (ctx: ArrowStatementsBodyContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.arrow_prefix`.
	 * @param ctx the parse tree
	 */
	enterArrow_prefix?: (ctx: Arrow_prefixContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.arrow_prefix`.
	 * @param ctx the parse tree
	 */
	exitArrow_prefix?: (ctx: Arrow_prefixContext) => void;
	/**
	 * Enter a parse tree produced by the `ArrowSingleArg`
	 * labeled alternative in `EParser.arrow_args`.
	 * @param ctx the parse tree
	 */
	enterArrowSingleArg?: (ctx: ArrowSingleArgContext) => void;
	/**
	 * Exit a parse tree produced by the `ArrowSingleArg`
	 * labeled alternative in `EParser.arrow_args`.
	 * @param ctx the parse tree
	 */
	exitArrowSingleArg?: (ctx: ArrowSingleArgContext) => void;
	/**
	 * Enter a parse tree produced by the `ArrowListArg`
	 * labeled alternative in `EParser.arrow_args`.
	 * @param ctx the parse tree
	 */
	enterArrowListArg?: (ctx: ArrowListArgContext) => void;
	/**
	 * Exit a parse tree produced by the `ArrowListArg`
	 * labeled alternative in `EParser.arrow_args`.
	 * @param ctx the parse tree
	 */
	exitArrowListArg?: (ctx: ArrowListArgContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.sorted_key`.
	 * @param ctx the parse tree
	 */
	enterSorted_key?: (ctx: Sorted_keyContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.sorted_key`.
	 * @param ctx the parse tree
	 */
	exitSorted_key?: (ctx: Sorted_keyContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.read_blob_expression`.
	 * @param ctx the parse tree
	 */
	enterRead_blob_expression?: (ctx: Read_blob_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.read_blob_expression`.
	 * @param ctx the parse tree
	 */
	exitRead_blob_expression?: (ctx: Read_blob_expressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.read_all_expression`.
	 * @param ctx the parse tree
	 */
	enterRead_all_expression?: (ctx: Read_all_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.read_all_expression`.
	 * @param ctx the parse tree
	 */
	exitRead_all_expression?: (ctx: Read_all_expressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.read_one_expression`.
	 * @param ctx the parse tree
	 */
	enterRead_one_expression?: (ctx: Read_one_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.read_one_expression`.
	 * @param ctx the parse tree
	 */
	exitRead_one_expression?: (ctx: Read_one_expressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.order_by_list`.
	 * @param ctx the parse tree
	 */
	enterOrder_by_list?: (ctx: Order_by_listContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.order_by_list`.
	 * @param ctx the parse tree
	 */
	exitOrder_by_list?: (ctx: Order_by_listContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.order_by`.
	 * @param ctx the parse tree
	 */
	enterOrder_by?: (ctx: Order_byContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.order_by`.
	 * @param ctx the parse tree
	 */
	exitOrder_by?: (ctx: Order_byContext) => void;
	/**
	 * Enter a parse tree produced by the `OperatorPlus`
	 * labeled alternative in `EParser.operator`.
	 * @param ctx the parse tree
	 */
	enterOperatorPlus?: (ctx: OperatorPlusContext) => void;
	/**
	 * Exit a parse tree produced by the `OperatorPlus`
	 * labeled alternative in `EParser.operator`.
	 * @param ctx the parse tree
	 */
	exitOperatorPlus?: (ctx: OperatorPlusContext) => void;
	/**
	 * Enter a parse tree produced by the `OperatorMinus`
	 * labeled alternative in `EParser.operator`.
	 * @param ctx the parse tree
	 */
	enterOperatorMinus?: (ctx: OperatorMinusContext) => void;
	/**
	 * Exit a parse tree produced by the `OperatorMinus`
	 * labeled alternative in `EParser.operator`.
	 * @param ctx the parse tree
	 */
	exitOperatorMinus?: (ctx: OperatorMinusContext) => void;
	/**
	 * Enter a parse tree produced by the `OperatorMultiply`
	 * labeled alternative in `EParser.operator`.
	 * @param ctx the parse tree
	 */
	enterOperatorMultiply?: (ctx: OperatorMultiplyContext) => void;
	/**
	 * Exit a parse tree produced by the `OperatorMultiply`
	 * labeled alternative in `EParser.operator`.
	 * @param ctx the parse tree
	 */
	exitOperatorMultiply?: (ctx: OperatorMultiplyContext) => void;
	/**
	 * Enter a parse tree produced by the `OperatorDivide`
	 * labeled alternative in `EParser.operator`.
	 * @param ctx the parse tree
	 */
	enterOperatorDivide?: (ctx: OperatorDivideContext) => void;
	/**
	 * Exit a parse tree produced by the `OperatorDivide`
	 * labeled alternative in `EParser.operator`.
	 * @param ctx the parse tree
	 */
	exitOperatorDivide?: (ctx: OperatorDivideContext) => void;
	/**
	 * Enter a parse tree produced by the `OperatorIDivide`
	 * labeled alternative in `EParser.operator`.
	 * @param ctx the parse tree
	 */
	enterOperatorIDivide?: (ctx: OperatorIDivideContext) => void;
	/**
	 * Exit a parse tree produced by the `OperatorIDivide`
	 * labeled alternative in `EParser.operator`.
	 * @param ctx the parse tree
	 */
	exitOperatorIDivide?: (ctx: OperatorIDivideContext) => void;
	/**
	 * Enter a parse tree produced by the `OperatorModulo`
	 * labeled alternative in `EParser.operator`.
	 * @param ctx the parse tree
	 */
	enterOperatorModulo?: (ctx: OperatorModuloContext) => void;
	/**
	 * Exit a parse tree produced by the `OperatorModulo`
	 * labeled alternative in `EParser.operator`.
	 * @param ctx the parse tree
	 */
	exitOperatorModulo?: (ctx: OperatorModuloContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.keyword`.
	 * @param ctx the parse tree
	 */
	enterKeyword?: (ctx: KeywordContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.keyword`.
	 * @param ctx the parse tree
	 */
	exitKeyword?: (ctx: KeywordContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.new_token`.
	 * @param ctx the parse tree
	 */
	enterNew_token?: (ctx: New_tokenContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.new_token`.
	 * @param ctx the parse tree
	 */
	exitNew_token?: (ctx: New_tokenContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.key_token`.
	 * @param ctx the parse tree
	 */
	enterKey_token?: (ctx: Key_tokenContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.key_token`.
	 * @param ctx the parse tree
	 */
	exitKey_token?: (ctx: Key_tokenContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.module_token`.
	 * @param ctx the parse tree
	 */
	enterModule_token?: (ctx: Module_tokenContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.module_token`.
	 * @param ctx the parse tree
	 */
	exitModule_token?: (ctx: Module_tokenContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.value_token`.
	 * @param ctx the parse tree
	 */
	enterValue_token?: (ctx: Value_tokenContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.value_token`.
	 * @param ctx the parse tree
	 */
	exitValue_token?: (ctx: Value_tokenContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.symbols_token`.
	 * @param ctx the parse tree
	 */
	enterSymbols_token?: (ctx: Symbols_tokenContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.symbols_token`.
	 * @param ctx the parse tree
	 */
	exitSymbols_token?: (ctx: Symbols_tokenContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.assign`.
	 * @param ctx the parse tree
	 */
	enterAssign?: (ctx: AssignContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.assign`.
	 * @param ctx the parse tree
	 */
	exitAssign?: (ctx: AssignContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.multiply`.
	 * @param ctx the parse tree
	 */
	enterMultiply?: (ctx: MultiplyContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.multiply`.
	 * @param ctx the parse tree
	 */
	exitMultiply?: (ctx: MultiplyContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.divide`.
	 * @param ctx the parse tree
	 */
	enterDivide?: (ctx: DivideContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.divide`.
	 * @param ctx the parse tree
	 */
	exitDivide?: (ctx: DivideContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.idivide`.
	 * @param ctx the parse tree
	 */
	enterIdivide?: (ctx: IdivideContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.idivide`.
	 * @param ctx the parse tree
	 */
	exitIdivide?: (ctx: IdivideContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.modulo`.
	 * @param ctx the parse tree
	 */
	enterModulo?: (ctx: ModuloContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.modulo`.
	 * @param ctx the parse tree
	 */
	exitModulo?: (ctx: ModuloContext) => void;
	/**
	 * Enter a parse tree produced by the `JavascriptReturnStatement`
	 * labeled alternative in `EParser.javascript_statement`.
	 * @param ctx the parse tree
	 */
	enterJavascriptReturnStatement?: (ctx: JavascriptReturnStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `JavascriptReturnStatement`
	 * labeled alternative in `EParser.javascript_statement`.
	 * @param ctx the parse tree
	 */
	exitJavascriptReturnStatement?: (ctx: JavascriptReturnStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `JavascriptStatement`
	 * labeled alternative in `EParser.javascript_statement`.
	 * @param ctx the parse tree
	 */
	enterJavascriptStatement?: (ctx: JavascriptStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `JavascriptStatement`
	 * labeled alternative in `EParser.javascript_statement`.
	 * @param ctx the parse tree
	 */
	exitJavascriptStatement?: (ctx: JavascriptStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `JavascriptSelectorExpression`
	 * labeled alternative in `EParser.javascript_expression`.
	 * @param ctx the parse tree
	 */
	enterJavascriptSelectorExpression?: (ctx: JavascriptSelectorExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `JavascriptSelectorExpression`
	 * labeled alternative in `EParser.javascript_expression`.
	 * @param ctx the parse tree
	 */
	exitJavascriptSelectorExpression?: (ctx: JavascriptSelectorExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `JavascriptPrimaryExpression`
	 * labeled alternative in `EParser.javascript_expression`.
	 * @param ctx the parse tree
	 */
	enterJavascriptPrimaryExpression?: (ctx: JavascriptPrimaryExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `JavascriptPrimaryExpression`
	 * labeled alternative in `EParser.javascript_expression`.
	 * @param ctx the parse tree
	 */
	exitJavascriptPrimaryExpression?: (ctx: JavascriptPrimaryExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.javascript_primary_expression`.
	 * @param ctx the parse tree
	 */
	enterJavascript_primary_expression?: (ctx: Javascript_primary_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.javascript_primary_expression`.
	 * @param ctx the parse tree
	 */
	exitJavascript_primary_expression?: (ctx: Javascript_primary_expressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.javascript_this_expression`.
	 * @param ctx the parse tree
	 */
	enterJavascript_this_expression?: (ctx: Javascript_this_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.javascript_this_expression`.
	 * @param ctx the parse tree
	 */
	exitJavascript_this_expression?: (ctx: Javascript_this_expressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.javascript_new_expression`.
	 * @param ctx the parse tree
	 */
	enterJavascript_new_expression?: (ctx: Javascript_new_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.javascript_new_expression`.
	 * @param ctx the parse tree
	 */
	exitJavascript_new_expression?: (ctx: Javascript_new_expressionContext) => void;
	/**
	 * Enter a parse tree produced by the `JavascriptMethodExpression`
	 * labeled alternative in `EParser.javascript_selector_expression`.
	 * @param ctx the parse tree
	 */
	enterJavascriptMethodExpression?: (ctx: JavascriptMethodExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `JavascriptMethodExpression`
	 * labeled alternative in `EParser.javascript_selector_expression`.
	 * @param ctx the parse tree
	 */
	exitJavascriptMethodExpression?: (ctx: JavascriptMethodExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `JavascriptMemberExpression`
	 * labeled alternative in `EParser.javascript_selector_expression`.
	 * @param ctx the parse tree
	 */
	enterJavascriptMemberExpression?: (ctx: JavascriptMemberExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `JavascriptMemberExpression`
	 * labeled alternative in `EParser.javascript_selector_expression`.
	 * @param ctx the parse tree
	 */
	exitJavascriptMemberExpression?: (ctx: JavascriptMemberExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `JavascriptItemExpression`
	 * labeled alternative in `EParser.javascript_selector_expression`.
	 * @param ctx the parse tree
	 */
	enterJavascriptItemExpression?: (ctx: JavascriptItemExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `JavascriptItemExpression`
	 * labeled alternative in `EParser.javascript_selector_expression`.
	 * @param ctx the parse tree
	 */
	exitJavascriptItemExpression?: (ctx: JavascriptItemExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.javascript_method_expression`.
	 * @param ctx the parse tree
	 */
	enterJavascript_method_expression?: (ctx: Javascript_method_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.javascript_method_expression`.
	 * @param ctx the parse tree
	 */
	exitJavascript_method_expression?: (ctx: Javascript_method_expressionContext) => void;
	/**
	 * Enter a parse tree produced by the `JavascriptArgumentList`
	 * labeled alternative in `EParser.javascript_arguments`.
	 * @param ctx the parse tree
	 */
	enterJavascriptArgumentList?: (ctx: JavascriptArgumentListContext) => void;
	/**
	 * Exit a parse tree produced by the `JavascriptArgumentList`
	 * labeled alternative in `EParser.javascript_arguments`.
	 * @param ctx the parse tree
	 */
	exitJavascriptArgumentList?: (ctx: JavascriptArgumentListContext) => void;
	/**
	 * Enter a parse tree produced by the `JavascriptArgumentListItem`
	 * labeled alternative in `EParser.javascript_arguments`.
	 * @param ctx the parse tree
	 */
	enterJavascriptArgumentListItem?: (ctx: JavascriptArgumentListItemContext) => void;
	/**
	 * Exit a parse tree produced by the `JavascriptArgumentListItem`
	 * labeled alternative in `EParser.javascript_arguments`.
	 * @param ctx the parse tree
	 */
	exitJavascriptArgumentListItem?: (ctx: JavascriptArgumentListItemContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.javascript_item_expression`.
	 * @param ctx the parse tree
	 */
	enterJavascript_item_expression?: (ctx: Javascript_item_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.javascript_item_expression`.
	 * @param ctx the parse tree
	 */
	exitJavascript_item_expression?: (ctx: Javascript_item_expressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.javascript_parenthesis_expression`.
	 * @param ctx the parse tree
	 */
	enterJavascript_parenthesis_expression?: (ctx: Javascript_parenthesis_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.javascript_parenthesis_expression`.
	 * @param ctx the parse tree
	 */
	exitJavascript_parenthesis_expression?: (ctx: Javascript_parenthesis_expressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.javascript_identifier_expression`.
	 * @param ctx the parse tree
	 */
	enterJavascript_identifier_expression?: (ctx: Javascript_identifier_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.javascript_identifier_expression`.
	 * @param ctx the parse tree
	 */
	exitJavascript_identifier_expression?: (ctx: Javascript_identifier_expressionContext) => void;
	/**
	 * Enter a parse tree produced by the `JavascriptIntegerLiteral`
	 * labeled alternative in `EParser.javascript_literal_expression`.
	 * @param ctx the parse tree
	 */
	enterJavascriptIntegerLiteral?: (ctx: JavascriptIntegerLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `JavascriptIntegerLiteral`
	 * labeled alternative in `EParser.javascript_literal_expression`.
	 * @param ctx the parse tree
	 */
	exitJavascriptIntegerLiteral?: (ctx: JavascriptIntegerLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `JavascriptDecimalLiteral`
	 * labeled alternative in `EParser.javascript_literal_expression`.
	 * @param ctx the parse tree
	 */
	enterJavascriptDecimalLiteral?: (ctx: JavascriptDecimalLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `JavascriptDecimalLiteral`
	 * labeled alternative in `EParser.javascript_literal_expression`.
	 * @param ctx the parse tree
	 */
	exitJavascriptDecimalLiteral?: (ctx: JavascriptDecimalLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `JavascriptTextLiteral`
	 * labeled alternative in `EParser.javascript_literal_expression`.
	 * @param ctx the parse tree
	 */
	enterJavascriptTextLiteral?: (ctx: JavascriptTextLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `JavascriptTextLiteral`
	 * labeled alternative in `EParser.javascript_literal_expression`.
	 * @param ctx the parse tree
	 */
	exitJavascriptTextLiteral?: (ctx: JavascriptTextLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `JavascriptBooleanLiteral`
	 * labeled alternative in `EParser.javascript_literal_expression`.
	 * @param ctx the parse tree
	 */
	enterJavascriptBooleanLiteral?: (ctx: JavascriptBooleanLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `JavascriptBooleanLiteral`
	 * labeled alternative in `EParser.javascript_literal_expression`.
	 * @param ctx the parse tree
	 */
	exitJavascriptBooleanLiteral?: (ctx: JavascriptBooleanLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `JavascriptCharacterLiteral`
	 * labeled alternative in `EParser.javascript_literal_expression`.
	 * @param ctx the parse tree
	 */
	enterJavascriptCharacterLiteral?: (ctx: JavascriptCharacterLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `JavascriptCharacterLiteral`
	 * labeled alternative in `EParser.javascript_literal_expression`.
	 * @param ctx the parse tree
	 */
	exitJavascriptCharacterLiteral?: (ctx: JavascriptCharacterLiteralContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.javascript_identifier`.
	 * @param ctx the parse tree
	 */
	enterJavascript_identifier?: (ctx: Javascript_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.javascript_identifier`.
	 * @param ctx the parse tree
	 */
	exitJavascript_identifier?: (ctx: Javascript_identifierContext) => void;
	/**
	 * Enter a parse tree produced by the `PythonReturnStatement`
	 * labeled alternative in `EParser.python_statement`.
	 * @param ctx the parse tree
	 */
	enterPythonReturnStatement?: (ctx: PythonReturnStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `PythonReturnStatement`
	 * labeled alternative in `EParser.python_statement`.
	 * @param ctx the parse tree
	 */
	exitPythonReturnStatement?: (ctx: PythonReturnStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `PythonStatement`
	 * labeled alternative in `EParser.python_statement`.
	 * @param ctx the parse tree
	 */
	enterPythonStatement?: (ctx: PythonStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `PythonStatement`
	 * labeled alternative in `EParser.python_statement`.
	 * @param ctx the parse tree
	 */
	exitPythonStatement?: (ctx: PythonStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `PythonSelectorExpression`
	 * labeled alternative in `EParser.python_expression`.
	 * @param ctx the parse tree
	 */
	enterPythonSelectorExpression?: (ctx: PythonSelectorExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `PythonSelectorExpression`
	 * labeled alternative in `EParser.python_expression`.
	 * @param ctx the parse tree
	 */
	exitPythonSelectorExpression?: (ctx: PythonSelectorExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `PythonPrimaryExpression`
	 * labeled alternative in `EParser.python_expression`.
	 * @param ctx the parse tree
	 */
	enterPythonPrimaryExpression?: (ctx: PythonPrimaryExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `PythonPrimaryExpression`
	 * labeled alternative in `EParser.python_expression`.
	 * @param ctx the parse tree
	 */
	exitPythonPrimaryExpression?: (ctx: PythonPrimaryExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `PythonSelfExpression`
	 * labeled alternative in `EParser.python_primary_expression`.
	 * @param ctx the parse tree
	 */
	enterPythonSelfExpression?: (ctx: PythonSelfExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `PythonSelfExpression`
	 * labeled alternative in `EParser.python_primary_expression`.
	 * @param ctx the parse tree
	 */
	exitPythonSelfExpression?: (ctx: PythonSelfExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `PythonParenthesisExpression`
	 * labeled alternative in `EParser.python_primary_expression`.
	 * @param ctx the parse tree
	 */
	enterPythonParenthesisExpression?: (ctx: PythonParenthesisExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `PythonParenthesisExpression`
	 * labeled alternative in `EParser.python_primary_expression`.
	 * @param ctx the parse tree
	 */
	exitPythonParenthesisExpression?: (ctx: PythonParenthesisExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `PythonIdentifierExpression`
	 * labeled alternative in `EParser.python_primary_expression`.
	 * @param ctx the parse tree
	 */
	enterPythonIdentifierExpression?: (ctx: PythonIdentifierExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `PythonIdentifierExpression`
	 * labeled alternative in `EParser.python_primary_expression`.
	 * @param ctx the parse tree
	 */
	exitPythonIdentifierExpression?: (ctx: PythonIdentifierExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `PythonLiteralExpression`
	 * labeled alternative in `EParser.python_primary_expression`.
	 * @param ctx the parse tree
	 */
	enterPythonLiteralExpression?: (ctx: PythonLiteralExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `PythonLiteralExpression`
	 * labeled alternative in `EParser.python_primary_expression`.
	 * @param ctx the parse tree
	 */
	exitPythonLiteralExpression?: (ctx: PythonLiteralExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `PythonGlobalMethodExpression`
	 * labeled alternative in `EParser.python_primary_expression`.
	 * @param ctx the parse tree
	 */
	enterPythonGlobalMethodExpression?: (ctx: PythonGlobalMethodExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `PythonGlobalMethodExpression`
	 * labeled alternative in `EParser.python_primary_expression`.
	 * @param ctx the parse tree
	 */
	exitPythonGlobalMethodExpression?: (ctx: PythonGlobalMethodExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.python_self_expression`.
	 * @param ctx the parse tree
	 */
	enterPython_self_expression?: (ctx: Python_self_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.python_self_expression`.
	 * @param ctx the parse tree
	 */
	exitPython_self_expression?: (ctx: Python_self_expressionContext) => void;
	/**
	 * Enter a parse tree produced by the `PythonMethodExpression`
	 * labeled alternative in `EParser.python_selector_expression`.
	 * @param ctx the parse tree
	 */
	enterPythonMethodExpression?: (ctx: PythonMethodExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `PythonMethodExpression`
	 * labeled alternative in `EParser.python_selector_expression`.
	 * @param ctx the parse tree
	 */
	exitPythonMethodExpression?: (ctx: PythonMethodExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `PythonItemExpression`
	 * labeled alternative in `EParser.python_selector_expression`.
	 * @param ctx the parse tree
	 */
	enterPythonItemExpression?: (ctx: PythonItemExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `PythonItemExpression`
	 * labeled alternative in `EParser.python_selector_expression`.
	 * @param ctx the parse tree
	 */
	exitPythonItemExpression?: (ctx: PythonItemExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.python_method_expression`.
	 * @param ctx the parse tree
	 */
	enterPython_method_expression?: (ctx: Python_method_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.python_method_expression`.
	 * @param ctx the parse tree
	 */
	exitPython_method_expression?: (ctx: Python_method_expressionContext) => void;
	/**
	 * Enter a parse tree produced by the `PythonOrdinalOnlyArgumentList`
	 * labeled alternative in `EParser.python_argument_list`.
	 * @param ctx the parse tree
	 */
	enterPythonOrdinalOnlyArgumentList?: (ctx: PythonOrdinalOnlyArgumentListContext) => void;
	/**
	 * Exit a parse tree produced by the `PythonOrdinalOnlyArgumentList`
	 * labeled alternative in `EParser.python_argument_list`.
	 * @param ctx the parse tree
	 */
	exitPythonOrdinalOnlyArgumentList?: (ctx: PythonOrdinalOnlyArgumentListContext) => void;
	/**
	 * Enter a parse tree produced by the `PythonNamedOnlyArgumentList`
	 * labeled alternative in `EParser.python_argument_list`.
	 * @param ctx the parse tree
	 */
	enterPythonNamedOnlyArgumentList?: (ctx: PythonNamedOnlyArgumentListContext) => void;
	/**
	 * Exit a parse tree produced by the `PythonNamedOnlyArgumentList`
	 * labeled alternative in `EParser.python_argument_list`.
	 * @param ctx the parse tree
	 */
	exitPythonNamedOnlyArgumentList?: (ctx: PythonNamedOnlyArgumentListContext) => void;
	/**
	 * Enter a parse tree produced by the `PythonArgumentList`
	 * labeled alternative in `EParser.python_argument_list`.
	 * @param ctx the parse tree
	 */
	enterPythonArgumentList?: (ctx: PythonArgumentListContext) => void;
	/**
	 * Exit a parse tree produced by the `PythonArgumentList`
	 * labeled alternative in `EParser.python_argument_list`.
	 * @param ctx the parse tree
	 */
	exitPythonArgumentList?: (ctx: PythonArgumentListContext) => void;
	/**
	 * Enter a parse tree produced by the `PythonOrdinalArgumentList`
	 * labeled alternative in `EParser.python_ordinal_argument_list`.
	 * @param ctx the parse tree
	 */
	enterPythonOrdinalArgumentList?: (ctx: PythonOrdinalArgumentListContext) => void;
	/**
	 * Exit a parse tree produced by the `PythonOrdinalArgumentList`
	 * labeled alternative in `EParser.python_ordinal_argument_list`.
	 * @param ctx the parse tree
	 */
	exitPythonOrdinalArgumentList?: (ctx: PythonOrdinalArgumentListContext) => void;
	/**
	 * Enter a parse tree produced by the `PythonOrdinalArgumentListItem`
	 * labeled alternative in `EParser.python_ordinal_argument_list`.
	 * @param ctx the parse tree
	 */
	enterPythonOrdinalArgumentListItem?: (ctx: PythonOrdinalArgumentListItemContext) => void;
	/**
	 * Exit a parse tree produced by the `PythonOrdinalArgumentListItem`
	 * labeled alternative in `EParser.python_ordinal_argument_list`.
	 * @param ctx the parse tree
	 */
	exitPythonOrdinalArgumentListItem?: (ctx: PythonOrdinalArgumentListItemContext) => void;
	/**
	 * Enter a parse tree produced by the `PythonNamedArgumentList`
	 * labeled alternative in `EParser.python_named_argument_list`.
	 * @param ctx the parse tree
	 */
	enterPythonNamedArgumentList?: (ctx: PythonNamedArgumentListContext) => void;
	/**
	 * Exit a parse tree produced by the `PythonNamedArgumentList`
	 * labeled alternative in `EParser.python_named_argument_list`.
	 * @param ctx the parse tree
	 */
	exitPythonNamedArgumentList?: (ctx: PythonNamedArgumentListContext) => void;
	/**
	 * Enter a parse tree produced by the `PythonNamedArgumentListItem`
	 * labeled alternative in `EParser.python_named_argument_list`.
	 * @param ctx the parse tree
	 */
	enterPythonNamedArgumentListItem?: (ctx: PythonNamedArgumentListItemContext) => void;
	/**
	 * Exit a parse tree produced by the `PythonNamedArgumentListItem`
	 * labeled alternative in `EParser.python_named_argument_list`.
	 * @param ctx the parse tree
	 */
	exitPythonNamedArgumentListItem?: (ctx: PythonNamedArgumentListItemContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.python_parenthesis_expression`.
	 * @param ctx the parse tree
	 */
	enterPython_parenthesis_expression?: (ctx: Python_parenthesis_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.python_parenthesis_expression`.
	 * @param ctx the parse tree
	 */
	exitPython_parenthesis_expression?: (ctx: Python_parenthesis_expressionContext) => void;
	/**
	 * Enter a parse tree produced by the `PythonChildIdentifier`
	 * labeled alternative in `EParser.python_identifier_expression`.
	 * @param ctx the parse tree
	 */
	enterPythonChildIdentifier?: (ctx: PythonChildIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by the `PythonChildIdentifier`
	 * labeled alternative in `EParser.python_identifier_expression`.
	 * @param ctx the parse tree
	 */
	exitPythonChildIdentifier?: (ctx: PythonChildIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by the `PythonPromptoIdentifier`
	 * labeled alternative in `EParser.python_identifier_expression`.
	 * @param ctx the parse tree
	 */
	enterPythonPromptoIdentifier?: (ctx: PythonPromptoIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by the `PythonPromptoIdentifier`
	 * labeled alternative in `EParser.python_identifier_expression`.
	 * @param ctx the parse tree
	 */
	exitPythonPromptoIdentifier?: (ctx: PythonPromptoIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by the `PythonIdentifier`
	 * labeled alternative in `EParser.python_identifier_expression`.
	 * @param ctx the parse tree
	 */
	enterPythonIdentifier?: (ctx: PythonIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by the `PythonIdentifier`
	 * labeled alternative in `EParser.python_identifier_expression`.
	 * @param ctx the parse tree
	 */
	exitPythonIdentifier?: (ctx: PythonIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by the `PythonIntegerLiteral`
	 * labeled alternative in `EParser.python_literal_expression`.
	 * @param ctx the parse tree
	 */
	enterPythonIntegerLiteral?: (ctx: PythonIntegerLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `PythonIntegerLiteral`
	 * labeled alternative in `EParser.python_literal_expression`.
	 * @param ctx the parse tree
	 */
	exitPythonIntegerLiteral?: (ctx: PythonIntegerLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `PythonDecimalLiteral`
	 * labeled alternative in `EParser.python_literal_expression`.
	 * @param ctx the parse tree
	 */
	enterPythonDecimalLiteral?: (ctx: PythonDecimalLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `PythonDecimalLiteral`
	 * labeled alternative in `EParser.python_literal_expression`.
	 * @param ctx the parse tree
	 */
	exitPythonDecimalLiteral?: (ctx: PythonDecimalLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `PythonTextLiteral`
	 * labeled alternative in `EParser.python_literal_expression`.
	 * @param ctx the parse tree
	 */
	enterPythonTextLiteral?: (ctx: PythonTextLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `PythonTextLiteral`
	 * labeled alternative in `EParser.python_literal_expression`.
	 * @param ctx the parse tree
	 */
	exitPythonTextLiteral?: (ctx: PythonTextLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `PythonBooleanLiteral`
	 * labeled alternative in `EParser.python_literal_expression`.
	 * @param ctx the parse tree
	 */
	enterPythonBooleanLiteral?: (ctx: PythonBooleanLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `PythonBooleanLiteral`
	 * labeled alternative in `EParser.python_literal_expression`.
	 * @param ctx the parse tree
	 */
	exitPythonBooleanLiteral?: (ctx: PythonBooleanLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `PythonCharacterLiteral`
	 * labeled alternative in `EParser.python_literal_expression`.
	 * @param ctx the parse tree
	 */
	enterPythonCharacterLiteral?: (ctx: PythonCharacterLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `PythonCharacterLiteral`
	 * labeled alternative in `EParser.python_literal_expression`.
	 * @param ctx the parse tree
	 */
	exitPythonCharacterLiteral?: (ctx: PythonCharacterLiteralContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.python_identifier`.
	 * @param ctx the parse tree
	 */
	enterPython_identifier?: (ctx: Python_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.python_identifier`.
	 * @param ctx the parse tree
	 */
	exitPython_identifier?: (ctx: Python_identifierContext) => void;
	/**
	 * Enter a parse tree produced by the `JavaReturnStatement`
	 * labeled alternative in `EParser.java_statement`.
	 * @param ctx the parse tree
	 */
	enterJavaReturnStatement?: (ctx: JavaReturnStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `JavaReturnStatement`
	 * labeled alternative in `EParser.java_statement`.
	 * @param ctx the parse tree
	 */
	exitJavaReturnStatement?: (ctx: JavaReturnStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `JavaStatement`
	 * labeled alternative in `EParser.java_statement`.
	 * @param ctx the parse tree
	 */
	enterJavaStatement?: (ctx: JavaStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `JavaStatement`
	 * labeled alternative in `EParser.java_statement`.
	 * @param ctx the parse tree
	 */
	exitJavaStatement?: (ctx: JavaStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `JavaSelectorExpression`
	 * labeled alternative in `EParser.java_expression`.
	 * @param ctx the parse tree
	 */
	enterJavaSelectorExpression?: (ctx: JavaSelectorExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `JavaSelectorExpression`
	 * labeled alternative in `EParser.java_expression`.
	 * @param ctx the parse tree
	 */
	exitJavaSelectorExpression?: (ctx: JavaSelectorExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `JavaPrimaryExpression`
	 * labeled alternative in `EParser.java_expression`.
	 * @param ctx the parse tree
	 */
	enterJavaPrimaryExpression?: (ctx: JavaPrimaryExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `JavaPrimaryExpression`
	 * labeled alternative in `EParser.java_expression`.
	 * @param ctx the parse tree
	 */
	exitJavaPrimaryExpression?: (ctx: JavaPrimaryExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.java_primary_expression`.
	 * @param ctx the parse tree
	 */
	enterJava_primary_expression?: (ctx: Java_primary_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.java_primary_expression`.
	 * @param ctx the parse tree
	 */
	exitJava_primary_expression?: (ctx: Java_primary_expressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.java_this_expression`.
	 * @param ctx the parse tree
	 */
	enterJava_this_expression?: (ctx: Java_this_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.java_this_expression`.
	 * @param ctx the parse tree
	 */
	exitJava_this_expression?: (ctx: Java_this_expressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.java_new_expression`.
	 * @param ctx the parse tree
	 */
	enterJava_new_expression?: (ctx: Java_new_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.java_new_expression`.
	 * @param ctx the parse tree
	 */
	exitJava_new_expression?: (ctx: Java_new_expressionContext) => void;
	/**
	 * Enter a parse tree produced by the `JavaMethodExpression`
	 * labeled alternative in `EParser.java_selector_expression`.
	 * @param ctx the parse tree
	 */
	enterJavaMethodExpression?: (ctx: JavaMethodExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `JavaMethodExpression`
	 * labeled alternative in `EParser.java_selector_expression`.
	 * @param ctx the parse tree
	 */
	exitJavaMethodExpression?: (ctx: JavaMethodExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `JavaItemExpression`
	 * labeled alternative in `EParser.java_selector_expression`.
	 * @param ctx the parse tree
	 */
	enterJavaItemExpression?: (ctx: JavaItemExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `JavaItemExpression`
	 * labeled alternative in `EParser.java_selector_expression`.
	 * @param ctx the parse tree
	 */
	exitJavaItemExpression?: (ctx: JavaItemExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.java_method_expression`.
	 * @param ctx the parse tree
	 */
	enterJava_method_expression?: (ctx: Java_method_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.java_method_expression`.
	 * @param ctx the parse tree
	 */
	exitJava_method_expression?: (ctx: Java_method_expressionContext) => void;
	/**
	 * Enter a parse tree produced by the `JavaArgumentListItem`
	 * labeled alternative in `EParser.java_arguments`.
	 * @param ctx the parse tree
	 */
	enterJavaArgumentListItem?: (ctx: JavaArgumentListItemContext) => void;
	/**
	 * Exit a parse tree produced by the `JavaArgumentListItem`
	 * labeled alternative in `EParser.java_arguments`.
	 * @param ctx the parse tree
	 */
	exitJavaArgumentListItem?: (ctx: JavaArgumentListItemContext) => void;
	/**
	 * Enter a parse tree produced by the `JavaArgumentList`
	 * labeled alternative in `EParser.java_arguments`.
	 * @param ctx the parse tree
	 */
	enterJavaArgumentList?: (ctx: JavaArgumentListContext) => void;
	/**
	 * Exit a parse tree produced by the `JavaArgumentList`
	 * labeled alternative in `EParser.java_arguments`.
	 * @param ctx the parse tree
	 */
	exitJavaArgumentList?: (ctx: JavaArgumentListContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.java_item_expression`.
	 * @param ctx the parse tree
	 */
	enterJava_item_expression?: (ctx: Java_item_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.java_item_expression`.
	 * @param ctx the parse tree
	 */
	exitJava_item_expression?: (ctx: Java_item_expressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.java_parenthesis_expression`.
	 * @param ctx the parse tree
	 */
	enterJava_parenthesis_expression?: (ctx: Java_parenthesis_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.java_parenthesis_expression`.
	 * @param ctx the parse tree
	 */
	exitJava_parenthesis_expression?: (ctx: Java_parenthesis_expressionContext) => void;
	/**
	 * Enter a parse tree produced by the `JavaIdentifier`
	 * labeled alternative in `EParser.java_identifier_expression`.
	 * @param ctx the parse tree
	 */
	enterJavaIdentifier?: (ctx: JavaIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by the `JavaIdentifier`
	 * labeled alternative in `EParser.java_identifier_expression`.
	 * @param ctx the parse tree
	 */
	exitJavaIdentifier?: (ctx: JavaIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by the `JavaChildIdentifier`
	 * labeled alternative in `EParser.java_identifier_expression`.
	 * @param ctx the parse tree
	 */
	enterJavaChildIdentifier?: (ctx: JavaChildIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by the `JavaChildIdentifier`
	 * labeled alternative in `EParser.java_identifier_expression`.
	 * @param ctx the parse tree
	 */
	exitJavaChildIdentifier?: (ctx: JavaChildIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by the `JavaClassIdentifier`
	 * labeled alternative in `EParser.java_class_identifier_expression`.
	 * @param ctx the parse tree
	 */
	enterJavaClassIdentifier?: (ctx: JavaClassIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by the `JavaClassIdentifier`
	 * labeled alternative in `EParser.java_class_identifier_expression`.
	 * @param ctx the parse tree
	 */
	exitJavaClassIdentifier?: (ctx: JavaClassIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by the `JavaChildClassIdentifier`
	 * labeled alternative in `EParser.java_class_identifier_expression`.
	 * @param ctx the parse tree
	 */
	enterJavaChildClassIdentifier?: (ctx: JavaChildClassIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by the `JavaChildClassIdentifier`
	 * labeled alternative in `EParser.java_class_identifier_expression`.
	 * @param ctx the parse tree
	 */
	exitJavaChildClassIdentifier?: (ctx: JavaChildClassIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by the `JavaIntegerLiteral`
	 * labeled alternative in `EParser.java_literal_expression`.
	 * @param ctx the parse tree
	 */
	enterJavaIntegerLiteral?: (ctx: JavaIntegerLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `JavaIntegerLiteral`
	 * labeled alternative in `EParser.java_literal_expression`.
	 * @param ctx the parse tree
	 */
	exitJavaIntegerLiteral?: (ctx: JavaIntegerLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `JavaDecimalLiteral`
	 * labeled alternative in `EParser.java_literal_expression`.
	 * @param ctx the parse tree
	 */
	enterJavaDecimalLiteral?: (ctx: JavaDecimalLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `JavaDecimalLiteral`
	 * labeled alternative in `EParser.java_literal_expression`.
	 * @param ctx the parse tree
	 */
	exitJavaDecimalLiteral?: (ctx: JavaDecimalLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `JavaTextLiteral`
	 * labeled alternative in `EParser.java_literal_expression`.
	 * @param ctx the parse tree
	 */
	enterJavaTextLiteral?: (ctx: JavaTextLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `JavaTextLiteral`
	 * labeled alternative in `EParser.java_literal_expression`.
	 * @param ctx the parse tree
	 */
	exitJavaTextLiteral?: (ctx: JavaTextLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `JavaBooleanLiteral`
	 * labeled alternative in `EParser.java_literal_expression`.
	 * @param ctx the parse tree
	 */
	enterJavaBooleanLiteral?: (ctx: JavaBooleanLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `JavaBooleanLiteral`
	 * labeled alternative in `EParser.java_literal_expression`.
	 * @param ctx the parse tree
	 */
	exitJavaBooleanLiteral?: (ctx: JavaBooleanLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `JavaCharacterLiteral`
	 * labeled alternative in `EParser.java_literal_expression`.
	 * @param ctx the parse tree
	 */
	enterJavaCharacterLiteral?: (ctx: JavaCharacterLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `JavaCharacterLiteral`
	 * labeled alternative in `EParser.java_literal_expression`.
	 * @param ctx the parse tree
	 */
	exitJavaCharacterLiteral?: (ctx: JavaCharacterLiteralContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.java_identifier`.
	 * @param ctx the parse tree
	 */
	enterJava_identifier?: (ctx: Java_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.java_identifier`.
	 * @param ctx the parse tree
	 */
	exitJava_identifier?: (ctx: Java_identifierContext) => void;
	/**
	 * Enter a parse tree produced by the `CSharpReturnStatement`
	 * labeled alternative in `EParser.csharp_statement`.
	 * @param ctx the parse tree
	 */
	enterCSharpReturnStatement?: (ctx: CSharpReturnStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `CSharpReturnStatement`
	 * labeled alternative in `EParser.csharp_statement`.
	 * @param ctx the parse tree
	 */
	exitCSharpReturnStatement?: (ctx: CSharpReturnStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `CSharpStatement`
	 * labeled alternative in `EParser.csharp_statement`.
	 * @param ctx the parse tree
	 */
	enterCSharpStatement?: (ctx: CSharpStatementContext) => void;
	/**
	 * Exit a parse tree produced by the `CSharpStatement`
	 * labeled alternative in `EParser.csharp_statement`.
	 * @param ctx the parse tree
	 */
	exitCSharpStatement?: (ctx: CSharpStatementContext) => void;
	/**
	 * Enter a parse tree produced by the `CSharpSelectorExpression`
	 * labeled alternative in `EParser.csharp_expression`.
	 * @param ctx the parse tree
	 */
	enterCSharpSelectorExpression?: (ctx: CSharpSelectorExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `CSharpSelectorExpression`
	 * labeled alternative in `EParser.csharp_expression`.
	 * @param ctx the parse tree
	 */
	exitCSharpSelectorExpression?: (ctx: CSharpSelectorExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `CSharpPrimaryExpression`
	 * labeled alternative in `EParser.csharp_expression`.
	 * @param ctx the parse tree
	 */
	enterCSharpPrimaryExpression?: (ctx: CSharpPrimaryExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `CSharpPrimaryExpression`
	 * labeled alternative in `EParser.csharp_expression`.
	 * @param ctx the parse tree
	 */
	exitCSharpPrimaryExpression?: (ctx: CSharpPrimaryExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.csharp_primary_expression`.
	 * @param ctx the parse tree
	 */
	enterCsharp_primary_expression?: (ctx: Csharp_primary_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.csharp_primary_expression`.
	 * @param ctx the parse tree
	 */
	exitCsharp_primary_expression?: (ctx: Csharp_primary_expressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.csharp_this_expression`.
	 * @param ctx the parse tree
	 */
	enterCsharp_this_expression?: (ctx: Csharp_this_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.csharp_this_expression`.
	 * @param ctx the parse tree
	 */
	exitCsharp_this_expression?: (ctx: Csharp_this_expressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.csharp_new_expression`.
	 * @param ctx the parse tree
	 */
	enterCsharp_new_expression?: (ctx: Csharp_new_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.csharp_new_expression`.
	 * @param ctx the parse tree
	 */
	exitCsharp_new_expression?: (ctx: Csharp_new_expressionContext) => void;
	/**
	 * Enter a parse tree produced by the `CSharpMethodExpression`
	 * labeled alternative in `EParser.csharp_selector_expression`.
	 * @param ctx the parse tree
	 */
	enterCSharpMethodExpression?: (ctx: CSharpMethodExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `CSharpMethodExpression`
	 * labeled alternative in `EParser.csharp_selector_expression`.
	 * @param ctx the parse tree
	 */
	exitCSharpMethodExpression?: (ctx: CSharpMethodExpressionContext) => void;
	/**
	 * Enter a parse tree produced by the `CSharpItemExpression`
	 * labeled alternative in `EParser.csharp_selector_expression`.
	 * @param ctx the parse tree
	 */
	enterCSharpItemExpression?: (ctx: CSharpItemExpressionContext) => void;
	/**
	 * Exit a parse tree produced by the `CSharpItemExpression`
	 * labeled alternative in `EParser.csharp_selector_expression`.
	 * @param ctx the parse tree
	 */
	exitCSharpItemExpression?: (ctx: CSharpItemExpressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.csharp_method_expression`.
	 * @param ctx the parse tree
	 */
	enterCsharp_method_expression?: (ctx: Csharp_method_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.csharp_method_expression`.
	 * @param ctx the parse tree
	 */
	exitCsharp_method_expression?: (ctx: Csharp_method_expressionContext) => void;
	/**
	 * Enter a parse tree produced by the `CSharpArgumentList`
	 * labeled alternative in `EParser.csharp_arguments`.
	 * @param ctx the parse tree
	 */
	enterCSharpArgumentList?: (ctx: CSharpArgumentListContext) => void;
	/**
	 * Exit a parse tree produced by the `CSharpArgumentList`
	 * labeled alternative in `EParser.csharp_arguments`.
	 * @param ctx the parse tree
	 */
	exitCSharpArgumentList?: (ctx: CSharpArgumentListContext) => void;
	/**
	 * Enter a parse tree produced by the `CSharpArgumentListItem`
	 * labeled alternative in `EParser.csharp_arguments`.
	 * @param ctx the parse tree
	 */
	enterCSharpArgumentListItem?: (ctx: CSharpArgumentListItemContext) => void;
	/**
	 * Exit a parse tree produced by the `CSharpArgumentListItem`
	 * labeled alternative in `EParser.csharp_arguments`.
	 * @param ctx the parse tree
	 */
	exitCSharpArgumentListItem?: (ctx: CSharpArgumentListItemContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.csharp_item_expression`.
	 * @param ctx the parse tree
	 */
	enterCsharp_item_expression?: (ctx: Csharp_item_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.csharp_item_expression`.
	 * @param ctx the parse tree
	 */
	exitCsharp_item_expression?: (ctx: Csharp_item_expressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.csharp_parenthesis_expression`.
	 * @param ctx the parse tree
	 */
	enterCsharp_parenthesis_expression?: (ctx: Csharp_parenthesis_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.csharp_parenthesis_expression`.
	 * @param ctx the parse tree
	 */
	exitCsharp_parenthesis_expression?: (ctx: Csharp_parenthesis_expressionContext) => void;
	/**
	 * Enter a parse tree produced by the `CSharpIdentifier`
	 * labeled alternative in `EParser.csharp_identifier_expression`.
	 * @param ctx the parse tree
	 */
	enterCSharpIdentifier?: (ctx: CSharpIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by the `CSharpIdentifier`
	 * labeled alternative in `EParser.csharp_identifier_expression`.
	 * @param ctx the parse tree
	 */
	exitCSharpIdentifier?: (ctx: CSharpIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by the `CSharpChildIdentifier`
	 * labeled alternative in `EParser.csharp_identifier_expression`.
	 * @param ctx the parse tree
	 */
	enterCSharpChildIdentifier?: (ctx: CSharpChildIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by the `CSharpChildIdentifier`
	 * labeled alternative in `EParser.csharp_identifier_expression`.
	 * @param ctx the parse tree
	 */
	exitCSharpChildIdentifier?: (ctx: CSharpChildIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by the `CSharpPromptoIdentifier`
	 * labeled alternative in `EParser.csharp_identifier_expression`.
	 * @param ctx the parse tree
	 */
	enterCSharpPromptoIdentifier?: (ctx: CSharpPromptoIdentifierContext) => void;
	/**
	 * Exit a parse tree produced by the `CSharpPromptoIdentifier`
	 * labeled alternative in `EParser.csharp_identifier_expression`.
	 * @param ctx the parse tree
	 */
	exitCSharpPromptoIdentifier?: (ctx: CSharpPromptoIdentifierContext) => void;
	/**
	 * Enter a parse tree produced by the `CSharpIntegerLiteral`
	 * labeled alternative in `EParser.csharp_literal_expression`.
	 * @param ctx the parse tree
	 */
	enterCSharpIntegerLiteral?: (ctx: CSharpIntegerLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `CSharpIntegerLiteral`
	 * labeled alternative in `EParser.csharp_literal_expression`.
	 * @param ctx the parse tree
	 */
	exitCSharpIntegerLiteral?: (ctx: CSharpIntegerLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `CSharpDecimalLiteral`
	 * labeled alternative in `EParser.csharp_literal_expression`.
	 * @param ctx the parse tree
	 */
	enterCSharpDecimalLiteral?: (ctx: CSharpDecimalLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `CSharpDecimalLiteral`
	 * labeled alternative in `EParser.csharp_literal_expression`.
	 * @param ctx the parse tree
	 */
	exitCSharpDecimalLiteral?: (ctx: CSharpDecimalLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `CSharpTextLiteral`
	 * labeled alternative in `EParser.csharp_literal_expression`.
	 * @param ctx the parse tree
	 */
	enterCSharpTextLiteral?: (ctx: CSharpTextLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `CSharpTextLiteral`
	 * labeled alternative in `EParser.csharp_literal_expression`.
	 * @param ctx the parse tree
	 */
	exitCSharpTextLiteral?: (ctx: CSharpTextLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `CSharpBooleanLiteral`
	 * labeled alternative in `EParser.csharp_literal_expression`.
	 * @param ctx the parse tree
	 */
	enterCSharpBooleanLiteral?: (ctx: CSharpBooleanLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `CSharpBooleanLiteral`
	 * labeled alternative in `EParser.csharp_literal_expression`.
	 * @param ctx the parse tree
	 */
	exitCSharpBooleanLiteral?: (ctx: CSharpBooleanLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `CSharpCharacterLiteral`
	 * labeled alternative in `EParser.csharp_literal_expression`.
	 * @param ctx the parse tree
	 */
	enterCSharpCharacterLiteral?: (ctx: CSharpCharacterLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `CSharpCharacterLiteral`
	 * labeled alternative in `EParser.csharp_literal_expression`.
	 * @param ctx the parse tree
	 */
	exitCSharpCharacterLiteral?: (ctx: CSharpCharacterLiteralContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.csharp_identifier`.
	 * @param ctx the parse tree
	 */
	enterCsharp_identifier?: (ctx: Csharp_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.csharp_identifier`.
	 * @param ctx the parse tree
	 */
	exitCsharp_identifier?: (ctx: Csharp_identifierContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.jsx_expression`.
	 * @param ctx the parse tree
	 */
	enterJsx_expression?: (ctx: Jsx_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.jsx_expression`.
	 * @param ctx the parse tree
	 */
	exitJsx_expression?: (ctx: Jsx_expressionContext) => void;
	/**
	 * Enter a parse tree produced by the `JsxSelfClosing`
	 * labeled alternative in `EParser.jsx_element`.
	 * @param ctx the parse tree
	 */
	enterJsxSelfClosing?: (ctx: JsxSelfClosingContext) => void;
	/**
	 * Exit a parse tree produced by the `JsxSelfClosing`
	 * labeled alternative in `EParser.jsx_element`.
	 * @param ctx the parse tree
	 */
	exitJsxSelfClosing?: (ctx: JsxSelfClosingContext) => void;
	/**
	 * Enter a parse tree produced by the `JsxElement`
	 * labeled alternative in `EParser.jsx_element`.
	 * @param ctx the parse tree
	 */
	enterJsxElement?: (ctx: JsxElementContext) => void;
	/**
	 * Exit a parse tree produced by the `JsxElement`
	 * labeled alternative in `EParser.jsx_element`.
	 * @param ctx the parse tree
	 */
	exitJsxElement?: (ctx: JsxElementContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.jsx_fragment`.
	 * @param ctx the parse tree
	 */
	enterJsx_fragment?: (ctx: Jsx_fragmentContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.jsx_fragment`.
	 * @param ctx the parse tree
	 */
	exitJsx_fragment?: (ctx: Jsx_fragmentContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.jsx_fragment_start`.
	 * @param ctx the parse tree
	 */
	enterJsx_fragment_start?: (ctx: Jsx_fragment_startContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.jsx_fragment_start`.
	 * @param ctx the parse tree
	 */
	exitJsx_fragment_start?: (ctx: Jsx_fragment_startContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.jsx_fragment_end`.
	 * @param ctx the parse tree
	 */
	enterJsx_fragment_end?: (ctx: Jsx_fragment_endContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.jsx_fragment_end`.
	 * @param ctx the parse tree
	 */
	exitJsx_fragment_end?: (ctx: Jsx_fragment_endContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.jsx_self_closing`.
	 * @param ctx the parse tree
	 */
	enterJsx_self_closing?: (ctx: Jsx_self_closingContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.jsx_self_closing`.
	 * @param ctx the parse tree
	 */
	exitJsx_self_closing?: (ctx: Jsx_self_closingContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.jsx_opening`.
	 * @param ctx the parse tree
	 */
	enterJsx_opening?: (ctx: Jsx_openingContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.jsx_opening`.
	 * @param ctx the parse tree
	 */
	exitJsx_opening?: (ctx: Jsx_openingContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.jsx_closing`.
	 * @param ctx the parse tree
	 */
	enterJsx_closing?: (ctx: Jsx_closingContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.jsx_closing`.
	 * @param ctx the parse tree
	 */
	exitJsx_closing?: (ctx: Jsx_closingContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.jsx_element_name`.
	 * @param ctx the parse tree
	 */
	enterJsx_element_name?: (ctx: Jsx_element_nameContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.jsx_element_name`.
	 * @param ctx the parse tree
	 */
	exitJsx_element_name?: (ctx: Jsx_element_nameContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.jsx_identifier`.
	 * @param ctx the parse tree
	 */
	enterJsx_identifier?: (ctx: Jsx_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.jsx_identifier`.
	 * @param ctx the parse tree
	 */
	exitJsx_identifier?: (ctx: Jsx_identifierContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.jsx_attribute`.
	 * @param ctx the parse tree
	 */
	enterJsx_attribute?: (ctx: Jsx_attributeContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.jsx_attribute`.
	 * @param ctx the parse tree
	 */
	exitJsx_attribute?: (ctx: Jsx_attributeContext) => void;
	/**
	 * Enter a parse tree produced by the `JsxLiteral`
	 * labeled alternative in `EParser.jsx_attribute_value`.
	 * @param ctx the parse tree
	 */
	enterJsxLiteral?: (ctx: JsxLiteralContext) => void;
	/**
	 * Exit a parse tree produced by the `JsxLiteral`
	 * labeled alternative in `EParser.jsx_attribute_value`.
	 * @param ctx the parse tree
	 */
	exitJsxLiteral?: (ctx: JsxLiteralContext) => void;
	/**
	 * Enter a parse tree produced by the `JsxValue`
	 * labeled alternative in `EParser.jsx_attribute_value`.
	 * @param ctx the parse tree
	 */
	enterJsxValue?: (ctx: JsxValueContext) => void;
	/**
	 * Exit a parse tree produced by the `JsxValue`
	 * labeled alternative in `EParser.jsx_attribute_value`.
	 * @param ctx the parse tree
	 */
	exitJsxValue?: (ctx: JsxValueContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.jsx_children`.
	 * @param ctx the parse tree
	 */
	enterJsx_children?: (ctx: Jsx_childrenContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.jsx_children`.
	 * @param ctx the parse tree
	 */
	exitJsx_children?: (ctx: Jsx_childrenContext) => void;
	/**
	 * Enter a parse tree produced by the `JsxText`
	 * labeled alternative in `EParser.jsx_child`.
	 * @param ctx the parse tree
	 */
	enterJsxText?: (ctx: JsxTextContext) => void;
	/**
	 * Exit a parse tree produced by the `JsxText`
	 * labeled alternative in `EParser.jsx_child`.
	 * @param ctx the parse tree
	 */
	exitJsxText?: (ctx: JsxTextContext) => void;
	/**
	 * Enter a parse tree produced by the `JsxChild`
	 * labeled alternative in `EParser.jsx_child`.
	 * @param ctx the parse tree
	 */
	enterJsxChild?: (ctx: JsxChildContext) => void;
	/**
	 * Exit a parse tree produced by the `JsxChild`
	 * labeled alternative in `EParser.jsx_child`.
	 * @param ctx the parse tree
	 */
	exitJsxChild?: (ctx: JsxChildContext) => void;
	/**
	 * Enter a parse tree produced by the `JsxCode`
	 * labeled alternative in `EParser.jsx_child`.
	 * @param ctx the parse tree
	 */
	enterJsxCode?: (ctx: JsxCodeContext) => void;
	/**
	 * Exit a parse tree produced by the `JsxCode`
	 * labeled alternative in `EParser.jsx_child`.
	 * @param ctx the parse tree
	 */
	exitJsxCode?: (ctx: JsxCodeContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.jsx_text`.
	 * @param ctx the parse tree
	 */
	enterJsx_text?: (ctx: Jsx_textContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.jsx_text`.
	 * @param ctx the parse tree
	 */
	exitJsx_text?: (ctx: Jsx_textContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.jsx_char`.
	 * @param ctx the parse tree
	 */
	enterJsx_char?: (ctx: Jsx_charContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.jsx_char`.
	 * @param ctx the parse tree
	 */
	exitJsx_char?: (ctx: Jsx_charContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.css_expression`.
	 * @param ctx the parse tree
	 */
	enterCss_expression?: (ctx: Css_expressionContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.css_expression`.
	 * @param ctx the parse tree
	 */
	exitCss_expression?: (ctx: Css_expressionContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.css_field`.
	 * @param ctx the parse tree
	 */
	enterCss_field?: (ctx: Css_fieldContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.css_field`.
	 * @param ctx the parse tree
	 */
	exitCss_field?: (ctx: Css_fieldContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.css_identifier`.
	 * @param ctx the parse tree
	 */
	enterCss_identifier?: (ctx: Css_identifierContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.css_identifier`.
	 * @param ctx the parse tree
	 */
	exitCss_identifier?: (ctx: Css_identifierContext) => void;
	/**
	 * Enter a parse tree produced by the `CssValue`
	 * labeled alternative in `EParser.css_value`.
	 * @param ctx the parse tree
	 */
	enterCssValue?: (ctx: CssValueContext) => void;
	/**
	 * Exit a parse tree produced by the `CssValue`
	 * labeled alternative in `EParser.css_value`.
	 * @param ctx the parse tree
	 */
	exitCssValue?: (ctx: CssValueContext) => void;
	/**
	 * Enter a parse tree produced by the `CssText`
	 * labeled alternative in `EParser.css_value`.
	 * @param ctx the parse tree
	 */
	enterCssText?: (ctx: CssTextContext) => void;
	/**
	 * Exit a parse tree produced by the `CssText`
	 * labeled alternative in `EParser.css_value`.
	 * @param ctx the parse tree
	 */
	exitCssText?: (ctx: CssTextContext) => void;
	/**
	 * Enter a parse tree produced by `EParser.css_text`.
	 * @param ctx the parse tree
	 */
	enterCss_text?: (ctx: Css_textContext) => void;
	/**
	 * Exit a parse tree produced by `EParser.css_text`.
	 * @param ctx the parse tree
	 */
	exitCss_text?: (ctx: Css_textContext) => void;
}

