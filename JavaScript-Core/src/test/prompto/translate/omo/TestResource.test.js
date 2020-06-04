var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('ReadResource', () => {
	compareResourceOMO('resource/readResource.poc');
});

test('ReadResourceThen', () => {
	compareResourceOMO('resource/readResourceThen.poc');
});

test('ReadWithResource', () => {
	compareResourceOMO('resource/readWithResource.poc');
});

test('WriteResource', () => {
	compareResourceOMO('resource/writeResource.poc');
});

test('WriteWithResource', () => {
	compareResourceOMO('resource/writeWithResource.poc');
});

