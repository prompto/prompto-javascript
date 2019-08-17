var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('ArrowArgument', () => {
	compareResourceOMO('arrow/arrowArgument.poc');
});

test('FilterFromList', () => {
	compareResourceOMO('arrow/filterFromList.poc');
});

test('FilterFromSet', () => {
	compareResourceOMO('arrow/filterFromSet.poc');
});

test('SortCategory1Arg', () => {
	compareResourceOMO('arrow/sortCategory1Arg.poc');
});

test('SortCategory2Args', () => {
	compareResourceOMO('arrow/sortCategory2Args.poc');
});

test('SortText1Arg', () => {
	compareResourceOMO('arrow/sortText1Arg.poc');
});

test('SortText1ArgDesc', () => {
	compareResourceOMO('arrow/sortText1ArgDesc.poc');
});

test('SortText2Args', () => {
	compareResourceOMO('arrow/sortText2Args.poc');
});

test('SortText2ArgsDesc', () => {
	compareResourceOMO('arrow/sortText2ArgsDesc.poc');
});

