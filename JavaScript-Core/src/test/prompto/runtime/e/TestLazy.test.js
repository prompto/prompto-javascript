var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted Cyclic', () => {
	checkInterpretedOutput('lazy/cyclic.pec');
});

test('Transpiled Cyclic', () => {
	checkTranspiledOutput('lazy/cyclic.pec');
});

test('Interpreted Dict', () => {
	checkInterpretedOutput('lazy/dict.pec');
});

test('Transpiled Dict', () => {
	checkTranspiledOutput('lazy/dict.pec');
});

test('Interpreted List', () => {
	checkInterpretedOutput('lazy/list.pec');
});

test('Transpiled List', () => {
	checkTranspiledOutput('lazy/list.pec');
});

test('Interpreted Set', () => {
	checkInterpretedOutput('lazy/set.pec');
});

test('Transpiled Set', () => {
	checkTranspiledOutput('lazy/set.pec');
});

test('Interpreted Transient', () => {
	checkInterpretedOutput('lazy/transient.pec');
});

test('Transpiled Transient', () => {
	checkTranspiledOutput('lazy/transient.pec');
});

