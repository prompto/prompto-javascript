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

test('DeepAbstractCategory problems', () => {
	checkProblems('problems/deepAbstractCategory.poc');
});

test('DeepAbstractMethod problems', () => {
	checkProblems('problems/deepAbstractMethod.poc');
});

test('DeepUnknownMethod problems', () => {
	checkProblems('problems/deepUnknownMethod.poc');
});

test('NoMatchingPrototype problems', () => {
	checkProblems('problems/noMatchingPrototype.poc');
});

test('UnknownItemType problems', () => {
	checkProblems('problems/unknownItemType.poc');
});

test('UnknownMethod problems', () => {
	checkProblems('problems/unknownMethod.poc');
});

test('UnknownType problems', () => {
	checkProblems('problems/unknownType.poc');
});

