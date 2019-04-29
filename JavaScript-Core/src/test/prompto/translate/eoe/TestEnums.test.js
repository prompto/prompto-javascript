var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('CategoryEnum', () => {
	compareResourceEOE('enums/categoryEnum.pec');
});

test('IntegerEnum', () => {
	compareResourceEOE('enums/integerEnum.pec');
});

test('StoreCategoryEnum', () => {
	compareResourceEOE('enums/storeCategoryEnum.pec');
});

test('StoreIntegerEnum', () => {
	compareResourceEOE('enums/storeIntegerEnum.pec');
});

test('StoreTextEnum', () => {
	compareResourceEOE('enums/storeTextEnum.pec');
});

test('TextEnum', () => {
	compareResourceEOE('enums/textEnum.pec');
});

test('TextEnumArg', () => {
	compareResourceEOE('enums/textEnumArg.pec');
});

test('TextEnumVar', () => {
	compareResourceEOE('enums/textEnumVar.pec');
});

