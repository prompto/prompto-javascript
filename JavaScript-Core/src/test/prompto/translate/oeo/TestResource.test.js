var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('ReadInDoWhile', () => {
	compareResourceOEO('resource/readInDoWhile.poc');
});

test('ReadInForEach', () => {
	compareResourceOEO('resource/readInForEach.poc');
});

test('ReadInIf', () => {
	compareResourceOEO('resource/readInIf.poc');
});

test('ReadInWhile', () => {
	compareResourceOEO('resource/readInWhile.poc');
});

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

test('WriteResourceThen', () => {
	compareResourceOEO('resource/writeResourceThen.poc');
});

test('WriteWithResource', () => {
	compareResourceOEO('resource/writeWithResource.poc');
});

