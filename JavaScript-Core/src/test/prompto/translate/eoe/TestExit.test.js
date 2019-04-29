var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('AssignedReturn', () => {
	compareResourceEOE('exit/assignedReturn.pec');
});

test('AssignedReturnInDoWhile', () => {
	compareResourceEOE('exit/assignedReturnInDoWhile.pec');
});

test('AssignedReturnInForEach', () => {
	compareResourceEOE('exit/assignedReturnInForEach.pec');
});

test('AssignedReturnInIf', () => {
	compareResourceEOE('exit/assignedReturnInIf.pec');
});

test('AssignedReturnInWhile', () => {
	compareResourceEOE('exit/assignedReturnInWhile.pec');
});

test('UnassignedReturn', () => {
	compareResourceEOE('exit/unassignedReturn.pec');
});

test('UnassignedReturnInDoWhile', () => {
	compareResourceEOE('exit/unassignedReturnInDoWhile.pec');
});

test('UnassignedReturnInForEach', () => {
	compareResourceEOE('exit/unassignedReturnInForEach.pec');
});

test('UnassignedReturnInIf', () => {
	compareResourceEOE('exit/unassignedReturnInIf.pec');
});

test('UnassignedReturnInWhile', () => {
	compareResourceEOE('exit/unassignedReturnInWhile.pec');
});

