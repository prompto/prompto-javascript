// Generated from OParser.g4 by ANTLR 4.7.1
// jshint ignore: start
import antlr4 from 'antlr4';

// This class defines a complete listener for a parse tree produced by OParser.
function OParserListener() {
	antlr4.tree.ParseTreeListener.call(this);
	return this;
}

OParserListener.prototype = Object.create(antlr4.tree.ParseTreeListener.prototype);
OParserListener.prototype.constructor = OParserListener;

// Enter a parse tree produced by OParser#enum_category_declaration.
OParserListener.prototype.enterEnum_category_declaration = ctx => {
};

// Exit a parse tree produced by OParser#enum_category_declaration.
OParserListener.prototype.exitEnum_category_declaration = ctx => {
};


// Enter a parse tree produced by OParser#enum_native_declaration.
OParserListener.prototype.enterEnum_native_declaration = ctx => {
};

// Exit a parse tree produced by OParser#enum_native_declaration.
OParserListener.prototype.exitEnum_native_declaration = ctx => {
};


// Enter a parse tree produced by OParser#category_symbol.
OParserListener.prototype.enterCategory_symbol = ctx => {
};

// Exit a parse tree produced by OParser#category_symbol.
OParserListener.prototype.exitCategory_symbol = ctx => {
};


// Enter a parse tree produced by OParser#native_symbol.
OParserListener.prototype.enterNative_symbol = ctx => {
};

// Exit a parse tree produced by OParser#native_symbol.
OParserListener.prototype.exitNative_symbol = ctx => {
};


// Enter a parse tree produced by OParser#attribute_declaration.
OParserListener.prototype.enterAttribute_declaration = ctx => {
};

// Exit a parse tree produced by OParser#attribute_declaration.
OParserListener.prototype.exitAttribute_declaration = ctx => {
};


// Enter a parse tree produced by OParser#concrete_widget_declaration.
OParserListener.prototype.enterConcrete_widget_declaration = ctx => {
};

// Exit a parse tree produced by OParser#concrete_widget_declaration.
OParserListener.prototype.exitConcrete_widget_declaration = ctx => {
};


// Enter a parse tree produced by OParser#native_widget_declaration.
OParserListener.prototype.enterNative_widget_declaration = ctx => {
};

// Exit a parse tree produced by OParser#native_widget_declaration.
OParserListener.prototype.exitNative_widget_declaration = ctx => {
};


// Enter a parse tree produced by OParser#concrete_category_declaration.
OParserListener.prototype.enterConcrete_category_declaration = ctx => {
};

// Exit a parse tree produced by OParser#concrete_category_declaration.
OParserListener.prototype.exitConcrete_category_declaration = ctx => {
};


// Enter a parse tree produced by OParser#singleton_category_declaration.
OParserListener.prototype.enterSingleton_category_declaration = ctx => {
};

// Exit a parse tree produced by OParser#singleton_category_declaration.
OParserListener.prototype.exitSingleton_category_declaration = ctx => {
};


// Enter a parse tree produced by OParser#DerivedListItem.
OParserListener.prototype.enterDerivedListItem = ctx => {
};

// Exit a parse tree produced by OParser#DerivedListItem.
OParserListener.prototype.exitDerivedListItem = ctx => {
};


// Enter a parse tree produced by OParser#DerivedList.
OParserListener.prototype.enterDerivedList = ctx => {
};

// Exit a parse tree produced by OParser#DerivedList.
OParserListener.prototype.exitDerivedList = ctx => {
};


// Enter a parse tree produced by OParser#EmptyCategoryMethodList.
OParserListener.prototype.enterEmptyCategoryMethodList = ctx => {
};

// Exit a parse tree produced by OParser#EmptyCategoryMethodList.
OParserListener.prototype.exitEmptyCategoryMethodList = ctx => {
};


// Enter a parse tree produced by OParser#CurlyCategoryMethodList.
OParserListener.prototype.enterCurlyCategoryMethodList = ctx => {
};

// Exit a parse tree produced by OParser#CurlyCategoryMethodList.
OParserListener.prototype.exitCurlyCategoryMethodList = ctx => {
};


// Enter a parse tree produced by OParser#operator_method_declaration.
OParserListener.prototype.enterOperator_method_declaration = ctx => {
};

// Exit a parse tree produced by OParser#operator_method_declaration.
OParserListener.prototype.exitOperator_method_declaration = ctx => {
};


// Enter a parse tree produced by OParser#setter_method_declaration.
OParserListener.prototype.enterSetter_method_declaration = ctx => {
};

// Exit a parse tree produced by OParser#setter_method_declaration.
OParserListener.prototype.exitSetter_method_declaration = ctx => {
};


// Enter a parse tree produced by OParser#native_setter_declaration.
OParserListener.prototype.enterNative_setter_declaration = ctx => {
};

// Exit a parse tree produced by OParser#native_setter_declaration.
OParserListener.prototype.exitNative_setter_declaration = ctx => {
};


// Enter a parse tree produced by OParser#getter_method_declaration.
OParserListener.prototype.enterGetter_method_declaration = ctx => {
};

// Exit a parse tree produced by OParser#getter_method_declaration.
OParserListener.prototype.exitGetter_method_declaration = ctx => {
};


// Enter a parse tree produced by OParser#native_getter_declaration.
OParserListener.prototype.enterNative_getter_declaration = ctx => {
};

// Exit a parse tree produced by OParser#native_getter_declaration.
OParserListener.prototype.exitNative_getter_declaration = ctx => {
};


// Enter a parse tree produced by OParser#native_resource_declaration.
OParserListener.prototype.enterNative_resource_declaration = ctx => {
};

// Exit a parse tree produced by OParser#native_resource_declaration.
OParserListener.prototype.exitNative_resource_declaration = ctx => {
};


// Enter a parse tree produced by OParser#native_category_declaration.
OParserListener.prototype.enterNative_category_declaration = ctx => {
};

// Exit a parse tree produced by OParser#native_category_declaration.
OParserListener.prototype.exitNative_category_declaration = ctx => {
};


// Enter a parse tree produced by OParser#native_category_bindings.
OParserListener.prototype.enterNative_category_bindings = ctx => {
};

// Exit a parse tree produced by OParser#native_category_bindings.
OParserListener.prototype.exitNative_category_bindings = ctx => {
};


// Enter a parse tree produced by OParser#NativeCategoryBindingListItem.
OParserListener.prototype.enterNativeCategoryBindingListItem = ctx => {
};

// Exit a parse tree produced by OParser#NativeCategoryBindingListItem.
OParserListener.prototype.exitNativeCategoryBindingListItem = ctx => {
};


// Enter a parse tree produced by OParser#NativeCategoryBindingList.
OParserListener.prototype.enterNativeCategoryBindingList = ctx => {
};

// Exit a parse tree produced by OParser#NativeCategoryBindingList.
OParserListener.prototype.exitNativeCategoryBindingList = ctx => {
};


// Enter a parse tree produced by OParser#abstract_method_declaration.
OParserListener.prototype.enterAbstract_method_declaration = ctx => {
};

// Exit a parse tree produced by OParser#abstract_method_declaration.
OParserListener.prototype.exitAbstract_method_declaration = ctx => {
};


// Enter a parse tree produced by OParser#concrete_method_declaration.
OParserListener.prototype.enterConcrete_method_declaration = ctx => {
};

// Exit a parse tree produced by OParser#concrete_method_declaration.
OParserListener.prototype.exitConcrete_method_declaration = ctx => {
};


// Enter a parse tree produced by OParser#native_method_declaration.
OParserListener.prototype.enterNative_method_declaration = ctx => {
};

// Exit a parse tree produced by OParser#native_method_declaration.
OParserListener.prototype.exitNative_method_declaration = ctx => {
};


// Enter a parse tree produced by OParser#test_method_declaration.
OParserListener.prototype.enterTest_method_declaration = ctx => {
};

// Exit a parse tree produced by OParser#test_method_declaration.
OParserListener.prototype.exitTest_method_declaration = ctx => {
};


// Enter a parse tree produced by OParser#assertion.
OParserListener.prototype.enterAssertion = ctx => {
};

// Exit a parse tree produced by OParser#assertion.
OParserListener.prototype.exitAssertion = ctx => {
};


// Enter a parse tree produced by OParser#typed_argument.
OParserListener.prototype.enterTyped_argument = ctx => {
};

// Exit a parse tree produced by OParser#typed_argument.
OParserListener.prototype.exitTyped_argument = ctx => {
};


// Enter a parse tree produced by OParser#SingleStatement.
OParserListener.prototype.enterSingleStatement = ctx => {
};

// Exit a parse tree produced by OParser#SingleStatement.
OParserListener.prototype.exitSingleStatement = ctx => {
};


// Enter a parse tree produced by OParser#CurlyStatementList.
OParserListener.prototype.enterCurlyStatementList = ctx => {
};

// Exit a parse tree produced by OParser#CurlyStatementList.
OParserListener.prototype.exitCurlyStatementList = ctx => {
};


// Enter a parse tree produced by OParser#MethodCallStatement.
OParserListener.prototype.enterMethodCallStatement = ctx => {
};

// Exit a parse tree produced by OParser#MethodCallStatement.
OParserListener.prototype.exitMethodCallStatement = ctx => {
};


// Enter a parse tree produced by OParser#AssignInstanceStatement.
OParserListener.prototype.enterAssignInstanceStatement = ctx => {
};

// Exit a parse tree produced by OParser#AssignInstanceStatement.
OParserListener.prototype.exitAssignInstanceStatement = ctx => {
};


// Enter a parse tree produced by OParser#AssignTupleStatement.
OParserListener.prototype.enterAssignTupleStatement = ctx => {
};

// Exit a parse tree produced by OParser#AssignTupleStatement.
OParserListener.prototype.exitAssignTupleStatement = ctx => {
};


// Enter a parse tree produced by OParser#StoreStatement.
OParserListener.prototype.enterStoreStatement = ctx => {
};

// Exit a parse tree produced by OParser#StoreStatement.
OParserListener.prototype.exitStoreStatement = ctx => {
};


// Enter a parse tree produced by OParser#FetchStatement.
OParserListener.prototype.enterFetchStatement = ctx => {
};

// Exit a parse tree produced by OParser#FetchStatement.
OParserListener.prototype.exitFetchStatement = ctx => {
};


// Enter a parse tree produced by OParser#ReadStatement.
OParserListener.prototype.enterReadStatement = ctx => {
};

// Exit a parse tree produced by OParser#ReadStatement.
OParserListener.prototype.exitReadStatement = ctx => {
};


// Enter a parse tree produced by OParser#FlushStatement.
OParserListener.prototype.enterFlushStatement = ctx => {
};

// Exit a parse tree produced by OParser#FlushStatement.
OParserListener.prototype.exitFlushStatement = ctx => {
};


// Enter a parse tree produced by OParser#BreakStatement.
OParserListener.prototype.enterBreakStatement = ctx => {
};

// Exit a parse tree produced by OParser#BreakStatement.
OParserListener.prototype.exitBreakStatement = ctx => {
};


// Enter a parse tree produced by OParser#ReturnStatement.
OParserListener.prototype.enterReturnStatement = ctx => {
};

// Exit a parse tree produced by OParser#ReturnStatement.
OParserListener.prototype.exitReturnStatement = ctx => {
};


// Enter a parse tree produced by OParser#IfStatement.
OParserListener.prototype.enterIfStatement = ctx => {
};

// Exit a parse tree produced by OParser#IfStatement.
OParserListener.prototype.exitIfStatement = ctx => {
};


// Enter a parse tree produced by OParser#SwitchStatement.
OParserListener.prototype.enterSwitchStatement = ctx => {
};

// Exit a parse tree produced by OParser#SwitchStatement.
OParserListener.prototype.exitSwitchStatement = ctx => {
};


// Enter a parse tree produced by OParser#ForEachStatement.
OParserListener.prototype.enterForEachStatement = ctx => {
};

// Exit a parse tree produced by OParser#ForEachStatement.
OParserListener.prototype.exitForEachStatement = ctx => {
};


// Enter a parse tree produced by OParser#WhileStatement.
OParserListener.prototype.enterWhileStatement = ctx => {
};

// Exit a parse tree produced by OParser#WhileStatement.
OParserListener.prototype.exitWhileStatement = ctx => {
};


// Enter a parse tree produced by OParser#DoWhileStatement.
OParserListener.prototype.enterDoWhileStatement = ctx => {
};

// Exit a parse tree produced by OParser#DoWhileStatement.
OParserListener.prototype.exitDoWhileStatement = ctx => {
};


// Enter a parse tree produced by OParser#TryStatement.
OParserListener.prototype.enterTryStatement = ctx => {
};

// Exit a parse tree produced by OParser#TryStatement.
OParserListener.prototype.exitTryStatement = ctx => {
};


// Enter a parse tree produced by OParser#RaiseStatement.
OParserListener.prototype.enterRaiseStatement = ctx => {
};

// Exit a parse tree produced by OParser#RaiseStatement.
OParserListener.prototype.exitRaiseStatement = ctx => {
};


// Enter a parse tree produced by OParser#WriteStatement.
OParserListener.prototype.enterWriteStatement = ctx => {
};

// Exit a parse tree produced by OParser#WriteStatement.
OParserListener.prototype.exitWriteStatement = ctx => {
};


// Enter a parse tree produced by OParser#WithResourceStatement.
OParserListener.prototype.enterWithResourceStatement = ctx => {
};

// Exit a parse tree produced by OParser#WithResourceStatement.
OParserListener.prototype.exitWithResourceStatement = ctx => {
};


// Enter a parse tree produced by OParser#WithSingletonStatement.
OParserListener.prototype.enterWithSingletonStatement = ctx => {
};

// Exit a parse tree produced by OParser#WithSingletonStatement.
OParserListener.prototype.exitWithSingletonStatement = ctx => {
};


// Enter a parse tree produced by OParser#ClosureStatement.
OParserListener.prototype.enterClosureStatement = ctx => {
};

// Exit a parse tree produced by OParser#ClosureStatement.
OParserListener.prototype.exitClosureStatement = ctx => {
};


// Enter a parse tree produced by OParser#CommentStatement.
OParserListener.prototype.enterCommentStatement = ctx => {
};

// Exit a parse tree produced by OParser#CommentStatement.
OParserListener.prototype.exitCommentStatement = ctx => {
};


// Enter a parse tree produced by OParser#flush_statement.
OParserListener.prototype.enterFlush_statement = ctx => {
};

// Exit a parse tree produced by OParser#flush_statement.
OParserListener.prototype.exitFlush_statement = ctx => {
};


// Enter a parse tree produced by OParser#store_statement.
OParserListener.prototype.enterStore_statement = ctx => {
};

// Exit a parse tree produced by OParser#store_statement.
OParserListener.prototype.exitStore_statement = ctx => {
};


// Enter a parse tree produced by OParser#with_resource_statement.
OParserListener.prototype.enterWith_resource_statement = ctx => {
};

// Exit a parse tree produced by OParser#with_resource_statement.
OParserListener.prototype.exitWith_resource_statement = ctx => {
};


// Enter a parse tree produced by OParser#with_singleton_statement.
OParserListener.prototype.enterWith_singleton_statement = ctx => {
};

// Exit a parse tree produced by OParser#with_singleton_statement.
OParserListener.prototype.exitWith_singleton_statement = ctx => {
};


// Enter a parse tree produced by OParser#switch_statement.
OParserListener.prototype.enterSwitch_statement = ctx => {
};

// Exit a parse tree produced by OParser#switch_statement.
OParserListener.prototype.exitSwitch_statement = ctx => {
};


// Enter a parse tree produced by OParser#AtomicSwitchCase.
OParserListener.prototype.enterAtomicSwitchCase = ctx => {
};

// Exit a parse tree produced by OParser#AtomicSwitchCase.
OParserListener.prototype.exitAtomicSwitchCase = ctx => {
};


// Enter a parse tree produced by OParser#CollectionSwitchCase.
OParserListener.prototype.enterCollectionSwitchCase = ctx => {
};

// Exit a parse tree produced by OParser#CollectionSwitchCase.
OParserListener.prototype.exitCollectionSwitchCase = ctx => {
};


// Enter a parse tree produced by OParser#for_each_statement.
OParserListener.prototype.enterFor_each_statement = ctx => {
};

// Exit a parse tree produced by OParser#for_each_statement.
OParserListener.prototype.exitFor_each_statement = ctx => {
};


// Enter a parse tree produced by OParser#do_while_statement.
OParserListener.prototype.enterDo_while_statement = ctx => {
};

// Exit a parse tree produced by OParser#do_while_statement.
OParserListener.prototype.exitDo_while_statement = ctx => {
};


// Enter a parse tree produced by OParser#while_statement.
OParserListener.prototype.enterWhile_statement = ctx => {
};

// Exit a parse tree produced by OParser#while_statement.
OParserListener.prototype.exitWhile_statement = ctx => {
};


// Enter a parse tree produced by OParser#if_statement.
OParserListener.prototype.enterIf_statement = ctx => {
};

// Exit a parse tree produced by OParser#if_statement.
OParserListener.prototype.exitIf_statement = ctx => {
};


// Enter a parse tree produced by OParser#ElseIfStatementList.
OParserListener.prototype.enterElseIfStatementList = ctx => {
};

// Exit a parse tree produced by OParser#ElseIfStatementList.
OParserListener.prototype.exitElseIfStatementList = ctx => {
};


// Enter a parse tree produced by OParser#ElseIfStatementListItem.
OParserListener.prototype.enterElseIfStatementListItem = ctx => {
};

// Exit a parse tree produced by OParser#ElseIfStatementListItem.
OParserListener.prototype.exitElseIfStatementListItem = ctx => {
};


// Enter a parse tree produced by OParser#raise_statement.
OParserListener.prototype.enterRaise_statement = ctx => {
};

// Exit a parse tree produced by OParser#raise_statement.
OParserListener.prototype.exitRaise_statement = ctx => {
};


// Enter a parse tree produced by OParser#try_statement.
OParserListener.prototype.enterTry_statement = ctx => {
};

// Exit a parse tree produced by OParser#try_statement.
OParserListener.prototype.exitTry_statement = ctx => {
};


// Enter a parse tree produced by OParser#CatchAtomicStatement.
OParserListener.prototype.enterCatchAtomicStatement = ctx => {
};

// Exit a parse tree produced by OParser#CatchAtomicStatement.
OParserListener.prototype.exitCatchAtomicStatement = ctx => {
};


// Enter a parse tree produced by OParser#CatchCollectionStatement.
OParserListener.prototype.enterCatchCollectionStatement = ctx => {
};

// Exit a parse tree produced by OParser#CatchCollectionStatement.
OParserListener.prototype.exitCatchCollectionStatement = ctx => {
};


// Enter a parse tree produced by OParser#break_statement.
OParserListener.prototype.enterBreak_statement = ctx => {
};

// Exit a parse tree produced by OParser#break_statement.
OParserListener.prototype.exitBreak_statement = ctx => {
};


// Enter a parse tree produced by OParser#return_statement.
OParserListener.prototype.enterReturn_statement = ctx => {
};

// Exit a parse tree produced by OParser#return_statement.
OParserListener.prototype.exitReturn_statement = ctx => {
};


// Enter a parse tree produced by OParser#method_call_expression.
OParserListener.prototype.enterMethod_call_expression = ctx => {
};

// Exit a parse tree produced by OParser#method_call_expression.
OParserListener.prototype.exitMethod_call_expression = ctx => {
};


// Enter a parse tree produced by OParser#method_call_statement.
OParserListener.prototype.enterMethod_call_statement = ctx => {
};

// Exit a parse tree produced by OParser#method_call_statement.
OParserListener.prototype.exitMethod_call_statement = ctx => {
};


// Enter a parse tree produced by OParser#x_expression.
OParserListener.prototype.enterX_expression = ctx => {
};

// Exit a parse tree produced by OParser#x_expression.
OParserListener.prototype.exitX_expression = ctx => {
};


// Enter a parse tree produced by OParser#IntDivideExpression.
OParserListener.prototype.enterIntDivideExpression = ctx => {
};

// Exit a parse tree produced by OParser#IntDivideExpression.
OParserListener.prototype.exitIntDivideExpression = ctx => {
};


// Enter a parse tree produced by OParser#HasAnyExpression.
OParserListener.prototype.enterHasAnyExpression = ctx => {
};

// Exit a parse tree produced by OParser#HasAnyExpression.
OParserListener.prototype.exitHasAnyExpression = ctx => {
};


// Enter a parse tree produced by OParser#HasExpression.
OParserListener.prototype.enterHasExpression = ctx => {
};

// Exit a parse tree produced by OParser#HasExpression.
OParserListener.prototype.exitHasExpression = ctx => {
};


// Enter a parse tree produced by OParser#TernaryExpression.
OParserListener.prototype.enterTernaryExpression = ctx => {
};

// Exit a parse tree produced by OParser#TernaryExpression.
OParserListener.prototype.exitTernaryExpression = ctx => {
};


// Enter a parse tree produced by OParser#NotEqualsExpression.
OParserListener.prototype.enterNotEqualsExpression = ctx => {
};

// Exit a parse tree produced by OParser#NotEqualsExpression.
OParserListener.prototype.exitNotEqualsExpression = ctx => {
};


// Enter a parse tree produced by OParser#InExpression.
OParserListener.prototype.enterInExpression = ctx => {
};

// Exit a parse tree produced by OParser#InExpression.
OParserListener.prototype.exitInExpression = ctx => {
};


// Enter a parse tree produced by OParser#IsAnExpression.
OParserListener.prototype.enterIsAnExpression = ctx => {
};

// Exit a parse tree produced by OParser#IsAnExpression.
OParserListener.prototype.exitIsAnExpression = ctx => {
};


// Enter a parse tree produced by OParser#JsxExpression.
OParserListener.prototype.enterJsxExpression = ctx => {
};

// Exit a parse tree produced by OParser#JsxExpression.
OParserListener.prototype.exitJsxExpression = ctx => {
};


// Enter a parse tree produced by OParser#NotExpression.
OParserListener.prototype.enterNotExpression = ctx => {
};

// Exit a parse tree produced by OParser#NotExpression.
OParserListener.prototype.exitNotExpression = ctx => {
};


// Enter a parse tree produced by OParser#GreaterThanExpression.
OParserListener.prototype.enterGreaterThanExpression = ctx => {
};

// Exit a parse tree produced by OParser#GreaterThanExpression.
OParserListener.prototype.exitGreaterThanExpression = ctx => {
};


// Enter a parse tree produced by OParser#OrExpression.
OParserListener.prototype.enterOrExpression = ctx => {
};

// Exit a parse tree produced by OParser#OrExpression.
OParserListener.prototype.exitOrExpression = ctx => {
};


// Enter a parse tree produced by OParser#CodeExpression.
OParserListener.prototype.enterCodeExpression = ctx => {
};

// Exit a parse tree produced by OParser#CodeExpression.
OParserListener.prototype.exitCodeExpression = ctx => {
};


// Enter a parse tree produced by OParser#LessThanOrEqualExpression.
OParserListener.prototype.enterLessThanOrEqualExpression = ctx => {
};

// Exit a parse tree produced by OParser#LessThanOrEqualExpression.
OParserListener.prototype.exitLessThanOrEqualExpression = ctx => {
};


// Enter a parse tree produced by OParser#NotHasAnyExpression.
OParserListener.prototype.enterNotHasAnyExpression = ctx => {
};

// Exit a parse tree produced by OParser#NotHasAnyExpression.
OParserListener.prototype.exitNotHasAnyExpression = ctx => {
};


// Enter a parse tree produced by OParser#AndExpression.
OParserListener.prototype.enterAndExpression = ctx => {
};

// Exit a parse tree produced by OParser#AndExpression.
OParserListener.prototype.exitAndExpression = ctx => {
};


// Enter a parse tree produced by OParser#ArrowExpression.
OParserListener.prototype.enterArrowExpression = ctx => {
};

// Exit a parse tree produced by OParser#ArrowExpression.
OParserListener.prototype.exitArrowExpression = ctx => {
};


// Enter a parse tree produced by OParser#NotHasExpression.
OParserListener.prototype.enterNotHasExpression = ctx => {
};

// Exit a parse tree produced by OParser#NotHasExpression.
OParserListener.prototype.exitNotHasExpression = ctx => {
};


// Enter a parse tree produced by OParser#ClosureExpression.
OParserListener.prototype.enterClosureExpression = ctx => {
};

// Exit a parse tree produced by OParser#ClosureExpression.
OParserListener.prototype.exitClosureExpression = ctx => {
};


// Enter a parse tree produced by OParser#NotHasAllExpression.
OParserListener.prototype.enterNotHasAllExpression = ctx => {
};

// Exit a parse tree produced by OParser#NotHasAllExpression.
OParserListener.prototype.exitNotHasAllExpression = ctx => {
};


// Enter a parse tree produced by OParser#ContainsExpression.
OParserListener.prototype.enterContainsExpression = ctx => {
};

// Exit a parse tree produced by OParser#ContainsExpression.
OParserListener.prototype.exitContainsExpression = ctx => {
};


// Enter a parse tree produced by OParser#NotContainsExpression.
OParserListener.prototype.enterNotContainsExpression = ctx => {
};

// Exit a parse tree produced by OParser#NotContainsExpression.
OParserListener.prototype.exitNotContainsExpression = ctx => {
};


// Enter a parse tree produced by OParser#MultiplyExpression.
OParserListener.prototype.enterMultiplyExpression = ctx => {
};

// Exit a parse tree produced by OParser#MultiplyExpression.
OParserListener.prototype.exitMultiplyExpression = ctx => {
};


// Enter a parse tree produced by OParser#RoughlyEqualsExpression.
OParserListener.prototype.enterRoughlyEqualsExpression = ctx => {
};

// Exit a parse tree produced by OParser#RoughlyEqualsExpression.
OParserListener.prototype.exitRoughlyEqualsExpression = ctx => {
};


// Enter a parse tree produced by OParser#IsNotAnExpression.
OParserListener.prototype.enterIsNotAnExpression = ctx => {
};

// Exit a parse tree produced by OParser#IsNotAnExpression.
OParserListener.prototype.exitIsNotAnExpression = ctx => {
};


// Enter a parse tree produced by OParser#ExecuteExpression.
OParserListener.prototype.enterExecuteExpression = ctx => {
};

// Exit a parse tree produced by OParser#ExecuteExpression.
OParserListener.prototype.exitExecuteExpression = ctx => {
};


// Enter a parse tree produced by OParser#GreaterThanOrEqualExpression.
OParserListener.prototype.enterGreaterThanOrEqualExpression = ctx => {
};

// Exit a parse tree produced by OParser#GreaterThanOrEqualExpression.
OParserListener.prototype.exitGreaterThanOrEqualExpression = ctx => {
};


// Enter a parse tree produced by OParser#NotInExpression.
OParserListener.prototype.enterNotInExpression = ctx => {
};

// Exit a parse tree produced by OParser#NotInExpression.
OParserListener.prototype.exitNotInExpression = ctx => {
};


// Enter a parse tree produced by OParser#IteratorExpression.
OParserListener.prototype.enterIteratorExpression = ctx => {
};

// Exit a parse tree produced by OParser#IteratorExpression.
OParserListener.prototype.exitIteratorExpression = ctx => {
};


// Enter a parse tree produced by OParser#IsNotExpression.
OParserListener.prototype.enterIsNotExpression = ctx => {
};

// Exit a parse tree produced by OParser#IsNotExpression.
OParserListener.prototype.exitIsNotExpression = ctx => {
};


// Enter a parse tree produced by OParser#DivideExpression.
OParserListener.prototype.enterDivideExpression = ctx => {
};

// Exit a parse tree produced by OParser#DivideExpression.
OParserListener.prototype.exitDivideExpression = ctx => {
};


// Enter a parse tree produced by OParser#IsExpression.
OParserListener.prototype.enterIsExpression = ctx => {
};

// Exit a parse tree produced by OParser#IsExpression.
OParserListener.prototype.exitIsExpression = ctx => {
};


// Enter a parse tree produced by OParser#MinusExpression.
OParserListener.prototype.enterMinusExpression = ctx => {
};

// Exit a parse tree produced by OParser#MinusExpression.
OParserListener.prototype.exitMinusExpression = ctx => {
};


// Enter a parse tree produced by OParser#AddExpression.
OParserListener.prototype.enterAddExpression = ctx => {
};

// Exit a parse tree produced by OParser#AddExpression.
OParserListener.prototype.exitAddExpression = ctx => {
};


// Enter a parse tree produced by OParser#HasAllExpression.
OParserListener.prototype.enterHasAllExpression = ctx => {
};

// Exit a parse tree produced by OParser#HasAllExpression.
OParserListener.prototype.exitHasAllExpression = ctx => {
};


// Enter a parse tree produced by OParser#InstanceExpression.
OParserListener.prototype.enterInstanceExpression = ctx => {
};

// Exit a parse tree produced by OParser#InstanceExpression.
OParserListener.prototype.exitInstanceExpression = ctx => {
};


// Enter a parse tree produced by OParser#MutableInstanceExpression.
OParserListener.prototype.enterMutableInstanceExpression = ctx => {
};

// Exit a parse tree produced by OParser#MutableInstanceExpression.
OParserListener.prototype.exitMutableInstanceExpression = ctx => {
};


// Enter a parse tree produced by OParser#CssExpression.
OParserListener.prototype.enterCssExpression = ctx => {
};

// Exit a parse tree produced by OParser#CssExpression.
OParserListener.prototype.exitCssExpression = ctx => {
};


// Enter a parse tree produced by OParser#CastExpression.
OParserListener.prototype.enterCastExpression = ctx => {
};

// Exit a parse tree produced by OParser#CastExpression.
OParserListener.prototype.exitCastExpression = ctx => {
};


// Enter a parse tree produced by OParser#ModuloExpression.
OParserListener.prototype.enterModuloExpression = ctx => {
};

// Exit a parse tree produced by OParser#ModuloExpression.
OParserListener.prototype.exitModuloExpression = ctx => {
};


// Enter a parse tree produced by OParser#LessThanExpression.
OParserListener.prototype.enterLessThanExpression = ctx => {
};

// Exit a parse tree produced by OParser#LessThanExpression.
OParserListener.prototype.exitLessThanExpression = ctx => {
};


// Enter a parse tree produced by OParser#EqualsExpression.
OParserListener.prototype.enterEqualsExpression = ctx => {
};

// Exit a parse tree produced by OParser#EqualsExpression.
OParserListener.prototype.exitEqualsExpression = ctx => {
};


// Enter a parse tree produced by OParser#an_expression.
OParserListener.prototype.enterAn_expression = ctx => {
};

// Exit a parse tree produced by OParser#an_expression.
OParserListener.prototype.exitAn_expression = ctx => {
};


// Enter a parse tree produced by OParser#closure_expression.
OParserListener.prototype.enterClosure_expression = ctx => {
};

// Exit a parse tree produced by OParser#closure_expression.
OParserListener.prototype.exitClosure_expression = ctx => {
};


// Enter a parse tree produced by OParser#MethodExpression.
OParserListener.prototype.enterMethodExpression = ctx => {
};

// Exit a parse tree produced by OParser#MethodExpression.
OParserListener.prototype.exitMethodExpression = ctx => {
};


// Enter a parse tree produced by OParser#ParenthesisExpression.
OParserListener.prototype.enterParenthesisExpression = ctx => {
};

// Exit a parse tree produced by OParser#ParenthesisExpression.
OParserListener.prototype.exitParenthesisExpression = ctx => {
};


// Enter a parse tree produced by OParser#LiteralExpression.
OParserListener.prototype.enterLiteralExpression = ctx => {
};

// Exit a parse tree produced by OParser#LiteralExpression.
OParserListener.prototype.exitLiteralExpression = ctx => {
};


// Enter a parse tree produced by OParser#IdentifierExpression.
OParserListener.prototype.enterIdentifierExpression = ctx => {
};

// Exit a parse tree produced by OParser#IdentifierExpression.
OParserListener.prototype.exitIdentifierExpression = ctx => {
};


// Enter a parse tree produced by OParser#ThisExpression.
OParserListener.prototype.enterThisExpression = ctx => {
};

// Exit a parse tree produced by OParser#ThisExpression.
OParserListener.prototype.exitThisExpression = ctx => {
};


// Enter a parse tree produced by OParser#SuperExpression.
OParserListener.prototype.enterSuperExpression = ctx => {
};

// Exit a parse tree produced by OParser#SuperExpression.
OParserListener.prototype.exitSuperExpression = ctx => {
};


// Enter a parse tree produced by OParser#SelectorExpression.
OParserListener.prototype.enterSelectorExpression = ctx => {
};

// Exit a parse tree produced by OParser#SelectorExpression.
OParserListener.prototype.exitSelectorExpression = ctx => {
};


// Enter a parse tree produced by OParser#SelectableExpression.
OParserListener.prototype.enterSelectableExpression = ctx => {
};

// Exit a parse tree produced by OParser#SelectableExpression.
OParserListener.prototype.exitSelectableExpression = ctx => {
};


// Enter a parse tree produced by OParser#MutableSelectableExpression.
OParserListener.prototype.enterMutableSelectableExpression = ctx => {
};

// Exit a parse tree produced by OParser#MutableSelectableExpression.
OParserListener.prototype.exitMutableSelectableExpression = ctx => {
};


// Enter a parse tree produced by OParser#MutableSelectorExpression.
OParserListener.prototype.enterMutableSelectorExpression = ctx => {
};

// Exit a parse tree produced by OParser#MutableSelectorExpression.
OParserListener.prototype.exitMutableSelectorExpression = ctx => {
};


// Enter a parse tree produced by OParser#method_expression.
OParserListener.prototype.enterMethod_expression = ctx => {
};

// Exit a parse tree produced by OParser#method_expression.
OParserListener.prototype.exitMethod_expression = ctx => {
};


// Enter a parse tree produced by OParser#blob_expression.
OParserListener.prototype.enterBlob_expression = ctx => {
};

// Exit a parse tree produced by OParser#blob_expression.
OParserListener.prototype.exitBlob_expression = ctx => {
};


// Enter a parse tree produced by OParser#document_expression.
OParserListener.prototype.enterDocument_expression = ctx => {
};

// Exit a parse tree produced by OParser#document_expression.
OParserListener.prototype.exitDocument_expression = ctx => {
};


// Enter a parse tree produced by OParser#write_statement.
OParserListener.prototype.enterWrite_statement = ctx => {
};

// Exit a parse tree produced by OParser#write_statement.
OParserListener.prototype.exitWrite_statement = ctx => {
};


// Enter a parse tree produced by OParser#filtered_list_expression.
OParserListener.prototype.enterFiltered_list_expression = ctx => {
};

// Exit a parse tree produced by OParser#filtered_list_expression.
OParserListener.prototype.exitFiltered_list_expression = ctx => {
};


// Enter a parse tree produced by OParser#FetchOne.
OParserListener.prototype.enterFetchOne = ctx => {
};

// Exit a parse tree produced by OParser#FetchOne.
OParserListener.prototype.exitFetchOne = ctx => {
};


// Enter a parse tree produced by OParser#FetchMany.
OParserListener.prototype.enterFetchMany = ctx => {
};

// Exit a parse tree produced by OParser#FetchMany.
OParserListener.prototype.exitFetchMany = ctx => {
};


// Enter a parse tree produced by OParser#FetchOneAsync.
OParserListener.prototype.enterFetchOneAsync = ctx => {
};

// Exit a parse tree produced by OParser#FetchOneAsync.
OParserListener.prototype.exitFetchOneAsync = ctx => {
};


// Enter a parse tree produced by OParser#FetchManyAsync.
OParserListener.prototype.enterFetchManyAsync = ctx => {
};

// Exit a parse tree produced by OParser#FetchManyAsync.
OParserListener.prototype.exitFetchManyAsync = ctx => {
};


// Enter a parse tree produced by OParser#read_statement.
OParserListener.prototype.enterRead_statement = ctx => {
};

// Exit a parse tree produced by OParser#read_statement.
OParserListener.prototype.exitRead_statement = ctx => {
};


// Enter a parse tree produced by OParser#sorted_expression.
OParserListener.prototype.enterSorted_expression = ctx => {
};

// Exit a parse tree produced by OParser#sorted_expression.
OParserListener.prototype.exitSorted_expression = ctx => {
};


// Enter a parse tree produced by OParser#MemberSelector.
OParserListener.prototype.enterMemberSelector = ctx => {
};

// Exit a parse tree produced by OParser#MemberSelector.
OParserListener.prototype.exitMemberSelector = ctx => {
};


// Enter a parse tree produced by OParser#MethodSelector.
OParserListener.prototype.enterMethodSelector = ctx => {
};

// Exit a parse tree produced by OParser#MethodSelector.
OParserListener.prototype.exitMethodSelector = ctx => {
};


// Enter a parse tree produced by OParser#ItemSelector.
OParserListener.prototype.enterItemSelector = ctx => {
};

// Exit a parse tree produced by OParser#ItemSelector.
OParserListener.prototype.exitItemSelector = ctx => {
};


// Enter a parse tree produced by OParser#SliceSelector.
OParserListener.prototype.enterSliceSelector = ctx => {
};

// Exit a parse tree produced by OParser#SliceSelector.
OParserListener.prototype.exitSliceSelector = ctx => {
};


// Enter a parse tree produced by OParser#ConstructorFrom.
OParserListener.prototype.enterConstructorFrom = ctx => {
};

// Exit a parse tree produced by OParser#ConstructorFrom.
OParserListener.prototype.exitConstructorFrom = ctx => {
};


// Enter a parse tree produced by OParser#ConstructorNoFrom.
OParserListener.prototype.enterConstructorNoFrom = ctx => {
};

// Exit a parse tree produced by OParser#ConstructorNoFrom.
OParserListener.prototype.exitConstructorNoFrom = ctx => {
};


// Enter a parse tree produced by OParser#copy_from.
OParserListener.prototype.enterCopy_from = ctx => {
};

// Exit a parse tree produced by OParser#copy_from.
OParserListener.prototype.exitCopy_from = ctx => {
};


// Enter a parse tree produced by OParser#ExpressionAssignmentList.
OParserListener.prototype.enterExpressionAssignmentList = ctx => {
};

// Exit a parse tree produced by OParser#ExpressionAssignmentList.
OParserListener.prototype.exitExpressionAssignmentList = ctx => {
};


// Enter a parse tree produced by OParser#ArgumentAssignmentList.
OParserListener.prototype.enterArgumentAssignmentList = ctx => {
};

// Exit a parse tree produced by OParser#ArgumentAssignmentList.
OParserListener.prototype.exitArgumentAssignmentList = ctx => {
};


// Enter a parse tree produced by OParser#ArgumentAssignmentListItem.
OParserListener.prototype.enterArgumentAssignmentListItem = ctx => {
};

// Exit a parse tree produced by OParser#ArgumentAssignmentListItem.
OParserListener.prototype.exitArgumentAssignmentListItem = ctx => {
};


// Enter a parse tree produced by OParser#argument_assignment.
OParserListener.prototype.enterArgument_assignment = ctx => {
};

// Exit a parse tree produced by OParser#argument_assignment.
OParserListener.prototype.exitArgument_assignment = ctx => {
};


// Enter a parse tree produced by OParser#assign_instance_statement.
OParserListener.prototype.enterAssign_instance_statement = ctx => {
};

// Exit a parse tree produced by OParser#assign_instance_statement.
OParserListener.prototype.exitAssign_instance_statement = ctx => {
};


// Enter a parse tree produced by OParser#MemberInstance.
OParserListener.prototype.enterMemberInstance = ctx => {
};

// Exit a parse tree produced by OParser#MemberInstance.
OParserListener.prototype.exitMemberInstance = ctx => {
};


// Enter a parse tree produced by OParser#ItemInstance.
OParserListener.prototype.enterItemInstance = ctx => {
};

// Exit a parse tree produced by OParser#ItemInstance.
OParserListener.prototype.exitItemInstance = ctx => {
};


// Enter a parse tree produced by OParser#assign_tuple_statement.
OParserListener.prototype.enterAssign_tuple_statement = ctx => {
};

// Exit a parse tree produced by OParser#assign_tuple_statement.
OParserListener.prototype.exitAssign_tuple_statement = ctx => {
};


// Enter a parse tree produced by OParser#type_literal.
OParserListener.prototype.enterType_literal = ctx => {
};

// Exit a parse tree produced by OParser#type_literal.
OParserListener.prototype.exitType_literal = ctx => {
};


// Enter a parse tree produced by OParser#null_literal.
OParserListener.prototype.enterNull_literal = ctx => {
};

// Exit a parse tree produced by OParser#null_literal.
OParserListener.prototype.exitNull_literal = ctx => {
};


// Enter a parse tree produced by OParser#ws_plus.
OParserListener.prototype.enterWs_plus = ctx => {
};

// Exit a parse tree produced by OParser#ws_plus.
OParserListener.prototype.exitWs_plus = ctx => {
};


// Enter a parse tree produced by OParser#repl.
OParserListener.prototype.enterRepl = ctx => {
};

// Exit a parse tree produced by OParser#repl.
OParserListener.prototype.exitRepl = ctx => {
};


// Enter a parse tree produced by OParser#FullDeclarationList.
OParserListener.prototype.enterFullDeclarationList = ctx => {
};

// Exit a parse tree produced by OParser#FullDeclarationList.
OParserListener.prototype.exitFullDeclarationList = ctx => {
};


// Enter a parse tree produced by OParser#declarations.
OParserListener.prototype.enterDeclarations = ctx => {
};

// Exit a parse tree produced by OParser#declarations.
OParserListener.prototype.exitDeclarations = ctx => {
};


// Enter a parse tree produced by OParser#declaration.
OParserListener.prototype.enterDeclaration = ctx => {
};

// Exit a parse tree produced by OParser#declaration.
OParserListener.prototype.exitDeclaration = ctx => {
};


// Enter a parse tree produced by OParser#annotation_constructor.
OParserListener.prototype.enterAnnotation_constructor = ctx => {
};

// Exit a parse tree produced by OParser#annotation_constructor.
OParserListener.prototype.exitAnnotation_constructor = ctx => {
};


// Enter a parse tree produced by OParser#annotation_identifier.
OParserListener.prototype.enterAnnotation_identifier = ctx => {
};

// Exit a parse tree produced by OParser#annotation_identifier.
OParserListener.prototype.exitAnnotation_identifier = ctx => {
};


// Enter a parse tree produced by OParser#annotation_argument.
OParserListener.prototype.enterAnnotation_argument = ctx => {
};

// Exit a parse tree produced by OParser#annotation_argument.
OParserListener.prototype.exitAnnotation_argument = ctx => {
};


// Enter a parse tree produced by OParser#annotation_argument_name.
OParserListener.prototype.enterAnnotation_argument_name = ctx => {
};

// Exit a parse tree produced by OParser#annotation_argument_name.
OParserListener.prototype.exitAnnotation_argument_name = ctx => {
};


// Enter a parse tree produced by OParser#AnnotationLiteralValue.
OParserListener.prototype.enterAnnotationLiteralValue = ctx => {
};

// Exit a parse tree produced by OParser#AnnotationLiteralValue.
OParserListener.prototype.exitAnnotationLiteralValue = ctx => {
};


// Enter a parse tree produced by OParser#AnnotationTypeValue.
OParserListener.prototype.enterAnnotationTypeValue = ctx => {
};

// Exit a parse tree produced by OParser#AnnotationTypeValue.
OParserListener.prototype.exitAnnotationTypeValue = ctx => {
};


// Enter a parse tree produced by OParser#resource_declaration.
OParserListener.prototype.enterResource_declaration = ctx => {
};

// Exit a parse tree produced by OParser#resource_declaration.
OParserListener.prototype.exitResource_declaration = ctx => {
};


// Enter a parse tree produced by OParser#enum_declaration.
OParserListener.prototype.enterEnum_declaration = ctx => {
};

// Exit a parse tree produced by OParser#enum_declaration.
OParserListener.prototype.exitEnum_declaration = ctx => {
};


// Enter a parse tree produced by OParser#native_symbol_list.
OParserListener.prototype.enterNative_symbol_list = ctx => {
};

// Exit a parse tree produced by OParser#native_symbol_list.
OParserListener.prototype.exitNative_symbol_list = ctx => {
};


// Enter a parse tree produced by OParser#category_symbol_list.
OParserListener.prototype.enterCategory_symbol_list = ctx => {
};

// Exit a parse tree produced by OParser#category_symbol_list.
OParserListener.prototype.exitCategory_symbol_list = ctx => {
};


// Enter a parse tree produced by OParser#symbol_list.
OParserListener.prototype.enterSymbol_list = ctx => {
};

// Exit a parse tree produced by OParser#symbol_list.
OParserListener.prototype.exitSymbol_list = ctx => {
};


// Enter a parse tree produced by OParser#MatchingList.
OParserListener.prototype.enterMatchingList = ctx => {
};

// Exit a parse tree produced by OParser#MatchingList.
OParserListener.prototype.exitMatchingList = ctx => {
};


// Enter a parse tree produced by OParser#MatchingSet.
OParserListener.prototype.enterMatchingSet = ctx => {
};

// Exit a parse tree produced by OParser#MatchingSet.
OParserListener.prototype.exitMatchingSet = ctx => {
};


// Enter a parse tree produced by OParser#MatchingRange.
OParserListener.prototype.enterMatchingRange = ctx => {
};

// Exit a parse tree produced by OParser#MatchingRange.
OParserListener.prototype.exitMatchingRange = ctx => {
};


// Enter a parse tree produced by OParser#MatchingPattern.
OParserListener.prototype.enterMatchingPattern = ctx => {
};

// Exit a parse tree produced by OParser#MatchingPattern.
OParserListener.prototype.exitMatchingPattern = ctx => {
};


// Enter a parse tree produced by OParser#MatchingExpression.
OParserListener.prototype.enterMatchingExpression = ctx => {
};

// Exit a parse tree produced by OParser#MatchingExpression.
OParserListener.prototype.exitMatchingExpression = ctx => {
};


// Enter a parse tree produced by OParser#list_literal.
OParserListener.prototype.enterList_literal = ctx => {
};

// Exit a parse tree produced by OParser#list_literal.
OParserListener.prototype.exitList_literal = ctx => {
};


// Enter a parse tree produced by OParser#set_literal.
OParserListener.prototype.enterSet_literal = ctx => {
};

// Exit a parse tree produced by OParser#set_literal.
OParserListener.prototype.exitSet_literal = ctx => {
};


// Enter a parse tree produced by OParser#expression_list.
OParserListener.prototype.enterExpression_list = ctx => {
};

// Exit a parse tree produced by OParser#expression_list.
OParserListener.prototype.exitExpression_list = ctx => {
};


// Enter a parse tree produced by OParser#range_literal.
OParserListener.prototype.enterRange_literal = ctx => {
};

// Exit a parse tree produced by OParser#range_literal.
OParserListener.prototype.exitRange_literal = ctx => {
};


// Enter a parse tree produced by OParser#IteratorType.
OParserListener.prototype.enterIteratorType = ctx => {
};

// Exit a parse tree produced by OParser#IteratorType.
OParserListener.prototype.exitIteratorType = ctx => {
};


// Enter a parse tree produced by OParser#SetType.
OParserListener.prototype.enterSetType = ctx => {
};

// Exit a parse tree produced by OParser#SetType.
OParserListener.prototype.exitSetType = ctx => {
};


// Enter a parse tree produced by OParser#ListType.
OParserListener.prototype.enterListType = ctx => {
};

// Exit a parse tree produced by OParser#ListType.
OParserListener.prototype.exitListType = ctx => {
};


// Enter a parse tree produced by OParser#DictType.
OParserListener.prototype.enterDictType = ctx => {
};

// Exit a parse tree produced by OParser#DictType.
OParserListener.prototype.exitDictType = ctx => {
};


// Enter a parse tree produced by OParser#CursorType.
OParserListener.prototype.enterCursorType = ctx => {
};

// Exit a parse tree produced by OParser#CursorType.
OParserListener.prototype.exitCursorType = ctx => {
};


// Enter a parse tree produced by OParser#PrimaryType.
OParserListener.prototype.enterPrimaryType = ctx => {
};

// Exit a parse tree produced by OParser#PrimaryType.
OParserListener.prototype.exitPrimaryType = ctx => {
};


// Enter a parse tree produced by OParser#NativeType.
OParserListener.prototype.enterNativeType = ctx => {
};

// Exit a parse tree produced by OParser#NativeType.
OParserListener.prototype.exitNativeType = ctx => {
};


// Enter a parse tree produced by OParser#CategoryType.
OParserListener.prototype.enterCategoryType = ctx => {
};

// Exit a parse tree produced by OParser#CategoryType.
OParserListener.prototype.exitCategoryType = ctx => {
};


// Enter a parse tree produced by OParser#BooleanType.
OParserListener.prototype.enterBooleanType = ctx => {
};

// Exit a parse tree produced by OParser#BooleanType.
OParserListener.prototype.exitBooleanType = ctx => {
};


// Enter a parse tree produced by OParser#CssType.
OParserListener.prototype.enterCssType = ctx => {
};

// Exit a parse tree produced by OParser#CssType.
OParserListener.prototype.exitCssType = ctx => {
};


// Enter a parse tree produced by OParser#CharacterType.
OParserListener.prototype.enterCharacterType = ctx => {
};

// Exit a parse tree produced by OParser#CharacterType.
OParserListener.prototype.exitCharacterType = ctx => {
};


// Enter a parse tree produced by OParser#TextType.
OParserListener.prototype.enterTextType = ctx => {
};

// Exit a parse tree produced by OParser#TextType.
OParserListener.prototype.exitTextType = ctx => {
};


// Enter a parse tree produced by OParser#ImageType.
OParserListener.prototype.enterImageType = ctx => {
};

// Exit a parse tree produced by OParser#ImageType.
OParserListener.prototype.exitImageType = ctx => {
};


// Enter a parse tree produced by OParser#IntegerType.
OParserListener.prototype.enterIntegerType = ctx => {
};

// Exit a parse tree produced by OParser#IntegerType.
OParserListener.prototype.exitIntegerType = ctx => {
};


// Enter a parse tree produced by OParser#DecimalType.
OParserListener.prototype.enterDecimalType = ctx => {
};

// Exit a parse tree produced by OParser#DecimalType.
OParserListener.prototype.exitDecimalType = ctx => {
};


// Enter a parse tree produced by OParser#DocumentType.
OParserListener.prototype.enterDocumentType = ctx => {
};

// Exit a parse tree produced by OParser#DocumentType.
OParserListener.prototype.exitDocumentType = ctx => {
};


// Enter a parse tree produced by OParser#DateType.
OParserListener.prototype.enterDateType = ctx => {
};

// Exit a parse tree produced by OParser#DateType.
OParserListener.prototype.exitDateType = ctx => {
};


// Enter a parse tree produced by OParser#DateTimeType.
OParserListener.prototype.enterDateTimeType = ctx => {
};

// Exit a parse tree produced by OParser#DateTimeType.
OParserListener.prototype.exitDateTimeType = ctx => {
};


// Enter a parse tree produced by OParser#TimeType.
OParserListener.prototype.enterTimeType = ctx => {
};

// Exit a parse tree produced by OParser#TimeType.
OParserListener.prototype.exitTimeType = ctx => {
};


// Enter a parse tree produced by OParser#PeriodType.
OParserListener.prototype.enterPeriodType = ctx => {
};

// Exit a parse tree produced by OParser#PeriodType.
OParserListener.prototype.exitPeriodType = ctx => {
};


// Enter a parse tree produced by OParser#VersionType.
OParserListener.prototype.enterVersionType = ctx => {
};

// Exit a parse tree produced by OParser#VersionType.
OParserListener.prototype.exitVersionType = ctx => {
};


// Enter a parse tree produced by OParser#CodeType.
OParserListener.prototype.enterCodeType = ctx => {
};

// Exit a parse tree produced by OParser#CodeType.
OParserListener.prototype.exitCodeType = ctx => {
};


// Enter a parse tree produced by OParser#BlobType.
OParserListener.prototype.enterBlobType = ctx => {
};

// Exit a parse tree produced by OParser#BlobType.
OParserListener.prototype.exitBlobType = ctx => {
};


// Enter a parse tree produced by OParser#UUIDType.
OParserListener.prototype.enterUUIDType = ctx => {
};

// Exit a parse tree produced by OParser#UUIDType.
OParserListener.prototype.exitUUIDType = ctx => {
};


// Enter a parse tree produced by OParser#HtmlType.
OParserListener.prototype.enterHtmlType = ctx => {
};

// Exit a parse tree produced by OParser#HtmlType.
OParserListener.prototype.exitHtmlType = ctx => {
};


// Enter a parse tree produced by OParser#category_type.
OParserListener.prototype.enterCategory_type = ctx => {
};

// Exit a parse tree produced by OParser#category_type.
OParserListener.prototype.exitCategory_type = ctx => {
};


// Enter a parse tree produced by OParser#mutable_category_type.
OParserListener.prototype.enterMutable_category_type = ctx => {
};

// Exit a parse tree produced by OParser#mutable_category_type.
OParserListener.prototype.exitMutable_category_type = ctx => {
};


// Enter a parse tree produced by OParser#code_type.
OParserListener.prototype.enterCode_type = ctx => {
};

// Exit a parse tree produced by OParser#code_type.
OParserListener.prototype.exitCode_type = ctx => {
};


// Enter a parse tree produced by OParser#ConcreteCategoryDeclaration.
OParserListener.prototype.enterConcreteCategoryDeclaration = ctx => {
};

// Exit a parse tree produced by OParser#ConcreteCategoryDeclaration.
OParserListener.prototype.exitConcreteCategoryDeclaration = ctx => {
};


// Enter a parse tree produced by OParser#NativeCategoryDeclaration.
OParserListener.prototype.enterNativeCategoryDeclaration = ctx => {
};

// Exit a parse tree produced by OParser#NativeCategoryDeclaration.
OParserListener.prototype.exitNativeCategoryDeclaration = ctx => {
};


// Enter a parse tree produced by OParser#SingletonCategoryDeclaration.
OParserListener.prototype.enterSingletonCategoryDeclaration = ctx => {
};

// Exit a parse tree produced by OParser#SingletonCategoryDeclaration.
OParserListener.prototype.exitSingletonCategoryDeclaration = ctx => {
};


// Enter a parse tree produced by OParser#ConcreteWidgetDeclaration.
OParserListener.prototype.enterConcreteWidgetDeclaration = ctx => {
};

// Exit a parse tree produced by OParser#ConcreteWidgetDeclaration.
OParserListener.prototype.exitConcreteWidgetDeclaration = ctx => {
};


// Enter a parse tree produced by OParser#NativeWidgetDeclaration.
OParserListener.prototype.enterNativeWidgetDeclaration = ctx => {
};

// Exit a parse tree produced by OParser#NativeWidgetDeclaration.
OParserListener.prototype.exitNativeWidgetDeclaration = ctx => {
};


// Enter a parse tree produced by OParser#type_identifier_list.
OParserListener.prototype.enterType_identifier_list = ctx => {
};

// Exit a parse tree produced by OParser#type_identifier_list.
OParserListener.prototype.exitType_identifier_list = ctx => {
};


// Enter a parse tree produced by OParser#method_identifier.
OParserListener.prototype.enterMethod_identifier = ctx => {
};

// Exit a parse tree produced by OParser#method_identifier.
OParserListener.prototype.exitMethod_identifier = ctx => {
};


// Enter a parse tree produced by OParser#identifier_or_keyword.
OParserListener.prototype.enterIdentifier_or_keyword = ctx => {
};

// Exit a parse tree produced by OParser#identifier_or_keyword.
OParserListener.prototype.exitIdentifier_or_keyword = ctx => {
};


// Enter a parse tree produced by OParser#nospace_hyphen_identifier_or_keyword.
OParserListener.prototype.enterNospace_hyphen_identifier_or_keyword = ctx => {
};

// Exit a parse tree produced by OParser#nospace_hyphen_identifier_or_keyword.
OParserListener.prototype.exitNospace_hyphen_identifier_or_keyword = ctx => {
};


// Enter a parse tree produced by OParser#nospace_identifier_or_keyword.
OParserListener.prototype.enterNospace_identifier_or_keyword = ctx => {
};

// Exit a parse tree produced by OParser#nospace_identifier_or_keyword.
OParserListener.prototype.exitNospace_identifier_or_keyword = ctx => {
};


// Enter a parse tree produced by OParser#VariableIdentifier.
OParserListener.prototype.enterVariableIdentifier = ctx => {
};

// Exit a parse tree produced by OParser#VariableIdentifier.
OParserListener.prototype.exitVariableIdentifier = ctx => {
};


// Enter a parse tree produced by OParser#TypeIdentifier.
OParserListener.prototype.enterTypeIdentifier = ctx => {
};

// Exit a parse tree produced by OParser#TypeIdentifier.
OParserListener.prototype.exitTypeIdentifier = ctx => {
};


// Enter a parse tree produced by OParser#SymbolIdentifier.
OParserListener.prototype.enterSymbolIdentifier = ctx => {
};

// Exit a parse tree produced by OParser#SymbolIdentifier.
OParserListener.prototype.exitSymbolIdentifier = ctx => {
};


// Enter a parse tree produced by OParser#member_identifier.
OParserListener.prototype.enterMember_identifier = ctx => {
};

// Exit a parse tree produced by OParser#member_identifier.
OParserListener.prototype.exitMember_identifier = ctx => {
};


// Enter a parse tree produced by OParser#variable_identifier.
OParserListener.prototype.enterVariable_identifier = ctx => {
};

// Exit a parse tree produced by OParser#variable_identifier.
OParserListener.prototype.exitVariable_identifier = ctx => {
};


// Enter a parse tree produced by OParser#attribute_identifier.
OParserListener.prototype.enterAttribute_identifier = ctx => {
};

// Exit a parse tree produced by OParser#attribute_identifier.
OParserListener.prototype.exitAttribute_identifier = ctx => {
};


// Enter a parse tree produced by OParser#type_identifier.
OParserListener.prototype.enterType_identifier = ctx => {
};

// Exit a parse tree produced by OParser#type_identifier.
OParserListener.prototype.exitType_identifier = ctx => {
};


// Enter a parse tree produced by OParser#symbol_identifier.
OParserListener.prototype.enterSymbol_identifier = ctx => {
};

// Exit a parse tree produced by OParser#symbol_identifier.
OParserListener.prototype.exitSymbol_identifier = ctx => {
};


// Enter a parse tree produced by OParser#argument_list.
OParserListener.prototype.enterArgument_list = ctx => {
};

// Exit a parse tree produced by OParser#argument_list.
OParserListener.prototype.exitArgument_list = ctx => {
};


// Enter a parse tree produced by OParser#CodeArgument.
OParserListener.prototype.enterCodeArgument = ctx => {
};

// Exit a parse tree produced by OParser#CodeArgument.
OParserListener.prototype.exitCodeArgument = ctx => {
};


// Enter a parse tree produced by OParser#OperatorArgument.
OParserListener.prototype.enterOperatorArgument = ctx => {
};

// Exit a parse tree produced by OParser#OperatorArgument.
OParserListener.prototype.exitOperatorArgument = ctx => {
};


// Enter a parse tree produced by OParser#operator_argument.
OParserListener.prototype.enterOperator_argument = ctx => {
};

// Exit a parse tree produced by OParser#operator_argument.
OParserListener.prototype.exitOperator_argument = ctx => {
};


// Enter a parse tree produced by OParser#named_argument.
OParserListener.prototype.enterNamed_argument = ctx => {
};

// Exit a parse tree produced by OParser#named_argument.
OParserListener.prototype.exitNamed_argument = ctx => {
};


// Enter a parse tree produced by OParser#code_argument.
OParserListener.prototype.enterCode_argument = ctx => {
};

// Exit a parse tree produced by OParser#code_argument.
OParserListener.prototype.exitCode_argument = ctx => {
};


// Enter a parse tree produced by OParser#category_or_any_type.
OParserListener.prototype.enterCategory_or_any_type = ctx => {
};

// Exit a parse tree produced by OParser#category_or_any_type.
OParserListener.prototype.exitCategory_or_any_type = ctx => {
};


// Enter a parse tree produced by OParser#AnyListType.
OParserListener.prototype.enterAnyListType = ctx => {
};

// Exit a parse tree produced by OParser#AnyListType.
OParserListener.prototype.exitAnyListType = ctx => {
};


// Enter a parse tree produced by OParser#AnyType.
OParserListener.prototype.enterAnyType = ctx => {
};

// Exit a parse tree produced by OParser#AnyType.
OParserListener.prototype.exitAnyType = ctx => {
};


// Enter a parse tree produced by OParser#AnyDictType.
OParserListener.prototype.enterAnyDictType = ctx => {
};

// Exit a parse tree produced by OParser#AnyDictType.
OParserListener.prototype.exitAnyDictType = ctx => {
};


// Enter a parse tree produced by OParser#member_method_declaration_list.
OParserListener.prototype.enterMember_method_declaration_list = ctx => {
};

// Exit a parse tree produced by OParser#member_method_declaration_list.
OParserListener.prototype.exitMember_method_declaration_list = ctx => {
};


// Enter a parse tree produced by OParser#member_method_declaration.
OParserListener.prototype.enterMember_method_declaration = ctx => {
};

// Exit a parse tree produced by OParser#member_method_declaration.
OParserListener.prototype.exitMember_method_declaration = ctx => {
};


// Enter a parse tree produced by OParser#native_member_method_declaration_list.
OParserListener.prototype.enterNative_member_method_declaration_list = ctx => {
};

// Exit a parse tree produced by OParser#native_member_method_declaration_list.
OParserListener.prototype.exitNative_member_method_declaration_list = ctx => {
};


// Enter a parse tree produced by OParser#native_member_method_declaration.
OParserListener.prototype.enterNative_member_method_declaration = ctx => {
};

// Exit a parse tree produced by OParser#native_member_method_declaration.
OParserListener.prototype.exitNative_member_method_declaration = ctx => {
};


// Enter a parse tree produced by OParser#JavaCategoryBinding.
OParserListener.prototype.enterJavaCategoryBinding = ctx => {
};

// Exit a parse tree produced by OParser#JavaCategoryBinding.
OParserListener.prototype.exitJavaCategoryBinding = ctx => {
};


// Enter a parse tree produced by OParser#CSharpCategoryBinding.
OParserListener.prototype.enterCSharpCategoryBinding = ctx => {
};

// Exit a parse tree produced by OParser#CSharpCategoryBinding.
OParserListener.prototype.exitCSharpCategoryBinding = ctx => {
};


// Enter a parse tree produced by OParser#Python2CategoryBinding.
OParserListener.prototype.enterPython2CategoryBinding = ctx => {
};

// Exit a parse tree produced by OParser#Python2CategoryBinding.
OParserListener.prototype.exitPython2CategoryBinding = ctx => {
};


// Enter a parse tree produced by OParser#Python3CategoryBinding.
OParserListener.prototype.enterPython3CategoryBinding = ctx => {
};

// Exit a parse tree produced by OParser#Python3CategoryBinding.
OParserListener.prototype.exitPython3CategoryBinding = ctx => {
};


// Enter a parse tree produced by OParser#JavaScriptCategoryBinding.
OParserListener.prototype.enterJavaScriptCategoryBinding = ctx => {
};

// Exit a parse tree produced by OParser#JavaScriptCategoryBinding.
OParserListener.prototype.exitJavaScriptCategoryBinding = ctx => {
};


// Enter a parse tree produced by OParser#python_category_binding.
OParserListener.prototype.enterPython_category_binding = ctx => {
};

// Exit a parse tree produced by OParser#python_category_binding.
OParserListener.prototype.exitPython_category_binding = ctx => {
};


// Enter a parse tree produced by OParser#python_module.
OParserListener.prototype.enterPython_module = ctx => {
};

// Exit a parse tree produced by OParser#python_module.
OParserListener.prototype.exitPython_module = ctx => {
};


// Enter a parse tree produced by OParser#javascript_category_binding.
OParserListener.prototype.enterJavascript_category_binding = ctx => {
};

// Exit a parse tree produced by OParser#javascript_category_binding.
OParserListener.prototype.exitJavascript_category_binding = ctx => {
};


// Enter a parse tree produced by OParser#javascript_module.
OParserListener.prototype.enterJavascript_module = ctx => {
};

// Exit a parse tree produced by OParser#javascript_module.
OParserListener.prototype.exitJavascript_module = ctx => {
};


// Enter a parse tree produced by OParser#variable_identifier_list.
OParserListener.prototype.enterVariable_identifier_list = ctx => {
};

// Exit a parse tree produced by OParser#variable_identifier_list.
OParserListener.prototype.exitVariable_identifier_list = ctx => {
};


// Enter a parse tree produced by OParser#attribute_identifier_list.
OParserListener.prototype.enterAttribute_identifier_list = ctx => {
};

// Exit a parse tree produced by OParser#attribute_identifier_list.
OParserListener.prototype.exitAttribute_identifier_list = ctx => {
};


// Enter a parse tree produced by OParser#method_declaration.
OParserListener.prototype.enterMethod_declaration = ctx => {
};

// Exit a parse tree produced by OParser#method_declaration.
OParserListener.prototype.exitMethod_declaration = ctx => {
};


// Enter a parse tree produced by OParser#comment_statement.
OParserListener.prototype.enterComment_statement = ctx => {
};

// Exit a parse tree produced by OParser#comment_statement.
OParserListener.prototype.exitComment_statement = ctx => {
};


// Enter a parse tree produced by OParser#native_statement_list.
OParserListener.prototype.enterNative_statement_list = ctx => {
};

// Exit a parse tree produced by OParser#native_statement_list.
OParserListener.prototype.exitNative_statement_list = ctx => {
};


// Enter a parse tree produced by OParser#JavaNativeStatement.
OParserListener.prototype.enterJavaNativeStatement = ctx => {
};

// Exit a parse tree produced by OParser#JavaNativeStatement.
OParserListener.prototype.exitJavaNativeStatement = ctx => {
};


// Enter a parse tree produced by OParser#CSharpNativeStatement.
OParserListener.prototype.enterCSharpNativeStatement = ctx => {
};

// Exit a parse tree produced by OParser#CSharpNativeStatement.
OParserListener.prototype.exitCSharpNativeStatement = ctx => {
};


// Enter a parse tree produced by OParser#Python2NativeStatement.
OParserListener.prototype.enterPython2NativeStatement = ctx => {
};

// Exit a parse tree produced by OParser#Python2NativeStatement.
OParserListener.prototype.exitPython2NativeStatement = ctx => {
};


// Enter a parse tree produced by OParser#Python3NativeStatement.
OParserListener.prototype.enterPython3NativeStatement = ctx => {
};

// Exit a parse tree produced by OParser#Python3NativeStatement.
OParserListener.prototype.exitPython3NativeStatement = ctx => {
};


// Enter a parse tree produced by OParser#JavaScriptNativeStatement.
OParserListener.prototype.enterJavaScriptNativeStatement = ctx => {
};

// Exit a parse tree produced by OParser#JavaScriptNativeStatement.
OParserListener.prototype.exitJavaScriptNativeStatement = ctx => {
};


// Enter a parse tree produced by OParser#python_native_statement.
OParserListener.prototype.enterPython_native_statement = ctx => {
};

// Exit a parse tree produced by OParser#python_native_statement.
OParserListener.prototype.exitPython_native_statement = ctx => {
};


// Enter a parse tree produced by OParser#javascript_native_statement.
OParserListener.prototype.enterJavascript_native_statement = ctx => {
};

// Exit a parse tree produced by OParser#javascript_native_statement.
OParserListener.prototype.exitJavascript_native_statement = ctx => {
};


// Enter a parse tree produced by OParser#statement_list.
OParserListener.prototype.enterStatement_list = ctx => {
};

// Exit a parse tree produced by OParser#statement_list.
OParserListener.prototype.exitStatement_list = ctx => {
};


// Enter a parse tree produced by OParser#assertion_list.
OParserListener.prototype.enterAssertion_list = ctx => {
};

// Exit a parse tree produced by OParser#assertion_list.
OParserListener.prototype.exitAssertion_list = ctx => {
};


// Enter a parse tree produced by OParser#switch_case_statement_list.
OParserListener.prototype.enterSwitch_case_statement_list = ctx => {
};

// Exit a parse tree produced by OParser#switch_case_statement_list.
OParserListener.prototype.exitSwitch_case_statement_list = ctx => {
};


// Enter a parse tree produced by OParser#catch_statement_list.
OParserListener.prototype.enterCatch_statement_list = ctx => {
};

// Exit a parse tree produced by OParser#catch_statement_list.
OParserListener.prototype.exitCatch_statement_list = ctx => {
};


// Enter a parse tree produced by OParser#LiteralRangeLiteral.
OParserListener.prototype.enterLiteralRangeLiteral = ctx => {
};

// Exit a parse tree produced by OParser#LiteralRangeLiteral.
OParserListener.prototype.exitLiteralRangeLiteral = ctx => {
};


// Enter a parse tree produced by OParser#LiteralListLiteral.
OParserListener.prototype.enterLiteralListLiteral = ctx => {
};

// Exit a parse tree produced by OParser#LiteralListLiteral.
OParserListener.prototype.exitLiteralListLiteral = ctx => {
};


// Enter a parse tree produced by OParser#LiteralSetLiteral.
OParserListener.prototype.enterLiteralSetLiteral = ctx => {
};

// Exit a parse tree produced by OParser#LiteralSetLiteral.
OParserListener.prototype.exitLiteralSetLiteral = ctx => {
};


// Enter a parse tree produced by OParser#MinIntegerLiteral.
OParserListener.prototype.enterMinIntegerLiteral = ctx => {
};

// Exit a parse tree produced by OParser#MinIntegerLiteral.
OParserListener.prototype.exitMinIntegerLiteral = ctx => {
};


// Enter a parse tree produced by OParser#MaxIntegerLiteral.
OParserListener.prototype.enterMaxIntegerLiteral = ctx => {
};

// Exit a parse tree produced by OParser#MaxIntegerLiteral.
OParserListener.prototype.exitMaxIntegerLiteral = ctx => {
};


// Enter a parse tree produced by OParser#IntegerLiteral.
OParserListener.prototype.enterIntegerLiteral = ctx => {
};

// Exit a parse tree produced by OParser#IntegerLiteral.
OParserListener.prototype.exitIntegerLiteral = ctx => {
};


// Enter a parse tree produced by OParser#HexadecimalLiteral.
OParserListener.prototype.enterHexadecimalLiteral = ctx => {
};

// Exit a parse tree produced by OParser#HexadecimalLiteral.
OParserListener.prototype.exitHexadecimalLiteral = ctx => {
};


// Enter a parse tree produced by OParser#CharacterLiteral.
OParserListener.prototype.enterCharacterLiteral = ctx => {
};

// Exit a parse tree produced by OParser#CharacterLiteral.
OParserListener.prototype.exitCharacterLiteral = ctx => {
};


// Enter a parse tree produced by OParser#DateLiteral.
OParserListener.prototype.enterDateLiteral = ctx => {
};

// Exit a parse tree produced by OParser#DateLiteral.
OParserListener.prototype.exitDateLiteral = ctx => {
};


// Enter a parse tree produced by OParser#TimeLiteral.
OParserListener.prototype.enterTimeLiteral = ctx => {
};

// Exit a parse tree produced by OParser#TimeLiteral.
OParserListener.prototype.exitTimeLiteral = ctx => {
};


// Enter a parse tree produced by OParser#TextLiteral.
OParserListener.prototype.enterTextLiteral = ctx => {
};

// Exit a parse tree produced by OParser#TextLiteral.
OParserListener.prototype.exitTextLiteral = ctx => {
};


// Enter a parse tree produced by OParser#DecimalLiteral.
OParserListener.prototype.enterDecimalLiteral = ctx => {
};

// Exit a parse tree produced by OParser#DecimalLiteral.
OParserListener.prototype.exitDecimalLiteral = ctx => {
};


// Enter a parse tree produced by OParser#DateTimeLiteral.
OParserListener.prototype.enterDateTimeLiteral = ctx => {
};

// Exit a parse tree produced by OParser#DateTimeLiteral.
OParserListener.prototype.exitDateTimeLiteral = ctx => {
};


// Enter a parse tree produced by OParser#BooleanLiteral.
OParserListener.prototype.enterBooleanLiteral = ctx => {
};

// Exit a parse tree produced by OParser#BooleanLiteral.
OParserListener.prototype.exitBooleanLiteral = ctx => {
};


// Enter a parse tree produced by OParser#PeriodLiteral.
OParserListener.prototype.enterPeriodLiteral = ctx => {
};

// Exit a parse tree produced by OParser#PeriodLiteral.
OParserListener.prototype.exitPeriodLiteral = ctx => {
};


// Enter a parse tree produced by OParser#VersionLiteral.
OParserListener.prototype.enterVersionLiteral = ctx => {
};

// Exit a parse tree produced by OParser#VersionLiteral.
OParserListener.prototype.exitVersionLiteral = ctx => {
};


// Enter a parse tree produced by OParser#UUIDLiteral.
OParserListener.prototype.enterUUIDLiteral = ctx => {
};

// Exit a parse tree produced by OParser#UUIDLiteral.
OParserListener.prototype.exitUUIDLiteral = ctx => {
};


// Enter a parse tree produced by OParser#SymbolLiteral.
OParserListener.prototype.enterSymbolLiteral = ctx => {
};

// Exit a parse tree produced by OParser#SymbolLiteral.
OParserListener.prototype.exitSymbolLiteral = ctx => {
};


// Enter a parse tree produced by OParser#TypeLiteral.
OParserListener.prototype.enterTypeLiteral = ctx => {
};

// Exit a parse tree produced by OParser#TypeLiteral.
OParserListener.prototype.exitTypeLiteral = ctx => {
};


// Enter a parse tree produced by OParser#NullLiteral.
OParserListener.prototype.enterNullLiteral = ctx => {
};

// Exit a parse tree produced by OParser#NullLiteral.
OParserListener.prototype.exitNullLiteral = ctx => {
};


// Enter a parse tree produced by OParser#literal_list_literal.
OParserListener.prototype.enterLiteral_list_literal = ctx => {
};

// Exit a parse tree produced by OParser#literal_list_literal.
OParserListener.prototype.exitLiteral_list_literal = ctx => {
};


// Enter a parse tree produced by OParser#this_expression.
OParserListener.prototype.enterThis_expression = ctx => {
};

// Exit a parse tree produced by OParser#this_expression.
OParserListener.prototype.exitThis_expression = ctx => {
};


// Enter a parse tree produced by OParser#super_expression.
OParserListener.prototype.enterSuper_expression = ctx => {
};

// Exit a parse tree produced by OParser#super_expression.
OParserListener.prototype.exitSuper_expression = ctx => {
};


// Enter a parse tree produced by OParser#parenthesis_expression.
OParserListener.prototype.enterParenthesis_expression = ctx => {
};

// Exit a parse tree produced by OParser#parenthesis_expression.
OParserListener.prototype.exitParenthesis_expression = ctx => {
};


// Enter a parse tree produced by OParser#literal_expression.
OParserListener.prototype.enterLiteral_expression = ctx => {
};

// Exit a parse tree produced by OParser#literal_expression.
OParserListener.prototype.exitLiteral_expression = ctx => {
};


// Enter a parse tree produced by OParser#collection_literal.
OParserListener.prototype.enterCollection_literal = ctx => {
};

// Exit a parse tree produced by OParser#collection_literal.
OParserListener.prototype.exitCollection_literal = ctx => {
};


// Enter a parse tree produced by OParser#tuple_literal.
OParserListener.prototype.enterTuple_literal = ctx => {
};

// Exit a parse tree produced by OParser#tuple_literal.
OParserListener.prototype.exitTuple_literal = ctx => {
};


// Enter a parse tree produced by OParser#dict_literal.
OParserListener.prototype.enterDict_literal = ctx => {
};

// Exit a parse tree produced by OParser#dict_literal.
OParserListener.prototype.exitDict_literal = ctx => {
};


// Enter a parse tree produced by OParser#document_literal.
OParserListener.prototype.enterDocument_literal = ctx => {
};

// Exit a parse tree produced by OParser#document_literal.
OParserListener.prototype.exitDocument_literal = ctx => {
};


// Enter a parse tree produced by OParser#expression_tuple.
OParserListener.prototype.enterExpression_tuple = ctx => {
};

// Exit a parse tree produced by OParser#expression_tuple.
OParserListener.prototype.exitExpression_tuple = ctx => {
};


// Enter a parse tree produced by OParser#doc_entry_list.
OParserListener.prototype.enterDoc_entry_list = ctx => {
};

// Exit a parse tree produced by OParser#doc_entry_list.
OParserListener.prototype.exitDoc_entry_list = ctx => {
};


// Enter a parse tree produced by OParser#doc_entry.
OParserListener.prototype.enterDoc_entry = ctx => {
};

// Exit a parse tree produced by OParser#doc_entry.
OParserListener.prototype.exitDoc_entry = ctx => {
};


// Enter a parse tree produced by OParser#DocKeyIdentifier.
OParserListener.prototype.enterDocKeyIdentifier = ctx => {
};

// Exit a parse tree produced by OParser#DocKeyIdentifier.
OParserListener.prototype.exitDocKeyIdentifier = ctx => {
};


// Enter a parse tree produced by OParser#DocKeyText.
OParserListener.prototype.enterDocKeyText = ctx => {
};

// Exit a parse tree produced by OParser#DocKeyText.
OParserListener.prototype.exitDocKeyText = ctx => {
};


// Enter a parse tree produced by OParser#dict_entry_list.
OParserListener.prototype.enterDict_entry_list = ctx => {
};

// Exit a parse tree produced by OParser#dict_entry_list.
OParserListener.prototype.exitDict_entry_list = ctx => {
};


// Enter a parse tree produced by OParser#dict_entry.
OParserListener.prototype.enterDict_entry = ctx => {
};

// Exit a parse tree produced by OParser#dict_entry.
OParserListener.prototype.exitDict_entry = ctx => {
};


// Enter a parse tree produced by OParser#DictKeyIdentifier.
OParserListener.prototype.enterDictKeyIdentifier = ctx => {
};

// Exit a parse tree produced by OParser#DictKeyIdentifier.
OParserListener.prototype.exitDictKeyIdentifier = ctx => {
};


// Enter a parse tree produced by OParser#DictKeyText.
OParserListener.prototype.enterDictKeyText = ctx => {
};

// Exit a parse tree produced by OParser#DictKeyText.
OParserListener.prototype.exitDictKeyText = ctx => {
};


// Enter a parse tree produced by OParser#SliceFirstAndLast.
OParserListener.prototype.enterSliceFirstAndLast = ctx => {
};

// Exit a parse tree produced by OParser#SliceFirstAndLast.
OParserListener.prototype.exitSliceFirstAndLast = ctx => {
};


// Enter a parse tree produced by OParser#SliceFirstOnly.
OParserListener.prototype.enterSliceFirstOnly = ctx => {
};

// Exit a parse tree produced by OParser#SliceFirstOnly.
OParserListener.prototype.exitSliceFirstOnly = ctx => {
};


// Enter a parse tree produced by OParser#SliceLastOnly.
OParserListener.prototype.enterSliceLastOnly = ctx => {
};

// Exit a parse tree produced by OParser#SliceLastOnly.
OParserListener.prototype.exitSliceLastOnly = ctx => {
};


// Enter a parse tree produced by OParser#assign_variable_statement.
OParserListener.prototype.enterAssign_variable_statement = ctx => {
};

// Exit a parse tree produced by OParser#assign_variable_statement.
OParserListener.prototype.exitAssign_variable_statement = ctx => {
};


// Enter a parse tree produced by OParser#ChildInstance.
OParserListener.prototype.enterChildInstance = ctx => {
};

// Exit a parse tree produced by OParser#ChildInstance.
OParserListener.prototype.exitChildInstance = ctx => {
};


// Enter a parse tree produced by OParser#RootInstance.
OParserListener.prototype.enterRootInstance = ctx => {
};

// Exit a parse tree produced by OParser#RootInstance.
OParserListener.prototype.exitRootInstance = ctx => {
};


// Enter a parse tree produced by OParser#IsATypeExpression.
OParserListener.prototype.enterIsATypeExpression = ctx => {
};

// Exit a parse tree produced by OParser#IsATypeExpression.
OParserListener.prototype.exitIsATypeExpression = ctx => {
};


// Enter a parse tree produced by OParser#IsOtherExpression.
OParserListener.prototype.enterIsOtherExpression = ctx => {
};

// Exit a parse tree produced by OParser#IsOtherExpression.
OParserListener.prototype.exitIsOtherExpression = ctx => {
};


// Enter a parse tree produced by OParser#ArrowExpressionBody.
OParserListener.prototype.enterArrowExpressionBody = ctx => {
};

// Exit a parse tree produced by OParser#ArrowExpressionBody.
OParserListener.prototype.exitArrowExpressionBody = ctx => {
};


// Enter a parse tree produced by OParser#ArrowStatementsBody.
OParserListener.prototype.enterArrowStatementsBody = ctx => {
};

// Exit a parse tree produced by OParser#ArrowStatementsBody.
OParserListener.prototype.exitArrowStatementsBody = ctx => {
};


// Enter a parse tree produced by OParser#arrow_prefix.
OParserListener.prototype.enterArrow_prefix = ctx => {
};

// Exit a parse tree produced by OParser#arrow_prefix.
OParserListener.prototype.exitArrow_prefix = ctx => {
};


// Enter a parse tree produced by OParser#ArrowSingleArg.
OParserListener.prototype.enterArrowSingleArg = ctx => {
};

// Exit a parse tree produced by OParser#ArrowSingleArg.
OParserListener.prototype.exitArrowSingleArg = ctx => {
};


// Enter a parse tree produced by OParser#ArrowListArg.
OParserListener.prototype.enterArrowListArg = ctx => {
};

// Exit a parse tree produced by OParser#ArrowListArg.
OParserListener.prototype.exitArrowListArg = ctx => {
};


// Enter a parse tree produced by OParser#sorted_key.
OParserListener.prototype.enterSorted_key = ctx => {
};

// Exit a parse tree produced by OParser#sorted_key.
OParserListener.prototype.exitSorted_key = ctx => {
};


// Enter a parse tree produced by OParser#read_blob_expression.
OParserListener.prototype.enterRead_blob_expression = ctx => {
};

// Exit a parse tree produced by OParser#read_blob_expression.
OParserListener.prototype.exitRead_blob_expression = ctx => {
};


// Enter a parse tree produced by OParser#read_all_expression.
OParserListener.prototype.enterRead_all_expression = ctx => {
};

// Exit a parse tree produced by OParser#read_all_expression.
OParserListener.prototype.exitRead_all_expression = ctx => {
};


// Enter a parse tree produced by OParser#read_one_expression.
OParserListener.prototype.enterRead_one_expression = ctx => {
};

// Exit a parse tree produced by OParser#read_one_expression.
OParserListener.prototype.exitRead_one_expression = ctx => {
};


// Enter a parse tree produced by OParser#order_by_list.
OParserListener.prototype.enterOrder_by_list = ctx => {
};

// Exit a parse tree produced by OParser#order_by_list.
OParserListener.prototype.exitOrder_by_list = ctx => {
};


// Enter a parse tree produced by OParser#order_by.
OParserListener.prototype.enterOrder_by = ctx => {
};

// Exit a parse tree produced by OParser#order_by.
OParserListener.prototype.exitOrder_by = ctx => {
};


// Enter a parse tree produced by OParser#OperatorPlus.
OParserListener.prototype.enterOperatorPlus = ctx => {
};

// Exit a parse tree produced by OParser#OperatorPlus.
OParserListener.prototype.exitOperatorPlus = ctx => {
};


// Enter a parse tree produced by OParser#OperatorMinus.
OParserListener.prototype.enterOperatorMinus = ctx => {
};

// Exit a parse tree produced by OParser#OperatorMinus.
OParserListener.prototype.exitOperatorMinus = ctx => {
};


// Enter a parse tree produced by OParser#OperatorMultiply.
OParserListener.prototype.enterOperatorMultiply = ctx => {
};

// Exit a parse tree produced by OParser#OperatorMultiply.
OParserListener.prototype.exitOperatorMultiply = ctx => {
};


// Enter a parse tree produced by OParser#OperatorDivide.
OParserListener.prototype.enterOperatorDivide = ctx => {
};

// Exit a parse tree produced by OParser#OperatorDivide.
OParserListener.prototype.exitOperatorDivide = ctx => {
};


// Enter a parse tree produced by OParser#OperatorIDivide.
OParserListener.prototype.enterOperatorIDivide = ctx => {
};

// Exit a parse tree produced by OParser#OperatorIDivide.
OParserListener.prototype.exitOperatorIDivide = ctx => {
};


// Enter a parse tree produced by OParser#OperatorModulo.
OParserListener.prototype.enterOperatorModulo = ctx => {
};

// Exit a parse tree produced by OParser#OperatorModulo.
OParserListener.prototype.exitOperatorModulo = ctx => {
};


// Enter a parse tree produced by OParser#keyword.
OParserListener.prototype.enterKeyword = ctx => {
};

// Exit a parse tree produced by OParser#keyword.
OParserListener.prototype.exitKeyword = ctx => {
};


// Enter a parse tree produced by OParser#new_token.
OParserListener.prototype.enterNew_token = ctx => {
};

// Exit a parse tree produced by OParser#new_token.
OParserListener.prototype.exitNew_token = ctx => {
};


// Enter a parse tree produced by OParser#key_token.
OParserListener.prototype.enterKey_token = ctx => {
};

// Exit a parse tree produced by OParser#key_token.
OParserListener.prototype.exitKey_token = ctx => {
};


// Enter a parse tree produced by OParser#module_token.
OParserListener.prototype.enterModule_token = ctx => {
};

// Exit a parse tree produced by OParser#module_token.
OParserListener.prototype.exitModule_token = ctx => {
};


// Enter a parse tree produced by OParser#value_token.
OParserListener.prototype.enterValue_token = ctx => {
};

// Exit a parse tree produced by OParser#value_token.
OParserListener.prototype.exitValue_token = ctx => {
};


// Enter a parse tree produced by OParser#symbols_token.
OParserListener.prototype.enterSymbols_token = ctx => {
};

// Exit a parse tree produced by OParser#symbols_token.
OParserListener.prototype.exitSymbols_token = ctx => {
};


// Enter a parse tree produced by OParser#assign.
OParserListener.prototype.enterAssign = ctx => {
};

// Exit a parse tree produced by OParser#assign.
OParserListener.prototype.exitAssign = ctx => {
};


// Enter a parse tree produced by OParser#multiply.
OParserListener.prototype.enterMultiply = ctx => {
};

// Exit a parse tree produced by OParser#multiply.
OParserListener.prototype.exitMultiply = ctx => {
};


// Enter a parse tree produced by OParser#divide.
OParserListener.prototype.enterDivide = ctx => {
};

// Exit a parse tree produced by OParser#divide.
OParserListener.prototype.exitDivide = ctx => {
};


// Enter a parse tree produced by OParser#idivide.
OParserListener.prototype.enterIdivide = ctx => {
};

// Exit a parse tree produced by OParser#idivide.
OParserListener.prototype.exitIdivide = ctx => {
};


// Enter a parse tree produced by OParser#modulo.
OParserListener.prototype.enterModulo = ctx => {
};

// Exit a parse tree produced by OParser#modulo.
OParserListener.prototype.exitModulo = ctx => {
};


// Enter a parse tree produced by OParser#lfs.
OParserListener.prototype.enterLfs = ctx => {
};

// Exit a parse tree produced by OParser#lfs.
OParserListener.prototype.exitLfs = ctx => {
};


// Enter a parse tree produced by OParser#lfp.
OParserListener.prototype.enterLfp = ctx => {
};

// Exit a parse tree produced by OParser#lfp.
OParserListener.prototype.exitLfp = ctx => {
};


// Enter a parse tree produced by OParser#JavascriptReturnStatement.
OParserListener.prototype.enterJavascriptReturnStatement = ctx => {
};

// Exit a parse tree produced by OParser#JavascriptReturnStatement.
OParserListener.prototype.exitJavascriptReturnStatement = ctx => {
};


// Enter a parse tree produced by OParser#JavascriptStatement.
OParserListener.prototype.enterJavascriptStatement = ctx => {
};

// Exit a parse tree produced by OParser#JavascriptStatement.
OParserListener.prototype.exitJavascriptStatement = ctx => {
};


// Enter a parse tree produced by OParser#JavascriptSelectorExpression.
OParserListener.prototype.enterJavascriptSelectorExpression = ctx => {
};

// Exit a parse tree produced by OParser#JavascriptSelectorExpression.
OParserListener.prototype.exitJavascriptSelectorExpression = ctx => {
};


// Enter a parse tree produced by OParser#JavascriptPrimaryExpression.
OParserListener.prototype.enterJavascriptPrimaryExpression = ctx => {
};

// Exit a parse tree produced by OParser#JavascriptPrimaryExpression.
OParserListener.prototype.exitJavascriptPrimaryExpression = ctx => {
};


// Enter a parse tree produced by OParser#javascript_primary_expression.
OParserListener.prototype.enterJavascript_primary_expression = ctx => {
};

// Exit a parse tree produced by OParser#javascript_primary_expression.
OParserListener.prototype.exitJavascript_primary_expression = ctx => {
};


// Enter a parse tree produced by OParser#javascript_this_expression.
OParserListener.prototype.enterJavascript_this_expression = ctx => {
};

// Exit a parse tree produced by OParser#javascript_this_expression.
OParserListener.prototype.exitJavascript_this_expression = ctx => {
};


// Enter a parse tree produced by OParser#javascript_new_expression.
OParserListener.prototype.enterJavascript_new_expression = ctx => {
};

// Exit a parse tree produced by OParser#javascript_new_expression.
OParserListener.prototype.exitJavascript_new_expression = ctx => {
};


// Enter a parse tree produced by OParser#JavaScriptMethodExpression.
OParserListener.prototype.enterJavaScriptMethodExpression = ctx => {
};

// Exit a parse tree produced by OParser#JavaScriptMethodExpression.
OParserListener.prototype.exitJavaScriptMethodExpression = ctx => {
};


// Enter a parse tree produced by OParser#JavaScriptMemberExpression.
OParserListener.prototype.enterJavaScriptMemberExpression = ctx => {
};

// Exit a parse tree produced by OParser#JavaScriptMemberExpression.
OParserListener.prototype.exitJavaScriptMemberExpression = ctx => {
};


// Enter a parse tree produced by OParser#JavaScriptItemExpression.
OParserListener.prototype.enterJavaScriptItemExpression = ctx => {
};

// Exit a parse tree produced by OParser#JavaScriptItemExpression.
OParserListener.prototype.exitJavaScriptItemExpression = ctx => {
};


// Enter a parse tree produced by OParser#javascript_method_expression.
OParserListener.prototype.enterJavascript_method_expression = ctx => {
};

// Exit a parse tree produced by OParser#javascript_method_expression.
OParserListener.prototype.exitJavascript_method_expression = ctx => {
};


// Enter a parse tree produced by OParser#JavascriptArgumentList.
OParserListener.prototype.enterJavascriptArgumentList = ctx => {
};

// Exit a parse tree produced by OParser#JavascriptArgumentList.
OParserListener.prototype.exitJavascriptArgumentList = ctx => {
};


// Enter a parse tree produced by OParser#JavascriptArgumentListItem.
OParserListener.prototype.enterJavascriptArgumentListItem = ctx => {
};

// Exit a parse tree produced by OParser#JavascriptArgumentListItem.
OParserListener.prototype.exitJavascriptArgumentListItem = ctx => {
};


// Enter a parse tree produced by OParser#javascript_item_expression.
OParserListener.prototype.enterJavascript_item_expression = ctx => {
};

// Exit a parse tree produced by OParser#javascript_item_expression.
OParserListener.prototype.exitJavascript_item_expression = ctx => {
};


// Enter a parse tree produced by OParser#javascript_parenthesis_expression.
OParserListener.prototype.enterJavascript_parenthesis_expression = ctx => {
};

// Exit a parse tree produced by OParser#javascript_parenthesis_expression.
OParserListener.prototype.exitJavascript_parenthesis_expression = ctx => {
};


// Enter a parse tree produced by OParser#javascript_identifier_expression.
OParserListener.prototype.enterJavascript_identifier_expression = ctx => {
};

// Exit a parse tree produced by OParser#javascript_identifier_expression.
OParserListener.prototype.exitJavascript_identifier_expression = ctx => {
};


// Enter a parse tree produced by OParser#JavascriptIntegerLiteral.
OParserListener.prototype.enterJavascriptIntegerLiteral = ctx => {
};

// Exit a parse tree produced by OParser#JavascriptIntegerLiteral.
OParserListener.prototype.exitJavascriptIntegerLiteral = ctx => {
};


// Enter a parse tree produced by OParser#JavascriptDecimalLiteral.
OParserListener.prototype.enterJavascriptDecimalLiteral = ctx => {
};

// Exit a parse tree produced by OParser#JavascriptDecimalLiteral.
OParserListener.prototype.exitJavascriptDecimalLiteral = ctx => {
};


// Enter a parse tree produced by OParser#JavascriptTextLiteral.
OParserListener.prototype.enterJavascriptTextLiteral = ctx => {
};

// Exit a parse tree produced by OParser#JavascriptTextLiteral.
OParserListener.prototype.exitJavascriptTextLiteral = ctx => {
};


// Enter a parse tree produced by OParser#JavascriptBooleanLiteral.
OParserListener.prototype.enterJavascriptBooleanLiteral = ctx => {
};

// Exit a parse tree produced by OParser#JavascriptBooleanLiteral.
OParserListener.prototype.exitJavascriptBooleanLiteral = ctx => {
};


// Enter a parse tree produced by OParser#JavascriptCharacterLiteral.
OParserListener.prototype.enterJavascriptCharacterLiteral = ctx => {
};

// Exit a parse tree produced by OParser#JavascriptCharacterLiteral.
OParserListener.prototype.exitJavascriptCharacterLiteral = ctx => {
};


// Enter a parse tree produced by OParser#javascript_identifier.
OParserListener.prototype.enterJavascript_identifier = ctx => {
};

// Exit a parse tree produced by OParser#javascript_identifier.
OParserListener.prototype.exitJavascript_identifier = ctx => {
};


// Enter a parse tree produced by OParser#PythonReturnStatement.
OParserListener.prototype.enterPythonReturnStatement = ctx => {
};

// Exit a parse tree produced by OParser#PythonReturnStatement.
OParserListener.prototype.exitPythonReturnStatement = ctx => {
};


// Enter a parse tree produced by OParser#PythonStatement.
OParserListener.prototype.enterPythonStatement = ctx => {
};

// Exit a parse tree produced by OParser#PythonStatement.
OParserListener.prototype.exitPythonStatement = ctx => {
};


// Enter a parse tree produced by OParser#PythonSelectorExpression.
OParserListener.prototype.enterPythonSelectorExpression = ctx => {
};

// Exit a parse tree produced by OParser#PythonSelectorExpression.
OParserListener.prototype.exitPythonSelectorExpression = ctx => {
};


// Enter a parse tree produced by OParser#PythonPrimaryExpression.
OParserListener.prototype.enterPythonPrimaryExpression = ctx => {
};

// Exit a parse tree produced by OParser#PythonPrimaryExpression.
OParserListener.prototype.exitPythonPrimaryExpression = ctx => {
};


// Enter a parse tree produced by OParser#PythonSelfExpression.
OParserListener.prototype.enterPythonSelfExpression = ctx => {
};

// Exit a parse tree produced by OParser#PythonSelfExpression.
OParserListener.prototype.exitPythonSelfExpression = ctx => {
};


// Enter a parse tree produced by OParser#PythonParenthesisExpression.
OParserListener.prototype.enterPythonParenthesisExpression = ctx => {
};

// Exit a parse tree produced by OParser#PythonParenthesisExpression.
OParserListener.prototype.exitPythonParenthesisExpression = ctx => {
};


// Enter a parse tree produced by OParser#PythonIdentifierExpression.
OParserListener.prototype.enterPythonIdentifierExpression = ctx => {
};

// Exit a parse tree produced by OParser#PythonIdentifierExpression.
OParserListener.prototype.exitPythonIdentifierExpression = ctx => {
};


// Enter a parse tree produced by OParser#PythonLiteralExpression.
OParserListener.prototype.enterPythonLiteralExpression = ctx => {
};

// Exit a parse tree produced by OParser#PythonLiteralExpression.
OParserListener.prototype.exitPythonLiteralExpression = ctx => {
};


// Enter a parse tree produced by OParser#PythonGlobalMethodExpression.
OParserListener.prototype.enterPythonGlobalMethodExpression = ctx => {
};

// Exit a parse tree produced by OParser#PythonGlobalMethodExpression.
OParserListener.prototype.exitPythonGlobalMethodExpression = ctx => {
};


// Enter a parse tree produced by OParser#python_self_expression.
OParserListener.prototype.enterPython_self_expression = ctx => {
};

// Exit a parse tree produced by OParser#python_self_expression.
OParserListener.prototype.exitPython_self_expression = ctx => {
};


// Enter a parse tree produced by OParser#PythonMethodExpression.
OParserListener.prototype.enterPythonMethodExpression = ctx => {
};

// Exit a parse tree produced by OParser#PythonMethodExpression.
OParserListener.prototype.exitPythonMethodExpression = ctx => {
};


// Enter a parse tree produced by OParser#PythonItemExpression.
OParserListener.prototype.enterPythonItemExpression = ctx => {
};

// Exit a parse tree produced by OParser#PythonItemExpression.
OParserListener.prototype.exitPythonItemExpression = ctx => {
};


// Enter a parse tree produced by OParser#python_method_expression.
OParserListener.prototype.enterPython_method_expression = ctx => {
};

// Exit a parse tree produced by OParser#python_method_expression.
OParserListener.prototype.exitPython_method_expression = ctx => {
};


// Enter a parse tree produced by OParser#PythonOrdinalOnlyArgumentList.
OParserListener.prototype.enterPythonOrdinalOnlyArgumentList = ctx => {
};

// Exit a parse tree produced by OParser#PythonOrdinalOnlyArgumentList.
OParserListener.prototype.exitPythonOrdinalOnlyArgumentList = ctx => {
};


// Enter a parse tree produced by OParser#PythonNamedOnlyArgumentList.
OParserListener.prototype.enterPythonNamedOnlyArgumentList = ctx => {
};

// Exit a parse tree produced by OParser#PythonNamedOnlyArgumentList.
OParserListener.prototype.exitPythonNamedOnlyArgumentList = ctx => {
};


// Enter a parse tree produced by OParser#PythonArgumentList.
OParserListener.prototype.enterPythonArgumentList = ctx => {
};

// Exit a parse tree produced by OParser#PythonArgumentList.
OParserListener.prototype.exitPythonArgumentList = ctx => {
};


// Enter a parse tree produced by OParser#PythonOrdinalArgumentList.
OParserListener.prototype.enterPythonOrdinalArgumentList = ctx => {
};

// Exit a parse tree produced by OParser#PythonOrdinalArgumentList.
OParserListener.prototype.exitPythonOrdinalArgumentList = ctx => {
};


// Enter a parse tree produced by OParser#PythonOrdinalArgumentListItem.
OParserListener.prototype.enterPythonOrdinalArgumentListItem = ctx => {
};

// Exit a parse tree produced by OParser#PythonOrdinalArgumentListItem.
OParserListener.prototype.exitPythonOrdinalArgumentListItem = ctx => {
};


// Enter a parse tree produced by OParser#PythonNamedArgumentList.
OParserListener.prototype.enterPythonNamedArgumentList = ctx => {
};

// Exit a parse tree produced by OParser#PythonNamedArgumentList.
OParserListener.prototype.exitPythonNamedArgumentList = ctx => {
};


// Enter a parse tree produced by OParser#PythonNamedArgumentListItem.
OParserListener.prototype.enterPythonNamedArgumentListItem = ctx => {
};

// Exit a parse tree produced by OParser#PythonNamedArgumentListItem.
OParserListener.prototype.exitPythonNamedArgumentListItem = ctx => {
};


// Enter a parse tree produced by OParser#python_parenthesis_expression.
OParserListener.prototype.enterPython_parenthesis_expression = ctx => {
};

// Exit a parse tree produced by OParser#python_parenthesis_expression.
OParserListener.prototype.exitPython_parenthesis_expression = ctx => {
};


// Enter a parse tree produced by OParser#PythonChildIdentifier.
OParserListener.prototype.enterPythonChildIdentifier = ctx => {
};

// Exit a parse tree produced by OParser#PythonChildIdentifier.
OParserListener.prototype.exitPythonChildIdentifier = ctx => {
};


// Enter a parse tree produced by OParser#PythonPromptoIdentifier.
OParserListener.prototype.enterPythonPromptoIdentifier = ctx => {
};

// Exit a parse tree produced by OParser#PythonPromptoIdentifier.
OParserListener.prototype.exitPythonPromptoIdentifier = ctx => {
};


// Enter a parse tree produced by OParser#PythonIdentifier.
OParserListener.prototype.enterPythonIdentifier = ctx => {
};

// Exit a parse tree produced by OParser#PythonIdentifier.
OParserListener.prototype.exitPythonIdentifier = ctx => {
};


// Enter a parse tree produced by OParser#PythonIntegerLiteral.
OParserListener.prototype.enterPythonIntegerLiteral = ctx => {
};

// Exit a parse tree produced by OParser#PythonIntegerLiteral.
OParserListener.prototype.exitPythonIntegerLiteral = ctx => {
};


// Enter a parse tree produced by OParser#PythonDecimalLiteral.
OParserListener.prototype.enterPythonDecimalLiteral = ctx => {
};

// Exit a parse tree produced by OParser#PythonDecimalLiteral.
OParserListener.prototype.exitPythonDecimalLiteral = ctx => {
};


// Enter a parse tree produced by OParser#PythonTextLiteral.
OParserListener.prototype.enterPythonTextLiteral = ctx => {
};

// Exit a parse tree produced by OParser#PythonTextLiteral.
OParserListener.prototype.exitPythonTextLiteral = ctx => {
};


// Enter a parse tree produced by OParser#PythonBooleanLiteral.
OParserListener.prototype.enterPythonBooleanLiteral = ctx => {
};

// Exit a parse tree produced by OParser#PythonBooleanLiteral.
OParserListener.prototype.exitPythonBooleanLiteral = ctx => {
};


// Enter a parse tree produced by OParser#PythonCharacterLiteral.
OParserListener.prototype.enterPythonCharacterLiteral = ctx => {
};

// Exit a parse tree produced by OParser#PythonCharacterLiteral.
OParserListener.prototype.exitPythonCharacterLiteral = ctx => {
};


// Enter a parse tree produced by OParser#python_identifier.
OParserListener.prototype.enterPython_identifier = ctx => {
};

// Exit a parse tree produced by OParser#python_identifier.
OParserListener.prototype.exitPython_identifier = ctx => {
};


// Enter a parse tree produced by OParser#JavaReturnStatement.
OParserListener.prototype.enterJavaReturnStatement = ctx => {
};

// Exit a parse tree produced by OParser#JavaReturnStatement.
OParserListener.prototype.exitJavaReturnStatement = ctx => {
};


// Enter a parse tree produced by OParser#JavaStatement.
OParserListener.prototype.enterJavaStatement = ctx => {
};

// Exit a parse tree produced by OParser#JavaStatement.
OParserListener.prototype.exitJavaStatement = ctx => {
};


// Enter a parse tree produced by OParser#JavaSelectorExpression.
OParserListener.prototype.enterJavaSelectorExpression = ctx => {
};

// Exit a parse tree produced by OParser#JavaSelectorExpression.
OParserListener.prototype.exitJavaSelectorExpression = ctx => {
};


// Enter a parse tree produced by OParser#JavaPrimaryExpression.
OParserListener.prototype.enterJavaPrimaryExpression = ctx => {
};

// Exit a parse tree produced by OParser#JavaPrimaryExpression.
OParserListener.prototype.exitJavaPrimaryExpression = ctx => {
};


// Enter a parse tree produced by OParser#java_primary_expression.
OParserListener.prototype.enterJava_primary_expression = ctx => {
};

// Exit a parse tree produced by OParser#java_primary_expression.
OParserListener.prototype.exitJava_primary_expression = ctx => {
};


// Enter a parse tree produced by OParser#java_this_expression.
OParserListener.prototype.enterJava_this_expression = ctx => {
};

// Exit a parse tree produced by OParser#java_this_expression.
OParserListener.prototype.exitJava_this_expression = ctx => {
};


// Enter a parse tree produced by OParser#java_new_expression.
OParserListener.prototype.enterJava_new_expression = ctx => {
};

// Exit a parse tree produced by OParser#java_new_expression.
OParserListener.prototype.exitJava_new_expression = ctx => {
};


// Enter a parse tree produced by OParser#JavaMethodExpression.
OParserListener.prototype.enterJavaMethodExpression = ctx => {
};

// Exit a parse tree produced by OParser#JavaMethodExpression.
OParserListener.prototype.exitJavaMethodExpression = ctx => {
};


// Enter a parse tree produced by OParser#JavaItemExpression.
OParserListener.prototype.enterJavaItemExpression = ctx => {
};

// Exit a parse tree produced by OParser#JavaItemExpression.
OParserListener.prototype.exitJavaItemExpression = ctx => {
};


// Enter a parse tree produced by OParser#java_method_expression.
OParserListener.prototype.enterJava_method_expression = ctx => {
};

// Exit a parse tree produced by OParser#java_method_expression.
OParserListener.prototype.exitJava_method_expression = ctx => {
};


// Enter a parse tree produced by OParser#JavaArgumentListItem.
OParserListener.prototype.enterJavaArgumentListItem = ctx => {
};

// Exit a parse tree produced by OParser#JavaArgumentListItem.
OParserListener.prototype.exitJavaArgumentListItem = ctx => {
};


// Enter a parse tree produced by OParser#JavaArgumentList.
OParserListener.prototype.enterJavaArgumentList = ctx => {
};

// Exit a parse tree produced by OParser#JavaArgumentList.
OParserListener.prototype.exitJavaArgumentList = ctx => {
};


// Enter a parse tree produced by OParser#java_item_expression.
OParserListener.prototype.enterJava_item_expression = ctx => {
};

// Exit a parse tree produced by OParser#java_item_expression.
OParserListener.prototype.exitJava_item_expression = ctx => {
};


// Enter a parse tree produced by OParser#java_parenthesis_expression.
OParserListener.prototype.enterJava_parenthesis_expression = ctx => {
};

// Exit a parse tree produced by OParser#java_parenthesis_expression.
OParserListener.prototype.exitJava_parenthesis_expression = ctx => {
};


// Enter a parse tree produced by OParser#JavaIdentifier.
OParserListener.prototype.enterJavaIdentifier = ctx => {
};

// Exit a parse tree produced by OParser#JavaIdentifier.
OParserListener.prototype.exitJavaIdentifier = ctx => {
};


// Enter a parse tree produced by OParser#JavaChildIdentifier.
OParserListener.prototype.enterJavaChildIdentifier = ctx => {
};

// Exit a parse tree produced by OParser#JavaChildIdentifier.
OParserListener.prototype.exitJavaChildIdentifier = ctx => {
};


// Enter a parse tree produced by OParser#JavaClassIdentifier.
OParserListener.prototype.enterJavaClassIdentifier = ctx => {
};

// Exit a parse tree produced by OParser#JavaClassIdentifier.
OParserListener.prototype.exitJavaClassIdentifier = ctx => {
};


// Enter a parse tree produced by OParser#JavaChildClassIdentifier.
OParserListener.prototype.enterJavaChildClassIdentifier = ctx => {
};

// Exit a parse tree produced by OParser#JavaChildClassIdentifier.
OParserListener.prototype.exitJavaChildClassIdentifier = ctx => {
};


// Enter a parse tree produced by OParser#JavaIntegerLiteral.
OParserListener.prototype.enterJavaIntegerLiteral = ctx => {
};

// Exit a parse tree produced by OParser#JavaIntegerLiteral.
OParserListener.prototype.exitJavaIntegerLiteral = ctx => {
};


// Enter a parse tree produced by OParser#JavaDecimalLiteral.
OParserListener.prototype.enterJavaDecimalLiteral = ctx => {
};

// Exit a parse tree produced by OParser#JavaDecimalLiteral.
OParserListener.prototype.exitJavaDecimalLiteral = ctx => {
};


// Enter a parse tree produced by OParser#JavaTextLiteral.
OParserListener.prototype.enterJavaTextLiteral = ctx => {
};

// Exit a parse tree produced by OParser#JavaTextLiteral.
OParserListener.prototype.exitJavaTextLiteral = ctx => {
};


// Enter a parse tree produced by OParser#JavaBooleanLiteral.
OParserListener.prototype.enterJavaBooleanLiteral = ctx => {
};

// Exit a parse tree produced by OParser#JavaBooleanLiteral.
OParserListener.prototype.exitJavaBooleanLiteral = ctx => {
};


// Enter a parse tree produced by OParser#JavaCharacterLiteral.
OParserListener.prototype.enterJavaCharacterLiteral = ctx => {
};

// Exit a parse tree produced by OParser#JavaCharacterLiteral.
OParserListener.prototype.exitJavaCharacterLiteral = ctx => {
};


// Enter a parse tree produced by OParser#java_identifier.
OParserListener.prototype.enterJava_identifier = ctx => {
};

// Exit a parse tree produced by OParser#java_identifier.
OParserListener.prototype.exitJava_identifier = ctx => {
};


// Enter a parse tree produced by OParser#CSharpReturnStatement.
OParserListener.prototype.enterCSharpReturnStatement = ctx => {
};

// Exit a parse tree produced by OParser#CSharpReturnStatement.
OParserListener.prototype.exitCSharpReturnStatement = ctx => {
};


// Enter a parse tree produced by OParser#CSharpStatement.
OParserListener.prototype.enterCSharpStatement = ctx => {
};

// Exit a parse tree produced by OParser#CSharpStatement.
OParserListener.prototype.exitCSharpStatement = ctx => {
};


// Enter a parse tree produced by OParser#CSharpSelectorExpression.
OParserListener.prototype.enterCSharpSelectorExpression = ctx => {
};

// Exit a parse tree produced by OParser#CSharpSelectorExpression.
OParserListener.prototype.exitCSharpSelectorExpression = ctx => {
};


// Enter a parse tree produced by OParser#CSharpPrimaryExpression.
OParserListener.prototype.enterCSharpPrimaryExpression = ctx => {
};

// Exit a parse tree produced by OParser#CSharpPrimaryExpression.
OParserListener.prototype.exitCSharpPrimaryExpression = ctx => {
};


// Enter a parse tree produced by OParser#csharp_primary_expression.
OParserListener.prototype.enterCsharp_primary_expression = ctx => {
};

// Exit a parse tree produced by OParser#csharp_primary_expression.
OParserListener.prototype.exitCsharp_primary_expression = ctx => {
};


// Enter a parse tree produced by OParser#csharp_this_expression.
OParserListener.prototype.enterCsharp_this_expression = ctx => {
};

// Exit a parse tree produced by OParser#csharp_this_expression.
OParserListener.prototype.exitCsharp_this_expression = ctx => {
};


// Enter a parse tree produced by OParser#csharp_new_expression.
OParserListener.prototype.enterCsharp_new_expression = ctx => {
};

// Exit a parse tree produced by OParser#csharp_new_expression.
OParserListener.prototype.exitCsharp_new_expression = ctx => {
};


// Enter a parse tree produced by OParser#CSharpMethodExpression.
OParserListener.prototype.enterCSharpMethodExpression = ctx => {
};

// Exit a parse tree produced by OParser#CSharpMethodExpression.
OParserListener.prototype.exitCSharpMethodExpression = ctx => {
};


// Enter a parse tree produced by OParser#CSharpItemExpression.
OParserListener.prototype.enterCSharpItemExpression = ctx => {
};

// Exit a parse tree produced by OParser#CSharpItemExpression.
OParserListener.prototype.exitCSharpItemExpression = ctx => {
};


// Enter a parse tree produced by OParser#csharp_method_expression.
OParserListener.prototype.enterCsharp_method_expression = ctx => {
};

// Exit a parse tree produced by OParser#csharp_method_expression.
OParserListener.prototype.exitCsharp_method_expression = ctx => {
};


// Enter a parse tree produced by OParser#CSharpArgumentList.
OParserListener.prototype.enterCSharpArgumentList = ctx => {
};

// Exit a parse tree produced by OParser#CSharpArgumentList.
OParserListener.prototype.exitCSharpArgumentList = ctx => {
};


// Enter a parse tree produced by OParser#CSharpArgumentListItem.
OParserListener.prototype.enterCSharpArgumentListItem = ctx => {
};

// Exit a parse tree produced by OParser#CSharpArgumentListItem.
OParserListener.prototype.exitCSharpArgumentListItem = ctx => {
};


// Enter a parse tree produced by OParser#csharp_item_expression.
OParserListener.prototype.enterCsharp_item_expression = ctx => {
};

// Exit a parse tree produced by OParser#csharp_item_expression.
OParserListener.prototype.exitCsharp_item_expression = ctx => {
};


// Enter a parse tree produced by OParser#csharp_parenthesis_expression.
OParserListener.prototype.enterCsharp_parenthesis_expression = ctx => {
};

// Exit a parse tree produced by OParser#csharp_parenthesis_expression.
OParserListener.prototype.exitCsharp_parenthesis_expression = ctx => {
};


// Enter a parse tree produced by OParser#CSharpIdentifier.
OParserListener.prototype.enterCSharpIdentifier = ctx => {
};

// Exit a parse tree produced by OParser#CSharpIdentifier.
OParserListener.prototype.exitCSharpIdentifier = ctx => {
};


// Enter a parse tree produced by OParser#CSharpChildIdentifier.
OParserListener.prototype.enterCSharpChildIdentifier = ctx => {
};

// Exit a parse tree produced by OParser#CSharpChildIdentifier.
OParserListener.prototype.exitCSharpChildIdentifier = ctx => {
};


// Enter a parse tree produced by OParser#CSharpPromptoIdentifier.
OParserListener.prototype.enterCSharpPromptoIdentifier = ctx => {
};

// Exit a parse tree produced by OParser#CSharpPromptoIdentifier.
OParserListener.prototype.exitCSharpPromptoIdentifier = ctx => {
};


// Enter a parse tree produced by OParser#CSharpIntegerLiteral.
OParserListener.prototype.enterCSharpIntegerLiteral = ctx => {
};

// Exit a parse tree produced by OParser#CSharpIntegerLiteral.
OParserListener.prototype.exitCSharpIntegerLiteral = ctx => {
};


// Enter a parse tree produced by OParser#CSharpDecimalLiteral.
OParserListener.prototype.enterCSharpDecimalLiteral = ctx => {
};

// Exit a parse tree produced by OParser#CSharpDecimalLiteral.
OParserListener.prototype.exitCSharpDecimalLiteral = ctx => {
};


// Enter a parse tree produced by OParser#CSharpTextLiteral.
OParserListener.prototype.enterCSharpTextLiteral = ctx => {
};

// Exit a parse tree produced by OParser#CSharpTextLiteral.
OParserListener.prototype.exitCSharpTextLiteral = ctx => {
};


// Enter a parse tree produced by OParser#CSharpBooleanLiteral.
OParserListener.prototype.enterCSharpBooleanLiteral = ctx => {
};

// Exit a parse tree produced by OParser#CSharpBooleanLiteral.
OParserListener.prototype.exitCSharpBooleanLiteral = ctx => {
};


// Enter a parse tree produced by OParser#CSharpCharacterLiteral.
OParserListener.prototype.enterCSharpCharacterLiteral = ctx => {
};

// Exit a parse tree produced by OParser#CSharpCharacterLiteral.
OParserListener.prototype.exitCSharpCharacterLiteral = ctx => {
};


// Enter a parse tree produced by OParser#csharp_identifier.
OParserListener.prototype.enterCsharp_identifier = ctx => {
};

// Exit a parse tree produced by OParser#csharp_identifier.
OParserListener.prototype.exitCsharp_identifier = ctx => {
};


// Enter a parse tree produced by OParser#jsx_expression.
OParserListener.prototype.enterJsx_expression = ctx => {
};

// Exit a parse tree produced by OParser#jsx_expression.
OParserListener.prototype.exitJsx_expression = ctx => {
};


// Enter a parse tree produced by OParser#JsxSelfClosing.
OParserListener.prototype.enterJsxSelfClosing = ctx => {
};

// Exit a parse tree produced by OParser#JsxSelfClosing.
OParserListener.prototype.exitJsxSelfClosing = ctx => {
};


// Enter a parse tree produced by OParser#JsxElement.
OParserListener.prototype.enterJsxElement = ctx => {
};

// Exit a parse tree produced by OParser#JsxElement.
OParserListener.prototype.exitJsxElement = ctx => {
};


// Enter a parse tree produced by OParser#jsx_fragment.
OParserListener.prototype.enterJsx_fragment = ctx => {
};

// Exit a parse tree produced by OParser#jsx_fragment.
OParserListener.prototype.exitJsx_fragment = ctx => {
};


// Enter a parse tree produced by OParser#jsx_fragment_start.
OParserListener.prototype.enterJsx_fragment_start = ctx => {
};

// Exit a parse tree produced by OParser#jsx_fragment_start.
OParserListener.prototype.exitJsx_fragment_start = ctx => {
};


// Enter a parse tree produced by OParser#jsx_fragment_end.
OParserListener.prototype.enterJsx_fragment_end = ctx => {
};

// Exit a parse tree produced by OParser#jsx_fragment_end.
OParserListener.prototype.exitJsx_fragment_end = ctx => {
};


// Enter a parse tree produced by OParser#jsx_self_closing.
OParserListener.prototype.enterJsx_self_closing = ctx => {
};

// Exit a parse tree produced by OParser#jsx_self_closing.
OParserListener.prototype.exitJsx_self_closing = ctx => {
};


// Enter a parse tree produced by OParser#jsx_opening.
OParserListener.prototype.enterJsx_opening = ctx => {
};

// Exit a parse tree produced by OParser#jsx_opening.
OParserListener.prototype.exitJsx_opening = ctx => {
};


// Enter a parse tree produced by OParser#jsx_closing.
OParserListener.prototype.enterJsx_closing = ctx => {
};

// Exit a parse tree produced by OParser#jsx_closing.
OParserListener.prototype.exitJsx_closing = ctx => {
};


// Enter a parse tree produced by OParser#jsx_element_name.
OParserListener.prototype.enterJsx_element_name = ctx => {
};

// Exit a parse tree produced by OParser#jsx_element_name.
OParserListener.prototype.exitJsx_element_name = ctx => {
};


// Enter a parse tree produced by OParser#jsx_identifier.
OParserListener.prototype.enterJsx_identifier = ctx => {
};

// Exit a parse tree produced by OParser#jsx_identifier.
OParserListener.prototype.exitJsx_identifier = ctx => {
};


// Enter a parse tree produced by OParser#jsx_attribute.
OParserListener.prototype.enterJsx_attribute = ctx => {
};

// Exit a parse tree produced by OParser#jsx_attribute.
OParserListener.prototype.exitJsx_attribute = ctx => {
};


// Enter a parse tree produced by OParser#JsxLiteral.
OParserListener.prototype.enterJsxLiteral = ctx => {
};

// Exit a parse tree produced by OParser#JsxLiteral.
OParserListener.prototype.exitJsxLiteral = ctx => {
};


// Enter a parse tree produced by OParser#JsxValue.
OParserListener.prototype.enterJsxValue = ctx => {
};

// Exit a parse tree produced by OParser#JsxValue.
OParserListener.prototype.exitJsxValue = ctx => {
};


// Enter a parse tree produced by OParser#jsx_children.
OParserListener.prototype.enterJsx_children = ctx => {
};

// Exit a parse tree produced by OParser#jsx_children.
OParserListener.prototype.exitJsx_children = ctx => {
};


// Enter a parse tree produced by OParser#JsxText.
OParserListener.prototype.enterJsxText = ctx => {
};

// Exit a parse tree produced by OParser#JsxText.
OParserListener.prototype.exitJsxText = ctx => {
};


// Enter a parse tree produced by OParser#JsxChild.
OParserListener.prototype.enterJsxChild = ctx => {
};

// Exit a parse tree produced by OParser#JsxChild.
OParserListener.prototype.exitJsxChild = ctx => {
};


// Enter a parse tree produced by OParser#JsxCode.
OParserListener.prototype.enterJsxCode = ctx => {
};

// Exit a parse tree produced by OParser#JsxCode.
OParserListener.prototype.exitJsxCode = ctx => {
};


// Enter a parse tree produced by OParser#jsx_text.
OParserListener.prototype.enterJsx_text = ctx => {
};

// Exit a parse tree produced by OParser#jsx_text.
OParserListener.prototype.exitJsx_text = ctx => {
};


// Enter a parse tree produced by OParser#jsx_char.
OParserListener.prototype.enterJsx_char = ctx => {
};

// Exit a parse tree produced by OParser#jsx_char.
OParserListener.prototype.exitJsx_char = ctx => {
};


// Enter a parse tree produced by OParser#css_expression.
OParserListener.prototype.enterCss_expression = ctx => {
};

// Exit a parse tree produced by OParser#css_expression.
OParserListener.prototype.exitCss_expression = ctx => {
};


// Enter a parse tree produced by OParser#css_field.
OParserListener.prototype.enterCss_field = ctx => {
};

// Exit a parse tree produced by OParser#css_field.
OParserListener.prototype.exitCss_field = ctx => {
};


// Enter a parse tree produced by OParser#css_identifier.
OParserListener.prototype.enterCss_identifier = ctx => {
};

// Exit a parse tree produced by OParser#css_identifier.
OParserListener.prototype.exitCss_identifier = ctx => {
};


// Enter a parse tree produced by OParser#CssValue.
OParserListener.prototype.enterCssValue = ctx => {
};

// Exit a parse tree produced by OParser#CssValue.
OParserListener.prototype.exitCssValue = ctx => {
};


// Enter a parse tree produced by OParser#CssText.
OParserListener.prototype.enterCssText = ctx => {
};

// Exit a parse tree produced by OParser#CssText.
OParserListener.prototype.exitCssText = ctx => {
};


// Enter a parse tree produced by OParser#css_text.
OParserListener.prototype.enterCss_text = ctx => {
};

// Exit a parse tree produced by OParser#css_text.
OParserListener.prototype.exitCss_text = ctx => {
};



export {OParserListener};