var checkSuggestions = require("../../parser/BaseOParserTest").checkSuggestions;

test('Start_declaration suggestions', () => {
	checkSuggestions('suggestions/start_declaration.poc');
});

