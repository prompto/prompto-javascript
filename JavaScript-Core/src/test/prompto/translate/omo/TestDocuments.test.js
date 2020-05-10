var compareResourceOMO = require("../../parser/BaseParserTest").compareResourceOMO;

test('DeepItem', () => {
	compareResourceOMO('documents/deepItem.poc');
});

test('DeepMember', () => {
	compareResourceOMO('documents/deepMember.poc');
});

test('Instance', () => {
	compareResourceOMO('documents/instance.poc');
});

test('Item', () => {
	compareResourceOMO('documents/item.poc');
});

test('Literal', () => {
	compareResourceOMO('documents/literal.poc');
});

test('Member', () => {
	compareResourceOMO('documents/member.poc');
});

