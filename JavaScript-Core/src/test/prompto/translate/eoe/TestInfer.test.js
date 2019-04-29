var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('InferDict', () => {
	compareResourceEOE('infer/inferDict.pec');
});

test('InferList', () => {
	compareResourceEOE('infer/inferList.pec');
});

test('InferSet', () => {
	compareResourceEOE('infer/inferSet.pec');
});

