var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('GlobalClosureNoArg', () => {
	compareResourceEME('closures/globalClosureNoArg.pec');
});

test('GlobalClosureWithArg', () => {
	compareResourceEME('closures/globalClosureWithArg.pec');
});

test('InstanceClosureNoArg', () => {
	compareResourceEME('closures/instanceClosureNoArg.pec');
});

test('ParameterClosure', () => {
	compareResourceEME('closures/parameterClosure.pec');
});

