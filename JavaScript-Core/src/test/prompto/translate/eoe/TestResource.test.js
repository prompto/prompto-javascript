var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('ReadResource', () => {
	compareResourceEOE('resource/readResource.pec');
});

test('ReadWithResource', () => {
	compareResourceEOE('resource/readWithResource.pec');
});

test('WriteResource', () => {
	compareResourceEOE('resource/writeResource.pec');
});

test('WriteWithResource', () => {
	compareResourceEOE('resource/writeWithResource.pec');
});

