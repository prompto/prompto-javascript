var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted CategoryEnum', () => {
	checkInterpretedOutput('enums/categoryEnum.poc');
});

test('Transpiled CategoryEnum', () => {
	checkTranspiledOutput('enums/categoryEnum.poc');
});

test('Interpreted IntegerEnum', () => {
	checkInterpretedOutput('enums/integerEnum.poc');
});

test('Transpiled IntegerEnum', () => {
	checkTranspiledOutput('enums/integerEnum.poc');
});

test('Interpreted SwitchEnum', () => {
	checkInterpretedOutput('enums/switchEnum.poc');
});

test('Transpiled SwitchEnum', () => {
	checkTranspiledOutput('enums/switchEnum.poc');
});

test('Interpreted TextEnum', () => {
	checkInterpretedOutput('enums/textEnum.poc');
});

test('Transpiled TextEnum', () => {
	checkTranspiledOutput('enums/textEnum.poc');
});

test('Interpreted TextEnumArg', () => {
	checkInterpretedOutput('enums/textEnumArg.poc');
});

test('Transpiled TextEnumArg', () => {
	checkTranspiledOutput('enums/textEnumArg.poc');
});

test('Interpreted TextEnumVar', () => {
	checkInterpretedOutput('enums/textEnumVar.poc');
});

test('Transpiled TextEnumVar', () => {
	checkTranspiledOutput('enums/textEnumVar.poc');
});

