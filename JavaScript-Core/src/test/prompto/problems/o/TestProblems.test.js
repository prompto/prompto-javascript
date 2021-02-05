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

test('NoMatchingPrototype problems', () => {
	checkProblems('problems/noMatchingPrototype.poc');
});

test('UnknownAttributeParameter problems', () => {
	checkProblems('problems/unknownAttributeParameter.poc');
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

test('UnknownType problems', () => {
	checkProblems('problems/unknownType.poc');
});

