var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('SelfAsParameter', () => {
	compareResourceEME('self/selfAsParameter.pec');
});

