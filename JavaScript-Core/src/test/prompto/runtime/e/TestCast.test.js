var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted AutoDecimalCast', () => {
	checkInterpretedOutput('cast/autoDecimalCast.pec');
});

test('Transpiled AutoDecimalCast', () => {
	checkTranspiledOutput('cast/autoDecimalCast.pec');
});

test('Interpreted AutoDowncast', () => {
	checkInterpretedOutput('cast/autoDowncast.pec');
});

test('Transpiled AutoDowncast', () => {
	checkTranspiledOutput('cast/autoDowncast.pec');
});

test('Interpreted AutoIntegerCast', () => {
	checkInterpretedOutput('cast/autoIntegerCast.pec');
});

test('Transpiled AutoIntegerCast', () => {
	checkTranspiledOutput('cast/autoIntegerCast.pec');
});

test('Interpreted CastChild', () => {
	checkInterpretedOutput('cast/castChild.pec');
});

test('Transpiled CastChild', () => {
	checkTranspiledOutput('cast/castChild.pec');
});

test('Interpreted CastDecimal', () => {
	checkInterpretedOutput('cast/castDecimal.pec');
});

test('Transpiled CastDecimal', () => {
	checkTranspiledOutput('cast/castDecimal.pec');
});

test('Interpreted CastDocument', () => {
	checkInterpretedOutput('cast/castDocument.pec');
});

test('Transpiled CastDocument', () => {
	checkTranspiledOutput('cast/castDocument.pec');
});

test('Interpreted CastDocumentList', () => {
	checkInterpretedOutput('cast/castDocumentList.pec');
});

test('Transpiled CastDocumentList', () => {
	checkTranspiledOutput('cast/castDocumentList.pec');
});

test('Interpreted CastInteger', () => {
	checkInterpretedOutput('cast/castInteger.pec');
});

test('Transpiled CastInteger', () => {
	checkTranspiledOutput('cast/castInteger.pec');
});

test('Interpreted CastMethod', () => {
	checkInterpretedOutput('cast/castMethod.pec');
});

test('Transpiled CastMethod', () => {
	checkTranspiledOutput('cast/castMethod.pec');
});

test('Interpreted CastMissing', () => {
	checkInterpretedOutput('cast/castMissing.pec');
});

test('Transpiled CastMissing', () => {
	checkTranspiledOutput('cast/castMissing.pec');
});

test('Interpreted CastNull', () => {
	checkInterpretedOutput('cast/castNull.pec');
});

test('Transpiled CastNull', () => {
	checkTranspiledOutput('cast/castNull.pec');
});

test('Interpreted CastRoot', () => {
	checkInterpretedOutput('cast/castRoot.pec');
});

test('Transpiled CastRoot', () => {
	checkTranspiledOutput('cast/castRoot.pec');
});

test('Interpreted IsAChild', () => {
	checkInterpretedOutput('cast/isAChild.pec');
});

test('Transpiled IsAChild', () => {
	checkTranspiledOutput('cast/isAChild.pec');
});

test('Interpreted IsAText', () => {
	checkInterpretedOutput('cast/isAText.pec');
});

test('Transpiled IsAText', () => {
	checkTranspiledOutput('cast/isAText.pec');
});

test('Interpreted NullIsNotAText', () => {
	checkInterpretedOutput('cast/nullIsNotAText.pec');
});

test('Transpiled NullIsNotAText', () => {
	checkTranspiledOutput('cast/nullIsNotAText.pec');
});

