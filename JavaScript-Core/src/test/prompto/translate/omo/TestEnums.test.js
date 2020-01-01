var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('CategoryEnum', () => {
	compareResourceOMO('enums/categoryEnum.poc');
});

test('IntegerEnum', () => {
	compareResourceOMO('enums/integerEnum.poc');
});

test('SwitchEnum', () => {
	compareResourceOMO('enums/switchEnum.poc');
});

test('TextEnum', () => {
	compareResourceOMO('enums/textEnum.poc');
});

test('TextEnumArg', () => {
	compareResourceOMO('enums/textEnumArg.poc');
});

test('TextEnumVar', () => {
	compareResourceOMO('enums/textEnumVar.poc');
});

