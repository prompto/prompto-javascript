var checkProblems = require("../../parser/BaseOParserTest").checkProblems;

test('AbstractCallback problems', () => {
	checkProblems('problems/abstractCallback.poc');
});

test('AbstractCategory problems', () => {
	checkProblems('problems/abstractCategory.poc');
});

test('AbstractMethod problems', () => {
	checkProblems('problems/abstractMethod.poc');
});

test('AbstractWidget problems', () => {
	checkProblems('problems/abstractWidget.poc');
});

test('AttributeCallback problems', () => {
	checkProblems('problems/attributeCallback.poc');
});

test('CallbackArgument problems', () => {
	checkProblems('problems/callbackArgument.poc');
});

test('CallbackList problems', () => {
	checkProblems('problems/callbackList.poc');
});

test('DeepAbstractCategory problems', () => {
	checkProblems('problems/deepAbstractCategory.poc');
});

test('DeepAbstractMethod problems', () => {
	checkProblems('problems/deepAbstractMethod.poc');
});

test('DeepAbstractWidget problems', () => {
	checkProblems('problems/deepAbstractWidget.poc');
});

test('DeepUnknownMethod problems', () => {
	checkProblems('problems/deepUnknownMethod.poc');
});

test('EmptyPropertyValue problems', () => {
	checkProblems('problems/emptyPropertyValue.poc');
});

test('IllegalAttributeType problems', () => {
	checkProblems('problems/illegalAttributeType.poc');
});

test('IllegalComparison problems', () => {
	checkProblems('problems/illegalComparison.poc');
});

test('IllegalItemType problems', () => {
	checkProblems('problems/illegalItemType.poc');
});

test('IllegalOperation problems', () => {
	checkProblems('problems/illegalOperation.poc');
});

test('MissingAttributeMember problems', () => {
	checkProblems('problems/missingAttributeMember.poc');
});

test('MissingAttributeName problems', () => {
	checkProblems('problems/missingAttributeName.poc');
});

test('MissingAttributeValue problems', () => {
	checkProblems('problems/missingAttributeValue.poc');
});

test('NoMatchingPrototype problems', () => {
	checkProblems('problems/noMatchingPrototype.poc');
});

test('SetReactState problems', () => {
	checkProblems('problems/setReactState.poc');
});

test('UnknownAttribute problems', () => {
	checkProblems('problems/unknownAttribute.poc');
});

test('UnknownAttributeParameter problems', () => {
	checkProblems('problems/unknownAttributeParameter.poc');
});

test('UnknownCastItemType problems', () => {
	checkProblems('problems/unknownCastItemType.poc');
});

test('UnknownCastType problems', () => {
	checkProblems('problems/unknownCastType.poc');
});

test('UnknownDictItemType problems', () => {
	checkProblems('problems/unknownDictItemType.poc');
});

test('UnknownIdentifier problems', () => {
	checkProblems('problems/unknownIdentifier.poc');
});

test('UnknownIdentifierMember problems', () => {
	checkProblems('problems/unknownIdentifierMember.poc');
});

test('UnknownItemType problems', () => {
	checkProblems('problems/unknownItemType.poc');
});

test('UnknownMemberMethod problems', () => {
	checkProblems('problems/unknownMemberMethod.poc');
});

test('UnknownMethod problems', () => {
	checkProblems('problems/unknownMethod.poc');
});

test('UnknownParameter problems', () => {
	checkProblems('problems/unknownParameter.poc');
});

test('UnknownParentType problems', () => {
	checkProblems('problems/unknownParentType.poc');
});

test('UnknownSymbol problems', () => {
	checkProblems('problems/unknownSymbol.poc');
});

test('UnknownType problems', () => {
	checkProblems('problems/unknownType.poc');
});

