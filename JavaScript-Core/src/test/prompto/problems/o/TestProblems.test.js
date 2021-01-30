var checkProblems = require("../../parser/BaseOParserTest").checkProblems;

test('Abstract problems', () => {
	checkProblems('problems/abstract.poc');
});

