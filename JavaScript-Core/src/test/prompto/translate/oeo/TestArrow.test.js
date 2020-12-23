var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('ArrowArgument', () => {
	compareResourceOEO('arrow/arrowArgument.poc');
});

test('FilterFromList', () => {
	compareResourceOEO('arrow/filterFromList.poc');
});

test('FilterFromSet', () => {
	compareResourceOEO('arrow/filterFromSet.poc');
});

test('HasAllFromList', () => {
	compareResourceOEO('arrow/hasAllFromList.poc');
});

test('HasAllFromSet', () => {
	compareResourceOEO('arrow/hasAllFromSet.poc');
});

test('HasAnyFromList', () => {
	compareResourceOEO('arrow/hasAnyFromList.poc');
});

test('HasAnyFromSet', () => {
	compareResourceOEO('arrow/hasAnyFromSet.poc');
});

test('SortCategory1Arg', () => {
	compareResourceOEO('arrow/sortCategory1Arg.poc');
});

test('SortCategory2Args', () => {
	compareResourceOEO('arrow/sortCategory2Args.poc');
});

test('SortText1Arg', () => {
	compareResourceOEO('arrow/sortText1Arg.poc');
});

test('SortText1ArgDesc', () => {
	compareResourceOEO('arrow/sortText1ArgDesc.poc');
});

test('SortText2Args', () => {
	compareResourceOEO('arrow/sortText2Args.poc');
});

test('SortText2ArgsDesc', () => {
	compareResourceOEO('arrow/sortText2ArgsDesc.poc');
});

