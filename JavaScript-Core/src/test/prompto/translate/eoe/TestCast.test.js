var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('AutoDecimalCast', () => {
	compareResourceEOE('cast/autoDecimalCast.pec');
});

test('AutoDowncast', () => {
	compareResourceEOE('cast/autoDowncast.pec');
});

test('AutoIntegerCast', () => {
	compareResourceEOE('cast/autoIntegerCast.pec');
});

test('CastChild', () => {
	compareResourceEOE('cast/castChild.pec');
});

test('CastDecimal', () => {
	compareResourceEOE('cast/castDecimal.pec');
});

test('CastDocument', () => {
	compareResourceEOE('cast/castDocument.pec');
});

test('CastInteger', () => {
	compareResourceEOE('cast/castInteger.pec');
});

test('CastMethod', () => {
	compareResourceEOE('cast/castMethod.pec');
});

test('CastMissing', () => {
	compareResourceEOE('cast/castMissing.pec');
});

test('CastNull', () => {
	compareResourceEOE('cast/castNull.pec');
});

test('CastRoot', () => {
	compareResourceEOE('cast/castRoot.pec');
});

test('IsAChild', () => {
	compareResourceEOE('cast/isAChild.pec');
});

test('IsAText', () => {
	compareResourceEOE('cast/isAText.pec');
});

test('NullIsNotAText', () => {
	compareResourceEOE('cast/nullIsNotAText.pec');
});

