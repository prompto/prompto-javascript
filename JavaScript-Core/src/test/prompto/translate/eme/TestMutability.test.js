var compareResourceEME = require("../../parser/BaseParserTest").compareResourceEME;

test('Immutable', () => {
	compareResourceEME('mutability/immutable.pec');
});

test('ImmutableArgument', () => {
	compareResourceEME('mutability/immutableArgument.pec');
});

test('ImmutableDict', () => {
	compareResourceEME('mutability/immutableDict.pec');
});

test('ImmutableList', () => {
	compareResourceEME('mutability/immutableList.pec');
});

test('ImmutableMember', () => {
	compareResourceEME('mutability/immutableMember.pec');
});

test('ImmutableTuple', () => {
	compareResourceEME('mutability/immutableTuple.pec');
});

test('Mutable', () => {
	compareResourceEME('mutability/mutable.pec');
});

test('MutableArgument', () => {
	compareResourceEME('mutability/mutableArgument.pec');
});

test('MutableChild', () => {
	compareResourceEME('mutability/mutableChild.pec');
});

test('MutableDict', () => {
	compareResourceEME('mutability/mutableDict.pec');
});

test('MutableInstance', () => {
	compareResourceEME('mutability/mutableInstance.pec');
});

test('MutableList', () => {
	compareResourceEME('mutability/mutableList.pec');
});

test('MutableTuple', () => {
	compareResourceEME('mutability/mutableTuple.pec');
});

