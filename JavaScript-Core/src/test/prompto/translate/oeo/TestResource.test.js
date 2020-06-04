var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('ReadResource', () => {
	compareResourceOEO('resource/readResource.poc');
});

test('ReadResourceThen', () => {
	compareResourceOEO('resource/readResourceThen.poc');
});

test('ReadWithResource', () => {
	compareResourceOEO('resource/readWithResource.poc');
});

test('WriteResource', () => {
	compareResourceOEO('resource/writeResource.poc');
});

test('WriteWithResource', () => {
	compareResourceOEO('resource/writeWithResource.poc');
});

