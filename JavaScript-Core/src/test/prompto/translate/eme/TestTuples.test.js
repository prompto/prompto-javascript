var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('MultiAssignment', () => {
	compareResourceEME('tuples/multiAssignment.pec');
});

test('SingleAssignment', () => {
	compareResourceEME('tuples/singleAssignment.pec');
});

test('TupleElement', () => {
	compareResourceEME('tuples/tupleElement.pec');
});

