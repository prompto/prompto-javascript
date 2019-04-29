var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('CategoryEnum', () => {
	compareResourceOEO('enums/categoryEnum.poc');
});

test('IntegerEnum', () => {
	compareResourceOEO('enums/integerEnum.poc');
});

test('TextEnum', () => {
	compareResourceOEO('enums/textEnum.poc');
});

test('TextEnumArg', () => {
	compareResourceOEO('enums/textEnumArg.poc');
});

test('TextEnumVar', () => {
	compareResourceOEO('enums/textEnumVar.poc');
});

