var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted AddCharacter', () => {
	checkInterpretedOutput('add/addCharacter.poc');
});

test('Transpiled AddCharacter', () => {
	checkTranspiledOutput('add/addCharacter.poc');
});

test('Interpreted AddDate', () => {
	checkInterpretedOutput('add/addDate.poc');
});

test('Transpiled AddDate', () => {
	checkTranspiledOutput('add/addDate.poc');
});

test('Interpreted AddDateTime', () => {
	checkInterpretedOutput('add/addDateTime.poc');
});

test('Transpiled AddDateTime', () => {
	checkTranspiledOutput('add/addDateTime.poc');
});

test('Interpreted AddDecimal', () => {
	checkInterpretedOutput('add/addDecimal.poc');
});

test('Transpiled AddDecimal', () => {
	checkTranspiledOutput('add/addDecimal.poc');
});

test('Interpreted AddDict', () => {
	checkInterpretedOutput('add/addDict.poc');
});

test('Transpiled AddDict', () => {
	checkTranspiledOutput('add/addDict.poc');
});

test('Interpreted AddDocument', () => {
	checkInterpretedOutput('add/addDocument.poc');
});

test('Transpiled AddDocument', () => {
	checkTranspiledOutput('add/addDocument.poc');
});

test('Interpreted AddInteger', () => {
	checkInterpretedOutput('add/addInteger.poc');
});

test('Transpiled AddInteger', () => {
	checkTranspiledOutput('add/addInteger.poc');
});

test('Interpreted AddList', () => {
	checkInterpretedOutput('add/addList.poc');
});

test('Transpiled AddList', () => {
	checkTranspiledOutput('add/addList.poc');
});

test('Interpreted AddListDerived', () => {
	checkInterpretedOutput('add/addListDerived.poc');
});

test('Transpiled AddListDerived', () => {
	checkTranspiledOutput('add/addListDerived.poc');
});

test('Interpreted AddPeriod', () => {
	checkInterpretedOutput('add/addPeriod.poc');
});

test('Transpiled AddPeriod', () => {
	checkTranspiledOutput('add/addPeriod.poc');
});

test('Interpreted AddSet', () => {
	checkInterpretedOutput('add/addSet.poc');
});

test('Transpiled AddSet', () => {
	checkTranspiledOutput('add/addSet.poc');
});

test('Interpreted AddSetDerived', () => {
	checkInterpretedOutput('add/addSetDerived.poc');
});

test('Transpiled AddSetDerived', () => {
	checkTranspiledOutput('add/addSetDerived.poc');
});

test('Interpreted AddTextCharacter', () => {
	checkInterpretedOutput('add/addTextCharacter.poc');
});

test('Transpiled AddTextCharacter', () => {
	checkTranspiledOutput('add/addTextCharacter.poc');
});

test('Interpreted AddTextDecimal', () => {
	checkInterpretedOutput('add/addTextDecimal.poc');
});

test('Transpiled AddTextDecimal', () => {
	checkTranspiledOutput('add/addTextDecimal.poc');
});

test('Interpreted AddTextInteger', () => {
	checkInterpretedOutput('add/addTextInteger.poc');
});

test('Transpiled AddTextInteger', () => {
	checkTranspiledOutput('add/addTextInteger.poc');
});

test('Interpreted AddTextText', () => {
	checkInterpretedOutput('add/addTextText.poc');
});

test('Transpiled AddTextText', () => {
	checkTranspiledOutput('add/addTextText.poc');
});

test('Interpreted AddTime', () => {
	checkInterpretedOutput('add/addTime.poc');
});

test('Transpiled AddTime', () => {
	checkTranspiledOutput('add/addTime.poc');
});

test('Interpreted AddTuple', () => {
	checkInterpretedOutput('add/addTuple.poc');
});

test('Transpiled AddTuple', () => {
	checkTranspiledOutput('add/addTuple.poc');
});

