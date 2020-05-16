var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted EqBoolean', () => {
	checkInterpretedOutput('equals/eqBoolean.poc');
});

test('Transpiled EqBoolean', () => {
	checkTranspiledOutput('equals/eqBoolean.poc');
});

test('Interpreted EqCharacter', () => {
	checkInterpretedOutput('equals/eqCharacter.poc');
});

test('Transpiled EqCharacter', () => {
	checkTranspiledOutput('equals/eqCharacter.poc');
});

test('Interpreted EqDate', () => {
	checkInterpretedOutput('equals/eqDate.poc');
});

test('Transpiled EqDate', () => {
	checkTranspiledOutput('equals/eqDate.poc');
});

test('Interpreted EqDateTime', () => {
	checkInterpretedOutput('equals/eqDateTime.poc');
});

test('Transpiled EqDateTime', () => {
	checkTranspiledOutput('equals/eqDateTime.poc');
});

test('Interpreted EqDecimal', () => {
	checkInterpretedOutput('equals/eqDecimal.poc');
});

test('Transpiled EqDecimal', () => {
	checkTranspiledOutput('equals/eqDecimal.poc');
});

test('Interpreted EqDict', () => {
	checkInterpretedOutput('equals/eqDict.poc');
});

test('Transpiled EqDict', () => {
	checkTranspiledOutput('equals/eqDict.poc');
});

test('Interpreted EqInteger', () => {
	checkInterpretedOutput('equals/eqInteger.poc');
});

test('Transpiled EqInteger', () => {
	checkTranspiledOutput('equals/eqInteger.poc');
});

test('Interpreted EqList', () => {
	checkInterpretedOutput('equals/eqList.poc');
});

test('Transpiled EqList', () => {
	checkTranspiledOutput('equals/eqList.poc');
});

test('Interpreted EqPeriod', () => {
	checkInterpretedOutput('equals/eqPeriod.poc');
});

test('Transpiled EqPeriod', () => {
	checkTranspiledOutput('equals/eqPeriod.poc');
});

test('Interpreted EqRange', () => {
	checkInterpretedOutput('equals/eqRange.poc');
});

test('Transpiled EqRange', () => {
	checkTranspiledOutput('equals/eqRange.poc');
});

test('Interpreted EqSet', () => {
	checkInterpretedOutput('equals/eqSet.poc');
});

test('Transpiled EqSet', () => {
	checkTranspiledOutput('equals/eqSet.poc');
});

test('Interpreted EqText', () => {
	checkInterpretedOutput('equals/eqText.poc');
});

test('Transpiled EqText', () => {
	checkTranspiledOutput('equals/eqText.poc');
});

test('Interpreted EqTime', () => {
	checkInterpretedOutput('equals/eqTime.poc');
});

test('Transpiled EqTime', () => {
	checkTranspiledOutput('equals/eqTime.poc');
});

test('Interpreted EqVersion', () => {
	checkInterpretedOutput('equals/eqVersion.poc');
});

test('Transpiled EqVersion', () => {
	checkTranspiledOutput('equals/eqVersion.poc');
});

test('Interpreted IsABoolean', () => {
	checkInterpretedOutput('equals/isABoolean.poc');
});

test('Transpiled IsABoolean', () => {
	checkTranspiledOutput('equals/isABoolean.poc');
});

test('Interpreted IsBoolean', () => {
	checkInterpretedOutput('equals/isBoolean.poc');
});

test('Transpiled IsBoolean', () => {
	checkTranspiledOutput('equals/isBoolean.poc');
});

test('Interpreted IsInstance', () => {
	checkInterpretedOutput('equals/isInstance.poc');
});

test('Transpiled IsInstance', () => {
	checkTranspiledOutput('equals/isInstance.poc');
});

test('Interpreted IsNotABoolean', () => {
	checkInterpretedOutput('equals/isNotABoolean.poc');
});

test('Transpiled IsNotABoolean', () => {
	checkTranspiledOutput('equals/isNotABoolean.poc');
});

test('Interpreted IsNotBoolean', () => {
	checkInterpretedOutput('equals/isNotBoolean.poc');
});

test('Transpiled IsNotBoolean', () => {
	checkTranspiledOutput('equals/isNotBoolean.poc');
});

test('Interpreted IsNotInstance', () => {
	checkInterpretedOutput('equals/isNotInstance.poc');
});

test('Transpiled IsNotInstance', () => {
	checkTranspiledOutput('equals/isNotInstance.poc');
});

test('Interpreted NeqBoolean', () => {
	checkInterpretedOutput('equals/neqBoolean.poc');
});

test('Transpiled NeqBoolean', () => {
	checkTranspiledOutput('equals/neqBoolean.poc');
});

test('Interpreted NeqCharacter', () => {
	checkInterpretedOutput('equals/neqCharacter.poc');
});

test('Transpiled NeqCharacter', () => {
	checkTranspiledOutput('equals/neqCharacter.poc');
});

test('Interpreted NeqDate', () => {
	checkInterpretedOutput('equals/neqDate.poc');
});

test('Transpiled NeqDate', () => {
	checkTranspiledOutput('equals/neqDate.poc');
});

test('Interpreted NeqDateTime', () => {
	checkInterpretedOutput('equals/neqDateTime.poc');
});

test('Transpiled NeqDateTime', () => {
	checkTranspiledOutput('equals/neqDateTime.poc');
});

test('Interpreted NeqDecimal', () => {
	checkInterpretedOutput('equals/neqDecimal.poc');
});

test('Transpiled NeqDecimal', () => {
	checkTranspiledOutput('equals/neqDecimal.poc');
});

test('Interpreted NeqDict', () => {
	checkInterpretedOutput('equals/neqDict.poc');
});

test('Transpiled NeqDict', () => {
	checkTranspiledOutput('equals/neqDict.poc');
});

test('Interpreted NeqInteger', () => {
	checkInterpretedOutput('equals/neqInteger.poc');
});

test('Transpiled NeqInteger', () => {
	checkTranspiledOutput('equals/neqInteger.poc');
});

test('Interpreted NeqList', () => {
	checkInterpretedOutput('equals/neqList.poc');
});

test('Transpiled NeqList', () => {
	checkTranspiledOutput('equals/neqList.poc');
});

test('Interpreted NeqPeriod', () => {
	checkInterpretedOutput('equals/neqPeriod.poc');
});

test('Transpiled NeqPeriod', () => {
	checkTranspiledOutput('equals/neqPeriod.poc');
});

test('Interpreted NeqRange', () => {
	checkInterpretedOutput('equals/neqRange.poc');
});

test('Transpiled NeqRange', () => {
	checkTranspiledOutput('equals/neqRange.poc');
});

test('Interpreted NeqSet', () => {
	checkInterpretedOutput('equals/neqSet.poc');
});

test('Transpiled NeqSet', () => {
	checkTranspiledOutput('equals/neqSet.poc');
});

test('Interpreted NeqText', () => {
	checkInterpretedOutput('equals/neqText.poc');
});

test('Transpiled NeqText', () => {
	checkTranspiledOutput('equals/neqText.poc');
});

test('Interpreted NeqTime', () => {
	checkInterpretedOutput('equals/neqTime.poc');
});

test('Transpiled NeqTime', () => {
	checkTranspiledOutput('equals/neqTime.poc');
});

test('Interpreted ReqText', () => {
	checkInterpretedOutput('equals/reqText.poc');
});

test('Transpiled ReqText', () => {
	checkTranspiledOutput('equals/reqText.poc');
});

