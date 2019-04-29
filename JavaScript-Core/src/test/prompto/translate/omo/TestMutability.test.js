var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('Immutable', () => {
	compareResourceOMO('mutability/immutable.poc');
});

test('ImmutableArgument', () => {
	compareResourceOMO('mutability/immutableArgument.poc');
});

test('ImmutableDict', () => {
	compareResourceOMO('mutability/immutableDict.poc');
});

test('ImmutableList', () => {
	compareResourceOMO('mutability/immutableList.poc');
});

test('ImmutableMember', () => {
	compareResourceOMO('mutability/immutableMember.poc');
});

test('ImmutableTuple', () => {
	compareResourceOMO('mutability/immutableTuple.poc');
});

test('Mutable', () => {
	compareResourceOMO('mutability/mutable.poc');
});

test('MutableArgument', () => {
	compareResourceOMO('mutability/mutableArgument.poc');
});

test('MutableDict', () => {
	compareResourceOMO('mutability/mutableDict.poc');
});

test('MutableList', () => {
	compareResourceOMO('mutability/mutableList.poc');
});

test('MutableMember', () => {
	compareResourceOMO('mutability/mutableMember.poc');
});

test('MutableTuple', () => {
	compareResourceOMO('mutability/mutableTuple.poc');
});

