var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('HasAllList', () => {
	compareResourceOMO('contains/hasAllList.poc');
});

test('HasAllSet', () => {
	compareResourceOMO('contains/hasAllSet.poc');
});

test('HasAllText', () => {
	compareResourceOMO('contains/hasAllText.poc');
});

test('HasAllTuple', () => {
	compareResourceOMO('contains/hasAllTuple.poc');
});

test('HasAnyList', () => {
	compareResourceOMO('contains/hasAnyList.poc');
});

test('HasAnySet', () => {
	compareResourceOMO('contains/hasAnySet.poc');
});

test('HasAnyText', () => {
	compareResourceOMO('contains/hasAnyText.poc');
});

test('HasAnyTuple', () => {
	compareResourceOMO('contains/hasAnyTuple.poc');
});

test('InCharacterRange', () => {
	compareResourceOMO('contains/inCharacterRange.poc');
});

test('InDateRange', () => {
	compareResourceOMO('contains/inDateRange.poc');
});

test('InDict', () => {
	compareResourceOMO('contains/inDict.poc');
});

test('InIntegerRange', () => {
	compareResourceOMO('contains/inIntegerRange.poc');
});

test('InList', () => {
	compareResourceOMO('contains/inList.poc');
});

test('InSet', () => {
	compareResourceOMO('contains/inSet.poc');
});

test('InText', () => {
	compareResourceOMO('contains/inText.poc');
});

test('InTextEnum', () => {
	compareResourceOMO('contains/inTextEnum.poc');
});

test('InTimeRange', () => {
	compareResourceOMO('contains/inTimeRange.poc');
});

test('InTuple', () => {
	compareResourceOMO('contains/inTuple.poc');
});

test('NinCharacterRange', () => {
	compareResourceOMO('contains/ninCharacterRange.poc');
});

test('NinDateRange', () => {
	compareResourceOMO('contains/ninDateRange.poc');
});

test('NinDict', () => {
	compareResourceOMO('contains/ninDict.poc');
});

test('NinIntegerRange', () => {
	compareResourceOMO('contains/ninIntegerRange.poc');
});

test('NinList', () => {
	compareResourceOMO('contains/ninList.poc');
});

test('NinSet', () => {
	compareResourceOMO('contains/ninSet.poc');
});

test('NinText', () => {
	compareResourceOMO('contains/ninText.poc');
});

test('NinTimeRange', () => {
	compareResourceOMO('contains/ninTimeRange.poc');
});

