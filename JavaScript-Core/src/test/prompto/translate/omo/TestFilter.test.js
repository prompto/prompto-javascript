var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('FilterFromList', () => {
	compareResourceOMO('filter/filterFromList.poc');
});

test('FilterFromSet', () => {
	compareResourceOMO('filter/filterFromSet.poc');
});

