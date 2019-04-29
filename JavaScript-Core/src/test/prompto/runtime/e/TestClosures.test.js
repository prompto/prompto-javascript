var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseEParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseEParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted GlobalClosureNoArg', () => {
	checkInterpretedOutput('closures/globalClosureNoArg.pec');
});

test('Transpiled GlobalClosureNoArg', () => {
	checkTranspiledOutput('closures/globalClosureNoArg.pec');
});

test('Interpreted GlobalClosureWithArg', () => {
	checkInterpretedOutput('closures/globalClosureWithArg.pec');
});

test('Transpiled GlobalClosureWithArg', () => {
	checkTranspiledOutput('closures/globalClosureWithArg.pec');
});

test('Interpreted InstanceClosureNoArg', () => {
	checkInterpretedOutput('closures/instanceClosureNoArg.pec');
});

test('Transpiled InstanceClosureNoArg', () => {
	checkTranspiledOutput('closures/instanceClosureNoArg.pec');
});

test('Interpreted ParameterClosure', () => {
	checkInterpretedOutput('closures/parameterClosure.pec');
});

test('Transpiled ParameterClosure', () => {
	checkTranspiledOutput('closures/parameterClosure.pec');
});

