var compareResourceEOE = require("../../parser/BaseParserTest").compareResourceEOE;

test('Blob', () => {
	compareResourceEOE('documents/blob.pec');
});

test('DeepItem', () => {
	compareResourceEOE('documents/deepItem.pec');
});

test('DeepMember', () => {
	compareResourceEOE('documents/deepMember.pec');
});

test('Instance', () => {
	compareResourceEOE('documents/instance.pec');
});

test('Item', () => {
	compareResourceEOE('documents/item.pec');
});

test('Literal', () => {
	compareResourceEOE('documents/literal.pec');
});

test('Member', () => {
	compareResourceEOE('documents/member.pec');
});

test('NamedItem', () => {
	compareResourceEOE('documents/namedItem.pec');
});

