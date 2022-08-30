var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('AutoDowncast', () => {
	compareResourceOEO('cast/autoDowncast.poc');
});

test('AutoDowncastMethod', () => {
	compareResourceOEO('cast/autoDowncastMethod.poc');
});

test('CastChild', () => {
	compareResourceOEO('cast/castChild.poc');
});

test('CastEnum', () => {
	compareResourceOEO('cast/castEnum.poc');
});

test('CastMethod', () => {
	compareResourceOEO('cast/castMethod.poc');
});

test('CastMissing', () => {
	compareResourceOEO('cast/castMissing.poc');
});

test('CastNull', () => {
	compareResourceOEO('cast/castNull.poc');
});

test('CastParent', () => {
	compareResourceOEO('cast/castParent.poc');
});

test('IsAChild', () => {
	compareResourceOEO('cast/isAChild.poc');
});

test('IsAText', () => {
	compareResourceOEO('cast/isAText.poc');
});

test('MutableEntity', () => {
	compareResourceOEO('cast/mutableEntity.poc');
});

test('MutableList', () => {
	compareResourceOEO('cast/mutableList.poc');
});

test('NullIsNotAText', () => {
	compareResourceOEO('cast/nullIsNotAText.poc');
});

