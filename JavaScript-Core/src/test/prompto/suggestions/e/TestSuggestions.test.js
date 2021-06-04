var checkSuggestions = require("../../parser/BaseEParserTest").checkSuggestions;

test('Start_declaration suggestions', () => {
	checkSuggestions('suggestions/start_declaration.pec');
});

