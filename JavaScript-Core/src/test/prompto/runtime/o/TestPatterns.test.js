var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted IntegerEnumeration', () => {
	checkInterpretedOutput('patterns/integerEnumeration.poc');
});

test('Transpiled IntegerEnumeration', () => {
	checkTranspiledOutput('patterns/integerEnumeration.poc');
});

test('Interpreted IntegerPattern', () => {
	checkInterpretedOutput('patterns/integerPattern.poc');
});

test('Transpiled IntegerPattern', () => {
	checkTranspiledOutput('patterns/integerPattern.poc');
});

test('Interpreted NegativeIntegerRange', () => {
	checkInterpretedOutput('patterns/negativeIntegerRange.poc');
});

test('Transpiled NegativeIntegerRange', () => {
	checkTranspiledOutput('patterns/negativeIntegerRange.poc');
});

test('Interpreted PositiveIntegerRange', () => {
	checkInterpretedOutput('patterns/positiveIntegerRange.poc');
});

test('Transpiled PositiveIntegerRange', () => {
	checkTranspiledOutput('patterns/positiveIntegerRange.poc');
});

test('Interpreted TextEnumeration', () => {
	checkInterpretedOutput('patterns/textEnumeration.poc');
});

test('Transpiled TextEnumeration', () => {
	checkTranspiledOutput('patterns/textEnumeration.poc');
});

test('Interpreted TextPattern', () => {
	checkInterpretedOutput('patterns/textPattern.poc');
});

test('Transpiled TextPattern', () => {
	checkTranspiledOutput('patterns/textPattern.poc');
});

