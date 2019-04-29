var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted Blob', () => {
	checkInterpretedOutput('documents/blob.pec');
});

test('Transpiled Blob', () => {
	checkTranspiledOutput('documents/blob.pec');
});

test('Interpreted DeepItem', () => {
	checkInterpretedOutput('documents/deepItem.pec');
});

test('Transpiled DeepItem', () => {
	checkTranspiledOutput('documents/deepItem.pec');
});

test('Interpreted DeepMember', () => {
	checkInterpretedOutput('documents/deepMember.pec');
});

test('Transpiled DeepMember', () => {
	checkTranspiledOutput('documents/deepMember.pec');
});

test('Interpreted Item', () => {
	checkInterpretedOutput('documents/item.pec');
});

test('Transpiled Item', () => {
	checkTranspiledOutput('documents/item.pec');
});

test('Interpreted Literal', () => {
	checkInterpretedOutput('documents/literal.pec');
});

test('Transpiled Literal', () => {
	checkTranspiledOutput('documents/literal.pec');
});

test('Interpreted Member', () => {
	checkInterpretedOutput('documents/member.pec');
});

test('Transpiled Member', () => {
	checkTranspiledOutput('documents/member.pec');
});

test('Interpreted NamedItem', () => {
	checkInterpretedOutput('documents/namedItem.pec');
});

test('Transpiled NamedItem', () => {
	checkTranspiledOutput('documents/namedItem.pec');
});

