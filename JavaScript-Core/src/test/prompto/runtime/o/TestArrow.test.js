var Out = require("../utils/Out").Out;
var checkInterpretedOutput = require("../../parser/BaseOParserTest").checkInterpretedOutput;
var checkTranspiledOutput = require("../../parser/BaseOParserTest").checkTranspiledOutput;

beforeEach( () => {
	Out.init();
});

afterEach( () => {
	Out.restore();
});

test('Interpreted ArrowArgument', () => {
	checkInterpretedOutput('arrow/arrowArgument.poc');
});

test('Transpiled ArrowArgument', () => {
	checkTranspiledOutput('arrow/arrowArgument.poc');
});

test('Interpreted FilterFromList', () => {
	checkInterpretedOutput('arrow/filterFromList.poc');
});

test('Transpiled FilterFromList', () => {
	checkTranspiledOutput('arrow/filterFromList.poc');
});

test('Interpreted FilterFromSet', () => {
	checkInterpretedOutput('arrow/filterFromSet.poc');
});

test('Transpiled FilterFromSet', () => {
	checkTranspiledOutput('arrow/filterFromSet.poc');
});

test('Interpreted HasAllFromList', () => {
	checkInterpretedOutput('arrow/hasAllFromList.poc');
});

test('Transpiled HasAllFromList', () => {
	checkTranspiledOutput('arrow/hasAllFromList.poc');
});

test('Interpreted HasAllFromSet', () => {
	checkInterpretedOutput('arrow/hasAllFromSet.poc');
});

test('Transpiled HasAllFromSet', () => {
	checkTranspiledOutput('arrow/hasAllFromSet.poc');
});

test('Interpreted HasAnyFromList', () => {
	checkInterpretedOutput('arrow/hasAnyFromList.poc');
});

test('Transpiled HasAnyFromList', () => {
	checkTranspiledOutput('arrow/hasAnyFromList.poc');
});

test('Interpreted HasAnyFromSet', () => {
	checkInterpretedOutput('arrow/hasAnyFromSet.poc');
});

test('Transpiled HasAnyFromSet', () => {
	checkTranspiledOutput('arrow/hasAnyFromSet.poc');
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

