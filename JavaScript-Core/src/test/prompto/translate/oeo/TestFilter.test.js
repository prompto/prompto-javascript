var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('FilterFromIterable', () => {
	compareResourceOEO('filter/filterFromIterable.poc');
});

test('FilterFromList', () => {
	compareResourceOEO('filter/filterFromList.poc');
});

test('FilterFromSet', () => {
	compareResourceOEO('filter/filterFromSet.poc');
});

