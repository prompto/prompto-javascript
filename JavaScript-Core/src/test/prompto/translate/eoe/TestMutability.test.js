var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('Immutable', () => {
	compareResourceEOE('mutability/immutable.pec');
});

test('ImmutableArgument', () => {
	compareResourceEOE('mutability/immutableArgument.pec');
});

test('ImmutableDict', () => {
	compareResourceEOE('mutability/immutableDict.pec');
});

test('ImmutableList', () => {
	compareResourceEOE('mutability/immutableList.pec');
});

test('ImmutableMember', () => {
	compareResourceEOE('mutability/immutableMember.pec');
});

test('ImmutableTuple', () => {
	compareResourceEOE('mutability/immutableTuple.pec');
});

test('Mutable', () => {
	compareResourceEOE('mutability/mutable.pec');
});

test('MutableArgument', () => {
	compareResourceEOE('mutability/mutableArgument.pec');
});

test('MutableChild', () => {
	compareResourceEOE('mutability/mutableChild.pec');
});

test('MutableDict', () => {
	compareResourceEOE('mutability/mutableDict.pec');
});

test('MutableInstance', () => {
	compareResourceEOE('mutability/mutableInstance.pec');
});

test('MutableList', () => {
	compareResourceEOE('mutability/mutableList.pec');
});

test('MutableMember', () => {
	compareResourceEOE('mutability/mutableMember.pec');
});

test('MutableTuple', () => {
	compareResourceEOE('mutability/mutableTuple.pec');
});

