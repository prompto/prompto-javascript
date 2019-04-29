var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('InferDict', () => {
	compareResourceEME('infer/inferDict.pec');
});

test('InferList', () => {
	compareResourceEME('infer/inferList.pec');
});

test('InferSet', () => {
	compareResourceEME('infer/inferSet.pec');
});

