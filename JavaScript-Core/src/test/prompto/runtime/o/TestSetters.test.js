var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted Getter', () => {
	checkInterpretedOutput('setters/getter.poc');
});

test('Transpiled Getter', () => {
	checkTranspiledOutput('setters/getter.poc');
});

test('Interpreted Setter', () => {
	checkInterpretedOutput('setters/setter.poc');
});

test('Transpiled Setter', () => {
	checkTranspiledOutput('setters/setter.poc');
});

