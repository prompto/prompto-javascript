var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted AndBoolean', () => {
	checkInterpretedOutput('logic/andBoolean.pec');
});

test('Transpiled AndBoolean', () => {
	checkTranspiledOutput('logic/andBoolean.pec');
});

test('Interpreted NotBoolean', () => {
	checkInterpretedOutput('logic/notBoolean.pec');
});

test('Transpiled NotBoolean', () => {
	checkTranspiledOutput('logic/notBoolean.pec');
});

test('Interpreted OrBoolean', () => {
	checkInterpretedOutput('logic/orBoolean.pec');
});

test('Transpiled OrBoolean', () => {
	checkTranspiledOutput('logic/orBoolean.pec');
});

