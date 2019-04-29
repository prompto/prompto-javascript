var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted GtCharacter', () => {
	checkInterpretedOutput('greater/gtCharacter.pec');
});

test('Transpiled GtCharacter', () => {
	checkTranspiledOutput('greater/gtCharacter.pec');
});

test('Interpreted GtDate', () => {
	checkInterpretedOutput('greater/gtDate.pec');
});

test('Transpiled GtDate', () => {
	checkTranspiledOutput('greater/gtDate.pec');
});

test('Interpreted GtDateTime', () => {
	checkInterpretedOutput('greater/gtDateTime.pec');
});

test('Transpiled GtDateTime', () => {
	checkTranspiledOutput('greater/gtDateTime.pec');
});

test('Interpreted GtDecimal', () => {
	checkInterpretedOutput('greater/gtDecimal.pec');
});

test('Transpiled GtDecimal', () => {
	checkTranspiledOutput('greater/gtDecimal.pec');
});

test('Interpreted GtInteger', () => {
	checkInterpretedOutput('greater/gtInteger.pec');
});

test('Transpiled GtInteger', () => {
	checkTranspiledOutput('greater/gtInteger.pec');
});

test('Interpreted GtText', () => {
	checkInterpretedOutput('greater/gtText.pec');
});

test('Transpiled GtText', () => {
	checkTranspiledOutput('greater/gtText.pec');
});

test('Interpreted GtTime', () => {
	checkInterpretedOutput('greater/gtTime.pec');
});

test('Transpiled GtTime', () => {
	checkTranspiledOutput('greater/gtTime.pec');
});

test('Interpreted GtVersion', () => {
	checkInterpretedOutput('greater/gtVersion.pec');
});

test('Transpiled GtVersion', () => {
	checkTranspiledOutput('greater/gtVersion.pec');
});

test('Interpreted GteCharacter', () => {
	checkInterpretedOutput('greater/gteCharacter.pec');
});

test('Transpiled GteCharacter', () => {
	checkTranspiledOutput('greater/gteCharacter.pec');
});

test('Interpreted GteDate', () => {
	checkInterpretedOutput('greater/gteDate.pec');
});

test('Transpiled GteDate', () => {
	checkTranspiledOutput('greater/gteDate.pec');
});

test('Interpreted GteDateTime', () => {
	checkInterpretedOutput('greater/gteDateTime.pec');
});

test('Transpiled GteDateTime', () => {
	checkTranspiledOutput('greater/gteDateTime.pec');
});

test('Interpreted GteDecimal', () => {
	checkInterpretedOutput('greater/gteDecimal.pec');
});

test('Transpiled GteDecimal', () => {
	checkTranspiledOutput('greater/gteDecimal.pec');
});

test('Interpreted GteInteger', () => {
	checkInterpretedOutput('greater/gteInteger.pec');
});

test('Transpiled GteInteger', () => {
	checkTranspiledOutput('greater/gteInteger.pec');
});

test('Interpreted GteText', () => {
	checkInterpretedOutput('greater/gteText.pec');
});

test('Transpiled GteText', () => {
	checkTranspiledOutput('greater/gteText.pec');
});

test('Interpreted GteTime', () => {
	checkInterpretedOutput('greater/gteTime.pec');
});

test('Transpiled GteTime', () => {
	checkTranspiledOutput('greater/gteTime.pec');
});

