var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted SliceList', () => {
	checkInterpretedOutput('slice/sliceList.poc');
});

test('Transpiled SliceList', () => {
	checkTranspiledOutput('slice/sliceList.poc');
});

test('Interpreted SliceRange', () => {
	checkInterpretedOutput('slice/sliceRange.poc');
});

test('Transpiled SliceRange', () => {
	checkTranspiledOutput('slice/sliceRange.poc');
});

test('Interpreted SliceText', () => {
	checkInterpretedOutput('slice/sliceText.poc');
});

test('Transpiled SliceText', () => {
	checkTranspiledOutput('slice/sliceText.poc');
});

