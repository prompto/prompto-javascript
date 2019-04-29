var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted Getter', () => {
	checkInterpretedOutput('setters/getter.pec');
});

test('Transpiled Getter', () => {
	checkTranspiledOutput('setters/getter.pec');
});

test('Interpreted GetterCall', () => {
	checkInterpretedOutput('setters/getterCall.pec');
});

test('Transpiled GetterCall', () => {
	checkTranspiledOutput('setters/getterCall.pec');
});

test('Interpreted Setter', () => {
	checkInterpretedOutput('setters/setter.pec');
});

test('Transpiled Setter', () => {
	checkTranspiledOutput('setters/setter.pec');
});

