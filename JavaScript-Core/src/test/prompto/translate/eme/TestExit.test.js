var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('AssignedReturn', () => {
	compareResourceEME('exit/assignedReturn.pec');
});

test('AssignedReturnInDoWhile', () => {
	compareResourceEME('exit/assignedReturnInDoWhile.pec');
});

test('AssignedReturnInForEach', () => {
	compareResourceEME('exit/assignedReturnInForEach.pec');
});

test('AssignedReturnInIf', () => {
	compareResourceEME('exit/assignedReturnInIf.pec');
});

test('AssignedReturnInWhile', () => {
	compareResourceEME('exit/assignedReturnInWhile.pec');
});

test('UnassignedReturn', () => {
	compareResourceEME('exit/unassignedReturn.pec');
});

test('UnassignedReturnInDoWhile', () => {
	compareResourceEME('exit/unassignedReturnInDoWhile.pec');
});

test('UnassignedReturnInForEach', () => {
	compareResourceEME('exit/unassignedReturnInForEach.pec');
});

test('UnassignedReturnInIf', () => {
	compareResourceEME('exit/unassignedReturnInIf.pec');
});

test('UnassignedReturnInWhile', () => {
	compareResourceEME('exit/unassignedReturnInWhile.pec');
});

