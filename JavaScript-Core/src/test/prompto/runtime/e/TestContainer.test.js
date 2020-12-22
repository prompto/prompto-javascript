var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted HasAllDict', () => {
	checkInterpretedOutput('contains/hasAllDict.pec');
});

test('Transpiled HasAllDict', () => {
	checkTranspiledOutput('contains/hasAllDict.pec');
});

test('Interpreted HasAllList', () => {
	checkInterpretedOutput('contains/hasAllList.pec');
});

test('Transpiled HasAllList', () => {
	checkTranspiledOutput('contains/hasAllList.pec');
});

test('Interpreted HasAllRange', () => {
	checkInterpretedOutput('contains/hasAllRange.pec');
});

test('Transpiled HasAllRange', () => {
	checkTranspiledOutput('contains/hasAllRange.pec');
});

test('Interpreted HasAllSet', () => {
	checkInterpretedOutput('contains/hasAllSet.pec');
});

test('Transpiled HasAllSet', () => {
	checkTranspiledOutput('contains/hasAllSet.pec');
});

test('Interpreted HasAllText', () => {
	checkInterpretedOutput('contains/hasAllText.pec');
});

test('Transpiled HasAllText', () => {
	checkTranspiledOutput('contains/hasAllText.pec');
});

test('Interpreted HasAllTuple', () => {
	checkInterpretedOutput('contains/hasAllTuple.pec');
});

test('Transpiled HasAllTuple', () => {
	checkTranspiledOutput('contains/hasAllTuple.pec');
});

test('Interpreted HasAnyDict', () => {
	checkInterpretedOutput('contains/hasAnyDict.pec');
});

test('Transpiled HasAnyDict', () => {
	checkTranspiledOutput('contains/hasAnyDict.pec');
});

test('Interpreted HasAnyList', () => {
	checkInterpretedOutput('contains/hasAnyList.pec');
});

test('Transpiled HasAnyList', () => {
	checkTranspiledOutput('contains/hasAnyList.pec');
});

test('Interpreted HasAnyRange', () => {
	checkInterpretedOutput('contains/hasAnyRange.pec');
});

test('Transpiled HasAnyRange', () => {
	checkTranspiledOutput('contains/hasAnyRange.pec');
});

test('Interpreted HasAnySet', () => {
	checkInterpretedOutput('contains/hasAnySet.pec');
});

test('Transpiled HasAnySet', () => {
	checkTranspiledOutput('contains/hasAnySet.pec');
});

test('Interpreted HasAnyText', () => {
	checkInterpretedOutput('contains/hasAnyText.pec');
});

test('Transpiled HasAnyText', () => {
	checkTranspiledOutput('contains/hasAnyText.pec');
});

test('Interpreted HasAnyTuple', () => {
	checkInterpretedOutput('contains/hasAnyTuple.pec');
});

test('Transpiled HasAnyTuple', () => {
	checkTranspiledOutput('contains/hasAnyTuple.pec');
});

test('Interpreted InCharacterRange', () => {
	checkInterpretedOutput('contains/inCharacterRange.pec');
});

test('Transpiled InCharacterRange', () => {
	checkTranspiledOutput('contains/inCharacterRange.pec');
});

test('Interpreted InDateRange', () => {
	checkInterpretedOutput('contains/inDateRange.pec');
});

test('Transpiled InDateRange', () => {
	checkTranspiledOutput('contains/inDateRange.pec');
});

test('Interpreted InDict', () => {
	checkInterpretedOutput('contains/inDict.pec');
});

test('Transpiled InDict', () => {
	checkTranspiledOutput('contains/inDict.pec');
});

test('Interpreted InIntegerRange', () => {
	checkInterpretedOutput('contains/inIntegerRange.pec');
});

test('Transpiled InIntegerRange', () => {
	checkTranspiledOutput('contains/inIntegerRange.pec');
});

test('Interpreted InList', () => {
	checkInterpretedOutput('contains/inList.pec');
});

test('Transpiled InList', () => {
	checkTranspiledOutput('contains/inList.pec');
});

test('Interpreted InSet', () => {
	checkInterpretedOutput('contains/inSet.pec');
});

test('Transpiled InSet', () => {
	checkTranspiledOutput('contains/inSet.pec');
});

test('Interpreted InText', () => {
	checkInterpretedOutput('contains/inText.pec');
});

test('Transpiled InText', () => {
	checkTranspiledOutput('contains/inText.pec');
});

test('Interpreted InTextEnum', () => {
	checkInterpretedOutput('contains/inTextEnum.pec');
});

test('Transpiled InTextEnum', () => {
	checkTranspiledOutput('contains/inTextEnum.pec');
});

test('Interpreted InTimeRange', () => {
	checkInterpretedOutput('contains/inTimeRange.pec');
});

test('Transpiled InTimeRange', () => {
	checkTranspiledOutput('contains/inTimeRange.pec');
});

test('Interpreted InTuple', () => {
	checkInterpretedOutput('contains/inTuple.pec');
});

test('Transpiled InTuple', () => {
	checkTranspiledOutput('contains/inTuple.pec');
});

test('Interpreted NinCharacterRange', () => {
	checkInterpretedOutput('contains/ninCharacterRange.pec');
});

test('Transpiled NinCharacterRange', () => {
	checkTranspiledOutput('contains/ninCharacterRange.pec');
});

test('Interpreted NinDateRange', () => {
	checkInterpretedOutput('contains/ninDateRange.pec');
});

test('Transpiled NinDateRange', () => {
	checkTranspiledOutput('contains/ninDateRange.pec');
});

test('Interpreted NinDict', () => {
	checkInterpretedOutput('contains/ninDict.pec');
});

test('Transpiled NinDict', () => {
	checkTranspiledOutput('contains/ninDict.pec');
});

test('Interpreted NinIntegerRange', () => {
	checkInterpretedOutput('contains/ninIntegerRange.pec');
});

test('Transpiled NinIntegerRange', () => {
	checkTranspiledOutput('contains/ninIntegerRange.pec');
});

test('Interpreted NinList', () => {
	checkInterpretedOutput('contains/ninList.pec');
});

test('Transpiled NinList', () => {
	checkTranspiledOutput('contains/ninList.pec');
});

test('Interpreted NinSet', () => {
	checkInterpretedOutput('contains/ninSet.pec');
});

test('Transpiled NinSet', () => {
	checkTranspiledOutput('contains/ninSet.pec');
});

test('Interpreted NinText', () => {
	checkInterpretedOutput('contains/ninText.pec');
});

test('Transpiled NinText', () => {
	checkTranspiledOutput('contains/ninText.pec');
});

test('Interpreted NinTimeRange', () => {
	checkInterpretedOutput('contains/ninTimeRange.pec');
});

test('Transpiled NinTimeRange', () => {
	checkTranspiledOutput('contains/ninTimeRange.pec');
});

