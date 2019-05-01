var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('Sort1', () => {
	compareResourceOEO('arrow/sort1.poc');
});

test('Sort1_desc', () => {
	compareResourceOEO('arrow/sort1_desc.poc');
});

test('Sort2', () => {
	compareResourceOEO('arrow/sort2.poc');
});

test('Sort2_desc', () => {
	compareResourceOEO('arrow/sort2_desc.poc');
});

