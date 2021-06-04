var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted ReadInDoWhile', () => {
	checkInterpretedOutput('resource/readInDoWhile.poc');
});

test('Transpiled ReadInDoWhile', () => {
	checkTranspiledOutput('resource/readInDoWhile.poc');
});

test('Interpreted ReadInForEach', () => {
	checkInterpretedOutput('resource/readInForEach.poc');
});

test('Transpiled ReadInForEach', () => {
	checkTranspiledOutput('resource/readInForEach.poc');
});

test('Interpreted ReadInIf', () => {
	checkInterpretedOutput('resource/readInIf.poc');
});

test('Transpiled ReadInIf', () => {
	checkTranspiledOutput('resource/readInIf.poc');
});

test('Interpreted ReadInWhile', () => {
	checkInterpretedOutput('resource/readInWhile.poc');
});

test('Transpiled ReadInWhile', () => {
	checkTranspiledOutput('resource/readInWhile.poc');
});

test('Interpreted ReadResource', () => {
	checkInterpretedOutput('resource/readResource.poc');
});

test('Transpiled ReadResource', () => {
	checkTranspiledOutput('resource/readResource.poc');
});

test('Interpreted ReadResourceThen', () => {
	checkInterpretedOutput('resource/readResourceThen.poc');
});

test('Transpiled ReadResourceThen', () => {
	checkTranspiledOutput('resource/readResourceThen.poc');
});

test('Interpreted ReadWithResource', () => {
	checkInterpretedOutput('resource/readWithResource.poc');
});

test('Transpiled ReadWithResource', () => {
	checkTranspiledOutput('resource/readWithResource.poc');
});

test('Interpreted WriteResource', () => {
	checkInterpretedOutput('resource/writeResource.poc');
});

test('Transpiled WriteResource', () => {
	checkTranspiledOutput('resource/writeResource.poc');
});

test('Interpreted WriteResourceThen', () => {
	checkInterpretedOutput('resource/writeResourceThen.poc');
});

test('Transpiled WriteResourceThen', () => {
	checkTranspiledOutput('resource/writeResourceThen.poc');
});

test('Interpreted WriteWithResource', () => {
	checkInterpretedOutput('resource/writeWithResource.poc');
});

test('Transpiled WriteWithResource', () => {
	checkTranspiledOutput('resource/writeWithResource.poc');
});

