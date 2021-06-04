var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('ReadInDoWhile', () => {
	compareResourceOMO('resource/readInDoWhile.poc');
});

test('ReadInForEach', () => {
	compareResourceOMO('resource/readInForEach.poc');
});

test('ReadInIf', () => {
	compareResourceOMO('resource/readInIf.poc');
});

test('ReadInWhile', () => {
	compareResourceOMO('resource/readInWhile.poc');
});

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

test('WriteResourceThen', () => {
	compareResourceOMO('resource/writeResourceThen.poc');
});

test('WriteWithResource', () => {
	compareResourceOMO('resource/writeWithResource.poc');
});

