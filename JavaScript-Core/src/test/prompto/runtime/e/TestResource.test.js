var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted ReadResource', () => {
	checkInterpretedOutput('resource/readResource.pec');
});

test('Transpiled ReadResource', () => {
	checkTranspiledOutput('resource/readResource.pec');
});

test('Interpreted ReadResourceThen', () => {
	checkInterpretedOutput('resource/readResourceThen.pec');
});

test('Transpiled ReadResourceThen', () => {
	checkTranspiledOutput('resource/readResourceThen.pec');
});

test('Interpreted ReadWithResource', () => {
	checkInterpretedOutput('resource/readWithResource.pec');
});

test('Transpiled ReadWithResource', () => {
	checkTranspiledOutput('resource/readWithResource.pec');
});

test('Interpreted WriteResource', () => {
	checkInterpretedOutput('resource/writeResource.pec');
});

test('Transpiled WriteResource', () => {
	checkTranspiledOutput('resource/writeResource.pec');
});

test('Interpreted WriteResourceThen', () => {
	checkInterpretedOutput('resource/writeResourceThen.pec');
});

test('Transpiled WriteResourceThen', () => {
	checkTranspiledOutput('resource/writeResourceThen.pec');
});

test('Interpreted WriteWithResource', () => {
	checkInterpretedOutput('resource/writeWithResource.pec');
});

test('Transpiled WriteWithResource', () => {
	checkTranspiledOutput('resource/writeWithResource.pec');
});

