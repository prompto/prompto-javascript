var compareResourceOEO = require("../../parser/BaseParserTest").compareResourceOEO;

test('DeepItem', () => {
	compareResourceOEO('documents/deepItem.poc');
});

test('DeepMember', () => {
	compareResourceOEO('documents/deepMember.poc');
});

test('Item', () => {
	compareResourceOEO('documents/item.poc');
});

test('Literal', () => {
	compareResourceOEO('documents/literal.poc');
});

test('Member', () => {
	compareResourceOEO('documents/member.poc');
});

