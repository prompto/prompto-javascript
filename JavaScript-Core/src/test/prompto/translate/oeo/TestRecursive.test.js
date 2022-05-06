var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('MutuallyRecursive', () => {
	compareResourceOEO('recursive/mutuallyRecursive.poc');
});

test('Recursive', () => {
	compareResourceOEO('recursive/recursive.poc');
});

