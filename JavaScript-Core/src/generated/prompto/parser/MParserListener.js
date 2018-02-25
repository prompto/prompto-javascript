// Generated from MParser.g4 by ANTLR 4.7.1
// jshint ignore: start
var antlr4 = require('antlr4/index');

// This class defines a complete listener for a parse tree produced by MParser.
function MParserListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

MParserListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
MParserListener.prototype.constructor = MParserListener;

// Enter a parse tree produced by MParser#enum_category_declaration.
MParserListener.prototype.enterEnum_category_declaration = function(ctx) {
};

// Exit a parse tree produced by MParser#enum_category_declaration.
MParserListener.prototype.exitEnum_category_declaration = function(ctx) {
};


// Enter a parse tree produced by MParser#enum_native_declaration.
MParserListener.prototype.enterEnum_native_declaration = function(ctx) {
};

// Exit a parse tree produced by MParser#enum_native_declaration.
MParserListener.prototype.exitEnum_native_declaration = function(ctx) {
};


// Enter a parse tree produced by MParser#native_symbol.
MParserListener.prototype.enterNative_symbol = function(ctx) {
};

// Exit a parse tree produced by MParser#native_symbol.
MParserListener.prototype.exitNative_symbol = function(ctx) {
};


// Enter a parse tree produced by MParser#category_symbol.
MParserListener.prototype.enterCategory_symbol = function(ctx) {
};

// Exit a parse tree produced by MParser#category_symbol.
MParserListener.prototype.exitCategory_symbol = function(ctx) {
};


// Enter a parse tree produced by MParser#attribute_declaration.
MParserListener.prototype.enterAttribute_declaration = function(ctx) {
};

// Exit a parse tree produced by MParser#attribute_declaration.
MParserListener.prototype.exitAttribute_declaration = function(ctx) {
};


// Enter a parse tree produced by MParser#index_clause.
MParserListener.prototype.enterIndex_clause = function(ctx) {
};

// Exit a parse tree produced by MParser#index_clause.
MParserListener.prototype.exitIndex_clause = function(ctx) {
};


// Enter a parse tree produced by MParser#concrete_category_declaration.
MParserListener.prototype.enterConcrete_category_declaration = function(ctx) {
};

// Exit a parse tree produced by MParser#concrete_category_declaration.
MParserListener.prototype.exitConcrete_category_declaration = function(ctx) {
};


// Enter a parse tree produced by MParser#singleton_category_declaration.
MParserListener.prototype.enterSingleton_category_declaration = function(ctx) {
};

// Exit a parse tree produced by MParser#singleton_category_declaration.
MParserListener.prototype.exitSingleton_category_declaration = function(ctx) {
};


// Enter a parse tree produced by MParser#derived_list.
MParserListener.prototype.enterDerived_list = function(ctx) {
};

// Exit a parse tree produced by MParser#derived_list.
MParserListener.prototype.exitDerived_list = function(ctx) {
};


// Enter a parse tree produced by MParser#operator_method_declaration.
MParserListener.prototype.enterOperator_method_declaration = function(ctx) {
};

// Exit a parse tree produced by MParser#operator_method_declaration.
MParserListener.prototype.exitOperator_method_declaration = function(ctx) {
};


// Enter a parse tree produced by MParser#setter_method_declaration.
MParserListener.prototype.enterSetter_method_declaration = function(ctx) {
};

// Exit a parse tree produced by MParser#setter_method_declaration.
MParserListener.prototype.exitSetter_method_declaration = function(ctx) {
};


// Enter a parse tree produced by MParser#native_setter_declaration.
MParserListener.prototype.enterNative_setter_declaration = function(ctx) {
};

// Exit a parse tree produced by MParser#native_setter_declaration.
MParserListener.prototype.exitNative_setter_declaration = function(ctx) {
};


// Enter a parse tree produced by MParser#getter_method_declaration.
MParserListener.prototype.enterGetter_method_declaration = function(ctx) {
};

// Exit a parse tree produced by MParser#getter_method_declaration.
MParserListener.prototype.exitGetter_method_declaration = function(ctx) {
};


// Enter a parse tree produced by MParser#native_getter_declaration.
MParserListener.prototype.enterNative_getter_declaration = function(ctx) {
};

// Exit a parse tree produced by MParser#native_getter_declaration.
MParserListener.prototype.exitNative_getter_declaration = function(ctx) {
};


// Enter a parse tree produced by MParser#native_category_declaration.
MParserListener.prototype.enterNative_category_declaration = function(ctx) {
};

// Exit a parse tree produced by MParser#native_category_declaration.
MParserListener.prototype.exitNative_category_declaration = function(ctx) {
};


// Enter a parse tree produced by MParser#native_resource_declaration.
MParserListener.prototype.enterNative_resource_declaration = function(ctx) {
};

// Exit a parse tree produced by MParser#native_resource_declaration.
MParserListener.prototype.exitNative_resource_declaration = function(ctx) {
};


// Enter a parse tree produced by MParser#native_category_bindings.
MParserListener.prototype.enterNative_category_bindings = function(ctx) {
};

// Exit a parse tree produced by MParser#native_category_bindings.
MParserListener.prototype.exitNative_category_bindings = function(ctx) {
};


// Enter a parse tree produced by MParser#NativeCategoryBindingListItem.
MParserListener.prototype.enterNativeCategoryBindingListItem = function(ctx) {
};

// Exit a parse tree produced by MParser#NativeCategoryBindingListItem.
MParserListener.prototype.exitNativeCategoryBindingListItem = function(ctx) {
};


// Enter a parse tree produced by MParser#NativeCategoryBindingList.
MParserListener.prototype.enterNativeCategoryBindingList = function(ctx) {
};

// Exit a parse tree produced by MParser#NativeCategoryBindingList.
MParserListener.prototype.exitNativeCategoryBindingList = function(ctx) {
};


// Enter a parse tree produced by MParser#abstract_method_declaration.
MParserListener.prototype.enterAbstract_method_declaration = function(ctx) {
};

// Exit a parse tree produced by MParser#abstract_method_declaration.
MParserListener.prototype.exitAbstract_method_declaration = function(ctx) {
};


// Enter a parse tree produced by MParser#concrete_method_declaration.
MParserListener.prototype.enterConcrete_method_declaration = function(ctx) {
};

// Exit a parse tree produced by MParser#concrete_method_declaration.
MParserListener.prototype.exitConcrete_method_declaration = function(ctx) {
};


// Enter a parse tree produced by MParser#native_method_declaration.
MParserListener.prototype.enterNative_method_declaration = function(ctx) {
};

// Exit a parse tree produced by MParser#native_method_declaration.
MParserListener.prototype.exitNative_method_declaration = function(ctx) {
};


// Enter a parse tree produced by MParser#test_method_declaration.
MParserListener.prototype.enterTest_method_declaration = function(ctx) {
};

// Exit a parse tree produced by MParser#test_method_declaration.
MParserListener.prototype.exitTest_method_declaration = function(ctx) {
};


// Enter a parse tree produced by MParser#assertion.
MParserListener.prototype.enterAssertion = function(ctx) {
};

// Exit a parse tree produced by MParser#assertion.
MParserListener.prototype.exitAssertion = function(ctx) {
};


// Enter a parse tree produced by MParser#typed_argument.
MParserListener.prototype.enterTyped_argument = function(ctx) {
};

// Exit a parse tree produced by MParser#typed_argument.
MParserListener.prototype.exitTyped_argument = function(ctx) {
};


// Enter a parse tree produced by MParser#MethodCallStatement.
MParserListener.prototype.enterMethodCallStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#MethodCallStatement.
MParserListener.prototype.exitMethodCallStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#AssignInstanceStatement.
MParserListener.prototype.enterAssignInstanceStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#AssignInstanceStatement.
MParserListener.prototype.exitAssignInstanceStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#AssignTupleStatement.
MParserListener.prototype.enterAssignTupleStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#AssignTupleStatement.
MParserListener.prototype.exitAssignTupleStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#StoreStatement.
MParserListener.prototype.enterStoreStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#StoreStatement.
MParserListener.prototype.exitStoreStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#FlushStatement.
MParserListener.prototype.enterFlushStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#FlushStatement.
MParserListener.prototype.exitFlushStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#BreakStatement.
MParserListener.prototype.enterBreakStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#BreakStatement.
MParserListener.prototype.exitBreakStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#ReturnStatement.
MParserListener.prototype.enterReturnStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#ReturnStatement.
MParserListener.prototype.exitReturnStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#IfStatement.
MParserListener.prototype.enterIfStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#IfStatement.
MParserListener.prototype.exitIfStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#SwitchStatement.
MParserListener.prototype.enterSwitchStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#SwitchStatement.
MParserListener.prototype.exitSwitchStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#ForEachStatement.
MParserListener.prototype.enterForEachStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#ForEachStatement.
MParserListener.prototype.exitForEachStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#WhileStatement.
MParserListener.prototype.enterWhileStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#WhileStatement.
MParserListener.prototype.exitWhileStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#DoWhileStatement.
MParserListener.prototype.enterDoWhileStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#DoWhileStatement.
MParserListener.prototype.exitDoWhileStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#RaiseStatement.
MParserListener.prototype.enterRaiseStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#RaiseStatement.
MParserListener.prototype.exitRaiseStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#TryStatement.
MParserListener.prototype.enterTryStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#TryStatement.
MParserListener.prototype.exitTryStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#WriteStatement.
MParserListener.prototype.enterWriteStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#WriteStatement.
MParserListener.prototype.exitWriteStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#WithResourceStatement.
MParserListener.prototype.enterWithResourceStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#WithResourceStatement.
MParserListener.prototype.exitWithResourceStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#WithSingletonStatement.
MParserListener.prototype.enterWithSingletonStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#WithSingletonStatement.
MParserListener.prototype.exitWithSingletonStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#ClosureStatement.
MParserListener.prototype.enterClosureStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#ClosureStatement.
MParserListener.prototype.exitClosureStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#CommentStatement.
MParserListener.prototype.enterCommentStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#CommentStatement.
MParserListener.prototype.exitCommentStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#flush_statement.
MParserListener.prototype.enterFlush_statement = function(ctx) {
};

// Exit a parse tree produced by MParser#flush_statement.
MParserListener.prototype.exitFlush_statement = function(ctx) {
};


// Enter a parse tree produced by MParser#store_statement.
MParserListener.prototype.enterStore_statement = function(ctx) {
};

// Exit a parse tree produced by MParser#store_statement.
MParserListener.prototype.exitStore_statement = function(ctx) {
};


// Enter a parse tree produced by MParser#method_call.
MParserListener.prototype.enterMethod_call = function(ctx) {
};

// Exit a parse tree produced by MParser#method_call.
MParserListener.prototype.exitMethod_call = function(ctx) {
};


// Enter a parse tree produced by MParser#MethodName.
MParserListener.prototype.enterMethodName = function(ctx) {
};

// Exit a parse tree produced by MParser#MethodName.
MParserListener.prototype.exitMethodName = function(ctx) {
};


// Enter a parse tree produced by MParser#MethodParent.
MParserListener.prototype.enterMethodParent = function(ctx) {
};

// Exit a parse tree produced by MParser#MethodParent.
MParserListener.prototype.exitMethodParent = function(ctx) {
};


// Enter a parse tree produced by MParser#CallableSelector.
MParserListener.prototype.enterCallableSelector = function(ctx) {
};

// Exit a parse tree produced by MParser#CallableSelector.
MParserListener.prototype.exitCallableSelector = function(ctx) {
};


// Enter a parse tree produced by MParser#CallableRoot.
MParserListener.prototype.enterCallableRoot = function(ctx) {
};

// Exit a parse tree produced by MParser#CallableRoot.
MParserListener.prototype.exitCallableRoot = function(ctx) {
};


// Enter a parse tree produced by MParser#CallableMemberSelector.
MParserListener.prototype.enterCallableMemberSelector = function(ctx) {
};

// Exit a parse tree produced by MParser#CallableMemberSelector.
MParserListener.prototype.exitCallableMemberSelector = function(ctx) {
};


// Enter a parse tree produced by MParser#CallableItemSelector.
MParserListener.prototype.enterCallableItemSelector = function(ctx) {
};

// Exit a parse tree produced by MParser#CallableItemSelector.
MParserListener.prototype.exitCallableItemSelector = function(ctx) {
};


// Enter a parse tree produced by MParser#with_resource_statement.
MParserListener.prototype.enterWith_resource_statement = function(ctx) {
};

// Exit a parse tree produced by MParser#with_resource_statement.
MParserListener.prototype.exitWith_resource_statement = function(ctx) {
};


// Enter a parse tree produced by MParser#with_singleton_statement.
MParserListener.prototype.enterWith_singleton_statement = function(ctx) {
};

// Exit a parse tree produced by MParser#with_singleton_statement.
MParserListener.prototype.exitWith_singleton_statement = function(ctx) {
};


// Enter a parse tree produced by MParser#switch_statement.
MParserListener.prototype.enterSwitch_statement = function(ctx) {
};

// Exit a parse tree produced by MParser#switch_statement.
MParserListener.prototype.exitSwitch_statement = function(ctx) {
};


// Enter a parse tree produced by MParser#AtomicSwitchCase.
MParserListener.prototype.enterAtomicSwitchCase = function(ctx) {
};

// Exit a parse tree produced by MParser#AtomicSwitchCase.
MParserListener.prototype.exitAtomicSwitchCase = function(ctx) {
};


// Enter a parse tree produced by MParser#CollectionSwitchCase.
MParserListener.prototype.enterCollectionSwitchCase = function(ctx) {
};

// Exit a parse tree produced by MParser#CollectionSwitchCase.
MParserListener.prototype.exitCollectionSwitchCase = function(ctx) {
};


// Enter a parse tree produced by MParser#for_each_statement.
MParserListener.prototype.enterFor_each_statement = function(ctx) {
};

// Exit a parse tree produced by MParser#for_each_statement.
MParserListener.prototype.exitFor_each_statement = function(ctx) {
};


// Enter a parse tree produced by MParser#do_while_statement.
MParserListener.prototype.enterDo_while_statement = function(ctx) {
};

// Exit a parse tree produced by MParser#do_while_statement.
MParserListener.prototype.exitDo_while_statement = function(ctx) {
};


// Enter a parse tree produced by MParser#while_statement.
MParserListener.prototype.enterWhile_statement = function(ctx) {
};

// Exit a parse tree produced by MParser#while_statement.
MParserListener.prototype.exitWhile_statement = function(ctx) {
};


// Enter a parse tree produced by MParser#if_statement.
MParserListener.prototype.enterIf_statement = function(ctx) {
};

// Exit a parse tree produced by MParser#if_statement.
MParserListener.prototype.exitIf_statement = function(ctx) {
};


// Enter a parse tree produced by MParser#ElseIfStatementList.
MParserListener.prototype.enterElseIfStatementList = function(ctx) {
};

// Exit a parse tree produced by MParser#ElseIfStatementList.
MParserListener.prototype.exitElseIfStatementList = function(ctx) {
};


// Enter a parse tree produced by MParser#ElseIfStatementListItem.
MParserListener.prototype.enterElseIfStatementListItem = function(ctx) {
};

// Exit a parse tree produced by MParser#ElseIfStatementListItem.
MParserListener.prototype.exitElseIfStatementListItem = function(ctx) {
};


// Enter a parse tree produced by MParser#raise_statement.
MParserListener.prototype.enterRaise_statement = function(ctx) {
};

// Exit a parse tree produced by MParser#raise_statement.
MParserListener.prototype.exitRaise_statement = function(ctx) {
};


// Enter a parse tree produced by MParser#try_statement.
MParserListener.prototype.enterTry_statement = function(ctx) {
};

// Exit a parse tree produced by MParser#try_statement.
MParserListener.prototype.exitTry_statement = function(ctx) {
};


// Enter a parse tree produced by MParser#CatchAtomicStatement.
MParserListener.prototype.enterCatchAtomicStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#CatchAtomicStatement.
MParserListener.prototype.exitCatchAtomicStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#CatchCollectionStatement.
MParserListener.prototype.enterCatchCollectionStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#CatchCollectionStatement.
MParserListener.prototype.exitCatchCollectionStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#break_statement.
MParserListener.prototype.enterBreak_statement = function(ctx) {
};

// Exit a parse tree produced by MParser#break_statement.
MParserListener.prototype.exitBreak_statement = function(ctx) {
};


// Enter a parse tree produced by MParser#return_statement.
MParserListener.prototype.enterReturn_statement = function(ctx) {
};

// Exit a parse tree produced by MParser#return_statement.
MParserListener.prototype.exitReturn_statement = function(ctx) {
};


// Enter a parse tree produced by MParser#IntDivideExpression.
MParserListener.prototype.enterIntDivideExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#IntDivideExpression.
MParserListener.prototype.exitIntDivideExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#HasAnyExpression.
MParserListener.prototype.enterHasAnyExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#HasAnyExpression.
MParserListener.prototype.exitHasAnyExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#HasExpression.
MParserListener.prototype.enterHasExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#HasExpression.
MParserListener.prototype.exitHasExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#TernaryExpression.
MParserListener.prototype.enterTernaryExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#TernaryExpression.
MParserListener.prototype.exitTernaryExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#NotEqualsExpression.
MParserListener.prototype.enterNotEqualsExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#NotEqualsExpression.
MParserListener.prototype.exitNotEqualsExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#InExpression.
MParserListener.prototype.enterInExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#InExpression.
MParserListener.prototype.exitInExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#NotExpression.
MParserListener.prototype.enterNotExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#NotExpression.
MParserListener.prototype.exitNotExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#GreaterThanExpression.
MParserListener.prototype.enterGreaterThanExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#GreaterThanExpression.
MParserListener.prototype.exitGreaterThanExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#OrExpression.
MParserListener.prototype.enterOrExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#OrExpression.
MParserListener.prototype.exitOrExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#CodeExpression.
MParserListener.prototype.enterCodeExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#CodeExpression.
MParserListener.prototype.exitCodeExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#LessThanOrEqualExpression.
MParserListener.prototype.enterLessThanOrEqualExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#LessThanOrEqualExpression.
MParserListener.prototype.exitLessThanOrEqualExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#NotHasAnyExpression.
MParserListener.prototype.enterNotHasAnyExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#NotHasAnyExpression.
MParserListener.prototype.exitNotHasAnyExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#AndExpression.
MParserListener.prototype.enterAndExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#AndExpression.
MParserListener.prototype.exitAndExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#NotHasExpression.
MParserListener.prototype.enterNotHasExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#NotHasExpression.
MParserListener.prototype.exitNotHasExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#ClosureExpression.
MParserListener.prototype.enterClosureExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#ClosureExpression.
MParserListener.prototype.exitClosureExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#NotHasAllExpression.
MParserListener.prototype.enterNotHasAllExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#NotHasAllExpression.
MParserListener.prototype.exitNotHasAllExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#ContainsExpression.
MParserListener.prototype.enterContainsExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#ContainsExpression.
MParserListener.prototype.exitContainsExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#FilteredListExpression.
MParserListener.prototype.enterFilteredListExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#FilteredListExpression.
MParserListener.prototype.exitFilteredListExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#NotContainsExpression.
MParserListener.prototype.enterNotContainsExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#NotContainsExpression.
MParserListener.prototype.exitNotContainsExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#MultiplyExpression.
MParserListener.prototype.enterMultiplyExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#MultiplyExpression.
MParserListener.prototype.exitMultiplyExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#RoughlyEqualsExpression.
MParserListener.prototype.enterRoughlyEqualsExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#RoughlyEqualsExpression.
MParserListener.prototype.exitRoughlyEqualsExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#ExecuteExpression.
MParserListener.prototype.enterExecuteExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#ExecuteExpression.
MParserListener.prototype.exitExecuteExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#MethodExpression.
MParserListener.prototype.enterMethodExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#MethodExpression.
MParserListener.prototype.exitMethodExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#GreaterThanOrEqualExpression.
MParserListener.prototype.enterGreaterThanOrEqualExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#GreaterThanOrEqualExpression.
MParserListener.prototype.exitGreaterThanOrEqualExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#NotInExpression.
MParserListener.prototype.enterNotInExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#NotInExpression.
MParserListener.prototype.exitNotInExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#IteratorExpression.
MParserListener.prototype.enterIteratorExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#IteratorExpression.
MParserListener.prototype.exitIteratorExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#IsNotExpression.
MParserListener.prototype.enterIsNotExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#IsNotExpression.
MParserListener.prototype.exitIsNotExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#DivideExpression.
MParserListener.prototype.enterDivideExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#DivideExpression.
MParserListener.prototype.exitDivideExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#IsExpression.
MParserListener.prototype.enterIsExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#IsExpression.
MParserListener.prototype.exitIsExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#MinusExpression.
MParserListener.prototype.enterMinusExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#MinusExpression.
MParserListener.prototype.exitMinusExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#AddExpression.
MParserListener.prototype.enterAddExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#AddExpression.
MParserListener.prototype.exitAddExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#HasAllExpression.
MParserListener.prototype.enterHasAllExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#HasAllExpression.
MParserListener.prototype.exitHasAllExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#InstanceExpression.
MParserListener.prototype.enterInstanceExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#InstanceExpression.
MParserListener.prototype.exitInstanceExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#CastExpression.
MParserListener.prototype.enterCastExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#CastExpression.
MParserListener.prototype.exitCastExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#ModuloExpression.
MParserListener.prototype.enterModuloExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#ModuloExpression.
MParserListener.prototype.exitModuloExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#LessThanExpression.
MParserListener.prototype.enterLessThanExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#LessThanExpression.
MParserListener.prototype.exitLessThanExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#EqualsExpression.
MParserListener.prototype.enterEqualsExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#EqualsExpression.
MParserListener.prototype.exitEqualsExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#closure_expression.
MParserListener.prototype.enterClosure_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#closure_expression.
MParserListener.prototype.exitClosure_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#SelectorExpression.
MParserListener.prototype.enterSelectorExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#SelectorExpression.
MParserListener.prototype.exitSelectorExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#SelectableExpression.
MParserListener.prototype.enterSelectableExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#SelectableExpression.
MParserListener.prototype.exitSelectableExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#method_expression.
MParserListener.prototype.enterMethod_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#method_expression.
MParserListener.prototype.exitMethod_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#MemberSelector.
MParserListener.prototype.enterMemberSelector = function(ctx) {
};

// Exit a parse tree produced by MParser#MemberSelector.
MParserListener.prototype.exitMemberSelector = function(ctx) {
};


// Enter a parse tree produced by MParser#SliceSelector.
MParserListener.prototype.enterSliceSelector = function(ctx) {
};

// Exit a parse tree produced by MParser#SliceSelector.
MParserListener.prototype.exitSliceSelector = function(ctx) {
};


// Enter a parse tree produced by MParser#ItemSelector.
MParserListener.prototype.enterItemSelector = function(ctx) {
};

// Exit a parse tree produced by MParser#ItemSelector.
MParserListener.prototype.exitItemSelector = function(ctx) {
};


// Enter a parse tree produced by MParser#blob_expression.
MParserListener.prototype.enterBlob_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#blob_expression.
MParserListener.prototype.exitBlob_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#document_expression.
MParserListener.prototype.enterDocument_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#document_expression.
MParserListener.prototype.exitDocument_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#ConstructorFrom.
MParserListener.prototype.enterConstructorFrom = function(ctx) {
};

// Exit a parse tree produced by MParser#ConstructorFrom.
MParserListener.prototype.exitConstructorFrom = function(ctx) {
};


// Enter a parse tree produced by MParser#ConstructorNoFrom.
MParserListener.prototype.enterConstructorNoFrom = function(ctx) {
};

// Exit a parse tree produced by MParser#ConstructorNoFrom.
MParserListener.prototype.exitConstructorNoFrom = function(ctx) {
};


// Enter a parse tree produced by MParser#copy_from.
MParserListener.prototype.enterCopy_from = function(ctx) {
};

// Exit a parse tree produced by MParser#copy_from.
MParserListener.prototype.exitCopy_from = function(ctx) {
};


// Enter a parse tree produced by MParser#ExpressionAssignmentList.
MParserListener.prototype.enterExpressionAssignmentList = function(ctx) {
};

// Exit a parse tree produced by MParser#ExpressionAssignmentList.
MParserListener.prototype.exitExpressionAssignmentList = function(ctx) {
};


// Enter a parse tree produced by MParser#ArgumentAssignmentList.
MParserListener.prototype.enterArgumentAssignmentList = function(ctx) {
};

// Exit a parse tree produced by MParser#ArgumentAssignmentList.
MParserListener.prototype.exitArgumentAssignmentList = function(ctx) {
};


// Enter a parse tree produced by MParser#ArgumentAssignmentListItem.
MParserListener.prototype.enterArgumentAssignmentListItem = function(ctx) {
};

// Exit a parse tree produced by MParser#ArgumentAssignmentListItem.
MParserListener.prototype.exitArgumentAssignmentListItem = function(ctx) {
};


// Enter a parse tree produced by MParser#argument_assignment.
MParserListener.prototype.enterArgument_assignment = function(ctx) {
};

// Exit a parse tree produced by MParser#argument_assignment.
MParserListener.prototype.exitArgument_assignment = function(ctx) {
};


// Enter a parse tree produced by MParser#write_statement.
MParserListener.prototype.enterWrite_statement = function(ctx) {
};

// Exit a parse tree produced by MParser#write_statement.
MParserListener.prototype.exitWrite_statement = function(ctx) {
};


// Enter a parse tree produced by MParser#filtered_list_suffix.
MParserListener.prototype.enterFiltered_list_suffix = function(ctx) {
};

// Exit a parse tree produced by MParser#filtered_list_suffix.
MParserListener.prototype.exitFiltered_list_suffix = function(ctx) {
};


// Enter a parse tree produced by MParser#FetchOne.
MParserListener.prototype.enterFetchOne = function(ctx) {
};

// Exit a parse tree produced by MParser#FetchOne.
MParserListener.prototype.exitFetchOne = function(ctx) {
};


// Enter a parse tree produced by MParser#FetchMany.
MParserListener.prototype.enterFetchMany = function(ctx) {
};

// Exit a parse tree produced by MParser#FetchMany.
MParserListener.prototype.exitFetchMany = function(ctx) {
};


// Enter a parse tree produced by MParser#sorted_expression.
MParserListener.prototype.enterSorted_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#sorted_expression.
MParserListener.prototype.exitSorted_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#assign_instance_statement.
MParserListener.prototype.enterAssign_instance_statement = function(ctx) {
};

// Exit a parse tree produced by MParser#assign_instance_statement.
MParserListener.prototype.exitAssign_instance_statement = function(ctx) {
};


// Enter a parse tree produced by MParser#MemberInstance.
MParserListener.prototype.enterMemberInstance = function(ctx) {
};

// Exit a parse tree produced by MParser#MemberInstance.
MParserListener.prototype.exitMemberInstance = function(ctx) {
};


// Enter a parse tree produced by MParser#ItemInstance.
MParserListener.prototype.enterItemInstance = function(ctx) {
};

// Exit a parse tree produced by MParser#ItemInstance.
MParserListener.prototype.exitItemInstance = function(ctx) {
};


// Enter a parse tree produced by MParser#assign_tuple_statement.
MParserListener.prototype.enterAssign_tuple_statement = function(ctx) {
};

// Exit a parse tree produced by MParser#assign_tuple_statement.
MParserListener.prototype.exitAssign_tuple_statement = function(ctx) {
};


// Enter a parse tree produced by MParser#lfs.
MParserListener.prototype.enterLfs = function(ctx) {
};

// Exit a parse tree produced by MParser#lfs.
MParserListener.prototype.exitLfs = function(ctx) {
};


// Enter a parse tree produced by MParser#lfp.
MParserListener.prototype.enterLfp = function(ctx) {
};

// Exit a parse tree produced by MParser#lfp.
MParserListener.prototype.exitLfp = function(ctx) {
};


// Enter a parse tree produced by MParser#indent.
MParserListener.prototype.enterIndent = function(ctx) {
};

// Exit a parse tree produced by MParser#indent.
MParserListener.prototype.exitIndent = function(ctx) {
};


// Enter a parse tree produced by MParser#dedent.
MParserListener.prototype.enterDedent = function(ctx) {
};

// Exit a parse tree produced by MParser#dedent.
MParserListener.prototype.exitDedent = function(ctx) {
};


// Enter a parse tree produced by MParser#null_literal.
MParserListener.prototype.enterNull_literal = function(ctx) {
};

// Exit a parse tree produced by MParser#null_literal.
MParserListener.prototype.exitNull_literal = function(ctx) {
};


// Enter a parse tree produced by MParser#FullDeclarationList.
MParserListener.prototype.enterFullDeclarationList = function(ctx) {
};

// Exit a parse tree produced by MParser#FullDeclarationList.
MParserListener.prototype.exitFullDeclarationList = function(ctx) {
};


// Enter a parse tree produced by MParser#declarations.
MParserListener.prototype.enterDeclarations = function(ctx) {
};

// Exit a parse tree produced by MParser#declarations.
MParserListener.prototype.exitDeclarations = function(ctx) {
};


// Enter a parse tree produced by MParser#declaration.
MParserListener.prototype.enterDeclaration = function(ctx) {
};

// Exit a parse tree produced by MParser#declaration.
MParserListener.prototype.exitDeclaration = function(ctx) {
};


// Enter a parse tree produced by MParser#resource_declaration.
MParserListener.prototype.enterResource_declaration = function(ctx) {
};

// Exit a parse tree produced by MParser#resource_declaration.
MParserListener.prototype.exitResource_declaration = function(ctx) {
};


// Enter a parse tree produced by MParser#enum_declaration.
MParserListener.prototype.enterEnum_declaration = function(ctx) {
};

// Exit a parse tree produced by MParser#enum_declaration.
MParserListener.prototype.exitEnum_declaration = function(ctx) {
};


// Enter a parse tree produced by MParser#native_symbol_list.
MParserListener.prototype.enterNative_symbol_list = function(ctx) {
};

// Exit a parse tree produced by MParser#native_symbol_list.
MParserListener.prototype.exitNative_symbol_list = function(ctx) {
};


// Enter a parse tree produced by MParser#category_symbol_list.
MParserListener.prototype.enterCategory_symbol_list = function(ctx) {
};

// Exit a parse tree produced by MParser#category_symbol_list.
MParserListener.prototype.exitCategory_symbol_list = function(ctx) {
};


// Enter a parse tree produced by MParser#symbol_list.
MParserListener.prototype.enterSymbol_list = function(ctx) {
};

// Exit a parse tree produced by MParser#symbol_list.
MParserListener.prototype.exitSymbol_list = function(ctx) {
};


// Enter a parse tree produced by MParser#MatchingList.
MParserListener.prototype.enterMatchingList = function(ctx) {
};

// Exit a parse tree produced by MParser#MatchingList.
MParserListener.prototype.exitMatchingList = function(ctx) {
};


// Enter a parse tree produced by MParser#MatchingSet.
MParserListener.prototype.enterMatchingSet = function(ctx) {
};

// Exit a parse tree produced by MParser#MatchingSet.
MParserListener.prototype.exitMatchingSet = function(ctx) {
};


// Enter a parse tree produced by MParser#MatchingRange.
MParserListener.prototype.enterMatchingRange = function(ctx) {
};

// Exit a parse tree produced by MParser#MatchingRange.
MParserListener.prototype.exitMatchingRange = function(ctx) {
};


// Enter a parse tree produced by MParser#MatchingPattern.
MParserListener.prototype.enterMatchingPattern = function(ctx) {
};

// Exit a parse tree produced by MParser#MatchingPattern.
MParserListener.prototype.exitMatchingPattern = function(ctx) {
};


// Enter a parse tree produced by MParser#MatchingExpression.
MParserListener.prototype.enterMatchingExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#MatchingExpression.
MParserListener.prototype.exitMatchingExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#list_literal.
MParserListener.prototype.enterList_literal = function(ctx) {
};

// Exit a parse tree produced by MParser#list_literal.
MParserListener.prototype.exitList_literal = function(ctx) {
};


// Enter a parse tree produced by MParser#set_literal.
MParserListener.prototype.enterSet_literal = function(ctx) {
};

// Exit a parse tree produced by MParser#set_literal.
MParserListener.prototype.exitSet_literal = function(ctx) {
};


// Enter a parse tree produced by MParser#expression_list.
MParserListener.prototype.enterExpression_list = function(ctx) {
};

// Exit a parse tree produced by MParser#expression_list.
MParserListener.prototype.exitExpression_list = function(ctx) {
};


// Enter a parse tree produced by MParser#range_literal.
MParserListener.prototype.enterRange_literal = function(ctx) {
};

// Exit a parse tree produced by MParser#range_literal.
MParserListener.prototype.exitRange_literal = function(ctx) {
};


// Enter a parse tree produced by MParser#IteratorType.
MParserListener.prototype.enterIteratorType = function(ctx) {
};

// Exit a parse tree produced by MParser#IteratorType.
MParserListener.prototype.exitIteratorType = function(ctx) {
};


// Enter a parse tree produced by MParser#SetType.
MParserListener.prototype.enterSetType = function(ctx) {
};

// Exit a parse tree produced by MParser#SetType.
MParserListener.prototype.exitSetType = function(ctx) {
};


// Enter a parse tree produced by MParser#ListType.
MParserListener.prototype.enterListType = function(ctx) {
};

// Exit a parse tree produced by MParser#ListType.
MParserListener.prototype.exitListType = function(ctx) {
};


// Enter a parse tree produced by MParser#DictType.
MParserListener.prototype.enterDictType = function(ctx) {
};

// Exit a parse tree produced by MParser#DictType.
MParserListener.prototype.exitDictType = function(ctx) {
};


// Enter a parse tree produced by MParser#CursorType.
MParserListener.prototype.enterCursorType = function(ctx) {
};

// Exit a parse tree produced by MParser#CursorType.
MParserListener.prototype.exitCursorType = function(ctx) {
};


// Enter a parse tree produced by MParser#PrimaryType.
MParserListener.prototype.enterPrimaryType = function(ctx) {
};

// Exit a parse tree produced by MParser#PrimaryType.
MParserListener.prototype.exitPrimaryType = function(ctx) {
};


// Enter a parse tree produced by MParser#NativeType.
MParserListener.prototype.enterNativeType = function(ctx) {
};

// Exit a parse tree produced by MParser#NativeType.
MParserListener.prototype.exitNativeType = function(ctx) {
};


// Enter a parse tree produced by MParser#CategoryType.
MParserListener.prototype.enterCategoryType = function(ctx) {
};

// Exit a parse tree produced by MParser#CategoryType.
MParserListener.prototype.exitCategoryType = function(ctx) {
};


// Enter a parse tree produced by MParser#BooleanType.
MParserListener.prototype.enterBooleanType = function(ctx) {
};

// Exit a parse tree produced by MParser#BooleanType.
MParserListener.prototype.exitBooleanType = function(ctx) {
};


// Enter a parse tree produced by MParser#CharacterType.
MParserListener.prototype.enterCharacterType = function(ctx) {
};

// Exit a parse tree produced by MParser#CharacterType.
MParserListener.prototype.exitCharacterType = function(ctx) {
};


// Enter a parse tree produced by MParser#TextType.
MParserListener.prototype.enterTextType = function(ctx) {
};

// Exit a parse tree produced by MParser#TextType.
MParserListener.prototype.exitTextType = function(ctx) {
};


// Enter a parse tree produced by MParser#ImageType.
MParserListener.prototype.enterImageType = function(ctx) {
};

// Exit a parse tree produced by MParser#ImageType.
MParserListener.prototype.exitImageType = function(ctx) {
};


// Enter a parse tree produced by MParser#IntegerType.
MParserListener.prototype.enterIntegerType = function(ctx) {
};

// Exit a parse tree produced by MParser#IntegerType.
MParserListener.prototype.exitIntegerType = function(ctx) {
};


// Enter a parse tree produced by MParser#DecimalType.
MParserListener.prototype.enterDecimalType = function(ctx) {
};

// Exit a parse tree produced by MParser#DecimalType.
MParserListener.prototype.exitDecimalType = function(ctx) {
};


// Enter a parse tree produced by MParser#DocumentType.
MParserListener.prototype.enterDocumentType = function(ctx) {
};

// Exit a parse tree produced by MParser#DocumentType.
MParserListener.prototype.exitDocumentType = function(ctx) {
};


// Enter a parse tree produced by MParser#DateType.
MParserListener.prototype.enterDateType = function(ctx) {
};

// Exit a parse tree produced by MParser#DateType.
MParserListener.prototype.exitDateType = function(ctx) {
};


// Enter a parse tree produced by MParser#DateTimeType.
MParserListener.prototype.enterDateTimeType = function(ctx) {
};

// Exit a parse tree produced by MParser#DateTimeType.
MParserListener.prototype.exitDateTimeType = function(ctx) {
};


// Enter a parse tree produced by MParser#TimeType.
MParserListener.prototype.enterTimeType = function(ctx) {
};

// Exit a parse tree produced by MParser#TimeType.
MParserListener.prototype.exitTimeType = function(ctx) {
};


// Enter a parse tree produced by MParser#PeriodType.
MParserListener.prototype.enterPeriodType = function(ctx) {
};

// Exit a parse tree produced by MParser#PeriodType.
MParserListener.prototype.exitPeriodType = function(ctx) {
};


// Enter a parse tree produced by MParser#VersionType.
MParserListener.prototype.enterVersionType = function(ctx) {
};

// Exit a parse tree produced by MParser#VersionType.
MParserListener.prototype.exitVersionType = function(ctx) {
};


// Enter a parse tree produced by MParser#CodeType.
MParserListener.prototype.enterCodeType = function(ctx) {
};

// Exit a parse tree produced by MParser#CodeType.
MParserListener.prototype.exitCodeType = function(ctx) {
};


// Enter a parse tree produced by MParser#BlobType.
MParserListener.prototype.enterBlobType = function(ctx) {
};

// Exit a parse tree produced by MParser#BlobType.
MParserListener.prototype.exitBlobType = function(ctx) {
};


// Enter a parse tree produced by MParser#UUIDType.
MParserListener.prototype.enterUUIDType = function(ctx) {
};

// Exit a parse tree produced by MParser#UUIDType.
MParserListener.prototype.exitUUIDType = function(ctx) {
};


// Enter a parse tree produced by MParser#category_type.
MParserListener.prototype.enterCategory_type = function(ctx) {
};

// Exit a parse tree produced by MParser#category_type.
MParserListener.prototype.exitCategory_type = function(ctx) {
};


// Enter a parse tree produced by MParser#mutable_category_type.
MParserListener.prototype.enterMutable_category_type = function(ctx) {
};

// Exit a parse tree produced by MParser#mutable_category_type.
MParserListener.prototype.exitMutable_category_type = function(ctx) {
};


// Enter a parse tree produced by MParser#code_type.
MParserListener.prototype.enterCode_type = function(ctx) {
};

// Exit a parse tree produced by MParser#code_type.
MParserListener.prototype.exitCode_type = function(ctx) {
};


// Enter a parse tree produced by MParser#ConcreteCategoryDeclaration.
MParserListener.prototype.enterConcreteCategoryDeclaration = function(ctx) {
};

// Exit a parse tree produced by MParser#ConcreteCategoryDeclaration.
MParserListener.prototype.exitConcreteCategoryDeclaration = function(ctx) {
};


// Enter a parse tree produced by MParser#NativeCategoryDeclaration.
MParserListener.prototype.enterNativeCategoryDeclaration = function(ctx) {
};

// Exit a parse tree produced by MParser#NativeCategoryDeclaration.
MParserListener.prototype.exitNativeCategoryDeclaration = function(ctx) {
};


// Enter a parse tree produced by MParser#SingletonCategoryDeclaration.
MParserListener.prototype.enterSingletonCategoryDeclaration = function(ctx) {
};

// Exit a parse tree produced by MParser#SingletonCategoryDeclaration.
MParserListener.prototype.exitSingletonCategoryDeclaration = function(ctx) {
};


// Enter a parse tree produced by MParser#type_identifier_list.
MParserListener.prototype.enterType_identifier_list = function(ctx) {
};

// Exit a parse tree produced by MParser#type_identifier_list.
MParserListener.prototype.exitType_identifier_list = function(ctx) {
};


// Enter a parse tree produced by MParser#method_identifier.
MParserListener.prototype.enterMethod_identifier = function(ctx) {
};

// Exit a parse tree produced by MParser#method_identifier.
MParserListener.prototype.exitMethod_identifier = function(ctx) {
};


// Enter a parse tree produced by MParser#VariableIdentifier.
MParserListener.prototype.enterVariableIdentifier = function(ctx) {
};

// Exit a parse tree produced by MParser#VariableIdentifier.
MParserListener.prototype.exitVariableIdentifier = function(ctx) {
};


// Enter a parse tree produced by MParser#TypeIdentifier.
MParserListener.prototype.enterTypeIdentifier = function(ctx) {
};

// Exit a parse tree produced by MParser#TypeIdentifier.
MParserListener.prototype.exitTypeIdentifier = function(ctx) {
};


// Enter a parse tree produced by MParser#SymbolIdentifier.
MParserListener.prototype.enterSymbolIdentifier = function(ctx) {
};

// Exit a parse tree produced by MParser#SymbolIdentifier.
MParserListener.prototype.exitSymbolIdentifier = function(ctx) {
};


// Enter a parse tree produced by MParser#variable_identifier.
MParserListener.prototype.enterVariable_identifier = function(ctx) {
};

// Exit a parse tree produced by MParser#variable_identifier.
MParserListener.prototype.exitVariable_identifier = function(ctx) {
};


// Enter a parse tree produced by MParser#attribute_identifier.
MParserListener.prototype.enterAttribute_identifier = function(ctx) {
};

// Exit a parse tree produced by MParser#attribute_identifier.
MParserListener.prototype.exitAttribute_identifier = function(ctx) {
};


// Enter a parse tree produced by MParser#type_identifier.
MParserListener.prototype.enterType_identifier = function(ctx) {
};

// Exit a parse tree produced by MParser#type_identifier.
MParserListener.prototype.exitType_identifier = function(ctx) {
};


// Enter a parse tree produced by MParser#symbol_identifier.
MParserListener.prototype.enterSymbol_identifier = function(ctx) {
};

// Exit a parse tree produced by MParser#symbol_identifier.
MParserListener.prototype.exitSymbol_identifier = function(ctx) {
};


// Enter a parse tree produced by MParser#argument_list.
MParserListener.prototype.enterArgument_list = function(ctx) {
};

// Exit a parse tree produced by MParser#argument_list.
MParserListener.prototype.exitArgument_list = function(ctx) {
};


// Enter a parse tree produced by MParser#CodeArgument.
MParserListener.prototype.enterCodeArgument = function(ctx) {
};

// Exit a parse tree produced by MParser#CodeArgument.
MParserListener.prototype.exitCodeArgument = function(ctx) {
};


// Enter a parse tree produced by MParser#OperatorArgument.
MParserListener.prototype.enterOperatorArgument = function(ctx) {
};

// Exit a parse tree produced by MParser#OperatorArgument.
MParserListener.prototype.exitOperatorArgument = function(ctx) {
};


// Enter a parse tree produced by MParser#operator_argument.
MParserListener.prototype.enterOperator_argument = function(ctx) {
};

// Exit a parse tree produced by MParser#operator_argument.
MParserListener.prototype.exitOperator_argument = function(ctx) {
};


// Enter a parse tree produced by MParser#named_argument.
MParserListener.prototype.enterNamed_argument = function(ctx) {
};

// Exit a parse tree produced by MParser#named_argument.
MParserListener.prototype.exitNamed_argument = function(ctx) {
};


// Enter a parse tree produced by MParser#code_argument.
MParserListener.prototype.enterCode_argument = function(ctx) {
};

// Exit a parse tree produced by MParser#code_argument.
MParserListener.prototype.exitCode_argument = function(ctx) {
};


// Enter a parse tree produced by MParser#category_or_any_type.
MParserListener.prototype.enterCategory_or_any_type = function(ctx) {
};

// Exit a parse tree produced by MParser#category_or_any_type.
MParserListener.prototype.exitCategory_or_any_type = function(ctx) {
};


// Enter a parse tree produced by MParser#AnyListType.
MParserListener.prototype.enterAnyListType = function(ctx) {
};

// Exit a parse tree produced by MParser#AnyListType.
MParserListener.prototype.exitAnyListType = function(ctx) {
};


// Enter a parse tree produced by MParser#AnyType.
MParserListener.prototype.enterAnyType = function(ctx) {
};

// Exit a parse tree produced by MParser#AnyType.
MParserListener.prototype.exitAnyType = function(ctx) {
};


// Enter a parse tree produced by MParser#AnyDictType.
MParserListener.prototype.enterAnyDictType = function(ctx) {
};

// Exit a parse tree produced by MParser#AnyDictType.
MParserListener.prototype.exitAnyDictType = function(ctx) {
};


// Enter a parse tree produced by MParser#member_method_declaration_list.
MParserListener.prototype.enterMember_method_declaration_list = function(ctx) {
};

// Exit a parse tree produced by MParser#member_method_declaration_list.
MParserListener.prototype.exitMember_method_declaration_list = function(ctx) {
};


// Enter a parse tree produced by MParser#member_method_declaration.
MParserListener.prototype.enterMember_method_declaration = function(ctx) {
};

// Exit a parse tree produced by MParser#member_method_declaration.
MParserListener.prototype.exitMember_method_declaration = function(ctx) {
};


// Enter a parse tree produced by MParser#native_member_method_declaration_list.
MParserListener.prototype.enterNative_member_method_declaration_list = function(ctx) {
};

// Exit a parse tree produced by MParser#native_member_method_declaration_list.
MParserListener.prototype.exitNative_member_method_declaration_list = function(ctx) {
};


// Enter a parse tree produced by MParser#native_member_method_declaration.
MParserListener.prototype.enterNative_member_method_declaration = function(ctx) {
};

// Exit a parse tree produced by MParser#native_member_method_declaration.
MParserListener.prototype.exitNative_member_method_declaration = function(ctx) {
};


// Enter a parse tree produced by MParser#JavaCategoryBinding.
MParserListener.prototype.enterJavaCategoryBinding = function(ctx) {
};

// Exit a parse tree produced by MParser#JavaCategoryBinding.
MParserListener.prototype.exitJavaCategoryBinding = function(ctx) {
};


// Enter a parse tree produced by MParser#CSharpCategoryBinding.
MParserListener.prototype.enterCSharpCategoryBinding = function(ctx) {
};

// Exit a parse tree produced by MParser#CSharpCategoryBinding.
MParserListener.prototype.exitCSharpCategoryBinding = function(ctx) {
};


// Enter a parse tree produced by MParser#Python2CategoryBinding.
MParserListener.prototype.enterPython2CategoryBinding = function(ctx) {
};

// Exit a parse tree produced by MParser#Python2CategoryBinding.
MParserListener.prototype.exitPython2CategoryBinding = function(ctx) {
};


// Enter a parse tree produced by MParser#Python3CategoryBinding.
MParserListener.prototype.enterPython3CategoryBinding = function(ctx) {
};

// Exit a parse tree produced by MParser#Python3CategoryBinding.
MParserListener.prototype.exitPython3CategoryBinding = function(ctx) {
};


// Enter a parse tree produced by MParser#JavaScriptCategoryBinding.
MParserListener.prototype.enterJavaScriptCategoryBinding = function(ctx) {
};

// Exit a parse tree produced by MParser#JavaScriptCategoryBinding.
MParserListener.prototype.exitJavaScriptCategoryBinding = function(ctx) {
};


// Enter a parse tree produced by MParser#python_category_binding.
MParserListener.prototype.enterPython_category_binding = function(ctx) {
};

// Exit a parse tree produced by MParser#python_category_binding.
MParserListener.prototype.exitPython_category_binding = function(ctx) {
};


// Enter a parse tree produced by MParser#python_module.
MParserListener.prototype.enterPython_module = function(ctx) {
};

// Exit a parse tree produced by MParser#python_module.
MParserListener.prototype.exitPython_module = function(ctx) {
};


// Enter a parse tree produced by MParser#javascript_category_binding.
MParserListener.prototype.enterJavascript_category_binding = function(ctx) {
};

// Exit a parse tree produced by MParser#javascript_category_binding.
MParserListener.prototype.exitJavascript_category_binding = function(ctx) {
};


// Enter a parse tree produced by MParser#javascript_module.
MParserListener.prototype.enterJavascript_module = function(ctx) {
};

// Exit a parse tree produced by MParser#javascript_module.
MParserListener.prototype.exitJavascript_module = function(ctx) {
};


// Enter a parse tree produced by MParser#variable_identifier_list.
MParserListener.prototype.enterVariable_identifier_list = function(ctx) {
};

// Exit a parse tree produced by MParser#variable_identifier_list.
MParserListener.prototype.exitVariable_identifier_list = function(ctx) {
};


// Enter a parse tree produced by MParser#attribute_identifier_list.
MParserListener.prototype.enterAttribute_identifier_list = function(ctx) {
};

// Exit a parse tree produced by MParser#attribute_identifier_list.
MParserListener.prototype.exitAttribute_identifier_list = function(ctx) {
};


// Enter a parse tree produced by MParser#method_declaration.
MParserListener.prototype.enterMethod_declaration = function(ctx) {
};

// Exit a parse tree produced by MParser#method_declaration.
MParserListener.prototype.exitMethod_declaration = function(ctx) {
};


// Enter a parse tree produced by MParser#comment_statement.
MParserListener.prototype.enterComment_statement = function(ctx) {
};

// Exit a parse tree produced by MParser#comment_statement.
MParserListener.prototype.exitComment_statement = function(ctx) {
};


// Enter a parse tree produced by MParser#native_statement_list.
MParserListener.prototype.enterNative_statement_list = function(ctx) {
};

// Exit a parse tree produced by MParser#native_statement_list.
MParserListener.prototype.exitNative_statement_list = function(ctx) {
};


// Enter a parse tree produced by MParser#JavaNativeStatement.
MParserListener.prototype.enterJavaNativeStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#JavaNativeStatement.
MParserListener.prototype.exitJavaNativeStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#CSharpNativeStatement.
MParserListener.prototype.enterCSharpNativeStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#CSharpNativeStatement.
MParserListener.prototype.exitCSharpNativeStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#Python2NativeStatement.
MParserListener.prototype.enterPython2NativeStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#Python2NativeStatement.
MParserListener.prototype.exitPython2NativeStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#Python3NativeStatement.
MParserListener.prototype.enterPython3NativeStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#Python3NativeStatement.
MParserListener.prototype.exitPython3NativeStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#JavaScriptNativeStatement.
MParserListener.prototype.enterJavaScriptNativeStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#JavaScriptNativeStatement.
MParserListener.prototype.exitJavaScriptNativeStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#python_native_statement.
MParserListener.prototype.enterPython_native_statement = function(ctx) {
};

// Exit a parse tree produced by MParser#python_native_statement.
MParserListener.prototype.exitPython_native_statement = function(ctx) {
};


// Enter a parse tree produced by MParser#javascript_native_statement.
MParserListener.prototype.enterJavascript_native_statement = function(ctx) {
};

// Exit a parse tree produced by MParser#javascript_native_statement.
MParserListener.prototype.exitJavascript_native_statement = function(ctx) {
};


// Enter a parse tree produced by MParser#statement_list.
MParserListener.prototype.enterStatement_list = function(ctx) {
};

// Exit a parse tree produced by MParser#statement_list.
MParserListener.prototype.exitStatement_list = function(ctx) {
};


// Enter a parse tree produced by MParser#assertion_list.
MParserListener.prototype.enterAssertion_list = function(ctx) {
};

// Exit a parse tree produced by MParser#assertion_list.
MParserListener.prototype.exitAssertion_list = function(ctx) {
};


// Enter a parse tree produced by MParser#switch_case_statement_list.
MParserListener.prototype.enterSwitch_case_statement_list = function(ctx) {
};

// Exit a parse tree produced by MParser#switch_case_statement_list.
MParserListener.prototype.exitSwitch_case_statement_list = function(ctx) {
};


// Enter a parse tree produced by MParser#catch_statement_list.
MParserListener.prototype.enterCatch_statement_list = function(ctx) {
};

// Exit a parse tree produced by MParser#catch_statement_list.
MParserListener.prototype.exitCatch_statement_list = function(ctx) {
};


// Enter a parse tree produced by MParser#LiteralRangeLiteral.
MParserListener.prototype.enterLiteralRangeLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#LiteralRangeLiteral.
MParserListener.prototype.exitLiteralRangeLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#LiteralListLiteral.
MParserListener.prototype.enterLiteralListLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#LiteralListLiteral.
MParserListener.prototype.exitLiteralListLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#LiteralSetLiteral.
MParserListener.prototype.enterLiteralSetLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#LiteralSetLiteral.
MParserListener.prototype.exitLiteralSetLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#MinIntegerLiteral.
MParserListener.prototype.enterMinIntegerLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#MinIntegerLiteral.
MParserListener.prototype.exitMinIntegerLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#MaxIntegerLiteral.
MParserListener.prototype.enterMaxIntegerLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#MaxIntegerLiteral.
MParserListener.prototype.exitMaxIntegerLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#IntegerLiteral.
MParserListener.prototype.enterIntegerLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#IntegerLiteral.
MParserListener.prototype.exitIntegerLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#HexadecimalLiteral.
MParserListener.prototype.enterHexadecimalLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#HexadecimalLiteral.
MParserListener.prototype.exitHexadecimalLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#CharacterLiteral.
MParserListener.prototype.enterCharacterLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#CharacterLiteral.
MParserListener.prototype.exitCharacterLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#DateLiteral.
MParserListener.prototype.enterDateLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#DateLiteral.
MParserListener.prototype.exitDateLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#TimeLiteral.
MParserListener.prototype.enterTimeLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#TimeLiteral.
MParserListener.prototype.exitTimeLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#TextLiteral.
MParserListener.prototype.enterTextLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#TextLiteral.
MParserListener.prototype.exitTextLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#DecimalLiteral.
MParserListener.prototype.enterDecimalLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#DecimalLiteral.
MParserListener.prototype.exitDecimalLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#DateTimeLiteral.
MParserListener.prototype.enterDateTimeLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#DateTimeLiteral.
MParserListener.prototype.exitDateTimeLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#BooleanLiteral.
MParserListener.prototype.enterBooleanLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#BooleanLiteral.
MParserListener.prototype.exitBooleanLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#PeriodLiteral.
MParserListener.prototype.enterPeriodLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#PeriodLiteral.
MParserListener.prototype.exitPeriodLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#VersionLiteral.
MParserListener.prototype.enterVersionLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#VersionLiteral.
MParserListener.prototype.exitVersionLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#UUIDLiteral.
MParserListener.prototype.enterUUIDLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#UUIDLiteral.
MParserListener.prototype.exitUUIDLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#NullLiteral.
MParserListener.prototype.enterNullLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#NullLiteral.
MParserListener.prototype.exitNullLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#literal_list_literal.
MParserListener.prototype.enterLiteral_list_literal = function(ctx) {
};

// Exit a parse tree produced by MParser#literal_list_literal.
MParserListener.prototype.exitLiteral_list_literal = function(ctx) {
};


// Enter a parse tree produced by MParser#ParenthesisExpression.
MParserListener.prototype.enterParenthesisExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#ParenthesisExpression.
MParserListener.prototype.exitParenthesisExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#LiteralExpression.
MParserListener.prototype.enterLiteralExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#LiteralExpression.
MParserListener.prototype.exitLiteralExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#IdentifierExpression.
MParserListener.prototype.enterIdentifierExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#IdentifierExpression.
MParserListener.prototype.exitIdentifierExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#ThisExpression.
MParserListener.prototype.enterThisExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#ThisExpression.
MParserListener.prototype.exitThisExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#this_expression.
MParserListener.prototype.enterThis_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#this_expression.
MParserListener.prototype.exitThis_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#parenthesis_expression.
MParserListener.prototype.enterParenthesis_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#parenthesis_expression.
MParserListener.prototype.exitParenthesis_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#literal_expression.
MParserListener.prototype.enterLiteral_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#literal_expression.
MParserListener.prototype.exitLiteral_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#collection_literal.
MParserListener.prototype.enterCollection_literal = function(ctx) {
};

// Exit a parse tree produced by MParser#collection_literal.
MParserListener.prototype.exitCollection_literal = function(ctx) {
};


// Enter a parse tree produced by MParser#tuple_literal.
MParserListener.prototype.enterTuple_literal = function(ctx) {
};

// Exit a parse tree produced by MParser#tuple_literal.
MParserListener.prototype.exitTuple_literal = function(ctx) {
};


// Enter a parse tree produced by MParser#dict_literal.
MParserListener.prototype.enterDict_literal = function(ctx) {
};

// Exit a parse tree produced by MParser#dict_literal.
MParserListener.prototype.exitDict_literal = function(ctx) {
};


// Enter a parse tree produced by MParser#expression_tuple.
MParserListener.prototype.enterExpression_tuple = function(ctx) {
};

// Exit a parse tree produced by MParser#expression_tuple.
MParserListener.prototype.exitExpression_tuple = function(ctx) {
};


// Enter a parse tree produced by MParser#dict_entry_list.
MParserListener.prototype.enterDict_entry_list = function(ctx) {
};

// Exit a parse tree produced by MParser#dict_entry_list.
MParserListener.prototype.exitDict_entry_list = function(ctx) {
};


// Enter a parse tree produced by MParser#dict_entry.
MParserListener.prototype.enterDict_entry = function(ctx) {
};

// Exit a parse tree produced by MParser#dict_entry.
MParserListener.prototype.exitDict_entry = function(ctx) {
};


// Enter a parse tree produced by MParser#SliceFirstAndLast.
MParserListener.prototype.enterSliceFirstAndLast = function(ctx) {
};

// Exit a parse tree produced by MParser#SliceFirstAndLast.
MParserListener.prototype.exitSliceFirstAndLast = function(ctx) {
};


// Enter a parse tree produced by MParser#SliceFirstOnly.
MParserListener.prototype.enterSliceFirstOnly = function(ctx) {
};

// Exit a parse tree produced by MParser#SliceFirstOnly.
MParserListener.prototype.exitSliceFirstOnly = function(ctx) {
};


// Enter a parse tree produced by MParser#SliceLastOnly.
MParserListener.prototype.enterSliceLastOnly = function(ctx) {
};

// Exit a parse tree produced by MParser#SliceLastOnly.
MParserListener.prototype.exitSliceLastOnly = function(ctx) {
};


// Enter a parse tree produced by MParser#assign_variable_statement.
MParserListener.prototype.enterAssign_variable_statement = function(ctx) {
};

// Exit a parse tree produced by MParser#assign_variable_statement.
MParserListener.prototype.exitAssign_variable_statement = function(ctx) {
};


// Enter a parse tree produced by MParser#ChildInstance.
MParserListener.prototype.enterChildInstance = function(ctx) {
};

// Exit a parse tree produced by MParser#ChildInstance.
MParserListener.prototype.exitChildInstance = function(ctx) {
};


// Enter a parse tree produced by MParser#RootInstance.
MParserListener.prototype.enterRootInstance = function(ctx) {
};

// Exit a parse tree produced by MParser#RootInstance.
MParserListener.prototype.exitRootInstance = function(ctx) {
};


// Enter a parse tree produced by MParser#IsATypeExpression.
MParserListener.prototype.enterIsATypeExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#IsATypeExpression.
MParserListener.prototype.exitIsATypeExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#IsOtherExpression.
MParserListener.prototype.enterIsOtherExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#IsOtherExpression.
MParserListener.prototype.exitIsOtherExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#read_all_expression.
MParserListener.prototype.enterRead_all_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#read_all_expression.
MParserListener.prototype.exitRead_all_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#read_one_expression.
MParserListener.prototype.enterRead_one_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#read_one_expression.
MParserListener.prototype.exitRead_one_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#order_by_list.
MParserListener.prototype.enterOrder_by_list = function(ctx) {
};

// Exit a parse tree produced by MParser#order_by_list.
MParserListener.prototype.exitOrder_by_list = function(ctx) {
};


// Enter a parse tree produced by MParser#order_by.
MParserListener.prototype.enterOrder_by = function(ctx) {
};

// Exit a parse tree produced by MParser#order_by.
MParserListener.prototype.exitOrder_by = function(ctx) {
};


// Enter a parse tree produced by MParser#OperatorPlus.
MParserListener.prototype.enterOperatorPlus = function(ctx) {
};

// Exit a parse tree produced by MParser#OperatorPlus.
MParserListener.prototype.exitOperatorPlus = function(ctx) {
};


// Enter a parse tree produced by MParser#OperatorMinus.
MParserListener.prototype.enterOperatorMinus = function(ctx) {
};

// Exit a parse tree produced by MParser#OperatorMinus.
MParserListener.prototype.exitOperatorMinus = function(ctx) {
};


// Enter a parse tree produced by MParser#OperatorMultiply.
MParserListener.prototype.enterOperatorMultiply = function(ctx) {
};

// Exit a parse tree produced by MParser#OperatorMultiply.
MParserListener.prototype.exitOperatorMultiply = function(ctx) {
};


// Enter a parse tree produced by MParser#OperatorDivide.
MParserListener.prototype.enterOperatorDivide = function(ctx) {
};

// Exit a parse tree produced by MParser#OperatorDivide.
MParserListener.prototype.exitOperatorDivide = function(ctx) {
};


// Enter a parse tree produced by MParser#OperatorIDivide.
MParserListener.prototype.enterOperatorIDivide = function(ctx) {
};

// Exit a parse tree produced by MParser#OperatorIDivide.
MParserListener.prototype.exitOperatorIDivide = function(ctx) {
};


// Enter a parse tree produced by MParser#OperatorModulo.
MParserListener.prototype.enterOperatorModulo = function(ctx) {
};

// Exit a parse tree produced by MParser#OperatorModulo.
MParserListener.prototype.exitOperatorModulo = function(ctx) {
};


// Enter a parse tree produced by MParser#new_token.
MParserListener.prototype.enterNew_token = function(ctx) {
};

// Exit a parse tree produced by MParser#new_token.
MParserListener.prototype.exitNew_token = function(ctx) {
};


// Enter a parse tree produced by MParser#key_token.
MParserListener.prototype.enterKey_token = function(ctx) {
};

// Exit a parse tree produced by MParser#key_token.
MParserListener.prototype.exitKey_token = function(ctx) {
};


// Enter a parse tree produced by MParser#module_token.
MParserListener.prototype.enterModule_token = function(ctx) {
};

// Exit a parse tree produced by MParser#module_token.
MParserListener.prototype.exitModule_token = function(ctx) {
};


// Enter a parse tree produced by MParser#value_token.
MParserListener.prototype.enterValue_token = function(ctx) {
};

// Exit a parse tree produced by MParser#value_token.
MParserListener.prototype.exitValue_token = function(ctx) {
};


// Enter a parse tree produced by MParser#symbols_token.
MParserListener.prototype.enterSymbols_token = function(ctx) {
};

// Exit a parse tree produced by MParser#symbols_token.
MParserListener.prototype.exitSymbols_token = function(ctx) {
};


// Enter a parse tree produced by MParser#assign.
MParserListener.prototype.enterAssign = function(ctx) {
};

// Exit a parse tree produced by MParser#assign.
MParserListener.prototype.exitAssign = function(ctx) {
};


// Enter a parse tree produced by MParser#multiply.
MParserListener.prototype.enterMultiply = function(ctx) {
};

// Exit a parse tree produced by MParser#multiply.
MParserListener.prototype.exitMultiply = function(ctx) {
};


// Enter a parse tree produced by MParser#divide.
MParserListener.prototype.enterDivide = function(ctx) {
};

// Exit a parse tree produced by MParser#divide.
MParserListener.prototype.exitDivide = function(ctx) {
};


// Enter a parse tree produced by MParser#idivide.
MParserListener.prototype.enterIdivide = function(ctx) {
};

// Exit a parse tree produced by MParser#idivide.
MParserListener.prototype.exitIdivide = function(ctx) {
};


// Enter a parse tree produced by MParser#modulo.
MParserListener.prototype.enterModulo = function(ctx) {
};

// Exit a parse tree produced by MParser#modulo.
MParserListener.prototype.exitModulo = function(ctx) {
};


// Enter a parse tree produced by MParser#JavascriptReturnStatement.
MParserListener.prototype.enterJavascriptReturnStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#JavascriptReturnStatement.
MParserListener.prototype.exitJavascriptReturnStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#JavascriptStatement.
MParserListener.prototype.enterJavascriptStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#JavascriptStatement.
MParserListener.prototype.exitJavascriptStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#JavascriptSelectorExpression.
MParserListener.prototype.enterJavascriptSelectorExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#JavascriptSelectorExpression.
MParserListener.prototype.exitJavascriptSelectorExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#JavascriptPrimaryExpression.
MParserListener.prototype.enterJavascriptPrimaryExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#JavascriptPrimaryExpression.
MParserListener.prototype.exitJavascriptPrimaryExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#javascript_primary_expression.
MParserListener.prototype.enterJavascript_primary_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#javascript_primary_expression.
MParserListener.prototype.exitJavascript_primary_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#javascript_this_expression.
MParserListener.prototype.enterJavascript_this_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#javascript_this_expression.
MParserListener.prototype.exitJavascript_this_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#javascript_new_expression.
MParserListener.prototype.enterJavascript_new_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#javascript_new_expression.
MParserListener.prototype.exitJavascript_new_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#JavaScriptMethodExpression.
MParserListener.prototype.enterJavaScriptMethodExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#JavaScriptMethodExpression.
MParserListener.prototype.exitJavaScriptMethodExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#JavaScriptMemberExpression.
MParserListener.prototype.enterJavaScriptMemberExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#JavaScriptMemberExpression.
MParserListener.prototype.exitJavaScriptMemberExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#JavaScriptItemExpression.
MParserListener.prototype.enterJavaScriptItemExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#JavaScriptItemExpression.
MParserListener.prototype.exitJavaScriptItemExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#javascript_method_expression.
MParserListener.prototype.enterJavascript_method_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#javascript_method_expression.
MParserListener.prototype.exitJavascript_method_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#JavascriptArgumentList.
MParserListener.prototype.enterJavascriptArgumentList = function(ctx) {
};

// Exit a parse tree produced by MParser#JavascriptArgumentList.
MParserListener.prototype.exitJavascriptArgumentList = function(ctx) {
};


// Enter a parse tree produced by MParser#JavascriptArgumentListItem.
MParserListener.prototype.enterJavascriptArgumentListItem = function(ctx) {
};

// Exit a parse tree produced by MParser#JavascriptArgumentListItem.
MParserListener.prototype.exitJavascriptArgumentListItem = function(ctx) {
};


// Enter a parse tree produced by MParser#javascript_item_expression.
MParserListener.prototype.enterJavascript_item_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#javascript_item_expression.
MParserListener.prototype.exitJavascript_item_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#javascript_parenthesis_expression.
MParserListener.prototype.enterJavascript_parenthesis_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#javascript_parenthesis_expression.
MParserListener.prototype.exitJavascript_parenthesis_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#javascript_identifier_expression.
MParserListener.prototype.enterJavascript_identifier_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#javascript_identifier_expression.
MParserListener.prototype.exitJavascript_identifier_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#JavascriptIntegerLiteral.
MParserListener.prototype.enterJavascriptIntegerLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#JavascriptIntegerLiteral.
MParserListener.prototype.exitJavascriptIntegerLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#JavascriptDecimalLiteral.
MParserListener.prototype.enterJavascriptDecimalLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#JavascriptDecimalLiteral.
MParserListener.prototype.exitJavascriptDecimalLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#JavascriptTextLiteral.
MParserListener.prototype.enterJavascriptTextLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#JavascriptTextLiteral.
MParserListener.prototype.exitJavascriptTextLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#JavascriptBooleanLiteral.
MParserListener.prototype.enterJavascriptBooleanLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#JavascriptBooleanLiteral.
MParserListener.prototype.exitJavascriptBooleanLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#JavascriptCharacterLiteral.
MParserListener.prototype.enterJavascriptCharacterLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#JavascriptCharacterLiteral.
MParserListener.prototype.exitJavascriptCharacterLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#javascript_identifier.
MParserListener.prototype.enterJavascript_identifier = function(ctx) {
};

// Exit a parse tree produced by MParser#javascript_identifier.
MParserListener.prototype.exitJavascript_identifier = function(ctx) {
};


// Enter a parse tree produced by MParser#PythonReturnStatement.
MParserListener.prototype.enterPythonReturnStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#PythonReturnStatement.
MParserListener.prototype.exitPythonReturnStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#PythonStatement.
MParserListener.prototype.enterPythonStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#PythonStatement.
MParserListener.prototype.exitPythonStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#PythonSelectorExpression.
MParserListener.prototype.enterPythonSelectorExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#PythonSelectorExpression.
MParserListener.prototype.exitPythonSelectorExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#PythonPrimaryExpression.
MParserListener.prototype.enterPythonPrimaryExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#PythonPrimaryExpression.
MParserListener.prototype.exitPythonPrimaryExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#PythonSelfExpression.
MParserListener.prototype.enterPythonSelfExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#PythonSelfExpression.
MParserListener.prototype.exitPythonSelfExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#PythonParenthesisExpression.
MParserListener.prototype.enterPythonParenthesisExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#PythonParenthesisExpression.
MParserListener.prototype.exitPythonParenthesisExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#PythonIdentifierExpression.
MParserListener.prototype.enterPythonIdentifierExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#PythonIdentifierExpression.
MParserListener.prototype.exitPythonIdentifierExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#PythonLiteralExpression.
MParserListener.prototype.enterPythonLiteralExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#PythonLiteralExpression.
MParserListener.prototype.exitPythonLiteralExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#PythonGlobalMethodExpression.
MParserListener.prototype.enterPythonGlobalMethodExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#PythonGlobalMethodExpression.
MParserListener.prototype.exitPythonGlobalMethodExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#python_self_expression.
MParserListener.prototype.enterPython_self_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#python_self_expression.
MParserListener.prototype.exitPython_self_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#PythonMethodExpression.
MParserListener.prototype.enterPythonMethodExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#PythonMethodExpression.
MParserListener.prototype.exitPythonMethodExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#PythonItemExpression.
MParserListener.prototype.enterPythonItemExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#PythonItemExpression.
MParserListener.prototype.exitPythonItemExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#python_method_expression.
MParserListener.prototype.enterPython_method_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#python_method_expression.
MParserListener.prototype.exitPython_method_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#PythonOrdinalOnlyArgumentList.
MParserListener.prototype.enterPythonOrdinalOnlyArgumentList = function(ctx) {
};

// Exit a parse tree produced by MParser#PythonOrdinalOnlyArgumentList.
MParserListener.prototype.exitPythonOrdinalOnlyArgumentList = function(ctx) {
};


// Enter a parse tree produced by MParser#PythonNamedOnlyArgumentList.
MParserListener.prototype.enterPythonNamedOnlyArgumentList = function(ctx) {
};

// Exit a parse tree produced by MParser#PythonNamedOnlyArgumentList.
MParserListener.prototype.exitPythonNamedOnlyArgumentList = function(ctx) {
};


// Enter a parse tree produced by MParser#PythonArgumentList.
MParserListener.prototype.enterPythonArgumentList = function(ctx) {
};

// Exit a parse tree produced by MParser#PythonArgumentList.
MParserListener.prototype.exitPythonArgumentList = function(ctx) {
};


// Enter a parse tree produced by MParser#PythonOrdinalArgumentList.
MParserListener.prototype.enterPythonOrdinalArgumentList = function(ctx) {
};

// Exit a parse tree produced by MParser#PythonOrdinalArgumentList.
MParserListener.prototype.exitPythonOrdinalArgumentList = function(ctx) {
};


// Enter a parse tree produced by MParser#PythonOrdinalArgumentListItem.
MParserListener.prototype.enterPythonOrdinalArgumentListItem = function(ctx) {
};

// Exit a parse tree produced by MParser#PythonOrdinalArgumentListItem.
MParserListener.prototype.exitPythonOrdinalArgumentListItem = function(ctx) {
};


// Enter a parse tree produced by MParser#PythonNamedArgumentList.
MParserListener.prototype.enterPythonNamedArgumentList = function(ctx) {
};

// Exit a parse tree produced by MParser#PythonNamedArgumentList.
MParserListener.prototype.exitPythonNamedArgumentList = function(ctx) {
};


// Enter a parse tree produced by MParser#PythonNamedArgumentListItem.
MParserListener.prototype.enterPythonNamedArgumentListItem = function(ctx) {
};

// Exit a parse tree produced by MParser#PythonNamedArgumentListItem.
MParserListener.prototype.exitPythonNamedArgumentListItem = function(ctx) {
};


// Enter a parse tree produced by MParser#python_parenthesis_expression.
MParserListener.prototype.enterPython_parenthesis_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#python_parenthesis_expression.
MParserListener.prototype.exitPython_parenthesis_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#PythonChildIdentifier.
MParserListener.prototype.enterPythonChildIdentifier = function(ctx) {
};

// Exit a parse tree produced by MParser#PythonChildIdentifier.
MParserListener.prototype.exitPythonChildIdentifier = function(ctx) {
};


// Enter a parse tree produced by MParser#PythonPromptoIdentifier.
MParserListener.prototype.enterPythonPromptoIdentifier = function(ctx) {
};

// Exit a parse tree produced by MParser#PythonPromptoIdentifier.
MParserListener.prototype.exitPythonPromptoIdentifier = function(ctx) {
};


// Enter a parse tree produced by MParser#PythonIdentifier.
MParserListener.prototype.enterPythonIdentifier = function(ctx) {
};

// Exit a parse tree produced by MParser#PythonIdentifier.
MParserListener.prototype.exitPythonIdentifier = function(ctx) {
};


// Enter a parse tree produced by MParser#PythonIntegerLiteral.
MParserListener.prototype.enterPythonIntegerLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#PythonIntegerLiteral.
MParserListener.prototype.exitPythonIntegerLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#PythonDecimalLiteral.
MParserListener.prototype.enterPythonDecimalLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#PythonDecimalLiteral.
MParserListener.prototype.exitPythonDecimalLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#PythonTextLiteral.
MParserListener.prototype.enterPythonTextLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#PythonTextLiteral.
MParserListener.prototype.exitPythonTextLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#PythonBooleanLiteral.
MParserListener.prototype.enterPythonBooleanLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#PythonBooleanLiteral.
MParserListener.prototype.exitPythonBooleanLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#PythonCharacterLiteral.
MParserListener.prototype.enterPythonCharacterLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#PythonCharacterLiteral.
MParserListener.prototype.exitPythonCharacterLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#python_identifier.
MParserListener.prototype.enterPython_identifier = function(ctx) {
};

// Exit a parse tree produced by MParser#python_identifier.
MParserListener.prototype.exitPython_identifier = function(ctx) {
};


// Enter a parse tree produced by MParser#JavaReturnStatement.
MParserListener.prototype.enterJavaReturnStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#JavaReturnStatement.
MParserListener.prototype.exitJavaReturnStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#JavaStatement.
MParserListener.prototype.enterJavaStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#JavaStatement.
MParserListener.prototype.exitJavaStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#JavaSelectorExpression.
MParserListener.prototype.enterJavaSelectorExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#JavaSelectorExpression.
MParserListener.prototype.exitJavaSelectorExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#JavaPrimaryExpression.
MParserListener.prototype.enterJavaPrimaryExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#JavaPrimaryExpression.
MParserListener.prototype.exitJavaPrimaryExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#java_primary_expression.
MParserListener.prototype.enterJava_primary_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#java_primary_expression.
MParserListener.prototype.exitJava_primary_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#java_this_expression.
MParserListener.prototype.enterJava_this_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#java_this_expression.
MParserListener.prototype.exitJava_this_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#java_new_expression.
MParserListener.prototype.enterJava_new_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#java_new_expression.
MParserListener.prototype.exitJava_new_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#JavaMethodExpression.
MParserListener.prototype.enterJavaMethodExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#JavaMethodExpression.
MParserListener.prototype.exitJavaMethodExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#JavaItemExpression.
MParserListener.prototype.enterJavaItemExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#JavaItemExpression.
MParserListener.prototype.exitJavaItemExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#java_method_expression.
MParserListener.prototype.enterJava_method_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#java_method_expression.
MParserListener.prototype.exitJava_method_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#JavaArgumentListItem.
MParserListener.prototype.enterJavaArgumentListItem = function(ctx) {
};

// Exit a parse tree produced by MParser#JavaArgumentListItem.
MParserListener.prototype.exitJavaArgumentListItem = function(ctx) {
};


// Enter a parse tree produced by MParser#JavaArgumentList.
MParserListener.prototype.enterJavaArgumentList = function(ctx) {
};

// Exit a parse tree produced by MParser#JavaArgumentList.
MParserListener.prototype.exitJavaArgumentList = function(ctx) {
};


// Enter a parse tree produced by MParser#java_item_expression.
MParserListener.prototype.enterJava_item_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#java_item_expression.
MParserListener.prototype.exitJava_item_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#java_parenthesis_expression.
MParserListener.prototype.enterJava_parenthesis_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#java_parenthesis_expression.
MParserListener.prototype.exitJava_parenthesis_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#JavaIdentifier.
MParserListener.prototype.enterJavaIdentifier = function(ctx) {
};

// Exit a parse tree produced by MParser#JavaIdentifier.
MParserListener.prototype.exitJavaIdentifier = function(ctx) {
};


// Enter a parse tree produced by MParser#JavaChildIdentifier.
MParserListener.prototype.enterJavaChildIdentifier = function(ctx) {
};

// Exit a parse tree produced by MParser#JavaChildIdentifier.
MParserListener.prototype.exitJavaChildIdentifier = function(ctx) {
};


// Enter a parse tree produced by MParser#JavaClassIdentifier.
MParserListener.prototype.enterJavaClassIdentifier = function(ctx) {
};

// Exit a parse tree produced by MParser#JavaClassIdentifier.
MParserListener.prototype.exitJavaClassIdentifier = function(ctx) {
};


// Enter a parse tree produced by MParser#JavaChildClassIdentifier.
MParserListener.prototype.enterJavaChildClassIdentifier = function(ctx) {
};

// Exit a parse tree produced by MParser#JavaChildClassIdentifier.
MParserListener.prototype.exitJavaChildClassIdentifier = function(ctx) {
};


// Enter a parse tree produced by MParser#JavaIntegerLiteral.
MParserListener.prototype.enterJavaIntegerLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#JavaIntegerLiteral.
MParserListener.prototype.exitJavaIntegerLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#JavaDecimalLiteral.
MParserListener.prototype.enterJavaDecimalLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#JavaDecimalLiteral.
MParserListener.prototype.exitJavaDecimalLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#JavaTextLiteral.
MParserListener.prototype.enterJavaTextLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#JavaTextLiteral.
MParserListener.prototype.exitJavaTextLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#JavaBooleanLiteral.
MParserListener.prototype.enterJavaBooleanLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#JavaBooleanLiteral.
MParserListener.prototype.exitJavaBooleanLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#JavaCharacterLiteral.
MParserListener.prototype.enterJavaCharacterLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#JavaCharacterLiteral.
MParserListener.prototype.exitJavaCharacterLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#java_identifier.
MParserListener.prototype.enterJava_identifier = function(ctx) {
};

// Exit a parse tree produced by MParser#java_identifier.
MParserListener.prototype.exitJava_identifier = function(ctx) {
};


// Enter a parse tree produced by MParser#CSharpReturnStatement.
MParserListener.prototype.enterCSharpReturnStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#CSharpReturnStatement.
MParserListener.prototype.exitCSharpReturnStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#CSharpStatement.
MParserListener.prototype.enterCSharpStatement = function(ctx) {
};

// Exit a parse tree produced by MParser#CSharpStatement.
MParserListener.prototype.exitCSharpStatement = function(ctx) {
};


// Enter a parse tree produced by MParser#CSharpSelectorExpression.
MParserListener.prototype.enterCSharpSelectorExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#CSharpSelectorExpression.
MParserListener.prototype.exitCSharpSelectorExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#CSharpPrimaryExpression.
MParserListener.prototype.enterCSharpPrimaryExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#CSharpPrimaryExpression.
MParserListener.prototype.exitCSharpPrimaryExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#csharp_primary_expression.
MParserListener.prototype.enterCsharp_primary_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#csharp_primary_expression.
MParserListener.prototype.exitCsharp_primary_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#csharp_this_expression.
MParserListener.prototype.enterCsharp_this_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#csharp_this_expression.
MParserListener.prototype.exitCsharp_this_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#csharp_new_expression.
MParserListener.prototype.enterCsharp_new_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#csharp_new_expression.
MParserListener.prototype.exitCsharp_new_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#CSharpMethodExpression.
MParserListener.prototype.enterCSharpMethodExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#CSharpMethodExpression.
MParserListener.prototype.exitCSharpMethodExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#CSharpItemExpression.
MParserListener.prototype.enterCSharpItemExpression = function(ctx) {
};

// Exit a parse tree produced by MParser#CSharpItemExpression.
MParserListener.prototype.exitCSharpItemExpression = function(ctx) {
};


// Enter a parse tree produced by MParser#csharp_method_expression.
MParserListener.prototype.enterCsharp_method_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#csharp_method_expression.
MParserListener.prototype.exitCsharp_method_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#CSharpArgumentList.
MParserListener.prototype.enterCSharpArgumentList = function(ctx) {
};

// Exit a parse tree produced by MParser#CSharpArgumentList.
MParserListener.prototype.exitCSharpArgumentList = function(ctx) {
};


// Enter a parse tree produced by MParser#CSharpArgumentListItem.
MParserListener.prototype.enterCSharpArgumentListItem = function(ctx) {
};

// Exit a parse tree produced by MParser#CSharpArgumentListItem.
MParserListener.prototype.exitCSharpArgumentListItem = function(ctx) {
};


// Enter a parse tree produced by MParser#csharp_item_expression.
MParserListener.prototype.enterCsharp_item_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#csharp_item_expression.
MParserListener.prototype.exitCsharp_item_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#csharp_parenthesis_expression.
MParserListener.prototype.enterCsharp_parenthesis_expression = function(ctx) {
};

// Exit a parse tree produced by MParser#csharp_parenthesis_expression.
MParserListener.prototype.exitCsharp_parenthesis_expression = function(ctx) {
};


// Enter a parse tree produced by MParser#CSharpIdentifier.
MParserListener.prototype.enterCSharpIdentifier = function(ctx) {
};

// Exit a parse tree produced by MParser#CSharpIdentifier.
MParserListener.prototype.exitCSharpIdentifier = function(ctx) {
};


// Enter a parse tree produced by MParser#CSharpChildIdentifier.
MParserListener.prototype.enterCSharpChildIdentifier = function(ctx) {
};

// Exit a parse tree produced by MParser#CSharpChildIdentifier.
MParserListener.prototype.exitCSharpChildIdentifier = function(ctx) {
};


// Enter a parse tree produced by MParser#CSharpPromptoIdentifier.
MParserListener.prototype.enterCSharpPromptoIdentifier = function(ctx) {
};

// Exit a parse tree produced by MParser#CSharpPromptoIdentifier.
MParserListener.prototype.exitCSharpPromptoIdentifier = function(ctx) {
};


// Enter a parse tree produced by MParser#CSharpIntegerLiteral.
MParserListener.prototype.enterCSharpIntegerLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#CSharpIntegerLiteral.
MParserListener.prototype.exitCSharpIntegerLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#CSharpDecimalLiteral.
MParserListener.prototype.enterCSharpDecimalLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#CSharpDecimalLiteral.
MParserListener.prototype.exitCSharpDecimalLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#CSharpTextLiteral.
MParserListener.prototype.enterCSharpTextLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#CSharpTextLiteral.
MParserListener.prototype.exitCSharpTextLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#CSharpBooleanLiteral.
MParserListener.prototype.enterCSharpBooleanLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#CSharpBooleanLiteral.
MParserListener.prototype.exitCSharpBooleanLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#CSharpCharacterLiteral.
MParserListener.prototype.enterCSharpCharacterLiteral = function(ctx) {
};

// Exit a parse tree produced by MParser#CSharpCharacterLiteral.
MParserListener.prototype.exitCSharpCharacterLiteral = function(ctx) {
};


// Enter a parse tree produced by MParser#csharp_identifier.
MParserListener.prototype.enterCsharp_identifier = function(ctx) {
};

// Exit a parse tree produced by MParser#csharp_identifier.
MParserListener.prototype.exitCsharp_identifier = function(ctx) {
};



exports.MParserListener = MParserListener;