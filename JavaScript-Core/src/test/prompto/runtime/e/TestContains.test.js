var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted ContainsAllDict', () => {
	checkInterpretedOutput('contains/containsAllDict.pec');
});

test('Transpiled ContainsAllDict', () => {
	checkTranspiledOutput('contains/containsAllDict.pec');
});

test('Interpreted ContainsAllList', () => {
	checkInterpretedOutput('contains/containsAllList.pec');
});

test('Transpiled ContainsAllList', () => {
	checkTranspiledOutput('contains/containsAllList.pec');
});

test('Interpreted ContainsAllRange', () => {
	checkInterpretedOutput('contains/containsAllRange.pec');
});

test('Transpiled ContainsAllRange', () => {
	checkTranspiledOutput('contains/containsAllRange.pec');
});

test('Interpreted ContainsAllSet', () => {
	checkInterpretedOutput('contains/containsAllSet.pec');
});

test('Transpiled ContainsAllSet', () => {
	checkTranspiledOutput('contains/containsAllSet.pec');
});

test('Interpreted ContainsAllText', () => {
	checkInterpretedOutput('contains/containsAllText.pec');
});

test('Transpiled ContainsAllText', () => {
	checkTranspiledOutput('contains/containsAllText.pec');
});

test('Interpreted ContainsAllTuple', () => {
	checkInterpretedOutput('contains/containsAllTuple.pec');
});

test('Transpiled ContainsAllTuple', () => {
	checkTranspiledOutput('contains/containsAllTuple.pec');
});

test('Interpreted ContainsAnyDict', () => {
	checkInterpretedOutput('contains/containsAnyDict.pec');
});

test('Transpiled ContainsAnyDict', () => {
	checkTranspiledOutput('contains/containsAnyDict.pec');
});

test('Interpreted ContainsAnyList', () => {
	checkInterpretedOutput('contains/containsAnyList.pec');
});

test('Transpiled ContainsAnyList', () => {
	checkTranspiledOutput('contains/containsAnyList.pec');
});

test('Interpreted ContainsAnyRange', () => {
	checkInterpretedOutput('contains/containsAnyRange.pec');
});

test('Transpiled ContainsAnyRange', () => {
	checkTranspiledOutput('contains/containsAnyRange.pec');
});

test('Interpreted ContainsAnySet', () => {
	checkInterpretedOutput('contains/containsAnySet.pec');
});

test('Transpiled ContainsAnySet', () => {
	checkTranspiledOutput('contains/containsAnySet.pec');
});

test('Interpreted ContainsAnyText', () => {
	checkInterpretedOutput('contains/containsAnyText.pec');
});

test('Transpiled ContainsAnyText', () => {
	checkTranspiledOutput('contains/containsAnyText.pec');
});

test('Interpreted ContainsAnyTuple', () => {
	checkInterpretedOutput('contains/containsAnyTuple.pec');
});

test('Transpiled ContainsAnyTuple', () => {
	checkTranspiledOutput('contains/containsAnyTuple.pec');
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

