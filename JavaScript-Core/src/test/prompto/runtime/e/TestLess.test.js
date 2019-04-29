var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted LtCharacter', () => {
	checkInterpretedOutput('less/ltCharacter.pec');
});

test('Transpiled LtCharacter', () => {
	checkTranspiledOutput('less/ltCharacter.pec');
});

test('Interpreted LtDate', () => {
	checkInterpretedOutput('less/ltDate.pec');
});

test('Transpiled LtDate', () => {
	checkTranspiledOutput('less/ltDate.pec');
});

test('Interpreted LtDateTime', () => {
	checkInterpretedOutput('less/ltDateTime.pec');
});

test('Transpiled LtDateTime', () => {
	checkTranspiledOutput('less/ltDateTime.pec');
});

test('Interpreted LtDecimal', () => {
	checkInterpretedOutput('less/ltDecimal.pec');
});

test('Transpiled LtDecimal', () => {
	checkTranspiledOutput('less/ltDecimal.pec');
});

test('Interpreted LtInteger', () => {
	checkInterpretedOutput('less/ltInteger.pec');
});

test('Transpiled LtInteger', () => {
	checkTranspiledOutput('less/ltInteger.pec');
});

test('Interpreted LtText', () => {
	checkInterpretedOutput('less/ltText.pec');
});

test('Transpiled LtText', () => {
	checkTranspiledOutput('less/ltText.pec');
});

test('Interpreted LtTime', () => {
	checkInterpretedOutput('less/ltTime.pec');
});

test('Transpiled LtTime', () => {
	checkTranspiledOutput('less/ltTime.pec');
});

test('Interpreted LtVersion', () => {
	checkInterpretedOutput('less/ltVersion.pec');
});

test('Transpiled LtVersion', () => {
	checkTranspiledOutput('less/ltVersion.pec');
});

test('Interpreted LteCharacter', () => {
	checkInterpretedOutput('less/lteCharacter.pec');
});

test('Transpiled LteCharacter', () => {
	checkTranspiledOutput('less/lteCharacter.pec');
});

test('Interpreted LteDate', () => {
	checkInterpretedOutput('less/lteDate.pec');
});

test('Transpiled LteDate', () => {
	checkTranspiledOutput('less/lteDate.pec');
});

test('Interpreted LteDateTime', () => {
	checkInterpretedOutput('less/lteDateTime.pec');
});

test('Transpiled LteDateTime', () => {
	checkTranspiledOutput('less/lteDateTime.pec');
});

test('Interpreted LteDecimal', () => {
	checkInterpretedOutput('less/lteDecimal.pec');
});

test('Transpiled LteDecimal', () => {
	checkTranspiledOutput('less/lteDecimal.pec');
});

test('Interpreted LteInteger', () => {
	checkInterpretedOutput('less/lteInteger.pec');
});

test('Transpiled LteInteger', () => {
	checkTranspiledOutput('less/lteInteger.pec');
});

test('Interpreted LteText', () => {
	checkInterpretedOutput('less/lteText.pec');
});

test('Transpiled LteText', () => {
	checkTranspiledOutput('less/lteText.pec');
});

test('Interpreted LteTime', () => {
	checkInterpretedOutput('less/lteTime.pec');
});

test('Transpiled LteTime', () => {
	checkTranspiledOutput('less/lteTime.pec');
});

