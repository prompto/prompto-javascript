var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted SliceList', () => {
	checkInterpretedOutput('slice/sliceList.pec');
});

test('Transpiled SliceList', () => {
	checkTranspiledOutput('slice/sliceList.pec');
});

test('Interpreted SliceRange', () => {
	checkInterpretedOutput('slice/sliceRange.pec');
});

test('Transpiled SliceRange', () => {
	checkTranspiledOutput('slice/sliceRange.pec');
});

test('Interpreted SliceText', () => {
	checkInterpretedOutput('slice/sliceText.pec');
});

test('Transpiled SliceText', () => {
	checkTranspiledOutput('slice/sliceText.pec');
});

