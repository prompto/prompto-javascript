// Generated from PParser.g4 by ANTLR 4.5
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by PParser.
function PParserListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

PParserListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
PParserListener.prototype.constructor = PParserListener;

// Enter a parse tree produced by PParser#enum_category_declaration.
PParserListener.prototype.enterEnum_category_declaration = function(ctx) {
};

// Exit a parse tree produced by PParser#enum_category_declaration.
PParserListener.prototype.exitEnum_category_declaration = function(ctx) {
};


// Enter a parse tree produced by PParser#enum_native_declaration.
PParserListener.prototype.enterEnum_native_declaration = function(ctx) {
};

// Exit a parse tree produced by PParser#enum_native_declaration.
PParserListener.prototype.exitEnum_native_declaration = function(ctx) {
};


// Enter a parse tree produced by PParser#native_symbol.
PParserListener.prototype.enterNative_symbol = function(ctx) {
};

// Exit a parse tree produced by PParser#native_symbol.
PParserListener.prototype.exitNative_symbol = function(ctx) {
};


// Enter a parse tree produced by PParser#category_symbol.
PParserListener.prototype.enterCategory_symbol = function(ctx) {
};

// Exit a parse tree produced by PParser#category_symbol.
PParserListener.prototype.exitCategory_symbol = function(ctx) {
};


// Enter a parse tree produced by PParser#attribute_declaration.
PParserListener.prototype.enterAttribute_declaration = function(ctx) {
};

// Exit a parse tree produced by PParser#attribute_declaration.
PParserListener.prototype.exitAttribute_declaration = function(ctx) {
};


// Enter a parse tree produced by PParser#concrete_category_declaration.
PParserListener.prototype.enterConcrete_category_declaration = function(ctx) {
};

// Exit a parse tree produced by PParser#concrete_category_declaration.
PParserListener.prototype.exitConcrete_category_declaration = function(ctx) {
};


// Enter a parse tree produced by PParser#singleton_category_declaration.
PParserListener.prototype.enterSingleton_category_declaration = function(ctx) {
};

// Exit a parse tree produced by PParser#singleton_category_declaration.
PParserListener.prototype.exitSingleton_category_declaration = function(ctx) {
};


// Enter a parse tree produced by PParser#derived_list.
PParserListener.prototype.enterDerived_list = function(ctx) {
};

// Exit a parse tree produced by PParser#derived_list.
PParserListener.prototype.exitDerived_list = function(ctx) {
};


// Enter a parse tree produced by PParser#member_method_declaration.
PParserListener.prototype.enterMember_method_declaration = function(ctx) {
};

// Exit a parse tree produced by PParser#member_method_declaration.
PParserListener.prototype.exitMember_method_declaration = function(ctx) {
};


// Enter a parse tree produced by PParser#operator_method_declaration.
PParserListener.prototype.enterOperator_method_declaration = function(ctx) {
};

// Exit a parse tree produced by PParser#operator_method_declaration.
PParserListener.prototype.exitOperator_method_declaration = function(ctx) {
};


// Enter a parse tree produced by PParser#setter_method_declaration.
PParserListener.prototype.enterSetter_method_declaration = function(ctx) {
};

// Exit a parse tree produced by PParser#setter_method_declaration.
PParserListener.prototype.exitSetter_method_declaration = function(ctx) {
};


// Enter a parse tree produced by PParser#getter_method_declaration.
PParserListener.prototype.enterGetter_method_declaration = function(ctx) {
};

// Exit a parse tree produced by PParser#getter_method_declaration.
PParserListener.prototype.exitGetter_method_declaration = function(ctx) {
};


// Enter a parse tree produced by PParser#native_category_declaration.
PParserListener.prototype.enterNative_category_declaration = function(ctx) {
};

// Exit a parse tree produced by PParser#native_category_declaration.
PParserListener.prototype.exitNative_category_declaration = function(ctx) {
};


// Enter a parse tree produced by PParser#native_resource_declaration.
PParserListener.prototype.enterNative_resource_declaration = function(ctx) {
};

// Exit a parse tree produced by PParser#native_resource_declaration.
PParserListener.prototype.exitNative_resource_declaration = function(ctx) {
};


// Enter a parse tree produced by PParser#native_category_mappings.
PParserListener.prototype.enterNative_category_mappings = function(ctx) {
};

// Exit a parse tree produced by PParser#native_category_mappings.
PParserListener.prototype.exitNative_category_mappings = function(ctx) {
};


// Enter a parse tree produced by PParser#NativeCategoryMappingList.
PParserListener.prototype.enterNativeCategoryMappingList = function(ctx) {
};

// Exit a parse tree produced by PParser#NativeCategoryMappingList.
PParserListener.prototype.exitNativeCategoryMappingList = function(ctx) {
};


// Enter a parse tree produced by PParser#NativeCategoryMappingListItem.
PParserListener.prototype.enterNativeCategoryMappingListItem = function(ctx) {
};

// Exit a parse tree produced by PParser#NativeCategoryMappingListItem.
PParserListener.prototype.exitNativeCategoryMappingListItem = function(ctx) {
};


// Enter a parse tree produced by PParser#attribute_list.
PParserListener.prototype.enterAttribute_list = function(ctx) {
};

// Exit a parse tree produced by PParser#attribute_list.
PParserListener.prototype.exitAttribute_list = function(ctx) {
};


// Enter a parse tree produced by PParser#abstract_method_declaration.
PParserListener.prototype.enterAbstract_method_declaration = function(ctx) {
};

// Exit a parse tree produced by PParser#abstract_method_declaration.
PParserListener.prototype.exitAbstract_method_declaration = function(ctx) {
};


// Enter a parse tree produced by PParser#concrete_method_declaration.
PParserListener.prototype.enterConcrete_method_declaration = function(ctx) {
};

// Exit a parse tree produced by PParser#concrete_method_declaration.
PParserListener.prototype.exitConcrete_method_declaration = function(ctx) {
};


// Enter a parse tree produced by PParser#native_method_declaration.
PParserListener.prototype.enterNative_method_declaration = function(ctx) {
};

// Exit a parse tree produced by PParser#native_method_declaration.
PParserListener.prototype.exitNative_method_declaration = function(ctx) {
};


// Enter a parse tree produced by PParser#typed_argument.
PParserListener.prototype.enterTyped_argument = function(ctx) {
};

// Exit a parse tree produced by PParser#typed_argument.
PParserListener.prototype.exitTyped_argument = function(ctx) {
};


// Enter a parse tree produced by PParser#MethodCallStatement.
PParserListener.prototype.enterMethodCallStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#MethodCallStatement.
PParserListener.prototype.exitMethodCallStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#AssignInstanceStatement.
PParserListener.prototype.enterAssignInstanceStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#AssignInstanceStatement.
PParserListener.prototype.exitAssignInstanceStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#AssignTupleStatement.
PParserListener.prototype.enterAssignTupleStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#AssignTupleStatement.
PParserListener.prototype.exitAssignTupleStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#ReturnStatement.
PParserListener.prototype.enterReturnStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#ReturnStatement.
PParserListener.prototype.exitReturnStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#IfStatement.
PParserListener.prototype.enterIfStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#IfStatement.
PParserListener.prototype.exitIfStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#SwitchStatement.
PParserListener.prototype.enterSwitchStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#SwitchStatement.
PParserListener.prototype.exitSwitchStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#ForEachStatement.
PParserListener.prototype.enterForEachStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#ForEachStatement.
PParserListener.prototype.exitForEachStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#WhileStatement.
PParserListener.prototype.enterWhileStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#WhileStatement.
PParserListener.prototype.exitWhileStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#DoWhileStatement.
PParserListener.prototype.enterDoWhileStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#DoWhileStatement.
PParserListener.prototype.exitDoWhileStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#RaiseStatement.
PParserListener.prototype.enterRaiseStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#RaiseStatement.
PParserListener.prototype.exitRaiseStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#TryStatement.
PParserListener.prototype.enterTryStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#TryStatement.
PParserListener.prototype.exitTryStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#WriteStatement.
PParserListener.prototype.enterWriteStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#WriteStatement.
PParserListener.prototype.exitWriteStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#WithResourceStatement.
PParserListener.prototype.enterWithResourceStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#WithResourceStatement.
PParserListener.prototype.exitWithResourceStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#WithSingletonStatement.
PParserListener.prototype.enterWithSingletonStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#WithSingletonStatement.
PParserListener.prototype.exitWithSingletonStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#ClosureStatement.
PParserListener.prototype.enterClosureStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#ClosureStatement.
PParserListener.prototype.exitClosureStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#method_call.
PParserListener.prototype.enterMethod_call = function(ctx) {
};

// Exit a parse tree produced by PParser#method_call.
PParserListener.prototype.exitMethod_call = function(ctx) {
};


// Enter a parse tree produced by PParser#MethodName.
PParserListener.prototype.enterMethodName = function(ctx) {
};

// Exit a parse tree produced by PParser#MethodName.
PParserListener.prototype.exitMethodName = function(ctx) {
};


// Enter a parse tree produced by PParser#MethodParent.
PParserListener.prototype.enterMethodParent = function(ctx) {
};

// Exit a parse tree produced by PParser#MethodParent.
PParserListener.prototype.exitMethodParent = function(ctx) {
};


// Enter a parse tree produced by PParser#CallableRoot.
PParserListener.prototype.enterCallableRoot = function(ctx) {
};

// Exit a parse tree produced by PParser#CallableRoot.
PParserListener.prototype.exitCallableRoot = function(ctx) {
};


// Enter a parse tree produced by PParser#CallableSelector.
PParserListener.prototype.enterCallableSelector = function(ctx) {
};

// Exit a parse tree produced by PParser#CallableSelector.
PParserListener.prototype.exitCallableSelector = function(ctx) {
};


// Enter a parse tree produced by PParser#CallableMemberSelector.
PParserListener.prototype.enterCallableMemberSelector = function(ctx) {
};

// Exit a parse tree produced by PParser#CallableMemberSelector.
PParserListener.prototype.exitCallableMemberSelector = function(ctx) {
};


// Enter a parse tree produced by PParser#CallableItemSelector.
PParserListener.prototype.enterCallableItemSelector = function(ctx) {
};

// Exit a parse tree produced by PParser#CallableItemSelector.
PParserListener.prototype.exitCallableItemSelector = function(ctx) {
};


// Enter a parse tree produced by PParser#with_resource_statement.
PParserListener.prototype.enterWith_resource_statement = function(ctx) {
};

// Exit a parse tree produced by PParser#with_resource_statement.
PParserListener.prototype.exitWith_resource_statement = function(ctx) {
};


// Enter a parse tree produced by PParser#with_singleton_statement.
PParserListener.prototype.enterWith_singleton_statement = function(ctx) {
};

// Exit a parse tree produced by PParser#with_singleton_statement.
PParserListener.prototype.exitWith_singleton_statement = function(ctx) {
};


// Enter a parse tree produced by PParser#switch_statement.
PParserListener.prototype.enterSwitch_statement = function(ctx) {
};

// Exit a parse tree produced by PParser#switch_statement.
PParserListener.prototype.exitSwitch_statement = function(ctx) {
};


// Enter a parse tree produced by PParser#AtomicSwitchCase.
PParserListener.prototype.enterAtomicSwitchCase = function(ctx) {
};

// Exit a parse tree produced by PParser#AtomicSwitchCase.
PParserListener.prototype.exitAtomicSwitchCase = function(ctx) {
};


// Enter a parse tree produced by PParser#CollectionSwitchCase.
PParserListener.prototype.enterCollectionSwitchCase = function(ctx) {
};

// Exit a parse tree produced by PParser#CollectionSwitchCase.
PParserListener.prototype.exitCollectionSwitchCase = function(ctx) {
};


// Enter a parse tree produced by PParser#for_each_statement.
PParserListener.prototype.enterFor_each_statement = function(ctx) {
};

// Exit a parse tree produced by PParser#for_each_statement.
PParserListener.prototype.exitFor_each_statement = function(ctx) {
};


// Enter a parse tree produced by PParser#do_while_statement.
PParserListener.prototype.enterDo_while_statement = function(ctx) {
};

// Exit a parse tree produced by PParser#do_while_statement.
PParserListener.prototype.exitDo_while_statement = function(ctx) {
};


// Enter a parse tree produced by PParser#while_statement.
PParserListener.prototype.enterWhile_statement = function(ctx) {
};

// Exit a parse tree produced by PParser#while_statement.
PParserListener.prototype.exitWhile_statement = function(ctx) {
};


// Enter a parse tree produced by PParser#if_statement.
PParserListener.prototype.enterIf_statement = function(ctx) {
};

// Exit a parse tree produced by PParser#if_statement.
PParserListener.prototype.exitIf_statement = function(ctx) {
};


// Enter a parse tree produced by PParser#ElseIfStatementList.
PParserListener.prototype.enterElseIfStatementList = function(ctx) {
};

// Exit a parse tree produced by PParser#ElseIfStatementList.
PParserListener.prototype.exitElseIfStatementList = function(ctx) {
};


// Enter a parse tree produced by PParser#ElseIfStatementListItem.
PParserListener.prototype.enterElseIfStatementListItem = function(ctx) {
};

// Exit a parse tree produced by PParser#ElseIfStatementListItem.
PParserListener.prototype.exitElseIfStatementListItem = function(ctx) {
};


// Enter a parse tree produced by PParser#raise_statement.
PParserListener.prototype.enterRaise_statement = function(ctx) {
};

// Exit a parse tree produced by PParser#raise_statement.
PParserListener.prototype.exitRaise_statement = function(ctx) {
};


// Enter a parse tree produced by PParser#try_statement.
PParserListener.prototype.enterTry_statement = function(ctx) {
};

// Exit a parse tree produced by PParser#try_statement.
PParserListener.prototype.exitTry_statement = function(ctx) {
};


// Enter a parse tree produced by PParser#CatchAtomicStatement.
PParserListener.prototype.enterCatchAtomicStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#CatchAtomicStatement.
PParserListener.prototype.exitCatchAtomicStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#CatchCollectionStatement.
PParserListener.prototype.enterCatchCollectionStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#CatchCollectionStatement.
PParserListener.prototype.exitCatchCollectionStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#return_statement.
PParserListener.prototype.enterReturn_statement = function(ctx) {
};

// Exit a parse tree produced by PParser#return_statement.
PParserListener.prototype.exitReturn_statement = function(ctx) {
};


// Enter a parse tree produced by PParser#ClosureExpression.
PParserListener.prototype.enterClosureExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#ClosureExpression.
PParserListener.prototype.exitClosureExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#TernaryExpression.
PParserListener.prototype.enterTernaryExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#TernaryExpression.
PParserListener.prototype.exitTernaryExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#NotContainsAnyExpression.
PParserListener.prototype.enterNotContainsAnyExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#NotContainsAnyExpression.
PParserListener.prototype.exitNotContainsAnyExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#IntDivideExpression.
PParserListener.prototype.enterIntDivideExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#IntDivideExpression.
PParserListener.prototype.exitIntDivideExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#EqualsExpression.
PParserListener.prototype.enterEqualsExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#EqualsExpression.
PParserListener.prototype.exitEqualsExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#OrExpression.
PParserListener.prototype.enterOrExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#OrExpression.
PParserListener.prototype.exitOrExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#RoughlyEqualsExpression.
PParserListener.prototype.enterRoughlyEqualsExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#RoughlyEqualsExpression.
PParserListener.prototype.exitRoughlyEqualsExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#ContainsExpression.
PParserListener.prototype.enterContainsExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#ContainsExpression.
PParserListener.prototype.exitContainsExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#CodeExpression.
PParserListener.prototype.enterCodeExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#CodeExpression.
PParserListener.prototype.exitCodeExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#NotEqualsExpression.
PParserListener.prototype.enterNotEqualsExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#NotEqualsExpression.
PParserListener.prototype.exitNotEqualsExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#InExpression.
PParserListener.prototype.enterInExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#InExpression.
PParserListener.prototype.exitInExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#CastExpression.
PParserListener.prototype.enterCastExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#CastExpression.
PParserListener.prototype.exitCastExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#InstanceExpression.
PParserListener.prototype.enterInstanceExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#InstanceExpression.
PParserListener.prototype.exitInstanceExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#NotExpression.
PParserListener.prototype.enterNotExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#NotExpression.
PParserListener.prototype.exitNotExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#MethodExpression.
PParserListener.prototype.enterMethodExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#MethodExpression.
PParserListener.prototype.exitMethodExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#GreaterThanExpression.
PParserListener.prototype.enterGreaterThanExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#GreaterThanExpression.
PParserListener.prototype.exitGreaterThanExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#AddExpression.
PParserListener.prototype.enterAddExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#AddExpression.
PParserListener.prototype.exitAddExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#ModuloExpression.
PParserListener.prototype.enterModuloExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#ModuloExpression.
PParserListener.prototype.exitModuloExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#GreaterThanOrEqualExpression.
PParserListener.prototype.enterGreaterThanOrEqualExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#GreaterThanOrEqualExpression.
PParserListener.prototype.exitGreaterThanOrEqualExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#NotContainsAllExpression.
PParserListener.prototype.enterNotContainsAllExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#NotContainsAllExpression.
PParserListener.prototype.exitNotContainsAllExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#LessThanOrEqualExpression.
PParserListener.prototype.enterLessThanOrEqualExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#LessThanOrEqualExpression.
PParserListener.prototype.exitLessThanOrEqualExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#MultiplyExpression.
PParserListener.prototype.enterMultiplyExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#MultiplyExpression.
PParserListener.prototype.exitMultiplyExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#AndExpression.
PParserListener.prototype.enterAndExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#AndExpression.
PParserListener.prototype.exitAndExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#DivideExpression.
PParserListener.prototype.enterDivideExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#DivideExpression.
PParserListener.prototype.exitDivideExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#ContainsAllExpression.
PParserListener.prototype.enterContainsAllExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#ContainsAllExpression.
PParserListener.prototype.exitContainsAllExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#ExecuteExpression.
PParserListener.prototype.enterExecuteExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#ExecuteExpression.
PParserListener.prototype.exitExecuteExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#NotContainsExpression.
PParserListener.prototype.enterNotContainsExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#NotContainsExpression.
PParserListener.prototype.exitNotContainsExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#NotInExpression.
PParserListener.prototype.enterNotInExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#NotInExpression.
PParserListener.prototype.exitNotInExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#LessThanExpression.
PParserListener.prototype.enterLessThanExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#LessThanExpression.
PParserListener.prototype.exitLessThanExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#ContainsAnyExpression.
PParserListener.prototype.enterContainsAnyExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#ContainsAnyExpression.
PParserListener.prototype.exitContainsAnyExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#IsExpression.
PParserListener.prototype.enterIsExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#IsExpression.
PParserListener.prototype.exitIsExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#MinusExpression.
PParserListener.prototype.enterMinusExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#MinusExpression.
PParserListener.prototype.exitMinusExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#IsNotExpression.
PParserListener.prototype.enterIsNotExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#IsNotExpression.
PParserListener.prototype.exitIsNotExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#closure_expression.
PParserListener.prototype.enterClosure_expression = function(ctx) {
};

// Exit a parse tree produced by PParser#closure_expression.
PParserListener.prototype.exitClosure_expression = function(ctx) {
};


// Enter a parse tree produced by PParser#SelectableExpression.
PParserListener.prototype.enterSelectableExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#SelectableExpression.
PParserListener.prototype.exitSelectableExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#SelectorExpression.
PParserListener.prototype.enterSelectorExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#SelectorExpression.
PParserListener.prototype.exitSelectorExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#DocumentExpression.
PParserListener.prototype.enterDocumentExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#DocumentExpression.
PParserListener.prototype.exitDocumentExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#ConstructorExpression.
PParserListener.prototype.enterConstructorExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#ConstructorExpression.
PParserListener.prototype.exitConstructorExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#FetchExpression.
PParserListener.prototype.enterFetchExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#FetchExpression.
PParserListener.prototype.exitFetchExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#ReadExpression.
PParserListener.prototype.enterReadExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#ReadExpression.
PParserListener.prototype.exitReadExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#SortedExpression.
PParserListener.prototype.enterSortedExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#SortedExpression.
PParserListener.prototype.exitSortedExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#MethodCallExpression.
PParserListener.prototype.enterMethodCallExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#MethodCallExpression.
PParserListener.prototype.exitMethodCallExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#MemberSelector.
PParserListener.prototype.enterMemberSelector = function(ctx) {
};

// Exit a parse tree produced by PParser#MemberSelector.
PParserListener.prototype.exitMemberSelector = function(ctx) {
};


// Enter a parse tree produced by PParser#SliceSelector.
PParserListener.prototype.enterSliceSelector = function(ctx) {
};

// Exit a parse tree produced by PParser#SliceSelector.
PParserListener.prototype.exitSliceSelector = function(ctx) {
};


// Enter a parse tree produced by PParser#ItemSelector.
PParserListener.prototype.enterItemSelector = function(ctx) {
};

// Exit a parse tree produced by PParser#ItemSelector.
PParserListener.prototype.exitItemSelector = function(ctx) {
};


// Enter a parse tree produced by PParser#document_expression.
PParserListener.prototype.enterDocument_expression = function(ctx) {
};

// Exit a parse tree produced by PParser#document_expression.
PParserListener.prototype.exitDocument_expression = function(ctx) {
};


// Enter a parse tree produced by PParser#constructor_expression.
PParserListener.prototype.enterConstructor_expression = function(ctx) {
};

// Exit a parse tree produced by PParser#constructor_expression.
PParserListener.prototype.exitConstructor_expression = function(ctx) {
};


// Enter a parse tree produced by PParser#ArgumentAssignmentList.
PParserListener.prototype.enterArgumentAssignmentList = function(ctx) {
};

// Exit a parse tree produced by PParser#ArgumentAssignmentList.
PParserListener.prototype.exitArgumentAssignmentList = function(ctx) {
};


// Enter a parse tree produced by PParser#ExpressionAssignmentList.
PParserListener.prototype.enterExpressionAssignmentList = function(ctx) {
};

// Exit a parse tree produced by PParser#ExpressionAssignmentList.
PParserListener.prototype.exitExpressionAssignmentList = function(ctx) {
};


// Enter a parse tree produced by PParser#ArgumentAssignmentListItem.
PParserListener.prototype.enterArgumentAssignmentListItem = function(ctx) {
};

// Exit a parse tree produced by PParser#ArgumentAssignmentListItem.
PParserListener.prototype.exitArgumentAssignmentListItem = function(ctx) {
};


// Enter a parse tree produced by PParser#argument_assignment.
PParserListener.prototype.enterArgument_assignment = function(ctx) {
};

// Exit a parse tree produced by PParser#argument_assignment.
PParserListener.prototype.exitArgument_assignment = function(ctx) {
};


// Enter a parse tree produced by PParser#read_expression.
PParserListener.prototype.enterRead_expression = function(ctx) {
};

// Exit a parse tree produced by PParser#read_expression.
PParserListener.prototype.exitRead_expression = function(ctx) {
};


// Enter a parse tree produced by PParser#write_statement.
PParserListener.prototype.enterWrite_statement = function(ctx) {
};

// Exit a parse tree produced by PParser#write_statement.
PParserListener.prototype.exitWrite_statement = function(ctx) {
};


// Enter a parse tree produced by PParser#fetch_expression.
PParserListener.prototype.enterFetch_expression = function(ctx) {
};

// Exit a parse tree produced by PParser#fetch_expression.
PParserListener.prototype.exitFetch_expression = function(ctx) {
};


// Enter a parse tree produced by PParser#sorted_expression.
PParserListener.prototype.enterSorted_expression = function(ctx) {
};

// Exit a parse tree produced by PParser#sorted_expression.
PParserListener.prototype.exitSorted_expression = function(ctx) {
};


// Enter a parse tree produced by PParser#assign_instance_statement.
PParserListener.prototype.enterAssign_instance_statement = function(ctx) {
};

// Exit a parse tree produced by PParser#assign_instance_statement.
PParserListener.prototype.exitAssign_instance_statement = function(ctx) {
};


// Enter a parse tree produced by PParser#MemberInstance.
PParserListener.prototype.enterMemberInstance = function(ctx) {
};

// Exit a parse tree produced by PParser#MemberInstance.
PParserListener.prototype.exitMemberInstance = function(ctx) {
};


// Enter a parse tree produced by PParser#ItemInstance.
PParserListener.prototype.enterItemInstance = function(ctx) {
};

// Exit a parse tree produced by PParser#ItemInstance.
PParserListener.prototype.exitItemInstance = function(ctx) {
};


// Enter a parse tree produced by PParser#assign_tuple_statement.
PParserListener.prototype.enterAssign_tuple_statement = function(ctx) {
};

// Exit a parse tree produced by PParser#assign_tuple_statement.
PParserListener.prototype.exitAssign_tuple_statement = function(ctx) {
};


// Enter a parse tree produced by PParser#lfs.
PParserListener.prototype.enterLfs = function(ctx) {
};

// Exit a parse tree produced by PParser#lfs.
PParserListener.prototype.exitLfs = function(ctx) {
};


// Enter a parse tree produced by PParser#lfp.
PParserListener.prototype.enterLfp = function(ctx) {
};

// Exit a parse tree produced by PParser#lfp.
PParserListener.prototype.exitLfp = function(ctx) {
};


// Enter a parse tree produced by PParser#indent.
PParserListener.prototype.enterIndent = function(ctx) {
};

// Exit a parse tree produced by PParser#indent.
PParserListener.prototype.exitIndent = function(ctx) {
};


// Enter a parse tree produced by PParser#dedent.
PParserListener.prototype.enterDedent = function(ctx) {
};

// Exit a parse tree produced by PParser#dedent.
PParserListener.prototype.exitDedent = function(ctx) {
};


// Enter a parse tree produced by PParser#null_literal.
PParserListener.prototype.enterNull_literal = function(ctx) {
};

// Exit a parse tree produced by PParser#null_literal.
PParserListener.prototype.exitNull_literal = function(ctx) {
};


// Enter a parse tree produced by PParser#FullDeclarationList.
PParserListener.prototype.enterFullDeclarationList = function(ctx) {
};

// Exit a parse tree produced by PParser#FullDeclarationList.
PParserListener.prototype.exitFullDeclarationList = function(ctx) {
};


// Enter a parse tree produced by PParser#DeclarationListItem.
PParserListener.prototype.enterDeclarationListItem = function(ctx) {
};

// Exit a parse tree produced by PParser#DeclarationListItem.
PParserListener.prototype.exitDeclarationListItem = function(ctx) {
};


// Enter a parse tree produced by PParser#DeclarationList.
PParserListener.prototype.enterDeclarationList = function(ctx) {
};

// Exit a parse tree produced by PParser#DeclarationList.
PParserListener.prototype.exitDeclarationList = function(ctx) {
};


// Enter a parse tree produced by PParser#AttributeDeclaration.
PParserListener.prototype.enterAttributeDeclaration = function(ctx) {
};

// Exit a parse tree produced by PParser#AttributeDeclaration.
PParserListener.prototype.exitAttributeDeclaration = function(ctx) {
};


// Enter a parse tree produced by PParser#CategoryDeclaration.
PParserListener.prototype.enterCategoryDeclaration = function(ctx) {
};

// Exit a parse tree produced by PParser#CategoryDeclaration.
PParserListener.prototype.exitCategoryDeclaration = function(ctx) {
};


// Enter a parse tree produced by PParser#ResourceDeclaration.
PParserListener.prototype.enterResourceDeclaration = function(ctx) {
};

// Exit a parse tree produced by PParser#ResourceDeclaration.
PParserListener.prototype.exitResourceDeclaration = function(ctx) {
};


// Enter a parse tree produced by PParser#EnumDeclaration.
PParserListener.prototype.enterEnumDeclaration = function(ctx) {
};

// Exit a parse tree produced by PParser#EnumDeclaration.
PParserListener.prototype.exitEnumDeclaration = function(ctx) {
};


// Enter a parse tree produced by PParser#MethodDeclaration.
PParserListener.prototype.enterMethodDeclaration = function(ctx) {
};

// Exit a parse tree produced by PParser#MethodDeclaration.
PParserListener.prototype.exitMethodDeclaration = function(ctx) {
};


// Enter a parse tree produced by PParser#resource_declaration.
PParserListener.prototype.enterResource_declaration = function(ctx) {
};

// Exit a parse tree produced by PParser#resource_declaration.
PParserListener.prototype.exitResource_declaration = function(ctx) {
};


// Enter a parse tree produced by PParser#EnumCategoryDeclaration.
PParserListener.prototype.enterEnumCategoryDeclaration = function(ctx) {
};

// Exit a parse tree produced by PParser#EnumCategoryDeclaration.
PParserListener.prototype.exitEnumCategoryDeclaration = function(ctx) {
};


// Enter a parse tree produced by PParser#EnumNativeDeclaration.
PParserListener.prototype.enterEnumNativeDeclaration = function(ctx) {
};

// Exit a parse tree produced by PParser#EnumNativeDeclaration.
PParserListener.prototype.exitEnumNativeDeclaration = function(ctx) {
};


// Enter a parse tree produced by PParser#NativeSymbolList.
PParserListener.prototype.enterNativeSymbolList = function(ctx) {
};

// Exit a parse tree produced by PParser#NativeSymbolList.
PParserListener.prototype.exitNativeSymbolList = function(ctx) {
};


// Enter a parse tree produced by PParser#NativeSymbolListItem.
PParserListener.prototype.enterNativeSymbolListItem = function(ctx) {
};

// Exit a parse tree produced by PParser#NativeSymbolListItem.
PParserListener.prototype.exitNativeSymbolListItem = function(ctx) {
};


// Enter a parse tree produced by PParser#CategorySymbolListItem.
PParserListener.prototype.enterCategorySymbolListItem = function(ctx) {
};

// Exit a parse tree produced by PParser#CategorySymbolListItem.
PParserListener.prototype.exitCategorySymbolListItem = function(ctx) {
};


// Enter a parse tree produced by PParser#CategorySymbolList.
PParserListener.prototype.enterCategorySymbolList = function(ctx) {
};

// Exit a parse tree produced by PParser#CategorySymbolList.
PParserListener.prototype.exitCategorySymbolList = function(ctx) {
};


// Enter a parse tree produced by PParser#SymbolList.
PParserListener.prototype.enterSymbolList = function(ctx) {
};

// Exit a parse tree produced by PParser#SymbolList.
PParserListener.prototype.exitSymbolList = function(ctx) {
};


// Enter a parse tree produced by PParser#SymbolListItem.
PParserListener.prototype.enterSymbolListItem = function(ctx) {
};

// Exit a parse tree produced by PParser#SymbolListItem.
PParserListener.prototype.exitSymbolListItem = function(ctx) {
};


// Enter a parse tree produced by PParser#MatchingList.
PParserListener.prototype.enterMatchingList = function(ctx) {
};

// Exit a parse tree produced by PParser#MatchingList.
PParserListener.prototype.exitMatchingList = function(ctx) {
};


// Enter a parse tree produced by PParser#MatchingSet.
PParserListener.prototype.enterMatchingSet = function(ctx) {
};

// Exit a parse tree produced by PParser#MatchingSet.
PParserListener.prototype.exitMatchingSet = function(ctx) {
};


// Enter a parse tree produced by PParser#MatchingRange.
PParserListener.prototype.enterMatchingRange = function(ctx) {
};

// Exit a parse tree produced by PParser#MatchingRange.
PParserListener.prototype.exitMatchingRange = function(ctx) {
};


// Enter a parse tree produced by PParser#MatchingPattern.
PParserListener.prototype.enterMatchingPattern = function(ctx) {
};

// Exit a parse tree produced by PParser#MatchingPattern.
PParserListener.prototype.exitMatchingPattern = function(ctx) {
};


// Enter a parse tree produced by PParser#MatchingExpression.
PParserListener.prototype.enterMatchingExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#MatchingExpression.
PParserListener.prototype.exitMatchingExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#list_literal.
PParserListener.prototype.enterList_literal = function(ctx) {
};

// Exit a parse tree produced by PParser#list_literal.
PParserListener.prototype.exitList_literal = function(ctx) {
};


// Enter a parse tree produced by PParser#set_literal.
PParserListener.prototype.enterSet_literal = function(ctx) {
};

// Exit a parse tree produced by PParser#set_literal.
PParserListener.prototype.exitSet_literal = function(ctx) {
};


// Enter a parse tree produced by PParser#ValueListItem.
PParserListener.prototype.enterValueListItem = function(ctx) {
};

// Exit a parse tree produced by PParser#ValueListItem.
PParserListener.prototype.exitValueListItem = function(ctx) {
};


// Enter a parse tree produced by PParser#ValueList.
PParserListener.prototype.enterValueList = function(ctx) {
};

// Exit a parse tree produced by PParser#ValueList.
PParserListener.prototype.exitValueList = function(ctx) {
};


// Enter a parse tree produced by PParser#range_literal.
PParserListener.prototype.enterRange_literal = function(ctx) {
};

// Exit a parse tree produced by PParser#range_literal.
PParserListener.prototype.exitRange_literal = function(ctx) {
};


// Enter a parse tree produced by PParser#ListType.
PParserListener.prototype.enterListType = function(ctx) {
};

// Exit a parse tree produced by PParser#ListType.
PParserListener.prototype.exitListType = function(ctx) {
};


// Enter a parse tree produced by PParser#PrimaryType.
PParserListener.prototype.enterPrimaryType = function(ctx) {
};

// Exit a parse tree produced by PParser#PrimaryType.
PParserListener.prototype.exitPrimaryType = function(ctx) {
};


// Enter a parse tree produced by PParser#DictType.
PParserListener.prototype.enterDictType = function(ctx) {
};

// Exit a parse tree produced by PParser#DictType.
PParserListener.prototype.exitDictType = function(ctx) {
};


// Enter a parse tree produced by PParser#SetType.
PParserListener.prototype.enterSetType = function(ctx) {
};

// Exit a parse tree produced by PParser#SetType.
PParserListener.prototype.exitSetType = function(ctx) {
};


// Enter a parse tree produced by PParser#NativeType.
PParserListener.prototype.enterNativeType = function(ctx) {
};

// Exit a parse tree produced by PParser#NativeType.
PParserListener.prototype.exitNativeType = function(ctx) {
};


// Enter a parse tree produced by PParser#CategoryType.
PParserListener.prototype.enterCategoryType = function(ctx) {
};

// Exit a parse tree produced by PParser#CategoryType.
PParserListener.prototype.exitCategoryType = function(ctx) {
};


// Enter a parse tree produced by PParser#BooleanType.
PParserListener.prototype.enterBooleanType = function(ctx) {
};

// Exit a parse tree produced by PParser#BooleanType.
PParserListener.prototype.exitBooleanType = function(ctx) {
};


// Enter a parse tree produced by PParser#CharacterType.
PParserListener.prototype.enterCharacterType = function(ctx) {
};

// Exit a parse tree produced by PParser#CharacterType.
PParserListener.prototype.exitCharacterType = function(ctx) {
};


// Enter a parse tree produced by PParser#TextType.
PParserListener.prototype.enterTextType = function(ctx) {
};

// Exit a parse tree produced by PParser#TextType.
PParserListener.prototype.exitTextType = function(ctx) {
};


// Enter a parse tree produced by PParser#IntegerType.
PParserListener.prototype.enterIntegerType = function(ctx) {
};

// Exit a parse tree produced by PParser#IntegerType.
PParserListener.prototype.exitIntegerType = function(ctx) {
};


// Enter a parse tree produced by PParser#DecimalType.
PParserListener.prototype.enterDecimalType = function(ctx) {
};

// Exit a parse tree produced by PParser#DecimalType.
PParserListener.prototype.exitDecimalType = function(ctx) {
};


// Enter a parse tree produced by PParser#DateType.
PParserListener.prototype.enterDateType = function(ctx) {
};

// Exit a parse tree produced by PParser#DateType.
PParserListener.prototype.exitDateType = function(ctx) {
};


// Enter a parse tree produced by PParser#DateTimeType.
PParserListener.prototype.enterDateTimeType = function(ctx) {
};

// Exit a parse tree produced by PParser#DateTimeType.
PParserListener.prototype.exitDateTimeType = function(ctx) {
};


// Enter a parse tree produced by PParser#TimeType.
PParserListener.prototype.enterTimeType = function(ctx) {
};

// Exit a parse tree produced by PParser#TimeType.
PParserListener.prototype.exitTimeType = function(ctx) {
};


// Enter a parse tree produced by PParser#PeriodType.
PParserListener.prototype.enterPeriodType = function(ctx) {
};

// Exit a parse tree produced by PParser#PeriodType.
PParserListener.prototype.exitPeriodType = function(ctx) {
};


// Enter a parse tree produced by PParser#CodeType.
PParserListener.prototype.enterCodeType = function(ctx) {
};

// Exit a parse tree produced by PParser#CodeType.
PParserListener.prototype.exitCodeType = function(ctx) {
};


// Enter a parse tree produced by PParser#category_type.
PParserListener.prototype.enterCategory_type = function(ctx) {
};

// Exit a parse tree produced by PParser#category_type.
PParserListener.prototype.exitCategory_type = function(ctx) {
};


// Enter a parse tree produced by PParser#code_type.
PParserListener.prototype.enterCode_type = function(ctx) {
};

// Exit a parse tree produced by PParser#code_type.
PParserListener.prototype.exitCode_type = function(ctx) {
};


// Enter a parse tree produced by PParser#document_type.
PParserListener.prototype.enterDocument_type = function(ctx) {
};

// Exit a parse tree produced by PParser#document_type.
PParserListener.prototype.exitDocument_type = function(ctx) {
};


// Enter a parse tree produced by PParser#ConcreteCategoryDeclaration.
PParserListener.prototype.enterConcreteCategoryDeclaration = function(ctx) {
};

// Exit a parse tree produced by PParser#ConcreteCategoryDeclaration.
PParserListener.prototype.exitConcreteCategoryDeclaration = function(ctx) {
};


// Enter a parse tree produced by PParser#NativeCategoryDeclaration.
PParserListener.prototype.enterNativeCategoryDeclaration = function(ctx) {
};

// Exit a parse tree produced by PParser#NativeCategoryDeclaration.
PParserListener.prototype.exitNativeCategoryDeclaration = function(ctx) {
};


// Enter a parse tree produced by PParser#SingletonCategoryDeclaration.
PParserListener.prototype.enterSingletonCategoryDeclaration = function(ctx) {
};

// Exit a parse tree produced by PParser#SingletonCategoryDeclaration.
PParserListener.prototype.exitSingletonCategoryDeclaration = function(ctx) {
};


// Enter a parse tree produced by PParser#TypeIdentifierListItem.
PParserListener.prototype.enterTypeIdentifierListItem = function(ctx) {
};

// Exit a parse tree produced by PParser#TypeIdentifierListItem.
PParserListener.prototype.exitTypeIdentifierListItem = function(ctx) {
};


// Enter a parse tree produced by PParser#TypeIdentifierList.
PParserListener.prototype.enterTypeIdentifierList = function(ctx) {
};

// Exit a parse tree produced by PParser#TypeIdentifierList.
PParserListener.prototype.exitTypeIdentifierList = function(ctx) {
};


// Enter a parse tree produced by PParser#MethodVariableIdentifier.
PParserListener.prototype.enterMethodVariableIdentifier = function(ctx) {
};

// Exit a parse tree produced by PParser#MethodVariableIdentifier.
PParserListener.prototype.exitMethodVariableIdentifier = function(ctx) {
};


// Enter a parse tree produced by PParser#MethodTypeIdentifier.
PParserListener.prototype.enterMethodTypeIdentifier = function(ctx) {
};

// Exit a parse tree produced by PParser#MethodTypeIdentifier.
PParserListener.prototype.exitMethodTypeIdentifier = function(ctx) {
};


// Enter a parse tree produced by PParser#VariableIdentifier.
PParserListener.prototype.enterVariableIdentifier = function(ctx) {
};

// Exit a parse tree produced by PParser#VariableIdentifier.
PParserListener.prototype.exitVariableIdentifier = function(ctx) {
};


// Enter a parse tree produced by PParser#TypeIdentifier.
PParserListener.prototype.enterTypeIdentifier = function(ctx) {
};

// Exit a parse tree produced by PParser#TypeIdentifier.
PParserListener.prototype.exitTypeIdentifier = function(ctx) {
};


// Enter a parse tree produced by PParser#SymbolIdentifier.
PParserListener.prototype.enterSymbolIdentifier = function(ctx) {
};

// Exit a parse tree produced by PParser#SymbolIdentifier.
PParserListener.prototype.exitSymbolIdentifier = function(ctx) {
};


// Enter a parse tree produced by PParser#variable_identifier.
PParserListener.prototype.enterVariable_identifier = function(ctx) {
};

// Exit a parse tree produced by PParser#variable_identifier.
PParserListener.prototype.exitVariable_identifier = function(ctx) {
};


// Enter a parse tree produced by PParser#type_identifier.
PParserListener.prototype.enterType_identifier = function(ctx) {
};

// Exit a parse tree produced by PParser#type_identifier.
PParserListener.prototype.exitType_identifier = function(ctx) {
};


// Enter a parse tree produced by PParser#symbol_identifier.
PParserListener.prototype.enterSymbol_identifier = function(ctx) {
};

// Exit a parse tree produced by PParser#symbol_identifier.
PParserListener.prototype.exitSymbol_identifier = function(ctx) {
};


// Enter a parse tree produced by PParser#ArgumentListItem.
PParserListener.prototype.enterArgumentListItem = function(ctx) {
};

// Exit a parse tree produced by PParser#ArgumentListItem.
PParserListener.prototype.exitArgumentListItem = function(ctx) {
};


// Enter a parse tree produced by PParser#ArgumentList.
PParserListener.prototype.enterArgumentList = function(ctx) {
};

// Exit a parse tree produced by PParser#ArgumentList.
PParserListener.prototype.exitArgumentList = function(ctx) {
};


// Enter a parse tree produced by PParser#CodeArgument.
PParserListener.prototype.enterCodeArgument = function(ctx) {
};

// Exit a parse tree produced by PParser#CodeArgument.
PParserListener.prototype.exitCodeArgument = function(ctx) {
};


// Enter a parse tree produced by PParser#OperatorArgument.
PParserListener.prototype.enterOperatorArgument = function(ctx) {
};

// Exit a parse tree produced by PParser#OperatorArgument.
PParserListener.prototype.exitOperatorArgument = function(ctx) {
};


// Enter a parse tree produced by PParser#NamedArgument.
PParserListener.prototype.enterNamedArgument = function(ctx) {
};

// Exit a parse tree produced by PParser#NamedArgument.
PParserListener.prototype.exitNamedArgument = function(ctx) {
};


// Enter a parse tree produced by PParser#TypedArgument.
PParserListener.prototype.enterTypedArgument = function(ctx) {
};

// Exit a parse tree produced by PParser#TypedArgument.
PParserListener.prototype.exitTypedArgument = function(ctx) {
};


// Enter a parse tree produced by PParser#named_argument.
PParserListener.prototype.enterNamed_argument = function(ctx) {
};

// Exit a parse tree produced by PParser#named_argument.
PParserListener.prototype.exitNamed_argument = function(ctx) {
};


// Enter a parse tree produced by PParser#code_argument.
PParserListener.prototype.enterCode_argument = function(ctx) {
};

// Exit a parse tree produced by PParser#code_argument.
PParserListener.prototype.exitCode_argument = function(ctx) {
};


// Enter a parse tree produced by PParser#CategoryArgumentType.
PParserListener.prototype.enterCategoryArgumentType = function(ctx) {
};

// Exit a parse tree produced by PParser#CategoryArgumentType.
PParserListener.prototype.exitCategoryArgumentType = function(ctx) {
};


// Enter a parse tree produced by PParser#AnyArgumentType.
PParserListener.prototype.enterAnyArgumentType = function(ctx) {
};

// Exit a parse tree produced by PParser#AnyArgumentType.
PParserListener.prototype.exitAnyArgumentType = function(ctx) {
};


// Enter a parse tree produced by PParser#AnyType.
PParserListener.prototype.enterAnyType = function(ctx) {
};

// Exit a parse tree produced by PParser#AnyType.
PParserListener.prototype.exitAnyType = function(ctx) {
};


// Enter a parse tree produced by PParser#AnyListType.
PParserListener.prototype.enterAnyListType = function(ctx) {
};

// Exit a parse tree produced by PParser#AnyListType.
PParserListener.prototype.exitAnyListType = function(ctx) {
};


// Enter a parse tree produced by PParser#AnyDictType.
PParserListener.prototype.enterAnyDictType = function(ctx) {
};

// Exit a parse tree produced by PParser#AnyDictType.
PParserListener.prototype.exitAnyDictType = function(ctx) {
};


// Enter a parse tree produced by PParser#CategoryMethodListItem.
PParserListener.prototype.enterCategoryMethodListItem = function(ctx) {
};

// Exit a parse tree produced by PParser#CategoryMethodListItem.
PParserListener.prototype.exitCategoryMethodListItem = function(ctx) {
};


// Enter a parse tree produced by PParser#CategoryMethodList.
PParserListener.prototype.enterCategoryMethodList = function(ctx) {
};

// Exit a parse tree produced by PParser#CategoryMethodList.
PParserListener.prototype.exitCategoryMethodList = function(ctx) {
};


// Enter a parse tree produced by PParser#SetterMethod.
PParserListener.prototype.enterSetterMethod = function(ctx) {
};

// Exit a parse tree produced by PParser#SetterMethod.
PParserListener.prototype.exitSetterMethod = function(ctx) {
};


// Enter a parse tree produced by PParser#GetterMethod.
PParserListener.prototype.enterGetterMethod = function(ctx) {
};

// Exit a parse tree produced by PParser#GetterMethod.
PParserListener.prototype.exitGetterMethod = function(ctx) {
};


// Enter a parse tree produced by PParser#MemberMethod.
PParserListener.prototype.enterMemberMethod = function(ctx) {
};

// Exit a parse tree produced by PParser#MemberMethod.
PParserListener.prototype.exitMemberMethod = function(ctx) {
};


// Enter a parse tree produced by PParser#OperatorMethod.
PParserListener.prototype.enterOperatorMethod = function(ctx) {
};

// Exit a parse tree produced by PParser#OperatorMethod.
PParserListener.prototype.exitOperatorMethod = function(ctx) {
};


// Enter a parse tree produced by PParser#JavaCategoryMapping.
PParserListener.prototype.enterJavaCategoryMapping = function(ctx) {
};

// Exit a parse tree produced by PParser#JavaCategoryMapping.
PParserListener.prototype.exitJavaCategoryMapping = function(ctx) {
};


// Enter a parse tree produced by PParser#CSharpCategoryMapping.
PParserListener.prototype.enterCSharpCategoryMapping = function(ctx) {
};

// Exit a parse tree produced by PParser#CSharpCategoryMapping.
PParserListener.prototype.exitCSharpCategoryMapping = function(ctx) {
};


// Enter a parse tree produced by PParser#Python2CategoryMapping.
PParserListener.prototype.enterPython2CategoryMapping = function(ctx) {
};

// Exit a parse tree produced by PParser#Python2CategoryMapping.
PParserListener.prototype.exitPython2CategoryMapping = function(ctx) {
};


// Enter a parse tree produced by PParser#Python3CategoryMapping.
PParserListener.prototype.enterPython3CategoryMapping = function(ctx) {
};

// Exit a parse tree produced by PParser#Python3CategoryMapping.
PParserListener.prototype.exitPython3CategoryMapping = function(ctx) {
};


// Enter a parse tree produced by PParser#JavaScriptCategoryMapping.
PParserListener.prototype.enterJavaScriptCategoryMapping = function(ctx) {
};

// Exit a parse tree produced by PParser#JavaScriptCategoryMapping.
PParserListener.prototype.exitJavaScriptCategoryMapping = function(ctx) {
};


// Enter a parse tree produced by PParser#python_category_mapping.
PParserListener.prototype.enterPython_category_mapping = function(ctx) {
};

// Exit a parse tree produced by PParser#python_category_mapping.
PParserListener.prototype.exitPython_category_mapping = function(ctx) {
};


// Enter a parse tree produced by PParser#python_module.
PParserListener.prototype.enterPython_module = function(ctx) {
};

// Exit a parse tree produced by PParser#python_module.
PParserListener.prototype.exitPython_module = function(ctx) {
};


// Enter a parse tree produced by PParser#module_token.
PParserListener.prototype.enterModule_token = function(ctx) {
};

// Exit a parse tree produced by PParser#module_token.
PParserListener.prototype.exitModule_token = function(ctx) {
};


// Enter a parse tree produced by PParser#javascript_category_mapping.
PParserListener.prototype.enterJavascript_category_mapping = function(ctx) {
};

// Exit a parse tree produced by PParser#javascript_category_mapping.
PParserListener.prototype.exitJavascript_category_mapping = function(ctx) {
};


// Enter a parse tree produced by PParser#javascript_module.
PParserListener.prototype.enterJavascript_module = function(ctx) {
};

// Exit a parse tree produced by PParser#javascript_module.
PParserListener.prototype.exitJavascript_module = function(ctx) {
};


// Enter a parse tree produced by PParser#VariableList.
PParserListener.prototype.enterVariableList = function(ctx) {
};

// Exit a parse tree produced by PParser#VariableList.
PParserListener.prototype.exitVariableList = function(ctx) {
};


// Enter a parse tree produced by PParser#VariableListItem.
PParserListener.prototype.enterVariableListItem = function(ctx) {
};

// Exit a parse tree produced by PParser#VariableListItem.
PParserListener.prototype.exitVariableListItem = function(ctx) {
};


// Enter a parse tree produced by PParser#AbstractMethod.
PParserListener.prototype.enterAbstractMethod = function(ctx) {
};

// Exit a parse tree produced by PParser#AbstractMethod.
PParserListener.prototype.exitAbstractMethod = function(ctx) {
};


// Enter a parse tree produced by PParser#ConcreteMethod.
PParserListener.prototype.enterConcreteMethod = function(ctx) {
};

// Exit a parse tree produced by PParser#ConcreteMethod.
PParserListener.prototype.exitConcreteMethod = function(ctx) {
};


// Enter a parse tree produced by PParser#NativeMethod.
PParserListener.prototype.enterNativeMethod = function(ctx) {
};

// Exit a parse tree produced by PParser#NativeMethod.
PParserListener.prototype.exitNativeMethod = function(ctx) {
};


// Enter a parse tree produced by PParser#NativeStatementList.
PParserListener.prototype.enterNativeStatementList = function(ctx) {
};

// Exit a parse tree produced by PParser#NativeStatementList.
PParserListener.prototype.exitNativeStatementList = function(ctx) {
};


// Enter a parse tree produced by PParser#NativeStatementListItem.
PParserListener.prototype.enterNativeStatementListItem = function(ctx) {
};

// Exit a parse tree produced by PParser#NativeStatementListItem.
PParserListener.prototype.exitNativeStatementListItem = function(ctx) {
};


// Enter a parse tree produced by PParser#JavaNativeStatement.
PParserListener.prototype.enterJavaNativeStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#JavaNativeStatement.
PParserListener.prototype.exitJavaNativeStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#CSharpNativeStatement.
PParserListener.prototype.enterCSharpNativeStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#CSharpNativeStatement.
PParserListener.prototype.exitCSharpNativeStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#Python2NativeStatement.
PParserListener.prototype.enterPython2NativeStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#Python2NativeStatement.
PParserListener.prototype.exitPython2NativeStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#Python3NativeStatement.
PParserListener.prototype.enterPython3NativeStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#Python3NativeStatement.
PParserListener.prototype.exitPython3NativeStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#JavaScriptNativeStatement.
PParserListener.prototype.enterJavaScriptNativeStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#JavaScriptNativeStatement.
PParserListener.prototype.exitJavaScriptNativeStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#python_native_statement.
PParserListener.prototype.enterPython_native_statement = function(ctx) {
};

// Exit a parse tree produced by PParser#python_native_statement.
PParserListener.prototype.exitPython_native_statement = function(ctx) {
};


// Enter a parse tree produced by PParser#javascript_native_statement.
PParserListener.prototype.enterJavascript_native_statement = function(ctx) {
};

// Exit a parse tree produced by PParser#javascript_native_statement.
PParserListener.prototype.exitJavascript_native_statement = function(ctx) {
};


// Enter a parse tree produced by PParser#StatementListItem.
PParserListener.prototype.enterStatementListItem = function(ctx) {
};

// Exit a parse tree produced by PParser#StatementListItem.
PParserListener.prototype.exitStatementListItem = function(ctx) {
};


// Enter a parse tree produced by PParser#StatementList.
PParserListener.prototype.enterStatementList = function(ctx) {
};

// Exit a parse tree produced by PParser#StatementList.
PParserListener.prototype.exitStatementList = function(ctx) {
};


// Enter a parse tree produced by PParser#SwitchCaseStatementListItem.
PParserListener.prototype.enterSwitchCaseStatementListItem = function(ctx) {
};

// Exit a parse tree produced by PParser#SwitchCaseStatementListItem.
PParserListener.prototype.exitSwitchCaseStatementListItem = function(ctx) {
};


// Enter a parse tree produced by PParser#SwitchCaseStatementList.
PParserListener.prototype.enterSwitchCaseStatementList = function(ctx) {
};

// Exit a parse tree produced by PParser#SwitchCaseStatementList.
PParserListener.prototype.exitSwitchCaseStatementList = function(ctx) {
};


// Enter a parse tree produced by PParser#CatchStatementListItem.
PParserListener.prototype.enterCatchStatementListItem = function(ctx) {
};

// Exit a parse tree produced by PParser#CatchStatementListItem.
PParserListener.prototype.exitCatchStatementListItem = function(ctx) {
};


// Enter a parse tree produced by PParser#CatchStatementList.
PParserListener.prototype.enterCatchStatementList = function(ctx) {
};

// Exit a parse tree produced by PParser#CatchStatementList.
PParserListener.prototype.exitCatchStatementList = function(ctx) {
};


// Enter a parse tree produced by PParser#LiteralRangeLiteral.
PParserListener.prototype.enterLiteralRangeLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#LiteralRangeLiteral.
PParserListener.prototype.exitLiteralRangeLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#LiteralListLiteral.
PParserListener.prototype.enterLiteralListLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#LiteralListLiteral.
PParserListener.prototype.exitLiteralListLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#LiteralSetLiteral.
PParserListener.prototype.enterLiteralSetLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#LiteralSetLiteral.
PParserListener.prototype.exitLiteralSetLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#MinIntegerLiteral.
PParserListener.prototype.enterMinIntegerLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#MinIntegerLiteral.
PParserListener.prototype.exitMinIntegerLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#MaxIntegerLiteral.
PParserListener.prototype.enterMaxIntegerLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#MaxIntegerLiteral.
PParserListener.prototype.exitMaxIntegerLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#IntegerLiteral.
PParserListener.prototype.enterIntegerLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#IntegerLiteral.
PParserListener.prototype.exitIntegerLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#HexadecimalLiteral.
PParserListener.prototype.enterHexadecimalLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#HexadecimalLiteral.
PParserListener.prototype.exitHexadecimalLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#CharacterLiteral.
PParserListener.prototype.enterCharacterLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#CharacterLiteral.
PParserListener.prototype.exitCharacterLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#DateLiteral.
PParserListener.prototype.enterDateLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#DateLiteral.
PParserListener.prototype.exitDateLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#TimeLiteral.
PParserListener.prototype.enterTimeLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#TimeLiteral.
PParserListener.prototype.exitTimeLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#TextLiteral.
PParserListener.prototype.enterTextLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#TextLiteral.
PParserListener.prototype.exitTextLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#DecimalLiteral.
PParserListener.prototype.enterDecimalLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#DecimalLiteral.
PParserListener.prototype.exitDecimalLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#DateTimeLiteral.
PParserListener.prototype.enterDateTimeLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#DateTimeLiteral.
PParserListener.prototype.exitDateTimeLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#BooleanLiteral.
PParserListener.prototype.enterBooleanLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#BooleanLiteral.
PParserListener.prototype.exitBooleanLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#PeriodLiteral.
PParserListener.prototype.enterPeriodLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#PeriodLiteral.
PParserListener.prototype.exitPeriodLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#NullLiteral.
PParserListener.prototype.enterNullLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#NullLiteral.
PParserListener.prototype.exitNullLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#LiteralList.
PParserListener.prototype.enterLiteralList = function(ctx) {
};

// Exit a parse tree produced by PParser#LiteralList.
PParserListener.prototype.exitLiteralList = function(ctx) {
};


// Enter a parse tree produced by PParser#LiteralListItem.
PParserListener.prototype.enterLiteralListItem = function(ctx) {
};

// Exit a parse tree produced by PParser#LiteralListItem.
PParserListener.prototype.exitLiteralListItem = function(ctx) {
};


// Enter a parse tree produced by PParser#ParenthesisExpression.
PParserListener.prototype.enterParenthesisExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#ParenthesisExpression.
PParserListener.prototype.exitParenthesisExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#LiteralExpression.
PParserListener.prototype.enterLiteralExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#LiteralExpression.
PParserListener.prototype.exitLiteralExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#IdentifierExpression.
PParserListener.prototype.enterIdentifierExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#IdentifierExpression.
PParserListener.prototype.exitIdentifierExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#ThisExpression.
PParserListener.prototype.enterThisExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#ThisExpression.
PParserListener.prototype.exitThisExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#this_expression.
PParserListener.prototype.enterThis_expression = function(ctx) {
};

// Exit a parse tree produced by PParser#this_expression.
PParserListener.prototype.exitThis_expression = function(ctx) {
};


// Enter a parse tree produced by PParser#parenthesis_expression.
PParserListener.prototype.enterParenthesis_expression = function(ctx) {
};

// Exit a parse tree produced by PParser#parenthesis_expression.
PParserListener.prototype.exitParenthesis_expression = function(ctx) {
};


// Enter a parse tree produced by PParser#AtomicLiteral.
PParserListener.prototype.enterAtomicLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#AtomicLiteral.
PParserListener.prototype.exitAtomicLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#CollectionLiteral.
PParserListener.prototype.enterCollectionLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#CollectionLiteral.
PParserListener.prototype.exitCollectionLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#RangeLiteral.
PParserListener.prototype.enterRangeLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#RangeLiteral.
PParserListener.prototype.exitRangeLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#ListLiteral.
PParserListener.prototype.enterListLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#ListLiteral.
PParserListener.prototype.exitListLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#SetLiteral.
PParserListener.prototype.enterSetLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#SetLiteral.
PParserListener.prototype.exitSetLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#DictLiteral.
PParserListener.prototype.enterDictLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#DictLiteral.
PParserListener.prototype.exitDictLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#TupleLiteral.
PParserListener.prototype.enterTupleLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#TupleLiteral.
PParserListener.prototype.exitTupleLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#tuple_literal.
PParserListener.prototype.enterTuple_literal = function(ctx) {
};

// Exit a parse tree produced by PParser#tuple_literal.
PParserListener.prototype.exitTuple_literal = function(ctx) {
};


// Enter a parse tree produced by PParser#dict_literal.
PParserListener.prototype.enterDict_literal = function(ctx) {
};

// Exit a parse tree produced by PParser#dict_literal.
PParserListener.prototype.exitDict_literal = function(ctx) {
};


// Enter a parse tree produced by PParser#ValueTupleItem.
PParserListener.prototype.enterValueTupleItem = function(ctx) {
};

// Exit a parse tree produced by PParser#ValueTupleItem.
PParserListener.prototype.exitValueTupleItem = function(ctx) {
};


// Enter a parse tree produced by PParser#ValueTuple.
PParserListener.prototype.enterValueTuple = function(ctx) {
};

// Exit a parse tree produced by PParser#ValueTuple.
PParserListener.prototype.exitValueTuple = function(ctx) {
};


// Enter a parse tree produced by PParser#DictEntryList.
PParserListener.prototype.enterDictEntryList = function(ctx) {
};

// Exit a parse tree produced by PParser#DictEntryList.
PParserListener.prototype.exitDictEntryList = function(ctx) {
};


// Enter a parse tree produced by PParser#DictEntryListItem.
PParserListener.prototype.enterDictEntryListItem = function(ctx) {
};

// Exit a parse tree produced by PParser#DictEntryListItem.
PParserListener.prototype.exitDictEntryListItem = function(ctx) {
};


// Enter a parse tree produced by PParser#dict_entry.
PParserListener.prototype.enterDict_entry = function(ctx) {
};

// Exit a parse tree produced by PParser#dict_entry.
PParserListener.prototype.exitDict_entry = function(ctx) {
};


// Enter a parse tree produced by PParser#SliceFirstAndLast.
PParserListener.prototype.enterSliceFirstAndLast = function(ctx) {
};

// Exit a parse tree produced by PParser#SliceFirstAndLast.
PParserListener.prototype.exitSliceFirstAndLast = function(ctx) {
};


// Enter a parse tree produced by PParser#SliceFirstOnly.
PParserListener.prototype.enterSliceFirstOnly = function(ctx) {
};

// Exit a parse tree produced by PParser#SliceFirstOnly.
PParserListener.prototype.exitSliceFirstOnly = function(ctx) {
};


// Enter a parse tree produced by PParser#SliceLastOnly.
PParserListener.prototype.enterSliceLastOnly = function(ctx) {
};

// Exit a parse tree produced by PParser#SliceLastOnly.
PParserListener.prototype.exitSliceLastOnly = function(ctx) {
};


// Enter a parse tree produced by PParser#assign_variable_statement.
PParserListener.prototype.enterAssign_variable_statement = function(ctx) {
};

// Exit a parse tree produced by PParser#assign_variable_statement.
PParserListener.prototype.exitAssign_variable_statement = function(ctx) {
};


// Enter a parse tree produced by PParser#RootInstance.
PParserListener.prototype.enterRootInstance = function(ctx) {
};

// Exit a parse tree produced by PParser#RootInstance.
PParserListener.prototype.exitRootInstance = function(ctx) {
};


// Enter a parse tree produced by PParser#ChildInstance.
PParserListener.prototype.enterChildInstance = function(ctx) {
};

// Exit a parse tree produced by PParser#ChildInstance.
PParserListener.prototype.exitChildInstance = function(ctx) {
};


// Enter a parse tree produced by PParser#IsATypeExpression.
PParserListener.prototype.enterIsATypeExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#IsATypeExpression.
PParserListener.prototype.exitIsATypeExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#IsOtherExpression.
PParserListener.prototype.enterIsOtherExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#IsOtherExpression.
PParserListener.prototype.exitIsOtherExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#OperatorPlus.
PParserListener.prototype.enterOperatorPlus = function(ctx) {
};

// Exit a parse tree produced by PParser#OperatorPlus.
PParserListener.prototype.exitOperatorPlus = function(ctx) {
};


// Enter a parse tree produced by PParser#OperatorMinus.
PParserListener.prototype.enterOperatorMinus = function(ctx) {
};

// Exit a parse tree produced by PParser#OperatorMinus.
PParserListener.prototype.exitOperatorMinus = function(ctx) {
};


// Enter a parse tree produced by PParser#OperatorMultiply.
PParserListener.prototype.enterOperatorMultiply = function(ctx) {
};

// Exit a parse tree produced by PParser#OperatorMultiply.
PParserListener.prototype.exitOperatorMultiply = function(ctx) {
};


// Enter a parse tree produced by PParser#OperatorDivide.
PParserListener.prototype.enterOperatorDivide = function(ctx) {
};

// Exit a parse tree produced by PParser#OperatorDivide.
PParserListener.prototype.exitOperatorDivide = function(ctx) {
};


// Enter a parse tree produced by PParser#OperatorIDivide.
PParserListener.prototype.enterOperatorIDivide = function(ctx) {
};

// Exit a parse tree produced by PParser#OperatorIDivide.
PParserListener.prototype.exitOperatorIDivide = function(ctx) {
};


// Enter a parse tree produced by PParser#OperatorModulo.
PParserListener.prototype.enterOperatorModulo = function(ctx) {
};

// Exit a parse tree produced by PParser#OperatorModulo.
PParserListener.prototype.exitOperatorModulo = function(ctx) {
};


// Enter a parse tree produced by PParser#key_token.
PParserListener.prototype.enterKey_token = function(ctx) {
};

// Exit a parse tree produced by PParser#key_token.
PParserListener.prototype.exitKey_token = function(ctx) {
};


// Enter a parse tree produced by PParser#value_token.
PParserListener.prototype.enterValue_token = function(ctx) {
};

// Exit a parse tree produced by PParser#value_token.
PParserListener.prototype.exitValue_token = function(ctx) {
};


// Enter a parse tree produced by PParser#symbols_token.
PParserListener.prototype.enterSymbols_token = function(ctx) {
};

// Exit a parse tree produced by PParser#symbols_token.
PParserListener.prototype.exitSymbols_token = function(ctx) {
};


// Enter a parse tree produced by PParser#assign.
PParserListener.prototype.enterAssign = function(ctx) {
};

// Exit a parse tree produced by PParser#assign.
PParserListener.prototype.exitAssign = function(ctx) {
};


// Enter a parse tree produced by PParser#multiply.
PParserListener.prototype.enterMultiply = function(ctx) {
};

// Exit a parse tree produced by PParser#multiply.
PParserListener.prototype.exitMultiply = function(ctx) {
};


// Enter a parse tree produced by PParser#divide.
PParserListener.prototype.enterDivide = function(ctx) {
};

// Exit a parse tree produced by PParser#divide.
PParserListener.prototype.exitDivide = function(ctx) {
};


// Enter a parse tree produced by PParser#idivide.
PParserListener.prototype.enterIdivide = function(ctx) {
};

// Exit a parse tree produced by PParser#idivide.
PParserListener.prototype.exitIdivide = function(ctx) {
};


// Enter a parse tree produced by PParser#modulo.
PParserListener.prototype.enterModulo = function(ctx) {
};

// Exit a parse tree produced by PParser#modulo.
PParserListener.prototype.exitModulo = function(ctx) {
};


// Enter a parse tree produced by PParser#JavascriptReturnStatement.
PParserListener.prototype.enterJavascriptReturnStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#JavascriptReturnStatement.
PParserListener.prototype.exitJavascriptReturnStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#JavascriptStatement.
PParserListener.prototype.enterJavascriptStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#JavascriptStatement.
PParserListener.prototype.exitJavascriptStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#JavascriptPrimaryExpression.
PParserListener.prototype.enterJavascriptPrimaryExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#JavascriptPrimaryExpression.
PParserListener.prototype.exitJavascriptPrimaryExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#JavascriptSelectorExpression.
PParserListener.prototype.enterJavascriptSelectorExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#JavascriptSelectorExpression.
PParserListener.prototype.exitJavascriptSelectorExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#JavascriptParenthesisExpression.
PParserListener.prototype.enterJavascriptParenthesisExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#JavascriptParenthesisExpression.
PParserListener.prototype.exitJavascriptParenthesisExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#JavascriptIdentifierExpression.
PParserListener.prototype.enterJavascriptIdentifierExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#JavascriptIdentifierExpression.
PParserListener.prototype.exitJavascriptIdentifierExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#JavascriptLiteralExpression.
PParserListener.prototype.enterJavascriptLiteralExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#JavascriptLiteralExpression.
PParserListener.prototype.exitJavascriptLiteralExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#JavascriptMethodExpression.
PParserListener.prototype.enterJavascriptMethodExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#JavascriptMethodExpression.
PParserListener.prototype.exitJavascriptMethodExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#JavascriptItemExpression.
PParserListener.prototype.enterJavascriptItemExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#JavascriptItemExpression.
PParserListener.prototype.exitJavascriptItemExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#javascript_method_expression.
PParserListener.prototype.enterJavascript_method_expression = function(ctx) {
};

// Exit a parse tree produced by PParser#javascript_method_expression.
PParserListener.prototype.exitJavascript_method_expression = function(ctx) {
};


// Enter a parse tree produced by PParser#JavascriptArgumentListItem.
PParserListener.prototype.enterJavascriptArgumentListItem = function(ctx) {
};

// Exit a parse tree produced by PParser#JavascriptArgumentListItem.
PParserListener.prototype.exitJavascriptArgumentListItem = function(ctx) {
};


// Enter a parse tree produced by PParser#JavascriptArgumentList.
PParserListener.prototype.enterJavascriptArgumentList = function(ctx) {
};

// Exit a parse tree produced by PParser#JavascriptArgumentList.
PParserListener.prototype.exitJavascriptArgumentList = function(ctx) {
};


// Enter a parse tree produced by PParser#javascript_item_expression.
PParserListener.prototype.enterJavascript_item_expression = function(ctx) {
};

// Exit a parse tree produced by PParser#javascript_item_expression.
PParserListener.prototype.exitJavascript_item_expression = function(ctx) {
};


// Enter a parse tree produced by PParser#javascript_parenthesis_expression.
PParserListener.prototype.enterJavascript_parenthesis_expression = function(ctx) {
};

// Exit a parse tree produced by PParser#javascript_parenthesis_expression.
PParserListener.prototype.exitJavascript_parenthesis_expression = function(ctx) {
};


// Enter a parse tree produced by PParser#JavascriptChildIdentifier.
PParserListener.prototype.enterJavascriptChildIdentifier = function(ctx) {
};

// Exit a parse tree produced by PParser#JavascriptChildIdentifier.
PParserListener.prototype.exitJavascriptChildIdentifier = function(ctx) {
};


// Enter a parse tree produced by PParser#JavascriptIdentifier.
PParserListener.prototype.enterJavascriptIdentifier = function(ctx) {
};

// Exit a parse tree produced by PParser#JavascriptIdentifier.
PParserListener.prototype.exitJavascriptIdentifier = function(ctx) {
};


// Enter a parse tree produced by PParser#JavascriptIntegerLiteral.
PParserListener.prototype.enterJavascriptIntegerLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#JavascriptIntegerLiteral.
PParserListener.prototype.exitJavascriptIntegerLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#JavascriptDecimalLiteral.
PParserListener.prototype.enterJavascriptDecimalLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#JavascriptDecimalLiteral.
PParserListener.prototype.exitJavascriptDecimalLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#JavascriptTextLiteral.
PParserListener.prototype.enterJavascriptTextLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#JavascriptTextLiteral.
PParserListener.prototype.exitJavascriptTextLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#JavascriptBooleanLiteral.
PParserListener.prototype.enterJavascriptBooleanLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#JavascriptBooleanLiteral.
PParserListener.prototype.exitJavascriptBooleanLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#JavascriptCharacterLiteral.
PParserListener.prototype.enterJavascriptCharacterLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#JavascriptCharacterLiteral.
PParserListener.prototype.exitJavascriptCharacterLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#javascript_identifier.
PParserListener.prototype.enterJavascript_identifier = function(ctx) {
};

// Exit a parse tree produced by PParser#javascript_identifier.
PParserListener.prototype.exitJavascript_identifier = function(ctx) {
};


// Enter a parse tree produced by PParser#PythonReturnStatement.
PParserListener.prototype.enterPythonReturnStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#PythonReturnStatement.
PParserListener.prototype.exitPythonReturnStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#PythonStatement.
PParserListener.prototype.enterPythonStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#PythonStatement.
PParserListener.prototype.exitPythonStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#PythonPrimaryExpression.
PParserListener.prototype.enterPythonPrimaryExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#PythonPrimaryExpression.
PParserListener.prototype.exitPythonPrimaryExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#PythonSelectorExpression.
PParserListener.prototype.enterPythonSelectorExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#PythonSelectorExpression.
PParserListener.prototype.exitPythonSelectorExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#PythonParenthesisExpression.
PParserListener.prototype.enterPythonParenthesisExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#PythonParenthesisExpression.
PParserListener.prototype.exitPythonParenthesisExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#PythonIdentifierExpression.
PParserListener.prototype.enterPythonIdentifierExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#PythonIdentifierExpression.
PParserListener.prototype.exitPythonIdentifierExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#PythonLiteralExpression.
PParserListener.prototype.enterPythonLiteralExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#PythonLiteralExpression.
PParserListener.prototype.exitPythonLiteralExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#PythonGlobalMethodExpression.
PParserListener.prototype.enterPythonGlobalMethodExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#PythonGlobalMethodExpression.
PParserListener.prototype.exitPythonGlobalMethodExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#PythonMethodExpression.
PParserListener.prototype.enterPythonMethodExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#PythonMethodExpression.
PParserListener.prototype.exitPythonMethodExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#PythonItemExpression.
PParserListener.prototype.enterPythonItemExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#PythonItemExpression.
PParserListener.prototype.exitPythonItemExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#python_method_expression.
PParserListener.prototype.enterPython_method_expression = function(ctx) {
};

// Exit a parse tree produced by PParser#python_method_expression.
PParserListener.prototype.exitPython_method_expression = function(ctx) {
};


// Enter a parse tree produced by PParser#PythonOrdinalOnlyArgumentList.
PParserListener.prototype.enterPythonOrdinalOnlyArgumentList = function(ctx) {
};

// Exit a parse tree produced by PParser#PythonOrdinalOnlyArgumentList.
PParserListener.prototype.exitPythonOrdinalOnlyArgumentList = function(ctx) {
};


// Enter a parse tree produced by PParser#PythonNamedOnlyArgumentList.
PParserListener.prototype.enterPythonNamedOnlyArgumentList = function(ctx) {
};

// Exit a parse tree produced by PParser#PythonNamedOnlyArgumentList.
PParserListener.prototype.exitPythonNamedOnlyArgumentList = function(ctx) {
};


// Enter a parse tree produced by PParser#PythonArgumentList.
PParserListener.prototype.enterPythonArgumentList = function(ctx) {
};

// Exit a parse tree produced by PParser#PythonArgumentList.
PParserListener.prototype.exitPythonArgumentList = function(ctx) {
};


// Enter a parse tree produced by PParser#PythonOrdinalArgumentListItem.
PParserListener.prototype.enterPythonOrdinalArgumentListItem = function(ctx) {
};

// Exit a parse tree produced by PParser#PythonOrdinalArgumentListItem.
PParserListener.prototype.exitPythonOrdinalArgumentListItem = function(ctx) {
};


// Enter a parse tree produced by PParser#PythonOrdinalArgumentList.
PParserListener.prototype.enterPythonOrdinalArgumentList = function(ctx) {
};

// Exit a parse tree produced by PParser#PythonOrdinalArgumentList.
PParserListener.prototype.exitPythonOrdinalArgumentList = function(ctx) {
};


// Enter a parse tree produced by PParser#PythonNamedArgumentListItem.
PParserListener.prototype.enterPythonNamedArgumentListItem = function(ctx) {
};

// Exit a parse tree produced by PParser#PythonNamedArgumentListItem.
PParserListener.prototype.exitPythonNamedArgumentListItem = function(ctx) {
};


// Enter a parse tree produced by PParser#PythonNamedArgumentList.
PParserListener.prototype.enterPythonNamedArgumentList = function(ctx) {
};

// Exit a parse tree produced by PParser#PythonNamedArgumentList.
PParserListener.prototype.exitPythonNamedArgumentList = function(ctx) {
};


// Enter a parse tree produced by PParser#python_parenthesis_expression.
PParserListener.prototype.enterPython_parenthesis_expression = function(ctx) {
};

// Exit a parse tree produced by PParser#python_parenthesis_expression.
PParserListener.prototype.exitPython_parenthesis_expression = function(ctx) {
};


// Enter a parse tree produced by PParser#PythonChildIdentifier.
PParserListener.prototype.enterPythonChildIdentifier = function(ctx) {
};

// Exit a parse tree produced by PParser#PythonChildIdentifier.
PParserListener.prototype.exitPythonChildIdentifier = function(ctx) {
};


// Enter a parse tree produced by PParser#PythonIdentifier.
PParserListener.prototype.enterPythonIdentifier = function(ctx) {
};

// Exit a parse tree produced by PParser#PythonIdentifier.
PParserListener.prototype.exitPythonIdentifier = function(ctx) {
};


// Enter a parse tree produced by PParser#PythonIntegerLiteral.
PParserListener.prototype.enterPythonIntegerLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#PythonIntegerLiteral.
PParserListener.prototype.exitPythonIntegerLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#PythonDecimalLiteral.
PParserListener.prototype.enterPythonDecimalLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#PythonDecimalLiteral.
PParserListener.prototype.exitPythonDecimalLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#PythonTextLiteral.
PParserListener.prototype.enterPythonTextLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#PythonTextLiteral.
PParserListener.prototype.exitPythonTextLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#PythonBooleanLiteral.
PParserListener.prototype.enterPythonBooleanLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#PythonBooleanLiteral.
PParserListener.prototype.exitPythonBooleanLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#PythonCharacterLiteral.
PParserListener.prototype.enterPythonCharacterLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#PythonCharacterLiteral.
PParserListener.prototype.exitPythonCharacterLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#python_identifier.
PParserListener.prototype.enterPython_identifier = function(ctx) {
};

// Exit a parse tree produced by PParser#python_identifier.
PParserListener.prototype.exitPython_identifier = function(ctx) {
};


// Enter a parse tree produced by PParser#JavaReturnStatement.
PParserListener.prototype.enterJavaReturnStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#JavaReturnStatement.
PParserListener.prototype.exitJavaReturnStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#JavaStatement.
PParserListener.prototype.enterJavaStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#JavaStatement.
PParserListener.prototype.exitJavaStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#JavaPrimaryExpression.
PParserListener.prototype.enterJavaPrimaryExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#JavaPrimaryExpression.
PParserListener.prototype.exitJavaPrimaryExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#JavaSelectorExpression.
PParserListener.prototype.enterJavaSelectorExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#JavaSelectorExpression.
PParserListener.prototype.exitJavaSelectorExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#JavaParenthesisExpression.
PParserListener.prototype.enterJavaParenthesisExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#JavaParenthesisExpression.
PParserListener.prototype.exitJavaParenthesisExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#JavaIdentifierExpression.
PParserListener.prototype.enterJavaIdentifierExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#JavaIdentifierExpression.
PParserListener.prototype.exitJavaIdentifierExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#JavaLiteralExpression.
PParserListener.prototype.enterJavaLiteralExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#JavaLiteralExpression.
PParserListener.prototype.exitJavaLiteralExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#JavaMethodExpression.
PParserListener.prototype.enterJavaMethodExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#JavaMethodExpression.
PParserListener.prototype.exitJavaMethodExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#JavaItemExpression.
PParserListener.prototype.enterJavaItemExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#JavaItemExpression.
PParserListener.prototype.exitJavaItemExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#java_method_expression.
PParserListener.prototype.enterJava_method_expression = function(ctx) {
};

// Exit a parse tree produced by PParser#java_method_expression.
PParserListener.prototype.exitJava_method_expression = function(ctx) {
};


// Enter a parse tree produced by PParser#JavaArgumentList.
PParserListener.prototype.enterJavaArgumentList = function(ctx) {
};

// Exit a parse tree produced by PParser#JavaArgumentList.
PParserListener.prototype.exitJavaArgumentList = function(ctx) {
};


// Enter a parse tree produced by PParser#JavaArgumentListItem.
PParserListener.prototype.enterJavaArgumentListItem = function(ctx) {
};

// Exit a parse tree produced by PParser#JavaArgumentListItem.
PParserListener.prototype.exitJavaArgumentListItem = function(ctx) {
};


// Enter a parse tree produced by PParser#java_item_expression.
PParserListener.prototype.enterJava_item_expression = function(ctx) {
};

// Exit a parse tree produced by PParser#java_item_expression.
PParserListener.prototype.exitJava_item_expression = function(ctx) {
};


// Enter a parse tree produced by PParser#java_parenthesis_expression.
PParserListener.prototype.enterJava_parenthesis_expression = function(ctx) {
};

// Exit a parse tree produced by PParser#java_parenthesis_expression.
PParserListener.prototype.exitJava_parenthesis_expression = function(ctx) {
};


// Enter a parse tree produced by PParser#JavaIdentifier.
PParserListener.prototype.enterJavaIdentifier = function(ctx) {
};

// Exit a parse tree produced by PParser#JavaIdentifier.
PParserListener.prototype.exitJavaIdentifier = function(ctx) {
};


// Enter a parse tree produced by PParser#JavaChildIdentifier.
PParserListener.prototype.enterJavaChildIdentifier = function(ctx) {
};

// Exit a parse tree produced by PParser#JavaChildIdentifier.
PParserListener.prototype.exitJavaChildIdentifier = function(ctx) {
};


// Enter a parse tree produced by PParser#JavaChildClassIdentifier.
PParserListener.prototype.enterJavaChildClassIdentifier = function(ctx) {
};

// Exit a parse tree produced by PParser#JavaChildClassIdentifier.
PParserListener.prototype.exitJavaChildClassIdentifier = function(ctx) {
};


// Enter a parse tree produced by PParser#JavaClassIdentifier.
PParserListener.prototype.enterJavaClassIdentifier = function(ctx) {
};

// Exit a parse tree produced by PParser#JavaClassIdentifier.
PParserListener.prototype.exitJavaClassIdentifier = function(ctx) {
};


// Enter a parse tree produced by PParser#JavaIntegerLiteral.
PParserListener.prototype.enterJavaIntegerLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#JavaIntegerLiteral.
PParserListener.prototype.exitJavaIntegerLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#JavaDecimalLiteral.
PParserListener.prototype.enterJavaDecimalLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#JavaDecimalLiteral.
PParserListener.prototype.exitJavaDecimalLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#JavaTextLiteral.
PParserListener.prototype.enterJavaTextLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#JavaTextLiteral.
PParserListener.prototype.exitJavaTextLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#JavaBooleanLiteral.
PParserListener.prototype.enterJavaBooleanLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#JavaBooleanLiteral.
PParserListener.prototype.exitJavaBooleanLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#JavaCharacterLiteral.
PParserListener.prototype.enterJavaCharacterLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#JavaCharacterLiteral.
PParserListener.prototype.exitJavaCharacterLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#java_identifier.
PParserListener.prototype.enterJava_identifier = function(ctx) {
};

// Exit a parse tree produced by PParser#java_identifier.
PParserListener.prototype.exitJava_identifier = function(ctx) {
};


// Enter a parse tree produced by PParser#CSharpReturnStatement.
PParserListener.prototype.enterCSharpReturnStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#CSharpReturnStatement.
PParserListener.prototype.exitCSharpReturnStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#CSharpStatement.
PParserListener.prototype.enterCSharpStatement = function(ctx) {
};

// Exit a parse tree produced by PParser#CSharpStatement.
PParserListener.prototype.exitCSharpStatement = function(ctx) {
};


// Enter a parse tree produced by PParser#CSharpPrimaryExpression.
PParserListener.prototype.enterCSharpPrimaryExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#CSharpPrimaryExpression.
PParserListener.prototype.exitCSharpPrimaryExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#CSharpSelectorExpression.
PParserListener.prototype.enterCSharpSelectorExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#CSharpSelectorExpression.
PParserListener.prototype.exitCSharpSelectorExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#CSharpParenthesisExpression.
PParserListener.prototype.enterCSharpParenthesisExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#CSharpParenthesisExpression.
PParserListener.prototype.exitCSharpParenthesisExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#CSharpIdentifierExpression.
PParserListener.prototype.enterCSharpIdentifierExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#CSharpIdentifierExpression.
PParserListener.prototype.exitCSharpIdentifierExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#CSharpLiteralExpression.
PParserListener.prototype.enterCSharpLiteralExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#CSharpLiteralExpression.
PParserListener.prototype.exitCSharpLiteralExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#CSharpMethodExpression.
PParserListener.prototype.enterCSharpMethodExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#CSharpMethodExpression.
PParserListener.prototype.exitCSharpMethodExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#CSharpItemExpression.
PParserListener.prototype.enterCSharpItemExpression = function(ctx) {
};

// Exit a parse tree produced by PParser#CSharpItemExpression.
PParserListener.prototype.exitCSharpItemExpression = function(ctx) {
};


// Enter a parse tree produced by PParser#csharp_method_expression.
PParserListener.prototype.enterCsharp_method_expression = function(ctx) {
};

// Exit a parse tree produced by PParser#csharp_method_expression.
PParserListener.prototype.exitCsharp_method_expression = function(ctx) {
};


// Enter a parse tree produced by PParser#CSharpArgumentList.
PParserListener.prototype.enterCSharpArgumentList = function(ctx) {
};

// Exit a parse tree produced by PParser#CSharpArgumentList.
PParserListener.prototype.exitCSharpArgumentList = function(ctx) {
};


// Enter a parse tree produced by PParser#CSharpArgumentListItem.
PParserListener.prototype.enterCSharpArgumentListItem = function(ctx) {
};

// Exit a parse tree produced by PParser#CSharpArgumentListItem.
PParserListener.prototype.exitCSharpArgumentListItem = function(ctx) {
};


// Enter a parse tree produced by PParser#csharp_item_expression.
PParserListener.prototype.enterCsharp_item_expression = function(ctx) {
};

// Exit a parse tree produced by PParser#csharp_item_expression.
PParserListener.prototype.exitCsharp_item_expression = function(ctx) {
};


// Enter a parse tree produced by PParser#csharp_parenthesis_expression.
PParserListener.prototype.enterCsharp_parenthesis_expression = function(ctx) {
};

// Exit a parse tree produced by PParser#csharp_parenthesis_expression.
PParserListener.prototype.exitCsharp_parenthesis_expression = function(ctx) {
};


// Enter a parse tree produced by PParser#CSharpIdentifier.
PParserListener.prototype.enterCSharpIdentifier = function(ctx) {
};

// Exit a parse tree produced by PParser#CSharpIdentifier.
PParserListener.prototype.exitCSharpIdentifier = function(ctx) {
};


// Enter a parse tree produced by PParser#CSharpChildIdentifier.
PParserListener.prototype.enterCSharpChildIdentifier = function(ctx) {
};

// Exit a parse tree produced by PParser#CSharpChildIdentifier.
PParserListener.prototype.exitCSharpChildIdentifier = function(ctx) {
};


// Enter a parse tree produced by PParser#CSharpIntegerLiteral.
PParserListener.prototype.enterCSharpIntegerLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#CSharpIntegerLiteral.
PParserListener.prototype.exitCSharpIntegerLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#CSharpDecimalLiteral.
PParserListener.prototype.enterCSharpDecimalLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#CSharpDecimalLiteral.
PParserListener.prototype.exitCSharpDecimalLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#CSharpTextLiteral.
PParserListener.prototype.enterCSharpTextLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#CSharpTextLiteral.
PParserListener.prototype.exitCSharpTextLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#CSharpBooleanLiteral.
PParserListener.prototype.enterCSharpBooleanLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#CSharpBooleanLiteral.
PParserListener.prototype.exitCSharpBooleanLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#CSharpCharacterLiteral.
PParserListener.prototype.enterCSharpCharacterLiteral = function(ctx) {
};

// Exit a parse tree produced by PParser#CSharpCharacterLiteral.
PParserListener.prototype.exitCSharpCharacterLiteral = function(ctx) {
};


// Enter a parse tree produced by PParser#csharp_identifier.
PParserListener.prototype.enterCsharp_identifier = function(ctx) {
};

// Exit a parse tree produced by PParser#csharp_identifier.
PParserListener.prototype.exitCsharp_identifier = function(ctx) {
};



exports.PParserListener = PParserListener;