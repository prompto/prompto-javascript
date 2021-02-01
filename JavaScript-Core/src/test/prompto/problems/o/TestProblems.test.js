var checkProblems = require("../../parser/BaseOParserTest").checkProblems;

test('Abstract problems', () => {
	checkProblems('problems/abstract.poc');
});

test('DeepAbstract problems', () => {
	checkProblems('problems/deepAbstract.poc');
});

test('DeepUnknownMethod problems', () => {
	checkProblems('problems/deepUnknownMethod.poc');
});

test('UnknownMethod problems', () => {
	checkProblems('problems/unknownMethod.poc');
});

