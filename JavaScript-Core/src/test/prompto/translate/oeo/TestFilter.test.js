var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('FilterFromList', () => {
	compareResourceOEO('filter/filterFromList.poc');
});

test('FilterFromSet', () => {
	compareResourceOEO('filter/filterFromSet.poc');
});

