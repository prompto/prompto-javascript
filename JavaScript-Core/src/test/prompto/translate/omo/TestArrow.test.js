var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('Sort1', () => {
	compareResourceOMO('arrow/sort1.poc');
});

test('Sort1_desc', () => {
	compareResourceOMO('arrow/sort1_desc.poc');
});

test('Sort2', () => {
	compareResourceOMO('arrow/sort2.poc');
});

test('Sort2_desc', () => {
	compareResourceOMO('arrow/sort2_desc.poc');
});

