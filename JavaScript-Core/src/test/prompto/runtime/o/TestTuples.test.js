var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted MultiAssignment', () => {
	checkInterpretedOutput('tuples/multiAssignment.poc');
});

test('Transpiled MultiAssignment', () => {
	checkTranspiledOutput('tuples/multiAssignment.poc');
});

test('Interpreted SingleAssignment', () => {
	checkInterpretedOutput('tuples/singleAssignment.poc');
});

test('Transpiled SingleAssignment', () => {
	checkTranspiledOutput('tuples/singleAssignment.poc');
});

test('Interpreted TupleElement', () => {
	checkInterpretedOutput('tuples/tupleElement.poc');
});

test('Transpiled TupleElement', () => {
	checkTranspiledOutput('tuples/tupleElement.poc');
});

