var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted MultiAssignment', () => {
	checkInterpretedOutput('tuples/multiAssignment.pec');
});

test('Transpiled MultiAssignment', () => {
	checkTranspiledOutput('tuples/multiAssignment.pec');
});

test('Interpreted SingleAssignment', () => {
	checkInterpretedOutput('tuples/singleAssignment.pec');
});

test('Transpiled SingleAssignment', () => {
	checkTranspiledOutput('tuples/singleAssignment.pec');
});

test('Interpreted TupleElement', () => {
	checkInterpretedOutput('tuples/tupleElement.pec');
});

test('Transpiled TupleElement', () => {
	checkTranspiledOutput('tuples/tupleElement.pec');
});

