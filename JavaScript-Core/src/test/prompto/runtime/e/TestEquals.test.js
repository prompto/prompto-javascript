var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted EqBoolean', () => {
	checkInterpretedOutput('equals/eqBoolean.pec');
});

test('Transpiled EqBoolean', () => {
	checkTranspiledOutput('equals/eqBoolean.pec');
});

test('Interpreted EqCharacter', () => {
	checkInterpretedOutput('equals/eqCharacter.pec');
});

test('Transpiled EqCharacter', () => {
	checkTranspiledOutput('equals/eqCharacter.pec');
});

test('Interpreted EqDate', () => {
	checkInterpretedOutput('equals/eqDate.pec');
});

test('Transpiled EqDate', () => {
	checkTranspiledOutput('equals/eqDate.pec');
});

test('Interpreted EqDateTime', () => {
	checkInterpretedOutput('equals/eqDateTime.pec');
});

test('Transpiled EqDateTime', () => {
	checkTranspiledOutput('equals/eqDateTime.pec');
});

test('Interpreted EqDecimal', () => {
	checkInterpretedOutput('equals/eqDecimal.pec');
});

test('Transpiled EqDecimal', () => {
	checkTranspiledOutput('equals/eqDecimal.pec');
});

test('Interpreted EqDict', () => {
	checkInterpretedOutput('equals/eqDict.pec');
});

test('Transpiled EqDict', () => {
	checkTranspiledOutput('equals/eqDict.pec');
});

test('Interpreted EqInteger', () => {
	checkInterpretedOutput('equals/eqInteger.pec');
});

test('Transpiled EqInteger', () => {
	checkTranspiledOutput('equals/eqInteger.pec');
});

test('Interpreted EqList', () => {
	checkInterpretedOutput('equals/eqList.pec');
});

test('Transpiled EqList', () => {
	checkTranspiledOutput('equals/eqList.pec');
});

test('Interpreted EqPeriod', () => {
	checkInterpretedOutput('equals/eqPeriod.pec');
});

test('Transpiled EqPeriod', () => {
	checkTranspiledOutput('equals/eqPeriod.pec');
});

test('Interpreted EqRange', () => {
	checkInterpretedOutput('equals/eqRange.pec');
});

test('Transpiled EqRange', () => {
	checkTranspiledOutput('equals/eqRange.pec');
});

test('Interpreted EqSet', () => {
	checkInterpretedOutput('equals/eqSet.pec');
});

test('Transpiled EqSet', () => {
	checkTranspiledOutput('equals/eqSet.pec');
});

test('Interpreted EqText', () => {
	checkInterpretedOutput('equals/eqText.pec');
});

test('Transpiled EqText', () => {
	checkTranspiledOutput('equals/eqText.pec');
});

test('Interpreted EqTime', () => {
	checkInterpretedOutput('equals/eqTime.pec');
});

test('Transpiled EqTime', () => {
	checkTranspiledOutput('equals/eqTime.pec');
});

test('Interpreted EqVersion', () => {
	checkInterpretedOutput('equals/eqVersion.pec');
});

test('Transpiled EqVersion', () => {
	checkTranspiledOutput('equals/eqVersion.pec');
});

test('Interpreted IsBoolean', () => {
	checkInterpretedOutput('equals/isBoolean.pec');
});

test('Transpiled IsBoolean', () => {
	checkTranspiledOutput('equals/isBoolean.pec');
});

test('Interpreted IsInstance', () => {
	checkInterpretedOutput('equals/isInstance.pec');
});

test('Transpiled IsInstance', () => {
	checkTranspiledOutput('equals/isInstance.pec');
});

test('Interpreted IsNotBoolean', () => {
	checkInterpretedOutput('equals/isNotBoolean.pec');
});

test('Transpiled IsNotBoolean', () => {
	checkTranspiledOutput('equals/isNotBoolean.pec');
});

test('Interpreted IsNotInstance', () => {
	checkInterpretedOutput('equals/isNotInstance.pec');
});

test('Transpiled IsNotInstance', () => {
	checkTranspiledOutput('equals/isNotInstance.pec');
});

test('Interpreted NeqBoolean', () => {
	checkInterpretedOutput('equals/neqBoolean.pec');
});

test('Transpiled NeqBoolean', () => {
	checkTranspiledOutput('equals/neqBoolean.pec');
});

test('Interpreted NeqCharacter', () => {
	checkInterpretedOutput('equals/neqCharacter.pec');
});

test('Transpiled NeqCharacter', () => {
	checkTranspiledOutput('equals/neqCharacter.pec');
});

test('Interpreted NeqDate', () => {
	checkInterpretedOutput('equals/neqDate.pec');
});

test('Transpiled NeqDate', () => {
	checkTranspiledOutput('equals/neqDate.pec');
});

test('Interpreted NeqDateTime', () => {
	checkInterpretedOutput('equals/neqDateTime.pec');
});

test('Transpiled NeqDateTime', () => {
	checkTranspiledOutput('equals/neqDateTime.pec');
});

test('Interpreted NeqDecimal', () => {
	checkInterpretedOutput('equals/neqDecimal.pec');
});

test('Transpiled NeqDecimal', () => {
	checkTranspiledOutput('equals/neqDecimal.pec');
});

test('Interpreted NeqDict', () => {
	checkInterpretedOutput('equals/neqDict.pec');
});

test('Transpiled NeqDict', () => {
	checkTranspiledOutput('equals/neqDict.pec');
});

test('Interpreted NeqInteger', () => {
	checkInterpretedOutput('equals/neqInteger.pec');
});

test('Transpiled NeqInteger', () => {
	checkTranspiledOutput('equals/neqInteger.pec');
});

test('Interpreted NeqList', () => {
	checkInterpretedOutput('equals/neqList.pec');
});

test('Transpiled NeqList', () => {
	checkTranspiledOutput('equals/neqList.pec');
});

test('Interpreted NeqPeriod', () => {
	checkInterpretedOutput('equals/neqPeriod.pec');
});

test('Transpiled NeqPeriod', () => {
	checkTranspiledOutput('equals/neqPeriod.pec');
});

test('Interpreted NeqRange', () => {
	checkInterpretedOutput('equals/neqRange.pec');
});

test('Transpiled NeqRange', () => {
	checkTranspiledOutput('equals/neqRange.pec');
});

test('Interpreted NeqSet', () => {
	checkInterpretedOutput('equals/neqSet.pec');
});

test('Transpiled NeqSet', () => {
	checkTranspiledOutput('equals/neqSet.pec');
});

test('Interpreted NeqText', () => {
	checkInterpretedOutput('equals/neqText.pec');
});

test('Transpiled NeqText', () => {
	checkTranspiledOutput('equals/neqText.pec');
});

test('Interpreted NeqTime', () => {
	checkInterpretedOutput('equals/neqTime.pec');
});

test('Transpiled NeqTime', () => {
	checkTranspiledOutput('equals/neqTime.pec');
});

test('Interpreted ReqText', () => {
	checkInterpretedOutput('equals/reqText.pec');
});

test('Transpiled ReqText', () => {
	checkTranspiledOutput('equals/reqText.pec');
});

