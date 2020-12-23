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
	checkInterpretedOutput('container/hasAllDict.pec');
});

test('Transpiled HasAllDict', () => {
	checkTranspiledOutput('container/hasAllDict.pec');
});

test('Interpreted HasAllFromList', () => {
	checkInterpretedOutput('container/hasAllFromList.pec');
});

test('Transpiled HasAllFromList', () => {
	checkTranspiledOutput('container/hasAllFromList.pec');
});

test('Interpreted HasAllFromSet', () => {
	checkInterpretedOutput('container/hasAllFromSet.pec');
});

test('Transpiled HasAllFromSet', () => {
	checkTranspiledOutput('container/hasAllFromSet.pec');
});

test('Interpreted HasAllList', () => {
	checkInterpretedOutput('container/hasAllList.pec');
});

test('Transpiled HasAllList', () => {
	checkTranspiledOutput('container/hasAllList.pec');
});

test('Interpreted HasAllRange', () => {
	checkInterpretedOutput('container/hasAllRange.pec');
});

test('Transpiled HasAllRange', () => {
	checkTranspiledOutput('container/hasAllRange.pec');
});

test('Interpreted HasAllSet', () => {
	checkInterpretedOutput('container/hasAllSet.pec');
});

test('Transpiled HasAllSet', () => {
	checkTranspiledOutput('container/hasAllSet.pec');
});

test('Interpreted HasAllText', () => {
	checkInterpretedOutput('container/hasAllText.pec');
});

test('Transpiled HasAllText', () => {
	checkTranspiledOutput('container/hasAllText.pec');
});

test('Interpreted HasAllTuple', () => {
	checkInterpretedOutput('container/hasAllTuple.pec');
});

test('Transpiled HasAllTuple', () => {
	checkTranspiledOutput('container/hasAllTuple.pec');
});

test('Interpreted HasAnyDict', () => {
	checkInterpretedOutput('container/hasAnyDict.pec');
});

test('Transpiled HasAnyDict', () => {
	checkTranspiledOutput('container/hasAnyDict.pec');
});

test('Interpreted HasAnyFromList', () => {
	checkInterpretedOutput('container/hasAnyFromList.pec');
});

test('Transpiled HasAnyFromList', () => {
	checkTranspiledOutput('container/hasAnyFromList.pec');
});

test('Interpreted HasAnyFromSet', () => {
	checkInterpretedOutput('container/hasAnyFromSet.pec');
});

test('Transpiled HasAnyFromSet', () => {
	checkTranspiledOutput('container/hasAnyFromSet.pec');
});

test('Interpreted HasAnyList', () => {
	checkInterpretedOutput('container/hasAnyList.pec');
});

test('Transpiled HasAnyList', () => {
	checkTranspiledOutput('container/hasAnyList.pec');
});

test('Interpreted HasAnyRange', () => {
	checkInterpretedOutput('container/hasAnyRange.pec');
});

test('Transpiled HasAnyRange', () => {
	checkTranspiledOutput('container/hasAnyRange.pec');
});

test('Interpreted HasAnySet', () => {
	checkInterpretedOutput('container/hasAnySet.pec');
});

test('Transpiled HasAnySet', () => {
	checkTranspiledOutput('container/hasAnySet.pec');
});

test('Interpreted HasAnyText', () => {
	checkInterpretedOutput('container/hasAnyText.pec');
});

test('Transpiled HasAnyText', () => {
	checkTranspiledOutput('container/hasAnyText.pec');
});

test('Interpreted HasAnyTuple', () => {
	checkInterpretedOutput('container/hasAnyTuple.pec');
});

test('Transpiled HasAnyTuple', () => {
	checkTranspiledOutput('container/hasAnyTuple.pec');
});

test('Interpreted InCharacterRange', () => {
	checkInterpretedOutput('container/inCharacterRange.pec');
});

test('Transpiled InCharacterRange', () => {
	checkTranspiledOutput('container/inCharacterRange.pec');
});

test('Interpreted InDateRange', () => {
	checkInterpretedOutput('container/inDateRange.pec');
});

test('Transpiled InDateRange', () => {
	checkTranspiledOutput('container/inDateRange.pec');
});

test('Interpreted InDict', () => {
	checkInterpretedOutput('container/inDict.pec');
});

test('Transpiled InDict', () => {
	checkTranspiledOutput('container/inDict.pec');
});

test('Interpreted InIntegerRange', () => {
	checkInterpretedOutput('container/inIntegerRange.pec');
});

test('Transpiled InIntegerRange', () => {
	checkTranspiledOutput('container/inIntegerRange.pec');
});

test('Interpreted InList', () => {
	checkInterpretedOutput('container/inList.pec');
});

test('Transpiled InList', () => {
	checkTranspiledOutput('container/inList.pec');
});

test('Interpreted InSet', () => {
	checkInterpretedOutput('container/inSet.pec');
});

test('Transpiled InSet', () => {
	checkTranspiledOutput('container/inSet.pec');
});

test('Interpreted InText', () => {
	checkInterpretedOutput('container/inText.pec');
});

test('Transpiled InText', () => {
	checkTranspiledOutput('container/inText.pec');
});

test('Interpreted InTextEnum', () => {
	checkInterpretedOutput('container/inTextEnum.pec');
});

test('Transpiled InTextEnum', () => {
	checkTranspiledOutput('container/inTextEnum.pec');
});

test('Interpreted InTimeRange', () => {
	checkInterpretedOutput('container/inTimeRange.pec');
});

test('Transpiled InTimeRange', () => {
	checkTranspiledOutput('container/inTimeRange.pec');
});

test('Interpreted InTuple', () => {
	checkInterpretedOutput('container/inTuple.pec');
});

test('Transpiled InTuple', () => {
	checkTranspiledOutput('container/inTuple.pec');
});

test('Interpreted NinCharacterRange', () => {
	checkInterpretedOutput('container/ninCharacterRange.pec');
});

test('Transpiled NinCharacterRange', () => {
	checkTranspiledOutput('container/ninCharacterRange.pec');
});

test('Interpreted NinDateRange', () => {
	checkInterpretedOutput('container/ninDateRange.pec');
});

test('Transpiled NinDateRange', () => {
	checkTranspiledOutput('container/ninDateRange.pec');
});

test('Interpreted NinDict', () => {
	checkInterpretedOutput('container/ninDict.pec');
});

test('Transpiled NinDict', () => {
	checkTranspiledOutput('container/ninDict.pec');
});

test('Interpreted NinIntegerRange', () => {
	checkInterpretedOutput('container/ninIntegerRange.pec');
});

test('Transpiled NinIntegerRange', () => {
	checkTranspiledOutput('container/ninIntegerRange.pec');
});

test('Interpreted NinList', () => {
	checkInterpretedOutput('container/ninList.pec');
});

test('Transpiled NinList', () => {
	checkTranspiledOutput('container/ninList.pec');
});

test('Interpreted NinSet', () => {
	checkInterpretedOutput('container/ninSet.pec');
});

test('Transpiled NinSet', () => {
	checkTranspiledOutput('container/ninSet.pec');
});

test('Interpreted NinText', () => {
	checkInterpretedOutput('container/ninText.pec');
});

test('Transpiled NinText', () => {
	checkTranspiledOutput('container/ninText.pec');
});

test('Interpreted NinTimeRange', () => {
	checkInterpretedOutput('container/ninTimeRange.pec');
});

test('Transpiled NinTimeRange', () => {
	checkTranspiledOutput('container/ninTimeRange.pec');
});

