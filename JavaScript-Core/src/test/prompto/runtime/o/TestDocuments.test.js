var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted DeepItem', () => {
	checkInterpretedOutput('documents/deepItem.poc');
});

test('Transpiled DeepItem', () => {
	checkTranspiledOutput('documents/deepItem.poc');
});

test('Interpreted DeepMember', () => {
	checkInterpretedOutput('documents/deepMember.poc');
});

test('Transpiled DeepMember', () => {
	checkTranspiledOutput('documents/deepMember.poc');
});

test('Interpreted Instance', () => {
	checkInterpretedOutput('documents/instance.poc');
});

test('Transpiled Instance', () => {
	checkTranspiledOutput('documents/instance.poc');
});

test('Interpreted Item', () => {
	checkInterpretedOutput('documents/item.poc');
});

test('Transpiled Item', () => {
	checkTranspiledOutput('documents/item.poc');
});

test('Interpreted Literal', () => {
	checkInterpretedOutput('documents/literal.poc');
});

test('Transpiled Literal', () => {
	checkTranspiledOutput('documents/literal.poc');
});

test('Interpreted Member', () => {
	checkInterpretedOutput('documents/member.poc');
});

test('Transpiled Member', () => {
	checkTranspiledOutput('documents/member.poc');
});

