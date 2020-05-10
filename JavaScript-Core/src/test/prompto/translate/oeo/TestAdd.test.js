var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('AddCharacter', () => {
	compareResourceOEO('add/addCharacter.poc');
});

test('AddDate', () => {
	compareResourceOEO('add/addDate.poc');
});

test('AddDateTime', () => {
	compareResourceOEO('add/addDateTime.poc');
});

test('AddDecimal', () => {
	compareResourceOEO('add/addDecimal.poc');
});

test('AddDict', () => {
	compareResourceOEO('add/addDict.poc');
});

test('AddDocument', () => {
	compareResourceOEO('add/addDocument.poc');
});

test('AddInteger', () => {
	compareResourceOEO('add/addInteger.poc');
});

test('AddList', () => {
	compareResourceOEO('add/addList.poc');
});

test('AddPeriod', () => {
	compareResourceOEO('add/addPeriod.poc');
});

test('AddSet', () => {
	compareResourceOEO('add/addSet.poc');
});

test('AddTextCharacter', () => {
	compareResourceOEO('add/addTextCharacter.poc');
});

test('AddTextDecimal', () => {
	compareResourceOEO('add/addTextDecimal.poc');
});

test('AddTextInteger', () => {
	compareResourceOEO('add/addTextInteger.poc');
});

test('AddTextText', () => {
	compareResourceOEO('add/addTextText.poc');
});

test('AddTime', () => {
	compareResourceOEO('add/addTime.poc');
});

test('AddTuple', () => {
	compareResourceOEO('add/addTuple.poc');
});

