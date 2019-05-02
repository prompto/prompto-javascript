var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted SortCategory1Arg', () => {
	checkInterpretedOutput('arrow/sortCategory1Arg.poc');
});

test('Transpiled SortCategory1Arg', () => {
	checkTranspiledOutput('arrow/sortCategory1Arg.poc');
});

test('Interpreted SortCategory2Args', () => {
	checkInterpretedOutput('arrow/sortCategory2Args.poc');
});

test('Transpiled SortCategory2Args', () => {
	checkTranspiledOutput('arrow/sortCategory2Args.poc');
});

test('Interpreted SortText1Arg', () => {
	checkInterpretedOutput('arrow/sortText1Arg.poc');
});

test('Transpiled SortText1Arg', () => {
	checkTranspiledOutput('arrow/sortText1Arg.poc');
});

test('Interpreted SortText1ArgDesc', () => {
	checkInterpretedOutput('arrow/sortText1ArgDesc.poc');
});

test('Transpiled SortText1ArgDesc', () => {
	checkTranspiledOutput('arrow/sortText1ArgDesc.poc');
});

test('Interpreted SortText2Args', () => {
	checkInterpretedOutput('arrow/sortText2Args.poc');
});

test('Transpiled SortText2Args', () => {
	checkTranspiledOutput('arrow/sortText2Args.poc');
});

test('Interpreted SortText2ArgsDesc', () => {
	checkInterpretedOutput('arrow/sortText2ArgsDesc.poc');
});

test('Transpiled SortText2ArgsDesc', () => {
	checkTranspiledOutput('arrow/sortText2ArgsDesc.poc');
});

