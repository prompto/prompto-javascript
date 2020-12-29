var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted DowncastMutable', () => {
	checkInterpretedOutput('mutability/downcastMutable.poc');
});

test('Transpiled DowncastMutable', () => {
	checkTranspiledOutput('mutability/downcastMutable.poc');
});

test('Interpreted Immutable', () => {
	checkInterpretedOutput('mutability/immutable.poc');
});

test('Transpiled Immutable', () => {
	checkTranspiledOutput('mutability/immutable.poc');
});

test('Interpreted ImmutableArgument', () => {
	checkInterpretedOutput('mutability/immutableArgument.poc');
});

test('Transpiled ImmutableArgument', () => {
	checkTranspiledOutput('mutability/immutableArgument.poc');
});

test('Interpreted ImmutableDict', () => {
	checkInterpretedOutput('mutability/immutableDict.poc');
});

test('Transpiled ImmutableDict', () => {
	checkTranspiledOutput('mutability/immutableDict.poc');
});

test('Interpreted ImmutableList', () => {
	checkInterpretedOutput('mutability/immutableList.poc');
});

test('Transpiled ImmutableList', () => {
	checkTranspiledOutput('mutability/immutableList.poc');
});

test('Interpreted ImmutableMember', () => {
	checkInterpretedOutput('mutability/immutableMember.poc');
});

test('Transpiled ImmutableMember', () => {
	checkTranspiledOutput('mutability/immutableMember.poc');
});

test('Interpreted ImmutableTuple', () => {
	checkInterpretedOutput('mutability/immutableTuple.poc');
});

test('Transpiled ImmutableTuple', () => {
	checkTranspiledOutput('mutability/immutableTuple.poc');
});

test('Interpreted Mutable', () => {
	checkInterpretedOutput('mutability/mutable.poc');
});

test('Transpiled Mutable', () => {
	checkTranspiledOutput('mutability/mutable.poc');
});

test('Interpreted MutableArgument', () => {
	checkInterpretedOutput('mutability/mutableArgument.poc');
});

test('Transpiled MutableArgument', () => {
	checkTranspiledOutput('mutability/mutableArgument.poc');
});

test('Interpreted MutableDict', () => {
	checkInterpretedOutput('mutability/mutableDict.poc');
});

test('Transpiled MutableDict', () => {
	checkTranspiledOutput('mutability/mutableDict.poc');
});

test('Interpreted MutableList', () => {
	checkInterpretedOutput('mutability/mutableList.poc');
});

test('Transpiled MutableList', () => {
	checkTranspiledOutput('mutability/mutableList.poc');
});

test('Interpreted MutableTuple', () => {
	checkInterpretedOutput('mutability/mutableTuple.poc');
});

test('Transpiled MutableTuple', () => {
	checkTranspiledOutput('mutability/mutableTuple.poc');
});

