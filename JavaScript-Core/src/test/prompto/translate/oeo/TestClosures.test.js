var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('GlobalClosureNoArg', () => {
	compareResourceOEO('closures/globalClosureNoArg.poc');
});

test('GlobalClosureWithArg', () => {
	compareResourceOEO('closures/globalClosureWithArg.poc');
});

test('InstanceClosureNoArg', () => {
	compareResourceOEO('closures/instanceClosureNoArg.poc');
});

