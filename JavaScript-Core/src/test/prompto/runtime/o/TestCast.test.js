var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted AutoDowncast', () => {
	checkInterpretedOutput('cast/autoDowncast.poc');
});

test('Transpiled AutoDowncast', () => {
	checkTranspiledOutput('cast/autoDowncast.poc');
});

test('Interpreted AutoDowncastMethod', () => {
	checkInterpretedOutput('cast/autoDowncastMethod.poc');
});

test('Transpiled AutoDowncastMethod', () => {
	checkTranspiledOutput('cast/autoDowncastMethod.poc');
});

test('Interpreted CastChild', () => {
	checkInterpretedOutput('cast/castChild.poc');
});

test('Transpiled CastChild', () => {
	checkTranspiledOutput('cast/castChild.poc');
});

test('Interpreted CastEnum', () => {
	checkInterpretedOutput('cast/castEnum.poc');
});

test('Transpiled CastEnum', () => {
	checkTranspiledOutput('cast/castEnum.poc');
});

test('Interpreted CastMethod', () => {
	checkInterpretedOutput('cast/castMethod.poc');
});

test('Transpiled CastMethod', () => {
	checkTranspiledOutput('cast/castMethod.poc');
});

test('Interpreted CastMissing', () => {
	checkInterpretedOutput('cast/castMissing.poc');
});

test('Transpiled CastMissing', () => {
	checkTranspiledOutput('cast/castMissing.poc');
});

test('Interpreted CastNull', () => {
	checkInterpretedOutput('cast/castNull.poc');
});

test('Transpiled CastNull', () => {
	checkTranspiledOutput('cast/castNull.poc');
});

test('Interpreted CastParent', () => {
	checkInterpretedOutput('cast/castParent.poc');
});

test('Transpiled CastParent', () => {
	checkTranspiledOutput('cast/castParent.poc');
});

test('Interpreted IsAChild', () => {
	checkInterpretedOutput('cast/isAChild.poc');
});

test('Transpiled IsAChild', () => {
	checkTranspiledOutput('cast/isAChild.poc');
});

test('Interpreted IsAText', () => {
	checkInterpretedOutput('cast/isAText.poc');
});

test('Transpiled IsAText', () => {
	checkTranspiledOutput('cast/isAText.poc');
});

test('Interpreted NullIsNotAText', () => {
	checkInterpretedOutput('cast/nullIsNotAText.poc');
});

test('Transpiled NullIsNotAText', () => {
	checkTranspiledOutput('cast/nullIsNotAText.poc');
});

