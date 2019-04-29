var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted GtCharacter', () => {
	checkInterpretedOutput('greater/gtCharacter.poc');
});

test('Transpiled GtCharacter', () => {
	checkTranspiledOutput('greater/gtCharacter.poc');
});

test('Interpreted GtDate', () => {
	checkInterpretedOutput('greater/gtDate.poc');
});

test('Transpiled GtDate', () => {
	checkTranspiledOutput('greater/gtDate.poc');
});

test('Interpreted GtDateTime', () => {
	checkInterpretedOutput('greater/gtDateTime.poc');
});

test('Transpiled GtDateTime', () => {
	checkTranspiledOutput('greater/gtDateTime.poc');
});

test('Interpreted GtDecimal', () => {
	checkInterpretedOutput('greater/gtDecimal.poc');
});

test('Transpiled GtDecimal', () => {
	checkTranspiledOutput('greater/gtDecimal.poc');
});

test('Interpreted GtInteger', () => {
	checkInterpretedOutput('greater/gtInteger.poc');
});

test('Transpiled GtInteger', () => {
	checkTranspiledOutput('greater/gtInteger.poc');
});

test('Interpreted GtText', () => {
	checkInterpretedOutput('greater/gtText.poc');
});

test('Transpiled GtText', () => {
	checkTranspiledOutput('greater/gtText.poc');
});

test('Interpreted GtTime', () => {
	checkInterpretedOutput('greater/gtTime.poc');
});

test('Transpiled GtTime', () => {
	checkTranspiledOutput('greater/gtTime.poc');
});

test('Interpreted GtVersion', () => {
	checkInterpretedOutput('greater/gtVersion.poc');
});

test('Transpiled GtVersion', () => {
	checkTranspiledOutput('greater/gtVersion.poc');
});

test('Interpreted GteCharacter', () => {
	checkInterpretedOutput('greater/gteCharacter.poc');
});

test('Transpiled GteCharacter', () => {
	checkTranspiledOutput('greater/gteCharacter.poc');
});

test('Interpreted GteDate', () => {
	checkInterpretedOutput('greater/gteDate.poc');
});

test('Transpiled GteDate', () => {
	checkTranspiledOutput('greater/gteDate.poc');
});

test('Interpreted GteDateTime', () => {
	checkInterpretedOutput('greater/gteDateTime.poc');
});

test('Transpiled GteDateTime', () => {
	checkTranspiledOutput('greater/gteDateTime.poc');
});

test('Interpreted GteDecimal', () => {
	checkInterpretedOutput('greater/gteDecimal.poc');
});

test('Transpiled GteDecimal', () => {
	checkTranspiledOutput('greater/gteDecimal.poc');
});

test('Interpreted GteInteger', () => {
	checkInterpretedOutput('greater/gteInteger.poc');
});

test('Transpiled GteInteger', () => {
	checkTranspiledOutput('greater/gteInteger.poc');
});

test('Interpreted GteText', () => {
	checkInterpretedOutput('greater/gteText.poc');
});

test('Transpiled GteText', () => {
	checkTranspiledOutput('greater/gteText.poc');
});

test('Interpreted GteTime', () => {
	checkInterpretedOutput('greater/gteTime.poc');
});

test('Transpiled GteTime', () => {
	checkTranspiledOutput('greater/gteTime.poc');
});

