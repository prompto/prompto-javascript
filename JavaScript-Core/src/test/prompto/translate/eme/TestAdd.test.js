var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('AddCharacter', () => {
	compareResourceEME('add/addCharacter.pec');
});

test('AddDate', () => {
	compareResourceEME('add/addDate.pec');
});

test('AddDateTime', () => {
	compareResourceEME('add/addDateTime.pec');
});

test('AddDecimal', () => {
	compareResourceEME('add/addDecimal.pec');
});

test('AddDecimalEnum', () => {
	compareResourceEME('add/addDecimalEnum.pec');
});

test('AddDict', () => {
	compareResourceEME('add/addDict.pec');
});

test('AddInteger', () => {
	compareResourceEME('add/addInteger.pec');
});

test('AddIntegerEnum', () => {
	compareResourceEME('add/addIntegerEnum.pec');
});

test('AddList', () => {
	compareResourceEME('add/addList.pec');
});

test('AddPeriod', () => {
	compareResourceEME('add/addPeriod.pec');
});

test('AddSet', () => {
	compareResourceEME('add/addSet.pec');
});

test('AddTextCharacter', () => {
	compareResourceEME('add/addTextCharacter.pec');
});

test('AddTextDecimal', () => {
	compareResourceEME('add/addTextDecimal.pec');
});

test('AddTextEnum', () => {
	compareResourceEME('add/addTextEnum.pec');
});

test('AddTextInteger', () => {
	compareResourceEME('add/addTextInteger.pec');
});

test('AddTextText', () => {
	compareResourceEME('add/addTextText.pec');
});

test('AddTime', () => {
	compareResourceEME('add/addTime.pec');
});

test('AddTuple', () => {
	compareResourceEME('add/addTuple.pec');
});

