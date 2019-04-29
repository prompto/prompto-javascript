var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('MultiAssignment', () => {
	compareResourceOEO('tuples/multiAssignment.poc');
});

test('SingleAssignment', () => {
	compareResourceOEO('tuples/singleAssignment.poc');
});

test('TupleElement', () => {
	compareResourceOEO('tuples/tupleElement.poc');
});

