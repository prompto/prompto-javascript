var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted Attribute', () => {
	checkInterpretedOutput('singleton/attribute.poc');
});

test('Transpiled Attribute', () => {
	checkTranspiledOutput('singleton/attribute.poc');
});

test('Interpreted Constructor', () => {
	checkInterpretedOutput('singleton/constructor.poc');
});

test('Transpiled Constructor', () => {
	checkTranspiledOutput('singleton/constructor.poc');
});

test('Interpreted Internal', () => {
	checkInterpretedOutput('singleton/internal.poc');
});

test('Transpiled Internal', () => {
	checkTranspiledOutput('singleton/internal.poc');
});

test('Interpreted Member', () => {
	checkInterpretedOutput('singleton/member.poc');
});

test('Transpiled Member', () => {
	checkTranspiledOutput('singleton/member.poc');
});

