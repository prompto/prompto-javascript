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

test('CastEnum', () => {
	compareResourceOMO('cast/castEnum.poc');
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

test('CastParent', () => {
	compareResourceOMO('cast/castParent.poc');
});

test('IsAChild', () => {
	compareResourceOMO('cast/isAChild.poc');
});

test('IsAText', () => {
	compareResourceOMO('cast/isAText.poc');
});

test('MutableEntity', () => {
	compareResourceOMO('cast/mutableEntity.poc');
});

test('MutableList', () => {
	compareResourceOMO('cast/mutableList.poc');
});

test('NullIsNotAText', () => {
	compareResourceOMO('cast/nullIsNotAText.poc');
});

