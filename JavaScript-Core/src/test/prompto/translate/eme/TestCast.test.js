var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('AutoDecimalCast', () => {
	compareResourceEME('cast/autoDecimalCast.pec');
});

test('AutoDowncast', () => {
	compareResourceEME('cast/autoDowncast.pec');
});

test('AutoIntegerCast', () => {
	compareResourceEME('cast/autoIntegerCast.pec');
});

test('CastChild', () => {
	compareResourceEME('cast/castChild.pec');
});

test('CastDecimal', () => {
	compareResourceEME('cast/castDecimal.pec');
});

test('CastDocument', () => {
	compareResourceEME('cast/castDocument.pec');
});

test('CastInteger', () => {
	compareResourceEME('cast/castInteger.pec');
});

test('CastMethod', () => {
	compareResourceEME('cast/castMethod.pec');
});

test('CastMissing', () => {
	compareResourceEME('cast/castMissing.pec');
});

test('CastNull', () => {
	compareResourceEME('cast/castNull.pec');
});

test('CastRoot', () => {
	compareResourceEME('cast/castRoot.pec');
});

test('IsAChild', () => {
	compareResourceEME('cast/isAChild.pec');
});

test('IsAText', () => {
	compareResourceEME('cast/isAText.pec');
});

test('NullIsNotAText', () => {
	compareResourceEME('cast/nullIsNotAText.pec');
});

