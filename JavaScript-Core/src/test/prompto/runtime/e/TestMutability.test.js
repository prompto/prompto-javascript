var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted Immutable', () => {
	checkInterpretedOutput('mutability/immutable.pec');
});

test('Transpiled Immutable', () => {
	checkTranspiledOutput('mutability/immutable.pec');
});

test('Interpreted ImmutableArgument', () => {
	checkInterpretedOutput('mutability/immutableArgument.pec');
});

test('Transpiled ImmutableArgument', () => {
	checkTranspiledOutput('mutability/immutableArgument.pec');
});

test('Interpreted ImmutableDict', () => {
	checkInterpretedOutput('mutability/immutableDict.pec');
});

test('Transpiled ImmutableDict', () => {
	checkTranspiledOutput('mutability/immutableDict.pec');
});

test('Interpreted ImmutableList', () => {
	checkInterpretedOutput('mutability/immutableList.pec');
});

test('Transpiled ImmutableList', () => {
	checkTranspiledOutput('mutability/immutableList.pec');
});

test('Interpreted ImmutableMember', () => {
	checkInterpretedOutput('mutability/immutableMember.pec');
});

test('Transpiled ImmutableMember', () => {
	checkTranspiledOutput('mutability/immutableMember.pec');
});

test('Interpreted ImmutableTuple', () => {
	checkInterpretedOutput('mutability/immutableTuple.pec');
});

test('Transpiled ImmutableTuple', () => {
	checkTranspiledOutput('mutability/immutableTuple.pec');
});

test('Interpreted Mutable', () => {
	checkInterpretedOutput('mutability/mutable.pec');
});

test('Transpiled Mutable', () => {
	checkTranspiledOutput('mutability/mutable.pec');
});

test('Interpreted MutableArgument', () => {
	checkInterpretedOutput('mutability/mutableArgument.pec');
});

test('Transpiled MutableArgument', () => {
	checkTranspiledOutput('mutability/mutableArgument.pec');
});

test('Interpreted MutableChild', () => {
	checkInterpretedOutput('mutability/mutableChild.pec');
});

test('Transpiled MutableChild', () => {
	checkTranspiledOutput('mutability/mutableChild.pec');
});

test('Interpreted MutableDict', () => {
	checkInterpretedOutput('mutability/mutableDict.pec');
});

test('Transpiled MutableDict', () => {
	checkTranspiledOutput('mutability/mutableDict.pec');
});

test('Interpreted MutableInstance', () => {
	checkInterpretedOutput('mutability/mutableInstance.pec');
});

test('Transpiled MutableInstance', () => {
	checkTranspiledOutput('mutability/mutableInstance.pec');
});

test('Interpreted MutableList', () => {
	checkInterpretedOutput('mutability/mutableList.pec');
});

test('Transpiled MutableList', () => {
	checkTranspiledOutput('mutability/mutableList.pec');
});

test('Interpreted MutableTuple', () => {
	checkInterpretedOutput('mutability/mutableTuple.pec');
});

test('Transpiled MutableTuple', () => {
	checkTranspiledOutput('mutability/mutableTuple.pec');
});

