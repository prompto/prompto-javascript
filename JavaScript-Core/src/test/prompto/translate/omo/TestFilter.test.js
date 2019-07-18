var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('FilterFromIterable', () => {
	compareResourceOMO('filter/filterFromIterable.poc');
});

test('FilterFromList', () => {
	compareResourceOMO('filter/filterFromList.poc');
});

test('FilterFromSet', () => {
	compareResourceOMO('filter/filterFromSet.poc');
});

