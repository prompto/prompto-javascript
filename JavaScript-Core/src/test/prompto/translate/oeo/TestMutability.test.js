var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('Immutable', () => {
	compareResourceOEO('mutability/immutable.poc');
});

test('ImmutableArgument', () => {
	compareResourceOEO('mutability/immutableArgument.poc');
});

test('ImmutableDict', () => {
	compareResourceOEO('mutability/immutableDict.poc');
});

test('ImmutableList', () => {
	compareResourceOEO('mutability/immutableList.poc');
});

test('ImmutableMember', () => {
	compareResourceOEO('mutability/immutableMember.poc');
});

test('ImmutableTuple', () => {
	compareResourceOEO('mutability/immutableTuple.poc');
});

test('Mutable', () => {
	compareResourceOEO('mutability/mutable.poc');
});

test('MutableArgument', () => {
	compareResourceOEO('mutability/mutableArgument.poc');
});

test('MutableDict', () => {
	compareResourceOEO('mutability/mutableDict.poc');
});

test('MutableList', () => {
	compareResourceOEO('mutability/mutableList.poc');
});

test('MutableMember', () => {
	compareResourceOEO('mutability/mutableMember.poc');
});

test('MutableTuple', () => {
	compareResourceOEO('mutability/mutableTuple.poc');
});

