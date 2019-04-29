var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('CategoryEnum', () => {
	compareResourceEME('enums/categoryEnum.pec');
});

test('IntegerEnum', () => {
	compareResourceEME('enums/integerEnum.pec');
});

test('StoreCategoryEnum', () => {
	compareResourceEME('enums/storeCategoryEnum.pec');
});

test('StoreIntegerEnum', () => {
	compareResourceEME('enums/storeIntegerEnum.pec');
});

test('StoreTextEnum', () => {
	compareResourceEME('enums/storeTextEnum.pec');
});

test('TextEnum', () => {
	compareResourceEME('enums/textEnum.pec');
});

test('TextEnumArg', () => {
	compareResourceEME('enums/textEnumArg.pec');
});

test('TextEnumVar', () => {
	compareResourceEME('enums/textEnumVar.pec');
});

