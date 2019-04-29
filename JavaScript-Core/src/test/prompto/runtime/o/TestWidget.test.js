var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted Minimal', () => {
	checkInterpretedOutput('widget/minimal.poc');
});

test('Transpiled Minimal', () => {
	checkTranspiledOutput('widget/minimal.poc');
});

test('Interpreted Native', () => {
	checkInterpretedOutput('widget/native.poc');
});

test('Transpiled Native', () => {
	checkTranspiledOutput('widget/native.poc');
});

test('Interpreted WithEvent', () => {
	checkInterpretedOutput('widget/withEvent.poc');
});

test('Transpiled WithEvent', () => {
	checkTranspiledOutput('widget/withEvent.poc');
});

