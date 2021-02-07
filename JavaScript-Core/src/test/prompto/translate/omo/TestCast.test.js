var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('AutoDowncast', () => {
	compareResourceOMO('cast/autoDowncast.poc');
});

test('AutoDowncastMethod', () => {
	compareResourceOMO('cast/autoDowncastMethod.poc');
});

test('CastChild', () => {
	compareResourceOMO('cast/castChild.poc');
});

test('CastMethod', () => {
	compareResourceOMO('cast/castMethod.poc');
});

test('CastMissing', () => {
	compareResourceOMO('cast/castMissing.poc');
});

test('CastNull', () => {
	compareResourceOMO('cast/castNull.poc');
});

test('IsAChild', () => {
	compareResourceOMO('cast/isAChild.poc');
});

test('IsAText', () => {
	compareResourceOMO('cast/isAText.poc');
});

test('NullIsNotAText', () => {
	compareResourceOMO('cast/nullIsNotAText.poc');
});

