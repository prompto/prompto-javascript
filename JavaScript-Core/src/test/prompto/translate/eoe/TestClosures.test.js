var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('GlobalClosureNoArg', () => {
	compareResourceEOE('closures/globalClosureNoArg.pec');
});

test('GlobalClosureWithArg', () => {
	compareResourceEOE('closures/globalClosureWithArg.pec');
});

test('InstanceClosureNoArg', () => {
	compareResourceEOE('closures/instanceClosureNoArg.pec');
});

test('ParameterClosure', () => {
	compareResourceEOE('closures/parameterClosure.pec');
});

