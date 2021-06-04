var checkSuggestions = require("../../parser/BaseMParserTest").checkSuggestions;

test('Start_declaration suggestions', () => {
	checkSuggestions('suggestions/start_declaration.pmc');
});

