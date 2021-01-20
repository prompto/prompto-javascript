var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
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

