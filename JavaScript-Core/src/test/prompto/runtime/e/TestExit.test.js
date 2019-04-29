var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted AssignedReturn', () => {
	checkInterpretedOutput('exit/assignedReturn.pec');
});

test('Transpiled AssignedReturn', () => {
	checkTranspiledOutput('exit/assignedReturn.pec');
});

test('Interpreted AssignedReturnInDoWhile', () => {
	checkInterpretedOutput('exit/assignedReturnInDoWhile.pec');
});

test('Transpiled AssignedReturnInDoWhile', () => {
	checkTranspiledOutput('exit/assignedReturnInDoWhile.pec');
});

test('Interpreted AssignedReturnInForEach', () => {
	checkInterpretedOutput('exit/assignedReturnInForEach.pec');
});

test('Transpiled AssignedReturnInForEach', () => {
	checkTranspiledOutput('exit/assignedReturnInForEach.pec');
});

test('Interpreted AssignedReturnInIf', () => {
	checkInterpretedOutput('exit/assignedReturnInIf.pec');
});

test('Transpiled AssignedReturnInIf', () => {
	checkTranspiledOutput('exit/assignedReturnInIf.pec');
});

test('Interpreted AssignedReturnInWhile', () => {
	checkInterpretedOutput('exit/assignedReturnInWhile.pec');
});

test('Transpiled AssignedReturnInWhile', () => {
	checkTranspiledOutput('exit/assignedReturnInWhile.pec');
});

test('Interpreted UnassignedReturn', () => {
	checkInterpretedOutput('exit/unassignedReturn.pec');
});

test('Transpiled UnassignedReturn', () => {
	checkTranspiledOutput('exit/unassignedReturn.pec');
});

test('Interpreted UnassignedReturnInDoWhile', () => {
	checkInterpretedOutput('exit/unassignedReturnInDoWhile.pec');
});

test('Transpiled UnassignedReturnInDoWhile', () => {
	checkTranspiledOutput('exit/unassignedReturnInDoWhile.pec');
});

test('Interpreted UnassignedReturnInForEach', () => {
	checkInterpretedOutput('exit/unassignedReturnInForEach.pec');
});

test('Transpiled UnassignedReturnInForEach', () => {
	checkTranspiledOutput('exit/unassignedReturnInForEach.pec');
});

test('Interpreted UnassignedReturnInIf', () => {
	checkInterpretedOutput('exit/unassignedReturnInIf.pec');
});

test('Transpiled UnassignedReturnInIf', () => {
	checkTranspiledOutput('exit/unassignedReturnInIf.pec');
});

test('Interpreted UnassignedReturnInWhile', () => {
	checkInterpretedOutput('exit/unassignedReturnInWhile.pec');
});

test('Transpiled UnassignedReturnInWhile', () => {
	checkTranspiledOutput('exit/unassignedReturnInWhile.pec');
});

