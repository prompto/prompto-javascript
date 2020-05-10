var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('AddCharacter', () => {
	compareResourceOMO('add/addCharacter.poc');
});

test('AddDate', () => {
	compareResourceOMO('add/addDate.poc');
});

test('AddDateTime', () => {
	compareResourceOMO('add/addDateTime.poc');
});

test('AddDecimal', () => {
	compareResourceOMO('add/addDecimal.poc');
});

test('AddDict', () => {
	compareResourceOMO('add/addDict.poc');
});

test('AddDocument', () => {
	compareResourceOMO('add/addDocument.poc');
});

test('AddInteger', () => {
	compareResourceOMO('add/addInteger.poc');
});

test('AddList', () => {
	compareResourceOMO('add/addList.poc');
});

test('AddPeriod', () => {
	compareResourceOMO('add/addPeriod.poc');
});

test('AddSet', () => {
	compareResourceOMO('add/addSet.poc');
});

test('AddTextCharacter', () => {
	compareResourceOMO('add/addTextCharacter.poc');
});

test('AddTextDecimal', () => {
	compareResourceOMO('add/addTextDecimal.poc');
});

test('AddTextInteger', () => {
	compareResourceOMO('add/addTextInteger.poc');
});

test('AddTextText', () => {
	compareResourceOMO('add/addTextText.poc');
});

test('AddTime', () => {
	compareResourceOMO('add/addTime.poc');
});

test('AddTuple', () => {
	compareResourceOMO('add/addTuple.poc');
});

