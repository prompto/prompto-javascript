var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted AddCharacter', () => {
	checkInterpretedOutput('add/addCharacter.pec');
});

test('Transpiled AddCharacter', () => {
	checkTranspiledOutput('add/addCharacter.pec');
});

test('Interpreted AddDate', () => {
	checkInterpretedOutput('add/addDate.pec');
});

test('Transpiled AddDate', () => {
	checkTranspiledOutput('add/addDate.pec');
});

test('Interpreted AddDateTime', () => {
	checkInterpretedOutput('add/addDateTime.pec');
});

test('Transpiled AddDateTime', () => {
	checkTranspiledOutput('add/addDateTime.pec');
});

test('Interpreted AddDecimal', () => {
	checkInterpretedOutput('add/addDecimal.pec');
});

test('Transpiled AddDecimal', () => {
	checkTranspiledOutput('add/addDecimal.pec');
});

test('Interpreted AddDecimalEnum', () => {
	checkInterpretedOutput('add/addDecimalEnum.pec');
});

test('Transpiled AddDecimalEnum', () => {
	checkTranspiledOutput('add/addDecimalEnum.pec');
});

test('Interpreted AddDict', () => {
	checkInterpretedOutput('add/addDict.pec');
});

test('Transpiled AddDict', () => {
	checkTranspiledOutput('add/addDict.pec');
});

test('Interpreted AddInteger', () => {
	checkInterpretedOutput('add/addInteger.pec');
});

test('Transpiled AddInteger', () => {
	checkTranspiledOutput('add/addInteger.pec');
});

test('Interpreted AddIntegerEnum', () => {
	checkInterpretedOutput('add/addIntegerEnum.pec');
});

test('Transpiled AddIntegerEnum', () => {
	checkTranspiledOutput('add/addIntegerEnum.pec');
});

test('Interpreted AddList', () => {
	checkInterpretedOutput('add/addList.pec');
});

test('Transpiled AddList', () => {
	checkTranspiledOutput('add/addList.pec');
});

test('Interpreted AddPeriod', () => {
	checkInterpretedOutput('add/addPeriod.pec');
});

test('Transpiled AddPeriod', () => {
	checkTranspiledOutput('add/addPeriod.pec');
});

test('Interpreted AddSet', () => {
	checkInterpretedOutput('add/addSet.pec');
});

test('Transpiled AddSet', () => {
	checkTranspiledOutput('add/addSet.pec');
});

test('Interpreted AddTextCharacter', () => {
	checkInterpretedOutput('add/addTextCharacter.pec');
});

test('Transpiled AddTextCharacter', () => {
	checkTranspiledOutput('add/addTextCharacter.pec');
});

test('Interpreted AddTextDecimal', () => {
	checkInterpretedOutput('add/addTextDecimal.pec');
});

test('Transpiled AddTextDecimal', () => {
	checkTranspiledOutput('add/addTextDecimal.pec');
});

test('Interpreted AddTextEnum', () => {
	checkInterpretedOutput('add/addTextEnum.pec');
});

test('Transpiled AddTextEnum', () => {
	checkTranspiledOutput('add/addTextEnum.pec');
});

test('Interpreted AddTextInteger', () => {
	checkInterpretedOutput('add/addTextInteger.pec');
});

test('Transpiled AddTextInteger', () => {
	checkTranspiledOutput('add/addTextInteger.pec');
});

test('Interpreted AddTextText', () => {
	checkInterpretedOutput('add/addTextText.pec');
});

test('Transpiled AddTextText', () => {
	checkTranspiledOutput('add/addTextText.pec');
});

test('Interpreted AddTime', () => {
	checkInterpretedOutput('add/addTime.pec');
});

test('Transpiled AddTime', () => {
	checkTranspiledOutput('add/addTime.pec');
});

test('Interpreted AddTuple', () => {
	checkInterpretedOutput('add/addTuple.pec');
});

test('Transpiled AddTuple', () => {
	checkTranspiledOutput('add/addTuple.pec');
});

