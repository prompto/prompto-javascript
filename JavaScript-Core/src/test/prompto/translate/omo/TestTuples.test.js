var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('MultiAssignment', () => {
	compareResourceOMO('tuples/multiAssignment.poc');
});

test('SingleAssignment', () => {
	compareResourceOMO('tuples/singleAssignment.poc');
});

test('TupleElement', () => {
	compareResourceOMO('tuples/tupleElement.poc');
});

