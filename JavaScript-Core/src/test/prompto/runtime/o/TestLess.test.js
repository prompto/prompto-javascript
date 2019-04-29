var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted LtCharacter', () => {
	checkInterpretedOutput('less/ltCharacter.poc');
});

test('Transpiled LtCharacter', () => {
	checkTranspiledOutput('less/ltCharacter.poc');
});

test('Interpreted LtDate', () => {
	checkInterpretedOutput('less/ltDate.poc');
});

test('Transpiled LtDate', () => {
	checkTranspiledOutput('less/ltDate.poc');
});

test('Interpreted LtDateTime', () => {
	checkInterpretedOutput('less/ltDateTime.poc');
});

test('Transpiled LtDateTime', () => {
	checkTranspiledOutput('less/ltDateTime.poc');
});

test('Interpreted LtDecimal', () => {
	checkInterpretedOutput('less/ltDecimal.poc');
});

test('Transpiled LtDecimal', () => {
	checkTranspiledOutput('less/ltDecimal.poc');
});

test('Interpreted LtInteger', () => {
	checkInterpretedOutput('less/ltInteger.poc');
});

test('Transpiled LtInteger', () => {
	checkTranspiledOutput('less/ltInteger.poc');
});

test('Interpreted LtText', () => {
	checkInterpretedOutput('less/ltText.poc');
});

test('Transpiled LtText', () => {
	checkTranspiledOutput('less/ltText.poc');
});

test('Interpreted LtTime', () => {
	checkInterpretedOutput('less/ltTime.poc');
});

test('Transpiled LtTime', () => {
	checkTranspiledOutput('less/ltTime.poc');
});

test('Interpreted LtVersion', () => {
	checkInterpretedOutput('less/ltVersion.poc');
});

test('Transpiled LtVersion', () => {
	checkTranspiledOutput('less/ltVersion.poc');
});

test('Interpreted LteCharacter', () => {
	checkInterpretedOutput('less/lteCharacter.poc');
});

test('Transpiled LteCharacter', () => {
	checkTranspiledOutput('less/lteCharacter.poc');
});

test('Interpreted LteDate', () => {
	checkInterpretedOutput('less/lteDate.poc');
});

test('Transpiled LteDate', () => {
	checkTranspiledOutput('less/lteDate.poc');
});

test('Interpreted LteDateTime', () => {
	checkInterpretedOutput('less/lteDateTime.poc');
});

test('Transpiled LteDateTime', () => {
	checkTranspiledOutput('less/lteDateTime.poc');
});

test('Interpreted LteDecimal', () => {
	checkInterpretedOutput('less/lteDecimal.poc');
});

test('Transpiled LteDecimal', () => {
	checkTranspiledOutput('less/lteDecimal.poc');
});

test('Interpreted LteInteger', () => {
	checkInterpretedOutput('less/lteInteger.poc');
});

test('Transpiled LteInteger', () => {
	checkTranspiledOutput('less/lteInteger.poc');
});

test('Interpreted LteText', () => {
	checkInterpretedOutput('less/lteText.poc');
});

test('Transpiled LteText', () => {
	checkTranspiledOutput('less/lteText.poc');
});

test('Interpreted LteTime', () => {
	checkInterpretedOutput('less/lteTime.poc');
});

test('Transpiled LteTime', () => {
	checkTranspiledOutput('less/lteTime.poc');
});

