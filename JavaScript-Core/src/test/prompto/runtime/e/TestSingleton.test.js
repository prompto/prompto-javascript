var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted Attribute', () => {
	checkInterpretedOutput('singleton/attribute.pec');
});

test('Transpiled Attribute', () => {
	checkTranspiledOutput('singleton/attribute.pec');
});

test('Interpreted Constructor', () => {
	checkInterpretedOutput('singleton/constructor.pec');
});

test('Transpiled Constructor', () => {
	checkTranspiledOutput('singleton/constructor.pec');
});

test('Interpreted Internal', () => {
	checkInterpretedOutput('singleton/internal.pec');
});

test('Transpiled Internal', () => {
	checkTranspiledOutput('singleton/internal.pec');
});

test('Interpreted Member', () => {
	checkInterpretedOutput('singleton/member.pec');
});

test('Transpiled Member', () => {
	checkTranspiledOutput('singleton/member.pec');
});

