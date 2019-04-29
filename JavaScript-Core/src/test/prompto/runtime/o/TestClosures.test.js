var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted GlobalClosureNoArg', () => {
	checkInterpretedOutput('closures/globalClosureNoArg.poc');
});

test('Transpiled GlobalClosureNoArg', () => {
	checkTranspiledOutput('closures/globalClosureNoArg.poc');
});

test('Interpreted GlobalClosureWithArg', () => {
	checkInterpretedOutput('closures/globalClosureWithArg.poc');
});

test('Transpiled GlobalClosureWithArg', () => {
	checkTranspiledOutput('closures/globalClosureWithArg.poc');
});

test('Interpreted InstanceClosureNoArg', () => {
	checkInterpretedOutput('closures/instanceClosureNoArg.poc');
});

test('Transpiled InstanceClosureNoArg', () => {
	checkTranspiledOutput('closures/instanceClosureNoArg.poc');
});

