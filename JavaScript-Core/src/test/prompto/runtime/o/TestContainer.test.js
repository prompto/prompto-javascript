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
	checkInterpretedOutput('container/hasAllList.poc');
});

test('Transpiled HasAllList', () => {
	checkTranspiledOutput('container/hasAllList.poc');
});

test('Interpreted HasAllSet', () => {
	checkInterpretedOutput('container/hasAllSet.poc');
});

test('Transpiled HasAllSet', () => {
	checkTranspiledOutput('container/hasAllSet.poc');
});

test('Interpreted HasAllText', () => {
	checkInterpretedOutput('container/hasAllText.poc');
});

test('Transpiled HasAllText', () => {
	checkTranspiledOutput('container/hasAllText.poc');
});

test('Interpreted HasAllTuple', () => {
	checkInterpretedOutput('container/hasAllTuple.poc');
});

test('Transpiled HasAllTuple', () => {
	checkTranspiledOutput('container/hasAllTuple.poc');
});

test('Interpreted HasAnyList', () => {
	checkInterpretedOutput('container/hasAnyList.poc');
});

test('Transpiled HasAnyList', () => {
	checkTranspiledOutput('container/hasAnyList.poc');
});

test('Interpreted HasAnySet', () => {
	checkInterpretedOutput('container/hasAnySet.poc');
});

test('Transpiled HasAnySet', () => {
	checkTranspiledOutput('container/hasAnySet.poc');
});

test('Interpreted HasAnyText', () => {
	checkInterpretedOutput('container/hasAnyText.poc');
});

test('Transpiled HasAnyText', () => {
	checkTranspiledOutput('container/hasAnyText.poc');
});

test('Interpreted HasAnyTuple', () => {
	checkInterpretedOutput('container/hasAnyTuple.poc');
});

test('Transpiled HasAnyTuple', () => {
	checkTranspiledOutput('container/hasAnyTuple.poc');
});

test('Interpreted InCharacterRange', () => {
	checkInterpretedOutput('container/inCharacterRange.poc');
});

test('Transpiled InCharacterRange', () => {
	checkTranspiledOutput('container/inCharacterRange.poc');
});

test('Interpreted InDateRange', () => {
	checkInterpretedOutput('container/inDateRange.poc');
});

test('Transpiled InDateRange', () => {
	checkTranspiledOutput('container/inDateRange.poc');
});

test('Interpreted InDict', () => {
	checkInterpretedOutput('container/inDict.poc');
});

test('Transpiled InDict', () => {
	checkTranspiledOutput('container/inDict.poc');
});

test('Interpreted InIntegerRange', () => {
	checkInterpretedOutput('container/inIntegerRange.poc');
});

test('Transpiled InIntegerRange', () => {
	checkTranspiledOutput('container/inIntegerRange.poc');
});

test('Interpreted InList', () => {
	checkInterpretedOutput('container/inList.poc');
});

test('Transpiled InList', () => {
	checkTranspiledOutput('container/inList.poc');
});

test('Interpreted InSet', () => {
	checkInterpretedOutput('container/inSet.poc');
});

test('Transpiled InSet', () => {
	checkTranspiledOutput('container/inSet.poc');
});

test('Interpreted InText', () => {
	checkInterpretedOutput('container/inText.poc');
});

test('Transpiled InText', () => {
	checkTranspiledOutput('container/inText.poc');
});

test('Interpreted InTextEnum', () => {
	checkInterpretedOutput('container/inTextEnum.poc');
});

test('Transpiled InTextEnum', () => {
	checkTranspiledOutput('container/inTextEnum.poc');
});

test('Interpreted InTimeRange', () => {
	checkInterpretedOutput('container/inTimeRange.poc');
});

test('Transpiled InTimeRange', () => {
	checkTranspiledOutput('container/inTimeRange.poc');
});

test('Interpreted InTuple', () => {
	checkInterpretedOutput('container/inTuple.poc');
});

test('Transpiled InTuple', () => {
	checkTranspiledOutput('container/inTuple.poc');
});

test('Interpreted NinCharacterRange', () => {
	checkInterpretedOutput('container/ninCharacterRange.poc');
});

test('Transpiled NinCharacterRange', () => {
	checkTranspiledOutput('container/ninCharacterRange.poc');
});

test('Interpreted NinDateRange', () => {
	checkInterpretedOutput('container/ninDateRange.poc');
});

test('Transpiled NinDateRange', () => {
	checkTranspiledOutput('container/ninDateRange.poc');
});

test('Interpreted NinDict', () => {
	checkInterpretedOutput('container/ninDict.poc');
});

test('Transpiled NinDict', () => {
	checkTranspiledOutput('container/ninDict.poc');
});

test('Interpreted NinIntegerRange', () => {
	checkInterpretedOutput('container/ninIntegerRange.poc');
});

test('Transpiled NinIntegerRange', () => {
	checkTranspiledOutput('container/ninIntegerRange.poc');
});

test('Interpreted NinList', () => {
	checkInterpretedOutput('container/ninList.poc');
});

test('Transpiled NinList', () => {
	checkTranspiledOutput('container/ninList.poc');
});

test('Interpreted NinSet', () => {
	checkInterpretedOutput('container/ninSet.poc');
});

test('Transpiled NinSet', () => {
	checkTranspiledOutput('container/ninSet.poc');
});

test('Interpreted NinText', () => {
	checkInterpretedOutput('container/ninText.poc');
});

test('Transpiled NinText', () => {
	checkTranspiledOutput('container/ninText.poc');
});

test('Interpreted NinTimeRange', () => {
	checkInterpretedOutput('container/ninTimeRange.poc');
});

test('Transpiled NinTimeRange', () => {
	checkTranspiledOutput('container/ninTimeRange.poc');
});

