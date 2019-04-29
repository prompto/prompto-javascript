var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('GlobalClosureNoArg', () => {
	compareResourceOMO('closures/globalClosureNoArg.poc');
});

test('GlobalClosureWithArg', () => {
	compareResourceOMO('closures/globalClosureWithArg.poc');
});

test('InstanceClosureNoArg', () => {
	compareResourceOMO('closures/instanceClosureNoArg.poc');
});

