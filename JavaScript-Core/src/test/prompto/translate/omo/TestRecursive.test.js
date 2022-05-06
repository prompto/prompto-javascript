var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('MutuallyRecursive', () => {
	compareResourceOMO('recursive/mutuallyRecursive.poc');
});

test('Recursive', () => {
	compareResourceOMO('recursive/recursive.poc');
});

