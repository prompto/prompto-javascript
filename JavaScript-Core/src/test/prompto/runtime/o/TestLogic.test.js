var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted AndBoolean', () => {
	checkInterpretedOutput('logic/andBoolean.poc');
});

test('Transpiled AndBoolean', () => {
	checkTranspiledOutput('logic/andBoolean.poc');
});

test('Interpreted NotBoolean', () => {
	checkInterpretedOutput('logic/notBoolean.poc');
});

test('Transpiled NotBoolean', () => {
	checkTranspiledOutput('logic/notBoolean.poc');
});

test('Interpreted OrBoolean', () => {
	checkInterpretedOutput('logic/orBoolean.poc');
});

test('Transpiled OrBoolean', () => {
	checkTranspiledOutput('logic/orBoolean.poc');
});

test('Interpreted RightSkipped', () => {
	checkInterpretedOutput('logic/rightSkipped.poc');
});

test('Transpiled RightSkipped', () => {
	checkTranspiledOutput('logic/rightSkipped.poc');
});

