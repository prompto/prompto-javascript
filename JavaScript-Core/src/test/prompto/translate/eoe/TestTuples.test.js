var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('MultiAssignment', () => {
	compareResourceEOE('tuples/multiAssignment.pec');
});

test('SingleAssignment', () => {
	compareResourceEOE('tuples/singleAssignment.pec');
});

test('TupleElement', () => {
	compareResourceEOE('tuples/tupleElement.pec');
});

