var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted HasAllList', () => {
	checkInterpretedOutput('contains/hasAllList.poc');
});

test('Transpiled HasAllList', () => {
	checkTranspiledOutput('contains/hasAllList.poc');
});

test('Interpreted HasAllSet', () => {
	checkInterpretedOutput('contains/hasAllSet.poc');
});

test('Transpiled HasAllSet', () => {
	checkTranspiledOutput('contains/hasAllSet.poc');
});

test('Interpreted HasAllText', () => {
	checkInterpretedOutput('contains/hasAllText.poc');
});

test('Transpiled HasAllText', () => {
	checkTranspiledOutput('contains/hasAllText.poc');
});

test('Interpreted HasAllTuple', () => {
	checkInterpretedOutput('contains/hasAllTuple.poc');
});

test('Transpiled HasAllTuple', () => {
	checkTranspiledOutput('contains/hasAllTuple.poc');
});

test('Interpreted HasAnyList', () => {
	checkInterpretedOutput('contains/hasAnyList.poc');
});

test('Transpiled HasAnyList', () => {
	checkTranspiledOutput('contains/hasAnyList.poc');
});

test('Interpreted HasAnySet', () => {
	checkInterpretedOutput('contains/hasAnySet.poc');
});

test('Transpiled HasAnySet', () => {
	checkTranspiledOutput('contains/hasAnySet.poc');
});

test('Interpreted HasAnyText', () => {
	checkInterpretedOutput('contains/hasAnyText.poc');
});

test('Transpiled HasAnyText', () => {
	checkTranspiledOutput('contains/hasAnyText.poc');
});

test('Interpreted HasAnyTuple', () => {
	checkInterpretedOutput('contains/hasAnyTuple.poc');
});

test('Transpiled HasAnyTuple', () => {
	checkTranspiledOutput('contains/hasAnyTuple.poc');
});

test('Interpreted InCharacterRange', () => {
	checkInterpretedOutput('contains/inCharacterRange.poc');
});

test('Transpiled InCharacterRange', () => {
	checkTranspiledOutput('contains/inCharacterRange.poc');
});

test('Interpreted InDateRange', () => {
	checkInterpretedOutput('contains/inDateRange.poc');
});

test('Transpiled InDateRange', () => {
	checkTranspiledOutput('contains/inDateRange.poc');
});

test('Interpreted InDict', () => {
	checkInterpretedOutput('contains/inDict.poc');
});

test('Transpiled InDict', () => {
	checkTranspiledOutput('contains/inDict.poc');
});

test('Interpreted InIntegerRange', () => {
	checkInterpretedOutput('contains/inIntegerRange.poc');
});

test('Transpiled InIntegerRange', () => {
	checkTranspiledOutput('contains/inIntegerRange.poc');
});

test('Interpreted InList', () => {
	checkInterpretedOutput('contains/inList.poc');
});

test('Transpiled InList', () => {
	checkTranspiledOutput('contains/inList.poc');
});

test('Interpreted InSet', () => {
	checkInterpretedOutput('contains/inSet.poc');
});

test('Transpiled InSet', () => {
	checkTranspiledOutput('contains/inSet.poc');
});

test('Interpreted InText', () => {
	checkInterpretedOutput('contains/inText.poc');
});

test('Transpiled InText', () => {
	checkTranspiledOutput('contains/inText.poc');
});

test('Interpreted InTextEnum', () => {
	checkInterpretedOutput('contains/inTextEnum.poc');
});

test('Transpiled InTextEnum', () => {
	checkTranspiledOutput('contains/inTextEnum.poc');
});

test('Interpreted InTimeRange', () => {
	checkInterpretedOutput('contains/inTimeRange.poc');
});

test('Transpiled InTimeRange', () => {
	checkTranspiledOutput('contains/inTimeRange.poc');
});

test('Interpreted InTuple', () => {
	checkInterpretedOutput('contains/inTuple.poc');
});

test('Transpiled InTuple', () => {
	checkTranspiledOutput('contains/inTuple.poc');
});

test('Interpreted NinCharacterRange', () => {
	checkInterpretedOutput('contains/ninCharacterRange.poc');
});

test('Transpiled NinCharacterRange', () => {
	checkTranspiledOutput('contains/ninCharacterRange.poc');
});

test('Interpreted NinDateRange', () => {
	checkInterpretedOutput('contains/ninDateRange.poc');
});

test('Transpiled NinDateRange', () => {
	checkTranspiledOutput('contains/ninDateRange.poc');
});

test('Interpreted NinDict', () => {
	checkInterpretedOutput('contains/ninDict.poc');
});

test('Transpiled NinDict', () => {
	checkTranspiledOutput('contains/ninDict.poc');
});

test('Interpreted NinIntegerRange', () => {
	checkInterpretedOutput('contains/ninIntegerRange.poc');
});

test('Transpiled NinIntegerRange', () => {
	checkTranspiledOutput('contains/ninIntegerRange.poc');
});

test('Interpreted NinList', () => {
	checkInterpretedOutput('contains/ninList.poc');
});

test('Transpiled NinList', () => {
	checkTranspiledOutput('contains/ninList.poc');
});

test('Interpreted NinSet', () => {
	checkInterpretedOutput('contains/ninSet.poc');
});

test('Transpiled NinSet', () => {
	checkTranspiledOutput('contains/ninSet.poc');
});

test('Interpreted NinText', () => {
	checkInterpretedOutput('contains/ninText.poc');
});

test('Transpiled NinText', () => {
	checkTranspiledOutput('contains/ninText.poc');
});

test('Interpreted NinTimeRange', () => {
	checkInterpretedOutput('contains/ninTimeRange.poc');
});

test('Transpiled NinTimeRange', () => {
	checkTranspiledOutput('contains/ninTimeRange.poc');
});

