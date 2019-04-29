var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted Cyclic', () => {
	checkInterpretedOutput('lazy/cyclic.poc');
});

test('Transpiled Cyclic', () => {
	checkTranspiledOutput('lazy/cyclic.poc');
});

test('Interpreted Dict', () => {
	checkInterpretedOutput('lazy/dict.poc');
});

test('Transpiled Dict', () => {
	checkTranspiledOutput('lazy/dict.poc');
});

test('Interpreted List', () => {
	checkInterpretedOutput('lazy/list.poc');
});

test('Transpiled List', () => {
	checkTranspiledOutput('lazy/list.poc');
});

test('Interpreted Set', () => {
	checkInterpretedOutput('lazy/set.poc');
});

test('Transpiled Set', () => {
	checkTranspiledOutput('lazy/set.poc');
});

test('Interpreted Transient', () => {
	checkInterpretedOutput('lazy/transient.poc');
});

test('Transpiled Transient', () => {
	checkTranspiledOutput('lazy/transient.poc');
});

